"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Placeholder } from "../placeholder";
import { Reveal } from "../reveal";

type Width = "default" | "wide" | "full";

export function Figure({
  src,
  video,
  alt,
  caption,
  width = "default",
  breakout = false,
  zoom = false,
}: {
  src?: string;
  video?: string;
  alt: string;
  caption?: string;
  width?: Width;
  breakout?: boolean; // back-compat alias for width="full"
  zoom?: boolean;
}) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Client-only flag so the lightbox can portal to document.body. The Reveal
  // wrapper's resting `filter: blur(0px)` would otherwise trap a fixed overlay.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- canonical SSR mount guard
  useEffect(() => setMounted(true), []);

  // Cached images may already be complete before onLoad can fire.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const w: Width = breakout ? "full" : width;
  const wrap =
    w === "full"
      ? "relative left-1/2 w-[min(1080px,92vw)] -translate-x-1/2"
      : w === "wide"
        ? "relative left-1/2 w-[min(860px,92vw)] -translate-x-1/2"
        : "w-full";
  const sizes = w === "default" ? "(max-width: 680px) 100vw, 680px" : "(max-width: 1080px) 92vw, 1080px";

  const media = video ? (
    <video
      src={video}
      muted
      loop
      autoPlay={!reduce}
      playsInline
      preload="metadata"
      className="w-full rounded-xl border border-border"
    />
  ) : src ? (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      onLoad={() => setLoaded(true)}
      sizes={sizes}
      onClick={zoom ? () => setOpen(true) : undefined}
      className={`w-full rounded-xl border border-border bg-fg/[0.03] transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
      } ${zoom ? "cursor-zoom-in" : ""}`}
    />
  ) : (
    <Placeholder label={alt} />
  );

  const lightbox = (
    <AnimatePresence>
      {open && src && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <motion.img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[92vw] rounded-xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <Reveal>
      <figure className={`my-10 ${wrap}`}>
        {media}
        {caption && <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>}
      </figure>
      {mounted ? createPortal(lightbox, document.body) : null}
    </Reveal>
  );
}
