#!/usr/bin/env python3
"""
Synthesizes the film's spot-effects stem from the timeline in SOUND_DESIGN.md:

  public/audio/sfx.wav  – soft ticks on word hits and short air whooshes on the wipes.

The music, including the riser into the reveal and the impacts, is tools/make-music.py.

Everything is generated, so there are no licensing questions, and every cue is a number in this file that
can be moved when the voiceover is recorded. Levels leave headroom for a voice at about -16 LUFS.
"""
import math
import os
import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile

SR = 48000
FPS = 30
DUR = 44.0
N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(7)

def f2s(frame): return frame / FPS

def env(start, attack, hold, release, total=N):
    """Linear attack, hold, exponential-ish release. Times in seconds."""
    e = np.zeros(total)
    a0, a1 = int(start * SR), int((start + attack) * SR)
    h1 = int((start + attack + hold) * SR)
    r1 = int((start + attack + hold + release) * SR)
    a1, h1, r1 = min(a1, total), min(h1, total), min(r1, total)
    if a1 > a0: e[a0:a1] = np.linspace(0, 1, a1 - a0)
    e[a1:h1] = 1
    if r1 > h1: e[h1:r1] = np.exp(-4 * np.linspace(0, 1, r1 - h1))
    return e

def bandpass(x, lo, hi, order=4):
    sos = butter(order, [lo, hi], btype="band", fs=SR, output="sos")
    return sosfilt(sos, x)

def lowpass(x, fc, order=4):
    sos = butter(order, fc, btype="low", fs=SR, output="sos")
    return sosfilt(sos, x)

def highpass(x, fc, order=2):
    sos = butter(order, fc, btype="high", fs=SR, output="sos")
    return sosfilt(sos, x)

def add(buf, start, x, gain=1.0):
    i = int(start * SR)
    n = min(len(x), N - i)
    if n > 0: buf[i:i + n] += x[:n] * gain

# ---------------------------------------------------------------- sfx
sfx = np.zeros(N)

def tick(start, gain=0.5, tone=2600):
    n = int(0.045 * SR)
    x = bandpass(rng.standard_normal(n), tone * 0.6, tone * 1.6) * np.exp(-90 * np.arange(n) / SR)
    add(sfx, start, x, gain)

def whoosh(start, length=0.5, gain=0.35, rise=True):
    n = int(length * SR)
    x = rng.standard_normal(n)
    # Sweep a band-pass up (rise) or down.
    out = np.zeros(n)
    seg = n // 12
    for i in range(12):
        p = i / 11
        fc = 300 + (2600 * (p if rise else 1 - p))
        out[i * seg:(i + 1) * seg] = bandpass(x[i * seg:(i + 1) * seg], fc * 0.7, fc * 1.4)[: (i + 1) * seg - i * seg]
    out *= np.sin(math.pi * np.linspace(0, 1, n)) ** 1.5
    add(sfx, start, out, gain)

def riser(start, length=2.6, gain=0.45):
    n = int(length * SR)
    x = rng.standard_normal(n)
    out = np.zeros(n)
    seg = n // 40
    for i in range(40):
        p = i / 39
        fc = 150 + 3500 * p ** 2
        out[i * seg:(i + 1) * seg] = bandpass(x[i * seg:(i + 1) * seg], fc * 0.7, fc * 1.4)[: (i + 1) * seg - i * seg]
    out *= np.linspace(0, 1, n) ** 1.6
    add(sfx, start, out, gain)

def sub_hit(start, gain=0.9, f0=48.0):
    n = int(1.4 * SR)
    tt = np.arange(n) / SR
    pitch = f0 * (1 + 2.2 * np.exp(-tt * 18))  # fast pitch drop
    ph = 2 * math.pi * np.cumsum(pitch) / SR
    x = np.sin(ph) * np.exp(-3.2 * tt)
    click = lowpass(rng.standard_normal(int(0.02 * SR)), 3000) * np.exp(-400 * np.arange(int(0.02 * SR)) / SR)
    add(sfx, start, x, gain)
    add(sfx, start, click, 0.25)

# Scene 1: caret ticks and the word hits.
for fr in (0, 18): tick(f2s(fr), 0.18, 1800)
for fr in (30, 48, 66, 92): tick(f2s(fr), 0.22)
# Scene 2: the dark panel wipes up; six layers drop in.
whoosh(f2s(150), 0.5, 0.3)
for i in range(6): tick(f2s(168 + i * 13), 0.3, 1400 + i * 120)
# Into scene 3: the music carries the riser and the impact; a whoosh as the wordmark unmasks.
whoosh(f2s(374), 0.45, 0.3)
tick(f2s(442), 0.25)
# Scene 4: five screens slide in.
for i in range(5): whoosh(f2s(510 + i * 60), 0.42, 0.28, rise=(i % 2 == 0))
# Scene 5: the rule reaches each step.
for i in range(4): tick(f2s(810 + 22 + i * 38), 0.3, 2200)
whoosh(f2s(810), 0.5, 0.25, rise=False)
# Scene 6: the paper panel, three statements.
whoosh(f2s(1020), 0.5, 0.3)
for fr in (8, 106, 140): tick(f2s(1020 + fr + 22), 0.28, 2000)
# Scene 7: the music carries the final impact; a tick on the button.
whoosh(f2s(1200), 0.45, 0.3)
tick(f2s(1258), 0.2)

sfx = sfx / max(1e-9, np.max(np.abs(sfx))) * 10 ** (-5 / 20)  # peak -5 dBFS

os.makedirs("public/audio", exist_ok=True)
wavfile.write("public/audio/sfx.wav", SR, (sfx * 32767).astype(np.int16))
print("wrote public/audio/sfx.wav", f"{DUR}s @ {SR} Hz")
