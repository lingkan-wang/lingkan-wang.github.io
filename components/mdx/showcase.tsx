"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { durations, easeOut } from "@/lib/motion";

export function Showcase({ children }: { children: ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{ index?: number }>[];
  return (
    <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, i) => cloneElement(item, { index: i }))}
    </div>
  );
}

export function ShowcaseItem({
  src,
  poster,
  label,
  index = 0,
  children,
}: {
  src: string;
  poster: string;
  label: string;
  index?: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce || !isVideo) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce, isVideo]);

  return (
    <motion.figure
      ref={ref}
      className="m-0 overflow-hidden rounded-xl border border-border"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: durations.enter, ease: easeOut, delay: index * 0.05 }}
    >
      {isVideo && !reduce ? (
        <video
          ref={videoRef}
          poster={poster}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          className="block w-full bg-[color-mix(in_srgb,var(--color-fg)_4%,transparent)]"
        />
      ) : (
        // reduced-motion path, or GIF fallback when no mp4 exists.
        // Under reduced motion we always render the still poster — never autoplaying motion.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={reduce ? poster : src} alt={label} className="block w-full" loading="lazy" />
      )}
      <figcaption className="border-t border-border p-3.5">
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{children}</span>
      </figcaption>
    </motion.figure>
  );
}
