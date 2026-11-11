/**
 * 九规智能中枢 企业版中枢 — 零依赖演示服务
 * 用 Node 原生 http 提供静态资源与 mock API；服务端做角色与网络判定，前端隐藏不是唯一防线。
 */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  academy, academyStats, accessAnomalies, aiTools,
  apps, auditSeed, automations, cloudCredentials, cloudPolicy, cloudSessions,
  cloudSpaces, cloudSystems, contacts, dataServices, driveItems, driveQuota, feedback, imageryCompare, imThreads,
  knowledgeDocs, messagesSeed, modelPolicy, modules,
  monitor, networks, networkOrder, notices, notifications, orgMembers, orgUnits, plugins, pluginMarket, projects,
  quickPrompts, resourceGrantSeed, resourceVersionSeed, resources,
  roles, sampleConversations, satelliteQuarters, spatialBounds, tasks, tickets, toolLedger, duties, dutyCatalog,
  notebookSeed, notebookTopics, collabCommentSeed,
} from './data.mjs'
import { buildDocument, supportedFormats } from './docs.mjs'
import { consoleRoles, consoleNav, consoleModules, consoleSections, consoleScopeOptions } from './console.mjs'

const root = fileURLToPath(new URL('./', import.meta.url))
const publicDir = join(root, 'public')
const port = Number(process.env.PORT || 4173)

const audit = [...auditSeed]
const readNotifications = new Map()  // 各账号分别记录已读，避免串号
const liveResources = [...resources, ...bulkSampleResources()]
const liveDataServices = [...dataServices]

/** 演示数据：总数补齐到 235 项，并覆盖全部业务分类；每类按季度分布，便于概览统计 */
function bulkSampleResources() {
  const configs = [
    { category: '规划', owner: '规划一所', uploader: '赵工', type: 'document', formats: ['PDF', 'DOCX'], add: 18, titles: ['控制性详细规划成果', '国土空间专项规划', '村庄规划编制成果', '规划条件核实资料'] },
    { category: '建筑', owner: '建筑设计所', uploader: '钱工', type: 'cad', formats: ['DWG', 'PDF'], add: 20, titles: ['建筑方案设计成果', '施工图设计文件', '建筑立面整治方案', '消防设计审查资料'] },
    { category: '市政', owner: '市政设计所', uploader: '钱工', type: 'cad', formats: ['DWG', 'PDF'], add: 20, titles: ['市政道路施工图', '排水管网设计成果', '综合管线迁改方案', '道路照明设计文件'] },
    { category: '风景园林', owner: '风景园林所', uploader: '赵工', type: 'document', formats: ['PDF', 'JPG'], add: 20, titles: ['公园景观方案', '绿地系统规划', '滨水空间设计成果', '苗木配置清单'] },
    { category: '测绘', owner: '测绘地理信息中心', uploader: '陈工', type: 'gis', formats: ['SHP', 'GeoJSON', 'TIFF'], add: 17, titles: ['1:500 地形图', '遥感影像成果', '地下管线探测成果', '实景三维模型'] },
    { category: '企业经营管理', owner: '综合办公室', uploader: '钱工', type: 'document', formats: ['PDF', 'XLSX'], add: 19, titles: ['综合办公台账', '会议纪要汇编', '年度工作计划', '制度文件汇编'] },
    { category: '企业经营管理', owner: '经营管理部', uploader: '周敏', type: 'bizdata', formats: ['接口', '表格'], add: 19, titles: ['项目经营月报', '合同履约台账', '市场拓展分析', '客户服务记录'] },
    { category: '企业经营管理', owner: '财务部', uploader: '钱工', type: 'document', formats: ['XLSX', 'PDF'], add: 20, titles: ['年度预算执行表', '项目成本核算表', '财务决算报告', '资金计划台账'] },
    { category: '总工办', owner: '总工办', uploader: '钱工', type: 'document', formats: ['PDF', 'DOCX'], add: 20, titles: ['技术审查意见', '设计质量抽查记录', '专业技术标准', '项目技术交底'] },
    { category: '企业经营管理', owner: '监察部', uploader: '钱工', type: 'document', formats: ['PDF', 'XLSX'], add: 20, titles: ['专项检查报告', '廉政风险排查表', '整改落实情况', '监督检查记录'] },
    { category: '企业经营管理', owner: '董事会办公室', uploader: '钱工', type: 'document', formats: ['PDF'], add: 20, titles: ['董事会决议汇编', '经营分析报告', '重大事项议案', '年度工作报告'] },
    { category: '其他', owner: '图文中心', uploader: '孙工', type: 'bizdata', formats: ['表格', '接口'], add: 15, titles: ['图文制作台账', '共享资料目录', '外部合作资料', '综合统计报表'] },
  ]
  const sizes = ['12.4 MB', '86 MB', '1.2 GB', '340 MB', '4.6 MB', '520 MB', '28 MB']
  const out = []
  let seq = 0
  configs.forEach((cfg, ci) => {
    for (let i = 0; i < cfg.add; i += 1) {
      seq += 1
      const q = (ci + i) % 4
      const month = q === 0 ? 1 + (i % 3) : q === 1 ? 4 + (i % 3) : q === 2 ? 7 + (i % 3) : 10 + (i % 2)
      let day = 2 + ((seq * 3) % 24)
      if (month === 11 && day > 7) day = 1 + (seq % 7)
      const hour = 8 + ((seq * 2) % 10)
      const minute = (seq * 7) % 60
      const pad = (n) => String(n).padStart(2, '0')
      const date = `2026-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}`
      const format = cfg.formats[seq % cfg.formats.length]
      const title = cfg.titles[i % cfg.titles.length]
      out.push({
        id: `R-BULK-${String(seq).padStart(3, '0')}`,
        name: `${title}（${cfg.category}·${String(i + 1).padStart(2, '0')}）`,
        type: cfg.type,
        format,
        formats: [format],
        source: '九规云空间',
        updated: date,
        owner: cfg.owner,
        contact: cfg.uploader,
        security: 'public',
        nets: ['inet'],
        scope: ['public', 'internal', 'all-org'],
        size: cfg.type === 'bizdata' ? '—' : sizes[seq % sizes.length],
        status: 'authorized',
        regKind: 'pure',
        action: '在线预览 · 元数据登记',
        desc: `${cfg.category}业务数据演示样本，用于数据中心分类浏览、季度统计与分页展示。`,
        dataStandard: {
          uploader: cfg.uploader,
          sourceOrg: cfg.owner,
          businessCategory: cfg.category,
          dataOwner: cfg.uploader,
          originalSource: '集团自产',
          dataDate: date,
          registeredAt: date,
        },
        aiMeta: { summary: `${cfg.category}业务演示数据，覆盖 ${date.slice(0, 7)} 的登记批次。`, period: '2026', coverage: '九江市域' },
      })
    }
  })
  return out
}
const liveApps = apps.map((a) => ({ ...a }))
const liveTickets = tickets.map((t) => ({ ...t, history: [...t.history] }))
const liveFeedback = [...feedback]
const liveTasks = tasks.map((t) => ({ ...t }))
const liveCloud = cloudSystems.map((s) => ({ ...s }))
const liveProjects = projects.map((p) => ({ ...p }))
const liveMarket = pluginMarket.map((m) => ({ ...m }))
/* ===== 插件提交与审核（演示内存态） ===== */
const pluginSubs = [
  {
    id: 'SUB-01', name: '规划指标计算', version: '1.2.0', file: 'planning-calculator.zip', size: '42 KB',
    author: '赵工', unit: '规划一所', scope: '全集团', status: 'pending', submitted: '2026-11-06 16:20',
    desc: '按控规与用地分类计算容积率、建筑密度与绿地率，输出指标表',
    checks: [['DSH Bundle 格式', '通过', 'package.json / index.js / cordis.patch.yml 齐全'],
      ['依赖与版本', '通过', '仅依赖平台内置 npm 包，无外部下载'],
      ['权限声明', '通过', '读取已授权资源，无写权限'],
      ['静态安全扫描', '通过', '无网络外联、无动态执行、无凭据读取'],
      ['隔离测试', '通过', '沙箱内 12 组样例全部返回预期结果']],
  },
  {
    id: 'SUB-02', name: 'CAD 图层整理', version: '0.9.3', file: 'cad-layer-cleaner.zip', size: '118 KB',
    author: '周晓', unit: '规划二所', scope: '本部门', status: 'pending', submitted: '2026-11-07 09:10',
    desc: '批量规范 CAD 图层命名、颜色与线型，输出整理报告',
    checks: [['DSH Bundle 格式', '通过', '结构完整'],
      ['依赖与版本', '通过', '依赖平台内置 CAD 解析器'],
      ['权限声明', '待复核', '声明写入原始文件目录，需部门负责人确认'],
      ['静态安全扫描', '通过', '无网络外联'],
      ['隔离测试', '通过', '沙箱内 6 组图纸通过']],
  },
  {
    id: 'SUB-03', name: '投标文件查重', version: '1.0.1', file: 'bid-dup-check.zip', size: '86 KB',
    author: '孙工', unit: '经营部', scope: '全集团', status: 'rejected', submitted: '2026-11-05 14:02',
    desc: '比对投标文件相似段落并标注来源', reason: '依赖外部在线查重接口，未提供企业内网替代方案',
    checks: [['DSH Bundle 格式', '通过', '结构完整'],
      ['依赖与版本', '不通过', '声明外部 registry 依赖'],
      ['权限声明', '通过', '仅读文件'],
      ['静态安全扫描', '不通过', '存在外部网络请求'],
      ['隔离测试', '未执行', '前置检查未通过']],
  },
  {
    id: 'SUB-04', name: '日照分析辅助', version: '1.0.0', file: 'sunlight-helper.zip', size: '64 KB',
    author: '李工', unit: '规划一所', scope: '全集团', status: 'approved', submitted: '2026-11-03 11:30',
    desc: '按建筑高度与朝向计算日照时数，输出分析图与结论', approved: '2026-11-04 10:15',
    checks: [['DSH Bundle 格式', '通过', '结构完整'],
      ['依赖与版本', '通过', '无外部依赖'],
      ['权限声明', '通过', '读取已授权三维资源'],
      ['静态安全扫描', '通过', '无网络外联'],
      ['隔离测试', '通过', '沙箱内 8 组样例通过']],
  },
]

const cloudLog = cloudSessions.map((s) => ({ ...s }))
const liveDrive = driveItems.map((d) => ({ ...d, shared: [...d.shared] }))
const liveClouds = cloudSpaces.map((c) => ({ ...c }))
function buildImAnalysis(docs, asker) {
  if (!docs.length) {
    return `${asker} 已调用智能助手。\n会话里还没有可分析的文档：先发一份文档，或用「＋ → 云空间」把云空间资料发到会话，再 @智能助手。`
  }
  const names = docs.map((d) => d.name)
  const kinds = docs.map((d) => d.type.toUpperCase())
  const lines = [
    `${asker} 已调用智能助手，分析本会话 ${docs.length} 份文档：${names.join('、')}。`,
    '',
    '分析结果',
    `1. 资料齐备度：${names.length} 份（${kinds.join(' / ')}），${names.length === 1 ? '单份材料可先给出结论，补充数据表后结论会更稳' : '可支撑一次内部讨论'}。`,
    `2. 口径一致性：${names[0]} 的口径与其余文档一致，未发现指标定义冲突；${names.length > 1 ? `「${names[1]}」` : '数据表'}中的统计范围需要与项目边界再核对一次。`,
    '3. 数据缺口：缺少一份明确的指标基准年说明，建议补齐后再对外引用。',
    '4. 下一步：把上述文档在群里转为在线文档，由文档所有者补充基准年与责任分工，我可在补齐后重新分析。',
  ]
  return lines.join('\n')
}
const liveIm = imThreads.map((t) => ({ ...t, messages: t.messages.map((m) => ({ ...m })), roster: (t.roster || []).map((r) => ({ ...r })) }))
/** 已生成文档的字节内容，键为文档 id，仅保存在本次进程内 */
const generatedDocs = new Map()
const liveNotices = notices.map((n) => ({ ...n, body: [...n.body] }))
const liveAcademy = academy.map((a) => ({ ...a }))
/* 补齐 PRD 缺口所需的可变状态：消息中心、模型配置、工具台账、资源版本与授权、组织职能授权 */
const liveMessages = messagesSeed.map((m) => ({ ...m }))
const liveModelConfig = new Map()
const liveToolLedger = toolLedger.map((t) => ({ ...t }))
const liveVersions = Object.fromEntries(Object.entries(resourceVersionSeed).map(([k, v]) => [k, v.map((x) => ({ ...x }))]))
const liveGrants = Object.fromEntries(Object.entries(resourceGrantSeed).map(([k, v]) => [k, v.map((x) => ({ ...x }))]))
const liveEditRequests = new Map()
const liveDownloadRequests = new Map()
const resourceReads = new Map([
  ['R-TDT-2026', 12840],
  ['R-3D-2026-XY', 6421],
  ['R-DOC-GH-2021', 3802],
  ['R-PROJ-PUB', 2145],
  ['R-VIDEO-SITE', 1580],
  ['R-IMG-DRONE', 1290],
  ['R-BIZ-TIJIAN', 980],
])
const resourceDownloads = new Map([
  ['R-TDT-2026', 36],
  ['R-3D-2026-XY', 18],
  ['R-DOC-GH-2021', 12],
  ['R-PROJ-PUB', 9],
  ['R-VIDEO-SITE', 7],
  ['R-IMG-DRONE', 5],
  ['R-BIZ-TIJIAN', 4],
])
const liveDuties = new Map(Object.entries(duties).map(([k, v]) => [k, [...v]]))
const liveMembers = orgMembers.map((m) => ({ ...m, posts: m.posts.map((p2) => ({ ...p2 })), accounts: [...m.accounts] }))
function dutiesOf(user) { return liveDuties.get(user.id) || [] }

/* 共享文档的协同状态：段落、评论、段落权限、版本号与在线编辑者（轮询式伪实时） */
const liveComments = new Map(Object.entries(collabCommentSeed).map(([k, v]) => [k, v.map((c) => ({ ...c, mentions: [...(c.mentions || [])] }))]))
const liveBlockPerms = new Map()
const liveRev = new Map()
const livePresence = new Map()

const LIVE_NOTEBOOKS = notebookSeed.map((n) => ({
  ...n,
  sources: n.sources.map((x) => ({ ...x })),
  notes: n.notes.map((x) => ({ ...x, citations: (x.citations || []).map((c) => ({ ...c })) })),
  chat: n.chat.map((x) => ({ ...x, citations: (x.citations || []).map((c) => ({ ...c })) })),
  collections: [...(n.collections || [])],
  pinned: !!n.pinned,
  shared: !!n.shared,
  votes: Number(n.votes || 0),
  votedBy: [...(n.votedBy || [])],
}))

const NOTEBOOK_COLLECTIONS = ['国土空间规划', '城市体检', '项目复盘', '政策研究', '汇报材料']
const NOTEBOOK_MAX_SOURCES = 20
const NOTEBOOK_QUOTA_BYTES = 15 * 1024 * 1024 * 1024
function notebookUsageBytes(userName) {
  return LIVE_NOTEBOOKS
    .filter((n) => n.owner === userName)
    .reduce((sum, n) => sum + n.sources.reduce((a, x) => a + ((x.kind === 'file') ? Number(x.sizeBytes || 0) : 0), 0), 0)
}
function quotaSizeText(bytes) {
  const n = Number(bytes) || 0
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(2).replace(/\.00$/, '')} GB`
  if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(1)} MB`
  return `${Math.round(n / 1024)} KB`
}
function sharedNotebooksByVotes() {
  return LIVE_NOTEBOOKS
    .filter((n) => !!n.shared)
    .slice()
    .sort((a, b) => (Number(b.votes || 0) - Number(a.votes || 0))
      || String(b.updated || '').localeCompare(String(a.updated || ''))
      || String(a.id).localeCompare(String(b.id)))
}
function notebookFeaturedIds() {
  return new Set(sharedNotebooksByVotes().slice(0, 5).map((n) => n.id))
}

function latestVersionOf(resourceId) {
  const list = liveVersions[resourceId] || []
  const cur = list.find((v) => v.state === '当前') || list[0]
  return cur ? cur.v : 'V1.0'
}

function blocksOfDoc(id, doc) {
  if (doc.kind !== 'doc') return []
  const perms = liveBlockPerms.get(id) || {}
  return String(doc.body || '')
    .split(/\n\n+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .map((text, i) => ({ id: `b${i + 1}`, no: i + 1, text, perm: perms[`b${i + 1}`] || 'edit' }))
}

function revOfDoc(id, doc) {
  if (!liveRev.has(id)) liveRev.set(id, Math.max(...doc.history.map((h) => h.v), 1))
  return liveRev.get(id)
}

function diffLines(a, b) {
  const n = a.length, m = b.length
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const rows = []
  let i = 0, j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) { rows.push({ type: 'same', text: a[i] }); i += 1; j += 1 }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { rows.push({ type: 'del', text: a[i] }); i += 1 }
    else { rows.push({ type: 'add', text: b[j] }); j += 1 }
  }
  while (i < n) { rows.push({ type: 'del', text: a[i] }); i += 1 }
  while (j < m) { rows.push({ type: 'add', text: b[j] }); j += 1 }
  return rows
}

function presenceOfDoc(id) {
  if (!livePresence.has(id)) {
    livePresence.set(id, [
      { name: '钱工', at: '11:06', para: 'b3', state: '正在查看第 3 段' },
      { name: '李四', at: '11:07', para: 'b2', state: '正在编辑第 2 段' },
    ])
  }
  return livePresence.get(id)
}

function linesOfContent(doc) {
  if (doc.kind === 'sheet') return (doc.table || []).map((row) => row.map((c) => String(c)).join(' | '))
  if (doc.kind === 'slide') return (doc.slides || []).flatMap((s, i) => [`第 ${i + 1} 页：`, ...(s.lines || [])])
  return String(doc.body || '').split(/\n/)
}




/* 在线协作文档内容与编辑历史：文档 / 表格 / 演示共享后创建者与共享者均可编辑 */
const DOC_LABELS = {
  pdf: 'PDF', docx: '文档', xlsx: '表格', pptx: '演示',
  atlas: '图集', gdb: '数据库', shp: '数据库', dwg: '图纸',
}
const ASSET_FAMILY = { atlas: '图集', gdb: '数据库', shp: '数据库', dwg: '数据库' }
const collabDocs = new Map()

function seedCollab(item) {
  const name = item.name
  if (item.type === 'xlsx') {
    return {
      kind: 'sheet',
      table: [
        ['项目', '单位', '数值', '口径'],
        [name, '项', '86', '按建设单位归并'],
        ['归并后分组', '组', '12', '同建设单位合并'],
        ['已过公示期', '项', '3', '截至 2026-10'],
      ],
      history: [
        { v: 3, by: '李四', time: '2026-11-07 09:12', summary: '校正成本列口径，补充归并后分组' },
        { v: 2, by: item.owner, time: '2026-11-06 17:30', summary: '补充公示期限与状态两列' },
        { v: 1, by: item.owner, time: '2026-11-05 10:05', summary: '创建表格' },
      ],
    }
  }
  if (item.type === 'pptx') {
    return {
      kind: 'slide',
      slides: [
        { title: name, lines: ['项目背景与范围', '关键数据与口径', '下一步工作安排'] },
        { title: '下一步工作', lines: ['补齐台账口径', '完成部门复核', '归档到企业云项目空间'] },
      ],
      history: [
        { v: 2, by: item.owner, time: '2026-11-06 15:20', summary: '调整第二页要点，统一字号' },
        { v: 1, by: item.owner, time: '2026-11-04 11:30', summary: '创建演示' },
      ],
    }
  }
  const body = `${name}\n\n一、总体情况\n本文件由规划一所整理，数据截至 2026 年 10 月，口径与集团台账一致。\n\n二、数据与口径\n公示单位 86 家，按建设单位归并为 12 组；已过公示期 3 项，其余在公示期内跟踪。\n\n三、下一步工作\n补齐缺项口径，完成部门复核后归档到企业云项目空间。`
  const v1Body = `${name}\n\n一、总体情况\n本文件由规划一所整理。\n\n二、数据与口径\n公示单位 86 家。\n\n三、下一步工作\n补齐缺项口径。`
  return {
    kind: 'doc',
    body,
    rev: 2,
    history: [
      { v: 2, by: item.owner, time: '2026-11-06 17:40', summary: '补充数据截止时间与口径说明', snapshot: { body } },
      { v: 1, by: item.owner, time: '2026-11-05 14:05', summary: '创建文档', snapshot: { body: v1Body } },
    ],
  }
}

function collabOf(item) {
  if (!collabDocs.has(item.id)) collabDocs.set(item.id, seedCollab(item))
  return collabDocs.get(item.id)
}

const isSharedItem = (it) => (it.shared || []).some((x) => x !== '仅本人')
const canEditItem = (user, it) => it.owner === user.name || (it.shared || []).includes(user.name) || user.scopes.includes('all-org')
const typeLabelOf = (it) => `${isSharedItem(it) ? '共享' : ''}${DOC_LABELS[it.type] || it.type}`

// 身份或网络切换时，终止所有仍在运行的云会话，避免会话被下一个身份继承
function closeAllCloudSessions(reason) {
  cloudLog.filter((s) => s.state === 'active').forEach((s) => {
    s.state = 'closed'
    s.ttl = '已结束'
    s.note = reason
  })
}
const conversations = sampleConversations.map((c) => ({ ...c, messages: c.messages.map((m) => ({ ...m })) }))

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
}

function parseCookies(header = '') {
  return Object.fromEntries(
    header.split(';').map((part) => {
      const [k, ...v] = part.trim().split('=')
      return [k, decodeURIComponent(v.join('=') || '')]
    }).filter(([k]) => k)
  )
}

function roleOf(req) {
  const role = parseCookies(req.headers.cookie).jg_role
  return roles[role] ? roles[role] : roles.employee
}

function netOf(req) {
  const net = parseCookies(req.headers.cookie).jg_net
  return networks[net] ? net : 'inet'
}

/** 资源可见性 = 网络目录匹配 + 角色范围匹配；secret 级别需显式授权 */
function canSee(user, resource, net) {
  if (resource.nets && !resource.nets.includes(net)) return false
  if (resource.security === 'secret' && !(net === 'secret' && user.scopes.includes('secret'))) return false
  if (user.scopes.includes('all-org')) return true
  return resource.scope.some((scope) => user.scopes.includes(scope))
}

function canManage(user) {
  return user.visibleModules.includes('admin')
}

function userDepartments(user) {
  return orgUnits.flatMap((u) => u.departments || []).filter((d) => d.head === user.name)
}

function canEditResource(user, resource) {
  if (user.id === 'guest') return false
  if (canManage(user)) return true
  const owner = resource?.dataStandard?.dataOwner || resource?.contact || ''
  if (owner && owner === user.name) return true
  const dept = userDepartments(user).find((d) => d.name === resource.owner)
  return !!dept
}

function canApproveEdit(user) {
  return canManage(user) || dutiesOf(user).includes('dataAdmin')
}

const CATEGORY_MERGE = {
  综合部: '企业经营管理',
  市场部: '企业经营管理',
  财务部: '企业经营管理',
  监察部: '企业经营管理',
  董事会: '企业经营管理',
}

const OWNER_CATEGORY = {
  '规划一所': '规划',
  '国土空间规划所': '规划',
  '测绘地理信息中心': '测绘',
  '经营管理部': '企业经营管理',
  '综合办公室': '企业经营管理',
  '智数中心': '企业经营管理',
  '财务部': '企业经营管理',
  '监察部': '企业经营管理',
  '董事会办公室': '企业经营管理',
  '图文中心': '其他',
}

function categoryKey(value) {
  return String(value || '').replace(/（法人单位）/g, '').replace(/（控股子公司）/g, '').trim()
}

function normalizeBusinessCategory(value) {
  const key = categoryKey(value)
  return CATEGORY_MERGE[key] || key || '其他'
}

function businessCategoryOf(resource) {
  return normalizeBusinessCategory(resource?.dataStandard?.businessCategory || resource?.aiMeta?.domain || OWNER_CATEGORY[resource?.owner] || '其他')
}

/** 外部访客默认不读企业数据：以下接口按模块判定，管理员按模块授权后才放行 */
const GUEST_GUARD = {
  'GET /api/datacenter/overview': 'datacenter',
  'GET /api/resources': 'datacenter',
  'POST /api/resources/register': 'datacenter',
  'POST /api/resources/approval': 'datacenter',
  'POST /api/resources/edit': 'datacenter',
  'POST /api/resources/edit-approval': 'datacenter',
  'POST /api/resources/download': 'datacenter',
  'POST /api/spatial/recognize': 'datacenter',
  'GET /api/resource': 'datacenter',
  'GET /api/spatial': 'datacenter',
  'GET /api/imagery': 'datacenter',
  'GET /api/satellite': 'datacenter',
  'GET /api/knowledge': 'knowledge',
  'GET /api/notebooks': 'knowledge',
  'POST /api/notebooks': 'knowledge',
  'POST /api/notebook/manage': 'knowledge',
  'GET /api/notebook': 'knowledge',
  'POST /api/notebook/source': 'knowledge',
  'POST /api/notebook/note': 'knowledge',
  'POST /api/notebook/ask': 'knowledge',
  'POST /api/notebook/sync': 'knowledge',
  'POST /api/notebook/vote': 'knowledge',
  'POST /api/drive/comment': 'drive',
  'POST /api/drive/comment-resolve': 'drive',
  'POST /api/drive/block-perm': 'drive',
  'GET /api/drive/presence': 'drive',
  'GET /api/drive/diff': 'drive',
  'GET /api/drive': 'drive',
  'GET /api/drive/item': 'drive',
  'POST /api/drive/share': 'drive',
  'POST /api/drive/apply': 'drive',
  'POST /api/drive/delete': 'drive',
  'POST /api/drive/update': 'drive',
  'GET /api/contacts': 'contacts',
  'GET /api/im': 'im',
  'GET /api/im/files': 'im',
  'GET /api/im/search': 'im',
  'POST /api/im/attach': 'im',
  'POST /api/im/send': 'im',
  'POST /api/im/ai': 'im',
  'POST /api/im/online': 'im',
  'POST /api/im/member': 'im',
  'GET /api/messages': 'notice',
  'POST /api/messages/read': 'notice',
  'GET /api/resource/versions': 'datacenter',
  'POST /api/resource/version': 'datacenter',
  'POST /api/resource/grant': 'datacenter',
  'GET /api/dataservices': 'datacenter',
  'GET /api/org': 'admin',
  'POST /api/org/duty': 'admin',
  'GET /api/tool-ledger': 'admin',
  'POST /api/tool-ledger': 'admin',
  'GET /api/security': 'admin',
  'GET /api/notices': 'notice',
  'POST /api/notices/read': 'notice',
  'POST /api/notices/publish': 'notice',
  'GET /api/academy': 'academy',
  'POST /api/academy/progress': 'academy',
  'GET /api/tasks': 'tasks',
  'POST /api/tasks/create': 'tasks',
  'POST /api/tasks/retry': 'tasks',
  'GET /api/projects': 'projects',
  'POST /api/projects/create': 'projects',
  'GET /api/conversations': 'home',
  'GET /api/conversation': 'home',
  'GET /api/plugins': 'skills',
  'POST /api/plugin-toggle': 'skills',
  'GET /api/plugin-review': 'admin',
  'POST /api/plugins/review': 'admin',
  'GET /api/audit': 'admin',
  'GET /api/monitor': 'admin',
  'GET /api/tickets': 'admin',
  'POST /api/tickets/create': 'admin',
  'POST /api/tickets/action': 'admin',
  'GET /api/feedback': 'admin',
  'POST /api/feedback/create': 'admin',
  'POST /api/ai/invoke': 'ai',
  'GET /api/apps': 'apps',
}

function guestBlock(user, key) {
  if (user.id !== 'guest') return null
  const module = GUEST_GUARD[key]
  if (!module) return null
  const granted = Array.isArray(user.grants) ? user.grants : []
  if (granted.includes(module)) return null
  return module
}

function logAudit(user, action, object, result, net = 'inet') {
  audit.unshift({
    time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
    actor: user.name,
    action,
    object,
    result,
    net: networks[net].label,
  })
  if (audit.length > 80) audit.pop()
}

function stamp() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function json(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(payload)
}

const REG_KIND_LABEL = { pure: '普通数据', deliverable: '成果数据', service: '数据服务' }
const ZONE_LABEL = { intranet: '内网', gov: '政务外网', inet: '互联网' }
const MAP_CATALOG_LABEL = {
  satellite: '01 卫星影像',
  current: '02 现状数据',
  planning: '03 规划数据',
  construction: '04 建设工程数据',
  management: '05 管理数据',
  socioeconomic: '06 社会经济数据',
  threeD: '07 三维数据',
}
const zoneLabel = (z) => ZONE_LABEL[z] || z

/* 演示用行政区划边界（EPSG:4490 近似外包框）。正式环境替换为 GeoJSON 面要素 + PostGIS/GDAL 叠加。 */
const ADMIN_UNITS = [
  { code: '360000', name: '江西省', level: '省级', parent: '', bbox: [113.50, 24.40, 118.50, 30.50] },
  { code: '360400', name: '九江市', level: '市级', parent: '360000', bbox: [113.90, 28.60, 116.90, 30.10] },
  { code: '360403', name: '浔阳区', level: '区县级', parent: '360400', bbox: [115.94, 29.70, 116.07, 29.81] },
  { code: '360402', name: '濂溪区', level: '区县级', parent: '360400', bbox: [115.86, 29.48, 116.16, 29.70] },
  { code: '360404', name: '柴桑区', level: '区县级', parent: '360400', bbox: [115.58, 29.45, 115.90, 29.70] },
  { code: '360481', name: '瑞昌市', level: '区县级', parent: '360400', bbox: [115.38, 29.55, 115.62, 29.82] },
  { code: '360483', name: '庐山市', level: '区县级', parent: '360400', bbox: [115.88, 29.35, 116.10, 29.55] },
  { code: '360403001', name: '甘棠街道', level: '乡镇街道级', parent: '360403', bbox: [115.972, 29.728, 116.000, 29.756] },
  { code: '360403002', name: '湓浦街道', level: '乡镇街道级', parent: '360403', bbox: [115.948, 29.706, 115.971, 29.730] },
  { code: '360403003', name: '人民路街道', level: '乡镇街道级', parent: '360403', bbox: [116.001, 29.704, 116.022, 29.730] },
  { code: '360403004', name: '白水湖街道', level: '乡镇街道级', parent: '360403', bbox: [116.001, 29.757, 116.042, 29.792] },
  { code: '360403005', name: '金鸡坡街道', level: '乡镇街道级', parent: '360403', bbox: [116.030, 29.708, 116.056, 29.746] },
  { code: '360402001', name: '十里街道', level: '乡镇街道级', parent: '360402', bbox: [115.950, 29.640, 116.000, 29.690] },
  { code: '360402002', name: '五里街道', level: '乡镇街道级', parent: '360402', bbox: [116.000, 29.640, 116.050, 29.690] },
  { code: '360402101', name: '莲花镇', level: '乡镇街道级', parent: '360402', bbox: [115.880, 29.600, 115.950, 29.680] },
  { code: '360402102', name: '姑塘镇', level: '乡镇街道级', parent: '360402', bbox: [116.040, 29.500, 116.120, 29.580] },
  { code: '360402103', name: '威家镇', level: '乡镇街道级', parent: '360402', bbox: [116.000, 29.550, 116.060, 29.620] },
  { code: '360402104', name: '新港镇', level: '乡镇街道级', parent: '360402', bbox: [116.060, 29.580, 116.140, 29.660] },
  { code: '360404001', name: '沙河街道', level: '乡镇街道级', parent: '360404', bbox: [115.800, 29.600, 115.860, 29.660] },
  { code: '360404002', name: '狮子街道', level: '乡镇街道级', parent: '360404', bbox: [115.750, 29.560, 115.820, 29.620] },
  { code: '360404003', name: '城门街道', level: '乡镇街道级', parent: '360404', bbox: [115.700, 29.500, 115.780, 29.570] },
  { code: '360404101', name: '港口街镇', level: '乡镇街道级', parent: '360404', bbox: [115.620, 29.550, 115.700, 29.630] },
  { code: '360404102', name: '马回岭镇', level: '乡镇街道级', parent: '360404', bbox: [115.600, 29.600, 115.700, 29.680] },
  { code: '360481001', name: '湓城街道', level: '乡镇街道级', parent: '360481', bbox: [115.480, 29.660, 115.540, 29.720] },
  { code: '360481002', name: '桂林街道', level: '乡镇街道级', parent: '360481', bbox: [115.520, 29.640, 115.580, 29.700] },
  { code: '360481101', name: '码头镇', level: '乡镇街道级', parent: '360481', bbox: [115.420, 29.720, 115.500, 29.800] },
  { code: '360481102', name: '高丰镇', level: '乡镇街道级', parent: '360481', bbox: [115.450, 29.600, 115.520, 29.670] },
  { code: '360483001', name: '南康镇', level: '乡镇街道级', parent: '360483', bbox: [115.980, 29.440, 116.030, 29.490] },
  { code: '360483101', name: '白鹿镇', level: '乡镇街道级', parent: '360483', bbox: [116.000, 29.480, 116.060, 29.530] },
  { code: '360483102', name: '温泉镇', level: '乡镇街道级', parent: '360483', bbox: [115.920, 29.400, 115.980, 29.460] },
  { code: '360483103', name: '海会镇', level: '乡镇街道级', parent: '360483', bbox: [116.020, 29.380, 116.080, 29.440] },
]

function parseExtent(value) {
  const nums = String(value || '').match(/-?\d+(?:\.\d+)?/g)?.map(Number) || []
  if (nums.length < 4) return null
  const [a, b, c, d] = nums
  const minX = Math.min(a, c)
  const maxX = Math.max(a, c)
  const minY = Math.min(b, d)
  const maxY = Math.max(b, d)
  if (![minX, maxX, minY, maxY].every(Number.isFinite)) return null
  return { minX, maxX, minY, maxY }
}

function intersects(box, unit) {
  const [ux1, uy1, ux2, uy2] = unit.bbox
  return box.minX <= ux2 && box.maxX >= ux1 && box.minY <= uy2 && box.maxY >= uy1
}

function adminChain(code) {
  const chain = []
  let unit = ADMIN_UNITS.find((u) => u.code === code)
  while (unit) {
    chain.unshift(unit)
    unit = unit.parent ? ADMIN_UNITS.find((u) => u.code === unit.parent) : null
  }
  return chain
}

function recognizeAdmin(extent) {
  const box = parseExtent(extent)
  if (!box) return null
  const towns = ADMIN_UNITS.filter((u) => u.level === '乡镇街道级' && intersects(box, u))
  const districts = ADMIN_UNITS.filter((u) => u.level === '区县级' && intersects(box, u))
  const cities = ADMIN_UNITS.filter((u) => u.level === '市级' && intersects(box, u))
  const roots = towns.length ? towns : districts.length ? districts : cities.length ? cities : ADMIN_UNITS.filter((u) => u.level === '省级' && intersects(box, u))
  if (!roots.length) return null
  const chains = roots.map((u) => adminChain(u.code))
  const common = chains.reduce((acc, chain) => {
    let i = 0
    while (i < acc.length && i < chain.length && acc[i].code === chain[i].code) i += 1
    return acc.slice(0, i)
  })
  const path = common.map((u) => u.name).join(' / ')
  const deepest = common[common.length - 1] || roots[0]
  return {
    path,
    level: deepest.level,
    code: deepest.code,
    matched: roots.map((u) => u.name),
    matchedCount: roots.length,
    merged: roots.length > 1,
    note: roots.length > 1
      ? `空间叠加命中 ${roots.length} 个${roots[0].level}，已向上归并至共同上级「${deepest.name}」`
      : `空间叠加命中「${roots[0].name}」，按最具体行政单元归集`,
  }
}

function regWorkflow(kind, user, body) {
  const qcRequired = body.qcRequired === true
  const steps = [
    { key: 'dept', label: '部门负责人同意登记', state: 'pending' },
    ...(qcRequired ? [{ key: 'qc', label: '质检软件质检（可选）', state: 'pending' }] : []),
    { key: 'data', label: '数据管理员质量评估', state: 'pending' },
    { key: 'done', label: '登记入库', state: 'pending' },
  ]
  steps[0].state = 'active'
  steps[0].by = ''
  steps[0].at = ''
  return {
    stage: 'dept',
    steps,
    deptLead: body.deptLead || '部门负责人',
    note: qcRequired
      ? '部门负责人同意后，先由质检软件执行完整性、坐标系、拓扑、属性与格式检查，再由数据管理员做质量评估。'
      : '部门负责人同意后，由数据管理员做质量评估；本次未选择质检软件质检。',
  }
}

function regStatusOf(stage, kind) {
  if (stage === 'dept') return 'pending-dept'
  if (stage === 'qc') return 'pending-qc'
  if (stage === 'data') return 'pending-data'
  return 'authorized'
}

function parseUpdated(value) {
  const d = new Date(String(value || '').replace(' ', 'T'))
  return Number.isNaN(d.getTime()) ? null : d
}

function isNewUpdate(value, days = 30) {
  const d = parseUpdated(value)
  if (!d) return false
  return Date.now() - d.getTime() <= days * 24 * 60 * 60 * 1000
}

function formatsOf(resource) {
  const raw = Array.isArray(resource.formats) && resource.formats.length
    ? resource.formats
    : String(resource.format || '').split(/[\/、,]+/)
  return [...new Set(raw.map((x) => String(x).trim()).filter(Boolean))]
}

function sizeBytesOf(value) {
  const m = String(value || '').match(/([\d.]+)\s*(TB|GB|MB|KB|B)/i)
  if (!m) return 0
  const n = Number(m[1])
  const unit = m[2].toUpperCase()
  const mul = { TB: 1024 ** 4, GB: 1024 ** 3, MB: 1024 ** 2, KB: 1024, B: 1 }[unit] || 0
  return Number.isFinite(n) ? n * mul : 0
}

function sizeLabel(bytes) {
  if (!bytes) return '0 B'
  if (bytes >= 1024 ** 4) return `${(bytes / 1024 ** 4).toFixed(1)} TB`
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${Math.round(bytes)} B`
}

function pickResource(r) {
  return {
    id: r.id, name: r.name, type: r.type, format: r.format, source: r.source,
    updated: r.updated, owner: r.owner, security: r.security, status: r.status,
    size: r.size, nets: r.nets, extent: r.extent, regKind: r.regKind,
    businessCategory: businessCategoryOf(r),
    businessCategoryKey: categoryKey(businessCategoryOf(r)),
    dataOwner: r.dataStandard?.dataOwner || r.contact || '',
    formats: formatsOf(r),
    filesCount: (r.files || []).length,
    isNew: isNewUpdate(r.updated),
    views: resourceReads.get(r.id) || 0,
    downloads: resourceDownloads.get(r.id) || 0,
  }
}

function categoryOrderOf(name) {
  const order = ['规划', '建筑', '市政', '风景园林', '测绘', '企业经营管理', '总工办']
  const i = order.indexOf(name)
  return i === -1 ? 100 : i
}

function buildOverview(user, net) {
  const list = liveResources.filter((r) => canSee(user, r, net))
  const categoryMap = new Map()
  const formatMap = new Map()
  const quarterMap = new Map()
  let totalSize = 0
  let newCount = 0
  for (const r of list) {
    const category = businessCategoryOf(r)
    const c = categoryMap.get(category) || { name: category, count: 0, newCount: 0 }
    c.count += 1
    const isNew = isNewUpdate(r.updated)
    if (isNew) { c.newCount += 1; newCount += 1 }
    categoryMap.set(category, c)
    totalSize += sizeBytesOf(r.size)
    for (const f of formatsOf(r)) formatMap.set(f, (formatMap.get(f) || 0) + 1)
    const d = parseUpdated(r.updated)
    if (d) {
      const qid = `${d.getFullYear()}Q${Math.floor(d.getMonth() / 3) + 1}`
      const q = quarterMap.get(qid) || { id: qid, label: `${d.getFullYear()} Q${Math.floor(d.getMonth() / 3) + 1}`, total: 0, byCategory: {} }
      q.total += 1
      q.byCategory[category] = (q.byCategory[category] || 0) + 1
      quarterMap.set(qid, q)
    }
  }
  const now = new Date()
  const currentQ = Math.floor(now.getMonth() / 3) + 1
  const quarters = []
  for (let i = 3; i >= 0; i -= 1) {
    const q = currentQ - i
    const year = q < 1 ? now.getFullYear() - 1 : now.getFullYear()
    const qn = q < 1 ? q + 4 : q
    const qid = `${year}Q${qn}`
    quarters.push(quarterMap.get(qid) || { id: qid, label: `${year} Q${qn}`, total: 0, byCategory: {} })
  }
  const categoryList = [...categoryMap.values()].sort((a, b) => categoryOrderOf(a.name) - categoryOrderOf(b.name) || b.count - a.count)
  const formats = [...formatMap.entries()]
    .map(([format, count]) => ({ format, count }))
    .sort((a, b) => b.count - a.count || a.format.localeCompare(b.format))
  const hot = list
    .map((r) => ({
      id: r.id,
      name: r.name,
      category: businessCategoryOf(r),
      owner: r.dataStandard?.dataOwner || r.contact || r.owner,
      views: resourceReads.get(r.id) || 0,
      downloads: resourceDownloads.get(r.id) || 0,
    }))
    .sort((a, b) => b.views - a.views || b.downloads - a.downloads)
    .slice(0, 3)
  const quarterDownloads = list
    .map((r) => ({
      id: r.id,
      name: r.name,
      category: businessCategoryOf(r),
      owner: r.dataStandard?.dataOwner || r.contact || r.owner,
      downloads: resourceDownloads.get(r.id) || 0,
    }))
    .filter((x) => x.downloads > 0)
    .sort((a, b) => b.downloads - a.downloads || a.name.localeCompare(b.name))
    .slice(0, 5)
  const quarterCalls = list
    .map((r) => ({
      id: r.id,
      name: r.name,
      category: businessCategoryOf(r),
      owner: r.dataStandard?.dataOwner || r.contact || r.owner,
      calls: resourceReads.get(r.id) || 0,
    }))
    .filter((x) => x.calls > 0)
    .sort((a, b) => b.calls - a.calls || a.name.localeCompare(b.name))
    .slice(0, 5)
  const deptMap = new Map()
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime()
  for (const r of list) {
    const d = parseUpdated(r.updated)
    if (!d || d.getTime() < yearStart) continue
    const dept = r.owner || '其他'
    const item = deptMap.get(dept) || { name: dept, count: 0, last: '' }
    item.count += 1
    if (String(r.updated || '') > item.last) item.last = r.updated
    deptMap.set(dept, item)
  }
  const diligentDepartments = [...deptMap.values()]
    .sort((a, b) => b.count - a.count || String(b.last).localeCompare(String(a.last)))
    .slice(0, 5)
  return {
    total: list.length,
    totalSize,
    totalSizeLabel: sizeLabel(totalSize),
    formatTypes: formats.length,
    newCount,
    categories: categoryList,
    formats,
    quarters,
    hot,
    quarterDownloads,
    quarterCalls,
    diligentDepartments,
  }
}
function fieldGroupsOf(r) {
  const kind = r.regKind || 'pure'
  const data = r.dataStandard || {}
  const spatial = r.spatial || {}
  const sec = r.securityMeta || {}
  const mapPath = spatial.mapPath || (spatial.mapCatalog ? MAP_CATALOG_LABEL[spatial.mapCatalog] || spatial.mapCatalog : '—')
  const groups = [
    { title: '身份与分类', rows: [
      ['数据大类', REG_KIND_LABEL[kind] || '普通数据'],
      ['数据 ID', r.id],
      ['数据名称', r.name],
      ['业务分类', businessCategoryOf(r)],
      ['数据格式', r.format],
      ['数据大小', r.size],
      ['登记状态', r.status === 'authorized' ? '已登记可服务' : '审批中'],
    ] },
    { title: '来源与权属', rows: [
      ['上传人 / 组织', `${data.uploader || r.contact || '—'} · ${data.sourceOrg || r.owner || '—'}`],
      ['数据负责人', data.dataOwner || r.contact || '—'],
      ['原始来源', data.originalSource || '集团自产'],
      ['来源方式', r.sourceType === 'cloud' ? '企业云空间引用' : '本地上传'],
      ['来源系统', r.source],
      ['数据上传时间', data.dataDate || r.aiMeta?.period || '—'],
      ['登记时间', data.registeredAt || r.updated],
      ['责任部门', r.owner],
      ['生产部门', r.producer || r.owner],
    ] },
    { title: '业务与说明', rows: [
      ['空间范围', r.aiMeta?.coverage || '—'],
      ['数据简介', r.aiMeta?.summary || r.desc || '—'],
    ] },
  ]
  if (spatial.enabled) {
    groups.push({ title: 'GIS / 三维空间元数据', rows: [
      ['空间数据类型', spatial.typeLabel || spatial.type || '—'],
      ['一张图一级分类', MAP_CATALOG_LABEL[spatial.mapCatalog] || spatial.mapCatalog || '—'],
      ['一张图目录路径', mapPath],
      ['行政区域', spatial.regions || '—'],
      ['行政区划识别', spatial.adminNote || '按空间范围与行政区划边界做叠加分析'],
      ['空间坐标系统', spatial.crs || '—'],
      ['空间覆盖范围', spatial.extent || r.aiMeta?.coverage || '—'],
      ['测绘比例尺', spatial.scale || '—'],
      ['空间数据集 ID', spatial.datasetId || '待登记入库后生成'],
    ] })
  }
  groups.push({ title: '安全与授权', rows: [
    ['内部安全等级', sec.internalLevel || '—'],
    ['涉密属性', sec.secrecy || '非涉密'],
    ['申请访问环境', (sec.requestedZones || r.nets || []).map(zoneLabel).join(' / ') || '—'],
    ['批准访问环境', (sec.approvedZones || []).length ? sec.approvedZones.map(zoneLabel).join(' / ') : '待审批'],
    ['授权类型', sec.authorizationType === 'orgs' ? '指定组织' : '集团内部公开'],
    ['授权组织', (sec.authorizedOrgs || []).join(' / ') || '—'],
    ['数据权属及使用依据', sec.rightsBasis || '—'],
  ] })
  groups.push({ title: '记录与派生', rows: [['更新时间', r.updated], ['派生关系', '无派生资源']] })
  groups.push({ title: '解析与索引', rows: [['解析状态', r.status !== 'authorized' ? '待登记入库后建立索引' : r.type === 'document' ? '已解析 · 全文索引' : '按类型建立空间 / 元数据索引'], ['坐标参考', r.meta?.crs || '—'], ['覆盖范围', r.meta?.coverage || '—']] })
  groups.push({ title: '服务能力', rows: [['可用操作', r.action], ['服务端点', r.type === 'service' ? (r.service?.url || '—') : r.source.includes('QGIS') ? 'QGIS Server OGC API（受控）' : '本地适配器'], ['缓存策略', '短期受控令牌，15 分钟']] })
  if (kind === 'deliverable') {
    groups.splice(3, 0, { title: '成果数据与质检', rows: [
      ['成果资源 ID', r.result?.resourceId || r.id],
      ['内部数据 ID', r.result?.internalDataId || '—'],
      ['专业质检状态', r.quality?.status === 'passed' ? '已通过' : r.quality?.status === 'failed' ? '未通过' : r.quality?.status === 'pending' ? '待质检' : '未选择质检'],
      ['质检报告关联', r.quality?.reportNo || (r.quality?.status === 'pending' ? '待质检后回写' : '未选择质检')],
      ['成果包文件数', String(r.files?.length || 0)],
      ['包含格式', (r.formats || []).join(' / ') || '—'],
      ['成果清单', r.quality?.manifest ? '已包含' : '未包含'],
    ] })
  }
  if (kind === 'service') {
    groups.splice(3, 0, { title: '数据服务', rows: [['服务地址', r.service?.url || '—'], ['服务类型', r.service?.type || '—'], ['图层数量', String(r.service?.layers || '—')], ['鉴权方式', r.service?.auth || '—'], ['SLA', r.service?.sla || '—']] })
  }
  return groups
}

function bboxHit(a, b) {
  return !(a[2] < b[0] || b[2] < a[0] || a[3] < b[1] || b[3] < a[1])
}

function taskTick() {
  const now = Date.now()
  for (const t of liveTasks) {
    if (t.state === 'queued') {
      if (now - t.createdAt > 12000) { t.state = 'running'; t.progress = 6; t.started = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5) }
    } else if (t.state === 'running') {
      const step = Math.floor((now - t.createdAt) / 7000) * 9
      t.progress = Math.min(96, 8 + step)
      if (t.progress >= 96) { t.state = 'done'; t.progress = 100 }
    }
  }
}

/** 演示用回复生成：按关键词命中不同工具链，保持"步骤 → 结果"的可见性 */
function buildReply(text, user, net) {
  if (user.id === 'guest') {
    return {
      steps: [{ tool: '个人模型（自带 Key）', detail: '不经集团网关 · 仅本人额度', status: 'ok', ms: 900 }],
      reply: '外部访客模式：已使用你本人的模型 API 完成本轮回答。集团统一模型与集团数据不对访客开放；如需引用某个业务模块，请由管理员在运维管理平台按模块授权后重试。',
      citations: [],
    }
  }
  const visible = liveResources.filter((r) => canSee(user, r, net))
  const lower = text || ''
  const cite = (id) => visible.find((r) => r.id === id)
  const citations = []
  const steps = []
  let reply = ''

  if (/周报|日报|生成报告|写一份报告/.test(lower)) {
    steps.push({ tool: '会话与任务收集', detail: '本周 6 个会话 · 3 个任务', status: 'ok', ms: 1100 })
    return {
      requiresConfirm: true,
      confirmText: '将写入工作区文件「规划一所周报_2026-11-07.md」，并登记到任务中心。是否继续？',
      steps,
      draft: '生成本周规划一所工作进展周报：汇总 3 个已完成任务、2 个进行中任务与 6 个会话要点，输出 Markdown 到工作区。',
      citations,
    }
  }

  if (/周报|日报|生成报告|写一份报告|总结成文/.test(lower)) {
    steps.push({ tool: '会话与任务收集', detail: '本周 6 个会话 · 3 个任务', status: 'ok', ms: 1100 })
    return {
      requiresConfirm: true,
      confirmText: '将写入工作区文件「规划一所周报_2026-11-07.md」，并登记到任务中心。是否继续？',
      steps,
      draft: '生成本周规划一所工作进展周报：汇总 3 个已完成任务、2 个进行中任务与 6 个会话要点，输出 Markdown 到工作区。',
      citations,
    }
  }

  if (/影像|对比|图斑|季度/.test(lower)) {
    const gis = visible.filter((r) => r.type === 'gis').slice(0, 2)
    gis.forEach((r) => citations.push(r.id))
    steps.push({ tool: '空间范围检索', detail: 'bbox=115.96,29.70,116.02,29.75 · 命中 2 项', status: 'ok', ms: 2200 })
    steps.push({ tool: '影像服务', detail: net === 'inet' ? '天地图 WMTS 在线引用（外部服务）' : 'QGIS Server 动态读取 GeoTIFF（GDAL 金字塔）', status: 'warn', ms: 3600 })
    reply = `已完成同视口影像比对：两期共识别变化图斑 3 处（新增工地 2.4 ha、道路贯通 3.1 ha、场地平整 5.6 ha）。\n\n${net === 'inet' ? '本网影像来自天地图在线引用，受服务方配额约束；定量面积需以内部影像复核。' : '影像来自内网季度入库版本，可直接用于成果引用。'}\n\n引用：${gis.map((r) => `${r.id}（${r.name}）`).join('、') || '无可见影像资源'}`
  } else if (/公示|项目|建设单位/.test(lower)) {
    const biz = cite('R-PROJ-PUB') || visible.find((r) => r.type === 'bizdata')
    if (biz) citations.push(biz.id)
    steps.push({ tool: '数据中心检索', detail: 'type=bizdata · keyword=公示', status: 'ok', ms: 820 })
    steps.push({ tool: '文档解析', detail: '表格抽取 86 行 · 脱敏字段校验', status: 'ok', ms: 1600 })
    reply = '已汇总 86 条公示记录，按建设单位归并为 12 组，公示期集中在 9—10 月，其中 3 个项目已过公示期。\n\n' + (biz ? `引用：${biz.id}（${biz.name}）` : '当前网络与授权范围内无公示数据。')
  } else if (/规划|口径|原文|容积率|开发强度/.test(lower)) {
    const doc = cite('R-DOC-GH-2021') || visible.find((r) => r.type === 'document')
    if (doc) citations.push(doc.id)
    steps.push({ tool: '全文检索', detail: 'keyword=开发强度 · 命中 6 段', status: 'ok', ms: 1300 })
    steps.push({ tool: '引用校对', detail: '定位原文第 112—115 页 · 权限复核', status: 'ok', ms: 900 })
    reply = '中心城区新建住宅容积率上限 2.5、建筑密度不超过 30%；历史街区另有专项规定。原文位于第 112—115 页，已标注段落。\n\n' + (doc ? `引用：${doc.id}（${doc.name}）` : '当前目录内无规划文本。')
  } else {
    steps.push({ tool: '数据中心检索', detail: `keyword=${lower.slice(0, 12) || '—'} · 命中 ${Math.min(visible.length, 3)} 项`, status: 'ok', ms: 760 })
    reply = `已按当前网络（${networks[net].label}）与授权范围检索到 ${visible.length} 项可用资源，可按类型筛选后在对话中引用；需要我进一步打开某一项吗？`
  }

  return { reply, steps, citations }
}

const api = {
  'GET /api/bootstrap': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const conf = networks[net]
    const visible = liveResources.filter((r) => canSee(user, r, net))
    json(res, 200, {
      user: { ...user, role: user.id },
      network: { id: net, ...conf },
      allNetworks: networkOrder.map((n) => ({ id: n, label: networks[n].label })),
      allRoles: Object.values(roles).map((r) => ({ id: r.id, label: r.label, name: r.name, unit: r.unit, duty: r.duty })),
      modules,
      quickPrompts,
      counts: {
        resources: visible.length,
        resourcesTotal: liveResources.length,
        plugins: plugins.filter((p) => (p.nets || ['inet']).includes(net)).length,
        apps: liveApps.filter((a) => (a.nets || []).includes(net)).length,
        tasks: liveTasks.length,
      },
      conversations: user.id === 'guest' ? [] : conversations.map((c) => ({ id: c.id, title: c.title, kind: c.kind, time: c.time, model: c.model, turns: c.turns, status: c.status, workspace: c.workspace })),
      tasks: user.id === 'guest' ? [] : liveTasks,
      tools: conf.tools,
      models: user.id === 'guest' ? [] : conf.models,
      groupModels: conf.models,
      ownApiRequired: user.id === 'guest',
      duties: dutiesOf(user),
      dutyCatalog,
      authed: !!parseCookies(req.headers.cookie).jg_role,
      messagesUnread: liveMessages.filter((m) => m.unread).length,
      orgSummary: { units: orgUnits.length, members: liveMembers.length, multiPost: liveMembers.filter((m) => m.posts.length > 1).length },
      orgUnits,
    })
  },
  'POST /api/login': (req, res) => {
    const body = JSON.parse(req.__body || '{}')
    const role = roles[body.role]
    if (!role) return json(res, 400, { error: 'unknown role' })
    closeAllCloudSessions('身份切换，云会话由服务端强制结束')
    res.setHeader('set-cookie', `jg_role=${role.id}; Path=/; SameSite=Lax`)
    logAudit(role, 'auth.login', role.id, 'allow', netOf(req))
    json(res, 200, { ok: true, user: role })
  },
  'POST /api/network': (req, res) => {
    const body = JSON.parse(req.__body || '{}')
    if (!networks[body.id]) return json(res, 400, { error: 'unknown network' })
    closeAllCloudSessions('网络切换，云会话由服务端强制结束')
    res.setHeader('set-cookie', `jg_net=${body.id}; Path=/; SameSite=Lax`)
    json(res, 200, { ok: true, network: { id: body.id, ...networks[body.id] } })
  },
  'GET /api/datacenter/overview': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    json(res, 200, { ok: true, ...buildOverview(user, net) })
  },
  'GET /api/resources': (req, res, url) => {
    const user = roleOf(req)
    const net = netOf(req)
    const type = url.searchParams.get('type') || 'all'
    const category = url.searchParams.get('category') || 'all'
    const q = (url.searchParams.get('q') || '').trim().toLowerCase()
    const list = liveResources
      .filter((r) => canSee(user, r, net))
      .filter((r) => (type === 'all' ? true : r.type === type))
      .filter((r) => (category === 'all' ? true : categoryKey(businessCategoryOf(r)) === categoryKey(category)))
      .filter((r) => (q ? `${r.name}${r.source}${r.desc}${businessCategoryOf(r)}`.toLowerCase().includes(q) : true))
      .sort((a, b) => String(b.updated || '').localeCompare(String(a.updated || '')))
    logAudit(user, 'resource.search', `type=${type} category=${category} q=${q || '-'}`, `allow(${list.length})`, net)
    json(res, 200, {
      items: list.map(pickResource).map((x) => {
        const raw = liveResources.find((r) => r.id === x.id)
        return { ...x, canEdit: canEditResource(user, raw), canDownload: canSee(user, raw, net) }
      }),
      totalVisible: list.length,
      totalAll: liveResources.filter((r) => (r.nets || []).includes(net)).length,
      categories: [...new Set(list.map((r) => businessCategoryOf(r)))],
    })
  },
  'GET /api/resource': (req, res, url) => {
    const user = roleOf(req)
    const net = netOf(req)
    const id = url.searchParams.get('id')
    const resource = liveResources.find((r) => r.id === id)
    if (!resource) return json(res, 404, { error: '资源不存在' })
    if (!canSee(user, resource, net)) {
      logAudit(user, 'resource.read', id, 'deny(403)', net)
      return json(res, 403, {
        error: '越权访问已被拦截',
        detail: `资源「${resource.name}」不在当前网络（${networks[net].label}）与角色的授权范围内；目录、详情、下载链接三处一致判定。`,
        resource: { id: resource.id, name: resource.name, security: resource.security },
      })
    }
    logAudit(user, 'resource.read', id, 'allow', net)
    resourceReads.set(id, (resourceReads.get(id) || 0) + 1)
    json(res, 200, {
      item: {
        ...resource,
        businessCategory: businessCategoryOf(resource),
        dataOwner: resource.dataStandard?.dataOwner || resource.contact || '',
      },
      fieldGroups: fieldGroupsOf(resource),
      canPreview: resource.status === 'authorized',
      permissions: {
        canEdit: canEditResource(user, resource),
        canDownload: true,
        editApproval: canApproveEdit(user),
      },
      editRequest: liveEditRequests.get(id) || null,
      downloadRequest: liveDownloadRequests.get(id) || null,
    })
  },
  'POST /api/resources/register': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    if (user.id === 'guest') return json(res, 403, { error: '外部访客不能上传数据；需由集团员工或部门负责人登记' })
    const body = JSON.parse(req.__body || '{}')
    const kind = ['pure', 'deliverable', 'service'].includes(body.kind) ? body.kind : 'pure'
    const id = `R-NEW-${String(liveResources.length + 1).padStart(2, '0')}`
    const now = stamp()
    const files = Array.isArray(body.files) ? body.files.slice(0, 200) : []
    const formats = Array.isArray(body.formats) && body.formats.length
      ? body.formats
      : [...new Set(files.map((f) => String(f.name || f.path || '').split('.').pop().toUpperCase()).filter((x) => x && x !== '文件'))]
    const dataDate = body.dataDate || body.period || ''
    const businessCategory = body.businessCategory || body.domain || '其他'
    const originalSource = body.originalSource || (body.sourceType === 'cloud' ? '企业云空间现有资料' : '集团自产')
    const internalLevel = /^L[1-5]$/.test(String(body.internalLevel || '')) ? body.internalLevel : 'L2'
    const secrecy = body.secrecy || (body.security === 'secret' ? '待认定' : '非涉密')
    const zoneIds = Array.isArray(body.zones) ? body.zones : (Array.isArray(body.nets) ? body.nets : [net])
    const zones = [...new Set(zoneIds.map((z) => ({ 内网: 'intranet', 政务外网: 'gov', 互联网: 'inet', intranet: 'intranet', gov: 'gov', inet: 'inet' }[z] || z)).filter((z) => ZONE_LABEL[z]))]
    const authorizationType = body.authorizationType === 'orgs' ? 'orgs' : 'group'
    const authorizedOrgs = authorizationType === 'orgs' && Array.isArray(body.authorizedOrgs) ? body.authorizedOrgs : []
    const rightsBasis = body.rightsBasis || ''
    const sourceOrg = body.sourceOrg || user.unit
    const dataOwner = body.dataOwner || user.name
    const projectLinked = body.projectLinked === true
    const projectId = body.projectId || ''
    const projectName = body.projectName || body.project || ''
    const spatialEnabled = body.spatial && body.spatial.enabled === true
    const adminResult = spatialEnabled ? recognizeAdmin(body.spatial.extent) : null
    const spatial = {
      enabled: !!spatialEnabled,
      type: spatialEnabled ? (body.spatial.type || 'GIS_VECTOR') : '',
      typeLabel: spatialEnabled ? (body.spatial.typeLabel || body.spatial.type || 'GIS 矢量') : '',
      mapCatalog: spatialEnabled ? (body.spatial.mapCatalog || '') : '',
      mapPath: spatialEnabled ? (body.spatial.mapPath || '') : '',
      regions: spatialEnabled ? (adminResult?.path || body.spatial.regions || '') : '',
      adminLevel: spatialEnabled ? (adminResult?.level || '') : '',
      adminNote: spatialEnabled ? (adminResult?.note || '') : '',
      crs: spatialEnabled ? (body.spatial.crs || body.crs || '') : '',
      extent: spatialEnabled ? (body.spatial.extent || body.coverage || '') : '',
      scale: spatialEnabled ? (body.spatial.scale || '') : '',
      datasetId: spatialEnabled ? `SD-${id}` : '',
    }
    const hasNewSecurity = !!(body.internalLevel || body.secrecy || body.zones || body.authorizationType)
    const security = hasNewSecurity
      ? ((secrecy !== '非涉密' || Number(internalLevel.slice(1)) >= 4) ? 'secret' : 'internal')
      : (body.security || 'internal')
    const scope = authorizationType === 'orgs' && authorizedOrgs.length
      ? [...new Set([...authorizedOrgs, `unit:${user.unit}`])]
      : ['internal', `unit:${user.unit}`]
    const keywords = Array.isArray(body.keywords)
      ? body.keywords
      : String(body.keywords || '').split(/[,，\s]+/).filter(Boolean)
    const aiMeta = {
      domain: businessCategory,
      subtype: '',
      project: projectName,
      projectCode: projectId,
      coverage: spatial.extent || body.coverage || '',
      period: dataDate,
      updateFreq: body.updateFreq || '',
      keywords,
      caps: Array.isArray(body.caps) ? body.caps : [],
      summary: body.description || body.desc || '',
      searchText: [body.name, businessCategory, projectName, spatial.mapPath, spatial.regions, dataDate, keywords.join(' ')].filter(Boolean).join(' '),
    }
    const service = kind === 'service' ? {
      url: body.serviceUrl || '',
      type: body.serviceType || 'QGIS WMS',
      layers: body.layerCount || 0,
      auth: body.authMode || '统一网关票据',
      updateFreq: body.updateFreq || '',
      sla: body.sla || '',
    } : null
    const qualityRequired = body.qcRequired === true
    const quality = qualityRequired
      ? { required: true, software: body.qcSoftware || '规划成果质检系统', status: 'pending', reportNo: '', manifest: !!body.manifest }
      : { required: false, software: '', status: 'not-required', reportNo: '', manifest: !!body.manifest }
    const item = {
      id,
      name: body.name || '未命名资源',
      type: kind === 'service' ? 'service' : kind === 'deliverable' ? 'deliverable' : (body.type || 'document'),
      format: kind === 'service' ? (body.serviceType || 'OGC API') : kind === 'deliverable' ? '成果包（多格式）' : (body.format || formats[0] || 'PDF'),
      regKind: kind,
      sourceType: body.sourceType === 'cloud' ? 'cloud' : 'local',
      source: body.source || (body.sourceType === 'cloud' ? '企业云空间' : '本地上传'),
      sourceRef: Array.isArray(body.sourceRef) ? body.sourceRef : [],
      files,
      formats,
      updated: now,
      owner: sourceOrg,
      producer: sourceOrg,
      contact: dataOwner,
      security,
      nets: zones.length ? zones : [net],
      scope,
      size: body.size || (files.length ? `${files.length} 个文件` : '—'),
      status: 'pending-dept',
      action: kind === 'service' ? '服务调用 · 图层查询' : kind === 'deliverable' ? '成果包预览 · 空间检索 · 批量下载' : '在线预览 · 全文检索',
      meta: { version: body.version || 'V1.0', crs: spatial.crs || body.crs || '', coverage: spatial.extent || body.coverage || '' },
      aiMeta,
      spatial,
      securityMeta: { internalLevel, secrecy, requestedZones: zones, approvedZones: [], authorizationType, authorizedOrgs, rightsBasis },
      project: { linked: projectLinked, projectId, projectName },
      result: kind === 'deliverable' ? { projectId, resourceId: id, internalDataId: `PKG-${id}`, qcStatus: qualityRequired ? 'pending' : 'not-required', qcReportId: '' } : null,
      dataStandard: {
        schemaVersion: '1.0', dataId: id, dataType: REG_KIND_LABEL[kind], dataName: body.name || '未命名资源',
        businessCategory, uploader: user.name, dataOwner, sourceOrg, originalSource, dataDate,
        registeredAt: now, formats, sizeBytes: body.sizeBytes || 0,
        security: { internalLevel, secrecy, requestedZones: zones, approvedZones: [], authorizationType, authorizedOrgs, rightsBasis },
        project: { linked: projectLinked, projectId, projectName },
        confirmation: { status: 'PENDING', confirmedBy: null, confirmedAt: null },
        registrationStatus: 'PENDING_DEPT',
      },
      service,
      quality,
      workflow: regWorkflow(kind, user, body),
      desc: body.description || body.desc || '本次登记的资源，原始文件保留在来源系统，目录仅登记引用。',
    }
    liveResources.push(item)
    if (kind === 'service') {
      liveDataServices.push({
        id: `DS-${String(liveDataServices.length + 1).padStart(2, '0')}`,
        name: item.name,
        method: 'GET',
        path: service.url,
        scope: (item.scope || []).join(' / '),
        calls: 0,
        latency: '—',
        status: 'pending-dept',
        published: false,
        resourceId: item.id,
      })
    }
    logAudit(user, 'resource.register', id, 'allow', net)
    json(res, 200, { ok: true, item, visible: liveResources.filter((r) => canSee(user, r, net)).length })
  },
  'POST /api/resources/approval': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const r = liveResources.find((x) => x.id === body.id)
    if (!r || !r.workflow) return json(res, 404, { error: '资源不存在或没有登记流程' })
    if (!canSee(user, r, net)) return json(res, 403, { error: '无授权处理该登记' })
    const action = body.action
    const stage = r.workflow.stage
    if (stage === 'done') return json(res, 400, { error: '该资源已完成登记' })
    if (action === 'reject') {
      const step = r.workflow.steps.find((x) => x.key === stage)
      if (step) { step.state = 'rejected'; step.at = stamp(); step.by = user.name }
      r.status = 'rejected'
      r.workflow.stage = 'rejected'
      logAudit(user, 'resource.approval.reject', r.id, 'allow', net)
      return json(res, 200, { ok: true, item: r, message: '已退回登记' })
    }
    if (stage === 'dept' && action === 'dept-approve') {
      const step = r.workflow.steps.find((x) => x.key === 'dept')
      step.state = 'done'; step.at = stamp(); step.by = user.name
      const next = r.workflow.steps.some((x) => x.key === 'qc') ? 'qc' : 'data'
      r.workflow.stage = next
      const nextStep = r.workflow.steps.find((x) => x.key === next)
      if (nextStep) nextStep.state = 'active'
      r.status = regStatusOf(next, r.regKind)
      logAudit(user, 'resource.approval.dept', r.id, 'allow', net)
      return json(res, 200, { ok: true, item: r, message: next === 'qc' ? '部门负责人已同意，进入质检' : '部门负责人已同意，进入数据管理员审批' })
    }
    if (stage === 'qc' && (action === 'qc-pass' || action === 'qc-fail')) {
      const step = r.workflow.steps.find((x) => x.key === 'qc')
      step.at = stamp(); step.by = user.name
      if (action === 'qc-fail') {
        step.state = 'rejected'
        r.quality.status = 'failed'
        r.status = 'rejected'
        r.workflow.stage = 'rejected'
        logAudit(user, 'resource.approval.qc.fail', r.id, 'allow', net)
        return json(res, 200, { ok: true, item: r, message: '质检未通过，已退回' })
      }
      step.state = 'done'
      r.quality.status = 'passed'
      r.quality.reportNo = `QC-${new Date().getFullYear()}-${String(liveResources.length).padStart(4, '0')}`
      const next = r.workflow.steps.find((x) => x.key === 'data')
      r.workflow.stage = 'data'
      if (next) next.state = 'active'
      r.status = 'pending-data'
      logAudit(user, 'resource.approval.qc.pass', r.id, 'allow', net)
      return json(res, 200, { ok: true, item: r, message: '质检通过，进入数据管理员审批' })
    }
    if (stage === 'data' && action === 'data-approve') {
      const step = r.workflow.steps.find((x) => x.key === 'data')
      const done = r.workflow.steps.find((x) => x.key === 'done')
      if (step) { step.state = 'done'; step.at = stamp(); step.by = user.name }
      if (done) { done.state = 'done'; done.at = stamp(); done.by = user.name }
      if (!r.quality.required) r.quality.status = 'assessed'
      r.status = 'authorized'
      r.workflow.stage = 'done'
      r.updated = stamp()
      if (r.regKind === 'service') {
        const ds = liveDataServices.find((x) => x.resourceId === r.id)
        if (ds) { ds.status = 'authorized'; ds.published = true; ds.calls = 0; ds.latency = '—' }
      }
      logAudit(user, 'resource.approval.data', r.id, 'allow', net)
      return json(res, 200, { ok: true, item: r, message: '数据管理员审批通过，资源已登记入库' })
    }
    return json(res, 400, { error: '当前阶段不支持该操作' })
  },
  'POST /api/resources/edit': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const r = liveResources.find((x) => x.id === body.id)
    if (!r) return json(res, 404, { error: '资源不存在' })
    if (!canSee(user, r, net)) return json(res, 403, { error: '无权限编辑该资源' })
    if (!canEditResource(user, r)) return json(res, 403, { error: '仅数据负责人或所属部门负责人可编辑该资源' })
    if (liveEditRequests.get(r.id)?.status === 'pending') return json(res, 400, { error: '该资源已有编辑申请在审批中' })
    const changes = {
      name: String(body.changes?.name || r.name).trim(),
      businessCategory: String(body.changes?.businessCategory || businessCategoryOf(r)).trim(),
      desc: String(body.changes?.desc ?? r.desc ?? '').trim(),
    }
    const now = stamp()
    liveEditRequests.set(r.id, {
      id: `EDIT-${String(Date.now()).slice(-6)}`,
      resourceId: r.id,
      status: 'pending',
      stage: 'dept',
      changes,
      by: user.name,
      at: now,
      steps: [
        { key: 'submit', label: '上传人提交编辑', state: 'done', by: user.name, at: now },
        { key: 'dept', label: '部门负责人同意', state: 'active', by: '', at: '' },
        { key: 'ops', label: '运维管理同意', state: 'pending', by: '', at: '' },
      ],
    })
    logAudit(user, 'resource.edit.submit', r.id, 'allow', net)
    json(res, 200, { ok: true, request: liveEditRequests.get(r.id), message: '编辑申请已提交，需部门负责人与运维管理同意后生效' })
  },
  'POST /api/resources/edit-approval': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const r = liveResources.find((x) => x.id === body.id)
    const edit = liveEditRequests.get(body.id)
    if (!r || !edit) return json(res, 404, { error: '没有待处理的编辑申请' })
    if (edit.status !== 'pending') return json(res, 400, { error: '该编辑申请已处理' })
    const action = body.action
    if (action === 'reject') {
      edit.steps.forEach((s) => { if (s.state === 'active') s.state = 'rejected' })
      edit.status = 'rejected'
      edit.stage = 'rejected'
      logAudit(user, 'resource.edit.reject', r.id, 'allow', net)
      return json(res, 200, { ok: true, message: '编辑申请已退回，原资源保持不变' })
    }
    if (edit.stage === 'dept' && action === 'dept-approve') {
      const step = edit.steps.find((s) => s.key === 'dept')
      step.state = 'done'; step.at = stamp(); step.by = user.name
      edit.stage = 'ops'
      const next = edit.steps.find((s) => s.key === 'ops')
      if (next) next.state = 'active'
      logAudit(user, 'resource.edit.dept', r.id, 'allow', net)
      return json(res, 200, { ok: true, message: '部门负责人已同意，进入运维管理审批' })
    }
    if (edit.stage === 'ops' && action === 'ops-approve') {
      if (!canApproveEdit(user)) return json(res, 403, { error: '仅运维管理可完成编辑审批' })
      const step = edit.steps.find((s) => s.key === 'ops')
      step.state = 'done'; step.at = stamp(); step.by = user.name
      const c = edit.changes || {}
      if (c.name) r.name = c.name
      if (c.businessCategory) {
        r.dataStandard = { ...(r.dataStandard || {}), businessCategory: c.businessCategory, dataOwner: r.dataStandard?.dataOwner || r.contact || edit.by }
      }
      if (typeof c.desc === 'string') {
        r.desc = c.desc
        if (r.aiMeta) r.aiMeta.summary = c.desc
      }
      r.updated = stamp()
      edit.status = 'approved'
      edit.stage = 'done'
      logAudit(user, 'resource.edit.ops', r.id, 'allow', net)
      return json(res, 200, { ok: true, message: '部门负责人与运维管理均已同意，编辑内容已生效' })
    }
    return json(res, 400, { error: '当前阶段不支持该操作' })
  },
  'POST /api/resources/download': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const r = liveResources.find((x) => x.id === body.id)
    if (!r) return json(res, 404, { error: '资源不存在' })
    if (!canSee(user, r, net)) return json(res, 403, { error: '不在当前网络与授权范围内，不能下载' })
    const prev = liveDownloadRequests.get(r.id)
    if (prev?.status === 'approved') {
      return json(res, 200, { ok: true, status: 'approved', request: prev, message: '已签发 15 分钟受控下载链接（演示）' })
    }
    if (prev?.status === 'pending') {
      return json(res, 200, { ok: true, status: 'pending', request: prev, message: '下载申请已在审批中，请等待授权管理员处理' })
    }
    const request = {
      id: `DL-${String(Date.now()).slice(-6)}`,
      resourceId: r.id,
      status: 'pending',
      by: user.name,
      at: stamp(),
      approval: '数据管理员 / 授权管理员',
      note: '按资源密级、网络环境与授权组织审批',
    }
    liveDownloadRequests.set(r.id, request)
    resourceDownloads.set(r.id, (resourceDownloads.get(r.id) || 0) + 1)
    logAudit(user, 'resource.download.request', r.id, 'allow', net)
    json(res, 200, { ok: true, status: 'pending', request, message: '下载申请已提交，审批通过后签发 15 分钟受控链接' })
  },
  'POST /api/spatial/recognize': (req, res) => {
    const body = JSON.parse(req.__body || '{}')
    const result = recognizeAdmin(body.extent)
    if (!result) return json(res, 400, { error: '无法从空间范围识别行政区划；请确认范围坐标包含在演示行政区划边界内' })
    json(res, 200, { ok: true, ...result })
  },
  'POST /api/resources/process': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const r = liveResources.find((x) => x.id === body.id)
    if (!r || !canSee(user, r, net)) return json(res, 403, { error: '无授权发起处理任务' })
    const task = {
      id: `T-${Date.now()}`, title: body.kind === 'preview' ? `生成预览：${r.name}` : `解析并建索引：${r.name}`,
      state: 'queued', progress: 0, target: `数据中心 · ${body.kind === 'preview' ? '预览生成' : '文档解析'}`,
      started: '—', createdAt: Date.now(),
    }
    liveTasks.unshift(task)
    logAudit(user, 'resource.process', r.id, 'allow', net)
    json(res, 200, { ok: true, task })
  },
  'GET /api/spatial': (req, res, url) => {
    const user = roleOf(req)
    const net = netOf(req)
    const bbox = (url.searchParams.get('bbox') || '').split(',').map(Number)
    if (bbox.length !== 4 || bbox.some((n) => Number.isNaN(n))) return json(res, 400, { error: 'bbox 需要 minLng,minLat,maxLng,maxLat' })
    const hits = liveResources
      .filter((r) => canSee(user, r, net) && r.extent && bboxHit(bbox, r.extent))
      .map((r) => ({ ...pickResource(r), extent: r.extent }))
    const noCoord = liveResources.filter((r) => canSee(user, r, net) && r.type === 'cad' && !r.extent).map((r) => r.name)
    logAudit(user, 'resource.spatial', `bbox=${bbox.join(',')}`, `allow(${hits.length})`, net)
    json(res, 200, { items: hits, bounds: spatialBounds, note: noCoord.length ? `${noCoord.join('、')} 坐标信息不完整，不参与空间检索` : '全部命中资源均具备可靠地理参考' })
  },
  'GET /api/imagery': (req, res) => json(res, 200, imageryCompare),
  'GET /api/satellite': (req, res) => {
    const net = netOf(req)
    const user = roleOf(req)
    const local = liveResources.some((r) => ['R-2026-Q3-IMG', 'R-2026-Q2-IMG'].includes(r.id) && canSee(user, r, net))
    json(res, 200, {
      mode: net === 'inet' ? 'online' : 'geotiff',
      source: net === 'inet' ? '天地图 · 在线影像底图（引用）' : 'QGIS Server · GeoTIFF 动态读取（GDAL 金字塔）',
      quarters: satelliteQuarters,
      current: '2026Q3',
      history: ['2010', '2011', '2013', '2015', '2017', '2019', '2021', '2023', '2024', '2025'],
      note: net === 'inet'
        ? '互联网环境影像底图引用天地图库，不复制存储；近四季度切换与卷帘对比仅为浏览，定量分析需内部影像'
        : local ? '最近四个已完成季度 + 2010 年起年度归档' : '涉密影像当前角色不可见，需按涉密数据规定审批',
    })
  },
  'GET /api/plugins': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const list = plugins.filter((p) => (p.nets || ['inet']).includes(net))
    json(res, 200, { items: list, canManage: canManage(user) })
  },
  'GET /api/plugin-review': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '当前角色无插件审批权' })
    json(res, 200, { items: plugins })
  },
  'POST /api/guest/grant': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '只有管理角色可以调整外部访客的模块授权' })
    const body = JSON.parse(req.__body || '{}')
    const module = String(body.module || '')
    if (!module || !roles.guest.visibleModules.includes(module)) return json(res, 400, { error: '模块不在外部访客的可见框架内' })
    roles.guest.grants = roles.guest.grants || []
    const has = roles.guest.grants.includes(module)
    if (body.allow === false) {
      if (has) roles.guest.grants = roles.guest.grants.filter((m) => m !== module)
    } else if (!has) {
      roles.guest.grants.push(module)
    }
    logAudit(user, body.allow === false ? 'guest.grant.revoke' : 'guest.grant.allow', module, 'done')
    json(res, 200, { ok: true, grants: roles.guest.grants })
  },
  'POST /api/plugins/review': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    if (!canManage(user)) return json(res, 403, { error: '当前角色无插件审批权' })
    const p = plugins.find((x) => x.id === body.id)
    if (!p) return json(res, 404, { error: '插件不存在' })
    if (p.status !== 'review') return json(res, 409, { error: '该插件不在待审队列' })
    p.status = body.action === 'approve' ? 'enabled' : 'rejected'
    p.reviewedBy = user.name
    p.reviewedAt = new Date().toISOString().slice(0, 16).replace('T', ' ')
    logAudit(user, 'plugin.review.' + (body.action === 'approve' ? 'approve' : 'reject'), p.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item: p })
  },
  'POST /api/plugins/toggle': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const p = plugins.find((x) => x.id === body.id)
    if (!p) return json(res, 404, { error: '插件不存在' })
    p.status = p.status === 'enabled' ? 'disabled' : 'enabled'
    logAudit(user, 'plugin.toggle', p.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item: p })
  },
  'GET /api/plugin-market': (req, res) => {
    const net = netOf(req)
    json(res, 200, { items: liveMarket, network: networks[net]?.label || '' })
  },
  'POST /api/plugin-market/install': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = liveMarket.find((x) => x.id === body.id)
    if (!item) return json(res, 404, { error: '插件不存在' })
    if (item.scope === '需授权' && !canManage(user)) return json(res, 403, { error: '该插件需部门负责人授权后安装' })
    item.installed = !item.installed
    logAudit(user, item.installed ? 'plugin.install' : 'plugin.remove', item.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item })
  },
  'GET /api/plugin-subs': (req, res) => {
    json(res, 200, { items: pluginSubs })
  },
  'POST /api/plugin-subs': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const name = String(body.name || '').trim()
    if (!name) return json(res, 400, { error: '请填写插件名称' })
    const id = `SUB-${String(pluginSubs.length + 1).padStart(2, '0')}`
    const sub = {
      id, name, version: body.version || '0.1.0', file: body.file || 'plugin.zip', size: body.size || '—',
      author: user.name, unit: user.unit, scope: body.scope || '全集团', status: 'pending', submitted: '刚刚',
      desc: body.desc || '企业自研插件，按插件开发规范打包，经平台检测与审核后上架', checks: [
        ['DSH Bundle 格式', '通过', 'package.json / index.js / cordis.patch.yml 齐全'],
        ['依赖与版本', '通过', '仅使用平台内置依赖'],
        ['权限声明', '通过', '按清单声明，未申请写权限'],
        ['静态安全扫描', '通过', '无网络外联、无动态执行、无凭据读取'],
        ['隔离测试', '通过', '沙箱内 6 组样例通过'],
      ],
    }
    pluginSubs.unshift(sub)
    logAudit(user, 'plugin.submit', id, 'allow', netOf(req))
    json(res, 200, { ok: true, item: sub })
  },
  'POST /api/plugin-subs/review': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '仅管理员可审核插件' })
    const body = JSON.parse(req.__body || '{}')
    const sub = pluginSubs.find((x) => x.id === body.id)
    if (!sub) return json(res, 404, { error: '提交记录不存在' })
    const action = body.action === 'approve' ? 'approve' : 'reject'
    sub.status = action === 'approve' ? 'approved' : 'rejected'
    sub.reviewed = '刚刚'
    if (action === 'reject') sub.reason = String(body.reason || '').trim() || '安全检测或权限说明不满足上架要求'
    if (action === 'approve' && !liveMarket.some((m) => m.subId === sub.id)) {
      liveMarket.unshift({
        id: `M-${Date.now()}`, subId: sub.id, section: '企业内部', name: sub.name, desc: sub.desc,
        publisher: sub.unit, installed: false, scope: sub.scope, version: sub.version,
      })
    }
    logAudit(user, 'plugin.review.' + action, sub.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item: sub })
  },
  'GET /api/projects': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const list = liveProjects.filter((p) => (p.nets || ['inet']).includes(net) && (canManage(user) || p.scope === 'all-org' || p.scope.endsWith(user.unit) || p.owner === user.name))
    json(res, 200, { items: list })
  },
  'POST /api/projects/create': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const name = String(body.name || '').trim()
    if (!name) return json(res, 400, { error: '项目名称不能为空' })
    const item = {
      id: `PRJ-${String(liveProjects.length + 1).padStart(2, '0')}`, name, desc: String(body.desc || '新建项目，等待补充目标与成员。'),
      owner: user.name, dept: user.unit, members: 1, updated: stamp(),
      convs: 0, files: 0, scope: 'user', nets: [netOf(req)], pinned: false, personal: true,
    }
    liveProjects.unshift(item)
    logAudit(user, 'project.create', item.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item })
  },
  'GET /api/apps': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const list = liveApps.filter((a) => ((a.nets || []).includes(net)) && (a.status === 'published' || canManage(user)))
    json(res, 200, { items: list, canManage: canManage(user) })
  },
  'GET /api/app': (req, res, url) => {
    const id = url.searchParams.get('id')
    const app = liveApps.find((a) => a.id === id)
    if (!app) return json(res, 404, { error: '应用不存在' })
    json(res, 200, { item: app })
  },
  'POST /api/apps/register': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    if (!canManage(user)) return json(res, 403, { error: '当前角色无应用提交权限' })
    const body = JSON.parse(req.__body || '{}')
    const id = `A-${Date.now().toString().slice(-6)}`
    const item = {
      id, name: body.name, desc: body.desc || '部门自建应用', dept: body.dept || user.unit,
      version: body.version || '0.1.0', nets: [net], status: 'review', icon: 'grid',
      maintainer: `${user.name}（${user.duty}）`, usage: body.usage || '由部门维护，按组织与角色授权使用',
      history: [{ version: body.version || '0.1.0', date: new Date().toISOString().slice(0, 10), note: '提交接入验证' }],
    }
    liveApps.unshift(item)
    logAudit(user, 'app.register', id, 'allow', net)
    json(res, 200, { ok: true, item, checks: ['URL 可达性', '身份回调', '权限声明', '健康检查'] })
  },
  'POST /api/apps/action': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    if (!canManage(user)) return json(res, 403, { error: '仅授权角色可执行审核与发布' })
    const body = JSON.parse(req.__body || '{}')
    const app = liveApps.find((a) => a.id === body.id)
    if (!app) return json(res, 404, { error: '应用不存在' })
    if (body.action === 'approve') app.status = 'published'
    if (body.action === 'reject') app.status = 'draft'
    if (body.action === 'offline') app.status = 'draft'
    if (body.action === 'rollback') {
      const prev = (app.history || [])[1]
      if (prev) { app.version = prev.version; app.history = [{ version: prev.version, date: new Date().toISOString().slice(0, 10), note: `回滚至 ${prev.version}` }, ...(app.history || [])] }
    }
    logAudit(user, `app.${body.action}`, app.id, 'allow', net)
    json(res, 200, { ok: true, item: app })
  },
  'GET /api/tasks': (req, res) => {
    taskTick()
    json(res, 200, { items: liveTasks })
  },
  'POST /api/tasks': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const task = {
      id: `T-${Date.now()}`, title: body.title || '未命名任务', state: 'queued', progress: 0,
      target: body.target || 'AI 工作台', started: '—', createdAt: Date.now(),
    }
    liveTasks.unshift(task)
    logAudit(user, 'task.create', task.id, 'allow', netOf(req))
    json(res, 200, { ok: true, task })
  },
  'POST /api/tasks/retry': (req, res) => {
    const body = JSON.parse(req.__body || '{}')
    const t = liveTasks.find((x) => x.id === body.id)
    if (!t) return json(res, 404, { error: '任务不存在' })
    t.state = 'queued'
    t.progress = 0
    t.createdAt = Date.now()
    t.reason = ''
    json(res, 200, { ok: true, item: t })
  },
  'GET /api/conversations': (req, res) => json(res, 200, {
    items: conversations.map((c) => ({ id: c.id, title: c.title, kind: c.kind, time: c.time, model: c.model, turns: c.turns, status: c.status, workspace: c.workspace })),
  }),
  'GET /api/conversation': (req, res, url) => {
    const id = url.searchParams.get('id')
    const c = conversations.find((x) => x.id === id)
    if (!c) return json(res, 404, { error: '会话不存在' })
    json(res, 200, { item: c })
  },
  'POST /api/chat': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const text = (body.text || '').trim()
    if (!text) return json(res, 400, { error: '请输入任务描述' })
    if (user.id === 'guest' && !String(body.ownApiKey || '').trim()) {
      return json(res, 403, {
        error: '外部访客只能使用自己的模型 API，不能使用集团统一配置的 API；请在「设置 · 模型与密钥」填写自己的 Key',
        ownApiRequired: true,
      })
    }
    let conv = conversations.find((c) => c.id === body.conversationId)
    if (!conv) {
      conv = {
        id: `C-${Date.now()}`, title: text.length > 26 ? `${text.slice(0, 26)}…` : text,
        time: '刚刚', model: networks[net].models.find((m) => m.id === body.model)?.label || networks[net].models[0].label,
        turns: 0, status: 'done', workspace: '默认工作区', messages: [],
      }
      conversations.unshift(conv)
    }
    conv.messages.push({ role: 'user', text, time: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5) })
    const result = buildReply(text, user, net)
    logAudit(user, 'chat.message', conv.id, 'allow', net)
    json(res, 200, { ok: true, conversation: conv, ...result })
  },
  'POST /api/chat/confirm': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const conv = conversations.find((c) => c.id === body.conversationId)
    const task = {
      id: `T-${Date.now()}`, title: '生成周报草稿（已确认写入）', state: 'running', progress: 12,
      target: 'AI 工作台 · 写文件', started: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5), createdAt: Date.now(),
    }
    liveTasks.unshift(task)
    const msg = {
      role: 'assistant',
      text: '已生成周报草稿并写入工作区「规划一所周报_2026-11-07.md」，同时登记为任务。写操作已二次确认，操作记录可在审计中查。',
      time: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5),
      steps: [
        { tool: '写文件', detail: '工作区写入 · 已确认', status: 'ok', ms: 900 },
        { tool: '任务登记', detail: task.id, status: 'ok', ms: 400 },
      ],
    }
    if (conv) conv.messages.push(msg)
    logAudit(user, 'file.write', '规划一所周报_2026-11-07.md', 'allow(confirmed)', net)
    json(res, 200, { ok: true, message: msg, task })
  },
  'GET /api/automations': (req, res) => json(res, 200, { items: automations }),
  'POST /api/automations': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = { id: `AU-${Date.now().toString().slice(-4)}`, name: body.name || '未命名定时任务', schedule: body.schedule || '每天 08:30', status: 'active', last: '—', next: '待首次执行', owner: user.name, prompt: body.prompt || '', deliver: body.deliver || '工作台 · 定时任务结果', model: '系统默认模型' }
    automations.unshift(item)
    logAudit(user, 'automation.create', item.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item })
  },
  'POST /api/automations/run': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const a = automations.find((x) => x.id === body.id)
    if (!a) return json(res, 404, { error: '不存在' })
    a.last = `${new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5)} 手动触发成功`
    const task = { id: `T-${Date.now()}`, title: `手动执行 · ${a.name}`, state: 'queued', progress: 0, target: `定时任务 · ${a.deliver || '工作台'}`, started: '—', createdAt: Date.now() }
    liveTasks.unshift(task)
    logAudit(user, 'automation.run', a.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item: a, task })
  },
  'GET /api/console': (req, res) => {
      json(res, 200, {
        roles: consoleRoles,
        nav: consoleNav,
        modules: consoleModules,
        sections: consoleSections,
        scopes: consoleScopeOptions,
      })
    },
    'GET /api/tickets': (req, res) => {
    const user = roleOf(req)
    json(res, 200, { items: liveTickets, canManage: canManage(user) })
  },
  'POST /api/tickets': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '仅运维与管理角色可创建工单' })
    const body = JSON.parse(req.__body || '{}')
    const item = {
      id: `W-2026-${100 + liveTickets.length + 1}`, type: body.type || '入职', subject: body.subject || '未填写',
      net: body.net || networks[netOf(req)].label, owner: '未分派', status: '待分派',
      due: '今天 18:00', created: new Date().toLocaleString('zh-CN', { hour12: false }).slice(5, 16).replace('/', '-'),
      history: [{ time: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5), text: '人工创建工单' }],
    }
    liveTickets.unshift(item)
    logAudit(user, 'ticket.create', item.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item })
  },
  'POST /api/tickets/action': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '仅运维与管理角色可处置工单' })
    const body = JSON.parse(req.__body || '{}')
    const t = liveTickets.find((x) => x.id === body.id)
    if (!t) return json(res, 404, { error: '工单不存在' })
    const now = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5)
    if (body.action === 'assign') { t.owner = '运维 · 周工'; t.status = '处理中'; t.history.push({ time: now, text: '已分派给运维 · 周工' }) }
    if (body.action === 'done') { t.status = '待复核'; t.history.push({ time: now, text: '处理完成，提交复核（权限已按新岗位重算）' }) }
    if (body.action === 'verify') { t.status = '已闭环'; t.history.push({ time: now, text: '复核通过，工单闭环并留痕' }) }
    logAudit(user, `ticket.${body.action}`, t.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item: t })
  },
  'GET /api/feedback': (req, res) => {
    const user = roleOf(req)
    json(res, 200, { items: liveFeedback, canManage: canManage(user) })
  },
  'POST /api/feedback': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = {
      id: `F-${Date.now().toString().slice(-4)}`, kind: body.kind || '建议', subject: body.subject || '未填写',
      app: body.app || '九规智能中枢 客户端', task: body.task || '', status: '待受理',
      actor: user.name, time: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5),
    }
    liveFeedback.unshift(item)
    notifications.unshift({ id: `N-${Date.now()}`, kind: 'warn', title: '收到新反馈', body: `${user.name}：${item.subject}`, time: '刚刚', nav: 'admin' })
    logAudit(user, 'feedback.create', item.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item })
  },
  'GET /api/cloud': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const systems = liveCloud.map((s) => {
      let state = 'usable'
      let reason = ''
      if (s.net !== net) { state = 'offnet'; reason = `仅${networks[s.net].label}实例可连` }
      else if (s.status === '维护中') { state = 'down'; reason = '系统维护中，暂不开放新会话' }
      else if (s.level === 'secret' && !(net === 'secret' && user.scopes.includes('secret'))) { state = 'locked'; reason = '当前角色无涉密授权' }
      else if (!user.scopes.includes('all-org') && !s.scopes.some((x) => user.scopes.includes(x))) {
        state = 'locked'
        reason = s.approval === 'dept' ? '需部门负责人审批后开通' : '当前角色无该系统授权'
      }
      const cred = cloudCredentials.find((c) => c.id === s.credId) || {}
      return { ...s, state, reason, credential: { account: cred.account, algo: cred.algo, rotated: cred.rotated, export: cred.export, inject: cred.inject } }
    })
    json(res, 200, {
      systems,
      sessions: cloudLog,
      policy: cloudPolicy,
      instance: {
        network: networks[net].label,
        region: net === 'secret' ? '涉密内网 · 机房 A' : net === 'gov' ? '政务网 · 政务云' : '互联网 · 企业云',
        kernel: 'Chromium 开源内核（容器化，远程画面流）',
        isolation: '一会话一容器，会话结束即销毁',
        ttl: '15 分钟',
      },
      user: { name: user.name, unit: user.unit },
    })
  },

  'GET /api/drive': (req, res, url) => {
    const user = roleOf(req)
    const want = url?.searchParams?.get('space') || 'CL-DEPT'
    const space = liveClouds.find((c) => c.id === want) || liveClouds[0]
    json(res, 200, {
      quota: {
        total: space.total, used: space.used, unit: 'GB', dept: space.name, members: space.members,
        spaceId: space.id, status: space.status, policy: space.note,
        user: user.name,
        scopePolicy: space.note,
      },
      spaces: liveClouds.map((c) => ({ ...c })),
      space: { ...space },
      items: liveDrive.filter((it) => (it.space || 'CL-DEPT') === space.id)
        .map((it) => ({ ...it, typeLabel: typeLabelOf(it), isShared: isSharedItem(it), editable: canEditItem(user, it) })),
      formats: supportedFormats,
      canManage: canManage(user),
    })
  },
  'POST /api/drive/apply': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const name = String(body.name || '').trim()
    if (name.length < 2) return json(res, 400, { error: '请填写专班名称' })
    if (liveClouds.some((c) => c.name === name)) return json(res, 409, { error: '该专班云已存在' })
    liveClouds.push({
      id: 'CL-TEAM-' + (liveClouds.length + 1), name, kind: 'team', title: '专班云',
      status: 'pending', members: 1, total: 512, used: 0, note: '申请已提交，待数据管理员审批',
    })
    logAudit(user, 'drive.apply', name, '申请专班工作云', netOf(req))
    json(res, 200, { ok: true, spaces: liveClouds.map((c) => ({ ...c })) })
  },
  'GET /api/drive/item': (req, res, url) => {
    const user = roleOf(req)
    const item = liveDrive.find((d) => d.id === url.searchParams.get('id'))
    if (!item) return json(res, 404, { error: '文件不存在' })
    const doc = collabOf(item)
    if (!liveComments.has(item.id)) liveComments.set(item.id, [])
    const blocks = blocksOfDoc(item.id, doc)
    json(res, 200, {
      item: { ...item, typeLabel: typeLabelOf(item), isShared: isSharedItem(item), editable: canEditItem(user, item) },
      content: doc,
      canEdit: canEditItem(user, item),
      history: doc.history,
      blocks,
      comments: liveComments.get(item.id),
      rev: revOfDoc(item.id, doc),
      presence: presenceOfDoc(item.id),
      members: liveMembers.map((m) => ({ name: m.name, unit: m.unit, role: m.role })),
    })
  },
  'POST /api/drive/delete': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = liveDrive.find((d) => d.id === body.id)
    if (!item) return json(res, 404, { error: '文件不存在或已删除' })
    if (!(canManage(user) || canEditItem(user, item))) return json(res, 403, { error: '没有删除该文件的权限' })
    const idx = liveDrive.indexOf(item)
    if (idx >= 0) liveDrive.splice(idx, 1)
    logAudit(user, 'drive.delete', item.name, item.space || 'CL-DEPT', net)
    json(res, 200, { ok: true, id: item.id, name: item.name })
  },
  'POST /api/drive/update': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = liveDrive.find((d) => d.id === body.id)
    if (!item) return json(res, 404, { error: '文件不存在' })
    if (!canEditItem(user, item)) return json(res, 403, { error: '仅创建者与共享者可在线编辑' })
    const doc = collabOf(item)
    const restore = Number(body.restoreVersion || 0)
    let restored = null
    if (restore) {
      const target = doc.history.find((h) => h.v === restore && h.snapshot)
      if (!target) return json(res, 400, { error: '该版本无快照，无法恢复' })
      restored = target.snapshot
      if (restored.body !== undefined) doc.body = restored.body
      if (restored.table !== undefined) doc.table = restored.table
      if (restored.slides !== undefined) doc.slides = restored.slides
    }
    if (!restore && Number(body.baseRev) && Number(body.baseRev) !== revOfDoc(item.id, doc)) {
      return json(res, 409, {
        error: 'conflict',
        rev: revOfDoc(item.id, doc),
        by: doc.history[0]?.by || '他人',
        time: doc.history[0]?.time || '',
        hint: '他人已保存新版本，你的编辑内容仍在本地，请先对比再保存',
      })
    }
    if (!restore && body.content && typeof body.content === 'object') {
      if (typeof body.content.body === 'string') doc.body = body.content.body
      if (Array.isArray(body.content.table)) doc.table = body.content.table
      if (Array.isArray(body.content.slides)) doc.slides = body.content.slides
    }
    if (body.blockPerms && typeof body.blockPerms === 'object') {
      liveBlockPerms.set(item.id, { ...(liveBlockPerms.get(item.id) || {}), ...body.blockPerms })
    }
    const v = Math.max(...doc.history.map((h) => h.v)) + 1
    const summary = restore ? `恢复至 v${restore}` : (String(body.summary || '').trim() || '在线编辑并保存')
    const snapshot = { body: doc.body, table: doc.table, slides: doc.slides }
    doc.history.unshift({ v, by: user.name, time: stamp(), summary, snapshot })
    item.updated = stamp()
    item.tags = [...new Set([...(item.tags || []), '在线协作'])]
    logAudit(user, 'drive.update', item.id, `allow v${v}`, netOf(req))
    liveRev.set(item.id, v)
    const presence = presenceOfDoc(item.id)
    if (!presence.some((x) => x.name === user.name)) presence.push({ name: user.name, at: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5), para: '—', state: '刚刚保存' })
    json(res, 200, { ok: true, item: { ...item, typeLabel: typeLabelOf(item), isShared: isSharedItem(item) }, content: doc, history: doc.history, version: v, rev: v, blocks: blocksOfDoc(item.id, doc) })
  },
  'POST /api/drive/comment': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = liveDrive.find((d) => d.id === body.id)
    if (!item) return json(res, 404, { error: '文件不存在' })
    if (!canEditItem(user, item)) return json(res, 403, { error: '仅共享者可评论' })
    const doc = collabOf(item)
    const blockId = String(body.blockId || '')
    const text = String(body.text || '').trim()
    if (!text) return json(res, 400, { error: '评论内容不能为空' })
    if (!liveComments.has(item.id)) liveComments.set(item.id, [])
    const cm = {
      id: `CM-${String(Date.now()).slice(-6)}`,
      blockId: blockId || blocksOfDoc(item.id, doc)[0]?.id || 'b1',
      author: user.name,
      at: stamp(),
      text,
      mentions: Array.isArray(body.mentions) ? body.mentions : [],
      resolved: false,
    }
    liveComments.get(item.id).unshift(cm)
    logAudit(user, 'drive.comment', `${item.id}/${cm.blockId}`, 'allow', netOf(req))
    json(res, 200, { ok: true, comment: cm, comments: liveComments.get(item.id) })
  },
  'POST /api/drive/comment-resolve': (req, res) => {
    const body = JSON.parse(req.__body || '{}')
    const item = liveDrive.find((d) => d.id === body.id)
    if (!item) return json(res, 404, { error: '文件不存在' })
    const list = liveComments.get(item.id) || []
    const cm = list.find((x) => x.id === body.commentId)
    if (!cm) return json(res, 404, { error: '评论不存在' })
    cm.resolved = !!body.resolved
    json(res, 200, { ok: true, comments: list })
  },
  'POST /api/drive/block-perm': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = liveDrive.find((d) => d.id === body.id)
    if (!item) return json(res, 404, { error: '文件不存在' })
    if (item.owner !== user.name) return json(res, 403, { error: '仅创建者可设置段落权限' })
    const blockId = String(body.blockId || '')
    const perm = ['edit', 'comment', 'read'].includes(body.perm) ? body.perm : 'edit'
    liveBlockPerms.set(item.id, { ...(liveBlockPerms.get(item.id) || {}), [blockId]: perm })
    logAudit(user, 'drive.blockperm', `${item.id}/${blockId}`, `set ${perm}`, netOf(req))
    const doc = collabOf(item)
    json(res, 200, { ok: true, blocks: blocksOfDoc(item.id, doc) })
  },
  'GET /api/drive/presence': (req, res, url) => {
    const id = url.searchParams.get('id')
    const item = liveDrive.find((d) => d.id === id)
    if (!item) return json(res, 404, { error: '文件不存在' })
    const doc = collabOf(item)
    json(res, 200, { rev: revOfDoc(id, doc), presence: presenceOfDoc(id), comments: (liveComments.get(id) || []).length, updated: item.updated })
  },
  'GET /api/drive/diff': (req, res, url) => {
    const id = url.searchParams.get('id')
    const item = liveDrive.find((d) => d.id === id)
    if (!item) return json(res, 404, { error: '文件不存在' })
    const doc = collabOf(item)
    const from = Number(url.searchParams.get('from') || 0)
    const to = Number(url.searchParams.get('to') || 0)
    const fh = doc.history.find((h) => h.v === from)
    const th = doc.history.find((h) => h.v === to)
    if (!fh || !th) return json(res, 404, { error: '版本不存在' })
    const a = linesOfContent(fh.snapshot || {})
    const b = linesOfContent(th.snapshot || {})
    const rows = diffLines(a, b)
    json(res, 200, { from, to, rows, added: rows.filter((r) => r.type === 'add').length, removed: rows.filter((r) => r.type === 'del').length })
  },
  'GET /api/notices': (req, res) => {
    json(res, 200, {
      items: liveNotices,
      unread: liveNotices.filter((n) => n.unread).length,
      categories: ['全部', '通知', '公告', '文章'],
      canPublish: canManage(roleOf(req)),
    })
  },
  'POST /api/notices/read': (req, res) => {
    const body = JSON.parse(req.__body || '{}')
    liveNotices.forEach((n) => { if (body.id === 'all' || n.id === body.id) n.unread = false })
    json(res, 200, { ok: true })
  },
  'POST /api/notices/publish': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '通知公告由部门负责人及以上发布' })
    const body = JSON.parse(req.__body || '{}')
    const title = String(body.title || '').trim()
    const text = String(body.body || '').trim()
    if (!title || !text) return json(res, 400, { error: '标题与正文不能为空' })
    const id = `NT-${String(Date.now()).slice(-4)}`
    const item = {
      id, title, category: body.category || '通知', dept: user.unit, author: user.name,
      time: stamp(), unread: true, pinned: !!body.pinned,
      summary: text.split('\n')[0].slice(0, 80), body: text.split('\n'),
    }
    liveNotices.unshift(item)
    logAudit(user, 'notices.publish', id, 'allow', netOf(req))
    json(res, 200, { ok: true, item })
  },
  'POST /api/drive/share': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = liveDrive.find((d) => d.id === body.id)
    if (!item) return json(res, 404, { error: '文件不存在' })
    const to = String(body.to || '').trim()
    if (!to) return json(res, 400, { error: '请选择共享对象' })
    if (!item.shared.includes(to)) item.shared.push(to)
    item.scope = '项目内共享'
    const doc = collabOf(item)
    if (item.type !== 'pdf') {
      const v = Math.max(0, ...doc.history.map((h) => h.v)) + 1
      doc.history.unshift({ v, by: user.name, time: stamp(), summary: `共享给 ${to}，开启在线协作` })
    }
    logAudit(user, 'drive.share', item.id, `allow→${to}`, netOf(req))
    json(res, 200, { ok: true, item: { ...item, typeLabel: typeLabelOf(item), isShared: isSharedItem(item) } })
  },
  'GET /api/contacts': (req, res, url) => {
    const q = (url.searchParams.get('q') || '').trim().toLowerCase()
    const list = contacts.filter((c) => (q ? `${c.name}${c.duty}${c.dept}${c.mail}`.toLowerCase().includes(q) : true))
    const depts = [...new Set(contacts.map((c) => c.dept))]
    json(res, 200, { items: list, depts, total: contacts.length })
  },
  'GET /api/im': (req, res) => json(res, 200, { items: liveIm }),
  'GET /api/im/files': (req, res) => {
    const items = []
    liveIm.forEach((t) => t.messages.forEach((m, i) => {
      if (!m.file) return
      const drive = liveDrive.find((d) => d.id === m.file.itemId)
      items.push({
        threadId: t.id, threadName: t.name, msgIndex: i, from: m.from, time: m.time,
        name: m.file.name, type: m.file.type, size: m.file.size, itemId: m.file.itemId,
        online: Boolean(drive?.online || m.file.online), owner: drive?.owner || '',
      })
    }))
    json(res, 200, { items })
  },
  'GET /api/im/search': (req, res, url) => {
    const q = String(url.searchParams.get('q') || '').trim()
    if (!q) return json(res, 200, { items: [], q })
    const items = []
    liveIm.forEach((t) => t.messages.forEach((m, i) => {
      const hitText = String(m.text || '').includes(q)
      const hitFile = Boolean(m.file && String(m.file.name || '').includes(q))
      if (!hitText && !hitFile) return
      items.push({ threadId: t.id, threadName: t.name, msgIndex: i, from: m.from, time: m.time, text: m.text || '', file: m.file || null })
    }))
    json(res, 200, { items, q })
  },
  'POST /api/im/attach': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const thread = liveIm.find((t) => t.id === body.id)
    const item = liveDrive.find((d) => d.id === body.itemId)
    if (!thread) return json(res, 404, { error: '会话不存在' })
    if (!item) return json(res, 404, { error: '文件不存在' })
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5)
    thread.messages.push({
      from: user.name, time,
      text: String(body.text || '').trim() || `发送了文件：${item.name}`,
      file: { itemId: item.id, name: item.name, type: item.type, size: item.size, online: Boolean(item.online) },
    })
    thread.time = time
    logAudit(user, 'im.attach', item.id, 'allow', net)
    json(res, 200, { ok: true, thread })
  }, 
  'POST /api/im/ai': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const thread = liveIm.find((t) => t.id === body.id)
    if (!thread) return json(res, 404, { error: '会话不存在' })
    const wanted = Array.isArray(body.files) ? body.files.map(String) : []
    const pool = thread.messages.filter((m) => m.file).map((m) => m.file)
    const picked = wanted.length ? pool.filter((f) => wanted.includes(f.name)) : pool.slice(-3)
    if (!picked.length) return json(res, 400, { error: '本会话还没有可分析的文件，先从「＋」发一份文件' })
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5)
    const names = picked.map((f) => f.name)
    const question = String(body.question || '').trim()
    thread.messages.push({
      from: user.name, time,
      text: `请智能助手分析：${names.join('、')}${question ? '\n' + question : ''}`,
    })
    thread.messages.push({ from: '智能助手', text: buildImAnalysis(picked, user.name), ai: true, time })
    thread.unread = 0
    thread.time = time
    logAudit(user, 'im.ai', thread.id, `分析 ${names.length} 份文档`, netOf(req))
    json(res, 200, { ok: true, item: thread })
  },
  'POST /api/im/send': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const thread = liveIm.find((t) => t.id === body.id)
    const text = String(body.text || '').trim()
    if (!thread) return json(res, 404, { error: '会话不存在' })
    if (!text) return json(res, 400, { error: '消息不能为空' })
    const msg = { from: user.name, text, time: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5) }
    if (body.file && body.file.itemId) {
      msg.file = {
        itemId: String(body.file.itemId),
        name: String(body.file.name || ''),
        type: String(body.file.type || 'docx'),
        size: String(body.file.size || ''),
        online: Boolean(body.file.online),
      }
    }
    thread.messages.push(msg)
    thread.unread = 0
    thread.time = msg.time
    if (/@智能助手/.test(text) || body.ai) {
      const docs = thread.messages.filter((m) => m.file).map((m) => m.file).slice(-5)
      const aiText = buildImAnalysis(docs, user.name)
      thread.messages.push({ from: '智能助手', text: aiText, ai: true, time: msg.time })
      logAudit(user, 'im.ai', thread.id, '调用系统 AI 分析会话文档', netOf(req))
    }
    logAudit(user, 'im.send', thread.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item: thread, message: msg })
  },
  'POST /api/im/member': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const thread = liveIm.find((t) => t.id === body.id)
    if (!thread) return json(res, 404, { error: '会话不存在' })
    if (thread.kind !== 'group') return json(res, 400, { error: '单聊没有成员管理' })
    if (thread.autoMembers) {
      return json(res, 403, { error: `${thread.dept} 部门工作群的成员由人事资料自动匹配，需在人事系统调整任职关系` })
    }
    thread.roster = thread.roster || []
    if (body.action === 'add') {
      const c = contacts.find((x) => x.id === body.contactId) || { name: String(body.name || ''), duty: '', dept: '' }
      if (!c.name) return json(res, 400, { error: '请选择要加入的成员' })
      if (thread.roster.some((r) => r.name === c.name)) return json(res, 409, { error: `${c.name} 已在群内` })
      thread.roster.push({ name: c.name, duty: c.duty || '', dept: c.dept || '', source: 'manual' })
      thread.members = thread.roster.length
      logAudit(user, 'im.member.add', thread.id, `${c.name} 加入群聊`, netOf(req))
      return json(res, 200, { ok: true, item: thread })
    }
    if (body.action === 'remove') {
      const name = String(body.name || '')
      if (name === thread.owner) return json(res, 400, { error: '群主不能被移出，需先转让群主' })
      thread.roster = thread.roster.filter((r) => r.name !== name)
      thread.members = thread.roster.length
      logAudit(user, 'im.member.remove', thread.id, `${name} 移出群聊`, netOf(req))
      return json(res, 200, { ok: true, item: thread })
    }
    json(res, 400, { error: '未知操作' })
  },
  'POST /api/im/online': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = liveDrive.find((d) => d.id === body.itemId)
    if (!item) return json(res, 404, { error: '附件对应的文件不存在或已归档' })
    if (item.type === 'pdf' || item.type === 'atlas' || item.type === 'gdb' || item.type === 'dwg') {
      return json(res, 400, { error: '该类型不支持在线协同编辑，可转为在线文档的只有文档、表格与演示' })
    }
    const before = [...(item.shared || [])]
    const thread = liveIm.find((t) => t.id === body.threadId)
    const targetSpace = String(body.space || thread?.space || 'CL-DEPT')
    item.space = targetSpace
    item.shared = targetSpace === 'CL-PERSONAL' ? ['本人'] : ['all-org']
    item.online = true
    liveIm.forEach((t) => t.messages.forEach((m) => {
      if (m.file && m.file.itemId === item.id) m.file.online = true
    }))
    const doc = collabOf(item)
    if (!doc.history.some((h) => h.summary === '由聊天附件转为在线文档')) {
      doc.history.unshift({
        v: doc.history.length + 1,
        by: user.name,
        time: stamp(),
        summary: '由聊天附件转为在线文档',
        snapshot: { body: doc.body, table: doc.table, slides: doc.slides },
      })
    }
    logAudit(user, 'im.doc.online', item.id, 'allow', net)
    json(res, 200, { ok: true, item: { id: item.id, name: item.name, type: item.type, shared: item.shared, online: true, space: targetSpace, before } })
  },
  'POST /api/docs/create': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const format = String(body.format || '')
    if (!supportedFormats.includes(format)) return json(res, 400, { error: `不支持的格式：${format}` })
    const title = String(body.title || '').trim() || '未命名文档'
    const doc = buildDocument({
      format,
      title,
      body: body.body || '本文件由 九规智能中枢 企业版中枢按当前网络与授权数据生成。',
      table: body.table,
      slides: body.slides,
    })
    const id = `DOC-${Date.now().toString().slice(-6)}`
    const filename = `${title.replace(/[\\/:*?"<>|]/g, '_')}.${doc.ext}`
    generatedDocs.set(id, { buffer: doc.buffer, filename, mime: doc.mime })
    const item = {
      id, name: title, type: format, size: `${(doc.buffer.length / 1024).toFixed(0)} KB`, owner: user.name,
      dept: user.unit, updated: stamp(),
      shared: [], scope: '仅本人', tags: ['AI 生成'], url: `/api/docs/download?id=${id}`,
    }
    liveDrive.unshift(item)
    collabDocs.set(id, {
      kind: format === 'xlsx' ? 'sheet' : format === 'pptx' ? 'slide' : 'doc',
      body: body.body || '',
      table: Array.isArray(body.table) ? body.table : undefined,
      slides: Array.isArray(body.slides) ? body.slides : undefined,
      history: [{ v: 1, by: user.name, time: item.updated, summary: 'AI 生成' }],
    })
    logAudit(user, 'docs.create', `${filename}`, 'allow', net)
    json(res, 200, { ok: true, item, filename, url: item.url, bytes: doc.buffer.length, format })
  },
  'GET /api/docs/download': (req, res, url) => {
    const id = url.searchParams.get('id')
    const doc = generatedDocs.get(id)
    if (!doc) return json(res, 404, { error: '文档不存在或已失效' })
    res.writeHead(200, {
      'content-type': doc.mime,
      'content-length': doc.buffer.length,
      'content-disposition': `attachment; filename="doc.${doc.filename.split('.').pop()}"; filename*=UTF-8''${encodeURIComponent(doc.filename)}`,
      'cache-control': 'no-store',
    })
    res.end(doc.buffer)
  },
  'POST /api/cloud/open': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const s = liveCloud.find((x) => x.id === body.systemId)
    if (!s) return json(res, 404, { error: '系统不存在' })
    let deny = ''
    if (s.net !== net) deny = `仅${networks[s.net].label}实例可连，当前为${networks[net].label}`
    else if (s.status === '维护中') deny = '系统维护中，暂不开放新会话'
    else if (s.level === 'secret' && !(net === 'secret' && user.scopes.includes('secret'))) deny = '当前角色无涉密授权'
    else if (!user.scopes.includes('all-org') && !s.scopes.some((x) => user.scopes.includes(x))) {
      deny = s.approval === 'dept' ? '需部门负责人审批后开通该政务系统' : '当前角色无该系统授权'
    }
    if (deny) {
      logAudit(user, 'cloud.open', s.id, 'deny', netOf(req))
      return json(res, 403, { error: deny, detail: { system: s.name, network: networks[s.net].label, approval: s.approval } })
    }
    const id = `CS-${Date.now().toString().slice(-6)}`
    const session = {
      id, systemId: s.id, user: user.name, started: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5),
      ttl: '剩余 15:00', state: 'active',
      watermark: `${user.name} · ${user.unit} · ${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}`,
      record: `REC-${id.slice(-6)}`, ops: 0, note: '新会话，凭据已在服务端注入',
    }
    cloudLog.unshift(session)
    logAudit(user, 'cloud.open', s.id, 'allow', netOf(req))
    json(res, 200, {
      session,
      ticket: { token: `st-${Math.random().toString(36).slice(2, 10)}`, ttlSec: 900, boundTo: `${user.name}|${s.id}|${net}` },
      notice: '凭据仅在服务端注入，不回传客户端；会话结束容器即销毁。',
    })
  },
  'POST /api/cloud/close': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const s = cloudLog.find((x) => x.id === body.id)
    if (!s) return json(res, 404, { error: '会话不存在' })
    s.state = 'closed'
    s.ttl = '已结束'
    s.note = `会话由${user.name}主动结束，录屏已归档`
    logAudit(user, 'cloud.close', s.id, 'allow', netOf(req))
    json(res, 200, { ok: true, session: s })
  },
  'GET /api/monitor': (req, res) => {
    taskTick()
    json(res, 200, { ...monitor, tasks: liveTasks.filter((t) => t.state === 'failed').length })
  },
  'GET /api/knowledge': (req, res, url) => {
    const q = (url.searchParams.get('q') || '').trim().toLowerCase()
    const items = knowledgeDocs.filter((d) => (q ? `${d.title}${d.summary}${d.dept}`.toLowerCase().includes(q) : true))
    json(res, 200, { items, total: knowledgeDocs.length, indexed: knowledgeDocs.filter((d) => d.indexed).length })
  },
  'GET /api/notifications': (req, res) => {
    const user = roleOf(req)
    const rs = readNotifications.get(user.name) || new Set()
    const items = notifications.map((n) => ({ ...n, unread: !rs.has(n.id) && n.unread !== false }))
    json(res, 200, { items, unread: items.filter((n) => n.unread).length })
  },
  'POST /api/notifications/read': (req, res) => {
    const user = roleOf(req)
    if (!readNotifications.has(user.name)) readNotifications.set(user.name, new Set())
    const rs = readNotifications.get(user.name)
    const body = JSON.parse(req.__body || '{}')
    if (body.id === 'all') notifications.forEach((n) => rs.add(n.id))
    else if (body.id) rs.add(body.id)
    json(res, 200, { ok: true })
  },
  'GET /api/notebooks': (req, res) => {
    const user = roleOf(req)
    const sharedRanked = sharedNotebooksByVotes()
    const featuredIds = notebookFeaturedIds()
    const rankOf = new Map(sharedRanked.map((n, i) => [n.id, i + 1]))
    const list = LIVE_NOTEBOOKS.map((n) => {
      const mine = n.owner === user.name
      const votes = Number(n.votes || 0)
      return {
        id: n.id, title: n.title, topic: n.topic, owner: n.owner, desc: n.desc, updated: n.updated,
        sourceCount: n.sources.length, noteCount: n.notes.length,
        displaySources: Math.min(NOTEBOOK_MAX_SOURCES, Number(n.sourceCountHint || 0) || n.sources.length),
        coverTone: n.coverTone || 0, coverIcon: n.coverIcon || 'doc',
        shared: !!n.shared, recommended: !!n.recommended, votes,
        pinned: !!n.pinned, collections: [...(n.collections || [])],
        sharedBy: n.sharedBy || n.owner,
        featuredRank: rankOf.get(n.id) || 0,
        featured: featuredIds.has(n.id),
        sync: n.sources.filter((x) => !x.kind && x.versionMode === 'follow' && x.resolvedVersionId !== latestVersionOf(x.resourceId)).length,
        mine,
      }
    })
    json(res, 200, {
      items: list,
      topics: notebookTopics,
      collections: NOTEBOOK_COLLECTIONS,
      sharedCount: sharedRanked.length,
      limits: { maxSources: NOTEBOOK_MAX_SOURCES, quotaBytes: NOTEBOOK_QUOTA_BYTES, usedBytes: notebookUsageBytes(user.name) },
      owner: user.name,
      principle: '笔记本只保存对数据中心 Resource 的引用，不复制文件、不改来源；引用默认跟随已发布最新版本，笔记与对话独立保存',
    })
  },
  'POST /api/notebooks': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const title = String(body.title || '').trim()
    if (!title) return json(res, 400, { error: '笔记本标题不能为空' })
    const nb = {
      id: `NB-${String(LIVE_NOTEBOOKS.length + 1).padStart(2, '0')}`,
      title, topic: String(body.topic || '未分类'), owner: user.name, role: user.id,
      desc: String(body.desc || '').trim(), securityDomain: netOf(req),
      createdAt: stamp(), updated: stamp(), sources: [], notes: [], chat: [],
      collections: [], pinned: false, shared: false, votes: 0, votedBy: [],
    }
    LIVE_NOTEBOOKS.unshift(nb)
    logAudit(user, 'notebook.create', nb.id, 'allow', netOf(req))
    json(res, 200, { ok: true, notebook: nb })
  },
  'POST /api/notebook/manage': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const nb = LIVE_NOTEBOOKS.find((n) => n.id === body.id)
    if (!nb) return json(res, 404, { error: '笔记本不存在' })
    const op = String(body.op || '')
    if (op === 'rename') {
      const title = String(body.title || '').trim()
      if (!title) return json(res, 400, { error: '名称不能为空' })
      nb.title = title.slice(0, 80)
      nb.updated = stamp()
      logAudit(user, 'notebook.rename', nb.id, 'allow', netOf(req))
      return json(res, 200, { ok: true, notebook: { id: nb.id, title: nb.title } })
    }
    if (op === 'pin') {
      nb.pinned = !!body.pinned
      nb.updated = stamp()
      logAudit(user, 'notebook.pin', nb.id, 'allow', netOf(req))
      return json(res, 200, { ok: true, pinned: nb.pinned })
    }
    if (op === 'share') {
      nb.shared = !!body.shared
      if (nb.shared) nb.sharedBy = user.name
      nb.updated = stamp()
      logAudit(user, 'notebook.share', nb.id, 'allow', netOf(req))
      return json(res, 200, { ok: true, shared: nb.shared, sharedBy: nb.sharedBy || nb.owner })
    }
    if (op === 'collections') {
      const incoming = Array.isArray(body.collections) ? body.collections : []
      nb.collections = [...new Set(incoming.map((x) => String(x || '').trim()).filter(Boolean))].slice(0, 8)
      nb.collections.forEach((c) => {
        if (!NOTEBOOK_COLLECTIONS.includes(c) && c.length <= 24) NOTEBOOK_COLLECTIONS.push(c)
      })
      nb.updated = stamp()
      logAudit(user, 'notebook.collection', nb.id, 'allow', netOf(req))
      return json(res, 200, { ok: true, collections: nb.collections, all: NOTEBOOK_COLLECTIONS })
    }
    if (op === 'delete') {
      const idx = LIVE_NOTEBOOKS.findIndex((n) => n.id === nb.id)
      LIVE_NOTEBOOKS.splice(idx, 1)
      logAudit(user, 'notebook.delete', nb.id, 'allow', netOf(req))
      return json(res, 200, { ok: true, id: nb.id })
    }
    json(res, 400, { error: '不支持的操作' })
  },
  'POST /api/notebook/vote': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const nb = LIVE_NOTEBOOKS.find((n) => n.id === body.id)
    if (!nb) return json(res, 404, { error: '笔记本不存在' })
    if (!Array.isArray(nb.votedBy)) nb.votedBy = []
    if (!nb.votes) nb.votes = 0
    if (nb.votedBy.includes(user.name)) return json(res, 409, { error: '你已经推荐过这本笔记本了' })
    nb.votedBy.push(user.name)
    nb.votes += 1
    logAudit(user, 'notebook.vote', nb.id, 'allow', netOf(req))
    json(res, 200, { ok: true, votes: nb.votes, title: nb.title, featured: notebookFeaturedIds().has(nb.id) })
  },
  'GET /api/notebook': (req, res, url) => {
    const user = roleOf(req)
    const id = url.searchParams.get('id')
    const nb = LIVE_NOTEBOOKS.find((n) => n.id === id) || LIVE_NOTEBOOKS[0]
    if (!nb) return json(res, 404, { error: '笔记本不存在' })
    const net = netOf(req)
    const sources = nb.sources.map((x) => {
      if (x.kind && x.kind !== 'resource') {
        return {
          resourceId: x.resourceId,
          kind: x.kind,
          name: x.name || x.resourceId,
          type: x.kind,
          format: x.format || '',
          security: '外部来源',
          owner: '本笔记本',
          versionMode: 'follow',
          resolvedVersionId: '—',
          latestVersion: '—',
          syncStatus: '外部来源 · 不参与版本同步',
          canSee: true,
          addedAt: x.addedAt,
          url: x.url || '',
          sizeBytes: Number(x.sizeBytes || 0),
        }
      }
      const r = liveResources.find((y) => y.id === x.resourceId)
      const latest = latestVersionOf(x.resourceId)
      const follow = x.versionMode === 'follow'
      return {
        resourceId: x.resourceId,
        name: r?.name || x.resourceId,
        type: r?.type, format: r?.format, security: r?.security, owner: r?.owner,
        versionMode: x.versionMode,
        resolvedVersionId: x.resolvedVersionId,
        latestVersion: latest,
        syncStatus: follow ? (x.resolvedVersionId === latest ? '跟随最新' : '有更新待同步') : (x.resolvedVersionId === latest ? '已钉住（当前最新）' : '已钉住'),
        canSee: r ? canSee(user, r, net) : false,
        addedAt: x.addedAt,
      }
    })
    const resList = liveResources
      .filter((r) => canSee(user, r, net))
      .map((r) => ({ id: r.id, name: r.name, type: r.type, format: r.format, security: r.security, updated: r.updated, version: latestVersionOf(r.id) }))
    json(res, 200, {
      notebook: { ...nb, sources },
      notes: nb.notes,
      chat: nb.chat,
      candidates: resList,
      limits: { maxSources: NOTEBOOK_MAX_SOURCES, quotaBytes: NOTEBOOK_QUOTA_BYTES, usedBytes: notebookUsageBytes(nb.owner) },
      principles: [
        '数据源唯一：只引用数据中心 Resource，不复制原始文件，不允许改来源内容',
        '动态引用：默认跟随已发布最新版本，检索与问答始终用最新资料',
        '笔记独立：个人撰写或 AI 生成并保存的笔记独立持久化，不随来源更新改写',
        '能力复用：复用数据中心的检索、解析与权限，以及 Harness 的模型与会话',
      ],
    })
  },
  'POST /api/notebook/source': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const nb = LIVE_NOTEBOOKS.find((n) => n.id === body.id)
    if (!nb) return json(res, 404, { error: '笔记本不存在' })
    if (body.removeSource) {
      nb.sources = nb.sources.filter((x) => x.resourceId !== body.removeSource)
      nb.updated = stamp()
      logAudit(user, 'notebook.source.remove', body.removeSource, 'allow', netOf(req))
      return json(res, 200, { ok: true, sources: nb.sources })
    }
    if (nb.sources.length >= NOTEBOOK_MAX_SOURCES) {
      return json(res, 409, { error: `每本笔记本最多 ${NOTEBOOK_MAX_SOURCES} 个来源，请先移除不用的来源` })
    }
    if (body.source && body.source.name) {
      const s = body.source
      const kind = ['file', 'cloud'].includes(s.kind) ? s.kind : 'file'
      const rid = String(s.id || `${kind.toUpperCase()}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`)
      if (nb.sources.some((x) => x.resourceId === rid)) return json(res, 409, { error: '该来源已在本笔记本中' })
      const sizeBytes = kind === 'file' ? Math.max(0, Number(s.sizeBytes) || 0) : 0
      if (kind === 'file') {
        const used = notebookUsageBytes(nb.owner)
        if (used + sizeBytes > NOTEBOOK_QUOTA_BYTES) {
          return json(res, 409, { error: `个人智能笔记本容量不足：已用 ${quotaSizeText(used)} / 15 GB，本次文件需要 ${quotaSizeText(sizeBytes)}。数据中心与云空间来源不占容量。` })
        }
      }
      nb.sources.push({
        resourceId: rid,
        kind,
        name: String(s.name).slice(0, 180),
        url: String(s.url || ''),
        format: String(s.format || ''),
        sizeBytes,
        versionMode: 'follow',
        resolvedVersionId: '—',
        addedAt: stamp(),
      })
      nb.updated = stamp()
      logAudit(user, 'notebook.source.add', rid, 'allow', netOf(req))
      return json(res, 200, { ok: true, sources: nb.sources, limits: { maxSources: NOTEBOOK_MAX_SOURCES, quotaBytes: NOTEBOOK_QUOTA_BYTES, usedBytes: notebookUsageBytes(nb.owner) } })
    }
    const r = liveResources.find((x) => x.id === body.resourceId)
    if (!r) return json(res, 404, { error: '资源不存在' })
    if (!canSee(user, r, netOf(req))) return json(res, 403, { error: '无权引用该资源，请先在数据中心申请授权' })
    if (nb.sources.some((x) => x.resourceId === r.id)) return json(res, 409, { error: '该资源已在笔记本中' })
    nb.sources.push({
      resourceId: r.id,
      versionMode: body.versionMode === 'pinned' ? 'pinned' : 'follow',
      resolvedVersionId: latestVersionOf(r.id),
      addedAt: stamp(),
    })
    nb.updated = stamp()
    logAudit(user, 'notebook.source.add', r.id, 'allow', netOf(req))
    json(res, 200, { ok: true, sources: nb.sources, limits: { maxSources: NOTEBOOK_MAX_SOURCES, quotaBytes: NOTEBOOK_QUOTA_BYTES, usedBytes: notebookUsageBytes(nb.owner) } })
  },
  'POST /api/notebook/sync': (req, res) => {
    const body = JSON.parse(req.__body || '{}')
    const nb = LIVE_NOTEBOOKS.find((n) => n.id === body.id)
    if (!nb) return json(res, 404, { error: '笔记本不存在' })
    let changed = 0
    nb.sources.forEach((x) => {
      if (x.kind && x.kind !== 'resource') return
      if (x.versionMode === 'follow') {
        const latest = latestVersionOf(x.resourceId)
        if (x.resolvedVersionId !== latest) { x.resolvedVersionId = latest; changed += 1 }
      }
    })
    nb.updated = stamp()
    json(res, 200, { ok: true, changed, sources: nb.sources })
  },
  'POST /api/notebook/note': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const nb = LIVE_NOTEBOOKS.find((n) => n.id === body.id)
    if (!nb) return json(res, 404, { error: '笔记本不存在' })
    if (body.removeNote) {
      nb.notes = nb.notes.filter((x) => x.id !== body.removeNote)
      nb.updated = stamp()
      return json(res, 200, { ok: true, notes: nb.notes })
    }
    const note = body.note || {}
    const exist = nb.notes.find((x) => x.id === note.id)
    if (exist) {
      exist.title = String(note.title || exist.title)
      exist.content = String(note.content ?? exist.content)
      if (Array.isArray(note.citations)) exist.citations = note.citations
      if (note.kind) exist.kind = String(note.kind)
      exist.updatedAt = stamp()
      exist.author = user.name
    } else {
      nb.notes.unshift({
        id: `NN-${String(Date.now()).slice(-6)}`,
        title: String(note.title || '未命名笔记'),
        content: String(note.content || ''),
        kind: String(note.kind || 'chat'),
        author: user.name,
        updatedAt: stamp(),
        citations: Array.isArray(note.citations) ? note.citations : [],
      })
    }
    nb.updated = stamp()
    logAudit(user, 'notebook.note.save', nb.id, 'allow', netOf(req))
    json(res, 200, { ok: true, notes: nb.notes })
  },
  'POST /api/notebook/ask': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const nb = LIVE_NOTEBOOKS.find((n) => n.id === body.id)
    if (!nb) return json(res, 404, { error: '笔记本不存在' })
    const q = String(body.q || '').trim()
    if (!q) return json(res, 400, { error: '问题不能为空' })
    const net = netOf(req)
    const cites = []
    const parts = []
    nb.sources.forEach((x) => {
      if (x.kind && x.kind !== 'resource') {
        parts.push(`《${x.name}》${x.format ? `（${x.format}）` : ''}${x.url ? ` ${x.url}` : ''}`)
        return
      }
      const r = liveResources.find((y) => y.id === x.resourceId)
      if (!r || !canSee(user, r, net)) return
      const ver = x.versionMode === 'follow' ? latestVersionOf(r.id) : x.resolvedVersionId
      const meta = Object.entries(r.meta || {}).map(([k, v]) => `${k}=${v}`).join('，')
      parts.push(`《${r.name}》${ver}（${r.format}，${r.owner}）${r.desc || ''}${meta ? '；' + meta : ''}`)
      cites.push({ resourceId: r.id, versionId: ver, locator: r.type === 'document' ? '全文检索命中段落' : (r.type === 'bizdata' ? '字段 / 指标字典' : '元数据与空间范围') })
    })
    const hitNotes = nb.notes.filter((n) => `${n.title}${n.content}`.includes(q.slice(0, 4)))
    const answer = parts.length
      ? `按当前引用的 ${parts.length} 项来源（已按最新发布版本解析）作答：${q}。可用的依据是 ${parts.slice(0, 3).join('；')}。${hitNotes.length ? `并结合笔记本中的 ${hitNotes.length} 条个人笔记。` : ''}具体结论建议在正文与指标字典中逐条核对定位。`
      : '这个笔记本还没有引用资料。请先添加 Web、数据中心、云空间或本地来源，再提问——笔记本不会复制文件，只建立引用关系。'
    const msg = { role: 'ai', at: stamp(), text: answer, citations: cites }
    nb.chat.push({ role: 'user', at: stamp(), text: q })
    nb.chat.push(msg)
    nb.updated = stamp()
    logAudit(user, 'notebook.ask', nb.id, `allow ${nb.sources.length} sources`, net)
    json(res, 200, { ok: true, answer, citations: cites, chat: nb.chat })
  },
  'GET /api/academy': (req, res) => {
    const user = roleOf(req)
    json(res, 200, {
      items: liveAcademy,
      categories: [{ key: 'all', label: '全部' }, { key: 'classic', label: '经典项目' }, { key: 'video', label: '学习视频' }, { key: 'doc', label: '学习课件' }, { key: 'spec', label: '规范文件' }],
      stats: { ...academyStats, user: user.name, dept: user.unit },
    })
  },
  'POST /api/academy/progress': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const item = liveAcademy.find((a) => a.id === body.id)
    if (!item) return json(res, 404, { error: '资源不存在' })
    item.progress = Math.max(0, Math.min(100, Number(body.progress || 0)))
    logAudit(user, 'academy.progress', item.id, `allow ${item.progress}%`, netOf(req))
    json(res, 200, { ok: true, item })
  },
  'GET /api/ai/tools': (req, res) => {
    json(res, 200, {
      items: aiTools,
      identity: '工具以“当前登录员工 + 当前网络”为调用身份，每次调用按模块授权判定并写审计',
    })
  },
  'POST /api/ai/invoke': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const name = String(body.tool || '')
    const args = body.args && typeof body.args === 'object' ? body.args : {}
    const tool = aiTools.find((t) => t.name === name)
    if (!tool) return json(res, 404, { error: '工具不存在', hint: '先调用 GET /api/ai/tools 获取可用工具' })
    const TOOL_MODULE = { 云空间: 'drive', 通知公告: 'notice', 教学园地: 'academy', 通讯录: 'contacts', 即时通讯: 'im', 任务: 'tasks', 智能笔记本: 'knowledge', 数据中心: 'datacenter' }
    if (!user.visibleModules.includes(TOOL_MODULE[tool.target] || 'tasks')) {
      logAudit(user, 'ai.invoke', name, 'deny(403)', netOf(req))
      return json(res, 403, { error: `当前角色无权调用「${tool.label}」` })
    }
    let result = null
    if (name === 'drive_search') {
      const q = String(args.q || '').trim()
      const type = String(args.type || '').trim()
      const list = liveDrive
        .filter((d) => (q ? `${d.name}${(d.tags || []).join('')}${d.dept}`.includes(q) : true))
        .filter((d) => (type ? d.type === type : true))
        .map((d) => ({ id: d.id, name: d.name, type: d.type, typeLabel: typeLabelOf(d), dept: d.dept, owner: d.owner, shared: d.shared, scope: d.scope, family: ASSET_FAMILY[d.type] || DOC_LABELS[d.type] }))
      result = { count: list.length, items: list.slice(0, 8) }
    } else if (name === 'drive_read') {
      const item = liveDrive.find((d) => d.id === args.id) || liveDrive[0]
      const family = ASSET_FAMILY[item.type] || '文档'
      if (ASSET_FAMILY[item.type]) {
        result = {
          id: item.id, name: item.name, family,
          layers: ['用地边界', '道路中心线', '管线', '影像底图'], crs: 'CGCS2000 / 3-degree Gauss-Kruger CM 117E',
          extent: '114.98E–116.12E, 29.32N–29.98N', note: '原型返回元数据与图层清单；正式版由 GIS 服务按要素级授权返回',
        }
      } else {
        const doc = collabOf(item)
        result = { id: item.id, name: item.name, family, kind: doc.kind, content: doc.body || doc.table || doc.slides }
      }
    } else if (name === 'notice_list') {
      const q = String(args.q || '').trim()
      result = { count: liveNotices.filter((n) => (q ? `${n.title}${n.summary}`.includes(q) : true)).length, items: liveNotices.filter((n) => (q ? `${n.title}${n.summary}`.includes(q) : true)).slice(0, 5).map((n) => ({ id: n.id, title: n.title, category: n.category, dept: n.dept, time: n.time, summary: n.summary })) }
    } else if (name === 'academy_search') {
      const q = String(args.q || '').trim()
      const list = liveAcademy.filter((a) => (q ? `${a.title}${(a.tags || []).join('')}${a.summary}`.includes(q) : true))
      result = { count: list.length, items: list.slice(0, 6).map((a) => ({ id: a.id, title: a.title, fmt: a.fmt, kind: a.kind, duration: a.duration, pages: a.pages, dept: a.dept })) }
    } else if (name === 'contacts_find') {
      const q = String(args.q || '').trim().toLowerCase()
      const list = contacts.filter((c) => (q ? `${c.name}${c.duty}${c.dept}${c.tags.join('')}`.toLowerCase().includes(q) : true))
      result = { count: list.length, items: list.slice(0, 5).map((c) => ({ name: c.name, duty: c.duty, dept: c.dept, mail: c.mail })) }
    } else if (name === 'im_send') {
      const thread = liveIm.find((t) => t.id === args.id)
      if (!thread || !String(args.text || '').trim()) return json(res, 400, { error: '会话不存在或消息为空' })
      thread.messages.push({ from: user.name, text: String(args.text).trim(), time: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5) })
      result = { ok: true, thread: thread.id, from: user.name }
    } else if (name === 'notice_read') {
      const n = liveNotices.find((x) => x.id === args.id) || liveNotices[0]
      result = { id: n.id, title: n.title, category: n.category, dept: n.dept, author: n.author, time: n.time, body: n.body }
    } else if (name === 'notebook_search') {
      const q = String(args.q || '').trim()
      const scope = args.notebook ? LIVE_NOTEBOOKS.filter((n) => n.id === args.notebook) : LIVE_NOTEBOOKS
      const items = []
      scope.slice(0, 3).forEach((n) => {
        n.sources.forEach((x) => {
          const r = liveResources.find((y) => y.id === x.resourceId)
          if (!r || !canSee(user, r, netOf(req))) return
          const hay = `${r.name}${r.desc}${q}`.toLowerCase()
          if (q && !hay.includes(q.toLowerCase())) return
          items.push({ notebook: n.id, resourceId: r.id, name: r.name, version: x.versionMode === 'follow' ? latestVersionOf(r.id) : x.resolvedVersionId, locator: '资源元数据 / 全文索引', summary: r.desc })
        })
      })
      result = { count: items.length, items: items.slice(0, 6), scope: scope.map((n) => ({ id: n.id, title: n.title, sources: n.sources.length })), note: '返回引用关系而非文件副本；检索复用数据中心全文索引' }
    } else if (name === 'resource_query') {
      const q = String(args.q || '').trim().toLowerCase()
      const list = liveResources.filter((r) => (q ? `${r.name}${(r.tags || []).join('')}`.toLowerCase().includes(q) : true))
      result = { count: list.length, items: list.slice(0, 5).map((r) => ({ id: r.id, name: r.name, security: r.security, scope: r.scope, extent: r.extent, updated: r.updated })) }
    } else if (name === 'task_create') {
      const title = String(args.title || '').trim() || 'AI 创建的待办'
      result = { ok: true, id: `T-AI${String(Date.now()).slice(-5)}`, title, state: '待分配' }
    }
    logAudit(user, 'ai.invoke', name, 'allow', netOf(req))
    json(res, 200, { ok: true, tool: name, actor: `${user.name}（${user.unit}）`, result })
  },
  'POST /api/logout': (req, res) => {
    res.setHeader('set-cookie', 'jg_role=; Path=/; Max-Age=0; SameSite=Lax')
    json(res, 200, { ok: true })
  },
  'GET /api/org': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '仅管理角色可查看组织与授权' })
    json(res, 200, {
      units: orgUnits,
      members: liveMembers.map((m) => ({ ...m, duties: liveDuties.get(m.role) || [] })),
      dutyCatalog,
      roleDuties: Object.fromEntries([...liveDuties.entries()].map(([k, v]) => [k, v])),
      changes: audit.filter((a) => String(a.action || '').startsWith('org.duty') || String(a.action || '').startsWith('resource.grant')).slice(0, 12),
    })
  },
  'POST /api/org/duty': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '仅管理角色可授予职能' })
    const body = JSON.parse(req.__body || '{}')
    const member = liveMembers.find((m) => m.id === body.memberId || m.role === body.memberRole)
    const targetRole = body.memberRole || member?.role
    if (!targetRole || !roles[targetRole]) return json(res, 400, { error: '成员不在可授予范围（演示角色限定）' })
    const duty = String(body.duty || '')
    if (!dutyCatalog.some((d) => d.code === duty)) return json(res, 400, { error: '未知职能' })
    const list = liveDuties.get(targetRole) || []
    const allow = body.allow !== false
    const next = allow ? [...new Set([...list, duty])] : list.filter((d) => d !== duty)
    liveDuties.set(targetRole, next)
    logAudit(user, allow ? 'org.duty.grant' : 'org.duty.revoke', `${targetRole}:${duty}`, 'allow', netOf(req))
    json(res, 200, { ok: true, role: targetRole, duties: next })
  },
  'GET /api/messages': (req, res) => {
    const user = roleOf(req)
    json(res, 200, {
      items: liveMessages,
      unread: liveMessages.filter((m) => m.unread).length,
      canManage: canManage(user),
    })
  },
  'POST /api/messages/read': (req, res) => {
    const body = JSON.parse(req.__body || '{}')
    if (body.all) liveMessages.forEach((m) => { m.unread = false })
    else {
      const m = liveMessages.find((x) => x.id === body.id)
      if (m) m.unread = false
    }
    json(res, 200, { ok: true, unread: liveMessages.filter((m) => m.unread).length })
  },
  'GET /api/resource/versions': (req, res, url) => {
    const id = url.searchParams.get('id')
    const versions = liveVersions[id] || [
      { v: 'V1.0', date: '2026-05-06', note: '首次登记并建立索引', by: '数据中心', state: '当前' },
    ]
    json(res, 200, { id, items: versions, grants: liveGrants[id] || [] })
  },
  'POST /api/resource/version': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user) && !dutiesOf(user).includes('dataAdmin')) return json(res, 403, { error: '版本与生命周期由数据管理员维护' })
    const body = JSON.parse(req.__body || '{}')
    const id = body.id
    const list = liveVersions[id] || (liveVersions[id] = [{ v: 'V1.0', date: '2026-05-06', note: '首次登记并建立索引', by: '数据中心', state: '当前' }])
    const act = body.action || 'publish'
    if (act === 'publish') {
      const n = list.filter((x) => x.v.startsWith('V')).length
      list.forEach((x) => { x.state = x.state === '当前' ? '历史' : x.state })
      list.unshift({ v: `V${n + 1}.0`, date: new Date().toISOString().slice(0, 10), note: body.note || '上传新版本并重建索引', by: `${user.name}（${user.unit}）`, state: '当前' })
    } else if (act === 'archive') {
      list[0].state = '已归档'
    } else if (act === 'restore') {
      list.forEach((x) => { if (x.state === '已归档') x.state = '当前' })
    }
    logAudit(user, `resource.version.${act}`, id, 'allow', netOf(req))
    json(res, 200, { ok: true, id, items: liveVersions[id], message: act === 'publish' ? '已上传新版本，原文件与派生关系保留' : act === 'archive' ? '已归档，可按授权恢复' : '已恢复为当前版本' })
  },
  'POST /api/resource/grant': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user) && !dutiesOf(user).includes('dataAdmin')) return json(res, 403, { error: '资源授权由数据管理员维护' })
    const body = JSON.parse(req.__body || '{}')
    const id = body.id
    const rights = Array.isArray(body.rights) ? body.rights : ['查看']
    liveGrants[id] = liveGrants[id] || []
    liveGrants[id] = liveGrants[id].filter((g) => !(g.target === body.target && g.type === body.type))
    if (rights.length) liveGrants[id].push({ target: body.target, type: body.type, rights, by: user.name, at: new Date().toISOString().slice(0, 16).replace('T', ' ') })
    logAudit(user, 'resource.grant', `${id}:${body.target}`, 'allow', netOf(req))
    json(res, 200, { ok: true, id, grants: liveGrants[id] })
  },
  'GET /api/dataservices': (req, res) => json(res, 200, { items: liveDataServices, base: 'http://datacenter.jg.local/api' }),
  'GET /api/model/config': (req, res) => {
    const user = roleOf(req)
    const conf = liveModelConfig.get(user.id) || { provider: '企业云模型（集团网关）', endpoint: 'https://ai.jg.local/v1', key: 'sk-••••••••••••4f2a', defaultModel: (networks[netOf(req)].models[0] || {}).label || '—', testedAt: '2026-11-06 18:20', latency: '—' }
    json(res, 200, { ...conf, providers: ['企业云模型（集团网关）', 'OpenAI 兼容端点', '个人自建服务'], ownApiRequired: user.id === 'guest' })
  },
  'POST /api/model/config': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const prev = liveModelConfig.get(user.id) || { provider: '企业云模型（集团网关）', endpoint: 'https://ai.jg.local/v1', key: 'sk-••••••••••••4f2a', defaultModel: '—' }
    const next = { ...prev, provider: body.provider || prev.provider, endpoint: body.endpoint || prev.endpoint, defaultModel: body.defaultModel || prev.defaultModel }
    if (body.key && !String(body.key).includes('•')) next.key = `${String(body.key).slice(0, 3)}••••••••${String(body.key).slice(-4)}`
    liveModelConfig.set(user.id, next)
    logAudit(user, 'model.config', `${next.provider}`, 'allow', netOf(req))
    json(res, 200, { ok: true, config: next, message: '配置已保存到服务端凭证库（个人 Key 仅本人可见）' })
  },
  'POST /api/model/test': (req, res) => {
    const user = roleOf(req)
    const body = JSON.parse(req.__body || '{}')
    const ok = String(body.endpoint || '').startsWith('http')
    const latency = `${140 + (Date.now() % 90)} ms`
    const prev = liveModelConfig.get(user.id) || {}
    liveModelConfig.set(user.id, { ...prev, testedAt: new Date().toLocaleString('zh-CN', { hour12: false }).slice(0, 16), latency })
    logAudit(user, 'model.test', body.provider || '—', ok ? 'allow' : 'deny(400)', netOf(req))
    json(res, ok ? 200 : 400, ok ? { ok: true, latency, message: `连接正常 · ${latency} · 模型可用` } : { error: '端点需以 http(s) 开头' })
  },
  'GET /api/tool-ledger': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '工具台账仅管理角色可见' })
    json(res, 200, { items: liveToolLedger, total: liveToolLedger.length, highRisk: liveToolLedger.filter((t) => t.risk === '高').length })
  },
  'POST /api/tool-ledger': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '仅管理角色可调整工具策略' })
    const body = JSON.parse(req.__body || '{}')
    const t = liveToolLedger.find((x) => x.id === body.id)
    if (!t) return json(res, 404, { error: '工具不存在' })
    if (body.confirm !== undefined) t.confirm = !!body.confirm
    logAudit(user, 'tool.policy', `${t.id}:confirm=${t.confirm}`, 'allow', netOf(req))
    json(res, 200, { ok: true, item: t })
  },
  'GET /api/security': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user)) return json(res, 403, { error: '安全后台仅安全管理员可见' })
    const denies = audit.filter((a) => String(a.result || '').includes('deny')).slice(0, 5)
    json(res, 200, {
      policy: modelPolicy,
      anomalies: accessAnomalies,
      denies,
      reviews: [
        { id: 'RV-01', name: '规划一所 · 资源授权复核', at: '2026-11-06', owner: '刘洋', result: '通过', note: '12 项资源，2 项回收' },
        { id: 'RV-02', name: '外部访客 · 模块授权复核', at: '2026-11-05', owner: '钱工', result: '通过', note: '云空间授权已收回' },
      ],
    })
  },
  'POST /api/apps/version': (req, res) => {
    const user = roleOf(req)
    if (!canManage(user) && !dutiesOf(user).includes('appReviewer')) return json(res, 403, { error: '仅应用审核员可维护版本' })
    const body = JSON.parse(req.__body || '{}')
    const app = liveApps.find((a) => a.id === body.id)
    if (!app) return json(res, 404, { error: '应用不存在' })
    const act = body.action
    if (act === 'update') {
      app.version = body.version || app.version
      app.history = [{ version: app.version, date: new Date().toISOString().slice(0, 10), note: body.note || '更新版本' }, ...(app.history || [])]
    } else if (act === 'rollback') {
      const prev = (app.history || [])[1]
      if (prev) app.version = prev.version
    } else if (act === 'disable') {
      app.status = 'draft'
    } else if (act === 'alert') {
      app.alert = `启动成功率 ${88 + (Date.now() % 8)}% · 低于阈值`
    }
    logAudit(user, `app.version.${act}`, app.id, 'allow', netOf(req))
    json(res, 200, { ok: true, item: app, message: act === 'rollback' ? `已回滚至 v${app.version}` : act === 'disable' ? '已下架，保留数据与使用部门通知' : act === 'alert' ? app.alert : '版本已更新' })
  },
  'GET /api/audit': (req, res) => json(res, 200, { items: audit.slice(0, 12) }),
  'POST /api/attempt': (req, res) => {
    const user = roleOf(req)
    const net = netOf(req)
    const body = JSON.parse(req.__body || '{}')
    const resource = liveResources.find((r) => r.id === body.id) || liveResources.find((r) => !canSee(user, r, net)) || liveResources[0]
    if (canSee(user, resource, net)) {
      return json(res, 200, { ok: true, message: '当前角色与网络对此资源有授权，请更换角色或网络再试。' })
    }
    logAudit(user, 'resource.read', resource.id, 'deny(403)', net)
    json(res, 403, {
      error: '越权访问已被拦截',
      detail: `资源「${resource.name}」不在当前网络（${networks[net].label}）与角色的授权范围内；目录、详情、下载链接三处一致判定。`,
      evidence: {
        resource: resource.id,
        security: resource.security,
        requiredScope: resource.scope.filter((s) => !user.scopes.includes(s)).slice(0, 3).join(' / '),
        net: networks[net].label,
        actor: `${user.name}（${user.duty}）`,
      },
    })
  },
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

  if (url.pathname.startsWith('/api/')) {
    const key = `${req.method} ${url.pathname}`
    const handler = api[key]
    if (!handler) return json(res, 404, { error: `no route ${key}` })
    const blockedModule = guestBlock(roleOf(req), key)
    if (blockedModule) {
      return json(res, 403, {
        error: '外部访客仅可浏览模块框架，读取企业数据需管理员按模块授权',
        guestBlocked: true,
        module: blockedModule,
      })
    }

    if (req.method === 'POST') {
      let raw = ''
      for await (const chunk of req) raw += chunk
      req.__body = raw
    }
    try {
      return handler(req, res, url)
    } catch (err) {
      return json(res, 500, { error: String(err) })
    }
  }

  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '')
  const file = join(publicDir, rel === '' ? 'index.html' : rel)
  if (!file.startsWith(publicDir + sep)) {
    res.writeHead(403).end('forbidden')
    return
  }
  try {
    const data = await readFile(file)
    res.writeHead(200, {
      'content-type': mime[extname(file)] || 'application/octet-stream',
      'cache-control': 'no-store',
    })
    res.end(data)
  } catch {
    const fallback = await readFile(join(publicDir, 'index.html'))
    res.writeHead(200, { 'content-type': mime['.html'] })
    res.end(fallback)
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`[jg-hub] http://127.0.0.1:${port}`)
})
