"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { durations, easeOut } from "@/lib/motion";

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.route, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
