#!/usr/bin/env python3
"""
Writes a sidecar captions file (SRT and WebVTT) for the film from the same frame marks the voice is cut to
(tools/make-voice.py), so platforms that autoplay muted (X, LinkedIn, Instagram feed) still carry the words.
Long lines are split at clause boundaries so no caption runs past about 42 characters per line.

  python3 -I tools/make-captions.py [--out out/stackwise-brand-film]
"""
import argparse, os

FPS = 30
# (in frame, out frame, text) — the "out" is where the spoken line ends, from the generated track's durations.
LINES = [
    (30, 112, "Every great digital product starts with an idea."),
    (162, 310, "But turning that idea into something people actually use takes more than just code."),
    (348, 400, "That's where StackWise comes in."),
    (516, 762, "From SaaS platforms and AI-powered applications to websites and custom software, we design, build and ship digital products."),
    (822, 990, "From the first conversation and design to engineering and launch, we stay with you through every step."),
    (1026, 1116, "Work directly with the engineer building your product."),
    (1126, 1158, "Know what you're paying."),
    (1160, 1194, "Own what we build."),
    (1212, 1266, "Have an idea? Let's build it."),
    (1278, 1308, "StackWise."),
]

def split(text, limit=42):
    """Break a line into caption chunks at commas or 'to'/'and' when it is too long for two lines."""
    if len(text) <= limit * 2 - 10:
        return [text]
    parts, cur = [], ""
    for w in text.split(" "):
        if len(cur) + len(w) + 1 > limit * 2 - 10 and cur:
            parts.append(cur.strip()); cur = ""
        cur += w + " "
    if cur.strip(): parts.append(cur.strip())
    return parts

def wrap(text, limit=42):
    words, lines, cur = text.split(" "), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > limit and cur:
            lines.append(cur.strip()); cur = ""
        cur += w + " "
    if cur.strip(): lines.append(cur.strip())
    return "\n".join(lines)

def ts(frame, vtt=False):
    s = frame / FPS
    h, m = int(s // 3600), int(s % 3600 // 60)
    sec = s % 60
    return f"{h:02d}:{m:02d}:{sec:06.3f}".replace(".", "." if vtt else ",")

ap = argparse.ArgumentParser()
ap.add_argument("--out", default="out/stackwise-brand-film")
args = ap.parse_args()

cues = []
for f_in, f_out, text in LINES:
    chunks = split(text)
    span = (f_out - f_in) / len(chunks)
    for i, c in enumerate(chunks):
        a = int(f_in + i * span); b = int(f_in + (i + 1) * span)
        cues.append((a, b, wrap(c)))

os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
with open(args.out + ".srt", "w") as f:
    for i, (a, b, t) in enumerate(cues, 1):
        f.write(f"{i}\n{ts(a)} --> {ts(b)}\n{t}\n\n")
with open(args.out + ".vtt", "w") as f:
    f.write("WEBVTT\n\n")
    for a, b, t in cues:
        f.write(f"{ts(a, True)} --> {ts(b, True)}\n{t}\n\n")
print("wrote", args.out + ".srt", "and .vtt,", len(cues), "cues")
