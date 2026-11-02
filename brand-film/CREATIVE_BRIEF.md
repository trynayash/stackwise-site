# StackWise brand film: creative brief

**Working title:** Ideas deserve good engineering
**Length:** 44 seconds (1,320 frames at 30 fps)
**Formats:** 9:16 at 1080×1920 (primary), 16:9 at 1920×1080 (secondary)
**Built with:** Remotion (React), rendered with the Chromium in this environment. Source in `brand-film/src`.

## 1. What the audit found

The film is built from what StackWise already is, not from a new identity.

**Identity in use on the live site** (`src/app/globals.css`, `src/components/ui/logo.tsx`, the hero and share image):

| Token | Value | Used for |
|---|---|---|
| Canvas | `#0a0a0a` | Page background, every dark scene |
| Surface / surface-2 / surface-3 | `#111111` / `#161616` / `#1c1c1c` | Cards, layered depth without glow |
| Line / line-strong | white at 8% / 16% | Card borders |
| Paper | `#f2f1ec` | The one light panel (home hero, share image) |
| Ink | `#0b0b0b` | Text on paper |
| Accent | `#C8FF00` | Solid fills only: marker highlight, buttons, "WISE" |
| Body face | Space Grotesk (variable, 300–700, self-hosted) | All copy |
| Wordmark face | Oughter | "STACK" white, "WISE" accent. Nothing else. |
| Eyebrows | Monospace, uppercase, 0.2em tracking | Labels and facts |

The site's own rules (`docs/frontend-playbook.md`): flat layered greys for depth, never glow; the accent as a solid colour only; real product screenshots as the visual hero; one idea per section; alternate dark sections with one paper panel; motion that settles fast on `cubic-bezier(0.16, 1, 0.3, 1)`; no gradient blobs, dot grids, glassmorphism or sparkles.

**Superseded material.** `public/LOGO-USAGE-GUIDE.md` and the SVG logo files in `public/` describe a blue-to-purple gradient block mark from February 2026. The live site does not use it anywhere; the wordmark and lime accent are the brand. The film follows the live site. (This also satisfies the brief's "no purple-blue gradients".)

**Real project visuals available** (`public/projects/*.webp`, 1600×1000, the same files the site's hero and work pages show):

| Project | What it is | Status on the site | Domain |
|---|---|---|---|
| OM ENTERPRISE | Catalogue, counter POS and GST billing for a building-materials shop in Naswadi, Gujarat. The studio's first client project. | Live | omenterprise-n.vercel.app |
| LimitYourAPI | API rate limiting SaaS: Go, Redis Lua, PostgreSQL, React, SDKs for Node.js, Go and Python | Live | limityourapi.tech |
| StartupDeckAI | AI startup analysis and pitch decks: React, Express, PostgreSQL, 3,400+ tests in CI | Live | startupdeck.in |
| ScopeCI | GitHub App for agencies that checks pull requests against the signed scope | Waitlist (in development) | scopeci.onrender.com |
| StackWise | The studio's own Next.js site | Live | stackwise.yashsuthar.dev |

Fresh screenshots of the StackWise site (home, work) were captured from a local build of this repository with Playwright at 1440×900 @2x. The deployed project domains are not reachable from this environment, so the project screenshots are the repository's own (which the site itself uses). No interface in the film is invented.

**Process copy** comes from `src/components/sections/process-timeline.tsx` (Plan, Design, Build, Launch) and **differentiators** from the hero trust strip and pricing page: direct with the engineer, fixed quote up front, 100% code ownership.

## 2. Positioning

StackWise is an independent software studio in Mumbai, founded by Yash Suthar. It builds SaaS products, AI integrations, websites, web applications, dashboards, mobile apps and custom software. What makes it different: you work directly with the engineer; the price is fixed and written down before work starts; you own all the code; and the same person takes the product from architecture to deployment.

The film sells the studio, not a stack. No framework logos, no "powered by" strip. The technologies appear only as the layers of work an idea has to pass through (UI, frontend, backend, APIs, database, deployment), and only to show how much there is to get right.

## 3. The idea

**"Ideas deserve good engineering."**

One continuous story: an idea is written down → it has to pass through six layers of work → StackWise compresses those layers into one line of delivery → here is that delivery, as real products → here is how the work runs → here is what you get → here is where to start.

The film borrows from the HowDo reference only its storytelling shape: a quiet hook, a reveal that reorganises the frame, product shown inside honest device frames, kinetic type that lands with the voice, and a calm end card. Everything visible is StackWise's own system.

## 4. Visual direction

- **Two surfaces, one accent.** Paper opens and closes the "human" moments (the idea, the promise). Dark canvas carries the work. The accent appears as a drawn marker behind the one phrase the voice is landing on, as the brand bar, and as the final button.
- **Typography is the picture.** Space Grotesk at 84–124 px, tight tracking, words rising from behind a clip in build order (the site's `.rise-word`). Mono eyebrows anchor every scene with a fact.
- **Real interfaces in a plain browser frame.** The same light chrome, mono domain and deep soft shadow as the site's hero stage. Pages pan slowly inside the frame. Nothing is retouched.
- **Camera.** A 2–3% drift per scene so static layouts breathe, and a slow pan inside each browser frame. No 3D, no parallax stacks.
- **Transitions.** Full-bleed clip wipes in the direction the story moves (up into the work, right through the products, left into the process, down into the promise). The one "hero" transition is the six-layer pile collapsing into the accent bar that underlines the wordmark.
- **Never:** glow, gradients, blur, glassmorphism, floating code, 3D objects, template particle effects, invented dashboards, invented numbers.

## 5. Safe areas and legibility

- 9:16: nothing that matters in the top 220 px or bottom 340 px, so platform captions and controls never cover copy. Gutter 72 px.
- 16:9: 96 px title-safe, 112 px gutters.
- Smallest text is 20 px mono on 1080 width (≈ 12 px at phone size), used only for footers and tags.
- The end card settles by 42.5 s and holds, so a cropped or frozen final frame still carries the wordmark, address and call to action.

## 6. Deliverables in this folder

| File | What |
|---|---|
| `CREATIVE_BRIEF.md` | This document |
| `STORYBOARD.md` | Timestamped scene-by-scene board with motion notes |
| `VOICEOVER.md` | The script cut to frames, with recording and delivery notes |
| `SHOT_LIST.md` | Every shot, its asset, layout per format and transition |
| `SOUND_DESIGN.md` | Music, effects and mix plan, with every cue's frame |
| `src/` | Remotion source (scenes, components, tokens, timeline) |
| `tools/make-audio.py` | Generates the bed and effects stems in `public/audio` |
| `out/stackwise-brand-film-9x16.mp4` | Final vertical render |
| `out/stackwise-brand-film-16x9.mp4` | Final horizontal render |
| `out/poster-9x16.png`, `out/thumbnail-16x9.png` | Poster frame and thumbnail |
| `out/contact-sheet-*.png` | One frame per second of each render, for review |

## 7. What is not finished here, and the next step

- **Voiceover.** The renders carry a generated voice: Kokoro, an open-weights text-to-speech model (Apache-2.0), voice `af_heart`, produced by `tools/make-voice.py` and cut to the frames in `VOICEOVER.md`. It is clean and natural, but a human read will still carry more warmth. To replace it, record the script, align it to the same frames and save it over `public/audio/voiceover.wav`; the compositions mix in whatever that file holds.
- **Music.** The bed and effects are synthesized (`tools/make-audio.py`) so the cut has rhythm and the cue sheet is exact. For release, replace `public/audio/bed.wav` with a licensed track that matches the tempo map in `SOUND_DESIGN.md`, or keep the generated bed if it sits well under the voice.
- **Colour and loudness finishing** in DaVinci Resolve: the renders are flat sRGB, and the full mix (voice at −16 LUFS over the bed and effects) is measured in `SOUND_DESIGN.md` along with the platform loudness targets.
