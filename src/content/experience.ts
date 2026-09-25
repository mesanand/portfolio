// Experience. Source: docs/overhaul/04-CONTENT-INVENTORY.md section 2.
// Only paid or formal work goes here; clubs are in leadership.ts.
// Order does not matter; src/content/index.ts sorts newest first.
import type { ExperienceInput } from "./schemas";

export const experience: ExperienceInput[] = [
  {
    id: "general-atlantic",
    org: "General Atlantic",
    orgUrl: "https://www.generalatlantic.com",
    role: "Data Warehouse Management Engineer Co-op",
    location: "New York, NY",
    start: "2026-07",
    end: "present",
    kind: "coop",
    summary: "Data warehouse engineering for a growth equity firm.",
    bullets: [
      // TODO(mehr): add a number to this bullet: pipeline count, data volume, or time saved?
      "Build and maintain ETL pipelines feeding the firm's Azure data lake, with QA across environments.",
      // TODO(mehr): add a number to this bullet: files or TB migrated?
      "Led a Box-to-SharePoint migration with webhook-driven triggers.",
      // TODO(mehr): add a number to this bullet: how many connectors or systems?
      "Developing MCP connectors that link financial applications to AI tooling.",
    ],
    stack: [
      "Azure Data Factory",
      "Databricks",
      "Azure Synapse", // TODO(mehr): does Synapse belong in the stack, or only Databricks?
      "Python",
      "SQL",
      "MCP",
      "SharePoint",
    ],
    featured: true,
  },
  {
    id: "brewster-ambulance",
    org: "Brewster Ambulance Service",
    orgUrl: "https://www.brewsterambulance.com",
    role: "Financial Machine Learning Engineer Co-op",
    location: "Boston, MA", // TODO(mehr): confirm location is Boston, MA.
    start: "2024-07",
    end: "2024-12",
    kind: "coop",
    // TODO(mehr): is "largest private ambulance operator in Massachusetts" accurate? If not: "a private ambulance operator in Massachusetts".
    summary: "ML and data engineering for the largest private ambulance operator in Massachusetts.",
    bullets: [
      "Pitched and won C-suite approval for a Snowflake adoption, then built the first pipelines on it.",
      // TODO(mehr): any number here (models shipped, hours saved, dollars of risk modeled)?
      "Built ETL with Azure Data Factory and dbt; trained Python models for financial risk and predictive analytics.",
      "Rode along on ambulance shifts to understand the operations the data described.",
    ],
    stack: ["Snowflake", "Azure Data Factory", "dbt", "Python", "scikit-learn", "SQL"],
    featured: true,
  },
  {
    id: "teens4teens",
    org: "Teens4Teens",
    role: "Chief Technology Officer",
    location: "Remote",
    start: "2023-05",
    end: "present",
    kind: "nonprofit",
    summary: "501(c)(3) menstrual equity nonprofit with chapters in the US and Ghana.",
    bullets: [
      // TODO(mehr): are the $100K / $5K / 2M figures still current?
      "Own the technology stack for a nonprofit with $100K+ in funding, $5K in donations, and 2M+ content views.",
      "Built ML models to target outreach to the communities with the highest need.",
      "Supported international expansion including the Ghana chapter.",
    ],
    // TODO(mehr): what does the stack actually consist of (website platform, CRM, etc.)? "Web" is a placeholder.
    stack: ["Python", "scikit-learn", "Web"],
  },
  {
    id: "dana-farber",
    org: "Dana-Farber Cancer Institute",
    orgUrl: "https://www.dana-farber.org",
    role: "Research Intern",
    location: "Boston, MA",
    start: "2021-06",
    end: "2022-07",
    kind: "internship",
    summary:
      "Two summers on drug-trial identification with the Broad Institute of MIT and Harvard.",
    bullets: [
      // TODO(mehr): add one concrete output from the internship.
      "Collaborated with Broad Institute researchers on more efficient identification of drug-trial needs.",
    ],
    stack: ["Python"], // TODO(mehr): confirm tools used (Python?).
  },

  // TODO(mehr): Altus Receivables Management, AI Training Consultant (04 s2.4). Did it happen,
  // when, and can it be public? Left out of the site until answered because the schema needs
  // real dates, a location, and at least one bullet. If yes, fill in and uncomment; if not, delete.
  // {
  //   id: "altus",
  //   org: "Altus Receivables Management",
  //   role: "AI Training Consultant",
  //   location: "[LOCATION]",
  //   start: "2026-[MM]",
  //   end: "[YYYY-MM or present]",
  //   kind: "consulting",
  //   summary: "Scoped and delivered a Claude training program for senior leadership.",
  //   bullets: ["[One bullet with a number]"],
  //   stack: ["Claude"],
  // },

  // TODO(mehr): Northeastern NYC Network Connector, part-time (04 s2.5). Needs a start month,
  // one sentence on what you actually do, and a decision: Experience or Leadership (list it in
  // one place only). Left out of the site until answered.
  // {
  //   id: "neu-nyc-connector",
  //   org: "Northeastern University",
  //   role: "NYC Network Connector",
  //   location: "New York, NY",
  //   start: "2026-[MM]",
  //   end: "present",
  //   kind: "parttime",
  //   summary: "Connect NYC-based co-op students with alumni and employers through the Connector Program.",
  //   bullets: ["[What you actually do, one sentence]"],
  //   stack: [],
  // },
];
