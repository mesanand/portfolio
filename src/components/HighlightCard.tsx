import Photo from "@/components/Photo";
import type { Highlight } from "@/content/schemas";
import { formatMonth } from "@/lib/dates";
import { highlightThumbs } from "@/lib/images";

interface HighlightCardProps {
  item: Highlight;
  headingLevel?: 2 | 3;
}

/** An article, post, photo, or video: stored link-preview thumbnail, source and date, title. */
export default function HighlightCard({ item, headingLevel = 3 }: HighlightCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const thumb = item.image ? highlightThumbs[item.image] : undefined;
  const meta = [item.source, item.date && formatMonth(item.date)].filter(Boolean).join(" · ");

  const body = (
    <>
      {thumb && (
        <Photo
          className="press-card__thumb"
          set={thumb}
          alt=""
          width={400}
          height={210}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
        />
      )}
      <div className="press-card__text">
        <p className="press-card__meta">
          <span className="press-card__kind">{item.kind}</span>
          {meta && <span> · {meta}</span>}
          {item.url && (
            <span className="press-card__arrow" aria-hidden="true">
              ↗
            </span>
          )}
        </p>
        <Heading className="press-card__title">{item.title}</Heading>
        {item.note && <p className="press-card__note">{item.note}</p>}
      </div>
    </>
  );

  return (
    <li className="press-card">
      {item.url ? (
        <a className="press-card__link" href={item.url} target="_blank" rel="noopener noreferrer">
          {body}
        </a>
      ) : (
        <div className="press-card__link">{body}</div>
      )}
    </li>
  );
}
