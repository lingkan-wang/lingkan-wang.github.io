import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectSlugs, getProject, getAdjacent, type LoadedProject } from "@/lib/projects";
import { site } from "@/lib/site";
import { mdxComponents, Prose } from "@/components/mdx";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getProject(slug);
    return { title: `${meta.title} — ${site.name}`, description: meta.summary };
  } catch {
    return {};
  }
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let loaded: LoadedProject;
  try {
    loaded = getProject(slug);
  } catch {
    notFound();
  }
  const { meta, content } = loaded;
  const { prev, next } = getAdjacent(slug);

  return (
    <article className="pb-32 pt-20 sm:pt-28">
      {/* hero */}
      <header className="mx-auto max-w-[680px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {meta.company ?? meta.role} · {meta.year}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{meta.title}</h1>
          <p className="mt-4 text-lg text-muted">{meta.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {meta.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                {t}
              </span>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm sm:grid-cols-4">
            <MetaItem label="Role" value={meta.role} />
            {meta.duration && <MetaItem label="Duration" value={meta.duration} />}
            {meta.skills && <MetaItem label="Skills" value={meta.skills.join(" · ")} />}
            {meta.tools && <MetaItem label="Tools" value={meta.tools.join(" · ")} />}
          </dl>

          {meta.context && <p className="mt-5 text-xs text-muted">{meta.context}</p>}
        </Reveal>
      </header>

      <Reveal className="mx-auto mt-12 w-[min(1080px,92vw)]">
        {meta.cover ? (
          <Image
            src={meta.cover}
            alt={meta.title}
            width={1080}
            height={675}
            className="w-full rounded-xl border border-border"
            priority
            sizes="(max-width: 1180px) 92vw, 1080px"
          />
        ) : (
          <Placeholder label={`${meta.company ?? meta.title} — cover`} blur={meta.confidential} />
        )}
      </Reveal>

      {/* body */}
      <div className="mt-16">
        <Prose>
          <MDXRemote source={content} components={mdxComponents} />
        </Prose>
      </div>

      {/* prev / next */}
      <nav aria-label="Case study navigation" className="mx-auto mt-24 flex max-w-[680px] items-center justify-between gap-4 border-t border-border px-6 pt-8 text-sm">
        <Link href="/" className="text-muted hover:text-fg">← All work</Link>
        {next ? (
          <Link href={`/work/${next.slug}`} className="text-right font-medium hover:text-accent">
            Next: {next.title} →
          </Link>
        ) : prev ? (
          <Link href={`/work/${prev.slug}`} className="text-right font-medium hover:text-accent">
            ← Previous: {prev.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-fg/90">{value}</dd>
    </div>
  );
}
