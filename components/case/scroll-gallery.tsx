"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type Slide = { key: string; node: ReactNode };

/**
 * A scroll-driven horizontal gallery. The section pins to the viewport while
 * the page scrolls through it, and the slides advance left→right with the
 * scroll. Falls back to a plain vertical stack under reduced motion.
 */
export function ScrollGallery({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const n = slides.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // soften the scrub a touch so it doesn't feel locked to the pixel
  const prog = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(prog, [0, 1], ["0%", `-${(n - 1) * 100}%`]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(prog, "change", (v) => setActive(Math.round(v * (n - 1))));

  if (reduce || n <= 1) {
    return (
      <div className="space-y-4">
        {slides.map((s) => (
          <div key={s.key}>{s.node}</div>
        ))}
      </div>
    );
  }

  return (
    // tall track gives the scroll distance; ~70vh of scroll per slide
    <div ref={ref} style={{ height: `${n * 70}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <div className="w-full overflow-hidden">
          <motion.div className="flex w-full" style={{ x }}>
            {slides.map((s) => (
              <div key={s.key} className="w-full shrink-0">
                {s.node}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((s, idx) => (
            <span
              key={s.key}
              aria-hidden
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                idx === active ? "w-5 bg-fg/70" : "w-1.5 bg-fg/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
