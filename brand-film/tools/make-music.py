#!/usr/bin/env python3
"""
Composes and synthesizes the film's music, in the register of product-launch reels: 120 BPM melodic tech,
four-on-the-floor kick with sidechain pumping, sub bass, filtered saw pads, a 16th-note pluck arpeggio with
ping-pong delay, a riser into the brand reveal, an impact on the logo, and a breakdown under the three
promises so the voice has room. Everything is generated here (no samples, no licensing), stereo, 48 kHz.

Bar grid: bar 0 starts at 1.0 s (the first spoken word), one bar = 2.0 s. So the drop lands at bar 5 (11.0 s,
the pile becomes the brand bar), the showcase at bar 8 (17 s), the process at bar 13 (27 s), the breakdown at
bar 16.5 (34 s) and the final impact at bar 20 (41.0 s, the wordmark). Chords cycle Am, F, C, G, one per bar.

The voice (public/audio/voiceover.wav) ducks the whole music by up to -7 dB while it speaks; the pluck arpeggio
ducks a further -7 dB, claps -8 dB, hats and shaker -6 dB, the pad's filter closes, and the 1-4 kHz band dips -5 dB
(dynamic EQ), so the kick and bass keep the groove while the words stay clear.

  python3 -I tools/make-music.py [--out public/audio/music.wav] [--voice public/audio/voiceover.wav]
"""
import argparse, os, subprocess, tempfile
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt, fftconvolve, sawtooth

SR = 48000
DUR = 44.0
N = int(SR * DUR)
BPM = 120
BEAT = 60 / BPM
BAR = 4 * BEAT
T0 = 1.0
rng = np.random.default_rng(42)

ap = argparse.ArgumentParser()
ap.add_argument("--out", default="public/audio/music.wav")
ap.add_argument("--voice", default="public/audio/voiceover.wav")
ap.add_argument("--duck-db", type=float, default=7.0)
ap.add_argument("--duck-band-db", type=float, default=5.0, help="Extra dip of the 1-4 kHz band under the voice (dynamic EQ)")
ap.add_argument("--duck-arp-db", type=float, default=7.0, help="Extra dip of the pluck arpeggio under the voice")
ap.add_argument("--duck-claps-db", type=float, default=8.0, help="Extra dip of the claps under the voice")
ap.add_argument("--duck-hats-db", type=float, default=6.0, help="Extra dip of hats and shaker under the voice")
args = ap.parse_args()

def bar(b): return T0 + b * BAR
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
def lp(x, fc, order=2):
    return sosfilt(butter(order, min(fc, SR / 2 - 100), btype="low", fs=SR, output="sos"), x)
def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, btype="high", fs=SR, output="sos"), x)
def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=SR, output="sos"), x)
def env_ad(n, a, d, curve=5.0):
    """Attack (s) then exponential decay (s) over n samples."""
    t = np.arange(n) / SR
    e = np.where(t < a, t / max(a, 1e-6), np.exp(-(t - a) * curve / max(d, 1e-6)))
    return e
def add(buf, start, x, gain=1.0, pan=0.0):
    """Mix mono x into stereo buf at time start (s) with constant-power pan (-1..1)."""
    i = int(start * SR)
    if i >= N or i < 0: return
    n = min(len(x), N - i)
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    buf[i:i + n, 0] += x[:n] * gain * l
    buf[i:i + n, 1] += x[:n] * gain * r

# ---------------------------------------------------------------- arrangement
CHORDS = {  # triads, close voicings, plus bass root
    "Am": ([57, 60, 64], 33),
    "F": ([53, 57, 60], 29),
    "C": ([55, 60, 64], 36),
    "G": ([55, 59, 62], 31),
}
PROG = ["Am", "F", "C", "G"]
def chord_at(b): return CHORDS[PROG[int(b) % 4]]

# Section bounds in bars.
INTRO = (0, 2.5)       # pad and quiet arp
BUILD = (2.5, 5)       # kick enters, filter opens, riser
DROP = (5, 16.5)       # full groove
BREAK = (16.5, 19.5)   # no kick; pad, arp and hats under the promises
OUTRO = (19.5, 21.5)   # riser, impact at bar 20, chord rings out
LAST_BAR = 21.5

def in_sec(b, s): return s[0] <= b < s[1]

# ---------------------------------------------------------------- drums
drums = np.zeros((N, 2))
hats = np.zeros((N, 2))  # hats and shaker on their own bus so they can duck under the voice
claps = np.zeros((N, 2))  # claps too: they sit squarely in the speech band
kick_times = []

def kick(t, vel=1.0):
    n = int(0.45 * SR); tt = np.arange(n) / SR
    pitch = 48 * (1 + 3.2 * np.exp(-tt * 38))
    ph = 2 * np.pi * np.cumsum(pitch) / SR
    body = np.sin(ph) * np.exp(-tt * 9)
    click = hp(rng.standard_normal(int(0.012 * SR)), 2500) * np.exp(-np.arange(int(0.012 * SR)) * 600 / SR)
    x = body; x[: len(click)] += click * 0.5
    x = np.tanh(x * 1.6) / 1.6
    add(drums, t, x, 0.95 * vel)
    kick_times.append(t)

def hat(t, vel=0.5, open_=False):
    d = 0.32 if open_ else 0.045
    n = int(d * SR)
    x = hp(rng.standard_normal(n), 7500, 4) * np.exp(-np.arange(n) / SR * (7 / d))
    add(hats, t, x, 0.22 * vel, pan=0.25)

def clap(t, vel=1.0):
    n = int(0.22 * SR)
    x = np.zeros(n)
    for k, off in enumerate((0, 0.011, 0.021, 0.03)):
        i = int(off * SR); m = n - i
        x[i:] += bp(rng.standard_normal(m), 900, 4500) * np.exp(-np.arange(m) / SR * (18 if k < 3 else 9)) * (0.6 if k < 3 else 1)
    x += bp(rng.standard_normal(n), 180, 260) * np.exp(-np.arange(n) / SR * 30) * 0.5  # body
    add(claps, t, x, 0.5 * vel)

def shaker(t, vel=0.4):
    n = int(0.06 * SR)
    x = bp(rng.standard_normal(n), 4000, 11000) * env_ad(n, 0.012, 0.04, 4)
    add(hats, t, x, 0.16 * vel, pan=-0.3)

b = 0.0
while b < LAST_BAR:
    t = bar(b)
    beat = int(round((b % 1) * 4)) % 4
    sixteenth = int(round((b % 1) * 16)) % 16
    # Kick: build (quarters, swelling), drop (four on the floor), outro bar 19.5-20 (none), final bar 20 (one hit via impact).
    if sixteenth % 4 == 0:
        if in_sec(b, BUILD) and b >= 3:
            kick(t, 0.55 + 0.45 * (b - 3) / 2)
        elif in_sec(b, DROP):
            kick(t, 1.0)
    # Clap on 2 and 4 in the drop; in the last bar of the build a 16th roll.
    if in_sec(b, DROP) and sixteenth in (4, 12):
        clap(t, 1.0)
    if 4 <= b < 5 and sixteenth % 2 == 0:
        clap(t, 0.35 + 0.65 * (b - 4))
    # Hats: 8ths from bar 2 onward, offbeats louder; open hat on the "and" of 4 every other bar in the drop.
    if b >= 2 and sixteenth % 2 == 0 and not (b >= 20.5):
        off = sixteenth % 4 == 2
        vel = (0.75 if off else 0.45) * (0.6 if in_sec(b, INTRO) or in_sec(b, BUILD) else 1.0)
        if in_sec(b, DROP) and sixteenth == 14 and int(b) % 2 == 1:
            hat(t, 0.8, open_=True)
        else:
            hat(t, vel * (0.8 + 0.2 * rng.random()))
    # Shaker 16ths in the break and the groove, quiet.
    if (in_sec(b, BREAK) or in_sec(b, DROP)) and sixteenth % 2 == 1:
        shaker(t, 0.35 + 0.25 * rng.random())
    b += 1 / 16

# ---------------------------------------------------------------- bass
bass = np.zeros((N, 2))
def bass_note(t, m, d, sub_gain=1.0):
    n = int(d * SR); tt = np.arange(n) / SR
    f = midi(m)
    sub = np.sin(2 * np.pi * f * tt)
    saw = lp(sawtooth(2 * np.pi * f * 2 * tt), 900)
    x = (sub * 0.9 * sub_gain + saw * 0.35) * env_ad(n, 0.004, d * 0.9, 3.0)
    add(bass, t, x, 0.8)

b = 2.5
while b < LAST_BAR:
    t = bar(b)
    root = chord_at(b)[1]
    sixteenth = int(round((b % 1) * 16)) % 16
    if in_sec(b, BUILD) or in_sec(b, DROP):
        # Offbeat 8ths (between the kicks) plus a longer note on beat 1.
        if sixteenth == 0:
            bass_note(t, root, BEAT * 0.9)
        elif sixteenth % 4 == 2:
            bass_note(t, root, BEAT * 0.45)
    elif in_sec(b, BREAK):
        if sixteenth == 0:
            bass_note(t, root, BAR * 0.95, 0.8)
    elif b >= 20 and sixteenth == 0 and int(b) == 20:
        bass_note(t, 33, 3.0, 1.0)
    b += 1 / 16

# ---------------------------------------------------------------- pads
pad_dry = np.zeros((N, 2))
def pad_chord(t, notes, d):
    n = int(d * SR); tt = np.arange(n) / SR
    xl = np.zeros(n); xr = np.zeros(n)
    for m in notes + [notes[0] + 12]:
        f = midi(m)
        for det, side in ((-0.004, 0), (0.0, None), (0.004, 1)):
            w = sawtooth(2 * np.pi * f * (1 + det) * tt + rng.random() * 6.28)
            if side == 0: xl += w
            elif side == 1: xr += w
            else: xl += w * 0.7; xr += w * 0.7
    e = env_ad(n, 0.35, d, 1.2)
    i = int(t * SR); m = min(n, N - i)
    pad_dry[i:i + m, 0] += xl[:m] * e[:m] * 0.11
    pad_dry[i:i + m, 1] += xr[:m] * e[:m] * 0.11

b = 0.0
while b < LAST_BAR:
    notes = chord_at(b)[0]
    d = BAR * 1.05
    if b >= 20: d = 3.2
    if b < 20 or b == 20:
        pad_chord(bar(b), notes, d)
    b += 1.0
# Pad from 0 s: the first chord swells in before bar 0.
pad_chord(0.0, CHORDS["Am"][0], T0 * 1.1)

# Time-varying filter: crossfade between a dark and a bright version by section.
pad_dark = np.stack([lp(pad_dry[:, 0], 550), lp(pad_dry[:, 1], 550)], 1)
pad_bright = np.stack([lp(pad_dry[:, 0], 3800), lp(pad_dry[:, 1], 3800)], 1)
tt = np.arange(N) / SR
bright = np.interp(tt, [0, bar(2.5), bar(5) - 0.05, bar(5), bar(16.5), bar(17), bar(19.5), bar(20), bar(21.5)],
                   [0.05, 0.1, 0.95, 1.0, 1.0, 0.35, 0.8, 1.0, 1.0])
# (the pad is filtered and sidechained once the voice envelope is known, below)

# ---------------------------------------------------------------- pluck arpeggio
arp = np.zeros((N, 2))
def pluck(t, m, vel=1.0, pan=0.0):
    n = int(0.28 * SR); tt_ = np.arange(n) / SR
    f = midi(m)
    w = sawtooth(2 * np.pi * f * tt_) * 0.6 + np.sin(2 * np.pi * f * tt_) * 0.4
    # Filter envelope: bright attack closing down.
    x = lp(w, 4200) * np.exp(-tt_ * 26) + lp(w, 1200) * np.exp(-tt_ * 9) * 0.6
    x *= env_ad(n, 0.002, 0.22, 4.5)
    add(arp, t, x, 0.28 * vel, pan)

PATTERN = [0, 1, 2, 3, 2, 1, 0, 2]  # indexes into [r, 3rd, 5th, octave]
b = 0.0
while b < 20:
    notes = chord_at(b)[0]
    tones = [notes[0] + 12, notes[1] + 12, notes[2] + 12, notes[0] + 24]
    sixteenth = int(round((b % 1) * 16)) % 16
    play = False; vel = 1.0
    if in_sec(b, INTRO):
        play = sixteenth % 2 == 0; vel = 0.45 + 0.1 * (b / 2.5)
    elif in_sec(b, BUILD):
        play = sixteenth % 2 == 0 or b >= 4; vel = 0.6 + 0.4 * (b - 2.5) / 2.5
    elif in_sec(b, DROP):
        play = True; vel = 0.9 if sixteenth % 4 == 0 else 0.7
    elif in_sec(b, BREAK):
        play = sixteenth % 2 == 0; vel = 0.55
    elif in_sec(b, OUTRO):
        play = True; vel = 0.6 + 0.4 * (b - 19.5) / 0.5
    if play:
        step = PATTERN[sixteenth % 8] if not in_sec(b, DROP) else PATTERN[(sixteenth + (int(b) % 2) * 3) % 8]
        pluck(bar(b), tones[step], vel, pan=(-0.35 if sixteenth % 2 == 0 else 0.35))
    b += 1 / 16
# Ping-pong delay, dotted eighth.
dl = int(BEAT * 0.75 * SR)
arp_d = arp.copy()
fb = 0.38
for k in range(1, 6):
    g = fb ** k
    shifted = np.zeros_like(arp)
    shifted[k * dl:] = arp[: N - k * dl]
    # swap channels each repeat
    arp_d += np.stack([shifted[:, k % 2], shifted[:, (k + 1) % 2]], 1) * g
arp = arp_d

# ---------------------------------------------------------------- risers and impacts
fx = np.zeros((N, 2))
def riser(t, d, gain=0.5):
    n = int(d * SR); tt_ = np.arange(n) / SR
    noise = rng.standard_normal(n)
    out = np.zeros(n); seg = max(1, n // 48)
    for i in range(48):
        p = i / 47; fc = 200 + 5000 * p ** 2
        s = noise[i * seg:(i + 1) * seg]
        if len(s) == 0: break
        out[i * seg:i * seg + len(s)] = bp(s, fc * 0.7, min(fc * 1.4, 20000))
    tone = np.sin(2 * np.pi * np.cumsum(110 * (1 + 2 * (tt_ / d) ** 2)) / SR) * 0.35
    x = (out + tone) * (tt_ / d) ** 1.7
    add(fx, t, x, gain)
def impact(t, gain=1.0, f0=44.0):
    n = int(2.4 * SR); tt_ = np.arange(n) / SR
    pitch = f0 * (1 + 2.5 * np.exp(-tt_ * 14))
    boom = np.sin(2 * np.pi * np.cumsum(pitch) / SR) * np.exp(-tt_ * 2.2)
    crash = hp(rng.standard_normal(n), 3000) * np.exp(-tt_ * 3.5) * 0.25
    x = np.tanh((boom + crash) * 1.4) / 1.4
    add(fx, t, x, gain)
riser(bar(3), bar(5) - bar(3), 0.5)
impact(bar(5), 0.9)
riser(bar(19.5), bar(20) - bar(19.5) + 0.02, 0.35)
impact(bar(20), 1.0, 41.0)

# ---------------------------------------------------------------- sidechain from the kicks
sc = np.ones(N)
tt = np.arange(N) / SR
for k in kick_times:
    i = int(k * SR); m = min(int(0.42 * SR), N - i)
    sc[i:i + m] = np.minimum(sc[i:i + m], 1 - 0.72 * np.exp(-np.arange(m) / SR * 9))
# Final impact pumps too
i = int(bar(20) * SR); m = min(int(0.6 * SR), N - i)
sc[i:i + m] = np.minimum(sc[i:i + m], 1 - 0.8 * np.exp(-np.arange(m) / SR * 5))
bass *= sc[:, None]; arp *= (0.55 + 0.45 * sc)[:, None]

# ---------------------------------------------------------------- voice envelope (for ducking)
duck = np.zeros(N)
if args.voice and os.path.exists(args.voice):
    v, vsr = sf.read(args.voice)
    if v.ndim > 1: v = v.mean(1)
    if vsr != SR:
        from scipy.signal import resample_poly
        v = resample_poly(v, SR, vsr)
    v = np.pad(v, (0, max(0, N - len(v))))[:N]
    win = int(0.05 * SR)
    rms = np.sqrt(np.convolve(v ** 2, np.ones(win) / win, mode="same"))
    pres = np.clip((20 * np.log10(rms + 1e-9) + 40) / 15, 0, 1)  # -40 dBFS → 0, -25 dBFS → 1
    d = 0.0
    att, rel = np.exp(-1 / (0.02 * SR)), np.exp(-1 / (0.35 * SR))
    for i in range(N):
        d = pres[i] + (d - pres[i]) * (att if pres[i] > d else rel)
        duck[i] = d
bright_v = bright * (1 - 0.75 * duck)  # pad filter closes under the voice
# The parts that live in the speech band step back most while the voice speaks.
arp *= (10 ** (-args.duck_arp_db * duck / 20))[:, None]
hats *= (10 ** (-args.duck_hats_db * duck / 20))[:, None]
claps *= (10 ** (-args.duck_claps_db * duck / 20))[:, None]
# The pad closes its filter while the voice speaks (bright → dark), which is where most of its presence lives.
pad = pad_dark * (1 - bright_v[:, None]) + pad_bright * bright_v[:, None]
pad = np.stack([hp(pad[:, 0], 140), hp(pad[:, 1], 140)], 1)
pad *= (0.45 + 0.55 * sc)[:, None]

# ---------------------------------------------------------------- reverb send
ir_n = int(1.6 * SR)
ir = rng.standard_normal((ir_n, 2)) * np.exp(-np.arange(ir_n) / SR * 3.2)[:, None]
ir = np.stack([lp(ir[:, 0], 4500), lp(ir[:, 1], 4500)], 1)
ir /= np.sqrt(np.sum(ir ** 2, axis=0))
send = pad * 0.5 + arp * 0.35 + drums * 0.15 + claps * 0.25 + hats * 0.1 + fx * 0.3
wet = np.stack([fftconvolve(send[:, c], ir[:, c])[:N] for c in range(2)], 1) * 0.5

# ---------------------------------------------------------------- mix
mix = drums * 1.0 + claps * 1.0 + hats * 1.0 + bass * 1.0 + pad * 1.0 + arp * 1.0 + fx * 1.0 + wet
# Section gain: a little lower during the break and the groove under the voice.
gain = np.interp(tt, [0, bar(2.5), bar(5), bar(16.5), bar(17), bar(19.5), bar(20), bar(21.2), bar(21.5), DUR],
                 [0.8, 0.85, 1.0, 1.0, 0.75, 0.9, 1.0, 1.0, 0.0, 0.0])
mix *= gain[:, None]
# Ducking under the voice: the whole mix, plus an extra dip of the speech band.
if duck.any():
    mix *= (10 ** (-args.duck_db * duck / 20))[:, None]
    # Dynamic EQ: the speech band (1-4 kHz) dips further while the voice is present, so plucks and hats never
    # sit on top of consonants. The rest of the spectrum keeps the groove.
    band = np.stack([bp(mix[:, c], 1000, 4000) for c in range(2)], 1)
    mix = (mix - band) + band * (10 ** (-args.duck_band_db * duck / 20))[:, None]
    print("ducked under voice: max", round(args.duck_db, 1), "dB, plus", round(args.duck_band_db, 1), "dB in the speech band")

# Diagnostics: what occupies the speech band while the voice speaks (17-25 s, the showcase).
if os.environ.get("MUSIC_DIAG"):
    g = (10 ** (-args.duck_db * duck / 20))[:, None]
    seg = slice(int(17.2 * SR), int(25.4 * SR))
    for name, bus in (("drums", drums), ("claps", claps), ("hats", hats), ("bass", bass), ("pad", pad), ("arp", arp), ("fx", fx), ("wet", wet)):
        x = (bus * gain[:, None] * g)[seg].mean(1)
        xb = bp(x, 1000, 4000)
        print(f"  {name:6s} band 1-4k {20*np.log10(np.sqrt(np.mean(xb**2))+1e-9):6.1f} dB   full {20*np.log10(np.sqrt(np.mean(x**2))+1e-9):6.1f} dB")

# Soft limit and normalize to about -4 dBTP; loudness is set in the mix by Film.tsx.
mix = np.tanh(mix / (np.max(np.abs(mix)) * 0.8) * 1.2) / 1.2
mix = mix / np.max(np.abs(mix)) * 10 ** (-4 / 20)
os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
sf.write(args.out, mix.astype(np.float32), SR, subtype="PCM_24")
r = subprocess.run(["ffmpeg", "-v", "info", "-i", args.out, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
summ = [l.strip() for l in r.stderr.splitlines() if l.strip().startswith(("I:", "Peak:", "LRA:"))][-3:]
print("wrote", args.out, "|", " ".join(summ))
