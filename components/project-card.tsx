"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Placeholder } from "./placeholder";

export type CardItem = {
  slug: string;
  title: string;
  tags: string[];
  outcome: string;
  year: number | string;
  cover?: string;
};

const MAX_TILT = 6; // degrees — subtle; a held card, not a spinning panel

export function ProjectCard({ item }: { item: CardItem }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  // springy so the card settles back instead of snapping — interruptible mid-move
  const rx = useSpring(0, { stiffness: 220, damping: 18 });
  const ry = useSpring(0, { stiffness: 220, damping: 18 });
  const glow = useSpring(0, { stiffness: 300, damping: 30 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 60%)`;

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width; // 0..1
    const ny = (e.clientY - r.top) / r.height;
    ry.set((nx - 0.5) * 2 * MAX_TILT); // left edge dips toward you, right tips away
    rx.set(-(ny - 0.5) * 2 * MAX_TILT);
    gx.set(nx * 100);
    gy.set(ny * 100);
    glow.set(1);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    glow.set(0);
  }

  return (
    <Link
      ref={ref}
      href={`/work/${item.slug}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 900 }}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
    >
      <motion.div
        className="relative overflow-hidden rounded-xl"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      >
        {item.cover ? (
          <Image
            src={item.cover}
            alt={item.title}
            width={900}
            height={563}
            sizes="(max-width: 760px) 100vw, 380px"
            className="aspect-[16/10] w-full rounded-xl border border-border object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder
            label={item.title}
            aspect="aspect-[16/10]"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}

        {/* specular sheen that tracks the pointer — like light catching a tilted card */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background: sheen, opacity: glow }}
        />
      </motion.div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
            {item.title}
          </h3>
          <span className="shrink-0 font-mono text-xs text-muted">{item.year}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[13px] leading-snug text-muted">{item.outcome}</p>
      </div>
    </Link>
  );
}
