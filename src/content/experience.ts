// Experience. Source: docs/overhaul/07-ANSWERS.md section 2
// (overrides 04-CONTENT-INVENTORY.md section 2).
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
    summary: "Data warehouse engineering for a global growth equity firm.",
    bullets: [
      "Build and maintain ETL pipelines feeding the firm's Azure data lake, with QA across environments.",
      "Led a Box-to-SharePoint migration with webhook-driven triggers.",
      "Developing MCP connectors that link financial applications to AI tooling.",
    ],
    stack: ["Azure Data Factory", "Databricks", "Python", "SQL", "MCP", "SharePoint"],
    featured: true,
    image: "general-atlantic.jpg",
    imageAlt: "Mehr in the General Atlantic lobby in New York.",
  },
  {
    id: "nyc-connector",
    org: "Northeastern University",
    role: "NYC Network Connector",
    location: "New York, NY",
    start: "2026-08", // TODO(mehr): start month is a guess from the LinkedIn post date; fix if wrong.
    end: "present",
    kind: "parttime",
    summary: "Connecting co-ops in New York City through culture and experiential events.",
    bullets: [],
    stack: [],
    image: "nyc-connector.jpg",
    imageAlt: "Northeastern co-op students at Citi Field.",
  },
  {
    id: "brewster",
    org: "Brewster Ambulance Service",
    orgUrl: "https://www.brewsterambulance.com",
    role: "Financial Machine Learning Engineer Co-op",
    location: "Boston, MA",
    start: "2024-07",
    end: "2024-12",
    kind: "coop",
    summary:
      "ML and data engineering for a private ambulance operator with 400 vehicles and 1,800 team members.",
    bullets: [
      "Pitched and won C-suite approval for Snowflake adoption, then built the first pipelines on it.",
      "Built ETL with Azure Data Factory and dbt; trained Python models for financial risk and predictive analytics.",
      "Rode along on ambulance shifts to understand the operations the data described.",
    ],
    stack: ["Snowflake", "Azure Data Factory", "dbt", "Python", "scikit-learn", "SQL"],
    featured: true,
    image: "brewster.jpg",
    imageAlt: "Mehr with two Brewster colleagues in front of a Brewster ambulance.",
  },
  {
    id: "teens4teens",
    org: "Teens4Teens",
    orgUrl: "https://www.teens4teens.net",
    role: "Chief Technology Officer",
    location: "Remote",
    start: "2023-05",
    end: "present",
    kind: "nonprofit",
    summary: "501(c)(3) menstrual equity nonprofit with chapters in the US and Ghana.",
    bullets: [
      "Own the technology for a nonprofit with $5K in in-kind donations and grants and 2M+ views across social media.",
      "Built ML models to target outreach to the communities with the highest need.",
      "Supported international expansion including the Ghana chapter.",
    ],
    stack: ["Python", "scikit-learn", "Web"],
    image: "teens4teens.jpg",
    imageAlt: "Mehr and Teens4Teens volunteers packing supply bags on a New York street.",
  },
  {
    id: "dana-farber",
    org: "Dana-Farber Cancer Institute",
    role: "Research Intern (two summers)",
    location: "Boston, MA",
    start: "2021-06",
    end: "2022-07",
    kind: "internship",
    summary:
      "Two summers in Dr. David Liu's group at the Broad Institute of MIT and Harvard, working on drug-trial identification.",
    bullets: [
      "Collaborated with Broad Institute researchers on more efficient identification of drug-trial needs.",
    ],
    stack: ["Python"],
  },
];
