import { site } from "@/lib/site";
import { ThreadsGlyph } from "./app-icons";
import { SocialCard } from "./social-card";

export function ThreadsCard() {
  return (
    <SocialCard
      href={site.links.threads}
      ariaLabel="Open Lingkan Wang on Threads"
      platform="Threads"
      icon={<ThreadsGlyph />}
      name="Lynkan Wang"
      handle="@wanglingkan183"
      bio="Product Builder ✦ build something interesting"
      meta="See what I'm sharing lately"
      hoverSound={false}
    />
  );
}
