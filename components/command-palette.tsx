"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { site } from "@/lib/site";
import { durations, easeOut } from "@/lib/motion";

const TOGGLE_EVENT = "toggle-cmdk";

/** Fire this anywhere to open the command menu (used by CommandMenuButton). */
export function openCommandMenu() {
  window.dispatchEvent(new Event(TOGGLE_EVENT));
}

type Action = () => void;

function ItemIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center text-muted" aria-hidden>
      {children}
    </span>
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = useReducedMotion();

  // ⌘K / Ctrl+K toggles; custom event opens from a button; Escape closes.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onToggle() {
      setOpen((o) => !o);
    }
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener(TOGGLE_EVENT, onToggle);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(TOGGLE_EVENT, onToggle);
    };
  }, []);

  // Lock body scroll while open and reset the query when it closes.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    setSearch("");
  }, [open]);

  const run = useCallback((action: Action) => {
    setOpen(false);
    action();
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh] sm:pt-[22vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: durations.fast, ease: easeOut }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close command menu"
            className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-[560px]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: durations.base, ease: easeOut }}
          >
            <Command
              label="Command menu"
              value={search}
              className="overflow-hidden rounded-xl border border-border bg-bg shadow-2xl shadow-black/20"
            >
              <div className="flex items-center gap-2 border-b border-border px-4">
                <svg className="size-4 shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <Command.Input
                  autoFocus
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search…"
                  className="h-12 w-full bg-transparent text-[15px] text-fg placeholder:text-muted focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[min(420px,60vh)] overflow-y-auto overscroll-contain p-2">
                <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="px-1 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted"
                >
                  {site.nav.map((item) => (
                    <Item
                      key={item.href}
                      value={`Go to ${item.label}`}
                      keywords={[item.label, "navigate", "page"]}
                      onSelect={() => run(() => router.push(item.href))}
                    >
                      <ItemIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </ItemIcon>
                      Go to {item.label}
                    </Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Actions"
                  className="px-1 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted"
                >
                  <Item
                    value={`Switch to ${isDark ? "light" : "dark"} theme`}
                    keywords={["theme", "dark", "light", "mode", "appearance"]}
                    onSelect={() => run(() => setTheme(isDark ? "light" : "dark"))}
                  >
                    <ItemIcon>
                      {isDark ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                        </svg>
                      )}
                    </ItemIcon>
                    Switch to {isDark ? "light" : "dark"} theme
                  </Item>

                  <Item
                    value="Copy email address"
                    keywords={["email", "contact", "mail", site.email]}
                    onSelect={() => run(() => navigator.clipboard?.writeText(site.email))}
                  >
                    <ItemIcon>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </ItemIcon>
                    Copy email address
                  </Item>
                </Command.Group>

                <Command.Group
                  heading="Links"
                  className="px-1 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted"
                >
                  {[
                    { label: "LinkedIn", href: site.links.linkedin },
                    { label: "Instagram", href: site.links.instagram },
                    { label: "Resume", href: site.links.resume },
                  ].map((link) => (
                    <Item
                      key={link.label}
                      value={`Open ${link.label}`}
                      keywords={[link.label, "external", "link"]}
                      onSelect={() => run(() => window.open(link.href, "_blank", "noopener,noreferrer"))}
                    >
                      <ItemIcon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                          <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                      </ItemIcon>
                      Open {link.label}
                    </Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Item({
  value,
  keywords,
  onSelect,
  children,
}: {
  value: string;
  keywords?: string[];
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <Command.Item
      value={value}
      keywords={keywords}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fg outline-none transition-colors data-[selected=true]:bg-fg/[0.06] data-[selected=true]:text-fg"
    >
      {children}
    </Command.Item>
  );
}

/** Styled button that opens the command menu — used in the Playground demo. */
export function CommandMenuButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // eslint-disable-line react-hooks/set-state-in-effect
  const isMac = mounted && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <button
      type="button"
      onClick={openCommandMenu}
      className="group inline-flex items-center gap-3 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-muted transition-colors hover:border-fg/30 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span>Search or jump to…</span>
      <kbd className="ml-2 rounded border border-border px-1.5 py-0.5 font-mono text-[11px]">
        {mounted ? (isMac ? "⌘K" : "Ctrl K") : "⌘K"}
      </kbd>
    </button>
  );
}
