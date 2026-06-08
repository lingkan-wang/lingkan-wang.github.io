import Link from "next/link";
import Image from "next/image";
import { Placeholder } from "./placeholder";

export type CardItem = {
  slug: string;
  title: string;
  tags: string[];
  outcome: string;
  year: number | string;
  cover?: string;
};

export function ProjectCard({ item }: { item: CardItem }) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
    >
      {/* On hover the cover gently scales up inside its frame — no 3D tilt. */}
      <div className="overflow-hidden rounded-xl">
        {item.cover ? (
          <Image
            src={item.cover}
            alt={item.title}
            width={900}
            height={563}
            sizes="(max-width: 760px) 100vw, 380px"
            className="aspect-[16/10] w-full rounded-xl border border-border object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder
            label={item.title}
            aspect="aspect-[16/10]"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
            {item.title}
          </h3>
          <span className="shrink-0 font-mono text-xs text-muted">{item.year}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[13px] leading-snug text-muted">{item.outcome}</p>
      </div>
    </Link>
  );
}
