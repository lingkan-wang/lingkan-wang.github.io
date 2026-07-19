import type { Metadata } from "next";
import { Playground } from "@/components/playground";
import { littleRubbishWorkSlugs } from "@/lib/home";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Playground — ${site.name}`,
  description: "Playable prototypes, small experiments, and writing by Lingkan Wang.",
};

export default function PlaygroundPage() {
  const littleRubbishSlugs = new Set<string>(littleRubbishWorkSlugs);
  const littleRubbishMockups: Record<
    string,
    { src: string; width: number; height: number }
  > = {
    "bumble-interest-cards": {
      src: "/work/covers/bumble-cutout.png",
      width: 1259,
      height: 750,
    },
    "kwai-guild-dashboard": {
      src: "/work/covers/kwai-cutout.png",
      width: 993,
      height: 796,
    },
    "taimer-ai": {
      src: "/work/covers/taimer-cutout.png",
      width: 993,
      height: 796,
    },
  };
  const projectMockups = getAllProjects()
    .filter((project) => littleRubbishSlugs.has(project.slug))
    .map(({ slug, title, year, cover }) => ({
      slug,
      title,
      year,
      cover: littleRubbishMockups[slug]?.src ?? cover ?? "",
      width: littleRubbishMockups[slug]?.width ?? 1400,
      height: littleRubbishMockups[slug]?.height ?? 952,
    }));

  return <Playground projectMockups={projectMockups} />;
}
