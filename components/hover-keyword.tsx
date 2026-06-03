"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: string;
  href: string;
  external?: boolean;
  emoji?: string; // emoji reveal (research, awards)
  logo?: string; // image reveal on a white chip (company / school logos)
};

// An inline keyword that, on hover, opens a slot to its right and slides a big
// emoji or logo chip in from the right (reboot.studio-style inline reveal).
export function HoverKeyword({ children, href, external, emoji, logo }: Props) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const spring = { type: "spring", stiffness: 420, damping: 26, mass: 0.6 } as const;

  const reveal = logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt="" className="ml-[0.4em] inline-block h-[1.8em] w-auto object-contain align-middle" />
  ) : (
    <span className="inline-block pl-[0.3em] align-middle text-[1.6em] leading-none">{emoji}</span>
  );

  const inner = (
    <span
      className="relative"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <span className="font-medium text-fg underline decoration-accent/40 decoration-2 underline-offset-[3px] transition-colors group-hover/kw:text-accent">
        {children}
      </span>
      {/* slot opens (pushes following text); content slides in from the right */}
      <motion.span
        aria-hidden
        className="inline-block overflow-hidden align-middle"
        initial={false}
        animate={{ maxWidth: hover ? 260 : 0 }}
        transition={reduce ? { duration: 0 } : spring}
        style={{ maxWidth: 0 }}
      >
        <motion.span
          className="inline-block whitespace-nowrap"
          initial={false}
          animate={
            reduce ? { opacity: hover ? 1 : 0 } : { x: hover ? 0 : 18, opacity: hover ? 1 : 0 }
          }
          transition={reduce ? { duration: 0 } : { ...spring, stiffness: 500, damping: 22 }}
        >
          {reveal}
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
