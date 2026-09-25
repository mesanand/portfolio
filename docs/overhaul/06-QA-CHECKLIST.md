# 06. QA Checklist

Run after prompt 11, again as prompt 12 (which produces `QA-REPORT.md`), and once more against the live domain after prompt 13. Every item is PASS, FAIL, or FIXED. Targets are not negotiable; if one cannot be met, it goes in "known gaps" with a reason.

---

## 1. The recruiter ten-second test

Open `/` on a phone with a cold cache and count.

- [ ] By second 2: name and the two-tone wordmark are visible (fonts loaded or fallback rendered without layout shift).
- [ ] By second 4: the hero subline says what you do and where, in one sentence, with a proper noun a recruiter can search (General Atlantic, Northeastern).
- [ ] By second 6: one scroll reveals proof: a dated feed entry, a current role with a pulse dot, or a heatmap with real activity.
- [ ] By second 10: `[ RESUME ]` is findable without scrolling back up (header is sticky).
- [ ] Nothing on the first screen is a placeholder, a TODO bracket, or lorem.

## 2. Content freshness

- [ ] Every `TODO(mehr)` comment in `src/content/` is resolved. `grep -rn "TODO(mehr)" src/content` returns nothing.
- [ ] No bracketed placeholder metrics remain: `grep -rn "\[[^]]*\]" src/content/experience.ts` returns nothing.
- [ ] The current role's `end` is `"present"` and its dates are right.
- [ ] `now.json` has at least six entries and the newest is under 30 days old on launch day.
- [ ] No entry carries the `date approximate` tag.
- [ ] Brewster dates read Jul 2024 to Dec 2024, not 2025.
- [ ] The about strip club count matches what you decided in `04-CONTENT-INVENTORY.md` question 2.
- [ ] Footer "Last deployed" is today.

## 3. Links

- [ ] Every `url` in `src/content/*` returns 200 (script it with `fetch` HEAD, fallback GET; Devpost and LinkedIn may 999 or 403 bots, verify those by hand).
- [ ] `/resume.pdf` opens and is the current resume.
- [ ] `mailto:` opens the right address.
- [ ] Every external link has `target="_blank"` and `rel="noopener noreferrer"` and a `↗`.
- [ ] Nav links go to the right routes; `[ RESUME ]` opens in a new tab.
- [ ] `/now.xml` validates as RSS 2.0.
- [ ] `/sitemap.xml` lists five routes with today's `lastmod`.
- [ ] `/404-anything` renders the NotFound page (not Vercel's default).

## 4. Design conformance (from `02-DESIGN-SYSTEM.md`)

- [ ] `grep -rn "#[0-9a-fA-F]\{3,6\}" src --include=*.tsx --include=*.css | grep -v tokens.css` returns nothing except `api/og.tsx`.
- [ ] `grep -rn "border-radius" src/styles | grep -v "radius-pill\|radius-none"` returns nothing.
- [ ] `grep -rn "box-shadow" src` returns nothing.
- [ ] `grep -rn "transform" src/styles/components.css | grep hover` returns nothing.
- [ ] Only the hero is centered. Every section heading is flush left against the gutter.
- [ ] Every label, date, tag, nav item, and button is Geist Mono uppercase (spot-check five).
- [ ] Every paragraph is Funnel Sans; every heading is Funnel Display (spot-check computed styles).
- [ ] Bracket buttons render brackets via pseudo-elements; the DOM text is only the label.
- [ ] Grid cells share hairline borders and read as one ruled table (no double borders at cell joins).
- [ ] Headshot is grayscale at rest and color on hover.
- [ ] No icon appears in a heading, nav item, or button.
- [ ] Chips are the only rounded element.

## 5. Responsiveness

Check each route at 320, 375, 768, 1024, 1440, 1920 px.

- [ ] No horizontal page scroll at any width (`document.documentElement.scrollWidth <= innerWidth`).
- [ ] Hero mark scales via the clamp and stays legible at 320.
- [ ] Header collapses to `[ MENU ]` below 640; overlay covers the viewport; body scroll locks while open.
- [ ] Experience rows stack date above org below 1024.
- [ ] Project and role grids go to one column below 1024, with borders still correct (no orphan left border).
- [ ] Heatmap scrolls horizontally inside its container on phone and starts scrolled to the most recent weeks.
- [ ] `/now` month labels stay attached to their group on all widths.
- [ ] Footer columns stack on phone.
- [ ] At 1920 the content is capped at `--content-max` and the hero background still bleeds.

## 6. Accessibility

- [ ] axe: zero serious or critical violations on every route at 375 and 1440.
- [ ] Skip link is the first Tab stop and moves focus to `<main>`.
- [ ] Every interactive element is reachable by keyboard and shows the accent focus ring.
- [ ] Mobile menu: opens on Enter/Space, traps focus, closes on Escape, returns focus to the trigger.
- [ ] Filter buttons on `/projects` use `aria-pressed`.
- [ ] Heatmap grid has `role="img"` and an `aria-label` with the total; cells are `aria-hidden`.
- [ ] Decorative ASCII dividers and the hero background are `aria-hidden`.
- [ ] Headings form a sane outline per route (one h1, h2 per section, h3 per item). Check with a headings map.
- [ ] Contrast: every text/background pair in use is at least 4.5:1 (or 3:1 for mono text at 18px+ semibold). Paste the computed table.
- [ ] `prefers-reduced-motion: reduce` disables all entrance animation and the pulse dot; content is visible without scrolling into view.
- [ ] Images have meaningful `alt` (headshot: "Mehr Anand"; project images: what they show).
- [ ] Zoom to 200% in the browser: no clipped text, no overlapping mono labels.

## 7. Performance

Run Lighthouse (mobile, simulated Slow 4G, `pnpm preview` or the live domain) on `/`, `/work`, `/projects`, `/leadership`, `/now`.

| Route | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| target | ≥ 90 | 100 | 100 | 100 | < 2.0 s | < 0.05 | < 150 ms |

- [ ] Initial route JS under 120 KB gzipped; GitHub module is a separate lazy chunk.
- [ ] Three font files only, all preloaded, combined under 200 KB. No Google Fonts request.
- [ ] Headshot served as AVIF (WebP fallback) with explicit dimensions and lazy loading.
- [ ] `/api/github` responds with `Cache-Control: public, s-maxage=900, stale-while-revalidate=3600`; a second request within 15 min is served from cache (check `x-vercel-cache: HIT`).
- [ ] `/api/og` responds under 1 s warm and sets `s-maxage=86400`.
- [ ] No console errors or warnings on any route in dev or preview.
- [ ] No layout shift when fonts swap in (size-adjust fallback works; verify CLS in Lighthouse).

## 8. SEO and sharing

- [ ] Each route has a unique `<title>` and description (Playwright `page.title()` per route).
- [ ] `index.html` carries static `og:*` and `twitter:*` for Home plus the Person JSON-LD; `curl -A "facebookexternalhit/1.1" https://mehr-anand.com | grep og:` shows them.
- [ ] `/api/og?title=Work&sub=...` renders a readable 1200x630 image with the wordmark, title, and accent rule.
- [ ] LinkedIn Post Inspector shows title, description, and image for `https://mehr-anand.com`.
- [ ] `robots.txt` allows all and points to the sitemap.
- [ ] Favicon shows in the tab; apple-touch-icon works when added to an iOS home screen.
- [ ] `https://www.mehr-anand.com` and `http://mehr-anand.com` both land on `https://mehr-anand.com`.
- [ ] `https://mesanand.github.io` and `https://mesanand.github.io/portfolio.html` redirect to the new site and `/work` respectively.

## 9. Security and hygiene

- [ ] `grep -r "github_pat\|ghp_" dist/` returns nothing.
- [ ] `.env.local` is gitignored and absent from history (`git log --all -- .env.local` is empty).
- [ ] `GITHUB_TOKEN` is fine-grained, read-only, public repos only, with an expiry, and the expiry date is in your calendar.
- [ ] `/api/github` rejects non-GET with 405.
- [ ] No third-party scripts other than Vercel Analytics and Speed Insights.
- [ ] The old create.xyz middleware and project ID exist nowhere in the new repo (`grep -r createxyz .` is empty).

## 10. Content voice (read every string once)

- [ ] No exclamation points anywhere on the site.
- [ ] No "passionate", "innovative", "eager", "leverage", "synergy", "cutting-edge".
- [ ] Every experience bullet has a verb and, where one exists, a number.
- [ ] Typos from the old site are gone: "predicitve", "Automizing", "levering", "Playright", "XGboost", "Dana Farber" (should be Dana-Farber).
- [ ] Eyebrows are two or three words; headings are under eight.

## 11. Sign-off

- [ ] `QA-REPORT.md` committed with zero FAIL rows.
- [ ] Tag `v1.0.0` exists.
- [ ] You have sent the URL to one person who has never seen the old site and asked them what you do. If their answer matches the hero subline, ship the LinkedIn post.
