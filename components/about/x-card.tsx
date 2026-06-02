import { site } from "@/lib/site";
import { xCard } from "@/lib/about";
import { Logo } from "@/components/logo";
import { XGlyph } from "./app-icons";

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
        <XGlyph />
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
