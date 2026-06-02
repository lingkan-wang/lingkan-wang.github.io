import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { intro, bio, experience, languages, now, location, spotify } from "@/lib/about";
import { PhotoGallery } from "@/components/about/photo-gallery";
import { IMessage } from "@/components/about/imessage";
import { WechatCard } from "@/components/about/wechat-card";

export const metadata: Metadata = { title: `About — ${site.name}` };

const card = "rounded-2xl border border-border p-4";
const label = "font-mono text-[10px] uppercase tracking-widest text-muted";

export default function About() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-28 pt-20 sm:pt-28">
      {/* intro */}
      <Reveal>
        <div className="flex items-start gap-5">
          <div className="relative hidden size-24 shrink-0 overflow-hidden rounded-2xl border border-border sm:block">
            <Image src="/about/portrait.jpg" alt={site.name} fill sizes="96px" className="object-cover" priority />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">What I&apos;m about.</h1>
            <p className="mt-3 max-w-[560px] text-[15px] leading-7 text-muted">{intro}</p>
          </div>
        </div>
      </Reveal>

      {/* bio + bento */}
      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,400px)]">
        <Reveal className="space-y-8">
          {bio.map((b) => (
            <section key={b.heading}>
              <h2 className={label}>{b.heading}</h2>
              <p className="mt-2 text-[15px] leading-7 text-fg/90">{b.body}</p>
            </section>
          ))}
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mb-3 text-right font-mono text-[11px] uppercase tracking-widest text-muted">click around</p>
          <div className="grid grid-cols-2 gap-3">
            <div className={`${card} col-span-2`}>
              <span className={label}>Now</span>
              <p className="mt-1.5 text-sm text-fg">📍 {location}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">{now}</p>
            </div>

            <div className={card}>
              <span className={label}>Languages</span>
              <ul className="mt-2 space-y-1.5 text-sm">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-center gap-2">
                    <span aria-hidden>{l.flag}</span>
                    <span className="text-fg">{l.name}</span>
                    <span className="ml-auto text-xs text-muted">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={card}>
              <WechatCard />
            </div>

            <div className={`${card} col-span-2`}>
              <span className={label}>On repeat</span>
              {spotify.embed ? (
                <iframe
                  src={spotify.embed}
                  title="Spotify"
                  loading="lazy"
                  height={152}
                  className="mt-2 w-full rounded-lg"
                  style={{ border: 0 }}
                  allow="encrypted-media; clipboard-write"
                />
              ) : (
                <a
                  href={spotify.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-fg/30"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#1DB954] text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.43a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.8-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86zm1.23-2.74a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.56 11.23 1.33.37.23.49.71.26 1.07zm.11-2.85C14.83 8.95 9.3 8.77 6.2 9.71a.93.93 0 1 1-.54-1.79c3.56-1.08 9.66-.87 13.48 1.4a.94.94 0 0 1-.96 1.6z" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-fg">My Spotify</span>
                    <span className="block text-xs text-muted">Liked songs &amp; playlists ↗</span>
                  </span>
                </a>
              )}
            </div>

            <div className={`${card} col-span-2`}>
              <IMessage />
            </div>
          </div>
        </Reveal>
      </div>

      {/* experience */}
      <Reveal className="mt-24">
        <h2 className={label}>Experience</h2>
        <ul className="mt-6 border-t border-border">
          {experience.map((j) => (
            <li
              key={j.org}
              className="flex flex-col gap-2 border-b border-border py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="font-medium tracking-tight">{j.org}</h3>
                  <span className="text-sm text-muted">· {j.role}</span>
                </div>
                <p className="mt-1 max-w-[620px] text-[13px] leading-snug text-muted">{j.blurb}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {j.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted">{j.period}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* photos */}
      <Reveal className="mt-24">
        <h2 className={label}>When I&apos;m not designing</h2>
        <p className="mb-6 mt-2 max-w-[560px] text-[15px] leading-7 text-muted">
          Traveling everywhere, chasing whales with my Scottie, and hunting good food.
        </p>
        <div id="gallery">
          <PhotoGallery />
        </div>
      </Reveal>
    </div>
  );
}
