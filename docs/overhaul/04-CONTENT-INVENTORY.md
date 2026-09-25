# 04. Content Inventory and Rewrite

Every fact that will appear on the new site, reconciled against (a) the old `portfolio.html`, (b) what you have told Claude across sessions, and (c) your public GitHub profile. Each item is tagged:

- **VERIFIED**: on the old site or stated by you directly; safe to publish as written.
- **NEEDS-MEHR**: something is missing, ambiguous, or a number is a placeholder. Fill the blank in the `>>` line. Do not let a build prompt type a NEEDS-MEHR entry into the codebase until the `>>` is answered.
- **CUT**: was on the old site, will not be on the new one (or will only be a one-liner in the archive).

Copy below is written in the site voice from `02-DESIGN-SYSTEM.md` section 9: short declaratives, numbers where they exist, no exclamation points, no "passionate".

---

## 1. Site-level copy (`src/content/site.ts`)

| Field | Value | Status |
|---|---|---|
| name | Mehr Anand | VERIFIED |
| wordmark | `MEHR` + `ANAND` (two-tone) | VERIFIED |
| hero subline (one sentence, the pitch) | **Option A:** "I build data pipelines and AI tooling for finance, and I build the communities that build with them." **Option B:** "Data engineer at General Atlantic. Founder of Northeastern's Anthropic chapter. I ship pipelines by day and communities by night." **Option C:** "Data warehouse engineer, applied AI builder, and the person who started six clubs before transferring campuses." | NEEDS-MEHR: pick one or rewrite. `>>` |
| where-list (mono, hero) | `NEW YORK CITY · NORTHEASTERN '27 · GENERAL ATLANTIC (NOW)` | VERIFIED (change when co-op ends Dec 2026) |
| about strip (home, next to headshot, ~60 words) | "Rising senior at Northeastern's Khoury College, BS Computer Science with an AI concentration and a math minor, Class of 2027. Right now I'm a Data Warehouse Management Engineer co-op at General Atlantic in New York, building ETL pipelines on Azure and Databricks and wiring financial systems into AI tools with MCP. Before that I did the same for an ambulance company. I've founded eight clubs across two campuses and currently run the Claude Builders Club, Northeastern's official Anthropic chapter." | NEEDS-MEHR: is "eight clubs" right (six at Oakland + CBC + Content Club Boston)? Confirm the count. `>>` |
| email | anand.me@northeastern.edu (per GitHub profile) or a personal address? | NEEDS-MEHR: which email goes on the site? `>>` |
| calendar link | Calendly URL | NEEDS-MEHR: paste URL or say "none". `>>` |
| resume | `/resume.pdf` | NEEDS-MEHR: provide the current PDF. `>>` |
| socials | GitHub `mesanand`, LinkedIn `in/mehr-anand`, Instagram `mayor_anand_23` (from GitHub profile), Linktree, Monkeytype | NEEDS-MEHR: which of these belong on a recruiter-facing site? Recommendation: GitHub, LinkedIn, email only. `>>` |
| meta description | "Mehr Anand is a data engineer and applied AI builder at Northeastern University (CS + AI, '27), currently a co-op at General Atlantic in New York. Founder of the Claude Builders Club." | VERIFIED |
| footer tagline | "Built with Vite, React, and a lot of Geist Mono." | VERIFIED |

---

## 2. Experience (`src/content/experience.ts`)

Newest first. Only paid or formal work goes here. Clubs are in section 4.

### 2.1 General Atlantic / Data Warehouse Management Engineer Co-op

- org: General Atlantic · location: New York, NY · start: 2026-07 · end: present · kind: coop · featured: true
- summary: "Data warehouse engineering for a growth equity firm."
- bullets:
  1. "Build and maintain ETL pipelines feeding the firm's Azure data lake, with QA across environments."
  2. "Led a Box-to-SharePoint migration with webhook-driven triggers."
  3. "Developing MCP connectors that link financial applications to AI tooling."
- stack: Azure Data Factory, Databricks, Azure Synapse, Python, SQL, MCP, SharePoint
- Status: VERIFIED for role/dates/workstreams. NEEDS-MEHR for numbers: you told Claude the resume bullets still have bracketed placeholder metrics. `>>` Pipeline count, data volume, or time saved for bullet 1? `>>` Files/TB migrated for bullet 2? `>>` Number of connectors or systems for bullet 3? Also NEEDS-MEHR: confirm whether "Synapse" belongs in the stack or only Databricks. `>>`

### 2.2 Brewster Ambulance Service / Financial Machine Learning Engineer Co-op

- org: Brewster Ambulance Service · location: Boston, MA (confirm) · start: 2024-07 · end: 2024-12 · kind: coop · featured: true
- summary: "ML and data engineering for the largest private ambulance operator in Massachusetts." (NEEDS-MEHR: is "largest private" accurate? If not, "a private ambulance operator in Massachusetts". `>>`)
- bullets:
  1. "Pitched and won C-suite approval for a Snowflake adoption, then built the first pipelines on it."
  2. "Built ETL with Azure Data Factory and dbt; trained Python models for financial risk and predictive analytics."
  3. "Rode along on ambulance shifts to understand the operations the data described."
- stack: Snowflake, Azure Data Factory, dbt, Python, scikit-learn, SQL
- Status: VERIFIED except: old site said "July 2025 - Present" which is wrong; correct dates are July to December 2024 per you. NEEDS-MEHR: any number (models shipped, hours saved, dollars of risk modeled)? `>>`

### 2.3 Teens4Teens / Chief Technology Officer

- org: Teens4Teens · location: Remote · start: 2023-05 · end: present · kind: nonprofit · featured: false
- summary: "501(c)(3) menstrual equity nonprofit with chapters in the US and Ghana."
- bullets:
  1. "Own the technology stack for a nonprofit with $100K+ in funding, $5K in donations, and 2M+ content views."
  2. "Built ML models to target outreach to the communities with the highest need."
  3. "Supported international expansion including the Ghana chapter."
- stack: Python, scikit-learn, web
- Status: VERIFIED (numbers from old site). NEEDS-MEHR: are the $100K / $5K / 2M figures still current? `>>` What does the stack actually consist of (website platform, CRM, etc.)? `>>`

### 2.4 Altus Receivables Management / AI Training Consultant

- org: Altus Receivables Management · start: 2026-?? · end: ?? · kind: consulting · featured: false
- summary: "Scoped and delivered a Claude training program for senior leadership."
- Status: NEEDS-MEHR: this was in your recent work as "scoping". Did it happen, when, and can it be public? If not, CUT. `>>`

### 2.5 Northeastern University / NYC Network Connector (part-time)

- org: Northeastern University · location: New York, NY · start: 2026-?? · end: present · kind: parttime · featured: false
- summary: "Connect NYC-based co-op students with alumni and employers through the Connector Program."
- Status: NEEDS-MEHR: start month, one sentence on what you actually do, and whether it belongs under Experience or Leadership. `>>`

### 2.6 Dana-Farber Cancer Institute / Research Intern (2x)

- org: Dana-Farber Cancer Institute · location: Boston, MA · start: 2021-06 · end: 2022-07 · kind: internship · featured: false
- summary: "Two summers on drug-trial identification with the Broad Institute of MIT and Harvard."
- bullets: 1. "Collaborated with Broad Institute researchers on more efficient identification of drug-trial needs."
- stack: Python (confirm)
- Status: VERIFIED from old site. NEEDS-MEHR: tools used, and one concrete output. `>>` Note the old site wrote "Dana Farber"; the institute styles itself "Dana-Farber".

### 2.7 Dell Technologies / AI Software Engineer Co-op (rescinded)

- CUT. Never happened; do not list. Noted here only so no prompt resurrects it from a resume draft.

---

## 3. Projects (`src/content/projects.ts`)

### 3.1 Backyard (BackyardNEU)

- name: Backyard · tagline: "Rate My Professor for clubs." · year: 2026 · tags: web, ai · featured: true
- description: "A club-discovery and rating platform for Northeastern, with event discovery, NLP search, and a matching model that pairs students with organizations. Seeded with 350 clubs and 50 external organizations (accelerators, student VC funds, pitch competitions)."
- outcome: (NEEDS-MEHR: users, launches, anything shipped? `>>`)
- stack: Supabase, Google auth, NLP, React (confirm), TypeScript (confirm)
- links: repo (BackyardNEU org URL `>>`), demo (`>>`)
- Status: NEEDS-MEHR: is this public yet? Your role (you referred to Connor as CEO; what is your title)? `>>`

### 3.2 bitsdime

- name: bitsdime · tagline: "AI education consulting and implementation." · year: 2025 · tags: ai, web · featured: false
- description: NEEDS-MEHR: one or two sentences. Is bitsdime.com live and what does it do today? `>>`
- links: demo `https://bitsdime.com`
- Status: NEEDS-MEHR.

### 3.3 TrackNTrip

- name: TrackNTrip · tagline: "ML-optimized road trip planning." · year: 2024 (confirm `>>`) · tags: ml, hackathon · featured: true
- description: "A travel assistant that uses predictive models on routes, gas stations, and carbon footprint to plan cheaper, lower-emission road trips."
- stack: Leaflet.js, Llama, XGBoost, scikit-learn
- links: devpost `https://devpost.com/software/trackntrip`, repo (`>>`)
- outcome: NEEDS-MEHR: which hackathon, any placement? `>>`
- Status: VERIFIED content; note "XGboost" on the old site is "XGBoost".

### 3.4 Inquisiv

- name: Inquisiv · tagline: "Market research and branding for dropshipping stores." · year: 2025 (FinHacks, Jan 18-19 per the repo description; confirm year `>>`) · tags: ml, web, hackathon · featured: true
- description: "Streamlines market research and brand generation for e-commerce sellers using NLP over product and competitor data."
- outcome: "Won two tracks at FinHacks."
- stack: React, Flask, NLP, Matplotlib, Jupyter
- links: devpost `https://devpost.com/software/inquisiv`, repo `https://github.com/Sadfahlsdj/Inquisiv`
- Status: VERIFIED.

### 3.5 Campus Nutrition Assistant

- name: Campus Nutrition Assistant · tagline: "Dining hall menus, scraped and scored." · year: NEEDS-MEHR `>>` · tags: ai, hackathon · featured: false
- description: NEEDS-MEHR: the old site had no description at all. Two sentences: what it scraped, what it told the user. `>>`
- stack: OpenAI API, BeautifulSoup, Playwright, Python
- links: devpost `https://devpost.com/software/campus-nutrition-assistant`
- Status: NEEDS-MEHR. Old site said "Playright" and the aria-label said "wafflehacks"; confirm it was WaffleHacks. `>>`

### 3.6 Cosint

- name: Cosint · tagline: "A REST API matching students to co-ops." · year: NEEDS-MEHR `>>` · tags: api, data · featured: false
- description: "REST API and dashboard that connects students and employers for co-op search."
- stack: FastAPI, SQL, Streamlit, Docker
- links: video `https://www.youtube.com/watch?v=xzaVzXxL7mE`, repo `https://github.com/EhlOps/cosint`
- Status: VERIFIED. (Course project? If so say which course. `>>`)

### 3.7 Pistachio (Verizon Smart Campus)

- Commute app concept for the Verizon Smart Campus competition. NEEDS-MEHR: did it get built or was it a pitch? If pitch only, CUT. `>>`

### 3.8 "Ask Vida" app

- CUT. You reviewed someone else's prototype; not your project.

### 3.9 Simple-Quiz-Game

- CUT from the site. It is pinned on your GitHub profile as "first project in python". Unpin it; pin Backyard, Inquisiv, the portfolio repo, and cosint instead. Prompt 13 includes this.

---

## 4. Leadership (`src/content/leadership.ts`)

Tiering: `headline` gets a full grid cell with summary and metrics; `supporting` is one line; `archive` is one line inside a collapsed `<details>`.

### 4.1 Current, headline tier (Boston campus)

| Org | Role | Dates | Summary | Metrics | Status |
|---|---|---|---|---|---|
| Claude Builders Club (Northeastern's official Anthropic chapter) | President and Founder | 2025-?? to present | "Founded and lead Northeastern's official Anthropic chapter. Kickoff drew 150+ students. Co-organized the Spring 2026 Revolve x Claude Builders hackathon across 78 campuses with a $50K sponsorship goal, and the Nov 2026 HACK1984 hackathon (36 hours, 100 seats) with Rev, ACM, and AINU." | "150+ members", "78-campus hackathon", "HACK1984, Nov 6-8 2026" | NEEDS-MEHR: founding month `>>`; is the program confirmed for fall 2026 (you were unsure in the summer) `>>`; final hackathon numbers `>>` |
| ACM Northeastern | Co-Director of Growth | 2026-?? to present | "Growth and partnerships for Northeastern's ACM chapter: employer outreach (including Google campus recruiting), faculty recruitment for a software engineering course, and recurring operations and strategy." | NEEDS-MEHR `>>` | NEEDS-MEHR: start month, member count |
| Northeastern AI Club (AINU) | Director of Operations | 2025-03 to present (confirm still current `>>`) | "Built the retention system and launched three specialist teams (Quantitative Finance, Bioinformatics, Software Consulting). Ran events with Fidelity. Brought in Anthropic and Adobe as sponsors." | "3 specialist teams", "Anthropic + Adobe sponsors" | VERIFIED from old site; confirm current |
| Northeastern Investment Banking Group | VP of Quantitative Research | 2025-01 to present (confirm `>>`) | "Algorithmic trading research and the work to get the group recognized as an official SGA club." | | VERIFIED from old site; confirm current |

### 4.2 Current or recent, supporting tier

| Org | Role | Dates | One line | Status |
|---|---|---|---|---|
| Rev (student entrepreneurship) | Director of Growth (stepped down) | ?? to 2026 | "Growth for Northeastern's entrepreneurship club; planned the Revolve hackathon ($50K fundraising goal, $12K grand prize)." | NEEDS-MEHR: dates `>>` |
| Kaleidoscope | Software Team | 2025-09 to ?? | "AWS resource management for a platform serving 80K+ student developers and 40+ organizations." | NEEDS-MEHR: still active? `>>` |
| PEVC (Private Equity and Venture Capital club) | Member | | | NEEDS-MEHR: role and whether to list `>>` |
| Northeastern NYC Connector Program | Connector | 2026 | (see 2.5; list in one place only) | NEEDS-MEHR |

### 4.3 Honors and speaking (new section on Leadership page or Home)

| Item | Copy | Status |
|---|---|---|
| Huntington 100, Spring 2026 | "Named to Northeastern's Huntington 100, recognizing 100 students for achievement and leadership." | VERIFIED |
| NYC Convocation 2026 student panelist | "Featured student panelist at Northeastern's NYC Convocation at The Town Hall." | VERIFIED |
| FinHacks, two track wins (Inquisiv) | see 3.4 | VERIFIED |
| Pull Shark (GitHub) | CUT. Not a credential. | |

### 4.4 Oakland campus era (2023 to 2025), supporting tier, one line each

You founded six clubs at Oakland. The old site lists these:

| Org | Role | Dates | One line | Status |
|---|---|---|---|---|
| Content Club | President and Founder (Oakland); Board Member (Boston/London expansion) | 2023-09 to 2025-02 | "Founded Oakland's media club, took over SGA's social media, 50K+ views, expanded to the London and Boston campuses with Adobe sponsorship." | VERIFIED |
| Resident Student Association | Co-President | 2024-09 to 2025-04 | "$10K+ in funding, PEP budgeting, student advocacy for the residence hall." | VERIFIED |
| Artificial Intelligence Club (Oakland) | Treasurer | 2024-09 to 2025-03 | "Managed a $65K budget through SGA, SOC, and SOOC approval." | VERIFIED |
| SGA Student Organizations Board | Secretary | 2024-09 to 2025-02 | "Constitution and bylaw review for 500+ organizations." | VERIFIED |
| Hydroponics Club (Oakland) | Co-President and Co-Founder | 2023-09 to ?? | "Automated hydroponics with the campus farm; greenhouse restoration." | VERIFIED; end date `>>` |
| Bullet Journaling Club | Co-Founder and Secretary | 2023-09 to ?? | "$500 raised; finals-week decompression events." | VERIFIED; end date `>>`. Consider CUT to archive. |
| Robotics Club | Co-VP and Co-Founder | 2023-09 to ?? | "$750 raised; Raspberry Pi/Arduino vehicle; K-3 STEM teaching event." | VERIFIED; end date `>>` |
| Pawhacks | Media Collaborator | 2024-02 to 2024-03 | "Media and ops for Oakland's hackathon; +40% engagement." | VERIFIED. Supporting or archive. |

NEEDS-MEHR: which six are "the six clubs you founded"? Content, Hydroponics, Bullet Journaling, Robotics are four. `>>`

### 4.5 High school (2021 to 2023), archive tier, inside `<details>`

| Org | Role | Dates | One line |
|---|---|---|---|
| 3D Printing Club | President and Co-Founder | 2022-09 to 2023-05 | "Raised funding for a makerspace; keynote at the iSTEAM fair." |
| Hydroponics Club | President and Co-Founder | 2021-01 to 2023-05 | "Started the school's first hydroponics lab in an abandoned research room." |
| Cybersecurity Club | VP | 2022-09 to 2023-05 | "Fielded a national competition team; workshops became a class." |
| Computer Science Club | Co-President and Founder | 2022-09 to 2023-05 | "Pushed for APCS, cybersecurity honors, and digital illustration in the curriculum." |
| FPTV | Co-President | 2022-09 to 2023-05 | "Student media: skits, editing, social." |

All VERIFIED from the old site, all reduced to one line. School name is not on the old site; leave it off.

---

## 5. Now feed seed entries (`src/content/now.json`)

The feed should launch with at least six entries so it does not look empty. Candidates from the last year, newest first. Each needs a date and, where it exists, a LinkedIn URL.

| Date | Type | Title | Status |
|---|---|---|---|
| 2026-09-?? | note | "Rebuilding this site from scratch. The old one was two HTML files and a purple gradient." | Write on launch day |
| 2026-09-?? | shipped | "HACK1984 site is live at claudeneu.com/hackathon. Nov 6-8, Boston, 100 seats." | NEEDS-MEHR: date `>>` |
| 2026-08/09 | talk | "Student panelist at Northeastern's NYC Convocation at The Town Hall." | NEEDS-MEHR: date, LinkedIn URL `>>` |
| 2026-07-?? | linkedin | "Started as a Data Warehouse Management Engineer co-op at General Atlantic in NYC." | NEEDS-MEHR: date, URL `>>` |
| 2026-0?-?? | press | "Named to the Huntington 100." | NEEDS-MEHR: date, URL `>>` |
| 2026-0?-?? | shipped | "Revolve x Claude Builders Spring 2026 hackathon wrapped: 78 campuses." | NEEDS-MEHR: date, URL, final numbers `>>` |
| 2025-??-?? | linkedin | "Claude Builders Club kickoff: 150+ students showed up." | NEEDS-MEHR: date, URL `>>` |
| 2024-12-?? | linkedin | "Wrapped six months at Brewster Ambulance. Snowflake, ADF, dbt, and a few ride-alongs." | NEEDS-MEHR: date, URL `>>` |

---

## 6. GitHub profile cleanup (outside the site, but the site links to it)

- Bio currently: "Locked in" developer interested in hydroponics, 3D printing, and photography. Currently learning Python, SQL, AWS, Java, React.js, and Discord bot development. **Replace with** the hero subline you pick in section 1.
- Company: General Atlantic. Location: New York, NY. Website: `https://mehr-anand.com`.
- Pinned: Backyard (if public), Inquisiv, cosint, mehr-anand.com. Unpin Simple-Quiz-Game.
- Profile README (`mesanand/mesanand`): three lines, the subline, "Now:" with one bullet, link to the site.

---

## 7. Questions for Mehr, collected

Copy this list into a note and answer each one. Everything else in the pack can proceed without you.

1. Hero subline: A, B, C, or your own.
2. Club count for the about strip (six at Oakland plus which others).
3. Public email, calendar URL, resume PDF, which socials.
4. General Atlantic metrics for the three bullets; Synapse yes/no.
5. Brewster: "largest private ambulance operator" accurate? Any number.
6. Teens4Teens: are $100K / $5K / 2M current? What is the actual tech stack?
7. Altus: public, dates, or cut.
8. NYC Connector: start month, one sentence, Experience or Leadership.
9. Dana-Farber: tools and one concrete output.
10. Backyard: your title, public repo URL, live URL, any traction.
11. bitsdime: two sentences and whether it stays.
12. TrackNTrip: hackathon name, year, placement, repo.
13. Inquisiv year (Jan 2025?).
14. Campus Nutrition Assistant: year, description, WaffleHacks confirmation.
15. Cosint: year, course or independent.
16. Pistachio: built or pitch.
17. Claude Builders Club: founding month, fall 2026 status, final hackathon numbers.
18. ACM: start month, member count.
19. AINU and NIBG: still current?
20. Rev: dates.
21. Kaleidoscope: still active?
22. PEVC: role, list or not.
23. Oakland: which six clubs did you found; end dates for Hydroponics, Bullet Journaling, Robotics.
24. Now feed: dates and LinkedIn URLs for the eight seed entries.
25. Headshot: send the file you want used (the old site used `Linkend Profile Picture.JPG`).
