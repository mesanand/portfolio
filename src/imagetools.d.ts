// vite-imagetools query imports. `as=srcset` resolves to a srcset string.
declare module "*as=srcset" {
  const srcset: string;
  export default srcset;
}

declare module "*format=webp" {
  const src: string;
  export default src;
}
