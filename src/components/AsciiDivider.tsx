import { DIVIDERS, type DividerSeed } from "@/lib/ascii-data";

interface AsciiDividerProps {
  seed: DividerSeed;
}

/** Full-bleed static ASCII noise strip (02 s5.12). Decorative only. */
export default function AsciiDivider({ seed }: AsciiDividerProps) {
  const rows = DIVIDERS[seed];
  return (
    <pre className="ascii-divider bleed" aria-hidden="true">
      {/* Characters live in a data attribute and render via ::before, so this
          decorative noise is not text (no contrast or legibility audits, no copy/paste). */}
      {rows.map((row, i) => (
        <span key={i} className="ascii-divider__row" data-row={row} />
      ))}
    </pre>
  );
}
