import { Reveal } from "../reveal";

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <Reveal>
      <dl className="my-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
        {items.map((it) => (
          <div key={it.label} className="bg-bg p-5 text-center">
            <dt className="sr-only">{it.label}</dt>
            <dd>
              <span className="block text-2xl font-semibold tracking-tight sm:text-3xl">{it.value}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-wider text-muted">{it.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
