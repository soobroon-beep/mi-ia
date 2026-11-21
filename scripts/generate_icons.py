#!/usr/bin/env python3
"""Regenera los iconos de Mi IA desde el diseño oficial compartido por el usuario."""
from pathlib import Path
from base64 import b64encode
from html import escape
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ICONS = ROOT / "icons"
SOURCE = ICONS / "mi-ia-source.webp"
art = Image.open(SOURCE).convert("RGBA")

def resized(size):
    return art.resize((size, size), Image.Resampling.LANCZOS)

for size in (32, 48, 96, 192, 512):
    resized(size).save(ICONS / f"icon-{size}.png", optimize=True)

resized(180).save(ICONS / "apple-touch-icon.png", optimize=True)

for size in (192, 512):
    background = Image.new("RGBA", (size, size), "#05060d")
    # Da margen de seguridad para máscaras de iconos adaptativos de Android.
    inner = int(round(size * 0.76))
    pict = resized(inner)
    offset = (size - inner) // 2
    background.alpha_composite(pict, (offset, offset))
    background.convert("RGB").save(ICONS / f"maskable-{size}.png", optimize=True)

art.convert("RGB").save(ICONS / "favicon.ico", format="ICO", sizes=[(16,16),(32,32),(48,48),(64,64)])
encoded = b64encode(SOURCE.read_bytes()).decode("ascii")
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">'
    f'<image width="512" height="512" href="data:image/webp;base64,{encoded}"/>'
    '</svg>\n'
)
(ICONS / "icon.svg").write_text(svg, encoding="utf-8")
print("Iconos de Mi IA actualizados con el diseño oficial.")
