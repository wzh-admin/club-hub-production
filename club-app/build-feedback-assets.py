"""从本地 P5 Spriters 压缩包按需提取少量透明角色帧，生成网页反馈组件素材。"""
from io import BytesIO
from pathlib import Path
from zipfile import ZipFile

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = Path(__file__).resolve().parent / "assets" / "feedback"
OUT.mkdir(parents=True, exist_ok=True)

ASSETS = {
    "feedback-confirm.webp": (
        ROOT / "P5素材库/02_Spriters全量/Party_Makoto Niijima.zip",
        "Makoto Niijima/b006_002_04_00000000.png",
        520,
    ),
    "feedback-bond.webp": (
        ROOT / "P5素材库/02_Spriters全量/Party_Futaba Sakura.zip",
        "Futaba Sakura/b008_000_03_00000000.png",
        540,
    ),
    "feedback-complete.webp": (
        ROOT / "P5素材库/02_Spriters全量/Party_Morgana.zip",
        "Morgana/b003_008_00_00000000.png",
        430,
    ),
    "empty-morgana.webp": (
        ROOT / "P5素材库/02_Spriters全量/Party_Morgana.zip",
        "Morgana/b003_003_00_00000000.png",
        360,
    ),
}


def trim_alpha(image: Image.Image) -> Image.Image:
    """仅裁掉透明边缘，不改变角色内容。"""
    image = image.convert("RGBA")
    box = image.getchannel("A").getbbox()
    return image.crop(box) if box else image


for filename, (archive, member, target_height) in ASSETS.items():
    with ZipFile(archive) as source:
        image = trim_alpha(Image.open(BytesIO(source.read(member))))
    if image.height > target_height:
        target_width = round(image.width * target_height / image.height)
        image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
    output = OUT / filename
    image.save(output, "WEBP", quality=88, method=6, lossless=False)
    print(output.relative_to(ROOT), image.size, round(output.stat().st_size / 1024), "KB")
