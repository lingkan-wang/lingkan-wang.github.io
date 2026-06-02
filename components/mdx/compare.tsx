"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { durations, easeOut } from "@/lib/motion";

export function Compare({ a, b, children }: { a: string; b: string; children: ReactNode }) {
  const rows = Children.toArray(children).filter(isValidElement) as ReactElement<CompareRowProps>[];
  return (
    <div className="my-10 overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-border bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)]">
        <span className="p-3.5 font-mono text-[10px] uppercase tracking-widest text-muted">Feature</span>
        <span className="p-3.5 font-mono text-[10px] uppercase tracking-widest text-muted">{a}</span>
        <span className="bg-accent/5 p-3.5 font-mono text-[10px] uppercase tracking-widest text-accent">{b}</span>
      </div>
      {rows.map((row, i) => cloneElement(row, { index: i }))}
    </div>
  );
}

type CompareRowProps = { feature: string; a: string; b: string; index?: number };

export function CompareRow({ feature, a, b, index = 0 }: CompareRowProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="grid grid-cols-[1.4fr_1fr_1fr] border-t border-border text-[14px] first:border-t-0"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: durations.base, ease: easeOut, delay: index * 0.05 }}
    >
      <span className="p-3.5 font-medium">{feature}</span>
      <span className="p-3.5 text-muted">{a}</span>
      <span className="bg-accent/5 p-3.5 text-fg">{b}</span>
    </motion.div>
  );
}
