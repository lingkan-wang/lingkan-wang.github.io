"use client";

import { useState } from "react";

/**
 * Circular avatar logo. Renders /logo.png (drop the avatar illustration there);
 * gracefully falls back to an "LW" monogram if the file isn't present yet, so
 * the build never depends on the asset existing.
 */
export function Logo({ size = 36 }: { size?: number }) {
  const [ok, setOk] = useState(true);

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/15 text-accent"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          // ?v= cache-buster: bump when the avatar art changes so browsers fetch
          // the new file immediately (the plain /logo.png URL is cached ~10 min).
          src="/logo.png?v=2"
          alt=""
          width={size}
          height={size}
          className="size-full object-cover"
          onError={() => setOk(false)}
        />
      ) : (
        <span className="font-mono text-[11px] font-medium tracking-tight">LW</span>
      )}
    </span>
  );
}
