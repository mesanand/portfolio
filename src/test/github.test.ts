import { describe, expect, it } from "vitest";
import { computeStreak, mapEvent, truncate } from "../../api/github";
import type { ContributionDay } from "@/lib/github-types";

const day = (date: string, count: number): ContributionDay => ({
  date,
  count,
  level: count ? "FIRST_QUARTILE" : "NONE",
});

describe("computeStreak", () => {
  it("counts consecutive days ending today", () => {
    const days = [
      day("2026-09-21", 0),
      day("2026-09-22", 2),
      day("2026-09-23", 1),
      day("2026-09-24", 5),
      day("2026-09-25", 1),
    ];
    expect(computeStreak(days, "2026-09-25")).toEqual({ streak: 4, includesToday: true });
  });
  it("counts from yesterday when today is empty", () => {
    const days = [day("2026-09-23", 1), day("2026-09-24", 3), day("2026-09-25", 0)];
    expect(computeStreak(days, "2026-09-25")).toEqual({ streak: 2, includesToday: false });
  });
  it("is zero when yesterday and today are both empty", () => {
    const days = [day("2026-09-23", 4), day("2026-09-24", 0), day("2026-09-25", 0)];
    expect(computeStreak(days, "2026-09-25").streak).toBe(0);
  });
});

describe("truncate", () => {
  it("keeps the first line and caps at 72 characters", () => {
    expect(truncate("short\nbody")).toBe("short");
    const long = "x".repeat(100);
    expect(truncate(long)).toHaveLength(72);
    expect(truncate(long).endsWith("…")).toBe(true);
  });
});

describe("mapEvent", () => {
  const base = { created_at: "2026-09-25T17:31:24Z", repo: { name: "mesanand/portfolio" } };
  it("maps pushes without commit details to a branch fallback", () => {
    const e = mapEvent({
      ...base,
      type: "PushEvent",
      payload: { ref: "refs/heads/main", head: "abc123" },
    });
    expect(e).toMatchObject({
      verb: "pushed",
      message: "to main",
      url: "https://github.com/mesanand/portfolio/commit/abc123",
    });
  });
  it("maps merged pull requests", () => {
    const e = mapEvent({
      ...base,
      type: "PullRequestEvent",
      payload: { action: "closed", pull_request: { title: "Add X", merged: true } },
    });
    expect(e).toMatchObject({ verb: "merged", message: "Add X" });
  });
  it("ignores unsupported events", () => {
    expect(mapEvent({ ...base, type: "PublicEvent", payload: {} })).toBeNull();
    expect(mapEvent({ ...base, type: "IssuesEvent", payload: { action: "labeled" } })).toBeNull();
  });
});
