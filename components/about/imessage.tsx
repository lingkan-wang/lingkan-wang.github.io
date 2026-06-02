"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

function Bubble({ children, me = false }: { children: ReactNode; me?: boolean }) {
  return (
    <span
      className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
        me ? "self-end rounded-br-md bg-accent text-white" : "self-start rounded-bl-md bg-fg/[0.06] text-fg"
      }`}
    >
      {children}
    </span>
  );
}

export function IMessage() {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  function send() {
    const text = msg.trim();
    if (!text) return;
    const url = `mailto:${site.email}?subject=${encodeURIComponent("Hi from your portfolio")}&body=${encodeURIComponent(text)}`;
    window.location.href = url;
    setSent(true);
  }

  return (
    <div className="flex h-full flex-col">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Text me 💬</span>

      <div className="mt-3 flex flex-1 flex-col gap-2">
        <Bubble>want to work together? or just say hi 👋</Bubble>
        <Bubble>type below — it lands straight in my inbox.</Bubble>
        {sent && <Bubble me>opening your mail app… ✨</Bubble>}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          onPointerDownCapture={(e) => e.stopPropagation()}
          placeholder="iMessage…"
          aria-label="Your message"
          className="min-w-0 flex-1 rounded-full border border-border bg-bg px-4 py-2 text-sm outline-none transition-colors focus-visible:border-fg/40"
        />
        <button
          type="button"
          onClick={send}
          onPointerDownCapture={(e) => e.stopPropagation()}
          aria-label="Send"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
