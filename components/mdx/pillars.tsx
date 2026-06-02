import type { ReactNode } from "react";
import { Reveal } from "../reveal";

export function Pillars({ items }: { items: { title: string; body?: ReactNode }[] }) {
  return (
    <Reveal>
      <div className="my-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-border p-5">
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="mt-2 text-[15px] font-semibold tracking-tight">{it.title}</h4>
            {it.body && <p className="mt-1.5 text-[13px] leading-6 text-muted">{it.body}</p>}
          </div>
        ))}
      </div>
    </Reveal>
  );
}
