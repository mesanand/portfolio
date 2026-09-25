# TODO(mehr)

What the build still needs from you. `07-ANSWERS.md` (updated 2026-09-25) answered most of the original questions; this list is only what is still open after applying it.

Each item points at the file where the answer goes. `grep -rn "TODO(mehr)" src` lists every open item in code.

## Before launch

- [ ] **Resume PDF.** Put the current resume at `public/resume.pdf`. The header `[ RESUME ]` button links there and 404s until the file exists. (`src/content/site.ts`)
- [ ] **NYC Network Connector start month.** Set to `2026-08`, a guess from the LinkedIn post date. (`src/content/experience.ts`)
- [ ] **PEVC start month.** Set to `2026-01`, a guess. (`src/content/leadership.ts`)
- [ ] **Five "LinkedIn post" feed entries.** They ship as bare links with an empty body, as agreed in 07 section 5. Replace the title and body when you have them. (`src/content/now.json`)

## Open questions carried from 07

- [ ] **Campus Nutrition Assistant repo.** The repo in 07 (`github.com/Sadfahlsdj/wafflehacks_june_2024`) returns 404, and neither account has a matching public repo. Is it private or renamed? The cell links to Devpost only until a public `repo` URL is added. (`src/content/projects.ts`)
- [ ] **Cosint.** The year (2024) is a best guess. If you don't recognize the project after watching the video, cut it. (`src/content/projects.ts`)
- [ ] **"Eight so far" in the /leadership lede.** Prompt 7 specifies this line. The number matches the founder and co-founder roles in the data (Claude Builders Club, four at Oakland, three in high school), but 07 took the club count out of the about strip. Confirm it or cut the sentence. (`src/pages/Leadership.tsx`)

## Notes on decisions made during the build

- Brewster, General Atlantic, and Teens4Teens link to the homepages given in 07. Dana-Farber has no link because 07 lists none.
- Sort order is newest first everywhere, as the spec says. That puts the NYC Network Connector (Aug 2026) above General Atlantic (Jul 2026) on `/work`, and ACM (May 2026) above Claude Builders Club (Sep 2025) in the leadership headline cells. Ask for a pinned order if General Atlantic or CBC should lead.
- The Claude Builders Club summary in 07 is about 300 characters, over the schema's 260 limit. It is reworded to exactly 260 with every fact kept. Rev's "(Northeastern student entrepreneurship)" moved from the org name into its summary.
- Buildspace is filed under the Boston era because 07 lists it in the Boston table.
- Pistachio has no stack chips because 07 lists none. Its year (2025) is still marked "(guess)" in 07 section 3, but section 7 no longer asks you to confirm it, so there is no code TODO for it.
- The X link card uses a generic "@" icon. lucide-react 1.x ships no brand logos, and its `X` icon is a close button.
- `src/assets/headshot.jpg` is a byte-for-byte copy of `docs/overhaul/assets/headshot.jpg` (6.9 MB, 6000x4000). Prompt 11 crops it and generates the 320/480 AVIF and WebP files. Both copies are in git for now; once prompt 11 has run, consider removing the docs copy or moving the originals out of the repo.
