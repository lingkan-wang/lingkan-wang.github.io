"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";
import { MediaPlaceholder } from "./elements";
import { FileTree, type TreeNode } from "./file-tree";

export type ProcessStep = {
  key: string;
  label: string;
  title: string;
  detail: string;
  /** Single screen image, or an .mp4/.webm prototype clip. */
  src?: string;
  /** Multiple images shown stacked (e.g. IA overview + per-tab). */
  srcs?: string[];
  poster?: string;
  alt?: string;
  /** Renders an interactive file browser instead of an image. */
  tree?: TreeNode;
};

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous step" : "Next step"}
      className={`absolute top-1/2 z-10 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-bg text-muted transition-colors hover:text-fg sm:grid ${
        dir === "left" ? "-left-3" : "-right-3"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

const IMG_CLS = "mx-auto max-h-[340px] w-auto max-w-full rounded-lg border border-border object-contain";

function Preview({ s }: { s: ProcessStep }) {
  const isVideo = !!s.src && (s.src.endsWith(".mp4") || s.src.endsWith(".webm"));
  if (s.tree) return <FileTree data={s.tree} />;
  if (s.srcs?.length) {
    return (
      <div className="flex w-full flex-col gap-3">
        {s.srcs.map((src) => (
          <a key={src} href={src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg border border-border transition-opacity hover:opacity-90">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={s.alt ?? s.title} className="w-full" loading="lazy" />
          </a>
        ))}
      </div>
    );
  }
  if (s.src && isVideo) {
    return <video src={s.src} poster={s.poster} autoPlay loop muted playsInline className={IMG_CLS} />;
  }
  if (s.src) {
    return (
      <a href={s.src} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.src} alt={s.alt ?? s.title} className={IMG_CLS} loading="lazy" />
      </a>
    );
  }
  return (
    <div className="w-full max-w-[420px]">
      <MediaPlaceholder label={s.title} caption={s.alt ?? "a step in the process"} />
    </div>
  );
}

/**
 * An interactive pipeline: a horizontal rail of steps (PRD → IA → … → polish)
 * plus a detail panel that swaps to the hovered/focused/tapped step's copy and
 * preview (a file browser, image(s), or a clip). Hover on desktop, tap on
 * touch, arrow-key friendly via focus. Pure state, no timers or observers.
 */
export function ProcessFlow({ steps, source }: { steps: ProcessStep[]; source?: { href: string; label: string } }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const s = steps[active];

  return (
    <div className="mt-10">
      <ol className="flex items-center gap-1 overflow-x-auto pb-3 sm:gap-1.5">
        {steps.map((st, i) => {
          const on = i === active;
          return (
            <li key={st.key} className="flex shrink-0 items-center">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 transition-colors ${
                  on ? "border-accent bg-accent/[0.06] text-fg" : "border-border text-muted hover:border-fg/30 hover:text-fg"
                }`}
              >
                <span className={`font-mono text-[10px] tabular-nums ${on ? "text-accent" : "text-muted/70"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="whitespace-nowrap text-[13px] font-medium">{st.label}</span>
              </button>
              {i < steps.length - 1 && <span aria-hidden className="mx-0.5 select-none text-muted/50 sm:mx-1">→</span>}
            </li>
          );
        })}
      </ol>

      <div className="relative mt-5">
        <Arrow dir="left" onClick={() => setActive((p) => (p - 1 + steps.length) % steps.length)} />
        <Arrow dir="right" onClick={() => setActive((p) => (p + 1) % steps.length)} />
        <div className={`rounded-2xl border border-border bg-[#fafafa] p-5 dark:bg-white/[0.03] sm:p-8`}>
          <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] sm:gap-10">
            <div className="flex flex-col self-stretch">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.06em] text-muted">
                Step {active + 1} of {steps.length}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.key}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: durations.enter, ease: easeOut }}
                >
                  <h4 className="mt-2 text-xl font-normal tracking-tight sm:text-2xl">{s.title}</h4>
                  <p className="mt-3 text-[15px] leading-[1.5] text-muted">{s.detail}</p>
                </motion.div>
              </AnimatePresence>
              {source && (
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-auto inline-flex w-fit items-center gap-2 pt-8 text-[13px] font-medium text-muted transition-colors hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.968 6.817H1.677l7.73-8.835L1.254 2.25h6.83l4.712 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>{source.label}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <path d="M7 17 17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>

            <div className="flex min-h-[240px] min-w-0 items-center justify-center sm:min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.key}
                  className="flex w-full justify-center"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: durations.enter, ease: easeOut }}
                >
                  <Preview s={s} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
