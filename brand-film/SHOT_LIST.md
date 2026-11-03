# Shot list

Every shot in the film, with its asset, layout in each format and how it enters. Sizes are in pixels at full resolution (1080×1920 and 1920×1080). Timing in frames at 30 fps.

Layout constants (`src/lib/layout.ts`):

| | 9:16 | 16:9 |
|---|---|---|
| Gutter | 72 | 112 |
| Safe top / bottom | 220 / 340 | 96 / 96 |
| Headline (H1 / H2) | 104 / 76 | 124 / 92 |
| Wordmark | 150 | 200 |
| Eyebrow | 24 mono | 24 mono |

| # | Frames | Scene | Shot | Asset | 9:16 layout | 16:9 layout | In / out |
|---|---|---|---|---|---|---|---|
| 1.1 | 0–30 | Hook | Empty paper with a blinking caret | none (CSS) | Caret at x72, y≈634 | Caret at x112, y≈324 | Cut in; caret collapses at 24 |
| 1.2 | 6–150 | Hook | Eyebrow "Independent software studio, Mumbai" | text | y 340 | y 136 | Fade up |
| 1.3 | 32–150 | Hook | Headline, 4 lines / 3 lines; "an idea." typed under the caret (78–108), marker on it | text | 108 px, from y 634 | 150 px, from y 292 | Word rise, typing, marker 116–138 |
| 1.4 | 60–150 | Hook | Footer rule, address and "Brand film / 2026" | text | bottom 340 | bottom 96 | Fade |
| 2.1 | 150–348 | Complexity | Dark panel | none | full bleed | full bleed | Wipe up, 20 f |
| 2.2 | 164–348 | Complexity | Eyebrow "From idea to working software" | text | y 340 | y 136 | Fade |
| 2.3 | 174–348 | Complexity | "It takes more than code." | text | 88 px, 2 lines, y 410 | 92 px, 3 lines, left 640 wide | Word rise |
| 2.4 | 168–348 | Complexity | Six layer cards (UI, Frontend, Backend, APIs, Database, Deployment) | text in cards | 936×128, from y 806, stacked | 1040×112, right column, vertically centred | Drop in 13 f apart, tilt ±1.2°, square up 290–320 |
| 3.1 | 330–356 | Reveal | Cards compress into one bar | CSS | centre y 960 | centre y 561 | Ease in-out |
| 3.2 | 348–510 | Reveal | Accent bar becomes the wordmark underline | CSS | left 72, width 652 | centred, width 870 | Ease |
| 3.3 | 376–510 | Reveal | "STACKWISE" wordmark | Oughter text | 140 px | 200 px | Letters rise 2 f apart with overshoot, 30 f each |
| 3.4 | 392–510 | Reveal | Eyebrow under the bar | text | | | Fade |
| 3.5 | 426–456 | Reveal | Wordmark group lifts | | −14% of height | −17% of height | Ease in-out |
| 3.6 | 442–528 | Reveal | "Your idea. Engineered into a product." marker on "Engineered" | text | 96 px, 3 lines | 104 px, 2 lines | Word rise, marker at 480 |
| 4.0 | 510–828 | Showcase | Dark panel, eyebrow "Products we have built and shipped", five progress ticks | text | eyebrow y 340, ticks y 385 | eyebrow y 136, ticks y 181 | Wipe from right, 22 f |
| 4.1 | 510–600 | Showcase | OM ENTERPRISE in browser frame, headline "Custom software", chip "Live" | `public/projects/omenterprise.webp` | frame 936×674 at y 883 | frame 1180×708 right, headline left | Slide in from right 26 f, pan up over 80 f, slide out −18% + fade 26 f |
| 4.2 | 570–660 | Showcase | LimitYourAPI, "SaaS product", "Live" | `public/projects/limityourapi.webp` | same | same | same |
| 4.3 | 630–720 | Showcase | StartupDeckAI, "AI integration", "Live" | `public/projects/startupdeck.webp` | same | same | same |
| 4.4 | 690–780 | Showcase | ScopeCI, "Web application", "Waitlist" | `public/projects/scopeci.webp` | same | same | same |
| 4.5 | 750–828 | Showcase | StackWise home, "Website", "Live" | `public/site/home-tall.webp` (full-page capture from this repo, 1600×3520) | same | same | Slide in; the page scrolls inside the frame; holds under the next push |
| 5.0 | 810–1038 | Process | Dark panel, eyebrow "How we work", title "Four steps, one engineer." | text | title 72 px y 410 | title 76 px y 196 | Wipe from left, 22 f |
| 5.1 | 832–1038 | Process | Accent rule | CSS | vertical, x 72, from y 691 | horizontal, y 508, full width | Linear fill 134 f |
| 5.2–5.5 | 832 / 870 / 908 / 946 | Process | 01 Plan, 02 Design, 03 Build, 04 Launch with one line each | text | rows 200 px tall, title 68 px | four columns, title 72 px | Fade + slide 26 f, light up 14 f |
| 5.6 | 956–1038 | Process | Footer "Weekly call and a live staging link throughout" | text | bottom 340 | bottom 96 | Fade |
| 6.0 | 1020–1218 | Promise | Paper panel, eyebrow "What you get, every project" | text | | | Wipe from top, 22 f |
| 6.1 | 1028 | Promise | "Direct with the engineer." + note | text | 88 px, 2 lines, y 518 | 96 px, 1 line, y 259 | Word rise, marker +22 f, dims to 45% at next |
| 6.2 | 1126 | Promise | "Clear, fixed pricing." + note | text | y 760 | y 408 | same |
| 6.3 | 1160 | Promise | "100% code ownership." + note | text | y 1002 | y 557 | same, stays full |
| 7.0 | 1200–1320 | Outro | Dark panel | none | | | Wipe up, 20 f |
| 7.1 | 1210 | Outro | "Your next product, built right from day one." marker on "built right" | text | 84 px, 3 lines, left | 92 px, 2 lines, centred | Word rise, marker at 1244 |
| 7.2 | 1230 | Outro | Wordmark with accent rule | Oughter text | 132 px | 150 px | Clip-mask + rule draw |
| 7.3 | 1254 | Outro | "stackwise.yashsuthar.dev" | mono text | 30 px | 30 px | Fade up |
| 7.4 | 1258 | Outro | Button "Let's build ↗" | CSS pill | 38 px text | 36 px text | Fade + rise + scale 0.96→1 |
| 7.5 | 1270 | Outro | Footer "Independent software studio, Mumbai" / "Founded by Yash Suthar" | mono text | bottom 340 | bottom 96 | Fade |
| 7.6 | 1284–1320 | Outro | Hold | | | | Camera relaxes 1.02→1.0 |

## Assets used

| Path | Source | Notes |
|---|---|---|
| `public/projects/omenterprise.webp` | `../public/projects/` (the site's own) | 1600×1000 |
| `public/projects/limityourapi.webp` | same | 1600×1000 |
| `public/projects/startupdeck.webp` | same | 1600×1000 |
| `public/projects/scopeci.webp` | same | 1600×1000 |
| `public/site/home-tall.webp` | Playwright full-page capture of this repository running locally, 1440 wide @2x, dev overlay hidden, top 2.2 screen-heights, resized to 1600×3520 | Scrolls inside the browser frame in shot 4.5 |
| `public/site/home.webp` | Same capture at 1440×900, resized to 1600×1000 | Spare |
| `public/site/work.webp` | same, `/work` page | Spare; not in the cut |
| `public/fonts/SpaceGrotesk-Variable.woff2` | `../src/fonts/` | OFL |
| `public/fonts/Oughter.otf` | `../src/fonts/` | Wordmark only |
| `public/audio/bed.wav`, `public/audio/sfx.wav` | `tools/make-audio.py` | Generated, see `SOUND_DESIGN.md` |
| `public/logos/*.svg` | `../public/logos/tech/` | Copied for the Studio; deliberately not used in the cut (the film sells the studio, not the stack) |

## Re-shooting the project screens

When the deployed products are reachable, higher-fidelity captures will improve shots 4.1–4.4. Capture each at 1440×900 with `deviceScaleFactor: 2` and `reducedMotion: 'reduce'`, save as 1600×1000 WebP in `public/projects/`, keep the filenames, and re-render. `tools/shoot-site.mjs` shows the Playwright setup used for the StackWise capture.
