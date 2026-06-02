import type { ReactNode } from "react";
import { Reveal } from "../reveal";

export function DataNote({
  logic,
  principle,
  principleName,
}: {
  logic: ReactNode;
  principle: ReactNode;
  principleName: string;
}) {
  return (
    <Reveal>
      <div className="my-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        <div className="bg-bg p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Data logic</p>
          <div className="mt-2 text-[13px] leading-6 text-fg/90">{logic}</div>
        </div>
        <div className="bg-bg p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Learning science · {principleName}</p>
          <div className="mt-2 text-[13px] leading-6 text-fg/90">{principle}</div>
        </div>
      </div>
    </Reveal>
  );
}
