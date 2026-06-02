"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gallery, galleryCategories, type Category } from "@/lib/about";

type Tab = Category | "all";

export function PhotoGallery() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Tab>("all");
  const tabs: { key: Tab; label: string }[] = [{ key: "all", label: "All" }, ...galleryCategories];
  const items = active === "all" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const on = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                on ? "border-fg bg-fg text-bg" : "border-border text-muted hover:text-fg"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map((g) => (
            <motion.figure
              key={g.src}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-fg/[0.04]"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                className="object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
              />
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
