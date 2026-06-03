"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Paper } from "@/lib/research";

// A research paper card. With a link, the whole card opens the paper in a new tab.
// Without one (still under review), clicking pops a brief "Under review" hint.
export function ResearchCard({ p }: { p: Paper }) {
  const reduce = useReducedMotion();
  const [hint, setHint] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showHint() {
    setHint(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHint(false), 2000);
  }

  const sheet = (
    <div className="group relative flex items-center justify-center rounded-xl border border-border bg-[#fafafa] px-6 py-10 sm:py-12">
      <div className="relative aspect-[773/1000] w-2/3 overflow-hidden rounded-[3px] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.04),0_6px_16px_-6px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
        <Image
          src={p.cover}
          alt={`${p.title} — first page`}
          fill
          sizes="(max-width: 640px) 66vw, 340px"
          className="object-cover object-top"
        />
      </div>

      {/* under-review hint (unlinked papers only) */}
      <AnimatePresence>
        {hint && (
          <motion.span
            className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-bg/80 px-3 py-1 text-[11px] font-medium text-fg shadow-lg backdrop-blur-md"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Under review — not public yet
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );

  const meta = (
    <>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-medium leading-snug tracking-tight transition-colors group-hover/card:text-accent">{p.title}</h2>
        <span className="shrink-0 font-mono text-xs text-muted">{p.year}</span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-accent">{p.venue}</span>
        <span className="text-muted/50">·</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{p.status}</span>
        {p.href && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted opacity-0 transition-opacity group-hover/card:opacity-100">
            · read ↗
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-2.5 max-w-prose text-[13px] leading-snug text-muted">{p.summary}</p>
    </>
  );

  if (p.href) {
    return (
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/card block cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {sheet}
        {meta}
      </a>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${p.title} — under review`}
      onClick={showHint}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showHint();
        }
      }}
      className="group/card block cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {sheet}
      {meta}
    </div>
  );
}
