// Parses every content file and exports typed, sorted arrays.
// A bad entry throws here, which fails `pnpm build` (via scripts/validate-content.ts)
// and therefore the Vercel deploy. That is the point.
// Relative imports only: this module also runs under tsx at build time.
import type { z } from "zod";
import { Experience, Highlight, Honor, Project, Role } from "./schemas";
import { experience as experienceRaw } from "./experience";
import { projects as projectsRaw } from "./projects";
import { honors as honorsRaw, leadership as leadershipRaw } from "./leadership";
import { highlights as highlightsRaw } from "./highlights";

export class ContentError extends Error {}

/** Validates each entry on its own so the error names the entry id and the field path. */
export function parseCollection<S extends z.ZodTypeAny>(
  collection: string,
  schema: S,
  entries: readonly unknown[],
): z.infer<S>[] {
  return entries.map((entry, index) => {
    const result = schema.safeParse(entry);
    if (result.success) return result.data;
    const id = entry && typeof entry === "object" && "id" in entry ? String(entry.id) : `#${index}`;
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new ContentError(`Invalid ${collection} entry "${id}":\n${issues}`);
  });
}

/** Sort key for date ranges: "present" first, then by start, newest first. */
export function byRangeDesc(
  a: { start: string; end: string },
  b: { start: string; end: string },
): number {
  const aCurrent = a.end === "present";
  const bCurrent = b.end === "present";
  if (aCurrent !== bCurrent) return aCurrent ? -1 : 1;
  if (!aCurrent && a.end !== b.end) return b.end.localeCompare(a.end);
  return b.start.localeCompare(a.start);
}

export const experience = parseCollection("experience", Experience, experienceRaw).sort(
  byRangeDesc,
);

// Newest year first; entries from the same year keep their file order.
export const projects = parseCollection("projects", Project, projectsRaw).sort(
  (a, b) => b.year - a.year,
);

/** Tag display order for filters. */
export const PROJECT_TAGS = ["ml", "data", "web", "hackathon", "api", "ai"] as const;
export type ProjectTag = (typeof PROJECT_TAGS)[number];

export const leadership = parseCollection("leadership", Role, leadershipRaw).sort(byRangeDesc);

// Honors have no id; the title stands in for it in error messages (zod strips it after).
export const honors = parseCollection(
  "honors",
  Honor,
  honorsRaw.map((h) => ({ id: h.title, ...h })),
).sort((a, b) => b.year - a.year);

// Home carousel, in file order. Replaced the Now feed on 2026-09-25.
export const highlights = parseCollection("highlights", Highlight, highlightsRaw);
