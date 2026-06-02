"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion";
import { gridBlurbs } from "@/lib/home";

const SIZE = 168; // cube edge (px)
const HALF = SIZE / 2;

const FACES = [
  { key: "front", t: `translateZ(${HALF}px)` },
  { key: "back", t: `rotateY(180deg) translateZ(${HALF}px)` },
  { key: "right", t: `rotateY(90deg) translateZ(${HALF}px)` },
  { key: "left", t: `rotateY(-90deg) translateZ(${HALF}px)` },
  { key: "top", t: `rotateX(90deg) translateZ(${HALF}px)` },
  { key: "bottom", t: `rotateX(-90deg) translateZ(${HALF}px)` },
] as const;

const preserve = { transformStyle: "preserve-3d" } as React.CSSProperties;
const hideBack = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as React.CSSProperties;

export function CubeHero() {
  const reduce = useReducedMotion();
  const ry = useMotionValue(-32);
  const paused = useRef(false);
  const [open, setOpen] = useState<string | null>(null);
  const [activeBlurb, setActiveBlurb] = useState<string | null>(null);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    ry.set(ry.get() + delta * 0.016); // ~deg per ms → slow, calm spin
  });

  function toggle(id: string, blurb: string) {
    if (open === id) {
      setOpen(null);
      setActiveBlurb(null);
    } else {
      setOpen(id);
      setActiveBlurb(blurb);
    }
  }

  return (
    <section className="px-6 pt-20 pb-12 sm:pt-28">
      <div
        className="mx-auto flex items-center justify-center"
        style={{ perspective: 900, width: 280, height: 260 }}
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
      >
        <motion.div className="relative" style={{ ...preserve, width: SIZE, height: SIZE, rotateX: -24, rotateY: ry }}>
          {FACES.map((face) => (
            <div
              key={face.key}
              className="absolute grid grid-cols-3 gap-1.5 rounded-xl bg-fg p-1.5"
              style={{ ...preserve, ...hideBack, width: SIZE, height: SIZE, transform: face.t }}
            >
              {Array.from({ length: 9 }).map((_, i) => {
                const id = `${face.key}-${i}`;
                const blurb = gridBlurbs[(face.key.length * 3 + i) % gridBlurbs.length];
                const isOpen = open === id;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggle(id, blurb)}
                    aria-label={isOpen ? "Close window" : "Open a window"}
                    className="relative rounded-[6px] focus-visible:outline-2 focus-visible:outline-accent"
                    style={preserve}
                  >
                    {/* interior — revealed when the door swings open */}
                    <span className="absolute inset-0 flex items-center justify-center rounded-[6px] bg-bg p-0.5 text-center text-[6px] font-medium leading-[1.05] text-fg">
                      {blurb}
                    </span>
                    {/* door — swings open on the left hinge like a little window */}
                    <motion.span
                      className="absolute inset-0 rounded-[6px]"
                      style={{
                        ...hideBack,
                        transformOrigin: "left center",
                        transform: "translateZ(2px)",
                        backgroundColor: "color-mix(in srgb, var(--color-fg) 84%, var(--color-bg))",
                        boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--color-bg) 22%, transparent)",
                      }}
                      animate={reduce ? { opacity: isOpen ? 0 : 1 } : { rotateY: isOpen ? -112 : 0 }}
                      transition={{ type: "spring", stiffness: 210, damping: 18 }}
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-widest text-muted transition-opacity">
        {activeBlurb ?? "hover to pause · click a square to open a window"}
      </p>
      <p className="mt-6 text-center text-lg text-muted/50" aria-hidden>↓</p>
    </section>
  );
}
