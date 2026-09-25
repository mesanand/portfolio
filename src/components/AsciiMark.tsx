import { renderMark } from "@/lib/ascii";

// Computed once at module load; the layout is static.
const MARK = renderMark("MEHR ANAND");

/** Cells of the mark, split by the line they belong to, as SVG rects. */
function cellRects(offset: number, predicate: (row: number) => boolean) {
  const rects = [];
  for (let i = 0; i < MARK.cells.length; i++) {
    if (!MARK.cells[i]) continue;
    const row = Math.floor(i / MARK.cols);
    if (!predicate(row)) continue;
    const col = i % MARK.cols;
    rects.push(<rect key={i} x={col + offset} y={row + offset} width={1} height={1} />);
  }
  return rects;
}

const [firstLine] = MARK.lines;
const isFirstLine = (row: number) => firstLine !== undefined && row < firstLine.rowEnd;

/**
 * The hero wordmark (02 s5.11) as an inline SVG, one <rect> per on-cell.
 * "MEHR" in --ascii-6, "ANAND" in --ascii-4, and a 1-cell drop in --ascii-1.
 */
export default function AsciiMark() {
  return (
    <svg
      className="ascii-mark"
      viewBox={`0 0 ${MARK.cols} ${MARK.rows}`}
      role="img"
      aria-label="Mehr Anand"
      shapeRendering="crispEdges"
    >
      <g className="ascii-mark__drop">{cellRects(1, () => true)}</g>
      <g className="ascii-mark__first">{cellRects(0, isFirstLine)}</g>
      <g className="ascii-mark__second">{cellRects(0, (row) => !isFirstLine(row))}</g>
    </svg>
  );
}
