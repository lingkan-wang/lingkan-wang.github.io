// Consistent app-icon chips for the About bento card corners — same size & shape.

const chip = "grid size-7 shrink-0 place-items-center rounded-[8px] overflow-hidden";

export function XGlyph() {
  return (
    <span className={`${chip} bg-[#0b0b0b]`} aria-hidden>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </span>
  );
}

export function SpotifyGlyph() {
  return (
    <span className={`${chip} bg-[#1DB954]`} aria-hidden>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.43a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.8-.87 7.08-.5 9.72 1.11.3.18.39.57.21.86zm1.23-2.74a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.56 11.23 1.33.37.23.49.71.26 1.07zm.11-2.85C14.83 8.95 9.3 8.77 6.2 9.71a.93.93 0 1 1-.54-1.79c3.56-1.08 9.66-.87 13.48 1.4a.94.94 0 0 1-.96 1.6z" />
      </svg>
    </span>
  );
}

export function AppleMusicGlyph() {
  return (
    <span className={chip} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/about/apple-music.png" alt="" className="size-full object-cover" />
    </span>
  );
}

export function PhotosGlyph() {
  const colors = ["#FCA000", "#9FC93C", "#4FB748", "#17B6C6", "#3FA2F7", "#B05CD6", "#F186B7", "#FF5247"];
  return (
    <span className={`${chip} bg-white`} aria-hidden>
      <svg viewBox="0 0 24 24" className="size-[25px]">
        {colors.map((c, i) => (
          <rect key={i} x="9.8" y="2.4" width="4.4" height="8.4" rx="2.2" fill={c} style={{ mixBlendMode: "multiply" }} transform={`rotate(${i * 45} 12 12)`} />
        ))}
      </svg>
    </span>
  );
}

export function WechatGlyph() {
  return (
    <span className={chip} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/about/wechat.png" alt="" className="size-full object-cover" />
    </span>
  );
}
