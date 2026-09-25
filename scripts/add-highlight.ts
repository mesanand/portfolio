/**
 * Add an item to the Highlights section (src/content/highlights.json).
 *
 *   pnpm highlight <url> [--title "..."] [--note "..."] [--date YYYY-MM-DD]
 *                        [--kind article|post|photo|video] [--source "..."] [--image path/to/file.jpg]
 *   pnpm highlight --photo path/to/file.jpg --title "..." [--note "..."] [--date YYYY-MM-DD]
 *
 * For a link, the script reads the page's preview metadata (og:title, og:image,
 * published date, site name) once, saves the preview image as a 1200x630 JPEG in
 * src/assets/highlights/, and prepends an entry. The live site never contacts the
 * original page, so a link that later changes or disappears keeps its thumbnail.
 * Anything it guesses wrong can be fixed with a flag or by editing the JSON.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import sharp from "sharp";
import { Highlight, type HighlightInput } from "../src/content/schemas.ts";

const JSON_PATH = fileURLToPath(new URL("../src/content/highlights.json", import.meta.url));
const IMAGE_DIR = fileURLToPath(new URL("../src/assets/highlights/", import.meta.url));
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

const SOURCES: Record<string, string> = {
  "news.northeastern.edu": "Northeastern Global News",
  "www.khoury.northeastern.edu": "Khoury College",
  "www.linkedin.com": "LinkedIn",
  "linkedin.com": "LinkedIn",
  "www.youtube.com": "YouTube",
  "youtu.be": "YouTube",
  "devpost.com": "Devpost",
};

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    title: { type: "string" },
    note: { type: "string" },
    date: { type: "string" },
    kind: { type: "string" },
    source: { type: "string" },
    image: { type: "string" },
    photo: { type: "string" },
  },
});

function decode(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/** All <meta> tags as a property/name -> content map (first one wins). */
function metaTags(html: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attr = (name: string) => new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i").exec(tag)?.[1];
    const key = attr("property") ?? attr("name");
    const content = attr("content");
    if (key && content !== undefined && !map.has(key.toLowerCase())) {
      map.set(key.toLowerCase(), decode(content).trim());
    }
  }
  return map;
}

/** Sentences of a post, without emoji and hashtags. */
function sentences(text: string): string[] {
  return (
    text
      .replace(/\p{Extended_Pictographic}️?/gu, "")
      .replace(/#\w+/g, "")
      .split(/(?<=[.!?])\s+|\n+/)
      // LinkedIn leaves a space after tagged names: "Amina Rashid , Logan" / "University 's".
      .map((s) =>
        s
          .replace(/\s+/g, " ")
          .replace(/\s+([,.;:!?'’])/g, "$1")
          .trim(),
      )
      .filter(Boolean)
  );
}

function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "")}…`;
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join("-");
}

function publishedDate(html: string, meta: Map<string, string>, url: string): string | undefined {
  const raw =
    meta.get("article:published_time") ??
    /"datePublished"\s*:\s*"([^"]+)"/.exec(html)?.[1] ??
    /\/(\d{4})\/(\d{2})\/(\d{2})\//.exec(url)?.slice(1, 4).join("-");
  return raw?.slice(0, 10);
}

async function saveThumbnail(input: Buffer, id: string): Promise<string> {
  const file = `${id}.jpg`;
  await sharp(input)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${IMAGE_DIR}${file}`);
  return file;
}

async function fromUrl(url: string): Promise<HighlightInput & { imageSource?: string }> {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`Fetching ${url} failed: HTTP ${res.status}`);
  const html = await res.text();
  const meta = metaTags(html);
  const host = new URL(url).hostname;
  const isLinkedIn = host.endsWith("linkedin.com");
  const siteName = meta.get("og:site_name");

  // LinkedIn's og:title is mostly hashtags; the post's own first sentence reads better.
  const postText = sentences(meta.get("og:description") ?? "");
  let title = meta.get("og:title") ?? /<title>([^<]*)<\/title>/i.exec(html)?.[1] ?? url;
  let note: string | undefined;
  if (isLinkedIn && postText.length) {
    title = postText[0]!;
    note = postText.slice(1).join(" ") || undefined;
  } else if (siteName) {
    title = title.replace(
      new RegExp(`\\s+[-|–]\\s+${siteName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`),
      "",
    );
  }

  return {
    id: "",
    kind: isLinkedIn ? "post" : host.includes("youtu") ? "video" : "article",
    title: clip(decode(title), 140),
    source: SOURCES[host] ?? siteName ?? host.replace(/^www\./, ""),
    date: publishedDate(html, meta, url),
    url,
    note: note ? clip(note, 220) : undefined,
    imageSource: meta.get("og:image") ?? meta.get("twitter:image"),
  };
}

async function main() {
  const url = positionals[0];
  if (!url && !values.photo) {
    console.error(
      'Usage: pnpm highlight <url> [--title "..."] [--note "..."]   or   pnpm highlight --photo file.jpg --title "..."',
    );
    process.exit(1);
  }

  let draft: HighlightInput & { imageSource?: string };
  if (url) {
    draft = await fromUrl(url);
  } else {
    if (!values.title) throw new Error("--photo needs --title");
    draft = { id: "", kind: "photo", title: values.title };
  }

  // Flags override anything read from the page.
  if (values.title) draft.title = values.title;
  if (values.note) draft.note = values.note;
  if (values.date) draft.date = values.date;
  if (values.kind) draft.kind = values.kind as HighlightInput["kind"];
  if (values.source) draft.source = values.source;

  const items = JSON.parse(readFileSync(JSON_PATH, "utf8")) as HighlightInput[];
  if (url && items.some((i) => i.url === url)) throw new Error(`Already added: ${url}`);

  const stamp = draft.date ?? new Date().toISOString().slice(0, 10);
  draft.id = `${stamp}-${slug(draft.title)}`;
  if (items.some((i) => i.id === draft.id)) throw new Error(`Duplicate id: ${draft.id}`);

  const localImage = values.image ?? values.photo;
  if (localImage) {
    draft.image = await saveThumbnail(readFileSync(localImage), draft.id);
  } else if (draft.imageSource) {
    const img = await fetch(new URL(draft.imageSource, url).toString(), {
      headers: { "User-Agent": UA },
    });
    if (img.ok) draft.image = await saveThumbnail(Buffer.from(await img.arrayBuffer()), draft.id);
    else console.warn(`Preview image failed (HTTP ${img.status}); adding without a thumbnail.`);
  } else {
    console.warn(
      "No preview image on the page; adding without a thumbnail (use --image to set one).",
    );
  }
  delete draft.imageSource;

  const entry = Highlight.parse(
    Object.fromEntries(Object.entries(draft).filter(([, v]) => v !== undefined)),
  );
  writeFileSync(JSON_PATH, `${JSON.stringify([entry, ...items], null, 2)}\n`);
  console.log(JSON.stringify(entry, null, 2));
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
