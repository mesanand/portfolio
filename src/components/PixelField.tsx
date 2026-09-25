import { useEffect, useRef } from "react";

const CELL = 6; // px per pixel, including the 1px gap
const GAP = 1;
const TICK_MS = 80; // ~12 updates a second: flicker, not motion
const FLIP_RATE = 0.05; // share of cells re-rolled per tick

/**
 * A strip of gold "pixels" at the bottom of the hero that flicker on and off
 * like an old terminal (Mehr, 2026-09-25; overrides 02 s1.7 "nothing loops").
 * Canvas, no library. Denser and brighter toward the bottom edge. Pauses when
 * off screen or in a background tab; static under prefers-reduced-motion.
 */
export default function PixelField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(canvas);
    // Colors come from the ASCII ramp tokens, so tokens.css stays the source of truth.
    const ramp = [1, 2, 3, 4, 5, 6].map((i) => css.getPropertyValue(`--ascii-${i}`).trim());

    let cols = 0;
    let rows = 0;
    let cells = new Uint8Array(0); // 0 = off, 1..6 = ramp index

    // Chance a cell is lit, by row: near zero at the top, dense at the bottom.
    const density = (r: number) => Math.pow((r + 1) / rows, 2.4) * 0.6;
    const color = (r: number) => {
      if (Math.random() < 0.015) return 6; // rare bright sparkle
      const base = 1 + Math.round(((r + 1) / rows) * 3); // brighter lower down
      return Math.min(5, base + (Math.random() < 0.3 ? 1 : 0));
    };
    const roll = (r: number) => (Math.random() < density(r) ? color(r) : 0);

    const draw = (i: number) => {
      const c = i % cols;
      const r = (i / cols) | 0;
      const x = c * CELL;
      const y = r * CELL;
      ctx.clearRect(x, y, CELL, CELL);
      const v = cells[i]!;
      if (v) {
        ctx.fillStyle = ramp[v - 1]!;
        ctx.fillRect(x, y, CELL - GAP, CELL - GAP);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      cells = new Uint8Array(cols * rows);
      for (let i = 0; i < cells.length; i++) {
        cells[i] = roll((i / cols) | 0);
        draw(i);
      }
    };

    let frame = 0;
    let last = 0;
    let visible = true;
    const loop = (t: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden || t - last < TICK_MS) return;
      last = t;
      const flips = Math.ceil(cells.length * FLIP_RATE);
      for (let k = 0; k < flips; k++) {
        const i = (Math.random() * cells.length) | 0;
        cells[i] = roll((i / cols) | 0);
        draw(i);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    io.observe(canvas);

    // Draw a still frame now; start flickering only once the page has loaded
    // and gone idle, so the animation never competes with first paint.
    let idle = 0;
    let wait: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if (reduce) return;
      const go = () => {
        frame = requestAnimationFrame(loop);
      };
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(go, { timeout: 3000 });
      else wait = setTimeout(go, 1500);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(wait);
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="pixel-field" aria-hidden="true" />;
}
