"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Placeholder } from "../placeholder";
import { Reveal } from "../reveal";

type Width = "default" | "wide" | "full";

export function Figure({
  src,
  alt,
  caption,
  width = "default",
  breakout = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  width?: Width;
  breakout?: boolean; // back-compat alias for width="full"
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Cached images may already be complete before onLoad can fire.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  const w: Width = breakout ? "full" : width;
  const wrap =
    w === "full"
      ? "relative left-1/2 w-[min(1080px,92vw)] -translate-x-1/2"
      : w === "wide"
        ? "relative left-1/2 w-[min(860px,92vw)] -translate-x-1/2"
        : "w-full";

  return (
    <Reveal>
      <figure className={`my-10 ${wrap}`}>
        {src ? (
          <Image
            ref={ref}
            src={src}
            alt={alt}
            width={1600}
            height={1000}
            onLoad={() => setLoaded(true)}
            sizes={w === "default" ? "(max-width: 680px) 100vw, 680px" : "(max-width: 1080px) 92vw, 1080px"}
            className={`w-full rounded-xl border border-border bg-fg/[0.03] transition-[opacity,filter] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
            }`}
          />
        ) : (
          <Placeholder label={alt} />
        )}
        {caption && (
          <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
}
