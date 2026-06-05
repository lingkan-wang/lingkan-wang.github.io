import type { Metadata } from "next";
import { research } from "@/lib/research";
import { Reveal } from "@/components/reveal";
import { ResearchCard } from "@/components/research-card";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Research — ${site.name}` };

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Research</h1>
        <p className="mt-4 text-[15px] leading-7 text-muted">
          Alongside design, I do HCI and learning-sciences research — exploring how people learn, collaborate, and interact with the things we build.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        {research.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.05}>
            <ResearchCard p={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
