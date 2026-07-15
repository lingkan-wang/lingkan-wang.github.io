import type { Metadata } from "next";
import { CodedPlaylist } from "@/components/coded-playlist";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Coded Work — ${site.name}` };

export default function CodedWorkPage() {
  return <CodedPlaylist />;
}
