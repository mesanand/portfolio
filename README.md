# mehr-anand.com

Personal portfolio for Mehr Anand: experience, projects, leadership, a hand-maintained "now" feed, and a live GitHub module. Static React site on Vercel with two small serverless functions (a GitHub data proxy and an Open Graph image generator).

The full spec (design system, architecture, content inventory, build prompts, QA checklist) lives in [docs/overhaul/](docs/overhaul/00-README.md).

## Stack

Vite 6, React 19, TypeScript, react-router v7 (library mode), `motion`, zod, plain CSS with custom properties. No CSS framework, no SSR. See [03-ARCHITECTURE.md section 1](docs/overhaul/03-ARCHITECTURE.md#1-stack).

## Running it

Requires Node 22 and pnpm.

```sh
pnpm install
pnpm dev          # dev server
pnpm build        # typecheck + production build to dist/
pnpm preview      # serve dist/
pnpm typecheck
pnpm lint
pnpm format
pnpm test         # vitest (content schema tests, unit tests)
pnpm test:e2e     # playwright (builds, then runs against preview)
```

## The GitHub module and `/api`

The Home "Commits, in public" section reads `/api/github`, a serverless function (`api/github.ts`) that calls GitHub with a server-side token and returns one cached JSON. The token never reaches the browser.

- **Local:** put `GITHUB_TOKEN=github_pat_...` in `.env.local` at the project root (gitignored). `pnpm dev` and `pnpm preview` serve `/api/github` themselves, through a small Vite plugin in `vite.config.ts` that runs the same handler, so there's no need for the Vercel CLI or `vercel dev`. Without a token the module shows its one-line error state and the rest of the page is unaffected.
- **Production:** Vercel runs `api/github.ts` as a Node function. Set `GITHUB_TOKEN` in the Vercel project's environment variables (Production and Preview). Responses are CDN-cached for 15 minutes.
- **Token:** fine-grained, public repositories, read-only, with an expiry of at most a year. Put the expiry date in your calendar.

## Where content lives

All site copy is data, never JSX. Edit the typed modules in `src/content/` (`site.ts`, `experience.ts`, `projects.ts`, `leadership.ts`, `life.ts`, `highlights.json`). Every file is validated with zod at build time, so a bad entry fails the build instead of rendering blank. Schemas and rules: [03-ARCHITECTURE.md section 4](docs/overhaul/03-ARCHITECTURE.md#4-content-model).

## Adding a highlight (articles, posts, photos)

```sh
pnpm highlight https://news.northeastern.edu/...            # an article
pnpm highlight https://www.linkedin.com/posts/...           # one of your posts
pnpm highlight <url> --title "..." --note "..." --image my-photo.jpg   # override anything
pnpm highlight --photo my-photo.jpg --title "..."           # a photo with no link
```

The script reads the page's preview data once (title, date, site, preview image), saves the image as a 1200x630 thumbnail in `src/assets/highlights/`, and adds an entry to `src/content/highlights.json`. LinkedIn posts are titled with the post's first sentence. The site never loads anything from the original page, so a link that later changes keeps its thumbnail. `/highlights` shows everything, newest first; Home shows the three newest. Edit or delete entries in the JSON directly.

## Slice of my life (the Home photo carousel)

Drop a photo into `src/assets/life/` (4:3 works best), then add an entry to `src/content/life.ts` with its filename, a title, a caption, and alt text. Order in the file is the order on the page.
