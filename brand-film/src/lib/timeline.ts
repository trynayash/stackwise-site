/**
 * Scene timings in frames at 30 fps. The voiceover (VOICEOVER.md) is cut to these same marks.
 * Each scene gets `overlap` extra frames under the next one so the next scene's wipe has something to cover.
 */
export const FPS = 30;
export const OVERLAP = 18;

export const scenes = {
  hook: { from: 0, to: 150 }, //        0.0s –  5.0s
  complexity: { from: 150, to: 330 }, // 5.0s – 11.0s
  reveal: { from: 330, to: 510 }, //   11.0s – 17.0s
  showcase: { from: 510, to: 810 }, // 17.0s – 27.0s
  process: { from: 810, to: 1020 }, // 27.0s – 34.0s
  promise: { from: 1020, to: 1200 }, // 34.0s – 40.0s
  outro: { from: 1200, to: 1320 }, //  40.0s – 44.0s
} as const;

export const DURATION = scenes.outro.to; // 1320 frames = 44 s

export const seconds = (s: number) => Math.round(s * FPS);
