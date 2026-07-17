import type { Metadata } from "next";
import { Playground } from "@/components/playground";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Playground — ${site.name}` };

export default function CodedWorkPage() {
  return <Playground initialCategory="vibe-coding" />;
}
