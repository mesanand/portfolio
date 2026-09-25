# 07. Resolved Content (Mehr's answers, 2026-09-25)

This file overrides `04-CONTENT-INVENTORY.md` wherever the two disagree. Build prompts 5, 6, 7, 9, and 11 must read this file first. Every `TODO(mehr)` that 04 would have generated is answered here; if something is still unknown it is marked CUT or explicitly left blank on purpose. Do not invent numbers.

Judgment calls I made on Mehr's behalf are marked **(decided)**. He can override any of them by editing this file.

---

## 1. Site-level (`src/content/site.ts`)

| Field | Value |
|---|---|
| name | Mehr Anand |
| wordmark | `MEHR` + `ANAND` |
| tagline (hero subline) **(decided)** | "Data engineer at General Atlantic. Founder of Northeastern's Anthropic chapter. I ship pipelines by day and communities by night." |
| where-list | `NEW YORK CITY · NORTHEASTERN '27 · GENERAL ATLANTIC (NOW)` |
| about strip **(decided, no club count)** | "Rising senior at Northeastern's Khoury College, BS Computer Science with an AI concentration and a math minor, Class of 2027. Right now I'm a Data Warehouse Management Engineer co-op at General Atlantic in New York, building ETL pipelines on Azure and Databricks and wiring financial systems into AI tools with MCP. Before that I did the same for an ambulance company. I've founded clubs on two campuses and currently run the Claude Builders Club, Northeastern's official Anthropic chapter." |
| email | anand.me@northeastern.edu |
| calendar | https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2dC0LYsc25DgnScLInAsIlx61Dd7Ub0ZEy8oe9X47o2IaN-c8JmLq-tOqM89ZzXB6aHKE2rpdP (label it `[ BOOK TIME ]`) |
| resume | `/resume.pdf`. Not yet provided. Ship with the link present; Mehr drops the PDF into `public/` before prompt 13. |
| socials (in this order) | GitHub https://github.com/mesanand · LinkedIn https://www.linkedin.com/in/mehr-anand/ · X https://x.com/MehrAnand513168 · Email |
| meta description | "Mehr Anand is a data engineer and applied AI builder at Northeastern University (CS + AI, '27), currently a co-op at General Atlantic in New York. Founder of the Claude Builders Club." |

Note on the "hero subline" question: it is the one sentence under your name at the top of the home page. I picked option B. Change the `tagline` field if you want different words.

Note on GA metrics: the question was asking for numbers like "12 pipelines" or "3 TB migrated" to put in the bullets. You don't have them, so the bullets ship without numbers **(decided)** and Synapse is dropped from the stack **(decided)**.

---

## 2. Experience (`src/content/experience.ts`)

Order: newest first.

### general-atlantic
- org General Atlantic · orgUrl https://www.generalatlantic.com · role Data Warehouse Management Engineer Co-op · location New York, NY · start 2026-07 · end present · kind coop · featured true
- summary: "Data warehouse engineering for a global growth equity firm."
- bullets:
  - "Build and maintain ETL pipelines feeding the firm's Azure data lake, with QA across environments."
  - "Led a Box-to-SharePoint migration with webhook-driven triggers."
  - "Developing MCP connectors that link financial applications to AI tooling."
- stack: Azure Data Factory, Databricks, Python, SQL, MCP, SharePoint

### nyc-connector
- org Northeastern University · role NYC Network Connector · location New York, NY · start 2026-08 **(decided, from the LinkedIn post date; fix if wrong)** · end present · kind parttime · featured false
- summary: "Connecting co-ops in New York City through culture and experiential events."
- bullets: same sentence as summary, once.
- stack: none (omit chip row)

### brewster
- org Brewster Ambulance Service · orgUrl https://www.brewsterambulance.com · role Financial Machine Learning Engineer Co-op · location Boston, MA · start 2024-07 · end 2024-12 · kind coop · featured true
- summary: "ML and data engineering for a private ambulance operator with 400 vehicles and 1,800 team members."
- bullets:
  - "Pitched and won C-suite approval for Snowflake adoption, then built the first pipelines on it."
  - "Built ETL with Azure Data Factory and dbt; trained Python models for financial risk and predictive analytics."
  - "Rode along on ambulance shifts to understand the operations the data described."
- stack: Snowflake, Azure Data Factory, dbt, Python, scikit-learn, SQL

### teens4teens
- org Teens4Teens · orgUrl https://www.teens4teens.net · role Chief Technology Officer · location Remote · start 2023-05 · end present · kind nonprofit · featured false
- summary: "501(c)(3) menstrual equity nonprofit with chapters in the US and Ghana."
- bullets:
  - "Own the technology for a nonprofit with $5K in in-kind donations and grants and 2M+ views across social media."
  - "Built ML models to target outreach to the communities with the highest need."
  - "Supported international expansion including the Ghana chapter."
- stack: Python, scikit-learn, Web

### dana-farber
- org Dana-Farber Cancer Institute · role Research Intern (two summers) · location Boston, MA · start 2021-06 · end 2022-07 · kind internship · featured false
- summary: "Two summers in Dr. David Liu's group at the Broad Institute of MIT and Harvard, working on drug-trial identification."
- bullets:
  - "Collaborated with Broad Institute researchers on more efficient identification of drug-trial needs."
- stack: Python

### CUT
- Altus Receivables Management: do not mention anywhere.
- Dell Technologies: never happened, do not mention.

---

## 3. Projects (`src/content/projects.ts`)

### inquisiv (featured)
- name Inquisiv · tagline "Automated market research for dropshipping stores." · year 2025 · tags ml, web, hackathon
- description: "Finds trending products by scraping and ML, reads customer sentiment with NLP, generates ad copy, and puts it all on an analytics dashboard so e-commerce sellers can scale faster."
- outcome: "Won two tracks at FinHacks 2025: Inclusive Innovator Award and Best Web/App Dev Hack."
- stack: React, Flask, Playwright, BeautifulSoup, PyTorch, scikit-learn, NLTK, Matplotlib
- links: devpost https://devpost.com/software/inquisiv · repo https://github.com/Sadfahlsdj/Finhacks_2025

### trackntrip (featured)
- name TrackNTrip · tagline "ML-optimized road trips." · year 2025 · tags ml, hackathon
- description: "Picks the cheapest gas stops along a route by weighing fuel price against detour and time, estimates CO2, and adds AI landmark storytelling and a leaderboard so sustainable driving is a game."
- outcome: "Built at HackBeanPot 2025."
- stack: React, Flask, Leaflet.js, XGBoost, scikit-learn, SHAP, osmnx, Llama
- links: devpost https://devpost.com/software/trackntrip · repo https://github.com/Sadfahlsdj/Hack_Beanpot_2025

### campus-nutrition-assistant (featured)
- name Campus Nutrition Assistant · tagline "Dining hall menus, scraped and scored." · year 2024 · tags ai, hackathon
- description: "Scrapes Northeastern's dining hall menus and uses an LLM to build balanced daily meal plans around a student's dietary needs."
- outcome: "Honorable Mention, Student Food Insecurity track, WaffleHacks 2024."
- stack: Python, OpenAI API, Playwright
- links: devpost https://devpost.com/software/campus-nutrition-assistant · repo https://github.com/Sadfahlsdj/wafflehacks_june_2024

### cosint
- name Cosint · tagline "A REST API matching students to co-ops." · year 2024 **(decided; Mehr does not remember, this is the best guess from the repo)** · tags api, data
- description: "REST API and dashboard that connects students and employers for co-op search."
- stack: FastAPI, SQL, Streamlit, Docker
- links: video https://www.youtube.com/watch?v=xzaVzXxL7mE · repo https://github.com/EhlOps/cosint
- Note for Mehr: this was on your old site as "Created a REST API for helping students and employers seamlessly connect for finding co-ops." with a YouTube link. If you still don't recognize it after watching the video, tell Claude to CUT it.

### pistachio
- name Pistachio · tagline "A commute app for the Verizon Smart Campus competition." · year 2025 **(guess)** · tags web
- description: "Concept and pitch for a campus commute app, built for the Verizon Smart Campus competition."
- links: video https://www.youtube.com/watch?v=5Y9aCHEExkU

### CUT
- Backyard (advisor only, nothing public yet). Revisit when it launches.
- bitsdime (personal consulting company, Mehr prefers not to detail). Do not list.
- Simple-Quiz-Game, Ask Vida: not on the site.

---

## 4. Leadership (`src/content/leadership.ts`)

### Headline tier (full cells), era neu-boston, newest first

| id | org | role | start | end | summary | metrics |
|---|---|---|---|---|---|---|
| claude-builders-club | Claude Builders Club (Northeastern's official Anthropic chapter) · https://claudeneu.com | President and Founder | 2025-09 | present | "Founded and lead Northeastern's official Anthropic chapter. Kickoff drew 150+ students; the club is now 200+ members. Co-organized the Spring 2026 Revolve x Claude Builders hackathon across 78 campuses and HACK1984, a 36-hour, 100-seat hackathon in Boston, Nov 6-8 2026, with Rev, ACM, and AINU." | "200+ members", "78-campus hackathon", "HACK1984" |
| acm | ACM Northeastern | Co-Director of Growth | 2026-05 | present | "Growth and partnerships for Northeastern's ACM chapter: employer outreach, faculty recruitment for a software engineering course, and recurring operations and strategy." | "30 members" |
| rev | Rev (Northeastern student entrepreneurship) | Alumni Corps (previously Director of Growth) | 2025-01 | present | "Cohort member (Spring 2025), e-board (Fall 2025), Director of Growth (Spring 2026), now Alumni Corps. Planned the Revolve hackathon with a $50K fundraising goal and a $12K grand prize." | "$50K goal", "$12K grand prize" |

### Supporting tier (one line each), era neu-boston

Dates confirmed from Mehr's LinkedIn Organizations section (2026-09-25).

| id | org | role | start | end | one line |
|---|---|---|---|---|---|
| cosmo | Computer Science Mentoring Organization (COSMO) | Mentor | 2025-09 | present | "Tutoring and mentoring 40+ computer science students at Northeastern." |
| pevc | Northeastern PEVC | Development Associate | 2026-01 **(guess, fix if wrong)** | present | "Private equity and venture capital club." |
| nibg | Northeastern Investment Banking Group | Advisor (prev. VP of Technology, VP of Quantitative Research) | 2025-01 | present | "Got the group through SGA recognition, built automations, and directed the website build. VP roles Jan 2025 to Feb 2026, advisor since." |
| ainu | Northeastern AI Club (AINU) | Director of Operations | 2025-03 | 2026-02 | "Landed Adobe, Anthropic, Snowflake, and Fidelity sponsorships; organized Innovate 2026, a weekend hackathon, solo in a month; launched Bioinformatics, Dev, and Quant teams; +40% membership, +60% retention." |
| huntington-angels | Huntington Angels Network | Junior Associate | 2025-09 | 2026-01 | "Due diligence on startups feeding $5.3M+ in funding introductions; sourced 40+ ventures through outreach and alumni networks." |
| kaleidoscope | Kaleidoscope | Head of Software (prev. Software Team) | 2025-02 | 2025-09 | "AWS resource management for a platform serving 80K+ student developers, 40+ organizations, and 9K end users." |
| buildspace | Buildspace | Nights & Weekends S5 | 2024-06 | 2024-08 | "Six-week build cohort." |

### Honors (`honors` array)

| year | title | body | url |
|---|---|---|---|
| 2026 | Huntington 100 | "Named to Northeastern's Huntington 100, recognizing 100 students for achievement and leadership." | |
| 2026 | NYC Convocation student panelist | "Featured student panelist at Northeastern's NYC Convocation at The Town Hall." | https://www.linkedin.com/posts/mehr-anand_northeastern-nyc-commencement2026-activity-7503792455109124096-ZUn8 |
| 2025 | FinHacks, two track wins | "Inclusive Innovator Award and Best Web/App Dev Hack for Inquisiv." | https://devpost.com/software/inquisiv |
| 2024 | WaffleHacks Honorable Mention | "Student Food Insecurity track, Campus Nutrition Assistant." | https://devpost.com/software/campus-nutrition-assistant |

### Supporting tier, era neu-oakland (one line each)

Mehr founded or co-founded the first four. Dates end 2025-05 where LinkedIn gives none **(decided: the Oakland roles ended when he transferred to Boston)**.

| id | org | role | start | end | one line |
|---|---|---|---|---|---|
| content-club | Content Club | Founder and President | 2023-09 | 2025-03 | "Founded Oakland's media club, partnered with Adobe, took over SGA's social media, 50K+ views, $500 raised, expanded to the Boston campus." |
| hydroponics-oakland | Hydroponics Club | Co-President and Co-Founder | 2023-09 | 2025-05 | "Automated hydroponics with the campus farm; greenhouse restoration." |
| robotics | Robotics Club | Co-VP and Co-Founder | 2023-09 | 2025-05 | "$750 raised; Raspberry Pi and Arduino vehicle; K-3 STEM teaching event." |
| bullet-journaling | Bullet Journaling Club | Co-Founder and Secretary | 2023-09 | 2025-05 | "$500 raised; finals-week decompression events." |
| rsa | Resident Student Association | Co-President (prev. Secretary) | 2024-09 | 2025-04 | "Oversaw a $10K+ dorm budget, monthly PEP-funded events, and recruiting for the Sheraton Hotel residence committee." |
| ai-club-oakland | Artificial Intelligence Club (Oakland) | Treasurer | 2024-09 | 2025-03 | "Managed a $65K budget through SGA, SOC, and SOOC approval." |
| sga-sob | Student Government Governance Board | Secretary (prev. Member) | 2024-09 | 2025-02 | "Reviewed 500+ constitutions and drove electoral changes in Student Senate for campus organizations." |
| pawhacks | Pawhacks | Media Collaborator | 2024-02 | 2024-03 | "Media and ops for Oakland's hackathon; +40% engagement." |

### Archive tier, era high-school (inside `<details>`)

Unchanged from `04-CONTENT-INVENTORY.md` section 4.5.

---

## 5. Now feed seed (`src/content/now.json`)

Dates decoded from the LinkedIn activity IDs (accurate to the day, UTC). Titles and bodies are placeholders that describe what the post is about based on the URL slug and timeline; Mehr should replace title/body with the post's real first line and a two-sentence summary. Newest first.

| id | date | type | title (placeholder) | url | tags |
|---|---|---|---|---|---|
| 2026-09-25-rebuild | 2026-09-25 | note | "Rebuilding this site from scratch. The old one was two HTML files and a purple gradient." | | personal |
| 2026-09-10-convocation | 2026-09-10 | talk | "Student panelist at Northeastern's NYC Convocation at The Town Hall." | https://www.linkedin.com/posts/mehr-anand_northeastern-nyc-commencement2026-activity-7503792455109124096-ZUn8 | northeastern, speaking |
| 2026-08-11-connector | 2026-08-11 | linkedin | "Joined Northeastern's NYC Network Connector program." | https://www.linkedin.com/posts/mehr-anand_northeastern-nucoop-networkconnector-activity-7492925268928528384-yPw6 | northeastern, personal |
| 2026-05-11-rev | 2026-05-11 | linkedin | "Wrapping up as Director of Growth at Rev." | https://www.linkedin.com/posts/mehr-anand_rev-northeastern-studentfounders-activity-7459645068124049408-i3Z_ | northeastern, hackathon |
| 2026-04-21-post | 2026-04-21 | linkedin | (Mehr: fill in) | https://www.linkedin.com/feed/update/urn:li:activity:7452383719207772160/ | |
| 2026-01-28-post | 2026-01-28 | linkedin | (Mehr: fill in) | https://www.linkedin.com/feed/update/urn:li:activity:7422326694734286848/ | |
| 2025-08-27-post | 2025-08-27 | linkedin | (Mehr: fill in; likely CBC kickoff or fall start) | https://www.linkedin.com/feed/update/urn:li:activity:7366477534730891268/ | claude-builders |
| 2025-07-07-post | 2025-07-07 | linkedin | (Mehr: fill in) | https://www.linkedin.com/feed/update/urn:li:activity:7347946190128263168/ | |
| 2025-05-20-post | 2025-05-20 | linkedin | (Mehr: fill in) | https://www.linkedin.com/feed/update/urn:li:activity:7330600497734660097/ | |

Entries with "(Mehr: fill in)" ship with `title: "LinkedIn post"` and an empty body until replaced. Prompt 9 must not invent content for them. Mehr has confirmed he will fill these in later; the site launches with them as bare links.

---

## 6. Headshot

`docs/overhaul/assets/headshot.jpg` (6000 x 4000, JPEG). Prompt 11 copies it to `src/assets/headshot.jpg` and crops to a centered square around the face before generating the 320/480 AVIF and WebP variants. The grayscale-at-rest treatment applies.

---

## 7. Still on Mehr (before prompt 13)

1. Drop the current resume PDF into `public/resume.pdf`.
2. Replace the five "(Mehr: fill in)" now-feed entries with real titles and two-sentence bodies (or use `docs/overhaul/skills/now-entry.md` once prompt 9 creates it).
3. Confirm or fix the two dates still marked **(guess)**: NYC Connector start and PEVC start.

## 8. LinkedIn headline (for reference, prompt 10 may reuse for meta)

"Data Engineer @ General Atlantic | Prev. ML @ Brewster | T4T CTO | Founder @ BitsDime | ACM + PEVC | Adobe + SPM | Huntington 100" 

---

## 9. Changes from chat with Mehr (2026-09-25, afternoon). These override everything above.

- **Headshot:** always in color (no grayscale), 280px square from 640px up, 200px on phones.
- **About strip:** "...and currently advise the Claude Builders Club, Northeastern's official Anthropic chapter."
- **Claude Builders Club:** role is "Founder and Advisor".
- **NYC Network Connector:** summary only; the duplicate bullet is removed (Experience `bullets` may now be empty).
- **Job photos:** General Atlantic, Brewster, Teens4Teens, and the NYC Connector have photos (`src/assets/work/`), shown in color on /work and Home.
- **Company logos (General Atlantic, Brewster):** Mehr likes the idea; parked until he comes back to it.
- **Cosint:** CS 3200 (Database Design) final project; video https://www.youtube.com/watch?v=xzaVzXxL7mE.
- **Pistachio:** entry for the Northeastern Verizon Campus Challenge; video https://www.youtube.com/watch?v=5Y9aCHEExkU.
- **Chordly (new project):** CS 4100 (Artificial Intelligence) final project, 2026. Mehr was project manager (system design, frontend) on a team of four. Markov chain, PyTorch LSTM, and a genetic algorithm generating chord progressions; music21 + FluidSynth audio; FastAPI + Streamlit. Repo https://github.com/Sadfahlsdj/CS4100-Project, video https://youtu.be/r7bYgrsZ570.
- **AINU:** merged with the old "Artificial Intelligence Club (Oakland), Treasurer" entry. One role: Director of Operations and Chief People Officer, Mar 2025 to Mar 2026 (Mehr left in March 2026), supporting tier under Boston. Bullets from Mehr: sponsorships with Adobe and Anthropic plus 10+ collaborations with clubs, societies, organizations, and companies; managed $20,000 across client, partnership, sponsorship, and school funding; restructured and created the Quantitative Research, Software Development Consulting, and Bioinformatics branches, leading recruitment and end-to-end deliverables.
- **NIBG:** headline tier (full card).
- **Resident Student Association:** Boston era, not Oakland.
- **Buildspace Nights & Weekends S5:** moved from leadership to honors.
- **Now feed:** cut. No /now page, no NOW nav link, no now.json, no RSS. Replaced on Home by a **Highlights** carousel of photos (`src/content/highlights.ts`, `src/assets/highlights/`). Mehr writes the captions. Prompt 9 in 05-BUILD-PROMPTS is obsolete.
- **GitHub heatmap:** go ahead with prompt 8 (token is in `.env.local`).
