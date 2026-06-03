"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: string;
  emoji: string;
  href: string;
  external?: boolean;
};

// An inline keyword that, on hover, opens a slot to its right and slides a big
// emoji in from the right (reboot.studio-style inline reveal). Click navigates.
export function HoverKeyword({ children, emoji, href, external }: Props) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const spring = { type: "spring", stiffness: 420, damping: 26, mass: 0.6 } as const;

  const inner = (
    <span
      className="relative"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <span className="font-medium text-fg underline decoration-accent/40 decoration-2 underline-offset-[3px] transition-colors group-hover/kw:text-accent">
        {children}
      </span>
      {/* slot that opens to make room (pushes following text), emoji slides in from the right */}
      <motion.span
        aria-hidden
        className="inline-block overflow-hidden align-middle"
        initial={false}
        animate={{ width: hover ? 32 : 0 }}
        transition={reduce ? { duration: 0 } : spring}
      >
        <motion.span
          className="inline-block pl-[0.3em] text-[1.5em] leading-none"
          initial={false}
          animate={
            reduce
              ? { opacity: hover ? 1 : 0 }
              : { x: hover ? 0 : 16, opacity: hover ? 1 : 0, rotate: hover ? 0 : -16 }
          }
          transition={reduce ? { duration: 0 } : { ...spring, stiffness: 500, damping: 20 }}
        >
          {emoji}
        </motion.span>
      </motion.span>
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
