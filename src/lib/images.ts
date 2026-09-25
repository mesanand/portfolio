// Build-time responsive image sets (vite-imagetools) for content photos, keyed by filename.
// Content files name a photo by filename; components look it up here.

type Sets = Record<string, { avif: string; webp: string; fallback: string }>;

const byName = (mods: Record<string, string>) =>
  Object.fromEntries(Object.entries(mods).map(([path, v]) => [path.split("/").pop()!, v]));

function collect(
  avif: Record<string, string>,
  webp: Record<string, string>,
  fallback: Record<string, string>,
): Sets {
  const a = byName(avif);
  const w = byName(webp);
  const f = byName(fallback);
  return Object.fromEntries(
    Object.keys(f).map((name) => [name, { avif: a[name]!, webp: w[name]!, fallback: f[name]! }]),
  );
}

export const workPhotos: Sets = collect(
  import.meta.glob<string>("/src/assets/work/*.jpg", {
    query: { w: "240;480;720", format: "avif", as: "srcset" },
    import: "default",
    eager: true,
  }),
  import.meta.glob<string>("/src/assets/work/*.jpg", {
    query: { w: "240;480;720", format: "webp", as: "srcset" },
    import: "default",
    eager: true,
  }),
  import.meta.glob<string>("/src/assets/work/*.jpg", {
    query: { w: "480", format: "webp" },
    import: "default",
    eager: true,
  }),
);

export const lifePhotos: Sets = collect(
  import.meta.glob<string>("/src/assets/life/*.jpg", {
    query: { w: "400;800;1200", format: "avif", as: "srcset" },
    import: "default",
    eager: true,
  }),
  import.meta.glob<string>("/src/assets/life/*.jpg", {
    query: { w: "400;800;1200", format: "webp", as: "srcset" },
    import: "default",
    eager: true,
  }),
  import.meta.glob<string>("/src/assets/life/*.jpg", {
    query: { w: "800", format: "webp" },
    import: "default",
    eager: true,
  }),
);

// Organization logos (transparent PNG, 256px) for headline leadership cards; 2x of the 72px box.
export const logos: Record<string, string> = byName(
  import.meta.glob<string>("/src/assets/logos/*.png", {
    query: { w: "144", format: "webp" },
    import: "default",
    eager: true,
  }),
);

// Link-preview thumbnails for Highlights, stored at 1200x630 by `pnpm highlight`.
export const highlightThumbs: Sets = collect(
  import.meta.glob<string>("/src/assets/highlights/*.jpg", {
    query: { w: "400;800", format: "avif", as: "srcset" },
    import: "default",
    eager: true,
  }),
  import.meta.glob<string>("/src/assets/highlights/*.jpg", {
    query: { w: "400;800", format: "webp", as: "srcset" },
    import: "default",
    eager: true,
  }),
  import.meta.glob<string>("/src/assets/highlights/*.jpg", {
    query: { w: "800", format: "webp" },
    import: "default",
    eager: true,
  }),
);
