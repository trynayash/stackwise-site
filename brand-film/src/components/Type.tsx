import React from "react";
import { useCurrentFrame } from "remotion";
import { color, font } from "../lib/theme";
import { ease, lerp, linear } from "../lib/motion";

/** Small mono label, uppercase and tracked, the way the site sets its eyebrows. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  tone?: "light" | "dark";
  size?: number;
  at?: number;
  style?: React.CSSProperties;
}> = ({ children, tone = "light", size = 24, at = 0, style }) => {
  const frame = useCurrentFrame();
  const t = ease(frame, at, 26);
  return (
    <div
      style={{
        fontFamily: font.mono,
        fontSize: size,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: tone === "light" ? "rgba(255,255,255,0.55)" : "rgba(11,11,11,0.6)",
        opacity: t,
        transform: `translateY(${lerp(t, 10, 0)}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type WordsProps = {
  /** Frame at which the first word starts rising. */
  at: number;
  /** Frames between words. */
  stagger?: number;
  /** Frames each word takes to rise. */
  dur?: number;
  size: number;
  lineHeight?: number;
  /** Weight of the plain words; the marked phrase is always one step bolder. */
  weight?: number;
  tracking?: string;
  color?: string;
  /** A phrase to set bolder and, if `markAt` is given, to draw the accent marker behind, left to right. */
  mark?: string;
  markAt?: number;
  markColor?: string;
  markTextColor?: string;
  /** Type the marked phrase letter by letter (with a caret) instead of rising it, starting at `typeAt`. */
  typeAt?: number;
  typeDur?: number;
  maxWidth?: number;
  align?: "left" | "center";
  /** Each entry is one line. */
  lines: string[];
  style?: React.CSSProperties;
};

/**
 * Headline whose words rise into place one after another from behind a clip, with a short fade so the edge
 * never looks cut, the same motion as the site's `.rise-word`. The key phrase is set one weight bolder; it can
 * get the solid accent marker drawn behind it, or be typed in with a caret.
 */
export const Words: React.FC<WordsProps> = ({
  at,
  stagger = 3,
  dur = 26,
  size,
  lineHeight = 1.0,
  weight = 500,
  tracking = "-0.04em",
  color: textColor = color.white,
  mark,
  markAt,
  markColor = color.accent,
  markTextColor = color.ink,
  typeAt,
  typeDur = 30,
  maxWidth,
  align = "left",
  lines,
  style,
}) => {
  const frame = useCurrentFrame();
  const markWords = mark ? mark.split(" ") : [];
  const markT = markAt === undefined ? 0 : ease(frame, markAt, 22);
  const typing = typeAt !== undefined;
  const typeT = typing ? ease(frame, typeAt, typeDur, linear) : 1;
  const markLen = mark ? mark.length : 0;
  const typedChars = Math.floor(typeT * markLen + 1e-6);
  const caretOn = typing && frame >= typeAt! - 14 && frame < typeAt! + typeDur + 24 && Math.floor(frame / 8) % 2 === 0;

  // Lay the words out once: global index (for the stagger), whether each is part of the marked phrase, and
  // where in that phrase its characters start (for typing). Pure derivation, nothing mutated during render.
  type Laid = { w: string; i: number; inMark: boolean; first: boolean; last: boolean; charStart: number };
  const laid: Laid[][] = [];
  let gi = 0;
  let charStart = 0;
  for (const line of lines) {
    const words = line.split(" ");
    const row: Laid[] = [];
    words.forEach((w, wi) => {
      const markIdx = markWords.length ? markWords.indexOf(w) : -1;
      const inMark = markIdx >= 0 && markWords.slice(0, markIdx + 1).join(" ") === words.slice(wi - markIdx, wi + 1).join(" ");
      const item = { w, i: gi, inMark, first: inMark && markIdx === 0, last: inMark && markIdx === markWords.length - 1, charStart };
      gi += 1;
      if (inMark) charStart += w.length + 1;
      row.push(item);
    });
    laid.push(row);
  }

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
      {laid.map((row, li) => (
        <div key={li} style={{ display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", columnGap: "0.26em" }}>
          {row.map(({ w, i, inMark, first, last, charStart: start }, wi) => {
            let typedPart: React.ReactNode = null;
            if (inMark && typing) {
              const visible = Math.max(0, Math.min(w.length, typedChars - start));
              const showCaret = caretOn && typedChars >= start && typedChars <= start + w.length && (last || typedChars < start + w.length + 1);
              typedPart = (
                <span style={{ display: "inline-block", position: "relative", fontWeight: weight + 100 }}>
                  <span style={{ visibility: "hidden" }}>{w}</span>
                  <span style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", color: markT > 0.05 ? markTextColor : undefined }}>
                    {w.slice(0, visible)}
                    {showCaret && <span style={{ display: "inline-block", width: "0.06em", height: "0.85em", background: "currentColor", verticalAlign: "-0.08em", marginLeft: "0.03em" }} />}
                  </span>
                </span>
              );
            }
            const t = ease(frame, at + i * stagger, dur);
            const fade = ease(frame, at + i * stagger, dur * 0.45, linear);
            return (
              <span key={wi} style={{ display: "inline-block", overflow: "hidden", padding: "0.06em 0.08em", margin: "-0.06em -0.08em", position: "relative" }}>
                {inMark && markAt !== undefined && (
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
                {typedPart ?? (
                  <span
                    style={{
                      display: "inline-block",
                      position: "relative",
                      fontWeight: inMark ? weight + 100 : weight,
                      opacity: fade,
                      transform: `translateY(${lerp(t, 108, 0)}%)`,
                      color: inMark && markT > 0.05 ? markTextColor : undefined,
                    }}
                  >
                    {w}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      ))}
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
  const t = ease(frame, at, 30);
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
        transform: `translateY(${lerp(t, 18, 0)}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** A single line that unmasks from behind a baseline clip, for small captions and facts. */
export const Line: React.FC<{ children: React.ReactNode; at: number; dur?: number; style?: React.CSSProperties }> = ({ children, at, dur = 24, style }) => {
  const frame = useCurrentFrame();
  const t = ease(frame, at, dur);
  return (
    <div style={{ overflow: "hidden", padding: "0.1em 0", margin: "-0.1em 0", ...style }}>
      <div style={{ transform: `translateY(${lerp(t, 110, 0)}%)`, opacity: ease(frame, at, dur * 0.5, linear) }}>{children}</div>
    </div>
  );
};
