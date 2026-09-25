// Site-level copy. Source: docs/overhaul/04-CONTENT-INVENTORY.md section 1.

export type SocialIcon = "github" | "linkedin" | "mail" | "calendar";

export interface Social {
  label: string;
  /** Short line under the label on link cards. */
  handle: string;
  url: string;
  icon: SocialIcon;
}

export interface Site {
  name: string;
  wordmark: readonly [string, string];
  tagline: string;
  whereList: readonly string[];
  email: string;
  location: string;
  resumeUrl: string;
  calendarUrl: string | null;
  socials: readonly Social[];
  /** About strip on Home, next to the headshot (~60 words). */
  about: string;
  metaDescription: string;
  footerTagline: string;
}

// TODO(mehr): which email goes on the site? Using the address from the GitHub profile for now.
const EMAIL = "anand.me@northeastern.edu";

export const site: Site = {
  name: "Mehr Anand",
  wordmark: ["MEHR", "ANAND"],
  // TODO(mehr): pick hero subline option A, B, or C from 04 section 1, or write your own.
  tagline: "TAGLINE TBD",
  // Change "GENERAL ATLANTIC (NOW)" when the co-op ends in Dec 2026.
  whereList: ["NEW YORK CITY", "NORTHEASTERN '27", "GENERAL ATLANTIC (NOW)"],
  email: EMAIL,
  location: "New York, NY",
  // TODO(mehr): provide the current resume PDF at public/resume.pdf.
  resumeUrl: "/resume.pdf",
  // TODO(mehr): paste a Calendly URL, or leave null for none.
  calendarUrl: null,
  // TODO(mehr): confirm socials. Recommendation from 04 section 1: GitHub, LinkedIn, email only.
  socials: [
    {
      label: "GitHub",
      handle: "github.com/mesanand",
      url: "https://github.com/mesanand",
      icon: "github",
    },
    {
      label: "LinkedIn",
      handle: "in/mehr-anand",
      url: "https://www.linkedin.com/in/mehr-anand",
      icon: "linkedin",
    },
    {
      label: "Email",
      handle: EMAIL,
      url: `mailto:${EMAIL}`,
      icon: "mail",
    },
  ],
  // TODO(mehr): is "eight clubs" right (six at Oakland + Claude Builders Club + Content Club Boston)? Confirm the count.
  about:
    "Rising senior at Northeastern's Khoury College, BS Computer Science with an AI concentration and a math minor, Class of 2027. Right now I'm a Data Warehouse Management Engineer co-op at General Atlantic in New York, building ETL pipelines on Azure and Databricks and wiring financial systems into AI tools with MCP. Before that I did the same for an ambulance company. I've founded eight clubs across two campuses and currently run the Claude Builders Club, Northeastern's official Anthropic chapter.",
  metaDescription:
    "Mehr Anand is a data engineer and applied AI builder at Northeastern University (CS + AI, '27), currently a co-op at General Atlantic in New York. Founder of the Claude Builders Club.",
  footerTagline: "Built with Vite, React, and a lot of Geist Mono.",
};
