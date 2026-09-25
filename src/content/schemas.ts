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
  bullets: z.array(z.string()).min(1).max(4),
  stack: z.array(z.string()).max(8),
  featured: z.boolean().default(false), // shows on Home
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

export const NowEntry = z.object({
  id: z.string(), // ulid or yyyy-mm-dd-slug
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  type: z.enum(["linkedin", "shipped", "talk", "note", "press"]),
  title: z.string().max(120),
  body: z.string().max(600),
  url: z.string().url().optional(),
  image: z.string().url().optional(),
  tags: z.array(z.string()).max(5).default([]),
});

// Not in 03 section 4; added by prompt 7 for the Leadership page's honors group.
export const Honor = z.object({
  year: z.number().int(),
  title: z.string(),
  body: z.string().max(260),
  url: z.string().url().optional(),
});

/** Parsed shapes (defaults applied). */
export type Experience = z.infer<typeof Experience>;
export type Project = z.infer<typeof Project>;
export type Role = z.infer<typeof Role>;
export type NowEntry = z.infer<typeof NowEntry>;
export type Honor = z.infer<typeof Honor>;

/** Authoring shapes (defaulted fields optional). Content files are typed with these. */
export type ExperienceInput = z.input<typeof Experience>;
export type ProjectInput = z.input<typeof Project>;
export type RoleInput = z.input<typeof Role>;
export type NowEntryInput = z.input<typeof NowEntry>;
export type HonorInput = z.input<typeof Honor>;
