import Link from "next/link";

export type ListItem = {
  title: string;
  tags: string[];
  outcome: string;
  year: number | string;
  href: string;
};

function Row({ item }: { item: ListItem }) {
  return (
    <span className="group flex items-baseline justify-between gap-6 py-5">
      <span className="min-w-0">
        <span className="block text-lg font-medium tracking-tight transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent">
          {item.title}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              {t}
            </span>
          ))}
          <span className="text-[13px] leading-snug text-muted">{item.outcome}</span>
        </span>
      </span>
      <span className="shrink-0 font-mono text-xs text-muted">{item.year}</span>
    </span>
  );
}

export function ProjectList({ items }: { items: ListItem[] }) {
  return (
    <ul className="border-t border-border">
      {items.map((item, i) => {
        const external = item.href.startsWith("http");
        return (
          <li key={i} className="border-b border-border">
            {external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="block rounded focus-visible:outline-2 focus-visible:outline-accent">
                <Row item={item} />
              </a>
            ) : (
              <Link href={item.href} className="block rounded focus-visible:outline-2 focus-visible:outline-accent">
                <Row item={item} />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
