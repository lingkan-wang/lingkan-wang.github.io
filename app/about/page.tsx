import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { intro, bio, experience } from "@/lib/about";
import { PhotoGallery } from "@/components/about/photo-gallery";
import { DraggableCanvas } from "@/components/about/draggable-canvas";

export const metadata: Metadata = { title: `About — ${site.name}` };

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

      {/* bio + draggable canvas */}
      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,660px)]">
        <Reveal className="space-y-8">
          {bio.map((b) => (
            <section key={b.heading}>
              <h2 className={label}>{b.heading}</h2>
              <p className="mt-2 text-[15px] leading-7 text-fg/90">{b.body}</p>
            </section>
          ))}
        </Reveal>

        <Reveal delay={0.05}>
          <DraggableCanvas />
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
