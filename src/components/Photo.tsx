interface PhotoProps {
  set: { avif: string; webp: string; fallback: string };
  alt: string;
  /** Intrinsic size of the rendered box, so the page reserves space before load. */
  width: number;
  height: number;
  sizes: string;
  className?: string;
}

/** AVIF with WebP fallback, lazy, with explicit dimensions (02 s8). */
export default function Photo({ set, alt, width, height, sizes, className }: PhotoProps) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set.avif} sizes={sizes} />
      <source type="image/webp" srcSet={set.webp} sizes={sizes} />
      <img
        src={set.fallback}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
