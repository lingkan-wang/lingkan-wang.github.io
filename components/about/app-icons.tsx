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
    <span className={`${chip} bg-[#07C160]`} aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M8.69 4.5C4.74 4.5 1.5 7.16 1.5 10.45c0 1.9 1.07 3.6 2.74 4.7l-.68 2.05 2.4-1.2c.86.24 1.55.39 2.73.39.21 0 .42-.01.62-.03a4.86 4.86 0 0 1-.2-1.36c0-2.9 2.8-5.25 6.27-5.25.23 0 .46.02.68.04C15.45 6.53 12.43 4.5 8.69 4.5zM6.36 8.72a.92.92 0 1 1 0-1.84.92.92 0 0 1 0 1.84zm4.78 0a.92.92 0 1 1 0-1.84.92.92 0 0 1 0 1.84z" />
        <path d="M22.5 14.86c0-2.77-2.77-5.02-5.88-5.02-3.31 0-5.91 2.25-5.91 5.02 0 2.78 2.6 5.02 5.91 5.02.69 0 1.39-.17 2.08-.34l1.9 1.04-.52-1.73c1.46-1.1 2.42-2.55 2.42-3.99zM14.7 13.7a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm3.87 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
      </svg>
    </span>
  );
}
