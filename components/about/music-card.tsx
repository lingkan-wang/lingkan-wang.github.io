"use client";

import { useEffect, useRef, useState } from "react";
import { VT323 } from "next/font/google";
import { playlist } from "@/lib/about";

// Retro CRT/OSD pixel font for the screen overlay (self-hosted via next/font).
const vt323 = VT323({ weight: "400", subsets: ["latin"], display: "swap" });

// Transport key — soft, cushioned matte keys like the reference: a gentle top-lit
// gradient, a soft top highlight and an inner bottom shade that round the surface into
// a pillow (no hard keyline). Scales down a touch on press for tactile feedback.
const keyBase =
  "group relative flex flex-1 items-center justify-center py-[19px] text-white " +
  "bg-[linear-gradient(180deg,#393939_0%,#282828_55%,#202020_100%)] " +
  "shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.14),inset_0_-2px_4px_rgba(0,0,0,0.38),0_1px_1.5px_rgba(0,0,0,0.5)] " +
  "transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "hover:brightness-110 active:scale-[0.96] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Wall-clock for the on-screen-display, e.g. "03:45 pm" (matches the reference).
function fmtClock(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes();
  const ap = h >= 12 ? "pm" : "am";
  h %= 12;
  if (h === 0) h = 12;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;
}

export function MusicCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState("--:-- --");
  const cur = playlist[idx];

  // Live OSD clock — set after mount so server/client render don't disagree.
  useEffect(() => {
    const tick = () => setClock(fmtClock(new Date()));
    tick();
    const t = setInterval(tick, 20_000);
    return () => clearInterval(t);
  }, []);

  // Switching tracks: load the new source and keep going if we were already playing.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    if (playing) void a.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => {});
    else a.pause();
  }
  const go = (delta: number) =>
    setIdx((i) => (i + delta + playlist.length) % playlist.length);

  return (
    <div className="flex h-full items-center justify-center">
      {/* retro media-player device */}
      <div className="@container w-full max-w-[260px] rounded-[28px] bg-[linear-gradient(180deg,#2e2e2e_0%,#1c1c1c_100%)] p-3 ring-1 ring-black/40 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.09)]">
        {/* screen */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-[11px] ring-1 ring-black/60">
          {/* eslint-disable-next-line @next/next/no-img-element -- remote Spotify CDN art, hot-linked */}
          <img
            key={cur.cover}
            src={cur.cover}
            alt={`${cur.title} — ${cur.artist}`}
            // slight zoom so any white frame/border baked into a cover crops away —
            // keeps every track full-bleed and consistent (no letterboxed edges)
            className="absolute inset-0 size-full scale-[1.12] object-cover"
          />
          {/* faint CRT scanlines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px)",
            }}
          />
          {/* on-screen display */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.62))] px-2 pb-1 pt-6">
            <div className={`${vt323.className} flex items-center justify-between gap-1.5 text-[13px] leading-none text-white`}>
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="size-[5px] shrink-0 rounded-full bg-[#ff3b30] shadow-[0_0_5px_rgba(255,59,48,0.9)]" />
                {/* "Playing now -" is reference chrome; drop it first on tiny tiles so the song stays visible */}
                <span className="hidden shrink-0 @min-[226px]:inline">Playing now -</span>
                <span className="truncate">{cur.title}</span>
              </span>
              <span className="hidden shrink-0 tabular-nums @min-[186px]:inline">{clock}</span>
            </div>
          </div>
        </div>

        {/* speaker grille — fine matte perforations, ~4 rows */}
        <div
          aria-hidden
          className="mx-auto mt-2.5 h-[22px] w-[82%]"
          style={{
            backgroundImage: "radial-gradient(circle, #515151 1px, transparent 1.45px)",
            backgroundSize: "6px 5px",
            backgroundPosition: "center",
          }}
        />

        {/* transport buttons */}
        <div className="mt-3.5 flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous song"
            className={`${keyBase} rounded-[12px] rounded-bl-[18px]`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="6" width="2.5" height="12" rx="1" />
              <path d="M18.5 6 9.2 12 18.5 18Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
            className={`${keyBase} rounded-[12px]`}
          >
            {playing ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="7" y="5" width="3.6" height="14" rx="1" />
                <rect x="13.4" y="5" width="3.6" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8.5 5.5 18.5 12 8.5 18.5Z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next song"
            className={`${keyBase} rounded-[12px] rounded-br-[18px]`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M5.5 6 14.8 12 5.5 18Z" />
              <rect x="15.5" y="6" width="2.5" height="12" rx="1" />
            </svg>
          </button>
        </div>

        <audio
          ref={audioRef}
          src={cur.src}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      </div>
    </div>
  );
}
