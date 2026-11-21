#!/usr/bin/env python3
"""Regenera íconos de Mi iA a tamaño completo desde el diseño oficial."""
from pathlib import Path
from base64 import b64encode
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ICONS = ROOT / "icons"
SOURCE = ICONS / "mi-ia-source.webp"

art = Image.open(SOURCE).convert("RGB")
width, height = art.size
side = min(width, height)
left, top = (width - side) // 2, (height - side) // 2
# Se elimina el pequeño margen oscuro que rodea el diseño, sin redibujarlo.
border = round(side * 0.04)
art = art.crop((left + border, top + border,
                left + side - border, top + side - border))

def resized(size):
    return art.resize((size, size), Image.Resampling.LANCZOS)

# Resoluciones específicas para pestañas, accesos directos y PWA.
for size in (16, 32, 48, 64, 72, 96, 144, 192, 256, 384, 512):
    resized(size).save(ICONS / f"icon-{size}.png", optimize=True)
resized(180).save(ICONS / "apple-touch-icon.png", optimize=True)

# IMPORTANTE: los iconos maskable NO deben llevar el fondo con dibujo
# reducido al 76 %: Android añade su propia máscara, generando un marco negro.
# Fondo completo hasta los bordes; Android recorta según la forma del launcher.
for size in (192, 512):
    resized(size).save(ICONS / f"maskable-{size}.png", optimize=True)

resized(512).save(ICONS / "favicon.ico", format="ICO",
                  sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# SVG consistente con el recorte de los PNG, sin rediseñar el gráfico.
raw = Image.open(SOURCE)
raw_side = min(raw.size)
zoom = raw_side / (raw_side - 2 * round(raw_side * 0.04))
extent = 512 * zoom
offset = (extent - 512) / 2
encoded = b64encode(SOURCE.read_bytes()).decode("ascii")
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">'
    f'<image x="-{offset:.3f}" y="-{offset:.3f}" '
    f'width="{extent:.3f}" height="{extent:.3f}" '
    f'href="data:image/webp;base64,{encoded}"/>'
    '</svg>\n'
)
(ICONS / "icon.svg").write_text(svg, encoding="utf-8")
print("Iconos de Mi iA: sin margen extra y preparados en distintos tamaños.")
