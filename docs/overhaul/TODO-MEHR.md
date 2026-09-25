# TODO(mehr)

What the build still needs from you. `07-ANSWERS.md` (including its section 9, the decisions from our chat) holds everything already answered; this is only what's still open.

`grep -rn "TODO(mehr)" src` lists every open item in code.

## Before launch

- [ ] **Resume PDF.** Put the current resume at `public/resume.pdf`. The header `[ RESUME ]` button links there and 404s until the file exists. (`src/content/site.ts`)
- [ ] **Review the Highlights (`/highlights`).** Seven were added from what's public: the Khoury 2026 convocation article, two Northeastern Global News articles (2024 Experiential Treks, where you're quoted; 2023 move-in photos), and four of your LinkedIn posts. Delete any you don't want from `src/content/highlights.json`. The two older NGN thumbnails are the articles' own preview photos and don't show you; swap one with `pnpm highlight <url> --image your-photo.jpg` after deleting its entry. LinkedIn titles are your posts' first sentences, exclamation points included.
- [ ] **NYC Network Connector start month.** Set to `2026-08`, a guess from the LinkedIn post date. (`src/content/experience.ts`)
- [ ] **PEVC start month.** Set to `2026-01`, a guess. (`src/content/leadership.ts`)
- [ ] **Cosint year.** 2024 is a guess from the repo. (`src/content/projects.ts`)

## Open questions


- [ ] **Brewster dates.** The site says Jul 2024 to Dec 2024 (from 07; 04 called the old site's "July 2025" a mistake). But your LinkedIn post from Jul 7, 2025 announces you're *joining* Brewster as a co-op, which points to Jul to Dec 2025. Which is right? (`src/content/experience.ts`; the Selected work order changes if it's 2025.)
- [ ] **Internship post left out of Highlights.** Your most commented post (1,432 comments, May 2025) is a Summer 2025 call for Teens4Teens interns; most comments are "intern" replies to get the link. I left it off because it reads as an expired job ad. Say the word to add it: `pnpm highlight "https://www.linkedin.com/feed/update/urn:li:activity:7330600497734660097/"`.

- [ ] **Campus Nutrition Assistant repo.** The repo in 07 (`github.com/Sadfahlsdj/wafflehacks_june_2024`) returns 404. Is it private or renamed? The card links to Devpost only until a public `repo` URL is added. (`src/content/projects.ts`)
- [ ] **"Eight so far" in the /leadership lede.** Prompt 7 specifies this line. Merging the Oakland AI Club into AINU doesn't change the founder count (Claude Builders Club, four at Oakland, three in high school), but 07 took the club count out of the about strip. Confirm or cut. (`src/pages/Leadership.tsx`)
- [ ] **Company logos** for General Atlantic and Brewster in Selected work. Parked until you're ready; my recommendation is a single light color so they match the black-and-gold look.
- [ ] **GitHub private contributions.** Your public calendar shows 33 contributions in the past year. If most of your work is in private repos, turn on GitHub → Settings → Profile → "Include private contributions on my profile" and the heatmap will show those days too (counts only, no repo names).

## Notes on decisions made during the build

- Sort order is newest first everywhere, as the spec says. That puts the NYC Network Connector (Aug 2026) above General Atlantic (Jul 2026) on `/work`, and ACM (May 2026) first among the leadership cards. Ask for a pinned order if you want General Atlantic or Claude Builders Club to lead.
- Two summaries were reworded to fit the 260-character limit with every fact kept: Claude Builders Club, and AINU (merged from your three bullets).
- The X link card uses a generic "@" icon. lucide-react 1.x ships no brand logos, and its `X` icon is a close button.
- Photos: the headshot is a 960px square crop of `docs/overhaul/assets/headshot.jpg`. Job photos are square crops and highlights are 4:3 crops, all in `src/assets/`. The build makes AVIF and WebP copies in a few sizes, so visitors download 10 to 60 KB per photo. The originals you sent are not in the repo. The 6.9 MB headshot original is still in `docs/`; delete it from git if you want a lighter repo.
- `.env.local` lives at the project root, not in `docs/overhaul/`. It's gitignored, and the token never reaches the browser.
