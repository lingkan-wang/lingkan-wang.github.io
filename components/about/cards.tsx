import Image from "next/image";
import { languages, now, location, spotify } from "@/lib/about";

const label = "font-mono text-[10px] uppercase tracking-widest text-muted";

export function NowCard() {
  return (
    <div>
      <span className={label}>Now</span>
      <p className="mt-1.5 text-sm text-fg">📍 {location}</p>
      <p className="mt-1 text-[13px] leading-snug text-muted">{now}</p>
    </div>
  );
}

export function LanguagesCard() {
  return (
    <div>
      <span className={label}>Languages</span>
      <ul className="mt-2 space-y-1.5 text-sm">
        {languages.map((l) => (
          <li key={l.name} className="flex items-center gap-2">
            <span aria-hidden>{l.flag}</span>
            <span className="text-fg">{l.name}</span>
            <span className="ml-auto text-xs text-muted">{l.level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MusicCard() {
  return (
    <div>
      <span className={label}>On repeat</span>
      <a
        href={spotify.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-fg/30"
        onPointerDownCapture={(e) => e.stopPropagation()}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#1DB954] text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.43a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.8-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86zm1.23-2.74a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.56 11.23 1.33.37.23.49.71.26 1.07zm.11-2.85C14.83 8.95 9.3 8.77 6.2 9.71a.93.93 0 1 1-.54-1.79c3.56-1.08 9.66-.87 13.48 1.4a.94.94 0 0 1-.96 1.6z" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-fg">My Spotify</span>
          <span className="block text-xs text-muted">Liked songs &amp; playlists ↗</span>
        </span>
      </a>
    </div>
  );
}

export function PortraitCard() {
  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
        <Image src="/about/portrait.jpg" alt="Lingkan Wang" fill sizes="200px" className="object-cover" draggable={false} />
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-muted">me :)</p>
    </div>
  );
}
