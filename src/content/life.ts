// Home "Slice of my life" carousel (replaced the Now feed, per Mehr on 2026-09-25).
// `image` is a filename in src/assets/life/. Order here is the carousel order.
// Photos only on the page (no text under them, per Mehr). `title` is an internal label;
// `alt` is what screen readers announce.
import type { LifePhotoInput } from "./schemas";

export const life: LifePhotoInput[] = [
  {
    id: "nyc-rooftop",
    title: "NYC rooftop",
    image: "nyc-rooftop.jpg",
    alt: "Mehr with a friend on a rooftop, the New York City skyline lit up behind them at night.",
  },
  {
    id: "beach-chair",
    title: "Beach chair",
    image: "beach-chair.jpg",
    alt: "Mehr sitting on an office chair on an empty beach, waves behind him.",
  },
  {
    id: "jet-ski",
    title: "Jet ski",
    image: "jet-ski.jpg",
    alt: "Aerial view of Mehr riding a jet ski on turquoise water.",
  },
  {
    id: "hat-stack",
    title: "Hat stack",
    image: "hat-stack.jpg",
    alt: "Mehr laughing under a tall stack of caps at a Northeastern event.",
  },
  {
    id: "dinner",
    title: "Dinner",
    image: "dinner.jpg",
    alt: "Mehr at a candlelit restaurant table.",
  },
  {
    id: "fencing-club",
    title: "Fencing club",
    image: "fencing-club.jpg",
    alt: "Mehr with the fencing club in a group photo.",
  },
  {
    id: "techcrunch-disrupt",
    title: "TechCrunch Disrupt",
    image: "techcrunch-disrupt.jpg",
    alt: "Mehr with a group of students and Perplexity team members at TechCrunch Disrupt.",
  },
  {
    id: "snowflake",
    title: "Snowflake",
    image: "snowflake.jpg",
    alt: "Mehr in front of the Snowflake exhibiting partners wall.",
  },
  {
    id: "buildspace",
    title: "Buildspace Nights & Weekends S5",
    image: "buildspace.jpg",
    alt: "Mehr with the Buildspace Nights & Weekends season 5 cohort.",
  },
  {
    id: "mosaic",
    title: "Mosaic x Northeastern Entrepreneurship",
    image: "mosaic.jpg",
    alt: "Mehr with a team and Paws the Husky at a Mosaic and Northeastern Entrepreneurship event.",
  },
  {
    id: "northeastern-remarks",
    title: "Northeastern event",
    image: "northeastern-remarks.jpg",
    alt: "Mehr speaking into a microphone beside a Northeastern speaker overlooking Boston.",
  },
  {
    id: "husky-trek",
    title: "Trek Like a Husky",
    image: "husky-trek.jpg",
    alt: "Mehr speaking during a small-group discussion.",
  },
  {
    id: "high-school",
    title: "High school",
    image: "high-school.jpg",
    alt: "Mehr with a large group of high school students at an evening event.",
  },
];
