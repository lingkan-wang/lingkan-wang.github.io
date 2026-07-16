import { getAllProjects } from "@/lib/projects";
import { CubeHero } from "@/components/cube-hero";
import { ProjectCard, type CardItem } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

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
        <Reveal className="mt-4">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">Selected work</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.05} margin="0px 0px 300px 0px">
              <ProjectCard item={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
