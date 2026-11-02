import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Browser } from "../components/Browser";
import { Eyebrow } from "../components/Type";
import { Wipe } from "../components/Wipe";
import { color, font } from "../lib/theme";
import { ease, inOut, lerp, linear } from "../lib/motion";
import { useLayout } from "../lib/layout";

/**
 * Real products only. Names, categories, statuses and domains come from the site's case-study data
 * (src/lib/case-studies.ts and src/lib/more-work.ts). Nothing here is invented.
 */
const projects = [
  { src: "projects/omenterprise.webp", name: "OM ENTERPRISE", category: "Custom software", kind: "Client project", status: "Live", domain: "omenterprise-n.vercel.app" },
  { src: "projects/limityourapi.webp", name: "LimitYourAPI", category: "SaaS product", kind: "Developer SaaS", status: "Live", domain: "limityourapi.tech" },
  { src: "projects/startupdeck.webp", name: "StartupDeckAI", category: "AI integration", kind: "AI SaaS", status: "Live", domain: "startupdeck.in" },
  { src: "projects/scopeci.webp", name: "ScopeCI", category: "Web application", kind: "GitHub App for agencies", status: "Waitlist", domain: "scopeci.onrender.com" },
  { src: "site/home.webp", name: "StackWise", category: "Website", kind: "Studio website", status: "Live", domain: "stackwise.yashsuthar.dev" },
];

const PER = 60; // frames per project (2 s)

/**
 * 17–27 s. Five real screens, two seconds each, in the site's browser frame. Each one slides in from the
 * right over the last, pans slowly up the page, and carries its category as the headline.
 */
export const Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const bw = L.portrait ? L.width - L.gutter * 2 : 1180;
  const bh = Math.round(bw * 0.045) + Math.round(bw * 0.625);
  const bx = L.portrait ? L.gutter : L.width - L.gutter - bw;
  const by = L.portrait ? L.height * 0.45 : (L.height - bh) / 2 + 30;

  return (
    <Wipe background={color.canvas} from="right" dur={22}>
      <div style={{ position: "absolute", left: L.gutter, top: L.safeTop + (L.portrait ? 120 : 40) }}>
        <Eyebrow at={10} size={L.eyebrow}>
          Products we have built and shipped
        </Eyebrow>
      </div>

      {projects.map((p, i) => {
        const start = i * PER;
        const local = frame - start;
        if (local < -2 || local > PER + 30) return null;
        const inT = ease(local, 0, 26, inOut);
        const outT = i === projects.length - 1 ? 0 : ease(local, PER, 26, inOut);
        const zoom = ease(local, 0, PER + 26, linear);
        const x = lerp(inT, L.width, 0) + lerp(outT, 0, -L.width * 0.18);
        const opacity = 1 - outT;
        const textIn = ease(local, 10, 22);
        // The outgoing headline leaves faster than its screen, and moves up, so it never sits under the next one.
        const textOut = i === projects.length - 1 ? 0 : ease(local, PER - 2, 14, inOut);
        return (
          <AbsoluteFill key={p.name} style={{ opacity }}>
            {/* Category headline and the project's own facts. */}
            <div
              style={{
                position: "absolute",
                left: L.gutter,
                top: L.portrait ? L.safeTop + 190 : L.height * 0.3,
                width: L.portrait ? L.width - L.gutter * 2 : L.width - L.gutter * 2 - bw - 60,
                opacity: textIn * (1 - textOut),
                transform: `translateY(${lerp(textIn, 30, 0) - textOut * 40}px)`,
              }}
            >
              <div style={{ fontFamily: font.sans, fontSize: L.portrait ? 92 : 84, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 0.98, color: color.white }}>
                {p.category}
              </div>
              <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
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
            </div>

            <div style={{ position: "absolute", left: bx, top: by, transform: `translateX(${x}px) rotate(${lerp(inT, 1.5, 0)}deg)`, transformOrigin: "left bottom" }}>
              <Browser src={p.src} domain={p.domain} width={bw} zoom={zoom} />
            </div>
          </AbsoluteFill>
        );
      })}

      {/* Progress: five ticks under the eyebrow, the current one in the accent. */}
      <div style={{ position: "absolute", left: L.gutter, top: L.safeTop + (L.portrait ? 165 : 85), display: "flex", gap: 10, opacity: ease(frame, 14, 20) }}>
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
