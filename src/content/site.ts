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
  /** No public resume (Mehr's choice); this opens an email asking for it. */
  resumeRequestUrl: string;
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
    "Data Engineer, GTM strategist, AI consultant. I ship pipelines by day and communities by night.",
  // Change "GENERAL ATLANTIC (NOW)" when the co-op ends in Dec 2026.
  whereList: ["NEW YORK CITY", "NORTHEASTERN '27", "GENERAL ATLANTIC (NOW)"],
  email: EMAIL,
  location: "New York, NY",
  resumeRequestUrl: `mailto:${EMAIL}?subject=${encodeURIComponent("Resume request")}`,
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
    "I'm a Northeastern senior in Computer Science and AI, currently a data engineering co-op at General Atlantic in New York after an ML co-op at Brewster Ambulance. I'm looking for full-time roles at the intersection of finance or healthcare and applied AI, where technical depth meets business judgment: between growth/private equity, bioinformatics / EMS and the firms building or deploying AI in those markets.",
  metaDescription:
    "Mehr Anand is a data engineer and applied AI builder at Northeastern University (CS + AI, '27), currently a co-op at General Atlantic in New York. Founder of the Claude Builders Club.",
  footerTagline: "Built with Vite, React, and a lot of Geist Mono.",
};
