"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
  useEffect,
  useLayoutEffect,
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
const vibeCodingProjects = codedWork.filter((project) =>
  ["photo-transfer", "masii-sign", "journey-globe", "toast-sonner"].includes(
    project.slug,
  ),
);
const littleRubbishProjects = codedWork.filter((project) =>
  ["bubble-todo", "feedback-popover"].includes(project.slug),
);
const bubbleEmbedSrcDoc = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base href="https://lingkan-wang.github.io/bubble-todo/" />
    <link rel="stylesheet" href="style.css" />
    <style>html, body { touch-action: none; }</style>
  </head>
  <body class="mode-peek">
    <div id="stage">
      <div id="fly-layer"></div>
      <div id="parked-layer"></div>
      <div id="hint">Type a to-do · double-click to blow · click to pop ✓</div>
      <div id="girl-wrap">
        <img id="girl" src="assets/girl.png" draggable="false" alt="" />
        <div id="attached-bubble" class="bubble">
          <div class="bubble-img"></div>
          <div class="bubble-text" contenteditable="false" spellcheck="false"></div>
        </div>
      </div>
      <img id="peek" src="assets/peek.png" draggable="false" alt="" />
      <div id="peek-hint">click me 👇</div>
    </div>
    <script>
      (() => {
        const channel = "little-rubbish-drag";
        let press = null;
        let suppressClick = false;
        const send = (phase, event) => {
          parent.postMessage({
            channel,
            slug: "bubble-todo",
            phase,
            pointerId: event.pointerId,
            clientX: event.clientX,
            clientY: event.clientY,
            pointerType: event.pointerType,
            button: event.button
          }, "*");
        };

        document.addEventListener("pointerdown", (event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          press = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            moved: false
          };
          try { event.target.setPointerCapture?.(event.pointerId); } catch {}
          send("down", event);
        }, true);

        document.addEventListener("pointermove", (event) => {
          if (!press || press.pointerId !== event.pointerId) return;
          if (Math.hypot(event.clientX - press.startX, event.clientY - press.startY) > 3) {
            press.moved = true;
          }
          send("move", event);
          if (!press.moved) return;
          event.preventDefault();
          event.stopImmediatePropagation();
        }, { capture: true, passive: false });

        const finish = (event) => {
          if (!press || press.pointerId !== event.pointerId) return;
          suppressClick = press.moved;
          send("up", event);
          press = null;
          if (suppressClick) setTimeout(() => { suppressClick = false; }, 0);
        };
        document.addEventListener("pointerup", finish, true);
        document.addEventListener("pointercancel", finish, true);
        document.addEventListener("click", (event) => {
          if (!suppressClick) return;
          suppressClick = false;
          event.preventDefault();
          event.stopImmediatePropagation();
        }, true);
      })();
    </script>
    <script type="module" src="app.js"></script>
  </body>
</html>`;

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
  return <ProjectGrid projects={vibeCodingProjects} />;
}

export type LittleRubbishProjectMockup = {
  slug: string;
  title: string;
  year: number;
  cover: string;
  width: number;
  height: number;
};

type LittlePlacement = {
  x: number;
  y: number;
  width: number;
  rotation: number;
  z: number;
};

type LittleLayout = {
  desktop: { x: number; y: number; width: number };
  mobile: { x: number; y: number; width: number };
  previewHeight?: number;
  rotation: number;
  z: number;
};

const littleLayouts: Record<string, LittleLayout> = {
  "bubble-todo": {
    desktop: { x: 0.02, y: 110, width: 250 },
    mobile: { x: 0.03, y: 104, width: 224 },
    previewHeight: 430,
    rotation: -2,
    z: 1,
  },
  "feedback-popover": {
    desktop: { x: 0.43, y: 84, width: 310 },
    mobile: { x: 0.92, y: 200, width: 280 },
    previewHeight: 250,
    rotation: -0.8,
    z: 2,
  },
  "music-player": {
    desktop: { x: 0.03, y: 684, width: 260 },
    mobile: { x: 0.04, y: 690, width: 240 },
    previewHeight: 330,
    rotation: 1.2,
    z: 3,
  },
  "bumble-interest-cards": {
    desktop: { x: 0.98, y: 282, width: 376 },
    mobile: { x: 0.08, y: 1130, width: 300 },
    rotation: 1.1,
    z: 4,
  },
  "kwai-guild-dashboard": {
    desktop: { x: 0.68, y: 640, width: 390 },
    mobile: { x: 0.88, y: 1420, width: 304 },
    rotation: -1.3,
    z: 5,
  },
  "taimer-ai": {
    desktop: { x: 0.96, y: 900, width: 340 },
    mobile: { x: 0.1, y: 1690, width: 292 },
    rotation: 0.7,
    z: 6,
  },
};

const emptyLittlePlacements = Object.fromEntries(
  Object.entries(littleLayouts).map(([slug, layout]) => [
    slug,
    {
      x: 0,
      y: 0,
      width: layout.desktop.width,
      rotation: layout.rotation,
      z: layout.z,
    },
  ]),
) as Record<string, LittlePlacement>;

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

function LittleRubbish({
  projectMockups,
}: {
  projectMockups: LittleRubbishProjectMockup[];
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef<string | null>(null);
  const layoutModeRef = useRef<"desktop" | "mobile" | null>(null);
  const topZ = useRef(6);
  const [layoutReady, setLayoutReady] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, LittlePlacement>>(
    emptyLittlePlacements,
  );
  const placementsRef = useRef(placements);

  useEffect(() => {
    placementsRef.current = placements;
  }, [placements]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function layOutItems() {
      if (!canvas) return;
      const canvasWidth = canvas.clientWidth;
      const mode = canvasWidth < 768 ? "mobile" : "desktop";
      const shouldReset = layoutModeRef.current !== mode;
      const inset = mode === "mobile" ? 12 : 18;

      setPlacements((current) => {
        const next = Object.fromEntries(
          Object.entries(littleLayouts).map(([slug, layout]) => {
            const responsive = layout[mode];
            const width = Math.min(responsive.width, Math.max(180, canvasWidth - inset * 2));
            const maxX = Math.max(inset, canvasWidth - width - inset);
            const initialX =
              inset + responsive.x * Math.max(0, maxX - inset);
            const previous = current[slug];
            const x = shouldReset
              ? initialX
              : Math.min(maxX, Math.max(inset, previous?.x ?? initialX));
            const y = shouldReset ? responsive.y : previous?.y ?? responsive.y;

            return [
              slug,
              {
                x,
                y,
                width,
                rotation: layout.rotation,
                z: previous?.z ?? layout.z,
              },
            ];
          }),
        ) as Record<string, LittlePlacement>;

        placementsRef.current = next;
        return next;
      });

      layoutModeRef.current = mode;
      setLayoutReady(true);
    }

    layOutItems();
    const observer = new ResizeObserver(layOutItems);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  function bringToFront(slug: string) {
    topZ.current += 1;
    setPlacements((current) => ({
      ...current,
      ...(current[slug]
        ? { [slug]: { ...current[slug], z: topZ.current } }
        : {}),
    }));
  }

  function startDragAt(
    slug: string,
    item: HTMLElement,
    pointerId: number,
    clientX: number,
    clientY: number,
  ) {
    const placement = placementsRef.current[slug];
    if (!item || !placement) return;

    bringToFront(slug);
    setDragging(slug);

    dragRef.current = {
      slug,
      pointerId,
      startX: clientX,
      startY: clientY,
      originX: placement.x,
      originY: placement.y,
      itemWidth: item.offsetWidth,
      itemHeight: item.offsetHeight,
      moved: false,
    };
  }

  function handleItemPointerDown(slug: string, event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const item = event.currentTarget.closest<HTMLElement>("[data-little-item]");
    if (!item) return;
    startDragAt(slug, item, event.pointerId, event.clientX, event.clientY);
  }

  function suppressClickAfterDrag(slug: string, event: ReactMouseEvent<HTMLElement>) {
    if (suppressClickRef.current !== slug) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = null;
  }

  function moveDrag(pointerId: number, clientX: number, clientY: number) {
    const drag = dragRef.current;
    const canvas = canvasRef.current;
    if (!drag || drag.pointerId !== pointerId || !canvas) return false;

    if (Math.hypot(clientX - drag.startX, clientY - drag.startY) > 6) {
      drag.moved = true;
    }
    if (!drag.moved) return false;

    const maxX = Math.max(0, canvas.clientWidth - drag.itemWidth);
    const maxY = Math.max(0, canvas.clientHeight - drag.itemHeight);
    const x = Math.min(maxX, Math.max(0, drag.originX + clientX - drag.startX));
    const y = Math.min(maxY, Math.max(0, drag.originY + clientY - drag.startY));

    setPlacements((current) => ({
      ...current,
      [drag.slug]: { ...current[drag.slug], x, y },
    }));
    return drag.moved;
  }

  function endDrag(pointerId: number) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== pointerId) return false;
    if (drag.moved) {
      suppressClickRef.current = drag.slug;
      window.setTimeout(() => {
        if (suppressClickRef.current === drag.slug) suppressClickRef.current = null;
      }, 0);
    }
    const moved = drag.moved;
    dragRef.current = null;
    setDragging(null);
    return moved;
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
      if (!moveDrag(event.pointerId, event.clientX, event.clientY)) return;
      event.preventDefault();
    }

    function end(event: globalThis.PointerEvent) {
      endDrag(event.pointerId);
    }

    function receiveFramePointer(event: MessageEvent) {
      const data = event.data as {
        channel?: string;
        slug?: string;
        phase?: "down" | "move" | "up";
        pointerId?: number;
        clientX?: number;
        clientY?: number;
        pointerType?: string;
        button?: number;
      };
      if (
        data.channel !== "little-rubbish-drag" ||
        data.slug !== "bubble-todo" ||
        typeof data.pointerId !== "number" ||
        typeof data.clientX !== "number" ||
        typeof data.clientY !== "number"
      ) {
        return;
      }

      const frame = canvasRef.current?.querySelector<HTMLIFrameElement>(
        'iframe[data-drag-bridge="bubble-todo"]',
      );
      const item = frame?.closest<HTMLElement>("[data-little-item]");
      if (!frame || !item || event.source !== frame.contentWindow) return;

      const frameRect = frame.getBoundingClientRect();
      const clientX = frameRect.left + data.clientX;
      const clientY = frameRect.top + data.clientY;

      if (data.phase === "down") {
        if (data.pointerType === "mouse" && data.button !== 0) return;
        startDragAt(data.slug, item, data.pointerId, clientX, clientY);
      } else if (data.phase === "move") {
        moveDrag(data.pointerId, clientX, clientY);
      } else if (data.phase === "up") {
        endDrag(data.pointerId);
      }
    }

    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    window.addEventListener("message", receiveFramePointer);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      window.removeEventListener("message", receiveFramePointer);
    };
    // The listeners intentionally stay mounted; drag state and positions live in refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function itemStyle(slug: string): CSSProperties {
    const placement = placements[slug] ?? emptyLittlePlacements[slug];
    return {
      "--little-x": `${placement.x}px`,
      "--little-y": `${placement.y}px`,
      "--little-width": `${placement.width}px`,
      "--little-rotation": `${placement.rotation}deg`,
      "--little-z": placement.z,
    } as CSSProperties;
  }

  function dragHandle(slug: string, title: string) {
    return (
      <button
        type="button"
        aria-label={`Move ${title}`}
        title="Drag to move · Arrow keys also work"
        className="little-rubbish-handle shrink-0 rounded-sm text-muted outline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        onFocus={() => bringToFront(slug)}
        onKeyDown={(event) => moveWithKeyboard(slug, event)}
      >
        <PiDotsSixVertical aria-hidden="true" className="h-5 w-5" />
      </button>
    );
  }

  return (
    <Reveal>
      <div
        ref={canvasRef}
        data-layout-ready={layoutReady ? "true" : "false"}
        className="little-rubbish-canvas"
      >
        <div className="little-rubbish-intro">
          <span>Little Rubbish</span>
          <span>Drag anything · tap to interact</span>
        </div>

        {littleRubbishProjects.map((project) => {
          const previewHeight = littleLayouts[project.slug].previewHeight ?? 300;

          return (
            <article
              key={project.slug}
              data-little-item
              data-project={project.slug}
              data-dragging={dragging === project.slug ? "true" : "false"}
              className="little-rubbish-item"
              style={itemStyle(project.slug)}
              onPointerDown={(event) => handleItemPointerDown(project.slug, event)}
              onClickCapture={(event) => suppressClickAfterDrag(project.slug, event)}
            >
              <div className="little-rubbish-preview">
                {project.slug === "feedback-popover" ? (
                  <div className="little-feedback-stage">
                    <FloatingFeedback />
                  </div>
                ) : (
                  <iframe
                    src={project.slug === "bubble-todo" ? undefined : project.live}
                    srcDoc={project.slug === "bubble-todo" ? bubbleEmbedSrcDoc : undefined}
                    title={`${project.title} — live demo`}
                    loading="lazy"
                    style={{
                      height: previewHeight + project.offset,
                    }}
                    data-drag-bridge={project.slug}
                    className="block w-full"
                  />
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
                {dragHandle(project.slug, project.title)}
              </div>
            </article>
          );
        })}

        <article
          data-little-item
          data-project="music-player"
          data-dragging={dragging === "music-player" ? "true" : "false"}
          className="little-rubbish-item"
          style={itemStyle("music-player")}
          onPointerDown={(event) => handleItemPointerDown("music-player", event)}
          onClickCapture={(event) => suppressClickAfterDrag("music-player", event)}
        >
          <div
            className="little-rubbish-preview"
            style={{ height: littleLayouts["music-player"].previewHeight }}
          >
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
            {dragHandle("music-player", "Music Player — a tiny listening machine")}
          </div>
        </article>

        {projectMockups.map((project) => (
          <article
            key={project.slug}
            data-little-item
            data-project={project.slug}
            data-dragging={dragging === project.slug ? "true" : "false"}
            className="little-rubbish-item"
            style={itemStyle(project.slug)}
            onPointerDown={(event) => handleItemPointerDown(project.slug, event)}
            onClickCapture={(event) => suppressClickAfterDrag(project.slug, event)}
          >
            <Link
              href={`/work/${project.slug}`}
              aria-label={`Open ${project.title}`}
              className="little-rubbish-mockup group block outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              onDragStart={(event) => event.preventDefault()}
            >
              <Image
                src={project.cover}
                alt={project.title}
                width={project.width}
                height={project.height}
                sizes="(max-width: 767px) 82vw, 390px"
                draggable={false}
                className="little-rubbish-mockup-image h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </Link>

            <div className="little-rubbish-caption mt-3 flex cursor-grab touch-none items-start justify-between gap-4 rounded-md outline-none active:cursor-grabbing">
              <div className="min-w-0">
                <h2 className="text-[13px] font-medium leading-snug tracking-tight">
                  {project.title}
                </h2>
                <span className="mt-0.5 block font-mono text-[11px] text-muted">
                  {project.year}
                </span>
              </div>
              {dragHandle(project.slug, project.title)}
            </div>
          </article>
        ))}
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

export function Playground({
  initialCategory = "vibe-coding",
  projectMockups = [],
}: {
  initialCategory?: PlaygroundCategory;
  projectMockups?: LittleRubbishProjectMockup[];
}) {
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
        {active === "little-rubbish" && (
          <LittleRubbish projectMockups={projectMockups} />
        )}
        {active === "writing" && <Writing />}
      </section>
    </div>
  );
}
