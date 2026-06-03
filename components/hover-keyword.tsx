"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  children: string;
  emoji: string;
  href: string;
  external?: boolean;
};

// An inline keyword that pops a little emoji above it on hover and links on click
// (reboot.studio-style reveal, but triggered by hover instead of scroll).
export function HoverKeyword({ children, emoji, href, external }: Props) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  const inner = (
    <span
      className="relative inline-block"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <span className="font-medium text-fg underline decoration-accent/40 decoration-2 underline-offset-[3px] transition-colors group-hover/kw:text-accent">
        {children}
      </span>
      <AnimatePresence>
        {hover && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 select-none text-[15px] leading-none"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.4, rotate: -18 }}
            animate={{ opacity: 1, y: -14, scale: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 520, damping: 18, mass: 0.5 }}
          >
            {emoji}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );

  const cls =
    "group/kw rounded-sm text-accent transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
