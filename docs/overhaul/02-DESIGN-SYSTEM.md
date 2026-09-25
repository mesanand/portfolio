# 02. Design System

Derived by reading the live CSS of `claudeneu.com/hackathon` (`assets/index-C3OSiX7_.css`, 29 KB, hand-written, no Tailwind) and its `:root` custom properties, then adapted for a personal site instead of an event site. Where this document differs from HACK1984 it says so.

Everything here is prescriptive. Prompts 2 through 12 in `05-BUILD-PROMPTS.md` cite this file by section number.

---

## 1. Principles (the grammar we are borrowing)

1. **One hue.** The whole site is a black-to-white luminance ladder plus exactly one accent. If something is not on the ladder and is not the accent, it does not exist.
2. **Lines, not shadows.** Regions are separated by 1px solid or 1px dashed rules. There are no box shadows anywhere. There is one radial glow, and it lives in the hero only.
3. **Zero radius.** Every box is square. The only rounded things are pill-shaped chips (`999px`) and nothing else.
4. **Mono for metadata.** Every label, eyebrow, date, tag, button, and nav item is Geist Mono, uppercase, tracked. Everything you read as a sentence is Funnel Sans. Everything that is a headline is Funnel Display.
5. **Brackets are buttons.** A CTA is `[ TEXT ]` in mono. No fills, no borders, no radius. Hover changes color to the accent, nothing moves.
6. **Texture is earned.** ASCII and scanline textures appear in the hero and as section dividers. They never sit behind body text.
7. **Motion is entrance-only.** Things fade and rise in once on scroll. Nothing loops, nothing follows the cursor, nothing parallaxes. `prefers-reduced-motion` turns all of it off.
8. **Left-aligned, always.** The hero is the only centered thing on the site. Section headings, body, cards, and lists are flush left against a shared gutter.

---

## 2. Color tokens

### 2.1 The ladder (copied verbatim from HACK1984)

```css
:root {
  --ground:      #000000;  /* page background */
  --surface:     #0a0a0a;  /* cards, feed items */
  --surface-2:   #141414;  /* card hover, code blocks, nested surfaces */
  --line-soft:   #1a1a1a;  /* solid hairlines between grid cells */
  --chip-bg:     #262626;  /* chip fill, header bottom rule (dashed) */
  --dash:        #404040;  /* dashed borders on cards */
  --line:        #606060;  /* dashed border on hover, stronger rules */
  --ink-faint:   #808080;  /* eyebrows, fact keys, disabled */
  --ink-body:    #a3a3a3;  /* paragraphs, descriptions */
  --ink:         #e6e6e6;  /* headings, primary text */
  --white:       #ffffff;  /* buttons only */
}
```

Contrast (WCAG, against `--ground` / `--surface`): `--ink` 16.8 / 15.9, `--ink-body` 8.3 / 7.9, `--ink-faint` 5.3 / 5.0. All pass AA; `--ink-faint` is reserved for text at 11px+ mono uppercase, which is the one place 5:1 is comfortable.

### 2.2 Accent (yours, not HACK1984's)

HACK1984 uses `--accent: #ff3b2f` (5.9:1 on black) with `--accent-soft`, `--red-900`, `--red-chip-text`, and a six-step `--ascii-0..6` ramp for the ASCII mark. Your site needs the same slot structure with a different hue. Three candidates, contrast computed against `#000` / `#0a0a0a` / `#141414`:

| Candidate | Hex | On `#000` | On `#0a0a0a` | On `#141414` | Black text on it | Read |
|---|---|---|---|---|---|---|
| **Gold (recommended)** | `#ffb02e` | 11.5 | 10.8 | 10.1 | 11.5 | Warm, expensive, reads as "finance meets terminal". Pairs with black the way a Bloomberg keyboard does. Not red, not the generic blue every dev portfolio uses. |
| Electric blue | `#5b9cff` | 7.6 | 7.2 | 6.7 | 7.6 | Safe, readable, but this is the accent of half of GitHub-themed portfolios. |
| Acid green | `#b6ff3b` | 17.4 | 16.4 | 15.2 | 17.4 | Maximum terminal energy. Loud. Could read as "crypto" to a PE audience. |

Recommendation: **gold `#ffb02e`**. It keeps the "expensive black site" feeling of HACK1984 but drops the dystopia, and it flatters a General Atlantic / PE-curious reader without being the boring blue. If you disagree, swap one hex in `tokens.css` and the six-step ramp below; nothing else changes.

Full accent slot set for gold:

```css
:root {
  --accent:          #ffb02e;
  --on-accent:       #000000;
  --accent-soft:     #1a1204;   /* accent at ~6% over black, used for hover wash */
  --accent-900:      #3d2a06;   /* deep tint for highlight gradient */
  --accent-chip-text:#ffd27a;   /* lighter accent for text on --accent-soft chips */
  --wordmark-accent: #d9921a;   /* slightly darker for the logo mark second half */

  --hero-gradient:      linear-gradient(0deg, #1c1302 0%, #100b01 35%, #050300 70%, #000 100%);
  --highlight-gradient: linear-gradient(90deg, #7a5307 0%, #3d2a06 45%, #0a0700 85%);

  /* ASCII mark ramp, dark to light. Used by the hero mark and dividers. */
  --ascii-0: #3a2707;
  --ascii-1: #4a3208;
  --ascii-2: #7e560c;
  --ascii-3: #c08514;
  --ascii-4: #ffb02e;
  --ascii-5: #ffc966;
  --ascii-6: #ffe6b8;
}
```

The hero radial glow in HACK1984 is `radial-gradient(closest-side, rgba(255,59,47,.3), rgba(160,20,12,.14) 55%, transparent)`. Ours: `radial-gradient(closest-side, rgba(255,176,46,.28), rgba(160,100,12,.12) 55%, transparent)`.

### 2.3 Semantic aliases

So components never reference raw ladder steps:

```css
:root {
  --bg-page: var(--ground);
  --bg-card: var(--surface);
  --bg-card-hover: var(--surface-2);
  --border-card: var(--dash);
  --border-card-hover: var(--line);
  --border-grid: var(--line-soft);
  --text-heading: var(--ink);
  --text-body: var(--ink-body);
  --text-meta: var(--ink-faint);
  --text-link: var(--ink);
  --text-link-hover: var(--accent);
  --focus-ring: var(--accent);
}
```

### 2.4 Light mode

Not in v1. The grammar depends on black. If a light mode is ever added, it is a second `:root[data-theme="light"]` block that inverts the ladder (`--ground: #f4f4f2`, `--ink: #111`) and darkens the accent to `#b8760a` for contrast. The components will not need to change because they only touch aliases.

---

## 3. Typography

### 3.1 Faces

Self-hosted woff2, variable, `font-display: swap`. Same three as HACK1984. Download from Google Fonts (Funnel Sans, Funnel Display, both OFL) and Vercel (Geist Mono, OFL). Put them in `public/fonts/`.

```css
@font-face { font-family: "Funnel Display"; font-weight: 300 800; font-display: swap; src: url(/fonts/FunnelDisplay-300-800.woff2) format("woff2"); }
@font-face { font-family: "Funnel Sans";    font-weight: 300 800; font-display: swap; src: url(/fonts/FunnelSans-300-800.woff2)    format("woff2"); }
@font-face { font-family: "Geist Mono";     font-weight: 100 900; font-display: swap; src: url(/fonts/GeistMono-100-900.woff2)     format("woff2"); }

:root {
  --font-display: "Funnel Display", "Funnel Sans", ui-sans-serif, system-ui, sans-serif;
  --font-sans:    "Funnel Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono:    "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

Preload all three in `index.html` with `<link rel="preload" as="font" type="font/woff2" crossorigin>`. Budget: the three files total roughly 180 KB; that is acceptable and there is no fourth font.

### 3.2 Scale

Base 16px / 24px line height on body (matches HACK1984 computed `body`). Fluid where noted.

| Token | Face | Size | Line | Weight | Tracking | Case | Use |
|---|---|---|---|---|---|---|---|
| `--t-hero` | Display | `clamp(44px, 7vw, 96px)` | 0.95 | 700 | -0.02em | none | Hero name, one per site |
| `--t-h1` | Display | `clamp(32px, 4.5vw, 56px)` | 1.05 | 600 | -0.015em | none | Page titles |
| `--t-h2` | Display | `clamp(24px, 3vw, 36px)` | 1.15 | 600 | -0.01em | none | Section headings |
| `--t-h3` | Sans | 20px | 28px | 600 | 0 | none | Card titles, role titles |
| `--t-body` | Sans | 16px | 24px | 400 | 0 | none | Paragraphs |
| `--t-body-sm` | Sans | 15px | 23px | 400 | 0 | none | Card descriptions (matches `.hk-track__fact-value`) |
| `--t-lead` | Sans | `clamp(18px, 2vw, 22px)` | 1.45 | 400 | 0 | none | Hero subline, intro paragraphs |
| `--t-eyebrow` | Mono | 11px | 20px | 600 | 0.10em | upper | Section eyebrows, fact keys (matches `.hk-track__fact-key`) |
| `--t-label` | Mono | 12px | 20px | 500 | 0.12em | upper | Nav, small buttons (`.hk-btn.hk-sm`) |
| `--t-btn` | Mono | 15px | 48px min-height | 500 | 0.12em | upper | Primary bracket buttons (`.hk-btn`) |
| `--t-meta` | Mono | 13px | 20px | 400 | 0.04em | none | Dates, commit SHAs, timestamps |
| `--t-chip` | Mono | 11px | 18px | 500 | 0.08em | upper | Tech chips |

Rules: headings never exceed `max-width: 20ch`. Body never exceeds `max-width: 64ch`. Hero subline `max-width: 44ch`.

---

## 4. Spacing, layout, rules

### 4.1 Spacing scale (verbatim from HACK1984)

```css
--space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
--space-6: 24px; --space-8: 32px; --space-12: 48px; --space-24: 96px; --space-40: 160px;
```

### 4.2 Page grid

```css
--gutter: clamp(20px, 6vw, 160px);   /* HACK1984 uses clamp(40px, 9vw, 260px); ours is tighter for a content site */
--content-max: 1200px;
--section-pad: clamp(80px, 12vw, 160px);   /* vertical space between sections */
--heading-gap: clamp(32px, 5vw, 56px);     /* space between section heading block and its content */
```

Page = `padding-inline: var(--gutter)`, inner `max-width: var(--content-max); margin-inline: auto`. Full-bleed sections (hero, footer, dividers) use a `.bleed` utility that negative-margins out of the gutter.

### 4.3 Rules

```css
--rule-hair: 1px;
--rule-focus: 2px;
--radius-none: 0;
--radius-pill: 999px;
```

Solid `--line-soft` rules separate cells in a grid (experience list, project grid). Dashed `--dash` rules outline standalone cards (feed items, link cards). Dashed `--chip-bg` rule under the header. Nothing else has a border.

### 4.4 Breakpoints

- `>= 1024px` desktop: two-column grids, sidebar fact-grids.
- `640px to 1023px` tablet: single column, grids stack, gutters shrink.
- `< 640px` phone: hero type drops to the clamp minimum, nav collapses to a `[ MENU ]` bracket button that opens a full-screen list, heatmap scrolls horizontally inside a container.

---

## 5. Components

Each component lists: purpose, anatomy, tokens, states, and where it differs from HACK1984.

### 5.1 Header

- 80px tall, `border-bottom: 1px dashed var(--chip-bg)`, transparent background, sticky with `backdrop-filter: blur(8px)` and `background: rgba(0,0,0,.72)` once scrolled past 40px.
- Left: wordmark. Two-tone text mark in Display 700, 20px, tracking -0.02em: `MEHR` in `--ink`, `ANAND` in `--wordmark-accent`. Mirrors `HACK1984` (white + red).
- Center/right: nav items in `--t-label` mono: `WORK`, `PROJECTS`, `LEADERSHIP`, `NOW`, then a primary `[ RESUME ]` bracket button that opens the PDF in a new tab. Active route gets `color: var(--ink)`; others `--ink-faint`; hover `--accent`.
- Phone: nav hides, `[ MENU ]` appears, opens a full-screen `--ground` overlay with the same links in `--t-h2`.

### 5.2 Bracket button (`.btn`)

Straight port of `.hk-btn`.

```css
.btn { display:inline-flex; align-items:center; min-height:48px; font:500 15px/1 var(--font-mono); letter-spacing:.12em; text-transform:uppercase; color:var(--white); background:none; border:0; padding:0; cursor:pointer; white-space:nowrap; text-decoration:none; }
.btn::before { content:"["; margin-right:10px; }
.btn::after  { content:"]"; margin-left:10px; }
.btn:hover, .btn:focus-visible { color: var(--accent); }
.btn:focus-visible { outline: var(--rule-focus) solid var(--accent); outline-offset: 4px; }
.btn--sm { font-size:12px; min-height:44px; }
.btn--secondary { color: var(--ink-body); }
```

No filled button exists in v1. If a filled variant is ever needed it is `background: var(--accent); color: var(--on-accent); padding: 0 20px` and still zero radius.

### 5.3 Eyebrow + heading block (`.section-head`)

Every section starts with this. Eyebrow in `--t-eyebrow` `--ink-faint`, then heading in `--t-h2` `--ink`, optional one-line lede in `--t-body` `--ink-body`. Left-aligned. Gap between eyebrow and heading: `--space-3`. HACK1984 draws eyebrows as `FIND US` inside a bordered box in the screenshot; we use a plain eyebrow plus an optional `--accent` two-character prefix like `//` or `01`.

### 5.4 Link card (`.link-card`)

Port of `.hk-find__card`. Used for socials on the home page and for "elsewhere" links on the footer.

```
[icon 20px] TITLE (mono label, --ink)          ↗ (mono, --ink-faint)
            subtitle (sans 13px, --ink-body)
```
`background: var(--surface); border: 1px dashed var(--dash); padding: 14px 16px; transition: background-color .12s, border-color .12s`. Hover/focus: `background: var(--surface-2); border-color: var(--line)`, arrow becomes `--ink`. Grid of 2 on desktop, 1 on phone, `gap: 12px`.

### 5.5 Grid cell card (`.cell`)

Port of `.hk-track`. Used for projects and for leadership roles. Cards sit in a CSS grid with `gap: 0` and share hairline borders so the grid reads as one ruled table:

```css
.cells { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:0; }
.cell  { display:flex; flex-direction:column; gap:var(--space-8); padding:32px 24px 40px; border-left:1px solid var(--line-soft); border-top:1px solid var(--line-soft); }
.cell:nth-child(2n) { border-right:1px solid var(--line-soft); }
.cell:nth-child(n+3) { border-bottom:1px solid var(--line-soft); }
```
Anatomy: index label (`01`, `02` in `--t-eyebrow` `--accent`), title `--t-h3`, description `--t-body-sm`, then a fact list (5.6), then a chip row (5.8) with an outbound `[ VIEW ]` bracket on the right.

### 5.6 Fact list (`.facts`)

Port of `.hk-track__facts`. A key/value grid: `grid-template-columns: 96px minmax(0,1fr); gap: 16px; align-items: baseline`, keys in `--t-eyebrow` `--ink-faint`, values in `--t-body-sm` `--ink-body`, separated from the description above by `padding-top: 20px; border-top: 1px dashed var(--chip-bg)`. Use for `ROLE / WHEN / STACK / OUTCOME` on experience, `BUILT / WON / STACK` on projects.

### 5.7 Experience row (`.xp-row`)

New (HACK1984 has no timeline). Replaces the alternating timeline. A single-column list, each row a 3-column grid on desktop:

```
[ 2026 JUL to DEC ]   General Atlantic                      Data Warehouse Management Engineer Co-op
mono meta, --ink-faint   --t-h3 --ink, NYC in --ink-faint    --t-body-sm --ink-body
                        two to three bullet lines in --t-body-sm, max 64ch
                        chip row: Azure Data Factory / Databricks / dbt / MCP
```
`grid-template-columns: 160px minmax(0, 1fr)` on desktop; date stacks above on tablet and phone. Rows separated by `border-top: 1px solid var(--line-soft)`. Current role gets a pulsing 6px `--accent` dot before the date (the only looping animation on the site, and it stops under reduced motion). Hover: nothing moves; company name shifts to `--accent`.

### 5.8 Chip (`.chip`)

`font: 500 11px/18px var(--font-mono); letter-spacing:.08em; text-transform:uppercase; padding: 2px 10px; border-radius: var(--radius-pill); background: var(--chip-bg); color: var(--ink)`. Accent variant (for "NOW", "WON", "LIVE"): `background: var(--accent-soft); color: var(--accent-chip-text); border: 1px solid var(--accent-900)`.

### 5.9 Feed item (`.feed-item`)

New. Used on `/now` and in the home "latest" strip. Dashed card like 5.4 but vertical:

```
LINKEDIN · 2026-09-18                      (mono meta, type in --accent, date in --ink-faint)
Title or first line of the post            (--t-h3)
Two to four lines of body                  (--t-body-sm, max 64ch)
[ READ ON LINKEDIN ]                       (btn--sm)
```
Types and their accent label: `LINKEDIN`, `SHIPPED`, `TALK`, `NOTE`, `PRESS`. Optional single image, `aspect-ratio: 16/9`, `object-fit: cover`, no radius, `filter: grayscale(1) contrast(1.1)` at rest and full color on hover (keeps the one-hue rule intact while images exist).

### 5.10 GitHub module (`.gh`)

New. Three parts stacked or side by side:

1. **Heatmap**: 53 x 7 grid of 10px squares, `gap: 3px`, colored by `--ascii-0` through `--ascii-4` (five levels, matching GitHub's four levels plus empty as `--surface-2`). This reuses the ASCII ramp so the heatmap is literally in the site's texture language. Month labels in `--t-eyebrow` above, weekday labels left. Scrolls horizontally on phone inside `overflow-x: auto`.
2. **Stats strip**: four fact pairs in a row, mono: `COMMITS / 365D`, `STREAK`, `LAST PUSH`, `PUBLIC REPOS`. Numbers in `--t-h2` Display, keys in `--t-eyebrow`.
3. **Latest activity**: five rows, each `mono date · event verb · repo name (link) · commit message truncated to 72ch`. Rows separated by `--line-soft`.

Loading state: skeleton rectangles in `--surface-2` with a slow opacity pulse. Error state: a single line in `--ink-faint`: `GitHub is not answering. Try github.com/mesanand.` Never show a spinner.

### 5.11 Hero

Full-bleed, `padding-block: clamp(120px, 18vw, 170px) clamp(140px, 20vw, 220px)`, centered (the only centered block). Background: the HACK1984 scanline trick, `background-image: linear-gradient(180deg, #161616 0 13%, transparent 13% 87%, #161616 87% 100%); background-size: 100% var(--cell)` where `--cell` is `calc(var(--mark-w) / 47)`, plus the accent radial glow anchored below the fold (`::after`, 1600px x 760px, `bottom: -420px`). Contents, top to bottom:

1. ASCII mark of your name, rendered as a grid of 7px cells in the ASCII ramp, 47 cells wide like the reference (`--mark-w: clamp(260px, 48vw, 760px)`). Built once as an SVG or a `<pre>` from a pixel-font bitmap of `MEHR ANAND`, with `ANAND` in the lighter half of the ramp. Static; no animation beyond the entrance fade.
2. One line in `--t-lead` `--ink-body`: the positioning sentence (see `04-CONTENT-INVENTORY.md` section 1).
3. A mono "where" list like HACK1984's `Fri Nov 6 · 300 Massachusetts Ave, Boston`: `NEW YORK CITY · NORTHEASTERN '27 · GENERAL ATLANTIC (NOW)`.
4. Two bracket buttons: `[ SEE THE WORK ]` primary, `[ WHAT I'M DOING NOW ]` secondary.

### 5.12 ASCII divider

A full-bleed 1-to-3 row strip of ASCII characters (`. : - = + * # %`) in `--ascii-1` to `--ascii-3`, 7px mono, `letter-spacing: 0`, `line-height: 7.21px` (HACK1984's `--hk-ascii-row`). Generated once from a noise function at build time and stored as a string, not computed on the client. Used between the hero and the first section, and above the footer. `aria-hidden="true"`.

### 5.13 Footer

Full-bleed, `border-top: 1px dashed var(--chip-bg)`, `padding-block: var(--space-24)`. Three columns on desktop: wordmark + one-line bio; nav links repeated in `--t-label`; socials as link cards. Bottom row: `© 2026 Mehr Anand · Built with Vite, React, and a lot of Geist Mono · Last deployed {date from build}` in `--t-meta` `--ink-faint`.

---

## 6. Motion

Framer Motion (`motion` package), used sparingly.

| Pattern | Spec |
|---|---|
| Section entrance | `initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: .5, ease: [0.2, 0.8, 0.2, 1] }}` |
| Stagger in grids | Parent `staggerChildren: 0.06`, children same as above with `y: 12` |
| Hero | Mark fades in over 0.8s, then subline, where-list, buttons stagger 0.1s each |
| Heatmap | Cells do not animate individually. The whole module uses section entrance |
| Nav overlay (phone) | `opacity 0 to 1` over 0.2s, links stagger 0.04s |
| Hover | CSS only, `transition: color .12s linear, background-color .12s linear, border-color .12s linear`. No transforms on hover anywhere |
| Current-role dot | CSS `@keyframes pulse` 2s infinite, opacity 1 to .35 |
| Reduced motion | A `useReducedMotion()` check sets every `initial` to the final state and removes the pulse. Also `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }` |

No page transitions between routes in v1. Route changes are instant; scroll resets to top.

---

## 7. Iconography

Lucide icons (`lucide-react`), 20px, `stroke-width: 1.5`, color inherits. Only used inside link cards (5.4) and the GitHub module's event verbs. No icons in nav, headings, or buttons. External links get a text `↗` (U+2197) in mono, not an icon.

---

## 8. Imagery

- Headshot: appears once, on the home page below the hero in the "about" strip, 160px square, zero radius, `filter: grayscale(1)` at rest and color on hover. Export as 480px AVIF + WebP fallback via `vite-imagetools`.
- Project images: optional, same grayscale-at-rest treatment. If a project has no screenshot it gets none; no placeholder art.
- No stock, no illustrations, no gradients outside the hero and highlight tokens.

---

## 9. Voice (design-adjacent)

The site speaks in short declaratives. Eyebrows are two or three words. Headings are under eight words. The hero subline is one sentence with a verb. Descriptions are two to three sentences with at least one number. No exclamation points anywhere on the site. Full copy in `04-CONTENT-INVENTORY.md`.

---

## 10. Token file skeleton

`src/styles/tokens.css` holds everything in sections 2, 3.1, 3.2 (as custom properties), 4.1, 4.2, 4.3. `src/styles/base.css` holds the reset, `@font-face`, body defaults, focus styles, reduced-motion. `src/styles/components.css` holds sections 5.1 through 5.13 as plain classes. No CSS-in-JS, no Tailwind, no CSS modules. This is how HACK1984 is built and it keeps the design in one grep-able place.
