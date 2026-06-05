import type { ReactNode } from "react";
import { Reveal } from "../reveal";

/**
 * Three-up summary block (Problem / What I did / Impact). A quiet, scannable
 * "at a glance" row framed by hairline rules — the fast read before the long read.
 */
export function Triptych({ items }: { items: { label: string; body: ReactNode }[] }) {
  return (
    <Reveal>
      <div className="my-12 grid grid-cols-1 gap-x-6 gap-y-7 border-y border-border py-8 sm:grid-cols-3">
        {items.map((it) => (
          <div key={it.label}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{it.label}</p>
            <p className="mt-2 text-[14px] leading-6 text-fg/90">{it.body}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
