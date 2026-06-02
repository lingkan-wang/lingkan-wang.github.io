// Tiny Apple-ish UI sound effects, synthesized with the Web Audio API.
// No audio files needed; only ever triggered by a user click (never autoplay).

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type Tone = { freq: number; type?: OscillatorType; dur?: number; vol?: number; drop?: number };

function tone({ freq, type = "sine", dur = 0.09, vol = 0.1, drop = 0.6 }: Tone) {
  const c = audio();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * drop), now + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(vol, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

export const sfx = {
  /** soft "tock" — photo flip */
  flip: () => tone({ freq: 520, type: "sine", dur: 0.1, vol: 0.12, drop: 0.55 }),
  /** brighter "tick" — category select */
  tab: () => tone({ freq: 880, type: "triangle", dur: 0.07, vol: 0.09, drop: 0.85 }),
};
