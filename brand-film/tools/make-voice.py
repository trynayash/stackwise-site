#!/usr/bin/env python3
"""
Generates the voiceover with Kokoro (open-weights TTS, Apache-2.0) via kokoro-onnx, one line at a time, and
places each line at the frame in VOICEOVER.md so it lands with the picture.

  python3 -I tools/make-voice.py --model DIR [--voice af_heart] [--out public/audio/voiceover.wav]

DIR holds kokoro-v1.0.onnx and voices-v1.0.bin (from the kokoro-onnx GitHub release, model-files-v1.0).
Lines that would overrun their slot are re-synthesized a little faster rather than cut.
Output: 48 kHz mono WAV, normalized to about -16 LUFS integrated.
"""
import argparse, os, subprocess, sys, json, tempfile
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

FPS = 30
SR = 48000
TOTAL_FRAMES = 1320

# (first frame, last frame of the slot, text). The slot ends where the next line starts, minus a breath.
LINES = [
    (30, 150, "Every great digital product starts with an idea."),
    (162, 330, "But turning that idea into something people actually use takes more than just code."),
    (348, 430, "That's where StackWise comes in."),
    (516, 800, "From SaaS platforms and AI-powered applications to websites and custom software, we design, build and ship digital products."),
    (822, 1010, "From the first conversation and design to engineering and launch, we stay with you through every step."),
    (1026, 1122, "Work directly with the engineer building your product."),
    (1126, 1158, "Know what you're paying."),
    (1160, 1206, "Own what we build."),
    (1212, 1274, "Have an idea? Let's build it."),
    (1278, 1318, "StackWise."),
]

ap = argparse.ArgumentParser()
ap.add_argument("--model", required=True)
ap.add_argument("--voice", default="af_heart")
ap.add_argument("--speed", type=float, default=1.0)
ap.add_argument("--out", default="public/audio/voiceover.wav")
ap.add_argument("--lines-dir", default=None, help="Also write each line as its own WAV here")
args = ap.parse_args()

from kokoro_onnx import Kokoro  # noqa: E402

kokoro = Kokoro(os.path.join(args.model, "kokoro-v1.0.onnx"), os.path.join(args.model, "voices-v1.0.bin"))

# Spellings the phonemizer gets wrong; the on-screen script keeps the real spelling.
SAY = {"SaaS": "sass"}

def synth(text, speed):
    for k, v in SAY.items():
        text = text.replace(k, v)
    audio, sr = kokoro.create(text, voice=args.voice, speed=speed, lang="en-us")
    audio = np.asarray(audio, dtype=np.float32)
    if sr != SR:
        audio = resample_poly(audio, SR, sr).astype(np.float32)
    # Trim leading/trailing silence below -50 dBFS.
    thr = 10 ** (-50 / 20)
    idx = np.where(np.abs(audio) > thr)[0]
    if len(idx):
        audio = audio[max(0, idx[0] - int(0.02 * SR)) : min(len(audio), idx[-1] + int(0.08 * SR))]
    return audio

track = np.zeros(int(TOTAL_FRAMES / FPS * SR), dtype=np.float32)
report = []
for i, (f_in, f_end, text) in enumerate(LINES, 1):
    slot = (f_end - f_in) / FPS
    speed = args.speed
    audio = synth(text, speed)
    while len(audio) / SR > slot and speed < 1.35:
        speed = round(speed + 0.05, 2)
        audio = synth(text, speed)
    start = int(f_in / FPS * SR)
    n = min(len(audio), len(track) - start)
    track[start : start + n] += audio[:n]
    dur = len(audio) / SR
    report.append({"line": i, "in_s": round(f_in / FPS, 2), "dur_s": round(dur, 2), "slot_s": round(slot, 2), "speed": speed, "fits": dur <= slot})
    if args.lines_dir:
        os.makedirs(args.lines_dir, exist_ok=True)
        sf.write(os.path.join(args.lines_dir, f"line-{i:02d}.wav"), audio, SR)

# Peak-safe, then loudness-normalize with ffmpeg's loudnorm to about -16 LUFS.
track = track / max(1e-9, np.max(np.abs(track))) * 10 ** (-3 / 20)
os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
with tempfile.TemporaryDirectory() as td:
    raw = os.path.join(td, "raw.wav")
    sf.write(raw, track, SR)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af", "highpass=f=80,loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(SR), "-ac", "1", args.out], check=True)

print(json.dumps(report, indent=1))
print("wrote", args.out, "voice", args.voice)
