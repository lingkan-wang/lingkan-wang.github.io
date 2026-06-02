import type { ComponentType } from "react";
import type { Project } from "@/lib/projects";
import { EcovacsCaseStudy } from "@/components/case/ecovacs";

/**
 * Slugs that render a bespoke, richly-composed case study instead of the generic
 * MDX layout. Everything else falls back to the MDX renderer in [slug]/page.tsx.
 */
export const richCaseStudies: Record<string, ComponentType<{ meta: Project }>> = {
  "ecovacs-ai-cleaning": EcovacsCaseStudy,
};
