import {
  CircleDot,
  GitBranch,
  GitCommitHorizontal,
  GitMerge,
  GitPullRequest,
  Tag,
  type LucideIcon,
} from "lucide-react";
import type { ActivityEvent, ActivityVerb } from "@/lib/github-types";
import { relativeTime } from "@/lib/dates";

const ICONS: Record<ActivityVerb, LucideIcon> = {
  pushed: GitCommitHorizontal,
  created: GitBranch,
  opened: GitPullRequest,
  closed: CircleDot,
  merged: GitMerge,
  released: Tag,
};

/** Up to eight recent public events, one ruled row each (02 s5.10). */
export default function ActivityList({ events }: { events: ActivityEvent[] }) {
  if (events.length === 0) return null;
  return (
    <ul className="gh-activity" role="list" aria-label="Recent GitHub activity">
      {events.slice(0, 8).map((e) => {
        const Icon = ICONS[e.verb];
        return (
          <li key={`${e.at}-${e.url}`} className="gh-activity__row">
            <time className="gh-activity__when" dateTime={e.at}>
              {relativeTime(e.at)}
            </time>
            <span className="gh-activity__verb">
              <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
              {e.verb}
            </span>
            <a
              className="gh-activity__repo"
              href={e.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {e.repo.split("/")[1]}
              <span className="ext" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="gh-activity__msg" href={e.url} target="_blank" rel="noopener noreferrer">
              {e.message}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
