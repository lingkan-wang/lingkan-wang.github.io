import type { ComponentType } from "react";
import type { Project } from "@/lib/projects";
import { EcovacsCaseStudy } from "@/components/case/ecovacs";
import { VarsityCaseStudy } from "@/components/case/varsity";
import { BumbleCaseStudy } from "@/components/case/bumble";
import { KwaiCaseStudy } from "@/components/case/kwai";
import { TaimerCaseStudy } from "@/components/case/taimer";
import { MasiiCaseStudy } from "@/components/case/masii";

/**
 * Slugs that render a bespoke, richly-composed case study instead of the generic
 * MDX layout. Everything else falls back to the MDX renderer in [slug]/page.tsx.
 */
export const richCaseStudies: Record<string, ComponentType<{ meta: Project }>> = {
  "ecovacs-ai-cleaning": EcovacsCaseStudy,
  "varsity-tutors-parent-dashboard": VarsityCaseStudy,
  "bumble-interest-cards": BumbleCaseStudy,
  "kwai-guild-dashboard": KwaiCaseStudy,
  "taimer-ai": TaimerCaseStudy,
  masii: MasiiCaseStudy,
};
