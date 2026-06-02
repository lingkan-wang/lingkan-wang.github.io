"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import { durations, easeOut } from "@/lib/motion";

const iconLink = "rounded transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-accent";

function SocialLinks() {
  return (
    <>
      <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.96v15.5H.5zM8.5 8h4.75v2.12h.07c.66-1.18 2.28-2.42 4.69-2.42 5.02 0 5.95 3.18 5.95 7.3v8.5h-4.96v-7.53c0-1.8-.03-4.1-2.62-4.1-2.62 0-3.02 1.95-3.02 3.97v7.66H8.5z" />
        </svg>
      </a>
      <a href={site.links.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className={iconLink}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a href={`mailto:${site.email}`} aria-label="Email" className={iconLink}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </a>
    </>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto max-w-[1080px] px-6">
        <div className="relative flex items-center justify-between py-3">
          {/* brand: avatar logo + name / role */}
          <Link href="/" className="flex items-center gap-2.5 rounded focus-visible:outline-2 focus-visible:outline-accent">
            <Logo />
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-fg">{site.name}</span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">{site.role}</span>
            </span>
          </Link>

          {/* centered nav (desktop) — plain links, no click animation */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 sm:flex">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                {item.label}
              </Link>
            ))}
          </div>

          {/* right: social icons + theme (desktop) */}
          <div className="hidden items-center gap-3.5 sm:flex">
            <SocialLinks />
            <ThemeToggle />
          </div>

          {/* mobile controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {/* mobile menu: open/close animates; item clicks are animation-free */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              className="overflow-hidden border-t border-border sm:hidden"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={reduce ? {} : { height: "auto", opacity: 1 }}
              exit={reduce ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: durations.base, ease: easeOut }}
            >
              <div className="flex flex-col gap-1 py-3">
                {site.nav.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2 text-sm text-muted hover:text-fg">
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 flex items-center gap-4 border-t border-border pt-3 text-muted">
                  <SocialLinks />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
