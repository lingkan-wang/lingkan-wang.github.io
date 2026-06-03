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
              {/* the paper sits on a grey mat as a single sheet — ~2/3 of the
                  frame. On hover the page scales a touch inside the sheet,
                  matching the Selected Work cards on the home page. */}
              <div className="group flex items-center justify-center rounded-xl border border-border bg-[#fafafa] px-6 py-10 sm:py-12">
                <div className="relative aspect-[773/1000] w-2/3 overflow-hidden rounded-[3px] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.04),0_6px_16px_-6px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]">
                  <Image
                    src={p.cover}
                    alt={`${p.title} — first page`}
                    fill
                    sizes="(max-width: 640px) 66vw, 340px"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                  />
                </div>
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
