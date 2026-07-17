import { site } from "@/lib/site";
import { xCard } from "@/lib/about";
import { XGlyph } from "./app-icons";
import { SocialCard } from "./social-card";

export function XCard() {
  return (
    <SocialCard
      href={site.links.x}
      ariaLabel="Open Lingkan Wang on X"
      platform="X"
      icon={<XGlyph />}
      name={site.name}
      handle={xCard.handle}
      bio={xCard.bio}
      meta={xCard.meta}
    />
  );
}
