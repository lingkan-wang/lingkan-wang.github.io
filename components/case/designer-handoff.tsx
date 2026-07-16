"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";
import { MediaPlaceholder } from "./elements";

export type HandoffItem = {
  key: string;
  /** Left-list label. */
  label: string;
  /** Right-panel caption title. */
  title: string;
  /** Right-panel caption body. */
  desc: string;
  /** Screenshot; falls back to a placeholder when absent. */
  src?: string;
  alt?: string;
};

/** A faux Figma/browser window around the preview. */
function Chrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-fg/[0.02] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="ml-1.5 truncate rounded-md bg-fg/[0.04] px-2.5 py-1 font-mono text-[11px] text-muted">{url}</span>
      </div>
      {children}
    </div>
  );
}

/**
 * "Designer handoff" block: a left column of clickable aspects of the organized
 * Figma file, and a right column that swaps a framed screenshot (or a
 * placeholder) to match. Hover/click to switch. Pure state, no timers.
 */
export function DesignerHandoff({ items }: { items: HandoffItem[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const s = items[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#fafafa] dark:bg-white/[0.03]">
      <div className="grid sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
        {/* Left: clickable list */}
        <div className="flex flex-col gap-2.5 border-b border-border p-5 sm:border-b-0 sm:border-r sm:p-6">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <button
                key={it.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`rounded-xl border px-4 py-3.5 text-left transition-colors ${
                  on
                    ? "border-accent bg-accent/[0.06] text-accent"
                    : "border-border bg-bg text-muted hover:border-fg/30 hover:text-fg"
                }`}
              >
                <span className="text-[15px] font-medium">{it.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: framed preview + caption */}
        <div className="p-5 sm:p-8">
          <Chrome url="Masii · Figma">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.key}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: durations.enter, ease: easeOut }}
              >
                {s.src ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={s.src} alt={s.alt ?? s.title} className="block h-auto w-full" loading="lazy" />
                ) : (
                  <div className="grid aspect-[16/10] place-items-center bg-[#141414] p-4">
                    <MediaPlaceholder label={s.label} caption="drop the Figma screenshot here" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Chrome>

          <AnimatePresence mode="wait">
            <motion.div
              key={s.key}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: durations.enter, ease: easeOut }}
              className="mt-4"
            >
              <p className="text-[15px] font-medium text-fg">{s.title}</p>
              <p className="mt-1 text-[14px] leading-[1.5] text-muted">{s.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
