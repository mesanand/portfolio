# 03. Architecture

The target is a static React site with two small serverless functions, deployed on Vercel at `mehr-anand.com`. Everything that can be static is static. The only things that hit a server at runtime are the GitHub data proxy and the Open Graph image generator.

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Build | Vite 6 | Same as HACK1984. Instant dev server, tiny config, first-class Vercel support |
| UI | React 19 + TypeScript | TypeScript so content files are typed and a missing field fails the build instead of rendering blank |
| Routing | `react-router` v7 in library mode (`createBrowserRouter`) | Real URLs for `/work`, `/projects`, `/leadership`, `/now`. Vercel `rewrites` sends every path to `index.html` |
| Motion | `motion` (Framer Motion v12) | HACK1984 ships it; entrance animations only |
| Styling | Plain CSS with custom properties, three files | See `02-DESIGN-SYSTEM.md` section 10. No Tailwind, no CSS-in-JS |
| Content | Typed TS modules + one JSON file, validated with `zod` at build | Editing content is editing a data file, never JSX |
| Icons | `lucide-react` | Tree-shaken, consistent stroke |
| Images | `vite-imagetools` | AVIF/WebP at build |
| Serverless | Vercel Functions (`api/*.ts`, Node runtime) | GitHub proxy with server-side token; OG images |
| OG images | `@vercel/og` | Satori-based, one function |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` | Free tier, zero config |
| SEO | `react-helmet-async` for per-route meta, static `sitemap.xml` and `robots.txt`, JSON-LD `Person` | |
| Lint/format | ESLint (flat config) + Prettier, `typescript-eslint` | |
| Tests | Vitest for content schema tests; Playwright for one smoke test per route | Keep it small |
| CI | GitHub Actions: typecheck, lint, test, build on PR. Vercel handles deploys | |

Package manager: `pnpm`. Node 22.

---

## 2. Repo layout

```
mehr-anand.com/
  api/
    github.ts              # GET /api/github -> cached aggregate of GitHub data
    og.tsx                 # GET /api/og?title=...&sub=... -> 1200x630 PNG
  docs/
    overhaul/              # this pack, checked in so Claude Code can read it
  public/
    fonts/                 # FunnelDisplay, FunnelSans, GeistMono woff2
    resume.pdf
    favicon.svg, favicon.ico, apple-touch-icon.png
    robots.txt, sitemap.xml
  src/
    main.tsx
    router.tsx             # createBrowserRouter, routes, 404
    styles/
      tokens.css
      base.css
      components.css
    content/
      site.ts              # name, tagline, socials, location, resume URL
      experience.ts        # Experience[]
      projects.ts          # Project[]
      leadership.ts        # Role[]  (clubs)
      now.json             # NowEntry[]  (the manual feed)
      schemas.ts           # zod schemas + inferred types
      index.ts             # parses and exports everything; throws on invalid
    lib/
      github.ts            # client fetcher for /api/github with SWR-style cache
      dates.ts             # formatRange, relativeTime
      ascii.ts             # ASCII mark + divider generators (build-time strings)
      seo.tsx              # <Seo title description path image />
    components/
      Header.tsx, Footer.tsx, Section.tsx, Eyebrow.tsx
      BracketButton.tsx, Chip.tsx, LinkCard.tsx
      AsciiMark.tsx, AsciiDivider.tsx
      ExperienceRow.tsx, ProjectCell.tsx, RoleCell.tsx, FactList.tsx
      FeedItem.tsx
      github/
        GithubModule.tsx, Heatmap.tsx, StatsStrip.tsx, ActivityList.tsx, Skeleton.tsx
    pages/
      Home.tsx, Work.tsx, Projects.tsx, Leadership.tsx, Now.tsx, NotFound.tsx
    test/
      content.test.ts      # every content file parses; every URL is https; dates ordered
  scripts/
    add-now-entry.ts       # CLI: pnpm now "title" --type linkedin --url ... (appends to now.json)
    gen-ascii.ts           # regenerates the divider strings into src/lib/ascii-data.ts
  index.html
  vite.config.ts
  vercel.json
  package.json
  tsconfig.json
  eslint.config.js
  .env.example             # GITHUB_TOKEN=
  README.md
```

---

## 3. Routing and pages

| Route | Page | Contents |
|---|---|---|
| `/` | Home | Hero (5.11) → ASCII divider → "Now" strip (3 latest `now.json` entries as feed items + `[ ALL UPDATES ]`) → "Selected work" (top 3 experience rows, `[ FULL HISTORY ]`) → GitHub module → "Projects" (3 project cells) → "Elsewhere" link cards (GitHub, LinkedIn, email, calendar) → Footer |
| `/work` | Work | Section head → every `Experience` as `.xp-row`, newest first, current role pinned with pulse dot |
| `/projects` | Projects | Section head → `.cells` grid of every `Project`, with a mono filter row (`ALL / ML / DATA / WEB / HACKATHON`) that is real `<button>`s and updates a `?tag=` search param |
| `/leadership` | Leadership | Section head → "Current" `.cells` grid (roles with `current: true`) → "Previously" compact list (one line each: org, role, years) → `<details>` "High school (2021 to 2023)" collapsed by default with one-liners |
| `/now` | Now | Section head with "last updated {latest entry date}" → every `NowEntry` newest first, grouped by month with a mono month label → RSS link `[ RSS ]` |
| `/now.xml` | static | RSS 2.0 generated at build from `now.json` by a small Vite plugin, so people (and you) can subscribe |
| `*` | NotFound | ASCII `404`, one line, `[ HOME ]` |

`vercel.json`:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ],
  "headers": [
    { "source": "/fonts/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
  ]
}
```

Scroll restoration: on route change, `window.scrollTo(0,0)` unless the navigation carries a hash.

---

## 4. Content model

`src/content/schemas.ts`:

```ts
import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/); // YYYY-MM or YYYY-MM-DD

export const Experience = z.object({
  id: z.string(),
  org: z.string(),
  orgUrl: z.string().url().optional(),
  role: z.string(),
  location: z.string(),
  start: isoDate,
  end: isoDate.or(z.literal("present")),
  kind: z.enum(["coop", "internship", "consulting", "nonprofit", "parttime"]),
  summary: z.string().max(220),          // one sentence
  bullets: z.array(z.string()).min(1).max(4),
  stack: z.array(z.string()).max(8),
  featured: z.boolean().default(false),  // shows on Home
});

export const Project = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string().max(120),
  description: z.string().max(400),
  year: z.number().int(),
  tags: z.array(z.enum(["ml", "data", "web", "hackathon", "api", "ai"])),
  stack: z.array(z.string()).max(8),
  links: z.object({
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    devpost: z.string().url().optional(),
    video: z.string().url().optional(),
  }),
  outcome: z.string().max(140).optional(), // "Won 2 tracks at FinHacks"
  image: z.string().optional(),            // path under src/assets
  featured: z.boolean().default(false),
});

export const Role = z.object({
  id: z.string(),
  org: z.string(),
  orgUrl: z.string().url().optional(),
  role: z.string(),
  start: isoDate,
  end: isoDate.or(z.literal("present")),
  current: z.boolean().default(false),
  tier: z.enum(["headline", "supporting", "archive"]), // headline = full cell, supporting = one line, archive = inside <details>
  summary: z.string().max(260).optional(),
  metrics: z.array(z.string()).max(3).optional(),     // "150+ members", "$50K raised"
  era: z.enum(["neu-boston", "neu-oakland", "high-school"]),
});

export const NowEntry = z.object({
  id: z.string(),                     // ulid or yyyy-mm-dd-slug
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.enum(["linkedin", "shipped", "talk", "note", "press"]),
  title: z.string().max(120),
  body: z.string().max(600),
  url: z.string().url().optional(),
  image: z.string().url().optional(),
  tags: z.array(z.string()).max(5).default([]),
});
```

`src/content/index.ts` imports each file, runs `.array().parse()`, sorts by date desc, and exports typed arrays. A bad entry fails `pnpm build`, which fails the Vercel deploy, which is the point.

---

## 5. GitHub pipeline

### 5.1 Why a serverless proxy

Unauthenticated GitHub REST is 60 requests/hour per IP and the GraphQL API (which is the only way to get the contribution calendar) requires a token. The token must never ship to the browser. So the browser calls `/api/github`, which calls GitHub with `GITHUB_TOKEN` from Vercel env and returns one merged JSON. Vercel's CDN caches that response so GitHub sees a handful of requests per hour regardless of traffic.

### 5.2 `api/github.ts`

```ts
// Runtime: nodejs (Vercel Functions). Method: GET only.
// Env: GITHUB_TOKEN (fine-grained PAT, read-only on public repos, no expiry longer than 1 year)
// Response: { fetchedAt, user, calendar, stats, events, repos }
// Cache-Control: public, s-maxage=900, stale-while-revalidate=3600
```

Steps:

1. GraphQL, one query:
   ```graphql
   query($login:String!) {
     user(login:$login) {
       name avatarUrl url
       repositories(privacy:PUBLIC){ totalCount }
       followers{ totalCount }
       contributionsCollection {
         totalCommitContributions
         contributionCalendar {
           totalContributions
           weeks { contributionDays { date contributionCount contributionLevel } }
         }
       }
       pinnedItems(first:6, types:REPOSITORY){ nodes{ ... on Repository { name description url stargazerCount primaryLanguage{ name color } pushedAt } } }
       repositories(first:6, privacy:PUBLIC, orderBy:{field:PUSHED_AT, direction:DESC}, ownerAffiliations:OWNER){ nodes{ name description url stargazerCount primaryLanguage{ name color } pushedAt } }
     }
   }
   ```
2. REST `GET /users/mesanand/events/public?per_page=30`, filter to `PushEvent`, `CreateEvent`, `PullRequestEvent`, `ReleaseEvent`, `IssuesEvent`; map to `{ at, verb, repo, repoUrl, message, url }` where `message` is the first commit message of a push (truncate 72 chars). Keep the first 8.
3. Compute `stats`: `commits365 = totalCommitContributions`, `streak` (walk calendar days backward from today, count consecutive > 0), `lastPush = max(events.at)`, `publicRepos`.
4. Return JSON. On any upstream failure, return the last good payload from an in-memory module variable if present (Vercel keeps warm instances), else `502` with `{ error: "github_unavailable" }`.

Rate math: with `s-maxage=900` the function runs at most ~4 times/hour per Vercel region. GraphQL cost of the query is under 10 points against a 5000/hour budget.

### 5.3 Client

`src/lib/github.ts` exports `useGithub()`; a tiny hook that fetches `/api/github`, keeps the result in a module-level cache for the session, and exposes `{ data, error, loading }`. No SWR library needed. The `GithubModule` renders `Skeleton` while loading, the three sub-components on success, and the one-line error state on failure. The module never blocks the page; it is below the fold on Home.

Heatmap rendering: 53 weeks x 7 days as a CSS grid of `<span>`s, `contributionLevel` mapped `NONE → --surface-2, FIRST_QUARTILE → --ascii-1, SECOND → --ascii-2, THIRD → --ascii-3, FOURTH → --ascii-4`. Each cell has `title="{count} contributions on {date}"` and the grid has `role="img" aria-label="GitHub contributions, {total} in the last year"`.

### 5.4 Local dev

`vercel dev` runs the function locally with `.env.local`. Alternatively a Vite `server.proxy` to a deployed preview. Prompt 8 uses `vercel dev`.

---

## 6. The "now" feed (manual LinkedIn substitute)

### 6.1 Why manual

LinkedIn's API does not expose a member's own posts without Marketing Developer Platform approval, and scraping violates their terms and breaks monthly. A JSON file you append to takes 60 seconds per post, produces a permanent record on your own domain, and doubles as a changelog. The site shows "last updated {date}" so freshness is visible and honest.

### 6.2 Authoring paths

1. **CLI**: `pnpm now "Spoke on the NYC Convocation panel" --type talk --url https://... --tags northeastern,speaking`. Script validates against `NowEntry`, prepends to `now.json`, and prints the entry. Commit, push, Vercel deploys in ~40 seconds.
2. **Claude skill** (optional, `docs/overhaul/skills/now-entry.md`): a prompt you paste with a LinkedIn post's text and URL; Claude returns the JSON object in the right shape, you paste it into `now.json`. Prompt 9 writes this file.
3. **GitHub web editor**: edit `src/content/now.json` on github.com from your phone. The schema test in CI catches mistakes before deploy.

### 6.3 RSS

A Vite plugin (`scripts/rss-plugin.ts`) reads `now.json` at build and emits `public/now.xml`. Ten lines. Anyone can subscribe, and you can wire it to Zapier/IFTTT later to auto-post elsewhere.

---

## 7. Open Graph images

`api/og.tsx` uses `@vercel/og` `ImageResponse`. Template: black ground, the ASCII-style wordmark top-left, `title` in Funnel Display 64px, `sub` in Geist Mono 24px `--ink-faint`, accent rule bottom. Fonts loaded from `public/fonts` via `fetch(new URL(...))`. Each page's `<Seo>` sets `og:image` to `/api/og?title=...&sub=...`. Cached with `s-maxage=86400`.

Static fallback `public/og-default.png` (1200x630) generated once by hitting the function, for anything that cannot run the edge.

---

## 8. SEO

- `<Seo>` per route sets `<title>`, `description`, canonical, `og:*`, `twitter:card=summary_large_image`.
- `index.html` carries JSON-LD:
  ```json
  { "@context":"https://schema.org", "@type":"Person", "name":"Mehr Anand", "url":"https://mehr-anand.com", "jobTitle":"Data Warehouse Management Engineer Co-op", "worksFor":{"@type":"Organization","name":"General Atlantic"}, "alumniOf":{"@type":"CollegeOrUniversity","name":"Northeastern University"}, "sameAs":["https://github.com/mesanand","https://linkedin.com/in/mehr-anand"] }
  ```
- `sitemap.xml` lists the five routes. `robots.txt` allows all, points at the sitemap.
- Because this is a SPA, crawlers that do not execute JS see only `index.html`. Google does execute JS; LinkedIn and iMessage previews only read meta tags, which are static in `index.html` for `/` and set per-route by Helmet for the rest. Acceptable for v1. If it ever matters, `vite-plugin-ssr`/prerendering the five routes at build is a one-prompt add.

---

## 9. Deployment

- Vercel project already exists for `mehr-anand.com`. Link the new GitHub repo to it in the Vercel dashboard (Settings → Git). Framework preset: Vite. Build `pnpm build`, output `dist`.
- Env: `GITHUB_TOKEN` (Production + Preview). Nothing else.
- Every PR gets a preview URL. `main` deploys to production.
- `mesanand.github.io`: replace `index.html` with a meta-refresh + JS redirect to `https://mehr-anand.com` and a `portfolio.html` that redirects to `https://mehr-anand.com/work`. Keep the repo so old links resolve.
- GitHub profile README (`mesanand/mesanand`): one-line bio + link to the site. Update the profile bio field to match the hero subline. This is outside the site but inside the "live GitHub" story because the module links back to the profile.

---

## 10. Environment and secrets

```
GITHUB_TOKEN=github_pat_...   # fine-grained, Public repositories (read-only), expires in 1 year; set a calendar reminder
```

Nothing else. No database, no auth, no email provider. Contact is `mailto:` and a Calendly link.

---

## 11. Performance budget

| Metric | Budget |
|---|---|
| JS (gzipped, initial route) | < 120 KB (React 19 + router + motion is ~75 KB; leaves room) |
| Fonts | 3 files, < 200 KB total, preloaded |
| LCP on Home (mobile, Slow 4G) | < 2.0 s |
| CLS | < 0.05 (fonts have `size-adjust` fallbacks; images have explicit dimensions) |
| Lighthouse (mobile) | Performance ≥ 90, A11y 100, Best Practices 100, SEO 100 |

The GitHub module is code-split (`React.lazy`) so the heatmap code does not ship until it is scrolled near.

---

## 12. Things we are explicitly not building in v1

Blog, MDX, CMS, dark/light toggle, contact form backend, comments, i18n, page transitions, cursor effects, three.js, a "skills" percentage bar. Every one of these is either noise for the audience or a later prompt.
