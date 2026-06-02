"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { track } from "@/lib/about";
import { SpotifyGlyph } from "./app-icons";

const label = "font-mono text-[10px] uppercase tracking-widest text-muted";

export function MusicCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className={label}>On repeat</span>
        <a href={track.href} target="_blank" rel="noopener noreferrer" aria-label="Open in Spotify" className="rounded-[8px] focus-visible:outline-2 focus-visible:outline-accent">
          <SpotifyGlyph />
        </a>
      </div>

      <div className="mt-5 flex items-center gap-3.5">
        <Image
          src={track.cover}
          alt={`${track.title} cover`}
          width={120}
          height={120}
          className="size-14 shrink-0 rounded-lg border border-border object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-fg">{track.title}</div>
          <div className="truncate text-[13px] text-muted">{track.artist}</div>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-fg text-bg transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {playing ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l10-6.5z" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-auto pt-5">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-fg/10">
          <div className="h-full rounded-full bg-fg" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setProgress(a.duration ? a.currentTime / a.duration : 0);
        }}
      />
    </div>
  );
}
