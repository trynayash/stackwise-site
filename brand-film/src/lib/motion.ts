import { Easing, interpolate } from "remotion";

/** The site's standard curve: fast out, long settle (cubic-bezier(0.16, 1, 0.3, 1)). */
export const settle = Easing.bezier(0.16, 1, 0.3, 1);
/** Symmetric, for things that travel and stop (panels, the bar). */
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);
/** A gentle overshoot for objects that snap into place. */
export const snap = Easing.out(Easing.back(1.25));
export const linear = Easing.linear;
/** Slow in, slow out: the camera. */
export const glide = Easing.bezier(0.4, 0, 0.2, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 over `dur` frames starting at `start`, on the settle curve. */
export const ease = (frame: number, start: number, dur: number, easing = settle) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing });

/** Maps a 0 → 1 progress onto a range. */
export const lerp = (t: number, a: number, b: number) => a + (b - a) * t;

/** Fade 1 → 0 over `dur` frames starting at `start`. */
export const fadeOut = (frame: number, start: number, dur: number) =>
  interpolate(frame, [start, start + dur], [1, 0], { ...clamp, easing: inOut });

/** Slow, barely visible scale drift that keeps a static layout alive (the "camera"), eased so it never reads as mechanical. */
export const drift = (frame: number, dur: number, from = 1, to = 1.035) =>
  interpolate(frame, [0, dur], [from, to], { ...clamp, easing: glide });
