import type { Metadata } from "next";
import Image from "next/image";
import { research } from "@/lib/research";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Research — ${site.name}` };

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Research</h1>
        <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-muted">
          Alongside design, I do HCI and learning-sciences research — exploring how people learn, collaborate, and interact with the things we build.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        {research.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.05}>
            <article>
              {/* first-page paper preview — cropped to the top (title + abstract) */}
              <div className="overflow-hidden rounded-xl border border-border bg-[#fafafa]">
                <Image
                  src={p.cover}
                  alt={`${p.title} — first page`}
                  width={772}
                  height={1000}
                  sizes="(max-width: 760px) 100vw, 500px"
                  className="aspect-[4/3] w-full object-cover object-top"
                />
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-medium leading-snug tracking-tight">{p.title}</h2>
                <span className="shrink-0 font-mono text-xs text-muted">{p.year}</span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent">{p.venue}</span>
                <span className="text-muted/50">·</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{p.status}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-2.5 max-w-prose text-[13px] leading-snug text-muted">{p.summary}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
