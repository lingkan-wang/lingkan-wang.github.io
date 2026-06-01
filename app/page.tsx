import { getAllProjects } from "@/lib/projects";
import { ProjectIndex, type IndexItem } from "@/components/project-index";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export default function Home() {
  const projects = getAllProjects();
  const items: IndexItem[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    company: p.company,
    year: p.year,
    tags: p.tags,
    thumbnail: p.thumbnail || undefined,
  }));

  return (
    <div className="mx-auto max-w-[680px] px-6 pb-32 pt-24 sm:pt-32">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
        <p className="mt-4 text-[15px] leading-7 text-muted">{site.intro}</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
          Previously @ {site.previously.join(" · ")}
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-16">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">Selected work</h2>
        <ProjectIndex projects={items} />
      </Reveal>
    </div>
  );
}
