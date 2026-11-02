import React from "react";
import { useCurrentFrame } from "remotion";
import { Eyebrow, Words } from "../components/Type";
import { Wipe } from "../components/Wipe";
import { color, font } from "../lib/theme";
import { ease, inOut } from "../lib/motion";
import { useLayout } from "../lib/layout";

/** The three facts from the site's hero trust strip, timed to the three voiceover sentences. */
const facts = [
  { lines: ["Direct with", "the engineer."], wide: ["Direct with the engineer."], mark: "the engineer.", note: "No account managers, no hand-offs" },
  { lines: ["Clear, fixed", "pricing."], wide: ["Clear, fixed pricing."], mark: "fixed", note: "A written quote before work starts" },
  { lines: ["100% code", "ownership."], wide: ["100% code ownership."], mark: "100%", note: "The code and IP are yours" },
];

/** Scene-local frames at which each statement starts: cut to the three voice lines (34.2 s, 37.5 s, 38.7 s). */
const AT = [8, 106, 140];

/**
 * 34–40 s. Back on paper. Three statements, each landing with the next sentence of the voice, each with its
 * key phrase under the accent marker. The earlier lines stay, dimmed, so the three read as one promise.
 */
export const Promise: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const size = L.portrait ? 88 : 108;
  const blockH = L.portrait ? size * 2.35 : size * 1.55;
  const top = L.portrait ? L.height * 0.3 : L.height * 0.24;

  return (
    <Wipe background={color.paper} from="top" dur={22}>
      <div style={{ position: "absolute", left: L.gutter, top: L.safeTop + (L.portrait ? 120 : 40) }}>
        <Eyebrow tone="dark" at={10} size={L.eyebrow}>
          What you get, every project
        </Eyebrow>
      </div>
      {facts.map((f, i) => {
        const at = AT[i];
        const dim = i < facts.length - 1 ? 1 - 0.55 * ease(frame, AT[i + 1], 16, inOut) : 1;
        return (
          <div key={f.mark} style={{ position: "absolute", left: L.gutter, right: L.gutter, top: top + i * blockH, opacity: dim }}>
            <Words lines={L.portrait ? f.lines : f.wide} text="" at={at} stagger={3} size={size} color={color.ink} mark={f.mark} markAt={at + 22} />
            <div style={{ marginTop: L.portrait ? 12 : 10, fontFamily: font.mono, fontSize: L.portrait ? 21 : 22, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(11,11,11,0.55)", opacity: ease(frame, at + 18, 20) }}>
              {f.note}
            </div>
          </div>
        );
      })}
    </Wipe>
  );
};
