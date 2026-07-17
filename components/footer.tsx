"use client";

import { type CSSProperties, type SVGProps, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PiOpenAiLogoFill } from "react-icons/pi";
import {
  SiFramer,
  SiGithub,
  SiLinear,
  SiNextdotjs,
  SiNotion,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { site } from "@/lib/site";
import { FooterDog } from "@/components/footer-dog";

function FigmaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 200 300">
      <path fill="#0acf83" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" />
      <path fill="#a259ff" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" />
      <path fill="#f24e1e" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" />
      <path fill="#ff7262" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" />
      <path fill="#1abcfe" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" />
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
    label: "LinkedIn",
    value: "lingkanwang",
    href: site.links.linkedin,
  },
  {
    label: "X",
    value: "WangLingkan",
    href: site.links.x,
  },
  {
    label: "GitHub",
    value: "lingkan-wang",
    href: site.links.github,
  },
] as const;

const tools = [
  { name: "Figma", icon: FigmaIcon, color: "light-dark(#000000, #ffffff)", href: "https://figma.com" },
  { name: "Framer", icon: SiFramer, color: "#0055ff", href: "https://framer.com" },
  { name: "React", icon: SiReact, color: "#61dafb", href: "https://react.dev" },
  { name: "Next.js", icon: SiNextdotjs, color: "light-dark(#000000, #ffffff)", href: "https://nextjs.org" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", href: "https://typescriptlang.org" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4", href: "https://tailwindcss.com" },
  { name: "OpenAI", icon: PiOpenAiLogoFill, color: "light-dark(#000000, #ffffff)", href: "https://openai.com" },
  { name: "Linear", icon: SiLinear, color: "#5e6ad2", href: "https://linear.app" },
  { name: "Notion", icon: SiNotion, color: "light-dark(#000000, #ffffff)", href: "https://notion.so" },
  { name: "GitHub", icon: SiGithub, color: "light-dark(#181717, #f0f6fc)", href: "https://github.com" },
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
    <footer className="px-6 pb-20 pt-16 sm:pb-24 sm:pt-20" aria-label="Site footer">
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
                className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3 text-muted/65"
                aria-label="Design and development stack"
              >
                {tools.map(({ name, icon: Icon, color, href }) => (
                  <li key={name}>
                    <a
                      className="toolbox-tool"
                      data-tool-name={name}
                      style={{ "--tool-color": color } as CSSProperties}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                    >
                      <Icon className="toolbox-tool__icon" aria-hidden="true" />
                      <span className="sr-only">{name}</span>
                    </a>
                  </li>
                ))}
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

            <p className="mt-20 text-muted sm:mt-24" aria-live="off">
              It&apos;s <span className="inline-block min-w-[4.8ch] tabular-nums">{californiaTime}</span> in California.
            </p>
          </section>

          <div className="mt-14 min-w-0 lg:mt-0" data-footer-dog-slot>
            <FooterDog />
          </div>
        </div>
      </div>
    </footer>
  );
}
