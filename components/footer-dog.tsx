"use client";

import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./footer-dog.module.css";

let barkContext: AudioContext | null = null;

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type Point = { x: number; y: number };
type Bounds = { minX: number; maxX: number; minY: number; maxY: number };
type CollisionRect = { left: number; right: number; top: number; bottom: number };
type MoveMode = "wander" | "command";

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
  const currentPositionRef = useRef<Point>({ x: 0, y: 0 });
  const standTimerRef = useRef<number | undefined>(undefined);
  const interactingRef = useRef(false);
  const inViewRef = useRef(false);
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const wanderZoneRef = useRef<Bounds | null>(null);
  const pauseMotionRef = useRef<() => void>(() => undefined);
  const resumeMotionRef = useRef<() => void>(() => undefined);
  const commandMotionRef = useRef<(point: Point) => void>(() => undefined);
  const moveAnimationsRef = useRef<Array<{ stop: () => void }>>([]);
  const walkerX = useMotionValue(0);
  const walkerY = useMotionValue(0);
  const reactionControls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [moving, setMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(false);
  const [standing, setStanding] = useState(false);
  const [greetingSuppressed, setGreetingSuppressed] = useState(false);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    const area = areaRef.current;
    const dog = dogRef.current;
    const walker = walkerRef.current;
    const footer = area?.closest("footer");
    if (!area || !dog || !walker || !footer) return;

    let cancelled = false;
    let wanderTimer: number | undefined;
    let motionVersion = 0;

    const stopAnimations = () => {
      moveAnimationsRef.current.forEach((animation) => animation.stop());
      moveAnimationsRef.current = [];
    };

    const fullBounds = (): Bounds => {
      const minX = 8;
      const minY = 8;
      return {
        minX,
        maxX: Math.max(minX, area.clientWidth - walker.offsetWidth - 8),
        minY,
        maxY: Math.max(minY, area.clientHeight - walker.offsetHeight - 8),
      };
    };

    const clampPoint = (point: Point, bounds = fullBounds()): Point => ({
      x: Math.max(bounds.minX, Math.min(bounds.maxX, point.x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, point.y)),
    });

    const textObstacles = (): CollisionRect[] => {
      const areaBox = area.getBoundingClientRect();
      return Array.from(footer.querySelectorAll<HTMLElement>("h2, p, dt, dd, li"))
        .map((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          const box = range.getBoundingClientRect();
          range.detach();
          return {
            left: box.left - areaBox.left,
            right: box.right - areaBox.left,
            top: box.top - areaBox.top,
            bottom: box.bottom - areaBox.top,
          };
        })
        .filter((box) => box.right > box.left && box.bottom > box.top);
    };

    const isSafePoint = (point: Point, obstacles = textObstacles()) => {
      const padding = 12;
      const dogRight = point.x + walker.offsetWidth;
      const dogBottom = point.y + walker.offsetHeight;
      return obstacles.every(
        (box) =>
          dogRight + padding <= box.left ||
          point.x - padding >= box.right ||
          dogBottom + padding <= box.top ||
          point.y - padding >= box.bottom,
      );
    };

    const isSafePath = (from: Point, to: Point, obstacles: CollisionRect[]) => {
      const distance = Math.hypot(to.x - from.x, to.y - from.y);
      const steps = Math.max(1, Math.ceil(distance / 22));
      let reachedSafeSpace = isSafePoint(from, obstacles);

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        const point = {
          x: from.x + (to.x - from.x) * progress,
          y: from.y + (to.y - from.y) * progress,
        };
        const safe = isSafePoint(point, obstacles);
        if (safe) reachedSafeSpace = true;
        else if (reachedSafeSpace) return false;
      }

      return reachedSafeSpace;
    };

    const makeWanderZone = (center: Point): Bounds => {
      const bounds = fullBounds();
      const radiusX = Math.min(240, Math.max(130, area.clientWidth * 0.22));
      const radiusY = Math.min(150, Math.max(82, area.clientHeight * 0.18));
      return {
        minX: Math.max(bounds.minX, center.x - radiusX),
        maxX: Math.min(bounds.maxX, center.x + radiusX),
        minY: Math.max(bounds.minY, center.y - radiusY),
        maxY: Math.min(bounds.maxY, center.y + radiusY),
      };
    };

    const readCurrentPosition = () =>
      clampPoint({ x: walkerX.get(), y: walkerY.get() });

    const stopAtCurrentPosition = () => {
      motionVersion += 1;
      currentPositionRef.current = readCurrentPosition();
      stopAnimations();
      walkerX.set(currentPositionRef.current.x);
      walkerY.set(currentPositionRef.current.y);
      setMoving(false);
    };

    const canAnimate = () =>
      !cancelled &&
      !reduceMotion &&
      inViewRef.current &&
      !hoveredRef.current &&
      !draggingRef.current &&
      !interactingRef.current;

    function scheduleWander(delay = 0) {
      window.clearTimeout(wanderTimer);
      if (!canAnimate()) return;
      wanderTimer = window.setTimeout(chooseDestination, delay);
    }

    const moveTo = (nextTarget: Point, mode: MoveMode) => {
      if (cancelled || draggingRef.current || interactingRef.current) return;
      if (mode !== "command" && !canAnimate()) return;

      const movementBounds =
        mode === "wander" ? (wanderZoneRef.current ?? fullBounds()) : fullBounds();
      const target = clampPoint(nextTarget, movementBounds);
      const current = readCurrentPosition();
      const distance = Math.hypot(target.x - current.x, target.y - current.y);

      if (distance < 3) {
        if (mode === "command") {
          wanderZoneRef.current = makeWanderZone(target);
          setMoving(false);
          scheduleWander(1000);
        } else {
          scheduleWander(24);
        }
        return;
      }

      const version = ++motionVersion;
      if (Math.abs(target.x - current.x) > 2) setFacingRight(target.x > current.x);
      currentPositionRef.current = target;

      if (mode === "command") wanderZoneRef.current = makeWanderZone(target);

      if (reduceMotion) {
        walkerX.set(target.x);
        walkerY.set(target.y);
        setMoving(false);
        if (mode === "command") scheduleWander(1000);
        return;
      }

      setMoving(true);
      stopAnimations();

      const transition = {
        duration: Math.max(0.52, Math.min(3.6, distance / 112)),
        ease: [0.45, 0, 0.55, 1] as const,
      };
      let completedAxes = 0;
      const completeAxis = () => {
        completedAxes += 1;
        if (completedAxes < 2 || version !== motionVersion || !canAnimate()) return;
        if (mode === "command") {
          setMoving(false);
          scheduleWander(1000);
        } else {
          scheduleWander(24);
        }
      };

      moveAnimationsRef.current = [
        animate(walkerX, target.x, { ...transition, onComplete: completeAxis }),
        animate(walkerY, target.y, { ...transition, onComplete: completeAxis }),
      ];
    };

    const chooseDestination = () => {
      if (!canAnimate()) return;

      const bounds = wanderZoneRef.current ?? fullBounds();
      const rangeX = bounds.maxX - bounds.minX;
      const rangeY = bounds.maxY - bounds.minY;
      const current = readCurrentPosition();
      const obstacles = textObstacles();
      let target: Point | null = null;

      for (let attempt = 0; attempt < 64; attempt += 1) {
        const verticalStep = Math.min(46, Math.max(22, rangeY * 0.32));
        const candidate = {
          x: bounds.minX + Math.random() * rangeX,
          y: Math.max(
            bounds.minY,
            Math.min(bounds.maxY, current.y + (Math.random() * 2 - 1) * verticalStep),
          ),
        };
        if (
          Math.hypot(candidate.x - current.x, candidate.y - current.y) >= 54 &&
          isSafePoint(candidate, obstacles) &&
          isSafePath(current, candidate, obstacles)
        ) {
          target = candidate;
          break;
        }
      }

      if (!target) {
        scheduleWander(320);
        return;
      }
      moveTo(target, "wander");
    };

    const clampPosition = () => {
      currentPositionRef.current = clampPoint(currentPositionRef.current);
      walkerX.set(currentPositionRef.current.x);
      walkerY.set(currentPositionRef.current.y);
      wanderZoneRef.current = makeWanderZone(currentPositionRef.current);
    };

    const startPosition = () => {
      const bounds = fullBounds();
      const areaBox = area.getBoundingClientRect();
      const timeBox = footer
        .querySelector<HTMLElement>("[data-footer-time]")
        ?.getBoundingClientRect();
      const start = clampPoint({
        x: Math.max(bounds.minX, bounds.maxX - 24),
        y: timeBox
          ? timeBox.top - areaBox.top - walker.offsetHeight * 0.46
          : bounds.maxY - 24,
      });

      currentPositionRef.current = start;
      wanderZoneRef.current = makeWanderZone(start);
      walkerX.set(start.x);
      walkerY.set(start.y);
    };

    const pauseForHover = () => {
      if (draggingRef.current) return;
      hoveredRef.current = true;
      window.clearTimeout(wanderTimer);
      stopAtCurrentPosition();
    };

    const resumeAfterHover = () => {
      hoveredRef.current = false;
      if (!draggingRef.current && !interactingRef.current) scheduleWander(24);
    };

    resumeMotionRef.current = () => {
      if (!hoveredRef.current) scheduleWander(24);
    };
    pauseMotionRef.current = stopAtCurrentPosition;
    commandMotionRef.current = (point) => {
      window.clearTimeout(wanderTimer);
      moveTo(point, "command");
    };

    const walkToFooterClick = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      if (mouseEvent.button !== 0 || mouseEvent.defaultPrevented) return;
      const target = mouseEvent.target;
      if (
        target instanceof Element &&
        target.closest("a, button, input, textarea, select, label, [role='button']")
      ) return;
      if (window.getSelection()?.toString()) return;

      const areaBox = area.getBoundingClientRect();
      const point = {
        x: mouseEvent.clientX - areaBox.left - walker.offsetWidth / 2,
        y: mouseEvent.clientY - areaBox.top - walker.offsetHeight / 2,
      };
      if (!isSafePoint(clampPoint(point))) return;
      commandMotionRef.current(point);
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
    footer.addEventListener("click", walkToFooterClick);
    dog.addEventListener("pointerenter", pauseForHover);
    dog.addEventListener("pointerleave", resumeAfterHover);
    startPosition();

    return () => {
      cancelled = true;
      pauseMotionRef.current = () => undefined;
      resumeMotionRef.current = () => undefined;
      commandMotionRef.current = () => undefined;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      footer.removeEventListener("click", walkToFooterClick);
      dog.removeEventListener("pointerenter", pauseForHover);
      dog.removeEventListener("pointerleave", resumeAfterHover);
      window.clearTimeout(wanderTimer);
      stopAnimations();
    };
  }, [reduceMotion, walkerX, walkerY]);

  useEffect(
    () => () => {
      window.clearTimeout(standTimerRef.current);
    },
    [],
  );

  const interact = () => {
    if (didDragRef.current) return;

    setGreetingSuppressed(true);
    interactingRef.current = true;
    playBark();
    setStanding(true);
    pauseMotionRef.current();
    window.clearTimeout(standTimerRef.current);
    standTimerRef.current = window.setTimeout(() => {
      setStanding(false);
      interactingRef.current = false;
      resumeMotionRef.current();
    }, 920);

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
  };

  const prepareDrag = () => {
    setGreetingSuppressed(true);
    pauseMotionRef.current();
    const areaBox = areaRef.current?.getBoundingClientRect();
    const walkerBox = walkerRef.current?.getBoundingClientRect();
    if (!areaBox || !walkerBox) return;

    const x = walkerX.get();
    const y = walkerY.get();
    setDragBounds({
      left: x + areaBox.left + 8 - walkerBox.left,
      right: x + areaBox.right - 8 - walkerBox.right,
      top: y + areaBox.top + 8 - walkerBox.top,
      bottom: y + areaBox.bottom - 8 - walkerBox.bottom,
    });
  };

  const finishDrag = () => {
    dogRef.current?.blur();
    const areaBox = areaRef.current?.getBoundingClientRect();
    const walkerBox = walkerRef.current?.getBoundingClientRect();
    if (areaBox && walkerBox) {
      const minX = 8;
      const minY = 8;
      const maxX = Math.max(minX, areaBox.width - walkerBox.width - 8);
      const maxY = Math.max(minY, areaBox.height - walkerBox.height - 8);
      const position = {
        x: Math.max(minX, Math.min(maxX, walkerBox.left - areaBox.left)),
        y: Math.max(minY, Math.min(maxY, walkerBox.top - areaBox.top)),
      };
      currentPositionRef.current = position;
      const radiusX = Math.min(240, Math.max(130, areaBox.width * 0.22));
      const radiusY = Math.min(150, Math.max(82, areaBox.height * 0.18));
      wanderZoneRef.current = {
        minX: Math.max(minX, position.x - radiusX),
        maxX: Math.min(maxX, position.x + radiusX),
        minY: Math.max(minY, position.y - radiusY),
        maxY: Math.min(maxY, position.y + radiusY),
      };
      walkerX.set(position.x);
      walkerY.set(position.y);
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
        style={{ x: walkerX, y: walkerY }}
        initial={false}
        drag
        dragConstraints={dragBounds}
        dragMomentum={false}
        dragElastic={0.04}
        whileDrag={{ scale: 1.04, zIndex: 10 }}
        onPointerDown={prepareDrag}
        onDragStart={startDrag}
        onDragEnd={finishDrag}
      >
        <motion.button
          ref={dogRef}
          type="button"
          className={classNames(
            styles.dogButton,
            moving && !standing && styles.dogButtonMoving,
            standing && styles.dogButtonStanding,
          )}
          animate={reactionControls}
          initial={false}
          onClick={interact}
          onPointerLeave={() => setGreetingSuppressed(false)}
          onBlur={() => setGreetingSuppressed(false)}
          aria-label="Play with or drag Pom Pom, the wandering pixel dog"
        >
          <span
            className={classNames(
              styles.greeting,
              greetingSuppressed && styles.greetingSuppressed,
            )}
            aria-hidden="true"
          >
            Hi I am pom pom
          </span>
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
