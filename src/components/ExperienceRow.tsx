import Chip from "@/components/Chip";
import Photo from "@/components/Photo";
import type { Experience } from "@/content/schemas";
import { formatRange } from "@/lib/dates";
import { workPhotos } from "@/lib/images";

interface ExperienceRowProps {
  entry: Experience;
  /** Summary only: no bullets, no stack. Used on Home. */
  compact?: boolean;
}

/** One row of the ruled experience list (02 s5.7). */
export default function ExperienceRow({ entry, compact = false }: ExperienceRowProps) {
  const current = entry.end === "present";
  const photo = entry.image ? workPhotos[entry.image] : undefined;
  const cls = ["xp-row", compact && "xp-row--compact", photo && "xp-row--photo"]
    .filter(Boolean)
    .join(" ");
  return (
    <article className={cls}>
      <p className="xp-row__date">
        {current && <span className="pulse-dot" aria-hidden="true" />}
        <span>{formatRange(entry.start, entry.end)}</span>
      </p>
      <div className="xp-row__body">
        <div className="xp-row__head">
          <h3 className="xp-row__org">
            {entry.orgUrl ? (
              <a href={entry.orgUrl} target="_blank" rel="noopener noreferrer">
                {entry.org}
                <span className="ext" aria-hidden="true">
                  ↗
                </span>
              </a>
            ) : (
              entry.org
            )}
          </h3>
          <p className="xp-row__loc">{entry.location}</p>
        </div>
        <p className="xp-row__role">{entry.role}</p>
        <p className="xp-row__summary">{entry.summary}</p>
        {!compact && (
          <>
            {entry.bullets.length > 0 && (
              <ul className="xp-row__bullets" role="list">
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {entry.stack.length > 0 && (
              <ul className="chips" role="list" aria-label="Stack">
                {entry.stack.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      {photo && (
        <Photo
          className="xp-row__photo"
          set={photo}
          alt={entry.imageAlt ?? ""}
          width={240}
          height={240}
          sizes="(min-width: 1024px) 240px, 320px"
        />
      )}
    </article>
  );
}
