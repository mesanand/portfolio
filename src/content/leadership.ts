// Leadership (clubs) and honors. Source: docs/overhaul/07-ANSWERS.md section 4
// (overrides 04-CONTENT-INVENTORY.md section 4); the high-school archive is
// unchanged from 04 section 4.5.
// Tiers: headline = full cell, supporting = one line, archive = inside <details>.
// Order does not matter; src/content/index.ts sorts newest first.
import type { HonorInput, RoleInput } from "./schemas";

export const leadership: RoleInput[] = [
  // --- Headline tier, Boston -------------------------------------------------
  {
    id: "claude-builders-club",
    org: "Claude Builders Club",
    orgUrl: "https://claudeneu.com",
    role: "President and Founder",
    start: "2025-09",
    end: "present",
    current: true,
    tier: "headline",
    // Reworded from 07 to fit the 260-character schema limit; same facts.
    summary:
      "Founded and lead Northeastern's official Anthropic chapter: 150+ at kickoff, 200+ members now. Co-organized the Spring 2026 Revolve x Claude Builders hackathon across 78 campuses and HACK1984 (36 hours, 100 seats, Boston, Nov 6-8 2026) with Rev, ACM, and AINU.",
    metrics: ["200+ members", "78-campus hackathon", "HACK1984"],
    era: "neu-boston",
  },
  {
    id: "acm",
    org: "ACM Northeastern",
    role: "Co-Director of Growth",
    start: "2026-05",
    end: "present",
    current: true,
    tier: "headline",
    summary:
      "Growth and partnerships for Northeastern's ACM chapter: employer outreach, faculty recruitment for a software engineering course, and recurring operations and strategy.",
    metrics: ["30 members"],
    era: "neu-boston",
  },
  {
    id: "rev",
    org: "Rev",
    role: "Alumni Corps (previously Director of Growth)",
    start: "2025-01",
    end: "present",
    current: true,
    tier: "headline",
    summary:
      "Northeastern's student entrepreneurship community. Cohort member (Spring 2025), e-board (Fall 2025), Director of Growth (Spring 2026), now Alumni Corps. Planned the Revolve hackathon with a $50K fundraising goal and a $12K grand prize.",
    metrics: ["$50K goal", "$12K grand prize"],
    era: "neu-boston",
  },

  // --- Supporting tier, Boston -----------------------------------------------
  {
    id: "nibg",
    org: "Northeastern Investment Banking Group",
    role: "Advisor (previously VP of Quantitative Research)",
    start: "2025-01",
    end: "present",
    current: true,
    tier: "supporting",
    summary:
      "Algorithmic trading research and the work to get the group recognized as an official SGA club.",
    era: "neu-boston",
  },
  {
    id: "pevc",
    org: "Northeastern PEVC",
    role: "Development Associate",
    start: "2026-01", // TODO(mehr): start month is a guess; fix if wrong.
    end: "present",
    current: true,
    tier: "supporting",
    summary: "Private equity and venture capital club.",
    era: "neu-boston",
  },
  {
    id: "ainu",
    org: "Northeastern AI Club (AINU)",
    role: "Director of Operations",
    start: "2025-03",
    end: "2026-05", // TODO(mehr): end month is a guess; fix if wrong.
    tier: "supporting",
    summary:
      "Built the retention system, launched three specialist teams, ran events with Fidelity, brought in Anthropic and Adobe as sponsors.",
    era: "neu-boston",
  },
  {
    id: "kaleidoscope",
    org: "Kaleidoscope",
    role: "Software Team",
    start: "2025-09",
    end: "2026-05", // TODO(mehr): end month is a guess; fix if wrong.
    tier: "supporting",
    summary:
      "AWS resource management for a platform serving 80K+ student developers and 40+ organizations.",
    era: "neu-boston",
  },

  // --- Supporting tier, Oakland (ended with the transfer to Boston) ----------
  {
    id: "content-club",
    org: "Content Club",
    role: "President and Founder",
    start: "2023-09",
    end: "2025-05",
    tier: "supporting",
    summary:
      "Founded Oakland's media club, took over SGA's social media, 50K+ views, $500 raised, expanded to the London and Boston campuses with Adobe sponsorship.",
    era: "neu-oakland",
  },
  {
    id: "hydroponics-oakland",
    org: "Hydroponics Club",
    role: "Co-President and Co-Founder",
    start: "2023-09",
    end: "2025-05",
    tier: "supporting",
    summary: "Automated hydroponics with the campus farm; greenhouse restoration.",
    era: "neu-oakland",
  },
  {
    id: "robotics",
    org: "Robotics Club",
    role: "Co-VP and Co-Founder",
    start: "2023-09",
    end: "2025-05",
    tier: "supporting",
    summary: "$750 raised; Raspberry Pi and Arduino vehicle; K-3 STEM teaching event.",
    era: "neu-oakland",
  },
  {
    id: "bullet-journaling",
    org: "Bullet Journaling Club",
    role: "Co-Founder and Secretary",
    start: "2023-09",
    end: "2025-05",
    tier: "supporting",
    summary: "$500 raised; finals-week decompression events.",
    era: "neu-oakland",
  },
  {
    id: "rsa",
    org: "Resident Student Association",
    role: "Co-President",
    start: "2024-09",
    end: "2025-04",
    tier: "supporting",
    summary: "$10K+ in funding, PEP budgeting, student advocacy for the residence hall.",
    era: "neu-oakland",
  },
  {
    id: "ai-club-oakland",
    org: "Artificial Intelligence Club (Oakland)",
    role: "Treasurer",
    start: "2024-09",
    end: "2025-03",
    tier: "supporting",
    summary: "Managed a $65K budget through SGA, SOC, and SOOC approval.",
    era: "neu-oakland",
  },
  {
    id: "sga-sob",
    org: "SGA Student Organizations Board",
    role: "Secretary",
    start: "2024-09",
    end: "2025-02",
    tier: "supporting",
    summary: "Constitution and bylaw review for 500+ organizations.",
    era: "neu-oakland",
  },
  {
    id: "pawhacks",
    org: "Pawhacks",
    role: "Media Collaborator",
    start: "2024-02",
    end: "2024-03",
    tier: "supporting",
    summary: "Media and ops for Oakland's hackathon; +40% engagement.",
    era: "neu-oakland",
  },

  // --- Archive tier, high school (04 s4.5; school name deliberately omitted) --
  {
    id: "hs-3d-printing",
    org: "3D Printing Club",
    role: "President and Co-Founder",
    start: "2022-09",
    end: "2023-05",
    tier: "archive",
    summary: "Raised funding for a makerspace; keynote at the iSTEAM fair.",
    era: "high-school",
  },
  {
    id: "hs-hydroponics",
    org: "Hydroponics Club",
    role: "President and Co-Founder",
    start: "2021-01",
    end: "2023-05",
    tier: "archive",
    summary: "Started the school's first hydroponics lab in an abandoned research room.",
    era: "high-school",
  },
  {
    id: "hs-cybersecurity",
    org: "Cybersecurity Club",
    role: "VP",
    start: "2022-09",
    end: "2023-05",
    tier: "archive",
    summary: "Fielded a national competition team; workshops became a class.",
    era: "high-school",
  },
  {
    id: "hs-cs-club",
    org: "Computer Science Club",
    role: "Co-President and Founder",
    start: "2022-09",
    end: "2023-05",
    tier: "archive",
    summary: "Pushed for APCS, cybersecurity honors, and digital illustration in the curriculum.",
    era: "high-school",
  },
  {
    id: "hs-fptv",
    org: "FPTV",
    role: "Co-President",
    start: "2022-09",
    end: "2023-05",
    tier: "archive",
    summary: "Student media: skits, editing, social.",
    era: "high-school",
  },
];

export const honors: HonorInput[] = [
  {
    year: 2026,
    title: "Huntington 100",
    body: "Named to Northeastern's Huntington 100, recognizing 100 students for achievement and leadership.",
  },
  {
    year: 2026,
    title: "NYC Convocation student panelist",
    body: "Featured student panelist at Northeastern's NYC Convocation at The Town Hall.",
    url: "https://www.linkedin.com/posts/mehr-anand_northeastern-nyc-commencement2026-activity-7503792455109124096-ZUn8",
  },
  {
    year: 2025,
    title: "FinHacks, two track wins",
    body: "Inclusive Innovator Award and Best Web/App Dev Hack for Inquisiv.",
    url: "https://devpost.com/software/inquisiv",
  },
  {
    year: 2024,
    title: "WaffleHacks Honorable Mention",
    body: "Student Food Insecurity track, Campus Nutrition Assistant.",
    url: "https://devpost.com/software/campus-nutrition-assistant",
  },
];
