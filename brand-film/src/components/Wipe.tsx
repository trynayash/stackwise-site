import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ease } from "../lib/motion";

/**
 * Scene container that enters with a full-bleed wipe (the whole scene is clipped, so copy and background move
 * as one surface, the way the site's panels do). `from` is the wipe direction.
 */
export const Wipe: React.FC<{
  children: React.ReactNode;
  background: string;
  at?: number;
  dur?: number;
  from?: "bottom" | "top" | "left" | "right" | "none";
  style?: React.CSSProperties;
}> = ({ children, background, at = 0, dur = 22, from = "bottom", style }) => {
  const frame = useCurrentFrame();
  const t = from === "none" ? 1 : ease(frame, at, dur);
  const p = (1 - t) * 100;
  const clip =
    from === "bottom" ? `inset(${p}% 0 0 0)` : from === "top" ? `inset(0 0 ${p}% 0)` : from === "left" ? `inset(0 ${p}% 0 0)` : from === "right" ? `inset(0 0 0 ${p}%)` : "none";
  return (
    <AbsoluteFill style={{ background, clipPath: clip, ...style }}>
      {children}
    </AbsoluteFill>
  );
};
