"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { codedWork, type CodedWork } from "@/lib/coded";
import { site } from "@/lib/site";

const ACCENT = "#1DB954"; // Spotify green

// "MADE WITH" reads the tech stack, mirroring the reference playlist's tooling column.
const madeWith = (p: CodedWork) => p.tags.join(" · ");

/* ------------------------------------------------------------------ icons */

function IconPlay({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
function IconPause({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
function IconPrev({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7 5v14a1 1 0 0 0 2 0v-5.5l9.2 5.75A1 1 0 0 0 20 18.4V5.6a1 1 0 0 0-1.8-.6L9 10.75V5a1 1 0 0 0-2 0z" />
    </svg>
  );
}
function IconNext({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17 5v14a1 1 0 0 1-2 0v-5.5L5.8 19.4A1 1 0 0 1 4 18.4V5.6a1 1 0 0 1 1.8-.6L15 10.75V5a1 1 0 0 1 2 0z" />
    </svg>
  );
}

/** Animated three-bar equalizer shown in the row number slot of the active track. */
function Equalizer() {
  return (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
      <span className="eq-bar h-full w-[3px] rounded-sm" style={{ background: ACCENT }} />
      <span className="eq-bar h-full w-[3px] rounded-sm" style={{ background: ACCENT }} />
      <span className="eq-bar h-full w-[3px] rounded-sm" style={{ background: ACCENT }} />
    </span>
  );
}

/** Turntable cover art. The disc spins (CSS) whenever a demo is playing. */
function Vinyl({ spinning, size = 104 }: { spinning: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="shrink-0 drop-shadow-2xl" aria-hidden>
      <g className={`vinyl-disc${spinning ? " is-spinning" : ""}`}>
        <circle cx="100" cy="100" r="94" fill="#0b0b0b" />
        {[86, 76, 66, 56, 46].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
        ))}
        <circle cx="100" cy="100" r="34" fill={ACCENT} />
        <circle cx="100" cy="100" r="33" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
        <circle cx="100" cy="100" r="6" fill="#0b0b0b" />
      </g>
      <g>
        <line x1="168" y1="34" x2="118" y2="92" stroke="#c9c9c9" strokeWidth="4" strokeLinecap="round" />
        <circle cx="168" cy="34" r="8" fill="#e5e5e5" />
        <rect x="112" y="86" width="12" height="12" rx="2" fill="#d0d0d0" transform="rotate(40 118 92)" />
      </g>
    </svg>
  );
}

function SocialRow() {
  return (
    <div className="flex items-center gap-4 text-white/70">
      <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.96v15.5H.5zM8.5 8h4.75v2.12h.07c.66-1.18 2.28-2.42 4.69-2.42 5.02 0 5.95 3.18 5.95 7.3v8.5h-4.96v-7.53c0-1.8-.03-4.1-2.62-4.1-2.62 0-3.02 1.95-3.02 3.97v7.66H8.5z" /></svg>
      </a>
      <a href={site.links.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="transition-colors hover:text-white">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </a>
      <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors hover:text-white">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
      </a>
    </div>
  );
}

/* --------------------------------------------------------------- component */

export function CodedPlaylist() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number>(0); // index of the "now playing" demo (-1 = paused/none)
  const [resume, setResume] = useState(0);
  const [saved, setSaved] = useState(false);
  const demoRef = useRef<HTMLElement>(null);

  const len = codedWork.length;
  const playing = active >= 0;
  const current = playing ? codedWork[active] : null;

  const play = (i: number) => {
    setActive(i);
    setResume(i);
  };
  const togglePlay = () => (playing ? setActive(-1) : play(resume));
  const step = (d: number) => play(((active < 0 ? resume : active) + d + len) % len);

  // On phones the right panel sits below the list, so scroll it into view on select.
  const openTrack = (i: number) => {
    play(i);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      demoRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#121212] font-sans text-white lg:flex lg:h-screen lg:overflow-hidden">
      {/* ------------------------------------------------- left: playlist + tracks */}
      <aside className="flex flex-col bg-[#121212] lg:h-screen lg:w-[400px] lg:shrink-0 lg:border-r lg:border-white/10">
        {/* playlist header */}
        <div className="relative isolate shrink-0 overflow-hidden bg-gradient-to-b from-[#1f6941] via-[#163a25] via-40% to-[#121212] to-[95%] px-6 pb-5 pt-16">
          <Link
            href="/"
            aria-label="Back to home"
            className="absolute left-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
          </Link>
          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            aria-pressed={saved}
            aria-label={saved ? "Remove from your library" : "Save to your library"}
            className="absolute right-4 top-4 z-20 text-white/70 transition-transform hover:scale-110"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill={saved ? ACCENT : "none"} stroke={saved ? ACCENT : "currentColor"} strokeWidth="1.6" strokeLinejoin="round" aria-hidden><path d="m12 3.5 2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L12 17.9 6.5 20.6l1.4-6.1L3.2 10.4l6.2-.6z" /></svg>
          </button>

          <div className="relative z-10">
            <Vinyl spinning={playing} size={104} />
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/85">Playlist</p>
            <h1 className="mt-1 text-[2.4rem] font-black uppercase leading-[0.9] tracking-tight">Coded Work</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-white/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png?v=2" alt="" width={22} height={22} className="mr-0.5 size-[22px] rounded-full object-cover" />
              <span className="font-semibold text-white">{site.name}</span>
              <span className="text-white/50">•</span>
              <span>{len} projects</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="grid size-12 place-items-center rounded-full text-black shadow-xl transition-transform hover:scale-105 active:scale-95"
                style={{ background: ACCENT }}
              >
                {playing ? <IconPause className="size-5" /> : <IconPlay className="size-6 translate-x-[1px]" />}
              </button>
              <SocialRow />
            </div>
          </div>
        </div>

        {/* track list */}
        <ul className="min-h-0 flex-1 overflow-y-auto px-2 py-2 lg:pb-6">
          {codedWork.map((p, i) => {
            const isActive = active === i;
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => openTrack(i)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Play ${p.title}`}
                  className={`group grid w-full grid-cols-[22px_1fr] items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-white/[0.07] ${isActive ? "bg-white/[0.06]" : ""}`}
                >
                  <span className="relative flex h-4 items-center justify-center text-sm tabular-nums text-white/45">
                    {isActive ? (
                      <Equalizer />
                    ) : (
                      <>
                        <span className="transition-opacity group-hover:opacity-0">{i + 1}</span>
                        <IconPlay className="absolute size-3.5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                      </>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate text-[15px] font-medium ${isActive ? "text-[#1DB954]" : "text-white"}`}>{p.title}</span>
                    <span className="mt-0.5 block truncate text-[13px] text-white/50">{madeWith(p)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* --------------------------------------------------- right: now playing */}
      <main ref={demoRef} className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {current ? (
          <div className="flex min-h-full flex-col">
            {/* now-playing header + transport */}
            <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-8 lg:pt-6">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1DB954]">Now playing</p>
                <h2 className="mt-1 truncate text-2xl font-bold tracking-tight">{current.title}</h2>
                <p className="mt-1 truncate text-sm text-white/55">{madeWith(current)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2 pt-1">
                <button type="button" onClick={() => step(-1)} aria-label="Previous" className="grid size-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  <IconPrev className="size-5" />
                </button>
                <button type="button" onClick={togglePlay} aria-label="Pause" className="grid size-11 place-items-center rounded-full text-black shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ background: ACCENT }}>
                  <IconPause className="size-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next" className="grid size-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  <IconNext className="size-5" />
                </button>
              </div>
            </div>

            {/* live, fully-playable demo */}
            <div className="px-5">
              <div className="relative h-[56svh] overflow-hidden rounded-xl border border-white/10 bg-white lg:h-[64vh]">
                <iframe
                  key={current.slug}
                  src={current.live}
                  title={`${current.title} — live demo`}
                  loading="lazy"
                  style={{ height: `calc(100% + ${current.offset}px)`, marginTop: -current.offset }}
                  className="block w-full"
                />
              </div>
            </div>

            {/* description */}
            <div className="px-6 pb-10 pt-5">
              <p className="max-w-prose text-[13px] leading-relaxed text-white/60">{current.blurb}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {current.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/55">{t}</span>
                ))}
                <a href={current.live} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/70 transition-colors hover:border-[#1DB954] hover:text-[#1DB954]">
                  Open live ↗
                </a>
                {current.download && (
                  <a href={current.download} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold text-black transition-transform hover:scale-[1.03]" style={{ background: ACCENT }}>
                    ↓ macOS app
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[60svh] flex-col items-center justify-center gap-6 px-6 py-16 text-center lg:min-h-full">
            <Vinyl spinning={false} size={200} />
            <div>
              <p className="text-lg font-semibold text-white">Paused</p>
              <p className="mt-1 text-sm text-white/50">Pick any track on the left to play it here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
