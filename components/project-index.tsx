"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { previewSpring } from "@/lib/motion";
import { Placeholder } from "./placeholder";

export type IndexItem = {
  slug: string;
  title: string;
  company?: string;
  year: number;
  tags: string[];
  thumbnail?: string;
};

function Thumb({ item, className = "" }: { item: IndexItem; className?: string }) {
  return item.thumbnail ? (
    <Image
      src={item.thumbnail}
      alt={item.title}
      width={320}
      height={200}
      className={`rounded-lg border border-border object-cover ${className}`}
    />
  ) : (
    <Placeholder label={item.company ?? item.title} aspect="aspect-[16/10]" className={className} />
  );
}

export function ProjectIndex({ projects }: { projects: IndexItem[] }) {
  const [active, setActive] = useState<IndexItem | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, previewSpring);
  const sy = useSpring(y, previewSpring);

  function handleMove(e: React.MouseEvent) {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  }

  return (
    <div onMouseMove={handleMove}>
      <ul className="border-t border-border">
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-border">
            <Link
              href={`/work/${p.slug}`}
              onMouseEnter={() => setActive(p)}
              onMouseLeave={() => setActive(null)}
              onFocus={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(rect.right - 192);
                y.set(rect.bottom + 8);
                setActive(p);
              }}
              onBlur={() => setActive(null)}
              className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="text-lg font-medium tracking-tight transition-transform duration-200 group-hover:translate-x-1">
                {p.title}
              </span>
              <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted">
                {p.year}
              </span>
            </Link>

            {/* touch / no-hover fallback: inline thumbnail */}
            <div className="mb-4 hidden [@media(hover:none)]:block">
              <Thumb item={p} className="w-full" />
            </div>
          </li>
        ))}
      </ul>

      {/* hover-capable pointers only: floating cursor preview */}
      <AnimatePresence>
        {active && !reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-50 hidden [@media(hover:hover)]:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="w-48 overflow-hidden rounded-lg shadow-2xl">
              <Thumb item={active} className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
