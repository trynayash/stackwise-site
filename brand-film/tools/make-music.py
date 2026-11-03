#!/usr/bin/env python3
"""
Composes and synthesizes the film's score: warm, minimal, modern. The register of a product launch film rather
than a club edit: an FM electric piano playing the changes and a small motif, a soft sub bass, a filtered pad,
a muted half-time groove (kick on 1 and the "and" of 2, a rim on 3, light hats and shaker), a pluck arpeggio
that only opens up in the drop, one riser into the brand reveal and one impact on the wordmark, a breakdown
under the three promises so the voice has room, and a resolved A-minor end card. Stereo, 48 kHz, no samples.

Bar grid: bar 0 starts at 1.0 s (the first spoken word), one bar = 2.0 s at 120 BPM (felt as a 60 BPM pulse).
So the drop lands at bar 5 (11.0 s), the showcase at bar 8 (17 s), the process at bar 13 (27 s), the breakdown at
bar 16.5 (34 s) and the final impact at bar 20 (41.0 s). Chords: Am, F, C, G, one per bar.

The voice (public/audio/voiceover.wav) ducks the whole music by up to -6 dB while it speaks; the parts that
live in the speech band (electric piano, arpeggio, rim, hats) step back further and the pad's filter closes,
so the groove stays while the words stay clear.

  python3 -I tools/make-music.py [--out public/audio/music.wav] [--voice public/audio/voiceover.wav]
"""
import argparse, os, subprocess
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
ap.add_argument("--duck-db", type=float, default=6.0, help="Whole-mix dip under the voice")
ap.add_argument("--duck-band-db", type=float, default=4.0, help="Extra dip of the 1-4 kHz band under the voice (dynamic EQ)")
ap.add_argument("--duck-keys-db", type=float, default=8.0, help="Extra dip of the electric piano under the voice")
ap.add_argument("--duck-arp-db", type=float, default=8.0, help="Extra dip of the pluck arpeggio under the voice")
ap.add_argument("--duck-perc-db", type=float, default=7.0, help="Extra dip of rim, hats and shaker under the voice")
args = ap.parse_args()

def bar(b): return T0 + b * BAR
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
def lp(x, fc, order=2): return sosfilt(butter(order, min(fc, SR / 2 - 100), btype="low", fs=SR, output="sos"), x)
def hp(x, fc, order=2): return sosfilt(butter(order, fc, btype="high", fs=SR, output="sos"), x)
def bp(x, lo, hi, order=2): return sosfilt(butter(order, [lo, min(hi, SR / 2 - 100)], btype="band", fs=SR, output="sos"), x)
def env_ad(n, a, d, curve=5.0):
    t = np.arange(n) / SR
    return np.where(t < a, t / max(a, 1e-6), np.exp(-(t - a) * curve / max(d, 1e-6)))
def add(buf, start, x, gain=1.0, pan=0.0):
    i = int(start * SR)
    if i >= N or i < 0: return
    n = min(len(x), N - i)
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    buf[i:i + n, 0] += x[:n] * gain * l
    buf[i:i + n, 1] += x[:n] * gain * r

# ---------------------------------------------------------------- arrangement
CHORDS = {"Am": ([57, 60, 64], 33), "F": ([53, 57, 60], 29), "C": ([55, 60, 64], 36), "G": ([55, 59, 62], 31)}
PROG = ["Am", "F", "C", "G"]
def chord_at(b): return CHORDS[PROG[int(b) % 4]]

INTRO = (0, 2.5)
BUILD = (2.5, 5)
DROP = (5, 16.5)
BREAK = (16.5, 19.5)
OUTRO = (19.5, 21.5)
LAST_BAR = 21.5
def in_sec(b, s): return s[0] <= b < s[1]
def step_of(b): return int(round((b % 1) * 16)) % 16

# ---------------------------------------------------------------- drums (kick on its own; rim, hats, shaker on a "perc" bus)
drums = np.zeros((N, 2))
perc = np.zeros((N, 2))
kick_times = []

def kick(t, vel=1.0, soft=False):
    n = int(0.5 * SR); tt = np.arange(n) / SR
    pitch = 46 * (1 + 2.6 * np.exp(-tt * 34))
    body = np.sin(2 * np.pi * np.cumsum(pitch) / SR) * np.exp(-tt * (10 if soft else 8))
    click = lp(hp(rng.standard_normal(int(0.01 * SR)), 1500), 6000) * np.exp(-np.arange(int(0.01 * SR)) * 700 / SR)
    x = body.copy(); x[: len(click)] += click * (0.18 if soft else 0.35)
    x = np.tanh(x * 1.5) / 1.5
    add(drums, t, x, 0.9 * vel)
    kick_times.append(t)

def rim(t, vel=0.8):
    n = int(0.09 * SR); tt = np.arange(n) / SR
    x = bp(rng.standard_normal(n), 1500, 4200) * np.exp(-tt * 60) + np.sin(2 * np.pi * 820 * tt) * np.exp(-tt * 90) * 0.5
    add(perc, t, x, 0.28 * vel, pan=0.15)

def hat(t, vel=0.5, open_=False):
    d = 0.28 if open_ else 0.04
    n = int(d * SR)
    x = hp(rng.standard_normal(n), 8000, 4) * np.exp(-np.arange(n) / SR * (7 / d))
    add(perc, t, x, 0.14 * vel, pan=0.3)

def shaker(t, vel=0.4):
    n = int(0.07 * SR)
    x = bp(rng.standard_normal(n), 3500, 10000) * env_ad(n, 0.015, 0.045, 4)
    add(perc, t, x, 0.12 * vel, pan=-0.3)

b = 0.0
while b < LAST_BAR:
    t = bar(b); st = step_of(b)
    groove = in_sec(b, DROP)
    build = in_sec(b, BUILD)
    # Half-time: kick on 1 and the "and" of 2 (steps 0 and 6); rim on 3 (step 8).
    if groove and st in (0, 6):
        kick(t, 1.0 if st == 0 else 0.8)
    if build and st == 0 and b >= 3:
        kick(t, 0.5 + 0.5 * (b - 3) / 2, soft=True)
    if groove and st == 8:
        rim(t, 0.9)
    if 4.5 <= b < 5 and st % 2 == 0:  # a short rim roll into the drop
        rim(t, 0.35 + 0.65 * (b - 4.5) * 2)
    # Hats: 8ths, offbeat a little louder, from bar 2; an open hat on the last 8th every other bar in the groove.
    if 2 <= b < 20.5 and st % 2 == 0:
        off = st % 4 == 2
        vel = (0.7 if off else 0.4) * (0.55 if (in_sec(b, INTRO) or build) else (0.6 if in_sec(b, BREAK) else 1.0))
        if groove and st == 14 and int(b) % 2 == 1:
            hat(t, 0.7, open_=True)
        else:
            hat(t, vel * (0.85 + 0.15 * rng.random()))
    # Shaker on the offbeat 16ths through the groove and break, quiet.
    if (groove or in_sec(b, BREAK)) and st % 2 == 1:
        shaker(t, 0.35 + 0.2 * rng.random())
    b += 1 / 16

# ---------------------------------------------------------------- bass
bass = np.zeros((N, 2))
def bass_note(t, m, d, gain=1.0):
    n = int(d * SR); tt = np.arange(n) / SR
    f = midi(m)
    sub = np.sin(2 * np.pi * f * tt)
    body = lp(sawtooth(2 * np.pi * f * tt), 500) * 0.3
    x = (sub * 0.9 + body) * env_ad(n, 0.006, d * 0.9, 3.0)
    add(bass, t, x, 0.75 * gain)

b = 2.5
while b < LAST_BAR:
    t = bar(b); st = step_of(b); root = chord_at(b)[1]
    if in_sec(b, BUILD) or in_sec(b, DROP):
        if st == 0: bass_note(t, root, BEAT * 1.4)
        elif st == 6: bass_note(t, root, BEAT * 0.7, 0.85)
        elif st == 11: bass_note(t, root + (7 if int(b) % 2 else 0), BEAT * 0.45, 0.6)
    elif in_sec(b, BREAK) and st == 0:
        bass_note(t, root, BAR * 0.95, 0.75)
    elif int(b) == 20 and st == 0:
        bass_note(t, 33, 3.0, 1.0)
    b += 1 / 16

# ---------------------------------------------------------------- electric piano (two-operator FM)
keys = np.zeros((N, 2))
def ep(t, m, d, vel=1.0, pan=0.0):
    n = int(d * SR); tt = np.arange(n) / SR
    f = midi(m)
    idx = 1.6 * vel * np.exp(-tt * 7) + 0.15          # modulation index falls quickly: the bell-like attack
    mod = np.sin(2 * np.pi * f * tt) * idx
    car = np.sin(2 * np.pi * f * tt + mod)
    sub = np.sin(2 * np.pi * f * 0.5 * tt) * 0.25 * np.exp(-tt * 3)  # a little octave-down body
    x = (car + sub) * env_ad(n, 0.004, d * 0.6, 3.2)
    x = lp(x, 6500)
    add(keys, t, x, 0.22 * vel, pan)

def chord_voicing(b):
    notes, _ = chord_at(b)
    return [notes[0], notes[1], notes[2], notes[0] + 12]

MOTIF = [76, 72, 74, 76, 72, 69, 71, 72]  # E5 C5 D5 E5 C5 A4 B4 C5: a small, circling figure in A minor
b = 0.0
while b < 21:
    t = bar(b); st = step_of(b)
    sec_gain = 0.75 if in_sec(b, INTRO) else 0.9 if in_sec(b, BUILD) else 1.0 if in_sec(b, DROP) else 0.8 if in_sec(b, BREAK) else 1.0
    # Chords: a soft stab on beat 1 and a lighter one on the "and" of 3.
    if st == 0 or (st == 10 and not in_sec(b, INTRO)):
        for k, m in enumerate(chord_voicing(b)):
            ep(t + k * 0.012, m, BEAT * (2.2 if st == 0 else 1.3), (0.9 if st == 0 else 0.55) * sec_gain, pan=(-0.4 + 0.27 * k))
    # Motif: in the intro, the breakdown and the lift into the end card, 8th notes across two bars.
    if (in_sec(b, INTRO) or in_sec(b, BREAK) or 19.5 <= b < 20) and st % 2 == 0:
        idx = (int(b) % 2) * 8 + st // 2
        ep(t, MOTIF[idx % len(MOTIF)], BEAT * 0.9, 0.55, pan=0.25)
    b += 1 / 16
# Final chord: Am rings out from bar 20.
for k, m in enumerate([57, 60, 64, 69, 72]):
    ep(bar(20) + k * 0.015, m, 3.0, 1.0, pan=(-0.5 + 0.25 * k))

# ---------------------------------------------------------------- pad
pad_dry = np.zeros((N, 2))
def pad_chord(t, notes, d):
    n = int(d * SR); tt = np.arange(n) / SR
    xl = np.zeros(n); xr = np.zeros(n)
    for m in notes + [notes[0] + 12]:
        f = midi(m)
        for det, side in ((-0.003, 0), (0.0, None), (0.003, 1)):
            w = sawtooth(2 * np.pi * f * (1 + det) * tt + rng.random() * 6.28)
            if side == 0: xl += w
            elif side == 1: xr += w
            else: xl += w * 0.7; xr += w * 0.7
    e = env_ad(n, 0.5, d, 1.1)
    i = int(t * SR); m_ = min(n, N - i)
    pad_dry[i:i + m_, 0] += xl[:m_] * e[:m_] * 0.09
    pad_dry[i:i + m_, 1] += xr[:m_] * e[:m_] * 0.09
b = 0.0
while b < 21:
    pad_chord(bar(b), chord_at(b)[0], 3.2 if b >= 20 else BAR * 1.1)
    b += 1.0
pad_chord(0.0, CHORDS["Am"][0], T0 * 1.2)
pad_dark = np.stack([lp(pad_dry[:, 0], 480), lp(pad_dry[:, 1], 480)], 1)
pad_bright = np.stack([lp(pad_dry[:, 0], 3200), lp(pad_dry[:, 1], 3200)], 1)
tt = np.arange(N) / SR
bright = np.interp(tt, [0, bar(2.5), bar(5) - 0.05, bar(5), bar(16.5), bar(17), bar(19.5), bar(20), bar(21.5)],
                   [0.05, 0.1, 0.9, 1.0, 1.0, 0.3, 0.7, 1.0, 1.0])

# ---------------------------------------------------------------- pluck arpeggio (groove only, quiet elsewhere)
arp = np.zeros((N, 2))
def pluck(t, m, vel=1.0, pan=0.0):
    n = int(0.26 * SR); tt_ = np.arange(n) / SR
    f = midi(m)
    w = sawtooth(2 * np.pi * f * tt_) * 0.5 + np.sin(2 * np.pi * f * tt_) * 0.5
    x = lp(w, 3600) * np.exp(-tt_ * 24) + lp(w, 1000) * np.exp(-tt_ * 8) * 0.6
    x *= env_ad(n, 0.002, 0.2, 4.5)
    add(arp, t, x, 0.2 * vel, pan)
PATTERN = [0, 1, 2, 3, 2, 1, 0, 2]
b = 0.0
while b < 20:
    t = bar(b); st = step_of(b)
    notes = chord_at(b)[0]
    tones = [notes[0] + 12, notes[1] + 12, notes[2] + 12, notes[0] + 24]
    play, vel = False, 1.0
    if in_sec(b, BUILD):
        play = st % 2 == 0 and b >= 3.5; vel = 0.5 + 0.5 * (b - 3.5) / 1.5
    elif in_sec(b, DROP):
        play = st % 2 == 0 or (int(b) % 2 == 1 and st % 4 == 1); vel = 0.85 if st % 4 == 0 else 0.6
    elif in_sec(b, OUTRO):
        play = st % 2 == 0; vel = 0.5 + 0.5 * (b - 19.5) / 0.5
    if play:
        pluck(t, tones[PATTERN[(st // 2 + (int(b) % 2) * 3) % 8]], vel, pan=(-0.35 if st % 4 == 0 else 0.35))
    b += 1 / 16
dl = int(BEAT * 0.75 * SR)
arp_d = arp.copy()
for k in range(1, 6):
    shifted = np.zeros_like(arp); shifted[k * dl:] = arp[: N - k * dl]
    arp_d += np.stack([shifted[:, k % 2], shifted[:, (k + 1) % 2]], 1) * (0.36 ** k)
arp = arp_d

# ---------------------------------------------------------------- risers and impacts
fx = np.zeros((N, 2))
def riser(t, d, gain=0.5):
    n = int(d * SR); tt_ = np.arange(n) / SR
    noise = rng.standard_normal(n); out = np.zeros(n); seg = max(1, n // 48)
    for i in range(48):
        p = i / 47; fc = 180 + 4200 * p ** 2
        s = noise[i * seg:(i + 1) * seg]
        if len(s) == 0: break
        out[i * seg:i * seg + len(s)] = bp(s, fc * 0.7, fc * 1.4)
    tone = np.sin(2 * np.pi * np.cumsum(110 * (1 + 2 * (tt_ / d) ** 2)) / SR) * 0.3
    add(fx, t, (out + tone) * (tt_ / d) ** 1.8, gain)
def impact(t, gain=1.0, f0=44.0):
    n = int(2.6 * SR); tt_ = np.arange(n) / SR
    pitch = f0 * (1 + 2.4 * np.exp(-tt_ * 14))
    boom = np.sin(2 * np.pi * np.cumsum(pitch) / SR) * np.exp(-tt_ * 2.0)
    air = hp(rng.standard_normal(n), 2500) * np.exp(-tt_ * 3.2) * 0.18
    add(fx, t, np.tanh((boom + air) * 1.3) / 1.3, gain)
riser(bar(3), bar(5) - bar(3), 0.42)
impact(bar(5), 0.85)
riser(bar(19.5), bar(20) - bar(19.5) + 0.02, 0.3)
impact(bar(20), 0.95, 41.0)

# ---------------------------------------------------------------- sidechain from the kicks (gentle: a breath, not a pump)
sc = np.ones(N)
for k in kick_times:
    i = int(k * SR); m_ = min(int(0.4 * SR), N - i)
    sc[i:i + m_] = np.minimum(sc[i:i + m_], 1 - 0.45 * np.exp(-np.arange(m_) / SR * 8))
i = int(bar(20) * SR); m_ = min(int(0.6 * SR), N - i)
sc[i:i + m_] = np.minimum(sc[i:i + m_], 1 - 0.6 * np.exp(-np.arange(m_) / SR * 5))
bass *= sc[:, None]; arp *= (0.6 + 0.4 * sc)[:, None]; keys *= (0.7 + 0.3 * sc)[:, None]

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
    pres = np.clip((20 * np.log10(rms + 1e-9) + 40) / 15, 0, 1)
    d = 0.0
    att, rel = np.exp(-1 / (0.02 * SR)), np.exp(-1 / (0.35 * SR))
    for i in range(N):
        d = pres[i] + (d - pres[i]) * (att if pres[i] > d else rel)
        duck[i] = d
bright_v = bright * (1 - 0.7 * duck)
pad = pad_dark * (1 - bright_v[:, None]) + pad_bright * bright_v[:, None]
pad = np.stack([hp(pad[:, 0], 140), hp(pad[:, 1], 140)], 1) * (0.55 + 0.45 * sc)[:, None]
keys *= (10 ** (-args.duck_keys_db * duck / 20))[:, None]
arp *= (10 ** (-args.duck_arp_db * duck / 20))[:, None]
perc *= (10 ** (-args.duck_perc_db * duck / 20))[:, None]

# ---------------------------------------------------------------- reverb send
ir_n = int(1.8 * SR)
ir = rng.standard_normal((ir_n, 2)) * np.exp(-np.arange(ir_n) / SR * 3.0)[:, None]
ir = np.stack([lp(ir[:, 0], 4200), lp(ir[:, 1], 4200)], 1)
ir /= np.sqrt(np.sum(ir ** 2, axis=0))
send = pad * 0.45 + keys * 0.45 + arp * 0.3 + perc * 0.2 + fx * 0.3
wet = np.stack([fftconvolve(send[:, c], ir[:, c])[:N] for c in range(2)], 1) * 0.5

# ---------------------------------------------------------------- mix
mix = drums + perc + bass + keys + pad + arp + fx + wet
gain = np.interp(tt, [0, bar(2.5), bar(5), bar(16.5), bar(17), bar(19.5), bar(20), bar(21.2), bar(21.5), DUR],
                 [0.85, 0.9, 1.0, 1.0, 0.8, 0.9, 1.0, 1.0, 0.0, 0.0])
mix *= gain[:, None]
if duck.any():
    mix *= (10 ** (-args.duck_db * duck / 20))[:, None]
    band = np.stack([bp(mix[:, c], 1000, 4000) for c in range(2)], 1)
    mix = (mix - band) + band * (10 ** (-args.duck_band_db * duck / 20))[:, None]
    print("ducked under voice: whole mix", args.duck_db, "dB; keys", args.duck_keys_db, "arp", args.duck_arp_db, "perc", args.duck_perc_db, "band", args.duck_band_db)

if os.environ.get("MUSIC_DIAG"):
    g = (10 ** (-args.duck_db * duck / 20))[:, None]
    seg = slice(int(17.2 * SR), int(25.4 * SR))
    for name, bus in (("drums", drums), ("perc", perc), ("bass", bass), ("keys", keys), ("pad", pad), ("arp", arp), ("fx", fx), ("wet", wet)):
        x = (bus * gain[:, None] * g)[seg].mean(1); xb = bp(x, 1000, 4000)
        print(f"  {name:6s} band 1-4k {20*np.log10(np.sqrt(np.mean(xb**2))+1e-9):6.1f} dB   full {20*np.log10(np.sqrt(np.mean(x**2))+1e-9):6.1f} dB")

mix = np.tanh(mix / (np.max(np.abs(mix)) * 0.85) * 1.15) / 1.15
mix = mix / np.max(np.abs(mix)) * 10 ** (-2.5 / 20)
os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
sf.write(args.out, mix.astype(np.float32), SR, subtype="PCM_24")
r = subprocess.run(["ffmpeg", "-v", "info", "-i", args.out, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
summ = [l.strip() for l in r.stderr.splitlines() if l.strip().startswith(("I:", "Peak:", "LRA:"))][-3:]
print("wrote", args.out, "|", " ".join(summ))
