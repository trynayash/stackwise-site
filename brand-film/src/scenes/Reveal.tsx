import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Wordmark } from "../components/Wordmark";
import { Eyebrow, Words } from "../components/Type";
import { color, site, WORDMARK_RATIO } from "../lib/theme";
import { drift, ease, inOut, lerp } from "../lib/motion";
import { useLayout } from "../lib/layout";
import { layers } from "./Complexity";

/**
 * 11–17 s. The squared-up pile compresses into one accent bar (the work, done), the bar snaps to the
 * wordmark's underline width, and STACKWISE unmasks above it. Then the line: "Your idea. Engineered into a product."
 */
export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const rowH = L.portrait ? 128 : 112;
  const gap = L.portrait ? 16 : 14;
  const stackW = L.portrait ? L.width - L.gutter * 2 : 1040;
  const stackLeft = L.portrait ? L.gutter : L.width - L.gutter - stackW;
  const stackTop = L.portrait ? L.height * 0.42 : (L.height - (rowH + gap) * layers.length) / 2 + 20;

  const collapse = ease(frame, 0, 26, inOut); // six rows → one thin bar
  const barY = L.portrait ? L.height * 0.5 : L.height * 0.52;
  const toLime = ease(frame, 18, 10);
  const barW = L.wordmark * WORDMARK_RATIO; // the wordmark's rendered width
  const barLeft = L.portrait ? L.gutter : (L.width - barW) / 2;
  const move = ease(frame, 26, 24, inOut); // bar travels to its underline position
  const wmTop = barY - L.wordmark * 1.05;
  const lift = ease(frame, 96, 30, inOut); // wordmark and rule lift to make room for the line
  const liftPx = L.portrait ? -L.height * 0.14 : -L.height * 0.17;
  const fadeStack = 1 - ease(frame, 4, 18);

  return (
    <AbsoluteFill style={{ background: color.canvas }}>
      <AbsoluteFill style={{ transform: `scale(${drift(frame, 180, 1, 1.03)})`, transformOrigin: "50% 45%" }}>
        {/* The pile from the previous scene, collapsing. */}
        {layers.map((layer, i) => {
          const y0 = stackTop + i * (rowH + gap);
          const y = lerp(collapse, y0, barY - 4);
          const h = lerp(collapse, rowH, 8);
          return (
            <div
              key={layer.name}
              style={{
                position: "absolute",
                left: lerp(move, stackLeft, barLeft),
                top: y,
                width: lerp(move, stackW, barW),
                height: h,
                borderRadius: lerp(collapse, 22, 2),
                background: toLime > 0.5 ? color.accent : color.surface,
                border: `1px solid ${toLime > 0.5 ? color.accent : color.lineStrong}`,
                opacity: i === 0 ? 1 : fadeStack,
                transform: `translateY(${lift * liftPx + (i === 0 ? L.wordmark * 0.12 : 0)}px)`,
              }}
            />
          );
        })}

        <div style={{ position: "absolute", left: barLeft, top: wmTop, transform: `translateY(${lift * liftPx}px)` }}>
          <Wordmark size={L.wordmark} at={44} />
        </div>
        <div style={{ position: "absolute", left: barLeft, top: barY + L.wordmark * 0.3, transform: `translateY(${lift * liftPx}px)` }}>
          <Eyebrow at={62} size={L.eyebrow}>
            {site.eyebrow}
          </Eyebrow>
        </div>

        <div style={{ position: "absolute", left: barLeft, width: L.portrait ? L.width - L.gutter * 2 : barW + 40, top: L.portrait ? L.height * 0.46 : L.height * 0.5, opacity: lift }}>
          <Words
            lines={L.portrait ? ["Your idea.", "Engineered", "into a product."] : ["Your idea. Engineered", "into a product."]}
            text=""
            at={112}
            stagger={3}
            size={L.portrait ? 96 : 104}
            mark="Engineered"
            markAt={150}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
