import React from "react";
import { useCurrentFrame } from "remotion";
import { Eyebrow } from "../components/Type";
import { Wipe } from "../components/Wipe";
import { color, font } from "../lib/theme";
import { ease, inOut, lerp, linear } from "../lib/motion";
import { useLayout } from "../lib/layout";

/** The site's four steps (src/components/sections/process-timeline.tsx), one line each. */
const steps = [
  { n: "01", title: "Plan", text: "Scope, a technical plan and a timeline, agreed in writing." },
  { n: "02", title: "Design", text: "Clickable Figma designs before any code is written." },
  { n: "03", title: "Build", text: "Front end, back end, database and integrations, on a live staging link." },
  { n: "04", title: "Launch", text: "Device testing, a speed and security pass, then launch and handover." },
];

const STEP = 38; // frames between steps

/**
 * 27–34 s. The four stages as one line of work: a vertical list in 9:16, a row in 16:9. The accent rule
 * runs through them and each stage lights up as the rule reaches it.
 */
export const Process: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const first = 22;
  const rule = ease(frame, first, STEP * 3 + 20, linear);

  return (
    <Wipe background={color.canvas} from="left" dur={22}>
      <div style={{ position: "absolute", left: L.gutter, top: L.safeTop + (L.portrait ? 120 : 40) }}>
        <Eyebrow at={8} size={L.eyebrow}>
          How we work
        </Eyebrow>
      </div>
      <div style={{ position: "absolute", left: L.gutter, top: L.safeTop + (L.portrait ? 190 : 100), fontFamily: font.sans, fontSize: L.portrait ? 72 : 76, fontWeight: 600, letterSpacing: "-0.04em", color: color.white, opacity: ease(frame, 12, 24), transform: `translateY(${lerp(ease(frame, 12, 24), 24, 0)}px)` }}>
        Four steps, one engineer.
      </div>

      {L.portrait ? (
        <div style={{ position: "absolute", left: L.gutter, right: L.gutter, top: L.height * 0.36 }}>
          {/* The rule */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "rgba(255,255,255,0.12)", borderRadius: 2 }}>
            <div style={{ width: "100%", height: `${rule * 100}%`, background: color.accent, borderRadius: 2 }} />
          </div>
          {steps.map((s, i) => {
            const at = first + i * STEP;
            const t = ease(frame, at, 26);
            const lit = ease(frame, at + 4, 14, inOut);
            return (
              <div key={s.n} style={{ position: "relative", paddingLeft: 48, height: 200, opacity: t, transform: `translateX(${lerp(t, 30, 0)}px)` }}>
                <div style={{ position: "absolute", left: -10, top: 24, width: 24, height: 24, borderRadius: 12, background: lit > 0.5 ? color.accent : color.surface3, border: `2px solid ${lit > 0.5 ? color.accent : color.lineStrong}` }} />
                <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
                  <span style={{ fontFamily: font.mono, fontSize: 22, color: lit > 0.5 ? color.accent : "rgba(255,255,255,0.4)", letterSpacing: "0.12em" }}>{s.n}</span>
                  <span style={{ fontFamily: font.sans, fontSize: 68, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, color: `rgba(255,255,255,${lerp(lit, 0.4, 1)})` }}>{s.title}</span>
                </div>
                <div style={{ marginTop: 14, fontFamily: font.sans, fontSize: 30, lineHeight: 1.3, color: "rgba(255,255,255,0.55)", maxWidth: 820 }}>{s.text}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ position: "absolute", left: L.gutter, right: L.gutter, top: L.height * 0.47 }}>
          <div style={{ position: "relative", height: 4, background: "rgba(255,255,255,0.12)", borderRadius: 2, marginBottom: 44 }}>
            <div style={{ width: `${rule * 100}%`, height: "100%", background: color.accent, borderRadius: 2 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
            {steps.map((s, i) => {
              const at = first + i * STEP;
              const t = ease(frame, at, 26);
              const lit = ease(frame, at + 4, 14, inOut);
              return (
                <div key={s.n} style={{ position: "relative", opacity: t, transform: `translateY(${lerp(t, 30, 0)}px)` }}>
                  <div style={{ position: "absolute", left: 0, top: -58, width: 24, height: 24, borderRadius: 12, background: lit > 0.5 ? color.accent : color.surface3, border: `2px solid ${lit > 0.5 ? color.accent : color.lineStrong}` }} />
                  <div style={{ fontFamily: font.mono, fontSize: 20, color: lit > 0.5 ? color.accent : "rgba(255,255,255,0.4)", letterSpacing: "0.12em" }}>{s.n}</div>
                  <div style={{ marginTop: 14, fontFamily: font.sans, fontSize: 72, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, color: `rgba(255,255,255,${lerp(lit, 0.4, 1)})` }}>{s.title}</div>
                  <div style={{ marginTop: 18, fontFamily: font.sans, fontSize: 26, lineHeight: 1.35, color: "rgba(255,255,255,0.55)" }}>{s.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ position: "absolute", left: L.gutter, right: L.gutter, bottom: L.safeBottom, fontFamily: font.mono, fontSize: L.portrait ? 20 : 22, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", opacity: ease(frame, first + STEP * 3 + 10, 24) }}>
        Weekly call and a live staging link throughout
      </div>
    </Wipe>
  );
};
