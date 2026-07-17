"use client";

import { type CSSProperties, type SVGProps, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SiGithub,
  SiLinear,
  SiNextdotjs,
  SiNotion,
  SiSupabase,
  SiVercel,
} from "react-icons/si";
import { site } from "@/lib/site";
import { FooterDog } from "@/components/footer-dog";

function ClaudeCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 10.5h3v3h-3v3h-1.5v3H18v-3h-1.5v3H15v-3H9v3H7.5v-3H6v3H4.5v-3H3v-3H0v-3h3v-6h18Zm-15 0h1.5v-3H6Zm10.5 0H18v-3h-1.5z" />
    </svg>
  );
}

const contacts = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "Phone",
    value: "4129960978",
    href: "tel:+14129960978",
  },
] as const;

const tools = [
  { name: "Paper", image: "/toolbox/paper.svg", href: "https://paper.design" },
  { name: "Figma", image: "/toolbox/figma.svg", href: "https://figma.com" },
  { name: "Spline", image: "/toolbox/spline.png", href: "https://spline.design" },
  { name: "Claude Code", icon: ClaudeCodeIcon, color: "#D97757", href: "https://claude.ai/code" },
  { name: "ChatGPT", image: "/toolbox/chatgpt.svg", href: "https://chatgpt.com" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E", href: "https://supabase.com" },
  { name: "Lovable", image: "/toolbox/lovable.svg", href: "https://lovable.dev" },
  { name: "Next.js", icon: SiNextdotjs, color: "light-dark(#000000, #ffffff)", href: "https://nextjs.org" },
  { name: "Linear", icon: SiLinear, color: "#5E6AD2", href: "https://linear.app" },
  { name: "Notion", icon: SiNotion, color: "light-dark(#000000, #ffffff)", href: "https://notion.so" },
  { name: "GitHub", icon: SiGithub, color: "light-dark(#181717, #ffffff)", href: "https://github.com" },
  { name: "Vercel", icon: SiVercel, color: "light-dark(#000000, #ffffff)", href: "https://vercel.com" },
] as const;

export function Footer() {
  const pathname = usePathname();
  const [californiaTime, setCaliforniaTime] = useState("--:--");
  const hideFooter = ["/about", "/playground"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });

    const updateTime = () => setCaliforniaTime(formatter.format(new Date()));

    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    const updateWhenVisible = () => {
      if (!document.hidden) updateTime();
    };

    document.addEventListener("visibilitychange", updateWhenVisible);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", updateWhenVisible);
    };
  }, []);

  if (hideFooter) {
    return null;
  }

  return (
    <footer className="relative px-6 pb-20 pt-16 sm:pb-24 sm:pt-20" aria-label="Site footer">
      <FooterDog />
      <div className="mx-auto w-full max-w-[1080px]">
        <section className="mb-20 sm:mb-24" aria-labelledby="footer-toolbox-title">
          <h2
            id="footer-toolbox-title"
            className="mb-8 text-[17px] font-medium tracking-[-0.01em] text-fg sm:mb-10"
          >
            Toolbox
          </h2>

          <div className="grid gap-5">
            <div className="grid min-w-0 gap-3 sm:grid-cols-[152px_minmax(0,1fr)] sm:items-center sm:gap-0">
              <p className="text-muted">Stack</p>
              <ul
                className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-3"
                aria-label="Design and development stack"
              >
                {tools.map((tool) => {
                  const localImage = "image" in tool;
                  const Icon = "icon" in tool ? tool.icon : null;

                  return (
                    <li key={tool.name}>
                      <a
                        className={`toolbox-tool${localImage ? " toolbox-tool--local" : ""}`}
                        data-tool-name={tool.name}
                        style={"color" in tool ? ({ "--tool-color": tool.color } as CSSProperties) : undefined}
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tool.name}
                      >
                        {localImage ? (
                          <Image
                            src={tool.image}
                            alt=""
                            width={20}
                            height={20}
                            className="toolbox-tool__icon"
                            aria-hidden="true"
                          />
                        ) : Icon ? (
                          <Icon className="toolbox-tool__icon" aria-hidden="true" />
                        ) : null}
                        <span className="sr-only">{tool.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-20">
          <section className="min-w-0" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className="mb-7 text-[17px] font-medium tracking-[-0.01em] text-fg">
              Contact
            </h2>

            <dl className="grid gap-5">
              {contacts.map((contact) => {
                const external = contact.href.startsWith("http");

                return (
                  <div
                    key={contact.label}
                    className="grid min-w-0 gap-1 sm:grid-cols-[152px_minmax(0,1fr)] sm:items-baseline sm:gap-0"
                  >
                    <dt className="text-muted">{contact.label}</dt>
                    <dd className="min-w-0">
                      <a
                        className="site-footer-link"
                        href={contact.href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        <span className="site-footer-link__text">{contact.value}</span>
                        <span className="shrink-0" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </dd>
                  </div>
                );
              })}
            </dl>

            <p className="mt-20 text-muted sm:mt-24" aria-live="off" data-footer-time>
              It&apos;s <span className="inline-block min-w-[4.8ch] tabular-nums">{californiaTime}</span> in California.
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
