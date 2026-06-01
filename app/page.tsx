import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { codedWork } from "@/lib/coded";
import { GridHero } from "@/components/grid-hero";
import { ProjectList, type ListItem } from "@/components/project-list";
import { Reveal } from "@/components/reveal";

function SectionHead({ label, href, cta }: { label: string; href: string; cta: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{label}</h2>
      <Link href={href} className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-fg">
        {cta} →
      </Link>
    </div>
  );
}

export default function Home() {
  const codedItems: ListItem[] = codedWork.map((c) => ({
    title: c.title,
    tags: c.tags,
    outcome: c.outcome,
    year: c.year,
    href: c.href,
  }));

  const researchItems: ListItem[] = getAllProjects().map((p) => ({
    title: p.title,
    tags: p.tags,
    outcome: p.summary,
    year: p.year,
    href: `/work/${p.slug}`,
  }));

  return (
    <>
      <GridHero />

      <div className="mx-auto max-w-[760px] px-6 pb-28">
        <Reveal className="mt-6">
          <SectionHead label="Coded Work" href="/coded" cta="See all coded work" />
          <ProjectList items={codedItems} />
        </Reveal>

        <Reveal className="mt-20">
          <SectionHead label="Research Projects" href="/research" cta="See all research" />
          <ProjectList items={researchItems} />
        </Reveal>
      </div>
    </>
  );
}
