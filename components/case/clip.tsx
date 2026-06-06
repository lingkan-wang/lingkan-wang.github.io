"use client";

import { useEffect, useRef } from "react";

/**
 * An in-view looping demo clip. Plays muted only while visible; stays on its
 * poster frame if the visitor prefers reduced motion. `radius` clips the
 * composited video layer (border-radius alone leaks corners on a playing
 * <video> in some browsers). Meant to fill a `relative` aspect-ratio box.
 */
export function Clip({
  src,
  poster,
  alt,
  radius = "1rem",
  fit = "cover",
}: {
  src: string;
  poster: string;
  alt: string;
  radius?: string;
  fit?: "cover" | "contain";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={alt}
      style={{ clipPath: `inset(0 round ${radius})`, objectFit: fit }}
      className="absolute inset-0 h-full w-full"
    />
  );
}
