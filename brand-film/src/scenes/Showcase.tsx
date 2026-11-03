import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Browser } from "../components/Browser";
import { Eyebrow, Line } from "../components/Type";
import { Wipe } from "../components/Wipe";
import { color, font } from "../lib/theme";
import { ease, inOut, lerp, linear, settle } from "../lib/motion";
import { useLayout } from "../lib/layout";

/**
 * Real products only. Names, categories, statuses, domains and facts come from the site's case-study data
 * (src/lib/case-studies.ts and src/lib/more-work.ts). Nothing here is invented.
 */
const projects = [
  { src: "projects/omenterprise.webp", aspect: 0.625, name: "OM ENTERPRISE", category: "Custom software", kind: "Client project", status: "Live", domain: "omenterprise-n.vercel.app", fact: "357 products · counter POS · GST bills" },
  { src: "projects/limityourapi.webp", aspect: 0.625, name: "LimitYourAPI", category: "SaaS product", kind: "Developer SaaS", status: "Live", domain: "limityourapi.tech", fact: "Go · Redis Lua · SDKs for Node.js, Go, Python" },
  { src: "projects/startupdeck.webp", aspect: 0.625, name: "StartupDeckAI", category: "AI integration", kind: "AI SaaS", status: "Live", domain: "startupdeck.in", fact: "Four LLM stages · 3,400+ automated tests" },
  { src: "projects/scopeci.webp", aspect: 0.625, name: "ScopeCI", category: "Web application", kind: "GitHub App for agencies", status: "Waitlist", domain: "scopeci.onrender.com", fact: "Pull requests checked against the signed scope" },
  { src: "site/home-tall.webp", aspect: 2.2, name: "StackWise", category: "Website", kind: "Studio website", status: "Live", domain: "stackwise.yashsuthar.dev", fact: "Next.js 16 · server-rendered · public source" },
];

const PER = 60; // frames per project (2 s)

/**
 * 17–27 s. Five real screens, two seconds each, in the site's browser frame, resting at a slight angle in
 * perspective. Each one glides in from the right and turns to face the camera, the page drifts, and the
 * category carries the headline with the project's own facts under it.
 */
export const Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const bw = L.portrait ? L.width - L.gutter * 2 : 1180;
  const bh = Math.round(bw * 0.045) + Math.round(bw * 0.625);
  const bx = L.portrait ? L.gutter : L.width - L.gutter - bw;
  const by = L.portrait ? L.height * 0.45 : (L.height - bh) / 2 + 30;

  return (
    <Wipe background={color.canvas} from="right" dur={24}>
      <div style={{ position: "absolute", left: L.gutter, top: L.safeTop + (L.portrait ? 120 : 40) }}>
        <Eyebrow at={12} size={L.eyebrow}>
          Products we have built and shipped
        </Eyebrow>
      </div>

      {projects.map((p, i) => {
        const start = i * PER;
        const local = frame - start;
        if (local < -2 || local > PER + 30) return null;
        const inT = ease(local, 0, 30, settle);
        const outT = i === projects.length - 1 ? 0 : ease(local, PER, 26, inOut);
        const life = ease(local, 0, PER + 26, linear);
        const x = lerp(inT, L.width * 0.9, 0) + lerp(outT, 0, -L.width * 0.22);
        const rotY = lerp(inT, -16, L.portrait ? 0 : -5) + lerp(outT, 0, 8);
        const opacity = 1 - outT;
        const textIn = ease(local, 12, 24);
        const textOut = i === projects.length - 1 ? 0 : ease(local, PER - 2, 14, inOut);
        const pan = p.aspect > 0.7 ? lerp(ease(local, 8, PER + 10, inOut), 0, bw * (p.aspect - 0.625) * 0.55) : 0;
        return (
          <AbsoluteFill key={p.name} style={{ opacity }}>
            <div
              style={{
                position: "absolute",
                left: L.gutter,
                top: L.portrait ? L.safeTop + 190 : L.height * 0.3,
                width: L.portrait ? L.width - L.gutter * 2 : L.width - L.gutter * 2 - bw - 60,
                opacity: textIn * (1 - textOut),
                transform: `translateY(${lerp(textIn, 26, 0) - textOut * 36}px)`,
              }}
            >
              <div style={{ fontFamily: font.sans, fontSize: L.portrait ? 92 : 84, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 0.98, color: color.white }}>
                {p.category}
              </div>
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                <span style={{ fontFamily: font.sans, fontSize: L.portrait ? 34 : 32, fontWeight: 500, color: color.white }}>{p.name}</span>
                <span style={{ fontFamily: font.sans, fontSize: L.portrait ? 28 : 26, color: "rgba(255,255,255,0.5)" }}>{p.kind}</span>
                <span
                  style={{
                    fontFamily: font.sans,
                    fontSize: 20,
                    fontWeight: 500,
                    padding: "6px 16px",
                    borderRadius: 999,
                    background: p.status === "Live" ? color.accent : "rgba(255,255,255,0.1)",
                    color: p.status === "Live" ? color.ink : color.white,
                  }}
                >
                  {p.status}
                </span>
              </div>
              <div style={{ marginTop: 18, fontFamily: font.mono, fontSize: L.portrait ? 21 : 21, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}>
                <Line at={22}>{p.fact}</Line>
              </div>
            </div>

            <div style={{ position: "absolute", left: bx, top: by, width: bw, height: bh, perspective: 2600, perspectiveOrigin: "30% 50%" }}>
              <div style={{ transform: `translateX(${x}px) rotateY(${rotY}deg) rotateX(${lerp(inT, 2, L.portrait ? 0 : 1.5)}deg)`, transformOrigin: "left center", transformStyle: "preserve-3d" }}>
                <Browser src={p.src} domain={p.domain} width={bw} aspect={p.aspect} pan={pan} zoom={life} />
              </div>
            </div>
          </AbsoluteFill>
        );
      })}

      <div style={{ position: "absolute", left: L.gutter, top: L.safeTop + (L.portrait ? 165 : 85), display: "flex", gap: 10, opacity: ease(frame, 16, 20) }}>
        {projects.map((p, i) => {
          const fill = ease(frame, i * PER, PER, linear);
          return (
            <div key={p.name} style={{ width: L.portrait ? 60 : 72, height: 4, background: "rgba(255,255,255,0.14)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${fill * 100}%`, height: "100%", background: color.accent }} />
            </div>
          );
        })}
      </div>
    </Wipe>
  );
};
