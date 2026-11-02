/**
 * The film uses the website's own tokens (src/app/globals.css) so it reads as the same brand.
 * Flat layered greys, one solid accent, no glow and no gradients.
 */
export const color = {
  canvas: "#0a0a0a",
  surface: "#111111",
  surface2: "#161616",
  surface3: "#1c1c1c",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.16)",
  paper: "#f2f1ec",
  ink: "#0b0b0b",
  accent: "#C8FF00",
  white: "#f5f5f4",
  muted: "rgba(255,255,255,0.6)",
  mutedInk: "rgba(11,11,11,0.7)",
} as const;

export const font = {
  sans: "'Space Grotesk', system-ui, sans-serif",
  display: "'Oughter', 'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', 'DejaVu Sans Mono', Menlo, monospace",
} as const;

/** The one shadow the site allows: a soft, deep drop under floating media. */
export const mediaShadow = "0 40px 80px -30px rgba(0,0,0,0.9)";

/** Rendered width of the Oughter wordmark "STACKWISE" as a multiple of its font size (measured at render). */
export const WORDMARK_RATIO = 6.3;

export const site = {
  name: "StackWise",
  url: "stackwise.yashsuthar.dev",
  eyebrow: "Independent software studio, Mumbai",
} as const;
