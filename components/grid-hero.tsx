"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gridBlurbs } from "@/lib/home";

const COLS = 8;
const ROWS = 5;
const TOTAL = COLS * ROWS;
// scattered dark (clickable) cells, in reveal order → gridBlurbs
const DARK = [1, 7, 8, 12, 14, 19, 23, 27, 30, 34];

const CELL = "aspect-square w-[clamp(34px,8.4vw,54px)] rounded-md";

export function GridHero() {
  const reduce = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="px-6 pt-16 pb-10 sm:pt-24">
      <div
        className="mx-auto grid w-fit gap-1.5"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const order = DARK.indexOf(i);

          // plain light cell
          if (order === -1) {
            return (
              <div key={i} className={`relative ${CELL} border border-border`}>
                <span className="absolute left-1 top-0.5 font-mono text-[8px] text-muted/40">{i + 1}</span>
              </div>
            );
          }

          const blurb = gridBlurbs[order % gridBlurbs.length];
          const open = openIdx === i;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              aria-label={open ? `Hide note: ${blurb}` : "Reveal a note"}
              className={`relative ${CELL} rounded-md focus-visible:outline-2 focus-visible:outline-accent`}
              style={{ perspective: 600 }}
            >
              {/* the cell itself — a single face that spins (flip feel) and goes light when open */}
              <motion.span
                className="block size-full rounded-md border"
                animate={
                  reduce
                    ? { backgroundColor: open ? "var(--color-bg)" : "var(--color-fg)" }
                    : { rotateY: open ? 180 : 0, backgroundColor: open ? "var(--color-bg)" : "var(--color-fg)" }
                }
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                style={{
                  borderColor: open ? "var(--color-fg)" : "transparent",
                  boxShadow: open ? "none" : "0 6px 14px rgba(0,0,0,0.18)",
                }}
              />

              {/* readable blurb chip, anchored above the cell */}
              <AnimatePresence>
                {open && (
                  <motion.span
                    className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-bg px-2.5 py-1.5 text-xs font-medium text-fg shadow-xl"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.92, filter: "blur(4px)" }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {blurb}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
        click the dark cells
      </p>
      <p className="mt-6 text-center text-lg text-muted/50" aria-hidden>↓</p>
    </section>
  );
}
