"""
process_images.py — WILLIAM VENDE
Convierte todas las imágenes de imagenes_productos/ a WebP 600×600 con fondo blanco.
Uso: python process_images.py
"""
import subprocess, sys

# Auto-instalar dependencias
subprocess.check_call(
    [sys.executable, '-m', 'pip', 'install', '-q', 'Pillow', 'pillow-avif-plugin'],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

from PIL import Image
import pathlib, shutil

try:
    import pillow_avif  # registra el decodificador AVIF en Pillow
    print("  [avif] pillow-avif-plugin cargado OK")
except ImportError:
    print("  [avif] pillow-avif-plugin no disponible — AVIF se copiará como .avif")

SRC = pathlib.Path('public/images/imagenes_productos')
DST = pathlib.Path('public/images/productos')
DST.mkdir(parents=True, exist_ok=True)

MAPPING = {
    'AIRPODS 3 GENERACION.png':          'airpods-3gen.webp',
    'AIRPODS 4 GENERACION.webp':         'airpods-4gen.webp',
    'AIRPODS PRO 2 GENERACION.webp':     'airpods-pro-2.webp',
    'AIRPODS MAX AZUL-MEIDANOCHE.webp':  'airpods-max-azul.webp',
    'AIRPODS MAX BLANCOS.webp':          'airpods-max-blancos.webp',
    'APPLE WATCH ULTRA 2.webp':          'watch-ultra-2.webp',
    'APPLE WATCH SERIES 10.webp':        'watch-series-10.webp',
    'CARGADOR USB-C 20W.webp':           'cargador-usbc.webp',
    'CABLE USB C A LIGHTNING.webp':      'cable-lightning.webp',
    'CABLE- USB C A USB- C.avif':        'cable-usbc.webp',
    'PARLANTE T&G.png':                  'parlante-tg.webp',
}

SIZE  = 600   # canvas final
THUMB = 540   # imagen interior (margen de 30px por lado)

avif_fallback = {}  # src_name -> dst_name real (si cayó en copia .avif)

print(f"\nProcesando {len(MAPPING)} imagenes -> {DST}\n")

for src_name, dst_name in MAPPING.items():
    src = SRC / src_name
    if not src.exists():
        print(f"  MISSING  {src_name}")
        continue
    try:
        img = Image.open(src).convert('RGBA')
        img.thumbnail((THUMB, THUMB), Image.LANCZOS)

        canvas = Image.new('RGBA', (SIZE, SIZE), (255, 255, 255, 255))
        ox = (SIZE - img.width)  // 2
        oy = (SIZE - img.height) // 2
        canvas.paste(img, (ox, oy), img)

        canvas.convert('RGB').save(DST / dst_name, 'WEBP', quality=85, method=6)
        kb = (DST / dst_name).stat().st_size // 1024
        print(f"  OK       {src_name:45s} ->{dst_name}  ({kb} KB)")

    except Exception as e:
        # Fallback para AVIF u otros formatos no soportados: copiar tal cual
        fallback = dst_name.replace('.webp', '.avif')
        shutil.copy(src, DST / fallback)
        avif_fallback[src_name] = fallback
        kb = (DST / fallback).stat().st_size // 1024
        print(f"  COPY     {src_name:45s} ->{fallback}  ({kb} KB)  [{e}]")

print("\nListo!")
if avif_fallback:
    print("\nATENCION: Los siguientes archivos NO se convirtieron y quedaron como .avif:")
    for k, v in avif_fallback.items():
        print(f"   {k} -> {v}")
    print("  Actualiza la ruta en products.js si es necesario.")
