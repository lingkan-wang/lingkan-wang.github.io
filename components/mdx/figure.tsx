"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Placeholder } from "../placeholder";

export function Figure({
  src,
  video,
  alt,
  caption,
  breakout = false,
  zoom = false,
}: {
  src?: string;
  video?: string;
  alt: string;
  caption?: string;
  breakout?: boolean;
  zoom?: boolean;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const width = breakout
    ? "relative left-1/2 w-[min(1080px,92vw)] -translate-x-1/2"
    : "w-full";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
      src={src}
      alt={alt}
      width={1080}
      height={675}
      className={`w-full rounded-xl border border-border ${zoom ? "cursor-zoom-in" : ""}`}
      sizes={breakout ? "(max-width: 1080px) 92vw, 1080px" : "(max-width: 680px) 100vw, 680px"}
      onClick={zoom ? () => setOpen(true) : undefined}
    />
  ) : (
    <Placeholder label={alt} />
  );

  return (
    <figure className={`my-10 ${width}`}>
      {media}
      {caption && <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
    </figure>
  );
}
