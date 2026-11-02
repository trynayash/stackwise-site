import React from "react";
import { useCurrentFrame } from "remotion";
import { Wordmark } from "../components/Wordmark";
import { Para, Words } from "../components/Type";
import { Wipe } from "../components/Wipe";
import { color, font, site } from "../lib/theme";
import { drift, ease, lerp } from "../lib/motion";
import { useLayout } from "../lib/layout";

/**
 * 40–44 s. Dark. The site's own headline, the wordmark with its rule, the address, and one accent button.
 * Everything settles by 42.5 s and holds, so the end card survives a crop or a freeze frame.
 */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const btn = ease(frame, 58, 26);
  const wm = L.portrait ? 140 : 150;

  return (
    <Wipe background={color.canvas} from="bottom" dur={20}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${drift(frame, 120, 1.02, 1)})`, transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", left: L.gutter, right: L.gutter, top: L.portrait ? L.height * 0.27 : L.height * 0.2, display: "flex", flexDirection: "column", alignItems: L.portrait ? "flex-start" : "center" }}>
          <Words
            lines={L.portrait ? ["Your next product,", "built right", "from day one."] : ["Your next product,", "built right from day one."]}
            text=""
            at={10}
            stagger={3}
            size={L.portrait ? 84 : 92}
            mark="built right"
            markAt={44}
            align={L.portrait ? "left" : "center"}
          />
          <div style={{ marginTop: L.portrait ? 100 : 80 }}>
            <Wordmark size={wm} at={30} rule />
          </div>
          <Para at={54} size={L.portrait ? 30 : 30} style={{ marginTop: L.portrait ? 64 : 56, fontFamily: font.mono, letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)" }}>
            {site.url}
          </Para>
          <div
            style={{
              marginTop: L.portrait ? 44 : 36,
              display: "inline-flex",
              alignItems: "center",
              gap: 18,
              padding: L.portrait ? "26px 48px" : "24px 44px",
              borderRadius: 999,
              background: color.accent,
              color: color.ink,
              fontFamily: font.sans,
              fontSize: L.portrait ? 38 : 36,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              opacity: btn,
              transform: `translateY(${lerp(btn, 24, 0)}px) scale(${lerp(btn, 0.96, 1)})`,
            }}
          >
            Let&apos;s build
            <span style={{ fontSize: L.portrait ? 34 : 32, transform: `translate(${lerp(ease(frame, 84, 20), -6, 0)}px, ${lerp(ease(frame, 84, 20), 6, 0)}px)`, display: "inline-block" }}>↗</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: L.gutter, right: L.gutter, bottom: L.safeBottom, display: "flex", justifyContent: "space-between", fontFamily: font.mono, fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", opacity: ease(frame, 70, 24) }}>
          <span>{site.eyebrow}</span>
          <span>Founded by Yash Suthar</span>
        </div>
      </div>
    </Wipe>
  );
};
