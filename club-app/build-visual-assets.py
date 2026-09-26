"""Create lightweight page backdrops from the user's P5 PPT and local asset archive."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
P5_ASSETS = Path(__file__).resolve().parent / 'assets' / 'p5'
OUT = Path(__file__).resolve().parent / 'assets' / 'visual'
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1600, 1000

def overlay(dst, im, box, opacity=1):
    im = ImageOps.fit(im.convert('RGBA'), (box[2], box[3]), method=Image.Resampling.LANCZOS)
    if opacity != 1:
        im.putalpha(im.getchannel('A').point(lambda x: round(x * opacity)))
    dst.alpha_composite(im, box[:2])

def polygon(dst, points, color):
    layer = Image.new('RGBA', (W,H))
    ImageDraw.Draw(layer).polygon(points, fill=color)
    dst.alpha_composite(layer)

city = Image.open(ROOT / 'P5素材库/07_网页即用UI图形/calendar.jpg').convert('L')
city = ImageOps.colorize(ImageEnhance.Contrast(city).enhance(1.35), '#120e10', '#d3c6bd')
ppt = Image.open(ROOT / 'club-app/assets/ppt/image14.png').convert('RGBA')
pattern = ppt.crop((1150, 0, 1920, 1080))
star = Image.open(ROOT / 'P5素材库/07_网页即用UI图形/p5star.gif')
star.seek(5)
star = star.convert('RGBA')
star.putalpha(star.convert('RGB').convert('L').point(lambda x: 255 if x < 235 else 0))

def tint_character(path, color):
    im = Image.open(path).convert('RGBA')
    alpha = im.getchannel('A')
    ink = Image.new('RGBA', im.size, color)
    ink.putalpha(alpha)
    return ink

# Mission board: tactical city / angular warning slash / P5 star texture.
e = Image.new('RGBA', (W,H), '#130e10')
overlay(e, city, (0, 70, W, 930), .42)
polygon(e, [(1070,-40),(1370,-40),(610,1000),(310,1000)], '#bd001e88')
polygon(e, [(1300,0),(1600,0),(1600,1000),(790,1000)], '#090708bb')
overlay(e, pattern, (900,-85,760,1060), .42)
overlay(e, star, (1040, 105, 560, 560), .18)
polygon(e, [(0,780),(1600,520),(1600,548),(0,808)], '#d0002299')
e.convert('RGB').save(OUT / 'mission-city.webp', 'WEBP', quality=85, method=6)

# Bonds board: the P5 hand/star menu geometry becomes a social collage.
c = Image.new('RGBA', (W,H), '#480009')
polygon(c, [(0,0),(340,0),(920,1000),(610,1000)], '#0b090bbd')
polygon(c, [(930,0),(1600,0),(1600,1000),(1220,1000)], '#16090fee')
overlay(c, pattern, (655,-100,945,1180), .7)
overlay(c, star, (1060,180,475,475), .18)
# Three overlapping club-member silhouettes make the social page feel inhabited.
for path, box, color, opacity in [
    (P5_ASSETS / 'img' / 'member-ann.webp', (1050,180,390,650), '#f2eeeaff', .34),
    (P5_ASSETS / 'img' / 'member-futaba.webp', (1240,290,330,550), '#d30025ff', .48),
    (P5_ASSETS / 'img' / 'member-makoto.webp', (875,355,310,520), '#151012ff', .43),
]: overlay(c, tint_character(path, color), box, opacity)
polygon(c, [(0,820),(1600,550),(1600,575),(0,850)], '#f0ede9a6')
polygon(c, [(0,856),(1600,587),(1600,598),(0,868)], '#080708cf')
c.convert('RGB').save(OUT / 'bonds-collage.webp', 'WEBP', quality=86, method=6)

# Profile board: bright paper dossier, grounded by the same city and star motifs.
m = Image.new('RGBA', (W,H), '#eeeae2')
overlay(m, city, (220,115,1380,885), .27)
polygon(m, [(0,0),(1600,0),(1600,109),(0,103)], '#1c1012')
polygon(m, [(1300,100),(1600,100),(1600,1000),(800,1000)], '#e4d9d2bc')
polygon(m, [(1560,100),(1600,100),(1600,1000),(1130,1000)], '#bc00225c')
overlay(m, star, (1050,310,650,650), .16)
# Mascot watermark keeps the profile page playful without implying a canon character is the member.
morgana = tint_character(P5_ASSETS / 'img' / 'advisor-morgana.webp', '#21161aff')
overlay(m, morgana, (1160,470,390,390), .20)
polygon(m, [(1445,100),(1530,100),(970,1000),(885,1000)], '#c90027c9')
polygon(m, [(1500,100),(1518,100),(960,1000),(942,1000)], '#141012dd')
m.convert('RGB').save(OUT / 'profile-dossier.webp', 'WEBP', quality=84, method=6)
for p in OUT.glob('*.webp'):
    print(p.relative_to(ROOT), round(p.stat().st_size / 1024), 'KB')

