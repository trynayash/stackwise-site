import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ease, inOut, lerp } from "../lib/motion";

/**
 * Scene container that enters as a panel pushed in from one edge (background and copy move as one surface, like
 * the site's panels).
 */
export const Wipe: React.FC<{
  children: React.ReactNode;
  background: string;
  at?: number;
  dur?: number;
  from?: "bottom" | "top" | "left" | "right" | "none";
  style?: React.CSSProperties;
}> = ({ children, background, at = 0, dur = 24, from = "bottom", style }) => {
  const frame = useCurrentFrame();
  const t = from === "none" ? 1 : ease(frame, at, dur, inOut);
  const p = lerp(t, 100, 0);
  const transform =
    from === "bottom" ? `translateY(${p}%)` : from === "top" ? `translateY(${-p}%)` : from === "left" ? `translateX(${-p}%)` : from === "right" ? `translateX(${p}%)` : "none";
  return (
    <AbsoluteFill style={{ background, transform, ...style }}>
      {children}
    </AbsoluteFill>
  );
};

/**
 * Wraps a scene's content so that, during the frames it is being covered by the next panel, it travels the
 * same way as that panel at a third of the speed and dims a little: a push, with nothing behind it ever exposed.
 */
export const Outgoing: React.FC<{ children: React.ReactNode; length: number; overlap: number; next: "bottom" | "top" | "left" | "right" }> = ({ children, length, overlap, next }) => {
  const frame = useCurrentFrame();
  const t = ease(frame, length - overlap, overlap, inOut);
  const d = lerp(t, 0, 33);
  const transform = next === "bottom" ? `translateY(${-d}%)` : next === "top" ? `translateY(${d}%)` : next === "right" ? `translateX(${-d}%)` : `translateX(${d}%)`;
  return <AbsoluteFill style={{ transform, filter: `brightness(${lerp(t, 1, 0.88)})` }}>{children}</AbsoluteFill>;
};
