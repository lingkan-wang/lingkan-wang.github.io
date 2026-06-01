import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = { title: `About — ${site.name}` };

export default function About() {
  return (
    <div className="mx-auto max-w-[680px] px-6 pb-32 pt-24 sm:pt-32">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h1>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <Placeholder label="Portrait — replace with a photo" aspect="aspect-[4/5]" className="mx-auto max-w-xs" />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 space-y-5 text-[15px] leading-7 text-fg/90">
        <p>{site.intro}</p>
        <p>
          Previously, I worked at{" "}
          {site.previously.map((p, i) => (
            <span key={p}>
              <span className="font-medium">{p}</span>
              {i < site.previously.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <p className="text-muted">[Replace this with your design philosophy and what you care about.]</p>
      </Reveal>

      <Reveal delay={0.15} className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
        <a href={`mailto:${site.email}`} className="hover:text-fg">{site.email}</a>
        {"  ·  "}
        <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a>
        {"  ·  "}
        <a href={site.links.resume} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Resume</a>
      </Reveal>
    </div>
  );
}
