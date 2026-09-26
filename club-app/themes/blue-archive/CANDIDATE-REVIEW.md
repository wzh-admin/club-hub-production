# Blue Archive 主题候选包审查记录


> **授权状态更新（2026-09-24，覆盖本文件较早的未核验/仅供研究结论）**：项目负责人确认本项目当前登记的该主题资源已取得公开 Preview 所需授权。授权凭证由负责人留存，未复制到仓库；本记录仅说明负责人确认及既有来源，不代表本仓库独立审核了授权文件。新增/替换资源或超出凭证实际用途范围时须重新核验。

更新时间：2026-09-20。

## 1. 当前结论

本目录的 Blue Archive 主题只能作为**未注册候选包**保存。当前没有取得官方或其他权利方针对本项目的复制、改编、再分发、商用或公开部署授权，因此：

- 官方 Logo、角色立绘、官方插画、官方背景图、官方视频：`reference-only`
- 官方素材不得被 `index.html`、`app.js`、`styles.css`、`themes.css` 或正式主题注册表引用
- 原创 SVG 只能标记为 `runtime-candidate`，不等于已获得《碧蓝档案》官方授权，也不等于可以使用官方商标或角色识别元素
- 正式公开部署前，项目应使用“受 Blue Archive 风格启发的原创蓝天/玻璃/网格主题”描述，避免宣称官方合作或官方主题

## 2. 资产分层

### A. 仅供研究参考（不可进入运行时）

路径范围：

- `assets/visual/game-*.png`
- `assets/visual/logo.png`
- `assets/visual/kv*.webp`
- `assets/visual/img_*.png`
- `assets/visual/shares.png`
- `assets/feedback/*-reference.png`
- `assets/transition/official-home-bg.mp4`

允许用途：

- 色彩、构图、留白、网格、光环、角色反馈构图和转场节奏的内部研究
- 设计文档中的引用记录和人工评审

禁止用途：

- 正式页面展示
- 公开部署静态资源
- 作为 CSS 背景、`img`、`video`、音频或主题预加载资源
- 裁切、抠图、描摹后直接替代官方资产

### B. 原创派生运行时候选

路径范围：

- `assets/visual/derived/sky-glass.svg`
- `assets/visual/derived/hex-grid.svg`
- `assets/visual/derived/orbit-network.svg`
- `assets/visual/derived/profile-glass.svg`
- `assets/visual/derived/halo.svg`

当前状态：`runtime-candidate / rights-review-required`

这些 SVG 不包含官方 Logo、角色、官方文字、完整官方场景或官方二进制图像。正式接入前仍需完成：

1. 人工确认没有从官方位图描摹可识别主体
2. 确认项目文案不暗示官方来源或授权
3. 记录创作日期、创作者和生成方式
4. 通过主题契约、对比度、响应式和回退验收

## 3. 候选包元数据

建议的未注册元数据：

```json
{
  "schemaVersion": 1,
  "id": "blue-archive",
  "version": "0.1.0-candidate",
  "status": "candidate",
  "displayName": "天空玻璃主题候选",
  "inspirationLabel": "Blue Archive-inspired original visual direction",
  "rights": {
    "status": "unverified",
    "runtimeAllowed": false,
    "officialAssetsAllowed": false,
    "note": "官方参考素材未取得复制、改编、再分发或商用授权；原创 SVG 仍需完成人工审查。"
  }
}
```

## 4. 注册前硬性门槛

以下条件全部满足后，才允许考虑加入 `theme-registry.js`：

- `rights.status` 不再是 `unverified`，或主题明确被限制为本地私有演示且不进入公开部署
- 注册项完整满足 `CLUB_THEME_CONTRACT.requiredMeta`
- 四个 `pageIntros` 均存在：`hub`、`events`、`community`、`me`
- 27 个必需 CSS token 全部存在
- 所有视觉资源只引用原创候选目录，不引用 A 类官方参考目录
- 主题加载失败时能自动回退到 `p5`
- P5 原有业务状态、操作语义、四项导航和可访问性语义不变
- `node club-app/check-ui.cjs` 在 1440px 和 390px 全部通过
- 预览页与正式 UI 截图均完成目视检查

## 5. 回退策略

### 启动阶段

1. 默认主题始终为 `p5`
2. 不从 URL、localStorage 或用户输入直接信任任意主题 ID
3. 主题 ID 不存在、状态不是 `active`、元数据校验失败时，立即使用 `CLUB_THEME_DEFAULT`
4. 主题 CSS 或资源请求失败时，不阻断页面渲染，不清空业务内容

### 运行阶段

- 主题切换只允许替换视觉令牌、页面进入文案和获准视觉资源
- 任何异常由主题运行时捕获并记录为本地开发诊断，不显示伪造的“已启用”状态
- 回退后保留当前路由和业务内存状态
- 用户看见的提示应是中性文案，例如“主题资源不可用，已恢复默认视觉”，不暗示官方关系

### 发布阶段

- `reference-only` 文件不打包进公开静态资源
- 未通过权利审查的候选包不进入生产构建
- 发布前用文件清单和字符串扫描确认不存在 `logo.png`、角色参考图和官方视频引用

## 6. 本阶段禁止事项

- 不注册 `blue-archive`
- 不修改 `theme-registry.js`
- 不修改正式主站 `index.html`、`app.js`、`styles.css`、`themes.css`
- 不把官方参考文件重命名后伪装为原创资源
- 不把“官方站可下载”写成“已获授权”
- 不执行部署或公开发布
