import Chip from "@/components/Chip";
import type { Role } from "@/content/schemas";
import { formatRange } from "@/lib/dates";
import { logos } from "@/lib/images";

interface RoleCellProps {
  role: Role;
  /** Two-digit label, e.g. "01". */
  index: string;
}

/** Headline-tier leadership role: a ProjectCell variant (02 s5.5). */
export default function RoleCell({ role, index }: RoleCellProps) {
  const logo = role.logo ? logos[role.logo] : undefined;
  return (
    <article className="cell">
      <div className={logo ? "cell__top cell__top--logo" : "cell__top"}>
        <div className="cell__top-text">
          <p className="cell__index" aria-hidden="true">
            {index}
          </p>
          <div className="cell__head">
            <h3 className="cell__title">
              {role.orgUrl ? (
                <a
                  className="cell__link"
                  href={role.orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
        </div>
        {logo && (
          <img
            className="cell__logo"
            src={logo}
            alt=""
            height={72}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
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
