import type { Metadata } from "next";
import { codedWork } from "@/lib/coded";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Coded Work — ${site.name}` };

const FRAME_H = 420; // uniform visible height for every project frame

export default function CodedWorkPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Coded Work</h1>
        <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-muted">
          Interactive components I design and build — live and playable right here. Have a click.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        {codedWork.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.05}>
            <article>
              {/* live, fully-playable demo — all interaction happens inside the frame.
                  Uniform height; `offset` crops the demo's own heading off the top. */}
              <div className="overflow-hidden rounded-xl border border-border bg-[#fafafa]" style={{ height: FRAME_H }}>
                <iframe
                  src={p.live}
                  title={`${p.title} — live demo`}
                  loading="lazy"
                  style={{ height: FRAME_H + p.offset, marginTop: -p.offset }}
                  className="block w-full"
                />
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-medium tracking-tight">{p.title}</h2>
                <span className="shrink-0 font-mono text-xs text-muted">{p.year}</span>
              </div>

              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-2 max-w-prose text-[13px] leading-snug text-muted">{p.blurb}</p>

              {p.download && (
                <a
                  href={p.download}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  ↓ Download desktop app (macOS)
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
