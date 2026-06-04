import Image from "next/image";
import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-widest text-muted">{children}</p>;
}

/** Renders *emphasis* spans as medium-weight (not italic) for a refined look. */
export function Emph({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <em key={i} className="font-medium not-italic text-fg">
            {p.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function MetaGrid({ meta }: { meta: readonly { label: string; items: readonly string[] }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
      {meta.map((m) => (
        <div key={m.label}>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{m.label}</dt>
          <dd className="mt-2 space-y-0.5 text-sm text-fg/90">
            {m.items.map((it) => (
              <div key={it}>{it}</div>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function QuoteCard({ name, quote, avatar }: { name: string; quote: string; avatar: string }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-fg/[0.02] p-5 transition-colors hover:border-fg/20">
      <blockquote className="flex-1 text-[15px] leading-7 text-fg/90">“{quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-2.5">
        <Image src={avatar} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
        <span className="text-sm font-medium">{name}</span>
      </figcaption>
    </figure>
  );
}

export function NumberedCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-fg/20">
      <span className="font-mono text-xs text-accent">{n}</span>
      <h3 className="mt-2 text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}

export function Takeaway({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="border-t border-border pt-5">
      <span className="font-mono text-xs text-muted">{n}</span>
      <h3 className="mt-1 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-[15px] leading-7 text-fg/90">{body}</p>
    </div>
  );
}

/**
 * A 16:9 media slot for a feature demo. With `src` it renders a looping, muted
 * autoplay <video>; without one it shows a labelled placeholder (play glyph +
 * caption) so the layout reads correctly before the real clip is exported in.
 */
export function VideoSlot({ label, src, poster }: { label: string; src?: string; poster?: string }) {
  if (src) {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="aspect-video w-full rounded-2xl border border-border object-cover"
      />
    );
  }
  return (
    <div className="grid aspect-video w-full place-items-center rounded-2xl border border-dashed border-border bg-fg/[0.025]">
      <div className="flex flex-col items-center gap-3 text-muted">
        <span className="grid size-14 place-items-center rounded-full border border-border bg-bg/70 text-fg/70">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-fg/70">{label}</span>
        <span className="text-[11px] text-muted/70">video placeholder</span>
      </div>
    </div>
  );
}
