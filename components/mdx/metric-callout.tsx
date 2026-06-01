export function MetricCallout({ value, label }: { value: string; label: string }) {
  return (
    <div role="figure" aria-label={`${value} — ${label}`} className="my-10 flex items-baseline gap-4 rounded-xl border border-border p-6">
      <span className="text-4xl font-semibold tracking-tight">{value}</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
