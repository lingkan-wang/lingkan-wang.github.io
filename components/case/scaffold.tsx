import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "./elements";

// Shared layout scaffolding for the rich case studies (Ecovacs, Varsity, …), so
// they use one story-led system: sticky-TOC content column, eyebrow + large
// headline per section, reference-matched type scale, full-width wrapping.

export const SHELL = "mx-auto w-[min(1180px,92vw)]";
export const PROSE = "max-w-none"; // text runs to the content-column right edge
export const GAP = "scroll-mt-24"; // clears the sticky top nav on anchor jumps

/** The sticky TOC rail (left) + content column (right) wrapper. */
export function CaseShell({ toc, children }: { toc: ReactNode; children: ReactNode }) {
  return (
    <div className="pt-20 sm:pt-24">
      <div className={`${SHELL} md:grid md:grid-cols-[168px_minmax(0,1fr)] md:gap-10 lg:gap-14 xl:gap-20`}>
        <aside className="hidden md:block">
          <div className="sticky top-24">{toc}</div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

/** A pill tag (hero tags, before/after labels). */
export function Chip({ children, accent }: { children: string; accent?: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.8rem] uppercase tracking-[0.06em] ${
        accent ? "border-accent/40 bg-accent/[0.06] text-accent" : "border-border text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/** A section's eyebrow label + large (weight-400) headline, revealed together. */
export function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <Reveal>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-3 text-[2rem] font-normal leading-[1.3] sm:text-[2.4rem]">
        {title}
      </h2>
    </Reveal>
  );
}

/** A small mono eyebrow used inside a section (Note, What I owned, kickers). */
export function MiniLabel({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <p className={`font-mono text-[0.8rem] uppercase tracking-[0.06em] ${accent ? "text-accent" : "text-muted"}`}>
      {children}
    </p>
  );
}

/** A within-section sub-heading (smaller than SectionHead) for merged blocks. */
export function SubHead({ label, title }: { label: string; title: string }) {
  return (
    <>
      <MiniLabel>{label}</MiniLabel>
      <h3 className="mt-2 text-[1.5rem] font-normal leading-[1.2] tracking-tight sm:text-[1.7rem]">{title}</h3>
    </>
  );
}

/** A bulleted list item with an accent dot. */
export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-base leading-[1.4] text-fg/90">
      <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  );
}

/** Light "gallery" surface for screenshots, matching the Coded Work gray frames. */
export const STAGE = "rounded-2xl border border-border bg-[#fafafa] p-5 sm:p-8 dark:bg-white/[0.03]";
