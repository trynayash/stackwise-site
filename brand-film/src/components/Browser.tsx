import React from "react";
import { Img, staticFile } from "remotion";
import { color, font, mediaShadow } from "../lib/theme";

/**
 * A plain browser frame around a real screenshot, the same device the site's hero stage uses: light chrome,
 * the domain in mono, three dots, a soft deep shadow. The frame is 16:10 like the screenshots, so nothing is cropped.
 */
export const Browser: React.FC<{
  src: string;
  domain: string;
  width: number;
  /** 0 → 1: the page zooms in very slowly (1 → 1.045) from its top edge, the film's "camera". */
  zoom?: number;
  style?: React.CSSProperties;
}> = ({ src, domain, width, zoom = 0, style }) => {
  const bar = Math.round(width * 0.045);
  const radius = Math.round(width * 0.018);
  const imgHeight = Math.round(width * 0.625);
  const height = bar + imgHeight;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "#fff",
        boxShadow: mediaShadow,
        outline: `1px solid ${color.lineStrong}`,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          height: bar,
          display: "flex",
          alignItems: "center",
          gap: bar * 0.3,
          padding: `0 ${bar * 0.45}px`,
          background: "#f4f4f1",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          fontFamily: font.mono,
          fontSize: bar * 0.34,
          color: "rgba(11,11,11,0.65)",
          letterSpacing: "0.02em",
        }}
      >
        <span style={{ display: "flex", gap: bar * 0.16 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: bar * 0.22, height: bar * 0.22, borderRadius: "50%", background: "rgba(11,11,11,0.18)" }} />
          ))}
        </span>
        <span style={{ marginLeft: bar * 0.3 }}>{domain}</span>
      </div>
      <div style={{ position: "relative", height: height - bar, overflow: "hidden" }}>
        <Img
          src={staticFile(src)}
          style={{ display: "block", width, height: imgHeight, objectFit: "cover", transform: `scale(${1 + zoom * 0.045})`, transformOrigin: "50% 0%" }}
        />
      </div>
    </div>
  );
};
