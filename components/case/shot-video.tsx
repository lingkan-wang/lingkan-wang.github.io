"use client";

import { useEffect, useRef } from "react";

/**
 * A portrait demo clip (already framed on its own background). Plays muted,
 * looping, only while in view — and stays paused if the visitor prefers
 * reduced motion. The poster frame shows until playback starts.
 */
export function ShotVideo({ src, poster, alt }: { src: string; poster?: string; alt?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave the poster frame in place
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
      // clip-path reliably clips the composited video layer (border-radius alone
      // is ignored on a playing <video> in some browsers, leaking the corners).
      // Inset 2px to crop the clip's dark canvas corners + edge slivers, and round
      // just inside the baked device-frame corner so nothing jagged shows.
      style={{ clipPath: "inset(2px round 1.4rem)" }}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
