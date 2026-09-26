# 派生视觉素材来源


> **授权状态更新（2026-09-24，覆盖本文件较早的未核验/仅供研究结论）**：项目负责人确认本项目当前登记的该主题资源已取得公开 Preview 所需授权。授权凭证由负责人留存，未复制到仓库；本记录仅说明负责人确认及既有来源，不代表本仓库独立审核了授权文件。新增/替换资源或超出凭证实际用途范围时须重新核验。

更新时间：2026-09-19。

本目录中的三张页面背景 WebP 由 `club-app/build-visual-assets.py` 从工作区已有素材加工生成；加载星纹则由项目内动画资源提取代表帧。它们只用于当前纯前端 UI 演示。记录来源是为了后续替换、复现和商用核验；不代表已经确认商用授权。

## mission-city.webp

用途：活动页任务城市背景。

本地来源：

- `P5素材库/07_网页即用UI图形/calendar.jpg`：东京城市线稿底图。
- `club-app/assets/ppt/image14.png`：PPT 中的 P5 星纹／手形构图裁片。
- `P5素材库/07_网页即用UI图形/p5star.gif`：星纹帧。

处理：灰阶着色、对比度调整、红黑斜切遮罩、星纹叠加，导出 1600×1000 WebP。

## bonds-collage.webp

用途：同好页羁绊角色拼贴背景。

本地来源：

- `club-app/assets/ppt/image14.png`：P5 星纹／手形构图裁片。
- `P5素材库/07_网页即用UI图形/p5star.gif`：星纹帧。
- `club-app/assets/p5/img/member-ann.webp`。
- `club-app/assets/p5/img/member-futaba.webp`。
- `club-app/assets/p5/img/member-makoto.webp`。

处理：角色透明通道保留、单色剪影化、红黑拼贴、斜切带与星纹叠加，导出 1600×1000 WebP。

## profile-dossier.webp

用途：我的页面档案城市线稿背景。

本地来源：

- `P5素材库/07_网页即用UI图形/calendar.jpg`：城市线稿底图。
- `P5素材库/07_网页即用UI图形/p5star.gif`：星纹帧。
- `club-app/assets/p5/img/advisor-morgana.webp`：低透明度档案水印。

处理：浅色档案纸底、城市线稿、红黑斜线、星纹与角色水印，导出 1600×1000 WebP。

## loader-stars.webp

用途：首屏加载层的轻量星纹；页面通过 CSS transform 动画保留旋转与缩放动势。

本地来源：

- `club-app/assets/p5/img/star-spin.webp`：256×256、60 帧 animated WebP，651,746 B，版权状态仍为 `unverified`。

处理：提取原动画约 0.9 秒处的代表帧，导出为 256×256、quality 70 的静态 WebP；派生文件为单帧 12,428 B。原动画资源继续保留，不覆盖、不删除。该转换只改变当前加载层的传输与绘制方式，不代表已经取得商用授权。

## 复现

在工作区根目录执行：

```powershell
python .\club-app\build-visual-assets.py
```

脚本只读取上述本地文件并覆盖生成本目录中的三张 WebP，不下载网络素材。
