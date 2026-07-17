"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./footer-dog.module.css";

let barkContext: AudioContext | null = null;

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

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
  const standTimerRef = useRef<number | undefined>(undefined);
  const interactingRef = useRef(false);
  const inViewRef = useRef(false);
  const moveControls = useAnimationControls();
  const reactionControls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [moving, setMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(false);
  const [standing, setStanding] = useState(false);

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
      if (cancelled || reduceMotion || !inViewRef.current) return;
      if (interactingRef.current) {
        wanderTimer = window.setTimeout(chooseDestination, 220);
        return;
      }

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
          ease: [0.45, 0, 0.55, 1],
        },
      });

      if (cancelled || !inViewRef.current) return;
      setMoving(false);
      wanderTimer = window.setTimeout(chooseDestination, 900 + Math.random() * 1900);
    };

    const startPosition = () => {
      const max = Math.max(8, area.clientWidth - dog.offsetWidth - 8);
      currentXRef.current = Math.max(8, (max + 8) / 2);
      moveControls.set({ x: currentXRef.current });
    };

    const resizeObserver = new ResizeObserver(clampPosition);
    resizeObserver.observe(area);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        inViewRef.current = isVisible;
        setInView(isVisible);
        window.clearTimeout(wanderTimer);

        if (!isVisible) {
          const areaBox = area.getBoundingClientRect();
          const walkerBox = walkerRef.current?.getBoundingClientRect();
          if (walkerBox) currentXRef.current = walkerBox.left - areaBox.left;
          moveControls.stop();
          moveControls.set({ x: currentXRef.current });
          setMoving(false);
          return;
        }

        if (!reduceMotion) wanderTimer = window.setTimeout(chooseDestination, 240);
      },
      { threshold: 0.04 },
    );
    intersectionObserver.observe(area);
    startPosition();

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.clearTimeout(wanderTimer);
      moveControls.stop();
    };
  }, [moveControls, reduceMotion]);

  useEffect(
    () => () => {
      window.clearTimeout(standTimerRef.current);
    },
    [],
  );

  const interact = () => {
    interactingRef.current = true;
    playBark();
    setStanding(true);
    window.clearTimeout(standTimerRef.current);
    standTimerRef.current = window.setTimeout(() => {
      setStanding(false);
      interactingRef.current = false;
    }, 920);

    const areaBox = areaRef.current?.getBoundingClientRect();
    const walkerBox = walkerRef.current?.getBoundingClientRect();
    if (areaBox && walkerBox) {
      currentXRef.current = walkerBox.left - areaBox.left;
      moveControls.stop();
      moveControls.set({ x: currentXRef.current });
      setMoving(false);
    }

    reactionControls.stop();
    void reactionControls.start({
      y: reduceMotion ? [0, -2, 0] : [0, -5, -4, -5, 0],
      rotate: reduceMotion ? [0, 0, 0] : [0, -1.5, 1.2, -0.7, 0],
      scale: reduceMotion ? [1, 1, 1] : [1, 0.985, 1.02, 1.01, 1],
      transition: {
        duration: reduceMotion ? 0.22 : 0.78,
        ease: [0.22, 1, 0.36, 1],
        times: reduceMotion ? [0, 0.5, 1] : [0, 0.18, 0.48, 0.72, 1],
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
          className={classNames(styles.dogButton, standing && styles.dogButtonStanding)}
          animate={reactionControls}
          initial={false}
          onClick={interact}
          aria-label="Play with the wandering pixel dog"
        >
          <span
            className={classNames(
              styles.sprite,
              styles.walkSprite,
              moving && !standing && styles.spriteMoving,
              inView && styles.spriteInView,
            )}
            style={{ "--dog-face": facingRight ? -1 : 1 } as React.CSSProperties}
            aria-hidden="true"
          />
          <span
            className={classNames(styles.sprite, styles.standSprite)}
            style={{ "--dog-face": facingRight ? -1 : 1 } as React.CSSProperties}
            aria-hidden="true"
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
