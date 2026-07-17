"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  PiChatCircleDots,
  PiCheckCircle,
  PiDotsSixVertical,
  PiHeart,
  PiPaperPlaneTilt,
  PiSmiley,
  PiSmileySad,
} from "react-icons/pi";
import { MusicCard } from "@/components/about/music-card";
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

type LittlePlacement = {
  x: number;
  y: number;
  width: number;
  previewHeight: number;
  rotation: number;
  z: number;
};

const initialLittlePlacements: Record<string, LittlePlacement> = {
  "bubble-todo": {
    x: 18,
    y: 22,
    width: 278,
    previewHeight: 460,
    rotation: -2,
    z: 1,
  },
  "toast-sonner": {
    x: 656,
    y: 18,
    width: 390,
    previewHeight: 430,
    rotation: 1.8,
    z: 2,
  },
  "feedback-popover": {
    x: 360,
    y: 720,
    width: 336,
    previewHeight: 360,
    rotation: -0.8,
    z: 3,
  },
  "music-player": {
    x: 786,
    y: 720,
    width: 260,
    previewHeight: 330,
    rotation: 1.2,
    z: 4,
  },
};

type DragState = {
  slug: string;
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  itemWidth: number;
  itemHeight: number;
  moved: boolean;
};

function FloatingFeedback() {
  const [state, setState] = useState<"closed" | "open" | "sent">("closed");
  const [rating, setRating] = useState<"bad" | "okay" | "love" | null>(null);

  if (state === "closed") {
    return (
      <button
        type="button"
        className="little-feedback-trigger"
        onClick={() => setState("open")}
      >
        <PiChatCircleDots aria-hidden="true" className="h-5 w-5" />
        <span>Feedback</span>
      </button>
    );
  }

  if (state === "sent") {
    return (
      <button
        type="button"
        className="little-feedback-success"
        onClick={() => {
          setRating(null);
          setState("closed");
        }}
      >
        <PiCheckCircle aria-hidden="true" className="h-5 w-5" />
        <span>Thank you</span>
      </button>
    );
  }

  const ratings = [
    { id: "bad" as const, label: "Bad", Icon: PiSmileySad },
    { id: "okay" as const, label: "Okay", Icon: PiSmiley },
    { id: "love" as const, label: "Love it", Icon: PiHeart },
  ];

  return (
    <div className="little-feedback-popover">
      <div>
        <p className="text-[13px] font-medium">How was your experience?</p>
        <p className="mt-0.5 text-[11px] text-muted">Pick one, then send it my way.</p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2" aria-label="Feedback rating">
        {ratings.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={rating === id}
            className="little-feedback-rating"
            onClick={() => setRating(id)}
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={!rating}
        className="little-feedback-send"
        onClick={() => setState("sent")}
      >
        <PiPaperPlaneTilt aria-hidden="true" className="h-4 w-4" />
        <span>Send feedback</span>
      </button>
    </div>
  );
}

function LittleRubbish() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef<string | null>(null);
  const topZ = useRef(4);
  const [dragging, setDragging] = useState<string | null>(null);
  const [interacting, setInteracting] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, LittlePlacement>>(
    initialLittlePlacements,
  );

  function bringToFront(slug: string) {
    topZ.current += 1;
    setPlacements((current) => ({
      ...current,
      [slug]: { ...current[slug], z: topZ.current },
    }));
  }

  function startDrag(slug: string, event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const item = event.currentTarget.closest<HTMLElement>("[data-little-item]");
    const placement = placements[slug];
    if (!item || !placement) return;

    bringToFront(slug);
    setDragging(slug);

    dragRef.current = {
      slug,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: placement.x,
      originY: placement.y,
      itemWidth: item.offsetWidth,
      itemHeight: item.offsetHeight,
      moved: false,
    };
  }

  function handleItemPointerDown(slug: string, event: PointerEvent<HTMLElement>) {
    const target = event.target as Element;
    if (target.closest("[data-interact-toggle]")) return;
    if (!window.matchMedia("(min-width: 768px)").matches) {
      bringToFront(slug);
      return;
    }

    const fromCaption = Boolean(target.closest(".little-rubbish-caption"));
    if (interacting === slug && !fromCaption) {
      bringToFront(slug);
      return;
    }

    startDrag(slug, event);
  }

  function toggleInteraction(slug: string) {
    bringToFront(slug);
    setInteracting((current) => (current === slug ? null : slug));
  }

  function suppressClickAfterDrag(slug: string, event: ReactMouseEvent<HTMLElement>) {
    if (suppressClickRef.current !== slug) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = null;
  }

  function moveWithKeyboard(slug: string, event: KeyboardEvent<HTMLButtonElement>) {
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    const direction = directions[event.key];
    const canvas = canvasRef.current;
    const placement = placements[slug];
    if (!direction || !canvas || !placement) return;

    event.preventDefault();
    const step = event.shiftKey ? 30 : 10;
    const item = event.currentTarget.closest<HTMLElement>("[data-little-item]");
    const maxX = Math.max(0, canvas.clientWidth - (item?.offsetWidth ?? placement.width));
    const maxY = Math.max(0, canvas.clientHeight - (item?.offsetHeight ?? 0));

    bringToFront(slug);
    setPlacements((current) => ({
      ...current,
      [slug]: {
        ...current[slug],
        x: Math.min(maxX, Math.max(0, current[slug].x + direction[0] * step)),
        y: Math.min(maxY, Math.max(0, current[slug].y + direction[1] * step)),
      },
    }));
  }

  useEffect(() => {
    function move(event: globalThis.PointerEvent) {
      const drag = dragRef.current;
      const canvas = canvasRef.current;
      if (!drag || drag.pointerId !== event.pointerId || !canvas) return;

      event.preventDefault();
      if (
        Math.abs(event.clientX - drag.startX) > 3 ||
        Math.abs(event.clientY - drag.startY) > 3
      ) {
        drag.moved = true;
      }
      const maxX = Math.max(0, canvas.clientWidth - drag.itemWidth);
      const maxY = Math.max(0, canvas.clientHeight - drag.itemHeight);
      const x = Math.min(maxX, Math.max(0, drag.originX + event.clientX - drag.startX));
      const y = Math.min(maxY, Math.max(0, drag.originY + event.clientY - drag.startY));

      setPlacements((current) => ({
        ...current,
        [drag.slug]: { ...current[drag.slug], x, y },
      }));
    }

    function end(event: globalThis.PointerEvent) {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (drag.moved) {
        suppressClickRef.current = drag.slug;
        window.setTimeout(() => {
          if (suppressClickRef.current === drag.slug) suppressClickRef.current = null;
        }, 0);
      }
      dragRef.current = null;
      setDragging(null);
    }

    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, []);

  return (
    <Reveal>
      <div
        ref={canvasRef}
        className="little-rubbish-canvas relative space-y-12 overflow-visible md:min-h-[1200px] md:space-y-0"
      >
        <p className="mb-8 text-center text-[13px] text-muted md:absolute md:left-1/2 md:top-[320px] md:mb-0 md:-translate-x-1/2 md:text-[14px]">
          Tiny experiments. Move anything.
        </p>

        {codedWork.slice(3).map((project) => {
          const placement = placements[project.slug] ?? initialLittlePlacements[project.slug];
          const itemStyle = {
            "--little-x": `${placement.x}px`,
            "--little-y": `${placement.y}px`,
            "--little-width": `${placement.width}px`,
            "--little-preview-height": `${placement.previewHeight}px`,
            "--little-rotation": `${placement.rotation}deg`,
            "--little-z": placement.z,
          } as CSSProperties;

          return (
            <article
              key={project.slug}
              data-little-item
              data-project={project.slug}
              data-dragging={dragging === project.slug ? "true" : "false"}
              data-interacting={interacting === project.slug ? "true" : "false"}
              className="little-rubbish-item"
              style={itemStyle}
              onPointerDown={(event) => handleItemPointerDown(project.slug, event)}
              onClickCapture={(event) => suppressClickAfterDrag(project.slug, event)}
            >
              <div className="little-rubbish-preview">
                {project.slug === "feedback-popover" ? (
                  <div className="little-feedback-stage">
                    <FloatingFeedback />
                  </div>
                ) : (
                  <>
                    <iframe
                      src={project.live}
                      title={`${project.title} — live demo`}
                      loading="lazy"
                      style={{
                        height: placement.previewHeight + project.offset,
                      }}
                      className="block w-full"
                    />
                    <div className="little-rubbish-drag-surface" aria-hidden="true" />
                    <button
                      type="button"
                      data-interact-toggle
                      aria-pressed={interacting === project.slug}
                      aria-label={
                        interacting === project.slug
                          ? `Switch ${project.title} to move mode`
                          : `Interact with ${project.title}`
                      }
                      className="little-rubbish-interact-toggle"
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={() => toggleInteraction(project.slug)}
                    >
                      {interacting === project.slug ? "Move" : "Interact"}
                    </button>
                  </>
                )}
              </div>

              <div
                className="little-rubbish-caption mt-3 flex cursor-grab touch-none items-start justify-between gap-4 rounded-md outline-none active:cursor-grabbing"
              >
                <div className="min-w-0">
                  <h2 className="text-[13px] font-medium leading-snug tracking-tight">
                    {project.title}
                  </h2>
                  <span className="mt-0.5 block font-mono text-[11px] text-muted">
                    {project.year}
                  </span>
                </div>

                <button
                  type="button"
                  aria-label={`Move ${project.title}`}
                  title="Drag to move · Arrow keys also work"
                  className="little-rubbish-handle shrink-0 rounded-sm text-muted outline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
                  onFocus={() => bringToFront(project.slug)}
                  onKeyDown={(event) => moveWithKeyboard(project.slug, event)}
                >
                  <PiDotsSixVertical aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </article>
          );
        })}

        <article
          data-little-item
          data-project="music-player"
          data-dragging={dragging === "music-player" ? "true" : "false"}
          data-interacting={interacting === "music-player" ? "true" : "false"}
          className="little-rubbish-item"
          style={
            {
              "--little-x": `${placements["music-player"].x}px`,
              "--little-y": `${placements["music-player"].y}px`,
              "--little-width": `${placements["music-player"].width}px`,
              "--little-preview-height": `${placements["music-player"].previewHeight}px`,
              "--little-rotation": `${placements["music-player"].rotation}deg`,
              "--little-z": placements["music-player"].z,
            } as CSSProperties
          }
          onPointerDown={(event) => handleItemPointerDown("music-player", event)}
          onClickCapture={(event) => suppressClickAfterDrag("music-player", event)}
        >
          <div className="little-rubbish-preview">
            <MusicCard />
          </div>

          <div
            className="little-rubbish-caption mt-3 flex cursor-grab touch-none items-start justify-between gap-4 rounded-md outline-none active:cursor-grabbing"
          >
            <div className="min-w-0">
              <h2 className="text-[13px] font-medium leading-snug tracking-tight">
                Music Player — a tiny listening machine
              </h2>
              <span className="mt-0.5 block font-mono text-[11px] text-muted">2026</span>
            </div>

            <button
              type="button"
              aria-label="Move Music Player — a tiny listening machine"
              title="Drag to move · Arrow keys also work"
              className="little-rubbish-handle shrink-0 rounded-sm text-muted outline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
              onFocus={() => bringToFront("music-player")}
              onKeyDown={(event) => moveWithKeyboard("music-player", event)}
            >
              <PiDotsSixVertical aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </article>
      </div>
    </Reveal>
  );
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
        className={active === "little-rubbish" ? "mt-8" : "mt-12"}
      >
        {active === "vibe-coding" && <VibeCoding />}
        {active === "little-rubbish" && <LittleRubbish />}
        {active === "writing" && <Writing />}
      </section>
    </div>
  );
}
