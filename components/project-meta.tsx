import type { Project } from "@/lib/projects";

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</dt>
      <dd className="text-sm text-fg">{value}</dd>
    </div>
  );
}

export function ProjectMeta({ meta }: { meta: Project }) {
  const items: Array<[string, string | undefined]> = [
    ["Role", meta.role],
    ["Timeline", meta.timeline],
    ["Platform", meta.platform],
    ["Tools", meta.tools],
  ];
  const present = items.filter(([, v]) => Boolean(v)) as Array<[string, string]>;
  if (present.length === 0) return null;
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-6 sm:grid-cols-4">
      {present.map(([label, value]) => (
        <Item key={label} label={label} value={value} />
      ))}
    </dl>
  );
}
