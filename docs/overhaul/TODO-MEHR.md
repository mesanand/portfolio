# TODO(mehr)

Everything the build could not decide on its own. Each item points at the file and line comment (`TODO(mehr)`) where the answer goes. Source questions are in `04-CONTENT-INVENTORY.md` section 7.

`grep -rn "TODO(mehr)" src` lists every open item in code.

## Prompt 3: site-level (`src/content/site.ts`)

- [ ] **Hero subline.** Pick option A, B, or C from 04 section 1, or write your own. Currently `"TAGLINE TBD"`, shown in the hero and the footer bio.
- [ ] **Email.** Which address goes on the site? Currently `anand.me@northeastern.edu` (from your GitHub profile).
- [ ] **Resume PDF.** Put the current resume at `public/resume.pdf`. The header `[ RESUME ]` button links there and 404s until the file exists.
- [ ] **Calendar link.** Paste a Calendly URL into `calendarUrl`, or leave it `null` for none.
- [ ] **Socials.** Confirm the list. Currently GitHub, LinkedIn, and email, per the 04 recommendation. Instagram, Linktree, and Monkeytype are left off.
