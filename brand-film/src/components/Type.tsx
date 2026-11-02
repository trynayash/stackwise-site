import React from "react";
import { useCurrentFrame } from "remotion";
import { color, font } from "../lib/theme";
import { ease, lerp } from "../lib/motion";

/** Small mono label, uppercase and tracked, the way the site sets its eyebrows. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  tone?: "light" | "dark";
  size?: number;
  at?: number;
  style?: React.CSSProperties;
}> = ({ children, tone = "light", size = 24, at = 0, style }) => {
  const frame = useCurrentFrame();
  const t = ease(frame, at, 24);
  return (
    <div
      style={{
        fontFamily: font.mono,
        fontSize: size,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: tone === "light" ? "rgba(255,255,255,0.55)" : "rgba(11,11,11,0.6)",
        opacity: t,
        transform: `translateY(${lerp(t, 14, 0)}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type WordsProps = {
  text: string;
  /** Frame at which the first word starts rising. */
  at: number;
  /** Frames between words. */
  stagger?: number;
  /** Frames each word takes to rise. */
  dur?: number;
  size: number;
  lineHeight?: number;
  weight?: number;
  tracking?: string;
  color?: string;
  /** A phrase in `text` to draw the accent marker behind, after the words have landed. */
  mark?: string;
  markAt?: number;
  markColor?: string;
  markTextColor?: string;
  maxWidth?: number;
  align?: "left" | "center";
  /** Explicit line breaks: each entry is one line. Overrides `text` wrapping. */
  lines?: string[];
  style?: React.CSSProperties;
};

/**
 * Headline whose words rise into place one after another from behind a clip, the same motion as the site's
 * `.rise-word`. An optional phrase gets the solid accent marker drawn behind it, left to right.
 */
export const Words: React.FC<WordsProps> = ({
  text,
  at,
  stagger = 2,
  dur = 22,
  size,
  lineHeight = 0.98,
  weight = 600,
  tracking = "-0.045em",
  color: textColor = color.white,
  mark,
  markAt,
  markColor = color.accent,
  markTextColor = color.ink,
  maxWidth,
  align = "left",
  lines,
  style,
}) => {
  const frame = useCurrentFrame();
  const lineList = lines ?? [text];
  let wordIndex = 0;
  const markWords = mark ? mark.split(" ") : [];
  const markStart = markAt ?? at + 40;
  const markT = ease(frame, markStart, 20);

  return (
    <div
      style={{
        fontFamily: font.sans,
        fontSize: size,
        lineHeight,
        fontWeight: weight,
        letterSpacing: tracking,
        color: textColor,
        maxWidth,
        textAlign: align,
        ...style,
      }}
    >
      {lineList.map((line, li) => {
        const words = line.split(" ");
        return (
          <div key={li} style={{ display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", columnGap: "0.26em" }}>
            {words.map((w, wi) => {
              const i = wordIndex++;
              const t = ease(frame, at + i * stagger, dur);
              // Is this word part of the marked phrase?
              const markIdx = markWords.length ? markWords.indexOf(w) : -1;
              const inMark = markIdx >= 0 && markWords.slice(0, markIdx + 1).join(" ") === words.slice(wi - markIdx, wi + 1).join(" ");
              const first = inMark && markIdx === 0;
              const last = inMark && markIdx === markWords.length - 1;
              return (
                <span key={wi} style={{ display: "inline-block", overflow: "hidden", padding: "0.06em 0.08em", margin: "-0.06em -0.08em", position: "relative" }}>
                  {inMark && (
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: "0.08em -0.02em 0.02em",
                        left: first ? "0" : "-0.2em",
                        right: last ? "0" : "-0.2em",
                        background: markColor,
                        borderRadius: first || last ? "0.18em" : 0,
                        transform: `scaleX(${markT})`,
                        transformOrigin: "left center",
                      }}
                    />
                  )}
                  <span
                    style={{
                      display: "inline-block",
                      position: "relative",
                      transform: `translateY(${lerp(t, 112, 0)}%)`,
                      color: inMark && markT > 0.05 ? markTextColor : undefined,
                    }}
                  >
                    {w}
                  </span>
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/** Paragraph that fades up. */
export const Para: React.FC<{ children: React.ReactNode; at: number; size: number; tone?: "light" | "dark"; maxWidth?: number; style?: React.CSSProperties }> = ({
  children,
  at,
  size,
  tone = "light",
  maxWidth,
  style,
}) => {
  const frame = useCurrentFrame();
  const t = ease(frame, at, 28);
  return (
    <div
      style={{
        fontFamily: font.sans,
        fontSize: size,
        lineHeight: 1.4,
        fontWeight: 400,
        color: tone === "light" ? color.muted : color.mutedInk,
        maxWidth,
        opacity: t,
        transform: `translateY(${lerp(t, 24, 0)}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
