import type { GithubPayload } from "@/lib/github-types";
import { relativeTime } from "@/lib/dates";

/** Four fact pairs: big Display numbers over mono keys (02 s5.10). */
export default function StatsStrip({ stats }: { stats: GithubPayload["stats"] }) {
  const facts = [
    { key: "Commits / 365d", value: String(stats.commits365) },
    {
      key: stats.streakIncludesToday ? "Streak" : "Streak (to yesterday)",
      value: `${stats.streak} ${stats.streak === 1 ? "day" : "days"}`,
    },
    { key: "Last push", value: stats.lastPush ? relativeTime(stats.lastPush) : "none" },
    { key: "Public repos", value: String(stats.publicRepos) },
  ];
  return (
    <dl className="gh-stats">
      {facts.map((f) => (
        <div key={f.key} className="gh-stats__item">
          <dt className="gh-stats__key">{f.key}</dt>
          <dd className="gh-stats__value">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
