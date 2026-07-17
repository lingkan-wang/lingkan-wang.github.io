"use client";

import { useRef } from "react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
import { sfx } from "@/lib/sfx";
import { ThreadsGlyph } from "./app-icons";

export function ThreadsCard() {
  const last = useRef(0);

  function onHover() {
    const now = typeof performance !== "undefined" ? performance.now() : 0;
    if (now - last.current < 400) return;
    last.current = now;
    sfx.hover();
  }

  return (
    <a
      href={site.links.threads}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Lingkan Wang on Threads"
      onPointerEnter={onHover}
      className="group @container relative flex min-h-[250px] flex-col overflow-hidden rounded-[18px] bg-bg p-3 text-fg ring-1 ring-border/80 transition-[transform,box-shadow,ring-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.35)] hover:ring-fg/20 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent @min-[200px]:min-h-[260px] @min-[200px]:p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ThreadsGlyph />
          <span>Threads</span>
        </div>
        <span
          aria-hidden
          className="text-lg text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>

      <div className="mt-6 flex flex-col items-start gap-2 @min-[200px]:mt-8 @min-[200px]:flex-row @min-[200px]:items-center @min-[200px]:gap-3">
        <Logo size={46} />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[15px] font-semibold">Lynkan Wang</p>
          <p className="mt-1 truncate text-[13px] text-muted">@wanglingkan183</p>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-5 text-fg/90 @min-[200px]:mt-5 @min-[200px]:text-[15px] @min-[200px]:leading-6">
        Product Builder ✦ build something interesting
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-border/80 pt-3 @min-[200px]:pt-4">
        <span className="hidden text-[13px] text-muted @min-[220px]:block">See what I&apos;m sharing lately</span>
        <span className="w-full rounded-full bg-fg px-2.5 py-1.5 text-center text-[11px] font-medium text-bg transition-transform duration-200 group-hover:scale-[1.03] @min-[220px]:w-auto @min-[220px]:px-3 @min-[220px]:text-xs">
          View profile
        </span>
      </div>
    </a>
  );
}
