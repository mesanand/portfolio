// Shape of GET /api/github (03-ARCHITECTURE s5.2). Shared by api/github.ts and the client.
// Type-only: api/ imports it with `import type`, so nothing here is bundled into the function.

export type ContributionLevel =
  "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: ContributionLevel;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export type ActivityVerb = "pushed" | "created" | "opened" | "closed" | "merged" | "released";

export interface ActivityEvent {
  at: string; // ISO timestamp
  verb: ActivityVerb;
  repo: string; // owner/name
  repoUrl: string;
  message: string; // at most 72 characters
  url: string;
}

export interface RepoSummary {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  languageColor: string | null;
  pushedAt: string | null;
}

export interface GithubPayload {
  fetchedAt: string;
  user: {
    login: string;
    name: string | null;
    avatarUrl: string;
    url: string;
    followers: number;
  };
  calendar: {
    total: number;
    weeks: ContributionWeek[];
  };
  stats: {
    commits365: number;
    streak: number;
    /** False when today has no contributions yet and the streak counts back from yesterday. */
    streakIncludesToday: boolean;
    lastPush: string | null;
    publicRepos: number;
  };
  events: ActivityEvent[];
  repos: RepoSummary[];
}
