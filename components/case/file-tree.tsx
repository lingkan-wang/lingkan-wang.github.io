"use client";

import { useState } from "react";

export type TreeNode = { name: string; children?: TreeNode[] };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 text-muted transition-transform ${open ? "rotate-90" : ""}`} aria-hidden>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-accent" aria-hidden>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-muted/70" aria-hidden>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
    </svg>
  );
}

function Node({ node, depth, defaultOpen = false }: { node: TreeNode; depth: number; defaultOpen?: boolean }) {
  const isFolder = Array.isArray(node.children);
  const [open, setOpen] = useState(defaultOpen);
  const pad = { paddingLeft: `${depth * 15}px` };

  if (!isFolder) {
    return (
      <div style={pad} className="flex items-center gap-2 py-[3px] text-[12.5px] text-fg/75">
        <FileIcon />
        <span>{node.name}</span>
      </div>
    );
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={pad}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 py-[3px] text-[12.5px] font-medium text-fg transition-colors hover:text-accent"
      >
        <Chevron open={open} />
        <FolderIcon />
        <span>{node.name}</span>
      </button>
      {open && node.children!.map((c) => <Node key={c.name} node={c} depth={depth + 1} defaultOpen={c.name === "docs"} />)}
    </div>
  );
}

/** An interactive "source of truth" file browser — click folders to expand. */
export function FileTree({ data }: { data: TreeNode }) {
  return (
    <div className="w-full max-w-[340px]">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">Source of truth</p>
      <div className="rounded-xl border border-border bg-bg p-3 font-mono shadow-sm">
        <Node node={data} depth={0} defaultOpen />
      </div>
    </div>
  );
}
