"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export type Callout = { src: string; w: number; h: number; alt: string; caption: string; at: number };
type Full = { src: string; w: number; h: number; alt: string };

/**
 * An annotated interface: the whole screen on the left, detail crops stacked on
 * the right, and connector arrows drawn (measured at runtime) from each region
 * of the full screen to its crop. On small screens the arrows are dropped and
 * everything stacks.
 */
export function InterfaceCallouts({ full, callouts }: { full: Full; callouts: Callout[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [links, setLinks] = useState<{ d: string; head: string; ax: number; ay: number }[]>([]);

  useLayoutEffect(() => {
    const compute = () => {
      const W = wrap.current;
      const I = img.current;
      if (!W || !I) return;
      const wr = W.getBoundingClientRect();
      const ir = I.getBoundingClientRect();
      setDim({ w: wr.width, h: wr.height });
      setLinks(
        callouts.map((c, i) => {
          const el = cards.current[i];
          if (!el) return { d: "", head: "", ax: 0, ay: 0 };
          const cr = el.getBoundingClientRect();
          const ax = ir.right - wr.left; // image right edge
          const ay = ir.top - wr.top + c.at * ir.height;
          const tx = cr.left - wr.left - 7; // just left of the card
          const ty = cr.top - wr.top + cr.height / 2;
          const mx = ax + (tx - ax) * 0.55;
          return {
            d: `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${ty}, ${tx} ${ty}`,
            head: `M ${tx - 7} ${ty - 4} L ${tx} ${ty} L ${tx - 7} ${ty + 4}`,
            ax,
            ay,
          };
        }),
      );
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (wrap.current) ro.observe(wrap.current);
    // a couple of delayed recomputes catch image/layout settling
    const t = setTimeout(compute, 250);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [callouts]);

  return (
    <div ref={wrap} className="relative grid items-center gap-6 sm:grid-cols-[1.05fr_0.95fr] sm:gap-12">
      <svg
        className="pointer-events-none absolute inset-0 z-10 hidden text-accent sm:block"
        width={dim.w}
        height={dim.h}
        style={{ overflow: "visible" }}
        aria-hidden
      >
        {links.map((l, i) =>
          l.d ? (
            <g key={i} stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx={l.ax} cy={l.ay} r="3.5" fill="currentColor" stroke="none" />
              <path d={l.d} opacity="0.55" />
              <path d={l.head} opacity="0.85" />
            </g>
          ) : null,
        )}
      </svg>

      <div ref={img} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm ring-1 ring-black/[0.03]">
        <Image
          src={full.src}
          alt={full.alt}
          width={full.w}
          height={full.h}
          sizes="(max-width: 1080px) 92vw, 560px"
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-col gap-4">
        {callouts.map((c, i) => (
          <div
            key={c.src}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className="rounded-xl border border-border bg-bg p-2 shadow-sm"
          >
            <div className="overflow-hidden rounded-lg border border-border">
              <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="(max-width: 1080px) 92vw, 460px" className="h-auto w-full" />
            </div>
            <p className="mt-2 px-1 text-xs leading-snug text-muted">{c.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
