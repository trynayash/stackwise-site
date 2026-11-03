import React from "react";
import { Img, staticFile } from "remotion";
import { color, font, mediaShadow } from "../lib/theme";

/**
 * A plain browser frame around a real screenshot, the same device the site's hero stage uses: light chrome,
 * the domain in mono, three dots, a soft deep shadow. The frame is 16:10; a taller page (aspect > 0.625) can
 * scroll inside it with `pan` (pixels of page moved up), and `zoom` pushes in very slowly from the top edge.
 */
export const Browser: React.FC<{
  src: string;
  domain: string;
  width: number;
  /** Page height / width of the screenshot. Default 0.625 (1600×1000). */
  aspect?: number;
  pan?: number;
  zoom?: number;
  style?: React.CSSProperties;
}> = ({ src, domain, width, aspect = 0.625, pan = 0, zoom = 0, style }) => {
  const bar = Math.round(width * 0.045);
  const radius = Math.round(width * 0.018);
  const viewH = Math.round(width * 0.625);
  const imgH = Math.round(width * aspect);
  const height = bar + viewH;
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
      <div style={{ position: "relative", height: viewH, overflow: "hidden" }}>
        <Img
          src={staticFile(src)}
          style={{
            display: "block",
            width,
            height: imgH,
            objectFit: "cover",
            transform: `translateY(${-Math.min(pan, Math.max(0, imgH - viewH))}px) scale(${1 + zoom * 0.04})`,
            transformOrigin: "50% 0%",
          }}
        />
      </div>
    </div>
  );
};
