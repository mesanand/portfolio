// GET /api/github: one cached aggregate of GitHub data (03-ARCHITECTURE s5).
// Runtime: Vercel Node function. Env: GITHUB_TOKEN (fine-grained, public repos, read-only).
// The token stays on the server; the browser only ever sees the JSON below.
// In local dev and preview, vite.config.ts mounts this same handler (see localApi()).
import type { IncomingMessage, ServerResponse } from "node:http";
import type {
  ActivityEvent,
  ActivityVerb,
  ContributionDay,
  ContributionLevel,
  ContributionWeek,
  GithubPayload,
  RepoSummary,
} from "../src/lib/github-types";

const LOGIN = "mesanand";
const CACHE = "public, s-maxage=900, stale-while-revalidate=3600";
const UPSTREAM_TIMEOUT_MS = 8000;
const MAX_EVENTS = 8;

// Warm instances keep this between requests; served when GitHub fails.
let lastGood: GithubPayload | null = null;
let warnedMissingToken = false;

const QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      url
      publicRepos: repositories(privacy: PUBLIC) {
        totalCount
      }
      followers {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            primaryLanguage {
              name
              color
            }
            pushedAt
          }
        }
      }
      recent: repositories(
        first: 6
        privacy: PUBLIC
        orderBy: { field: PUSHED_AT, direction: DESC }
        ownerAffiliations: OWNER
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          primaryLanguage {
            name
            color
          }
          pushedAt
        }
      }
    }
  }
`;

interface GqlRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
  pushedAt: string | null;
}

interface GqlUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  publicRepos: { totalCount: number };
  followers: { totalCount: number };
  contributionsCollection: {
    totalCommitContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          contributionLevel: ContributionLevel;
        }>;
      }>;
    };
  };
  pinnedItems: { nodes: Array<GqlRepo | Record<string, never>> };
  recent: { nodes: GqlRepo[] };
}

interface RestEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    action?: string;
    ref?: string | null;
    ref_type?: string;
    head?: string;
    commits?: Array<{ message: string }>;
    pull_request?: { title?: string; number?: number; html_url?: string; merged?: boolean };
    issue?: { title?: string; number?: number; html_url?: string };
    release?: { name?: string | null; tag_name?: string; html_url?: string };
  };
}

// ---------------------------------------------------------------------------
// Pure helpers (exported for tests)
// ---------------------------------------------------------------------------

export function truncate(text: string, max = 72): string {
  const oneLine = text.split("\n")[0]!.trim();
  return oneLine.length <= max ? oneLine : `${oneLine.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Consecutive days with contributions, ending today (UTC). If today has none
 * yet, the streak counts back from yesterday and `includesToday` is false.
 */
export function computeStreak(
  days: ContributionDay[],
  today: string = new Date().toISOString().slice(0, 10),
): { streak: number; includesToday: boolean } {
  let i = days.findIndex((d) => d.date === today);
  if (i === -1) i = days.length - 1;
  let includesToday = days[i]?.date === today;
  if (days[i] && days[i]!.count === 0) {
    i -= 1;
    includesToday = false;
  }
  let streak = 0;
  for (; i >= 0 && days[i]!.count > 0; i--) streak++;
  return { streak, includesToday };
}

const toRepo = (r: GqlRepo): RepoSummary => ({
  name: r.name,
  description: r.description,
  url: r.url,
  stars: r.stargazerCount,
  language: r.primaryLanguage?.name ?? null,
  languageColor: r.primaryLanguage?.color ?? null,
  pushedAt: r.pushedAt,
});

/** Maps raw events to activity rows; push messages are filled in later. */
export function mapEvent(e: RestEvent): ActivityEvent | null {
  const repo = e.repo.name;
  const repoUrl = `https://github.com/${repo}`;
  const base = { at: e.created_at, repo, repoUrl };
  const p = e.payload;
  switch (e.type) {
    case "PushEvent": {
      const branch = (p.ref ?? "").replace("refs/heads/", "");
      const message = p.commits?.[0]?.message ?? `to ${branch || "a branch"}`;
      return {
        ...base,
        verb: "pushed",
        message: truncate(message),
        url: p.head ? `${repoUrl}/commit/${p.head}` : repoUrl,
      };
    }
    case "CreateEvent":
      return {
        ...base,
        verb: "created",
        message: truncate(
          p.ref_type === "repository" ? "repository" : `${p.ref_type} ${p.ref ?? ""}`,
        ),
        url: repoUrl,
      };
    case "PullRequestEvent": {
      const pr = p.pull_request ?? {};
      const verb: ActivityVerb =
        p.action === "closed" ? (pr.merged ? "merged" : "closed") : "opened";
      if (p.action !== "opened" && p.action !== "closed") return null;
      return {
        ...base,
        verb,
        message: truncate(pr.title ?? `pull request #${pr.number ?? ""}`),
        url: pr.html_url ?? repoUrl,
      };
    }
    case "IssuesEvent": {
      if (p.action !== "opened" && p.action !== "closed") return null;
      const issue = p.issue ?? {};
      return {
        ...base,
        verb: p.action === "opened" ? "opened" : "closed",
        message: truncate(issue.title ?? `issue #${issue.number ?? ""}`),
        url: issue.html_url ?? repoUrl,
      };
    }
    case "ReleaseEvent": {
      const rel = p.release ?? {};
      return {
        ...base,
        verb: "released",
        message: truncate(rel.name || rel.tag_name || "a release"),
        url: rel.html_url ?? repoUrl,
      };
    }
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Upstream calls
// ---------------------------------------------------------------------------

async function gh<T>(token: string, url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "mehr-anand.com",
      ...init.headers,
    },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return (await res.json()) as T;
}

export async function buildPayload(token: string): Promise<GithubPayload> {
  const [gql, rawEvents] = await Promise.all([
    gh<{ data?: { user: GqlUser | null }; errors?: unknown }>(
      token,
      "https://api.github.com/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
      },
    ),
    gh<RestEvent[]>(token, `https://api.github.com/users/${LOGIN}/events/public?per_page=30`),
  ]);
  const user = gql.data?.user;
  if (!user) throw new Error(`GraphQL returned no user: ${JSON.stringify(gql.errors ?? null)}`);

  const weeks: ContributionWeek[] = user.contributionsCollection.contributionCalendar.weeks.map(
    (w) => ({
      days: w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: d.contributionLevel,
      })),
    }),
  );
  const days = weeks.flatMap((w) => w.days);

  // Home shows only the heatmap and stats, so push messages are not looked up
  // (that cost one extra GitHub call per push). Events still feed "last push".
  const events: ActivityEvent[] = [];
  for (const e of rawEvents) {
    const mapped = mapEvent(e);
    if (!mapped) continue;
    events.push(mapped);
    if (events.length === MAX_EVENTS) break;
  }

  const pinned = user.pinnedItems.nodes.filter((n): n is GqlRepo => "name" in n).map(toRepo);
  const recent = user.recent.nodes.map(toRepo);
  const pushTimes = events.filter((e) => e.verb === "pushed").map((e) => e.at);
  const repoPushTimes = recent.map((r) => r.pushedAt).filter((t): t is string => Boolean(t));
  const lastPush = [...pushTimes, ...repoPushTimes].sort().at(-1) ?? null;
  const { streak, includesToday } = computeStreak(days);

  return {
    fetchedAt: new Date().toISOString(),
    user: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      url: user.url,
      followers: user.followers.totalCount,
    },
    calendar: {
      total: user.contributionsCollection.contributionCalendar.totalContributions,
      weeks,
    },
    stats: {
      commits365: user.contributionsCollection.totalCommitContributions,
      streak,
      streakIncludesToday: includesToday,
      lastPush,
      publicRepos: user.publicRepos.totalCount,
    },
    events,
    repos: pinned.length > 0 ? pinned : recent,
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

function send(
  res: ServerResponse,
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "GET") {
    return send(res, 405, { error: "method_not_allowed" }, { Allow: "GET" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    if (!warnedMissingToken) {
      console.error("[api/github] GITHUB_TOKEN is not set");
      warnedMissingToken = true;
    }
    return send(res, 500, { error: "missing_token" }, { "Cache-Control": "no-store" });
  }

  try {
    const payload = await buildPayload(token);
    lastGood = payload;
    return send(res, 200, payload, { "Cache-Control": CACHE });
  } catch (err) {
    console.error("[api/github] upstream failed:", err instanceof Error ? err.message : err);
    if (lastGood) {
      return send(res, 200, lastGood, { "Cache-Control": CACHE, "x-served-from": "stale" });
    }
    return send(res, 502, { error: "github_unavailable" }, { "Cache-Control": "no-store" });
  }
}
