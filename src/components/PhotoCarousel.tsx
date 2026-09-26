import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import BracketButton from "@/components/BracketButton";
import Photo from "@/components/Photo";
import type { LifePhoto } from "@/content/schemas";
import { lifePhotos } from "@/lib/images";

const SECONDS_PER_PHOTO = 6; // drift speed: one card width every ~6s

function Card({ photo, hidden = false }: { photo: LifePhoto; hidden?: boolean }) {
  const set = lifePhotos[photo.image];
  return (
    <li className="carousel-card" aria-hidden={hidden || undefined}>
      <figure className="carousel-card__figure">
        {set && (
          <Photo
            className="carousel-card__photo"
            set={set}
            alt={hidden ? "" : photo.alt}
            width={400}
            height={300}
            sizes="(min-width: 640px) 380px, 80vw"
          />
        )}
      </figure>
    </li>
  );
}

/**
 * "Slice of my life" (Mehr, 2026-09-25). A continuously drifting marquee: the
 * photo list is rendered twice and the strip slides left by exactly one copy,
 * so it loops seamlessly. Transform-only (compositor). Pauses on hover and on
 * keyboard focus, and has a PAUSE/PLAY control (WCAG 2.2.2). Under
 * prefers-reduced-motion it is the scroll-snap row with arrow buttons instead.
 */
export default function PhotoCarousel({ items }: { items: readonly LifePhoto[] }) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduce) return <ScrollRow items={items} />;

  const style = { "--marquee-duration": `${items.length * SECONDS_PER_PHOTO}s` } as CSSProperties;
  return (
    <div className="carousel carousel--marquee" data-paused={paused}>
      <div className="carousel__controls">
        <BracketButton size="sm" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          {paused ? "Play" : "Pause"}
        </BracketButton>
      </div>
      <div
        className="carousel__viewport"
        tabIndex={0}
        role="region"
        aria-label="Slice of my life photos, moving slowly; hover or focus to pause"
      >
        <div className="carousel__strip" style={style}>
          <ul className="carousel__set" role="list">
            {items.map((p) => (
              <Card key={p.id} photo={p} />
            ))}
          </ul>
          <ul className="carousel__set" role="list" aria-hidden="true">
            {items.map((p) => (
              <Card key={p.id} photo={p} hidden />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Reduced-motion fallback: a swipeable scroll-snap row with arrow buttons. */
function ScrollRow({ items }: { items: readonly LifePhoto[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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
    if (t) t.scrollBy({ left: dir * t.clientWidth * 0.9, behavior: "auto" });
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
        {items.map((p) => (
          <Card key={p.id} photo={p} />
        ))}
      </ul>
    </div>
  );
}
