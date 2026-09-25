/**
 * ASCII texture generators (02 s5.11, s5.12).
 *
 * - renderMark lays out the hero wordmark on a cell grid from a 7x9 pixel font.
 * - renderDivider produces the noise strips. It runs at build time only
 *   (scripts/gen-ascii.ts writes src/lib/ascii-data.ts), so the client does no
 *   random work.
 */

/** 7x9 pixel font. "#" is an on cell. Only the glyphs the mark needs. */
export const GLYPHS: Record<string, readonly string[]> = {
  M: [
    "##...##",
    "###.###",
    "#######",
    "##.#.##",
    "##...##",
    "##...##",
    "##...##",
    "##...##",
    "##...##",
  ],
  E: [
    "#######",
    "#######",
    "##.....",
    "##.....",
    "######.",
    "######.",
    "##.....",
    "#######",
    "#######",
  ],
  H: [
    "##...##",
    "##...##",
    "##...##",
    "##...##",
    "#######",
    "#######",
    "##...##",
    "##...##",
    "##...##",
  ],
  R: [
    "######.",
    "#######",
    "##...##",
    "##...##",
    "#######",
    "######.",
    "##.###.",
    "##..###",
    "##...##",
  ],
  A: [
    "..###..",
    ".#####.",
    "###.###",
    "##...##",
    "##...##",
    "#######",
    "#######",
    "##...##",
    "##...##",
  ],
  N: [
    "##...##",
    "###..##",
    "####.##",
    "#######",
    "##.####",
    "##..###",
    "##...##",
    "##...##",
    "##...##",
  ],
  D: [
    "######.",
    "#######",
    "##...##",
    "##...##",
    "##...##",
    "##...##",
    "##...##",
    "#######",
    "######.",
  ],
  " ": [".....", ".....", ".....", ".....", ".....", ".....", ".....", ".....", "....."],
};

export const GLYPH_HEIGHT = 9;
/** Target mark width in cells, matching the HACK1984 reference. */
export const MARK_COLS = 47;
const LETTER_GAP = 1;
const LINE_GAP = 2;
/** One spare row and column so the +1,+1 drop shadow never clips. */
const SHADOW_PAD = 1;

export interface MarkLine {
  text: string;
  rowStart: number;
  rowEnd: number; // exclusive
}

export interface Mark {
  cols: number;
  rows: number;
  /** Row-major, length cols * rows. */
  cells: Array<0 | 1>;
  lines: MarkLine[];
}

function glyph(ch: string): readonly string[] {
  const g = GLYPHS[ch.toUpperCase()];
  if (!g) throw new Error(`No glyph for "${ch}"`);
  return g;
}

function lineWidth(text: string): number {
  return [...text].reduce((w, ch, i) => w + glyph(ch)[0]!.length + (i > 0 ? LETTER_GAP : 0), 0);
}

/**
 * Lays out `text` with 1-column letter spacing. If a single line is wider than
 * MARK_COLS, it wraps at spaces, one word per line ("MEHR" over "ANAND").
 * Lines are centered in a grid at least MARK_COLS wide.
 */
export function renderMark(text: string): Mark {
  const single = text.trim();
  const texts = lineWidth(single) <= MARK_COLS ? [single] : single.split(/\s+/);
  const widths = texts.map(lineWidth);
  const cols = Math.max(MARK_COLS, ...widths.map((w) => w + SHADOW_PAD));
  const rows = texts.length * GLYPH_HEIGHT + (texts.length - 1) * LINE_GAP + SHADOW_PAD;
  const cells: Array<0 | 1> = new Array<0 | 1>(cols * rows).fill(0);
  const lines: MarkLine[] = [];

  texts.forEach((line, li) => {
    const rowStart = li * (GLYPH_HEIGHT + LINE_GAP);
    let x = Math.floor((cols - widths[li]!) / 2);
    for (const ch of line) {
      const g = glyph(ch);
      g.forEach((row, dy) => {
        [...row].forEach((px, dx) => {
          if (px === "#") cells[(rowStart + dy) * cols + x + dx] = 1;
        });
      });
      x += g[0]!.length + LETTER_GAP;
    }
    lines.push({ text: line, rowStart, rowEnd: rowStart + GLYPH_HEIGHT });
  });

  return { cols, rows, cells, lines };
}

/** Seeded PRNG (mulberry32). Deterministic output for a given seed. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const DIVIDER_RAMP = " .:-=+*#%";

/**
 * Rows of characters from DIVIDER_RAMP, weighted heavily toward space.
 * Density swells and fades along the strip (a sum of two slow sines) so it
 * reads as texture rather than static.
 */
export function renderDivider(seed: number, rows: number, cols: number): string[] {
  const rand = mulberry32(seed);
  const phaseA = rand() * Math.PI * 2;
  const phaseB = rand() * Math.PI * 2;
  const out: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      const swell = 0.5 + 0.3 * Math.sin(c / 23 + phaseA) + 0.2 * Math.sin(c / 7.3 + phaseB + r);
      const v = Math.pow(rand(), 2.2) * Math.max(0, Math.min(1, swell)) * 1.25;
      const idx = Math.min(DIVIDER_RAMP.length - 1, Math.floor(v * DIVIDER_RAMP.length));
      line += DIVIDER_RAMP[idx];
    }
    out.push(line);
  }
  return out;
}
