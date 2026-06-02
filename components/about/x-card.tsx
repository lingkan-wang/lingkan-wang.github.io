import { site } from "@/lib/site";
import { xCard } from "@/lib/about";
import { Logo } from "@/components/logo";

export function XCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Logo size={38} />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-fg">{site.name}</div>
            <div className="text-xs text-muted">{xCard.handle}</div>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-fg" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      <p className="mt-3 text-[15px] leading-snug text-fg">{xCard.bio}</p>
      <p className="mt-1 text-[13px] leading-snug text-muted">{xCard.meta}</p>

      <a
        href={site.links.x}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-fg transition-colors hover:border-fg/30"
      >
        {xCard.cta} ↗
      </a>
    </div>
  );
}
