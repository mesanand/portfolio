# 05. Build Prompts

Thirteen prompts. Paste each one, verbatim, into a fresh Claude Code session opened at the repo root. Run them in order. Do not start prompt N+1 until prompt N's acceptance criteria pass.

Every prompt assumes `docs/overhaul/` (this pack) is checked into the repo and tells Claude to read the relevant files. That is how the design and content survive across sessions without you re-explaining anything.

---

## Fill this in before prompt 1

```
ACCENT_HEX        = #ffb02e        (from 02-DESIGN-SYSTEM.md section 2.2; gold unless you changed it)
REPO_NAME         = portfolio
GITHUB_USER       = mesanand
DOMAIN            = https://mehr-anand.com
VERCEL_PROJECT    = (the existing Vercel project name for portfolio)
```

Replace `{{ACCENT_HEX}}` etc. in the prompts below with these values, or leave the placeholders and tell Claude the values in your first message; either works.

---

## Prompt 1: Scaffold

```
You are building a personal portfolio site from scratch in this empty repo. Before writing anything, read docs/overhaul/00-README.md and docs/overhaul/03-ARCHITECTURE.md in full. They are the spec. Do not deviate from the stack or folder layout in 03-ARCHITECTURE.md section 1 and 2.

Task: create the project skeleton and get `pnpm dev` and `pnpm build` running with a blank page.

Do exactly this:
1. `pnpm create vite . --template react-ts` (or equivalent that produces Vite 6 + React 19 + TypeScript). Use pnpm. Node 22.
2. Install runtime deps: react-router (v7, library mode), motion, zod, lucide-react, react-helmet-async, @vercel/analytics, @vercel/speed-insights.
3. Install dev deps: vite-imagetools, vitest, @playwright/test, eslint (flat config) with typescript-eslint and react-hooks plugins, prettier, @types/node.
4. Create the folder layout from 03-ARCHITECTURE.md section 2 exactly, with empty placeholder files where the content is not yet specified (a one-line `export {}` is fine). Do not invent components not in the list.
5. tsconfig: strict true, noUncheckedIndexedAccess true, path alias `@/*` -> `src/*`. Mirror the alias in vite.config.ts.
6. vercel.json from 03-ARCHITECTURE.md section 3 verbatim.
7. `.env.example` containing `GITHUB_TOKEN=`. Add `.env*.local` to .gitignore. Never commit a token.
8. package.json scripts: dev, build, preview, typecheck (tsc --noEmit), lint, format, test (vitest run), test:e2e (playwright test), now (tsx scripts/add-now-entry.ts).
9. index.html: lang="en", viewport meta, theme-color #000000, title "Mehr Anand", a placeholder meta description, and preload link tags for the three fonts at /fonts/FunnelDisplay-300-800.woff2, /fonts/FunnelSans-300-800.woff2, /fonts/GeistMono-100-900.woff2 (the files do not exist yet; prompt 2 adds them).
10. src/main.tsx renders <RouterProvider> from src/router.tsx wrapped in <HelmetProvider>. router.tsx defines the six routes from 03-ARCHITECTURE.md section 3 pointing at page components that each render just their route name in an <h1> for now, plus a NotFound.
11. A GitHub Actions workflow at .github/workflows/ci.yml that runs pnpm install, typecheck, lint, test, build on pull_request and push to main.
12. README.md: what the site is, how to run it, where content lives (link to docs/overhaul/03-ARCHITECTURE.md section 4), how to add a now entry (link to section 6).

Do not:
- Add Tailwind, styled-components, CSS modules, or any CSS framework.
- Add Next.js or any SSR.
- Write any real styling or content yet.
- Touch docs/overhaul/.

Acceptance criteria:
- `pnpm install && pnpm typecheck && pnpm lint && pnpm build` all exit 0.
- `pnpm dev` serves `/`, `/work`, `/projects`, `/leadership`, `/now`, and `/does-not-exist` (404 page) each showing their placeholder heading.
- `git status` shows no .env files and no node_modules.
- Commit with message "chore: scaffold vite + react + ts per docs/overhaul/03".
```

---

## Prompt 2: Tokens, fonts, base CSS

```
Read docs/overhaul/02-DESIGN-SYSTEM.md in full. It is the entire design spec. Then read docs/overhaul/03-ARCHITECTURE.md section 2 for file locations.

Task: implement the design tokens, self-hosted fonts, and base styles. No components yet.

Do exactly this:
1. Fonts. Download the variable woff2 files for Funnel Display (300-800), Funnel Sans (300-800), and Geist Mono (100-900). Funnel Display and Funnel Sans are on Google Fonts under the OFL; Geist Mono is on github.com/vercel/geist-font under the OFL. Put them at public/fonts/ with the exact filenames used in index.html. Add the OFL license text as public/fonts/LICENSE.txt. If you cannot download, stop and tell me the URLs to fetch manually; do not substitute other fonts.
2. src/styles/tokens.css: every custom property from 02-DESIGN-SYSTEM.md sections 2.1, 2.2 (using accent {{ACCENT_HEX}} and the ramp given for it), 2.3, 3.1 (font stacks), 3.2 (type scale as --t-* properties holding font shorthand where possible, plus separate --lh-*, --ls-* where shorthand cannot express clamp), 4.1, 4.2, 4.3. Group with comments matching the section numbers.
3. src/styles/base.css: a minimal modern reset (box-sizing, margin 0, img/svg display block max-width 100%, button/input font inherit), the three @font-face blocks from 3.1 with font-display swap and size-adjust fallbacks for the sans (use a system-ui fallback with size-adjust ~ 97%), body { background: var(--bg-page); color: var(--text-body); font: var(--t-body); -webkit-font-smoothing: antialiased }, headings default to --text-heading and the display face, `:focus-visible` outline 2px solid var(--focus-ring) offset 3px, `::selection` background var(--accent) color var(--on-accent), and the reduced-motion block from section 6.
4. Utility classes in base.css only: .container (max-width + gutter), .bleed (full-bleed), .visually-hidden, .mono (font-family mono), .eyebrow (--t-eyebrow, color --text-meta, uppercase, tracking).
5. Import tokens.css, base.css, components.css (empty for now) in that order from src/main.tsx.
6. Replace the placeholder <h1>s on each page with a temporary type specimen on the Home page only: one line of each type token from section 3.2, each labeled with its token name in .eyebrow, plus a row of 12 swatches for the ladder and accent set. This is a throwaway that prompt 4 deletes; it exists so we can eyeball the tokens.

Do not:
- Use any color, size, or font not defined in tokens.css. If a component needs a value that is not a token, add the token first.
- Add border-radius anywhere except --radius-pill.
- Add box-shadow anywhere.

Acceptance criteria:
- `pnpm build` passes; the three woff2 files are under 200 KB combined (report the sizes).
- In `pnpm dev`, the Home specimen renders in the correct fonts (verify by checking computed font-family in devtools or a Playwright script; report what you checked).
- Contrast: --ink, --ink-body, --ink-faint, and --accent each meet WCAG AA on --ground and --surface. Compute and print the ratios in your final message.
- Commit "feat: design tokens, fonts, base styles per docs/overhaul/02".
```

---

## Prompt 3: Shell (header, footer, section, buttons, chips, cards)

```
Read docs/overhaul/02-DESIGN-SYSTEM.md sections 5.1, 5.2, 5.3, 5.4, 5.8, 5.13, and 6. Read docs/overhaul/03-ARCHITECTURE.md sections 2 and 3.

Task: build the site shell and the primitive components. Every page should now render inside the header/footer frame.

Do exactly this:
1. src/content/site.ts with a typed `site` object: name, wordmark parts, tagline (placeholder "TAGLINE TBD"), email, location, resumeUrl "/resume.pdf", socials array {label, url, icon}. Fill with values from docs/overhaul/04-CONTENT-INVENTORY.md section 1 where VERIFIED; use obvious placeholders for NEEDS-MEHR items and list them in your final message.
2. Components, each a small TSX file plus classes in src/styles/components.css, exactly to spec:
   - Header (5.1): sticky, 80px, dashed bottom rule, two-tone wordmark, nav from a const array (WORK, PROJECTS, LEADERSHIP, NOW), [ RESUME ] bracket button linking to site.resumeUrl target _blank. Active route via NavLink. Blur + 72% black background after 40px scroll (use a scroll listener with requestAnimationFrame, or IntersectionObserver on a sentinel). Phone: nav hidden, [ MENU ] button toggles a full-screen overlay (role="dialog", aria-modal, focus trapped, Escape closes, body scroll locked) with links at --t-h2.
   - Footer (5.13).
   - Section + SectionHead (5.3): Section is a <section> with the page container and vertical padding; SectionHead takes eyebrow, title, lede, optional index like "01".
   - BracketButton (5.2): renders <a> or <button> depending on props; variants primary, secondary, sm. Brackets via ::before/::after, never as literal characters in the DOM (so screen readers do not read "left bracket").
   - Chip (5.8): default and accent variants.
   - LinkCard (5.4): icon, title, subtitle, href, external arrow.
   - Eyebrow: tiny wrapper around the .eyebrow class.
3. A Layout route component wrapping all pages: Header, <main id="main">, Footer, plus a skip link "Skip to content" as the first focusable element. Add Analytics and SpeedInsights from @vercel here.
4. Scroll-to-top on route change unless there is a hash.
5. NotFound page (5.11-adjacent): eyebrow "404", one line "Nothing at this address.", [ HOME ].
6. Remove the type specimen from Home; Home now renders an empty Section with SectionHead "Home" so the frame is visible.
7. Add src/lib/dates.ts with formatRange(start, end) -> "JUL 2026 to PRESENT" style strings and relativeTime(iso) -> "3 hours ago". Add unit tests in src/test/dates.test.ts.

Do not:
- Introduce any transform on hover. Hover changes color only.
- Use icons in nav, headings, or buttons.
- Use any value not in tokens.css.

Acceptance criteria:
- Keyboard: Tab from the address bar reaches skip link, then wordmark, then each nav item, then RESUME. Phone menu opens with Enter, traps focus, closes with Escape, returns focus to the MENU button. Verify with a Playwright test at src/test/e2e/nav.spec.ts and report the result.
- Every route renders inside the frame; 404 works on hard refresh under `pnpm preview`.
- `pnpm typecheck && pnpm lint && pnpm test && pnpm build` pass.
- Commit "feat: shell, header, footer, primitives per docs/overhaul/02 s5".
```

---

## Prompt 4: Hero, ASCII mark and dividers, Home skeleton

```
Read docs/overhaul/02-DESIGN-SYSTEM.md sections 5.11, 5.12, 6, and 8. Read docs/overhaul/04-CONTENT-INVENTORY.md section 1 for hero copy.

Task: build the hero with the ASCII wordmark, the ASCII divider, and lay out the Home page sections as placeholders so the page has its final shape.

Do exactly this:
1. src/lib/ascii.ts:
   - A 5x7 (or 7x9 if you need it for legibility) pixel-font bitmap for the characters M E H R A N D and space. Define it as a const object of string arrays where "#" is on.
   - `renderMark(text: string): { cols: number; rows: number; cells: Array<0|1> }` that lays out the text with 1-column spacing. Target 47 columns total like the reference; if "MEHR ANAND" exceeds that at 5x7, use two lines "MEHR" over "ANAND".
   - `renderDivider(seed: number, rows: number, cols: number): string[]` that produces rows of characters from " .:-=+*#%" weighted toward space using a seeded PRNG (mulberry32). Precompute two dividers (seeds 1984 and 2027) into src/lib/ascii-data.ts via scripts/gen-ascii.ts so the client does no random work.
2. AsciiMark component: renders the mark as an inline SVG (one <rect> per on-cell, `shape-rendering: crispEdges`) sized by --mark-w, fill from the ascii ramp: "MEHR" cells use --ascii-6 (near white), "ANAND" cells use --ascii-4 (accent), plus a subtle 1-cell drop in --ascii-1 offset (+1,+1) behind each on-cell for depth. role="img", aria-label="Mehr Anand".
3. AsciiDivider component: <pre aria-hidden="true"> using --font-mono at 7px / 7.21px line-height, letter-spacing 0, color from the ramp by row (row 0 --ascii-1, middle --ascii-2, last --ascii-3), overflow hidden, full bleed. Props: which precomputed divider.
4. Hero component per 5.11: scanline background, accent radial glow ::after, AsciiMark, subline from site.tagline in --t-lead, mono where-list (three items separated by " · "), two BracketButtons: [ SEE THE WORK ] -> /work, [ WHAT I'M DOING NOW ] -> /now. Entrance motion per section 6 using `motion` with useReducedMotion respected.
5. Home page layout, top to bottom, with SectionHeads and empty bodies where the content module does not exist yet: Hero, AsciiDivider(1984), "Now" (eyebrow "// NOW", title "What I'm doing this month"), "Selected work" (eyebrow "// WORK"), "GitHub" (eyebrow "// GITHUB", title "Commits, in public"), "Projects" (eyebrow "// PROJECTS"), "Elsewhere" (link cards for GitHub, LinkedIn, Email using site.socials), AsciiDivider(2027), then Footer from Layout.
6. About strip under the hero? No. It goes inside "Selected work" as a lead paragraph in prompt 5. Skip it here.

Do not:
- Animate the divider or mark continuously.
- Load any image yet.
- Use canvas. SVG and <pre> only.

Acceptance criteria:
- Hero renders the mark legibly at 320px, 768px, and 1440px widths (take three Playwright screenshots to test-results/ and describe them).
- With `prefers-reduced-motion: reduce` emulated, nothing animates and content is visible immediately.
- Lighthouse (mobile, `pnpm preview`) on / scores Performance >= 90 and CLS < 0.05. Report the numbers.
- Commit "feat: hero, ascii mark and dividers, home skeleton".
```

---

## Prompt 5: Content schemas and Experience page

```
Read docs/overhaul/03-ARCHITECTURE.md section 4 (schemas) and docs/overhaul/04-CONTENT-INVENTORY.md sections 2 (experience) and 1 (about copy). Read docs/overhaul/02-DESIGN-SYSTEM.md sections 5.6, 5.7, 5.8.

Task: implement the typed content layer and the /work page.

Do exactly this:
1. src/content/schemas.ts with the four zod schemas from 03 section 4 verbatim, exporting inferred types.
2. src/content/experience.ts: every entry from 04 section 2 that is not marked CUT. For fields marked NEEDS-MEHR, use the text as written and add a `// TODO(mehr): <the question>` comment on that line. Do not invent numbers. If a bullet has a bracketed placeholder, keep the bracket so it is visibly unfinished.
3. src/content/index.ts: parse each content array with its schema, sort newest first (end "present" sorts first, then by start desc), export typed arrays `experience`, and stubs for `projects`, `leadership`, `nowEntries` that parse empty arrays for now. A parse failure must throw with the entry id and the zod issue path.
4. src/test/content.test.ts: every content file parses; every URL starts with https://; no two ids collide; dates are valid; `featured` entries are at most 4 per collection.
5. FactList component (5.6) and ExperienceRow component (5.7): date column in mono with the pulse dot when end === "present" (CSS keyframes, disabled under reduced motion), org (as link if orgUrl) + location, role, summary, bullets as a <ul> with no bullets glyphs but a 1ch mono "-" prefix, chip row for stack.
6. /work page: SectionHead (eyebrow "// WORK", title "Work", lede one sentence from 04 section 1 about strip, trimmed to the first two sentences), then every experience row separated by hairline rules, grouped with a mono label "NOW" above current roles and "PREVIOUSLY" above the rest.
7. Home "Selected work" section: the about strip paragraph from 04 section 1 (with the headshot placeholder slot to the left as an empty 160px square with dashed border for now; prompt 11 adds the image), then the `featured` experience rows in compact mode (no bullets, summary only), then [ FULL HISTORY ] -> /work.

Do not:
- Render any content that is not in a content file. No inline strings for experience data in JSX.
- Add a timeline line, dots on every row, or alternating layout. It is a ruled list.

Acceptance criteria:
- `pnpm test` passes including the new content tests.
- Deleting a required field from one experience entry makes `pnpm build` fail with a message that names the entry id. Demonstrate this, then restore the field.
- /work renders all entries; current role shows the pulse dot; on a 375px viewport the date stacks above the org.
- Print the list of TODO(mehr) comments you added.
- Commit "feat: content schemas, experience content, /work page".
```

---

## Prompt 6: Projects

```
Read docs/overhaul/04-CONTENT-INVENTORY.md section 3 and docs/overhaul/02-DESIGN-SYSTEM.md sections 5.5, 5.6, 5.8. Schemas are already in src/content/schemas.ts.

Task: projects content and the /projects page.

Do exactly this:
1. src/content/projects.ts: every project in 04 section 3 not marked CUT, with TODO(mehr) comments for NEEDS-MEHR fields exactly as in prompt 5. Keep `featured: true` on at most three.
2. ProjectCell component (5.5): index label ("01" etc. in accent eyebrow), name as --t-h3, tagline in --ink-faint mono under it, description, FactList with keys BUILT (year), OUTCOME (if any), STACK (chips), then a bottom row with the chip tags on the left and up to two bracket-sm links on the right (prefer repo then demo then devpost then video; label them [ CODE ], [ LIVE ], [ DEVPOST ], [ VIDEO ]).
3. /projects page: SectionHead (eyebrow "// PROJECTS", title "Projects", lede "Hackathon builds, side projects, and things I made because the existing thing annoyed me."). A filter row of real <button>s in mono label style: ALL plus one per tag present in the data. The active filter is reflected in the URL as ?tag= and read on load. Filtering re-renders the grid; layout animation via motion's `layout` prop on cells, disabled under reduced motion. The grid is `.cells` with 2 columns on desktop and 1 on phone, ruled per 5.5.
4. Home "Projects" section: the featured cells in the same grid, then [ ALL PROJECTS ].

Do not:
- Show placeholder images. Cells without an image have no image slot.
- Use a card shadow or radius.

Acceptance criteria:
- /projects?tag=hackathon loads with that filter active and only matching cells shown; the ALL button restores everything and clears the param.
- Filter buttons are keyboard-operable and announce state (aria-pressed).
- Tests pass; build passes; print TODO(mehr) list.
- Commit "feat: projects content and /projects page".
```

---

## Prompt 7: Leadership

```
Read docs/overhaul/04-CONTENT-INVENTORY.md section 4 and docs/overhaul/02-DESIGN-SYSTEM.md sections 5.5, 5.6, 5.8. Schemas exist.

Task: leadership content and the /leadership page.

Do exactly this:
1. src/content/leadership.ts: every role in 04 section 4 with the given tier and era, TODO(mehr) comments on NEEDS-MEHR items. Honors from 4.3 go into a separate small typed array `honors` in the same file: {year, title, body, url?}. Add a zod schema for Honor in schemas.ts.
2. RoleCell component: a ProjectCell variant for tier "headline": org name --t-h3 with role in --ink-faint mono under it, dates via formatRange, summary, then a metrics row of up to three accent Chips.
3. RoleLine component for tier "supporting": a single ruled row, grid 160px / 1fr / auto: dates mono, "org, role" text, one-line summary in --ink-body (hidden on phone).
4. /leadership page, in this order:
   - SectionHead (eyebrow "// LEADERSHIP", title "Leadership", lede "I start things, systematize them, and hand them off. Eight so far." with a TODO(mehr) on the number).
   - "Now" group: headline-tier cells in the ruled grid.
   - "Honors" group: the honors array as RoleLines with the year in the date column.
   - "Previously" group: supporting-tier RoleLines, grouped by era with a mono label ("BOSTON", "OAKLAND").
   - A native <details> with <summary> "High school, 2021 to 2023" styled as a mono label with a "+" that becomes "-" when open (CSS only, no JS). Inside: archive-tier RoleLines.
5. No Home section for leadership; the about strip already mentions it. The footer nav link is enough.

Do not:
- Give every role a full cell. Only headline tier gets cells.
- Add icons or logos for organizations.

Acceptance criteria:
- The page has three visible groups plus a collapsed details; opening it needs no JS.
- Ordering is newest first inside each group; current roles show "PRESENT".
- Tests and build pass; print TODO(mehr) list.
- Commit "feat: leadership content and /leadership page".
```

---

## Prompt 8: GitHub live module

```
Read docs/overhaul/03-ARCHITECTURE.md section 5 in full and docs/overhaul/02-DESIGN-SYSTEM.md section 5.10.

Task: the GitHub serverless proxy and the GitHub module on Home.

Do exactly this:
1. api/github.ts as a Vercel Node function (export default async function handler(req, res)). GET only; 405 otherwise. Reads process.env.GITHUB_TOKEN; if missing, return 500 { error: "missing_token" } and log once. Runs the GraphQL query from 03 section 5.2 for login "{{GITHUB_USER}}" and the REST events call, builds { fetchedAt, user, calendar, stats, events, repos } exactly as specified, and sets `Cache-Control: public, s-maxage=900, stale-while-revalidate=3600`. Keep a module-level `lastGood` and serve it on upstream failure with an `x-served-from: stale` header. Type the response in src/lib/github-types.ts and share it between api/ and src/ (api/ can import from src/lib with a relative path; confirm Vercel bundles it, otherwise duplicate the type file and say so).
2. Streak calculation: consecutive days ending today (UTC) with contributionCount > 0; if today is 0, count from yesterday and expose `streakIncludesToday: false`.
3. src/lib/github.ts: `useGithub()` hook with module-level cache, AbortController on unmount, and a 12 s timeout that resolves to the error state.
4. Components under src/components/github/: Skeleton, Heatmap (53x7 CSS grid of spans; colors from the ascii ramp per 5.10; month labels computed from the week data; weekday labels Mon/Wed/Fri; role="img" with aria-label; horizontal scroll container on phone with the most recent weeks visible by default, i.e. scrolled to the right on mount), StatsStrip (COMMITS / 365D, STREAK, LAST PUSH via relativeTime, PUBLIC REPOS), ActivityList (up to 8 rows: relative date, verb, repo link, message truncated to 72 chars; verbs: pushed, created, opened, released). GithubModule composes them and is React.lazy-loaded from Home inside a Suspense boundary that renders Skeleton.
5. Home "GitHub" section: SectionHead lede "Live from github.com/{{GITHUB_USER}}, refreshed every 15 minutes." then GithubModule, then [ PROFILE ] -> https://github.com/{{GITHUB_USER}}.
6. Local dev: document in README that `vercel dev` is required for /api. Add a `pnpm dev:vercel` script. If vercel CLI is not installed, install it as a dev dependency.
7. Error state copy exactly: "GitHub is not answering. Try github.com/{{GITHUB_USER}}." in --ink-faint, one line, no icon.

Do not:
- Ship the token to the client in any form. Grep the built dist/ for "github_pat" and "ghp_" and confirm zero matches.
- Use an unofficial contributions-scraping endpoint.
- Add a chart library. The heatmap is spans.

Acceptance criteria:
- With GITHUB_TOKEN in .env.local, `pnpm dev:vercel` serves /api/github with all five keys populated and a correct Cache-Control header (paste the header and the `stats` object).
- With the token removed, the module shows the one-line error state and the rest of the page is unaffected.
- The heatmap has 371 cells (53x7) and the last cell is today or yesterday.
- dist/ contains no token strings (show the grep).
- Commit "feat: github proxy and live module".
```

---

## Prompt 9: The now feed

```
Read docs/overhaul/03-ARCHITECTURE.md section 6 and docs/overhaul/02-DESIGN-SYSTEM.md section 5.9. Read docs/overhaul/04-CONTENT-INVENTORY.md section 5 for seed entries.

Task: the /now feed, its authoring script, RSS, and the Claude authoring prompt.

Do exactly this:
1. src/content/now.json: the seed entries from 04 section 5 as NowEntry objects. For entries whose date is unknown, use the first of the most likely month and put "date approximate" in tags so I can fix them. For unknown URLs, omit url. Newest first.
2. Wire nowEntries in src/content/index.ts (parse + sort desc by date).
3. FeedItem component (5.9): mono header "TYPE · DATE" with the type in accent, title, body (preserve line breaks, max 64ch), optional image with the grayscale treatment, optional [ READ ON LINKEDIN ] / [ OPEN ] bracket-sm depending on type.
4. /now page: SectionHead (eyebrow "// NOW", title "Now", lede "What I'm doing, roughly in real time. Last updated {latest date}."), entries grouped by month with a mono month label ("SEPTEMBER 2026"), each month a ruled group. A [ RSS ] bracket-sm in the SectionHead area linking to /now.xml.
5. Home "Now" section: the three newest entries as FeedItems in a 3-column ruled grid on desktop (1 on phone), then [ ALL UPDATES ] -> /now.
6. scripts/add-now-entry.ts (run via tsx): `pnpm now "Title" --type linkedin --url https://... --body "..." --tags a,b`. Validates with NowEntry, generates id as `YYYY-MM-DD-slug`, prepends, writes the JSON with 2-space indent, prints the entry. Refuses duplicates by id. Defaults date to today, type to "note".
7. scripts/rss-plugin.ts: a Vite plugin with a `buildStart` hook that writes public/now.xml (RSS 2.0, title "Mehr Anand / Now", link {{DOMAIN}}/now, items with title, link, pubDate, description). Register it in vite.config.ts. Add public/now.xml to .gitignore since it is generated.
8. docs/overhaul/skills/now-entry.md: a prompt I can paste into any Claude chat along with a LinkedIn post's text and URL. It must instruct Claude to return exactly one JSON object matching NowEntry (include the schema inline), with type "linkedin", title as the post's first sentence trimmed to 120 chars, body as a 2-4 sentence summary in first person present tense with no exclamation points, tags from a fixed vocabulary (northeastern, claude-builders, general-atlantic, hackathon, speaking, data, ai, teens4teens, acm, personal), and nothing else in the response. Include one worked example.

Do not:
- Fetch anything from LinkedIn.
- Render entries without a date.

Acceptance criteria:
- `pnpm now "Test entry" --type note` adds an entry, `pnpm test` still passes, and running the same command again is refused.
- `pnpm build` produces public/now.xml that validates (run it through a quick XML parse in Node and report).
- /now shows month groups; Home shows exactly three items.
- Remove the test entry before committing. Commit "feat: now feed, authoring script, rss".
```

---

## Prompt 10: SEO, OG images, metadata

```
Read docs/overhaul/03-ARCHITECTURE.md sections 7 and 8, and docs/overhaul/04-CONTENT-INVENTORY.md section 1 for meta copy.

Task: per-route SEO, Open Graph image function, sitemap, robots, JSON-LD, favicons.

Do exactly this:
1. src/lib/seo.tsx: <Seo title description path image?> using react-helmet-async. Title format "{title} · Mehr Anand" except Home which is "Mehr Anand". Sets description, canonical ({{DOMAIN}}{path}), og:type website, og:title, og:description, og:url, og:image (default {{DOMAIN}}/api/og?title=...&sub=...), twitter:card summary_large_image, twitter:title, twitter:description, twitter:image. Add a <Seo> to every page with sensible copy (Home uses the meta description from 04 section 1).
2. api/og.tsx with @vercel/og: 1200x630, black ground, top-left two-tone wordmark in Funnel Display, title (from ?title, max 60 chars) in Funnel Display 64px --ink, sub (from ?sub, max 80 chars) in Geist Mono 24px --ink-faint, a 4px accent rule along the bottom, and the domain in mono bottom-right. Load fonts from public/fonts via fetch(new URL('../public/fonts/...', import.meta.url)). Cache-Control s-maxage=86400. Reject titles over 120 chars with 400.
3. Generate public/og-default.png by calling the function locally once (or via a Playwright screenshot of an HTML replica if the function cannot run locally) and use it as the fallback og:image in index.html.
4. index.html: static meta for Home (title, description, og:*, twitter:*), the Person JSON-LD from 03 section 8, theme-color, favicon links. Create public/favicon.svg (a 16x16 grid rendering of the letter M from the ASCII bitmap in accent on black), favicon.ico (32px, generated from the svg), apple-touch-icon.png (180px).
5. public/robots.txt (allow all, Sitemap: {{DOMAIN}}/sitemap.xml) and public/sitemap.xml listing /, /work, /projects, /leadership, /now with lastmod = build date. Generate sitemap.xml from the rss-plugin (rename it to scripts/static-gen-plugin.ts) so lastmod is always current.
6. A build-time constant BUILD_DATE via vite `define`, shown in the footer as "Last deployed {date}".

Do not:
- Add prerendering or SSR. Note in README that non-JS crawlers see the Home meta only, and that this is the accepted v1 trade-off.

Acceptance criteria:
- `curl -s http://localhost:3000/api/og?title=Work&sub=Mehr%20Anand -o /tmp/og.png` under `pnpm dev:vercel` yields a 1200x630 PNG; attach or describe it.
- View source of each route in `pnpm preview` and confirm the <title> and og:* tags change per route (Helmet updates the head client-side; check via Playwright page.title()).
- Validate JSON-LD with a JSON parse and confirm @type Person.
- Lighthouse SEO = 100 on /.
- Commit "feat: seo, og images, sitemap, favicons".
```

---

## Prompt 11: Images, motion pass, polish

```
Read docs/overhaul/02-DESIGN-SYSTEM.md sections 6, 7, 8, and 9. Read the current state of every page.

Task: add the headshot and any project images, apply the motion spec consistently, and do a visual polish pass against the design system.

Do exactly this:
1. Headshot: I will place the source image at src/assets/headshot.jpg (if it is missing, create a 480x480 placeholder that is a dashed-border square with the text "HEADSHOT" in mono, and tell me). Use vite-imagetools to emit AVIF and WebP at 320 and 480 px with explicit width/height, `loading="lazy"`, `decoding="async"`. Render in the Home about strip per section 8: 160px square, zero radius, grayscale at rest, color on hover and focus-within.
2. Motion audit: every Section uses the entrance pattern from section 6 via a shared <Reveal> wrapper (motion.div with the exact initial/whileInView/viewport/transition values). Grids stagger children at 0.06. Hero keeps its own sequence. Confirm useReducedMotion disables all of it. Remove any ad-hoc motion values that differ from the spec.
3. Polish checklist, fix each and report:
   - No element uses a color outside tokens.css (grep the CSS and TSX for `#[0-9a-f]{3,6}` and `rgb(` outside tokens.css; the only allowed exceptions are the hero gradient tokens and the api/og.tsx function).
   - No border-radius except pills. No box-shadow anywhere. (grep)
   - Headings never exceed 20ch; body never exceeds 64ch (check the CSS).
   - Every external link has rel="noopener noreferrer" and target="_blank" and a text "↗".
   - Every interactive element has a visible :focus-visible ring in accent.
   - Header blur applies only after scroll.
   - The footer "Last deployed" reads correctly.
   - No console errors or warnings in dev or preview across all routes.
4. Take full-page Playwright screenshots of every route at 375, 768, and 1440 px into test-results/screens/ and look at each one. Fix anything that looks broken (overflow, orphaned labels, misaligned rules, truncated mono text). Describe what you fixed.

Do not:
- Add new components or sections.
- Introduce hover transforms.

Acceptance criteria:
- The grep checks in step 3 return zero violations (paste the commands and their output).
- 15 screenshots exist and you have described each route at each width in two sentences.
- Lighthouse mobile on /, /work, /now: Performance >= 90, Accessibility 100, Best Practices 100, SEO 100. Paste the four numbers per route.
- Commit "feat: images, motion pass, polish".
```

---

## Prompt 12: Accessibility and performance audit

```
Read docs/overhaul/06-QA-CHECKLIST.md in full. Then run it.

Task: execute every item in the QA checklist, fix failures, and produce a report at docs/overhaul/QA-REPORT.md.

Do exactly this:
1. Install and run axe via @axe-core/playwright against every route at 375 and 1440 px. Zero violations at "serious" or "critical". Fix "moderate" ones too unless they are false positives; explain any you skip.
2. Keyboard walk on every route: Tab order is logical, nothing is unreachable, nothing traps except the mobile menu, Escape always works, focus is visible everywhere. Write a Playwright test that tabs through Home and asserts the focused element sequence for the first ten stops.
3. Screen reader sanity: the heatmap has a single accessible name and its cells are not individually announced (aria-hidden on cells, role="img" on the grid). Bracket buttons announce their text only. Eyebrows are not headings. Month labels on /now are headings (h2) so users can jump.
4. Color: recompute contrast for every text/background pair actually used (script it from tokens.css) and paste the table.
5. Performance: `pnpm build` and print the gzipped size of each chunk. Initial route JS must be under 120 KB gzipped; if not, find what is pulling weight (likely motion or lucide) and code-split or tree-shake it. Confirm the GitHub module is a separate chunk.
6. Fonts: confirm the three preload tags match the actual filenames and that no other font requests occur (check network in Playwright).
7. Lighthouse on every route, mobile and desktop. Table the eight scores per route.
8. Write docs/overhaul/QA-REPORT.md with: date, commit SHA, every checklist item with PASS/FAIL/FIXED, the contrast table, the bundle table, the Lighthouse table, and a "known gaps" list.

Do not:
- Lower any target to make it pass. If a target is unreachable, say why in "known gaps".

Acceptance criteria:
- QA-REPORT.md exists and has no FAIL rows (FIXED is fine).
- All tests pass in CI (push a branch and check the Actions run, or run the CI steps locally and say so).
- Commit "chore: a11y and perf audit, qa report".
```

---

## Prompt 13: Deploy, domain, redirects, GitHub profile

```
Read docs/overhaul/03-ARCHITECTURE.md section 9 and docs/overhaul/04-CONTENT-INVENTORY.md section 6.

Task: ship to production at {{DOMAIN}} and retire the old site.

Do exactly this, stopping to ask me before any step marked ASK:
1. Confirm the repo is pushed to GitHub as {{REPO_NAME}} on main with a green CI run.
2. ASK: Link the GitHub repo to the existing Vercel project {{VERCEL_PROJECT}}. If you have the Vercel MCP or CLI available, do it; otherwise give me the exact dashboard clicks. Framework preset Vite, build `pnpm build`, output `dist`, install `pnpm install --frozen-lockfile`.
3. ASK: Add GITHUB_TOKEN to Vercel env for Production and Preview. I will paste the token into the dashboard myself; tell me exactly where. Never ask me to paste it into this chat.
4. Trigger a production deploy. Verify: {{DOMAIN}} serves the site, {{DOMAIN}}/work hard-refreshes without 404, {{DOMAIN}}/api/github returns JSON with the cache header, {{DOMAIN}}/api/og?title=Test returns a PNG, {{DOMAIN}}/now.xml and /sitemap.xml exist, and https://www.{{DOMAIN without scheme}} redirects to the apex (or vice versa, whichever Vercel is configured for; report which).
5. Old site: in the mesanand/mesanand.github.io repo, replace index.html with a page containing `<meta http-equiv="refresh" content="0; url={{DOMAIN}}/">`, a `<link rel="canonical" href="{{DOMAIN}}/">`, a JS `location.replace`, and a one-line fallback link. Replace portfolio.html the same way pointing at {{DOMAIN}}/work. Keep the headshot file so nothing 404s. ASK before pushing to that repo.
6. GitHub profile: write the contents for a mesanand/mesanand profile README per 04 section 6 and print the new bio, company, location, and website field values for me to paste. ASK before creating the repo. Also list which repos to pin.
7. Post-deploy checks: run Lighthouse against the live {{DOMAIN}} (mobile) and paste scores. Share the URL with the LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/) and iMessage-style preview logic: fetch {{DOMAIN}} with a non-JS user agent and confirm og:title, og:description, og:image are present in the raw HTML.
8. Update README.md with the production URL and a "How to update content" section that lists: edit src/content/*.ts, run pnpm now for feed entries, push to main, wait ~40 s.

Do not:
- Print or log the GITHUB_TOKEN anywhere.
- Delete the old GitHub Pages repo.

Acceptance criteria:
- All checks in step 4 and 7 pass; paste evidence.
- The old URLs redirect within one second.
- Commit "chore: production deploy notes and content update guide" and tag v1.0.0.
```

---

## Later prompts (not part of v1; keep for when you want them)

- **P14 Prerender**: add `vite-plugin-prerender` (or a Playwright-based script) to emit static HTML for the five routes so non-JS crawlers and link previews see per-route meta.
- **P15 Writing**: MDX blog under `/writing` using `@mdx-js/rollup`, content collection pattern mirrors `now.json`.
- **P16 Light theme**: `data-theme="light"` token block per 02 section 2.4, toggle in header, respects `prefers-color-scheme`.
- **P17 Auto-post**: Zapier/Make watches `/now.xml` and cross-posts new entries to LinkedIn as drafts.
- **P18 Resume from content**: generate `resume.pdf` at build from the same content files with `react-pdf`, so the PDF and the site can never disagree.
