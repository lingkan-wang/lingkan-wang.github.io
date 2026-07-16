"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { enterTransition, revealVariants } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
  margin = "-10% 0px",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** viewport root margin; use a positive bottom value to trigger earlier
   *  (content finishes fading in before it scrolls into clear view). */
  margin?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin }}
      transition={{ ...enterTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
