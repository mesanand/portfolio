import { describe, expect, it } from "vitest";
import { formatMonth, formatRange, parseIsoDate, relativeTime } from "@/lib/dates";

describe("formatRange", () => {
  it("formats a current role", () => {
    expect(formatRange("2026-07", "present")).toBe("JUL 2026 to PRESENT");
  });
  it("formats a closed range", () => {
    expect(formatRange("2024-07", "2024-12")).toBe("JUL 2024 to DEC 2024");
  });
  it("accepts full dates", () => {
    expect(formatRange("2021-06-15", "2022-07-01")).toBe("JUN 2021 to JUL 2022");
  });
  it("collapses a single month", () => {
    expect(formatRange("2024-02", "2024-02")).toBe("FEB 2024");
  });
  it("is timezone independent at month boundaries", () => {
    expect(formatMonth("2026-01")).toBe("JAN 2026");
    expect(formatMonth("2025-12-31")).toBe("DEC 2025");
  });
});

describe("parseIsoDate", () => {
  it("throws on garbage", () => {
    expect(() => parseIsoDate("not a date")).toThrow(/Invalid date/);
  });
});

describe("relativeTime", () => {
  const now = new Date("2026-09-25T12:00:00Z");
  it.each([
    ["2026-09-25T11:59:30Z", "just now"],
    ["2026-09-25T11:59:00Z", "1 minute ago"],
    ["2026-09-25T11:15:00Z", "45 minutes ago"],
    ["2026-09-25T09:00:00Z", "3 hours ago"],
    ["2026-09-24T12:00:00Z", "1 day ago"],
    ["2026-09-20T12:00:00Z", "5 days ago"],
    ["2026-09-11T12:00:00Z", "2 weeks ago"],
    ["2026-07-01T12:00:00Z", "2 months ago"],
    ["2024-09-01T12:00:00Z", "2 years ago"],
    ["2026-09-26T12:00:00Z", "just now"],
  ])("%s -> %s", (iso, expected) => {
    expect(relativeTime(iso, now)).toBe(expected);
  });
});
