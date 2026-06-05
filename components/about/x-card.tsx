"use client";

import { useRef } from "react";
import { site } from "@/lib/site";
import { xCard } from "@/lib/about";
import { Logo } from "@/components/logo";
import { XGlyph } from "./app-icons";
import { sfx } from "@/lib/sfx";

export function XCard() {
  // debounce so re-entering the button doesn't machine-gun the sound
  const last = useRef(0);
  function onHover() {
    const now = typeof performance !== "undefined" ? performance.now() : 0;
    if (now - last.current < 400) return;
    last.current = now;
    sfx.hover();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Logo size={38} />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-fg">{site.name}</div>
            <div className="text-xs text-muted">{xCard.handle}</div>
          </div>
        </div>
        <XGlyph />
      </div>

      <p className="mt-3 text-[15px] leading-snug text-fg">{xCard.bio}</p>
      <p className="mt-1 text-[13px] leading-snug text-muted">{xCard.meta}</p>

      <a
        href={site.links.x}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={onHover}
        className="group mt-auto inline-flex w-fit items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-fg transition-[background-color,border-color,transform] duration-150 ease-out hover:border-fg/30 hover:bg-fg/[0.05] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {xCard.cta}
        <span
          aria-hidden
          className="transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </a>
    </div>
  );
}
