import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Eyebrow, Words } from "../components/Type";
import { color, font, site } from "../lib/theme";
import { drift, ease, lerp } from "../lib/motion";
import { useLayout } from "../lib/layout";

/**
 * 0–5 s. The site's paper opening panel. A text caret blinks in the empty space, then the line rises in,
 * word by word, and the accent marker lands on "an idea." as the voice says it.
 */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const caretOn = frame < 26 && Math.floor(frame / 9) % 2 === 0;
  const caretOut = ease(frame, 24, 8);
  const lines = L.portrait ? ["Every great", "digital product", "starts with", "an idea."] : ["Every great digital", "product starts", "with an idea."];

  return (
    <AbsoluteFill style={{ background: color.paper, color: color.ink }}>
      <AbsoluteFill style={{ transform: `scale(${drift(frame, 150, 1, 1.025)})`, transformOrigin: "40% 55%" }}>
        <div style={{ position: "absolute", left: L.gutter, right: L.gutter, top: L.safeTop + (L.portrait ? 120 : 40) }}>
          <Eyebrow tone="dark" at={6} size={L.eyebrow}>
            {site.eyebrow}
          </Eyebrow>
        </div>
        <div style={{ position: "absolute", left: L.gutter, right: L.gutter, top: L.portrait ? L.height * 0.33 : L.height * 0.27 }}>
          {/* Blinking caret: the empty page before the idea is written down. */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: Math.round(L.h1 * 0.075),
              height: L.h1 * 0.92,
              background: color.ink,
              opacity: caretOn ? 1 : 0,
              transform: `scaleY(${1 - caretOut})`,
              transformOrigin: "top",
            }}
          />
          <Words lines={lines} text="" at={30} stagger={3} dur={24} size={L.h1} color={color.ink} mark="an idea." markAt={92} />
        </div>
        <div
          style={{
            position: "absolute",
            left: L.gutter,
            right: L.gutter,
            bottom: L.safeBottom,
            borderTop: "1px solid rgba(11,11,11,0.15)",
            paddingTop: 22,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: font.mono,
            fontSize: L.portrait ? 20 : 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(11,11,11,0.55)",
            opacity: ease(frame, 60, 30),
          }}
        >
          <span>{site.url}</span>
          <span style={{ opacity: lerp(ease(frame, 70, 30), 0, 1) }}>Brand film / 2026</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
