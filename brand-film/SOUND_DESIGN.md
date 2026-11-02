# Sound design

Three layers: music, spot effects and the voice. The music is composed and synthesized by `tools/make-music.py`, the effects by `tools/make-audio.py`, both into `public/audio/`, and the compositions (`src/Film.tsx`) mix all three. The voice comes from `tools/make-voice.py` (see `VOICEOVER.md`).

## Mix targets

| Layer | File | Peak | Role |
|---|---|---|---|
| Voice | `public/audio/voiceover.wav` | −1.5 dBTP, −16 LUFS integrated (as generated) | Leads. Nothing else may mask 1–4 kHz while it speaks. |
| Music | `public/audio/music.wav` | −4 dBTP, about −18 LUFS integrated (as generated, voice-ducked) | The energy. Pumps with the kick, sits down 7 dB under the voice. |
| Effects | `public/audio/sfx.wav` | −5 dBFS, mixed at 0.7 | Punctuation only: ticks on word hits, whooshes on wipes. The riser and impacts live in the music. |

As rendered, the full mix measures −14.9 LUFS integrated with a −1.4 dBFS peak (ffmpeg `ebur128`). Final loudness: −14 LUFS integrated for Instagram, YouTube and LinkedIn; −16 LUFS for a website autoplay version; true peak −1 dBTP. Do the final measure and limiter pass in DaVinci Resolve (Fairlight) after the voice is in.

## Music

Composed and synthesized by `tools/make-music.py` in the register of product-launch reels: 120 BPM melodic tech, stereo, 48 kHz. Every sound is generated (no samples), so there is nothing to license.

**Grid.** Bar 0 starts at 1.0 s, the first spoken word; one bar is 2.0 s. That puts the drop on bar 5 (11.0 s, the pile becomes the brand bar), the showcase on bar 8 (17 s), the process on bar 13 (27 s), the breakdown on bar 16.5 (34 s) and the final impact on bar 20 (41.0 s, the wordmark).

**Harmony.** A minor, one chord per bar cycling Am, F, C, G. Bar 20 lands on Am, so the end card resolves.

| Bars | Time | Section | What plays |
|---|---|---|---|
| 0–2.5 | 1–6 s | Intro | Dark filtered saw pad, quiet 8th-note pluck arpeggio with ping-pong delay, hats from bar 2 |
| 2.5–5 | 6–11 s | Build | Kick on quarters swelling in from bar 3, offbeat bass, pad filter opening, 2-bar noise riser, 16th clap roll in the last bar |
| 5–16.5 | 11–34 s | Drop | Four-on-the-floor kick with sidechain pumping on bass, pad and arp; clap on 2 and 4; open hat every other bar; 16th-note arpeggio; shaker |
| 16.5–19.5 | 34–40 s | Breakdown | Kick and clap out; sustained bass, darker pad, 8th-note arp, hats and shaker. Room for the three promises. |
| 19.5–20 | 40–41 s | Lift | Short riser |
| 20–21.5 | 41–44 s | End card | Impact (sub boom and crash) on the wordmark, Am pad and bass ring out, fade complete by 43.4 s |

**Mix inside the track.** A synthetic 1.6-second reverb on a send (pads, arp, a little drums), a dotted-eighth ping-pong delay on the arpeggio, soft limiting, −4 dBTP peak. The voice ducks the music by up to 7 dB with a 20 ms attack and 350 ms release, baked into `music.wav` from `voiceover.wav`, so regenerate the music after changing the voice.

**Swapping in a licensed track.** Match the shape above: a lift into 11.0 s, a steady groove through 27–34 s, a breakdown under 34–40 s, and a hit at 41.0 s. 120 BPM keeps the step timing (each process step is 38 frames, 1.27 s) on the grid.

## Effects cue sheet

Frames at 30 fps. "Tick" is a 45 ms band-passed noise click; "whoosh" a 0.4–0.5 s band-pass sweep; "sub hit" a pitched sine drop with a tiny click.

| Frame | Time | Cue | For |
|---|---|---|---|
| 0, 18 | 0.0, 0.6 | tick (soft, 1.8 kHz) | Caret blinks |
| 30, 48, 66, 92 | 1.0–3.07 | tick | First words rising; the last one is the marker on "an idea." |
| 150 | 5.0 | whoosh (rising) | Dark wipe |
| 168–233 | 5.6–7.8 | six ticks, pitch rising 1.4→2.0 kHz | Each layer dropping in |
| 210–330 | 7.0–11.0 | riser (in the music) | Into the reveal |
| 330 | 11.0 | impact (in the music) | The pile becomes the bar |
| 374 | 12.47 | whoosh | Wordmark unmask |
| 442 | 14.7 | tick | "Your idea." line |
| 510, 570, 630, 690, 750 | 17–25 | whoosh, alternating rise / fall | Each screen sliding in |
| 810 | 27.0 | whoosh (falling) | Process wipe |
| 832, 870, 908, 946 | 27.7–31.5 | tick (2.2 kHz) | Rule reaching Plan, Design, Build, Launch |
| 1020 | 34.0 | whoosh | Paper wipe |
| 1050, 1148, 1182 | 35.0–39.4 | tick (2 kHz) | Each marker drawing |
| 1200 | 40.0 | whoosh | Final wipe |
| 1230 | 41.0 | impact (in the music) | Wordmark |
| 1258 | 41.9 | tick | Button |

## Voice treatment

The generated track already has a high-pass at 80 Hz and loudness normalization to −16 LUFS (`tools/make-voice.py`). For a human recording add a gentle de-ess and 2–3 dB of compression at a 3:1 ratio, no reverb. If the bed and voice fight at 100–200 Hz, cut the bed 2 dB there rather than the voice.

## Regenerating the stems

```bash
cd brand-film
npm run audio      # effects, then music (which reads the voice for ducking)
```

Every cue is a frame number in that script, so when the voice is recorded and a beat moves, change the frame there and re-run; the film's own timings live in `src/lib/timeline.ts` and the scenes.
