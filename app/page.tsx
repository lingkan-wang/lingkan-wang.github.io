import { getAllProjects } from "@/lib/projects";
import { CubeHero } from "@/components/cube-hero";
import { ProjectCard, type CardItem } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const focus = [
  "AI agents + workflows",
  "Design systems",
  "AI coding",
  "Human-in-the-loop UX",
  "Cross-platform quality",
];

export default function Home() {
  const projects: CardItem[] = getAllProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    tags: p.tags,
    outcome: p.summary,
    year: p.year,
    cover: p.cover || undefined,
  }));

  return (
    <>
      <CubeHero />

      <div className="mx-auto max-w-[1080px] px-6 pb-28">
        <Reveal className="mx-auto mb-16 max-w-[820px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Design engineering · AI workflow · product systems</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            I design AI products, then prototype the workflows that make them real.
          </h1>
          <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-7 text-fg/80">{site.intro}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {focus.map((item) => (
              <span key={item} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-4">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">Selected AI product work</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.05}>
              <ProjectCard item={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
