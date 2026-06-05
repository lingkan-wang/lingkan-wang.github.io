import type { ReactNode } from "react";
import { Reveal } from "../reveal";

/**
 * Big editorial statement line — the marco.fyi-style pull-quote that sits
 * between beats and carries the argument forward. Not a blockquote (use
 * <Quote> for attributed testimonials); this is the author's own voice, large.
 */
export function Statement({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <Reveal>
      <p
        className={`my-14 text-pretty text-[26px] font-semibold leading-[1.25] tracking-tight sm:text-[30px] ${
          accent ? "text-accent" : "text-fg"
        }`}
      >
        {children}
      </p>
    </Reveal>
  );
}
