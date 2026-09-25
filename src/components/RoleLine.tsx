interface RoleLineProps {
  /** Mono date column: a formatted range or a year. */
  date: string;
  /** Primary text, e.g. "Content Club, President and Founder". */
  title: string;
  /** One line in --ink-body; hidden on phones. */
  summary?: string;
  href?: string;
}

/** Supporting- and archive-tier row: a single ruled line (prompt 7). Render inside a <ul>. */
export default function RoleLine({ date, title, summary, href }: RoleLineProps) {
  return (
    <li className="role-line">
      <span className="role-line__date">{date}</span>
      <span className="role-line__title">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {title}
            <span className="ext" aria-hidden="true">
              ↗
            </span>
          </a>
        ) : (
          title
        )}
      </span>
      {summary && <span className="role-line__summary">{summary}</span>}
    </li>
  );
}
