"use client";

import { useEffect, useState } from "react";
import { codedWork } from "@/lib/coded";
import { research } from "@/lib/research";
import { ResearchCard } from "@/components/research-card";
import { Reveal } from "@/components/reveal";

const FRAME_H = 420;

export type PlaygroundCategory = "vibe-coding" | "little-rubbish" | "writing";

const categories: Array<{
  id: PlaygroundCategory;
  label: string;
}> = [
  {
    id: "vibe-coding",
    label: "Vibe Coding",
  },
  {
    id: "little-rubbish",
    label: "Little Rubbish",
  },
  {
    id: "writing",
    label: "Writing",
  },
];

function categoryFromHash(): PlaygroundCategory | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  return categories.some((category) => category.id === hash)
    ? (hash as PlaygroundCategory)
    : null;
}

function ProjectGrid({ projects }: { projects: typeof codedWork }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={(index % 2) * 0.05}>
          <article>
            <div
              className="overflow-hidden rounded-xl border border-border bg-[#fafafa]"
              style={{ height: FRAME_H }}
            >
              <iframe
                src={project.live}
                title={`${project.title} — live demo`}
                loading="lazy"
                style={{ height: FRAME_H + project.offset, marginTop: -project.offset }}
                className="block w-full"
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-medium tracking-tight">{project.title}</h2>
              <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
            </div>

            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-2 max-w-prose text-[13px] leading-snug text-muted">
              {project.blurb}
            </p>

            {project.download && (
              <a
                href={project.download}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[12px] font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                ↓ Download desktop app (macOS)
              </a>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function VibeCoding() {
  return <ProjectGrid projects={codedWork.slice(0, 3)} />;
}

function LittleRubbish() {
  return <ProjectGrid projects={codedWork.slice(3)} />;
}

function Writing() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
      {research.map((paper, index) => (
        <Reveal key={paper.title} delay={(index % 2) * 0.05}>
          <ResearchCard p={paper} />
        </Reveal>
      ))}
    </div>
  );
}

export function Playground({ initialCategory = "vibe-coding" }: { initialCategory?: PlaygroundCategory }) {
  const [active, setActive] = useState<PlaygroundCategory>(initialCategory);

  useEffect(() => {
    const syncHash = () => {
      const next = categoryFromHash();
      if (next) setActive(next);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  function selectCategory(category: PlaygroundCategory) {
    setActive(category);
    window.history.replaceState(null, "", `#${category}`);
  }

  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Playground</h1>
        <p className="mt-4 text-[15px] leading-7 text-muted">
          A cabinet of things I code, collect, and write — from playable prototypes to small scraps and research.
        </p>
      </Reveal>

      <Reveal delay={0.03} className="mt-10">
        <div
          role="tablist"
          aria-label="Playground categories"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((category) => {
            const selected = category.id === active;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={selected}
                aria-controls={`panel-${category.id}`}
                onClick={() => selectCategory(category.id)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] transition-[background-color,border-color,color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-[11px] ${
                  selected
                    ? "border-[var(--color-fg)] bg-fg text-bg"
                    : "border-border bg-transparent text-muted hover:border-fg/50 hover:text-fg"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <section
        key={active}
        id={`panel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="mt-12"
      >
        {active === "vibe-coding" && <VibeCoding />}
        {active === "little-rubbish" && <LittleRubbish />}
        {active === "writing" && <Writing />}
      </section>
    </div>
  );
}
