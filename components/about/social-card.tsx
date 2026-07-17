"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { sfx } from "@/lib/sfx";

type SocialCardProps = {
  href: string;
  ariaLabel: string;
  platform: string;
  icon: ReactNode;
  name: string;
  handle: string;
  bio: string;
  meta: string;
  hoverSound?: boolean;
};

export function SocialCard({
  href,
  ariaLabel,
  platform,
  icon,
  name,
  handle,
  bio,
  meta,
  hoverSound = true,
}: SocialCardProps) {
  const last = useRef(0);

  function onHover() {
    if (!hoverSound) return;
    const now = typeof performance !== "undefined" ? performance.now() : 0;
    if (now - last.current < 400) return;
    last.current = now;
    sfx.hover();
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onPointerEnter={onHover}
      className="group @container relative flex min-h-[282px] flex-col overflow-hidden rounded-2xl bg-fg/[0.035] p-8 text-fg transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-fg/[0.055] hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.35)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent @min-[200px]:min-h-[292px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {icon}
          <span>{platform}</span>
        </div>
        <span
          aria-hidden
          className="text-lg text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>

      <div className="mt-6 min-w-0 leading-tight @min-[200px]:mt-8">
        <p className="truncate text-[15px] font-semibold">{name}</p>
        <p className="mt-1 truncate text-[13px] text-muted">{handle}</p>
      </div>

      <p className="mt-4 text-[13px] leading-5 text-fg/90 @min-[200px]:mt-5 @min-[200px]:text-[15px] @min-[200px]:leading-6">
        {bio}
      </p>

      <div className="mt-auto border-t border-border/80 pt-3 @min-[200px]:pt-4">
        <span className="text-[13px] text-muted">{meta}</span>
      </div>
    </a>
  );
}
