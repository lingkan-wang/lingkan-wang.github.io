"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";

const REPORT_SRC = "/work/masii/report.html";

/**
 * The Outcome caveat line, with an inline highlighted trigger that opens the
 * full data report (the rethemed workflow dashboard) in a modal. The overlay is
 * portaled to <body> so it escapes the Reveal/template transform+blur that would
 * otherwise trap a position:fixed child. Click the backdrop or press Escape to
 * close; listeners + scroll-lock are torn down on close/unmount. No timers.
 */
export function ReportCaveat() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: durations.enter, ease: easeOut }}
        >
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Masii AI efficiency analysis — full report"
            className="relative z-10 flex h-[88vh] w-full max-w-[1180px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
            initial={reduce ? false : { opacity: 0, scale: 0.985, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.985, y: 10 }}
            transition={{ duration: durations.enter, ease: easeOut }}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-black/[0.08] px-5 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-[#111827]">Masii · AI efficiency analysis</p>
                <p className="mt-0.5 truncate text-[11.5px] text-black/45">Reconstructed from Claude Code session logs · 50 sessions · 351 rounds</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-[11.5px] text-black/35 sm:block">Click outside to close</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close report"
                  className="grid size-8 shrink-0 place-items-center rounded-full text-black/50 transition-colors hover:bg-black/[0.06] hover:text-black"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <iframe
              src={REPORT_SRC}
              title="Masii AI efficiency analysis report"
              className="min-h-0 w-full flex-1 bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <p className="text-[13px] leading-6 text-muted">
        The manual-Figma hours are my own senior-designer estimate, anchored to the actuals, not a measured baseline. Treat this as an existence proof, not a controlled study.{" "}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex translate-y-[1px] items-center gap-1 rounded-md bg-accent/[0.1] px-1.5 py-0.5 font-medium text-accent transition-colors hover:bg-accent/[0.18]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 3v18h18" />
            <rect x="7" y="11" width="3" height="6" />
            <rect x="13" y="7" width="3" height="10" />
          </svg>
          View the full data report
        </button>
      </p>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
