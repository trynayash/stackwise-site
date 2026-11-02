#!/usr/bin/env python3
"""
Synthesizes the film's two audio stems from the timeline in SOUND_DESIGN.md:

  public/audio/bed.wav  – a low, slow music bed: two detuned sines an octave apart under filtered noise,
                          breathing on a 4-bar cycle, with a quiet pulse through the process scene.
  public/audio/sfx.wav  – the spot effects: soft ticks on word hits, a riser into the brand reveal,
                          a sub hit on the reveal, short air whooshes on wipes, a final hit on the end card.

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

# ---------------------------------------------------------------- bed
bed = np.zeros(N)
# Two detuned sines at A1 and A2, plus a fifth, with slow vibrato so it never sounds static.
vib = 1 + 0.0015 * np.sin(2 * math.pi * 0.11 * t)
for f, g in ((55.0, 0.55), (55.3, 0.35), (110.0, 0.25), (165.0, 0.08)):
    bed += g * np.sin(2 * math.pi * f * vib * t)
# Breathing: a 7-second cycle on the pad.
breath = 0.75 + 0.25 * np.sin(2 * math.pi * t / 7.0 - math.pi / 2)
bed *= breath
# Air: pink-ish noise, low-passed, very quiet, for texture.
air = lowpass(rng.standard_normal(N), 900) * 0.035
bed += air
# Section shaping: quiet open, rises through the complexity scene, settles under the showcase,
# a touch warmer on the paper scene, and resolves on the end card.
shape = np.interp(t, [0, 4.5, 10.5, 11.2, 17, 27, 34, 40, 41, 43.3, 44], [0.55, 0.6, 1.0, 0.85, 0.75, 0.7, 0.8, 0.75, 0.9, 0.9, 0.0])
bed *= shape
# Pulse through the process scene (27–34 s): a soft filtered click every half second.
for k in range(14):
    s = 27.0 + k * 0.5
    click = highpass(lowpass(rng.standard_normal(int(0.08 * SR)), 1800), 300) * np.exp(-50 * np.arange(int(0.08 * SR)) / SR)
    add(bed, s, click, 0.05)
# Fade in/out
bed *= env(0, 0.6, DUR - 1.3, 0.7)
bed = lowpass(bed, 4000)
bed = bed / np.max(np.abs(bed)) * 10 ** (-9 / 20)   # peak -9 dBFS

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
# Into scene 3: riser, then the sub hit as the stack becomes the bar; tick as the wordmark unmasks.
riser(f2s(330) - 2.6)
sub_hit(f2s(330) + 0.5)
whoosh(f2s(374), 0.45, 0.3)
tick(f2s(442), 0.25)
# Scene 4: five screens slide in.
for i in range(5): whoosh(f2s(510 + i * 60), 0.42, 0.28, rise=(i % 2 == 0))
# Scene 5: the rule reaches each step.
for i in range(4): tick(f2s(810 + 22 + i * 38), 0.3, 2200)
whoosh(f2s(810), 0.5, 0.25, rise=False)
# Scene 6: the paper panel, three statements.
whoosh(f2s(1020), 0.5, 0.3)
for i in range(3): tick(f2s(1020 + 16 + i * 54 + 22), 0.28, 2000)
# Scene 7: final hit under the wordmark, a tick on the button.
whoosh(f2s(1200), 0.45, 0.3)
sub_hit(f2s(1230), 0.7, 44.0)
tick(f2s(1258), 0.2)

sfx = sfx / max(1e-9, np.max(np.abs(sfx))) * 10 ** (-5 / 20)  # peak -5 dBFS

os.makedirs("public/audio", exist_ok=True)
wavfile.write("public/audio/bed.wav", SR, (bed * 32767).astype(np.int16))
wavfile.write("public/audio/sfx.wav", SR, (sfx * 32767).astype(np.int16))
print("wrote public/audio/bed.wav and public/audio/sfx.wav", f"{DUR}s @ {SR} Hz")
