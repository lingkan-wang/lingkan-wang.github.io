"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { durations, easeOut } from "@/lib/motion";

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {site.shortName}
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-6 sm:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
          <a href={site.links.resume} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-fg">
            Resume
          </a>
          <ThemeToggle />
        </div>

        {/* mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted hover:text-fg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile menu: open/close animates; items do not animate on click */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-border sm:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? {} : { height: "auto", opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: durations.base, ease: easeOut }}
          >
            <div className="flex flex-col gap-1 px-6 py-3">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2 text-sm text-muted hover:text-fg">
                  {item.label}
                </Link>
              ))}
              <a href={site.links.resume} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-2 text-sm text-muted hover:text-fg">
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
