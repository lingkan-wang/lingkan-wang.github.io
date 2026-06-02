import type { ReactNode } from "react";

// Children are <Figure> elements, which self-reveal on scroll — so the grid
// itself doesn't wrap in Reveal (that would double the animation).
export function Gallery({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  const grid = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`my-10 grid grid-cols-1 gap-4 ${grid} [&_figure]:my-0`}>{children}</div>
  );
}
