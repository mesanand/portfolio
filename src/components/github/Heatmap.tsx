import { useLayoutEffect, useRef } from "react";
import type { ContributionDay, ContributionLevel, ContributionWeek } from "@/lib/github-types";

const WEEKS = 53;
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const LEVEL: Record<ContributionLevel, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const weekday = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay();
const month = (date: string) => Number(date.slice(5, 7)) - 1;

/** Always 53 columns x 7 rows (Sunday first); days outside the range are empty cells. */
function toColumns(weeks: ContributionWeek[]): Array<Array<ContributionDay | null>> {
  const recent = weeks.slice(-WEEKS);
  const padded = [
    ...Array.from({ length: WEEKS - recent.length }, () => ({ days: [] })),
    ...recent,
  ];
  return padded.map((w) => {
    const col: Array<ContributionDay | null> = Array(7).fill(null);
    for (const d of w.days) col[weekday(d.date)] = d;
    return col;
  });
}

/** Month labels above the first week in which each month appears. */
function monthLabels(columns: Array<Array<ContributionDay | null>>) {
  const labels: Array<{ col: number; label: string }> = [];
  let prev = -1;
  columns.forEach((col, i) => {
    const first = col.find(Boolean);
    if (!first) return;
    const m = month(first.date);
    if (m === prev) return;
    prev = m;
    // Skip a label that would crowd the previous one (partial first week).
    if (labels.length && i - labels[labels.length - 1]!.col < 3) labels.pop();
    labels.push({ col: i, label: MONTHS[m]! });
  });
  return labels;
}

interface HeatmapProps {
  weeks: ContributionWeek[];
  total: number;
}

/** 53x7 contribution grid in the ASCII ramp (02 s5.10, 03 s5.3). Spans, not a chart library. */
export default function Heatmap({ weeks, total }: HeatmapProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const columns = toColumns(weeks);

  // On narrow screens, start scrolled to the most recent weeks.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <div className="gh-heatmap" ref={scrollRef}>
      <div className="gh-heatmap__inner">
        <div className="gh-heatmap__months" aria-hidden="true">
          {monthLabels(columns).map(({ col, label }) => (
            <span key={`${col}-${label}`} style={{ gridColumn: col + 1 }}>
              {label}
            </span>
          ))}
        </div>
        <div className="gh-heatmap__weekdays" aria-hidden="true">
          <span style={{ gridRow: 2 }}>Mon</span>
          <span style={{ gridRow: 4 }}>Wed</span>
          <span style={{ gridRow: 6 }}>Fri</span>
        </div>
        <div
          className="gh-heatmap__grid"
          role="img"
          aria-label={`GitHub contributions, ${total} in the last year`}
        >
          {columns.flatMap((col, w) =>
            col.map((day, d) =>
              day ? (
                <span
                  key={`${w}-${d}`}
                  className={`gh-cell gh-cell--${LEVEL[day.level]}`}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  data-date={day.date}
                  aria-hidden="true"
                />
              ) : (
                <span key={`${w}-${d}`} className="gh-cell gh-cell--empty" aria-hidden="true" />
              ),
            ),
          )}
        </div>
      </div>
    </div>
  );
}
