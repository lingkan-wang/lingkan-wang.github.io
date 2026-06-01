import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Placeholder } from "@/components/placeholder";
import { CommandMenuButton } from "@/components/command-palette";

export const metadata: Metadata = { title: `Playground — ${site.name}` };

const experiments = [
  "Experiment 01",
  "Experiment 02",
  "Experiment 03",
  "Experiment 04",
];

export default function Playground() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-32 pt-24 sm:pt-32">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Playground</h1>
        <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-muted">
          Side explorations, motion studies, and things I make for fun. [Replace with real content.]
        </p>
      </Reveal>

      <Reveal delay={0.03} className="mt-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          ⌘K command menu — built with cmdk
        </p>
        <CommandMenuButton />
      </Reveal>

      <Reveal delay={0.05} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((label) => (
          <div key={label}>
            <Placeholder label={label} />
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">{label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
