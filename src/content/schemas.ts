// Content schemas. Source: docs/overhaul/03-ARCHITECTURE.md section 4 (verbatim).
import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/); // YYYY-MM or YYYY-MM-DD

export const Experience = z.object({
  id: z.string(),
  org: z.string(),
  orgUrl: z.string().url().optional(),
  role: z.string(),
  location: z.string(),
  start: isoDate,
  end: isoDate.or(z.literal("present")),
  kind: z.enum(["coop", "internship", "consulting", "nonprofit", "parttime"]),
  summary: z.string().max(220), // one sentence
  bullets: z.array(z.string()).max(4), // may be empty: some roles are summary-only
  stack: z.array(z.string()).max(8),
  featured: z.boolean().default(false), // shows on Home
  // Not in 03 s4: an optional photo, a filename under src/assets/work/ (added 2026-09-25).
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

export const Project = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string().max(120),
  description: z.string().max(400),
  year: z.number().int(),
  tags: z.array(z.enum(["ml", "data", "web", "hackathon", "api", "ai"])),
  stack: z.array(z.string()).max(8),
  links: z.object({
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    devpost: z.string().url().optional(),
    video: z.string().url().optional(),
  }),
  outcome: z.string().max(140).optional(), // "Won 2 tracks at FinHacks"
  image: z.string().optional(), // path under src/assets
  featured: z.boolean().default(false),
});

export const Role = z.object({
  id: z.string(),
  org: z.string(),
  orgUrl: z.string().url().optional(),
  role: z.string(),
  start: isoDate,
  end: isoDate.or(z.literal("present")),
  current: z.boolean().default(false),
  tier: z.enum(["headline", "supporting", "archive"]), // headline = full cell, supporting = one line, archive = inside <details>
  summary: z.string().max(260).optional(),
  metrics: z.array(z.string()).max(3).optional(), // "150+ members", "$50K raised"
  era: z.enum(["neu-boston", "neu-oakland", "high-school"]),
});

// Not in 03 section 4; added by prompt 7 for the Leadership page's honors group.
export const Honor = z.object({
  year: z.number().int(),
  title: z.string(),
  body: z.string().max(260),
  url: z.string().url().optional(),
});

// Home "Slice of my life" photo carousel (Mehr, 2026-09-25).
// `image` is a filename under src/assets/life/.
export const LifePhoto = z.object({
  id: z.string(),
  title: z.string().max(80),
  caption: z.string().max(160),
  image: z.string(),
  alt: z.string(),
  url: z.string().url().optional(),
});

// Highlights: articles, posts, photos, and videos about or by Mehr (/highlights).
// Added with `pnpm highlight <url>`, which stores the link's preview image as
// `image`, a filename under src/assets/highlights/.
export const Highlight = z.object({
  id: z.string(),
  kind: z.enum(["article", "post", "photo", "video"]),
  title: z.string().max(140),
  source: z.string().max(60).optional(), // "Northeastern Global News", "LinkedIn"
  date: isoDate.optional(),
  url: z.string().url().optional(),
  image: z.string().optional(),
  note: z.string().max(220).optional(),
});

/** Parsed shapes (defaults applied). */
export type Experience = z.infer<typeof Experience>;
export type Project = z.infer<typeof Project>;
export type Role = z.infer<typeof Role>;
export type Honor = z.infer<typeof Honor>;
export type Highlight = z.infer<typeof Highlight>;
export type LifePhoto = z.infer<typeof LifePhoto>;

/** Authoring shapes (defaulted fields optional). Content files are typed with these. */
export type ExperienceInput = z.input<typeof Experience>;
export type ProjectInput = z.input<typeof Project>;
export type RoleInput = z.input<typeof Role>;
export type HonorInput = z.input<typeof Honor>;
export type HighlightInput = z.input<typeof Highlight>;
export type LifePhotoInput = z.input<typeof LifePhoto>;
