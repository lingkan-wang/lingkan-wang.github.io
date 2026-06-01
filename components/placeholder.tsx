export function Placeholder({
  label = "Image",
  blur = false,
  className = "",
  aspect = "aspect-[16/10]",
}: {
  label?: string;
  blur?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`flex ${aspect} w-full items-center justify-center rounded-xl border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-fg)_4%,transparent),transparent)] ${blur ? "blur-[3px]" : ""} ${className}`}
    >
      <span className="px-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}
