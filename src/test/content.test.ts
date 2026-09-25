import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as content from "@/content";
import { ContentError, parseCollection } from "@/content";
import { Experience } from "@/content/schemas";
import { experience as experienceRaw } from "@/content/experience";
import { site } from "@/content/site";

const collections = {
  experience: content.experience,
  projects: content.projects,
  leadership: content.leadership,
  highlights: content.highlights,
} as const;

/** Every string value anywhere in an object whose key suggests a URL. */
function urlsIn(value: unknown, key = ""): string[] {
  if (typeof value === "string") return /url|repo|demo|devpost|video/i.test(key) ? [value] : [];
  if (Array.isArray(value)) return value.flatMap((v) => urlsIn(v, key));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => urlsIn(v, k));
  return [];
}

function isValidDate(iso: string): boolean {
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(iso);
  if (!m) return false;
  const [, y, mo, d] = m;
  const date = new Date(Date.UTC(Number(y), Number(mo) - 1, d ? Number(d) : 1));
  return (
    date.getUTCFullYear() === Number(y) &&
    date.getUTCMonth() === Number(mo) - 1 &&
    (!d || date.getUTCDate() === Number(d))
  );
}

describe("content", () => {
  it("every content file parses", () => {
    expect(content.experience.length).toBeGreaterThan(0);
    for (const list of Object.values(collections)) expect(Array.isArray(list)).toBe(true);
  });

  it("every URL starts with https://", () => {
    const urls = [
      ...Object.values(collections).flatMap((list) => urlsIn(list)),
      ...site.socials.map((s) => s.url).filter((u) => !u.startsWith("mailto:")),
      ...urlsIn(content.honors),
      ...(site.calendarUrl ? [site.calendarUrl] : []),
    ];
    for (const url of urls) expect(url, url).toMatch(/^https:\/\//);
  });

  it("no two ids collide", () => {
    const ids = Object.values(collections).flatMap((list) => list.map((e) => e.id));
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it("dates are valid and ranges are ordered", () => {
    for (const list of [content.experience, content.leadership]) {
      for (const e of list) {
        expect(isValidDate(e.start), `${e.id} start ${e.start}`).toBe(true);
        if (e.end !== "present") {
          expect(isValidDate(e.end), `${e.id} end ${e.end}`).toBe(true);
          expect(e.end >= e.start, `${e.id} ends before it starts`).toBe(true);
        }
      }
    }
  });

  it("every referenced photo exists", () => {
    for (const e of content.experience)
      if (e.image) expect(existsSync(`src/assets/work/${e.image}`), e.image).toBe(true);
    for (const h of content.highlights)
      expect(existsSync(`src/assets/highlights/${h.image}`), h.image).toBe(true);
  });

  it("at most 4 featured entries per collection", () => {
    expect(content.experience.filter((e) => e.featured).length).toBeLessThanOrEqual(4);
    expect(content.projects.filter((e) => e.featured).length).toBeLessThanOrEqual(4);
  });

  it("experience is sorted: present first, then newest", () => {
    const ends = content.experience.map((e) => e.end);
    const firstPast = ends.findIndex((e) => e !== "present");
    if (firstPast >= 0) expect(ends.slice(firstPast)).not.toContain("present");
  });

  it("a bad entry fails with its id and the field path", () => {
    const [first] = experienceRaw;
    const { role: _role, ...broken } = first!;
    expect(() => parseCollection("experience", Experience, [broken])).toThrow(ContentError);
    expect(() => parseCollection("experience", Experience, [broken])).toThrow(
      /experience entry "general-atlantic"[\s\S]*role/,
    );
  });
});
