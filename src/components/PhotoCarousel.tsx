import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import BracketButton from "@/components/BracketButton";
import Photo from "@/components/Photo";
import type { LifePhoto } from "@/content/schemas";
import { lifePhotos } from "@/lib/images";

/**
 * Horizontal, scroll-snapped strip of photo cards. Swipe on touch; the
 * bracket buttons page through on desktop. Never auto-advances (02 s1.7).
 */
export default function PhotoCarousel({ items }: { items: readonly LifePhoto[] }) {
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
    <div className="carousel">
      <div className="carousel__controls">
        <BracketButton
          size="sm"
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label="Previous photos"
        >
          ←
        </BracketButton>
        <BracketButton size="sm" onClick={() => page(1)} disabled={atEnd} aria-label="Next photos">
          →
        </BracketButton>
      </div>
      <ul
        ref={trackRef}
        className="carousel__track"
        role="list"
        tabIndex={0}
        aria-label="Slice of my life (scrolls sideways)"
      >
        {items.map((h) => {
          const set = lifePhotos[h.image];
          return (
            <li key={h.id} className="carousel-card">
              <figure className="carousel-card__figure">
                {set && (
                  <Photo
                    className="carousel-card__photo"
                    set={set}
                    alt={h.alt}
                    width={400}
                    height={300}
                    sizes="(min-width: 640px) 380px, 80vw"
                  />
                )}
                <figcaption className="carousel-card__text">
                  <p className="carousel-card__title">
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
                  {h.caption && <p className="carousel-card__caption">{h.caption}</p>}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
