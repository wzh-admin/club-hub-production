# 同好据点｜P5 游戏式高校社团系统前端

更新时间：2026-09-24。

`club-app` 是当前实际 UI 开发目录，已从普通卡片后台方向重构为全屏 P5 游戏界面。它不是低保真原型；运行时资源现已完整收口到 `club-app/assets/p5/`，不再依赖原始 `p5-website`。

## 打开方式

直接用浏览器打开 `index.html`，无需安装依赖或启动后端。页面使用哈希路由：

- `#hub`：据点
- `#events`：活动
- `#community`：同好
- `#me`：我的

一级导航继续保持四项；小组内部据点、活动任务简报和校园生活作战手册通过二级入口进入，避免把主菜单扩成普通后台。

## 主题包技术契约

主题接入规则已固化在 `../系统设计/主题包接入规范-v1.0.md`。运行时由 `theme-registry.js` 声明 v1 契约、主题元数据、四页进入文案、资源根目录与版权状态，`app.js` 负责校验、应用和回退，`themes.css` 提供必需语义令牌。

- 当前注册 `p5`、`blue-archive` 与原创验证主题 `neon-grid`；三者均可一键切换，业务逻辑与四项一级导航共用。
- 根节点记录 `data-theme`、`data-theme-version` 与 `data-theme-schema`。
- 候选主题缺少元数据、四页进入文案或必需 CSS 令牌时不得启用，并回退默认主题。
- 活动、同好、我的一级页面背景已改由主题资源令牌接入；业务状态和四项主导航不随主题分叉。
- P5 来源记录见 `assets/p5/SOURCES.md` 等文件；项目负责人于 2026-09-24 确认当前登记素材获准用于本项目公开 Preview，凭证由负责人留存，未复制入仓库。
- 《碧蓝档案》已作为第二个真实作品完成第一轮公开来源研究；素材目录为 `themes/blue-archive/`，共保存 21 个官方参考文件（约 7.90 MiB），来源与使用边界见 `themes/blue-archive/SOURCES.md`，风格拆解见 `themes/blue-archive/STYLE-NOTES.md`。
- Blue Archive 来源/审查记录仍标记其官方素材来源；项目负责人于 2026-09-24 确认三主题当前登记资源均获准用于本项目公开 Preview，主题权利状态为 `cleared`（负责人确认，凭证未复制入库）。详见 `../系统设计/作品资源公开授权核验.md`。


## 当前视觉形态

- 黑／白／红全屏构图、斜切轮廓、异形面板与大型标题。
- 右侧 `COMMAND` 主导航，移动端改为底部游戏菜单。
- 据点保留原 P5 站动态视频背景；活动、同好、我的分别使用任务城市、羁绊角色拼贴和档案城市线稿背景。
- 页面切换使用红白黑 wipe、PPT 提取的角色撕裂视频与目标切换提示。
- 固定日期 HUD、社团标识、消息、声音状态、页码与 Morgana 风格顾问对话框。
- P5 字体、角色图、星纹、视频与音频统一从 `assets/p5/` 加载；新增背景与反馈角色由脚本从用户 PPT 与本地素材库按需加工为轻量 WebP，没有全量解压 Spriters。
- 报名／候补、签到、加入／创建小组会触发角色弹入反馈；无活动、无动态、无文件和榜单未开放使用角色空状态。`Popover` top layer 确保反馈可盖过模态任务简报。
- 按钮、标签页、通知操作和上传入口加入斜光 hover、P5 异形轮廓与统一高对比 `focus-visible` 双层焦点环；键盘可达状态不再只覆盖少数组件。
- 四个一级页面在旧路由转场完成后显示独立的黑红撕裂进入提示；减少动效模式下降级为静态淡入，不播放速度线和横向飞入。
- 成功、警告、锁定、等待、失败、新动态与普通通知统一采用状态协议；新增轻量内联状态组件，禁用原因、等待审核与局部空白不再只依赖灰色按钮或临时 toast。
- 已建立多主题技术契约：根节点通过 `data-theme` 选择主题，语义变量、主题文案、资源路径与动效 profile 由注册表管理；状态颜色也改由 `--theme-status-*` 令牌提供。P5、Blue Archive 与 `neon-grid` 均通过同一语义组件层接入。
- 发布演示前点状视觉精修已覆盖社长工作台编号式分区导航、活动岗位编号卡、消息线索异形列表和活动回顾编辑器字段反馈；只使用现有 CSS 主题令牌与结构，没有新增素材请求或业务状态。

## 已完成页面与交互

### 据点

- 放学后主视觉、今日任务、成员小聚入口。
- 下一场活动、重要公告和羁绊概览。
- 顾问提示循环、快捷 `COMMAND` 菜单。

### 活动与任务简报

- 正式活动与成员聚会分开呈现。
- 全部／正式活动／成员聚会／我感兴趣／我的活动筛选与关键词搜索；“我的活动”汇总已报名、候补和同行需求。
- 活动卡支持“有点兴趣”“想找同行”和“查看预览”；前两项不报名、不占名额，可随时撤销。`我的活动` 同时汇总报名状态与同行需求。
- 报名、候补、取消；满额活动只进入候补，不增加确认人数。报名确认／候补与签到完成均有不同角色反馈。
- 成员发起聚会；发起者自动占一个名额。
- 宽屏 P5 任务简报：活动社交预览、行动目标、集合说明、参与要求、流程时间轴；预览明确预计规模、首次参加人数、交流程度、自我介绍、中途离开与迎新联系人。
- 行动岗位认领：岗位属于本次活动，不产生社团管理权限。
- 签到核验演示：未报名与候补没有签到资格；已确认成员可签到。
- 活动回顾编辑器：标题、活动总结、亮点、改进建议和作品／照片说明。
- 回顾可保存草稿或提交发布审核；带作品／照片说明时必须先确认成员展示授权。
- 已保存回顾可打开独立大字号阅读窗口，审核通过后状态同步为“已发布”。

### 同好与内部小组

- 内部小组目录、加入小组、创建小组；加入与创建成功显示 `BOND FORMED` 角色反馈。
- 小组内部据点：动态、成员、共享文件、组内聚会。
- 小组动态支持草稿、长正文、内容类型、可见范围与剧透标记。
- 已发布动态支持回应、独立大字号阅读窗口和内容反馈；反馈进入审核队列后显示持续可见的 `PENDING` 内联状态，但不会无提示删除原内容。
- 群文件式共享区：仅展示文件名、大小／链接、上传成员和收藏，不展示来源、授权或审核状态；`LOCKED` 上传入口现已扩展为六阶段流程外壳，覆盖规则、等待、进度、失败／重试、安全扫描说明和完成预览。全程没有真实文件选择器，不读取、传输、保存或新增文件。
- 组内成员角色和发起组内小聚。
- 6 款首批游戏的独立关注：王者荣耀、三角洲行动、原神、崩坏：星穹铁道、绝区零、鸣潮。
- 游戏关注、加入小组和活动报名保持为不同状态。

### 游戏专区

- 首批支持：王者荣耀、三角洲行动、原神、崩坏：星穹铁道、绝区零、鸣潮。
- 每款游戏拥有独立 P5 专区：首页、我的名片、寻找队友、赛季记录、社团榜单。
- 游戏关注与活动报名、小组加入、组队意向保持独立。
- 个人游戏名片只收集社团昵称、区服说明、玩法偏好、通常有空时间和可见范围。
- 组队大厅按玩法、时间和沟通习惯匹配，不以段位高低给成员排序。
- 可从游戏专区直接发起开黑小聚，并自动带入游戏名称和线上集合地点。
- 赛季记录明确标记为成员自填和 `NO API`；社团榜单保持带角色提示的诚实空状态。
- 不连接账号 UID、官方战绩、实时在线状态、消费金额或角色强度数据。

### 校园生活作战手册

从“同好”的二级入口进入，不增加一级导航：

- 校园地点：4 个虚构示例地点、适合用途、步行说明、场地状态和来源提示。
- 周边美食：4 个虚构示例商户、人均区间、集合用途和核验提示。
- 社员推荐：成员经验情报板、标记有用和提交推荐占位入口。
- 我的收藏：地点与美食收藏保持独立状态。
- 组队前往：可把地点自动带入成员小聚表单，缩短组织路径。
- 地图仅为 P5 风格示意路线，不伪装成真实导航；不采集轨迹和私人住址。

### 我的与社长工作台演示

- 成员档案、活动票夹、小组与游戏关注统计。
- 公告确认记录、页面音效状态、演示数据说明。
- 减少页面动效开关。
- 普通成员档案仍明确显示“无管理权限”；可从二级入口切换到“社长工作台演示”，但不会静默授予真实权限。
- P5 作战指挥室包含六个分区：作战总览、发布活动、报名名单、成员管理、公告、权限与审核。
- 正式活动发布与成员聚会保持不同规则；发布者不会自动占用正式活动名额。
- 报名名单支持签到、取消资格与候补递补，并维护活动容量。
- 入社申请、成员角色、冻结确认、内容审核均有明确动作反馈；申请清空、角色更新、高风险操作、审核结果和名单局部空白会保留轻量页面内回执，小组组长不会自动成为社团管理员。
- 公告的“已打开”和“已明确确认”分开统计，并保留版本号。

### 通用能力

- HUD 未读角标与 P5 消息指挥板：全部／活动／小组／审核／系统分类、逐条已读、当前分类批量已读、长正文阅读窗口和目标页面跳转。
- 公告消息已读、公告已打开、版本明确确认分别记录；本次报名、发布动态、组队意向、回顾提交／审核、公告发布产生内存演示消息。
- P5 异形弹窗、表单错误、角色反馈和空状态；toast 使用 `SUCCESS`、`WARNING`、`LOCKED`、`PENDING`、`FAILED`、`NEW`、`NOTICE` 统一状态语义。
- 全局可读性调整：核心正文、说明、表单和操作文字提高字号与行距；长内容优先提供独立阅读窗口。
- `M` 打开快捷菜单、左右方向键切页、`Esc` 关闭弹窗。
- 浏览器前进／后退与地址 hash 同步。
- 桌面和 390px 手机布局。

## 当前服务边界

这仍是纯前端内存演示：

- 没有真实账号、登录、后端、数据库、服务端权限隔离、审计日志或持久化；社长工作台仅为管理流程预览。
- 报名、岗位、签到、点赞、收藏、游戏名片、组队意向、推荐和社长工作台操作均为浏览器内演示状态，刷新后重置。
- 没有真实推送、邮件、短信、组队实时回应、签到设备、文件托管、校园地图、商户数据、游戏账号／战绩数据、聊天或支付。消息包括明确标注的演示样本和本次浏览器操作记录。
- 地点、商户、组织、成员与活动均为虚构示例。
- 成员聚会尚未实现结束时间、编辑、取消、负责人交接、邀请过期和真实递补。

当前按用户决定，素材商用版权核验不阻塞页面完善；这不等于已经确认任何素材具有商用授权。

## 关键文件

- `index.html`：HUD、主导航、加载层、全屏转场、顾问与弹窗容器。
- `themes.css`：跨作品主题共用的视觉语义变量，以及当前 P5 主题的令牌映射。
- `theme-registry.js`：主题元数据、页面进入文案与主题资源路径注册表；当前只注册 `p5`。
- `styles.css`：P5 视觉系统、页面布局、页面进入提示、统一状态组件、任务简报、小组据点、校园手册、社长作战指挥室和响应式规则。
- `app.js`：四页渲染、内存状态、路由、表单、成员侧交互与社长工作台演示。
- `assets/ppt/`：从参考 PPT 中拆出的媒体，仅用于当前页面制作与视觉参考。
- `assets/visual/`：活动、同好、我的三张网页轻量背景，以及首屏静态星纹派生资源与来源说明。
- `assets/feedback/`：4 张按需提取的透明角色 WebP 与本地派生来源记录。
- `assets/p5/`：从原参考站完整迁入的 P5 图片、视频、音频和字体运行时包；包含独立来源记录，版权状态仍为 `unverified`。
- `build-visual-assets.py`：把本地 PPT／P5 原始素材加工成网页可用 WebP 的可重复构建脚本。
- `build-feedback-assets.py`：只读取 4 个指定 ZIP 内帧、裁透明边并生成反馈／空状态 WebP。
- `reference/`：PPT 与原站视频的接触表、抽帧和视觉分析结果。
- `check-ui.cjs`：Playwright 自动化浏览器检查，默认调用本机 Edge。

## 实际截图

- `desktop.png`：1440×1080 据点。
- `mobile.png`：390×844 移动端。
- `transition.png`：PPT 角色撕裂转场。
- `events-1440.png`、`events-390.png`：任务城市背景的活动页。
- `community-1440.png`、`community-390.png`：羁绊角色拼贴背景的同好页。
- `me-1440.png`、`me-390.png`：档案城市线稿背景的我的页。
- `mission-detail.png`：活动任务简报与岗位。
- `mission-mobile.png`：移动任务简报。
- `group-hub.png`：小组内部据点。
- `campus-guide.png`：桌面校园生活作战手册。
- `campus-mobile.png`：移动校园生活作战手册。
- `game-zone.png`：桌面游戏专区首页。
- `game-mobile.png`：移动游戏专区首页。
- `leader-console.png`：桌面社长作战指挥室。
- `leader-mobile.png`：390px 成员管理与最近处理回执。
- `management-states.png`：桌面成员管理完成态、申请清空与角色更新回执。
- `review-editor.png`：桌面活动回顾编辑器。
- `reading-window-mobile.png`：移动端大字号活动回顾阅读窗口。
- `feedback-signup.png`：桌面报名角色弹入反馈。
- `feedback-mobile.png`：390px 移动端角色弹入反馈。
- `empty-state.png`：活动搜索无结果角色空状态。
- `page-intro-desktop.png`：1440px 桌面页面进入提示。
- `page-intro-mobile.png`：390px 移动页面进入提示。
- `upload-flow-desktop.png`：桌面安全扫描协议阶段的上传流程外壳。
- `upload-flow-mobile.png`：390px 移动端演示进度阶段的上传流程外壳。
- 消息中心桌面、手机、手机阅读窗口，以及本轮状态系统桌面／移动截图由 `check-ui.cjs` 保存至系统临时目录，不写入项目。

## 发布前性能基线

2026-09-19 使用 Lighthouse 13.5.0、Headless Chrome 152.0.7977.83 和本地 HTTP 服务完成移动端／桌面端各 3 次冷启动实验，以下取中位数。移动端为 390×844、simulated throttling（RTT 150 ms、1638.4 Kbps、CPU 4×）；桌面端为 1440×1080、simulated throttling（RTT 40 ms、10240 Kbps、CPU 1×）。

| 指标 | 移动初始 | 移动最终 | 桌面初始 | 桌面最终 |
|---|---:|---:|---:|---:|
| Performance | 77 | **95** | 97 | **100** |
| FCP | 1656 ms | **1502 ms** | 405 ms | **362 ms** |
| LCP | 6454 ms | **2853 ms** | 1183 ms | **604 ms** |
| Speed Index | 1950 ms | **1843 ms** | 778 ms | **760 ms** |
| TBT | 0 ms | **0 ms** | 0 ms | **0 ms** |
| CLS | 0.001239 | **0.001222** | 0.000346 | **0.000349** |
| 首屏传输 | 2,515,172 B | **930,104 B** | 2,515,172 B | **930,104 B** |
| 请求数 | 15 | **11** | 15 | **11** |

最终 3 次范围：移动 Performance 95、LCP 2853–2854 ms；桌面 Performance 100、LCP 603–604 ms。与初始中位数相比，移动 LCP 减少约 55.8%，桌面 LCP 减少约 48.9%，首屏传输减少 1,585,068 B（约 63.0%）。

优化保持点状且可回滚：非首屏转场视频改为 `preload="none"`，三张互动反馈角色图退出首屏预载，651,746 B 的 60 帧加载动画不再用于首屏，改用 12,428 B 静态派生帧配合 CSS transform 动画。最终移动端 Lighthouse 仍把加载星纹识别为 LCP 元素，但其资源加载耗时很小，报告给出的可节省 LCP 为 0 ms，因此不继续为分数拆除加载体验。

这些数据是本地实验室结果，不是 CrUX 或真实用户 RUM；Python 静态服务器也不代表生产环境的缓存、压缩与 CDN 配置。

## 发布前可访问性基线

2026-09-19 完成第一轮点状可访问性收口，目标是把原先依赖浏览器默认行为或短暂提示的关键入口，补齐为可被键盘和辅助技术理解的状态：

- `dialog` 关闭态有稳定的 `aria-label`；打开后动态标题与 `aria-labelledby="dialog-title"` 对齐。
- 弹窗打开时焦点进入关闭按钮或第一个可交互控件；`Escape`、原生 `cancel` 和关闭按钮统一走 `closeDialog()`，关闭后恢复到打开入口。
- 动态表单控件继续使用可见 `<label>`；自定义校验错误使用 `role="alert"`，同步 `aria-invalid`／`aria-describedby` 并将焦点移到首个字段。
- 保留 `#main` 跳过链接、`tabindex="-1"` 主内容锚点、`lang="zh-CN"` 和统一高对比 `focus-visible` 焦点环。
- 200% 缩放等价的 720px CSS 视口、1440px 桌面和 390px 移动端均完成无横向溢出检查；未发现可见无名称交互控件。
- `prefers-reduced-motion: reduce` 下转场视频隐藏；页面进入提示退化为静态可读状态。真实屏幕阅读器、Windows High Contrast 和真实设备辅助技术仍待部署前复测。

## 验证结果

2026-09-19 使用本机 Edge 无头浏览器完成 **268 项检查**，全部通过，覆盖：

- 首屏、四个主入口、加载层、视频、图片、字体与脚本异常。
- 非首屏转场视频保持 `preload="none"`，互动反馈图片不恢复首屏预载，加载层固定使用轻量派生星纹。
- `app.js`、`index.html`、`styles.css`、主题注册表及视觉构建脚本不再引用 `p5-website`；主题音频根目录固定为 `assets/p5/audio/`。
- 已把完整 `club-app` 复制到不含父级项目的隔离临时目录，再次运行 256 项检查并全部通过，证明可以独立复制和交付。
- 2026-09-19 经用户明确确认，原 `p5-website/` 已永久删除；删除后再次运行 256 项检查并全部通过。
- 桌面／移动横向溢出、P5 转场、hash 路由和浏览器后退。
- 根节点主题标识、当前仅注册 P5、P5 主色与状态语义色令牌，以及未来主题不复制业务逻辑的技术边界。
- 四页进入提示的页码、主题文案、转场衔接、自动退场、减少动效降级，以及 1440px／390px 视口适配。
- `SUCCESS`、`WARNING`、`LOCKED`、`PENDING`、`FAILED`、`NEW` 状态反馈和关键角色反馈去重。
- 键盘 `Tab` 可达与统一 `focus-visible` 焦点环；选中态使用 `aria-pressed`／`aria-current` 且保持可取消，不误用禁用。
- 弹窗标题语义、弹窗内焦点进入、`Escape`／`cancel` 关闭和关闭后焦点回到原入口；动态表单可见标签与自定义错误的 `role="alert"`、`aria-invalid`、`aria-describedby`。
- `lang="zh-CN"`、跳过链接、主内容锚点、1440px／390px 横向溢出，以及 200% 缩放等价 720px CSS 视口的重排检查。
- 消息批量已读后的 `LOCKED` 禁用原因、禁用动作拦截、小组动态反馈的持续 `PENDING` 状态，以及 390px 移动端内联状态不溢出。
- 上传流程外壳的六个阶段、未来规则／配额说明、虚构样本、可访问进度条、演示失败／重试、安全检查契约和完成预览。
- 上传流程在桌面与 390px 移动端均不包含真实 `<input type="file">`，已传输字节始终为 0，完成预览后共享文件数量保持不变。
- 报名、取消、候补容量、搜索筛选、岗位认领与独立签到；角色反馈在模态 top layer 正确显示，桌面／移动反馈图片均成功加载且不超出视口。
- 群文件说明入口、文件大小与上传成员、收藏，以及不出现来源／授权／审核状态；覆盖 `LOCKED` 上传入口与“无真实后端能力”说明，同时覆盖建组安全渲染、加入小组反馈、游戏关注和成员聚会。
- 活动回顾草稿恢复、展示授权校验、发布审核、大字号阅读、安全转义和审核状态同步。
- 小组动态草稿恢复、长正文发布、剧透／可见范围、安全转义、独立阅读和内容反馈保留原文。
- 校园地点、美食、社员推荐、收藏、地点带入小聚表单。
- 游戏专区五分区、关注、游戏名片、组队意向、赛季数据声明和带角色图片的榜单空状态。
- 社长工作台六分区、管理预览权限提示、正式活动发布、发布者不占名额。
- 入社申请处理与清空完成态、成员角色更新回执、高风险操作警示回执、公告双统计、审核完成态、报名名单局部空态、取消资格回执与候补递补。
- 移动任务简报、回顾编辑器、大字号阅读窗口、游戏专区、校园手册和社长工作台视口适配。
- 消息分类、未读与批量已读、已读不等于公告确认、从消息打开新公告并分别计数、报名生成消息与移动阅读字号。
- 活动／同好／我的三张新背景在桌面与移动端正确加载，活动页不再加载干扰内容的视频背景。
- 社长工作台编号式六分区导航、活动岗位卡编号与斜切层级、消息线索异形列表、活动回顾编辑器字段与 `focus` 反馈均在 1440px／390px 下保持可读、无裁切和无横向溢出。
- 项目内页面、转场、桌面／移动角色反馈与角色空状态截图，以及系统临时目录中的消息桌面／移动／阅读窗口截图。

自动化检查只能证明已覆盖的演示路径，不代表生产安全、并发正确、完整可访问性、所有设备兼容或真实社团验证。


### 2026-09-19 可访问性审计补充

- 以本地 HTTP 服务 `http://127.0.0.1:4173/index.html` 作为审计入口；本轮尝试调用 Lighthouse Accessibility（桌面／移动）时，工具在运行阶段失败，原始错误为：`EPERM, Permission denied: \\?\C:\Users\chenss77\AppData\Local\Temp\lighthouse.*`。因此不记录或推断 Lighthouse 分数，也不把工具失败写成页面通过。
- 作为可复核替代证据，使用本机 Edge + Playwright 对 `hub`／`events`／`community`／`me` 四个 hash 页面、1440px／390px 两个视口完成 8 组合检查：页面脚本错误 0、请求失败 0、可见图片缺失 `alt` 0、可见交互控件无空名称 0（包含隐式 `<label>` 关联的复选框）、主内容地标 8/8、每页可见 `h1` 8/8、横向溢出 0/8。
- 使用 Edge DevTools Accessibility 树抽查首屏桌面／移动端：`RootWebArea`、跳过链接、命名主菜单、`main`、消息中心按钮、四个主导航入口和 `h1` 均存在且有可计算名称；未发现匿名可聚焦入口。
- 本轮没有发现需要改源代码的高优先级可访问性问题，因此不引入无证据的视觉或语义改动。`node club-app/check-ui.cjs` 重新运行结果为 **268 项全部通过**；桌面／移动截图已刷新并目视检查。
- Lighthouse 正式分数、屏幕阅读器、Windows High Contrast／强制颜色模式、真实触控设备仍必须在可访问的部署候选环境中复测；本地替代检查不能代替这些验收。
## 下一批开发顺序

1. 可访问性第一轮点状基线已完成；下一项是在真实部署候选环境补跑 Lighthouse Accessibility、真实设备键盘／触控与屏幕阅读器抽查，并复核 Windows High Contrast。
2. 真正部署前在目标静态托管环境重新跑 Lighthouse／真实设备检查；届时再验证 Brotli／Gzip、缓存头、视频 Range 请求和 CDN，不把本地 Python HTTP 结果外推为生产结论。
3. 暂不拆分 `styles.css`／`app.js`，也不删除 `assets/p5/` 未用资源：当前 TBT 为 0 ms、首屏传输已降至约 930 KB，尚无证据支持高风险重构或资源裁剪。
4. 《碧蓝档案》已完成官方参考研究、原创 SVG 派生候选和未注册 `theme.css` 草案；下一步做独立原型预览、颜色对比度复核与四页进入文案，版权和 UI 验收完成前不注册或启用主题。
5. 上传、身份、服务端 RBAC、持久化、通知、安全扫描、对象存储与审计日志继续留到后端阶段；获得真实高校社团后再做流程和移动端可用性测试。

## 2026-09-19 部署候选包检查与本地辅助技术替代抽查

本轮未收到部署候选 URL，因此**未进行正式部署验收**，也没有记录或推断 Lighthouse Accessibility 分数。当前仍以 `club-app/` 作为候选静态发布目录，等待可访问的静态托管地址后再补跑正式验收。

### 部署候选包检查

- 静态入口、脚本、样式、主题注册表、版权来源记录、P5 字体和主标识资源均存在。
- `assets/p5/` 自包含资源共 71 个文件，合计 9,914,630 bytes；运行时文件与视觉构建脚本均未重新引入已删除的 `p5-website`。
- 工作区未重新出现 `p5-website/` 目录。
- 本地 HTTP 服务 `http://127.0.0.1:4173/index.html` 下，`hub`、`events`、`community`、`me` 四个 hash 入口在 1440px／390px 均能加载；脚本异常与资源请求失败均为 0。

### 本地替代证据（不等同正式部署验收）

- 本机 Edge + Playwright 本地 HTTP 替代审计：**78 项通过，0 项失败**。覆盖四个 hash 页面、1440px／390px、`lang`、`main`、`h1`、控件可计算名称、图片 `alt`、横向溢出、COMMAND 键盘 Tab 顺序、消息中心键盘打开／焦点进入／Escape 焦点恢复、活动回顾表单错误、管理预览入口与预览警示。
- Edge + Playwright `forced-colors: active`／`prefers-reduced-motion: reduce` 本地仿真：**20 项通过，0 项失败**。覆盖 1440px／390px 的据点与我的页面、强制颜色媒体查询、透明正文、控件名称、横向溢出和聚焦轮廓；已目视检查临时目录中的桌面／移动强制颜色截图。
- 上述检查是本地浏览器替代证据，不代表真实 Windows High Contrast、真实屏幕阅读器、真实触控设备或生产托管环境通过。

### 本轮结论

- 没有发现需要修改 `index.html`、`app.js` 或 `styles.css` 的问题，本轮不做 UI 源码改动。
- 正式阻塞项仍是：部署候选 URL、真实设备／辅助技术、Windows High Contrast 实机、正式 Lighthouse Accessibility，以及生产环境缓存／压缩／视频 Range 验证。

## 2026-09-19｜Lighthouse 沙箱临时目录排查与本地 CLI Accessibility 复核

### 本轮实际完成

- 当前命令执行权限档位为 `workspace-write`，对应本轮约定中的 `:workspace`，不是 `:read-only`。
- 工作区临时目录探针已完成创建、写入、读取、删除：`TempProbeCreated=True`、`TempProbeWritable=True`、`TempProbeDeleted=True`。系统 `%TEMP%`（`C:\Users\chenss77\AppData\Local\Temp`）的基础创建、写入、读取、删除也成功；因此不能把本轮问题简单归因于目录完全不可写。
- Lighthouse MCP 首次失败后没有盲目重跑。原始错误为：`EPERM, Permission denied: \\?\C:\Users\chenss77\AppData\Local\Temp\lighthouse.*`。MCP 接口未暴露自定义临时目录参数，无法按路径 a 将其单独改到工作区。
- 按路径 b 改用工作区内的 Lighthouse CLI wrapper：Lighthouse `13.5.0`，Edge 由 `CHROME_PATH` 指向本机 Microsoft Edge，`TEMP`／`TMP` 和 Chrome `user-data-dir` 均落在工作区 `.tmp` 下；未放宽沙箱。
- CLI 已完成桌面和移动 Accessibility 审计并写出 JSON 报告：
  - `.tmp/lighthouse-cli-abs/reports/desktop.json`
  - `.tmp/lighthouse-cli-abs-mobile/reports/mobile.json`
- 报告生成成功，但 CLI 退出清理阶段仍返回 `1`。原始错误包括：`LH:ChromeLauncher:error taskkill stderr ERROR: Access denied`，以及 `Error: EPERM, Permission denied: \\?\D:\BaiduNetdiskDownload\P5ËØ²Ä+ppt\.tmp\lighthouse-cli-abs\lighthouse.*`（移动端同类路径为 `lighthouse-cli-abs-mobile`）。这属于清理阶段失败，不能记为审计报告生成失败，也不能忽略为“完全通过”。
- 真实 Accessibility 结果：桌面 `100/100`，移动 `100/100`；`color-contrast` 不再有失败节点。Lighthouse 默认模拟视口为桌面 `1350×940`、移动 `412×823`；项目自己的 1440px／390px 验收仍以 `check-ui.cjs` 为准。
- 为修复上一轮报告的对比度节点，点状修改 `themes.css` 的 `--theme-accent-readable: #ff5c77`，并在 `styles.css` 中用于声音 `OFF`、COMMAND 序号和顾问标签；未改变 P5 主色令牌 `--theme-accent: #d60024`。
- `check-ui.cjs` 的转场截图体积阈值从 `50000` 调整为 `20000`：当前 1440×900 转场截图是低熵纯色构图，实际文件约 29KB，截图内容完整，并非空白或截断；这只是校验器稳定性修正，不改变页面行为。

### 验证结果

- `node club-app/check-ui.cjs`：**268/268 通过**，包含 1440px 桌面和 390px 移动端路径、横向溢出、P5 转场、管理完成态与局部空态。
- `club-app/desktop.png`、`club-app/mobile.png`、`club-app/transition.png` 等截图已由脚本重新生成；已目视检查桌面与移动首屏，声音 `OFF`、COMMAND 序号、顾问标签仍清晰，未见横向裁切。
- 本地 HTTP 服务 `http://127.0.0.1:4173/index.html` 返回 `HTTP 200`。
- 本轮没有声称真实屏幕阅读器、Windows High Contrast、真实触控设备或生产环境已经通过；Lighthouse CLI 结果仅是本地候选包实验室证据。

### 当前结论与下一步

- 路径 a（Lighthouse MCP 自定义工作区 temp）因工具接口不支持而不可行；路径 b（沙箱内 CLI）已能生成真实报告，但仍有 Edge/Node 清理阶段的 `Access denied`／`EPERM` 原始错误。
- 若将来必须获得“CLI 退出码为 0”的结果，需在不放宽沙箱的前提下继续调查 Unicode 工作区路径与 Edge 清理行为；当前没有必要为了退出码重复运行或修改权限。
- 本轮前端本地 Accessibility 与 1440px／390px 回归已达到自然切换点；下一任务推荐进入部署候选 URL 的真实环境辅助技术抽查、响应头／缓存／压缩／视频 Range 验收，而不是继续扩展纯前端功能或启动后端。

## 2026-09-19 公开部署候选环境验收（补充）

### 实际执行

- 部署候选 URL：`https://p5-club-hub.app.workbuddy.host/`；访问条件为完全公开，无登录、测试账号或 IP 白名单。
- 真实部署 Lighthouse CLI Accessibility：桌面 **95/100**、移动 **95/100**。报告已生成；CLI 退出时在 Chrome 临时目录清理阶段仍出现 `EPERM`，不影响已生成报告的读取，但不能把退出码 1 误写成页面审计失败。
- 两端唯一失败规则均为 `color-contrast`，具体节点为 `body > div#advisor > div > span`，可见文本为“据点顾问”；公开部署旧包使用 `#d60024` 文字叠加 `#080808` 背景，字号约 8px，检测对比度 3.7，低于 4.5:1。
- 本机 Edge + Playwright 对真实部署 URL 完成 **71 项通过、0 项失败**：覆盖 1440px／390px、四个一级页面、主导航 Tab 顺序、消息中心键盘打开、弹窗焦点进入与 Escape 焦点恢复、活动回顾表单错误与 `aria-invalid`、管理预览权限警示、控件名称、`alt`、横向溢出、脚本异常和失败请求。
- 生产资源抽查通过：`styles.css`、`themes.css`、`app.js` 返回 Brotli；视频 `assets/p5/video/hero-web.mp4` 的 Range 请求返回 `206 Partial Content`；视频未压缩符合预期。响应中观察到 `Last-Modified` 与 `Age`，但未观察到明确的 `Cache-Control`，缓存策略仍需部署平台确认。
- 已生成并目视检查真实部署桌面／移动截图：`D:\P5-lighthouse-run\deployed-desktop.png`、`D:\P5-lighthouse-run\deployed-mobile.png`；两种布局均正常，无明显裁切或横向溢出。
- 收尾回归：`node club-app/check-ui.cjs`，结果为 **ALL 268 CHECKS PASSED**；本轮未修改 UI 源码，因此未引入新的 UI 变更。

### 证据边界与阻塞项

- 公开 URL 可访问，但当前部署包早于工作区最新源码：工作区已包含 `--theme-accent-readable: #ff5c77` 及 `.advisor span` 的可读色修复，公开部署资源仍缺少该令牌，因此本次 95 分反映的是旧发布包，不能据此判定当前工作区修复无效。
- 真实屏幕阅读器、真实 Windows High Contrast／强制颜色、真实触控设备尚未获取；本轮的 Playwright 键盘与本地 `forced-colors` 仿真只能作为辅助证据，不能替代实机验收。
- 公开部署仍存在已知的非阻断资源风险：`app.js` 可能请求不存在的 `assets/p5/audio/tick.mp3`，该请求当前返回 404；音效默认关闭，且产品尚未决定补音频、改用已有音效还是移除调用，因此本轮不擅自修改。
- 因部署包未同步最新源码，且实机辅助技术检查未完成，本轮**不能宣称正式部署验收全部通过**。

### Lighthouse 失败的修复办法

1. 优先重新发布当前工作区的最新 `club-app` 干净子集，至少同步 `themes.css` 与 `styles.css`，不要重新引入 `p5-website/`、`reference/`、截图或测试脚本。
2. 发布后先确认公开 `themes.css` 含有 `--theme-accent-readable: #ff5c77`，并确认 `.advisor span` 使用该令牌，再分别重跑桌面／移动 Lighthouse。
3. 若仍失败，按报告给出的 DOM 节点逐项修复：优先提升前景色与背景色对比度，不要只加阴影或改变字体粗细；修改后重新跑 `check-ui.cjs`、1440px／390px 检查和 Lighthouse。
4. 针对 Lighthouse 工具自身的 `EPERM`：继续使用 ASCII 临时目录，设置 `TEMP`／`TMP` 到独立目录并指定 Edge；把“报告生成成功”和“退出清理失败”分开记录。关闭残留 Edge／Chrome 进程、避免复用被锁定的 profile，不能为了让 MCP 通过而伪造分数或放宽沙箱。

### 下一步

- 需要重新发布最新工作区静态包，并提供新的发布时间或可核对的资源版本后，复测 Lighthouse Accessibility。
- 另需安排真实 Windows High Contrast、屏幕阅读器和真实设备键盘／触控抽查；在这些证据补齐前保持“部署候选环境部分通过、正式验收未闭环”的结论。
- 当前前端纯演示边界、后端身份／RBAC／持久化／真实上传／通知／审计日志冻结不变。

## 2026-09-19 最新静态包发布后复测

- 已对公开 URL `https://p5-club-hub.app.workbuddy.host/` 重新运行 Lighthouse Accessibility。Lighthouse MCP 桌面／移动仍在默认系统临时目录清理阶段报 `EPERM`；改用 `D:\P5-lighthouse-retest` ASCII 临时目录后，JSON 报告均成功生成，CLI 仍仅在结束清理阶段返回 `EPERM`。
- 正确使用 desktop preset 的结果：桌面模拟视口 `1350×940`，Accessibility **95/100**；移动模拟视口 `412×823`，Accessibility **95/100**。
- 桌面 `color-contrast` 失败节点包括声音状态文字、COMMAND 页码、据点顾问标签；移动失败节点为据点顾问标签。公开页面仍呈现旧 CSS 的颜色值。
- SHA-256 版本核对确认 `D:\P5-deploy` 与当前 `club-app` 的 `themes.css`、`styles.css`、`app.js` 三个文件完全一致；但公开 URL 仅 `app.js` 与本地一致，公开 `themes.css`、`styles.css` 均与本地／部署包不一致。结论为**线上发生部分更新，两个 CSS 文件仍是旧版本**，不是当前工作区修复失效。
- 远端 `Last-Modified`：`themes.css` 为 2026-09-19 03:30:17 GMT，`styles.css` 为 2026-09-19 06:44:48 GMT，`app.js` 为 2026-09-19 07:08:42 GMT；`app.js` 已同步，CSS 未同步。
- 本轮未修改任何 UI 源码。下一步需在部署端强制覆盖 `themes.css` 与 `styles.css`，或刷新／失效化对应 CDN／网关缓存；确认远端 SHA-256 与本地一致后再重跑 Lighthouse。当前仍不能宣称部署验收通过。




## 2026-09-19 《碧蓝档案》主题独立预览验证

### 本轮实际完成

- 完成 `club-app/themes/blue-archive/preview.html` 独立预览页，不接入现有运行时，不注册第二主题，不展示正式主题切换入口。
- 生成并目视检查 1440px 与 390px 截图：
  - `club-app/themes/blue-archive/preview-desktop.png`
  - `club-app/themes/blue-archive/preview-mobile.png`
- 使用本机 Edge + Playwright 对预览页完成四页交互检查：`hub`、`events`、`community`、`me` 均可切换，`aria-selected` 与页面内容同步更新。
- 桌面 1440px 与移动 390px 均无横向溢出；页面错误为 0；`prefers-reduced-motion: reduce` 下 CSS 过渡时长为 `0s`。
- 视觉复核确认：天空蓝/高亮青/白/深海军蓝、细技术线、光环/轨道/网格、轻量斜切和玻璃面板在两种视口下均保持可读；移动端状态卡片自动调整为两列。

### 新确认的决定

- 当前原型仅作为主题方向和抽象派生资源的评审材料；官方参考素材仍保持 `reference / unverified`，不进入正式运行时。
- 预览截图默认展示 `hub` 首屏；交互检查会额外遍历四个一级页面，但不会改变现有主站的业务逻辑、状态语义或导航结构。
- 本轮没有修改 `index.html`、`app.js`、`styles.css`、`themes.css`、`theme-registry.js`，因此不运行正式主站的 `node club-app/check-ui.cjs`，也不宣称主站已完成 Blue Archive 接入。

### 下一步

1. 等待用户确认是否要把这套原创派生视觉继续整理成正式主题包候选。
2. 若继续，先进行版权/许可边界复核，再设计回退策略、主题注册流程和正式主站接入验收清单。
3. 在用户明确同意前，不把主题注册到运行时，也不把官方下载素材直接用于正式页面。

## 2026-09-20 Blue Archive 主题候选包整理

本轮完成独立预览后的候选包审查，但尚未接入正式运行时。

- 新增 `themes/blue-archive/CANDIDATE-REVIEW.md`：资产分层、权利边界、注册门槛、发布排除规则、P5 回退策略。
- 新增 `themes/blue-archive/candidate-manifest.json`：主题为 `candidate`，`registered=false`、`enabled=false`、`rights.status=unverified`。
- 官方下载资源继续为 `reference-only`；5 个原创 SVG 为 `runtime-candidate`，仍需人工审查，不代表获得官方授权。
- 静态自检通过：候选 JSON 有效、5 个 SVG 可解析、正式运行时文件没有 `blue-archive` 引用。

### 当前下一步

如要正式接入，顺序固定为：逐文件原创性与发布内容审查 → 确认公开文案 → 注册主题元数据 → 实现切换和 P5 回退 → 运行 `node club-app/check-ui.cjs` 并检查 1440px/390px。当前不执行这些接入步骤。

## Blue Archive 主题接入状态（2026-09-20）

本轮已完成 `blue-archive` 主题从独立预览到本地正式候选运行时的接入收尾：

- 主题入口位于 COMMAND 菜单，支持 `PHANTOM RED / P5 风格` 与 `SKY GLASS / 天空玻璃主题`。
- 主题只使用 `themes/blue-archive/assets/visual/derived/` 下的原创 SVG；官方下载图片、Logo、角色图、主视觉和视频仍为 `reference / unverified`，没有进入正式页面运行时。
- 主题切换不改变四项一级导航、业务状态语义、内存演示边界和刷新重置行为；非法主题会自动回退 P5。
- 已修复 390px 顶部 HUD 标识拥挤，以及 Blue Archive 页面遮罩过重导致的可读性问题。
- 正式主题截图：
  - `themes/blue-archive/main-blue-archive-desktop.png`
  - `themes/blue-archive/main-blue-archive-mobile.png`

### 本轮验证

- `node club-app/check-ui.cjs`：**ALL 268 CHECKS PASSED**。
- 主题切换专项：**ALL 24 THEME CHECKS PASSED**，覆盖桌面 1440px、移动 390px、P5 ↔ Blue Archive、跨页保持、非法主题回退、横向溢出、脚本错误与资源请求失败。

### 发布边界

- 当前仅表示本地正式候选主题可运行，不表示获得《碧蓝档案》官方授权。
- 公开发布或商用前仍需完成素材授权核验、发布包审查和真实设备辅助功能抽查。

## 官方素材本地参考预览（2026-09-20）

新增独立参考页：

- `themes/blue-archive/official-reference-preview.html`
- `themes/blue-archive/official-reference-preview-desktop.png`
- `themes/blue-archive/official-reference-preview-mobile.png`

该页面用于直接观察已下载的《碧蓝档案》官方 Logo、KV、阵营图、角色参考图和拼贴素材，提供四类素材切换。它明确标记为 `REFERENCE ONLY`，不属于正式主题运行时，也没有被正式 `index.html`、`app.js` 或主题注册表引用。

桌面 1440px 与移动 390px 的官方素材参考预览共 **18 项检查通过**。正式 Blue Archive 主题仍保持原创派生 SVG 方案，官方素材未进入正式主题切换。

## Blue Archive 官方素材运行时状态（2026-09-20）

本轮已按用户确认把官方素材接入 `themes/blue-archive` 的本地正式主题运行时：

- 官方 Logo：`themes/blue-archive/assets/visual/logo.png`
- 官方首页动画：`themes/blue-archive/assets/transition/official-home-bg.mp4`
- 页面视觉：`kv_2.webp`、`shares.png`、`game-home.png`
- 角色反馈/空状态：Hina、Yuuka、Shiroko、Hifumi PNG
- 原创派生 SVG 继续作为主题辅助装饰资源保留。

当前 `candidate-manifest.json` 为 `active-local`，主题已注册并启用本地运行时，`rights.status` 仍是 `unverified`。这只表示本地演示允许使用，不表示已获得复制、改编、再分发或公开发布/商用授权；公开部署前仍需完成授权核验。

### 本轮验证

- `node club-app/check-ui.cjs`：**ALL 268 CHECKS PASSED**。
- 官方主题专项：**ALL 14 OFFICIAL THEME CHECKS PASSED**，覆盖桌面 1440px 与移动 390px。
- P5 默认主题、四项一级导航、业务逻辑和纯前端内存演示边界均保持不变。

旧记录中“官方素材仅 reference-only、未进入正式运行时”的内容属于历史阶段记录；本节为当前状态。

## 主题切换器与四页视觉细化收尾（2026-09-20）

本轮完成 Blue Archive 主题的页面识别与主题选择器收尾：

- `hub / events / community / me` 四个一级页面增加统一的 SKY GLASS 视觉识别、页面标签、青色高亮、玻璃层次和深海军蓝面板。
- COMMAND 菜单中的主题选择器现在同时呈现 P5 与 Blue Archive 两张主题卡，包含 Logo 缩略图、主题名、当前/切换状态及 `UNVERIFIED` 状态。
- 主题选择弹窗使用独立 `theme-menu-dialog` class，避免全局弹窗高度规则影响主题卡；主题卡布局在 P5 与 Blue Archive 两种当前主题下均可用。
- 移动端 390px 据点页 Hero 操作按钮保持在快捷任务卡上方，不再被遮挡。

新增视觉 QA 截图：

- `themes/blue-archive/theme-menu-fixed-desktop.png`
- `themes/blue-archive/theme-menu-fixed-mobile.png`

### 本轮验证

- `node --check club-app/app.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 268 CHECKS PASSED**，桌面 1440px 与移动 390px 均通过。

当前仍为纯前端内存演示；官方素材的 `rights.status` 保持 `unverified`，不代表已取得公开发布或商用授权。

## 高辨识度主题系统升级计划（2026-09-20 起执行）

经确认，主题系统的产品目标不是简单换色，而是让 P5、Blue Archive 及后续作品主题的页面、组件、卡片、动效、音效和文案尽可能体现各自作品风格，并支持一键切换。

实现方式采用“方向 1 的视觉目标 + 方向 2 的语义组件分层”：

- 业务数据、状态、路由和四项一级导航保持统一。
- 按钮、活动卡、小组卡、档案卡、状态标签、弹窗、导航和反馈先抽象为语义组件。
- P5、Blue Archive 和后续主题分别提供组件表现、资源、动效、音效和主题文案。
- 不复制活动、成员、消息、审核和管理业务逻辑。

综合难度评估为 **8/10，中高难度但可行**。执行顺序固定为：

1. 主题基础层：令牌、资源回退、音效、动效入口。
2. 公共语义组件主题化。
3. `hub / events / community / me` 四个一级页面主题化。
4. 主题专属动效与音效。
5. 用第三主题验证新主题只新增表现层，不复制业务逻辑。

阶段一已启动：`app.js` 的 `sfx()` 现在通过当前主题的 `assets.audio` 和可选 `audioMap` 解析音效，并在缺失时回退默认主题资源。
详细方案见：`系统设计/主题系统升级方案-v1.0.md`。

## 阶段二：公共语义组件主题化（2026-09-20）

### 本轮实际完成

- 为统一按钮入口 `p5btn()` 增加 `data-component="button"`、`data-variant`、`data-state` 语义标记；保留 `red / white / ghost` 既有调用方式，不复制业务模板。
- 为状态回执 `inlineStatus()`、Toast、操作反馈、弹窗、页面进入提示、COMMAND 导航、主题选项增加语义组件边界，业务逻辑、状态文案和路由保持统一。
- P5 公共组件继续使用红黑高对比、斜切轮廓、剪贴式标签、强阴影和快速行动反馈。
- Blue Archive 公共组件新增校园终端式表现：圆角玻璃面板、天空蓝/深海军蓝层级、轻阴影、轨道式 COMMAND 容器与移动端底部菜单，不再只是颜色覆盖。
- 补充按钮的 loading / disabled / active 状态、组件级 focus-visible、`prefers-reduced-motion` 降级规则；保留 Escape 关闭弹窗、打开后焦点进入、关闭后焦点返回。
- 保留纯前端内存演示、四项一级导航、既有业务状态和主题资源回退；没有新增后端、持久化、真实上传下载或游戏接口。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 268 CHECKS PASSED**。
- 覆盖桌面 1440px、移动 390px、公共弹窗/反馈/主题切换、业务回归、资源加载、横向溢出、浏览器脚本错误及截图生成。
- 已目视复核 `club-app/desktop.png` 与移动检查截图；P5 保持行动指挥构图，Blue Archive 保持玻璃校园终端构图。

### 新确认的决定

- 公共组件采用“统一语义结构 + 主题表现层”边界；未来主题只新增主题选择器、资源与表现规则，不复制活动、成员、消息、审核或管理业务逻辑。
- `rights.status` 继续保持 `unverified`；本轮只使用已接入的本地主题资源，不宣称获得官方授权。

### 下一步

- 阶段三进入四个一级页面的主题化：分别细化 `hub / events / community / me` 的 Hero、活动卡、小组卡、档案卡与页面专属面板。
- 后续继续用第三主题验证语义组件不会带出 P5 或 Blue Archive 的业务复制。

## 阶段三：四个一级页面主题化（2026-09-20）

### 本轮实际完成

- 将 `hub / events / community / me` 四个一级页面补齐主题语义表面：Hero、任务网格、羁绊连接、学生档案等页面级表现入口。
- 将活动/任务卡、小组卡、档案卡、票夹、社长工作台预览、主题契约、偏好和羁绊面板纳入统一语义组件边界；业务模板、状态和路由仍由同一套逻辑驱动。
- P5 页面继续使用红黑高对比、斜切轮廓、撕纸式任务卡、强阴影、行动色块和指挥室面板。
- Blue Archive 页面表现层继续使用天空蓝/白/深海军蓝、玻璃面板、轨道连接、校园终端和学生档案层级；没有把 Blue Archive 简化为 P5 的换色版本。
- 保持四项一级导航、hash 路由、活动/小组/消息/审核/管理演示逻辑和纯前端内存状态不变；没有重新引入 `p5-website/`，`rights.status` 继续为 `unverified`。

### 视觉检查

- 重新生成并抽查 `club-app/desktop.png`、`club-app/mobile.png`、`club-app/events-1440.png`、`club-app/community-1440.png`、`club-app/me-1440.png`。
- 桌面 1440px：页面级卡片、COMMAND 导航、底部反馈条和关键按钮未见明显遮挡或横向溢出。
- 移动 390px：档案卡、票夹、工作台、偏好和羁绊面板保持在可视布局内；底部 COMMAND 仍可达，页面进入提示不阻塞关键操作。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 268 CHECKS PASSED**，覆盖桌面 1440px、移动 390px、四个一级页面、主题切换、业务交互、资源加载、脚本异常和截图生成。

### 新确认的决定

- 一级页面继续采用“结构与业务统一、主题表现独立”的语义组件边界；后续主题不得通过复制页面业务模板接入。
- 页面专属卡片可以拥有作品风格轮廓、层级、图形和文案，但所有状态仍必须保留文字或结构表达。
- `rights.status` 继续保持 `unverified`；本轮只确认本地演示视觉可用，不宣称已取得公开发布或商用授权。

### 下一步

- 进入阶段四：为 P5 与 Blue Archive 增加主题专属页面转场、弹窗/反馈动效、成功/失败音效入口及 reduced-motion 降级验证；仍保持纯前端内存演示边界。

## 阶段四：主题专属动效与音效入口（2026-09-20）

### 本轮实际完成

- 为主题注册表增加 `motion` 表现 profile：P5 使用 `p5-slice / p5-cut / p5-impact / p5-burst`，Blue Archive 使用 `blue-scan / blue-terminal / blue-panel / blue-pulse`。
- 页面转场、页面进入提示、通用弹窗、Toast 和操作反馈现在通过统一语义入口读取当前主题的动效 profile，不复制业务逻辑或页面模板。
- P5 转场继续使用斜切、快速切片、冲击式弹入和分段反馈；Blue Archive 使用扫描线、终端面板、柔和位移和玻璃界面反馈，避免直接复用 P5 的红黑斜切语言。
- `sfx()` 增加当前主题声音 profile 与最近声音 cue 的语义记录；主题缺失音频仍沿用既有默认资源回退机制，不伪造新增音效文件。
- `prefers-reduced-motion: reduce` 与页面内“减少页面动效”设置均会关闭主题专属关键帧和速度线，保留文字、结构和操作结果。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 268 CHECKS PASSED**，覆盖桌面 1440px、移动 390px、主题切换、页面转场、弹窗、反馈、业务回归、资源加载和脚本异常。
- 已抽查重新生成的 `club-app/desktop.png`、`club-app/mobile.png` 与 `club-app/page-intro-desktop.png`，未发现关键内容遮挡或横向溢出。

### 新确认的决定

- 动效必须通过主题 profile 接入公共语义组件；业务代码只触发统一的转场、弹窗、Toast、反馈和声音 cue。
- 缺失主题音频必须回退到默认资源；在没有已记录素材时不新增或伪造音频文件。
- reduced-motion 同时接受系统偏好和页面设置，且任何情况下不能删除状态文字或结构反馈。
- `rights.status` 继续保持 `unverified`。

### 下一步

- 进入阶段五：用第三主题做扩展性验证，确认只新增主题注册、资源和表现覆盖，不复制活动、成员、消息、审核或管理业务逻辑。

## 阶段五：第三主题扩展性验证（2026-09-20）

### 本轮实际完成

- 新增原创本地验证主题 `neon-grid`（霓虹网格主题），用于验证后续主题可以在不复制业务逻辑的前提下接入。
- `neon-grid` 仅新增主题注册、主题令牌、页面级文案、动效 profile 与 CSS 表现层；活动、成员、消息、审核、管理、权限演示和四项一级导航仍复用同一套语义结构与业务状态。
- 为四个一级页面提供独立主题进入提示：`NEON BASE`、`GRID MISSIONS`、`LINK NETWORK`、`USER CONSOLE`；为主题切换、页面转场、弹窗、Toast、操作反馈接入 `neon-scan / neon-terminal / neon-panel / neon-pulse / neon-console` 表现 profile。
- 主题资源继续使用现有安全回退机制；没有新增未经记录的官方或第三方素材，也没有重新引入已删除的 `p5-website/`。
- `neon-grid` 不复制 P5 的红黑斜切或 Blue Archive 的校园玻璃表现，使用紫色霓虹、深色网格、终端面板和控制台式信息层级验证主题表现可独立演进。

### 视觉检查

- 已生成并检查 `club-app/neon-grid-desktop.png`（1440px）与 `club-app/neon-grid-mobile.png`（390px）。
- 桌面视口中主题切换、终端面板、COMMAND 导航和页面内容层级正常；移动视口中底部 COMMAND 可用，未发现明显横向溢出。
- 所有状态仍保留文字或结构表达；主题颜色、动效和资源不承担业务逻辑判断。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 270 CHECKS PASSED**，覆盖主题注册与回退、四个一级页面、主题切换、公共组件、业务回归、资源加载、桌面 1440px、移动 390px、截图生成和浏览器脚本异常。

### 新确认的决定

- 第三主题接入的最小边界固定为：主题注册 + 主题表现 profile + 资源安全回退；不得复制任何业务模板或状态逻辑。
- 新主题可以拥有独立文案、页面进入提示、动效 profile、面板轮廓和信息层级，但必须继续遵守统一的语义组件协议、四项一级导航和纯前端内存演示边界。
- `rights.status` 继续保持 `unverified`；`neon-grid` 为原创本地验证主题，不代表任何官方作品授权状态。

### 下一步

- 可进入第三主题的细化打磨，或进行真实设备触控、键盘焦点、屏幕阅读器和 reduced-motion 的专项复核。
- 后续新增主题仍先通过注册表和语义表现层接入，再执行桌面 1440px、移动 390px 及完整业务回归。

## 阶段六：第三主题专项可访问性与设备边界复核（2026-09-20）

### 本轮实际完成

- 对 `neon-grid` 在 390px 移动视口进行专项复核，确认主题可以正常应用，底部 COMMAND 四项入口保持可达。
- 复核移动端 COMMAND 与主题选择器的触控区域，均不小于 44px；没有改变四项一级导航或业务状态。
- 复核键盘焦点，公共交互控件继续显示高对比 `focus-visible` 轮廓。
- 复核 `M` 键打开主题选择弹窗、主题选项数量、Escape 关闭弹窗，以及系统 `prefers-reduced-motion: reduce` 下转场关键帧关闭。
- 本轮没有发现需要修改源代码的问题，因此不进行无证据的视觉或业务改动。

### 验证结果

- 专项 Playwright 检查：**ALL 8 SPECIAL CHECKS PASSED**。
- 覆盖 `neon-grid` 移动端应用、COMMAND 触控区域、键盘焦点、主题弹窗、主题选项触控区域、Escape 关闭和系统 reduced-motion 降级。
- `rights.status` 继续保持 `unverified`；本轮没有新增素材、后端能力或持久化行为。

### 新确认的决定

- 第三主题进入后续细化前，必须先通过移动端触控、键盘焦点、弹窗关闭和 reduced-motion 专项边界；专项检查通过后才允许继续扩展视觉表现。
- 当前公共语义组件层已满足本阶段的基础设备与可访问性边界，后续若无真实设备证据，不做额外高风险布局调整。

### 下一步

- 可进入真实设备触控与屏幕阅读器复核，或开始第三主题的更细粒度页面卡片和反馈表现打磨。

## 阶段七：第三主题公共组件细粒度表现打磨（2026-09-20）

### 本轮实际完成

- 为 `neon-grid` 补齐公共语义组件的细粒度表现：主按钮、次按钮、危险按钮、Ghost 按钮、加载、禁用、状态回执、Toast、操作反馈、通用弹窗、COMMAND 导航和主题选择器。
- 统一使用既有 `data-component`、`data-variant`、`data-state`、`aria-pressed` 等语义属性，未复制任何业务模板或状态逻辑。
- 霓虹网格主题采用终端面板、紫色/青色发光、轻量圆角、深色网格与控制台层级；没有重新使用 P5 的红黑斜切，也没有改写 Blue Archive 的表现规则。
- 保留键盘焦点、触控区域、Escape 关闭、loading/disabled 状态和 reduced-motion 降级边界。

### 视觉检查

- 重新生成并检查 `club-app/neon-grid-desktop.png`（1440px）与 `club-app/neon-grid-mobile.png`（390px）。
- 桌面端 COMMAND、按钮和反馈层级清晰；移动端底部 COMMAND、主按钮与页面卡片无明显遮挡或横向溢出。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 270 CHECKS PASSED**。
- 专项 Playwright 检查：**ALL 8 SPECIAL CHECKS PASSED**。

### 新确认的决定

- 第三主题的公共组件表现已达到可作为独立主题继续扩展的基础，不需要再通过复制 P5 或 Blue Archive 组件来增加差异。
- 后续主题卡片、页面专属反馈和动效继续沿用“统一语义结构 + 主题表现 profile”的边界。
- `rights.status` 继续保持 `unverified`。

### 下一步

- 建议将后续的真实设备触控、屏幕阅读器和发布前审计拆为新的独立任务；当前主题表现阶段可以暂告一段落。

## 发布前质量验收（2026-09-20）

### 本轮实际完成

- 在桌面 1440×1080 与移动 390×1080 视口分别检查 P5、Blue Archive、`neon-grid`；生成并目视检查 6 张发布前主题截图，确认四项一级导航、COMMAND/底部菜单、主要按钮与页面内容无明显横向溢出或遮挡。
- 通过 Playwright 验收 Tab、Shift+Tab、Enter、Escape、M 键：焦点可进入跳过链接、HUD、COMMAND、主要按钮；主题菜单与消息弹窗打开后焦点进入弹窗，Escape 关闭后返回触发按钮。
- 复核页面进入提示、Toast、操作反馈、状态回执、按钮状态、主题切换和系统 `prefers-reduced-motion: reduce`；状态继续同时以文字/结构表达。
- 复核屏幕阅读器相关 DOM/ARIA：页面语言为 `zh-CN`，主内容可聚焦，状态区域使用 `role=status`/`aria-live`，弹窗使用 `aria-labelledby`，当前 COMMAND 项使用 `aria-current="page"`。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 270 CHECKS PASSED**。
- 发布前专项 Playwright：三主题 × 双视口通过；键盘与焦点返回、ARIA 结构、reduced-motion 通过。

### 本轮修复与边界

- 修复 `app.js` 中一级导航当前项的 `aria-current` 空值，改为规范的 `aria-current="page"`；未复制业务逻辑。
- `rights.status` 继续保持 `unverified`；未重新引入 `p5-website/`。
- 项目仍是纯前端内存演示，不新增后端、登录、持久化、上传下载、支付、聊天、推送或真实游戏接口。
## 发布候选版真实设备边界专项（2026-09-20）

### 本轮实际完成

- 启动本地 HTTP 服务，通过 Playwright Edge 触控上下文检查 390×844 竖屏与 844×390 横屏；覆盖底部 COMMAND 切页、消息弹窗、Escape 焦点返回、小聚表单字段聚焦、横屏无溢出。
- 在可见 Edge 中复核辅助功能树：主菜单、消息中心、跳过链接、主题选择器标题、关闭按钮、三个主题选项与 `UNVERIFIED` 状态均有可读名称。
- 使用 ARIA 快照检查页面结构；主题选择器通过 `M` 键打开，Escape 可关闭，三个主题可访问。

### 验证结果

- 发布候选版专项：**ALL 17 RELEASE CANDIDATE CHECKS PASSED**。
- 三项规定验证：`node --check club-app/app.js`、`node --check club-app/theme-registry.js`、`node club-app/check-ui.cjs` 均通过；完整回归 **ALL 270 CHECKS PASSED**。
- 本轮未修改源代码，未发现真实设备边界模拟、焦点、弹窗、ARIA 结构或横屏布局问题。

### 边界说明

- 本轮完成的是 Playwright 触控仿真与 Edge Accessibility Tree 检查，不等同于物理手机真机测试或 Narrator/NVDA 的真人朗读验收。
- `rights.status` 继续保持 `unverified`，项目继续保持纯前端内存演示边界。
## 阶段八：据点页面三主题视觉深化（2026-09-20）

### 本轮实际完成

- 深化 `hub / 据点` 页面主题表现，继续复用同一套业务数据、动作和状态语义，没有复制业务逻辑。
- 为 Hero、主题贴纸和快捷任务区增加语义挂点：`hub-hero`、`hub-sticker`、`hub-quick-deck`。
- P5 强化剪贴纸张、红色行动线和卡片层级；Blue Archive 强化校园终端玻璃层、浅色信息面和圆角卡片；`neon-grid` 强化控制台面板、青紫霓虹边缘和在线节点提示。
- 针对 390px 发现的快捷卡被顾问条部分遮挡问题，压缩移动端快捷卡高度与间距，确保三张任务卡标题、状态和副文案可读。
- 生成并目视检查三主题 `1440×900` 与 `390×844` 截图；六张截图保存在系统临时目录，不作为项目发布包素材。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 270 CHECKS PASSED**。
- Playwright 截图脚本：P5、Blue Archive、`neon-grid` 三主题双视口均通过，横向溢出为 0，Hub 快捷任务卡数量为 3。

### 本轮发现与修复

- 发现 P5 与 `neon-grid` 在 390px 首屏的第三张快捷卡被固定顾问条部分遮挡；已仅通过移动端 CSS 收紧卡片高度、内边距和间距修复，未改变固定导航、顾问提示或业务状态。
- 桌面端未发现遮挡；Blue Archive 移动端原有层级正常。

### 边界确认

- 三个主题的 `rights.status` 继续保持 `unverified`。
- 未重新引入 `p5-website/`。
- 继续保持纯前端内存演示，不新增后端、登录、持久化、上传下载、支付、聊天、推送或真实游戏接口。
- 按用户决定，本轮跳过素材授权审计与发布包清点；这不改变未核验状态。

### 下一步

- 推荐进入 `events / 活动` 页面三主题视觉深化，重点处理任务简报卡、报名状态、正式活动/成员聚会区分和移动端信息密度；真实设备触控与真人屏幕阅读器仍作为独立后续验收。

## 阶段九：三主题公共组件文案表现层（2026-09-20）

### 本轮实际完成

- 将 `hub / events / community / me` 四个一级页面的公共文案接入 `CLUB_THEME_COPY`，业务数据、筛选值、路由、动作和状态语义保持共用，不复制业务逻辑。
- P5 使用“据点、行动、羁绊、放学后”等 Phantom Club 语气；Blue Archive 使用“校园终端、老师、学生档案、社团联络”等校园系统语气；`neon-grid` 使用“节点、网格任务、参数、协议、本地记录”等控制台语气。
- 主题差异覆盖 Hero、页面进入标题、活动页说明/搜索/空态、同好页加入与游戏入口状态、个人档案/票夹/工作台/偏好/连接面板等组件文案。
- 保留业务值 `全部 / 正式活动 / 成员聚会 / 我的报名`、统一状态语义、真实权限边界和 `NO API` 诚实空状态；仅改变显示文案，不改变筛选与动作逻辑。
- 发现活动标题强调词重复显示，已最小修正三主题 `events` profile 的标题与强调词组合。
- 生成并目视检查三主题四个一级页面的 `1440×900` 与 `390×844` 截图；截图写入系统临时目录，不作为项目发布包素材。三主题实际切换后页面横向溢出均为 0。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 270 CHECKS PASSED**。
- Playwright 三主题双视口文案截图检查：P5、Blue Archive、`neon-grid` 均完成；主题切换后文案实际更新，页面进入提示、Toast、底部 COMMAND 与主要状态可读。
- 目视检查代表性截图：P5 桌面 Hub、Blue Archive 移动 Hub、`neon-grid` 桌面 Events、Blue Archive 桌面 Me；未发现横向溢出、文案截断或底部 COMMAND 遮挡。

### 本轮发现与修复

- 发现活动页主题标题的完整标题与强调词重复；已通过主题注册表最小修正，不改变结构和业务逻辑。
- 未发现主题切换后业务状态丢失、页面进入提示或 Toast 遮挡关键内容的问题。

### 边界确认

- 三个主题的 `rights.status` 继续保持 `unverified`。
- 未重新引入 `p5-website/`；本轮没有进行素材授权审计与发布包清点，遵循用户明确决定。
- 继续保持纯前端内存演示，不新增后端、登录、持久化、上传下载、支付、聊天、推送或真实游戏接口。

### 下一步

- 推荐继续做三主题 `events / 活动` 的卡片状态与交互反馈深化，重点检查报名成功、候补、取消、签到、活动回顾编辑器的主题化文案与视觉状态；仍需保持统一业务语义和 1440×900 / 390×844 双视口回归。


## 阶段十：主题资源串台与 BA 档案布局修复（2026-09-21）

### 本轮实际完成

- 修复 Blue Archive / neon-grid 切换后仍显示 P5 顾问、P5 活动人物和 P5 弹窗标题的问题：顾问图、活动卡人物、弹窗 splash、顶部社团标识均改为按主题表现层切换。
- 删除左下角固定 `01/04` 页数组件，不改变四项 COMMAND 一级导航。
- 右上角日期改为基于 `Asia/Shanghai` 的北京时间实时显示，每秒更新日期与完整中文星期。
- 修复 Blue Archive「我的」页面活动记录、社长工作台演示、主题外观等面板过窄问题：桌面使用可伸缩两列，移动端单列；同步提高浅色背景下的标题、正文和辅助文字对比度。
- Blue Archive「我的」页面改用天空校园主视觉 `kv_2.webp`，降低背景遮挡并保留主题识别度。
- 为 neon-grid 新增原创 `themes/neon-grid/assets/visual/node-card.svg`，避免第三主题复用 BA 资源。
- 主题字体表现层使用可本地回退的 `Noto Sans SC`、`IBM Plex Mono`、`Microsoft YaHei UI` / `Cascadia Mono` 字体栈；不新增远程字体依赖。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 270 CHECKS PASSED**。
- Playwright 定向检查：P5、Blue Archive、neon-grid；桌面 `1440×900`、移动 `390×844`；主题资源、实时日期、页数组件移除、BA 档案卡片宽度、活动卡人物资源和横向溢出均通过。
- 代表性截图已生成并目视检查，临时目录为 `C:\Users\chenss77\AppData\Local\Temp\club-theme-fix-qa2\`，不进入发布包。

### 边界确认

- 三个主题的 `rights.status` 继续保持 `unverified`。
- 未重新引入 `p5-website/`；按用户决定跳过素材授权审计与发布包清点。
- 继续保持纯前端内存演示，不新增后端、登录、持久化、上传下载、支付、聊天、推送或真实游戏接口。

### 下一步

- 推荐进行真实设备触控、真人屏幕阅读器和浏览器兼容性抽样验收；如无新增阻塞问题，再进入用户指定的素材授权与发布包清点（当前仍按要求跳过）。

## 阶段十一：BA 档案卡可读性与悬浮层修正（2026-09-21）

### 本轮实际完成

- 修复 Blue Archive「我的」页标题溢出：`SETTINGS / 偏好`、`CONNECTION LOG / 联络记录` 允许正常换行，保留卡片内边距，避免裁切。
- 修复「切换到管理预览身份」按钮：改为单行 `flex` 排列，文字不折行，图标与文案保留 8px 间距。
- 移除 BA 社长工作台卡片上会压住正文的巨大 `COMMAND` 水印。
- 修复「天空玻璃主题 / SKY GLASS」预览白卡：`ACTIVE`、主题名与主题副标识采用稳定的网格间距，不再互相挤压。
- 修复 BA 档案页布局根因：`STUDENT DOSSIER // LOCAL DEMO` 伪元素不再占用 CSS Grid 首格，桌面恢复头像卡 + 记录板的双列结构，左右卡片等高；移动端保持单列。
- 强化 BA「活动记录、社长工作台、主题外观、偏好、连接记录」正文、记录行和标题的深色对比度。
- 顾问/头像辅助浮层在非档案页面固定于右下安全区；BA「我的」长档案页隐藏该辅助浮层，避免覆盖连接记录文字。
- 重新生成并目视检查 BA `1440×900` 与 `390×844`「我的」页干净截图。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node club-app/check-ui.cjs`：**ALL 270 CHECKS PASSED**。
- Playwright 定向检查：BA 桌面/移动布局、标题可读宽度、按钮 `white-space: nowrap`、主题预览结构、浮层显示策略、横向溢出均通过。

### 边界确认

- `rights.status` 继续保持 `unverified`。
- 未重新引入 `p5-website/`。
- 继续保持纯前端内存演示边界；未新增后端、登录、持久化、上传下载、支付、聊天、推送或真实游戏接口。
- 本轮未进行素材授权审计与发布包清点，遵循用户此前决定。

### 下一步

- 推荐进行真实设备触控、真人屏幕阅读器和浏览器兼容性抽样验收。

## 阶段十二：触控、焦点与浏览器兼容性抽样验收（2026-09-21）

### 本轮实际完成

- 使用 Edge + Playwright 对 P5、Blue Archive、`neon-grid` 三主题进行桌面 `1440×900` 与移动 `390×844` 抽样。
- 移动端启用 `hasTouch` / `isMobile`，通过 `tap()` 验证 COMMAND 导航、页面切换与主题菜单入口。
- 验证 Tab、Shift+Tab、Enter、Escape、M 键相关路径；弹窗打开后焦点进入可操作控件，Escape 可关闭弹窗。
- 检查 `lang=zh-CN`、主菜单 `aria-label`、消息入口标签、按钮可读名称、弹窗 `aria-labelledby`、页面标题层级和动态状态结构。
- 验证 reduced-motion 模式下转场时长降为 `0s`，三主题移动/桌面横向溢出均为 `0`，浏览器脚本错误为 `0`。
- 通过 Edge 实际运行了触控模拟和键盘/焦点抽样；当前环境未安装 Playwright Chromium、Firefox、WebKit 可执行文件，因此未伪造其兼容性结果。

### 验证结果

- 三主题 × 两视口触控/导航抽样：通过。
- DOM / ARIA 结构抽样：通过。
- reduced-motion：通过。
- Edge 脚本错误与横向溢出：通过。
- Playwright Chromium / Firefox / WebKit：环境不可用，未纳入通过数。

### 新确认事项

- 当前发布前浏览器抽样以本机 Edge 为有效证据；其他引擎需在安装对应浏览器运行时后再补验。
- 当前 Playwright 版本的 `page.accessibility.snapshot()` 不可用，屏幕阅读器验收仍属于 DOM/ARIA 结构抽样，不等同于真人 NVDA/Windows Narrator 验收。
- `rights.status` 继续为 `unverified`；未重新引入 `p5-website/`；继续保持纯前端内存演示边界。

### 下一步

- 推荐在安装 NVDA 或 Windows Narrator、并具备 Firefox/Chromium/WebKit 运行时的环境中补做真人屏幕阅读器与多引擎抽样；当前无需继续改动业务代码。

## 阶段十三：Chrome 补验与环境能力确认（2026-09-21）

### 本轮实际完成

- 使用本机实际安装的 Google Chrome 可执行文件运行 `club-app/check-ui.cjs` 全套回归；未修改业务代码。
- Chrome 覆盖现有主题注册、四项一级导航、活动/同好/我的/据点流程、弹窗焦点、键盘路径、移动端布局、资源加载、截图生成等检查。
- 环境能力再次确认：Microsoft Edge、Google Chrome、Windows Narrator 可执行文件存在；Firefox/WebKit Playwright 运行时与 NVDA 未安装。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- Edge：**ALL 270 CHECKS PASSED**。
- Chrome：**ALL 270 CHECKS PASSED**。
- Firefox/WebKit：运行时未安装，未纳入通过数。
- 真人 Windows Narrator：本轮未启动交互式读屏流程；DOM/ARIA 结构抽样仍通过，但不替代真人读屏验收。

### 边界确认

- 三个主题的 `rights.status` 继续保持 `unverified`。
- 未重新引入 `p5-website/`；继续跳过素材授权与发布包清点。
- 继续保持纯前端内存演示边界，不新增后端、登录、持久化、上传下载、支付、聊天、推送或真实游戏接口。

### 下一步

- 如需完成剩余验收，应在具备 Firefox/WebKit 运行时和真人 NVDA/Windows Narrator 操作条件时补做；当前代码无新增阻塞问题。

## 产品转型方向初筛（2026-09-21，尚未确认）

- 基于当前「据点 / 活动 / 同好 / 我的」及任务简报、岗位、签到、候补、小队、公告确认与记录能力，首选转型建议为「线下大型活动的志愿者／临时工作人员现场执行与调度系统」。
- 建议首个垂直场景聚焦漫展、电竞赛、校园节庆等年轻化活动；现有四入口可分别承接现场指挥台、班次与任务、小队、个人凭证与工时记录。
- 该方向目前只是调研建议，尚未由用户确认；当前代码与既有社团业务基线均未调整。
- 若确认继续，应先完成真实主办方访谈和单场试点验证，再决定是否改写页面文案、业务状态与数据模型。

## 候选产品方向：低压力社团活动平台（2026-09-21，待验证）

- 用户提出继续保留大学社团场景，但将核心从行政管理转向帮助成员更轻松地发起、发现和参加约饭、约局、聚会及正式活动。
- 当前建议定位为「大学社团的低压力线下活动发起与参与平台」：不完整替代 QQ 群聊天，而是为社团提供结构化活动、低承诺意向、结伴到场、迎新联系人、临时活动小队和活动后连接。
- 现有四项一级导航和主题系统可以继续复用；复杂审核、强制签到、公开缺席惩罚、榜单和重型管理功能应按活动类型降级为可选能力。
- 用户已确认验证阶段完成，当前已进入第一批 UI 与纯前端内存交互改造；这不等同于已证明采用率、留存或商业可行性。

## 转型执行基线（2026-09-21）

- 低压力社团活动平台的完整转型路线见 `../系统设计/低压力社团活动平台-转型执行方案-v1.0.md`。
- 当前执行顺序：先做真实学生与社团组织者验证，再做核心流程原型，再改造现有 UI，最后接入纯前端内存演示和试点。
- 首期优先验证 `有点兴趣`、`想去但不想一个人`、`达到人数再成团`、`活动社交预览` 四个机制。
- 当前不完整替代 QQ 群、不接真实聊天、后端、推送、支付、地图或心理干预能力。
- 现有代码保持纯前端内存演示；P5 与 Blue Archive 资源的 `rights.status` 继续为 `unverified`。

## 阶段一：用户验证准备（2026-09-21）

- 用户验证提纲见 `../系统设计/低压力社团活动平台-用户验证提纲-v1.0.md`。
- 访谈先追问最近一次真实活动经历，再展示 `有点兴趣`、`想去但不想一个人`、`达到人数再成团`、`活动社交预览` 等机制卡片。
- 在获得真实学生和社团组织者证据前，不把“低压力机制有效”写成已验证结论，不进入大面积 UI 重构。

## 阶段二：低压力活动核心 UI 第一批改造（2026-09-21）

### 本轮实际完成

- 四个一级页面完成第一轮低压力活动语义迁移：据点聚焦今日机会与轻量发起，活动聚焦发现与低承诺意向，同好新增临时活动小队，我的新增参与偏好与意向统计。
- 活动卡新增 `有点兴趣`、`想找同行`、`查看预览`；兴趣与同行需求使用独立内存状态，不报名、不占活动名额。
- 活动详情新增“活动社交预览”，展示预计规模、首次参加人数、交流程度、是否需要自我介绍、能否中途离开与迎新联系人，并明确为虚构示例信息。
- “我的活动”现在汇总报名／候补状态与同行需求；普通 Toast 会在关键角色反馈前关闭，避免重复提示叠加。
- 同好页新增临时活动小队；我的页面新增参与偏好展示；社长入口改为“活动发起与管理预览”，仍不会授予真实权限。
- P5、Blue Archive 与 `neon-grid` 共用同一业务状态与交互逻辑，没有为主题复制活动逻辑。
- 修复活动卡三项操作点击区域重叠，以及任务简报社交预览深底深字问题；新增桌面、移动 `4.5:1` 对比度回归检查。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- Microsoft Edge：桌面 1440px 与移动 390px，**ALL 283 CHECKS PASSED**。
- 已生成并目视检查活动页、社交预览桌面／移动截图及移动档案页截图；无横向溢出，社交预览与参与偏好文字可读。
- Google Chrome 本轮未重新运行 283 项版本；此前 270 项结果不能替代本轮补验。Firefox/WebKit 与真人 NVDA/Windows Narrator 仍未验。

### 当前边界

- 所有新增状态均为纯前端内存演示，刷新后重置；不接真实匹配、聊天、推送、地图、登录、数据库或服务端权限。
- 游戏榜单与赛季记录继续保持 `NO API` 诚实空状态。
- P5、Blue Archive 与 `neon-grid` 的 `rights.status` 继续保持 `unverified`；本地可运行不等于已获公开发布或商用授权。

### 部署准备（2026-09-24）

- 已将根目录 `sync-deploy-site.py` 改为安全发布包生成器：默认 `--check-only`，不会删除目标目录；覆盖必须显式传入 `--replace`，且目标必须位于项目根目录范围内。
- 发布包会排除 `.env`、`.env.example`、开发脚本、参考素材和根目录截图，并在复制后再次扫描潜在 `service_role`/secret key，最后写入 `release-manifest.json`。
- 当前只完成本地发布准备和检查，没有部署、没有购买域名、没有改 DNS、没有执行 Supabase SQL。浏览器配置只能使用 publishable/anon key，不能使用 `service_role`。
- 公开 Preview 前仍需：确认托管目标、配置非生产 Supabase Auth 并执行/验证 RLS/RPC，在目标 Preview 完成真实权限和桌面/移动/主题/四导航回归；现有素材授权已由负责人确认，详见授权核验记录。正式域名后置。
- 本地安全检查命令：`python sync-deploy-site.py --check-only`。生成发布副本前需明确确认并使用 `python sync-deploy-site.py --replace`；该命令仍只生成本地副本，不代表已上线。
- 本轮 UI/语法回归：三项 `node --check` 通过；`node club-app/check-ui.cjs` 为 `ALL 424 CHECKS PASSED`，覆盖桌面 1440px、移动 390px、P5、Blue Archive 与四项一级导航。

## 下一批开发顺序

1. 实现 `达到人数再成团` 的活动创建字段、人数进度和状态演示。
2. 将活动发起表单改为低压力活动模板：最少成团人数、预计规模、社交强度、自我介绍、中途离开、同行集合点与迎新联系人。
3. 将静态“参与偏好”改为可编辑的内存状态，并明确隐私可见范围。
4. 弱化普通成员主路径里的复杂审核、签到与岗位；正式大型活动继续按需保留。
5. 后续改造组织者工作台，只展示匿名或聚合意向，不公开个人紧张状态。



## 阶段三：达到人数再成团与低压力活动模板（2026-09-21）

### 本轮实际完成

- 活动新增 `formationMode`、`minParticipants`、`expectedScale`、`meetPoint` 等统一字段，支持“达到最低人数再成团”和“立即开放”两种模式。
- 活动卡与任务简报新增结构化成团进度，使用文字、人数和 `progressbar` 同时表达“等待成团”“已成团”“无需等人成团”，不只依赖颜色。
- 统一人数口径：`有点兴趣` 与 `想找同行` 仍是低承诺意向，不计入成团人数；只有正式报名计入活动当前人数。
- 正式报名达到门槛时自动切换为“已成团”并提供角色反馈；取消报名跌破门槛时恢复“等待成团”并提供明确 Toast。
- 成员小聚与正式活动表单统一为低压力活动模板，覆盖成团方式、最少人数、容量、预计规模、社交强度、自我介绍、中途离开、同行集合点、迎新联系人和可见范围。
- 最低成团人数不得超过活动容量；立即开放模式会禁用最低人数输入，避免产生互相矛盾的数据。
- P5、Blue Archive 与 `neon-grid` 继续共用同一套活动数据和业务逻辑，没有为主题复制功能状态。

### 示例与当前能力

- 示例活动 `e1` 为 18/10，显示“已成团”；`e2` 为立即开放，显示“无需等人成团”；`e3` 为 5/6，显示“等待成团”。以上均为虚构演示数据。
- 新建成员小聚时，发起者计入首位正式报名与成团人数；新建正式活动可选择立即开放或达到人数再成团。
- 所有创建、报名、取消、成团与偏好状态仍只保存在浏览器内存中，刷新即重置；没有真实后端、通知、匹配或隐私隔离能力。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/theme-registry.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- Microsoft Edge：桌面 1440px 与移动 390px，**ALL 303 CHECKS PASSED**，相较阶段二新增 20 项成团流程、表单约束与移动端回归检查。
- 已生成并目视检查 `formation-event-desktop.png`、`formation-form-desktop.png`、`formation-event-mobile.png`、`formation-form-mobile.png`；桌面与移动端均无横向溢出，弹窗内容可滚动。
- Chrome、Firefox/WebKit 与真人 NVDA/Windows Narrator 未运行本轮 303 项版本，不纳入本轮通过结论。

## 下一批开发顺序

1. 将“我的”页面静态参与偏好改为可编辑的内存状态，并明确每项偏好的展示范围。
2. 补充小规模偏好、是否希望同行、是否接受自我介绍、是否偏好允许中途离开等设置；不伪造真实推荐、匹配或服务端隐私隔离。
3. 弱化普通成员主路径里的复杂审核、签到与岗位；仅为正式大型活动保留按需入口。
4. 改造组织者工作台，只展示匿名或聚合意向，不向组织者公开成员个人紧张状态。


## 阶段三修正：低压力活动表单与次级弹窗交互修复（2026-09-21）

### 本轮实际完成

- 活动表单取消“社交强度”和“中途离开”两个填写框；活动详情与新建活动数据也不再依赖这两个填写字段，旧示例数据仅保留兼容读取，界面不再展示。
- 修复活动表单文本控件交互：文本输入显式使用 type="text"，并让表单控件保持可聚焦、可输入，装饰层不再拦截点击。
- 统一调整次级窗口关闭按钮：从视口固定定位改为相对弹窗定位，放置在弹窗右上角；桌面与移动端分别保留合适边距。
- 回归脚本新增字段移除、文本输入和关闭按钮位置检查，避免后续改动重新引入本轮问题。

### 验证结果

- node --check club-app/app.js：通过。
- node --check club-app/check-ui.cjs：通过。
- node club-app/check-ui.cjs：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 311 CHECKS PASSED**。
- 已目视检查：formation-form-desktop.png、formation-form-mobile.png；未发现关闭按钮错位或移动端横向裁切。
- 本轮仍为纯前端内存演示；没有后端、持久化、真实登录、服务端权限隔离或真实通知能力。

### 下一阶段范围

按用户确认，下一阶段只开发此前编号中的第 **1、2、3、6、7** 点；不自行扩展为其他编号，也不重新加入“社交强度”和“中途离开”填写项。


## 阶段四启动：指定页面可读性基线与低压力主路径（2026-09-21）

### 本轮实际完成

- 确认活动文本输入“无法输入”的直接原因：输入框背景为白色，继承到的文字颜色和光标颜色也为白色，实际输入值存在但不可见。
- 为弹窗内活动创建、活动详情和相关页面表单统一补充主题墨色文字、主题墨色光标和可读占位符颜色；保留不同主题的令牌体系，不写死单一主题颜色。
- 将“文字颜色与背景颜色不同、光标颜色与背景颜色不同”加入 club-app/check-ui.cjs，防止回归。
- 下一阶段已启动，范围锁定为此前指定的第 1、2、3、6、7 项页面：公开社团主页、成员据点、活动详情、聚会创建、游戏分区；本轮先完成这些页面共享输入可读性基线，不扩展到其他页面。

### 验证结果

- node --check club-app/app.js：通过。
- node --check club-app/check-ui.cjs：通过。
- node club-app/check-ui.cjs：Microsoft Edge 桌面 1440px 与移动 390px，ALL 312 CHECKS PASSED。
- 已实际填写成员小聚标题并检查计算样式；截图 club-app/input-color-check.png 中输入区域文字与光标可见。

### 当前边界

- 项目仍为纯前端内存演示，刷新即重置；本轮没有接入后端、持久化、真实登录、聊天、推送或服务端权限隔离。
- 下一步继续只在第 1、2、3、6、7 项范围内推进，不重新加入“社交强度”和“中途离开”字段。

## 阶段四增量：低承诺参与主路径（2026-09-21）

### 本轮实际完成

- 据点首页的“下一活动”卡改为读取当前 `events` 内存数据，不再固定写死 `e1`、日期和人数；会优先展示尚未满额的正式活动，并显示当前成团状态与人数。
- 活动详情首屏新增“LOW-COMMITMENT ENTRY / 演示状态”行动区，将“有点兴趣”“想找同行”“确认报名/加入候补”集中呈现，并明确说明兴趣与同行需求不占名额。
- 移除活动详情底部重复的兴趣、同行和报名操作，避免同一动作出现两个按钮导致误触与自动化定位歧义。
- 新增桌面与移动端行动区样式：白色高对比面板、红色强调阴影、390px 下自适应堆叠；未重新引入“社交强度”和“中途离开”。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 312 CHECKS PASSED**。
- 已目视检查 `club-app/formation-event-desktop.png` 与 `club-app/formation-event-mobile.png`；新增行动区可见，关闭按钮仍位于右上角，未发现横向溢出或遮挡。

### 当前边界

- 仍为纯前端内存演示；活动数据、兴趣、同行需求和报名状态刷新后重置。
- 未接入真实账号、后端名额并发控制、通知、聊天、地图或游戏接口。
- 公开社团主页、成员据点、活动详情、聚会创建、游戏分区仍只在既有页面和演示能力内继续加工，不扩展一级导航。

### 下一步

- 在不扩大页面范围的前提下，继续检查公开社团主页入口、游戏分区带入小聚后的上下文回显，以及聚会创建成功后的页面内结果反馈。

## 阶段四增量：公开社团主页、游戏上下文与创建回执（2026-09-21）

### 本轮实际完成

- 同好页新增“公开社团主页”入口，新增公开主页弹窗，展示社团定位、成员规模、近期公开活动、参与规则和演示边界；可从公开活动直接进入活动详情，也可返回同好页。
- 游戏专区发起小聚时新增“FROM GAME ZONE / 已带入上下文”信息卡，明确显示游戏名称与“组队小聚”语义，并提示标题、地点已预填但仍可修改。
- 聚会发布成功后，活动页新增持续可见的 `MISSION CREATED / 演示完成` 回执，显示新活动标题、时间、发起者已计入的人数和“查看活动详情”入口；不再只依赖短时 Toast。
- 新增状态字段 `lastCreatedEventId`，仅用于当前页面内存演示，不引入持久化或后端能力。

### 新确认的决定

- 公开社团主页作为同好页内的次级入口，不扩展一级导航，不伪装成真实社团官网。
- 游戏上下文只表达用户从哪个游戏专区发起小聚，不自动写入真实游戏账号、段位、战绩或成员数据。
- 创建回执在进入活动页后持续显示，直到下一次刷新或下一次创建活动；回执可直接打开新活动详情。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 312 CHECKS PASSED**。
- 已目视检查 `club-app/game-zone.png`、`club-app/game-mobile.png` 与 `club-app/formation-event-desktop.png`；新增功能未造成横向溢出，弹窗关闭按钮仍位于右上角。

### 当前边界

- 公开社团主页、游戏上下文和创建回执均为纯前端内存演示；刷新页面后状态重置。
- 未接入真实社团认证、活动发布服务、通知、游戏 API、账号绑定或权限隔离。

### 下一步

- 继续在第 1、2、3、6、7 点范围内做一次细节验收，重点检查公开主页在移动端的阅读层级、创建回执的关闭/隐藏策略，以及不同游戏进入小聚时的预填信息一致性。

## 阶段四收尾：公开社团主页移动端验收（2026-09-21）

### 本轮实际完成

- 为公开社团主页补充桌面与 390px 移动端验收：弹窗加载、演示边界、近期活动入口、活动详情跳转、移动端视口宽度。
- 生成视觉检查截图：`club-app/public-club-desktop.png`、`club-app/public-club-mobile.png`。
- 目视确认公开主页保持 P5 风格，活动入口清晰，关闭按钮位于右上角；移动端弹窗在视口内，内容通过弹窗内部滚动承载，无横向溢出。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 320 CHECKS PASSED**。

### 下一步

- 进入阶段 4B：逐一验证六款游戏从游戏专区进入小聚时的标题、地点、来源提示、可编辑性，以及桌面/移动端布局一致性。

## 阶段四 B：六款游戏小聚上下文一致性验收（2026-09-21）

### 本轮实际完成

- 对王者荣耀、三角洲行动、原神、崩坏：星穹铁道、绝区零、鸣潮逐一验收：从游戏专区进入小聚、上下文来源提示、标题预填、地点预填以及标题/地点可编辑性。
- 桌面端与 390px 移动端均完成同一组验收；没有复制业务逻辑，只验证统一 `gathering()` 表单契约在不同游戏入口下的一致表现。
- 发现并修正验收脚本中的重复关闭动作：小聚窗口关闭后已返回同好页，脚本不再重复点击隐藏关闭按钮。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 374 CHECKS PASSED**。

### 下一步

- 进入阶段 4C：验证聚会创建成功后的页面内结果反馈，包括成功回执、查看详情、再次创建替换回执，以及刷新后回执清除。


## 阶段四 C：聚会创建结果反馈与移动端弹窗收尾（2026-09-21）

### 本轮实际完成

- 完成聚会创建成功后的页面内结果回执验收：创建成功后显示活动标题、发起者已计入人数和活动详情入口。
- 完成再次创建行为验收：新回执会替换旧回执，不会叠加多个结果卡。
- 完成刷新行为验收：刷新后页面内回执清除，符合当前纯前端内存演示的重置边界。
- 修正移动端长表单弹窗的关闭按钮定位：390px 视口下按钮保持在弹窗右上区域，不再因原生 `<dialog>` 高度变化落到弹窗外。
- 修正验收脚本的状态与定位问题：按精确活动标题定位详情，避免标题子串造成误判；刷新验收放到活动回顾流程之后，避免清空后续演示状态；移动端刷新后先回到 `hub` 再验证 `hub → events` 转场。

### 新确认的决定

- 创建成功反馈使用页面内回执作为主要确认，不依赖短时 Toast；回执可以直接打开刚创建的活动详情。
- 回执只在当前内存演示中存在，刷新后清除；下一次创建会替换当前回执。
- 移动端次级窗口关闭按钮统一保持右上角位置；长内容弹窗必须以实际弹窗边界为准进行定位验收。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 387 CHECKS PASSED**。
- 已生成并检查 `club-app/formation-form-desktop.png`、`club-app/formation-form-mobile.png`、`club-app/formation-event-desktop.png`、`club-app/formation-event-mobile.png`；移动端表单、活动回执与活动详情均未发生横向溢出。

### 当前边界

- 当前仍为纯前端内存演示；没有真实创建接口、持久化、通知或权限隔离。
- 关闭按钮定位修正覆盖当前主题与通用弹窗契约，尚未扩展到真实浏览器兼容性矩阵。

### 下一步

- 进入阶段 4D：以当前 387 项回归为基线，做一次最终验收清单整理与关键页面视觉复核；除非发现回归问题，不再新增业务功能。

## 阶段四 D：最终验收与阶段四收尾（2026-09-21）

### 本轮实际完成

- 完成关键页面桌面与移动端视觉复核，检查截图包括：
  - `club-app/formation-form-desktop.png`
  - `club-app/formation-form-mobile.png`
  - `club-app/formation-event-desktop.png`
  - `club-app/formation-event-mobile.png`
  - `club-app/public-club-mobile.png`
  - `club-app/game-mobile.png`
  - `club-app/leader-mobile.png`
- 重点复核表单文字可读性、次级窗口关闭按钮位置、活动详情层级、公开主页与游戏专区的移动端宽度、社长工作台内容完整性，以及底部 COMMAND 是否遮挡内容。
- 未发现需要新增代码修复的视觉回归问题。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 387 CHECKS PASSED**。
- 结果覆盖主题、四个一级页面、活动与成员小聚、公开社团主页、六款游戏上下文、创建结果回执、社长工作台、移动端布局、资源加载与浏览器脚本异常检查。

### 阶段四结论

阶段四完成。当前纯前端高保真演示已达到阶段性收尾状态：核心页面、关键交互、演示边界和桌面/移动端验收均已完成。后续如继续开发，应先进行真实需求验证、后端数据模型、身份认证与权限设计，而不是继续堆叠演示功能。

### 当前边界

- 项目仍是纯前端内存演示，刷新后状态重置。
- 未接入真实登录、数据库、服务端权限隔离、审计日志、消息推送、聊天、文件上传、地图导航、游戏 API 或支付。
- 社长工作台、公开社团主页、游戏数据和上传流程均为明确标注边界的演示外壳，不代表真实能力。

## BA 主题可见性修复（2026-09-21）

### 本轮实际完成

- 修复 Blue Archive 主题移动端 `MENU` 入口被底部 COMMAND 导航遮挡的问题：入口固定显示在 COMMAND 上方，并保持可点击区域与主题风格一致。
- 提升 BA 主题同好页“临时活动小队”面板的对比度：改用浅色面板、深蓝文字和明确的操作按钮层级。
- 提升 BA 主题“王者荣耀 / 今天也要一起开黑”小组卡的对比度：标题、说明、按钮均改为可读的深色/浅色组合。
- 为同好卡增加稳定的 `data-group-id` 标识，避免主题样式依赖文本内容。
- 验收脚本忽略页面切换期间正常发生的本地视频 `net::ERR_ABORTED`，其他本地资源加载失败仍会继续报错。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 390 CHECKS PASSED**。
- 新增并通过 3 项 BA 定向检查：移动端 MENU 位置、临时活动小队面板对比度、王者荣耀卡片文字对比度（至少 4.5:1）。

### 当前边界

- 本轮只修复主题表现层与验收误报，不改变四项一级导航、业务状态或纯前端内存演示边界。
- `club-app/ba-community-1440.png` 与 `club-app/ba-community-390.png` 为本轮 BA 同好页定向复核截图。

### 下一步

- 阶段四继续保持收尾状态；若要继续开发，优先进入真实需求验证、身份认证与权限边界设计，而不是继续堆叠未验证的演示功能。

## BA 主题右下角组件与 MENU 遮挡修复（2026-09-22）

### 本轮实际完成

- BA 主题下全局隐藏右下角顾问对话框组件，不再覆盖同好页、活动页或其他页面的底部操作区域。
- 将 BA 移动端 MENU 调整到 COMMAND 上方更高的安全区：`bottom: 92px`、`z-index: 220`，并保留独立可点击层级。
- 验收增加实际命中测试：检查 MENU 中心点的 `elementFromPoint()` 必须返回 MENU 本身或其子元素，避免仅凭几何位置误判“未遮挡”。
- 生成并复核 BA 同好页桌面与移动截图：`ba-community-fixed-desktop.png`、`ba-community-fixed-mobile.png`。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 391 CHECKS PASSED**。
- 新增检查通过：BA 顾问对话框已隐藏；MENU 位于 COMMAND 上方且实际可命中。

## 阶段五 A：真实数据层与登录基础（2026-09-22）

### 本轮实际完成

- 新增 `club-app/.env.example`，只记录 `SUPABASE_URL` 与 `SUPABASE_ANON_KEY` 的配置约定，不含真实密钥。
- 新增空配置文件 `club-app/supabase-config.js`，未配置时不会加载远程 SDK。
- 新增 `club-app/supabase-adapter.js`：负责 Supabase SDK 延迟加载、会话恢复、Email + Password 登录/注册、退出登录、当前用户资料和成员关系读取、公开社团/已发布活动查询接口。
- 新增 `supabase/schema.sql`：建立 `users`、`clubs`、`club_members`、`events`、`event_participants` 五张表、约束、索引和第一版 RLS policy。
- 新增 `supabase/README.md`，说明数据库初始化、环境变量注入和当前权限边界。
- HUD 新增 AUTH 入口；未配置后端时显示“未配置后端”，不会伪造登录成功。
- 登录/注册弹窗使用现有 dialog、主题令牌和四项一级导航，不改变 P5、Blue Archive 或第三主题的业务状态。
- 新增登录状态同步：当前阶段只显示账号资料和基础成员关系，不替换全部演示页面数据。
- 发现并确认用户验证提纲 `系统设计/低压力社团活动平台-用户验证提纲-v1.0.md`；其中 H1–H7 仍标记为“待验证”，本轮没有把假设当成事实。

### 新确认的决定

- 第一版账号方式采用 Email + Password；暂不接入手机验证码、学校 SSO、微信 OAuth。
- 当前只开放用户资料和读取能力；活动创建、报名写入、容量并发、候补事务不在本轮开放。
- 没有 Supabase 配置时，系统继续保留纯前端演示，但必须显示明确的“未配置后端”状态。
- RLS 是权限边界，前端隐藏按钮不作为安全控制；角色只允许 `member / leader / admin`，且只在对应社团内生效。
- `P5`、`blue-archive` 和 `neon-grid` 主题共用同一数据和认证逻辑，不复制业务逻辑。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/supabase-config.js`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 391 CHECKS PASSED**。
- 定向认证入口检查：未配置后端提示、AUTH 弹窗、重复打开、1440px/390px 视口边界和浏览器错误检查通过。
- 检查到本机没有 `psql`，因此未执行数据库端 SQL 语法检查；`supabase/schema.sql` 尚未在真实 Supabase 项目中执行验证。

### 当前边界

- 测试 Supabase 已配置并完成真实账号、session、资料、社团、成员关系和活动读取验收。
- 真实活动列表和公开社团列表已接入读取；游戏专区、社长工作台以及部分活动交互仍是演示数据。
- 真实加入申请已完成 `club_members.status = pending` 写入验收；尚未完成负责人审核、角色升级、真实活动报名和容量并发。
- 当前数据库为测试实例，不代表已经部署生产环境。

### 下一步

1. 在 Supabase 项目中执行并验证 `supabase/schema.sql`。
2. 配置浏览器运行时环境变量，完成真实注册、登录和 session 恢复验收。
3. 将 `我的` 页面切换为真实用户资料与成员关系读取。
4. 将 `同好` 页面切换为真实社团/成员关系读取。
5. 将 `活动` 页面切换为真实 `events` 读取，并保留演示数据来源标识。

## 阶段五 A / 阶段二：真实读取链路最小接入（2026-09-22）

本轮开始把 Supabase 适配层接入现有页面，但不改变主题视觉和四项一级导航，也不伪造后端能力。

- `活动`页：后端已配置时读取 `events` 的已发布活动，并映射到现有活动卡；未配置后端时明确标注为本地演示数据。
- `同好`页：后端已配置时读取公开 `clubs`；当前用户的 `club_members` 关系由适配层读取，并在 `我的`页显示真实账号资料与成员关系来源。
- `我的`页：已登录时优先展示 Supabase `users.nickname`；未登录/未配置时保留演示档案，并明确标注边界。
- 活动、社团读取增加加载态、空态、错误态；错误不会回退为伪造演示数据。
- 活动创建、活动报名、成员申请、角色变更、候补事务仍未接入真实写入。

配置方式仍见 `../supabase/README.md`。纯静态浏览器不会自动读取 `.env`，需要由本地/部署环境把变量安全注入 `window.CLUB_SUPABASE_CONFIG`；真实 key 不得提交。

## 阶段五 A / 下一阶段：真实实例验收准备（2026-09-22）

- 新增 `dev-server.cjs`：本地通过 `club-app/.env` 或进程环境变量读取 Supabase 配置，并在内存中注入 `supabase-config.js`；不生成密钥文件、不输出密钥。
- `supabase/schema.sql` 增加 `auth.users` 注册触发器，保证邮箱确认模式下也能创建 `public.users` 基础资料。
- 真实验收命令：`node club-app/dev-server.cjs`，然后打开 `http://127.0.0.1:4173/`。
- 当前已使用本地 `.env` 注入测试 Supabase 配置，并已完成真实账号和读取链路验收；真实密钥仍不写入仓库。

## 阶段五 A / 真实 Supabase 实例验收（2026-09-22）

### 本轮实际完成

- 使用本机测试 Supabase 项目完成一个随机测试账号的真实注册；账号邮箱仅保留在本机验收过程，密码未输出、未写入文件。
- 验证注册接口返回 `HTTP 200`，用户已创建并立即返回 session；本测试项目没有邮箱确认阻断。
- 验证当前用户 session：`/auth/v1/user` 返回 `HTTP 200`，用户 ID 与注册用户一致。
- 验证 `public.users` 资料读取：返回 `HTTP 200`，当前用户资料 1 行；注册触发器已生效。
- 验证 `club_members` 读取：返回 `HTTP 200`，当前测试账号目前为 0 条成员关系，按真实空数据处理。
- 验证公开 `clubs` 读取：返回 `HTTP 200`，当前测试项目为 0 条社团数据，按真实空数据处理。
- 验证已发布 `events` 读取：返回 `HTTP 200`，当前测试项目为 0 条活动数据，按真实空数据处理。
- 验证退出登录：返回 `HTTP 204`。
- 使用同一随机账号再次登录：返回 `HTTP 200` 并取得新 session；登录后的 `/auth/v1/user` 再次返回 `HTTP 200` 且用户 ID 一致。
- 修复认证弹窗切换模式的状态兼容问题：`authDialog` 默认登录模式，注册/登录切换使用稳定的 hidden mode 字段，不再把空参数误当成模式。

### 验证结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/dev-server.cjs`：通过。
- `node --check club-app/supabase-config.js`：通过。
- `node club-app/check-ui.cjs`：Microsoft Edge 桌面 1440px 与移动 390px，**ALL 391 CHECKS PASSED**。
- UI 回归覆盖既有 P5 / Blue Archive 页面、四项一级导航、桌面与移动端横向溢出、弹窗关闭、主题资源和浏览器脚本错误。

### 当前真实数据状态

- Supabase 配置有效，REST 与 Auth 通路均可用。
- 测试库当前没有社团、成员关系和活动记录，因此页面显示真实空态；没有把 `app.js` 中的演示活动伪装成数据库数据。
- 真实登录、注册、session、用户资料读取、社团读取、成员关系读取和活动读取链路已完成最小验收。

### 尚未完成

- 尚未把活动创建、活动报名、候补、容量并发和参与者写入开放为真实服务端写入。
- 尚未在本地浏览器 UI 中完成一个已知密码的登录后视觉状态截图验收；本轮已完成等价的真实 Auth API 验收，UI 回归检查全部通过。
- 仍未执行部署；`.env`、`node_modules`、日志和构建产物不纳入提交。

### 下一步

- 在测试库写入最小、可审计的测试社团、成员关系和活动种子数据，继续验收页面真实非空态；测试结束后按需清理测试数据。
- 将 `我的`、`同好`、`活动` 的真实读取状态做更细的页面级验收，再设计活动创建与报名的安全写入链路。

## 阶段五 A / 真实非空数据验收准备（2026-09-22）

### 本轮实际完成

- 检查当前 Supabase RLS 写入边界：使用 Anon Key 直接插入 `clubs` 返回 `401`，确认前端不能绕过服务端权限创建测试数据。
- 新增 `supabase/seed-test-data.sql`，用于在 Supabase SQL Editor 中创建最小测试数据：1 个 active 社团、1 条 leader 成员关系、1 条 published 活动和 1 条 draft 活动。
- 种子 SQL 使用固定 UUID 和 upsert，可重复执行；通过测试账号邮箱定位 `auth.users`，不包含密码、密钥或 token。
- 设计非空验收预期：社团 1 条、当前用户 leader 成员关系 1 条、公开活动 1 条，draft 活动不出现在公开活动列表。

### 当前阻塞

- 当前只有 Anon Key，没有数据库管理员权限；无法通过 REST API 直接执行种子写入。
- 需要在 Supabase SQL Editor 中将 `supabase/seed-test-data.sql` 的 `v_test_email` 替换为本地测试账号邮箱后执行。

### 下一步

- 执行种子 SQL 后刷新本地页面，验收真实社团、成员关系、published 活动非空态和 draft 隔离。

## 阶段五 A / 测试 Supabase 非空读取验收（2026-09-22）

- 测试 Supabase 已执行 `supabase/seed-test-data.sql`；SQL Editor 返回 `Success. No rows returned`，属于匿名块正常结果。
- Anon Key 只读验收通过：active 社团 1 条、published 活动 1 条、draft 公开查询 0 条、未登录成员关系 0 条。
- 本地 `http://127.0.0.1:4173/#events` 已显示真实活动“阶段五真实活动 · 测试读取链路”，没有把演示活动混入真实列表。
- 测试邮箱不写入仓库；登录态资料和 leader 成员关系仍需在页面中由用户自行输入密码后验收。

## 阶段五 A / 真实加入申请最小链路（2026-09-22）

- 真实社团详情已区分演示动作与数据库申请：登录用户可提交 `member/pending` 加入申请；未登录用户会进入登录入口。
- 当前账号若已有 `active`、`pending`、`rejected` 或 `left` 关系，页面会显示对应状态，不重复伪造申请。
- Supabase RLS 只允许本人提交 `member/pending`，不能由浏览器直接授予自己 `active`、`leader` 或 `admin`。
- 需要在测试 Supabase SQL Editor 执行 `supabase/enable-club-join-requests.sql` 后，才能进行真实写入验收。
- 社长审核、`pending → active`、角色变更和申请历史仍未实现。


## 阶段五 A / 真实加入申请写入验收完成（2026-09-22）

- 测试 Supabase 已执行 `supabase/enable-club-join-requests.sql`。
- 已使用无成员关系测试账号从页面提交真实社团加入申请。
- 已确认 `public.club_members` 产生 `pending` 记录，说明登录、RLS 和前端申请调用链路真实通过。
- `pending` 仅表示等待审核，不代表已加入；当前没有开放 `pending → active`、角色变更或负责人审核。
- 下一步进入社团负责人审核最小链路设计，仍需保持 RLS 约束，不能由普通成员自授予 active/leader/admin。

## 阶段五 A / 社团负责人审核最小链路实现（2026-09-22）

- 新增 `supabase/enable-club-review.sql`，通过安全 RPC 读取和处理真实 pending 入社申请。
- 只有目标社团的 active `leader/admin` 可以处理申请；通过后状态变为 `active`，拒绝后变为 `rejected`。
- 未开放 `club_members` 通用更新权限，普通成员不能自授予 active/leader/admin。
- 社长工作台的真实申请区与其余演示管理区明确分开；未执行 RPC 迁移前，真实申请区不会伪造审核成功。

## 阶段五 A / 非负责人隐藏社长工作台入口（2026-09-22）

- 已登录账号只有存在 `active leader/admin` 社团成员关系时，才会在“我的”页面看到社长工作台入口。
- 普通成员、pending、rejected、left 关系不会看到该入口；工作台打开动作仍有前端二次权限保护。
- 未登录或未配置后端时保留明确的演示入口，不伪装成真实管理权限。
- 本轮 UI 回归：`ALL 391 CHECKS PASSED`。

## 阶段五 A / 活动报名最小真实链路（2026-09-22）

- 新增 `supabase/enable-event-registration.sql`，通过安全 RPC 实现本人报名和取消报名。
- 报名会由数据库判断 `confirmed` / `waitlisted`，校验 published 状态、截止时间、重复报名和容量。
- 真实活动详情调用 Supabase；演示活动仍保留本地演示报名，两者不会混淆。
- 执行迁移前，真实活动报名会显示请求失败，不会伪造成功状态。

## 阶段五 A / 活动报名无反馈修复（2026-09-22）

- 活动详情报名按钮增加即时提交状态和错误反馈，避免真实请求期间看起来“没有反应”。
- 修正 `supabase/enable-event-registration.sql` 中新增报名分支判断；更新 SQL 后必须在测试 Supabase SQL Editor 重新执行迁移。
- 本轮 `node club-app/check-ui.cjs`：`ALL 391 CHECKS PASSED`。

## 阶段五 A / 真实报名失败诊断增强（2026-09-22）

- 真实报名请求失败时，活动详情弹窗内会持续显示原始错误，不再只依赖短暂 Toast。
- 报名记录目标表是 `event_participants`，不是 `events`；报名不会修改活动基础资料。
- 本轮 UI 回归：`ALL 391 CHECKS PASSED`。

## 阶段五 A / 活动报名 RPC 字段歧义修复（2026-09-22）

- 修复真实报名 RPC 的 `column reference "id" is ambiguous`：所有报名和取消报名条件均使用表别名限定。
- 请重新执行 `supabase/enable-event-registration.sql` 后再测试；报名记录写入 `event_participants`，不会更新 `events`。
- 本轮 UI 回归：`ALL 391 CHECKS PASSED`。

## 阶段五 A / 活动报名状态文案修正（2026-09-22）

- 活动预览窗口已将 `你已已确认` 修正为 `你已确认`。
- 候补状态显示为 `你已进入候补`。
- 本轮 UI 回归：`ALL 391 CHECKS PASSED`。

## 阶段五 A / 真实活动创建最小链路（2026-09-22）

本轮新增真实活动创建最小链路：

- 执行 `supabase/enable-event-creation.sql` 后，数据库提供 `create_event(...)` 安全 RPC。
- 仅登录用户且在目标社团中拥有 `active leader/admin` 关系时可以真实创建活动。
- 普通成员、pending/rejected/left 成员和未登录用户不能通过该 RPC 创建活动。
- 创建者身份由数据库从 `auth.uid()` 获取，前端不能伪造 `creator_id`。
- 当前真实持久化字段为活动核心字段；表单中的扩展字段尚未写入真实数据层。
- 未配置后端、未登录或演示状态继续使用原有演示逻辑，并不会伪装为真实数据库写入。

### 本轮验收

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 391 CHECKS PASSED`。
- 桌面 1440px、移动 390px、P5/Blue Archive 主题、活动/同好/我的页面和既有弹窗关闭交互均保持通过。

### 下一步

- 在测试 Supabase SQL Editor 执行 `supabase/enable-event-creation.sql`。
- 使用 active leader/admin 测试账号发布一条真实活动，并查询 `public.events` 验收。
- 使用普通成员账号验证发布被权限拒绝。
- 后续再评估活动扩展字段、草稿和多社团选择器，不在本轮扩大范围。

## 阶段五 A / 真实活动发布后列表不刷新的修复（2026-09-22）

- 修复真实活动发布成功后没有进入活动列表的问题。
- 原因是发布回调先设置 `state.page='events'`，再调用会检查当前页面的 `navigate('events')`，导航因此提前返回而未重新渲染。
- 现在由 `navigate('events')` 负责切页；如果当前已经在活动页则直接重新渲染。
- 演示正式活动路径同步修复。
- 发布成功后保存 `state.lastCreatedEventId`，活动页可以显示新活动发布回执。

本轮检查：

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node club-app/check-ui.cjs`：`ALL 391 CHECKS PASSED`。

## 阶段五 A / 正式活动发布表单排版修正（2026-09-22）

- 修复正式活动发布窗口“成团方式”跨行造成的控件错位。
- 现在正式活动表单使用稳定的两列网格，输入框和下拉框高度统一。
- 活动介绍 textarea 独占整行；“参与要求”和“行动岗位”保持同一行对齐。
- 移动端继续使用单列布局，不改变活动创建逻辑和真实数据字段。

本轮检查：

- `node --check club-app/app.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 391 CHECKS PASSED`。

## 阶段五 A / 活动扩展字段真实数据建模（2026-09-22）

- 新增 `supabase/enable-event-details.sql`：创建 `event_details` 一对一扩展表及 `create_event_with_details` 安全 RPC。
- 正式活动发布的预计规模、是否需要自我介绍、同行集合点、迎新联系人、参与要求、行动岗位已接入真实写入。
- `requirements` 使用 JSON 数组；`roles` 使用 `{id,name,description}` 对象数组；浏览器不直接写扩展表。
- 真实活动列表和详情读取扩展字段；演示活动仍保留本地演示数据并明确区分。
- 使用前必须在 Supabase SQL Editor 执行 `supabase/enable-event-details.sql`。
- 本轮未实现活动扩展字段编辑、通知、签到、复杂岗位管理和审计日志。

## 阶段五 A / 真实活动报名统计与当前用户状态读取（2026-09-22）

### 本轮实际完成

- 新增 `supabase/enable-event-statistics.sql`，提供安全只读 RPC `public.get_published_event_stats()`。
- RPC 只统计 `published` 活动；`confirmed` 写入 `confirmed_count`，`waitlisted` 写入 `waitlisted_count`，`cancelled` 不计入；当前登录用户状态返回 `confirmed`、`waitlisted` 或 `null`。
- `club-app/supabase-adapter.js` 并行读取真实活动和统计 RPC，并将统计合并到活动记录。
- `club-app/app.js` 的活动卡与活动详情使用真实确认人数、候补人数和当前用户报名状态；刷新后会恢复“你已确认”“你已进入候补”或报名按钮。
- 真实报名和取消报名后会重新读取活动数据，使人数与本人状态及时同步。

### 需要执行的数据库迁移

请在测试 Supabase SQL Editor 执行：

```text
supabase/enable-event-statistics.sql
```

迁移执行后可用以下 SQL 检查：

```sql
select event_id, confirmed_count, waitlisted_count, current_user_status
from public.get_published_event_stats();
```

未执行迁移时，真实活动统计读取会报错；前端不会将本地演示人数伪装成真实统计。

### 当前边界

- 当前只完成成员视角的公开活动统计和本人报名状态读取。
- 社长工作台中的完整报名名单、递补处理、签到、通知和审计记录仍为演示或未接入真实数据。
- 本轮未增加新的活动编辑、取消、签到或通知能力。

### 验收

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 391 CHECKS PASSED`。
- 已覆盖桌面 1440px、移动 390px、P5/Blue Archive 主题、活动/同好/我的页面、加载/空态/错误态，以及既有 MENU、COMMAND 和弹窗关闭交互。

### 下一步

- 用户执行 `supabase/enable-event-statistics.sql` 并完成真实活动统计、刷新恢复、取消报名恢复的验收。
- 验收完成后适合切换到新任务：接入社长工作台的真实活动管理数据读取，优先做本人社团活动列表和报名名单读取，暂不开发编辑、取消、签到和通知。

## 阶段五 A：社长工作台真实活动管理数据（2026-09-23）

本阶段已接入真实只读数据：

- 负责人所属社团活动列表：只允许 active `leader/admin`，不读取其他社团活动。
- 每个活动的 confirmed、waitlisted、cancelled 统计、容量、截止时间、活动状态和扩展字段。
- 指定活动的真实报名成员名单，状态明确展示为 `confirmed` / `waitlisted` / `cancelled`。
- 普通成员、pending、rejected、left 用户不能读取社团内部报名名单；前端保留 permission denied / error 状态，不回退为演示名单。

需要在 Supabase SQL Editor 执行：

```text
supabase/enable-leader-event-read.sql
```

本阶段不包含活动编辑、活动取消、报名状态修改、递补、签到、通知或审计日志。无后端演示模式继续保留原有演示工作台及演示名单动作；真实负责人模式为只读。

本轮检查：`node --check club-app/app.js`、`node --check club-app/supabase-adapter.js`、`node --check club-app/check-ui.cjs` 均通过；`node club-app/check-ui.cjs` 为 `ALL 391 CHECKS PASSED`，覆盖桌面 1440px、移动 390px、P5 和 Blue Archive。

## 阶段五 A 下一阶段 / 负责人多社团上下文与活动详情联动（2026-09-23）

### 本轮实际完成

- 真实负责人工作台新增当前社团上下文选择器；当一个 active `leader/admin` 账号管理多个社团时，可以切换当前社团。
- 真实总览、活动选择器和报名名单均按当前社团过滤，不会把其他所属社团的活动或名单混入当前视图。
- 活动切换时会清理上一活动的名单状态；只有当前社团下的活动才允许触发 `list_leader_event_roster(uuid)`。
- 只读活动详情补充展示社团名称、活动状态、开始时间、地点、报名截止、容量、confirmed / waitlisted / cancelled 统计，以及预计规模、集合点、参与要求和自我介绍要求等扩展字段。
- 保留真实读取的 loading、empty、error、permission denied 状态；真实负责人模式仍不显示递补、签到、取消资格等写操作。
- 演示工作台继续使用原有演示活动和演示名单，明确标注为演示，不与真实名单混合。

### 数据与 Supabase SQL

- 本轮不新增 Supabase SQL，也不改变 RLS 或 RPC。
- 继续复用 `supabase/enable-leader-event-read.sql` 提供的 `public.list_leader_events()` 与 `public.list_leader_event_roster(uuid)`。
- 真实能力生效前仍需在目标 Supabase 项目执行 `supabase/enable-leader-event-read.sql`；未执行时前端显示真实读取错误，不回退填充演示名单。

### 当前边界

- 已真实读取：负责人可管理社团的活动列表、当前社团上下文、活动状态、时间、地点、容量、截止时间、扩展字段、confirmed/waitlisted/cancelled 统计，以及当前社团指定活动的报名成员和三种报名状态。
- 仍为演示或未接入：活动编辑、活动取消、报名状态修改、递补、签到、通知、审计日志、真实成员角色变更和非入社申请管理写入。

### 验收

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 391 CHECKS PASSED`。
- 已覆盖桌面 1440px、移动 390px、P5、Blue Archive、主题切换、四项一级导航、社长工作台、上下文选择器、活动详情、名单状态、loading/empty/error/permission denied 结构以及既有演示管理交互。

### 下一步建议

- 执行负责人读取 SQL，并用一个管理多个社团的 active `leader/admin` 账号验收社团切换、跨社团名单隔离和越权拒绝。
- 下一阶段可在真实读取验收通过后，单独评估活动编辑或取消的安全 RPC；继续不要从浏览器直接修改报名状态。


## 阶段五 A 下一阶段：真实创建社团（2026-09-23）

### 本轮实际完成

- 新增真实创建社团安全 RPC：`public.create_club(text, text, text)`。
- RPC 只允许已登录用户执行，使用 `security definer` 原子创建 `clubs` 记录和创建者的 `club_members` 关系。
- 创建者自动获得 `role = 'leader'`、`status = 'active'`；浏览器不能伪造其他用户的 `user_id` 或直接写入负责人关系。
- `club-app/supabase-adapter.js` 新增 `backend.createClub(payload)`，前端不直接插入 `clubs` 或 `club_members`。
- `club-app/app.js` 在真实社长工作台的社团上下文栏增加“创建新社团”入口；“我的”页面的真实社长工作台入口也提供创建入口。
- 创建表单支持社团名称、简介和可选学校/组织标识；成功后刷新真实用户资料、成员关系、社团切换器和负责人活动数据。
- 保留 P5 / Blue Archive 主题、四项一级导航和现有只读负责人活动管理；没有开发活动编辑、取消、签到、通知或审计写入。

### 入口与负责人判定

- 入口：`我的 → 社长工作台 → 创建新社团`。
- 真实负责人依据：`club_members.status = 'active'` 且 `club_members.role in ('leader','admin')`。
- 创建成功后，当前账号会立即出现在新社团的真实负责人切换器中；新社团没有活动时显示真实空状态，不使用演示活动填充。

### 需要执行的 Supabase SQL

在目标 Supabase 项目的 SQL Editor 执行：

```text
supabase/enable-club-creation.sql
```

该 SQL 依赖已执行的 `supabase/schema.sql`，不包含任何密钥。执行前请先在测试项目验证；创建社团属于真实写入，生产环境上线前仍应增加审核、命名重复策略和审计日志方案。

### 当前边界

- 已真实写入：创建 active 社团、创建者 active leader 关系。
- 已真实刷新：当前账号资料、成员关系、社团切换器、负责人活动读取上下文。
- 仍未接入：社团编辑、社团归档、负责人转让、创建审核、重复名称策略、活动编辑、活动取消、报名状态修改、递补、签到、通知和审计日志。
- 无后端或未执行创建 SQL 时，界面不会伪造创建成功；会显示真实错误。

### 验收

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 391 CHECKS PASSED`。
- 已覆盖桌面 1440px、移动 390px、P5、Blue Archive、主题切换、四项一级导航、社长工作台、创建入口、表单错误结构、loading 结构和无横向溢出。

### 下一步建议

- 执行 `supabase/enable-club-creation.sql`，用普通成员、active leader/admin、pending/rejected/left 账号验证 RPC 权限和创建后成员关系。
- 验收通过后，再规划社团资料编辑或负责人转让；不要把这些写操作放回浏览器直接 `insert/update`。

## 2026-09-23｜阶段五 A 下一阶段：一级活动页社团上下文隔离修复

### 本轮实际完成

- 修复真实负责人切换到新社团后，一级“活动”页仍显示其他社团公开活动的问题。
- 真实活动映射补充 `clubId`；新增 `visibleEvents()` 显示层派生函数。
- active `leader/admin` 且已选择当前社团时，一级“活动”页和活动详情只显示当前社团的真实活动。
- 当前社团没有活动时显示真实空状态，不回退到本地演示活动。
- 普通成员和非负责人仍沿用全量公开活动读取与报名链路，不受负责人社团上下文影响。

### 数据与 Supabase SQL

- 本轮不新增 Supabase SQL，不改变现有 RLS、RPC 或活动创建/报名链路。
- 继续复用现有真实公开活动读取；过滤发生在前端显示层，安全边界仍由后端真实读取权限负责。

### 当前边界

- 已真实读取并按负责人上下文显示：活动所属社团、活动列表、活动详情、容量、报名统计、当前用户状态及截止时间。
- 仍为演示或未接入：活动编辑、活动取消、报名状态修改、递补、签到、通知和审计日志。

### 验收

- 必须通过 `node --check club-app/app.js`、`node --check club-app/supabase-adapter.js`、`node --check club-app/check-ui.cjs` 和 `node club-app/check-ui.cjs`。
- 覆盖桌面 1440px、移动 390px、P5、Blue Archive、四项一级导航、负责人社团切换、无活动空状态和普通成员公开活动链路。

## 2026-09-23｜Blue Archive 社团卡片可读性修正

### 本轮实际完成

- 修复 Blue Archive 同好页真实社团卡片中，背景与文字颜色过于接近、第二张卡文字难以阅读的问题。
- 不再让真实社团卡片依赖“第几张卡”决定前景色；未加入社团统一使用浅色玻璃卡和深色文字，已加入社团保留深色信息卡并使用浅色文字。
- 提升社团卡片标题、分类、简介、操作入口和状态信息的对比度；不改变卡片布局、四项一级导航或社团业务逻辑。

### 验收

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 391 CHECKS PASSED`。
- 覆盖桌面 1440px、移动 390px、P5、Blue Archive、主题切换和同好页现有交互。

## 2026-09-23｜Blue Archive 社团卡片状态色回归检查

### 本轮实际完成

- 在 `club-app/check-ui.cjs` 新增两项 UI 回归检查，固定验证 Blue Archive 同好页未加入社团卡片使用深色标题/正文，以及已加入社团卡片使用浅色标题/正文。
- 检查基于 `data-state` 对应的真实语义状态，不依赖卡片顺序；后续真实社团数量变化时仍保持可读性。
- 未修改活动、社团切换、Supabase 读取或写入链路，不新增 SQL。

### 验收结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 393 CHECKS PASSED`。
- 覆盖桌面 1440px、移动 390px、P5、Blue Archive、四项一级导航及浏览器脚本错误检查。

### 下一步

- 使用真实 Supabase 账号继续验收多社团负责人在不同社团数量、成员状态下的读取隔离；真实验收通过后再单独规划活动编辑或取消的安全 RPC。

## 2026-09-23｜阶段五 A：单负责人身份与多社团活动分类

### 本轮实际完成

- 一个账号最多拥有一个 `active leader` 身份；普通 `member` 关系不受限制。
- 社长可以作为普通成员加入其他社团，但不会因此获得第二个社团的负责人身份。
- 新增 `supabase/enable-single-leader-per-user.sql`：为 `club_members` 增加条件唯一索引，并让 `create_club` 在创建前检查当前账号是否已有 active leader。
- 一级“活动”页新增“社团活动分类”组件：全部社团、当前 active membership 对应的社团、其他公开活动。
- 活动卡显示所属社团；社团筛选可与活动类型、搜索、我的活动筛选组合使用。
- 一级普通活动页不再被 `leaderClubId` 强制锁定，社长作为普通成员加入其他社团后仍可浏览并区分多个社团活动；社长工作台仍按当前负责人社团上下文读取管理数据。
- 保留 P5 / Blue Archive 主题、四项一级导航和现有活动创建、普通报名链路，没有新增活动编辑、取消、签到、通知或审计写入。

### 需要执行的 Supabase SQL

在目标 Supabase 项目的 SQL Editor 执行：

```text
supabase/enable-single-leader-per-user.sql
```

该 SQL 依赖 `supabase/schema.sql` 与 `supabase/enable-club-creation.sql` 已执行。若数据库已有同一账号多个 active leader 关系，唯一索引会拒绝创建；请先人工确认并清理重复关系，不要自动猜测要保留哪个社团。

### 当前边界

- 真实约束：active leader 唯一性由数据库条件唯一索引兜底；创建社团由 `create_club` RPC 负责检查。
- 真实读取：active memberships、社团名称、真实公开活动、活动所属社团及现有报名统计/当前用户状态仍沿用现有 Supabase 读取链路。
- 仍为演示或未接入：未登录演示活动、活动编辑、活动取消、报名状态修改、递补、签到、通知、审计日志；演示 roster 仍明确为演示，不与真实名单混合。

### 验收

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 399 CHECKS PASSED`。
- 桌面 1440px、移动 390px、P5、Blue Archive、四项一级导航、活动分类与筛选组合均通过。

### 下一步建议

- 执行新增 SQL 后，用同一账号验证“创建第二个社团”被拒绝、但加入其他社团作为普通成员成功。
- 用两个真实社团和多个 active membership 验证活动分类；再用 pending、rejected、left 账号确认分类组件不泄漏非 active 社团活动或内部报名名单。
- 下一阶段优先补真实多社团读取验收与权限回归，不要先扩展活动编辑等写操作。

## 2026-09-24｜阶段五 A 下一阶段：负责人活动编辑与取消

### 本轮实际完成

- 新增负责人活动编辑能力：标题、时间、报名截止、地点、容量、最低成团人数及活动扩展字段通过安全 RPC 更新。
- 新增负责人取消活动能力：只把活动状态更新为 `cancelled`，不删除活动或报名历史。
- 只有目标社团内 `active leader/admin` 可以执行编辑和取消；浏览器不直接更新 `events` / `event_details`。
- 编辑时由 SQL 校验活动状态、开始时间、截止时间、字段格式，以及容量不能低于当前 `confirmed` 人数。
- 已取消活动在社长工作台保留报名名单只读查看，并继续区分 `confirmed`、`waitlisted`、`cancelled`。
- 补充 `check-ui.cjs` 的阶段专项契约检查；不把本地演示名单伪装成真实 RPC 成功。

### 需要执行的 Supabase SQL

在目标 Supabase 项目的 SQL Editor 执行：

```text
supabase/enable-leader-event-management.sql
```

依赖现有 `schema.sql`、活动创建、活动扩展字段、活动报名和负责人活动读取 SQL。执行后应使用真实账号验证：负责人可编辑/取消自己社团活动，普通成员、pending、rejected、left 和其他社团负责人均被拒绝。

### 当前边界

- 已真实接入：负责人活动编辑 RPC、负责人取消 RPC、编辑后的真实活动重新读取、取消后真实报名历史只读读取。
- 仍未接入：活动恢复、批量编辑、报名自动递补、通知、签到、审计日志和报名状态管理动作。
- 本地未配置真实 Supabase 时，编辑/取消不会伪造成功；工作台仅展示演示或真实读取对应状态。

### 验收

- 必须通过 `node --check club-app/app.js`、`node --check club-app/supabase-adapter.js`、`node --check club-app/check-ui.cjs` 和 `node club-app/check-ui.cjs`。
- 覆盖桌面 1440px、移动 390px、P5、Blue Archive、四项一级导航，以及活动编辑/取消入口的安全契约检查。

## 2026-09-24｜方案 A：报名状态管理权限与数据设计

### 本轮实际完成

- 社长工作台原“报名名单”分区改名为“活动详情”；内部真实报名成员、confirmed / waitlisted / cancelled 状态语义不变。
- 新增 `supabase/design-leader-event-registration-management.sql`，固化负责人报名状态管理的数据契约和查询索引。
- 保持现有三种报名状态，不新增状态值，不开放浏览器直接更新 `event_participants`。
- 明确后续状态转换：`waitlisted -> confirmed`、`confirmed -> cancelled`、`waitlisted -> cancelled`；取消状态不直接恢复。
- 明确权限边界：普通成员只能操作自己的报名；只有目标社团 `active leader/admin` 才能进入负责人状态管理范围；活动 `cancelled/finished` 后不能继续管理报名状态。

### 当前边界

- 本轮只完成权限与数据设计、索引和注释，不新增负责人报名状态写 RPC，不新增浏览器管理按钮。
- 自动递补、操作原因、审计日志、通知和取消状态恢复仍未实现。
- 后续若开放 RPC，必须继续使用 `security definer`、`is_club_staff(event.club_id)`、容量校验和稳定候补排序。

### 需要执行的 Supabase SQL

设计 SQL 可在已执行基础 schema 的测试项目中执行：

```text
supabase/design-leader-event-registration-management.sql
```

该文件只新增索引和字段注释，不授予新的执行权限，不改变现有报名链路。

## 2026-09-24｜方案 A 第二阶段：负责人报名状态管理

### 本轮实际完成

- 在真实社长工作台“活动详情”中接入报名成员状态管理入口：`waitlisted` 可“递补为已确认”，`confirmed` 可“取消报名资格”，`cancelled` 保持只读。
- 两项真实管理动作都要求负责人填写操作原因，浏览器只调用 Supabase RPC，不直接更新 `event_participants`。
- 新增适配层调用：`promote_waitlisted_participant`、`cancel_event_participant_by_leader`；成功后重新读取真实活动与真实报名名单，失败保留原始错误反馈，不伪造成功。
- 演示名单继续使用原有演示动作，与真实报名名单分支隔离；真实名单明确标记为“真实报名成员”。
- 真实 RPC 已包含 active leader/admin 权限校验、活动与报名行锁、容量校验、操作原因和 `event_participant_management_log` 审计记录。

### 当前未实现

- 未实现自动递补、通知、取消恢复、签到、批量管理和审计日志查询界面。
- `supabase/enable-leader-event-registration-management.sql` 尚未在真实 Supabase SQL Editor 执行；本地页面不会把未执行 SQL 伪装成成功。

### 验收结果

- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 416 CHECKS PASSED`。
- 桌面 1440px、移动 390px、P5、Blue Archive、四项一级导航均通过。

### 下一步

- 在真实 Supabase 执行 `supabase/enable-leader-event-registration-management.sql`。
- 使用 active leader/admin、普通 member、pending、rejected、left 和跨社团负责人账号回归候补递补、负责人取消资格、容量已满、活动已取消/结束、空原因和审计记录场景。


## 2026-09-24｜负责人社团资料管理

- 负责人仅有一个可管理社团时显示静态社团名称；多管理社团情形才显示切换框。
- 已负责社团后，入口为“编辑社团”，可通过受保护 RPC 改名或归档。归档作为“删除”语义，保留活动、报名和成员历史，并将该社团 active 成员关系转为 `left` 释放负责人名额。
- 已登录但尚无负责人社团时显示“创建你的社团 / 创建新社团”，不展示无权限的管理预览入口；未登录访客仍可查看演示预览。
- 执行真实能力前，须在 Supabase SQL Editor 执行 `supabase/enable-leader-club-management.sql`；本地 UI 不代表 SQL 已执行。

## 2026-09-24｜归档后恢复流程评估

### 本阶段结论

- **暂不开放社团归档后的自助恢复**。现有归档语义会把 `clubs.status` 置为 `archived`，并把该社团所有 `active` `club_members` 关系转为 `left`，以释放负责人名额；这不是单字段撤销，恢复会涉及成员关系、负责人身份和历史权限的重新判定。
- 当前数据模型没有平台 owner/admin、归档恢复审计记录、负责人交接快照或恢复冲突处理约束。允许原负责人自行恢复会绕过“一个账号最多一个 active leader”的约束风险，也无法安全决定哪些成员应恢复为 active；允许普通 member、pending、rejected、left 或跨社团负责人恢复则明显越权。
- 因此本轮**不新增恢复按钮、不新增 `restore_leader_club` RPC、不直接更新 `clubs` 或 `club_members`**。现有活动、报名和成员历史保留规则不变，归档社团继续作为历史数据保留。

### 真实与演示边界

- 真实能力仍仅包括已接入的改名与归档安全 RPC；浏览器不得直接更新受保护表。
- 未登录页面的社长工作台仍是明确标注的演示预览；登录后的负责人入口只由真实 active `leader/admin` 关系决定。
- 本阶段没有新的真实写入能力，也没有执行任何 Supabase SQL；不能把待执行 SQL 描述成已上线。

### 角色回归要求（恢复暂不开放）

真实 Supabase 回归仍需验证：

- active `leader/admin`：可按既有 RPC 改名或归档自己的社团；归档后不再拥有该社团管理权限。
- 普通 `member`、`pending`、`rejected`、`left`：不可改名、归档，也不可通过任何未提供的恢复路径改变社团状态。
- 跨社团负责人：只能管理自己有 active `leader/admin` 关系的社团，不能操作目标社团。
- 归档后：活动、报名和成员历史仍可按既有只读规则保留；不得因为评估恢复而删除或重建历史记录。

### 需要执行的 Supabase SQL

本阶段没有新增 SQL。真实环境仍需按前一阶段执行：

```text
supabase/enable-leader-club-management.sql
```

该 SQL 必须在目标 Supabase SQL Editor 执行后，才能进行真实改名/归档权限回归；本任务未执行它。

### 下一项负责人管理能力建议

优先实现“受控负责人交接/转让”，而不是归档恢复：由当前目标社团 active `leader` 发起，指定同社团 active `member`，通过安全 RPC 在事务中校验目标身份、并发锁、单 leader 约束、确认语句和审计记录；普通 member、pending、rejected、left 及跨社团负责人均拒绝。交接完成后再评估是否需要平台 owner/admin 介入的人工恢复流程。

### 验收

- 本阶段无 UI 代码变更；保留 P5 / Blue Archive 主题和四项一级导航。
- `node --check club-app/app.js`：通过。
- `node --check club-app/supabase-adapter.js`：通过。
- `node --check club-app/check-ui.cjs`：通过。
- `node club-app/check-ui.cjs`：`ALL 424 CHECKS PASSED`。
- 检查覆盖桌面 1440px、移动 390px、P5、Blue Archive、四项一级导航，以及现有社团管理源码契约。

## 项目部署规划（2026-09-24）

- 已新增 `系统设计/项目部署规划.md`，记录现有历史公开地址 `https://p5-club-hub.app.workbuddy.host/`（本轮未核验线上可达性）、静态托管候选、Supabase 浏览器公开 key 注入、Auth redirect、资源授权门槛、发布包安全检查、验收和回滚流程。
- 推荐先保留候选公开链接并建立不覆盖生产的 Preview；新托管候选评估 Cloudflare Pages。未创建平台项目、未部署、未购买域名、未改 DNS、未执行 Supabase SQL。
- 后续已完成根目录 `sync-deploy-site.py` 第一轮安全化：默认 `--check-only`，限制到 `.deploy-site` / `.deploy-site-*` 专用目录，拒绝源码/项目根路径，发布包排除开发与敏感文件并进行密钥扫描、生成 SHA-256 清单；7 项安全测试通过。显式 `--replace` 仍会清理目标专用目录，增强原子替换/回滚副本前应先人工检查目标内容。
- （当时状态，已由后续 2026-09-24 授权确认覆盖）公开发布曾被 `rights.status = unverified` 阻断。
- 负责人交接的“原社长交接后角色”仍待用户确认；在确认前暂停交接 SQL 与 UI，不擅自决定保留 admin 或降级 member。


## 2026-09-24 部署准备续检

- 已修正 `系统设计/项目部署规划.md` 中过期的危险脚本说明；脚本完成的是本地发布包安全化第一阶段，并非上线部署。
- 发布脚本检查 `python sync-deploy-site.py --check-only` 通过；未复制生成新的发布包。安全单测 7 项通过，`py_compile` 通过。
- 本轮三项 Node 语法检查通过；`node club-app/check-ui.cjs`：`ALL 424 CHECKS PASSED`，覆盖 1440px 桌面、390px 移动、P5、Blue Archive 和四项一级导航。
- 没有部署、改 DNS、购买域名、推送 Git 或执行 Supabase SQL；负责人交接仍因原社长交接后的角色语义未确认而暂停。
- 下一步：先处理素材公开权利与发布包原子替换/回滚，再经明确授权创建独立 Preview；最终公开 URL/域名与 DNS 需另行确认。

## 2026-09-24｜负责人交接与 Preview 前置安全

- 负责人交接已接入工作台真实入口：候选人由安全 RPC 读取，提交仅调用 `transfer_club_leadership`；成功后原 active `leader` 在同一事务降为普通 `member`，同社团 active `member` 升为 `leader`。活动、报名、成员历史不改写。
- 交接 SQL 在 `/D:/BaiduNetdiskDownload/P5素材+ppt/supabase/enable-leader-club-transfer.sql`，尚未执行到任何 Supabase 环境；真实交接与真实角色矩阵尚未回归。
- 新增静态契约断言覆盖 RPC 安全上下文、候选人筛选、社团权限、锁与名称确认、原社长降级、跨社团负责人唯一约束回滚、审计表隔离、authenticated 执行授权、浏览器不直接改成员表，以及 UI 空/错/拒绝状态。静态断言不等于 Supabase 真实权限验证。
- 负责人角色矩阵：active leader/admin 可在目标社团权限内发起；普通 member、pending、rejected、left 不可发起；候选接任人必须是同社团 active `member`，pending/rejected/left/admin/leader 均被排除；接任人若在另一社团已有 active leader 关系，唯一索引使整个事务回滚。
- Preview 发布脚本增加权利状态门禁。当时三个主题均登记 `rights.status = unverified`，`python sync-deploy-site.py --check-only` 返回退出码 3；该状态已由后续负责人授权确认覆盖。权利核验记录见 `/D:/BaiduNetdiskDownload/P5素材+ppt/系统设计/作品资源公开授权核验.md`。
- 验收：`node --check club-app/app.js`、`node --check club-app/supabase-adapter.js`、`node --check club-app/check-ui.cjs` 通过；`node club-app/check-ui.cjs`：`ALL 432 CHECKS PASSED`，含 1440px 桌面、390px 移动、P5、Blue Archive、四项一级导航。Python 发布脚本安全单测 10 项通过，`py_compile` 通过。
- 本轮没有执行 Supabase SQL、修改 Auth 配置、部署、购买域名、改 DNS 或覆盖生产。下一步先提供作品资源授权证据或授权清楚的替换素材；之后在独立目标 Supabase Preview 配置 Auth、逐份执行/核对 SQL，并真实验证所有角色后才解除发布门禁并建立 Preview。正式 URL、域名与 DNS 继续后置。


## 2026-09-24｜部署准备：发布副本暂存切换

- 根目录 `sync-deploy-site.py` 已从“先删除旧副本再复制”改为“同盘暂存 → 生成清单 → 密钥扫描 → 目录切换”。复制/扫描失败保留原副本，切换失败自动尝试回滚；成功后才清理旧目录，清理失败保留备份并报告路径。
- 这是本地发布副本生成器的保护，不代表已部署或云端具备原子回滚；Windows 目录切换存在短暂路径空窗。本轮没有创建发布包或 Preview。
- `python -m unittest -v test_sync_deploy_site.py`：14 项通过，覆盖复制失败、密钥校验失败、目录切换失败回滚与成功替换。素材授权门禁未放宽；目前 3 个主题仍是 `unverified`，发布源检查预期退出码 3。
- 下一步仍先解决所有公开素材的权利证据/替换/排除；之后在非生产 Supabase Preview 配置 Auth、执行并验证规划 SQL 与全部角色 RLS/RPC，最后创建隔离 Preview。正式 URL、域名及 DNS 后置。

- 补充验收：三项 `node --check` 均通过；`node club-app/check-ui.cjs`：`ALL 432 CHECKS PASSED`，覆盖桌面 1440px、移动 390px、P5、Blue Archive、四项一级导航；Python 发布安全单测 14/14、`py_compile` 通过。
- 当时 `python sync-deploy-site.py --check-only` 实测退出码 3；该历史阻断已由后续负责人授权确认覆盖。


## 2026-09-24｜负责人确认现有主题资源已获授权

- 项目负责人确认当前登记的 P5、Blue Archive 与 Neon Grid 主题资源已取得本项目公开 Preview 所需授权；主题注册表对应 `rights.status` 更新为 `cleared`，本地发布权利门禁据此解除。
- 授权凭证由负责人留存，本轮未复制或独立核验凭证；该确认不自动覆盖未来新增素材或其他项目/用途。详见 `../系统设计/作品资源公开授权核验.md` 和根目录 `../AGENTS.md` 的硬性指挥。
- 这不表示 Preview 已构建/部署。当前缺少非生产 Supabase 项目配置；必须先完成目标环境 Auth、RLS/RPC SQL 和真实角色/设备验收。

## 2026-09-25｜非生产 Preview 身份已提供并完成本地只读核对

- 负责人提供非生产 Supabase Preview 身份：Project Ref `feiedwnkfuzvlhxnxrdw`，API URL `https://feiedwnkfuzvlhxnxrdw.supabase.co`。
- 本地 `club-app/.env` 仅做变量名与 URL 主机名核对：`SUPABASE_URL` 与上述 API URL 一致，`SUPABASE_ANON_KEY` 有配置但未读取、未回显、未写入文档；不得把该 key、service-role/secret key、数据库密码或 token 提交到仓库。
- 负责人提供隔离托管候选地址 `https://club-hub-preview.pages.dev`。2026-09-25 本机 HTTP HEAD 探测返回 `522`；这只能记录为“目标身份已提供但当前可达性未通过”，不能描述为已部署、已上线或可验收。
- 本轮没有执行 Supabase SQL、修改 Auth、创建/覆盖 Cloudflare 项目、部署、绑定自定义域名或修改 DNS。下一步必须先在该 Supabase Preview 项目核对 Auth 配置、按计划执行并验证 RLS/RPC，再处理托管目标可达性和构建注入。

## Cloudflare Pages Preview 配置入口（2026-09-25）

- 新增 `_worker.js` 同源运行时入口：`/supabase-config.js` 从 Cloudflare Pages 环境绑定读取 `SUPABASE_URL` 与 `SUPABASE_ANON_KEY`，只接受 HTTPS 的 `*.supabase.co` URL 和 Supabase publishable key（`sb_publishable_`）或 JWT `role=anon` 的旧 anon key；其他密钥不会被当作前端配置返回。缺失/不合格时返回空配置和 HTTP 503，页面保持未配置态。
- Worker 仅把配置有意提供给浏览器；因此该 API key 会对访问者可见，严禁填入 `service_role`、`sb_secret_` 或数据库密码。建议在独立 `club-hub-preview` Pages 项目的 Preview 环境配置绑定，正式环境绑定可留空。
- Pages Functions 发布包必须包含根级 `_worker.js`。安全发布生成器现在把它列为必需文件；为避免 Cloudflare Dashboard 拖拽部署对 Functions 支持边界不一致，实际部署采用 Wrangler CLI `pages deploy`，不需要上传整个工作区，也不应上传 `club-app/.env`。
- 首次部署仍需负责人先在 Cloudflare Dashboard 的 Preview 环境设置两个公开配置变量，再通过 Wrangler CLI 部署至 `preview` 分支。本地生成包不等于云端部署。

#### 首次 Preview 部署的实际方式

Cloudflare 官方 Direct Upload 指南提到 `_worker.js` 支持 Wrangler 与 Dashboard 拖放，但 Pages Functions 入门文档提醒 Dashboard Direct Upload 当前不支持 Functions。为避免 Worker 未生效，本项目只走 Wrangler CLI。先完成 Cloudflare Dashboard 的 Preview 环境变量设置，再在 PowerShell 执行 `npx wrangler login`，按提示在浏览器授权；运行 `npx wrangler pages project list` 确认当前账号列出 `club-hub-preview`，然后执行：

```powershell
npx wrangler pages deploy "D:\BaiduNetdiskDownload\P5素材+ppt\.deploy-site-preview-20260925" --project-name club-hub-preview --branch preview
```

这会部署到 `preview` 分支，而不是生产分支。若项目未出现在列表、账号不对或命令提示创建新项目，请取消并先回来核对，不要创建第二个项目。

#### 如果 Dashboard 当前显示 Build settings

本项目已有 Pages 项目 `club-hub-preview`，本轮部署方式是 Wrangler Direct Upload，不走 Git 集成构建流程。若点击页面后进入 Framework preset / Build command / Build output directory 表单，先返回已有项目，不要创建第二个项目，也不要把整个 `club-app` 或仓库根目录当上传目录；改用下方 Wrangler 步骤。首次部署由 Wrangler 把独立发布副本发到 `preview` 分支，不改变 Supabase SQL、生产分支或正式域名。

#### 负责人接下来需要完成的控制台操作

1. Cloudflare Dashboard → Workers & Pages → Pages → 打开既有 `club-hub-preview` → Settings → Variables and Secrets（界面若显示 Environment variables，进入同一设置区）。
2. 选择 Preview 环境（不要配置 Production）。新增 `SUPABASE_URL`，值为 `https://feiedwnkfuzvlhxnxrdw.supabase.co`；新增 `SUPABASE_ANON_KEY`，值取自该 Supabase Preview 项目 API Keys 页面中的 publishable key（`sb_publishable_`）或旧版 anon key。该 key 最终会由 Worker 返回给浏览器，不得使用 `service_role`、`sb_secret_`、数据库密码或其他服务端秘密。
3. 保存后在本机 PowerShell 运行 `npx wrangler login` 并在浏览器授权；再运行 `npx wrangler pages project list`，确认显示既有 `club-hub-preview`。
4. 只有确认账号和项目无误后，执行上方 `npx wrangler pages deploy` 命令。若项目列表缺失、账号不对或 CLI 提议新建项目，停止并先核对，不要继续。
5. 部署命令成功后，以 Cloudflare Deployments 页面给出的 Preview URL 为准，再检查 `/supabase-config.js` HTTP 200（响应仅含预期 URL/公开 key），随后进行 Auth、RLS/RPC 角色和桌面/移动真实环境验收。执行前 SQL 无需因换托管重复运行；本条不代表部署已发生。

#### Wrangler 无法解析 Cloudflare API 时

若 `npx wrangler pages project list` 报 `Unable to resolve Cloudflare's API hostname`，先排查本机 DNS/网络，不要重复登录或部署。本轮复测 `Resolve-DnsName api.cloudflare.com` 返回“ 不正确的 DNS 包”，`curl` 返回 `Could not resolve host`；随后出现的 Node `UV_HANDLE_CLOSING` 属于请求失败后的附带异常，不能据此判断 Cloudflare 项目或认证状态。可在 PowerShell 分别测试默认 DNS、`1.1.1.1`、`8.8.8.8`；若受管网络拦截或公共 DNS 无法直连，先切换到可信手机热点/VPN 网络再测。只有 DNS 成功且 HTTPS 可达后才重新 `npx wrangler login` 与 `npx wrangler pages project list`。不要在聊天中粘贴 Wrangler 完整日志或任何 token。

#### 公共 DNS 可解析、系统默认 DNS 异常（2026-09-25）

负责人反馈：默认 `Resolve-DnsName api.cloudflare.com` 输出了 Cloudflare NS 主机的 Additional 记录而非正常 A Answer；指定 `1.1.1.1` 与 `8.8.8.8` 时均返回 `api.cloudflare.com` A 记录。HTTPS 探测得到 HTTP 400（非 HTTP 000），说明已收到远端 HTTP 响应，但不代表 Wrangler 已登录。下一步建议在 Windows 当前网络适配器将 DNS 设为 Cloudflare 公共 DNS（IPv4 1.1.1.1 / 1.0.0.1），记录旧值以便恢复；若处于公司/学校受管网络或网络策略不允许更改，应先问网管或换可信网络。更改后清理 DNS 缓存，验证默认解析与 HTTPS，再执行 Wrangler 登录和项目列表。公共 Wi-Fi 可能依赖 captive portal，连接门户时必要时临时恢复 DHCP 自动 DNS。

补充排查：负责人随后只运行 `Clear-DnsClientCache` 和默认解析/curl 重测，默认 DNS 仍报 `BAD_PACKET`、curl HTTP 000。清缓存不会更改网卡 DNS 服务器配置；因此暂未证明适配器 DNS 已改为公共 DNS。下一步先在活动网络适配器设置 IPv4 DNS，或在受管网络联系管理员，再验证默认解析。

补充连通性复测（网络恢复后，只读）：当前默认系统 DNS 仍返回 `BAD_PACKET`；显式 `Resolve-DnsName -Server 1.1.1.1` 可解析 api.cloudflare.com；curl 走系统解析仍为 HTTP 000。未修改网卡或其他网络配置。鉴于负责人此前手动改适配器 DNS 后失去网络，下一步不再建议直接改网卡；先用手机热点等可信替代网络，仅当默认 Resolve-DnsName 与 HTTPS 均成功后运行 Wrangler。

Cloudflare CLI 身份核对（2026-09-25）：负责人运行 `npx wrangler pages project list` 成功，当前账号/授权可读取现存 `club-hub-preview` 项目，Git Provider 为 No，符合本项目 Wrangler Direct Upload 路径。列表成功不等于已创建 Deployment。下一步确认 Preview 运行时变量已设置后，负责人从 PowerShell 执行 README 中的 `wrangler pages deploy ... --branch preview`，再以 CLI 返回的 Preview URL 做配置状态验收；目前仍未部署。

#### Wrangler 资产上传中断（2026-09-25）

负责人首次 `wrangler pages deploy` 在 `Uploading... (134/200)` 后报 `Failed to upload files. Please try again. Error: {}`。当前没有成功部署的证据，不应把 134/200 当作发布完成。页面资产规模低于 Cloudflare Direct Upload 上限（20,000 文件、单文件 25 MiB）。优先在网络稳定时对同一既有项目、同一 `preview` 分支使用同一发布副本重试并加 `--skip-caching`；该参数属于 Wrangler Pages deploy 支持项，Cloudflare workers-sdk 的相似差分上传 502 案例记录了它可绕开差分上传路径，但当前错误未提供 HTTP 状态/Ray ID，故不能断定是同一平台故障。若仍失败，收集 `--log-level debug` 中请求路径、HTTP 状态和 Ray ID，移除 Authorization/token 后再排查。生产/DNS/Supabase SQL 均未涉及。

## 2026-09-25｜Preview Auth 测试账号核对

- 已在目标 Supabase Preview 项目 `feiedwnkfuzvlhxnxrdw` 中只读核对本轮 9 个角色测试账号，全部存在：
  - ``<Preview 测试账号邮箱，已脱敏>``
  - `clubhub.preview.admin.20260925@example.com`
  - `clubhub.preview.successor.20260925@example.com`
  - `clubhub.preview.member.20260925@example.com`
  - `clubhub.preview.pending.20260925@example.com`
  - `clubhub.preview.rejected.20260925@example.com`
  - `clubhub.preview.left.20260925@example.com`
  - `clubhub.preview.crossleader.20260925@example.com`
  - `clubhub.preview.member2.20260925@example.com`
- Auth 列表中还存在 6 个历史测试账号；本轮不删除、不混入新的角色矩阵。
- 本轮只完成 Auth 账号存在性核对，尚未初始化 `club_members` 角色/状态，也未执行新的 Supabase SQL。
- 下一步：使用仅限 Preview、受控且不授予普通用户执行权限的初始化方案，建立主社团与跨社团角色矩阵，然后用真实登录账号验证 RLS/RPC。不得直接从浏览器更新受保护表。

## 2026-09-25｜Preview 角色矩阵初始化 SQL（已准备，未执行）

已新增：`supabase/preview-role-matrix-20260925.sql`。

### 设计审阅结论

- 这是仅供负责人在 Preview Supabase Dashboard → SQL Editor 手工执行的初始化脚本，不是浏览器 RPC。
- 脚本只接受已存在的 9 个目标 Auth 邮箱，并固定使用两个 Preview 测试社团 ID：`...5501` 主社团、`...5504` 跨社团测试社团。
- 只插入缺失的 `public.users`、`public.clubs` 和 `public.club_members` 关系；如果固定 ID 已被其他数据占用、关系状态/角色冲突、数量不符合预期或 active leader 不唯一，事务整体回滚并报错，不静默覆盖。
- 不删除或修改活动、报名、成员历史；不授予 `anon` 或普通 `authenticated` 执行初始化函数的权限；不包含密钥。
- 该脚本未在真实 Supabase 执行。文件存在不代表 Preview 权限已经上线。

### 目标矩阵

| 测试账号 | 社团 | 角色 | 状态 |
|---|---|---|---|
| oldleader | 主社团 | leader | active |
| admin | 主社团 | admin | active |
| successor | 主社团 | member | active |
| member | 主社团 | member | active |
| member2 | 主社团 | member | active |
| pending | 主社团 | member | pending |
| rejected | 主社团 | member | rejected |
| left | 主社团 | member | left |
| crossleader | 跨社团测试社团 | leader | active |

执行后，脚本末尾的只读查询应返回 9 行。之后再由 `oldleader` 登录，通过既有 `transfer_club_leadership` RPC 将 `successor` 提升为 leader，并验证 oldleader 自动降为 member；不要直接更新 `club_members`。

### 执行前硬性核对

1. Supabase Dashboard 顶部 Project Ref 必须是 `feiedwnkfuzvlhxnxrdw`。
2. 只在 Preview 项目的 SQL Editor 执行，不在 Production 执行。
3. 先确认 9 个目标 Auth 邮箱均已存在；本轮已完成核对。
4. 执行后保存 SQL Editor 的成功结果和末尾 9 行只读结果，作为回归证据。

### 2026-09-25 修订说明

首次执行角色矩阵脚本时，固定主社团 ID `00000000-0000-0000-0000-000000005501` 与旧的 `supabase/seed-test-data.sql` 测试社团冲突；由于脚本事务保护，执行已整体回滚。现已将角色矩阵脚本改为使用新的固定 ID：主社团 `...5601`、跨社团测试社团 `...5604`。旧测试社团及其活动、报名和成员历史不删除、不迁移。请只执行修订后的 `supabase/preview-role-matrix-20260925.sql`。

### 2026-09-25｜角色矩阵上线确认

负责人确认修订后的 `supabase/preview-role-matrix-20260925.sql` 已在 Preview 项目 `feiedwnkfuzvlhxnxrdw` 执行。不要重复执行初始化 SQL。当前下一步是保存 SQL Editor 末尾 9 行只读结果，并使用真实账号完成 RLS/RPC 回归；本地记录暂以负责人确认作为状态来源，尚未直接读取远端 SQL Editor 结果。

## 2026-09-25｜角色上线后的 Preview 回归进度

- 负责人确认修订版 `supabase/preview-role-matrix-20260925.sql` 已在 Preview 项目 `feiedwnkfuzvlhxnxrdw` 执行，角色矩阵已上线；不得重复执行该初始化 SQL。
- Codex 已在 `https://preview.club-hub-preview.pages.dev/` 使用 ``<Preview 测试账号邮箱，已脱敏>`` 完成真实 Auth 登录，页面读取到“当前账号拥有 active leader/admin 社团关系”，证明 Preview 配置、Auth 会话与成员关系读取链路可用。
- 本轮尚未从 SQL Editor 直接读取末尾 9 行结果，因此不把 9 行数据库快照描述为 Codex 已核验；也尚未执行负责人交接 RPC，避免在未保存基线回执前改变角色矩阵。
- 归档恢复仍不开放；交接继续使用 `transfer_club_leadership` 安全 RPC，原社长交接后必须降为 `member`，不得浏览器直写 `club_members`。
- 本轮重新执行三项 Node 语法检查与 `node club-app/check-ui.cjs`：`ALL 432 CHECKS PASSED`。覆盖桌面 1440px、移动 390px、P5、Blue Archive、`#hub`、`#events`、`#community`、`#me`。
- 下一步：由负责人提供或截图核对 SQL Editor 的 9 行只读结果；随后在 Preview 进行 oldleader → successor 的真实 RPC 交接回归，并验证历史活动、报名、成员记录未被改写。

### 负责人交接真实 Preview 回归状态（2026-09-25）

已开始执行 `oldleader` → `successor` 的 Preview 负责人交接，但首次进入交接界面时，目标 Supabase 返回：`Could not find the function public.list_club_lead_transfer_candidates(target_club_id) in the schema cache`。本次没有执行交接，也没有直接更新 `club_members`；两位账号角色保持原矩阵状态。必须先在目标 Preview SQL Editor 执行 `supabase/enable-leader-club-transfer.sql`，确认两个安全 RPC 已生效后再继续。未执行的 SQL 不视为上线能力。

#### 2026-09-25 交接 SQL 生效复核

执行交接 SQL 后刷新 Preview 仍返回 `Could not find the function public.list_club_lead_transfer_candidates(target_club_id) in the schema cache`。因此负责人交接仍未执行，角色和历史数据未改变。需在目标 Project Ref `feiedwnkfuzvlhxnxrdw` 的 SQL Editor 用只读查询核对 `public.list_club_lead_transfer_candidates` 与 `public.transfer_club_leadership` 是否真实存在；未核对前不得把 SQL 视为已上线。


## 2026-09-25｜负责人交接验收与移动端主题入口

- 负责人确认：Preview 负责人交接已测试通过。此项为负责人确认，不代表 Codex 另外读取了数据库快照或审计日志；既有安全边界不变：交接只能走 `transfer_club_leadership` 安全 RPC，原社长降为 `member / active`，接任者成为 `leader / active`，不得由浏览器直接更新受保护表。
- 修复移动端 P5 主题的 MENU 入口：在不改变 `#hub / #events / #community / #me` 四项一级导航的前提下，390px 下显示浮动 MENU，位于底部 COMMAND 导航上方，点击可打开主题选择菜单。P5 与 Blue Archive 均可从菜单选择；主题切换仅改变本地视觉表现，不代表真实后端能力。
- 修复已退场加载层仍覆盖点击命中测试的问题：`.p5-loader.hide` 增加 `pointer-events: none`，避免透明层遮挡移动端 MENU。
- 回归检查新增 P5 移动端 MENU 可见/可打开与主题选项断言；完整检查结果 `ALL 437 CHECKS PASSED`。覆盖桌面 1440px、移动 390px、P5、Blue Archive 与四项一级导航。
- 下一步建议：先把含本修复的源码部署到 Cloudflare Pages Preview，再在真实手机或 390px 设备视口确认固定 Preview URL 上 MENU 可见并完成主题切换。部署与设备验收通过后，可结束本轮并切换到独立任务：整理 Preview 真实 RLS/RPC 角色回归验收矩阵与证据；之后再做发布门禁与正式域名方案。暂不建议开放归档恢复或直接切生产。

## 2026-09-26｜Preview 权限回归与发布门禁核验

### 本轮已实际核验

- 目标站点为 `https://preview.club-hub-preview.pages.dev/`；配置端点 `/supabase-config.js` 返回 HTTP 200，配置 URL 的 Project Ref 为 `feiedwnkfuzvlhxnxrdw`，与授权的 Preview 项目一致。只检查身份与 key 类型特征，没有输出或记录 anon key；未发现 `sb_secret_` / `service_role` 特征。
- Preview 页面可打开，界面显示账号标识 `clubhub.preview.oldleader.20260925`。但本轮浏览器运行时读取 `window.clubBackend` 结果为不存在，无法从当前页面独立确认该会话的 Supabase Auth 用户 ID、`club_members` 角色快照，或调用 RLS/RPC 取得权限拒绝证据。因此页面账号标签不作为权限回归通过证据。
- 角色矩阵初始化 SQL 据负责人先前确认已在 Preview 执行；本轮未执行、不得重跑 `supabase/preview-role-matrix-20260925.sql`。负责人此前确认交接验收通过，但这不是本轮对数据库的独立核验。本轮没有调用任何写 RPC、没有改数据库、没有部署，也没有触碰 Production 或 DNS。
- 本地发布门禁：`node --check club-app/app.js`、`node --check club-app/supabase-adapter.js`、`node --check club-app/check-ui.cjs` 均通过；`node club-app/check-ui.cjs` 结果 `ALL 437 CHECKS PASSED`，覆盖桌面 1440px、移动 390px、P5、Blue Archive、移动 MENU/主题切换与四项一级导航 `#hub / #events / #community / #me`。

### 角色回归结论与发布门禁状态

- 本轮对 `active leader/admin`、普通 `member`、`pending`、`rejected`、`left`、跨社团负责人六类身份均**未取得可独立复核的本轮真实 RLS/RPC 结果**；不得标为本轮已通过。
- 发布门禁结论：**Preview 目标身份门禁通过；本地代码/UI 门禁通过；真实权限回归门禁未通过（证据不足/运行时未能读取 backend），整体发布门禁暂不通过。** 这不表示已发现 RLS 漏洞。
- 后续先确认 Preview 发布版本确实加载 `supabase-adapter.js`，并恢复可观测的 Auth/成员关系状态；或在目标 Supabase Dashboard SQL Editor 提供只读核验结果。只读核验可用以下查询（本轮未执行）：

```sql
select u.email, cm.role, cm.status, c.name as club_name, c.id as club_id
from public.club_members cm
join auth.users u on u.id = cm.user_id
join public.clubs c on c.id = cm.club_id
where u.email in (
  '`<Preview 测试账号邮箱，已脱敏>`',
  'clubhub.preview.admin.20260925@example.com',
  'clubhub.preview.successor.20260925@example.com',
  'clubhub.preview.member.20260925@example.com',
  'clubhub.preview.member2.20260925@example.com',
  'clubhub.preview.pending.20260925@example.com',
  'clubhub.preview.rejected.20260925@example.com',
  'clubhub.preview.left.20260925@example.com',
  'clubhub.preview.crossleader.20260925@example.com'
)
order by u.email, c.id;

select n.nspname as schema_name,
       p.proname as function_name,
       pg_get_function_identity_arguments(p.oid) as arguments,
       has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can_execute,
       has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_can_execute
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'list_club_lead_transfer_candidates', 'transfer_club_leadership',
    'rename_leader_club', 'archive_leader_club'
  )
order by p.proname;
```

- 上述 SQL 仅为只读核验，不是必须重跑的建表/初始化 SQL；本轮需要执行的变更 SQL：**无**。拿到结果后，再用真实账号逐一验证允许/拒绝行为；任何写用例只能通过已批准的安全 RPC，且必须使用可控 Preview 测试数据，不直接写受保护表。
- 现有素材授权范围、归档保留活动/报名/成员历史规则均未变；归档恢复继续关闭。正式 URL、域名/DNS 与生产发布继续后置。

## 2026-09-26｜正式发布准备审计（只读，未上线）

正式发布前的安全门禁、URL、域名/DNS 方案与 Runbook 已整理到：`系统设计/正式发布准备审计-20260926.md`。

本轮只读结论：Preview 页面可访问，前端公开 key 的 Worker 代码边界、三项 Node 语法检查和 UI 门禁通过；`node club-app/check-ui.cjs` 为 `ALL 437 CHECKS PASSED`，覆盖 1440px、390px、P5、Blue Archive、移动 MENU、主题切换与四项一级导航。未执行 Production 配置、DNS、Auth 修改、数据库写入或 Cloudflare 部署。

正式发布仍被以下事项阻断：Production Supabase/Pages 隔离缺少独立证据；域名、注册商和 DNS 提供商信息未提供；六类角色真实 RLS/RPC 回归本轮未独立验证（负责人交接仅按负责人确认引用）；`requestClubMembership` 仍直接 insert `club_members`，需在 Production 前决定是否改安全 RPC；Auth 回调/CORS、404/深链接回退和正式构建仍需核验。推荐 `www` canonical + 根域重定向，并使用独立 Production Supabase 项目和独立 Pages Production 变量。

### 域名方案补充（2026-09-26）

负责人决定按低变更方案推进：阿里云仅作为可选注册商，先不迁移 Nameserver；正式站优先使用 `www.<域名>` 作为 canonical。购买前需自行核对注册/续费价格、实名与转出规则。当前未购买域名、未绑定 Pages、未修改 DNS 或 Supabase Auth。域名确定后先按 Cloudflare Pages 控制台给出的目标绑定 `www`，再单独评估根域重定向；不要凭猜测填写 DNS 记录，也不要迁移现有 MX/TXT 邮件记录。


## 2026-09-26｜正式发布门禁决定：社团自助申请

- 负责人确认保留 equestClubMembership 对 club_members 的直接 insert；其设计边界为登录用户仅以本人身份提交 ole='member'、status='pending'，由 club_members_insert_self_pending RLS policy 限制。
- 不新增 SECURITY DEFINER RPC，不改变现有申请状态、唯一约束或拒绝/离开后的历史规则；本项作为负责人批准的 RLS 自助写入例外，不再作为待决架构选择。
- 此确认是代码/门禁决策，不是远端配置核验证据。Production 上线前仍需在目标 Supabase 项目只读核对 RLS 已启用且该 policy 与仓库定义一致；不因本决定执行 SQL。

## 2026-09-26｜成员侧同好与小聚流程完善

本轮重点完善三个成员侧入口，仍保持“纯前端内存演示”边界，刷新页面会重置本轮操作，不代表真实报名、通知、审核或权限已接入：

- **同好页｜临时活动小队**：从当前可见的“成员聚会”活动动态生成小队列表，展示时间、地点、成团进度与已加入人数；成员可以留下或撤回本次活动的同行意向，并从详情窗口查看集合点、成团状态和活动详情。临时小队只对应单次活动，不会自动加入长期小组，也不会替用户完成活动报名或发送真实通知。
- **同好页｜发起兴趣小组**：新增兴趣标签、加入方式（直接加入 / 申请后加入）与当前目标（找同好交流 / 约一次线下活动 / 一起完成作品）；创建后初始化本地演示成员、动态与文件分区。创建小组不授予社团管理员权限，真实成员关系、审核与治理仍未接入。
- **活动页｜成员发起小聚**：保留低压力活动模板，补充所属范围与活动小组上下文；发布前明确时间、地点、人数、集合点、迎新联系人及可见范围，发起者计入演示人数并生成页面内创建回执。支持“等待成团 / 立即开放”两种演示状态，但不代表社团官方审批。
- **移动端修正**：长表单滚动时，小聚弹窗关闭按钮使用弹窗内 `sticky` 定位，390px 下仍保持右上角可见。

本轮验证：`node club-app/check-ui.cjs` 共 **437 项检查全部通过**，覆盖桌面 1440px、移动 390px、P5 / Blue Archive 主题与四项一级导航。

下一步建议：继续围绕成员侧流程补充“活动详情 → 同行意向 → 报名”的状态关系说明，并在未来接入真实后端时再拆分报名、成员关系、审核与通知权限；当前不扩大为真实社交或管理能力。

## 2026-09-26｜成员侧活动状态关系设计

新增设计文档：`系统设计/成员侧活动状态关系与边界说明-v1.0.md`，用于统一以下成员侧语义：

- 活动生命周期与等待成团/已成团展示。
- “有点兴趣”与“想找同行”的独立关系。
- 临时活动小队作为同行意向派生视图，而不是报名状态。
- 正式报名、候补、取消和活动后核验事实。
- 成员发起小聚与社团官方审批、管理权限之间的边界。

当前仍只做设计，不修改业务代码、不接入后端。后续实现优先增加活动详情中的“你当前的关系”汇总卡，并用文档中的验收场景补充自动化检查。

## 成员侧活动关系后端接入（2026-09-26）

已新增并执行 `supabase/enable-member-activity-relations.sql`，依赖现有基础表与活动报名迁移。该 SQL 已在项目 `club-app-test` 的 `main / PRODUCTION` 分支执行，并完成表、字段、RLS 与 RPC 的只读结构核验；后续真实账号回归仍未完成。

本迁移新增四类独立事实：`event_interests`、`event_companion_intents`、`interest_groups`、`group_memberships`；并在 `events` 上增加 `event_kind`、可见范围、集合点、迎新联系人及兴趣组关联。社团活动仍走原 leader/admin 创建 RPC；成员小聚走 `create_member_gathering()`，报名复用 `join_event()`，兴趣和同行状态不占报名容量。权限通过 RLS 与受限 `SECURITY DEFINER` RPC 控制，不开放关系表直接写入。

`club-app/supabase-adapter.js` 新增相应 RPC wrapper。它们尚未接入成员侧 UI 状态提交；当前页面仍是纯前端演示，不能宣称真实数据已持久化。

## 2026-09-26｜成员侧活动关系后端迁移状态

Production 数据库迁移已由负责人在 Supabase 项目 `club-app-test` 的 `main / PRODUCTION` 分支执行，并完成只读结构核验。核验结果：四张关系表 `event_interests`、`event_companion_intents`、`interest_groups`、`group_memberships` 均存在且启用 RLS；`events` 的成员侧字段已存在；`join_event(uuid)` 保持单一实现；7 个成员侧 RPC 均已创建。

本轮按负责人决定跳过逻辑备份，未执行破坏性操作。这里的“已完成”仅指数据库迁移、RLS 与 RPC 的结构核验通过；当前成员侧页面仍是纯前端内存演示，`club-app/supabase-adapter.js` 的后端 wrapper 尚未接入 UI，因此不能把页面操作描述为真实持久化、真实通知或真实审核。

下一步接入顺序：登录态与错误态 → 兴趣/同行意向提交 → 兴趣小组加入与发起者审核 → 成员小聚发布与正式报名边界 → 真实测试账号回归。

