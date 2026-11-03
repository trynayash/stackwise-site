import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Wipe } from "../components/Wipe";
import { Eyebrow, Line, Words } from "../components/Type";
import { color, font } from "../lib/theme";
import { drift, ease, inOut, lerp } from "../lib/motion";
import { useLayout } from "../lib/layout";

/** The layers an idea has to pass through before anyone can use it. Shown in build order. */
export const layers = [
  { name: "UI", detail: "screens, states, empty states" },
  { name: "Frontend", detail: "routing, forms, accessibility" },
  { name: "Backend", detail: "auth, jobs, payments" },
  { name: "APIs", detail: "REST, webhooks, SDKs" },
  { name: "Database", detail: "schema, migrations, backups" },
  { name: "Deployment", detail: "CI, staging, production" },
];

/**
 * 5–11 s. Dark. The six layers drop in one after another, each slightly out of line with the last, so the
 * stack reads as a pile of work. At the end the pile squares up, ready to be compressed into the brand bar.
 */
export const Complexity: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const rowH = L.portrait ? 128 : 112;
  const gap = L.portrait ? 16 : 14;
  const stackW = L.portrait ? L.width - L.gutter * 2 : 1040;
  const stackLeft = L.portrait ? L.gutter : L.width - L.gutter - stackW;
  const stackTop = L.portrait ? L.height * 0.42 : (L.height - (rowH + gap) * layers.length) / 2 + 20;
  const align = ease(frame, 140, 30, inOut); // the pile squares up before the reveal

  return (
    <Wipe background={color.canvas} from="bottom" dur={24}>
      <AbsoluteFill style={{ transform: `scale(${drift(frame, 198, 1, 1.025)})`, transformOrigin: "50% 60%" }}>
        <div style={{ position: "absolute", left: L.gutter, top: L.safeTop + (L.portrait ? 120 : 40) }}>
          <Eyebrow at={16} size={L.eyebrow}>
            From idea to working software
          </Eyebrow>
        </div>
        <div style={{ position: "absolute", left: L.gutter, top: L.portrait ? L.safeTop + 190 : L.height * 0.3, width: L.portrait ? L.width - L.gutter * 2 : 640 }}>
          <Words lines={L.portrait ? ["It takes more", "than code."] : ["It takes", "more than", "code."]} at={26} size={L.portrait ? 88 : L.h2} stagger={3} mark="more than code." />
        </div>
        {!L.portrait && (
          <div style={{ position: "absolute", left: L.gutter, top: L.height * 0.3 + L.h2 * 3.3, fontFamily: font.mono, fontSize: 22, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            <Line at={120}>Six layers of work. One engineer.</Line>
          </div>
        )}

        {layers.map((layer, i) => {
          const at = 20 + i * 13;
          const t = ease(frame, at, 28);
          const jitter = (i % 2 === 0 ? 1 : -1) * (14 + i * 9) * (1 - align);
          const y = stackTop + i * (rowH + gap);
          return (
            <div
              key={layer.name}
              style={{
                position: "absolute",
                left: stackLeft + jitter,
                top: y,
                width: stackW,
                height: rowH,
                borderRadius: 22,
                background: color.surface,
                border: `1px solid ${color.lineStrong}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: `0 ${L.portrait ? 36 : 40}px`,
                opacity: t,
                transform: `translateY(${lerp(t, -48, 0)}px) scale(${lerp(t, 1.03, 1)}) rotate(${lerp(t, i % 2 ? 1.1 : -1.1, 0)}deg)`,
                transformOrigin: "left center",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
                <span style={{ fontFamily: font.mono, fontSize: 20, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>0{i + 1}</span>
                <span style={{ fontFamily: font.sans, fontSize: L.portrait ? 44 : 40, fontWeight: 600, letterSpacing: "-0.03em", color: color.white }}>{layer.name}</span>
              </div>
              <span style={{ fontFamily: font.mono, fontSize: L.portrait ? 21 : 20, color: "rgba(255,255,255,0.5)", letterSpacing: "0.02em" }}>{layer.detail}</span>
            </div>
          );
        })}
      </AbsoluteFill>
    </Wipe>
  );
};
