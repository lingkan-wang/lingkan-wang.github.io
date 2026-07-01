import Image from "next/image";
import type { ReactNode } from "react";
import type { Media } from "@/lib/work/ecovacs";
import { ShotVideo } from "./shot-video";

// Space reserved under every screen for its caption, so figures are equal height
// and the connective arrow can be centered on the phone (not the phone+caption).
const CAPTION = "mt-4 flex h-[68px] flex-col items-center gap-2 text-center";
const ARROW_PB = "sm:pb-[84px]"; // = mt-4 (16px) + caption h (68px), so the arrow centers on the phone

/**
 * A light "gallery" panel that stages product screens, matching the gray frames
 * on the Coded Work page (#fafafa surface, hairline border, gentle radius).
 * Pure CSS — no JS, no observers.
 */
export function Stage({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-[#fafafa] px-5 py-10 sm:px-10 sm:py-14 dark:bg-white/[0.03] ${
        className ?? ""
      }`}
    >
      {title && (
        <p className="mb-9 text-center font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

/**
 * An iPhone-style device mockup for BARE screenshots, so they read as complete
 * phones at the SAME size as the demo clips (which ship with a frame baked in).
 * The bounding box is aspect-[400/838] — identical to the clip container — so a
 * framed screenshot and a framed clip line up pixel-for-pixel side by side.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[400/838] w-full">
      {/* titanium rim + bezel */}
      <div className="absolute inset-0 rounded-[1.85rem] bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-950 p-[3px] shadow-[0_22px_50px_-24px_rgba(0,0,0,0.6)]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.65rem] bg-white">
          {children}
          {/* dynamic island — % units so it scales with the phone */}
          <div className="absolute left-1/2 top-[1.7%] z-10 h-[3%] w-[26%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

/** Small tag above a caption. `after` reads as the win (accent). */
function ScreenTag({ label, tone }: { label: string; tone: "before" | "after" | "then" }) {
  const styles =
    tone === "after" ? "border-accent/40 bg-accent/[0.06] text-accent" : "border-border text-muted";
  return (
    <span className={`rounded-full border px-2.5 py-1 font-mono text-[0.8rem] uppercase tracking-[0.06em] ${styles}`}>
      {label}
    </span>
  );
}

function Caption({ label, tone, text }: { label: string; tone: "before" | "after" | "then"; text: string }) {
  return (
    <figcaption className={CAPTION}>
      <ScreenTag label={label} tone={tone} />
      <span className="max-w-[220px] text-[13px] leading-snug text-muted">{text}</span>
    </figcaption>
  );
}

/**
 * One captioned screen. Every phone slot is the same width/aspect so a strip of
 * them is uniform; real-world "photos" get a wider slot sized to the phone's
 * height so the row still lines up.
 */
export function StageScreen({
  media,
  label,
  tone,
}: {
  media: Media;
  label: string;
  tone: "before" | "after" | "then";
}) {
  const isPhotos = media.kind === "photos";
  return (
    <figure className={`flex min-w-0 flex-col ${isPhotos ? "flex-[2.4] max-w-[430px]" : "flex-1 max-w-[200px]"}`}>
      {/* media area grows to the tallest figure's height and centers its content,
          so a shorter photo pair still lines up (and captions align) with a phone */}
      <div className="flex flex-1 flex-col justify-center">
        {isPhotos ? (
          <div className="flex w-full gap-3">
            {media.items.map((it) => (
              <div key={it.src} className="relative aspect-[3/4] flex-1 overflow-hidden rounded-2xl border border-border">
                <Image src={it.src} alt={it.alt} fill sizes="200px" className="object-cover" />
              </div>
            ))}
          </div>
        ) : media.kind === "video" ? (
          <div className="relative aspect-[400/838] w-full">
            <ShotVideo src={media.src} poster={media.poster} alt={media.alt} />
          </div>
        ) : (
          <PhoneFrame>
            {media.kind === "image" ? (
              <Image src={media.src} alt={media.alt} fill sizes="200px" className="object-cover object-top" />
            ) : (
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">{media.label}</span>
              </div>
            )}
          </PhoneFrame>
        )}
      </div>
      <Caption label={label} tone={tone} text={media.caption} />
    </figure>
  );
}

/**
 * The connective arrow between two staged screens. On desktop it stretches to
 * the figure height and (via bottom padding equal to the caption space) centers
 * on the phone itself. On mobile the strip stacks, so it points down.
 */
export function StageArrow() {
  return (
    <div className={`flex shrink-0 items-center justify-center py-2 text-fg/30 sm:self-stretch sm:py-0 ${ARROW_PB}`}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="rotate-90 sm:rotate-0">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}
