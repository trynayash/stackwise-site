import React from "react";
import { useCurrentFrame } from "remotion";
import { color, font } from "../lib/theme";
import { ease, lerp } from "../lib/motion";

/**
 * The site's wordmark: "STACK" in the ink/white, "WISE" in the accent, set in Oughter.
 * Reveals with a left-to-right mask, then a thin accent rule underlines it.
 */
export const Wordmark: React.FC<{
  size: number;
  at: number;
  tone?: "light" | "dark";
  rule?: boolean;
  style?: React.CSSProperties;
}> = ({ size, at, tone = "light", rule = false, style }) => {
  const frame = useCurrentFrame();
  const t = ease(frame, at, 34);
  const r = ease(frame, at + 22, 26);
  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <div
        style={{
          fontFamily: font.display,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: tone === "light" ? color.white : color.ink,
          clipPath: `inset(-10% ${lerp(t, 100, -2)}% -10% -2%)`,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        STACK<span style={{ color: color.accent }}>WISE</span>
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
