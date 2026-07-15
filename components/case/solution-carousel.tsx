"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";

export type Slide = {
  key: string;
  n: string;
  label: string;
  desc: string;
  /** Screen image, or an .mp4/.webm prototype clip. */
  src?: string;
  poster?: string;
  alt: string;
};

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous screen" : "Next screen"}
      className={`absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 active:scale-95 ${
        dir === "left" ? "left-0 sm:left-1" : "right-0 sm:right-1"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

/**
 * A device-framed carousel for the solution preview: a phone bezel showing one
 * screen (image or looping prototype clip) at a time, with prev/next arrows,
 * a per-slide caption, and dots. Manual navigation only — no timers to leak.
 */
export function SolutionCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const n = slides.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);
  const s = slides[i];
  const isVideo = !!s.src && (s.src.endsWith(".mp4") || s.src.endsWith(".webm"));

  return (
    <div className="mt-10">
      <div className="relative px-12 sm:px-14">
        <Arrow dir="left" onClick={() => go(-1)} />
        <Arrow dir="right" onClick={() => go(1)} />

        <div className="mx-auto w-[min(284px,66vw)]">
          <div className="rounded-[2.3rem] border border-black/10 bg-black p-[6px] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.key}
                className="aspect-[393/852] overflow-hidden rounded-[1.9rem] bg-black"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: durations.enter, ease: easeOut }}
              >
                {s.src && isVideo ? (
                  <video src={s.src} poster={s.poster} autoPlay loop muted playsInline className="h-full w-full object-cover object-top" />
                ) : s.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.src} alt={s.alt} className="h-full w-full object-cover object-top" loading="lazy" />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[520px] flex-col items-center gap-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.key}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: durations.enter, ease: easeOut }}
          >
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.06em] text-accent">
              {s.n} · {s.label}
            </p>
            <p className="mt-2 text-[15px] leading-[1.5] text-muted">{s.desc}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-1.5">
          {slides.map((sl, idx) => (
            <button
              key={sl.key}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === i}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
