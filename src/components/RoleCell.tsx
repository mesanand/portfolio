import Chip from "@/components/Chip";
import type { Role } from "@/content/schemas";
import { formatRange } from "@/lib/dates";

interface RoleCellProps {
  role: Role;
  /** Two-digit label, e.g. "01". */
  index: string;
}

/** Headline-tier leadership role: a ProjectCell variant (02 s5.5). */
export default function RoleCell({ role, index }: RoleCellProps) {
  return (
    <article className="cell">
      <p className="cell__index" aria-hidden="true">
        {index}
      </p>
      <div className="cell__head">
        <h3 className="cell__title">
          {role.orgUrl ? (
            <a className="cell__link" href={role.orgUrl} target="_blank" rel="noopener noreferrer">
              {role.org}
              <span className="ext" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            role.org
          )}
        </h3>
        <p className="cell__sub">{role.role}</p>
      </div>
      <p className="cell__date">
        {role.end === "present" && <span className="pulse-dot" aria-hidden="true" />}
        {formatRange(role.start, role.end)}
      </p>
      {role.summary && <p className="cell__desc">{role.summary}</p>}
      {role.metrics && role.metrics.length > 0 && (
        <ul className="chips cell__metrics" role="list" aria-label="Highlights">
          {role.metrics.slice(0, 3).map((m) => (
            <li key={m}>
              <Chip variant="accent">{m}</Chip>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
