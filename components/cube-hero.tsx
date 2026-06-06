"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion";
import { cubeItems } from "@/lib/home";

const SIZE = 216; // cube edge (px) — bigger so the illustrations read
const HALF = SIZE / 2;

const FACES = [
  { key: "front", t: `translateZ(${HALF}px)` },
  { key: "back", t: `rotateY(180deg) translateZ(${HALF}px)` },
  { key: "right", t: `rotateY(90deg) translateZ(${HALF}px)` },
  { key: "left", t: `rotateY(-90deg) translateZ(${HALF}px)` },
  { key: "top", t: `rotateX(90deg) translateZ(${HALF}px)` },
  { key: "bottom", t: `rotateX(-90deg) translateZ(${HALF}px)` },
] as const;

// which cells on each face are black (interactive) vs white (decorative) — checkerboard
const BLACK = [true, false, true, false, true, false, true, false, true];

const preserve = { transformStyle: "preserve-3d" } as React.CSSProperties;
const hideBack = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as React.CSSProperties;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

type Bubble = { x: number; y: number; text: string };

export function CubeHero() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(-24);
  const ry = useMotionValue(-30);
  const hovering = useRef(false);
  const dragRef = useRef<{ x: number; y: number; rx: number; ry: number; moved: boolean } | null>(null);
  const wasDrag = useRef(false);
  // angular velocity (deg/ms) for the flick-and-let-go inertia, plus the last
  // sampled rotation so we can derive it from successive pointer moves.
  const vel = useRef({ x: 0, y: 0 });
  const lastMove = useRef<{ t: number; rx: number; ry: number } | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [bubble, setBubble] = useState<Bubble | null>(null);

  // Per-frame motion. Priority: pointer is driving → do nothing; otherwise
  // spend any leftover flick velocity (decaying frame-rate-independently) and,
  // once it settles, resume the calm idle drift (unless the pointer is resting
  // on the cube).
  useAnimationFrame((_, delta) => {
    if (reduce || dragRef.current) return;

    const v = vel.current;
    if (Math.abs(v.x) + Math.abs(v.y) > 0.0008) {
      ry.set(ry.get() + v.y * delta);
      const nextX = clamp(rx.get() + v.x * delta, -85, 85);
      if (nextX === 85 || nextX === -85) v.x = 0; // don't grind against the clamp
      rx.set(nextX);
      const decay = Math.pow(0.935, delta / 16.6667); // ~0.935 per 60fps frame
      v.x *= decay;
      v.y *= decay;
      return;
    }

    if (hovering.current) return; // settled and being looked at → rest
    ry.set(ry.get() + delta * 0.015);
  });

  function onDown(e: React.PointerEvent) {
    dragRef.current = { x: e.clientX, y: e.clientY, rx: rx.get(), ry: ry.get(), moved: false };
    vel.current = { x: 0, y: 0 }; // grabbing kills any leftover spin
    lastMove.current = null;
  }
  function onMove(e: React.PointerEvent) {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 5 && !d.moved) {
      d.moved = true;
      setBubble(null); // dragging dismisses the bubble
    }
    const nextRy = d.ry + dx * 0.5;
    const nextRx = clamp(d.rx - dy * 0.5, -85, 85);

    // derive angular velocity from this move so a flick keeps spinning on release
    const now = performance.now();
    const lm = lastMove.current;
    if (lm) {
      const dt = now - lm.t;
      if (dt > 0) {
        const cap = (val: number) => Math.max(-2, Math.min(2, val)); // sane spin ceiling
        vel.current.y = cap((nextRy - lm.ry) / dt);
        vel.current.x = cap((nextRx - lm.rx) / dt);
      }
    }
    lastMove.current = { t: now, rx: nextRx, ry: nextRy };

    ry.set(nextRy);
    rx.set(nextRx);
  }
  function onUp() {
    if (dragRef.current) wasDrag.current = dragRef.current.moved;
    dragRef.current = null;
    // releasing after a pause shouldn't fling — drop stale velocity if the last
    // move is old (the pointer was held still before letting go).
    if (lastMove.current && performance.now() - lastMove.current.t > 80) {
      vel.current = { x: 0, y: 0 };
    }
  }

  function reveal(id: string, label: string, el: HTMLElement) {
    if (wasDrag.current) {
      wasDrag.current = false; // this pointerup was a drag, not a click
      return;
    }
    const willOpen = open !== id;
    setOpen(willOpen ? id : null);
    if (willOpen) {
      const r = el.getBoundingClientRect();
      setBubble({ x: r.left + r.width / 2, y: r.top, text: label });
    } else {
      setBubble(null);
    }
  }

  let blackCount = 0; // deterministic mapping of cubeItems → black cells

  return (
    <section className="px-6 pt-14 pb-8 sm:pt-20">
      <div
        className="mx-auto flex touch-none cursor-grab select-none items-center justify-center active:cursor-grabbing"
        style={{ perspective: 1100, width: 380, height: 340 }}
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => {
          hovering.current = false;
          dragRef.current = null;
          setBubble(null);
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <motion.div className="relative" style={{ ...preserve, width: SIZE, height: SIZE, rotateX: rx, rotateY: ry }}>
          {FACES.map((face) => (
            <div
              key={face.key}
              className="absolute grid grid-cols-3 gap-[1px] rounded-lg p-[1px]"
              style={{ ...preserve, ...hideBack, width: SIZE, height: SIZE, transform: face.t, backgroundColor: "#dadada" }}
            >
              {BLACK.map((isBlack, i) => {
                if (!isBlack) {
                  return (
                    <div
                      key={i}
                      className="rounded-[5px]"
                      style={{ ...hideBack, backgroundColor: "#f4f4f4", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.07)" }}
                    />
                  );
                }
                const item = cubeItems[blackCount % cubeItems.length];
                blackCount++;
                const id = `${face.key}-${i}`;
                const isOpen = open === id;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => reveal(id, item.label, e.currentTarget)}
                    aria-label={isOpen ? `Hide: ${item.label}` : `Reveal illustration: ${item.label}`}
                    className="relative overflow-hidden rounded-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    style={{ ...preserve, ...hideBack, boxShadow: "0 2px 7px rgba(0,0,0,.32)" }}
                  >
                    {/* illustration layer (revealed) */}
                    <span className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#f4f4f4" }}>
                      {item.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.src} alt={item.label} className="size-full object-cover" />
                      ) : (
                        <span className="text-lg opacity-50" aria-hidden>🖼️</span>
                      )}
                    </span>
                    {/* black cover — crossfades away on click */}
                    <motion.span
                      className="absolute inset-0"
                      style={{
                        ...hideBack,
                        background: "linear-gradient(152deg, #2b2b2b 0%, #181818 52%, #0a0a0a 100%)",
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,.10), inset 0 -2px 5px rgba(0,0,0,.5)",
                      }}
                      animate={{ opacity: isOpen ? 0 : 1 }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {/* floating description bubble (Georgia-style) — frosted, beside the clicked square */}
      <AnimatePresence>
        {bubble && (
          <div className="pointer-events-none fixed z-50" style={{ left: bubble.x, top: bubble.y }}>
            <div className="absolute bottom-3 left-0 -translate-x-1/2">
              {/* Plain rounded pill, no pointer tail (Georgia-style) — just a frosted
                  capsule floating above the clicked square. */}
              <motion.div
                style={{ transformOrigin: "bottom center" }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.9, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.96, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[200px] whitespace-nowrap rounded-full border border-border bg-bg/70 px-3.5 py-1.5 text-center text-[13px] font-medium text-fg shadow-lg backdrop-blur-md"
              >
                {bubble.text}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <p className="mt-7 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
        drag to rotate · click a black square
      </p>
    </section>
  );
}
