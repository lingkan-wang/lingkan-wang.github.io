"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gallery, galleryCategories, type Category } from "@/lib/about";
import { sfx } from "@/lib/sfx";

const label = "font-mono text-[10px] uppercase tracking-widest text-muted";

function PhotosIcon() {
  // Apple Photos flower — 8 translucent pill petals, multiply-blended, white center
  const colors = ["#FCA000", "#9FC93C", "#4FB748", "#17B6C6", "#3FA2F7", "#B05CD6", "#F186B7", "#FF5247"];
  return (
    <span className="grid size-6 shrink-0 place-items-center overflow-hidden rounded-[6px] bg-white" aria-hidden>
      <svg viewBox="0 0 24 24" className="size-[21px]">
        {colors.map((c, i) => (
          <rect
            key={i}
            x="9.8"
            y="2.4"
            width="4.4"
            height="8.4"
            rx="2.2"
            fill={c}
            style={{ mixBlendMode: "multiply" }}
            transform={`rotate(${i * 45} 12 12)`}
          />
        ))}
      </svg>
    </span>
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

      <div className="group relative mt-3 aspect-[4/5] w-full flex-1 overflow-hidden rounded-xl border border-border">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={cur.src}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={cur.src} alt={cur.alt} fill sizes="(max-width: 1024px) 100vw, 320px" className="object-cover" />
          </motion.span>
        </AnimatePresence>

        {/* tap anywhere on the photo → next (sits under the pills) */}
        <button
          type="button"
          onClick={() => {
            sfx.flip();
            setI((v) => (v + 1) % items.length);
          }}
          aria-label="Next photo"
          className="absolute inset-0 z-10 focus-visible:outline-2 -outline-offset-2 focus-visible:outline-accent"
        />

        {/* category pills — hover-reveal, translucent, over the photo bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-wrap gap-1.5 bg-gradient-to-t from-black/60 via-black/25 to-transparent p-2.5 pt-9 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100">
          {galleryCategories.map((c) => {
            const on = c.key === cat;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => {
                  sfx.tab();
                  setCat(c.key);
                  setI(0);
                }}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur transition-colors focus-visible:outline-2 focus-visible:outline-white ${
                  on ? "bg-white text-black" : "bg-white/20 text-white hover:bg-white/35"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
