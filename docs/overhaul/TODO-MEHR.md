# TODO(mehr)

What the build still needs from you. Most of the original questions were answered in `07-ANSWERS.md`; this list is only what is still open after applying it.

Each item points at the file where the answer goes. `grep -rn "TODO(mehr)" src` lists every open item in code.

## Site-level (`src/content/site.ts`)

- [ ] **Resume PDF.** Put the current resume at `public/resume.pdf` before launch. The header `[ RESUME ]` button links there and 404s until the file exists.

## Experience (`src/content/experience.ts`)

- [ ] **NYC Network Connector start month.** Set to `2026-08`, a guess from the LinkedIn post date. Fix if wrong.

## Notes on decisions made during the build

- Brewster and General Atlantic keep their homepage links from `07-ANSWERS.md`. Dana-Farber has no link because 07 lists none.
- On `/work`, current roles are ordered by start date, newest first, as the spec says. That puts the NYC Network Connector (Aug 2026) above General Atlantic (Jul 2026). Home's "Selected work" only shows featured roles, so General Atlantic still leads there. To put General Atlantic first on `/work`, change its start date or ask for a pinned sort.
- The X link card uses a generic "@" icon. lucide-react 1.x ships no brand logos, and its `X` icon is a close button.

## Projects (`src/content/projects.ts`)

- [ ] **Campus Nutrition Assistant repo.** The repo in 07 (`github.com/Sadfahlsdj/wafflehacks_june_2024`) returns 404, and neither account has a matching public repo. Is it private or renamed? The cell links to Devpost only until a public `repo` URL is added.
- [ ] **Cosint.** The year (2024) is a best guess. If you don't recognize the project after watching the video, cut it.
- [ ] **Pistachio.** Cut, because no YouTube URL was in 07 before prompt 6. To bring it back, add the video URL and re-add the entry from 07 section 3.

## Leadership (`src/content/leadership.ts`, `src/pages/Leadership.tsx`)

- [ ] **"Eight so far" in the /leadership lede.** Prompt 7 specifies this line. The number matches the founder and co-founder roles in the data (Claude Builders Club, four at Oakland, three in high school), but 07 took the club count out of the about strip. Confirm it or cut the sentence.
- [ ] **PEVC start month.** `2026-01` is a guess.
- [ ] **AINU end month.** `2026-05` is a guess.
- [ ] **Kaleidoscope end month.** `2026-05` is a guess.
- Note: the Claude Builders Club summary in 07 was about 300 characters, over the schema's 260 limit. It is reworded to exactly 260 with every fact kept (150+ at kickoff, 200+ now, 78 campuses, HACK1984 36 hours / 100 seats / Boston / Nov 6-8 2026, co-organized with Rev, ACM, and AINU). Rev's "(Northeastern student entrepreneurship)" moved from the org name into its summary.
- Note: headline cells sort newest first as the spec says, so ACM (May 2026) sits above Claude Builders Club (Sep 2025). Ask for a pinned order if CBC should lead.

## Still on you from 07 section 7 (not code TODOs)

- [ ] Replace the five "(Mehr: fill in)" now-feed entries with real titles and bodies. They land in prompt 9, which hasn't run yet.
- [ ] The headshot is in `docs/overhaul/assets/headshot.jpg`. Prompt 11 crops and optimizes it. The 6.9 MB original is committed to the repo; consider moving it out of git once prompt 11 has used it.
