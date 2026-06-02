"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { track } from "@/lib/about";
import { AppleMusicGlyph } from "./app-icons";

const label = "font-mono text-[10px] uppercase tracking-widest text-muted";
const ctrl =
  "grid place-items-center rounded-full text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function MusicCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

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
  function toggleMute() {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className={label}>On repeat</span>
        <AppleMusicGlyph />
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

      {/* transport control bar */}
      <div className="mt-auto flex items-center justify-between gap-1 rounded-full border border-border px-3 py-2">
        <a
          href={track.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open playlist"
          className={`${ctrl} size-7`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <line x1="9" y1="6" x2="21" y2="6" />
            <line x1="9" y1="12" x2="21" y2="12" />
            <line x1="9" y1="18" x2="15" y2="18" />
            <circle cx="4" cy="6" r="0.6" fill="currentColor" />
            <circle cx="4" cy="12" r="0.6" fill="currentColor" />
            <circle cx="4" cy="18" r="0.6" fill="currentColor" />
          </svg>
        </a>

        <button type="button" onClick={restart} aria-label="Restart" className={`${ctrl} size-7`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M11 19V5l-9 7 9 7zM22 19V5l-9 7 9 7z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className={`${ctrl} size-9 text-fg`}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button type="button" onClick={skip} aria-label="Skip forward" className={`${ctrl} size-7`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M13 5v14l9-7zM2 5v14l9-7z" />
          </svg>
        </button>

        <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className={`${ctrl} size-7`}>
          {muted ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
              <line x1="16" y1="9" x2="22" y2="15" />
              <line x1="22" y1="9" x2="16" y2="15" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="none" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
            </svg>
          )}
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
