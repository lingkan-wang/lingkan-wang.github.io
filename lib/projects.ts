import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "content/work");

export type Project = {
  slug: string;
  title: string;
  year: number;
  role: string;
  company?: string;
  tags: string[];
  summary: string;
  cover?: string;
  thumbnail?: string;
  order: number;
  featured: boolean;
  confidential: boolean;
  duration?: string;
  skills?: string[];
  tools?: string[];
  context?: string;
};

export type LoadedProject = { meta: Project; content: string };

function readProjectFile(slug: string): LoadedProject {
  const full = path.join(WORK_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(full, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Partial<Project>;
  delete data.slug;
  return { meta: { slug, ...data } as Project, content: parsed.content };
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => readProjectFile(slug).meta)
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): LoadedProject {
  const resolved = path.join(WORK_DIR, `${slug}.mdx`);
  if (!resolved.startsWith(WORK_DIR + path.sep)) {
    throw new Error(`Invalid slug: ${slug}`);
  }
  return readProjectFile(slug);
}

export function getAdjacent(slug: string): { prev: Project | null; next: Project | null } {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
}
