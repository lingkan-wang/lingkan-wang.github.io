"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { enterTransition, revealVariants } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
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
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ ...enterTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
