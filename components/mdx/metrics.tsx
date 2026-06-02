"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { durations, easeOut } from "@/lib/motion";

export function Metrics({ children }: { children: ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{ index?: number }>[];
  return (
    <div className="my-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
      {items.map((item, i) => cloneElement(item, { index: i }))}
    </div>
  );
}

export function Metric({ value, label, index = 0 }: { value: string; label: string; index?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="flex flex-col gap-1.5 bg-bg p-5"
      initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: durations.enter, ease: easeOut, delay: index * 0.06 }}
    >
      <span className="text-3xl font-semibold tracking-tight">{value}</span>
      <span className="text-[13px] leading-snug text-muted">{label}</span>
    </motion.div>
  );
}
