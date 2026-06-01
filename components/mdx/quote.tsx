import type { ReactNode } from "react";

export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="my-10 border-l-2 border-accent pl-5 text-lg italic text-fg/80">
      {children}
      {cite && <cite className="mt-2 block text-sm not-italic text-muted">— {cite}</cite>}
    </blockquote>
  );
}
