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
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const freePositionRef = useRef(false);
  const resumeMotionRef = useRef<() => void>(() => undefined);
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
    let followIdleTimer: number | undefined;
    let motionVersion = 0;
    let followingPointer = false;

    const bounds = () => {
      const min = 8;
      if (freePositionRef.current) {
        const areaBox = area.getBoundingClientRect();
        return {
          min: -areaBox.left + 8,
          max: window.innerWidth - areaBox.left - dog.offsetWidth - 8,
        };
      }

      const max = Math.max(min, area.clientWidth - dog.offsetWidth - 8);
      return { min, max };
    };

    const clampTarget = (target: number) => {
      const { min, max } = bounds();
      return Math.max(min, Math.min(max, target));
    };

    const readCurrentPosition = () => {
      const areaBox = area.getBoundingClientRect();
      const walkerBox = walkerRef.current?.getBoundingClientRect();
      return clampTarget(walkerBox ? walkerBox.left - areaBox.left : currentXRef.current);
    };

    const stopAtCurrentPosition = () => {
      motionVersion += 1;
      currentXRef.current = readCurrentPosition();
      moveControls.stop();
      moveControls.set({ x: currentXRef.current });
      setMoving(false);
    };

    const canMove = () =>
      !cancelled &&
      !reduceMotion &&
      inViewRef.current &&
      !hoveredRef.current &&
      !draggingRef.current &&
      !interactingRef.current;

    function scheduleWander(delay = 0) {
      window.clearTimeout(wanderTimer);
      if (!canMove() || followingPointer) return;
      wanderTimer = window.setTimeout(chooseDestination, delay);
    }

    const moveTo = (nextTarget: number, mode: "wander" | "follow") => {
      if (!canMove()) return;

      const target = clampTarget(nextTarget);
      const current = readCurrentPosition();
      const distance = Math.abs(target - current);

      if (distance < 3) {
        if (mode === "wander") scheduleWander(24);
        return;
      }

      const version = ++motionVersion;
      setFacingRight(target > current);
      setMoving(true);
      currentXRef.current = target;

      void moveControls
        .start({
          x: target,
          transition:
            mode === "follow"
              ? { type: "spring", stiffness: 105, damping: 19, mass: 0.72 }
              : {
                  duration: Math.max(1.25, Math.min(4.4, distance / 78)),
                  ease: [0.45, 0, 0.55, 1],
                },
        })
        .then(() => {
          if (version !== motionVersion || !canMove()) return;
          if (!followingPointer) scheduleWander(24);
        });
    };

    const chooseDestination = () => {
      if (!canMove() || followingPointer) return;

      const { min, max } = bounds();
      const range = max - min;
      let target = min + Math.random() * range;

      if (range > 100 && Math.abs(target - currentXRef.current) < Math.min(80, range * 0.34)) {
        target = currentXRef.current < min + range / 2
          ? max - Math.random() * range * 0.12
          : min + Math.random() * range * 0.12;
      }

      moveTo(target, "wander");
    };

    const clampPosition = () => {
      currentXRef.current = clampTarget(currentXRef.current);
      moveControls.set({ x: currentXRef.current });
    };

    const startPosition = () => {
      const { min, max } = bounds();
      currentXRef.current = Math.max(min, (max + min) / 2);
      moveControls.set({ x: currentXRef.current });
    };

    const followPointer = (event: PointerEvent) => {
      if (
        event.pointerType === "touch" ||
        draggingRef.current ||
        interactingRef.current
      ) return;

      const dogBox = dog.getBoundingClientRect();
      const overDog =
        event.clientX >= dogBox.left &&
        event.clientX <= dogBox.right &&
        event.clientY >= dogBox.top &&
        event.clientY <= dogBox.bottom;

      if (overDog) {
        if (!hoveredRef.current) pauseForHover();
        return;
      }

      if (hoveredRef.current) resumeAfterHover();

      const areaBox = area.getBoundingClientRect();
      followingPointer = true;
      window.clearTimeout(wanderTimer);
      window.clearTimeout(followIdleTimer);
      moveTo(event.clientX - areaBox.left - dog.offsetWidth / 2, "follow");

      followIdleTimer = window.setTimeout(() => {
        followingPointer = false;
        scheduleWander(24);
      }, 720);
    };

    const stopFollowingPointer = () => {
      followingPointer = false;
      window.clearTimeout(followIdleTimer);
      scheduleWander(24);
    };

    const pauseForHover = () => {
      if (draggingRef.current) return;
      hoveredRef.current = true;
      followingPointer = false;
      window.clearTimeout(wanderTimer);
      window.clearTimeout(followIdleTimer);
      stopAtCurrentPosition();
    };

    const resumeAfterHover = () => {
      hoveredRef.current = false;
      if (!draggingRef.current && !interactingRef.current) scheduleWander(24);
    };

    resumeMotionRef.current = () => {
      if (!hoveredRef.current) scheduleWander(24);
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
          stopAtCurrentPosition();
          return;
        }

        scheduleWander(80);
      },
      { threshold: 0.04 },
    );
    intersectionObserver.observe(area);
    window.addEventListener("pointermove", followPointer);
    window.addEventListener("blur", stopFollowingPointer);
    document.documentElement.addEventListener("pointerleave", stopFollowingPointer);
    dog.addEventListener("pointerenter", pauseForHover);
    dog.addEventListener("pointerleave", resumeAfterHover);
    startPosition();

    return () => {
      cancelled = true;
      resumeMotionRef.current = () => undefined;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", followPointer);
      window.removeEventListener("blur", stopFollowingPointer);
      document.documentElement.removeEventListener("pointerleave", stopFollowingPointer);
      dog.removeEventListener("pointerenter", pauseForHover);
      dog.removeEventListener("pointerleave", resumeAfterHover);
      window.clearTimeout(wanderTimer);
      window.clearTimeout(followIdleTimer);
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
    if (didDragRef.current) return;

    interactingRef.current = true;
    playBark();
    setStanding(true);
    window.clearTimeout(standTimerRef.current);
    standTimerRef.current = window.setTimeout(() => {
      setStanding(false);
      interactingRef.current = false;
      resumeMotionRef.current();
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

  const startDrag = () => {
    didDragRef.current = true;
    draggingRef.current = true;
    interactingRef.current = false;
    window.clearTimeout(standTimerRef.current);
    setStanding(false);
    moveControls.stop();
    setMoving(false);
  };

  const finishDrag = () => {
    dogRef.current?.blur();
    const areaBox = areaRef.current?.getBoundingClientRect();
    const walkerBox = walkerRef.current?.getBoundingClientRect();
    if (areaBox && walkerBox) {
      freePositionRef.current = true;
      currentXRef.current = Math.max(
        -areaBox.left + 8,
        Math.min(
          window.innerWidth - areaBox.left - walkerBox.width - 8,
          walkerBox.left - areaBox.left,
        ),
      );
      moveControls.set({ x: currentXRef.current });
    }

    draggingRef.current = false;
    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);

    if (!hoveredRef.current) resumeMotionRef.current();
  };

  return (
    <div ref={areaRef} className={styles.area}>
      <motion.div
        ref={walkerRef}
        className={styles.walker}
        animate={moveControls}
        initial={false}
        drag
        dragMomentum={false}
        dragElastic={0.04}
        whileDrag={{ scale: 1.04, zIndex: 10 }}
        onDragStart={startDrag}
        onDragEnd={finishDrag}
      >
        <motion.button
          ref={dogRef}
          type="button"
          className={classNames(styles.dogButton, standing && styles.dogButtonStanding)}
          animate={reactionControls}
          initial={false}
          onClick={interact}
          aria-label="Play with or drag the wandering pixel dog"
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
