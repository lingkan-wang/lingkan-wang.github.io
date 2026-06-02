// Refined, Apple-ish UI sounds synthesized with the Web Audio API — warm, layered
// partials (marimba/glass-like) + a lowpass + a soft attack transient + smooth decay.
// No audio files; only ever triggered by a user click (never autoplay).

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

type Blip = {
  freq: number;
  dur?: number;
  vol?: number;
  partials?: number[]; // frequency multipliers (1 = fundamental, 2 = octave, …)
  glide?: number; // end pitch multiplier (1 = flat)
  cutoff?: number; // lowpass start, as a multiple of freq
  noise?: number; // 0..1 amount of soft attack transient (the "tap")
};

function blip({ freq, dur = 0.1, vol = 0.12, partials = [1, 2], glide = 1, cutoff = 7, noise = 0 }: Blip) {
  const c = audio();
  if (!c) return;
  const now = c.currentTime;

  // master envelope — soft attack, exponential decay (no harsh click)
  const out = c.createGain();
  out.gain.setValueAtTime(0.0001, now);
  out.gain.exponentialRampToValueAtTime(vol, now + 0.004);
  out.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  // lowpass that closes as it decays → warm, rounded timbre
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.Q.value = 0.8;
  lp.frequency.setValueAtTime(freq * cutoff, now);
  lp.frequency.exponentialRampToValueAtTime(Math.max(420, freq * 1.4), now + dur);
  out.connect(lp);
  lp.connect(c.destination);

  // layered sine partials (octave + overtones), each quieter
  const amps = [1, 0.4, 0.2, 0.11];
  partials.forEach((mult, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq * mult, now);
    if (glide !== 1) o.frequency.exponentialRampToValueAtTime(freq * mult * glide, now + dur);
    g.gain.value = amps[i] ?? 0.08;
    o.connect(g);
    g.connect(out);
    o.start(now);
    o.stop(now + dur + 0.03);
  });

  // soft, short attack transient → the gentle "tap" onset
  if (noise > 0) {
    const len = Math.max(1, Math.floor(c.sampleRate * 0.012));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let n = 0; n < len; n++) data[n] = (Math.random() * 2 - 1) * (1 - n / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const ng = c.createGain();
    ng.gain.value = noise * vol * 0.7;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = freq * 2.4;
    bp.Q.value = 0.6;
    src.connect(bp);
    bp.connect(ng);
    ng.connect(c.destination);
    src.start(now);
    src.stop(now + 0.02);
  }
}

export const sfx = {
  /** crisp, glassy "tip" — photo flip */
  flip: () => blip({ freq: 1046, dur: 0.085, vol: 0.1, partials: [1, 2.01, 3.0], glide: 1, cutoff: 8, noise: 0.28 }),
  /** warm, rounded "pock" — category select */
  tab: () => blip({ freq: 523, dur: 0.13, vol: 0.12, partials: [1, 2, 3.01], glide: 0.94, cutoff: 6, noise: 0.16 }),
};
