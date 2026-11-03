import React from "react";
import { useCurrentFrame } from "remotion";
import { color, font } from "../lib/theme";
import { ease, lerp, linear, snap } from "../lib/motion";

const LETTERS = "STACKWISE".split("");

/**
 * The site's wordmark: "STACK" in the ink/white, "WISE" in the accent, set in Oughter. Each letter rises from
 * behind the baseline with a short stagger and a slight overshoot, then a thin accent rule draws underneath.
 */
export const Wordmark: React.FC<{
  size: number;
  at: number;
  tone?: "light" | "dark";
  rule?: boolean;
  stagger?: number;
  style?: React.CSSProperties;
}> = ({ size, at, tone = "light", rule = false, stagger = 2, style }) => {
  const frame = useCurrentFrame();
  const r = ease(frame, at + LETTERS.length * stagger + 6, 28);
  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <div
        style={{
          fontFamily: font.display,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: tone === "light" ? color.white : color.ink,
          whiteSpace: "nowrap",
          userSelect: "none",
          display: "flex",
        }}
      >
        {LETTERS.map((ch, i) => {
          const t = ease(frame, at + i * stagger, 30, snap);
          const f = ease(frame, at + i * stagger, 10, linear);
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", padding: "0.05em 0 0.08em", margin: "-0.05em 0 -0.08em" }}>
              <span
                style={{
                  display: "inline-block",
                  color: i >= 5 ? color.accent : undefined,
                  opacity: f,
                  transform: `translateY(${lerp(t, 105, 0)}%)`,
                }}
              >
                {ch}
              </span>
            </span>
          );
        })}
      </div>
      {rule && (
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: -size * 0.14,
            height: Math.max(4, size * 0.04),
            width: "100%",
            background: color.accent,
            transform: `scaleX(${r})`,
            transformOrigin: "left center",
          }}
        />
      )}
    </div>
  );
};
