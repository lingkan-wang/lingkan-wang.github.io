"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";

type Slide = { key: string; node: ReactNode };

/**
 * Swipeable one-at-a-time carousel. Drag/flick (spring + velocity), prev/next
 * arrows, dot indicators, and arrow-key support. Respects reduced motion.
 */
export function Carousel({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const n = slides.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (d: number) => setI((p) => Math.max(0, Math.min(n - 1, p + d)));

  function onDragEnd(_e: unknown, info: PanInfo) {
    const threshold = (w || 1) * 0.22;
    if (info.offset.x < -threshold || info.velocity.x < -450) go(1);
    else if (info.offset.x > threshold || info.velocity.x > 450) go(-1);
    // otherwise the `animate` target springs back to the current slide
  }

  const transition = reduce
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 320, damping: 36, mass: 0.8 } as const);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Explorations"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
      }}
      className="rounded-2xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
    >
      <div ref={ref} className="relative overflow-hidden rounded-2xl">
        <motion.div
          className="flex"
          drag={n > 1 ? "x" : false}
          dragElastic={0.08}
          dragConstraints={{ left: -(n - 1) * w, right: 0 }}
          onDragEnd={onDragEnd}
          animate={{ x: -i * w }}
          transition={transition}
          style={{ touchAction: "pan-y" }}
        >
          {slides.map((s) => (
            <div key={s.key} className="shrink-0" style={{ width: w || "100%" }}>
              {s.node}
            </div>
          ))}
        </motion.div>

        {n > 1 && (
          <>
            <Arrow dir="prev" disabled={i === 0} onClick={() => go(-1)} />
            <Arrow dir="next" disabled={i === n - 1} onClick={() => go(1)} />
          </>
        )}
      </div>

      {n > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.key}
              aria-label={`Go to slide ${idx + 1} of ${n}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                idx === i ? "w-5 bg-fg/70" : "w-1.5 bg-fg/20 hover:bg-fg/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Arrow({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      className={`absolute top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-bg/80 text-fg shadow-sm backdrop-blur transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-bg active:scale-95 disabled:pointer-events-none disabled:opacity-0 ${
        dir === "prev" ? "left-3" : "right-3"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={dir === "next" ? "rotate-180" : ""}
        aria-hidden
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
}
