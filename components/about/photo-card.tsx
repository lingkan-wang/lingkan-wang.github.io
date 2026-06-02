"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gallery, galleryCategories, type Category } from "@/lib/about";

const label = "font-mono text-[10px] uppercase tracking-widest text-muted";

function PhotosIcon() {
  // little Apple-Photos-style pinwheel
  return (
    <span
      className="size-5 shrink-0 rounded-[5px]"
      style={{
        background:
          "conic-gradient(#fbbf24, #fb7185, #c084fc, #60a5fa, #34d399, #fbbf24)",
      }}
      aria-hidden
    />
  );
}

export function PhotoCard() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<Category>("landscape");
  const [i, setI] = useState(0);

  const items = gallery.filter((g) => g.category === cat);
  const cur = items[i % items.length] ?? gallery[0];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className={label}>Life · tap to flip</span>
        <PhotosIcon />
      </div>

      <button
        type="button"
        onClick={() => setI((v) => (v + 1) % items.length)}
        aria-label="Next photo"
        className="group relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-accent"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={cur.src}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={cur.src} alt={cur.alt} fill sizes="(max-width: 1024px) 100vw, 300px" className="object-cover" />
          </motion.span>
        </AnimatePresence>
        <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/45 px-2 py-0.5 font-mono text-[10px] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          next →
        </span>
      </button>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {galleryCategories.map((c) => {
          const on = c.key === cat;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setCat(c.key);
                setI(0);
              }}
              className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                on ? "border-fg bg-fg text-bg" : "border-border text-muted hover:text-fg"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
