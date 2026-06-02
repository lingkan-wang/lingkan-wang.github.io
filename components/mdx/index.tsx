import type { ReactNode } from "react";
import { Figure } from "./figure";
import { Gallery } from "./gallery";
import { MetricCallout } from "./metric-callout";
import { Metrics, Metric } from "./metrics";
import { Compare, CompareRow } from "./compare";
import { Showcase, ShowcaseItem } from "./showcase";
import { Quote } from "./quote";

export function Prose({ children }: { children: ReactNode }) {
  return <div className="case-prose mx-auto max-w-[680px] px-6">{children}</div>;
}

export const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-16 mb-4 border-t border-border pt-8 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-10 mb-3 text-lg font-semibold" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-5 text-[15px] leading-7 text-fg/90" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-5 list-disc space-y-2 pl-5 text-[15px] leading-7 text-fg/90" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-5 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-fg/90" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-accent underline-offset-4 hover:underline" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => <strong className="font-semibold" {...props} />,
  Figure,
  Gallery,
  MetricCallout,
  Metrics,
  Metric,
  Compare,
  CompareRow,
  Showcase,
  ShowcaseItem,
  Quote,
};
