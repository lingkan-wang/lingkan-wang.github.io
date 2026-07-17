import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { bio } from "@/lib/about";
import { XCard } from "@/components/about/x-card";
import { ThreadsCard } from "@/components/about/threads-card";
import { PhotoCard } from "@/components/about/photo-card";
import { WechatCard } from "@/components/about/wechat-card";
import { IMessage } from "@/components/about/imessage";
import { HoverKeyword } from "@/components/hover-keyword";

export const metadata: Metadata = { title: `About — ${site.name}` };

const label = "font-mono text-[10px] uppercase tracking-widest text-muted";
const cardCls = "rounded-2xl bg-fg/[0.035] p-4";
const iconLink = "rounded transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-accent";

export default function About() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-28 pt-20 sm:pt-28">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)]">
        {/* LEFT — bio */}
        <Reveal>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">What I&apos;m about.</h1>
          <div className="mt-8 space-y-7">
            {bio.map((b) => {
              let body: React.ReactNode = b.body;
              if (b.keywords?.length) {
                const marks = b.keywords
                  .map((k) => ({ k, i: b.body.indexOf(k.word) }))
                  .filter((m) => m.i !== -1)
                  .sort((a, z) => a.i - z.i);
                const nodes: React.ReactNode[] = [];
                let cur = 0;
                marks.forEach((m, idx) => {
                  if (m.i < cur) return; // skip overlaps
                  if (m.i > cur) nodes.push(<span key={`t${idx}`}>{b.body.slice(cur, m.i)}</span>);
                  nodes.push(
                    <HoverKeyword key={`k${idx}`} emoji={m.k.emoji} logo={m.k.logo} logoEm={m.k.logoEm} href={m.k.href} external={m.k.external}>
                      {m.k.word}
                    </HoverKeyword>,
                  );
                  cur = m.i + m.k.word.length;
                });
                nodes.push(<span key="tail">{b.body.slice(cur)}</span>);
                body = nodes;
              }
              return (
                <section key={b.heading}>
                  <h2 className={label}>{b.heading}</h2>
                  <p className="mt-2 text-[15px] leading-7 text-fg/90">{body}</p>
                </section>
              );
            })}
          </div>

          <div className="mt-9 flex items-center gap-5 text-muted">
            <a href={`mailto:${site.email}`} aria-label="Email" className={iconLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
            <a href={site.links.x} target="_blank" rel="noopener noreferrer" aria-label="X" className={iconLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.96v15.5H.5zM8.5 8h4.75v2.12h.07c.66-1.18 2.28-2.42 4.69-2.42 5.02 0 5.95 3.18 5.95 7.3v8.5h-4.96v-7.53c0-1.8-.03-4.1-2.62-4.1-2.62 0-3.02 1.95-3.02 3.97v7.66H8.5z" />
              </svg>
            </a>
          </div>
        </Reveal>

        {/* RIGHT — interactive bento */}
        <Reveal delay={0.05}>
          <p className="mb-3 text-right font-mono text-[11px] uppercase tracking-widest text-muted">▸ click around…</p>
          <div className="grid grid-cols-2 gap-3">
            <div className={cardCls}>
              <XCard />
            </div>
            <div className={cardCls}>
              <ThreadsCard />
            </div>
            <div className={cardCls}>
              <PhotoCard />
            </div>
            <div className={cardCls}>
              <WechatCard />
            </div>
            <div className={`${cardCls} col-span-2`}>
              <IMessage />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
