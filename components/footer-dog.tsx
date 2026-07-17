"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./footer-dog.module.css";

let barkContext: AudioContext | null = null;

function playBark() {
  const AudioContextClass =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) return;
  barkContext ??= new AudioContextClass();
  const context = barkContext;
  if (context.state === "suspended") void context.resume();

  const barkBurst = (start: number, pitch: number, volume: number) => {
    const length = Math.ceil(context.sampleRate * 0.15);
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      const decay = 1 - index / length;
      data[index] = (Math.random() * 2 - 1) * decay;
    }

    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    const voice = context.createOscillator();
    const voiceGain = context.createGain();
    const master = context.createGain();

    noise.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(pitch * 2.6, start);
    filter.Q.value = 0.72;

    voice.type = "sawtooth";
    voice.frequency.setValueAtTime(pitch * 1.25, start);
    voice.frequency.exponentialRampToValueAtTime(pitch * 0.68, start + 0.13);

    noiseGain.gain.setValueAtTime(0.0001, start);
    noiseGain.gain.exponentialRampToValueAtTime(0.7, start + 0.012);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);
    voiceGain.gain.setValueAtTime(0.0001, start);
    voiceGain.gain.exponentialRampToValueAtTime(0.36, start + 0.014);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
    master.gain.value = volume;

    noise.connect(filter).connect(noiseGain).connect(master);
    voice.connect(voiceGain).connect(master);
    master.connect(context.destination);

    noise.start(start);
    voice.start(start);
    noise.stop(start + 0.16);
    voice.stop(start + 0.16);
  };

  const now = context.currentTime + 0.01;
  barkBurst(now, 150, 0.16);
  barkBurst(now + 0.17, 128, 0.11);
}

export function FooterDog() {
  const areaRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLButtonElement>(null);
  const currentXRef = useRef(0);
  const bubbleTimerRef = useRef<number | undefined>(undefined);
  const moveControls = useAnimationControls();
  const jumpControls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const [moving, setMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const area = areaRef.current;
    const dog = dogRef.current;
    if (!area || !dog) return;

    let cancelled = false;
    let wanderTimer: number | undefined;

    const clampPosition = () => {
      const min = 8;
      const max = Math.max(min, area.clientWidth - dog.offsetWidth - 8);
      currentXRef.current = Math.max(min, Math.min(max, currentXRef.current));
      moveControls.set({ x: currentXRef.current });
    };

    const chooseDestination = async () => {
      if (cancelled || reduceMotion) return;
      const min = 8;
      const max = Math.max(min, area.clientWidth - dog.offsetWidth - 8);
      const range = max - min;
      let target = min + Math.random() * range;

      if (range > 100 && Math.abs(target - currentXRef.current) < Math.min(80, range * 0.34)) {
        target = currentXRef.current < min + range / 2
          ? max - Math.random() * range * 0.12
          : min + Math.random() * range * 0.12;
      }

      const distance = Math.abs(target - currentXRef.current);
      setFacingRight(target > currentXRef.current);
      setMoving(true);
      currentXRef.current = target;

      await moveControls.start({
        x: target,
        transition: {
          duration: Math.max(1.5, Math.min(4.8, distance / 74)),
          ease: "easeInOut",
        },
      });

      if (cancelled) return;
      setMoving(false);
      wanderTimer = window.setTimeout(chooseDestination, 900 + Math.random() * 1900);
    };

    const startPosition = () => {
      const max = Math.max(8, area.clientWidth - dog.offsetWidth - 8);
      currentXRef.current = Math.max(8, (max + 8) / 2);
      moveControls.set({ x: currentXRef.current });
      if (!reduceMotion) wanderTimer = window.setTimeout(chooseDestination, 650);
    };

    const observer = new ResizeObserver(clampPosition);
    observer.observe(area);
    startPosition();

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(wanderTimer);
      moveControls.stop();
    };
  }, [moveControls, reduceMotion]);

  useEffect(() => () => window.clearTimeout(bubbleTimerRef.current), []);

  const interact = () => {
    playBark();
    setShowBubble(true);
    window.clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(() => setShowBubble(false), 1050);

    const areaBox = areaRef.current?.getBoundingClientRect();
    const walkerBox = walkerRef.current?.getBoundingClientRect();
    if (areaBox && walkerBox) {
      currentXRef.current = walkerBox.left - areaBox.left;
      moveControls.stop();
      moveControls.set({ x: currentXRef.current });
      setMoving(false);
    }

    jumpControls.stop();
    void jumpControls.start({
      y: reduceMotion ? [0, -6, 0] : [0, -40, 0, -7, 0],
      rotate: reduceMotion ? [0, 0, 0] : [0, -4, 3, -1, 0],
      transition: {
        duration: reduceMotion ? 0.22 : 0.62,
        ease: [0.22, 1, 0.36, 1],
        times: reduceMotion ? [0, 0.5, 1] : [0, 0.3, 0.62, 0.8, 1],
      },
    });
  };

  return (
    <div ref={areaRef} className={styles.area}>
      <motion.div
        ref={walkerRef}
        className={styles.walker}
        animate={moveControls}
        initial={false}
      >
        <motion.button
          ref={dogRef}
          type="button"
          className={styles.dogButton}
          animate={jumpControls}
          initial={false}
          onClick={interact}
          aria-label="Play with the wandering pixel dog"
        >
          <span
            className={`${styles.bubble} ${showBubble ? styles.bubbleVisible : ""}`}
            aria-hidden="true"
          >
            woof woof!
          </span>
          <span
            className={`${styles.sprite} ${moving ? styles.spriteMoving : ""}`}
            style={{ "--dog-face": facingRight ? -1 : 1 } as React.CSSProperties}
            aria-hidden="true"
          />
        </motion.button>
      </motion.div>
      <span className={styles.hint}>click to say hi</span>
    </div>
  );
}
