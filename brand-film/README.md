# StackWise brand film

A 44-second motion-design film for StackWise, built programmatically with [Remotion](https://www.remotion.dev) from the website's own identity and real product screenshots. This folder is self-contained: it has its own `package.json` and does not take part in the website build.

Read first: `CREATIVE_BRIEF.md`, then `STORYBOARD.md`, `SHOT_LIST.md`, `VOICEOVER.md` and `SOUND_DESIGN.md`.

## Render

```bash
cd brand-film
npm install
npm run render:vertical     # out/stackwise-brand-film-9x16.mp4  (1080×1920, 30 fps)
npm run render:horizontal   # out/stackwise-brand-film-16x9.mp4  (1920×1080, 30 fps)
npm run stills              # out/poster-9x16.png and out/thumbnail-16x9.png
npm run studio              # Remotion Studio, to scrub and tweak
```

Remotion downloads its own headless Chromium on first use. In an environment that already has one (as the cloud session that built this did), point it at it: `REMOTION_BROWSER=/path/to/chrome npm run render:vertical`.

## Voiceover

The voice is not in the render yet (no speech route was available where this was built). Record or generate it from `VOICEOVER.md`, save it as `public/audio/voiceover.mp3`, and render with:

```bash
npx remotion render src/index.ts Vertical out/stackwise-brand-film-9x16.mp4 --props='{"voiceover":true,"sound":true}'
npx remotion render src/index.ts Horizontal out/stackwise-brand-film-16x9.mp4 --props='{"voiceover":true,"sound":true}'
```

## Where things are

| Path | What |
|---|---|
| `src/Root.tsx` | The two compositions, `Vertical` and `Horizontal` |
| `src/Film.tsx` | Scene order, overlaps, audio tracks |
| `src/lib/timeline.ts` | Frame ranges for every scene (the single source of truth for timing) |
| `src/lib/theme.ts` | Colour and type tokens, copied from the site's `globals.css` |
| `src/lib/layout.ts` | Per-format gutters, safe areas and type sizes |
| `src/scenes/*.tsx` | One file per scene, in story order |
| `src/components/*.tsx` | Word-rise headline with the accent marker, wordmark, browser frame, wipe |
| `public/projects/` | The site's real project screenshots |
| `public/site/` | Screens of this website, captured locally with `tools/shoot-site.mjs` |
| `public/fonts/` | Space Grotesk (OFL) and Oughter, as the site ships them |
| `public/audio/` | Generated bed and effects stems (`tools/make-audio.py`); the voiceover goes here too |
| `out/` | Renders, poster, thumbnail and review contact sheets |

## Changing the cut

- Move a scene: edit `src/lib/timeline.ts`. Scenes read their own local frame, so nothing else changes.
- Re-time a word hit: each scene passes `at` and `markAt` (frames) to `Words`.
- Replace a screenshot: drop a 1600×1000 WebP in `public/projects/` with the same name.
- Re-cue sound: frame numbers in `tools/make-audio.py`, then `python3 -I tools/make-audio.py`.
