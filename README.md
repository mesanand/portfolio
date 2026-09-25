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

Copy `.env.example` to `.env.local` and fill `GITHUB_TOKEN` when working on the GitHub module. Never commit a token.

## Where content lives

All site copy is data, never JSX. Edit the typed modules in `src/content/` (`site.ts`, `experience.ts`, `projects.ts`, `leadership.ts`, `highlights.ts`). Every file is validated with zod at build time, so a bad entry fails the build instead of rendering blank. Schemas and rules: [03-ARCHITECTURE.md section 4](docs/overhaul/03-ARCHITECTURE.md#4-content-model).

## Adding a highlight

The Home page carousel (which replaced the planned `/now` feed) reads `src/content/highlights.ts`. Drop a photo into `src/assets/highlights/` (4:3 works best; the build makes AVIF and WebP sizes), then add an entry with its filename, a title, a caption, and alt text. Order in the file is the order on the page.
