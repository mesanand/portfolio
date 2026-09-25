/**
 * Build-time content check. Importing src/content/index.ts parses every
 * collection and throws on the first invalid entry, naming its id and field.
 * Runs before tsc in `pnpm build` so the error you see is the useful one.
 */
try {
  const content = await import("../src/content/index.ts");
  const counts = Object.entries(content)
    .filter(([, v]) => Array.isArray(v))
    .map(([k, v]) => `${k}=${(v as unknown[]).length}`)
    .join(" ");
  console.log(`content ok: ${counts}`);
} catch (err) {
  console.error(`\ncontent validation failed\n${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
}
