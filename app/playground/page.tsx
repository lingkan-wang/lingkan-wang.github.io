import type { Metadata } from "next";
import { Playground } from "@/components/playground";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Playground — ${site.name}`,
  description: "Playable prototypes, small experiments, and writing by Lingkan Wang.",
};

export default function PlaygroundPage() {
  return <Playground />;
}
