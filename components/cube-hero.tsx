"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion";
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

export function CubeHero() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(-24);
  const ry = useMotionValue(-30);
  const hovering = useRef(false);
  const dragRef = useRef<{ x: number; y: number; rx: number; ry: number; moved: boolean } | null>(null);
  const wasDrag = useRef(false);
  const [open, setOpen] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  // calm auto-spin while idle (not hovering, not dragging, not reduced-motion)
  useAnimationFrame((_, delta) => {
    if (reduce || hovering.current || dragRef.current) return;
    ry.set(ry.get() + delta * 0.015);
  });

  function onDown(e: React.PointerEvent) {
    dragRef.current = { x: e.clientX, y: e.clientY, rx: rx.get(), ry: ry.get(), moved: false };
  }
  function onMove(e: React.PointerEvent) {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) d.moved = true;
    ry.set(d.ry + dx * 0.5);
    rx.set(clamp(d.rx - dy * 0.5, -85, 85));
  }
  function onUp() {
    if (dragRef.current) wasDrag.current = dragRef.current.moved;
    dragRef.current = null;
  }

  function reveal(id: string, label: string) {
    if (wasDrag.current) {
      wasDrag.current = false; // this pointerup was a drag, not a click
      return;
    }
    const willOpen = open !== id;
    setOpen(willOpen ? id : null);
    setActiveLabel(willOpen ? label : null);
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
              className="absolute grid grid-cols-3 gap-[1px] rounded-lg p-[2px]"
              style={{ ...preserve, ...hideBack, width: SIZE, height: SIZE, transform: face.t, backgroundColor: "#b4b4b4" }}
            >
              {BLACK.map((isBlack, i) => {
                if (!isBlack) {
                  return (
                    <div
                      key={i}
                      className="rounded-[5px]"
                      style={{ ...hideBack, backgroundColor: "#f4f4f4", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)" }}
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
                    onClick={() => reveal(id, item.label)}
                    aria-label={isOpen ? `Hide: ${item.label}` : `Reveal illustration: ${item.label}`}
                    className="relative overflow-hidden rounded-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    style={{ ...preserve, ...hideBack }}
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
                      style={{ ...hideBack, backgroundColor: "#101010", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05)" }}
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

      <p className="mt-7 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
        {activeLabel ?? "drag to rotate · click a black square"}
      </p>
    </section>
  );
}
