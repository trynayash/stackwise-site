#!/usr/bin/env python3
"""Pull one frame per second from a render and tile them, for review: contact-sheet.py in.mp4 out.png [cols]"""
import subprocess, sys, tempfile, os, glob
from PIL import Image, ImageDraw

src, dst = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 8
tmp = tempfile.mkdtemp()
subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-vf", "fps=1,scale=-2:360", os.path.join(tmp, "f%03d.png")], check=True)
frames = sorted(glob.glob(os.path.join(tmp, "f*.png")))
ims = [Image.open(f) for f in frames]
w, h = ims[0].size
rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * w, rows * (h + 22)), "#222")
d = ImageDraw.Draw(sheet)
for i, im in enumerate(ims):
    x, y = (i % cols) * w, (i // cols) * (h + 22)
    sheet.paste(im, (x, y + 22))
    d.text((x + 6, y + 4), f"{i:02d}s", fill="#ddd")
sheet.save(dst)
print(dst, sheet.size, len(ims), "frames")
