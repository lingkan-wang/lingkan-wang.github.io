import Image from "next/image";
import { Placeholder } from "../placeholder";

export function Figure({
  src,
  alt,
  caption,
  breakout = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  breakout?: boolean;
}) {
  const width = breakout
    ? "relative left-1/2 w-[min(1080px,92vw)] -translate-x-1/2"
    : "w-full";

  return (
    <figure className={`my-10 ${width}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={675}
          className="w-full rounded-xl border border-border"
        />
      ) : (
        <Placeholder label={alt} />
      )}
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
