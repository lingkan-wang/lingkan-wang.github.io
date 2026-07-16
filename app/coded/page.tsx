import type { Metadata } from "next";
import { codedWork } from "@/lib/coded";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Coded Work — ${site.name}` };

export default function CodedWorkPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">Coded Work</p>
        <h1 className="mt-3 text-pretty text-3xl font-normal leading-[1.1] tracking-tight sm:text-4xl">
          Things I design and build.
        </h1>
        <p className="mt-5 text-base leading-7 text-muted">
          Small interaction studies and tools, each shown as a live, fully playable demo embedded from
          its GitHub Pages build. Every one runs right here in the frame, or open it full screen.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2">
        {codedWork.map((p) => (
          <article
            key={p.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-colors hover:border-fg/25"
          >
            {/* live, fully-playable demo (offset crops the embed's own top heading) */}
            <div className="relative h-[300px] overflow-hidden border-b border-border bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <iframe
                src={p.live}
                title={`${p.title} — live demo`}
                loading="lazy"
                style={{ height: `calc(100% + ${p.offset}px)`, marginTop: -p.offset }}
                className="block w-full"
              />
            </div>

            {/* meta */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[15px] font-semibold tracking-tight text-fg">{p.title}</h2>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">{p.year}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                  >
                    {t}
                  </span>
                ))}
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[12px] font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  Open live ↗
                </a>
                {p.download && (
                  <a
                    href={p.download}
                    className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    ↓ macOS app
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
