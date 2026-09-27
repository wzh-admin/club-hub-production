'use strict';
/*
 * 主题注册表只描述主题元数据、语义文案与资源根目录。
 * 业务状态与主题解耦；未来增加作品主题时新增同形配置和对应 data-theme CSS，
 * 不复制活动、小组、消息等业务逻辑。主题资源可使用已确认纳入本地主题包的官方素材。
 */
window.CLUB_THEME_CONTRACT = Object.freeze({
  schemaVersion: 1,
  fallbackTheme: 'p5',
  pageIds: Object.freeze(['hub', 'events', 'community', 'me']),
  requiredMeta: Object.freeze([
    'schemaVersion',
    'id',
    'version',
    'status',
    'label',
    'displayName',
    'themeColor',
    'colorScheme',
    'titleSuffix',
    'assets.feedback',
    'rights.status',
    'rights.note'
  ]),
  requiredPageIntroFields: Object.freeze(['index', 'code', 'title', 'cue']),
  requiredCssTokens: Object.freeze([
    '--theme-id',
    '--theme-accent',
    '--theme-accent-strong',
    '--theme-bg',
    '--theme-ink',
    '--theme-white',
    '--theme-paper',
    '--theme-paper-warm',
    '--theme-muted',
    '--theme-status-success',
    '--theme-status-warning',
    '--theme-status-locked',
    '--theme-status-pending',
    '--theme-status-failed',
    '--theme-status-new',
    '--theme-status-notice',
    '--theme-display-font',
    '--theme-accent-font',
    '--theme-command-cut',
    '--theme-panel-cut',
    '--theme-focus-ring',
    '--theme-events-background',
    '--theme-events-shade',
    '--theme-community-background',
    '--theme-community-shade',
    '--theme-profile-background',
    '--theme-profile-shade'
  ]),
  optionalAssetGroups: Object.freeze(['visual', 'transition', 'audio']),
  rightsStatuses: Object.freeze(['unverified', 'cleared', 'restricted'])
});

window.CLUB_THEME_DEFAULT = 'p5';
window.CLUB_THEMES = Object.freeze({
  p5: Object.freeze({
    schemaVersion: 1,
    id: 'p5',
    version: '1.0.0',
    status: 'active',
    label: 'PHANTOM RED',
    displayName: 'P5 风格',
    themeColor: '#d60024',
    colorScheme: 'dark',
    titleSuffix: '同好据点',
    assets: Object.freeze({
      feedback: 'assets/feedback/',
      visual: 'assets/visual/',
      transition: 'assets/ppt/',
      hero: 'assets/p5/video/hero-web.mp4',
      audio: 'assets/p5/audio/',
      logo: 'assets/p5/img/logo.png'
    }),
    motion: Object.freeze({ transition: 'p5-slice', intro: 'p5-cut', dialog: 'p5-impact', feedback: 'p5-burst', soundProfile: 'phantom-command' }),
    rights: Object.freeze({
      status: 'cleared',
      note: '项目负责人于 2026-09-24 确认本主题现有素材已取得用于项目公开 Preview 的授权；凭证由负责人留存，未复制到仓库。',
      evidenceStatus: 'owner-confirmed-not-reproduced-in-repository',
      confirmedAt: '2026-09-24',
      records: Object.freeze([
        'assets/feedback/SOURCES.md',
        'assets/visual/SOURCES.md',
        'assets/p5/SOURCES.md'
      ])
    }),
    pageIntros: Object.freeze({
      hub: Object.freeze({ index: '01', code: 'HIDEOUT', title: '据点', cue: 'AFTER SCHOOL' }),
      events: Object.freeze({ index: '02', code: 'MISSION SELECT', title: '选择行动', cue: 'CHOOSE YOUR TARGET' }),
      community: Object.freeze({ index: '03', code: 'BUILD YOUR BONDS', title: '建立羁绊', cue: 'FIND YOUR PEOPLE' }),
      me: Object.freeze({ index: '04', code: 'PERSONAL RECORD', title: '个人档案', cue: 'CHECK YOUR STATUS' })
    })
  }),
  'blue-archive': Object.freeze({
    schemaVersion: 1,
    id: 'blue-archive',
    version: '0.1.0',
    status: 'active',
    label: 'SKY GLASS',
    displayName: '天空玻璃主题',
    themeColor: '#54dcfe',
    colorScheme: 'light',
    titleSuffix: '同好据点 / SKY GLASS',
    assets: Object.freeze({ feedback: 'themes/blue-archive/assets/feedback/', visual: 'themes/blue-archive/assets/visual/', transition: 'themes/blue-archive/assets/transition/', hero: 'themes/blue-archive/assets/transition/official-home-bg.mp4', audio: 'assets/p5/audio/', logo: 'themes/blue-archive/assets/visual/logo.png', transitionFile: 'official-home-bg.mp4', aliases: Object.freeze({ 'feedback-confirm.webp': 'hina-reference.png', 'feedback-bond.webp': 'yuuka-reference.png', 'feedback-complete.webp': 'shiroko-reference.png', 'empty-morgana.webp': 'hifumi-reference.png' }) }),
    motion: Object.freeze({ transition: 'blue-scan', intro: 'blue-terminal', dialog: 'blue-panel', feedback: 'blue-pulse', soundProfile: 'sky-terminal' }),
    rights: Object.freeze({ status: 'cleared', note: '项目负责人于 2026-09-24 确认本主题现有素材已取得用于项目公开 Preview 的授权；凭证由负责人留存，未复制到仓库。', evidenceStatus: 'owner-confirmed-not-reproduced-in-repository', confirmedAt: '2026-09-24', records: Object.freeze(['themes/blue-archive/SOURCES.md','themes/blue-archive/CANDIDATE-REVIEW.md']) }),
    pageIntros: Object.freeze({
      hub: Object.freeze({ index: '01', code: 'SKY GLASS', title: '天空玻璃', cue: 'AFTER SCHOOL' }),
      events: Object.freeze({ index: '02', code: 'MISSION GRID', title: '任务网格', cue: 'CHOOSE YOUR TARGET' }),
      community: Object.freeze({ index: '03', code: 'ORBIT LINK', title: '轨道连接', cue: 'FIND YOUR PEOPLE' }),
      me: Object.freeze({ index: '04', code: 'STUDENT DOSSIER', title: '学生档案', cue: 'CHECK YOUR STATUS' })
    })
  }),
  'neon-grid': Object.freeze({
    schemaVersion: 1,
    id: 'neon-grid',
    version: '0.1.0',
    status: 'active-local',
    label: 'NEON GRID',
    displayName: '霓虹网格主题',
    themeColor: '#7c5cff',
    colorScheme: 'dark',
    titleSuffix: '同好据点 / NEON GRID',
    assets: Object.freeze({ feedback: 'assets/feedback/', visual: 'assets/visual/', transition: 'assets/ppt/', audio: 'assets/p5/audio/', logo: '' }),
    motion: Object.freeze({ transition: 'neon-scan', intro: 'neon-terminal', dialog: 'neon-panel', feedback: 'neon-pulse', soundProfile: 'neon-console' }),
    rights: Object.freeze({ status: 'cleared', note: '项目负责人于 2026-09-24 确认本主题现有素材已取得用于项目公开 Preview 的授权；凭证由负责人留存，未复制到仓库。', evidenceStatus: 'owner-confirmed-not-reproduced-in-repository', confirmedAt: '2026-09-24', records: Object.freeze([]) }),
    pageIntros: Object.freeze({
      hub: Object.freeze({ index: '01', code: 'NEON BASE', title: '霓虹据点', cue: 'SYNC AFTER SCHOOL' }),
      events: Object.freeze({ index: '02', code: 'GRID MISSIONS', title: '网格任务', cue: 'SELECT A SIGNAL' }),
      community: Object.freeze({ index: '03', code: 'LINK NETWORK', title: '连接网络', cue: 'FIND YOUR NODE' }),
      me: Object.freeze({ index: '04', code: 'USER CONSOLE', title: '用户控制台', cue: 'CHECK YOUR LOG' })
    })
  }),
});




/* 主题文案表现层：只覆盖公共组件的语气，不改变业务状态、数据或操作逻辑。 */
window.CLUB_THEME_COPY = Object.freeze({
  p5: Object.freeze({
    tips: Object.freeze({
      hub: Object.freeze(['放学后的时间，可别浪费在无聊上。','据点里有新的活动。先看看有什么值得出动的任务吧。','成员也可以发起小聚，不必什么事都等社长安排。']),
      events: Object.freeze(['正式活动和成员聚会可不是一回事，先看清主办身份。','候补不等于报名成功，也没有签到资格。','报名确认只是拿到席位，真正到场还要完成核验。']),
      community: Object.freeze(['关注游戏、加入小组、报名活动——这是三件不同的事。','喜欢同一部作品只是开始，一起做点什么才会产生羁绊。','小组文件就像群文件，常用资料集中放，取用更方便。']),
      me: Object.freeze(['这里只记录真实发生的参与，不拿活跃度给成员排高低。','减少动效之后，任务和信息依然应该完整。','这还是演示档案，刷新页面就会重置。'])
    }),
    hub: Object.freeze({ eyebrow:'01 // LOW-PRESSURE SIGNAL', title:'放学后，', titleEm:'一起去！', lead:'先看看今天有哪些轻松的活动。不需要马上报名，也可以先表达一点兴趣。', task:'看看今天的活动 ↗', gather:'发起一个小聚', stickerTop:'GO AT YOUR PACE', stickerMain:'FIND<br>YOUR<br>PEOPLE.', stickerBottom:'先找到同行的人，再一起出发。', deckLabel:'TODAY / LIVE SIGNALS', mission:'NEXT ACTIVITY', notice:'IMPORTANT', noticeTitle:'新学期社团公约', noticeConfirmed:'公约已确认', bonds:'YOUR BONDS', bondsText:'找到同好，建立羁绊' }),
    events: Object.freeze({ eyebrow:'MISSION SELECT', title:'发现', titleEm:'活动', lead:'先看看人数、流程和社交强度，再决定要不要参加。', search:'搜索活动…', empty:'目标未发现', emptyHint:'换一个筛选，或者自己发起一场成员小聚。', emptyCode:'NO MISSION' }),
    community: Object.freeze({ joined:'已在据点', join:'了解并加入', followed:'已关注', game:'进入专区', eyebrow:'BUILD YOUR BONDS', title:'同好', titleEm:'同行', lead:'稳定兴趣小组和一次性活动小队，都可以从一次轻松的回应开始。', create:'＋ 发起兴趣小组', files:'群文件说明', places:'校园地点手册' }),
    me: Object.freeze({ profile:'查看档案说明', eyebrow:'PERSONAL RECORD', title:'我的档案', member:'PHANTOM CLUB MEMBER', tickets:'MY ACTIVITIES / 我的活动', leader:'PRESIDENT COMMAND / DEMO', options:'OPTIONS / 偏好', bonds:'CONNECTION / 羁绊' })
  }),
  'blue-archive': Object.freeze({
    tips: Object.freeze({
      hub: Object.freeze(['老师，放学后的时间也要好好安排哦。','终端收到新的活动通知，请先确认任务条件。','如果想召集同学一起行动，可以从小聚开始。']),
      events: Object.freeze(['老师，请先确认活动类型、时间和参加资格。','候补席位不会自动转为正式确认，也不代表可以签到。','收到参加确认后，现场签到仍然需要单独完成。']),
      community: Object.freeze(['关注作品、加入小组和报名活动，是不同的校园记录。','找到兴趣相近的同学，再一起完成一次小小的社团任务吧。','常用资料已整理在小组文件区，查找时请注意来源说明。']),
      me: Object.freeze(['这里记录的是你的参与轨迹，不是对学生活跃度的排名。','减少动效后，任务说明和系统通知仍会完整保留。','这是本地演示档案，刷新后所有状态会回到初始值。'])
    }),
    hub: Object.freeze({ eyebrow:'AFTER SCHOOL // EASY START', title:'放学后，', titleEm:'一起去！', lead:'先看看人数、流程和社交强度。可以先表达兴趣，等找到同行的人再决定。', task:'看看今天的活动 ↗', gather:'发起一个小聚', stickerTop:'STUDENT NETWORK', stickerMain:'GO<br>AT<br>YOUR<br>PACE.', stickerBottom:'从一次轻松回应开始，和同学一起出发。', deckLabel:'TODAY / LIVE SIGNALS', mission:'NEXT ACTIVITY', notice:'IMPORTANT NOTICE', noticeTitle:'社团活动守则', noticeConfirmed:'守则已确认', bonds:'YOUR BONDS', bondsText:'找到同学，建立连接' }),
    events: Object.freeze({ eyebrow:'MISSION GRID', title:'发现', titleEm:'活动', lead:'先看看任务信息，再选择适合自己的参与方式。', search:'搜索活动…', empty:'暂未找到任务', emptyHint:'调整筛选条件，或发起一场成员小聚。', emptyCode:'NO ASSIGNMENT' }),
    community: Object.freeze({ joined:'已加入小组', join:'查看并加入', followed:'已登记', game:'进入校园专区', eyebrow:'ORBIT LINK', title:'同好', titleEm:'同行', lead:'稳定兴趣小组和临时活动小队，都可以帮助同学先找到同行的人。', create:'＋ 发起兴趣小组', files:'小组资料', places:'校园生活手册' }),
    me: Object.freeze({ profile:'查看学生档案说明', eyebrow:'STUDENT DOSSIER', title:'我的参与', member:'STUDENT NETWORK MEMBER', tickets:'MY ACTIVITIES / 我的活动', leader:'CLUB STAFF PREVIEW / DEMO', options:'SETTINGS / 偏好', bonds:'CONNECTION LOG / 联络记录' })
  }),
  'neon-grid': Object.freeze({
    tips: Object.freeze({
      hub: Object.freeze(['系统在线。把课后的空闲时间转换成一次有效连接。','检测到新的活动信号，建议先读取任务参数。','节点可以创建临时集结，不需要等待主节点授权。']),
      events: Object.freeze(['任务类型、时间和资格是三个独立参数，请逐项确认。','STANDBY 不等于 CONFIRMED，也不会生成签到权限。','席位确认后仍需现场校验，系统不会伪造完成结果。']),
      community: Object.freeze(['FOLLOW、JOIN、REGISTER 是三种不同状态，请不要混淆。','相同兴趣只是连接请求，持续协作才会形成稳定节点。','共享文件区只展示演示索引，不读取或传输真实文件。']),
      me: Object.freeze(['这里显示你的本地活动日志，不生成虚构排名。','REDUCED MOTION 只降低动画，不删除任何状态或信息。','当前是内存演示控制台，刷新页面会清空本地状态。'])
    }),
    hub: Object.freeze({ eyebrow:'01 // LOW-PRESSURE NODE', title:'放学后，', titleEm:'一起去！', lead:'先读取活动规模、流程和交流强度。兴趣与同行需求只写入本地演示状态。', task:'读取活动信号 ↗', gather:'发起一个小聚', stickerTop:'NETWORK STATUS', stickerMain:'SYNC<br>AT<br>YOUR<br>PACE.', stickerBottom:'先同步意愿，再决定是否加入行动。', deckLabel:'TODAY / LIVE SIGNALS', mission:'ACTIVITY SIGNAL', notice:'SYSTEM NOTICE', noticeTitle:'SYSTEM PROTOCOL', noticeConfirmed:'PROTOCOL 已确认', bonds:'LINK GRAPH', bondsText:'发现节点，建立连接' }),
    events: Object.freeze({ eyebrow:'GRID MISSIONS', title:'发现', titleEm:'活动', lead:'先看看人数、流程和社交强度，再决定要不要参加。', search:'搜索活动…', empty:'未发现匹配信号', emptyHint:'调整过滤参数，或创建一场成员集结。', emptyCode:'NO SIGNAL' }),
    community: Object.freeze({ joined:'节点已连接', join:'读取并连接', followed:'已同步', game:'进入协议区', eyebrow:'LINK NETWORK', title:'同好', titleEm:'同行', lead:'长期兴趣节点与临时活动小队并存，先建立低压力连接，再决定是否持续同行。', create:'＋ 发起兴趣小组', files:'文件索引', places:'校园节点手册' }),
    me: Object.freeze({ profile:'读取用户说明', eyebrow:'USER CONSOLE', title:'我的参与', member:'LOCAL NETWORK USER', tickets:'MY ACTIVITIES / 我的活动', leader:'OPERATOR CONSOLE / DEMO', options:'SYSTEM OPTIONS / 偏好', bonds:'LINK GRAPH / 连接图' })
  })
});

