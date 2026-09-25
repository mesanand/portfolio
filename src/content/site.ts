// Site-level copy. Source: docs/overhaul/07-ANSWERS.md section 1
// (overrides 04-CONTENT-INVENTORY.md section 1).

export type SocialIcon = "github" | "linkedin" | "x" | "mail" | "calendar";

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
  /** Booking page, shown as [ BOOK TIME ]. */
  calendarUrl: string | null;
  socials: readonly Social[];
  /** About strip on Home, next to the headshot (~60 words). */
  about: string;
  metaDescription: string;
  footerTagline: string;
}

const EMAIL = "anand.me@northeastern.edu";

export const site: Site = {
  name: "Mehr Anand",
  wordmark: ["MEHR", "ANAND"],
  tagline:
    "Data engineer at General Atlantic. Founder of Northeastern's Anthropic chapter. I ship pipelines by day and communities by night.",
  // Change "GENERAL ATLANTIC (NOW)" when the co-op ends in Dec 2026.
  whereList: ["NEW YORK CITY", "NORTHEASTERN '27", "GENERAL ATLANTIC (NOW)"],
  email: EMAIL,
  location: "New York, NY",
  // TODO(mehr): drop the current resume PDF into public/resume.pdf before launch.
  resumeUrl: "/resume.pdf",
  calendarUrl:
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2dC0LYsc25DgnScLInAsIlx61Dd7Ub0ZEy8oe9X47o2IaN-c8JmLq-tOqM89ZzXB6aHKE2rpdP",
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
      url: "https://www.linkedin.com/in/mehr-anand/",
      icon: "linkedin",
    },
    {
      label: "X",
      handle: "@MehrAnand513168",
      url: "https://x.com/MehrAnand513168",
      icon: "x",
    },
    {
      label: "Email",
      handle: EMAIL,
      url: `mailto:${EMAIL}`,
      icon: "mail",
    },
  ],
  about:
    "Rising senior at Northeastern's Khoury College, BS Computer Science with an AI concentration and a math minor, Class of 2027. Right now I'm a Data Warehouse Management Engineer co-op at General Atlantic in New York, building ETL pipelines on Azure and Databricks and wiring financial systems into AI tools with MCP. Before that I did the same for an ambulance company. I've founded clubs on two campuses and currently advise the Claude Builders Club, Northeastern's official Anthropic chapter.",
  metaDescription:
    "Mehr Anand is a data engineer and applied AI builder at Northeastern University (CS + AI, '27), currently a co-op at General Atlantic in New York. Founder of the Claude Builders Club.",
  footerTagline: "Built with Vite, React, and a lot of Geist Mono.",
};
