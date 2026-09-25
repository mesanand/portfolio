# 01. Autopsy of mesanand.github.io

Source of truth for this document: the raw HTML of `index.html` and `portfolio.html` in the `mesanand/mesanand.github.io` repo (fetched 2026-09-25), plus the untouched `myportfolio` create.xyz template in your connected folder.

Severity scale: **S1** kills the site for its purpose (recruiter or founder deciding whether to talk to you). **S2** makes it look amateur. **S3** is technical debt that will bite later.

---

## 0. The one-paragraph verdict

The site is two static HTML files with inline CSS. The landing page is a centered white card on a purple-to-violet gradient with a circular headshot, the words "Software Engineer & Developer", two sentences of filler, and three pill buttons. The portfolio page is a tab switcher that hides and shows three `<div>`s with `display:none`. The visual language is the default output of every "make me a portfolio" prompt from early 2024: `#667eea` to `#764ba2` gradient, `border-radius: 20px`, `box-shadow: 0 10px 30px rgba(0,0,0,0.1)`, system font stack. It communicates nothing about you specifically. A recruiter who lands here learns your name, sees a stock aesthetic, and has to click a pill button to find any evidence of work. The content that is there is a year stale and lists your Brewster co-op as "Present". This is a rebuild, not a restyle.

---

## 1. Design (S1)

### 1.1 The palette is the problem, not a symptom

`linear-gradient(135deg, #667eea 0%, #764ba2 100%)` is the single most recognizable "AI-generated landing page" gradient of 2023-2024. It is the Tailwind `indigo-400` to `purple-700` neighborhood and it appeared in tens of thousands of hackathon submissions. Anyone who has looked at more than twenty student portfolios pattern-matches it in under a second as "template". On top of that gradient sits pure white (`#ffffff`) cards with 20px radii and soft shadows. The combination has no contrast hierarchy: the gradient is mid-tone, the cards are max-light, the text inside them is `#2d3748` / `#4a5568` / `#718096` (Tailwind gray-800/700/500). There is no black, no true accent, no surface tier. Everything is "medium".

Compare the reference. HACK1984 uses `#000000` ground, `#0a0a0a` and `#141414` surfaces, `#e6e6e6` ink, `#a3a3a3` body, and one screaming accent `#ff3b2f`. That is a five-stop luminance ladder plus one hue. Every element is either on the ladder or is the accent. That is why it reads as designed.

### 1.2 Typography is absent

`font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...`. No display face, no mono face, no loaded fonts at all. Headings are the same family as body text at a bigger size. `h2` is `2.5rem` with a 3px bottom border in the gradient color, centered. Centered headings with underline rules is a 2012 Bootstrap pattern.

The reference self-hosts three variable fonts (Funnel Display 300-800, Funnel Sans 300-800, Geist Mono 100-900) as woff2 and assigns them roles: display for the big things, sans for reading, mono for labels, buttons, and metadata. Roles are what make a site feel authored.

### 1.3 Radius and shadow everywhere

Every container is `border-radius: 15px` or `20px` or `25px` (buttons). Every card hovers to `translateY(-5px)` plus a bigger shadow. The whole page is bubbles floating up on hover. There is no straight line anywhere, which means there is no structure. The reference uses `--radius-none: 0` for everything except pill chips, and separates regions with `1px solid #1a1a1a` or `1px dashed #404040` rules. Lines are structure; shadows are decoration.

### 1.4 The experience timeline is the worst component on the site

A vertical center line with alternating left/right cards, triangle "speech bubble" arrows drawn with CSS borders, and 20px dots with 4px white borders. Three entries. On mobile it collapses to a left-aligned line with `!important` overrides. This is the W3Schools timeline. It takes 60 lines of CSS to render three job titles.

### 1.5 The clubs section is a wall

Seventeen `club-card`s in four year buckets, each year bucket introduced by an `h3` that is itself a gradient-filled pill with a drop shadow. Every card is `text-align: center` with a role in accent blue, italic dates, and a paragraph. Centered paragraphs of 40+ words are unreadable. Seventeen of them is a scroll of noise. There is no hierarchy between "founded the Anthropic chapter at Northeastern" and "Bullet Journaling Club, Co-Founder and Secretary".

### 1.6 The landing page says nothing

`index.html` is a 500px white card containing: headshot, name, "Software Engineer & Developer", the sentence "Passionate about creating innovative solutions and building meaningful applications. Always eager to learn new technologies and contribute to exciting projects." and three buttons. That sentence could be on any of a million portfolios. There is no mention of Northeastern, General Atlantic, Claude Builders Club, data engineering, AI, or anything a recruiter would search for. It is a placeholder that shipped.

---

## 2. Information architecture (S1)

### 2.1 The home page is a dead end

The only way to see work is to click "Portfolio". A recruiter spends about ten seconds deciding whether to keep reading. Yours spends those ten seconds looking at a headshot and a filler sentence. The home page must carry the pitch: who you are in one line, what you are doing right now, the three most impressive things, and proof (GitHub activity, current role, a couple of numbers).

### 2.2 Tabs that are not tabs

`portfolio.html` fakes navigation with `onclick="showSection('projects')"` on `<div>`s. Consequences:

- No URLs. You cannot link someone to your experience. Refresh resets to Projects.
- No keyboard access. `<div class="nav-link">` is not focusable. Tab key skips the entire nav.
- No back button. The browser history does not know the tabs exist.
- `event.target.classList.add('active')` relies on the deprecated global `window.event`. Works in Chrome, fragile elsewhere.
- Search engines index only the visible Projects section; Experience and Clubs are `display:none` and de-prioritized.

### 2.3 Wrong ordering

Projects first, then Experience, then Clubs. For a rising senior with a General Atlantic co-op, a Brewster co-op, and a founder role at the Anthropic chapter, Experience is the headline. Hackathon projects from 2024 are supporting evidence. Clubs should be a curated "leadership" strip of five, not a museum of seventeen.

### 2.4 No "now"

Nothing on the site tells anyone what you are doing this month. Your whole request ("show what I am up to daily") is a missing section, not a broken one.

---

## 3. Content (S1)

### 3.1 Stale and, in one case, wrong

| Entry on the site | Reality (per our records, as of Sept 2026) |
|---|---|
| Brewster Ambulance Service, "July 2025 - Present" | It was July to December 2024. The date on the site is off by a year and still says Present |
| No General Atlantic | You are a Data Warehouse Management Engineer co-op at General Atlantic in NYC, July to December 2026. This is your best credential and it is absent |
| No Claude Builders Club | You are president and founder of the official Anthropic chapter at Northeastern, 150+ members, ran the Spring 2026 hackathon. Absent |
| "Northeastern Artificial Intelligence Club, Director of Operations" mentions "Brought in Anthropic and Adobe as official sponsors" | Probably the seed of CBC. Needs to be told as one story, not scattered across two cards |
| No ACM, no Rev, no Huntington 100, no NYC Connector, no Convocation panel | All absent |
| Bio: "Software Engineer & Developer" | You are a data engineer / applied AI builder / community founder. "Software Engineer & Developer" is redundant and generic |
| Kaleidoscope, "Software Team, September 2025 - Present" | Status unknown; needs confirmation |
| Every high school club (3D Printing, Hydroponics, Cybersecurity, CS Club, FPTV) with full paragraphs | At the level you are at now, high school clubs get one line or get cut |

### 3.2 Voice

The copy alternates between resume-speak ("Conducted several algorithmic trading analysis") and enthusiasm ("carbon footprints!"). Typos: "predicitve", "Automizing", "levering", "Playright", "the direct of student involvement". Sentence fragments as project descriptions. Two of four project cards have no description at all.

Numbers are present but buried: "$100k+ in funding, $5k in donations, 2M+ views", "80k+ student developers", "$65,000 budget", "500+ organizations". These are the best things on the site and they are inside centered paragraphs in 0.9rem gray.

### 3.3 Missing proof

No links to GitHub repos per project (only Devpost/YouTube). No screenshots. No resume PDF. No email. No calendar link. The GitHub profile linked from the home page has a bio that says "Currently learning Python, SQL, AWS, Java, React.js" which is a high-school bio on a profile that should say General Atlantic.

---

## 4. Code (S2 / S3)

### 4.1 `mesanand.github.io`

- Two files, ~430 lines total, 100% inline CSS. No build, no components, no data layer. Every content change is an HTML edit inside a `<div class="club-card">`.
- No `<meta name="description">`, no Open Graph tags, no favicon, no canonical, no `lang` beyond `en`. Sharing the link on LinkedIn or iMessage produces a blank card.
- Headshot is `Linkend Profile Picture.JPG` (typo in the filename, space in the URL, uncompressed JPG, no `width`/`height`, no lazy loading).
- `.section { display: none }` for routing. Covered above.
- No `prefers-reduced-motion`. Minor, but the reference handles it.
- `<div class="nav-link">` instead of `<a>` or `<button>`: fails WCAG 2.1.1 (keyboard) and 4.1.2 (name, role, value).

### 4.2 `myportfolio` (the create.xyz Next.js repo in your connected folder)

Do not build on this.

- It is the raw create.xyz scaffold. `package.json` name is `create-project`, `layout.js` title is "Create.xyz App".
- `src/middleware.js` rewrites `/integrations/*` to `https://www.create.xyz/` with a hard-coded project ID header. That is a phone-home to a third-party service in your portfolio.
- It mixes Next.js App Router (`src/app/page.jsx`) with `react-router-dom` `BrowserRouter` inside a client component. That defeats every reason to use Next.js (no SSR, no per-route metadata, no code splitting per route) and would 404 on refresh for any route except `/` on Vercel.
- All content is placeholder: "Sarah Johnson - Full Stack Developer", "Tech Innovations Corp", "E-Commerce Platform", `https://demo-ecommerce.example.com`.
- `tailwind.config.js` has `"darkmode": "class"` (typo; the key is `darkMode`) so dark mode never worked.
- Font Awesome classes (`fas fa-eye`) are used but Font Awesome is never loaded.
- `next.config.js` externalizes `canvas` "required to make pdfjs work" for a pdfjs that is not installed.
- The `.next/` build cache is checked into the folder (30+ MB of webpack pack files).

The only thing worth keeping from it is the idea of `components/timeline-item.jsx` and `components/project-card.jsx` as separate components, and even those are better rewritten.

---

## 5. SEO and social (S2)

- Title tags are "Mehr Anand" and "Mehr Anand - Portfolio". No description. Google shows the first sentence of the filler paragraph as the snippet.
- No Open Graph, no Twitter card. Every share is a bare link.
- No `sitemap.xml`, no `robots.txt`, no structured data (`Person` JSON-LD would take five minutes and gets your name, job title, and social links into a knowledge panel).
- The domain is `mesanand.github.io`. You own `mehr-anand.com`. The GitHub Pages URL is fine for a freshman; for a senior interviewing at PE firms it should be your name.

---

## 6. Accessibility (S2)

- Nav "links" are non-focusable `<div>`s.
- Color contrast: `#718096` on `#f8fafc` (dates on cards) is 4.0:1, just under AA for small text. `.tech-tag` white on `#667eea` is 3.9:1, fails AA.
- Headshot `alt="Mehr Anand"` is fine. Club and project cards have no landmarks or headings hierarchy (`h2` to `h3` to `h4` is fine, but the year sections and grids are unlabeled `<div>`s).
- No skip link, no focus styles beyond browser default (which the gradient hides).
- Hover-only affordances (`translateY(-5px)`) have no focus equivalent.

---

## 7. Performance (S3)

Honestly, it is fast, because it is two files. The only offender is the uncompressed headshot. Performance is the one thing the rebuild could make worse if we are sloppy (three variable fonts, Framer Motion, a contribution heatmap). `06-QA-CHECKLIST.md` sets the budgets so that does not happen.

---

## 8. Why it reads as "made in 2024" in one list

1. Indigo-to-purple 135deg gradient background.
2. White cards with 20px radius and `0 10px 30px` shadows.
3. Centered `h2` with an accent-colored bottom border.
4. Pill buttons with the gradient as background.
5. System font stack, no display face, no mono.
6. Hover = lift 5px + bigger shadow, on everything.
7. Alternating left/right timeline with CSS-triangle speech bubbles.
8. Tech-stack pills in solid accent with white text.
9. "Passionate about creating innovative solutions" as the bio.
10. `display:none` tabs.

The reference site does the opposite of every item: black ground, zero radius, left-aligned headings with mono eyebrows, bracket text buttons, three real fonts with roles, hover = color change only, a fact-grid instead of a timeline, dashed-bordered chips, copy with a point of view, real routes.

---

## 9. What we keep

- The content facts (all reconciled in `04-CONTENT-INVENTORY.md`).
- The Devpost and YouTube links for the four projects.
- The idea of a Clubs/Leadership section, cut from seventeen cards to a curated set plus an "archive" disclosure.
- The GitHub Pages repo, only to host a redirect to `mehr-anand.com`.

Everything else is retired.
