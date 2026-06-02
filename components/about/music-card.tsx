"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { track } from "@/lib/about";
import { AppleMusicGlyph } from "./app-icons";

const label = "font-mono text-[10px] uppercase tracking-widest text-muted";
// secondary (ghost) transport controls — muted, lift to fg on hover
const ghost =
  "grid size-7 place-items-center rounded-full text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function MusicCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  }
  function restart() {
    const a = audioRef.current;
    if (a) a.currentTime = 0;
  }
  function skip() {
    const a = audioRef.current;
    if (a) a.currentTime = Math.min(a.duration || 30, a.currentTime + 10);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className={label}>On repeat</span>
        <a
          href={track.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open playlist"
          className="rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <AppleMusicGlyph />
        </a>
      </div>

      {/* framed album cover */}
      <div className="mt-4 w-fit rounded-xl bg-white p-2 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
        <Image
          src={track.cover}
          alt={`${track.title} cover`}
          width={160}
          height={160}
          className="size-[132px] rounded-lg object-cover"
        />
      </div>

      <div className="mt-3.5">
        <div className="truncate text-[15px] font-semibold text-fg">{track.title}</div>
        <div className="truncate text-[13px] text-muted">{track.artist}</div>
      </div>

      {/* transport control bar — compact, scaled to match the Follow button's width */}
      <div className="mt-auto flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1">
        <button type="button" onClick={restart} aria-label="Restart" className={ghost}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M11 18.5V5.5l-8 6.5zM21 18.5V5.5l-8 6.5z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="grid size-8 place-items-center rounded-full bg-fg text-bg transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {playing ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button type="button" onClick={skip} aria-label="Skip forward" className={ghost}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M13 5.5v13l8-6.5zM3 5.5v13l8-6.5z" />
          </svg>
        </button>
      </div>

      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
