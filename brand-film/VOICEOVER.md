# Voiceover

Script as supplied, cut to the film's frames. 30 fps. The lines are timed so each key phrase lands as the matching text or marker lands on screen (see `src/lib/timeline.ts` and the `markAt` values in the scenes).

## Script and timing

| # | In | Out | Frames | Line | What is on screen when it lands |
|---|---|---|---|---|---|
| 1 | 0:01.0 | 0:04.4 | 30–132 | Every great digital product starts with an idea. | Words rise one by one; the accent marker draws behind "an idea." at frame 92 (3.07 s) |
| 2 | 0:05.4 | 0:10.6 | 162–318 | But turning that idea into something people actually use takes more than just code. | The six layers drop in (frames 168–233); "It takes more than code." is up by 6.5 s |
| 3 | 0:11.6 | 0:13.6 | 348–408 | That's where StackWise comes in. | The pile collapses into the accent bar (11.0–11.9 s); "STACKWISE" unmasks at frame 374 (12.5 s). Say "StackWise" on 12.5 s. |
| 4 | 0:14.6 | 0:16.6 | 438–498 | *(no line: hold)* | "Your idea. Engineered into a product." rises; marker on "Engineered" at 16.0 s |
| 5 | 0:17.2 | 0:26.4 | 516–792 | From SaaS platforms and AI-powered applications to websites and custom software, we design, build and ship digital products. | Five real screens, 2 s each: custom software (17 s), SaaS product (19 s), AI integration (21 s), web application (23 s), website (25 s). The sentence is not matched word-for-word to screens on purpose; it should feel like one breath over the reel. |
| 6 | 0:27.4 | 0:33.4 | 822–1002 | From the first conversation and design to engineering and launch, we stay with you through every step. | Plan lights at 27.7 s, Design 29.0 s, Build 30.3 s, Launch 31.5 s. "Every step" lands as the rule completes (31.9 s). |
| 7 | 0:34.2 | 0:37.3 | 1026–1120 | Work directly with the engineer building your product. | "Direct with the engineer." rises at 34.3 s, marker at 35.0 s |
| 8 | 0:37.5 | 0:38.6 | 1126–1158 | Know what you're paying. | "Clear, fixed pricing." rises at 37.5 s, marker at 38.3 s |
| 9 | 0:38.7 | 0:39.8 | 1160–1194 | Own what we build. | "100% code ownership." rises at 38.7 s, marker at 39.4 s |
| 10 | 0:40.4 | 0:42.4 | 1212–1272 | Have an idea? Let's build it. | Headline rises (40.3 s), wordmark unmasks (41.0 s), button lands (42.1 s) |
| 11 | 0:42.6 | 0:43.4 | 1278–1302 | StackWise. | Full end card, holding |

Total spoken: about 98 words in 38 seconds of speech across 44 seconds, which leaves the pauses the edit needs at 4.4 s, 10.6 s, 13.6–17.2 s and 39.8–40.4 s.

## Delivery notes

- **Voice:** one speaker, warm and plain, mid-register, no "announcer" push. The studio's own tone is direct ("No agency runaround", "You own the code"), so read it like someone explaining their work, not selling it.
- **Pace:** about 150 words per minute. Lines 7–9 are three short sentences; give each its own breath so the three statements on screen each get a beat.
- **Emphasis:** "idea" (line 1), "actually use" (2), "StackWise" (3), "every step" (6), "directly" (7), "paying" (8), "own" (9), "build" (10).
- **Pronunciation:** StackWise as one word, stress on "Stack". "SaaS" as "sass".
- **Room:** dry, close-miked, no reverb. Reverb or air can be added in the mix if the bed calls for it.

## The generated track

`public/audio/voiceover.wav` is in the renders. It was generated with Kokoro (open-weights text-to-speech, Apache-2.0) through `kokoro-onnx`, voice `af_heart`, by `tools/make-voice.py`: each line is synthesized on its own at 0.97× pace (a calmer read), trimmed, placed at its frame from the table above, then run through a broadcast chain: high-pass at 80 Hz, a little warmth at 180 Hz, presence at 3 kHz, a gentle de-ess around 7.5 kHz, 3:1 compression, and loudness normalization to −16 LUFS with a −1.5 dBTP ceiling. Lines that would overrun their slot are re-synthesized slightly faster instead of being cut (only line 8 needed this, at 1.05×). "SaaS" is sent to the engine as "sass" so it is said as a word.

To regenerate, or try another voice (`am_michael`, `bm_george`, `bf_emma`, …):

```bash
cd brand-film
# once: fetch the model files (about 340 MB) from the kokoro-onnx GitHub release, tag model-files-v1.0
mkdir -p models && curl -L -o models/kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -L -o models/voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
pip install kokoro-onnx soundfile scipy
python3 -I tools/make-voice.py --model models --voice af_heart
```

## Replacing it with a recording

A human read will still beat the generated one for warmth. To swap it in:

1. Record the script at 48 kHz, mono, dry.
2. Trim the head so line 1 starts at exactly 1.000 s, then align each later line to the "In" column. In DaVinci Resolve or Audacity, place markers at the frame numbers above and nudge each phrase to its marker.
3. Export as `brand-film/public/audio/voiceover.wav`, replacing the generated file.
4. Render:

```bash
cd brand-film
npm run render:vertical
npm run render:horizontal
```

If a recorded line runs long, move the scene's `markAt` or the step timing in the matching scene file rather than speeding the voice up; the frame numbers in this table are the only thing that has to stay in sync.
