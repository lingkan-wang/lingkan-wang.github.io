import type { Metadata } from "next";
import { Playground } from "@/components/playground";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Writing — ${site.name}` };

export default function ResearchPage() {
  return <Playground initialCategory="writing" />;
}
