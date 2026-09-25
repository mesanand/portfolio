# TODO(mehr)

Everything the build could not decide on its own. Each item points at the file and line comment (`TODO(mehr)`) where the answer goes. Source questions are in `04-CONTENT-INVENTORY.md` section 7.

`grep -rn "TODO(mehr)" src` lists every open item in code.

## Prompt 3: site-level (`src/content/site.ts`)

- [ ] **Hero subline.** Pick option A, B, or C from 04 section 1, or write your own. Currently `"TAGLINE TBD"`, shown in the hero and the footer bio.
- [ ] **Email.** Which address goes on the site? Currently `anand.me@northeastern.edu` (from your GitHub profile).
- [ ] **Resume PDF.** Put the current resume at `public/resume.pdf`. The header `[ RESUME ]` button links there and 404s until the file exists.
- [ ] **Calendar link.** Paste a Calendly URL into `calendarUrl`, or leave it `null` for none.
- [ ] **Socials.** Confirm the list. Currently GitHub, LinkedIn, and email, per the 04 recommendation. Instagram, Linktree, and Monkeytype are left off.

## Prompt 5: about strip and experience (`src/content/site.ts`, `src/content/experience.ts`)

- [ ] **Club count in the about strip.** Is "eight clubs" right (six at Oakland + Claude Builders Club + Content Club Boston)?
- [ ] **General Atlantic, bullet 1.** Add a number: pipeline count, data volume, or time saved.
- [ ] **General Atlantic, bullet 2.** Add a number: files or TB migrated in the Box-to-SharePoint migration.
- [ ] **General Atlantic, bullet 3.** Add a number: how many MCP connectors or systems.
- [ ] **General Atlantic stack.** Does Azure Synapse belong, or only Databricks?
- [ ] **Brewster location.** Confirm Boston, MA.
- [ ] **Brewster summary.** Is "the largest private ambulance operator in Massachusetts" accurate? If not, it becomes "a private ambulance operator in Massachusetts".
- [ ] **Brewster, bullet 2.** Any number: models shipped, hours saved, dollars of risk modeled.
- [ ] **Teens4Teens figures.** Are $100K+ funding / $5K donations / 2M+ views still current?
- [ ] **Teens4Teens stack.** What does it actually consist of (website platform, CRM, etc.)? The "Web" chip is a placeholder.
- [ ] **Dana-Farber output.** One concrete output from the two summers.
- [ ] **Dana-Farber tools.** Confirm Python (and anything else).
- [ ] **Altus Receivables Management (AI Training Consultant).** Did it happen, when, and can it be public? It is commented out in `experience.ts` because the schema needs real dates, a location, and a bullet. Fill in and uncomment, or delete.
- [ ] **NYC Network Connector.** Start month, one sentence on what you do, and whether it belongs under Experience or Leadership. Also commented out in `experience.ts` until answered.
- [ ] **Org links (added during the build, not from the inventory).** General Atlantic, Brewster, and Dana-Farber names link to their public homepages (all return 200). Remove the `orgUrl` fields if you'd rather not link out.
