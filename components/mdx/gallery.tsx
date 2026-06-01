import type { ReactNode } from "react";

export function Gallery({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 [&_figure]:my-0">
      {children}
    </div>
  );
}
