"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { durations, easeOut } from "@/lib/motion";

type Row = { finding: ReactNode; pain: ReactNode; opportunity: ReactNode };

/**
 * Research finding → pain point → design opportunity. A breakout-width matrix
 * that reads as analytical rigor; the opportunity column carries the accent so
 * the eye lands on the "so what". Rows stagger in (transform + opacity only).
 */
export function Opportunities({ items }: { items: Row[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative left-1/2 my-12 w-[min(880px,92vw)] -translate-x-1/2 overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-3 border-b border-border bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)]">
        <span className="p-3.5 font-mono text-[10px] uppercase tracking-widest text-muted">Research finding</span>
        <span className="p-3.5 font-mono text-[10px] uppercase tracking-widest text-muted">Pain point</span>
        <span className="bg-accent/5 p-3.5 font-mono text-[10px] uppercase tracking-widest text-accent">Design opportunity</span>
      </div>
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="grid grid-cols-3 border-t border-border text-[13px] leading-6 first:border-t-0"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: durations.base, ease: easeOut, delay: i * 0.05 }}
        >
          <span className="p-3.5 text-muted">{it.finding}</span>
          <span className="p-3.5 text-fg/90">{it.pain}</span>
          <span className="bg-accent/5 p-3.5 text-fg">{it.opportunity}</span>
        </motion.div>
      ))}
    </div>
  );
}
