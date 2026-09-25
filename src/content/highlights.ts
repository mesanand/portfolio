// Home "Highlights" carousel (replaces the Now feed, per Mehr on 2026-09-25).
// `image` is a filename in src/assets/highlights/. Order here is the carousel order.
// Titles are working titles from what each photo shows; captions are Mehr's to write.
import type { HighlightInput } from "./schemas";

export const highlights: HighlightInput[] = [
  {
    id: "convocation",
    title: "NYC Convocation panel",
    caption: "", // TODO(mehr): caption
    image: "convocation.jpg",
    alt: "Mehr on stage with three other student panelists at Northeastern's NYC Convocation.",
    url: "https://www.linkedin.com/posts/mehr-anand_northeastern-nyc-commencement2026-activity-7503792455109124096-ZUn8",
  },
  {
    id: "societies-of-distinction",
    title: "Societies of Distinction", // TODO(mehr): confirm title (Huntington 100 induction?)
    caption: "", // TODO(mehr): caption
    image: "societies-of-distinction.jpg",
    alt: "Mehr with two students at a Northeastern Societies of Distinction event.",
  },
  {
    id: "techcrunch-disrupt",
    title: "TechCrunch Disrupt",
    caption: "", // TODO(mehr): caption
    image: "techcrunch-disrupt.jpg",
    alt: "Mehr with a group of students and Perplexity team members at TechCrunch Disrupt.",
  },
  {
    id: "snowflake",
    title: "Snowflake", // TODO(mehr): event name (Snowflake World Tour? Summit?)
    caption: "", // TODO(mehr): caption
    image: "snowflake.jpg",
    alt: "Mehr in front of the Snowflake exhibiting partners wall.",
  },
  {
    id: "claude-builders-club-meeting",
    title: "Claude Builders Club",
    caption: "", // TODO(mehr): caption
    image: "claude-builders-club.jpg",
    alt: "Mehr presenting Anthropic API credits for student builders at a Claude Builders Club meeting.",
  },
  {
    id: "buildspace",
    title: "Buildspace Nights & Weekends S5",
    caption: "", // TODO(mehr): caption
    image: "buildspace.jpg",
    alt: "Mehr with the Buildspace Nights & Weekends season 5 cohort.",
  },
  {
    id: "mosaic",
    title: "Mosaic x Northeastern Entrepreneurship", // TODO(mehr): confirm title
    caption: "", // TODO(mehr): caption
    image: "mosaic.jpg",
    alt: "Mehr with a team and Paws the Husky at a Mosaic and Northeastern Entrepreneurship event.",
  },
  {
    id: "northeastern-remarks",
    title: "Northeastern event", // TODO(mehr): what event is this?
    caption: "", // TODO(mehr): caption
    image: "northeastern-remarks.jpg",
    alt: "Mehr speaking into a microphone beside a Northeastern speaker overlooking Boston.",
  },
  {
    id: "husky-trek",
    title: "Trek Like a Husky", // TODO(mehr): confirm title
    caption: "", // TODO(mehr): caption
    image: "husky-trek.jpg",
    alt: "Mehr speaking during a small-group discussion.",
  },
  {
    id: "high-school",
    title: "High school", // TODO(mehr): what event is this?
    caption: "", // TODO(mehr): caption
    image: "high-school.jpg",
    alt: "Mehr with a large group of high school students at an evening event.",
  },
];
