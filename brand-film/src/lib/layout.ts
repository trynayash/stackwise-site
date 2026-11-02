import { useVideoConfig } from "remotion";

/**
 * One layout object per format. Vertical (9:16) keeps the top 220px and bottom 340px free of anything that
 * matters, so social UI (captions, progress, buttons) never covers copy. Horizontal is 16:9 title-safe.
 */
export function useLayout() {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return {
    width,
    height,
    portrait,
    gutter: portrait ? 72 : 112,
    safeTop: portrait ? 220 : 96,
    safeBottom: portrait ? 340 : 96,
    /** Headline size for a 3–4 line statement. */
    h1: portrait ? 108 : 150,
    h2: portrait ? 76 : 104,
    body: portrait ? 36 : 40,
    eyebrow: portrait ? 24 : 24,
    wordmark: portrait ? 140 : 200,
  };
}

export type Layout = ReturnType<typeof useLayout>;
