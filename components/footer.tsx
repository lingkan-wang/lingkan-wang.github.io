"use client";

import { useEffect, useState } from "react";
import { PiOpenAiLogoFill } from "react-icons/pi";
import {
  SiFigma,
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
  { name: "Figma", icon: SiFigma },
  { name: "Framer", icon: SiFramer },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "OpenAI", icon: PiOpenAiLogoFill },
  { name: "Linear", icon: SiLinear },
  { name: "Notion", icon: SiNotion },
  { name: "GitHub", icon: SiGithub },
  { name: "Vercel", icon: SiVercel },
] as const;

export function Footer() {
  const [californiaTime, setCaliforniaTime] = useState("--:--");

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
                {tools.map(({ name, icon: Icon }) => (
                  <li key={name} className="grid size-6 place-items-center" title={name}>
                    <Icon className="size-6" aria-hidden="true" />
                    <span className="sr-only">{name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid min-w-0 gap-1 sm:grid-cols-[152px_minmax(0,1fr)] sm:items-baseline sm:gap-0">
              <p className="text-muted">Curated finds</p>
              <a className="site-footer-link" href="/playground#writing">
                <span className="site-footer-link__text">What shapes how I think and build</span>
                <span className="shrink-0" aria-hidden="true">
                  →
                </span>
              </a>
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

          <div
            className="hidden min-h-[360px] lg:block"
            data-footer-dog-slot
            aria-hidden="true"
          />
        </div>
      </div>
    </footer>
  );
}
