# mehr-anand.com Overhaul Pack

This folder is the complete plan for replacing `mesanand.github.io` with a new portfolio at `mehr-anand.com`. Nothing in here is code. It is the autopsy of the old site, the design system we are stealing from `claudeneu.com/hackathon`, the architecture for the new build, the content inventory that needs your sign-off, and thirteen copy-paste prompts you can hand to Claude Code (or a Cowork session) one at a time to build the thing.

## Decisions already locked (from our conversation)

| Decision | Choice |
|---|---|
| Hosting | Vercel, at `mehr-anand.com` (already provisioned on your Vercel account) |
| Starting point | Fresh repo. The `myportfolio` create.xyz Next.js template and the old `mesanand.github.io` HTML are both retired |
| Stack | Vite + React + TypeScript + Framer Motion, hand-written CSS with tokens (same as the HACK1984 site) |
| Aesthetic | Same visual grammar as HACK1984 (black ground, mono labels, dashed rules, bracket CTAs, ASCII texture) with your own accent color instead of red |
| "Live LinkedIn" | Manual `/now` feed backed by a JSON file you (or a Claude skill) append to. No scraping |
| "Live GitHub" | Real. Vercel serverless function hits GitHub GraphQL + REST, cached 15 min, renders contribution heatmap, latest commits, latest repos |

## The files

| File | What it is | Read it when |
|---|---|---|
| `01-AUTOPSY.md` | Why the current site fails, section by section, with severity | You want the argument for why this is a rebuild and not a facelift |
| `02-DESIGN-SYSTEM.md` | Every token, type style, spacing unit, and component spec, plus the accent color decision | Before prompt 2, and any time a build prompt asks "what should this look like" |
| `03-ARCHITECTURE.md` | Stack, folder layout, routing, content model, GitHub API pipeline, now-feed schema, OG images, SEO, deploy | Before prompt 1, and before prompts 8 through 13 |
| `04-CONTENT-INVENTORY.md` | Every entry from the old site reconciled against what is actually true in September 2026, rewritten in the new voice, with a list of blanks only you can fill | Before prompt 5. You need to answer the NEEDS-MEHR items before the content gets typed into the codebase |
| `05-BUILD-PROMPTS.md` | Thirteen sequential prompts. Each one is self-contained, names the files it may touch, and ends with acceptance criteria | During the build. One prompt per Claude session, in order |
| `06-QA-CHECKLIST.md` | Lighthouse targets, a11y, breakpoints, link checks, the recruiter 10-second test | After prompt 12, and again before you tell anyone the URL |

## Order of operations

1. Read `01-AUTOPSY.md` once so the "why" is loaded.
2. Read `02-DESIGN-SYSTEM.md` and pick your accent (section 3). Default is gold. Write the hex in the box at the top of `05-BUILD-PROMPTS.md`.
3. Fill in the NEEDS-MEHR blanks in `04-CONTENT-INVENTORY.md`. This is the only part of the pack that requires you and not Claude. Budget 30 minutes.
4. Create the empty GitHub repo `mehr-anand/mehr-anand.com` (or whatever you call it) and link it to the existing Vercel project.
5. Run prompts 1 through 13 from `05-BUILD-PROMPTS.md`, one per session. Each prompt tells the next session what "done" looks like, so you can verify before moving on.
6. Run `06-QA-CHECKLIST.md`.
7. Point `mesanand.github.io` at the new domain with a redirect (prompt 13 covers it).

## How to use the prompts

Each prompt in `05-BUILD-PROMPTS.md` is written to be pasted verbatim into a fresh Claude Code session opened at the repo root. They assume the previous prompt finished and its acceptance criteria passed. If a prompt fails halfway, paste the same prompt again with "Continue from where the last session stopped; here is `git status` and the last error:" at the top.

Prompt runs must also read `07-ANSWERS.md`, which holds Mehr's resolved content and overrides `04-CONTENT-INVENTORY.md`. Prompts reference the other docs by file name. Keep this whole `docs/overhaul/` folder inside the repo so Claude Code can `Read` them. They cost almost nothing in context and save you re-explaining the design every session.

## What is deliberately not in this pack

Nothing about a blog, a CMS, auth, a contact form backend, or a light theme. Those are all "later" and the architecture leaves room for them, but none of them help a recruiter or a founder in the first ten seconds, which is the only thing the first launch is optimizing for.
