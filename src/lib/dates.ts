const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Parses "YYYY-MM" or "YYYY-MM-DD" (or a full ISO timestamp) as a UTC date. */
export function parseIsoDate(iso: string): Date {
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(iso);
  if (m) {
    const [, y, mo, d] = m;
    return new Date(Date.UTC(Number(y), Number(mo) - 1, d ? Number(d) : 1));
  }
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date: ${iso}`);
  return date;
}

/** "2026-07" -> "JUL 2026". */
export function formatMonth(iso: string): string {
  const d = parseIsoDate(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** ("2026-07", "present") -> "JUL 2026 to PRESENT"; same month collapses to one. */
export function formatRange(start: string, end: string): string {
  const from = formatMonth(start);
  const to = end === "present" ? "PRESENT" : formatMonth(end);
  return from === to ? from : `${from} to ${to}`;
}

const UNITS: Array<[unit: string, seconds: number]> = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

/** "3 hours ago", "1 day ago", "just now". Future dates read as "just now". */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const seconds = Math.floor((now.getTime() - parseIsoDate(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  for (const [unit, size] of UNITS) {
    const n = Math.floor(seconds / size);
    if (n >= 1) return `${n} ${unit}${n === 1 ? "" : "s"} ago`;
  }
  return "just now";
}
