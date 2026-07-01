"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * A sticky, scroll-spy table of contents for a case study (modeled on the
 * georgialyu.com side nav): a "Back to all work" link, a small eyebrow + project
 * name, then a dotted vertical rail that highlights the section in view.
 * Anchor clicks use the page's native smooth scroll; sections carry scroll-mt
 * to clear the sticky top nav.
 */
export function CaseToc({
  items,
  eyebrow,
  title,
}: {
  items: TocItem[];
  eyebrow: string;
  title: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (inView[0]) setActive(inView[0].target.id);
      },
      // a band roughly a third down the viewport: the section crossing it wins
      { rootMargin: "-28% 0px -64% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-fg"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        All work
      </Link>

      <p className="mt-7 font-mono text-[10px] uppercase tracking-widest text-muted">{eyebrow}</p>
      <p className="mt-1.5 text-sm font-semibold tracking-tight text-fg">{title}</p>

      <ul className="relative mt-6 space-y-3">
        <span className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-border" aria-hidden />
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a href={`#${it.id}`} className="group flex items-center gap-3">
                <span
                  className={`relative z-10 size-[7px] shrink-0 rounded-full ring-2 ring-bg transition-colors ${
                    on ? "bg-accent" : "bg-border group-hover:bg-muted"
                  }`}
                />
                <span
                  className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    on ? "text-fg" : "text-muted group-hover:text-fg"
                  }`}
                >
                  {it.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
