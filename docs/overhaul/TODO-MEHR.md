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
