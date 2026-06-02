import type { Metadata } from "next";
import { codedWork } from "@/lib/coded";
import { ProjectList, type ListItem } from "@/components/project-list";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Coded Work — ${site.name}` };

export default function CodedWorkPage() {
  const items: ListItem[] = codedWork.map((c) => ({
    title: c.title,
    tags: c.tags,
    outcome: c.outcome,
    year: c.year,
    href: c.href,
  }));

  return (
    <div className="mx-auto max-w-[760px] px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Coded Work</h1>
        <p className="mt-4 max-w-prose text-[15px] leading-7 text-muted">
          Small things I vibe-code — components, interactions, and UI experiments I design and build.
          [Replace with your own intro.]
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-12">
        <ProjectList items={items} />
      </Reveal>
    </div>
  );
}
