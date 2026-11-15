/**
 * 九规智能中枢 企业版中枢 — 演示原型数据层
 * 数据为虚构演示数据，结构与 PRD 第 5 章 Resource 模型对齐，便于后续替换为数据中心 API。
 * 演示默认网络：互联网（inet）。三网共用同一份数据基线，靠 nets 字段与 network 配置隔离。
 */

export const roles = {
  employee: {
    id: 'employee',
    label: '普通员工',
    name: '赵工',
    unit: '规划一所',
    duty: '规划设计师',
    org: '九江市规划设计集团',
    visibleModules: ['home', 'projects', 'tasks', 'skills', 'imagegen', 'datacenter', 'knowledge', 'oneMap', 'review', 'oa', 'finance', 'drive', 'contacts', 'im', 'notice', 'academy', 'bid', 'monitor', 'renewal', 'hr', 'adminops', 'more', 'cloudbrowser', 'settings'],
    scopes: ['public', 'internal', 'unit:规划一所'],
    note: '按岗位与项目参与授权，仅可见本单位与公开发布资源',
  },
  ops: {
    id: 'ops',
    label: '运维管理员',
    name: '钱工',
    unit: '集团总部',
    duty: '运维主管',
    org: '九江市规划设计集团',
    visibleModules: [...['home', 'projects', 'tasks', 'skills', 'imagegen', 'datacenter', 'knowledge', 'oneMap', 'review', 'oa', 'finance', 'drive', 'contacts', 'im', 'notice', 'academy', 'bid', 'monitor', 'renewal', 'hr', 'adminops', 'more', 'cloudbrowser', 'settings'], 'admin'],
    scopes: ['public', 'internal', 'all-org'],
    note: '企业工作台与普通员工一致，另多一项「管理中心」（位于图标栏「更多」下方，含插件审批、工单、监控、反馈与审计）；业务数据仍按各自授权访问',
  },
  guest: {
    id: 'guest',
    label: '外部访客',
    name: '孙总',
    unit: '合作单位',
    duty: '外部合作方',
    org: '外部单位（未入职）',
    visibleModules: ['home', 'projects', 'tasks', 'skills', 'imagegen', 'datacenter', 'knowledge', 'oneMap', 'review', 'oa', 'finance', 'drive', 'contacts', 'im', 'notice', 'academy', 'bid', 'monitor', 'renewal', 'hr', 'adminops', 'more', 'cloudbrowser', 'settings'],
    scopes: ['public'],
    grants: [],
    note: '侧边栏模块与员工一致，但企业工作台各模块只显示壳子、不加载任何企业数据；确需查看某个模块时由管理员按模块单独授权',
  },
}

/**
 * 三网环境配置：同一份基线，身份、模型、工具、数据面各自独立（PRD 9.2）。
 * 演示默认互联网；`demo` 标记的能力差异用于演示 U12。
 */
export const networks = {
  inet: {
    id: 'inet',
    label: '互联网',
    badge: '互联网',
    desc: '企业云模型与获准个人模型；按数据级别执行外发控制',
    models: [
      { id: 'jg-cloud', label: 'JG-Enterprise（企业云）', network: '互联网', note: '企业统一云模型，服务端持有 Key', image: true, imageNote: '企业云已开通文生图端点（jg-image/v2）' },
      { id: 'personal-key', label: '个人 API Key', network: '互联网', note: '按数据级别执行外发控制', image: false, imageNote: '当前绑定的服务商未声明生图能力，需更换支持生图的模型 API' },
    ],
    tools: [
      { id: 'T-DATA', label: '数据中心检索', enabled: true },
      { id: 'T-SKILL', label: '企业技能', enabled: true },
      { id: 'T-WEB', label: '互联网检索', enabled: true },
      { id: 'T-MCP', label: 'MCP 工具', enabled: false, reason: '本网未登记 MCP 工具' },
    ],
    defaultModel: 'jg-cloud',
    note: '互联网环境仅处理获准在该网处理的数据；涉密与政务数据不在本目录中可见',
  },
  gov: {
    id: 'gov',
    label: '政务网',
    badge: '政务网',
    desc: '九江市统一政务模型；Token 由服务端持有并计量',
    models: [
      { id: 'jg-gov', label: '九江政务模型', network: '政务网', note: 'Token 由服务端持有，按配额计量', image: false, imageNote: '政务网模型未开通生图端点，需更换为已开通的模型 API' },
      { id: 'jg-enterprise', label: 'JG-Enterprise', network: '政务网', note: '企业统一模型', image: false, imageNote: '政务网侧未开通生图端点' },
    ],
    tools: [
      { id: 'T-DATA', label: '数据中心检索', enabled: true },
      { id: 'T-SKILL', label: '企业技能', enabled: true },
      { id: 'T-WEB', label: '互联网检索', enabled: false, reason: '政务网禁止直连互联网' },
      { id: 'T-MCP', label: 'MCP 工具', enabled: true },
    ],
    defaultModel: 'jg-gov',
    note: '政务网数据由主管平台授权，跨网不继承',
  },
  secret: {
    id: 'secret',
    label: '涉密内网',
    badge: '涉密内网',
    desc: 'Qwen3.8-27B 本地推理；离线运行，工具调用需兼容性验证',
    models: [
      { id: 'jg-enterprise', label: 'JG-Enterprise', network: '涉密内网', note: '企业统一模型', image: false, imageNote: '涉密内网禁止图像生成与外发' },
      { id: 'qwen-3.8-27b', label: 'Qwen3.8-27B', network: '涉密内网', note: '本地推理，离线部署', image: false, imageNote: '本地推理模型不含图像生成权重' },
    ],
    tools: [
      { id: 'T-DATA', label: '数据中心检索', enabled: true },
      { id: 'T-SKILL', label: '企业技能', enabled: true },
      { id: 'T-WEB', label: '互联网检索', enabled: false, reason: '涉密内网不可开启' },
      { id: 'T-MCP', label: 'MCP 工具', enabled: true },
    ],
    defaultModel: 'jg-enterprise',
    note: '涉密内网独立认证、独立存储、独立审计；不提供任意跨网切换',
  },
}

export const networkOrder = ['inet', 'gov', 'secret']

export const modules = {
  home: { label: '首页' },
  notice: { label: '通知公告' },
  drive: { label: '云空间' },
  academy: { label: '教学园地' },
  adminops: { label: '综合管理' },
  more: { label: '更多' },
  contacts: { label: '通讯录' },
  im: { label: '工作消息' },
  projects: { label: '项目' },
  tasks: { label: '定时任务' },
  skills: { label: '插件与技能' },
  automation: { label: '自动化任务' },
  datacenter: { label: '数据中心' },
  knowledge: { label: '智能笔记本' },
  oa: { label: 'OA 办公' },
  oneMap: { label: '一张图' },
  review: { label: '审图平台' },
  finance: { label: '财务管理' },
  apps: { label: '精选应用' },
  imagegen: { label: '图像' },
  cloudbrowser: { label: '云浏览器' },
  settings: { label: '个人中心' },
  bid: { label: '智能投标' },
  monitor: { label: '综合监测' },
  renewal: { label: '城市体检和更新' },
  hr: { label: '人事组织' },
  admin: { label: '管理中心' },
}

export const resources = [
  {
    id: 'R-TDT-2026',
    name: '天地图 · 影像底图（在线引用）',
    type: 'gis',
    format: 'WMTS',
    source: '天地图 API',
    updated: '2026-11-05 07:00',
    owner: '测绘地理信息中心',
    security: 'public',
    nets: ['inet'],
    scope: ['public', 'internal', 'unit:规划一所', 'dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '在线引用',
    status: 'authorized',
    action: '在线底图 · 空间检索',
    extent: [115.80, 29.50, 116.15, 29.85],
    meta: { crs: 'Web Mercator / WGS84', resolution: '0.5–1 m', coverage: '九江市域' },
    desc: '互联网环境影像底图引用天地图库，不复制存储；在线服务受服务方配额与条款约束。',
  },
  {
    id: 'R-2026-Q3-IMG',
    name: '卫星影像（九江市全域）2026 Q3',
    type: 'gis',
    format: 'GeoTIFF',
    source: '智数九规 · QGIS/PostGIS 底座',
    updated: '2026-10-08 10:23',
    owner: '国土空间规划所',
    security: 'secret',
    nets: ['secret'],
    scope: ['dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '198 GB',
    status: 'authorized',
    action: '地图服务 · 空间检索',
    extent: [115.80, 29.50, 116.15, 29.85],
    meta: { crs: 'CGCS2000 / 3-degree GK CM 115E', resolution: '0.5 m', quarters: '2026 Q3', coverage: '18,820 km²' },
    desc: '全域季度影像，经内网入库核验，按季度发布版本；GDAL 建金字塔，QGIS Server 动态读取 GeoTIFF。',
  },
  {
    id: 'R-2026-Q2-IMG',
    name: '卫星影像（九江市全域）2026 Q2',
    type: 'gis',
    format: 'GeoTIFF',
    source: '智数九规 · QGIS/PostGIS 底座',
    updated: '2026-07-05 09:12',
    owner: '国土空间规划所',
    security: 'secret',
    nets: ['secret'],
    scope: ['dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '201 GB',
    status: 'authorized',
    action: '地图服务 · 空间检索',
    extent: [115.80, 29.50, 116.15, 29.85],
    meta: { crs: 'CGCS2000 / 3-degree GK CM 115E', resolution: '0.5 m', quarters: '2026 Q2', coverage: '18,820 km²' },
    desc: '第二季度全域影像，与 Q3 同源可做时序对比。',
  },
  {
    id: 'R-3D-2026-XY',
    name: '倾斜摄影模型（浔阳区核心区）',
    type: '3d',
    format: 'OSGB / 3DTiles',
    source: '智数九规 · 三维服务',
    updated: '2026-09-18 15:30',
    owner: '测绘地理信息中心',
    security: 'internal',
    nets: ['secret', 'gov', 'inet'],
    scope: ['public', 'internal', 'unit:规划一所', 'dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '412 GB',
    status: 'authorized',
    action: '场景定位 · 缩放 · 图层',
    extent: [115.96, 29.70, 116.02, 29.75],
    meta: { tileset: '3DTiles 1.1', levels: 'L1–L18', coverage: '浔阳区 42 km²' },
    desc: '实景三维模型，用于方案比选与空间形态校核。',
  },
  {
    id: 'R-CAD-ZP-0913',
    name: '总平面 CAD.dwg（九江学院项目）',
    type: 'cad',
    format: 'DWG',
    source: '审图平台 · WebCAD',
    updated: '2026-09-13 11:05',
    owner: '建筑设计一所',
    security: 'internal',
    nets: ['secret', 'gov'],
    scope: ['internal', 'unit:规划一所', 'dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '86 MB',
    status: 'authorized',
    action: 'WebCAD 预览',
    meta: { version: 'V3.2', layers: '建筑 / 道路 / 竖向 / 管线', coord: '存在局部工程坐标，未建立转换关系' },
    desc: '图纸版本 V3.2，仅可校核性预览；因坐标系不完整，不参与空间范围检索。',
  },
  {
    id: 'R-DOC-GH-2021',
    name: '九江市国土空间总体规划（2021—2035）.pdf',
    type: 'document',
    format: 'PDF',
    source: '文件中心',
    updated: '2026-08-22 17:40',
    owner: '国土空间规划所',
    security: 'public',
    nets: ['gov', 'inet'],
    scope: ['public', 'internal', 'unit:规划一所', 'dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '34 MB',
    status: 'authorized',
    action: '全文预览 · 全文检索',
    meta: { pages: '186 页', extracted: '已解析', index: '全文索引已建立' },
    desc: '规划成果正式稿，已建立全文索引，可被 AI 引用与摘要。',
  },
  {
    id: 'R-PROJ-PUB',
    name: '中心城区项目公示信息（2026）',
    type: 'bizdata',
    format: '接口 / 表格',
    source: '集团门户 · 公示栏目',
    updated: '2026-10-30 09:40',
    owner: '经营管理部',
    security: 'public',
    nets: ['inet'],
    scope: ['public', 'internal', 'unit:规划一所', 'dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '—',
    status: 'authorized',
    action: '公示查询',
    meta: { rows: '86 条', fields: '项目 / 位置 / 建设单位 / 公示期' },
    desc: '面向互联网发布的项目公示数据，字段已脱敏，供检索与引用。',
  },
  {
    id: 'R-VIDEO-SITE',
    name: '现场踏勘影像（濂溪区）',
    type: 'video',
    format: 'MP4',
    source: '文件中心',
    updated: '2026-09-28 14:12',
    owner: '规划一所',
    security: 'internal',
    nets: ['secret', 'gov', 'inet'],
    scope: ['internal', 'unit:规划一所', 'dept:规划一所'],
    size: '1.2 GB',
    status: 'authorized',
    action: '流式播放 · 元信息',
    meta: { duration: '18:42', resolution: '1920×1080', codec: 'H.264' },
    desc: '濂溪区现场踏勘记录，供方案讨论引用。',
  },
  {
    id: 'R-IMG-DRONE',
    name: '无人机航拍正射影像 2026-09',
    type: 'image',
    format: 'TIFF',
    source: '测绘地理信息中心',
    updated: '2026-09-25 08:30',
    owner: '测绘地理信息中心',
    security: 'internal',
    nets: ['gov', 'inet'],
    scope: ['internal', 'unit:规划一所', 'dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '3.4 GB',
    status: 'authorized',
    action: '图像预览 · 元信息',
    meta: { resolution: '0.1 m', size: '9240×6180' },
    desc: '航拍正射，按普通图片管理，不参与空间资源检索。',
  },
  {
    id: 'R-OA-LEDGER',
    name: '审批项目台账（2026 年度）',
    type: 'bizdata',
    format: '接口',
    source: '泛微 OA',
    updated: '2026-10-20 16:00',
    owner: '经营管理部',
    security: 'internal',
    nets: ['gov'],
    scope: ['unit:集团总部', 'all-org'],
    size: '—',
    status: 'need-approval',
    action: '授权接口查询',
    meta: { rows: '1,284 条', fields: '项目 / 单位 / 审批节点 / 金额' },
    desc: '业务流程数据，字段级最小必要返回，未授权用户仅见字段说明。',
  },
  {
    id: 'R-BIZ-TIJIAN',
    name: '城市体检指标数据集（2026）',
    type: 'bizdata',
    format: '接口',
    source: '智数九规 · 业务库',
    updated: '2026-10-11 09:00',
    owner: '智数中心',
    security: 'internal',
    nets: ['gov', 'inet'],
    scope: ['public', 'internal', 'unit:规划一所', 'dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '—',
    status: 'authorized',
    action: '指标查询',
    meta: { indicators: '48 项', years: '2024—2026' },
    desc: '城市体检指标体系，供专班与规划所分析引用。',
  },
  {
    id: 'R-MAP-500',
    name: '1:500 地形图（中心城区）',
    type: 'gis',
    format: 'SHP',
    source: '智数九规 · QGIS/PostGIS 底座',
    updated: '2026-06-30 10:00',
    owner: '测绘地理信息中心',
    security: 'secret',
    nets: ['secret'],
    scope: ['dept:规划一所', 'unit:集团总部', 'all-org'],
    size: '62 GB',
    status: 'authorized',
    action: '服务引用 · 空间检索',
    extent: [115.85, 29.60, 116.10, 29.82],
    meta: { crs: 'CGCS2000', scale: '1:500', sheets: '286 幅' },
    desc: '基础地形图，涉密管理，需在本网络环境内使用。',
  },
]

/** 空间检索范围：九江市域近似包络（演示用，非真实投影转换） */
export const spatialBounds = { minLng: 115.80, minLat: 29.50, maxLng: 116.15, maxLat: 29.85 }

export const satelliteQuarters = [
  { id: '2025Q4', label: '2025 Q4', date: '2025-11-02', resolution: '0.5 m', input: '2025-11-05', coverage: '18,820 km²' },
  { id: '2026Q1', label: '2026 Q1', date: '2026-02-18', resolution: '0.5 m', input: '2026-02-21', coverage: '18,820 km²' },
  { id: '2026Q2', label: '2026 Q2', date: '2026-05-09', resolution: '0.5 m', input: '2026-05-12', coverage: '18,820 km²' },
  { id: '2026Q3', label: '2026 Q3', date: '2026-10-08', resolution: '0.5 m', input: '2026-10-23', coverage: '18,820 km²' },
]

/** 影像对比：同一视野两期叠加，变化图斑只在较新一期出现（演示数据） */
export const imageryCompare = {
  views: [
    { id: '2026Q2', label: '2026 Q2', date: '2026-05-09' },
    { id: '2026Q3', label: '2026 Q3', date: '2026-10-08' },
  ],
  patches: [
    { id: 'P1', label: '新增工地', x: 0.18, y: 0.52, w: 0.14, h: 0.12, area: '2.4 ha' },
    { id: 'P2', label: '道路贯通', x: 0.46, y: 0.30, w: 0.22, h: 0.07, area: '3.1 ha' },
    { id: 'P3', label: '场地平整', x: 0.66, y: 0.62, w: 0.17, h: 0.14, area: '5.6 ha' },
  ],
}

export const plugins = [
  {
    id: 'P-DOC',
    name: '文档解析',
    kind: 'enterprise',
    publisher: '智数中心',
    version: '1.3.2',
    status: 'enabled',
    nets: ['inet', 'gov', 'secret'],
    deps: 'PDF / Word / Excel / PPT 解析',
    scope: '集团企业空间',
    risk: '只读',
    desc: '多格式文档解析与内容抽取：版面还原、表格识别、章节切分，供检索与摘要调用。',
  },
  {
    id: 'P-DB',
    name: '数据库查询',
    kind: 'enterprise',
    publisher: '智数中心',
    version: '1.1.0',
    status: 'enabled',
    nets: ['inet', 'gov', 'secret'],
    deps: '数据中心业务数据 API',
    scope: '集团企业空间',
    risk: '只读',
    desc: '对已授权业务数据源做结构化查询，字段级最小必要返回。',
  },
  {
    id: 'P-GIS',
    name: 'GIS 查询',
    kind: 'enterprise',
    publisher: '测绘地理信息中心',
    version: '0.9.8',
    status: 'disabled',
    nets: ['gov', 'secret'],
    deps: 'QGIS Server / PostGIS 空间 API',
    scope: '内网空间服务',
    risk: '只读',
    desc: '基于授权服务目录查询空间要素、图层与范围关系，返回可引用资源列表。',
  },
  {
    id: 'P-REVIEW',
    name: '审图助手',
    kind: 'enterprise',
    publisher: '审图中心',
    version: '0.7.4',
    status: 'disabled',
    nets: ['secret'],
    deps: '审图平台 WebCAD 预览接口',
    scope: '涉密内网',
    risk: '写操作需确认',
    desc: '对图纸做规范符合性核查，返回问题清单与依据条款，写操作需人工确认。',
  },
  {
    id: 'P-GOV',
    name: '政务模型调用',
    kind: 'enterprise',
    publisher: '平台管理员',
    version: '1.0.0',
    status: 'disabled',
    nets: ['gov'],
    deps: '九江市统一政务模型 Token',
    scope: '政务网',
    risk: '只读',
    desc: '经政务模型网关调用，服务端持有 Token，记录实际用量与配额。',
  },
  {
    id: 'P-REPORT',
    name: '周报生成',
    kind: 'personal',
    publisher: '赵工',
    version: '0.3.1',
    status: 'enabled',
    nets: ['inet', 'gov', 'secret'],
    deps: '会话记录 / 任务中心',
    scope: '仅本人',
    risk: '写操作需确认',
    desc: '按本周会话与任务自动汇总周报草稿，输出前需本人确认。',
  },
  {
    id: 'P-FILES',
    name: '项目资料整理',
    kind: 'personal',
    publisher: '孙所',
    version: '0.2.6',
    status: 'enabled',
    nets: ['inet', 'gov', 'secret'],
    deps: '数据中心 / 工作区文件',
    scope: '规划一所',
    risk: '写操作需确认',
    desc: '按项目归集资料、去重命名并生成目录说明。',
  },
  {
    id: 'P-TIME',
    name: '影像对比分析',
    kind: 'personal',
    publisher: '陈工',
    version: '0.1.9',
    status: 'disabled',
    nets: ['gov', 'secret'],
    deps: 'GIS 查询 / 影像服务',
    scope: '内网影像',
    risk: '只读',
    desc: '两个季度影像的同视口对比与变化图斑初筛。',
  },
  {
    id: 'P-BIZ',
    name: '经营数据解读',
    kind: 'personal',
    publisher: '王五',
    version: '0.4.0',
    status: 'disabled',
    nets: ['inet', 'gov', 'secret'],
    deps: '财务接口（待授权）',
    scope: '待授权',
    risk: '只读',
    desc: '读取授权财务指标并生成解读要点，未授权时仅返回口径说明。',
  },
  {
    id: 'P-TILE',
    name: '影像切片服务',
    kind: 'enterprise',
    publisher: '测绘地理信息中心',
    version: '1.0.0-rc.2',
    status: 'review',
    nets: ['inet', 'gov', 'secret'],
    deps: 'QGIS Server / Cesium / 对象存储',
    scope: '集团企业空间',
    risk: '只读',
    desc: '把云空间图集按标准切片发布为地图服务，供一张图与 AI 读图调用；需校验坐标系与访问范围。',
    submittedAt: '2026-11-06 10:24',
    requester: '测绘地理信息中心',
  },
  {
    id: 'P-CAD',
    name: 'CAD 图纸解析',
    kind: 'enterprise',
    publisher: '智数中心',
    version: '0.8.1',
    status: 'review',
    nets: ['inet', 'gov', 'secret'],
    deps: '云空间 dwg 解析引擎',
    scope: '集团企业空间',
    risk: '只读',
    desc: '解析 dwg/dxf 的图层、标注与用地边界，输出结构化要素供 AI 检索；需确认不落库涉密图纸。',
    submittedAt: '2026-11-07 09:05',
    requester: '智数中心',
  },
]

/**
 * 通知中心：跨模块的统一消息流。导航上不再显示任何计数，未读统一收敛到左上角铃铛。
 */
export const notifications = [
  { id: 'N1', kind: 'ok', title: '自动化任务已完成', body: '「周报草稿生成」完成，草稿已入任务中心待确认', time: '10 分钟前', nav: 'automation' },
  { id: 'N2', kind: 'danger', title: '越权访问被拒绝', body: '赵工尝试读取「审批项目台账」，已在数据中心 API 拦截并写入审计', time: '32 分钟前', nav: 'datacenter' },
  { id: 'N3', kind: 'warn', title: '精选应用待审核', body: '「方案比选助手」已提交接入验证，等待应用审核员处理', time: '1 小时前', nav: 'apps' },
  { id: 'N4', kind: '', title: '授权范围变更', body: '董事长新增 all-org 范围，于本域实例即时生效', time: '3 小时前', nav: 'settings', unread: false },
  { id: 'N5', kind: '', title: '客户端更新预告', body: '1.0.1 离线包将于 11-08 22:00 分发，更新后需重新认证', time: '昨天', nav: 'settings', unread: false },
  { id: 'N6', kind: 'ok', title: '共享文档有新编辑', body: '孙所 更新了「中心城区公示项目梳理」的表格口径', time: '8 分钟前', nav: 'drive' },
  { id: 'N7', kind: '', title: '即时通讯有新消息', body: '规划一所 发来 2 条消息', time: '12 分钟前', nav: 'im' },
  { id: 'N8', kind: 'warn', title: '企业公告发布', body: '「2026 年度城市体检数据补录」已发布，请各部门按期反馈', time: '1 小时前', nav: 'notice' },
]

export const apps = [
  {
    id: 'A-SURVEY', name: '公众意见征集', desc: '公示项目在线意见征集与统计', dept: '经营管理部', version: '1.0.3',
    nets: ['inet'], status: 'published', icon: 'inbox', maintainer: '周敏（经营管理部）',
    usage: '面向公众开放，登录后提交意见；不涉及内部数据',
    history: [{ version: '1.0.3', date: '2026-10-18', note: '增加意见分类统计' }, { version: '1.0.0', date: '2026-09-02', note: '首次发布' }],
  },
  {
    id: 'A-PLOT', name: '出图服务', desc: '成图排版、批量打印与成果交付登记', dept: '图文中心', version: '1.4.0',
    nets: ['secret'], status: 'published', icon: 'image', maintainer: '孙工（图文中心）',
    usage: '仅涉密内网可用；调用内网打印队列与成果库',
    history: [{ version: '1.4.0', date: '2026-09-20', note: '批量打印队列优化' }, { version: '1.2.0', date: '2026-05-11', note: '成果交付登记' }],
  },
  {
    id: 'A-TIJIAN', name: '城市体检', desc: '指标采集、体检报告与问题图斑归集', dept: '智数中心', version: '0.8.2',
    nets: ['gov'], status: 'review', icon: 'pulse', maintainer: '刘洋（智数中心）', submittedAt: '2026-11-05 09:12', requester: '智数中心',
    usage: '政务网部署；读取政务授权指标数据',
    history: [{ version: '0.8.2', date: '2026-10-26', note: '提交接入验证，待审核' }],
  },
  {
    id: 'A-ARCHIVE', name: '城建档案借阅', desc: '历史归档图纸与竣工资料借阅申请', dept: '档案室', version: '0.6.1',
    nets: ['gov'], status: 'review', icon: 'book', maintainer: '吴倩（档案室）', submittedAt: '2026-11-06 15:40', requester: '档案室',
    usage: '政务网部署；借阅申请需档案室审批',
    history: [{ version: '0.6.1', date: '2026-10-21', note: '调整借阅审批流' }],
  },
  {
    id: 'A-DEMO', name: '方案比选助手', desc: '多方案指标对比与图面生成（部门自建）', dept: '规划一所', version: '0.2.0',
    nets: ['inet'], status: 'draft', icon: 'spark', maintainer: '孙所（规划一所）',
    usage: '互联网环境演示版，仅部门内部试用',
    history: [{ version: '0.2.0', date: '2026-10-30', note: '草稿：接入验证未通过（缺少身份回调）' }],
  },
]

export const quickPrompts = [
  { id: 'q1', label: '查阅项目公示', prompt: '汇总中心城区 2026 年公示项目的建设单位与公示期' },
  { id: 'q2', label: '查看空间数据', prompt: '列出浔阳区范围内我可见的三维与影像资源' },
  { id: 'q3', label: '核对规划口径', prompt: '引用国土空间总体规划，说明中心城区开发强度管控要求' },
  { id: 'q4', label: '生成周报草稿', prompt: '生成本周规划一所工作进展周报，引用任务记录' },
]

/** 会话种子：messages 含工具执行步骤，供历史会话回放 */
export const sampleConversations = [
  {
    id: 'C-1', kind: 'work', title: '中心城区公示项目梳理', time: '今天 09:41', model: 'JG-Enterprise（企业云）', turns: 6, status: 'done',
    workspace: '公示项目',
    messages: [
      { role: 'user', text: '汇总中心城区 2026 年公示项目的建设单位与公示期', time: '09:41' },
      { role: 'assistant', text: '已检索到 86 条公示记录，按建设单位归并为 12 组。公示期集中在 9—10 月，其中 3 个项目已过公示期。\n\n引用：R-PROJ-PUB（中心城区项目公示信息 2026）', time: '09:41', citations: ['R-PROJ-PUB'],
        steps: [
          { tool: '数据中心检索', detail: 'type=bizdata · keyword=公示', status: 'ok', ms: 820 },
          { tool: '文档解析', detail: '表格抽取 86 行 · 字段脱敏校验', status: 'ok', ms: 1600 },
        ] },
      { role: 'user', text: '把已过公示期的项目单独列出来', time: '09:43' },
      { role: 'assistant', text: '已过公示期 3 项：滨江路整治、十里片区学校、浔阳区停车场。需要我生成一份可直接发文的清单吗？', time: '09:43' },
    ],
  },
  {
    id: 'C-2', kind: 'work', title: '浔阳区三维与影像资源核对', time: '昨天 16:20', model: 'JG-Enterprise（企业云）', turns: 4, status: 'done',
    workspace: '空间数据',
    messages: [
      { role: 'user', text: '列出浔阳区范围内我可见的三维与影像资源', time: '16:20' },
      { role: 'assistant', text: '空间范围检索命中 2 项：倾斜摄影模型（浔阳区 42 km²，3DTiles）与天地图影像底图（在线引用）。1:500 地形图不在本网目录内。', time: '16:21', citations: ['R-3D-2026-XY', 'R-TDT-2026'],
        steps: [{ tool: '空间范围检索', detail: 'bbox=115.96,29.70,116.02,29.75', status: 'ok', ms: 2400 }] },
    ],
  },
  {
    id: 'C-3', kind: 'chat', title: '国土空间规划开发强度口径', time: '10-31 14:05', model: '个人 API Key', turns: 8, status: 'done',
    workspace: '规划口径',
    messages: [
      { role: 'user', text: '中心城区开发强度管控要求是什么？引用规划文本原文。', time: '14:05' },
      { role: 'assistant', text: '总体规划第 7 章明确中心城区新建住宅容积率上限 2.5、建筑密度不超过 30%；历史街区另有专项规定。已定位到原文第 112—115 页。', time: '14:06', citations: ['R-DOC-GH-2021'],
        steps: [{ tool: '全文检索', detail: 'keyword=开发强度 · 命中 6 段', status: 'ok', ms: 1300 }] },
    ],
  },
  {
    id: 'C-4', kind: 'chat', title: '交通流量统计方法', time: '昨天 11:12', model: 'JG-Enterprise（企业云）', turns: 5, status: 'done',
    workspace: '交通专项',
    messages: [
      { role: 'user', text: '统计口径里，交叉口转向流量应该怎么合并？', time: '11:12' },
      { role: 'assistant', text: '按进口道方向分组统计，再按转向（左转 / 直行 / 右转）归并；高峰小时系数建议取 15 分钟峰值乘以 4，并在报告里注明观测时段。', time: '11:13' },
    ],
  },
  {
    id: 'C-5', kind: 'work', title: '城市体检指标口径', time: '11-06 15:48', model: 'JG-Enterprise（企业云）', turns: 7, status: 'done',
    workspace: '城市体检',
    messages: [
      { role: 'user', text: '体检指标里“社区公共服务设施步行覆盖率”用什么数据算？', time: '15:48' },
      { role: 'assistant', text: '以居住用地为起点、15 分钟步行网络为范围，叠加教育、医疗、文化、体育四类设施点位，按居住人口加权计算覆盖率；数据来自一张图与公共服务设施台账。', time: '15:49' },
    ],
  },
  {
    id: 'C-6', kind: 'work', title: '用地指标测算复核', time: '11-05 10:20', model: '个人 API Key', turns: 3, status: 'done',
    workspace: '规划口径',
    messages: [
      { role: 'user', text: '按控规单元复核容积率与建筑密度是否超限', time: '10:20' },
      { role: 'assistant', text: '已比对 6 个控规单元，其中 2 个单元的容积率超过上限 0.15 与 0.08，建议在报审前调整强排方案。', time: '10:21' },
    ],
  },
  {
    id: 'C-7', kind: 'work', title: '公文格式校对', time: '11-04 16:05', model: 'JG-Enterprise（企业云）', turns: 4, status: 'done',
    workspace: '公文',
    messages: [
      { role: 'user', text: '校对这份请示的标题、附注和版记', time: '16:05' },
      { role: 'assistant', text: '发现 3 处问题：标题未写发文机关、附注缺少联系人、版记抄送顺序与主送不一致，已给出修改建议。', time: '16:06' },
    ],
  },
  {
    id: 'C-8', kind: 'work', title: '影像变化检测报告', time: '11-03 09:35', model: 'JG-Enterprise（企业云）', turns: 6, status: 'done',
    workspace: '影像',
    messages: [
      { role: 'user', text: '对比 Q2 与 Q3 影像，列出变化图斑', time: '09:35' },
      { role: 'assistant', text: '检出 3 处变化图斑，面积合计 1.86 公顷，集中在滨江路与十里片区；定量结论需专业复核。', time: '09:36' },
    ],
  },
  {
    id: 'C-9', kind: 'work', title: '项目评审意见汇总', time: '11-02 14:40', model: 'JG-Enterprise（企业云）', turns: 9, status: 'done',
    workspace: '评审',
    messages: [
      { role: 'user', text: '把本周 4 个项目的评审意见按专业归类', time: '14:40' },
      { role: 'assistant', text: '已归为规划、交通、市政、景观四类，共 28 条；其中 9 条为强制性意见，需在修改说明中逐条回应。', time: '14:41' },
    ],
  },
  {
    id: 'C-10', kind: 'chat', title: '三维模型轻量化方案', time: '11-01 11:05', model: '个人 API Key', turns: 5, status: 'done',
    workspace: '空间数据',
    messages: [
      { role: 'user', text: '倾斜摄影模型太大，怎么轻量化又不影响汇报效果？', time: '11:05' },
      { role: 'assistant', text: '建议按 LOD 分级切片、纹理重采样至 2048、剔除背面三角形；汇报场景保留 LOD2，量测场景另出 LOD3。', time: '11:06' },
    ],
  },
  {
    id: 'C-11', kind: 'chat', title: '一张图取数口径', time: '10-30 17:20', model: 'JG-Enterprise（企业云）', turns: 4, status: 'done',
    workspace: '一张图',
    messages: [
      { role: 'user', text: '一张图里的用地分类和国标不一致，以哪个为准？', time: '17:20' },
      { role: 'assistant', text: '对外报送以国标为准，内部分析可保留一张图细分代码；需要在成果里附代码对照表，避免口径混用。', time: '17:21' },
    ],
  },
]

export const tasks = [
  { id: 'T-1', title: '每日公示项目变更摘要 · 11-07 08:30', state: 'done', progress: 100, target: '定时任务 · 投递到工作消息', started: '08:30', createdAt: Date.now() - 3600_000 },
  { id: 'T-2', title: '本周工作小结草稿 · 11-07 17:00', state: 'running', progress: 62, target: '定时任务 · 投递到项目文档', started: '17:00', createdAt: Date.now() - 1800_000 },
  { id: 'T-3', title: '城市体检指标月度快照 · 11-01 09:00', state: 'queued', progress: 0, target: '定时任务 · 投递到云空间', started: '—', createdAt: Date.now() - 1800_000 },
  { id: 'T-4', title: '影像入库核验单 · 10-05 09:00', state: 'failed', progress: 34, target: '定时任务 · 投递到数据中心', started: '09:00', reason: '影像元数据未就绪，已重试 1 次', createdAt: Date.now() - 7200_000 },
]

export const automations = [
  { id: 'AU-1', name: '每日公示项目变更摘要', schedule: '每天 08:30', status: 'active', last: '今天 08:30 成功（更新 2 条）', next: '明天 08:30', owner: '孙所',
    prompt: '读取数据中心「中心城区公示项目」台账，比昨日快照，列出新增、变更与到期节点，按项目归并成 5 行以内的摘要。',
    deliver: '工作消息 · 规划一所', model: '系统默认模型',
    report: {
      title: '公示项目变更摘要', date: '2026年11月7日', period: '11月6日 08:30—11月7日 08:30（北京时间）',
      lead: '本期筛出 2 条实质变更，已排除仅调整排期、无新进展的项目。',
      items: [
        { h: '1. 浔阳区滨江片区控规调整进入公示', p: '11月6日，滨江片区控规调整方案在市局网站公示，公示期 30 天；用地性质由商住混合调整为居住为主，配套幼儿园一处。台账内原“商业占比 35%”字段需同步更新。', src: '数据中心 · 公示项目台账' },
        { h: '2. 十里片区中小学用地红线微调', p: '11月7日，十里片区中小学用地红线向东偏移 12 米，涉及 3 个地块；原方案的结构化指标不受影响，但成果图需重出。', src: '数据中心 · 公示项目台账' },
      ],
      note: '以上两条均需项目负责人本周内确认，未确认前不进入对外成果。',
    } },
  { id: 'AU-2', name: '本周工作小结草稿', schedule: '每周五 17:00', status: 'active', last: '11-06 17:00 成功', next: '11-13 17:00', owner: '赵工',
    prompt: '汇总本周本人在会话、项目与定时任务里产生的结论，生成 800 字以内的周报草稿，标注待确认项与责任人。',
    deliver: '项目文档 · 周报草稿.docx', model: '系统默认模型',
    report: {
      title: '本周工作小结草稿', date: '2026年11月6日', period: '11月2日—11月6日（本周）',
      lead: '本周共 4 个项目有实质推进，2 项需下周确认。',
      items: [
        { h: '1. 公示项目台账完成归并', p: '中心城区公示项目按 12 组归并，新增与到期节点已标注；表格成本列按财务口径重填，附对照说明一份。', src: '工作消息 · 规划一所' },
        { h: '2. 三维与影像核对结论成形', p: '2026Q3 影像底图核对完成，形成一页纸结论；差异位置 3 处，均已附截图。', src: '项目文档 · 三维核对' },
        { h: '3. 待确认项', p: '体检指标台账的基准年尚未明确；滨江片区商业占比字段需与公示口径对齐。', src: '智能笔记本 · 体检口径' },
      ],
      note: '草稿由 AI 依据本周会话与项目文档生成，提交前请本人核对待确认项。',
    } },
  { id: 'AU-3', name: '城市体检指标月度快照', schedule: '每月 1 日 09:00', status: 'active', last: '11-01 09:00 成功', next: '12-01 09:00', owner: '吴敏',
    prompt: '从云空间取「城市体检指标台账」，按指标口径生成月度快照表，并把口径变化单独列一节。',
    deliver: '云空间 · 规划一所 · 体检专班目录', model: '系统默认模型',
    report: {
      title: '城市体检指标月度快照', date: '2026年11月1日', period: '统计截至 10月31日（月度）',
      lead: '本月 18 项指标中 14 项与上月持平，3 项上升，1 项口径变更需说明。',
      items: [
        { h: '1. 指标完成情况', p: '18 项指标全部有值，无空项；其中社区服务设施覆盖率 86.4%（+2.1），公园绿地 500 米覆盖率 71.2%（+0.6）。', src: '云空间 · 城市体检指标台账' },
        { h: '2. 口径变更', p: '“老旧小区改造完成率”统计范围由中心城区扩大至市辖区，数值由 63% 变为 58%，需在对外口径中注明范围变化。', src: '云空间 · 城市体检指标台账' },
      ],
      note: '口径变更项已单独列出，建议在专班例会上确认后再对外引用。',
    } },
  { id: 'AU-4', name: '影像入库核验单', schedule: '每季度首月 5 日', status: 'paused', last: '10-05 失败（数据源未就绪）', next: '—', owner: '周晓',
    prompt: '航拍影像入库后核对范围、分辨率与元数据，生成核验单并列出不合格项。',
    deliver: '数据中心 · 影像库', model: '系统默认模型' },
]

export const tickets = [
  { id: 'W-2026-101', type: '入职', subject: '王磊 · 规划一所 · 助理规划师', net: '互联网', owner: '未分派', status: '待分派', due: '今天 18:00', created: '11-07 09:20',
    history: [{ time: '09:20', text: '由人事系统自动生成工单' }] },
  { id: 'W-2026-102', type: '调岗', subject: '赵婧 · 经营管理部 → 智数中心', net: '政务网', owner: '运维 · 周工', status: '处理中', due: '11-08 12:00', created: '11-06 16:40',
    history: [{ time: '11-06 16:40', text: '工单生成，撤销原部门授权' }, { time: '11-07 08:15', text: '周工接单，核对角色映射' }] },
  { id: 'W-2026-103', type: '借调', subject: '孙浩 · 借调至城市体检专班（至 2027-06-30）', net: '政务网', owner: '运维 · 陈工', status: '待复核', due: '11-07 20:00', created: '11-05 10:10',
    history: [{ time: '11-05 10:10', text: '工单生成，授予临时项目权限' }, { time: '11-06 09:30', text: '陈工完成开通，等待业务复核' }] },
  { id: 'W-2026-104', type: '离职', subject: '刘畅 · 图文中心', net: '涉密内网', owner: '运维 · 何工', status: '已闭环', due: '11-06 18:00', created: '11-06 08:00',
    history: [{ time: '11-06 08:00', text: '高优先级工单，账号停用' }, { time: '11-06 11:20', text: '会话终止、权限回收、复核留痕' }] },
]

export const feedback = [
  { id: 'F-1', kind: '缺陷', subject: '数据中心筛选后翻页会丢失类型条件', app: '九规智能中枢 客户端', task: '', status: '处理中', actor: '赵工', time: '今天 10:12' },
  { id: 'F-2', kind: '建议', subject: '希望任务详情能直接跳转到产出文件', app: '九规智能中枢 客户端', task: 'T-1', status: '待受理', actor: '孙所', time: '昨天 17:02' },
  { id: 'F-3', kind: '缺陷', subject: '方案比选助手启动时报身份回调失败', app: '方案比选助手', task: '', status: '已修复', actor: '孙所', time: '10-30 15:40' },
]

export const monitor = {
  services: [
    { name: '企业公共服务 API', status: 'ok', latency: '82 ms', uptime: '99.7%' },
    { name: '数据中心目录服务', status: 'ok', latency: '146 ms', uptime: '99.6%' },
    { name: '模型网关（企业云）', status: 'ok', latency: '1.2 s', uptime: '99.4%' },
    { name: '天地图影像服务（外部）', status: 'warn', latency: '2.8 s', uptime: '98.1%', note: '在线引用受服务方配额影响' },
    { name: '任务队列', status: 'ok', latency: '—', uptime: '99.8%' },
  ],
  storage: { used: 142, total: 512, unit: 'GB', note: '互联网目录不含涉密与政务影像' },
  failures: [
    { task: 'T-4 倾斜摄影轻量化切片', reason: '切片节点显存不足', at: '09:12', retry: '已回滚' },
    { task: '天地图瓦片拉取', reason: '外部服务 429 限流', at: '08:40', retry: '已自动重试 2 次' },
  ],
}

export const knowledgeDocs = [
  { id: 'K-1', title: '九江市国土空间总体规划（2021—2035）', type: '规划成果', dept: '国土空间规划所', updated: '2026-08-22', indexed: true, chunks: 1428, summary: '市级总体规划正式稿，含市域与中心城区两部分。' },
  { id: 'K-2', title: '中心城区开发强度管控细则（试行）', type: '制度文件', dept: '国土空间规划所', updated: '2026-06-12', indexed: true, chunks: 216, summary: '容积率、建筑密度、高度分区管控要求。' },
  { id: 'K-3', title: '城市体检指标体系说明（2026）', type: '技术导则', dept: '智数中心', updated: '2026-10-11', indexed: true, chunks: 188, summary: '48 项指标的采集口径与数据来源。' },
  { id: 'K-4', title: '九江学院项目审图意见汇总', type: '项目资料', dept: '建筑设计一所', updated: '2026-09-13', indexed: false, chunks: 0, summary: '待解析：图纸版本 V3.2 对应意见 34 条。' },
  { id: 'K-5', title: '公示项目台账（2026）', type: '业务数据', dept: '经营管理部', updated: '2026-10-30', indexed: true, chunks: 96, summary: '86 条公示记录的字段说明与统计口径。' },
]

export const auditSeed = [
  { time: '09:41:22', actor: '赵工', action: 'resource.read', object: 'R-DOC-GH-2021', result: 'allow', net: '互联网' },
  { time: '09:38:07', actor: '赵工', action: 'resource.search', object: 'keyword=公示', result: 'allow(7)', net: '互联网' },
  { time: '09:22:51', actor: '孙所', action: 'tool.invoke', object: 'P-DOC / 文档解析', result: 'allow', net: '互联网' },
  { time: '09:05:13', actor: '赵工', action: 'resource.read', object: 'R-OA-LEDGER', result: 'deny(403)', net: '互联网' },
]

/* --------------------------- 云浏览器与凭据托管 --------------------------- */

/**
 * 云浏览器：浏览器实例运行在企业数据中心，客户端只接收画面与键鼠事件。
 * 凭据由企业凭据库（KMS 信封加密）托管，只在会话内注入到目标系统，客户端不可查看、不可导出。
 */
export const cloudSystems = [
  { id: 'CB-1', name: '住建部四库一平台', host: 'jzsc.mohurd.gov.cn', net: 'inet', auth: '账号密码', level: 'public', approval: 'none', scopes: ['public', 'internal'], credId: 'CR-1', status: '可用', lastUsed: '今天 09:40', desc: '企业资质、人员与业绩查询；外部网站，仅查询公开与本单位数据。' },
  { id: 'CB-2', name: '九江市公共资源交易中心', host: 'ggzy.jiujiang.gov.cn', net: 'inet', auth: '账号密码', level: 'public', approval: 'none', scopes: ['public', 'internal'], credId: 'CR-2', status: '可用', lastUsed: '昨天 15:12', desc: '招标公告、投标报名与保证金查询；不承载内部图纸。' },
  { id: 'CB-3', name: '江西省自然资源电子政务平台', host: 'zrzy.jiangxi.gov.cn', net: 'gov', auth: '数字证书 + 口令', level: 'internal', approval: 'dept', scopes: ['dept:规划一所', 'all-org'], credId: 'CR-3', status: '可用', lastUsed: '11-05 10:20', desc: '规划条件、用地报批与政务公文；仅政务网实例可连。' },
  { id: 'CB-4', name: '九江市工程建设项目审批管理系统', host: 'sp.jiujiang.gov.cn', net: 'gov', auth: '账号密码', level: 'internal', approval: 'dept', scopes: ['dept:规划一所', 'all-org'], credId: 'CR-4', status: '维护中', lastUsed: '11-03 16:05', desc: '施工图联合审查与并联审批；提交类操作需二次确认。' },
  { id: 'CB-5', name: '集团 OA 与公文系统', host: 'oa.jgharness.local', net: 'secret', auth: '企业 SSO（无口令）', level: 'secret', approval: 'secret', scopes: ['secret', 'all-org'], credId: 'CR-5', status: '可用', lastUsed: '11-06 08:50', desc: '涉密公文流转；只在涉密内网实例打开，禁用剪贴板与文件外发。' },
]

export const cloudCredentials = [
  { id: 'CR-1', systemId: 'CB-1', account: 'jgjt_****_01', secretRef: 'vault://jg/cloud/cr-1', algo: 'AES-256-GCM（KMS 信封加密）', rotated: '2026-09-18', owner: '平台运维 · 何工', export: '禁止导出', inject: '仅会话内注入' },
  { id: 'CR-2', systemId: 'CB-2', account: 'jjgh_****_02', secretRef: 'vault://jg/cloud/cr-2', algo: 'AES-256-GCM（KMS 信封加密）', rotated: '2026-08-30', owner: '经营管理部 · 周敏', export: '禁止导出', inject: '仅会话内注入' },
  { id: 'CR-3', systemId: 'CB-3', account: 'CA 证书 + jg_****', secretRef: 'vault://jg/cloud/cr-3', algo: 'KMS 托管 + 证书私钥不可导出', rotated: '2026-10-12', owner: '平台运维 · 陈工', export: '禁止导出', inject: '仅政务网会话注入' },
  { id: 'CR-4', systemId: 'CB-4', account: 'sp_****_04', secretRef: 'vault://jg/cloud/cr-4', algo: 'AES-256-GCM（KMS 信封加密）', rotated: '2026-07-21', owner: '经营管理部 · 周敏', export: '禁止导出', inject: '仅会话内注入' },
  { id: 'CR-5', systemId: 'CB-5', account: 'SSO（不托管口令）', secretRef: '—', algo: '企业 IdP 联邦认证', rotated: '—', owner: '集团信息中心', export: '不适用', inject: '不注入口令' },
]

export const cloudSessions = [
  { id: 'CS-1107-01', systemId: 'CB-1', user: '孙所', started: '10:12', ttl: '剩余 06:20', state: 'active', watermark: '孙所 · 规划一所 · 2026-11-07', record: 'REC-1107-01', ops: 7, note: '查询类操作 7 次，无下载' },
  { id: 'CS-1106-03', systemId: 'CB-2', user: '孙所', started: '昨天 16:17', ttl: '已结束', state: 'closed', watermark: '孙所 · 规划一所 · 2026-11-06', record: 'REC-1106-03', ops: 31, note: '会话 23 分钟，录屏已归档' },
]

export const cloudPolicy = [
  { title: '凭据不落地', text: '账号、口令与证书私钥只存于企业凭据库，按 KMS 信封加密；客户端、日志与界面只出现掩码，任何角色都不能导出明文。' },
  { title: '短时令牌', text: '一次会话一张票，默认 15 分钟，绑定员工、系统、网络与实例；到期强制断开，不产生可复用的长效 Cookie。' },
  { title: '水印与录屏', text: '画面叠加姓名、单位与时间水印；涉及政务与涉密的会话全程录屏，录屏与审计同源，保留期按本域制度。' },
  { title: '网络与实例隔离', text: '云浏览器实例按网络分别部署，互联网实例不接政务与涉密系统；禁止跨网复制、粘贴与文件外发。' },
  { title: '审批与二次确认', text: '政务系统首次开通需部门负责人审批；提交、签章、缴费等写操作在会话内再次确认，并记录操作对象。' },
  { title: '全量审计', text: '打开、断开、超时、拒绝与写操作全部留痕，含网络域、来源实例与请求标识；异常并发自动阻断。' },
]

/* ---------------------------- 项目 ---------------------------- */
export const projects = [
  {
    id: 'PRJ-01', name: '九江滨江片区城市更新', desc: '长江岸线更新与旧厂房改造，含控规调整、城市设计与汇报材料。',
    owner: '孙所', dept: '规划一所', members: 12, updated: '2026-11-06 18:20', convs: 24, files: 86,
    scope: 'dept:规划一所', nets: ['inet', 'gov'], pinned: true,
  },
  {
    id: 'PRJ-02', name: '庐山索道沿线风貌管控', desc: '沿线建筑高度、界面与景观视线分析，形成管控图则。',
    owner: '赵工', dept: '规划一所', members: 6, updated: '2026-11-05 09:40', convs: 11, files: 34,
    scope: 'unit:规划一所', nets: ['inet'], pinned: true,
  },
  {
    id: 'PRJ-03', name: '1958 工业厂区更新', desc: '工业遗产评估、更新方案与运营测算，含三维体块与效果图。',
    owner: '李总', dept: '集团总部', members: 18, updated: '2026-11-04 16:05', convs: 37, files: 142,
    scope: 'all-org', nets: ['inet', 'gov'], pinned: false,
  },
  {
    id: 'PRJ-04', name: '九江市工程审批改革配套', desc: '审批流程梳理、材料清单与系统对接说明。',
    owner: '孙所', dept: '规划一所', members: 9, updated: '2026-11-02 11:12', convs: 8, files: 27,
    scope: 'dept:规划一所', nets: ['gov'], pinned: false,
  },
  {
    id: 'PRJ-05', name: '集团知识库治理专项', desc: '制度、导则与成果的入库、解析与索引质量治理。',
    owner: '周董', dept: '集团总部', members: 5, updated: '2026-10-30 15:30', convs: 14, files: 63,
    scope: 'all-org', nets: ['inet', 'gov', 'secret'], pinned: false,
  },
  {
    id: 'PRJ-06', name: '城市体检指标口径', desc: '体检指标定义、数据来源与年度对比口径。',
    owner: '赵工', dept: '规划一所', members: 7, updated: '2026-10-28 10:05', convs: 6, files: 19,
    scope: 'unit:规划一所', nets: ['inet', 'gov'], pinned: false, personal: true,
  },
  {
    id: 'PRJ-P1', name: '车流量分析工具', desc: '路口流量统计与车型识别口径，含检测线设置与结果校验。',
    owner: '赵工', dept: '规划一所', members: 1, updated: '2026-11-07 15:05', convs: 0, files: 6,
    scope: 'user', nets: ['inet'], pinned: false, personal: true,
  },
  {
    id: 'PRJ-P2', name: '测试', desc: '临时试验场，验证工具链与输入输出。',
    owner: '赵工', dept: '规划一所', members: 1, updated: '2026-11-07 12:40', convs: 0, files: 2,
    scope: 'user', nets: ['inet'], pinned: false, personal: true,
  },
  {
    id: 'PRJ-P3', name: '建筑材质识别工具', desc: '外立面材质样本整理与识别结果复核。',
    owner: '赵工', dept: '规划一所', members: 1, updated: '2026-10-24 10:20', convs: 0, files: 4,
    scope: 'user', nets: ['inet'], pinned: false, personal: true,
  },
  {
    id: 'PRJ-P4', name: '2049观察', desc: '长期观察与素材归档，按主题持续积累。',
    owner: '赵工', dept: '规划一所', members: 1, updated: '2026-07-05 09:30', convs: 0, files: 11,
    scope: 'user', nets: ['inet'], pinned: false, personal: true,
  },
]

/* ------------------------- 企业插件市场 ------------------------- */
export const pluginMarket = [
  { id: 'M-01', section: '热门', name: '规范条文核查', desc: '按现行国标与地方导则核查图纸与文本，返回条款级依据', publisher: '审图中心', installed: true, scope: '企业公开' },
  { id: 'M-02', section: '热门', name: '用地指标测算', desc: '按控规与用地分类计算容积率、密度与配套指标', publisher: '智数中心', installed: true, scope: '企业公开' },
  { id: 'M-03', section: '热门', name: '公文格式校对', desc: '党政公文格式、称谓与编号校对，输出修改建议', publisher: '集团办公室', installed: false, scope: '企业公开' },
  { id: 'M-04', section: '热门', name: '造价指标库', desc: '查询同类项目单位造价与工程量指标', publisher: '财务部', installed: false, scope: '需授权' },
  { id: 'M-05', section: '新品推荐', name: '影像变化检测', desc: '两期航拍影像比对，输出变化图斑与面积统计', publisher: '测绘地理信息中心', installed: false, scope: '政务网' },
  { id: 'M-06', section: '新品推荐', name: '三维体块生成', desc: '由用地与高度约束生成体块模型，可导出汇报图', publisher: '智数中心', installed: true, scope: '企业公开' },
  { id: 'M-07', section: '新品推荐', name: '会议纪要整理', desc: '录音转写后按议定事项、责任人与时限成稿', publisher: '集团办公室', installed: false, scope: '企业公开' },
  { id: 'M-08', section: '新品推荐', name: '合同条款比对', desc: '比对合同版本差异并标记风险条款', publisher: '法务合规部', installed: false, scope: '需授权' },
  { id: 'M-09', section: '企业内部', name: '一张图取数', desc: '从集团一张图读取地块、管线与规划许可数据', publisher: '测绘地理信息中心', installed: true, scope: '涉密内网' },
  { id: 'M-10', section: '企业内部', name: 'OA 待办聚合', desc: '汇总 OA 待办、公文与会签节点，支持批量摘要', publisher: '信息中心', installed: true, scope: '全集团' },
  { id: 'M-11', section: '企业内部', name: '项目档案归档', desc: '按项目阶段自动归集成果、评审意见与版本记录', publisher: '档案室', installed: false, scope: '需授权' },
  { id: 'M-12', section: '企业内部', name: '财务共享取数', desc: '读取项目成本与预算执行，按角色返回口径', publisher: '财务部', installed: false, scope: '需授权' },
]

/* ===== 通知公告（企业发布） ===== */
export const notices = [
  {
    id: 'NT-01', title: '关于开展 2026 年度城市体检数据补录的通知', category: '通知', dept: '集团办公室', author: '郑立',
    time: '2026-11-07 09:00', pinned: true, unread: true,
    summary: '各所室按指标口径补齐 2026 年度体检数据，11 月 14 日前完成上报。',
    body: [
      '各所室、中心：',
      '为确保 2026 年度城市体检成果按期上报，现就数据补录工作通知如下。',
      '一、补录范围。2026 年度城市体检指标体系中，由各所室承担的生态、交通、市政、公共服务四类指标，凡缺项、口径不一致或数据截止时间早于 2026 年 9 月的，均需补录。',
      '二、口径要求。指标名称、单位、统计范围与《九江市城市体检指标体系（2026 版）》保持一致；涉及空间范围的指标须注明坐标系与图层来源，涉及人口的分母统一采用 2026 年 6 月末常住人口。',
      '三、时间安排。11 月 10 日前完成本部门数据自查，11 月 14 日 18:00 前通过企业云提交至「城市体检指标台账」，逾期未报的由智数中心统一催办并在专班周报中通报。',
      '四、责任分工。智数中心负责口径解释与台账汇总，测绘地理信息中心负责底图与空间范围核对，各所室指定一名数据联络人。',
      '集团办公室',
      '2026 年 11 月 7 日',
    ],
  },
  {
    id: 'NT-02', title: '企业云个人空间与共享池使用规范（试行）', category: '公告', dept: '智数中心', author: '吴敏',
    time: '2026-11-05 16:30', unread: true,
    summary: '个人 20 GB、部门共享池按审批扩容；共享文档默认开启在线协作与编辑留痕。',
    body: [
      '为规范企业云使用，现将有关规则公告如下。',
      '一、容量。每名员工个人空间 20 GB，部门共享池按项目需要申请扩容，扩容申请走 OA 工单，由智数中心审批。',
      '二、共享。文档、表格、演示共享给同事后即为共享文档、共享表格、共享演示，创建者与共享者均可在线编辑，编辑历史完整留存，可按版本回溯。',
      '三、安全。涉密内网文件不得共享至互联网实例；对外报送材料须经部门负责人确认，共享范围默认「项目内共享」，调整为「企业公开」需二次确认。',
      '四、清理。连续 12 个月未访问的个人文件进入冷存储，不再占用个人配额；项目结题后成果统一归档到项目空间。',
      '智数中心',
      '2026 年 11 月 5 日',
    ],
  },
  {
    id: 'NT-03', title: '九江滨江片区城市更新：从拆改留到运营前置', category: '文章', dept: '规划一所', author: '孙所',
    time: '2026-11-03 10:20', unread: false,
    summary: '以滨江片区为例，讨论更新项目在方案阶段同步明确运营主体与资金平衡的意义。',
    body: [
      '滨江片区的更新难点不在于拆多少、留多少，而在于更新之后谁来运营、靠什么平衡。',
      '过去的做法是先定方案、再找资金、最后想运营，结果常常是空间品质上去了，维护与运营却接不上。滨江片区试点把顺序倒过来：先明确运营主体与业态门槛，再倒推空间方案与土地供应条件。',
      '从已完成的三个街坊看，运营前置带来两个变化。一是公共空间的维护责任在方案阶段就落到具体主体，避免了交付即失管；二是资金平衡从「一次性土地出让」转向「长期现金流」，方案因此更愿意保留可产生租金的历史建筑，而不是一拆了之。',
      '需要提醒的是，运营前置不等于由政府包办运营。它要求规划方在方案阶段就把运营主体的能力边界写清楚，把该由市场做的部分留足弹性。',
    ],
  },
  {
    id: 'NT-04', title: '集团 2026 年第四季度安全生产与保密检查安排', category: '通知', dept: '集团办公室', author: '郑立',
    time: '2026-11-01 14:10', unread: false,
    summary: '11 月下旬开展安全生产与保密自查，涉密机房、测绘成果与外发材料为重点。',
    body: [
      '各部门：',
      '第四季度安全生产与保密检查定于 11 月 20 日至 11 月 27 日开展，请提前自查。',
      '检查重点包括：涉密机房出入登记与介质管理、测绘成果与外发材料的审批留痕、企业云共享范围设置、客户端更新与账号权限清理。',
      '自查发现的问题须在检查前完成整改；确因客观条件无法整改的，书面说明原因与计划。',
      '集团办公室',
      '2026 年 11 月 1 日',
    ],
  },
  {
    id: 'NT-05', title: '一张图取数口径更新说明（2026Q4）', category: '公告', dept: '测绘地理信息中心', author: '周晓',
    time: '2026-10-30 09:40', unread: false,
    summary: 'CGCS2000 坐标系、季度影像与用地分类三项口径同步更新，取数前请核对。',
    body: [
      '一张图 2026Q4 数据已更新，取数口径有三处变化。',
      '一、坐标系统一为 CGCS2000，历史数据如为西安 80 坐标系，取数时须先转换，不得直接叠加。',
      '二、影像底图更新至 2026Q3，历史年份影像保留归档，卷帘对比时注意期次标注。',
      '三、用地分类按最新国土空间规划用地分类执行，与原城乡用地分类的对照表见知识库「用地口径对照」。',
      '测绘地理信息中心',
      '2026 年 10 月 30 日',
    ],
  },
]

/* ===== 云空间（部门共享空间） ===== */
export const driveQuota = {
  total: 1024, unit: 'GB', used: 386, dept: '规划一所', members: 42,
  policy: '每个部门 1 TB 共享额度，部门内成员按岗位授权读写；跨部门共享走审批与审计',
}

/* 云空间：云空间 + 专班云，同一模块左右切换 */
export const cloudSpaces = [
  { id: 'CL-DEPT', name: '规划一所', kind: 'dept', title: '云空间 · 规划一所', status: 'active', members: 42, total: 1024, used: 386, note: '部门成员均可上传与查阅，按岗位授权读写' },
  { id: 'CL-TEAM-1', name: '城市体检专班', kind: 'team', title: '专班云', status: 'active', members: 9, total: 512, used: 126, note: '专班成员共用，跨部门成员按专班名单授权' },
  { id: 'CL-TEAM-2', name: '1958 更新专班', kind: 'team', title: '专班云', status: 'pending', members: 6, total: 512, used: 0, note: '申请已提交，待数据管理员审批' },
]

export const driveItems = [
  { id: 'D-01', name: '中心城区公示项目梳理', type: 'xlsx', size: '2.4 MB', owner: '赵工', dept: '规划一所', updated: '2026-11-07 09:20', shared: ['孙所', '李总'], scope: '项目内共享', tags: ['公示', '台账'] },
  { id: 'D-02', name: '浔阳区三维与影像核对记录', type: 'docx', size: '1.1 MB', owner: '赵工', dept: '规划一所', updated: '2026-11-06 17:40', shared: ['孙所'], scope: '部门可见', tags: ['影像', '核对'] },
  { id: 'D-03', name: '国土空间规划开发强度口径', type: 'pdf', size: '5.8 MB', owner: '智数中心', dept: '集团总部', updated: '2026-11-05 14:05', shared: ['全集团'], scope: '企业公开', tags: ['控规', '口径'] },
  { id: 'D-04', name: '九江市工程审批改革汇报', type: 'pptx', size: '12.6 MB', owner: '李总', dept: '集团总部', updated: '2026-11-04 11:30', shared: ['集团班子'], scope: '授权可见', tags: ['汇报'] },
  { id: 'D-05', name: '城市体检指标台账', type: 'xlsx', size: '860 KB', owner: '孙所', dept: '规划一所', updated: '2026-11-03 16:12', shared: ['规划一所'], scope: '部门可见', tags: ['体检'] },
  { id: 'D-06', name: '1958 工业厂区更新方案', type: 'pdf', size: '24.2 MB', owner: '李总', dept: '集团总部', updated: '2026-11-02 09:48', shared: ['项目组'], scope: '项目内共享', tags: ['更新'] },
  { id: 'D-07', name: '公文格式校对示例集', type: 'docx', size: '740 KB', owner: '集团办公室', dept: '集团总部', updated: '2026-11-01 15:22', shared: ['全集团'], scope: '企业公开', tags: ['公文'] },
  { id: 'D-08', name: '交通流量统计方法说明', type: 'docx', size: '1.6 MB', owner: '赵工', dept: '规划一所', updated: '2026-10-31 10:15', shared: ['项目部'], scope: '项目内共享', tags: ['交通'] },
  { id: 'D-09', name: '滨江片区正射影像图集（2026Q3）', type: 'atlas', size: '18.4 GB', owner: '周晓', dept: '测绘地理信息中心', updated: '2026-11-06 15:20', shared: ['规划一所', '项目部'], scope: '项目内共享', tags: ['影像', '图集', 'CGCS2000'] },
  { id: 'D-10', name: '中心城区基础地理数据库', type: 'gdb', size: '6.8 GB', owner: '吴敏', dept: '智数中心', updated: '2026-11-05 09:40', shared: ['全集团'], scope: '企业公开', tags: ['GDB', '基础地理', '图层'] },
  { id: 'D-11', name: '控规成果管线数据（分幅）', type: 'shp', size: '412 MB', owner: '孙所', dept: '规划一所', updated: '2026-11-03 11:05', shared: ['规划一所'], scope: '部门可见', tags: ['SHP', '管线', '控规'] },
  { id: 'D-12', name: '1958 厂区更新用地边界', type: 'dwg', size: '86 MB', owner: '李总', dept: '集团总部', updated: '2026-11-01 16:30', shared: ['项目组'], scope: '项目内共享', tags: ['CAD', '用地边界'] },
  { id: 'T-01', space: 'CL-TEAM-1', name: '城市体检指标衔接说明', type: 'docx', size: '520 KB', owner: '赵工', dept: '规划一所', updated: '2026-11-07 10:10', shared: ['体检专班'], scope: '专班可见', tags: ['体检', '口径'] },
  { id: 'T-02', space: 'CL-TEAM-1', name: '体检指标测算底表', type: 'xlsx', size: '1.8 MB', owner: '吴敏', dept: '智数中心', updated: '2026-11-06 14:20', shared: ['体检专班'], scope: '专班可见', tags: ['测算'] },
  { id: 'T-03', space: 'CL-TEAM-1', name: '部门共享池扩容申请表', type: 'pdf', size: '640 KB', owner: '孙所', dept: '规划一所', updated: '2026-11-05 11:05', shared: ['体检专班'], scope: '专班可见', tags: ['申请'] },
]

/* ===== 通讯录 ===== */
export const contacts = [
  { id: 'P-01', name: '赵工', duty: '规划设计师', dept: '规划一所', phone: '189****3210', mail: 'zhangsan@jgdi.cn', role: 'employee', tags: ['规划一所', '项目参与'] },
  { id: 'P-02', name: '孙所', duty: '所长', dept: '规划一所', phone: '189****7788', mail: 'lisi@jgdi.cn', role: 'dept', tags: ['部门负责人'] },
  { id: 'P-03', name: '李总', duty: '总经理', dept: '集团总部', phone: '189****9900', mail: 'wangjg@jgdi.cn', role: 'executive', tags: ['集团班子'] },
  { id: 'P-04', name: '周董', duty: '董事长', dept: '集团总部', phone: '189****6600', mail: 'chenmy@jgdi.cn', role: 'chairman', tags: ['集团班子'] },
  { id: 'P-05', name: '周晓', duty: '测绘工程师', dept: '测绘地理信息中心', phone: '189****5521', mail: 'zhoux@jgdi.cn', tags: ['测绘', '一张图'] },
  { id: 'P-06', name: '吴敏', duty: '数据中心运维', dept: '智数中心', phone: '189****3344', mail: 'wumin@jgdi.cn', tags: ['IT 运维'] },
  { id: 'P-07', name: '许静', duty: '财务主管', dept: '财务部', phone: '189****1122', mail: 'xujing@jgdi.cn', tags: ['财务'] },
  { id: 'P-08', name: '郑立', duty: '办公室文秘', dept: '集团办公室', phone: '189****0088', mail: 'zhengl@jgdi.cn', tags: ['公文'] },
  { id: 'P-09', name: '孙可', duty: '市政规划师', dept: '市政所', phone: '189****6677', mail: 'sunke@jgdi.cn', tags: ['市政'] },
  { id: 'P-10', name: '何洋', duty: '交通工程师', dept: '交通所', phone: '189****4455', mail: 'heyang@jgdi.cn', tags: ['交通'] },
]

/* ===== 即时通讯 ===== */
export const imThreads = [
  {
    id: 'IM-01', name: '规划一所', kind: 'group', members: 12, unread: 2, time: '10:24',
    dept: '规划一所', autoMembers: true, owner: '孙所',
    roster: [
      { name: '孙所', duty: '所长', dept: '规划一所', lead: true, source: 'hr' },
      { name: '赵工', duty: '规划设计师', dept: '规划一所', source: 'hr' },
      { name: '王磊', duty: '规划设计师', dept: '规划一所', source: 'hr' },
      { name: '赵婧', duty: '助理规划师', dept: '规划一所', source: 'hr' },
      { name: '孙浩', duty: '市政规划师', dept: '规划一所', source: 'hr' },
      { name: '刘畅', duty: '资料员', dept: '规划一所', source: 'hr' },
      { name: '陈工', duty: '安全管理员', dept: '规划一所', source: 'hr' },
      { name: '周晓', duty: '测绘工程师', dept: '规划一所', source: 'hr' },
      { name: '吴敏', duty: '数据中心运维', dept: '规划一所', source: 'hr' },
      { name: '许静', duty: '财务主管', dept: '规划一所', source: 'hr' },
      { name: '孙可', duty: '市政规划师', dept: '规划一所', source: 'hr' },
      { name: '何洋', duty: '交通工程师', dept: '规划一所', source: 'hr' },
    ],
    messages: [
      { from: '孙所', text: '中心城区公示项目的台账今天下班前汇总一版。', time: '09:41' },
      { from: '赵工', text: '收到，公示单位已归并到 12 组，下午出表。', time: '09:48' },
      { from: '周晓', text: '影像底图我这边已更新到 2026Q3，核对时用最新版。', time: '10:16' },
      { from: '许静', text: '表格里成本列按财务口径填，我补了一份对照说明。', time: '10:24', file: { itemId: 'D-02', name: '浔阳区三维与影像核对记录.docx', type: 'docx', size: '1.1 MB', online: false } },
      { from: '孙所', text: '体检指标台账也放群里，一起看口径。', time: '10:31', file: { itemId: 'D-05', name: '城市体检指标台账.xlsx', type: 'xlsx', size: '860 KB', online: false } },
      { from: '赵工', text: '公示项目梳理表在这，和台账能对上。', time: '10:35', file: { itemId: 'D-01', name: '中心城区公示项目梳理.xlsx', type: 'xlsx', size: '2.4 MB', online: false } },
      { from: '钱工', text: '群空间和附件权限我这边核对过了，30 天临时副本到期会自动清理。', time: '10:42' },
    ],
  },
  {
    id: 'IM-02', name: '孙所', kind: 'direct', members: 2, unread: 0, time: '昨天',
    roster: [{ name: '孙所', duty: '所长', dept: '规划一所', lead: true }, { name: '赵工', duty: '规划设计师', dept: '规划一所' }],
    messages: [
      { from: '孙所', text: '三维与影像核对的结论先给我一页纸。', time: '17:02' },
      { from: '赵工', text: '已整理成一页，附件如下，可直接在群里改。', time: '17:20', file: { itemId: 'D-02', name: '浔阳区三维与影像核对记录.docx', type: 'docx', size: '1.1 MB', online: false } },
    ],
  },
  {
    id: 'IM-03', name: '智数中心 · 专班', kind: 'group', members: 9, unread: 5, time: '昨天',
    owner: '吴敏', autoMembers: false, space: 'CL-TEAM-1', spaceName: '城市体检专班',
    roster: [
      { name: '吴敏', duty: '数据中心运维', dept: '智数中心', lead: true },
      { name: '赵工', duty: '规划设计师', dept: '规划一所' },
      { name: '钱工', duty: '运维主管', dept: '智数中心' },
      { name: '周晓', duty: '测绘工程师', dept: '测绘地理信息中心' },
      { name: '许静', duty: '财务主管', dept: '财务部' },
      { name: '陈工', duty: '安全管理员', dept: '智数中心' },
      { name: '孙可', duty: '市政规划师', dept: '市政所' },
      { name: '何洋', duty: '交通工程师', dept: '交通所' },
      { name: '郑立', duty: '办公室文秘', dept: '集团办公室' },
    ],
    messages: [
      { from: '吴敏', text: '企业云个人配额统一 20GB，部门共享池按申请扩容。', time: '15:10' },
      { from: '赵工', text: '规划一所申请 50GB 共享池，用于项目成果归档。', time: '15:22' },
      { from: '赵工', text: '指标衔接说明先放专班云，群里同步一版。', time: '15:34', file: { itemId: 'T-01', name: '城市体检指标衔接说明.docx', type: 'docx', size: '520 KB', online: false } },
      { from: '吴敏', text: '已登记工单，审批后生效，附件是申请表。', time: '15:40', file: { itemId: 'D-03', name: '部门共享池扩容申请表.pdf', type: 'pdf', size: '420 KB', online: false } },
    ],
  },
  { id: 'IM-04', name: '周晓', kind: 'direct', members: 2, unread: 1, time: '周一', messages: [{ from: '周晓', text: '一张图取数口径更新了，注意坐标系。', time: '11:05' }] },
]


/* ===== 教学园地 ===== */
export const academy = [
  { id: 'AC-P01', kind: 'classic', title: '滨江片区城市更新实施规划', fmt: '经典项目', dept: '规划一所', author: '总工办', time: '2026-10-30', size: '项目档案', award: '2026 年度江西省优秀城市规划设计一等奖', honor: '总工办优选', tags: ['省优一等奖', '城市更新'], summary: '以滨江旧工业岸线为对象，统筹更新单元划定、滨江公共空间与产业导入，形成可实施的更新项目库和分期计划。', outcomes: ['更新单元划定与项目库', '滨江公共空间设计方案', '产业与运营策划'], note: '方案与实施路径结合紧密，更新单元边界、资金平衡与运营主体关系清楚，可作为存量地区更新项目的样板。', source: '数据中心' },
  { id: 'AC-P02', kind: 'classic', title: '庐山风景名胜区沿线风貌管控研究', fmt: '经典项目', dept: '规划一所', author: '总工办', time: '2026-09-18', size: '项目档案', award: '2026 年度江西省优秀城市规划设计二等奖', honor: '总工办优选', tags: ['省优二等奖', '风貌管控'], summary: '围绕庐山索道及登山沿线，建立建筑高度、体量、色彩与视域通廊的分级管控规则，并形成沿线项目审查要点。', outcomes: ['风貌分级管控图则', '视域通廊分析', '项目审查要点清单'], note: '管控规则与项目审查衔接得好，图则表达简洁，可直接用于沿线方案前置审查。', source: '数据中心' },
  { id: 'AC-P03', kind: 'classic', title: '中心城区城市体检试点', fmt: '经典项目', dept: '智数中心', author: '总工办', time: '2026-08-22', size: '项目档案', award: '住建部城市体检试点优秀成果', honor: '总工办推荐', tags: ['试点优秀', '城市体检'], summary: '构建“指标—数据—诊断—行动”闭环，形成中心城区体检指标体系、问题地图与年度行动计划。', outcomes: ['体检指标体系', '问题地图与诊断报告', '年度行动计划'], note: '指标取数口径与数据中台衔接完整，问题地图能直接支撑年度项目安排，建议作为集团体检项目的标准范式。', source: '数据中心' },
  { id: 'AC-01', kind: 'video', title: '国土空间规划编制办法（2026 修订）要点解读', fmt: '视频', duration: '42:18', dept: '规划一所', author: '孙所', time: '2026-11-06', size: '1.2 GB', tags: ['编制办法', '必修'], summary: '逐条对照修订条款，重点讲三条控制线划定、规划分区与传导机制的改动。', chapters: ['修订背景与总体框架', '三条控制线划定变化', '规划分区与用途管制', '传导机制与实施监督'], source: '数据中心' },
  { id: 'AC-02', kind: 'video', title: 'GIS 空间分析实操：缓冲区、叠加与邻近分析', fmt: '视频', duration: '28:40', dept: '智数中心', author: '吴敏', time: '2026-11-04', size: '860 MB', tags: ['GIS', '实操'], summary: '以中心城区数据为例，演示缓冲区生成、图层叠加与邻近分析的完整流程。', chapters: ['数据准备与坐标系', '缓冲区与叠加', '邻近分析与结果出图'], source: '数据中心' },
  { id: 'AC-03', kind: 'video', title: '城市体检指标取数与校核口径', fmt: '视频', duration: '36:05', dept: '测绘地理信息中心', author: '周晓', time: '2026-11-02', size: '1.1 GB', tags: ['城市体检', '口径'], summary: '按 2026 版指标体系讲取数来源、统计单元与异常值处理，配套台账模板。', chapters: ['指标体系结构', '取数来源与统计单元', '异常值处理与复核'], source: '数据中心' },
  { id: 'AC-04', kind: 'doc', title: '九江市城市体检指标体系（2026 版）', fmt: 'PDF', dept: '集团总部', author: '郑立', time: '2026-10-28', size: '8.6 MB', pages: 46, tags: ['指标', '现行'], summary: '集团现行体检指标体系全文，含生态、交通、市政、公共服务四类指标的定义与计算口径。', source: '数据中心' },
  { id: 'AC-05', kind: 'doc', title: '控规编制技术要点内部讲义', fmt: 'DOCX', dept: '规划一所', author: '孙所', time: '2026-10-20', size: '2.4 MB', pages: 32, tags: ['控规', '讲义'], summary: '内部培训讲义，覆盖控规编制流程、图纸深度要求与常见退回意见。', source: '数据中心' },
  { id: 'AC-06', kind: 'spec', title: 'GB/T 21010-2017 土地利用现状分类', fmt: 'PDF', dept: '集团总部', author: '技术委员会', time: '2026-09-30', size: '1.8 MB', pages: 24, tags: ['国家标准', '用地分类'], summary: '现行土地利用现状分类国家标准，用于用地口径核对与图斑归类。', source: '数据中心' },
  { id: 'AC-07', kind: 'spec', title: '国土空间调查、规划、用途管制用地分类指南', fmt: 'PDF', dept: '集团总部', author: '技术委员会', time: '2026-09-12', size: '6.2 MB', pages: 58, tags: ['行业规范', '用途管制'], summary: '用地分类与用途管制衔接的行业指南，含与GB/T 21010的对照表。', source: '数据中心' },
  { id: 'AC-08', kind: 'doc', title: '公文写作与格式校对手册', fmt: 'DOCX', dept: '集团办公室', author: '郑立', time: '2026-09-01', size: '1.1 MB', pages: 18, tags: ['公文', '格式'], summary: '集团公文格式、行文规则与常见错误的校对手册，附检查清单。', source: '数据中心' },
  { id: 'AC-09', kind: 'doc', title: '城市更新单元划定与资金平衡测算指引', fmt: 'PDF', dept: '规划一所', author: '总工办', time: '2026-08-28', size: '5.4 MB', pages: 38, tags: ['城市更新', '资金平衡'], summary: '梳理更新单元划定的边界条件、地价与改造成本测算方法，并给出资金平衡方案编制模板。', source: '数据中心' },
  { id: 'AC-10', kind: 'video', title: 'Cesium 三维场景搭建与性能调优', fmt: '视频', duration: '33:12', dept: '智数中心', author: '吴敏', time: '2026-08-25', size: '980 MB', tags: ['Cesium', '三维'], summary: '从地形与影像服务接入讲到模型轻量化、瓦片调度与帧率优化，配套可复用的场景配置。', chapters: ['三维服务与坐标基准', '模型轻量化与瓦片组织', '渲染性能诊断与调优'], source: '数据中心' },
  { id: 'AC-11', kind: 'video', title: '控规图则表达与审查要点', fmt: '视频', duration: '25:40', dept: '规划一所', author: '孙所', time: '2026-08-21', size: '620 MB', tags: ['控规', '图则'], summary: '结合退回案例讲图则的用地、指标、配套设施表达深度，以及审查时的高频问题。', chapters: ['图则构成与表达深度', '指标与配套设施标注', '常见退回意见复盘'], source: '数据中心' },
  { id: 'AC-12', kind: 'doc', title: '项目投标技术标编制要点', fmt: 'DOCX', dept: '集团办公室', author: '郑立', time: '2026-08-18', size: '1.6 MB', pages: 26, tags: ['投标', '技术标'], summary: '技术标章节结构、评分点对应写法与案例素材组织方式，附目录模板。', source: '数据中心' },
  { id: 'AC-13', kind: 'spec', title: 'GB 50137-2011 城市用地分类与规划建设用地标准', fmt: 'PDF', dept: '集团总部', author: '技术委员会', time: '2026-08-14', size: '3.2 MB', pages: 30, tags: ['国家标准', '用地分类'], summary: '城市规划用地分类与建设用地标准，用于总规、控规阶段的用地口径核对。', source: '数据中心' },
  { id: 'AC-14', kind: 'doc', title: '城市体检问题地图制图规范', fmt: 'PDF', dept: '智数中心', author: '周晓', time: '2026-08-10', size: '2.8 MB', pages: 22, tags: ['城市体检', '制图'], summary: '问题地图的图层组织、符号配色、分级表达与成果输出规范，含图例模板。', source: '数据中心' },
  { id: 'AC-15', kind: 'video', title: 'ArcGIS Pro 空间统计与热点分析', fmt: '视频', duration: '31:20', dept: '智数中心', author: '吴敏', time: '2026-08-06', size: '910 MB', tags: ['ArcGIS', '空间统计'], summary: '演示空间权重构建、热点分析、聚类结果解读与专题图输出。', chapters: ['空间权重与统计单元', '热点分析参数设置', '结果解读与专题图'], source: '数据中心' },
  { id: 'AC-16', kind: 'doc', title: '规划项目成果归档与命名规范', fmt: 'DOCX', dept: '集团总部', author: '技术委员会', time: '2026-07-30', size: '0.9 MB', pages: 16, tags: ['归档', '命名'], summary: '项目成果目录结构、文件命名、版本号与交付清单的统一要求。', source: '数据中心' },
  { id: 'AC-17', kind: 'spec', title: 'GB/T 51346-2019 城市绿地规划标准', fmt: 'PDF', dept: '集团总部', author: '技术委员会', time: '2026-07-24', size: '4.1 MB', pages: 42, tags: ['国家标准', '绿地规划'], summary: '城市绿地分类、布局与指标控制要求，用于绿地专项与控规配套核对。', source: '数据中心' },
]

export const academyStats = { done: 3, total: 20, source: '数据中心' }

/* ===== AI 可调用工具（模块能力目录） ===== */
export const aiTools = [
  { name: 'drive_search', label: '检索云空间', target: '云空间', args: '{"q":"公示"}', desc: '按关键词与文件类型检索云空间资产，返回文件名、类型、归属、共享范围与可编辑性。' },
  { name: 'drive_read', label: '读取文档/图集/数据库', target: '云空间', args: '{"id":"D-02"}', desc: '读取指定资产：文档返回正文，表格返回单元格矩阵，演示返回分页要点，图集与数据库返回图层、坐标与元数据。' },
  { name: 'notice_list', label: '查询通知公告', target: '通知公告', args: '{"q":"体检"}', desc: '检索集团通知、公告与文章，返回标题、发布单位、时间与正文摘要。' },
  { name: 'academy_search', label: '检索教学资源', target: '教学园地', args: '{"q":"GIS"}', desc: '检索教学园地中来自数据中心的学习文件与经典项目，返回标题、类型、时长或页数、所属部门。' },
  { name: 'contacts_find', label: '查询通讯录', target: '通讯录', args: '{"q":"测绘"}', desc: '按姓名、岗位或部门查找同事，返回部门、岗位与联系方式。' },
  { name: 'im_send', label: '发送即时消息', target: '即时通讯', args: '{"id":"IM-02","text":"..."}', desc: '向指定会话发送消息，写审计；仅限已授权会话。' },
  { name: 'notice_read', label: '读取公告正文', target: '通知公告', args: '{"id":"NT-01"}', desc: '读取指定通知公告的正文段落、发布单位、作者与时间。' },
  { name: 'notebook_search', label: '智能笔记本检索', target: '智能笔记本', args: '{"q":"用地分类"}', desc: '在员工所选专题笔记本的引用范围内检索数据中心资源，返回资源、版本、段落定位与摘要；不复制原始文件。' },
  { name: 'resource_query', label: '查询空间资源', target: '数据中心', args: '{"q":"影像"}', desc: '按名称与关键词查询数据中心的空间资源，返回坐标范围、密级、授权范围与更新期次。' },
  { name: 'task_create', label: '创建任务', target: '任务', args: '{"title":"...","prompt":"..."}', desc: '把一段需求登记为任务并分配执行，返回任务编号与初始状态。' },
]


/**
 * 职能授权（PRD 2.2）：演示账号保持六人，但每人的“职能”按 PRD 角色字典挂载，
 * 决定其在管理后台可进入的后台分组；授予/回收均写审计。
 */
export const duties = {
  employee: [],
  dept: ['dataAdmin'],
  executive: ['appReviewer', 'securityAdmin'],
  chairman: [],
  ops: ['ops', 'appReviewer'],
  guest: [],
}

export const dutyCatalog = [
  { code: 'ops', label: '平台运维 / 管理员', scope: '平台级权限与操作审计相结合', entry: '运维管理平台' },
  { code: 'dataAdmin', label: '数据管理员', scope: '在授权数据集、部门或来源范围内管理', entry: '数据管理后台' },
  { code: 'securityAdmin', label: '安全管理员', scope: '按安全管理职责独立授权', entry: '安全后台' },
  { code: 'appReviewer', label: '应用审核员', scope: '在指定网络 / 业务范围内审核', entry: '应用审核' },
  { code: 'appDeveloper', label: '应用开发者', scope: '管理其有权负责的应用及发布流程', entry: '应用注册与版本' },
  { code: 'knowledgeAdmin', label: '知识管理员', scope: '智能笔记本目录、专题与权限维护', entry: '智能笔记本管理' },
]

/** 组织模型（PRD 2.1）：集团 → 法人单位 → 多层级部门 → 员工 → 任职关系（支持一人多岗） */
export const orgUnits = [
  {
    id: 'U-GROUP', name: '九江市规划设计集团', kind: '集团',
    departments: [
      { id: 'D-HQ-ZS', name: '智数中心', unit: '集团总部', head: '刘洋', parent: 'U-GROUP' },
      { id: 'D-HQ-JY', name: '经营管理部', unit: '集团总部', head: '周敏', parent: 'U-GROUP' },
      { id: 'D-HQ-BG', name: '综合办公室', unit: '集团总部', head: '钱工', parent: 'U-GROUP' },
    ],
  },
  {
    id: 'U-GH', name: '规划一所（法人单位）', kind: '全资子公司',
    departments: [
      { id: 'D-GH-GH', name: '规划一所', unit: '规划一所', head: '孙所', parent: 'U-GH' },
      { id: 'D-GH-TW', name: '图文中心', unit: '规划一所', head: '孙工', parent: 'U-GH' },
    ],
  },
  {
    id: 'U-CH', name: '测绘地理信息中心（法人单位）', kind: '控股子公司',
    departments: [
      { id: 'D-CH-CH', name: '测绘地理信息中心', unit: '测绘地理信息中心', head: '陈工', parent: 'U-CH' },
    ],
  },
]

export const orgMembers = [
  { id: 'M-01', name: '周董', role: 'chairman', unit: '集团总部', dept: '董事会', posts: [{ title: '董事长', from: '2019-03', main: true, range: '集团' }], accounts: ['inet', 'gov', 'secret'], status: '在职' },
  { id: 'M-02', name: '李总', role: 'executive', unit: '集团总部', dept: '总经理办公室', posts: [{ title: '总经理', from: '2020-05', main: true, range: '集团' }, { title: '兼任城市体检专班组长', from: '2025-02', main: false, range: '专班' }], accounts: ['inet', 'gov'], status: '在职' },
  { id: 'M-03', name: '钱工', role: 'ops', unit: '集团总部', dept: '综合办公室', posts: [{ title: '运维主管', from: '2021-06', main: true, range: '平台' }], accounts: ['inet', 'gov', 'secret'], status: '在职' },
  { id: 'M-04', name: '孙所', role: 'dept', unit: '规划一所', dept: '规划一所', posts: [{ title: '所长', from: '2018-09', main: true, range: '规划一所' }], accounts: ['inet', 'gov'], status: '在职' },
  { id: 'M-05', name: '赵工', role: 'employee', unit: '规划一所', dept: '规划一所', posts: [{ title: '规划设计师', from: '2023-07', main: true, range: '本岗' }], accounts: ['inet'], status: '在职' },
  { id: 'M-06', name: '郑总', role: 'guest', unit: '合作单位', dept: '—', posts: [], accounts: [], status: '外部' },
  { id: 'M-07', name: '刘洋', role: '', unit: '集团总部', dept: '智数中心', posts: [{ title: '智数中心主任', from: '2022-02', main: true, range: '智数中心' }, { title: '数据管理员', from: '2024-01', main: false, range: '测绘与规划数据' }], accounts: ['inet', 'gov', 'secret'], status: '在职' },
  { id: 'M-08', name: '周敏', role: '', unit: '集团总部', dept: '经营管理部', posts: [{ title: '经营管理部负责人', from: '2021-11', main: true, range: '集团总部' }], accounts: ['inet', 'gov'], status: '在职' },
  { id: 'M-09', name: '陈工', role: '', unit: '测绘地理信息中心', dept: '测绘地理信息中心', posts: [{ title: '测绘总工', from: '2019-04', main: true, range: '测绘中心' }, { title: '安全管理员', from: '2025-03', main: false, range: '涉密数据' }], accounts: ['inet', 'secret'], status: '在职' },
  { id: 'M-10', name: '孙工', role: '', unit: '规划一所', dept: '图文中心', posts: [{ title: '图文中心主任', from: '2020-08', main: true, range: '图文中心' }], accounts: ['inet', 'secret'], status: '在职' },
]

/** MCP / 工具台账（PRD 4.3）：名称、版本、接口、部署环境、所需权限、操作风险 */
export const toolLedger = [
  { id: 'drive_search', name: '云空间检索', version: '1.2.0', endpoint: 'GET /api/drive', env: '三网各自部署', perm: '云空间读', risk: '低', confirm: false, calls: 1842 },
  { id: 'drive_read', name: '云空间读取', version: '1.2.0', endpoint: 'GET /api/drive/item', env: '三网各自部署', perm: '云空间读', risk: '低', confirm: false, calls: 967 },
  { id: 'notice_list', name: '通知公告检索', version: '1.0.4', endpoint: 'GET /api/notices', env: '三网各自部署', perm: '公告读', risk: '低', confirm: false, calls: 421 },
  { id: 'notice_read', name: '公告正文读取', version: '1.0.4', endpoint: 'GET /api/notices', env: '三网各自部署', perm: '公告读', risk: '低', confirm: false, calls: 305 },
  { id: 'academy_search', name: '教学园地检索', version: '0.9.2', endpoint: 'GET /api/academy', env: '三网各自部署', perm: '教学资源读', risk: '低', confirm: false, calls: 268 },
  { id: 'contacts_find', name: '通讯录查询', version: '1.1.0', endpoint: 'GET /api/contacts', env: '三网各自部署', perm: '通讯录读', risk: '中', confirm: false, calls: 512 },
  { id: 'im_send', name: '即时消息发送', version: '1.0.0', endpoint: 'POST /api/im/send', env: '三网各自部署', perm: 'IM 写', risk: '高', confirm: true, calls: 96 },
  { id: 'notebook_search', name: '智能笔记本检索', version: '0.8.0', endpoint: 'GET /api/notebooks', env: '三网各自部署', perm: '笔记本读', risk: '低', confirm: false, calls: 733 },
  { id: 'resource_query', name: '资源目录查询', version: '1.3.1', endpoint: 'GET /api/resources', env: '数据中心本域', perm: '资源读（服务端判定）', risk: '中', confirm: false, calls: 1104 },
  { id: 'task_create', name: '任务创建', version: '1.0.2', endpoint: 'POST /api/tasks', env: '三网各自部署', perm: '任务写', risk: '中', confirm: true, calls: 88 },
]

/** 数据中心数据服务（PRD 5.4 数据服务）：对外复用目录的稳定接口与调用记录 */
export const dataServices = [
  { id: 'DS-01', name: '资源目录查询', method: 'GET', path: '/api/resources', scope: '按角色与网络授权', calls: 12840, latency: '86 ms', status: 'ok' },
  { id: 'DS-02', name: '资源详情与预览票据', method: 'GET', path: '/api/resource', scope: '单资源授权 + 短期票据', calls: 6421, latency: '112 ms', status: 'ok' },
  { id: 'DS-03', name: '空间范围检索', method: 'GET', path: '/api/spatial', scope: '已确认地理参考资源', calls: 1822, latency: '240 ms', status: 'ok' },
  { id: 'DS-04', name: '影像时间目录', method: 'GET', path: '/api/satellite', scope: '本域影像目录', calls: 918, latency: '64 ms', status: 'ok' },
  { id: 'DS-05', name: '资源登记（写入）', method: 'POST', path: '/api/resources/register', scope: '数据管理员', calls: 37, latency: '158 ms', status: 'ok' },
]

/** 统一消息中心聚合（PRD 8.1 消息中心：未读提醒、待办跳转、运维警报） */
export const messagesSeed = [
  { id: 'MSG-01', kind: 'approval', title: '插件「影像切片服务」待你审批', body: '测绘地理信息中心提交 1.0.0-rc.2，已通过接入验证。', from: '插件审批', target: { view: 'admin', tab: 'plugins' }, time: '10:24', unread: true, level: 'warn' },
  { id: 'MSG-02', kind: 'task', title: '任务 T-2041 已完成', body: '中心城区公示项目梳理 · 生成对比图与结论摘要。', from: '任务中心', target: { view: 'tasks' }, time: '09:58', unread: true, level: 'ok' },
  { id: 'MSG-03', kind: 'grant', title: '资源授权变更已生效', body: '「2026 Q3 卫星影像」授权范围新增 测绘地理信息中心。', from: '数据中心', target: { view: 'datacenter' }, time: '09:20', unread: true, level: '' },
  { id: 'MSG-04', kind: 'alert', title: '越权尝试告警：3 次拒绝', body: '角色 赵工 在 5 分钟内 3 次请求涉密影像，已通知安全管理员。', from: '运行监控', target: { view: 'admin', tab: 'monitor' }, time: '08:47', unread: true, level: 'danger' },
  { id: 'MSG-05', kind: 'notice', title: '集团通知：涉密机房巡检安排', body: '本周六 02:00—06:00，内网服务可能短时中断。', from: '通知公告', target: { view: 'notice' }, time: '昨天', unread: false, level: '' },
  { id: 'MSG-06', kind: 'ticket', title: '人员变动工单待复核', body: 'T-118 调岗：李工 → 智数中心，需运维复核账号与权限。', from: '人员变动', target: { view: 'admin', tab: 'tickets' }, time: '昨天', unread: true, level: 'warn' },
]

/** 资源版本与生命周期（PRD 5.4 版本与生命周期） */
export const resourceVersionSeed = {
  'R-2026-Q3-IMG': [
    { v: 'V3.2', date: '2026-10-08', note: '2026 Q3 全域影像，金字塔重建完成', by: '测绘地理信息中心', state: '当前' },
    { v: 'V3.1', date: '2026-07-12', note: '2026 Q2 影像，发布服务切换至 COG', by: '测绘地理信息中心', state: '历史' },
    { v: 'V3.0', date: '2026-04-09', note: '首次按季度发布', by: '测绘地理信息中心', state: '历史' },
  ],
  'R-PLAN-2050': [
    { v: 'V2.0', date: '2026-09-28', note: '批复稿，补充历史街区条款', by: '国土空间规划所', state: '当前' },
    { v: 'V1.0', date: '2025-11-16', note: '送审稿', by: '国土空间规划所', state: '历史' },
  ],
  'R-DOC-GH-2021': [
    { v: 'V2.0', date: '2026-08-22', note: '正式稿，补充中心城区控规传导章节', by: '国土空间规划所', state: '当前' },
    { v: 'V1.0', date: '2025-12-30', note: '征求意见稿', by: '国土空间规划所', state: '历史' },
  ],
  'R-BIZ-TIJIAN': [
    { v: 'V1.2', date: '2026-10-11', note: '48 项指标口径更新，新增 4 项社区类指标', by: '智数中心', state: '当前' },
    { v: 'V1.0', date: '2026-04-15', note: '首次上线 44 项指标', by: '智数中心', state: '历史' },
  ],
  'R-TDT-2026': [
    { v: 'V1.0', date: '2026-03-20', note: '在线引用天地图，不复制存储', by: '测绘地理信息中心', state: '当前' },
  ],
  'R-CAD-ZP-0913': [
    { v: 'V3.2', date: '2026-09-13', note: '施工图审查版，补齐竖向与管线图层', by: '建筑设计一所', state: '当前' },
    { v: 'V3.0', date: '2026-08-20', note: '送审版', by: '建筑设计一所', state: '历史' },
  ],
}

/** 资源授权（PRD 5.4 资源授权） */
export const resourceGrantSeed = {
  'R-2026-Q3-IMG': [
    { target: '规划一所', type: '部门', rights: ['查看', '下载'], by: '刘洋', at: '2026-10-09 09:12' },
    { target: '测绘地理信息中心', type: '部门', rights: ['查看'], by: '刘洋', at: '2026-10-20 14:05' },
  ],
  'R-PLAN-2050': [
    { target: '规划一所', type: '部门', rights: ['查看', '下载', '引用'], by: '孙所', at: '2025-11-20 10:30' },
    { target: '集团总部', type: '组织', rights: ['查看'], by: '周敏', at: '2026-03-04 16:18' },
  ],
}

/** 安全后台：模型使用策略与访问异常（PRD 9.3） */
export const modelPolicy = [
  { level: 'public', label: '公开', models: ['企业云模型', '个人 Key'], egress: '允许', note: '可经互联网模型处理' },
  { level: 'internal', label: '内部', models: ['企业云模型'], egress: '按策略', note: '禁止个人 Key 外发' },
  { level: 'sensitive', label: '敏感', models: ['政务模型（本域）'], egress: '需审批', note: '仅政务网内处理' },
  { level: 'secret', label: '涉密', models: ['Qwen3.8-27B（离线）'], egress: '禁止外发', note: '仅涉密内网推理' },
]

export const accessAnomalies = [
  { id: 'AX-01', at: '2026-11-07 08:47', actor: '赵工（规划一所）', act: 'resource.read', target: 'R-2026-Q3-IMG', result: 'deny(403)', count: 3, action: '已告警安全管理员' },
  { id: 'AX-02', at: '2026-11-06 22:11', actor: '郑总（外部访客）', act: 'drive.read', target: '云空间', result: 'deny(403)', count: 5, action: '已按模块授权流程拦截' },
  { id: 'AX-03', at: '2026-11-06 15:02', actor: '钱工（运维）', act: 'plugin.review.reject', target: 'P-CAD', result: 'allow', count: 1, action: '已留痕' },
]


/* ======================= 智能笔记本（Sources / Chat / Notes） ======================= */

/**
 * 笔记本只保存对数据中心 Resource 的引用关系，不复制原始文件、不允许改来源；
 * 引用默认跟随已发布最新版本（follow），也可钉住某个版本（pinned）。
 * 笔记（Notes）与对话（Chat）独立持久化，不随来源更新而改写。
 */
export const notebookSeed = [
  {
    id: 'NB-01', title: '城市体检指标与总规指标衔接', topic: '城市体检', owner: '赵工', role: 'employee',
    desc: '梳理 48 项体检指标与总规指标体系的口径对应关系，形成汇报口径。',
    securityDomain: 'inet', createdAt: '2026-10-28 09:20', updated: '2026-11-06 16:40',
    sources: [
      { resourceId: 'R-BIZ-TIJIAN', versionMode: 'follow', resolvedVersionId: 'V1.2', addedAt: '2026-10-28 09:22' },
      { resourceId: 'R-DOC-GH-2021', versionMode: 'follow', resolvedVersionId: 'V2.0', addedAt: '2026-10-28 09:25' },
      { resourceId: 'R-PROJ-PUB', versionMode: 'pinned', resolvedVersionId: 'V1.0', addedAt: '2026-11-02 10:10' },
    ],
    notes: [
      {
        id: 'NN-01', title: '指标对应关系（初稿）', author: '赵工', updatedAt: '2026-11-06 16:40',
        content: '总规指标体系 42 项，体检指标 48 项，其中 31 项可直接对应，9 项需拆分口径，8 项为体检新增（社区生活圈、完整社区等）。\n\n建议对外表述：两套指标不是替代关系，而是“总规定目标、体检查偏差”。',
        citations: [
          { resourceId: 'R-DOC-GH-2021', versionId: 'V2.0', locator: '第 4 章 指标体系 / 表 4-1' },
          { resourceId: 'R-BIZ-TIJIAN', versionId: 'V1.2', locator: '指标字典 / 社区类指标' },
        ],
      },
      {
        id: 'NN-02', title: '待核口径清单', author: '赵工', updatedAt: '2026-11-04 15:10',
        content: '1. 人均公园绿地面积：总规按城市建设用地口径，体检按常住人口口径，需统一。\n2. 老旧小区改造率：体检为年度累计，总规为期末目标。\n3. 社区服务设施覆盖率：体检按 15 分钟生活圈，总规按街道单元。',
        citations: [{ resourceId: 'R-BIZ-TIJIAN', versionId: 'V1.2', locator: '指标字典 / 口径说明' }],
      },
    ],
    chat: [
      { role: 'user', text: '这两套指标体系里，哪些指标口径不一致？', at: '2026-11-04 14:50' },
      {
        role: 'ai', at: '2026-11-04 14:50',
        text: '按当前引用的《九江市国土空间总体规划（2021—2035）》V2.0 与《城市体检指标数据集（2026）》V1.2 比对，有三处需要先统一口径：人均公园绿地面积（建设用地口径 vs 常住人口口径）、老旧小区改造率（年度累计 vs 期末目标）、社区服务设施覆盖率（15 分钟生活圈 vs 街道单元）。其余 31 项可直接对应，9 项需拆分。',
        citations: [
          { resourceId: 'R-DOC-GH-2021', versionId: 'V2.0', locator: '第 4 章 / 表 4-1 指标体系' },
          { resourceId: 'R-BIZ-TIJIAN', versionId: 'V1.2', locator: '指标字典 / 口径说明' },
        ],
      },
      { role: 'user', text: '把这三处写成给领导的汇报口径。', at: '2026-11-06 16:20' },
      {
        role: 'ai', at: '2026-11-06 16:21',
        text: '可以这样表述：两套指标总体可衔接，31 项直接对应；当前有三项口径差异需在年报前统一——绿地面积按人口口径折算、改造率明确为年度累计、设施覆盖率统一到 15 分钟生活圈。建议由智数中心牵头出一页口径对照表，随体检报告一并报送。',
        citations: [{ resourceId: 'R-BIZ-TIJIAN', versionId: 'V1.2', locator: '指标字典 / 社区类指标' }],
      },
    ],
  },
  {
    id: 'NB-02', title: '九江学院项目审图问题复盘', topic: '项目复盘', owner: '孙所', role: 'dept',
    desc: '把审图意见按专业归类，沉淀成所内校核清单。',
    securityDomain: 'inet', createdAt: '2026-09-20 15:00', updated: '2026-10-30 11:20',
    sources: [
      { resourceId: 'R-CAD-ZP-0913', versionMode: 'pinned', resolvedVersionId: 'V3.2', addedAt: '2026-09-20 15:02' },
      { resourceId: 'R-PROJ-PUB', versionMode: 'follow', resolvedVersionId: 'V1.0', addedAt: '2026-10-12 09:40' },
    ],
    notes: [
      {
        id: 'NN-03', title: '审图意见归类', author: '孙所', updatedAt: '2026-10-30 11:20',
        content: '34 条意见中，建筑 12 条（防火分区、疏散宽度）、结构 9 条（局部荷载取值）、给排水 6 条、电气 5 条、总图 2 条。高频问题集中在疏散宽度计算与局部荷载取值，已纳入所内校核清单第 2、5 项。',
        citations: [{ resourceId: 'R-CAD-ZP-0913', versionId: 'V3.2', locator: '图层 建筑 / 防火分区标注' }],
      },
    ],
    chat: [
      { role: 'user', text: '这套图的审图意见主要集中在哪些专业？', at: '2026-10-30 11:05' },
      {
        role: 'ai', at: '2026-10-30 11:06',
        text: '按当前钉住的 CAD V3.2 与审图意见汇总，34 条意见中建筑 12 条、结构 9 条、给排水 6 条、电气 5 条、总图 2 条；建筑集中在防火分区与疏散宽度，结构集中在局部荷载取值。',
        citations: [{ resourceId: 'R-CAD-ZP-0913', versionId: 'V3.2', locator: '图层 建筑 / 防火分区标注' }],
      },
    ],
  },
  {
    id: 'NB-03', title: '中心城区影像时序对比', topic: '空间分析', owner: '赵工', role: 'employee',
    desc: '用季度影像观察中心城区建设变化，形成变化图斑清单。',
    securityDomain: 'inet', createdAt: '2026-10-09 10:30', updated: '2026-11-03 17:05',
    sources: [
      { resourceId: 'R-2026-Q3-IMG', versionMode: 'follow', resolvedVersionId: 'V3.2', addedAt: '2026-10-09 10:32' },
      { resourceId: 'R-TDT-2026', versionMode: 'follow', resolvedVersionId: 'V1.0', addedAt: '2026-10-09 10:35' },
    ],
    notes: [],
    chat: [
      { role: 'user', text: '2026 Q3 与 Q2 影像相比，哪些片区变化最明显？', at: '2026-11-03 17:00' },
      {
        role: 'ai', at: '2026-11-03 17:01',
        text: '按当前引用的 Q3 影像（V3.2，0.5 m）与在线天地图底图对照，变化集中在八里湖东岸、浔阳区老城更新片区与城西工业园三处；建议对这三处做 200 m 缓冲的变化图斑核验。',
        citations: [{ resourceId: 'R-2026-Q3-IMG', versionId: 'V3.2', locator: '空间范围 115.80—116.15E / 29.50—29.85N' }],
      },
    ],
  },
  {
    id: 'NB-04', title: '九江市国土空间总体规划（2021—2035）要点梳理', topic: '国土空间规划', owner: '周工', role: 'employee',
    desc: '把总规的底线管控、空间结构、中心城区布局与传导机制整理成汇报提纲。',
    securityDomain: 'inet', createdAt: '2026-07-10 10:20', updated: '2026-07-15 16:30',
    shared: true, recommended: true, votes: 128, sourceCountHint: 11, coverTone: 0, coverIcon: 'doc',
    sources: [
      { resourceId: 'WEB-GH-01', kind: 'web', name: '九江市国土空间总体规划（2021—2035年）', format: '网页', url: 'https://www.jiujiang.gov.cn/', addedAt: '2026-07-10 10:22' },
      { resourceId: 'WEB-GH-02', kind: 'web', name: '市级国土空间总体规划编制指南', format: '网页', url: 'https://www.mnr.gov.cn/', addedAt: '2026-07-10 10:25' },
    ],
    notes: [
      { id: 'NN-04', title: '总规汇报提纲', author: '周工', updatedAt: '2026-07-15 16:30', content: '先讲三条控制线，再讲“一核两带多组团”的空间结构，最后落到中心城区用地布局与传导机制。汇报时区分约束性指标与预期性指标，避免把规划目标当成现状。', citations: [] },
    ],
    chat: [],
  },
  {
    id: 'NB-05', title: '城镇开发边界划定与项目准入校核', topic: '空间管控', owner: '陈工', role: 'employee',
    desc: '梳理城镇开发边界划定规则、弹性发展区与项目准入校核要点。',
    securityDomain: 'inet', createdAt: '2026-06-18 09:00', updated: '2026-07-15 11:10',
    shared: true, recommended: false, votes: 96, sourceCountHint: 17, coverTone: 1, coverIcon: 'grid',
    sources: [
      { resourceId: 'WEB-BOUND-01', kind: 'web', name: '城镇开发边界划定技术规程', format: '网页', url: 'https://www.mnr.gov.cn/', addedAt: '2026-06-18 09:05' },
      { resourceId: 'WEB-BOUND-02', kind: 'web', name: '江西省城镇开发边界管理实施细则', format: '网页', url: 'https://www.jiangxi.gov.cn/', addedAt: '2026-06-18 09:08' },
    ],
    notes: [
      { id: 'NN-05', title: '项目准入校核清单', author: '陈工', updatedAt: '2026-07-15 11:10', content: '校核顺序：是否压占永久基本农田和生态保护红线 → 是否位于城镇开发边界内 → 是否符合规划分区与用地性质 → 是否涉及弹性发展区调出 → 是否完成节约集约用地论证。五项均通过后再进入选址论证。', citations: [] },
    ],
    chat: [],
  },
  {
    id: 'NB-06', title: '城市体检评估技术指南（2025年版）导读', topic: '城市体检', owner: '孙所', role: 'employee',
    desc: '按指标体系、数据采集、成果应用三部分整理城市体检评估技术指南。',
    securityDomain: 'inet', createdAt: '2026-03-01 08:40', updated: '2026-03-06 18:20',
    shared: true, recommended: true, votes: 210, sourceCountHint: 50, coverTone: 2, coverIcon: 'globe',
    sources: [
      { resourceId: 'WEB-TIJIAN-01', kind: 'web', name: '城市体检评估技术指南（2025年版）', format: '网页', url: 'https://www.mohurd.gov.cn/', addedAt: '2026-03-01 08:45' },
      { resourceId: 'WEB-TIJIAN-02', kind: 'web', name: '国土空间城市更新规划指南', format: '网页', url: 'https://www.mnr.gov.cn/', addedAt: '2026-03-01 08:48' },
    ],
    notes: [
      { id: 'NN-06', title: '指标框架拆解', author: '孙所', updatedAt: '2026-03-06 18:20', content: '指南按住房、小区、街区、城区四个尺度组织指标；使用时先确认统计口径与数据来源，再把体检结果映射到城市更新单元和年度实施计划。不能只报指标值，要给出问题清单与整改建议。', citations: [] },
    ],
    chat: [],
  },
  {
    id: 'NB-07', title: '庐山风景名胜区沿线风貌管控研究', topic: '风貌管控', owner: '钱工', role: 'employee',
    desc: '整理庐山沿线建筑高度、色彩、视廊与景观界面管控要求。',
    securityDomain: 'inet', createdAt: '2025-04-20 14:00', updated: '2025-04-26 17:40',
    shared: true, recommended: false, votes: 64, sourceCountHint: 45, coverTone: 3, coverIcon: 'map',
    sources: [
      { resourceId: 'WEB-LUSHAN-01', kind: 'web', name: '庐山风景名胜区总体规划', format: '网页', url: 'https://www.jiujiang.gov.cn/', addedAt: '2025-04-20 14:05' },
      { resourceId: 'WEB-LUSHAN-02', kind: 'web', name: '江西省城乡风貌管控技术导则', format: '网页', url: 'https://www.jiangxi.gov.cn/', addedAt: '2025-04-20 14:09' },
    ],
    notes: [
      { id: 'NN-07', title: '风貌管控要点', author: '钱工', updatedAt: '2025-04-26 17:40', content: '管控分三层：山体天际线（建筑高度与屋顶形式）、沿线界面（色彩、材质、广告标识）、观景视廊（视线通廊内不得新增遮挡）。新建项目须提交视廊分析图和风貌影响专篇。', citations: [] },
    ],
    chat: [],
  },
  {
    id: 'NB-08', title: '存量用地再开发政策与案例综述', topic: '存量更新', owner: '赵工', role: 'employee',
    desc: '梳理低效用地再开发、混合用地与容积率奖励的政策工具与案例。',
    securityDomain: 'inet', createdAt: '2026-07-18 09:30', updated: '2026-07-21 15:00',
    shared: true, recommended: true, votes: 88, sourceCountHint: 9, coverTone: 4, coverIcon: 'doc',
    sources: [
      { resourceId: 'WEB-STOCK-01', kind: 'web', name: '存量用地再开发案例综述', format: '网页', url: 'https://www.cnki.net/', addedAt: '2026-07-18 09:35' },
      { resourceId: 'WEB-STOCK-02', kind: 'web', name: '九江市城市更新专项规划（2026—2030年）', format: '网页', url: 'https://www.jiujiang.gov.cn/', addedAt: '2026-07-18 09:38' },
    ],
    notes: [
      { id: 'NN-08', title: '政策工具清单', author: '赵工', updatedAt: '2026-07-21 15:00', content: '常用工具包括：低效用地认定与再开发专项规划、混合用地供给、容积率奖励与转移、存量补地价、过渡期临时使用。案例比较时先看土地权属和规划冲突，再看经济平衡与公共利益贡献。', citations: [] },
    ],
    chat: [],
  },
]

/** 笔记本的常用专题，用于新建时选择 */
export const notebookTopics = ['城市体检', '项目复盘', '空间分析', '政策研究', '标准校核', '汇报材料']

/** 共享文档的段落评论种子（blockId 对应正文段落顺序） */
export const collabCommentSeed = {
  'D-02': [
    { id: 'CM-01', blockId: 'b3', author: '钱工', at: '2026-11-06 17:52', text: '这里的“86 家”建议与公示台账的统计口径对齐，@赵工 确认一下是否含已撤销项目。', mentions: ['赵工'], resolved: false },
    { id: 'CM-02', blockId: 'b2', author: '李四', at: '2026-11-06 18:05', text: '数据截止时间已补，建议再加一句“以集团台账为准”。', mentions: [], resolved: true },
  ],
}
