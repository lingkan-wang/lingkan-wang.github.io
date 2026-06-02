"use client";

import { useState } from "react";
import { wechat } from "@/lib/about";

export function WechatCard() {
  const [ok, setOk] = useState(true);

  return (
    <div className="flex h-full flex-col">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">WeChat</span>
      <div className="mt-3 flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <div className="grid size-28 place-items-center overflow-hidden rounded-xl border border-border bg-bg">
          {ok ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={wechat.qr} alt="WeChat QR code" className="size-full object-contain" onError={() => setOk(false)} />
          ) : (
            <span className="px-2 text-[9px] leading-tight text-muted">
              add your QR at
              <br />
              <code className="font-mono">public{wechat.qr}</code>
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-fg">{wechat.id}</p>
          <p className="text-xs text-muted">{wechat.note}</p>
        </div>
      </div>
    </div>
  );
}
