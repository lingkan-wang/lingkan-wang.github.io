"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NowCard, LanguagesCard, MusicCard, PortraitCard } from "./cards";
import { WechatCard } from "./wechat-card";
import { IMessage } from "./imessage";

const chrome = "rounded-2xl border border-border bg-bg p-4 shadow-[0_10px_34px_rgba(0,0,0,0.10)]";

type Item = { key: string; node: ReactNode; x: number; y: number; rot: number; w: number; wide?: boolean };

const ITEMS: Item[] = [
  { key: "portrait", node: <PortraitCard />, x: 8, y: 6, rot: -4, w: 166 },
  { key: "now", node: <NowCard />, x: 208, y: 0, rot: 2, w: 248 },
  { key: "languages", node: <LanguagesCard />, x: 26, y: 250, rot: 3, w: 196, wide: false },
  { key: "music", node: <MusicCard />, x: 300, y: 168, rot: -3, w: 290, wide: true },
  { key: "wechat", node: <WechatCard />, x: 90, y: 332, rot: -2, w: 196 },
  { key: "imessage", node: <IMessage />, x: 300, y: 322, rot: 1.5, w: 320, wide: true },
];

export function DraggableCanvas() {
  const reduce = useReducedMotion();
  const constraints = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);
  const [order, setOrder] = useState<string[]>(ITEMS.map((i) => i.key));

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setCanDrag(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  // mobile / touch / SSR: a calm stacked grid
  if (!canDrag) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ITEMS.map((it) => (
          <div key={it.key} className={`${chrome} ${it.wide ? "sm:col-span-2" : ""}`}>
            {it.node}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={constraints} className="relative mx-auto h-[560px] w-full max-w-[660px] touch-none select-none">
      {ITEMS.map((it) => (
        <motion.div
          key={it.key}
          drag
          dragConstraints={constraints}
          dragElastic={0.16}
          dragMomentum={!reduce}
          initial={{ x: it.x, y: it.y, rotate: it.rot }}
          whileDrag={{ scale: 1.04, rotate: 0, cursor: "grabbing" }}
          onPointerDown={() => setOrder((prev) => [...prev.filter((k) => k !== it.key), it.key])}
          style={{ position: "absolute", width: it.w, zIndex: 10 + order.indexOf(it.key), cursor: "grab" }}
          className={chrome}
        >
          {it.node}
        </motion.div>
      ))}
      <span className="pointer-events-none absolute right-1 top-0 font-mono text-[11px] uppercase tracking-widest text-muted">
        drag things around ✦
      </span>
    </div>
  );
}
