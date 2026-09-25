import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import BracketButton from "@/components/BracketButton";
import Photo from "@/components/Photo";
import type { Highlight } from "@/content/schemas";
import { highlightPhotos } from "@/lib/images";

/**
 * Horizontal, scroll-snapped strip of photo cards. Swipe on touch; the
 * bracket buttons page through on desktop. Never auto-advances (02 s1.7).
 */
export default function Highlights({ items }: { items: readonly Highlight[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const reduce = useReducedMotion();

  const measure = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft <= 1);
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const frame = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    t.addEventListener("scroll", measure, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      t.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const page = (dir: -1 | 1) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * t.clientWidth * 0.9, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="highlights">
      <div className="highlights__controls">
        <BracketButton
          size="sm"
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label="Previous highlights"
        >
          ←
        </BracketButton>
        <BracketButton
          size="sm"
          onClick={() => page(1)}
          disabled={atEnd}
          aria-label="Next highlights"
        >
          →
        </BracketButton>
      </div>
      <ul
        ref={trackRef}
        className="highlights__track"
        role="list"
        tabIndex={0}
        aria-label="Highlights (scrolls sideways)"
      >
        {items.map((h) => {
          const set = highlightPhotos[h.image];
          return (
            <li key={h.id} className="highlight">
              <figure className="highlight__figure">
                {set && (
                  <Photo
                    className="highlight__photo"
                    set={set}
                    alt={h.alt}
                    width={400}
                    height={300}
                    sizes="(min-width: 640px) 380px, 80vw"
                  />
                )}
                <figcaption className="highlight__text">
                  <p className="highlight__title">
                    {h.url ? (
                      <a href={h.url} target="_blank" rel="noopener noreferrer">
                        {h.title}
                        <span className="ext" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : (
                      h.title
                    )}
                  </p>
                  {h.caption && <p className="highlight__caption">{h.caption}</p>}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
