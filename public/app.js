const state = {
  boot: null,
  view: 'home',
  resourceType: 'all',
  resourceCategory: 'all',
  resourcePage: 1,
  resourcePageSize: 10,
  resourceQuery: '',
  resourceList: [],
  selectedResource: null,
  satellite: null,
  plugins: [],
  pluginKind: 'enterprise',
  selectedPlugin: null,
  market: [],
  skillTab: 'plugin',
  skillScope: 'public',
  skillQuery: '',
  projects: [],
  prjQuery: '', prjSort: 'desc', pinnedProjects: [],
  taskSel: '',
  apps: [],
  appDetail: null,
  tasks: [],
  auditOpen: false,
  draft: '',
  composerModel: '',
  composerTools: ['T-DATA'],
  composerRefs: [],
  personalFiles: [
    { id: 'PF-01', name: '个人项目笔记摘要.docx', type: 'docx', size: '12.4 MB', owner: '钱工', dept: '集团总部', updated: '2026-11-07 16:20', shared: ['本人'], scope: '仅本人', tags: ['个人云盘', '笔记'] },
    { id: 'PF-02', name: '城市体检指标测算底表.xlsx', type: 'xlsx', size: '8.6 MB', owner: '钱工', dept: '集团总部', updated: '2026-11-06 10:35', shared: ['本人'], scope: '仅本人', tags: ['个人云盘', '测算'] },
    { id: 'PF-03', name: '滨江片区汇报提纲.pptx', type: 'pptx', size: '26.1 MB', owner: '钱工', dept: '集团总部', updated: '2026-11-05 18:05', shared: ['本人'], scope: '仅本人', tags: ['个人云盘', '汇报'] },
  ],
  settingsTab: 'general',
  settingsQuery: '',
  accent: (() => { try { const v = localStorage.getItem('jg.accent'); return (!v || v === 'default') ? 'blue' : v } catch (e) { return 'blue' } })(),
  rail: false,
  railLocked: false,
  morePinned: [],
  moreSet: (() => { try { return JSON.parse(localStorage.getItem('jg.moreSet') || '[]') } catch (e) { return [] } })(),
  sidebarWidth: 292,
  sbUserW: 0,
  setNavWidth: 208,
  notifications: [],
  // 会话
  conversations: [],
  recentFilter: 'all',
  recentSort: 'recent',
  showProjects: true,
  sidebarSections: [],
  conversation: null,
  chatBusy: false,
  chatSteps: [],
  chatError: '',
  pendingConfirm: null,
  // 管理后台
  adminTab: 'tickets',
  consoleTab: 'overview',
  consoleRole: 'platform',
  tickets: [],
  feedback: [],
  monitor: null,
  automations: [],
  taskPins: ['AU-1'],
  knowledge: [],
  knowledgeQuery: '',
  notebooks: [],
  notebookId: null,
  nbOpen: false,
  nbStart: false,
  noteId: null,
  cloud: null,
  cloudOpen: false,
  sbPinned: true,
  cloudTabs: [{ id: 'new', kind: 'new', title: '新标签页' }],
  cloudTab: 'new',
  cloudExts: [
    { id: 'ext-audit', name: '企业审计水印', desc: '对企业站点自动叠加水印并留痕', on: true },
    { id: 'ext-json', name: 'JSON 格式化', desc: '格式化接口返回与调试数据', on: true },
    { id: 'ext-ad', name: '广告拦截', desc: '拦截弹窗与追踪脚本', on: false },
  ],
  cbW: 440,
  cbUserW: 0,
  imagegen: { prompt: '', ratio: '1:1', count: 1, style: '写实', shots: [], busy: false, tab: 'hot' },
}

const paths = {
  chat: '<path d="M4 5.5h16v10H9l-5 3.5z"/>',
  history: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  task: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h5"/>',
  plugin: '<circle cx="12" cy="12" r="9"/>' + '<path d="M9.6 6.4v2.4M14.4 6.4v2.4M8.4 8.8h7.2v3.6a3.6 3.6 0 0 1-7.2 0z"/><path d="M12 16.4v1.6"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l4 2"/>',
  database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/>',
  book: '<path d="M5 5h6v15H5zM13 5h6v15h-6z"/>',
  map: '<path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z"/><path d="M9 4v14M15 6v14"/>',
  layers: '<path d="M12 3l8 4.5-8 4.5-8-4.5z"/><path d="M4 12l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5"/>',
  wallet: '<rect x="4" y="6" width="16" height="12" rx="3"/><path d="M16 12h2"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  tool: '<path d="M14 5l5 5-8 8H6v-3z"/><path d="M4 20l3-3"/>',
  send: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/>',
  doc: '<path d="M7 4h7l4 4v12H7z"/><path d="M14 4v4h4"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  upload: '<path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 16v3h16v-3"/>',
  download: '<path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/>',
  image: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M5 17l5-5 4 4 3-3 3 3"/>',
  video: '<rect x="3" y="6" width="12" height="12" rx="2"/><path d="M15 10l6-3v10l-6-3"/>',
  cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
  cad: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 16V8l4 4 4-4v8"/>',
  table: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16M9 10v9"/>',
  shield: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h12s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  check: '<path d="M5 12l4 4 6-8"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"/>',
  refresh: '<path d="M5 12a7 7 0 0 1 12-4M19 12a7 7 0 0 1-12 4"/><path d="M17 4v4h-4M7 20v-4h4"/>',
  chevron: '<path d="M9 7l5 5-5 5"/>',
  chart: '<path d="M5 19V9M10 19V5M15 19v-7M20 19v-3"/>',
  inbox: '<path d="M4 13l3-8h10l3 8v5H4z"/><path d="M4 13h5l1 2h4l1-2h5"/>',
  spark: '<path d="M12 4l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>',
  pulse: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  globe: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/>',
  window: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M6.5 7h.01M9 7h.01"/>',
  folder: '<path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>',
  pin: '<path d="M9 4h6l-1 5 3 3v2H7v-2l3-3z"/><path d="M12 14v6"/>',
  pinOff: '<path d="M9 4h6l-1 5 3 3v2H7v-2l3-3z"/><path d="M12 14v6"/><path d="M3 3l18 18"/>',
  external: '<rect x="4" y="7" width="9" height="13" rx="2"/><path d="M14 4h6v6"/><path d="M20 4l-8 8"/>',
  pen: '<path d="M4 20l4.5-1 10-10-3.5-3.5-10 10z"/><path d="M13.5 5.5l3.5 3.5"/>',
  dots: '<circle cx="6" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
  home: '<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>',
  mic: '<rect x="9" y="3.5" width="6" height="10" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3"/>',
  arrow: '<path d="M5 12h13M12 6l6 6-6 6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  sort: '<path d="M7 5v14M4 16l3 3 3-3M17 19V5M14 8l3-3 3 3"/>',
  list: '<path d="M5 7h14M5 12h14M5 17h9"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H22a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  layers: '<rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/>',
  cloud: '<path d="M7 18a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.6 1A3.5 3.5 0 0 1 17 18z"/>',
  users: '<circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9.5" r="2.4"/><path d="M15 18.8a4.6 4.6 0 0 1 5.5-2.4"/>',
  message: '<path d="M4 6h16v10H9l-5 4z"/><path d="M8 11h8"/>',
  book: '<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5z"/><path d="M5 20.5V5.5"/><path d="M9 7h6M9 11h6"/>',
  cap: '<path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11v5c0 1.5 10 1.5 10 0v-5"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2"/>',
  wave: '<path d="M5 12h.01M8 8v8M11 5v14M14 9v6M17 11v2M20 12h.01"/>',
  megaphone: '<path d="M4 10l11-5v14l-11-5z"/><path d="M15 9.5c1.6.9 2.6 2.4 2.6 2.5s-1 1.6-2.6 2.5"/><path d="M7 14v4"/>',
  target: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  more: '<circle cx="5.5" cy="12" r="1.9" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="1.9" fill="currentColor" stroke="none"/>',
  play: '<path d="M8 5.5l10 6.5-10 6.5z"/>',
  pause: '<path d="M9 5.5v13M15 5.5v13"/>',
  star: '<path d="M12 4.5l2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8z"/>',
}

const NET_LABEL = { inet: '互联网', gov: '政务网', secret: '涉密内网' }

const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.doc}</svg>`

const typeMap = {
  gis: { label: 'GIS', icon: 'map' },
  '3d': { label: '三维', icon: 'cube' },
  cad: { label: 'CAD', icon: 'cad' },
  document: { label: '文档', icon: 'doc' },
  image: { label: '图片', icon: 'image' },
  video: { label: '视频', icon: 'video' },
  bizdata: { label: '业务数据', icon: 'table' },
  deliverable: { label: '成果数据', icon: 'folder' },
  service: { label: '数据服务', icon: 'globe' },
}

const securityMap = {
  public: { label: '公开', cls: 'ok' },
  internal: { label: '内部', cls: '' },
  secret: { label: '涉密', cls: 'secret' },
}

const NET_NAME = { inet: '互联网', gov: '政务网', secret: '涉密内网' }

const statusMap = {
  authorized: { label: '已登记', cls: 'ok' },
  'need-approval': { label: '需审批', cls: 'warn' },
  'pending-dept': { label: '待部门同意', cls: 'warn' },
  'pending-qc': { label: '待质检', cls: 'warn' },
  'pending-data': { label: '待数据审批', cls: 'warn' },
  rejected: { label: '已退回', cls: 'secret' },
}

async function api(path, options = {}) {
  const res = await fetch(path, { credentials: 'same-origin', ...options })
  const body = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body }
}

function toast(message, bad = false) {
  const el = document.getElementById('toast')
  el.textContent = message
  el.className = `toast show${bad ? ' bad' : ''}`
  clearTimeout(toast._t)
  toast._t = setTimeout(() => { el.className = 'toast' }, 3200)
}

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

/* ------------------------------- boot ------------------------------- */

async function loadBoot() {
  const { body } = await api('/api/bootstrap')
  state.boot = body
  state.tasks = body.tasks || []
  state.conversations = body.conversations || []
  const netModels = body.models || []
  if (!netModels.some((m) => m.id === state.composerModel)) {
    state.composerModel = body.network?.defaultModel || netModels[0]?.id || ''
  }
  const enabledTools = (body.tools || []).filter((t) => t.enabled).map((t) => t.id)
  state.composerTools = state.composerTools.filter((id) => enabledTools.includes(id))
  if (!state.composerTools.length && enabledTools.includes('T-DATA')) state.composerTools = ['T-DATA']
  const plugins = await api('/api/plugins')
  if (plugins.ok) state.plugins = plugins.body.items || []
  const prj = await api('/api/projects')
  if (prj.ok) state.sidebarProjects = (prj.body.items || []).slice(0, 3)
  await loadNotifications()
}

async function refreshAuditIfOpen() {
  if (state.auditOpen) await renderAuditDrawer()
}

/* ------------------------------ sidebar ----------------------------- */

const groups = [
  { label: 'AI 工作台', items: ['home', 'imagegen', 'tasks', 'skills', 'projects'] },
  { label: '企业工作台', items: ['notice', 'contacts', 'im', 'oa', 'drive', 'datacenter', 'oneMap'] },
  { label: '管理与运维', items: ['admin'] },
]

function renderRail() {
  const { user, modules } = state.boot
  const visible = (id) => user.visibleModules.includes(id)
  const sep = '<div class="rail-sep"></div>'
  const adminCol = state.boot.user.role === 'ops' && visible('admin')
  const plan = railPlan()
  const order = ['home', ...plan.core, '__sep1', ...plan.entShown, ...plan.pinned, 'more', ...(adminCol ? ['admin'] : [])]
  const badge = (id) => {
    const n = id === 'im' && state.imUnread != null
      ? state.imUnread
      : state.notifications.filter((x) => x.unread && notifModule(x) === id).length
    return n ? `<i class="rail-badge">${n > 9 ? '9+' : n}</i>` : ''
  }
  const btn = (id) => {
    if (!visible(id)) return ''
    const meta = modules[id] || { label: id }
    return `<button class="rail-btn${state.view === id ? ' on' : ''}" data-nav="${id}" title="${esc(meta.label)}${badge(id) ? ` · ${state.notifications.filter((x) => x.unread && notifModule(x) === id).length} 条未读` : ''}"><span class="ico">${icon(navIcon(id))}</span>${badge(id)}</button>`
  }
  const railbar = document.getElementById('railbar')
  railbar.innerHTML = `
    <button class="rail-btn rail-home" data-nav="home" title="首页"><span class="ico">${icon('home')}</span></button>
    ${sep}
    ${order.filter((id) => id !== 'home').map((id) => (id.startsWith('__sep') ? sep : btn(id))).join('')}
    <div class="rail-spacer"></div>
    <button class="rail-avatar" id="railAccount" title="账户与个人中心">
      <span class="face">${esc(user.name.slice(0, 1))}</span>
    </button>`
  const app = document.getElementById('app')
  app.classList.remove('has-admin')
  const adminrail = document.getElementById('adminrail')
  if (adminrail) adminrail.innerHTML = ''
  if (!railbar.__navBound) {
    railbar.__navBound = true
    railbar.addEventListener('click', (ev) => {
      const btn = ev.target.closest('[data-nav]')
      if (!btn || !railbar.contains(btn)) return
      if (btn.dataset.nav === 'more') {
        const open = document.querySelector('.more-pop')
        if (open) { open.remove(); return }
        openMoreMenu(btn)
        return
      }
      if (btn.dataset.nav === 'imagegen' && !imageModel().image) { showImageGate(); return }
      state.view = btn.dataset.nav
      markModuleRead(btn.dataset.nav)
      render()
    })
  }
  railbar.querySelector('#railAccount').addEventListener('click', (ev) => {    ev.stopPropagation()
    if (window.__accountPop) { const old = window.__accountPop; window.__accountPop = null; old.remove(); return }
    openAccountMenu(ev.currentTarget)
  })
  const homeBtn = railbar.querySelector('.rail-home')
  homeBtn?.addEventListener('mouseenter', () => {
    if (sbFixed()) return
    const sb = document.getElementById('sidebar')
    clearTimeout(window.__sbHide)
    sb.classList.remove('hidden')
    sb.classList.add('fly')
  })
  homeBtn?.addEventListener('mouseleave', () => {
    window.__sbHide = setTimeout(() => {
      if (sbFixed()) return
      const sb = document.getElementById('sidebar')
      if (!sb.matches(':hover')) { sb.classList.remove('fly'); sb.classList.add('hidden') }
    }, 220)
  })
  ;[['tasks', '.tk-left'], ['skills', '.sk-left']].forEach(([view, sel]) => {
    const btn = railbar.querySelector(`[data-nav="${view}"]`)
    if (!btn) return
    btn.addEventListener('mouseenter', () => {
      if (state.sbPinned || state.view !== view) return
      const panel = document.querySelector(sel)
      if (panel) panel.classList.add('fly-sb')
    })
    btn.addEventListener('mouseleave', () => {
      if (state.sbPinned) return
      setTimeout(() => {
        const panel = document.querySelector(sel)
        if (panel && !panel.matches(':hover')) panel.classList.remove('fly-sb')
      }, 220)
    })
  })
}

function openRailMore(anchor) {
  document.querySelectorAll('.rail-pop').forEach((p) => p.remove())
  const { user, modules } = state.boot
  const ids = ['datacenter', 'knowledge', 'oneMap', 'review', 'oa', 'finance', 'admin', 'settings']
  const pop = document.createElement('div')
  pop.className = 'rail-pop'
  pop.innerHTML = ids.filter((id) => id === 'settings' || user.visibleModules.includes(id)).map((id) => `
    <button class="rail-pop-item" data-nav="${id}"><span class="ico">${icon(navIcon(id))}</span><span>${esc(modules[id]?.label || id)}</span></button>`).join('')
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${r.right + 8}px`
  pop.style.bottom = `${window.innerHeight - r.bottom + 8}px`
  pop.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => {
    pop.remove()
    state.view = b.dataset.nav
    render()
  }))
  setTimeout(() => document.addEventListener('click', function close(ev) {
    if (!pop.contains(ev.target) && ev.target.isConnected) {
      if (window.__morePop === pop) window.__morePop = null
      pop.remove()
      document.removeEventListener('click', close)
    }
  }), 0)
}

let __projCardTimer = null
function scheduleProjectCardClose() {
  clearTimeout(__projCardTimer)
  __projCardTimer = setTimeout(() => {
    const card = document.querySelector('.proj-card')
    if (card && !card.matches(':hover')) card.remove()
  }, 200)
}
function projPath(p) {
  return `D:\\JGharness\\projects\\${p.id}`
}
function openProjectCard(anchor) {
  clearTimeout(__projCardTimer)
  if (!anchor) return
  const existing = document.querySelector('.proj-card')
  if (existing && existing.dataset.pid === anchor.dataset.project) return
  existing?.remove()
  const p = (state.sidebarProjects || []).find((x) => x.id === anchor.dataset.project)
  if (!p) return
  const waiting = (p.waiting || 0)
  const card = document.createElement('div')
  card.className = 'proj-card'
  card.dataset.pid = p.id
  card.innerHTML = `
    <div class="pc-head">
      <span class="ico">${icon('folder')}</span>
      <span class="pc-name">${esc(p.name)}</span>
      <span class="spacer"></span>
      <button class="pc-pin" title="${p.pinned ? '取消置顶' : '置顶项目'}">${icon('pin')}</button>
    </div>
    <div class="pc-meta"><span class="ico">${icon('chat')}</span>${p.convs || 0} 次聊天 · ${waiting} 个等待中</div>
    <div class="pc-sep"></div>
    <div class="pc-path"><span class="ico">${icon('folder')}</span><span class="mono">${esc(projPath(p))}</span></div>
    <button class="pc-item" data-pcedit="${p.id}"><span class="ico">${icon('gear')}</span>编辑项目</button>`
  document.body.appendChild(card)
  const r = anchor.getBoundingClientRect()
  const w = 304
  card.style.left = `${Math.min(window.innerWidth - w - 12, r.right + 10)}px`
  card.style.top = `${Math.max(46, r.top - 4)}px`
  card.addEventListener('mouseenter', () => clearTimeout(__projCardTimer))
  card.addEventListener('mouseleave', () => scheduleProjectCardClose())
  card.querySelector('.pc-pin')?.addEventListener('click', () => { toast(p.pinned ? '已取消置顶' : '已置顶项目（演示）'); card.remove() })
  card.querySelector('[data-pcedit]')?.addEventListener('click', (ev) => {
    ev.stopPropagation()
    card.remove()
    openProjectEditCard(anchor, p.id)
  })
}

function openProjectEditCard(anchor, id) {
  const p = (state.sidebarProjects || []).find((x) => x.id === id)
  if (!p) return
  document.querySelectorAll('.proj-card').forEach((c) => c.remove())
  const card = document.createElement('div')
  card.className = 'proj-card pc-edit'
  card.dataset.pid = p.id
  card.innerHTML = `
    <div class="pc-edit-head"><span class="ico">${icon('folder')}</span>编辑项目</div>
    <label class="pc-field"><span>项目名称</span><input id="pceName" value="${esc(p.name)}"></label>
    <label class="pc-field"><span>项目说明</span><textarea id="pceDesc" rows="3">${esc(p.desc || '')}</textarea></label>
    <label class="pc-field"><span>本地文件夹</span><input id="pcePath" value="${esc(projPath(p))}"></label>
    <div class="pc-actions">
      <button class="pc-btn" id="pceCancel">取消</button>
      <button class="pc-btn primary" id="pceSave">保存</button>
    </div>`
  document.body.appendChild(card)
  const r = anchor.getBoundingClientRect()
  const w = 320
  card.style.left = `${Math.min(window.innerWidth - w - 12, r.right + 10)}px`
  card.style.top = `${Math.max(46, r.top - 6)}px`
  card.querySelector('#pceCancel').addEventListener('click', () => card.remove())
  card.querySelector('#pceSave').addEventListener('click', () => {
    const name = card.querySelector('#pceName').value.trim()
    if (name) p.name = name
    p.desc = card.querySelector('#pceDesc').value.trim()
    card.remove()
    renderSidebar()
    toast('项目已更新')
  })
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!card.contains(e.target)) { card.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function openProjectDisplayMenu(anchor) {
  document.querySelectorAll('.conv-menu').forEach((p) => p.remove())
  const pop = document.createElement('div')
  pop.className = 'conv-menu proj-menu'
  pop.innerHTML = `
    <button class="cm-item" data-pm="arrange"><span class="ico">${icon('layers')}</span><span class="cm-label">整理侧边栏</span><span class="cm-arrow">›</span></button>
    <button class="cm-item" data-pm="order"><span class="ico">${icon('sort')}</span><span class="cm-label">聊天排序方式</span><span class="cm-arrow">›</span></button>
    <div class="cm-sep"></div>
    <button class="cm-item" data-pm="split"><span class="ico">${icon('folder')}</span><span class="cm-label">分项目显示</span>${state.projMerge ? '' : '<span class="cm-key">✓</span>'}</button>
    <button class="cm-item" data-pm="merge"><span class="ico">${icon('list')}</span><span class="cm-label">合并显示</span>${state.projMerge ? '<span class="cm-key">✓</span>' : ''}</button>`
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${Math.max(64, Math.min(window.innerWidth - 240, r.right - 210))}px`
  pop.style.top = `${Math.max(46, r.bottom + 6)}px`
  pop.querySelectorAll('[data-pm]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    const act = b.dataset.pm
    pop.remove()
    if (act === 'split') { state.projMerge = false; renderSidebar() }
    else if (act === 'merge') { state.projMerge = true; renderSidebar() }
    else if (act === 'arrange') toast('侧边栏已按项目整理（演示）')
    else toast('聊天排序：按最近活动（演示）')
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); window.__plusPop = null; document.removeEventListener('click', close) }
  }), 0)
}

function closeSideMenus() {
  document.querySelectorAll('.recent-pop').forEach((p) => p.remove())
}

function openRecentHeadMenu(anchor) {
  closeSideMenus()
  const pop = document.createElement('div')
  pop.className = 'conv-menu proj-menu recent-pop'
  pop.innerHTML = `
    <button class="cm-item" data-rh="arrange"><span class="ico">${icon('layers')}</span><span class="cm-label">整理侧边栏</span><span class="cm-arrow">›</span></button>
    <button class="cm-item" data-rh="order"><span class="ico">${icon('sort')}</span><span class="cm-label">聊天排序方式</span><span class="cm-arrow">›</span></button>
    <div class="cm-sep"></div>
    <div class="cm-label-dim">显示</div>
    <button class="cm-item" data-rh="projects"><span class="ico">${icon('folder')}</span><span class="cm-label">项目</span>${state.showProjects ? '<span class="cm-key">✓</span>' : ''}</button>
    <div class="cm-sep"></div>
    <button class="cm-item" data-rh="section"><span class="ico">${icon('plus')}</span><span class="cm-label">新建分区</span></button>`
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${Math.max(64, Math.min(window.innerWidth - 240, r.right - 208))}px`
  const ph = pop.offsetHeight
  const top = r.bottom + 6 + ph > window.innerHeight - 8 ? Math.max(46, r.top - 6 - ph) : r.bottom + 6
  pop.style.top = `${top}px`
  pop.querySelectorAll('[data-rh]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    const act = b.dataset.rh
    pop.remove()
    if (act === 'arrange') openArrangeSidebar()
    else if (act === 'order') openRecentSortMenu(anchor)
    else if (act === 'projects') { state.showProjects = !state.showProjects; renderSidebar() }
    else if (act === 'section') openSectionForm()
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function openRecentSortMenu(anchor) {
  closeSideMenus()
  const pop = document.createElement('div')
  pop.className = 'conv-menu recent-pop'
  const opt = (k, label) => `<button class="cm-item" data-rs="${k}"><span class="cm-label">${label}</span>${state.recentSort === k ? '<span class="cm-key">✓</span>' : ''}</button>`
  pop.innerHTML = opt('recent', '最近优先') + opt('old', '最早优先') + opt('name', '按名称 A–Z')
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${Math.max(72, Math.min(window.innerWidth - 220, r.left + 40))}px`
  const ph = pop.offsetHeight
  const top = r.bottom + 6 + ph > window.innerHeight - 8 ? Math.max(46, r.top - 6 - ph) : r.bottom + 6
  pop.style.top = `${top}px`
  pop.querySelectorAll('[data-rs]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    state.recentSort = b.dataset.rs
    pop.remove()
    renderSidebar()
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function openRecentFilterMenu(anchor) {
  closeSideMenus()
  const pop = document.createElement('div')
  pop.className = 'conv-menu recent-pop'
  const opt = (k, label) => `<button class="cm-item" data-rf="${k}"><span class="cm-label">${label}</span>${state.recentFilter === k ? '<span class="cm-key">✓</span>' : ''}</button>`
  pop.innerHTML = opt('all', '全部') + opt('chat', '聊天') + opt('work', '工作')
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${Math.max(72, Math.min(window.innerWidth - 220, r.right - 150))}px`
  const ph = pop.offsetHeight
  const top = r.bottom + 6 + ph > window.innerHeight - 8 ? Math.max(46, r.top - 6 - ph) : r.bottom + 6
  pop.style.top = `${top}px`
  pop.querySelectorAll('[data-rf]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    state.recentFilter = b.dataset.rf
    pop.remove()
    renderSidebar()
    toast({ all: '最近：全部会话', chat: '最近：只看聊天', work: '最近：只看工作会话' }[b.dataset.rf])
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function openArrangeSidebar() {
  const convs = state.conversations || []
  const mask = openModal('整理侧边栏', `
    <div class="form-note">逐条确认要保留的会话，取消勾选的会被收进归档；归档后不再出现在「最近」。</div>
    <div class="arr-list">
      ${convs.slice(0, 16).map((c) => `<label class="arr-row"><input type="checkbox" data-keep="${c.id}" checked /><span class="arr-txt">${esc(c.title)}</span><span class="mono arr-time">${esc(c.time || '')}</span></label>`).join('')}
    </div>
    <div class="form-foot"><span class="mono">共 ${convs.length} 条会话</span><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="arrOk">完成整理</button></div>`)
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
  mask.querySelector('#arrOk').addEventListener('click', () => {
    const all = new Set(convs.map((c) => c.id))
    const keep = new Set([...mask.querySelectorAll('[data-keep]')].filter((x) => x.checked).map((x) => x.dataset.keep))
    state.archivedConvs = [...all].filter((id) => !keep.has(id))
    mask.remove()
    renderSidebar()
    toast(state.archivedConvs.length ? `已归档 ${state.archivedConvs.length} 条会话` : '已保留全部会话')
  })
}

function openSectionForm() {
  const mask = openModal('新建分区', `
    <div class="form-note">分区用于把同一类会话归在一起，例如“投标”“城市体检”。分区内可再拖入或移入会话。</div>
    <div class="form-label">分区名称</div>
    <input class="text-input" id="secName" placeholder="例如：投标资料" />
    <div class="form-foot"><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="secOk">新建</button></div>`)
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
  mask.querySelector('#secName').focus()
  mask.querySelector('#secOk').addEventListener('click', () => {
    const name = mask.querySelector('#secName').value.trim()
    if (!name) return toast('请填写分区名称', true)
    state.sidebarSections = [...(state.sidebarSections || []), { id: 'SEC-' + Date.now(), name }]
    mask.remove()
    renderSidebar()
    toast(`已新建分区「${name}」`)
  })
}

function openSectionMenu(anchor, id) {
  closeSideMenus()
  const sec = (state.sidebarSections || []).find((x) => x.id === id)
  if (!sec) return
  const pop = document.createElement('div')
  pop.className = 'conv-menu recent-pop'
  pop.innerHTML = `<button class="cm-item" data-sm="rename"><span class="cm-label">重命名</span></button><button class="cm-item" data-sm="del"><span class="cm-label">删除分区</span></button>`
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${Math.max(64, Math.min(window.innerWidth - 210, r.right - 170))}px`
  const ph = pop.offsetHeight
  const top = r.bottom + 6 + ph > window.innerHeight - 8 ? Math.max(46, r.top - 6 - ph) : r.bottom + 6
  pop.style.top = `${top}px`
  pop.querySelectorAll('[data-sm]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    const act = b.dataset.sm
    pop.remove()
    if (act === 'del') {
      state.sidebarSections = state.sidebarSections.filter((x) => x.id !== id)
      renderSidebar(); toast('已删除分区')
    } else {
      const mask = openModal('重命名分区', `<div class="form-label">分区名称</div><input class="text-input" id="secRename" value="${esc(sec.name)}" />
        <div class="form-foot"><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="secRenOk">保存</button></div>`)
      mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
      mask.querySelector('#secRenOk').addEventListener('click', () => {
        const v = mask.querySelector('#secRename').value.trim()
        if (!v) return toast('请填写名称', true)
        sec.name = v
        mask.remove(); renderSidebar(); toast('已重命名')
      })
    }
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function renderSidebar() {
  const { user } = state.boot
  const sidebar = document.getElementById('sidebar')
  sidebar.classList.toggle('hidden', !sbFixed())
  if (state.view === 'tasks') {
    sidebar.classList.add('tk-sidebar')
    sidebar.innerHTML = ''
    return
  }
  sidebar.classList.remove('tk-sidebar')

  const convs = (state.conversations || []).filter((c) => !(state.archivedConvs || []).includes(c.id))
  const pins = state.pinnedConvs && state.pinnedConvs.length
    ? convs.filter((c) => state.pinnedConvs.includes(c.id))
    : convs.slice(0, 2)
  let recent = convs.filter((c) => !pins.includes(c))
  if (state.recentFilter === 'work') recent = recent.filter((c) => c.kind === 'work' || (!c.kind && c.workspace))
  if (state.recentFilter === 'chat') recent = recent.filter((c) => c.kind === 'chat')
  if (state.recentSort === 'old') recent = recent.slice().reverse()
  else if (state.recentSort === 'name') recent = recent.slice().sort((x, y) => String(x.title).localeCompare(String(y.title), 'zh'))
  recent = recent.slice(0, 14)
  const projects = state.sidebarProjects || []

  const convRow = (c, pin, extra = '') => `<div class="sb-item${pin ? ' has-pin' : ''}${extra}">
      <button class="sb-row${pin ? ' pin' : ''}" data-conv="${c.id}">
        <span class="sb-row-txt">${esc(c.title)}</span>
      </button>
      ${pin ? `<button class="sb-pin" title="取消置顶"><span class="ico">${icon('pin')}</span></button>` : ''}
      <button class="sb-morebtn" data-convmenu="${c.id}" title="更多操作"><span class="ico">${icon('dots')}</span></button>
    </div>`

  const projConvs = (p) => {
    const idx = projects.findIndex((x) => x.id === p.id)
    const buckets = [[0, 1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
    const ids = buckets[idx] || []
    return ids.map((i) => convs[i]).filter(Boolean)
  }

  const projRow = (p) => `<div class="sb-projrow" data-projhover="${p.id}">
      <button class="sb-row sb-proj" data-project="${p.id}">
        <span class="ico sb-row-ico">${icon('folder')}</span><span class="sb-row-txt">${esc(p.name)}</span>
      </button>
      <div class="sb-projacts">
        <button class="sb-morebtn" data-projedit="${p.id}" title="编辑项目"><span class="ico">${icon('pen')}</span></button>
        <button class="sb-morebtn" data-projmenu2="${p.id}" title="更多"><span class="ico">${icon('dots')}</span></button>
      </div>
    </div>`

  sidebar.innerHTML = `
    <div class="brand">
      <button class="brand-name" id="brandMenu" title="九规智能中枢">九规智能中枢</button>
    </div>
    <div class="sidebar-scroll">
      <button class="sb-new" id="sbNew"><span class="ico">${icon('pen')}</span>新聊天</button>
      <div class="sb-label">置顶</div>
      ${pins.map((c) => convRow(c, true)).join('') || '<div class="sb-empty">暂无置顶会话</div>'}
      ${state.showProjects ? `<div class="sb-label sb-label-row"><span>项目</span>
        <button class="sb-collapse" id="projNew" title="新建项目"><span class="ico">${icon('plus')}</span></button>
        <button class="sb-collapse" id="projMore" title="项目显示设置"><span class="ico">${icon('dots')}</span></button>
      </div>
      <div class="sb-projects${state.projMerge ? ' merged' : ''}">
        ${projects.map((p) => {
          const kids = projConvs(p)
          if (state.projMerge) return projRow(p)
          return `${projRow(p)}
            <div class="sb-sub">
              ${kids.length ? kids.map((c) => convRow(c, false, ' sub')).join('') : '<div class="sb-empty sub">暂无聊天</div>'}
            </div>`
        }).join('') || '<div class="sb-empty">暂无项目</div>'}
      </div>` : ''}
      ${(state.sidebarSections || []).map((sec) => `<div class="sb-label sb-label-row sb-sec-head"><span>${esc(sec.name)}</span>
        <button class="sb-collapse" data-secmenu="${sec.id}" title="分区菜单"><span class="ico">${icon('dots')}</span></button></div>
        <div class="sb-recent"><div class="sb-empty sub">暂无聊天</div></div>`).join('')}
      <div class="sb-label sb-label-row sb-recent-head"><span>最近</span>
        <button class="sb-collapse" id="recentToggle" title="收起最近"><span class="ico">${icon('chevron')}</span></button>
        <div class="sb-head-acts">
          <button class="sb-collapse" id="recentMore" title="更多"><span class="ico">${icon('dots')}</span></button>
          <button class="sb-collapse" id="recentFilter" title="筛选"><span class="ico">${icon('filter')}</span></button>
          <button class="sb-collapse sb-quicknew" id="recentNew" title="新聊天"><span class="ico">${icon('pen')}</span></button>
        </div>
      </div>
      <div class="sb-recent${state.recentCollapsed ? ' folded' : ''}" id="recentList">
        ${recent.map((c) => convRow(c, false)).join('')}
      </div>
    </div>
  </div>
  <div class="pane-grip" id="sbGrip" title="拖动调整左右宽度 · 双击复位"></div>`

  document.getElementById('searchTrigger')?.addEventListener('click', () => openSearchPalette())
  document.getElementById('brandMenu').addEventListener('click', (ev) => { ev.stopPropagation(); openAccountMenu(ev.currentTarget) })
  document.getElementById('sbNew').addEventListener('click', () => {
    state.view = 'home'
    state.draft = ''
    render()
    setTimeout(() => document.getElementById('hhInput')?.focus(), 50)
  })
  document.getElementById('projMore')?.addEventListener('click', (ev) => { ev.stopPropagation(); openProjectDisplayMenu(ev.currentTarget) })
  document.getElementById('projNew')?.addEventListener('click', () => { state.view = 'projects'; openProjectForm(); })
  document.getElementById('recentToggle').addEventListener('click', () => {
    state.recentCollapsed = !state.recentCollapsed
    document.getElementById('recentList').classList.toggle('folded', state.recentCollapsed)
  })
  document.getElementById('recentMore')?.addEventListener('click', (ev) => { ev.stopPropagation(); openRecentHeadMenu(ev.currentTarget) })
  document.getElementById('recentFilter')?.addEventListener('click', (ev) => { ev.stopPropagation(); openRecentFilterMenu(ev.currentTarget) })
  document.getElementById('recentNew')?.addEventListener('click', () => {
    state.view = 'home'
    state.draft = ''
    render()
    setTimeout(() => document.getElementById('hhInput')?.focus(), 50)
  })
  sidebar.querySelectorAll('[data-secmenu]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    openSectionMenu(ev.currentTarget, b.dataset.secmenu)
  }))
  sidebar.querySelectorAll('[data-projhover]').forEach((row) => {
    row.addEventListener('mouseenter', () => {
      openProjectCard(sidebar.querySelector(`[data-project="${row.dataset.projhover}"]`))
    })
    row.addEventListener('mouseleave', () => scheduleProjectCardClose())
  })
  sidebar.querySelectorAll('[data-projedit]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    openProjectEditCard(ev.currentTarget.closest('.sb-projrow') || ev.currentTarget, b.dataset.projedit)
  }))
  sidebar.querySelectorAll('[data-conv]').forEach((b) => b.addEventListener('click', () => openConversation(b.dataset.conv)))
  sidebar.querySelectorAll('.sb-pin').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    toast('已取消置顶（演示）')
  }))
  sidebar.querySelectorAll('[data-convmenu]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    openConversationMenu(ev.currentTarget, b.dataset.convmenu)
  }))
  sidebar.querySelectorAll('[data-convedit]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    runConversationAction('rename', b.dataset.convedit)
  }))
  sidebar.querySelectorAll('[data-project]').forEach((b) => b.addEventListener('click', () => openProject(b.dataset.project)))
  bindSidebarResize()
}

/* ------------------- 会话行「更多」菜单（对齐 ChatGPT 最近） ------------------- */

function openConversationMenu(anchor, id) {
  document.querySelectorAll('.conv-menu').forEach((p) => p.remove())
  const conv = (state.conversations || []).find((c) => c.id === id)
  if (!conv) return
  const items = [
    ['rename', 'pen', '重命名', 'Ctrl+Alt+R'],
    ['pin', 'pin', '置顶', 'Ctrl+Alt+P'],
    ['section', 'grid', '分区', ''],
    ['lock', 'shield', '锁定聊天', ''],
    ['share', 'send', '分享', ''],
    ['—', '', '', ''],
    ['open', 'globe', '在 九规智能中枢 网页版打开', ''],
    ['—', '', '', ''],
    ['archive', 'inbox', '归档', 'Ctrl+Shift+A'],
    ['delete', 'close', '删除', ''],
    ['—', '', '', ''],
    ['move', 'folder', '移至项目', ''],
  ]
  const pop = document.createElement('div')
  pop.className = 'conv-menu'
  pop.innerHTML = items.map(([act, ic, label, key]) => act === '—'
    ? '<div class="cm-sep"></div>'
    : `<button class="cm-item" data-cm="${act}">
        <span class="ico">${icon(ic)}</span><span class="cm-label">${label}</span>
        ${key ? `<span class="cm-key">${key}</span>` : ''}
        ${['section', 'move'].includes(act) ? '<span class="cm-arrow">›</span>' : ''}
      </button>`).join('')
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${Math.max(64, Math.min(window.innerWidth - 230, r.right + 8))}px`
  pop.style.top = `${Math.max(46, Math.min(window.innerHeight - 430, r.top - 6))}px`
  pop.querySelectorAll('[data-cm]').forEach((it) => it.addEventListener('click', (ev) => {
    ev.stopPropagation()
    const act = it.dataset.cm
    if (act === 'move') { pop.remove(); openMoveToProject(anchor, id); return }
    pop.remove()
    runConversationAction(act, id)
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function openMoveToProject(anchor, id) {
  document.querySelectorAll('.conv-menu').forEach((p) => p.remove())
  const projects = state.sidebarProjects || state.projects || []
  const pop = document.createElement('div')
  pop.className = 'conv-menu'
  pop.innerHTML = `<div class="cm-head">移至项目</div>` + projects.map((p) => `
    <button class="cm-item" data-mp="${p.id}"><span class="ico">${icon('folder')}</span><span class="cm-label">${esc(p.name)}</span></button>`).join('')
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${Math.max(64, Math.min(window.innerWidth - 230, r.right + 8))}px`
  pop.style.top = `${Math.min(window.innerHeight - 260, r.top)}px`
  pop.querySelectorAll('[data-mp]').forEach((b) => b.addEventListener('click', () => {
    pop.remove()
    toast(`会话已移入项目「${(projects.find((p) => p.id === b.dataset.mp) || {}).name || ''}」（演示）`)
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function runConversationAction(act, id) {
  const conv = (state.conversations || []).find((c) => c.id === id)
  if (!conv) return
  if (act === 'open') { openConversation(id); return }
  if (act === 'pin') {
    state.pinnedConvs = Array.from(new Set([...(state.pinnedConvs || []), id]))
    render()
    toast(`已置顶「${conv.title}」`)
    return
  }
  if (act === 'archive') {
    state.archivedConvs = Array.from(new Set([...(state.archivedConvs || []), id]))
    render()
    toast(`已归档「${conv.title}」，可在归档中恢复（演示）`)
    return
  }
  if (act === 'delete') {
    const mask = openModal('删除会话', `
      <div class="form-note">删除后该会话从「最近」移除，项目内的成果与审计记录不受影响。</div>
      <div class="form-foot"><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn danger" data-del>删除</button></div>`)
    mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
    mask.querySelector('[data-del]').addEventListener('click', () => {
      state.conversations = state.conversations.filter((c) => c.id !== id)
      state.archivedConvs = (state.archivedConvs || []).filter((x) => x !== id)
      mask.remove()
      render()
      toast(`已删除「${conv.title}」`)
    })
    return
  }
  if (act === 'rename') {
    const mask = openModal('重命名会话', `
      <label class="form-label">会话名称</label>
      <input class="text-input" id="cmRename" value="${esc(conv.title)}" maxlength="40">
      <div class="form-foot"><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" data-save>保存</button></div>`)
    const input = mask.querySelector('#cmRename')
    mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
    mask.querySelector('[data-save]').addEventListener('click', () => {
      const v = input.value.trim()
      if (!v) { toast('名称不能为空'); return }
      conv.title = v
      mask.remove()
      render()
      toast('已重命名')
    })
    setTimeout(() => input.focus(), 60)
    return
  }
  const say = {
    section: '分区：可把会话归入「项目 / 学习 / 待办」等分区（演示）',
    lock: '已锁定该会话，需再次验证身份才能打开（演示）',
    share: '已生成只读分享链接，有效期 7 天并登记审计（演示）',
  }[act]
  toast(say || '该操作在演示版未接入')
}

function renderMenubar() {
  const mb = document.getElementById('menubar')
  const menus = {
    file: ['文件', [
      ['新建窗口', '', 'newWindow'], ['新聊天', 'Ctrl+N', 'newChat'], ['新建临时聊天', 'Ctrl+Shift+N', 'tempChat'],
      ['新建项目...', '', 'newProject'], ['—', '', ''], ['打开文件夹', 'Ctrl+O', 'openFolder'], ['关闭', 'Ctrl+W', 'close'],
      ['—', '', ''], ['退出登录', '', 'logout'],
    ]],
    edit: ['编辑', [
      ['撤销', 'Ctrl+Z', 'undo'], ['重做', 'Ctrl+Y', 'redo'], ['—', '', ''], ['剪切', 'Ctrl+X', 'cut'],
      ['复制', 'Ctrl+C', 'copy'], ['粘贴', 'Ctrl+V', 'paste'], ['删除', '', 'del'], ['—', '', ''], ['全选', 'Ctrl+A', 'selectAll'],
      ['—', '', ''], ['设置', 'Ctrl+,', 'settings'],
    ]],
    view: ['视图', [
      ['显示/隐藏侧边栏', 'Ctrl+Shift+S', 'toggleSidebar'], ['显示/隐藏导航面板', 'Ctrl+Shift+E', 'toggleSidebar'],
      ['浏览器', '', 'cloud'], ['—', '', ''], ['查找', 'Ctrl+F', 'find'], ['—', '', ''], ['放大', 'Ctrl+Shift+=', 'zoomIn'],
      ['缩小', 'Ctrl+-', 'zoomOut'], ['实际大小', 'Ctrl+0', 'zoomReset'], ['—', '', ''], ['切换全屏', 'F11', 'fullscreen'],
    ]],
    help: ['帮助', [
      ['文档', '', 'docs'], ['显示键盘快捷键', 'Ctrl+/', 'shortcuts'], ['新功能', '', 'whatsnew'], ['—', '', ''],
      ['故障排除', '', 'trouble'], ['系统状态', '', 'status'], ['反馈', '', 'feedback'], ['—', '', ''],
      ['任务管理器', '', 'taskmgr'], ['—', '', ''], ['检查更新...', '', 'update'], ['关于九规智能中枢', '', 'about'],
    ]],
  }
  mb.innerHTML = `
    <div class="mb-left">
      <button class="mb-icon" title="后退" data-mbact="back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 12H5M11 6L5 12l6 6"/></svg></button>
      <button class="mb-icon" title="前进" data-mbact="forward"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h15M13 6l6 6-6 6"/></svg></button>
      ${hasSidebarView() ? `<button class="mb-icon sb-switch${state.sbPinned ? ' on' : ''}" id="mbRailToggle" title="${state.sbPinned ? '隐藏侧边栏' : '显示侧边栏'}（Ctrl+Shift+S）"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="3"/>${state.sbPinned ? '<rect x="3.8" y="4.8" width="4.4" height="14.4" rx="2" fill="currentColor" stroke="none" opacity="0.5"/>' : '<path d="M9 4v16" opacity="0.4"/>'}</svg></button>` : ''}
    </div>
    <div class="mb-menus">
      ${Object.entries(menus).map(([k, [label, items]]) => `<button class="mb-menu" data-menu="${k}">${label}</button>`).join('')}
      <button class="mb-icon mb-searchbtn" id="mbSearch" title="搜索（Ctrl+K）" aria-label="搜索">${icon('search')}</button>
    </div>
    <div class="mb-win">
      <span class="mb-winbtn" title="最小化"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 6h8"/></svg></span>
      <span class="mb-winbtn" title="最大化"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.5" y="2.5" width="7" height="7"/></svg></span>
      <span class="mb-winbtn close" title="关闭"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 3l6 6M9 3L3 9"/></svg></span>
    </div>`
  mb.querySelector('#mbRailToggle')?.addEventListener('click', () => {
    state.sbPinned = !state.sbPinned
    renderMenubar()
    render()
  })
  const mbSearch = mb.querySelector('#mbSearch')
  mbSearch.addEventListener('click', () => openSearchPalette())
  mb.querySelectorAll('[data-mbact]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.mbact === 'back') history.back()
    else toast('已是最近的历史记录')
  }))
  mb.querySelectorAll('[data-menu]').forEach((btn) => btn.addEventListener('click', (ev) => {
    ev.stopPropagation()
    document.querySelectorAll('.mb-pop').forEach((p) => p.remove())
    const [label, items] = menus[btn.dataset.menu]
    const pop = document.createElement('div')
    pop.className = 'mb-pop'
    pop.innerHTML = items.map(([text, key, act]) => text === '—'
      ? '<div class="mb-sep"></div>'
      : `<button class="mb-item" data-act="${act}"><span>${text}</span>${key ? `<span class="mb-key">${key}</span>` : ''}</button>`).join('')
    document.body.appendChild(pop)
    const r = btn.getBoundingClientRect()
    pop.style.left = `${r.left}px`
    pop.style.top = `${r.bottom + 4}px`
    pop.querySelectorAll('[data-act]').forEach((it) => it.addEventListener('click', () => {
      pop.remove()
      runMenuAction(it.dataset.act)
    }))
    setTimeout(() => document.addEventListener('click', function close(e) {
      if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
    }), 0)
  }))
}

function runMenuAction(act) {
  const focusHome = () => { state.view = 'home'; render(); setTimeout(() => document.getElementById('hhInput')?.focus(), 60) }
  const map = {
    newWindow: () => window.open(location.href, '_blank'),
    newChat: focusHome,
    tempChat: () => { state.draft = ''; focusHome(); toast('已新建临时聊天，退出后不保留（演示）') },
    newProject: () => { state.view = 'projects'; render(); setTimeout(() => openProjectForm(), 120) },
    openFolder: () => toast('已打开本地成果目录（演示）'),
    close: () => toast('关闭当前标签（演示）'),
    logout: async () => { await logout() },
    quit: () => toast('桌面客户端退出由外壳接管（演示）'),
    undo: () => document.execCommand('undo'),
    redo: () => document.execCommand('redo'),
    cut: () => document.execCommand('cut'),
    copy: () => document.execCommand('copy'),
    paste: () => document.execCommand('paste'),
    del: () => document.execCommand('delete'),
    selectAll: () => document.execCommand('selectAll'),
    settings: () => { state.view = 'settings'; state.settingsTab = 'general'; state.settingsQuery = ''; render() },
    toggleSidebar: () => { if (hasSidebarView()) { state.sbPinned = !state.sbPinned; render() } else { state.rail = !state.rail; render() } },
    cloud: () => toggleCloudPanel(),
    find: () => openSearchPalette(''),
    zoomIn: () => { document.body.style.zoom = String(Math.min(1.4, (Number(document.body.style.zoom) || 1) + 0.1)) },
    zoomOut: () => { document.body.style.zoom = String(Math.max(0.7, (Number(document.body.style.zoom) || 1) - 0.1)) },
    zoomReset: () => { document.body.style.zoom = '1' },
    fullscreen: () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.() },
    docs: () => toast('已打开使用文档（演示）'),
    shortcuts: () => toast('Ctrl+K 全局搜索 · Ctrl+, 设置 · Ctrl+Shift+S 侧边栏'),
    whatsnew: () => toast('新功能：首页置顶 / 项目 / 最近，定时任务与插件市场'),
    trouble: () => toast('故障排查：检查网络归属、模型能力与授权范围'),
    status: () => { state.view = 'admin'; render() },
    feedback: () => openFeedbackModal(),
    taskmgr: () => toast('任务管理器：当前 1 个活动会话（演示）'),
    update: () => toast('已是最新版本 1.6（演示）'),
    about: () => openAboutModal(),
  }
  ;(map[act] || (() => toast('该功能在演示版未接入')))()
}

function openAboutModal() {
  const mask = openModal('关于九规智能中枢', `
    <div class="form-note">九规智能中枢 企业版 AI 中枢，基于开源 DeepSeek Harness 0.2.2-rc.1 定制；客户端外壳与云浏览器按企业安全边界实现。</div>
    <div class="kv-row" style="grid-template-columns:repeat(2,minmax(0,1fr))">
      <div class="kv-box"><span>版本</span><b>1.6 · 企业空间</b></div>
      <div class="kv-box"><span>当前网络</span><b>${esc(state.boot.network?.label || '互联网')}</b></div>
      <div class="kv-box"><span>当前身份</span><b>${esc(state.boot.user.name)} · ${esc(state.boot.user.duty)}</b></div>
      <div class="kv-box"><span>部署</span><b>集团私有化</b></div>
    </div>
    <div class="form-foot"><span class="mono">Chromium 开源内核 · 凭据不落地</span><span class="spacer"></span><button class="btn" data-mclose>关闭</button></div>`)
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
}

function bindSidebarResize() {
  const handle = document.getElementById('sbGrip')
  if (!handle) return
  handle.addEventListener('dblclick', () => {
    state.sbUserW = 0
    localStorage.removeItem(PANE_RATIO_KEY)
    const paneW = paneWidthFor(Math.max(0, window.innerWidth - 58))
    document.documentElement.style.setProperty('--pane-w', `${paneW}px`)
    document.documentElement.style.setProperty('--sidebar-w', `${paneW}px`)
    applyLayout()
  })
  handle.addEventListener('pointerdown', (ev) => {
    ev.preventDefault()
    const startX = ev.clientX
    const startW = document.getElementById('sidebar').getBoundingClientRect().width
    const cloudW = document.getElementById('cbPanel')?.getBoundingClientRect().width || 0
    const maxW = Math.max(196, Math.min(Math.round(window.innerWidth * 0.6), window.innerWidth - 58 - cloudW - 240))
    const move = (e) => {
      const next = Math.min(maxW, Math.max(196, startW + (e.clientX - startX)))
      state.sidebarWidth = next
      state.sbUserW = next
      document.documentElement.style.setProperty('--sidebar-w', `${next}px`)
      document.documentElement.style.setProperty('--pane-w', `${next}px`)
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      const panesW = Math.max(1, window.innerWidth - 58)
      localStorage.setItem(PANE_RATIO_KEY, String(state.sidebarWidth / panesW))
      document.body.classList.remove('resizing')
    }
    document.body.classList.add('resizing')
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  })
}


const SIDEBAR_VIEWS = ['home', 'chat', 'tasks', 'skills']
const CLOUD_VIEWS = ['home', 'chat', 'tasks', 'knowledge', 'academy']
function cloudAllowed() {
  return CLOUD_VIEWS.includes(state.view)
}
function hasSidebarView() {
  return SIDEBAR_VIEWS.includes(state.view)
}
function sbFixed() {
  return (['home', 'chat', 'tasks'].includes(state.view)) && state.sbPinned && !state.rail
}

const PANE_RATIO_KEY = 'jg.paneRatio.v4'
function paneRatio() {
  const v = Number(localStorage.getItem(PANE_RATIO_KEY))
  return v >= 0.15 && v <= 0.9 ? v : 0.25
}
function paneWidthFor(width) {
  return Math.round(Math.min(900, Math.max(150, width * paneRatio())))
}

function applyLayout() {
  const showSb = sbFixed()
  const panesW = Math.max(0, window.innerWidth - 58)
  const paneW = paneWidthFor(panesW)
  document.documentElement.style.setProperty('--pane-w', `${paneW}px`)
  const cloud = state.cloudOpen && cloudAllowed()
  const homeCloud = state.view === 'home' && cloud
  let sbW = showSb ? paneW : 0
  let cbW = cloud ? (state.cbUserW || Math.round(panesW / 4)) : 0
  const minMain = 240
  if (sbW + cbW > panesW - minMain) {
    sbW = Math.min(sbW, Math.max(196, panesW - cbW - minMain))
    cbW = Math.min(cbW, Math.max(220, panesW - sbW - minMain))
  }
  document.documentElement.style.setProperty('--sidebar-w', `${sbW}px`)
  document.documentElement.style.setProperty('--cb-w', `${cbW}px`)
  document.documentElement.style.setProperty('--set-nav-w', `${state.setNavWidth}px`)
  const app = document.getElementById('app')
  app?.classList.toggle('home-cloud', homeCloud)
  const sb = document.getElementById('sidebar')
  if (sb) {
    sb.classList.toggle('hidden', !showSb)
    if (!showSb) sb.classList.remove('fly')
  }
}
window.addEventListener('resize', () => applyLayout())

function navIcon(id) {
  return {
    home: 'home', history: 'history', projects: 'folder', tasks: 'clock', skills: 'plugin', automation: 'clock',
    imagegen: 'image',
    datacenter: 'database', knowledge: 'book', oneMap: 'map', review: 'layers', finance: 'wallet',
    apps: 'grid', cloudbrowser: 'globe', settings: 'settings', admin: 'shield',
    drive: 'cloud', contacts: 'users', im: 'message', notice: 'megaphone', academy: 'cap', more: 'more',
    bid: 'doc', monitor: 'pulse',
  }[id] || 'doc'
}

/* --------------------------- 账户菜单（个人中心） --------------------------- */

const DEFAULT_FAVORITES = [
  { ref: 'R-PROJ-PUB', kind: 'data', title: '中心城区项目公示信息（2026）', meta: '数据中心 · 业务数据 · 规划一所', icon: 'database' },
  { ref: 'R-2026-Q3-IMG', kind: 'data', title: '卫星影像（九江市全域）2026 Q3', meta: '数据中心 · 影像 · 测绘地理信息中心', icon: 'image' },
  { ref: 'AC-01', kind: 'data', title: '国土空间规划编制办法（2026 修订）要点解读', meta: '教学园地 · 视频 · 规划一所', icon: 'video' },
  { ref: 'OA-2026-018', kind: 'flow', title: '滨江片区城市更新项目立项审批', meta: 'OA 流程 · 经营管理部 · 2026-11-06', status: '审批中', icon: 'task' },
  { ref: 'OA-2026-016', kind: 'flow', title: '中心城区控规调整用印申请', meta: 'OA 流程 · 综合办公室 · 2026-11-04', status: '已通过', icon: 'check' },
]

function getFavs() {
  if (!state.favorites) state.favorites = DEFAULT_FAVORITES.map((f) => ({ ...f }))
  return state.favorites
}
function isFav(ref) { return getFavs().some((f) => f.ref === ref) }
function toggleFav(payload) {
  const favs = getFavs()
  const i = favs.findIndex((f) => f.ref === payload.ref)
  if (i >= 0) { favs.splice(i, 1); return false }
  favs.push({ ...payload })
  return true
}

function openStoragePanel() {
  const used = storageUsedGB()
  const pct = storagePct()
  const free = Math.round((PERSONAL_STORAGE.totalGB - used) * 10) / 10
  const mask = openModal('个人云存储', `
    <div class="stor-hero">
      <div class="stor-ring" style="--p:${pct}"><span>${pct}%</span></div>
      <div class="stor-hero-main">
        <b>${used} GB <em>/ ${PERSONAL_STORAGE.totalGB} GB</em></b>
        <span>个人总云存储已用 · 剩余 ${free} GB</span>
        <div class="stor-bar"><i style="width:${pct}%"></i></div>
      </div>
    </div>
    <div class="stor-grid">
      <div class="stor-cell"><span>个人云盘</span><b>${PERSONAL_STORAGE.cloudGB} GB</b><small>聊天附件、个人上传文件</small></div>
      <div class="stor-cell"><span>智能笔记本</span><b>${PERSONAL_STORAGE.notebookGB} GB</b><small>笔记本本地上传的来源</small></div>
      <div class="stor-cell"><span>个人总容量</span><b>${PERSONAL_STORAGE.totalGB} GB</b><small>个人云盘与智能笔记本共用</small></div>
    </div>
    <div class="form-note">个人云盘和智能笔记本共用每人 50GB 总容量；部门云空间、数据中心与云空间引用不占个人容量。</div>
    <div class="form-foot"><span class="mono">容量按账户统计，跨设备一致</span><span class="spacer"></span><button class="btn" data-mclose>关闭</button><button class="btn primary" data-go-mycloud>在云空间中查看</button></div>`)
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
  mask.querySelector('[data-go-mycloud]').addEventListener('click', () => {
    mask.remove()
    state.view = 'drive'
    state.driveSpace = 'CL-PERSONAL'
    render()
  })
}

function openFavorites() {
  let tab = 'data'
  const bodyHtml = (which) => {
    const list = getFavs().filter((f) => f.kind === which)
    if (!list.length) return `<div class="fav-empty">${icon(which === 'data' ? 'star' : 'task')}<span>还没有收藏${which === 'data' ? '数据' : 'OA 流程'}，可在资源详情或教学园地点击收藏。</span></div>`
    return list.map((f) => `
      <div class="fav-row">
        <span class="fav-ico">${icon(f.icon || (which === 'data' ? 'database' : 'task'))}</span>
        <span class="fav-main"><b>${esc(f.title)}</b><span>${esc(f.meta)}</span></span>
        ${f.status ? `<span class="tag">${esc(f.status)}</span>` : ''}
        <button class="fav-remove" data-fav-remove="${esc(f.ref)}" title="取消收藏">${icon('star')}<span>已收藏</span></button>
      </div>`).join('')
  }
  const mask = openModal('个人中心 · 我的收藏', `
    <div class="fav-tabs">
      <button class="fav-tab on" data-favtab="data">收藏的数据 <span class="mono">${getFavs().filter((f) => f.kind === 'data').length}</span></button>
      <button class="fav-tab" data-favtab="flow">OA 流程 <span class="mono">${getFavs().filter((f) => f.kind === 'flow').length}</span></button>
    </div>
    <div class="fav-list" id="favList"></div>
    <div class="form-note">收藏只记录引用关系，不复制数据中心原文件；OA 流程收藏保留流程编号与当前状态。</div>
  `, { wide: true })
  const list = mask.querySelector('#favList')
  const refresh = () => {
    list.innerHTML = bodyHtml(tab)
    mask.querySelectorAll('[data-favtab]').forEach((b) => b.classList.toggle('on', b.dataset.favtab === tab))
    list.querySelectorAll('[data-fav-remove]').forEach((b) => b.addEventListener('click', () => {
      const ref = b.dataset.favRemove
      toggleFav({ ref })
      toast('已取消收藏')
      refresh()
      if (window.__accountPop) window.__accountPop.remove()
      window.__accountPop = null
    }))
  }
  mask.querySelectorAll('[data-favtab]').forEach((b) => b.addEventListener('click', () => { tab = b.dataset.favtab; refresh() }))
  refresh()
}

const QUOTA = { used: '12.4M', limit: '20M', pct: 62 }
const PERSONAL_STORAGE = { totalGB: 50, cloudGB: 6.2, notebookGB: 14.8 }
const storageUsedGB = () => Math.round((PERSONAL_STORAGE.cloudGB + PERSONAL_STORAGE.notebookGB) * 10) / 10
const storagePct = () => Math.min(100, Math.round((storageUsedGB() / PERSONAL_STORAGE.totalGB) * 100))
const usageUsed = () => QUOTA.used
const usageLimit = () => QUOTA.limit
const usagePct = () => QUOTA.pct

function openAccountMenu(anchor) {
  document.querySelectorAll('.account-pop').forEach((p) => p.remove())
  const { user, counts } = state.boot
  const item = (act, ic, label, meta = '') => `
    <button class="acct-item" data-acct="${act}">
      <span class="ico">${icon(ic)}</span><span>${label}</span>
      ${meta ? `<span class="acct-meta">${esc(meta)}</span>` : ''}
    </button>`

  const order = ['employee', 'ops', 'guest']
  const nextId = order[(order.indexOf(user.role) + 1) % order.length]
  const nextRole = (state.boot.allRoles || []).find((r) => r.id === nextId)
  const pop = document.createElement('div')
  pop.className = 'account-pop'
  pop.innerHTML = `
    <div class="acct-head">
      <div class="avatar lg">${esc(user.name.slice(0, 1))}</div>
      <div style="min-width:0">
        <div class="acct-name">${esc(user.name)}</div>
        <div class="acct-plan">${esc(user.label)} · ${esc(user.unit)}</div>
      </div>
      <span class="tag ${state.boot.network?.id === 'secret' ? 'secret' : ''}" style="margin-left:auto;flex:none">${esc(state.boot.network?.badge || '互联网')}</span>
    </div>
    <div class="acct-sep"></div>
    ${item('usage', 'pulse', 'Token 用量', `${usageUsed()} / ${usageLimit()} · ${usagePct()}%`)}
    ${item('favorites', 'star', '我的收藏', `${getFavs().length} 项`)}
    ${item('storage', 'cloud', '个人云存储', `${storageUsedGB()} / ${PERSONAL_STORAGE.totalGB} GB · ${storagePct()}%`)}
    ${item('models', 'spark', '模型配置', '个人中心')}
    ${item('ai', 'spark', 'AI 调用能力', '按权限开放')}
    ${item('appearance', 'spark', '个性化')}
    ${item('settings', 'settings', '设置', 'Ctrl+,')}
    <div class="acct-sep"></div>
    ${item('audit', 'task', '审计日志')}
    ${item('role', 'shield', '切换演示角色', `${(state.boot.allRoles || []).length} 个角色可选`)}
    ${item('network', 'map', '切换演示网络', esc(state.boot.network?.label || '互联网'))}
    <div class="acct-sep"></div>
    ${item('help', 'doc', '帮助与反馈')}
    ${item('logout', 'close', '退出登录')}`

  document.body.appendChild(pop)
  window.__accountPop = pop
  const rect = anchor.getBoundingClientRect()
  const navBtn = document.querySelector('#railbar [data-nav]')
  const left = navBtn ? navBtn.getBoundingClientRect().right + 10 : rect.left
  pop.style.left = `${Math.max(8, left)}px`
  const popH = pop.offsetHeight
  if (rect.top - 8 < popH + 8) {
    pop.style.top = `${Math.min(window.innerHeight - popH - 8, rect.bottom + 8)}px`
  } else {
    pop.style.bottom = `${window.innerHeight - rect.top + 8}px`
  }

  pop.querySelectorAll('[data-acct]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.acct
      if (act === 'logout') {
        logout()
        return
      }
      if (act === 'help') {
        openFeedbackModal()
        return
      }
      if (act === 'network') {
        switchNetwork()
        return
      }
      if (act === 'audit') {
        state.auditOpen = true
        renderAuditDrawer()
        return
      }
      if (act === 'favorites') {
        pop.remove()
        window.__accountPop = null
        openFavorites()
        return
      }
      if (act === 'storage') {
        pop.remove()
        window.__accountPop = null
        openStoragePanel()
        return
      }
      if (act === 'models') {
        state.view = 'settings'
        state.settingsTab = 'models'
        render()
        return
      }
      if (act === 'ai') {
        openAiTools()
        return
      }
      if (act === 'role') {
        const roleOrder = ['employee', 'ops', 'guest']
        const roles = (state.boot.allRoles || []).slice().sort((a, b) => roleOrder.indexOf(a.id) - roleOrder.indexOf(b.id))
        pop.innerHTML = `
          <div class="acct-subhead"><span>切换演示角色</span><button class="acct-back" data-back>返回</button></div>
          ${roles.map((r) => `
            <button class="acct-item${r.id === state.boot.user.role ? ' on' : ''}" data-role="${r.id}">
              <span class="acct-ico">${icon('shield')}</span>
              <span class="acct-main"><span class="acct-label">${esc(r.name)}</span><span class="acct-meta">${esc(r.label)} · ${esc(r.unit)}</span></span>
              ${r.id === state.boot.user.role ? '<span class="acct-tick">当前</span>' : ''}
            </button>`).join('')}`
        setTimeout(() => {
          pop.querySelectorAll('[data-role]').forEach((b) => b.addEventListener('click', (ev) => { ev.stopPropagation(); pop.remove(); window.__accountPop = null; switchRole(b.dataset.role) }))
          pop.querySelector('[data-back]').addEventListener('click', (ev) => { ev.stopPropagation(); pop.remove(); window.__accountPop = null; openAccountMenu(anchor) })
        }, 0)
        return
      }
      pop.remove()
      window.__accountPop = null
      state.view = 'settings'
      state.settingsTab = act === 'settings' ? 'general' : act
      render()
    })
  })

  setTimeout(() => document.addEventListener('click', function close(ev) {
    if (!pop.contains(ev.target) && ev.target.isConnected) { pop.remove(); window.__accountPop = null; document.removeEventListener('click', close) }
  }), 0)
}

/* ------------------------------ topbar ------------------------------ */

function renderTopbar() {
  const { user, allRoles, modules } = state.boot
  const unread = state.notifications.filter((n) => n.unread).length
  document.getElementById('topbar').innerHTML = `
    <div class="top-left">
      <div class="crumb">企业空间 <span style="color:#c9c9c3">/</span> <b>${modules[state.view]?.label || '新会话'}</b></div>
    </div>
    <div class="top-actions">
      ${cloudAllowed() ? `<button class="mb-icon cb-switch${state.cloudOpen ? ' on' : ''}" id="cbToggle" title="${state.cloudOpen ? '折叠云浏览器' : '展开云浏览器'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="3"/>${state.cloudOpen ? '<rect x="15" y="4" width="6" height="16" rx="2.6" fill="currentColor" stroke="none" opacity="0.85"/>' : '<path d="M15 4v16" opacity="0.45"/>'}</svg></button>` : ''}
      <span class="environment"><span class="dot"></span>${esc(state.boot.network?.label || '互联网')} · 客户端 1.6</span>
    </div>`
  document.getElementById('cbToggle')?.addEventListener('click', () => toggleCloudPanel())
}

function openNotifications(anchor) {
  document.querySelectorAll('.notify-pop').forEach((p) => p.remove())
  const items = state.notifications
  const unread = items.filter((n) => n.unread).length
  const pop = document.createElement('div')
  pop.className = 'notify-pop'
  pop.innerHTML = `
    <div class="notify-head">
      <span class="notify-title">通知</span>
      <span class="notify-sub">${unread ? `${unread} 条未读` : '全部已读'}</span>
      <span class="spacer"></span>
      <button class="btn sm" id="readAll">全部已读</button>
    </div>
    <div class="notify-list">
      ${items.map((n) => `
        <button class="notify-item${n.unread ? ' unread' : ''}" data-nid="${n.id}" data-nav-to="${n.nav}">
          <span class="notify-mark ${n.kind}"></span>
          <span class="notify-copy">
            <span class="notify-name">${esc(n.title)}</span>
            <span class="notify-body">${esc(n.body)}</span>
            <span class="notify-time">${esc(n.time)}</span>
          </span>
        </button>`).join('')}
    </div>
    <div class="notify-foot">通知与审计同源：安全事件不可关闭，其余可在设置中调整</div>`

  document.body.appendChild(pop)
  const rect = anchor.getBoundingClientRect()
  pop.style.left = `${Math.min(rect.left, window.innerWidth - 330)}px`
  pop.style.top = `${rect.bottom + 8}px`

  pop.querySelector('#readAll').addEventListener('click', async () => {
    await api('/api/notifications/read', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: 'all' }) })
    loadNotifications()
    pop.remove()
  })
  pop.querySelectorAll('[data-nid]').forEach((b) => {
    b.addEventListener('click', async () => {
      await api('/api/notifications/read', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: b.dataset.nid }) })
      await loadNotifications()
      pop.remove()
      state.view = b.dataset.navTo
      render()
    })
  })

  setTimeout(() => document.addEventListener('click', function close(ev) {
    if (!pop.contains(ev.target) && !anchor.contains(ev.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

async function loadNotifications() {
  const { body } = await api('/api/notifications')
  state.notifications = body.items || []
}

/* --------------------------- 全局搜索面板 --------------------------- */

async function openSearchPalette(initial = '') {
  document.querySelectorAll('.sp-backdrop').forEach((p) => p.remove())
  const { modules } = state.boot
  const visible = (id) => state.boot.user.visibleModules.includes(id)
  const view = state.view
  const viewLabel = {
    home: '首页', chat: '对话', history: '历史对话', projects: '项目', datacenter: '数据中心',
    skills: '技能', apps: '应用', settings: '设置', tasks: '任务', automation: '自动化', admin: '管理中心',
    drive: '云空间', contacts: '通讯录', im: '即时通讯', knowledge: '知识库', notice: '通知公告',
    academy: '学习中心', imagegen: '图像生成', cloudbrowser: '云浏览器', more: '更多',
  }[view] || modules[view]?.label || '当前模块'

  const wrap = document.createElement('div')
  wrap.className = 'sp-backdrop'
  wrap.innerHTML = `
    <div class="sp-panel">
      <div class="sp-head">
        <span class="ico">${icon('search')}</span>
        <input id="spInput" placeholder="输入关键词搜索" autocomplete="off" value="${esc(initial)}" />
        <span class="sp-kbd">Esc</span>
      </div>
      <div class="sp-suggest" id="spSuggest"></div>
      <div class="sp-body" id="spBody"></div>
    </div>`
  document.body.appendChild(wrap)
  const input = wrap.querySelector('#spInput')
  const sug = wrap.querySelector('#spSuggest')
  const body = wrap.querySelector('#spBody')
  input.focus()
  input.setSelectionRange(input.value.length, input.value.length)

  const [res, appsRes, prjRes] = await Promise.all([api('/api/resources'), api('/api/apps'), api('/api/projects')])
  const resources = res.ok ? res.body.items || [] : []
  const apps = appsRes.ok ? appsRes.body.items || [] : []
  const projects = prjRes.ok ? prjRes.body.items || [] : []
  const tasks = state.tasks || []
  const conversations = state.conversations || []
  const navRows = Object.keys(modules).filter(visible)

  let scope = 'current'
  const close = () => { wrap.remove(); document.removeEventListener('keydown', onKey) }
  const go = (id) => { close(); state.view = id; render() }
  const group = (title, rows) => rows.length ? `<div class="sp-group">${title}</div>${rows.join('')}` : ''
  const hit = (s) => {
    const q = input.value.trim().toLowerCase()
    return q && String(s || '').toLowerCase().includes(q)
  }

  const navRow = (id) => `<button class="sp-row" data-view="${id}"><span class="ico">${icon(navIcon(id))}</span><span class="sp-main">${esc(modules[id].label)}</span><span class="sp-meta">模块</span></button>`
  const resourceRow = (r) => `<button class="sp-row" data-res="${esc(r.id)}"><span class="ico">${icon('database')}</span><span class="sp-main">${esc(r.name)}</span><span class="sp-meta">${esc(r.type || '资源')} · ${esc(r.source || '数据中心')}</span></button>`
  const appRow = (a) => `<button class="sp-row" data-view="skills"><span class="ico">${icon('grid')}</span><span class="sp-main">${esc(a.name)}</span><span class="sp-meta">应用 · ${esc(a.category || '内置')}</span></button>`
  const taskRow = (t) => `<button class="sp-row" data-view="tasks"><span class="ico">${icon('task')}</span><span class="sp-main">${esc(t.title || t.name)}</span><span class="sp-meta">任务 · ${esc(t.status || '')}</span></button>`
  const projectRow = (p) => `<button class="sp-row" data-project="${esc(p.id)}"><span class="ico">${icon('folder')}</span><span class="sp-main">${esc(p.name)}</span><span class="sp-meta">项目</span></button>`
  const convRow = (c) => `<button class="sp-row" data-conv="${esc(c.id)}"><span class="ico">${icon('chat')}</span><span class="sp-main">${esc(c.title)}</span><span class="sp-meta">会话</span></button>`

  const limits = (global) => ({ nav: global ? 6 : 10, res: global ? 6 : 10, prj: 4, app: 4, task: 4, conv: 4 })
  const groups = (global) => {
    const lim = limits(global)
    const nav = group('导航', navRows.filter((id) => hit(modules[id].label)).slice(0, lim.nav).map(navRow))
    const resource = group('资源', resources.filter((r) => hit(`${r.name} ${r.source || ''} ${r.dataOwner || ''}`)).slice(0, lim.res).map(resourceRow))
    const project = group('项目', projects.filter((p) => hit(`${p.name || ''} ${p.desc || ''}`)).slice(0, lim.prj).map(projectRow))
    const app = group('应用', apps.filter((a) => hit(`${a.name || ''} ${a.category || ''}`)).slice(0, lim.app).map(appRow))
    const task = group('任务', tasks.filter((t) => hit(`${t.title || t.name || ''} ${t.status || ''}`)).slice(0, lim.task).map(taskRow))
    const conv = group('会话', conversations.filter((c) => hit(c.title)).slice(0, lim.conv).map(convRow))
    if (global) return [nav, resource, project, app, task, conv]
    if (view === 'datacenter' || view === 'drive' || view === 'knowledge') return [resource]
    if (view === 'projects') return [project]
    if (view === 'skills' || view === 'apps') return [app]
    if (view === 'tasks' || view === 'automation') return [task]
    if (view === 'im' || view === 'chat' || view === 'history') return [conv]
    return [nav]
  }

  const options = [
    { id: 'current', title: '搜索当前模块', sub: viewLabel || '当前模块', ic: 'search' },
    { id: 'global', title: '搜索全局', sub: '全系统 · 模块、资源、项目、应用、任务、会话', ic: 'globe' },
  ]

  const paintSuggest = () => {
    sug.querySelectorAll('.sp-sug').forEach((b) => b.classList.toggle('on', b.dataset.scope === scope))
  }

  const openSuggest = () => {
    const q = input.value.trim()
    if (!q) { sug.removeAttribute('data-open'); sug.innerHTML = ''; return }
    sug.dataset.open = '1'
    sug.innerHTML = options.map((o) => `
      <button class="sp-sug${scope === o.id ? ' on' : ''}" data-scope="${o.id}">
        <span class="sp-sug-ico">${icon(o.ic)}</span>
        <span class="sp-sug-main"><span class="sp-sug-title">${o.title}</span><span class="sp-sug-sub">${esc(o.sub)}</span></span>
        <span class="sp-sug-key">Enter</span>
      </button>`).join('') + '<div class="sp-sug-foot">↑↓ 切换 · Enter 搜索 · Esc 关闭</div>'
    sug.querySelectorAll('.sp-sug').forEach((b) => {
      b.addEventListener('mouseenter', () => { scope = b.dataset.scope; paintSuggest() })
      b.addEventListener('click', () => execute(b.dataset.scope))
    })
    paintSuggest()
  }

  const hideSuggest = () => { sug.removeAttribute('data-open'); sug.innerHTML = '' }

  const bindRows = () => {
    wrap.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => go(b.dataset.view)))
    wrap.querySelectorAll('[data-res]').forEach((b) => b.addEventListener('click', () => { close(); openResource(b.dataset.res) }))
    wrap.querySelectorAll('[data-project]').forEach((b) => b.addEventListener('click', () => { close(); openProject(b.dataset.project) }))
    wrap.querySelectorAll('[data-conv]').forEach((b) => b.addEventListener('click', () => { close(); openConversation(b.dataset.conv) }))
  }

  const execute = (which = scope) => {
    const q = input.value.trim()
    if (!q) { input.focus(); return }
    scope = which === 'global' ? 'global' : 'current'
    hideSuggest()
    const rendered = groups(scope === 'global').filter(Boolean)
    body.innerHTML = rendered.length ? rendered.join('')
      : `<div class="sp-empty">${scope === 'global' ? '没有找到匹配结果，试试「影像」「审图」「出图」' : '当前模块内没有匹配结果，按 ↑ 切换到全局搜索'}</div>`
    bindRows()
    input.focus()
  }

  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return }
    if (!input.value.trim()) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!sug.dataset.open) openSuggest()
      scope = scope === 'current' ? 'global' : 'current'
      paintSuggest()
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      execute(scope)
    }
  }

  input.addEventListener('input', () => {
    scope = 'current'
    body.innerHTML = ''
    openSuggest()
  })
  wrap.addEventListener('click', (e) => { if (e.target === wrap) close() })
  document.addEventListener('keydown', onKey)
  if (initial.trim()) openSuggest()
}

/* -------------------------------- views ----------------------------- */

async function renderView() {
  const view = document.getElementById('view')
  if (!state.boot.authed) return renderLogin(view)
  const guestBase = ['home', 'settings', 'imagegen', 'cloudbrowser', 'more']
  const guestGrants = (state.boot.user.grants || [])
  if (state.boot.user.role === 'guest' && !guestBase.includes(state.view) && !guestGrants.includes(state.view)) {
    return renderGuestShell(view, state.view)
  }
  if (state.view === 'home') return renderHome(view)
  if (state.view === 'chat') return renderChat(view)
  if (state.view === 'history') return renderHistory(view)
  if (state.view === 'projects') return renderProjects(view)
  if (state.view === 'datacenter') return renderDatacenter(view)
  if (state.view === 'skills') return renderSkills(view)
  if (state.view === 'apps') return renderApps(view)
  if (state.view === 'settings') return renderSettings(view)
  if (state.view === 'tasks') {
    try { return await renderTaskCenter(view) } catch (e) {
      window.__viewErr = 'tasks: ' + e.message + ' @ ' + (e.stack || '').split('\n').slice(0, 4).join(' | ')
      view.innerHTML = '<div style="padding:24px;font-family:monospace;white-space:pre-wrap">TASKERR ' + esc(window.__viewErr) + '</div>'
      return
    }
  }
  if (state.view === 'admin') return renderAdmin(view)
  if (state.view === 'automation') return renderTaskCenter(view)
  if (state.view === 'knowledge') {
    try { return await renderNotebook(view) } catch (e) {
      view.innerHTML = '<div style="padding:24px;font-family:monospace">NBERR: ' + esc(e.message) + '<pre style="white-space:pre-wrap">' + esc((e.stack || '').slice(0, 700)) + '</pre></div>'
      return
    }
  }
  if (state.view === 'imagegen') return renderImage(view)
  if (state.view === 'drive') return renderDrive(view)
  if (state.view === 'contacts') return renderContacts(view)
  if (state.view === 'im') return renderIM(view)
  if (state.view === 'notice') return renderNotices(view)
  if (state.view === 'academy') return renderAcademy(view)
  return renderPlaceholder(view)
}

function composerPlusItems() {
  return [
    { act: 'attach', ic: 'plus', label: '添加照片和文件', desc: '从计算机上传' },
    { act: 'library', ic: 'database', label: '从资料库添加', desc: '浏览数据中心的资源' },
    { act: 'image', ic: 'image', label: '创建图像', desc: '按描述生成图片' },
    { act: 'web', ic: 'globe', label: '网页搜索', desc: '当前网络未开放', off: true },
    { act: 'project', ic: 'folder', label: '在项目中工作', desc: '在项目里开始对话' },
    { act: 'research', ic: 'book', label: '深度研究', desc: '暂未开放', off: true },
    { act: 'draw', ic: 'pen', label: '绘图', desc: '暂未开放', off: true },
    { act: 'sep' },
    { act: 'docx', ic: 'doc', label: '新建文档', desc: '.docx' },
    { act: 'pdf', ic: 'doc', label: '新建 PDF', desc: '.pdf' },
    { act: 'xlsx', ic: 'table', label: '新建表格', desc: '.xlsx' },
    { act: 'pptx', ic: 'layers', label: '新建演示', desc: '.pptx' },
  ]
}

function openComposerPlus(anchor) {
  if (window.__plusPop) { window.__plusPop.remove(); window.__plusPop = null; return }
  document.querySelectorAll('.conv-menu, .plus-pop').forEach((p) => p.remove())
  const items = composerPlusItems()
  const pop = document.createElement('div')
  pop.className = 'plus-pop'
  pop.innerHTML = items.map((it) => (it.act === 'sep'
    ? '<div class="pp-sep"></div>'
    : `<button class="pp-row${it.off ? ' off' : ''}" data-plus="${it.act}"${it.off ? ' disabled' : ''}>
        <span class="ico pp-ico">${icon(it.ic)}</span>
        <span class="pp-label">${esc(it.label)}</span>
        <span class="pp-desc">${esc(it.desc || '')}</span>
      </button>`)).join('')
  document.body.appendChild(pop)
  window.__plusPop = pop
  const r = anchor.getBoundingClientRect()
  const composer = anchor.closest('.hh-composer, .chat-composer, .img-composer') || anchor.parentElement
  const cr = composer.getBoundingClientRect()
  pop.style.width = `${Math.max(360, Math.round(cr.width))}px`
  pop.style.left = `${Math.round(Math.max(12, cr.left))}px`
  pop.style.top = `${Math.round(r.bottom + 10)}px`
  const maxH = Math.min(window.innerHeight - r.bottom - 16, 560)
  pop.style.maxHeight = `${Math.max(260, maxH)}px`

  pop.querySelectorAll('[data-plus]:not(.off)').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    pop.remove()
    window.__plusPop = null
    const act = b.dataset.plus
    if (act === 'attach') openChatAttachment()
    if (act === 'library') openLibraryPicker()
    if (act === 'image') { state.view = 'imagegen'; render() }
    if (act === 'project') openProjectPicker()
    if (['pdf', 'docx', 'xlsx', 'pptx'].includes(act)) openDocDialog(act)
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

async function openChatAttachment() {
  let chosen = null
  const mask = openModal('添加附件', `
    <div class="form-note">附件留在本机；发送到会话后，集团云端只保留 30 天临时副本，到期自动清理。需要长期保存，请在聊天附件上点「转存」。</div>
    <div class="att-drop" id="attDrop">
      <input type="file" id="attInput" hidden>
      <span class="att-drop-ico">${icon('upload')}</span>
      <b>拖放文件，或点击选择</b>
      <span>单个附件最大 2 GB · 本机保留，云端临时副本 30 天</span>
    </div>
    <div class="att-chosen" id="attChosen" hidden></div>
    <div class="form-foot"><span class="mono">本地文件 · 云端临时 30 天</span><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="attSend" disabled>添加附件</button></div>`)
  const drop = mask.querySelector('#attDrop')
  const input = mask.querySelector('#attInput')
  const chosenEl = mask.querySelector('#attChosen')
  const send = mask.querySelector('#attSend')
  const setFile = (file) => {
    if (!file) return
    chosen = file
    const kb = file.size / 1024
    const size = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`
    chosenEl.hidden = false
    chosenEl.innerHTML = `<span class="att-file-ico">${icon('doc')}</span><span class="att-file-main"><b>${esc(file.name)}</b><span>${size} · ${esc(file.type || '文件')} · 仅本机</span></span><button type="button" class="att-file-x" data-att-clear title="移除">${icon('close')}</button>`
    send.disabled = false
    chosenEl.querySelector('[data-att-clear]').addEventListener('click', (ev) => {
      ev.stopPropagation(); chosen = null; chosenEl.hidden = true; chosenEl.innerHTML = ''; send.disabled = true; input.value = ''
    })
  }
  drop.addEventListener('click', () => input.click())
  input.addEventListener('change', () => setFile(input.files && input.files[0]))
  drop.addEventListener('dragover', (ev) => { ev.preventDefault(); drop.classList.add('drag') })
  drop.addEventListener('dragleave', () => drop.classList.remove('drag'))
  drop.addEventListener('drop', (ev) => { ev.preventDefault(); drop.classList.remove('drag'); setFile(ev.dataTransfer.files && ev.dataTransfer.files[0]) })
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
  send.addEventListener('click', () => {
    if (!chosen) return
    addComposerRef({ kind: 'file', id: 'local-' + Date.now(), label: chosen.name })
    mask.remove()
    toast(`已添加「${chosen.name}」；仅本机保留，云端临时副本 30 天`)
  })
}

/* 从资料库添加：选数据中心资源作为对话上下文 */
async function openLibraryPicker() {
  const { body } = await api('/api/resources')
  const items = (body.items || []).slice(0, 14)
  const mask = openModal('从资料库添加', `
    <div class="lib-list">
      ${items.map((r) => `<button class="lib-row" data-lib="${esc(r.id)}">
        <span class="ico">${icon(r.type === 'video' ? 'video' : r.type === 'image' ? 'image' : 'doc')}</span>
        <span class="lib-name">${esc(r.name)}</span>
        <span class="lib-meta">${esc(r.source || '')}</span>
      </button>`).join('')}
    </div>`, { wide: true })
  mask.querySelectorAll('[data-lib]').forEach((b) => b.addEventListener('click', () => {
    const r = items.find((x) => x.id === b.dataset.lib)
    addComposerRef({ kind: 'library', label: r.name, id: r.id })
    mask.remove()
    renderView()
  }))
}

/* 在项目中工作：选一个项目作为对话上下文 */
async function openProjectPicker() {
  const { body } = await api('/api/projects')
  const items = body.items || []
  const mask = openModal('在项目中工作', `
    <div class="lib-list">
      ${items.map((p) => `<button class="lib-row" data-proj="${esc(p.id)}">
        <span class="ico">${icon('folder')}</span>
        <span class="lib-name">${esc(p.name)}</span>
        <span class="lib-meta">${p.personal ? '个人项目' : '团队项目'}</span>
      </button>`).join('')}
    </div>`, { wide: true })
  mask.querySelectorAll('[data-proj]').forEach((b) => b.addEventListener('click', () => {
    const p = items.find((x) => x.id === b.dataset.proj)
    addComposerRef({ kind: 'project', label: p.name, id: p.id })
    mask.remove()
    renderView()
  }))
}

function addComposerRef(ref) {
  state.composerRefs = (state.composerRefs || []).filter((x) => x.id !== ref.id)
  state.composerRefs.push(ref)
}

const ROLE_HOME = {
  employee: {
    title: '今天有什么安排？',
    tips: [
      { label: '查阅项目公示', desc: '汇总公示单位、期限与状态', prompt: '查阅本周项目公示，汇总单位、期限与状态', icon: 'doc' },
      { label: '查看空间数据', desc: '调取图层、影像与指标口径', prompt: '查看中心城区影像与控规图层，说明指标口径', icon: 'folder' },
      { label: '核对规划口径', desc: '对照控规、用地与开发强度', prompt: '核对这块用地的控规指标与开发强度口径', icon: 'spark' },
    ],
  },
}

async function renderHome(el) {
  const { quickPrompts, user } = state.boot
  const [{ body: convBody }, { body: prjBody }] = await Promise.all([api('/api/conversations'), api('/api/projects')])
  const convs = convBody.items || []
  const projects = prjBody.items || []
  const pinned = convs.slice(0, 2)
  const recent = convs.slice(0, 7)

  const rh = ROLE_HOME[user.role] || ROLE_HOME.employee
  const tips = rh.tips
  el.innerHTML = `
  <div class="home-home">
    <div class="hh-center">
      <div class="hh-title">${esc(rh.title)}</div>
      <div class="hh-composer">
        <button class="hc-plus" id="attachBtn" title="添加照片、文件或工具"><span class="ico">${icon('plus')}</span></button>
        <textarea id="draft" rows="1" placeholder="询问 九规智能中枢">${esc(state.draft)}</textarea>
        <div class="hc-right">
          <button class="hc-lang" id="langBtn" title="输入语言"><span>中</span><span class="ico hc-caret">${icon('chevron')}</span></button>
          <button class="hc-mic" id="micBtn" title="语音输入"><span class="ico">${icon('mic')}</span></button>
          <button class="hc-send" id="sendBtn" title="发送">${icon('up')}</button>
        </div>
      </div>
      ${(state.composerRefs || []).length ? `<div class="hh-refs">
        ${state.composerRefs.map((r) => `<span class="hh-ref" data-refdrop="${esc(r.id)}">
          <span class="ico">${icon(r.kind === 'project' ? 'folder' : 'doc')}</span>${esc(r.label)}<span class="hh-ref-x">×</span>
        </span>`).join('')}
      </div>` : ''}
      <div class="hh-sugs">
        ${tips.map((q) => `<button class="sug" data-prompt="${esc(q.prompt)}">
          <span class="ico">${icon(q.icon)}</span>
          <span class="sug-label">${esc(q.label)}</span>
          <span class="sug-desc">${esc(q.desc)}</span>
        </button>`).join('')}
      </div>
    </div>
  </div>`

  const draft = el.querySelector('#draft')
  draft.addEventListener('input', (e) => { state.draft = e.target.value })
  el.querySelector('#langBtn')?.addEventListener('click', () => toast('输入语言：中文（可在个人中心调整）'))
  el.querySelectorAll('[data-prompt]').forEach((btn) => btn.addEventListener('click', () => {
    state.draft = btn.dataset.prompt
    renderView()
  }))
  el.querySelector('#attachBtn').addEventListener('click', (ev) => openComposerPlus(ev.currentTarget))
  el.querySelectorAll('[data-refdrop]').forEach((b) => b.addEventListener('click', () => {
    state.composerRefs = (state.composerRefs || []).filter((r) => r.id !== b.dataset.refdrop)
    renderView()
  }))
  el.querySelector('#micBtn')?.addEventListener('click', () => toast('语音输入需授权麦克风（演示）'))
  el.querySelector('#sendBtn').addEventListener('click', submitTask)
  draft.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.shiftKey || e.ctrlKey)) { e.preventDefault(); submitTask() }
  })
  el.querySelectorAll('[data-conv]').forEach((b) => b.addEventListener('click', () => openConversation(b.dataset.conv)))
  el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => { state.view = b.dataset.go; render() }))
  el.querySelectorAll('[data-project]').forEach((b) => b.addEventListener('click', () => openProject(b.dataset.project)))
  applyLayout()
  draft.focus()
}

function greet() {
  const h = new Date().getHours()
  if (h < 6) return '夜深了'
  if (h < 12) return '上午好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
}

async function openConversation(id) {
  const { body: one } = await api(`/api/conversation?id=${id}`)
  if (!one.item) return
  state.conversation = one.item
  state.chatSteps = []
  state.chatError = ''
  state.pendingConfirm = null
  state.view = 'chat'
  render()
}

/* ------------------------------- 项目 ------------------------------- */

function relTime(str) {
  const t = new Date(String(str || '').replace(/-/g, '/')).getTime()
  if (!t || Number.isNaN(t)) return ''
  const diff = Math.max(0, Date.now() - t)
  const m = Math.floor(diff / 60000)
  if (m < 1) return '刚刚'
  if (m < 60) return `${m} 分钟前`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} 小时前`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d} 天前`
  if (d < 30) return `${Math.floor(d / 7)} 周前`
  if (d < 365) return `${Math.floor(d / 30)} 个月前`
  return `${Math.floor(d / 365)} 年前`
}

async function renderProjects(el) {
  const { body } = await api('/api/projects')
  state.projects = body.items || []
  state.projects.forEach((p) => { if ((state.pinnedProjects || []).includes(p.id)) p.pinned = true })
  const q = state.prjQuery || ''
  const dir = state.prjSort === 'asc' ? 1 : -1
  const list = state.projects
    .filter((p) => p.personal)
    .filter((p) => !q || (p.name + (p.desc || '')).includes(q))
    .slice()
    .sort((a, b) => (String(a.updated) > String(b.updated) ? dir : -dir))
  const pageSize = 10
  const pages = Math.max(1, Math.ceil(list.length / pageSize))
  const page = Math.min(Math.max(1, state.prjPage || 1), pages)
  state.prjPage = page
  const pageItems = list.slice((page - 1) * pageSize, page * pageSize)
  el.innerHTML = `
    <div class="prj-head">
      <div class="view-title">项目</div>
      <div class="prj-head-actions">
        <div class="search prj-search"><span class="ico">${icon('search')}</span><input id="prjSearch" placeholder="搜索项目" value="${esc(q)}"></div>
        <button class="btn primary" id="prjNew">${icon('plus')}创建</button>
      </div>
    </div>
    <div class="prj-table">
      <div class="prj-thead">
        <span class="prj-th-name">名称</span>
        <span class="spacer"></span>
        <span class="prj-th-time">已更新 <button class="prj-sort" id="prjSort" title="切换排序">${dir < 0 ? '↓' : '↑'}</button></span>
        <span class="prj-th-acts"></span>
      </div>
      ${list.length ? pageItems.map((p) => `
        <div class="prj-row" data-project="${p.id}">
          <span class="prj-ico">${icon('folder')}</span>
          <span class="prj-name">${esc(p.name)}</span>
          <span class="spacer"></span>
          <span class="prj-time mono">${relTime(p.updated)}</span>
          <span class="prj-acts">
            <button class="icon-btn" data-pmore="${p.id}" title="更多">${icon('dots')}</button>
            <button class="icon-btn${p.pinned ? ' on' : ''}" data-ppin="${p.id}" title="${p.pinned ? '取消置顶' : '置顶'}">${icon('pin')}</button>
            <button class="icon-btn" data-popen="${p.id}" title="打开项目">${icon('arrow')}</button>
          </span>
        </div>`).join('') : '<div class="prj-empty">没有匹配的项目。个人项目仅自己可见，点右上角「创建」新建。</div>'}
    </div>
    <div class="ac-pager prj-pager">
      ${pages > 1 ? `<button class="ac-pg" data-ppage="${page - 1}" ${page <= 1 ? 'disabled' : ''}>上一页</button>
      ${pageSeq(page, pages).map((p) => p === '…' ? '<span class="ac-pager-dots">…</span>' : `<button class="ac-pg num ${p === page ? 'on' : ''}" data-ppage="${p}">${p}</button>`).join('')}
      <button class="ac-pg" data-ppage="${page + 1}" ${page >= pages ? 'disabled' : ''}>下一页</button>` : ''}
      <span class="ac-pager-info">每页最多 ${pageSize} 条 · 共 ${list.length} 条</span>
    </div>`
  const input = el.querySelector('#prjSearch')
  if (input) {
    input.addEventListener('input', debounce((e) => {
      state.prjQuery = e.target.value
      state.prjPage = 1
      renderView()
      const next = document.getElementById('prjSearch')
      if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length) }
    }, 260))
  }
  el.querySelector('#prjNew')?.addEventListener('click', openProjectForm)
  el.querySelector('#prjSort')?.addEventListener('click', () => {
    state.prjSort = state.prjSort === 'asc' ? 'desc' : 'asc'
    state.prjPage = 1
    renderView()
  })
  el.querySelectorAll('[data-ppage]').forEach((b) => b.addEventListener('click', () => {
    const p = Number(b.dataset.ppage)
    if (!Number.isFinite(p)) return
    state.prjPage = Math.min(Math.max(p, 1), pages)
    renderView()
  }))
  el.querySelectorAll('[data-popen]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    openProject(b.dataset.popen)
  }))
  el.querySelectorAll('[data-pmore]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    openProject(b.dataset.pmore)
  }))
  el.querySelectorAll('[data-ppin]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    const p = state.projects.find((x) => x.id === b.dataset.ppin)
    if (!p) return
    p.pinned = !p.pinned
    const set = new Set(state.pinnedProjects || [])
    if (p.pinned) set.add(p.id); else set.delete(p.id)
    state.pinnedProjects = [...set]
    renderView()
    toast(p.pinned ? `已置顶「${p.name}」` : `已取消置顶「${p.name}」`)
  }))
  el.querySelectorAll('.prj-row').forEach((row) => row.addEventListener('click', () => openProject(row.dataset.project)))
}

function openProject(id) {
  const p = (state.projects || []).find((x) => x.id === id) || state.boot?.projects?.find?.((x) => x.id === id)
  if (!p) return
  const slide = ensureSlide()
  slide.innerHTML = `
    <div class="slide-head"><div><div class="slide-title">${esc(p.name)}</div><div class="slide-sub">${esc(p.id)} · ${esc(p.dept)} · 更新 ${esc(p.updated)}</div></div><span class="spacer"></span><button class="btn subtle" data-close>${icon('close')}</button></div>
    <div class="slide-body">
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
        ${(p.nets || []).map((n) => `<span class="tag">${esc(NET_NAME[n] || n)}</span>`).join('')}
        <span class="tag">${esc(p.scope.replace(/^dept:/, '').replace(/^unit:/, '').replace('all-org', '集团全员'))}</span>
      </div>
      <div class="field"><div class="field-label">项目说明</div><div class="field-value">${esc(p.desc)}</div></div>
      <div class="kv-row">
        ${p.personal
          ? `<div class="kv-box"><span>类型</span><b>个人项目</b></div>
        <div class="kv-box"><span>会话</span><b>${p.convs}</b></div>
        <div class="kv-box"><span>资料</span><b>${p.files} 份</b></div>`
          : `<div class="kv-box"><span>负责人</span><b>${esc(p.owner)}</b></div>
        <div class="kv-box"><span>参与人</span><b>${p.members} 人</b></div>
        <div class="kv-box"><span>会话</span><b>${p.convs}</b></div>
        <div class="kv-box"><span>资料</span><b>${p.files} 份</b></div>`}
      </div>
      <div class="field"><div class="field-label">项目上下文</div><div class="field-value">进入项目对话时，自动装配该项目的成果目录、评审意见与智能笔记本中的引用资料；越出项目授权的数据仍需单独申请。</div></div>
      <div class="field"><div class="field-label">可见范围</div><div class="field-value">${esc(p.scope)}；项目成员由负责人维护，调岗离职随人员变动工单同步。</div></div>
    </div>
    <div class="slide-foot"><button class="btn primary" data-ask>在项目中提问</button><button class="btn" data-close>关闭</button></div>`
  wireSlide(slide)
  slide.querySelector('[data-ask]')?.addEventListener('click', () => {
    slide.classList.remove('open')
    state.conversation = null
    state.view = 'chat'
    state.draft = `围绕「${p.name}」项目，汇总当前成果与待办`
    render()
  })
}

function openProjectForm() {
  const mask = openModal('新建项目', `
    <div class="field"><div class="field-label">项目名称</div><input class="text-input" id="prjName" placeholder="例如：八里湖片区控规调整" /></div>
    <div class="field"><div class="field-label">项目说明</div><input class="text-input" id="prjDesc" placeholder="一句话说明项目目标与范围" /></div>
    <div class="notice" style="margin-top:8px">新建的是个人项目：仅自己可见，资料与会话默认私有；需要协作时再邀请参与人或转为团队项目。</div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">
      <button class="btn" data-cancel>取消</button><button class="btn primary" data-ok>创建</button>
    </div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelector('[data-ok]').addEventListener('click', async () => {
    const name = mask.querySelector('#prjName').value.trim()
    if (!name) return toast('请填写项目名称', true)
    const { ok, body } = await api('/api/projects/create', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, desc: mask.querySelector('#prjDesc').value.trim() }),
    })
    if (!ok) return toast(body.error || '创建失败', true)
    mask.remove()
    toast(`已创建项目「${name}」`)
    state.view = 'projects'
    render()
  })
}

function openToolsMenu(anchor) {
  document.querySelectorAll('.popover').forEach((p) => p.remove())
  const pop = document.createElement('div')
  pop.className = 'popover'
  const { tools, network } = state.boot
  pop.innerHTML = tools.map((t) => {
    const disabled = !t.enabled
    const on = state.composerTools.includes(t.id)
    return `<button data-tool="${t.id}" ${disabled ? 'disabled' : ''} style="display:flex;align-items:center;gap:8px;width:100%;border:0;background:transparent;padding:6px 8px;border-radius:6px;font-size:var(--fs-sub);text-align:left;${disabled ? 'opacity:.45' : ''}">
      <span style="width:14px;color:${on ? 'var(--accent)' : 'var(--muted)'}">${on ? '✓' : ''}</span>${esc(t.label)}
    </button>`
  }).join('') + `<div style="padding:6px 8px;font-size:var(--fs-micro);color:var(--muted);border-top:1px solid var(--line);margin-top:4px">按当前网络与授权过滤；${esc(network?.label || '')}下不可用的工具不参与调用</div>`

  Object.assign(pop.style, {
    position: 'absolute', zIndex: 50, background: '#fff', border: '1px solid var(--line)',
    borderRadius: '8px', boxShadow: '0 10px 30px rgba(23,25,28,.12)', padding: '4px', minWidth: '210px',
  })
  document.body.appendChild(pop)
  const rect = anchor.getBoundingClientRect()
  pop.style.left = `${rect.left}px`
  pop.style.top = `${rect.bottom + 6}px`

  pop.querySelectorAll('[data-tool]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tool
      state.composerTools = state.composerTools.includes(id)
        ? state.composerTools.filter((t) => t !== id)
        : [...state.composerTools, id]
      pop.remove()
      renderView()
    })
  })
  setTimeout(() => document.addEventListener('click', function close(ev) {
    if (!pop.contains(ev.target) && ev.target.isConnected) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

async function submitTask() {
  const text = state.draft.trim()
  if (!text) return toast('请输入任务描述', true)
  state.draft = ''
  state.conversation = null
  state.chatSteps = []
  state.chatError = ''
  state.pendingConfirm = null
  state.view = 'chat'
  state.chatBusy = true
  render()
  await sendMessage(text)
}

async function sendMessage(text) {
  state.chatBusy = true
  state.chatError = ''
  state.pendingConfirm = null
  state.composerRefs = []
  const conv = state.conversation
  if (conv) conv.messages.push({ role: 'user', text, time: '刚刚' })
  renderView()

  const res = await api('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      text,
      conversationId: state.conversation?.id,
      model: state.composerModel,
      tools: state.composerTools,
      ownApiKey: localStorage.getItem('jg.ownKey') || '',
      refs: (state.composerRefs || []).map((r) => ({ kind: r.kind, id: r.id })),
    }),
  })

  if (!res.ok) {
    state.chatBusy = false
    state.chatError = res.body.error || '模型或工具调用失败'
    renderView()
    return
  }

  state.conversation = res.body.conversation
  const draftMsg = {
    role: 'assistant',
    text: '',
    time: '刚刚',
    steps: [],
    citations: res.body.citations || [],
    streaming: true,
  }
  draftMsg.pendingSteps = res.body.steps || []
  draftMsg.pendingText = res.body.reply || ''
  if (res.body.requiresConfirm) {
    state.pendingConfirm = {
      text: res.body.confirmText,
      draft: res.body.draft,
      steps: res.body.steps || [],
    }
  } else {
    state.conversation.messages.push(draftMsg)
    await animateMessage(draftMsg)
  }
  state.chatBusy = false
  renderView()
}

/** 逐步点亮工具步骤，再逐字吐字，模拟流式；不依赖真实 SSE */
async function animateMessage(msg) {
  const steps = msg.pendingSteps || []
  state.chatSteps = []
  for (let i = 0; i < steps.length; i += 1) {
    state.chatSteps = [...state.chatSteps, steps[i]]
    msg.steps = state.chatSteps.slice()
    renderStream()
    await sleep(Math.min(700, Math.max(200, steps[i].ms / 4)))
  }
  msg.steps = steps
  delete msg.pendingSteps
  state.chatSteps = []
  const full = msg.pendingText || ''
  delete msg.pendingText
  for (let i = 4; i <= full.length; i += 8) {
    msg.text = full.slice(0, i)
    renderStream()
    await sleep(24)
  }
  msg.text = full
  msg.streaming = false
  state.chatSteps = []
}

function renderStream() {
  if (state.view === 'chat') renderChatMsgs()
  else renderView()
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* ---------------------------- datacenter ---------------------------- */

function categoryLabel(value) {
  return String(value || '').replace(/（法人单位）/g, '').replace(/（控股子公司）/g, '').trim()
}

function businessCategoryOptions() {
  const fixed = ['规划', '建筑', '市政', '风景园林', '测绘', '企业经营管理', '总工办']
  return [...fixed, '其他'].filter((v, i, arr) => v && arr.indexOf(v) === i)
}

function overviewHtml(ov) {
  if (!ov) return ''
  const nf = (n) => Number(n || 0).toLocaleString('zh-CN')
  const downloads = ov.quarterDownloads || []
  const calls = ov.quarterCalls || []
  const departments = ov.diligentDepartments || []
  const now = new Date()
  const qLabel = `${now.getFullYear()} Q${Math.floor(now.getMonth() / 3) + 1}`
  const resRow = (x, i, metric, unit) => `<button class="hot-row" data-hot-id="${esc(x.id)}"><span class="hot-rank">${i + 1}</span><span class="hot-main"><span class="hot-name">${esc(x.name)}</span><span class="hot-meta">${esc(categoryLabel(x.category))} · ${esc(x.owner || '—')}</span></span><span class="hot-num">${nf(x[metric])}<em>${unit}</em></span></button>`
  return `<div class="dc-overview">
    <div class="ov-head"><div class="ov-title">数据概览</div></div>
    <div class="ov-stats">
      <div class="ov-stat"><span class="ov-num">${nf(ov.total)}</span><span class="ov-label">数据总量</span></div>
      <div class="ov-stat"><span class="ov-num">${esc(ov.totalSizeLabel || '0 B')}</span><span class="ov-label">存储总量</span></div>
      <div class="ov-stat"><span class="ov-num">${nf(ov.newCount)}</span><span class="ov-label">近 30 天更新</span></div>
    </div>
    <div class="ov-grid">
      <div class="ov-block">
        <div class="ov-block-head">季度热门下载数据 <span class="ov-block-note">${esc(qLabel)} · TOP 5</span></div>
        <div class="hot-list">
          ${downloads.map((x, i) => resRow(x, i, 'downloads', ' 次')).join('') || '<div class="ov-empty">暂无下载数据</div>'}
        </div>
      </div>
      <div class="ov-block">
        <div class="ov-block-head">季度热门调用数据 <span class="ov-block-note">${esc(qLabel)} · TOP 5</span></div>
        <div class="hot-list">
          ${calls.map((x, i) => resRow(x, i, 'calls', ' 次')).join('') || '<div class="ov-empty">暂无调用数据</div>'}
        </div>
      </div>
      <div class="ov-block">
        <div class="ov-block-head">更新勤勉部门 <span class="ov-block-note">2026 · TOP 5</span></div>
        <div class="hot-list">
          ${departments.map((d, i) => `<div class="hot-row"><span class="hot-rank">${i + 1}</span><span class="hot-main"><span class="hot-name">${esc(d.name)}</span><span class="hot-meta">最近更新 ${esc((d.last || '—').slice(0, 10))}</span></span><span class="hot-num">${nf(d.count)}<em> 次</em></span></div>`).join('') || '<div class="ov-empty">暂无部门更新数据</div>'}
        </div>
      </div>
    </div>
  </div>`
}

async function renderDatacenter(el) {
  const categories = businessCategoryOptions()
  const canRegister = state.boot?.user?.id !== 'guest'
  const { body: overview } = await api('/api/datacenter/overview')
  state.overview = overview || null
  const newByCategory = new Map((overview?.categories || []).map((c) => [categoryLabel(c.name), c.newCount]))
  el.innerHTML = `<div class="view-head dc-view-head">
      <div><div class="view-title">数据中心</div></div>
      <div class="search dc-head-search"><span class="ico">${icon('search')}</span><input id="dcSearch" placeholder="搜索名称、来源、全文摘要…" value="${esc(state.resourceQuery)}" /></div>
      <div class="spacer"></div>
      ${canRegister ? `<button class="btn primary" id="registerBtn">${icon('plus')}登记资源</button>` : ''}
    </div>
    ${overviewHtml(overview)}
    <div class="dc-main">
      <div class="toolbar">
        <div class="chips" id="categoryChips">
          <button class="chip${state.resourceCategory === 'all' ? ' active' : ''}" data-category="all">全部${overview?.newCount ? `<span class="chip-badge">${overview.newCount}</span>` : ''}</button>
          ${categories.map((c) => `<button class="chip${state.resourceCategory === c ? ' active' : ''}" data-category="${esc(c)}">${esc(c)}${newByCategory.get(c) ? `<span class="chip-badge">${newByCategory.get(c)}</span>` : ''}</button>`).join('')}
        </div>
      </div>
      <div class="table-card">
        <div class="table-head dc-res-head" id="dcHead"><span></span><span>资源名称</span><span>来源系统</span><span>上传时间</span><span>授权状态</span><span>密级</span></div>
        <div id="dcRows"></div>
      </div>
      <div class="dc-pager" id="dcPager"></div>
    </div>`

  const search = el.querySelector('#dcSearch')
  search.addEventListener('input', debounce(async (e) => {
    state.resourceQuery = e.target.value
    state.resourcePage = 1
    await loadResources()
  }, 260))

  el.querySelectorAll('[data-category]').forEach((btn) => btn.addEventListener('click', async () => {
    state.resourceCategory = btn.dataset.category
    state.resourcePage = 1
    el.querySelectorAll('[data-category]').forEach((b) => b.classList.toggle('active', b === btn))
    await loadResources()
  }))

  el.querySelector('#registerBtn')?.addEventListener('click', openRegisterForm)
  el.querySelectorAll('[data-hot-id]').forEach((btn) => btn.addEventListener('click', () => openResource(btn.dataset.hotId)))

  await loadResources()
}

function debounce(fn, wait) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait) }
}

function pageSeq(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
  const keep = new Set([1, pages, page - 1, page, page + 1])
  const nums = [...keep].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b)
  const out = []
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push('…')
    out.push(n)
  })
  return out
}

async function loadResources() {
  if (state.resourceType === 'service') {
    const head = document.getElementById('dcHead')
    const rows0 = document.getElementById('dcRows')
    const count0 = document.getElementById('dcCount')
    if (!rows0) return
    if (head) head.classList.remove('dc-res-head')
    if (head) head.innerHTML = '<span>数据服务</span><span style="margin-left:auto">接口</span><span style="width:84px">调用量</span><span style="width:74px">状态</span>'
    const { body } = await api('/api/dataservices')
    const items = body.items || []
    const pageSize = 10
    const pages = Math.max(1, Math.ceil(items.length / pageSize))
    const page = Math.min(Math.max(1, state.servicePage || 1), pages)
    state.servicePage = page
    const pageItems = items.slice((page - 1) * pageSize, page * pageSize)
    if (count0) count0.textContent = `${items.length} 个接口 · ${items.filter((d) => d.status && d.status !== 'authorized').length ? '含待审批服务' : '仅已授权服务可见'}`
    rows0.innerHTML = pageItems.map((d) => {
      const st = statusMap[d.status] || statusMap.authorized
      return `<button class="row" data-svc="${esc(d.id || d.path)}">
      <span class="type-ico">${icon('globe')}</span>
      <span class="name"><b>${esc(d.name)}</b><span>${esc(d.method)} · ${esc(d.path)} · ${esc(d.scope)}</span></span>
      <span class="src">${esc(d.scope)}</span>
      <span class="tm">${d.calls} 次</span>
      <span><span class="tag ${st.cls}">${st.label}</span></span>
      <span><span class="tag">${esc(d.latency)}</span></span>
    </button>`
    }).join('') || `<div style="padding:24px;text-align:center;color:var(--muted)">当前没有可用的数据服务</div>`
    rows0.querySelectorAll('[data-svc]').forEach((b) => b.addEventListener('click', () => toast('数据服务调用需在应用侧申请，调用留痕并入本域审计（演示）')))
    const pager0 = document.getElementById('dcPager')
    if (pager0) {
      pager0.innerHTML = pages > 1
        ? `<span class="dc-page-info">每页最多 ${pageSize} 条 · 共 ${items.length} 条</span>
          <button class="btn sm" data-spage="${page - 1}" ${page <= 1 ? 'disabled' : ''}>上一页</button>
          ${pageSeq(page, pages).map((p) => p === '…' ? '<span class="ac-pager-dots">…</span>' : `<button class="btn sm${p === page ? ' active' : ''}" data-spage="${p}">${p}</button>`).join('')}
          <button class="btn sm" data-spage="${page + 1}" ${page >= pages ? 'disabled' : ''}>下一页</button>`
        : `<span class="dc-page-info">每页最多 ${pageSize} 条 · 共 ${items.length} 条</span>`
      pager0.querySelectorAll('[data-spage]').forEach((b) => b.addEventListener('click', () => {
        const p = Number(b.dataset.spage)
        if (!Number.isFinite(p) || p < 1 || p > pages) return
        state.servicePage = p
        loadResources()
      }))
    }
    return
  }
  const head = document.getElementById('dcHead')
  if (head) head.classList.add('dc-res-head')
  if (head) head.innerHTML = '<span></span><span>资源名称</span><span>来源系统</span><span>上传时间</span><span>授权状态</span><span>密级</span>'
  const qs = new URLSearchParams({ category: state.resourceCategory, q: state.resourceQuery })
  const { body } = await api(`/api/resources?${qs}`)
  state.resourceList = body.items || []
  const rows = document.getElementById('dcRows')
  const count = document.getElementById('dcCount')
  const pager = document.getElementById('dcPager')
  if (!rows) return
  const pageSize = state.resourcePageSize || 10
  const pages = Math.max(1, Math.ceil(state.resourceList.length / pageSize))
  state.resourcePage = Math.min(Math.max(1, state.resourcePage || 1), pages)
  const pageItems = state.resourceList.slice((state.resourcePage - 1) * pageSize, state.resourcePage * pageSize)
  if (count) count.textContent = state.resourceList.length
    ? `${body.totalVisible} 项可见 · 第 ${state.resourcePage} / ${pages} 页 · 每页最多 ${pageSize} 条`
    : `${body.totalVisible} 项可见 / 全目录 ${body.totalAll} 项`
  rows.innerHTML = pageItems.map((r) => {
    const t = typeMap[r.type] || typeMap.document
    const s = statusMap[r.status] || statusMap.authorized
    const sec = securityMap[r.security] || securityMap.internal
    const folder = r.regKind === 'deliverable' || r.type === 'deliverable'
    return `<button class="row${folder ? ' folder-row' : ''}" data-id="${r.id}">
      <span class="type-ico">${icon(folder ? 'folder' : t.icon)}</span>
      <span class="name"><b>${r.isNew ? '<span class="new-badge">NEW</span>' : ''}${esc(r.name)}</b><span>${folder ? '成果文件夹 · ' : r.regKind === 'pure' ? '普通数据 · ' : ''}${esc(categoryLabel(r.businessCategory || '其他'))} · ${esc(folder ? (r.formats || []).join(' / ') || '多格式' : t.label)} · ${esc(r.dataOwner || r.owner)}</span></span>
      <span class="src">${esc(r.source)}</span>
      <span class="tm">${esc(r.updated.slice(5, 16))}</span>
      <span><span class="tag ${s.cls}">${s.label}</span></span>
      <span><span class="tag ${sec.cls}">${sec.label}</span></span>
    </button>`
  }).join('') || `<div style="padding:24px;text-align:center;color:var(--muted)">当前筛选下没有可见资源</div>`

  if (pager) {
    pager.innerHTML = pages > 1
      ? `<span class="dc-page-info">每页最多 ${pageSize} 条 · 共 ${state.resourceList.length} 条</span>
        <button class="btn sm" data-page="${state.resourcePage - 1}" ${state.resourcePage === 1 ? 'disabled' : ''}>上一页</button>
        ${pageSeq(state.resourcePage, pages).map((p) => p === '…' ? '<span class="ac-pager-dots">…</span>' : `<button class="btn sm${p === state.resourcePage ? ' active' : ''}" data-page="${p}">${p}</button>`).join('')}
        <button class="btn sm" data-page="${state.resourcePage + 1}" ${state.resourcePage === pages ? 'disabled' : ''}>下一页</button>`
      : `<span class="dc-page-info">每页最多 ${pageSize} 条 · 共 ${state.resourceList.length} 条</span>`
    pager.querySelectorAll('[data-page]').forEach((b) => b.addEventListener('click', async () => {
      const p = Number(b.dataset.page)
      if (!Number.isFinite(p) || p < 1 || p > pages || p === state.resourcePage) return
      state.resourcePage = p
      await loadResources()
    }))
  }

  rows.querySelectorAll('[data-id]').forEach((btn) => btn.addEventListener('click', () => openResource(btn.dataset.id)))
}

async function loadSatellite() {
  const { body } = await api('/api/satellite')
  state.satellite = body
  const side = document.getElementById('dcSide')
  if (!side) return
  const q = body.quarters.find((x) => x.id === body.current) || body.quarters[body.quarters.length - 1]
  side.innerHTML = `
    <div class="side-card">
      <div class="side-card-head">卫星影像专题<span class="spacer"></span><span class="mono" style="color:var(--muted)">${body.mode === 'online' ? '在线引用' : '1,796 GB'}</span></div>
      <div class="side-card-body">
        <div class="imagery ${body.mode === 'online' ? 'online' : ''}">
          <span class="cross">${body.mode === 'online' ? '天地图 · WMTS' : 'CGCS2000 · 0.5 m'}</span>
          ${body.mode === 'online' ? `<div class="imagery-note">在线底图（引用）<br/>不复制存储</div>` : ''}
        </div>
        <div class="quarter-tabs">
          ${body.quarters.map((x) => `<button class="qtab${x.id === body.current ? ' active' : ''}" data-q="${x.id}">${x.label}</button>`).join('')}
        </div>
        <dl class="kv">
          <dt>成像日期</dt><dd>${esc(q.date)}</dd>
          <dt>入库日期</dt><dd>${esc(q.input)}</dd>
          <dt>分辨率</dt><dd>${esc(q.resolution)}</dd>
          <dt>覆盖范围</dt><dd>${esc(q.coverage)}</dd>
          <dt>数据源</dt><dd>${esc(body.source)}</dd>
        </dl>
        <div class="history-row">
          ${body.history.map((y) => `<span class="h-year">${y}</span>`).join('')}
        </div>
        <div class="side-actions">
          <button class="btn sm primary" id="compareBtn">${icon('layers')}卷帘对比 Q2 / Q3</button>
          <button class="btn sm" id="imageryArchive">年度归档</button>
        </div>
        <div style="margin-top:10px;font-size:var(--fs-micro);color:var(--muted);line-height:1.5">${esc(body.note)}</div>
      </div>
    </div>
    <div class="side-card">
      <div class="side-card-head">检索能力</div>
      <div class="side-card-body" style="font-size:var(--fs-meta);color:var(--text-2);line-height:1.7">
        名称与元数据 · 文档全文 · 空间范围 · 业务搜索<br/>
        <span style="color:var(--muted)">空间索引仅对已确认地理参考的资源建立；坐标不完整的 CAD 仅提示，不参与范围检索。</span>
      </div>
    </div>`

  side.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => {
    side.querySelectorAll('[data-q]').forEach((x) => x.classList.toggle('active', x === b))
    const item = body.quarters.find((x) => x.id === b.dataset.q)
    const kv = side.querySelector('.kv')
    if (item && kv) {
      kv.innerHTML = `<dt>成像日期</dt><dd>${esc(item.date)}</dd><dt>入库日期</dt><dd>${esc(item.input)}</dd><dt>分辨率</dt><dd>${esc(item.resolution)}</dd><dt>覆盖范围</dt><dd>${esc(item.coverage)}</dd><dt>数据源</dt><dd>${esc(body.source)}</dd>`
    }
    toast(`已切换至 ${b.textContent}（同视口，可卷帘对比）`)
  }))
  side.querySelector('#compareBtn')?.addEventListener('click', openImageryCompare)
  side.querySelector('#imageryArchive')?.addEventListener('click', () => toast('年度归档：2010 起每年一期，按年浏览；近四季度为常态发布'))
}

async function loadDataServices() {
  const side = document.getElementById('dcSide')
  if (!side) return
  const { ok, body } = await api('/api/dataservices')
  if (!ok) return
  const card = document.createElement('div')
  card.className = 'side-card ds-card'
  card.innerHTML = `<div class="side-card-head">数据服务<span class="spacer"></span><span class="mono" style="color:var(--muted)">${(body.items || []).length} 个接口</span></div>
    <div class="side-card-body">
      ${(body.items || []).map((d) => `<div class="ds-row"><span class="tag mono">${esc(d.method)}</span><div class="ds-main"><b>${esc(d.name)}</b><span class="mono">${esc(d.path)} · ${esc(d.scope)}</span></div><span class="mono ds-meta">${d.calls} 次 · ${esc(d.latency)}</span></div>`).join('')}
      <div style="margin-top:8px;font-size:var(--fs-micro);color:var(--muted);line-height:1.5">其他应用通过稳定 API 查询目录与授权内容，调用留痕并入本域审计。</div>
    </div>`
  side.appendChild(card)
}

function editWorkflowHtml(r, edit, canApprove) {
  if (!edit) return ''
  const st = edit.status === 'approved' ? statusMap.authorized : edit.status === 'rejected' ? statusMap.rejected : statusMap['pending-dept']
  const stateText = (s) => s === 'done' ? '已完成' : s === 'active' ? '进行中' : s === 'rejected' ? '已退回' : '待处理'
  const actions = edit.status === 'pending' && canApprove
    ? edit.stage === 'dept'
      ? `<button class="btn sm primary" data-edit-act="dept-approve">部门负责人同意编辑</button><button class="btn sm" data-edit-act="reject">退回编辑</button>`
      : `<button class="btn sm primary" data-edit-act="ops-approve">运维管理同意编辑</button><button class="btn sm" data-edit-act="reject">退回编辑</button>`
    : ''
  return `<div class="field-group">
    <div class="field-group-title">编辑审批<span class="spacer"></span><span class="tag ${st?.cls || ''}">${edit.status === 'approved' ? '已生效' : edit.status === 'rejected' ? '已退回' : '审批中'}</span></div>
    <div class="reg-steps">${(edit.steps || []).map((s, i) => `<div class="reg-step ${s.state}">
      <span class="reg-step-dot">${s.state === 'done' ? icon('check') : i + 1}</span>
      <span class="reg-step-label">${esc(s.label)}</span>
      <span class="reg-step-meta">${s.by ? `${esc(s.by)} · ${esc(s.at)}` : stateText(s.state)}</span>
    </div>`).join('')}</div>
    <dl class="kv">
      <dt>修改名称</dt><dd>${esc(edit.changes?.name || '—')}</dd>
      <dt>修改分类</dt><dd>${esc(categoryLabel(edit.changes?.businessCategory || '—'))}</dd>
      <dt>修改简介</dt><dd>${esc(edit.changes?.desc || '—')}</dd>
    </dl>
    <div class="form-note">编辑申请由上传人发起；部门负责人与运维管理均同意后，更新才会覆盖当前元数据。</div>
    ${actions ? `<div class="ver-acts">${actions}</div>` : ''}
  </div>`
}

function openEditResource(r) {
  const categories = businessCategoryOptions()
  const current = categoryLabel(r.dataStandard?.businessCategory || r.businessCategory || '其他')
  const body = `<div class="form-grid">
    <label>数据名称<input id="erName" value="${esc(r.name)}"></label>
    <label>业务分类<select id="erCategory">${categories.map((c) => `<option${c === current ? ' selected' : ''}>${esc(c)}</option>`).join('')}</select></label>
    <label style="grid-column:1/-1">数据简介<textarea id="erDesc" rows="4">${esc(r.desc || '')}</textarea></label>
  </div>
  <div class="form-note">提交后由部门负责人与运维管理依次同意；审批完成前，当前资源内容不变。</div>
  <div class="ver-acts" style="margin-top:12px"><button class="btn primary" data-edit-save>提交编辑申请</button><button class="btn" data-edit-cancel>取消</button></div>`
  const mask = openModal('编辑资源元数据', body)
  mask.querySelector('[data-edit-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelector('[data-edit-save]').addEventListener('click', async () => {
    const payload = {
      id: r.id,
      changes: {
        name: mask.querySelector('#erName').value.trim(),
        businessCategory: mask.querySelector('#erCategory').value,
        desc: mask.querySelector('#erDesc').value.trim(),
      },
    }
    if (!payload.changes.name) return toast('数据名称不能为空', true)
    const { ok, body: res } = await api('/api/resources/edit', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload),
    })
    if (!ok) return toast(res.error || '编辑申请提交失败', true)
    mask.remove()
    toast(res.message || '编辑申请已提交')
    await openResource(r.id)
  })
}

function regWorkflowHtml(r) {
  if (!r.workflow || !Array.isArray(r.workflow.steps)) return ''
  const stage = r.workflow.stage
  const st = statusMap[r.status] || statusMap.authorized
  const stateText = (s) => s === 'done' ? '已完成' : s === 'active' ? '进行中' : s === 'rejected' ? '已退回' : '待处理'
  const actions = r.status === 'authorized' || r.status === 'rejected' ? '' : stage === 'dept'
    ? `<button class="btn sm primary" data-reg-act="dept-approve">部门负责人同意登记</button><button class="btn sm" data-reg-act="reject">退回</button>`
    : stage === 'qc'
      ? `<button class="btn sm primary" data-reg-act="qc-pass">质检通过</button><button class="btn sm" data-reg-act="qc-fail">质检不通过</button>`
      : stage === 'data'
        ? `<button class="btn sm primary" data-reg-act="data-approve">数据管理员审批通过</button><button class="btn sm" data-reg-act="reject">退回</button>`
        : ''
  return `<div class="field-group">
    <div class="field-group-title">登记审批<span class="spacer"></span><span class="tag ${st.cls}">${st.label}</span></div>
    <div class="reg-steps">${r.workflow.steps.map((s, i) => `<div class="reg-step ${s.state}">
      <span class="reg-step-dot">${s.state === 'done' ? icon('check') : i + 1}</span>
      <span class="reg-step-label">${esc(s.label)}</span>
      <span class="reg-step-meta">${s.by ? `${esc(s.by)} · ${esc(s.at)}` : stateText(s.state)}</span>
    </div>`).join('')}</div>
    <div class="form-note">${esc(r.workflow.note || '')}</div>
    ${actions ? `<div class="ver-acts">${actions}</div><div class="form-note">演示环境可由当前登录角色代推进；生产环境按部门负责人、质检员、数据管理员分别授权。</div>` : ''}
  </div>`
}

async function openResource(id) {
  const { ok, status, body } = await api(`/api/resource?id=${encodeURIComponent(id)}`)
  const slide = ensureSlide()
  if (!ok) {
    slide.innerHTML = `<div class="slide-head"><div><div class="slide-title">${esc(body.error)}</div></div><span class="spacer"></span><button class="btn subtle" data-close>${icon('close')}</button></div>
      <div class="slide-body">
        <div class="notice danger">${esc(body.detail)}</div>
        <div class="field" style="margin-top:14px"><div class="field-label">请求资源</div><div class="field-value mono">${esc(body.resource?.id || id)}</div></div>
        <div class="field"><div class="field-label">判定位置</div><div class="field-value">数据中心 API（服务端校验）；前端隐藏不作为安全边界</div></div>
        <div class="field"><div class="field-label">审计</div><div class="field-value">已记录 deny(403) 至本网络独立审计日志</div></div>
      </div>
      <div class="slide-foot"><button class="btn" data-close>关闭</button><button class="btn primary" data-audit>查看审计记录</button></div>`
    wireSlide(slide)
    await refreshAuditIfOpen()
    return
  }

  const r = body.item
  const vres = await api(`/api/resource/versions?id=${encodeURIComponent(r.id)}`)
  const versions = vres.body.items || []
  const grants = vres.body.grants || []
  const t = typeMap[r.type] || typeMap.document
  const sec = securityMap[r.security] || securityMap.internal
  const st = statusMap[r.status] || statusMap.authorized

  slide.innerHTML = `
    <div class="slide-head">
      <span class="type-ico">${icon(t.icon)}</span>
      <div><div class="slide-title">${esc(r.name)}</div><div class="slide-sub">${esc(r.id)} · ${esc(t.label)} · ${esc(r.format)}</div></div>
      <span class="spacer"></span>
      <button class="btn subtle" data-close>${icon('close')}</button>
    </div>
    <div class="slide-body">
      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        <span class="tag ${st.cls}">${st.label}</span>
        <span class="tag ${sec.cls}">${sec.label}</span>
        <span class="tag">${esc(r.owner)}</span>
        <span class="tag">${esc((r.nets || []).map((n) => (n === 'inet' ? '互联网' : n === 'gov' ? '政务网' : '涉密内网')).join(' / '))}</span>
      </div>
      <div class="field"><div class="field-label">资源描述</div><div class="field-value" style="color:var(--text-2)">${esc(r.desc)}</div></div>
      ${regWorkflowHtml(r)}
      ${editWorkflowHtml(r, body.editRequest, body.permissions?.editApproval)}
      ${(body.fieldGroups || []).map((g) => `
        <div class="field-group">
          <div class="field-group-title">${esc(g.title)}</div>
          <dl class="kv">${g.rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
        </div>`).join('')}
      ${r.id.startsWith('R-CAD') ? `<div class="notice">该 CAD 仅存在局部工程坐标，未建立转换关系，不参与空间范围检索。</div>` : ''}
      <div class="field-group">
        <div class="field-group-title">下载与授权<span class="spacer"></span><span class="mono" style="color:var(--muted)">按权限审批</span></div>
        <dl class="kv">
          <dt>下载状态</dt><dd>${body.downloadRequest ? (body.downloadRequest.status === 'approved' ? '已签发（15 分钟有效）' : '审批中') : '未申请'}</dd>
          <dt>审批角色</dt><dd>${esc(body.downloadRequest?.approval || '数据管理员 / 授权管理员')}</dd>
          <dt>申请记录</dt><dd>${body.downloadRequest ? `${esc(body.downloadRequest.id)} · ${esc(body.downloadRequest.at)}` : '—'}</dd>
        </dl>
        <div class="form-note">下载按资源密级、网络环境与授权组织审批；审批通过后签发短期受控链接，不落地长期副本。</div>
      </div>
      <div class="field-group">
        <div class="field-group-title">版本与生命周期<span class="spacer"></span><span class="mono" style="color:var(--muted)">${versions[0]?.state === '已归档' ? '已归档' : '当前 ' + esc(versions[0]?.v || 'V1.0')}</span></div>
        <div class="ver-list">${versions.map((v) => `<div class="ver-row"><span class="mono ver-v">${esc(v.v)}</span><span class="ver-note">${esc(v.note)}<span class="mono">${esc(v.by)} · ${esc(v.date)}</span></span><span class="tag ${v.state === '当前' ? 'ok' : ''}">${esc(v.state)}</span></div>`).join('')}</div>
        <div class="ver-acts"><button class="btn sm primary" data-ver="publish">${icon('plus')}上传新版本</button><button class="btn sm" data-ver="archive">归档</button><button class="btn sm" data-ver="restore">恢复</button></div>
      </div>
      <div class="field-group">
        <div class="field-group-title">资源授权<span class="spacer"></span><span class="mono" style="color:var(--muted)">变更写审计</span></div>
        <div class="grant-list">${grants.map((g) => `<div class="grant-row"><span class="tag">${esc(g.type)}</span><span class="grant-target">${esc(g.target)}</span><span class="mono grant-rights">${esc(g.rights.join(' / '))}</span><span class="mono" style="color:var(--muted);font-size:var(--fs-micro)">${esc(g.by)} · ${esc(g.at)}</span></div>`).join('') || '<span class="mono" style="color:var(--muted)">暂无授权记录</span>'}</div>
        <div class="ver-acts"><button class="btn sm" data-grant="1">${icon('shield')}调整授权</button></div>
      </div>
      <div class="notice neutral">解析产物与派生结果均登记派生关系，不覆盖原始文件；授权判定在服务端完成。</div>
    </div>
    <div class="slide-foot">
      <button class="btn primary" data-cite>在对话中引用</button>
      <button class="btn fav-btn ${isFav(r.id) ? 'on' : ''}" data-fav-res="${esc(r.id)}">${icon('star')}<span>${isFav(r.id) ? '已收藏' : '收藏'}</span></button>
      <button class="btn" data-download>下载</button>
      ${body.permissions?.canEdit ? `<button class="btn" data-edit-resource>编辑元数据</button>` : ''}
      <button class="btn" data-preview>${r.type === 'cad' ? 'WebCAD 预览' : '专业预览'}</button>
      <button class="btn" data-process="parse">解析重建索引</button>
      <button class="btn" data-process="preview">生成预览</button>
    </div>`

  wireSlide(slide)
  slide.querySelector('[data-fav-res]')?.addEventListener('click', async () => {
    const saved = toggleFav({ ref: r.id, kind: 'data', title: r.name, meta: `数据中心 · ${categoryLabel(r.businessCategory || '其他')} · ${r.dataOwner || r.owner}`, icon: t.icon })
    toast(saved ? '已收藏，可在个人中心查看' : '已取消收藏')
    await openResource(r.id)
  })
  slide.querySelectorAll('[data-reg-act]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/resources/approval', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: r.id, action: b.dataset.regAct }),
    })
    if (!ok) return toast(res.error || '操作失败', true)
    toast(res.message || '审批状态已更新')
    await openResource(r.id)
  }))
  slide.querySelectorAll('[data-ver]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/resource/version', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: r.id, action: b.dataset.ver, note: b.dataset.ver === 'publish' ? `${r.name} 新版本（演示上传）` : '' }),
    })
    if (!ok) return toast(res.error || '操作失败', true)
    toast(res.message)
    await openResource(r.id)
  }))
  slide.querySelector('[data-grant]')?.addEventListener('click', () => openGrantDialog(r, grants))
  slide.querySelector('[data-download]')?.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/resources/download', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: r.id }),
    })
    if (!ok) return toast(res.error || '下载申请提交失败', true)
    toast(res.message || '下载申请已提交')
    await openResource(r.id)
  })
  slide.querySelector('[data-edit-resource]')?.addEventListener('click', () => openEditResource(r))
  slide.querySelectorAll('[data-edit-act]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/resources/edit-approval', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: r.id, action: b.dataset.editAct }),
    })
    if (!ok) return toast(res.error || '编辑审批失败', true)
    toast(res.message || '编辑审批已更新')
    await openResource(r.id)
  }))
  slide.querySelectorAll('[data-process]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/resources/process', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: r.id, kind: b.dataset.process }),
    })
    if (!ok) return toast(res.error || '处理任务创建失败', true)
    toast(`已创建处理任务 ${res.task.id}，进度见「我的任务」`)
    await loadTasks()
  }))
}

function ensureSlide() {
  let slide = document.getElementById('slide')
  if (!slide) {
    slide = document.createElement('div')
    slide.id = 'slide'
    slide.className = 'slide'
    document.body.appendChild(slide)
  }
  slide.classList.add('open')
  return slide
}

function wireSlide(slide) {
  slide.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => slide.classList.remove('open')))
  if (!window.__slideEscBound) {
    window.__slideEscBound = true
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return
      const open = document.querySelector('.slide.open')
      if (open) open.classList.remove('open')
    })
  }
  slide.querySelector('[data-cite]')?.addEventListener('click', () => {
    state.view = 'home'
    state.draft = '基于引用资源，生成一份分析摘要'
    slide.classList.remove('open')
    render()
    toast('已加入对话上下文：资源只在授权范围内被引用')
  })
  slide.querySelector('[data-preview]')?.addEventListener('click', () => toast('已签发短期受控预览授权（有效期 15 分钟）'))
  slide.querySelector('[data-versions]')?.addEventListener('click', () => toast('版本 V1 → V3.2，保留原始资源与派生结果的来源关系'))
  slide.querySelector('[data-audit]')?.addEventListener('click', async () => {
    slide.classList.remove('open')
    state.auditOpen = true
    await renderAuditDrawer()
  })
}

async function attemptUnauthorized() {
  const { ok, status, body } = await api('/api/attempt', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({}),
  })
  if (ok) return toast(body.message)
  const slide = ensureSlide()
  slide.innerHTML = `
    <div class="slide-head"><div><div class="slide-title">越权访问已被拦截（${status}）</div><div class="slide-sub">服务端判定 · 已进审计</div></div><span class="spacer"></span><button class="btn subtle" data-close>${icon('close')}</button></div>
    <div class="slide-body">
      <div class="notice danger">${esc(body.detail)}</div>
      <div class="field" style="margin-top:14px"><div class="field-label">证据链</div>
        <div class="field-value mono" style="line-height:1.9">
          资源：${esc(body.evidence.resource)}<br/>
          密级：${esc(securityMap[body.evidence.security]?.label || body.evidence.security)}<br/>
          缺失授权：${esc(body.evidence.requiredScope || '—')}<br/>
          请求者：${esc(body.evidence.actor)}
        </div>
      </div>
      <div class="notice neutral">该拦截发生在数据中心 API 侧：即使绕过前端直接请求接口，也无法越权取数（PRD 2.3 / 9.3 要求）。</div>
    </div>
    <div class="slide-foot"><button class="btn" data-close>关闭</button><button class="btn primary" data-audit>查看审计</button></div>`
  wireSlide(slide)
  await loadResources()
  await refreshAuditIfOpen()
}

/* ------------------------------ skills ------------------------------ */

async function renderSkills(el) {
  const [{ body: marketBody }, { body: plugBody }, { body: subBody }] = await Promise.all([api('/api/plugin-market'), api('/api/plugins'), api('/api/plugin-subs')])
  state.market = marketBody.items || []
  state.plugins = plugBody.items || []
  state.skillQuery = ''
  const subs = subBody.items || []
  const tab = state.skillTab || 'plugin'
  const scop = state.skillScope || 'public'

  const installed = tab === 'plugin'
    ? state.market.filter((m) => m.installed)
    : state.plugins.filter((p) => p.kind === 'personal' || p.status === 'enabled')

  const tone = (i) => 't' + (i % 8)

  const marketCard = (m, i) => `
    <div class="pl-item">
      <span class="pl-ico ${tone(i)}">${icon('plugin')}</span>
      <div class="pl-item-main"><div class="pl-item-name">${esc(m.name)}</div><div class="pl-item-desc">${esc(m.desc)}</div></div>
      ${m.installed
        ? `<button class="pl-act" data-mdetail="${m.id}" title="已安装，查看详情">${icon('dots')}</button>`
        : `<button class="pl-act add" data-minstall="${m.id}" title="安装">${icon('plus')}</button>`}
    </div>`

  const skillCard = (p, i) => `
    <div class="pl-item">
      <span class="pl-ico ${tone(i)}">${icon('tool')}</span>
      <div class="pl-item-main"><div class="pl-item-name">${esc(p.name)}</div><div class="pl-item-desc">${esc(p.desc)}</div></div>
      <button class="pl-act" data-plug="${p.id}" title="技能详情">${icon('dots')}</button>
    </div>`

  const sec = (title, cards) => cards ? `
    <section class="pl-sec">
      <h2 class="pl-sec-title">${title}<span class="pl-arrow">›</span></h2>
      <div class="pl-grid">${cards}</div>
    </section>` : ''

  const marketSections = ['热门', '新品推荐', '企业内部'].map((name) => {
    const list = state.market.filter((m) => m.section === name)
    return list.length ? sec(name, list.map(marketCard).join('')) : ''
  }).join('')

  const personalSections = `
    ${sec('我的插件提交', subs.length ? subs.map((x, i) => {
      const st = { pending: ['warn', '待审核'], approved: ['ok', '已上架'], rejected: ['bad', '已退回'] }[x.status] || ['', x.status]
      return `<div class="pl-item">
        <span class="pl-ico ${tone(i)}">${icon('plugin')}</span>
        <div class="pl-item-main"><div class="pl-item-name">${esc(x.name)}</div><div class="pl-item-desc">${esc(x.file)} · v${esc(x.version)} · ${esc(x.scope)}</div></div>
        <span class="tag ${st[0]}">${st[1]}</span>
        <button class="pl-act" data-subreport="${x.id}" title="查看检测报告">${icon('doc')}</button>
      </div>`
    }).join('') : '<div class="sk-empty">还没有提交过插件，点右上「添加」开始</div>')}
    ${sec('已安装', installed.length ? installed.map(marketCard).join('') : '<div class="sk-empty">还没有安装插件</div>')}`

  const skillSections = sec(scop === 'public' ? '企业技能' : '个人技能',
    state.plugins
      .filter((p) => (scop === 'public' ? p.kind === 'enterprise' : p.kind === 'personal'))
      .map(skillCard)
      .join(''))

  const instAttr = (x) => tab === 'plugin' ? `data-mdetail="${x.id}"` : `data-plug="${x.id}"`
  const title = tab === 'plugin' ? '插件' : '技能'
  const sub = tab === 'plugin'
    ? '连接插件，让九规智能中枢在你的各类工具中协同工作'
    : '技能定义模型可以完成的任务流程，可在对话中直接调用'

  el.innerHTML = `
    <div class="sk-wrap pl-wrap${state.sbPinned ? '' : ' sb-off'}">
      <aside class="sk-left pl-left">
        <div class="pl-brand">插件与技能</div>
        <nav class="pl-nav">
          <button class="pl-nav-item${tab === 'plugin' ? ' on' : ''}" data-sktab="plugin"><span class="pl-nav-ico">${icon('plugin')}</span>插件</button>
          <button class="pl-nav-item${tab === 'skill' ? ' on' : ''}" data-sktab="skill"><span class="pl-nav-ico">${icon('grid')}</span>技能</button>
        </nav>
        <div class="pl-label">已安装</div>
        <div class="pl-installed">
          ${installed.map((x, i) => `
            <button class="pl-inst" ${instAttr(x)}>
              <span class="pl-inst-ico ${tone(i)}">${icon(tab === 'plugin' ? 'plugin' : 'tool')}</span><span>${esc(x.name)}</span>
            </button>`).join('') || '<div class="sk-empty">暂无已安装项</div>'}
        </div>
        <div class="pl-foot">插件与技能按授权与网络可用；企业内部插件需经过安全审核后上架。</div>
      </aside>
      <div class="sk-main pl-main">
        <div class="pl-head">
          <div class="pl-head-main">
            <h1 class="pl-title">${title}</h1>
            <div class="pl-sub">${sub}</div>
          </div>
          <div class="pl-acts">
            <button class="pl-ico-btn" id="skRefresh" title="刷新">${icon('refresh')}</button>
            <button class="pl-add" id="skAddLeft">添加</button>
          </div>
        </div>
        <div class="pl-tabs">
          <button class="pl-tab${scop === 'public' ? ' on' : ''}" data-skscope="public">公开</button>
          <button class="pl-tab${scop === 'personal' ? ' on' : ''}" data-skscope="personal">个人</button>
        </div>
        ${tab === 'plugin' && scop === 'public' ? marketSections : ''}
        ${tab === 'plugin' && scop === 'personal' ? personalSections : ''}
        ${tab === 'skill' ? skillSections : ''}
      </div>
    </div>`

  el.querySelectorAll('[data-sktab]').forEach((b) => { b.onclick = () => { state.skillTab = b.dataset.sktab; renderView() } })
  el.querySelectorAll('[data-skscope]').forEach((b) => { b.onclick = () => { state.skillScope = b.dataset.skscope; renderView() } })
  el.querySelector('#skRefresh').addEventListener('click', () => { toast('已刷新插件目录'); renderView() })
  el.querySelector('#skAddLeft').addEventListener('click', () => {
    if (tab === 'skill') return toast('技能由管理员在管理中心登记后上架')
    openPluginPublish()
  })
  el.querySelectorAll('[data-minstall]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body } = await api('/api/plugin-market/install', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: b.dataset.minstall }) })
    if (!ok) return toast(body.error || '安装失败', true)
    toast(`已安装「${body.item.name}」，可在对话中调用`)
    renderView()
  }))
  el.querySelectorAll('[data-mdetail]').forEach((b) => b.addEventListener('click', () => openPluginSlide(b.dataset.mdetail)))
  el.querySelectorAll('[data-subreport]').forEach((b) => b.addEventListener('click', () => {
    const x = subs.find((y) => y.id === b.dataset.subreport)
    if (x) openPluginReport(x)
  }))
  el.querySelectorAll('[data-plug]').forEach((b) => b.addEventListener('click', () => openSkillSlide(b.dataset.plug)))
}

function openPluginSlide(id) {
  const m = (state.market || []).find((x) => x.id === id)
  if (!m) return
  const slide = ensureSlide()
  slide.innerHTML = `
    <div class="slide-head"><div><div class="slide-title">${esc(m.name)}</div><div class="slide-sub">${esc(m.publisher)} · ${esc(m.section)} · ID ${esc(m.id)}</div></div><span class="spacer"></span><button class="btn subtle" data-close>${icon('close')}</button></div>
    <div class="slide-body">
      <div style="display:flex;gap:6px;margin-bottom:12px"><span class="tag ${m.installed ? 'ok' : ''}">${m.installed ? '已安装' : '未安装'}</span><span class="tag">${esc(m.scope)}</span></div>
      <div class="field"><div class="field-label">功能说明</div><div class="field-value">${esc(m.desc)}</div></div>
      <div class="field"><div class="field-label">权限与数据</div><div class="field-value">按当前授权与网络范围返回数据；敏感字段最小必要展示，读取与调用进审计。写操作需人工确认。</div></div>
      <div class="field"><div class="field-label">安装要求</div><div class="field-value">${m.scope === '需授权' ? '需部门负责人授权后安装，授权范围按岗位与项目参与关系核定。' : '企业公开插件，可直接安装；启用后仅在当前网络与已授权范围生效。'}</div></div>
    </div>
    <div class="slide-foot">
      <button class="btn primary" data-toggle>${m.installed ? '卸载' : '安装'}</button>
      <button class="btn" data-log>调用记录</button>
      <button class="btn" data-close>关闭</button>
    </div>`
  wireSlide(slide)
  slide.querySelector('[data-toggle]').addEventListener('click', async () => {
    const { ok, body } = await api('/api/plugin-market/install', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: m.id }) })
    if (!ok) return toast(body.error, true)
    slide.classList.remove('open')
    toast(`已${body.item.installed ? '安装' : '卸载'}「${m.name}」`)
    renderView()
  })
  slide.querySelector('[data-log]').addEventListener('click', () => toast('调用记录按任务、参数与结果留存，可在审计中回查'))
}

function openSkillSlide(id) {
  const p = (state.plugins || []).find((x) => x.id === id)
  if (!p) return
  const slide = ensureSlide()
  slide.innerHTML = `
    <div class="slide-head"><div><div class="slide-title">${esc(p.name)}</div><div class="slide-sub">${esc(p.publisher)} · v${esc(p.version)} · ${p.kind === 'enterprise' ? '企业技能' : '个人技能'}</div></div><span class="spacer"></span><button class="btn subtle" data-close>${icon('close')}</button></div>
    <div class="slide-body">
      <div style="display:flex;gap:6px;margin-bottom:12px"><span class="tag ${p.status === 'enabled' ? 'ok' : ''}">${p.status === 'enabled' ? '已启用' : '未启用'}</span><span class="tag">${esc(p.scope)}</span></div>
      <div class="field"><div class="field-label">能力说明</div><div class="field-value">${esc(p.desc)}</div></div>
      <div class="field"><div class="field-label">依赖</div><div class="field-value">${esc(p.deps)}</div></div>
      <div class="field"><div class="field-label">风险等级</div><div class="field-value">${esc(p.risk)}；写操作与高危调用执行前二次确认。</div></div>
    </div>
    <div class="slide-foot"><button class="btn primary" data-toggle>${p.status === 'enabled' ? '停用' : '启用'}</button><button class="btn" data-log>运行记录</button><button class="btn" data-close>关闭</button></div>`
  wireSlide(slide)
  slide.querySelector('[data-toggle]').addEventListener('click', async () => {
    const { ok, body } = await api('/api/plugins/toggle', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: p.id }) })
    if (!ok) return toast(body.error, true)
    slide.classList.remove('open')
    toast(`已${body.item.status === 'enabled' ? '启用' : '停用'}「${p.name}」`)
    renderView()
  })
  slide.querySelector('[data-log]').addEventListener('click', () => toast('运行记录：按任务、工具、结果保留，失败原因可追溯'))
}

function openPluginPublish() {
  const mask = openModal('上传插件', `
    <div class="form-note">上传符合 DSH Bundle 规范的 ZIP 插件包，包内至少包含 package.json、index.js、cordis.patch.yml，建议附 README.md。平台会先做安全解压、格式与依赖校验、权限核对和沙箱隔离测试，检测通过后进入管理员审核，审核通过才会上架集团插件市场。</div>
    <div class="up-spec"><span>不确定包结构？</span><button class="linkbtn" id="pubSpec">查看《插件开发规范》</button></div>
    <div class="up-zone" id="pubZone">
      <span class="up-ico">${icon('upload')}</span>
      <b>点击选择或拖入 ZIP 插件包</b>
      <span>单个 ZIP 文件（.zip），包含完整插件目录</span>
      <input type="file" id="pubFile" accept=".zip" hidden />
    </div>
    <div class="up-file" id="pubFileLine" hidden><span class="ico">${icon('doc')}</span><b id="pubFileName"></b><span class="mono" id="pubFileSize"></span></div>
    <div class="form-grid">
      <label>插件名称<input class="text-input" id="pubName" placeholder="例如：规划指标计算" /></label>
      <label>版本<input class="text-input" id="pubVer" placeholder="例如：1.2.0" /></label>
    </div>
    <div class="form-grid">
      <label>适用范围<select id="pubScope"><option>全集团</option><option>本部门</option><option>仅本人</option></select></label>
      <label>所需权限<select id="pubPerm"><option>仅读取已授权资源</option><option>读取 + 写入（需二次确认）</option><option>无资源访问</option></select></label>
    </div>
    <div class="form-label">功能说明</div>
    <textarea class="form-area" id="pubDesc" rows="3" placeholder="说明插件做什么、依赖哪些系统、输出什么结果，便于审核"></textarea>
    <div class="form-checks">
      <label class="check"><input type="checkbox" id="pubRule" /> 已按《插件开发规范》生成包结构，并同意平台进行静态扫描与沙箱测试</label>
    </div>
    <div class="form-foot"><span class="mono">上传后自动检测，通常 1 分钟内出报告</span><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="pubSubmit">上传并检测</button></div>`)
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
  mask.querySelector('#pubSpec').addEventListener('click', (ev) => {
    ev.stopPropagation()
    openPluginSpec()
  })
  const zone = mask.querySelector('#pubZone')
  const fileInput = mask.querySelector('#pubFile')
  const pick = { name: '', size: '' }
  zone.addEventListener('click', () => fileInput.click())
  fileInput.addEventListener('change', () => {
    const f = fileInput.files && fileInput.files[0]
    if (!f) return
    pick.name = f.name
    pick.size = f.size > 1048576 ? `${(f.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`
    const line = mask.querySelector('#pubFileLine')
    line.hidden = false
    mask.querySelector('#pubFileName').textContent = pick.name
    mask.querySelector('#pubFileSize').textContent = pick.size
    if (!mask.querySelector('#pubName').value) mask.querySelector('#pubName').value = f.name.replace(/\.zip$/i, '')
  })
  mask.querySelector('#pubSubmit').addEventListener('click', async () => {
    const name = mask.querySelector('#pubName').value.trim()
    const ver = mask.querySelector('#pubVer').value.trim() || '0.1.0'
    if (!pick.name) return toast('请先选择 ZIP 插件包', true)
    if (!name) return toast('请填写插件名称', true)
    if (!mask.querySelector('#pubRule').checked) return toast('请先确认已按《插件开发规范》打包', true)
    const payload = {
      name, version: ver, file: pick.name, size: pick.size,
      scope: mask.querySelector('#pubScope').value,
      desc: mask.querySelector('#pubDesc').value.trim() || '—',
    }
    const { ok, body } = await api('/api/plugin-subs', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
    if (!ok) return toast(body.error || '上传失败', true)
    mask.remove()
    openPluginReport(body.item)
    renderView()
  })
}

function openPluginSpec() {
  const mask = openModal('插件开发规范', `
    <div class="form-note">插件包是符合 DSH Bundle 的文件夹压缩成的 ZIP。员工不必手工编写配置：可用统一的「插件开发模板」或对应 AI Skill，让 AI 按规范生成完整目录和打包脚本，员工只需测试、压缩、上传。</div>
    <pre class="spec-tree">planning-calculator.zip
├─ package.json         插件名称、版本、依赖，以及 DSH Bundle 声明
├─ index.js             插件功能代码
├─ cordis.patch.yml     DSH 插件注册与配置声明
└─ README.md            使用说明（建议，也是审核材料）</pre>
    <div class="spec-list">
      <div class="spec-row"><b>包结构</b><span>根目录即包根，不再套一层文件夹；文件名与 package.json 中的 name 保持一致。</span></div>
      <div class="spec-row"><b>依赖</b><span>优先使用平台内置依赖；确需外部包时须说明来源，审核会核对是否可离线安装。</span></div>
      <div class="spec-row"><b>权限</b><span>只声明实际需要的读、写与业务 API 权限；写操作默认要求二次确认。</span></div>
      <div class="spec-row"><b>安全</b><span>禁止动态执行远程代码、读取凭据、静默外联；平台在隔离沙箱内先扫描后测试。</span></div>
      <div class="spec-row"><b>版本与更新</b><span>每次更新上传新 ZIP，版本号递增，重新检测与审核；旧版本在审核期间保持可用。</span></div>
    </div>
    <div class="form-note">AI 可直接按本规范生成插件：说明插件要做什么、依赖哪些系统，产出符合上述结构的文件夹与 zip 打包脚本。</div>
    <div class="form-foot"><span class="spacer"></span><button class="btn primary" data-mclose>知道了</button></div>`)
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
}

function openPluginReport(sub) {
  const st = { pending: ['warn', '自动检测通过 · 待管理员审核'], approved: ['ok', '已上架'], rejected: ['bad', '已退回'] }[sub.status] || ['', sub.status]
  const tag = (v) => (v === '通过' ? 'ok' : v === '不通过' ? 'bad' : 'warn')
  const mask = openModal('插件检测报告', `
    <div class="rp-head">
      <div class="rp-title"><b>${esc(sub.name)}</b><span class="mono">${esc(sub.file)} · ${esc(sub.size)} · v${esc(sub.version)} · ${esc(sub.scope)}</span></div>
      <span class="tag ${st[0]}">${esc(st[1])}</span>
    </div>
    <div class="rp-list">
      ${(sub.checks || []).map((c) => `<div class="rp-row"><span class="rp-k">${esc(c[0])}</span><span class="rp-v"><span class="tag ${tag(c[1])}">${esc(c[1])}</span>${esc(c[2] || '')}</span></div>`).join('')}
    </div>
    ${sub.reason ? `<div class="form-note bad-note">退回原因：${esc(sub.reason)}</div>` : ''}
    <div class="form-note">${sub.status === 'approved' ? '制品已生成标准 npm tarball 并登记批准版本，员工可在插件市场一键安装。' : '审核通过后平台会生成标准 npm 制品（.tgz）并登记版本；审核在「管理中心 · AI 能力管理 · 插件审核」处理。未通过审核的插件不会进入生产运行环境。'}</div>
    <div class="form-foot"><span class="mono">提交人 ${esc(sub.author)} · ${esc(sub.unit)} · ${esc(sub.submitted)}</span><span class="spacer"></span><button class="btn primary" data-mclose>知道了</button></div>`)
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
}

/* ------------------------------- apps ------------------------------- */

async function renderApps(el) {
  const { body } = await api('/api/apps')
  state.apps = body.items
  const badge = (s) => ({ published: ['ok', '已发布'], review: ['warn', '审核中'], draft: ['', '草稿'] }[s] || ['', s])
  const items = body.items || []
  el.innerHTML = `
  <div class="view-head">
    <div>
      <div class="view-title">应用</div>
      
    </div>
  </div>
  <div class="app-grid">
    ${items.map((a) => {
      const [tone, label] = badge(a.status)
      return `
      <div class="app-card">
        <div class="app-card-top"><span class="type-ico">${icon(a.icon || 'grid')}</span><span class="tag ${tone}">${label}</span></div>
        <div class="app-card-name">${esc(a.name)}</div>
        <div class="app-card-desc">${esc(a.desc || '')}</div>
        <div class="app-card-meta">${esc(a.dept || '')} · v${esc(a.version || '1.0')}<br>${esc(a.maintainer || '')}</div>
      </div>`
    }).join('')}
    ${items.length ? '' : '<div class="empty">还没有登记应用</div>'}
  </div>`
}

const NB_MAX_SOURCES = 20
const nbSize = (n) => {
  const v = Number(n) || 0
  if (v >= 1024 ** 3) return `${(v / 1024 ** 3).toFixed(2).replace(/\.00$/, '')} GB`
  if (v >= 1024 ** 2) return `${(v / 1024 ** 2).toFixed(1)} MB`
  if (v >= 1024) return `${(v / 1024).toFixed(0)} KB`
  return v ? `${v} B` : '0 KB'
}
const NB_STUDIO_PANEL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M15.5 5v14"/></svg>'
const nbStudioLabel = (n) => n.kind === 'docx' ? 'DOCX 文档' : n.kind === 'xlsx' ? 'XLSX 表格' : n.kind === 'pptx' ? 'PPTX 演示' : 'Studio 记忆'
const nbStudioIcon = (n) => n.kind === 'xlsx' ? 'table' : n.kind === 'pptx' ? 'layers' : 'doc'

function notebookStudioMarkup(notes, opts = {}) {
  return `<aside class="nbx-studio ${opts.start ? 'nbs-studio' : ''}">
    <div class="nbx-head"><span>Studio</span><span class="mono">${notes.length}</span><span class="spacer"></span><button class="nbx-studio-panel" id="nbStudioPanel" title="Studio 固定在右侧">${NB_STUDIO_PANEL_ICON}</button></div>
    <div class="nbx-scroll nbs-scroll">
      <div class="nbs-tools">
        <button class="nbs-tool" data-studio="docx"><span class="nbs-tool-ico">${icon('doc')}</span><span>文档</span><em>DOCX</em></button>
        <button class="nbs-tool" data-studio="xlsx"><span class="nbs-tool-ico">${icon('table')}</span><span>表格</span><em>XLSX</em></button>
        <button class="nbs-tool" data-studio="pptx"><span class="nbs-tool-ico">${icon('layers')}</span><span>演示</span><em>PPTX</em></button>
      </div>
      <div class="nbs-list">
        ${notes.length ? notes.map((n) => `
          <button class="nbs-item ${n.id === state.noteId && state.noteOpen ? 'on' : ''}" data-note="${n.id}">
            <span class="nbs-item-ico nbs-${esc(n.kind || 'chat')}">${icon(nbStudioIcon(n))}</span>
            <span class="nbs-item-main">
              <span class="nbs-item-title">${esc(n.title)}</span>
              <span class="nbs-item-meta">${nbStudioLabel(n)} · ${esc(n.updatedAt || '')}</span>
            </span>
          </button>`).join('') : `<div class="nbs-empty">${icon('pen')}<b>Studio 输出将保存在此处</b><span>添加来源后，可以生成 DOCX、XLSX、PPTX；对话中的任意一段也可以保存进来。</span></div>`}
      </div>
    </div>
    <div class="nbx-principle">Studio 仅输出 DOCX / XLSX / PPTX · 对话内容可逐段保存</div>
  </aside>`
}

function notebookNoteModal(note) {
  if (!note) return ''
  return `<div class="jg-modal-mask open" id="nbNoteMask">
    <div class="jg-modal nbx-modal">
      <div class="jg-modal-head"><span>Studio 内容</span><button class="icon-btn" id="nbNoteClose">${icon('close')}</button></div>
      <div class="jg-modal-body">
        <input class="nbx-note-title" id="nbNoteTitle" value="${esc(note.title)}">
        <div class="nbx-note-meta mono">${esc(note.author)} · 更新于 ${esc(note.updatedAt)} · ${nbStudioLabel(note)}</div>
        <textarea class="nbx-note-body" id="nbNoteBody" rows="12">${esc(note.content)}</textarea>
        ${(note.citations || []).length ? `<div class="nb-cites">${note.citations.map((c) => `<button class="nb-cite" data-cite="${c.resourceId}" data-ver="${esc(c.versionId || '')}"><span class="mono">${esc(c.versionId || 'V?')}</span>${esc(c.locator || '')}</button>`).join('')}</div>` : ''}
      </div>
      <div class="jg-modal-foot">
        <button class="btn sm" id="nbDelNote">删除</button>
        <span class="spacer"></span>
        <button class="btn subtle" id="nbNoteClose2">关闭</button>
        <button class="btn primary" id="nbSaveNote">保存</button>
      </div>
    </div>
  </div>`
}

function bindNotebookStudio(el, ctx) {
  const { nb, notes, chat, sources } = ctx
  const note = notes.find((n) => n.id === state.noteId)
  el.querySelector('#nbStudioPanel')?.addEventListener('click', () => toast('Studio 固定在右侧，可拖动分栏调整宽度'))
  el.querySelectorAll('[data-note]').forEach((b) => b.addEventListener('click', () => { state.noteId = b.dataset.note; state.noteOpen = true; renderView() }))
  el.querySelector('#nbNoteClose')?.addEventListener('click', () => { state.noteOpen = false; renderView() })
  el.querySelector('#nbNoteClose2')?.addEventListener('click', () => { state.noteOpen = false; renderView() })
  el.querySelectorAll('[data-studio]').forEach((b) => b.addEventListener('click', async () => {
    const type = b.dataset.studio
    const label = type === 'docx' ? 'DOCX 文档' : type === 'xlsx' ? 'XLSX 表格' : 'PPTX 演示'
    const last = [...chat].reverse().find((m) => m.role === 'ai')
    const basis = last?.text || (sources.length
      ? `本笔记本当前引用 ${sources.length} 项来源：${sources.slice(0, 3).map((s) => s.name).join('、')}。`
      : '本笔记本当前还没有引用来源，先生成结构框架，后续补充依据。')
    const content = `【Studio 自动生成 · ${label}】\n\n${basis}\n\n来源：${sources.length ? sources.map((s) => `《${s.name}》`).join('、') : '暂无'}`
    const { body: r } = await api('/api/notebook/note', { method: 'POST', body: JSON.stringify({ id: state.notebookId, note: { title: `${nb?.title || '笔记本'} · ${label}`, content, kind: type, citations: last?.citations || [] } }) })
    if (!r?.ok) return toast(r?.error || '生成失败')
    state.noteId = r.notes[0].id
    state.noteOpen = false
    toast(`已生成 ${label}，保存在 Studio（演示输出）`)
    renderView()
  }))
  el.querySelector('#nbSaveNote')?.addEventListener('click', async () => {
    if (!note) return
    const { body: r } = await api('/api/notebook/note', { method: 'POST', body: JSON.stringify({ id: state.notebookId, note: { id: note.id, title: el.querySelector('#nbNoteTitle').value, content: el.querySelector('#nbNoteBody').value } }) })
    if (r?.ok) { toast('已保存到 Studio'); renderView() } else toast(r?.error || '保存失败')
  })
  el.querySelector('#nbDelNote')?.addEventListener('click', async () => {
    if (!note) return
    const { body: r } = await api('/api/notebook/note', { method: 'POST', body: JSON.stringify({ id: state.notebookId, removeNote: note.id }) })
    if (r?.ok) { state.noteId = null; state.noteOpen = false; toast('已从 Studio 删除'); renderView() } else toast(r?.error || '删除失败')
  })
}

/* ------------------------------ 笔记本卡片菜单与集合 ------------------------------ */

function closeNotebookMenu() {
  document.querySelectorAll('.nb-more-pop').forEach((p) => p.remove())
  document.querySelectorAll('.kn-dots.open').forEach((d) => d.classList.remove('open'))
}

function notebookDialogFoot(okLabel = '保存', danger = false) {
  return `<div class="nb-dialog-foot"><button class="btn subtle" data-nb-cancel>取消</button><button class="btn ${danger ? 'danger' : 'primary'}" data-nb-ok>${okLabel}</button></div>`
}

function openNotebookRenameDialog(nb) {
  const mask = openModal('重命名笔记本', `<div class="nb-dialog">
    <label class="nb-dialog-label" for="nbRenameInput">笔记本名称</label>
    <input class="nb-dialog-input" id="nbRenameInput" maxlength="80" value="${esc(nb.title)}" autocomplete="off">
    <div class="nb-dialog-note">名称会同步到所有共享列表，最多 80 个字符。</div>
    ${notebookDialogFoot('保存')}
  </div>`)
  const input = mask.querySelector('#nbRenameInput')
  input.focus()
  input.select()
  const save = async () => {
    const title = input.value.trim()
    if (!title) return toast('名称不能为空', true)
    const { body: r } = await api('/api/notebook/manage', { method: 'POST', body: JSON.stringify({ op: 'rename', id: nb.id, title }) })
    if (!r?.ok) return toast(r?.error || '重命名失败', true)
    mask.remove(); toast('已重命名'); renderView()
  }
  mask.querySelector('[data-nb-ok]')?.addEventListener('click', save)
  mask.querySelector('[data-nb-cancel]')?.addEventListener('click', () => mask.remove())
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); save() } })
}

function openNotebookShareDialog(nb) {
  let choice = nb.shared ? 'team' : 'none'
  const mask = openModal('共享设置', `<div class="nb-dialog">
    <div class="nb-dialog-lead">选择《${esc(nb.title)}》的可见范围。</div>
    <div class="nb-share-options">
      <button class="nb-share-opt" data-share-choice="none"><b>仅自己可见</b><span>不进入共享列表，其他人无法查看或推荐。</span></button>
      <button class="nb-share-opt" data-share-choice="team"><b>共享给集团成员</b><span>进入「全部共享笔记本」，成员可查看、添加到集合或推荐。</span></button>
    </div>
    <div class="nb-dialog-note">共享只开放笔记本的阅读与推荐；编辑与删除仍按创建者权限控制。</div>
    ${notebookDialogFoot('保存')}
  </div>`)
  const paint = () => mask.querySelectorAll('.nb-share-opt').forEach((b) => b.classList.toggle('on', b.dataset.shareChoice === choice))
  mask.querySelectorAll('.nb-share-opt').forEach((b) => b.addEventListener('click', () => { choice = b.dataset.shareChoice; paint() }))
  paint()
  mask.querySelector('[data-nb-ok]')?.addEventListener('click', async () => {
    const { body: r } = await api('/api/notebook/manage', { method: 'POST', body: JSON.stringify({ op: 'share', id: nb.id, shared: choice === 'team' }) })
    if (!r?.ok) return toast(r?.error || '共享设置失败', true)
    mask.remove()
    toast(choice === 'team' ? '已共享给集团成员' : '已改为仅自己可见')
    renderView()
  })
  mask.querySelector('[data-nb-cancel]')?.addEventListener('click', () => mask.remove())
}

function openNotebookDeleteDialog(nb) {
  const mask = openModal('删除笔记本', `<div class="nb-dialog">
    <div class="nb-dialog-lead">确定删除《${esc(nb.title)}》？</div>
    <div class="nb-dialog-note danger">笔记本的来源引用、对话与 Studio 内容会一并移除；数据中心原始文件不受影响。删除后不可恢复。</div>
    ${notebookDialogFoot('删除', true)}
  </div>`)
  mask.querySelector('[data-nb-ok]')?.addEventListener('click', async () => {
    const { body: r } = await api('/api/notebook/manage', { method: 'POST', body: JSON.stringify({ op: 'delete', id: nb.id }) })
    if (!r?.ok) return toast(r?.error || '删除失败', true)
    if (state.notebookId === nb.id) { state.notebookId = null; state.nbOpen = false }
    mask.remove(); toast('已删除笔记本'); renderView()
  })
  mask.querySelector('[data-nb-cancel]')?.addEventListener('click', () => mask.remove())
}

function openNotebookCollectionDialog(nb) {
  const names = [...(state.notebookCollections || [])]
  const selected = new Set(nb.collections || [])
  const mask = openModal('添加到集合', `<div class="nb-dialog">
    <div class="nb-dialog-lead">把《${esc(nb.title)}》归入常用集合，便于按专题查找。</div>
    <div class="nb-coll-list" id="nbCollList"></div>
    <div class="nb-coll-new"><input id="nbCollNew" maxlength="24" placeholder="新建集合，例如「城市更新」" autocomplete="off"><button class="btn sm" id="nbCollAdd">${icon('plus')}添加</button></div>
    <div class="nb-dialog-note">一本笔记本可以同时属于多个集合。</div>
    ${notebookDialogFoot('保存')}
  </div>`)
  const listEl = mask.querySelector('#nbCollList')
  const paint = () => {
    listEl.innerHTML = names.length ? names.map((name, i) => `<button class="nb-coll-item ${selected.has(name) ? 'on' : ''}" data-coll-i="${i}"><span class="nb-coll-ico">${icon('folder')}</span><span>${esc(name)}</span><span class="nb-coll-check">${icon('check')}</span></button>`).join('') : '<div class="nb-coll-empty">还没有集合，先新建一个。</div>'
    listEl.querySelectorAll('[data-coll-i]').forEach((b) => b.addEventListener('click', () => {
      const name = names[Number(b.dataset.collI)]
      if (selected.has(name)) selected.delete(name)
      else selected.add(name)
      paint()
    }))
  }
  paint()
  mask.querySelector('#nbCollAdd')?.addEventListener('click', () => {
    const input = mask.querySelector('#nbCollNew')
    const name = input.value.trim()
    if (!name) return input.focus()
    if (!names.includes(name)) names.push(name)
    selected.add(name)
    input.value = ''
    paint()
  })
  mask.querySelector('#nbCollNew')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); mask.querySelector('#nbCollAdd').click() } })
  mask.querySelector('[data-nb-ok]')?.addEventListener('click', async () => {
    const { body: r } = await api('/api/notebook/manage', { method: 'POST', body: JSON.stringify({ op: 'collections', id: nb.id, collections: [...selected] }) })
    if (!r?.ok) return toast(r?.error || '保存失败', true)
    state.notebookCollections = r.all || names
    mask.remove()
    toast(selected.size ? `已加入 ${selected.size} 个集合` : '已移出所有集合')
    renderView()
  })
  mask.querySelector('[data-nb-cancel]')?.addEventListener('click', () => mask.remove())
}

function openNotebookMore(anchor, nb, scope = 'normal') {
  closeNotebookMenu()
  const items = scope === 'shared'
    ? [['collection', 'folder', '添加到集合'], ['vote', 'megaphone', '推荐']]
    : [['rename', 'pen', '重命名'], ['pin', 'pin', nb.pinned ? '取消置顶' : '置顶'], ['share', 'users', nb.shared ? '共享设置' : '共享'], ['delete', 'trash', '删除', 'danger'], ['collection', 'folder', '添加到集合']]
  const pop = document.createElement('div')
  pop.className = 'nb-more-pop'
  pop.innerHTML = items.map(([act, ic, label, tone]) => `<button class="nb-more-item ${tone || ''}" data-nbact="${act}">${icon(ic)}<span>${label}</span>${act === 'pin' && nb.pinned ? icon('check') : ''}</button>`).join('')
  document.body.appendChild(pop)
  anchor.classList.add('open')
  const r = anchor.getBoundingClientRect()
  const w = 184
  pop.style.left = `${Math.max(8, Math.min(innerWidth - w - 8, r.right - w))}px`
  const top = r.bottom + 6
  pop.style.top = `${top + pop.offsetHeight > innerHeight - 8 ? Math.max(8, r.top - pop.offsetHeight - 6) : top}px`
  const close = (e) => {
    if (e?.target && (pop.contains(e.target) || anchor.contains(e.target))) return
    closeNotebookMenu()
    document.removeEventListener('pointerdown', close, true)
    document.removeEventListener('keydown', onKey)
  }
  const onKey = (e) => { if (e.key === 'Escape') close() }
  setTimeout(() => {
    document.addEventListener('pointerdown', close, true)
    document.addEventListener('keydown', onKey)
  }, 0)
  pop.querySelectorAll('[data-nbact]').forEach((b) => b.addEventListener('click', async () => {
    const act = b.dataset.nbact
    close()
    if (act === 'rename') return openNotebookRenameDialog(nb)
    if (act === 'share') return openNotebookShareDialog(nb)
    if (act === 'delete') return openNotebookDeleteDialog(nb)
    if (act === 'collection') return openNotebookCollectionDialog(nb)
    if (act === 'vote') {
      const { body: r } = await api('/api/notebook/vote', { method: 'POST', body: JSON.stringify({ id: nb.id }) })
      if (!r?.ok) return toast(r?.error || '推荐失败', true)
      toast(`已推荐《${r.title || nb.title}》，当前 ${r.votes} 票`)
      renderView()
      return
    }
    if (act === 'pin') {
      const { body: r } = await api('/api/notebook/manage', { method: 'POST', body: JSON.stringify({ op: 'pin', id: nb.id, pinned: !nb.pinned }) })
      if (!r?.ok) return toast(r?.error || '操作失败', true)
      toast(r.pinned ? '已置顶到最近列表顶部' : '已取消置顶')
      renderView()
    }
  }))
}

function openNotebookSharedDialog(items, collections = []) {
  const shared = items.filter((n) => n.shared).slice().sort((a, b) => (b.votes || 0) - (a.votes || 0) || String(b.updated || '').localeCompare(String(a.updated || '')))
  const mask = openModal('全部共享笔记本', `<div class="kn-all">
    <div class="kn-all-head"><span>共 ${shared.length} 本被共享的笔记本</span><em>按推荐票排序</em></div>
    <div class="kn-all-grid">
      ${shared.length ? shared.map((n, i) => `<div class="kn-all-card" data-allopen="${esc(n.id)}" role="button" tabindex="0">
        <span class="kn-all-art">${icon(n.coverIcon || 'doc')}</span>
        <span class="kn-all-main"><b>${esc(n.title)}</b><span>${esc(n.owner)} · ${n.votes || 0} 票 · ${i < 5 ? '精选第 ' + (i + 1) : '共享'}</span>${(n.collections || []).length ? `<em>${(n.collections || []).map((c) => '#' + esc(c)).join(' ')}</em>` : ''}</span>
        <button class="kn-dots kn-all-more" data-allmore="${esc(n.id)}" title="更多">${icon('more')}</button>
      </div>`).join('') : '<div class="kn-empty">还没有共享出来的笔记本。</div>'}
    </div>
    <div class="kn-all-foot">精选按推荐票前五自动入选；共享范围与推荐票实时同步。</div>
  </div>`, { wide: true })
  mask.querySelectorAll('[data-allopen]').forEach((b) => b.addEventListener('click', (e) => {
    if (e.target.closest('[data-allmore]')) return
    const nb = shared.find((x) => x.id === b.dataset.allopen)
    if (!nb) return
    mask.remove()
    state.notebookId = nb.id
    state.noteId = null
    state.noteOpen = false
    state.nbOpen = true
    state.nbStart = !(items.find((x) => x.id === nb.id)?.sourceCount || 0)
    renderView()
  }))
  mask.querySelectorAll('[data-allmore]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    const nb = shared.find((x) => x.id === b.dataset.allmore)
    if (nb) openNotebookMore(b, nb, 'shared')
  }))
}

async function renderNotebook(el) {
  const { body: listBody } = await api('/api/notebooks')
  const list = listBody.items || []
  state.notebooks = list
  if (!state.notebookId || !list.some((n) => n.id === state.notebookId)) state.notebookId = list[0]?.id
  const detail = state.notebookId ? (await api(`/api/notebook?id=${state.notebookId}`)).body : null
  const nb = detail?.notebook
  const notes = detail?.notes || []
  const chat = detail?.chat || []
  if (!state.noteId || !notes.some((n) => n.id === state.noteId)) state.noteId = notes[0]?.id
  const note = notes.find((n) => n.id === state.noteId)
  const sources = nb?.sources || []
  const pending = sources.filter((x) => x.syncStatus === '有更新待同步').length
  const openNote = note && state.noteOpen
  const startMode = !chat.length && !notes.length
  const featured = list.filter((n) => n.featured).sort((a, b) => (a.featuredRank || 99) - (b.featuredRank || 99))
  const recent = list.filter((n) => !n.featured).slice().sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || String(b.updated || '').localeCompare(String(a.updated || '')))
  state.notebookCollections = listBody.collections || state.notebookCollections || []
  const cnDate = (s) => {
    const [y, m, d] = String(s || '').slice(0, 10).split('-')
    return y ? `${y}年${Number(m)}月${Number(d)}日` : ''
  }
  const voteIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 10v9M7 10l3.2-6.2A2 2 0 0 1 14 5.2L13 9h4.4a2 2 0 0 1 2 2.4l-1.1 5.5a3 3 0 0 1-3 2.1H7"/></svg>'

  if (state.nbOpen && (state.nbStart || startMode) && nb) {
    renderNotebookStart(el, nb, sources, detail)
    return
  }

  el.innerHTML = state.nbOpen ? `
    <div class="view-head">
      <div>
        <div class="nbx-back"><button class="nbx-link" id="nbBack">${icon('arrow')}全部笔记本</button></div>
        <div class="view-title">${nb ? esc(nb.title) : '智能笔记本'}</div>
        <div class="view-desc">${esc(nb?.topic || '')}${nb?.desc ? ' · ' + esc(nb.desc) : ''}</div>
      </div>
      <div class="spacer"></div>
      ${pending ? `<button class="btn sm" id="nbSync">${icon('refresh')}同步 ${pending} 项更新</button>` : ''}
    </div>
    <div class="nbx">
      <aside class="nbx-src">
        <div class="nbx-head"><span>笔记来源</span><span class="mono">${sources.length}/20</span><span class="spacer"></span><button class="nbx-link" id="nbAddSource">${icon('plus')}添加</button></div>
        <div class="nbx-scroll">
          ${sources.length ? sources.map((sc) => `
            <div class="nbx-row ${sc.canSee === false ? 'locked' : ''}">
              <button class="nbx-row-main" ${sc.kind ? `data-ext="${esc(sc.resourceId)}"` : `data-src="${esc(sc.resourceId)}"`}>
                <span class="nbx-ico">${icon(nbSourceIcon(sc))}</span>
                <span class="nbx-row-body">
                  <span class="nbx-row-name">${esc(sc.name)}</span>
                  <span class="nbx-row-meta">${sc.kind ? `${esc(sc.format || '外部来源')}${sc.kind === 'file' ? ' · ' + nbSize(sc.sizeBytes) : sc.kind === 'cloud' ? ' · 不占容量' : ''} · ${esc(sc.syncStatus || '')}` : `${esc(sc.latestVersion || sc.format || '')} · ${sc.versionMode === 'follow' ? '跟随最新' : '钉住 ' + esc(sc.resolvedVersionId || '')}${sc.canSee === false ? ' · 无权查看，问答不引用' : ''}`}</span>
                </span>
              </button>
              <button class="nbx-x" data-rm="${sc.resourceId}" title="移出引用">${icon('close')}</button>
            </div>`).join('') : `<div class="nbx-empty">还没有引用资料。<br>从数据中心选择 Resource 加入，只建立引用、不复制文件。</div>`}
        </div>
        <div class="nbx-principle">只引用不复制 · 跟随已发布最新版本 · 笔记独立保存 · 复用数据中心与 Harness 能力</div>
      </aside>
      <div class="nbx-grip" data-grip="1" title="拖动调整来源栏宽度"></div>

      <section class="nbx-chat">
        <div class="nbx-head"><span>对话</span><span class="mono">基于 ${sources.length} 项来源</span></div>
        <div class="nbx-scroll nbx-msgs" id="nbChat">
          ${chat.length ? chat.slice(-12).map((m, mi) => {
            const idx = Math.max(0, chat.length - 12) + mi
            return `
            <div class="nbx-msg ${m.role}">
              <div class="nbx-msg-text">${esc(m.text)}</div>
              ${(m.citations || []).length ? `<div class="nb-cites">${m.citations.map((c) => `<button class="nb-cite" data-cite="${c.resourceId}" data-ver="${esc(c.versionId || '')}"><span class="mono">${esc(c.versionId || 'V?')}</span>${esc(c.locator || '')}</button>`).join('')}</div>` : ''}
              <div class="nbx-msg-foot"><span class="nbx-msg-time mono">${esc(m.at || '')}</span><button class="nbx-msg-save" data-save-msg="${idx}" title="保存这段对话到 Studio">${icon('plus')}Studio</button></div>
            </div>`
          }).join('') : '<div class="nbx-empty">直接提问。回答只使用本笔记本引用的来源，并标出资源与版本。</div>'}
          ${chat.length ? `<button class="nbx-take" id="nbTake">把最后一条回答存到 Studio ${icon('pen')}</button>` : ''}
        </div>
        <div class="nbx-ask">
          <div class="nbx-chips">${['概括这组资料的核心结论', '找出相互矛盾的表述', '列出还需要核实的问题'].map((t) => `<button class="chip" data-qs="${t}">${t}</button>`).join('')}</div>
          <div class="nbx-input">
            <textarea id="nbQ" rows="1" placeholder="向本笔记本的 ${sources.length} 项资料提问"></textarea>
            <button class="nbx-send" id="nbAsk" title="提问（Ctrl/⌘ + Enter）">${icon('up')}</button>
          </div>
        </div>
      </section>
      <div class="nbx-grip" data-grip="2" title="拖动调整笔记栏宽度"></div>

      ${notebookStudioMarkup(notes)}
    </div>
    ${notebookNoteModal(openNote ? note : null)}` : `
    <div class="kn-gal">
      <div class="kn-gal-head">
        <h2 class="kn-gal-title">精选笔记本</h2>
        <span class="kn-gal-note">推荐票前五自动入选</span>
        <button class="kn-link" id="nbSeeAll">查看更多 ${icon('arrow')}</button>
      </div>
      ${featured.length ? `<div class="kn-feat-grid">
        ${featured.map((n) => `
        <div class="kn-feat kn-tone-${Number(n.coverTone) || 0} ${n.coverTone === 2 ? 'is-dark' : ''}" data-nb="${n.id}" role="button" tabindex="0">
          <div class="kn-feat-cover">${icon(n.coverIcon || 'doc')}</div>
          <div class="kn-feat-top">
            <span class="kn-avatar">${esc((n.owner || '友').slice(0, 1))}</span>
            <span class="kn-owner">${esc(n.owner || '共享用户')}</span>
            <button class="kn-dots" data-nbmore="${n.id}" title="更多">${icon('more')}</button>
          </div>
          <div class="kn-feat-main">
            <div class="kn-feat-title">${esc(n.title)}</div>
            <div class="kn-feat-meta">精选第 ${n.featuredRank || 1} · ${cnDate(n.updated)} · ${n.displaySources ?? n.sourceCount} 个来源</div>
          </div>
          <button class="kn-vote" data-nbv="${n.id}" title="推荐这个笔记本">${voteIcon}<span>${n.votes || 0}</span></button>
        </div>`).join('')}
      </div>` : '<div class="kn-empty">还没有满足精选条件的笔记本。共享后按推荐票前五自动入选，票数不足时先出现在「查看更多」里。</div>'}

      <div class="kn-gal-head kn-recent-head">
        <h2 class="kn-gal-title">最近打开过的笔记本</h2>
        <button class="kn-sort" id="nbSort" title="按最近打开排序">${icon('filter')}</button>
        <span class="spacer"></span>
        <button class="kn-new" id="nbNew2">${icon('plus')}新建笔记本</button>
      </div>
      ${recent.length ? `<div class="kn-recent-grid">
        ${recent.map((n) => `
        <div class="kn-recent" data-nb="${n.id}" role="button" tabindex="0">
          <span class="kn-recent-art">${icon('doc')}</span>
          <button class="kn-dots kn-recent-more" data-nbmore="${n.id}" title="更多">${icon('more')}</button>
          <span class="kn-recent-title">${esc(n.title)}</span>
          <span class="kn-recent-meta">${n.pinned ? '已置顶 · ' : ''}${n.shared ? '已共享 · ' : ''}${cnDate(n.updated)} · ${n.sourceCount} 个来源${(n.collections || []).length ? ' · 集合：' + n.collections.map((c) => esc(c)).join('、') : ''}</span>
        </div>`).join('')}
      </div>` : '<div class="kn-empty">还没有打开过笔记本。点右上角新建一本，或打开精选笔记本。</div>'}
    </div>`

  // 进入 / 退出具体笔记本
  el.querySelectorAll('[data-nb]').forEach((b) => b.addEventListener('click', (e) => {
    if (e.target.closest('[data-nbv],[data-nbmore]')) return
    state.notebookId = b.dataset.nb
    state.noteId = null
    state.noteOpen = false
    state.nbOpen = true
    state.nbStart = false
    renderView()
  }))
  el.querySelector('#nbBack')?.addEventListener('click', () => { state.nbOpen = false; state.noteOpen = false; state.nbStart = false; renderView() })

  // 点击资料行暂时只做定位提示（资源详情另有入口）
  el.querySelectorAll('[data-src]').forEach((b) => b.addEventListener('click', () => openResource(b.dataset.src)))
  el.querySelectorAll('[data-ext]').forEach((b) => b.addEventListener('click', () => {
    const sc = sources.find((x) => x.resourceId === b.dataset.ext)
    toast(sc?.url ? `外部来源：${sc.url}` : `外部来源：${sc?.name || ''}`)
  }))


  // 新建笔记本：直接进入 Gemini 风格的空笔记本（默认未命名，后续可添加来源）
  const createNotebook = async () => {
    const { body: r } = await api('/api/notebooks', { method: 'POST', body: JSON.stringify({ title: '未命名的笔记本', topic: (listBody.topics || [])[0] || '未分类', desc: '' }) })
    if (!r?.ok) return toast(r?.error || '创建失败')
    state.notebookId = r.notebook.id
    state.noteId = null
    state.noteOpen = false
    state.nbOpen = true
    state.nbStart = true
    renderView()
  }
  el.querySelector('#nbNew')?.addEventListener('click', createNotebook)
  el.querySelector('#nbNew2')?.addEventListener('click', createNotebook)

  // 精选推荐
  el.querySelectorAll('[data-nbv]').forEach((b) => b.addEventListener('click', async (e) => {
    e.stopPropagation()
    const { body: r } = await api('/api/notebook/vote', { method: 'POST', body: JSON.stringify({ id: b.dataset.nbv }) })
    if (!r?.ok) return toast(r?.error || '推荐失败')
    toast(`已推荐《${r.title || '笔记本'}》，当前 ${r.votes} 票`)
    renderView()
  }))
  el.querySelectorAll('[data-nbmore]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    const nb = list.find((x) => x.id === b.dataset.nbmore)
    if (nb) openNotebookMore(b, nb, nb.featured ? 'shared' : 'normal')
  }))
  el.querySelector('#nbSeeAll')?.addEventListener('click', () => openNotebookSharedDialog(list, state.notebookCollections || []))
  el.querySelector('#nbSort')?.addEventListener('click', () => toast('最近列表按「置顶优先、更新时间」排序'))

  // 添加来源：本地上传（默认） / 数据中心 / 云空间
  el.querySelector('#nbAddSource')?.addEventListener('click', () => openNotebookSourcePicker(detail))

  // 同步最新版本
  el.querySelector('#nbSync')?.addEventListener('click', async () => {
    const { body: r } = await api('/api/notebook/sync', { method: 'POST', body: JSON.stringify({ id: state.notebookId }) })
    toast(r?.ok ? `已同步 ${r.changed} 项引用到最新版本` : r?.error || '同步失败')
    renderView()
  })

  // 移出引用
  el.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', async () => {
    const { body: r } = await api('/api/notebook/source', { method: 'POST', body: JSON.stringify({ id: state.notebookId, removeSource: b.dataset.rm }) })
    if (r?.ok) { toast('已移出引用（原始文件不受影响）'); renderView() } else toast(r?.error || '操作失败')
  }))

  // 提问
  const ask = async (q) => {
    if (!q.trim()) return
    const { body: r } = await api('/api/notebook/ask', { method: 'POST', body: JSON.stringify({ id: state.notebookId, q }) })
    if (r?.ok) renderView()
    else toast(r?.error || '提问失败')
  }
  el.querySelector('#nbAsk')?.addEventListener('click', () => ask(el.querySelector('#nbQ').value))
  el.querySelector('#nbQ')?.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.metaKey) ask(e.target.value) })
  el.querySelectorAll('[data-qs]').forEach((b) => b.addEventListener('click', () => ask(b.dataset.qs)))

  // 引用跳转到数据中心资源
  el.querySelectorAll('[data-cite]').forEach((b) => b.addEventListener('click', () => openResource(b.dataset.cite)))

  // Studio：输出、笔记打开/保存/删除
  bindNotebookStudio(el, { nb, notes, chat, sources })
  el.querySelectorAll('[data-save-msg]').forEach((b) => b.addEventListener('click', async () => {
    const m = chat[Number(b.dataset.saveMsg)]
    if (!m) return
    const title = `${m.role === 'ai' ? '回答' : '提问'}：${(m.text || '').replace(/\s+/g, ' ').slice(0, 24)}`
    const { body: r } = await api('/api/notebook/note', { method: 'POST', body: JSON.stringify({ id: state.notebookId, note: { title, content: m.text, kind: 'chat', citations: m.citations || [] } }) })
    if (r?.ok) { state.noteId = r.notes[0].id; toast('这段对话已保存到 Studio'); renderView() } else toast(r?.error || '保存失败')
  }))
  el.querySelector('#nbTake')?.addEventListener('click', async () => {
    const last = [...chat].reverse().find((m) => m.role === 'ai')
    if (!last) return
    const { body: r } = await api('/api/notebook/note', { method: 'POST', body: JSON.stringify({ id: state.notebookId, note: { title: '从对话保存的结论', content: last.text, kind: 'chat', citations: last.citations || [] } }) })
    if (r?.ok) { state.noteId = r.notes[0].id; toast('已保存到 Studio，可继续编辑'); renderView() } else toast(r?.error || '保存失败')
  })

  const grid = el.querySelector('.nbx')
  if (grid) {
    const saved = (() => { try { return JSON.parse(localStorage.getItem('jg.nbCols') || '{}') } catch { return {} } })()
    if (saved.l) grid.style.setProperty('--nb-l', saved.l + 'px')
    if (saved.r) grid.style.setProperty('--nb-r', saved.r + 'px')
    grid.querySelectorAll('[data-grip]').forEach((g) => {
      g.addEventListener('pointerdown', (ev) => {
        ev.preventDefault()
        const left = g.dataset.grip === '1'
        const col = grid.querySelector(left ? '.nbx-src' : '.nbx-studio')
        const startX = ev.clientX
        const startW = col.getBoundingClientRect().width
        document.body.classList.add('resizing')
        const move = (e) => {
          const d = e.clientX - startX
          const w = Math.round(Math.min(420, Math.max(170, left ? startW + d : startW - d)))
          grid.style.setProperty(left ? '--nb-l' : '--nb-r', w + 'px')
        }
        const up = () => {
          document.body.classList.remove('resizing')
          window.removeEventListener('pointermove', move)
          window.removeEventListener('pointerup', up)
          const cur = grid.style.getPropertyValue('--nb-l') || grid.style.getPropertyValue('--nb-r')
          try {
            const o = JSON.parse(localStorage.getItem('jg.nbCols') || '{}')
            if (grid.style.getPropertyValue('--nb-l')) o.l = parseInt(grid.style.getPropertyValue('--nb-l'), 10)
            if (grid.style.getPropertyValue('--nb-r')) o.r = parseInt(grid.style.getPropertyValue('--nb-r'), 10)
            localStorage.setItem('jg.nbCols', JSON.stringify(o))
          } catch { /* ignore */ }
          void cur
        }
        window.addEventListener('pointermove', move)
        window.addEventListener('pointerup', up)
      })
    })
  }

  const chatBox = el.querySelector('#nbChat')
  if (chatBox) chatBox.scrollTop = chatBox.scrollHeight
}

/* ------------------------------ 智能笔记本 · 新空页 ------------------------------ */

const NB_CLOUD_SOURCES = [
  { name: '九江市城市更新专题成果包', path: '云空间 / 规划成果 / 2026', format: '文件夹' },
  { name: '浔阳区三维模型轻量化说明.pdf', path: '云空间 / 项目资料 / 浔阳区', format: 'PDF' },
  { name: '城市体检指标口径汇总.docx', path: '云空间 / 政策汇编 / 城市体检', format: 'DOCX' },
  { name: '1958 工业厂区更新汇报.pptx', path: '云空间 / 会议材料 / 1958', format: 'PPTX' },
]

function nbSourceIcon(sc) {
  if (sc.kind === 'web') return 'globe'
  if (sc.kind === 'cloud') return 'cloud'
  if (sc.kind === 'file') return 'upload'
  if (sc.type === 'gis' || sc.type === 'cad' || sc.type === '3d') return 'map'
  if (sc.type === 'document') return 'doc'
  if (sc.type === 'bizdata') return 'table'
  return 'folder'
}

function renderNotebookStart(el, nb, sources, detail) {
  const notes = detail?.notes || []
  const chat = detail?.chat || []
  const note = notes.find((n) => n.id === state.noteId)
  const openNote = note && state.noteOpen
  const limits = detail?.limits || {}
  const maxSources = limits.maxSources || NB_MAX_SOURCES
  const usedQuota = limits.usedBytes || 0
  const maxQuota = limits.quotaBytes || 15 * 1024 ** 3
  const rows = sources.map((sc) => `
    <div class="nbs-row ${sc.canSee === false ? 'locked' : ''}">
      <button class="nbs-row-main" ${sc.kind ? `data-ext="${esc(sc.resourceId)}"` : `data-src="${esc(sc.resourceId)}"`}>
        <span class="nbs-ico">${icon(nbSourceIcon(sc))}</span>
        <span class="nbs-row-body">
          <span class="nbs-row-name">${esc(sc.name)}</span>
          <span class="nbs-row-meta">${esc(sc.format || (sc.kind === 'web' ? '网页' : sc.kind === 'cloud' ? '云空间' : '本地文件'))}${sc.kind === 'file' ? ' · ' + nbSize(sc.sizeBytes) : sc.kind === 'cloud' ? ' · 不占容量' : ''}${sc.url ? ' · ' + esc(sc.url.replace(/^https?:\/\//, '')) : ''}</span>
        </span>
      </button>
      <button class="nbs-x" data-rm="${esc(sc.resourceId)}" title="移出来源">${icon('close')}</button>
    </div>`).join('')

  el.innerHTML = `
  <div class="nbs">
    <div class="nbs-top">
      <button class="nbs-back" id="nbsBack" title="返回全部笔记本">${icon('arrow')}</button>
      <span class="nbs-mark">${icon('wave')}</span>
      <b class="nbs-title">${esc(nb.title || '未命名的笔记本')}</b>
    </div>
    <aside class="nbs-src">
      <div class="nbs-src-head"><span>来源</span><span class="nbs-count">${sources.length}/${maxSources}</span><button class="nbs-fold" title="收起来源栏">${icon('list')}</button></div>
      <div class="nbs-actions">
        <button class="nbs-pill" id="nbsAdd">${icon('plus')}添加来源</button>
        <button class="nbs-pill" id="nbsNote">${icon('plus')}创建笔记</button>
      </div>
      <div class="nbs-search">
        <input id="nbsQ" placeholder="搜索数据中心、云空间来源" autocomplete="off">
        <div class="nbs-search-foot">
          <button class="nbs-scope" data-scope="data">${icon('database')}数据中心</button>
          <button class="nbs-scope" data-scope="cloud">${icon('cloud')}云空间</button>
          <button class="nbs-go" id="nbsGo" title="搜索来源">${icon('arrow')}</button>
        </div>
      </div>
      <div class="nbs-list">
        ${rows || `<div class="nbs-empty">
          <span class="nbs-empty-ico">${icon('doc')}</span>
          <b>已保存的来源将显示在此处</b>
          <p>上传本地文件，或引用数据中心、云空间的资源，再基于这些来源提问或创作内容。</p>
          <span class="nbs-empty-hint">将文件拖到此处或 <button class="nbs-link" id="nbsEmptyAdd">添加来源</button></span>
        </div>`}
      </div>
      <div class="nbs-principle">来源 ${sources.length}/${maxSources} · 个人容量 ${nbSize(usedQuota)} / ${nbSize(maxQuota)}<br>只建立引用，不复制原文件 · 数据中心与云空间不占容量</div>
    </aside>

    <section class="nbs-canvas">
      <div class="nbs-onboard">
        <div class="nbs-wave">${icon('wave')}</div>
        <h1>${sources.length ? '让我们开始梳理这些来源…' : '让我们开始制作笔记本…'}</h1>
        <p>这是一张专属于您的空白画布，任您尽情探索、挥洒创意，或开启全新篇章。我可以引导您开始，或者您也可以直接添加自己的来源。</p>
        <div class="nbs-prompt">您希望此笔记本帮助您做什么？</div>
        <div class="nbs-choices">
          <button class="nbs-choice" data-nbq="帮我了解这个主题的核心脉络">了解新主题</button>
          <button class="nbs-choice" data-nbq="帮我创建一份结构化内容提纲">创建新内容</button>
          <button class="nbs-choice" data-nbq="帮我梳理下一步要推进的事项">推进项目</button>
        </div>
      </div>
      <div class="nbs-composer">
        <button class="nbs-plus" id="nbsComposerAdd" title="添加来源">${icon('plus')}</button>
        <textarea id="nbsAskQ" rows="1" placeholder="提问或创作内容"></textarea>
        <span class="nbs-src-count">${sources.length}/${maxSources} 个来源</span>
        <button class="nbs-send" id="nbsAsk" title="发送">${icon('up')}</button>
      </div>
    </section>
    ${notebookStudioMarkup(notes, { start: true })}
  </div>
  ${notebookNoteModal(openNote ? note : null)}`

  el.querySelector('#nbsBack')?.addEventListener('click', () => { state.nbOpen = false; state.nbStart = false; renderView() })

  const openPicker = (mode = 'file', q = '') => openNotebookSourcePicker(detail, { mode, query: q })
  const searchFromCard = () => {
    const q = el.querySelector('#nbsQ')?.value.trim() || ''
    openPicker(el.dataset.nbsScope || 'data', q)
  }
  el.querySelector('#nbsAdd')?.addEventListener('click', () => openPicker('file'))
  el.querySelector('#nbsEmptyAdd')?.addEventListener('click', () => openPicker('file'))
  el.querySelector('#nbsComposerAdd')?.addEventListener('click', () => openPicker('file'))
  el.querySelector('#nbsGo')?.addEventListener('click', searchFromCard)
  el.querySelector('#nbsQ')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchFromCard() })
  el.querySelectorAll('.nbs-scope').forEach((b) => b.addEventListener('click', () => {
    el.dataset.nbsScope = b.dataset.scope
    el.querySelectorAll('.nbs-scope').forEach((x) => x.classList.toggle('on', x === b))
    searchFromCard()
  }))

  el.querySelector('#nbsNote')?.addEventListener('click', async () => {
    const { body: r } = await api('/api/notebook/note', { method: 'POST', body: JSON.stringify({ id: state.notebookId, note: { title: '新笔记', content: '' } }) })
    if (!r?.ok) return toast(r?.error || '创建失败')
    state.noteId = r.notes[0]?.id
    state.noteOpen = true
    state.nbStart = false
    renderView()
  })

  const ask = async () => {
    const q = el.querySelector('#nbsAskQ')?.value.trim() || ''
    if (!q) return toast('请输入问题')
    const { body: r } = await api('/api/notebook/ask', { method: 'POST', body: JSON.stringify({ id: state.notebookId, q }) })
    if (!r?.ok) return toast(r?.error || '提问失败')
    state.nbStart = false
    renderView()
  }
  el.querySelector('#nbsAsk')?.addEventListener('click', ask)
  el.querySelector('#nbsAskQ')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask() }
  })
  el.querySelectorAll('[data-nbq]').forEach((b) => b.addEventListener('click', () => {
    const q = el.querySelector('#nbsAskQ')
    q.value = b.dataset.nbq
    q.focus()
  }))

  el.querySelectorAll('[data-src]').forEach((b) => b.addEventListener('click', () => openResource(b.dataset.src)))
  el.querySelectorAll('[data-ext]').forEach((b) => b.addEventListener('click', () => {
    const sc = sources.find((x) => x.resourceId === b.dataset.ext)
    toast(sc?.url ? `外部来源：${sc.url}` : `外部来源：${sc?.name || ''}`)
  }))
  el.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', async () => {
    const { body: r } = await api('/api/notebook/source', { method: 'POST', body: JSON.stringify({ id: state.notebookId, removeSource: b.dataset.rm }) })
    if (r?.ok) { toast('已移除来源'); renderView() } else toast(r?.error || '操作失败')
  }))
  bindNotebookStudio(el, { nb, notes, chat, sources })
}

async function addNotebookGenericSource(source) {
  const { body: r } = await api('/api/notebook/source', { method: 'POST', body: JSON.stringify({ id: state.notebookId, source }) })
  if (!r?.ok) { toast(r?.error || '添加失败'); return false }
  return true
}

function openNotebookSourcePicker(detail, opts = {}) {
  const existing = new Set((detail?.notebook?.sources || []).map((x) => x.resourceId))
  const baseCount = (detail?.notebook?.sources || []).length
  const limits = detail?.limits || {}
  const maxSources = limits.maxSources || NB_MAX_SOURCES
  const quotaMax = limits.quotaBytes || 15 * 1024 ** 3
  const quotaUsed = limits.usedBytes || 0
  const full = baseCount >= maxSources
  const cands = (detail?.candidates || []).filter((r) => !existing.has(r.id))
  let mode = ['file', 'data', 'cloud'].includes(opts.mode) ? opts.mode : 'file'
  const startQuery = opts.query || ''

  const mask = openModal('添加来源', `
    <div class="nbsm" data-mode="${mode}">
      <div class="nbsm-tabs">
        <button class="nbsm-tab" data-nbmode="file">${icon('upload')}本地上传</button>
        <button class="nbsm-tab" data-nbmode="data">${icon('database')}数据中心</button>
        <button class="nbsm-tab" data-nbmode="cloud">${icon('cloud')}云空间</button>
      </div>
      <div class="nbsm-drop nbsm-drop-top ${full ? 'disabled' : ''}" id="nbsmDrop">
        <span class="nbsm-drop-ico">${icon('upload')}</span>
        <b>拖放文件即可上传</b>
        <span>支持 PDF、图片、Word、PPT、Excel、文本等格式</span>
        <input type="file" id="nbsmFile" multiple hidden ${full ? 'disabled' : ''}>
      </div>
      <div class="nbsm-search">
        <span class="nbsm-ico">${icon('search')}</span>
        <input id="nbsmQ" value="${esc(startQuery)}" placeholder="搜索数据中心资源" autocomplete="off">
        <button class="nbsm-go" id="nbsmGo" title="搜索">${icon('arrow')}</button>
      </div>
      <div class="nbsm-body" id="nbsmBody"></div>
      <div class="nbsm-foot">
        <div class="nbsm-cap"><span>来源 ${baseCount} / ${maxSources}</span><span>个人容量 ${nbSize(quotaUsed)} / ${nbSize(quotaMax)}</span></div>
        <div>本地上传占用个人容量；数据中心与云空间来源只建立引用、不占容量。</div>
      </div>
    </div>`, { wide: true })

  const body = mask.querySelector('#nbsmBody')
  const qEl = mask.querySelector('#nbsmQ')
  const finish = () => { mask.remove(); renderView() }

  const paint = () => {
    mask.querySelectorAll('.nbsm-tab').forEach((b) => b.classList.toggle('on', b.dataset.nbmode === mode))
    mask.querySelector('.nbsm').dataset.mode = mode
    qEl.placeholder = mode === 'cloud' ? '搜索云空间文件' : '搜索数据中心资源'
    const q = (qEl.value || '').trim().toLowerCase()

    if (mode === 'file') {
      body.innerHTML = full
        ? `<div class="nbsm-empty">本笔记本已有 ${baseCount}/${maxSources} 个来源，已达上限。请先在来源列表移除不用的来源后再添加。</div>`
        : ''
    } else if (mode === 'data') {
      const items = cands.filter((x) => !q || (x.name + ' ' + (x.owner || '') + ' ' + (x.format || '')).toLowerCase().includes(q))
      body.innerHTML = items.length ? `<div class="nbsm-sect"><span>数据中心资源</span><em>${items.length} 项可引用 · 不占个人容量</em></div>
        ${items.map((x, i) => `<div class="nbsm-row">
          <span class="nbsm-row-ico">${icon('database')}</span>
          <div class="nbsm-row-main"><b>${esc(x.name)}</b><span>${esc(x.format || '')} · ${esc(x.owner || '')} · ${esc(x.version || '')}</span></div>
          <span class="tag">${esc(x.security || '')}</span>
          <button class="btn sm" data-data="${i}" ${full ? 'disabled' : ''}>加入</button>
        </div>`).join('')}` : `<div class="nbsm-empty">没有匹配的数据中心资源。可先在数据中心登记，或调整网络与授权范围。</div>`
      body.querySelectorAll('[data-data]').forEach((b) => b.addEventListener('click', async () => {
        if (full) return toast(`每本笔记本最多 ${maxSources} 个来源`)
        const x = items[Number(b.dataset.data)]
        const { body: r } = await api('/api/notebook/source', { method: 'POST', body: JSON.stringify({ id: state.notebookId, resourceId: x.id, versionMode: 'follow' }) })
        if (r?.ok) { toast('已加入数据中心引用（不占个人容量）'); finish() } else toast(r?.error || '添加失败')
      }))
    } else if (mode === 'cloud') {
      const items = NB_CLOUD_SOURCES.filter((x) => !q || (x.name + ' ' + x.path).toLowerCase().includes(q))
      body.innerHTML = items.length ? `<div class="nbsm-sect"><span>云空间文件</span><em>${items.length} 个 · 不占个人容量</em></div>
        ${items.map((x, i) => `<div class="nbsm-row">
          <span class="nbsm-row-ico">${icon('cloud')}</span>
          <div class="nbsm-row-main"><b>${esc(x.name)}</b><span>${esc(x.path)} · ${esc(x.format)}</span></div>
          <button class="btn sm" data-cloud="${i}" ${full ? 'disabled' : ''}>引用</button>
        </div>`).join('')}` : `<div class="nbsm-empty">云空间中没有匹配的文件。</div>`
      body.querySelectorAll('[data-cloud]').forEach((b) => b.addEventListener('click', async () => {
        if (full) return toast(`每本笔记本最多 ${maxSources} 个来源`)
        const x = items[Number(b.dataset.cloud)]
        if (await addNotebookGenericSource({ kind: 'cloud', name: x.name, url: x.path, format: x.format })) { toast('已引用云空间文件（不占个人容量）'); finish() }
      }))
    }
  }

  const addFiles = async (files) => {
    if (!files.length) return
    if (full) return toast(`每本笔记本最多 ${maxSources} 个来源，请先移除不用的来源`, true)
    const room = maxSources - baseCount
    const picked = files.slice(0, room)
    if (files.length > room) toast(`每本笔记本最多 ${maxSources} 个来源，本次只添加前 ${room} 个`)
    let okCount = 0
    for (const f of picked) {
      const ext = (f.name.split('.').pop() || '').toUpperCase()
      const ok = await addNotebookGenericSource({ kind: 'file', name: f.name, format: ext, sizeBytes: f.size })
      if (ok) okCount += 1
    }
    if (okCount) toast(`已添加 ${okCount} 个本地文件作为来源`)
    finish()
  }
  const fileInput = mask.querySelector('#nbsmFile')
  fileInput?.addEventListener('change', (e) => addFiles(Array.from(e.target.files || [])))
  const drop = mask.querySelector('#nbsmDrop')
  drop?.addEventListener('dragover', (e) => { if (!full) { e.preventDefault(); drop.classList.add('over') } })
  drop?.addEventListener('dragleave', () => drop.classList.remove('over'))
  drop?.addEventListener('drop', (e) => { e.preventDefault(); drop.classList.remove('over'); if (!full) addFiles(Array.from(e.dataTransfer?.files || [])) })
  drop?.addEventListener('click', () => { if (full) return toast(`每本笔记本最多 ${maxSources} 个来源`); fileInput?.click() })

  qEl.addEventListener('input', paint)
  qEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); paint() } })
  mask.querySelector('#nbsmGo')?.addEventListener('click', paint)
  mask.querySelectorAll('[data-nbmode]').forEach((b) => b.addEventListener('click', () => { mode = b.dataset.nbmode; paint() }))
  paint()
}


function imageModel() {
  const ms = state.boot?.models || []
  return ms.find((m) => m.id === state.composerModel) || ms[0] || {}
}

function showImageGate() {
  const m = imageModel()
  const mask = openModal('图像功能暂不可用', `
    <div class="notice">当前绑定的模型 <b>${esc(m.label || '未选择')}</b> 没有声明图像生成能力，图像模块暂时不可用。</div>
    <div class="field" style="margin-top:10px"><div class="field-label">原因</div><div class="field-value">${esc(m.imageNote || '该模型 API 未开通文生图端点')}</div></div>
    <div class="field"><div class="field-label">怎么解决</div><div class="field-value">在「设置 · 模型与密钥」中切换到已开通图像生成的模型 API（当前网络：${esc(state.boot.network?.label || '互联网')}）。</div></div>
    <div class="form-note">模型能力由服务端声明，前端只按声明决定入口是否可用；切换后立即生效，无需重启会话。</div>`, {})
  mask.querySelector('[data-mclose]')?.addEventListener('click', () => {})
  const foot = document.createElement('div')
  foot.style.cssText = 'display:flex;gap:8px;margin-top:14px'
  foot.innerHTML = `<button class="btn primary" data-go>去设置更换模型</button><button class="btn" data-later>稍后再说</button>`
  mask.querySelector('.jg-modal-body').appendChild(foot)
  foot.querySelector('[data-go]').addEventListener('click', () => {
    mask.remove()
    state.view = 'settings'
    state.settingsTab = 'models'
    render()
  })
  foot.querySelector('[data-later]').addEventListener('click', () => mask.remove())
}

const IG_RATIO = { '1:1': [1024, 1024], '4:3': [1024, 768], '16:9': [1024, 576], '9:16': [576, 1024] }

function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i += 1) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}

function wrapText(g, text, x, y, maxW, lh, maxLines) {
  const chars = [...text]
  let line = ''
  let n = 0
  for (let i = 0; i < chars.length; i += 1) {
    const test = line + chars[i]
    if (g.measureText(test).width > maxW && line) {
      g.fillText(line, x, y + n * lh)
      n += 1
      line = chars[i]
      if (n >= maxLines - 1) break
    } else line = test
  }
  if (line) g.fillText(line, x, y + n * lh)
}

/**
 * 原型不调用真实生图接口：按提示词与参数生成一张确定性的示意图，
 * 用于验证入口、能力判定、参数与结果流转；正式版替换为模型 API 返回的图片。
 */
function paintShot(prompt, ratio, style, seed, opts = {}) {
  const [w, h] = IG_RATIO[ratio] || IG_RATIO['1:1']
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')
  const base = hashStr(`${prompt}|${style}|${seed}`)
  const hue = base % 360
  let r = base
  const rnd = () => { r = (r * 1103515245 + 12345) & 0x7fffffff; return r / 0x7fffffff }
  const line = style === '线稿'
  const ink = style === '水墨'
  const groundY = h * (0.62 + rnd() * 0.08)

  // 天空 / 底色
  const sky = g.createLinearGradient(0, 0, 0, groundY)
  sky.addColorStop(0, line ? '#fbfbfa' : `hsl(${hue}, ${ink ? 18 : 38}%, ${ink ? 88 : 76}%)`)
  sky.addColorStop(1, line ? '#f4f4f2' : `hsl(${(hue + 26) % 360}, ${ink ? 22 : 46}%, ${ink ? 78 : 62}%)`)
  g.fillStyle = sky
  g.fillRect(0, 0, w, h)

  // 光源
  if (!line) {
    const gx = w * (0.55 + rnd() * 0.35)
    const gy = groundY * (0.35 + rnd() * 0.3)
    const glow = g.createRadialGradient(gx, gy, 0, gx, gy, w * 0.55)
    glow.addColorStop(0, `hsla(${(hue + 40) % 360}, 70%, 82%, .55)`)
    glow.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = glow
    g.fillRect(0, 0, w, groundY)
  }

  // 远山 / 天际线
  const layers = line ? 2 : 3
  for (let L = 0; L < layers; L += 1) {
    const yBase = groundY - h * (0.03 + L * 0.05)
    g.beginPath()
    g.moveTo(0, yBase)
    const step = w / 14
    for (let i = 0; i <= 14; i += 1) {
      const bH = h * (0.04 + rnd() * 0.16) * (L === 0 ? 1 : 0.75)
      g.lineTo(i * step, yBase - bH)
      g.lineTo((i + 1) * step, yBase - bH)
    }
    g.lineTo(w, yBase); g.lineTo(w, groundY); g.lineTo(0, groundY); g.closePath()
    g.fillStyle = line ? '#fff' : `hsla(${(hue + 200) % 360}, ${ink ? 12 : 20}%, ${ink ? 55 + L * 8 : 36 + L * 9}%, ${0.55 - L * 0.12})`
    g.fill()
    g.strokeStyle = line ? 'rgba(40,44,50,.6)' : `hsla(${(hue + 210) % 360}, 18%, 30%, .35)`
    g.lineWidth = line ? 1.6 : 1
    g.stroke()
  }

  // 地面 / 水面
  const grd = g.createLinearGradient(0, groundY, 0, h)
  grd.addColorStop(0, line ? '#fafaf8' : `hsl(${(hue + 190) % 360}, ${ink ? 10 : 22}%, ${ink ? 74 : 42}%)`)
  grd.addColorStop(1, line ? '#f3f3f0' : `hsl(${(hue + 200) % 360}, ${ink ? 12 : 26}%, ${ink ? 58 : 24}%)`)
  g.fillStyle = grd
  g.fillRect(0, groundY, w, h - groundY)

  // 水面反光 / 铺装纹理
  for (let i = 0; i < 26; i += 1) {
    const yy = groundY + rnd() * (h - groundY)
    g.strokeStyle = line ? 'rgba(60,64,70,.18)' : `hsla(${(hue + 40) % 360}, 60%, 88%, ${0.05 + rnd() * 0.18})`
    g.lineWidth = 1 + rnd() * 2
    g.beginPath()
    g.moveTo(rnd() * w * 0.5, yy)
    g.lineTo(rnd() * w * 0.5 + w * 0.5, yy + rnd() * 4)
    g.stroke()
  }

  // 前景树 / 体块
  for (let i = 0; i < 5; i += 1) {
    const x = rnd() * w
    const y = groundY + (rnd() - 0.5) * h * 0.1
    const rad = w * (0.03 + rnd() * 0.08)
    g.beginPath()
    g.ellipse(x, y, rad, rad * (0.7 + rnd() * 0.5), rnd(), 0, Math.PI * 2)
    g.fillStyle = line ? 'rgba(255,255,255,.9)' : `hsla(${ink ? hue : (hue + 110) % 360}, ${ink ? 14 : 32}%, ${ink ? 46 : 30}%, ${0.18 + rnd() * 0.22})`
    g.fill()
    if (line) { g.strokeStyle = 'rgba(40,44,50,.55)'; g.lineWidth = 1.4; g.stroke() }
  }

  // 颗粒
  if (!line) {
    for (let i = 0; i < 1600; i += 1) {
      g.fillStyle = `rgba(255,255,255,${rnd() * 0.06})`
      g.fillRect(rnd() * w, rnd() * h, 1.2, 1.2)
    }
    const vg = g.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.78)
    vg.addColorStop(0, 'rgba(0,0,0,0)')
    vg.addColorStop(1, 'rgba(10,12,16,.22)')
    g.fillStyle = vg
    g.fillRect(0, 0, w, h)
  }

  if (!opts.plain) {
    g.fillStyle = 'rgba(20,22,26,.62)'
    g.fillRect(0, h - Math.round(h * 0.2), w, Math.round(h * 0.2))
    g.fillStyle = '#fff'
    g.font = `600 ${Math.round(h * 0.026)}px "PingFang SC","Microsoft YaHei",sans-serif`
    wrapText(g, prompt || '未填写提示词', w * 0.05, h - Math.round(h * 0.14), w * 0.9, Math.round(h * 0.038), 2)
    g.fillStyle = 'rgba(255,255,255,.72)'
    g.font = `${Math.round(h * 0.019)}px "PingFang SC","Microsoft YaHei",sans-serif`
    g.fillText(`${style} · ${ratio} · 九规智能中枢 图像（演示画面）`, w * 0.05, h - Math.round(h * 0.03))
  }
  return c.toDataURL('image/png')
}

/**
 * 图像模块热门/模板卡片的示意画面：按设计行业成果类型绘制可辨认的总图、体块、
 * 线稿、航拍与效果图，避免所有卡片都退化成同一种抽象渐变。仅用于原型示例数据。
 */
function igPresetArt(motif, seed = 1) {
  const w = 1024
  const h = 1024
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')
  let s = (hashStr(`${motif}|${seed}`) % 2147483647) || 7
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff }
  const r = (a, b) => a + rnd() * (b - a)
  const poly = (pts, fill, stroke = '') => {
    g.beginPath()
    pts.forEach(([x, y], i) => { if (i) g.lineTo(x, y); else g.moveTo(x, y) })
    g.closePath()
    if (fill) { g.fillStyle = fill; g.fill() }
    if (stroke) { g.strokeStyle = stroke; g.lineWidth = 2; g.stroke() }
  }
  const tree = (x, y, rad, dark = false) => {
    g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2)
    g.fillStyle = dark ? 'rgba(54,78,58,.58)' : 'rgba(66,98,70,.5)'; g.fill()
    g.beginPath(); g.arc(x - rad * .2, y - rad * .2, rad * .55, 0, Math.PI * 2)
    g.fillStyle = dark ? 'rgba(34,56,38,.5)' : 'rgba(94,126,84,.36)'; g.fill()
  }

  if (motif === 'waterfront') {
    const sky = g.createLinearGradient(0, 0, 0, 640)
    sky.addColorStop(0, '#c8dce3'); sky.addColorStop(.56, '#efd7b5'); sky.addColorStop(1, '#f3c690')
    g.fillStyle = sky; g.fillRect(0, 0, w, h)
    const sun = g.createRadialGradient(760, 318, 0, 760, 318, 250)
    sun.addColorStop(0, 'rgba(255,245,214,.92)'); sun.addColorStop(.38, 'rgba(255,224,170,.4)'); sun.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = sun; g.fillRect(300, 0, 724, 640)
    // 远处城市天际线
    for (let i = 0; i < 26; i += 1) {
      const bx = i * 46 - 20
      const bh = r(24, 112)
      g.fillStyle = `rgba(83,105,116,${r(.12, .28)})`
      g.fillRect(bx, 604 - bh, r(24, 44), bh)
    }
    // 江面
    const water = g.createLinearGradient(0, 620, 0, h)
    water.addColorStop(0, '#9bb9c1'); water.addColorStop(.55, '#7fa5b0'); water.addColorStop(1, '#547b88')
    g.fillStyle = water; g.fillRect(0, 620, w, h - 620)
    // 滨江步道
    g.beginPath(); g.moveTo(0, 584); g.bezierCurveTo(280, 548, 560, 610, 1024, 568)
    g.lineTo(1024, 650); g.bezierCurveTo(650, 690, 320, 632, 0, 648); g.closePath()
    g.fillStyle = '#e9dfcd'; g.fill()
    g.beginPath(); g.moveTo(0, 608); g.bezierCurveTo(300, 570, 600, 638, 1024, 594)
    g.strokeStyle = 'rgba(255,255,255,.72)'; g.lineWidth = 7; g.stroke()
    // 旧厂房
    g.fillStyle = '#965f4f'; g.fillRect(48, 430, 300, 168)
    g.fillStyle = '#7e4a40'; g.fillRect(48, 430, 300, 20)
    for (let i = 0; i < 6; i += 1) {
      g.beginPath(); g.moveTo(48 + i * 50, 430); g.lineTo(73 + i * 50, 390); g.lineTo(98 + i * 50, 430)
      g.closePath(); g.fillStyle = '#875044'; g.fill()
    }
    g.fillStyle = '#b6a697'; g.fillRect(330, 320, 24, 280)
    g.fillStyle = 'rgba(245,245,240,.45)'
    for (let i = 0; i < 6; i += 1) g.fillRect(66 + i * 46, 468, 26, 62)
    // 新建文化建筑
    g.fillStyle = '#f1eee7'; g.fillRect(486, 424, 300, 178)
    g.fillStyle = '#d8ddd9'; g.fillRect(508, 454, 256, 118)
    g.fillStyle = 'rgba(78,107,120,.55)'
    for (let i = 0; i < 7; i += 1) g.fillRect(520 + i * 36, 462, 22, 108)
    g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(470, 424); g.lineTo(640, 380); g.lineTo(808, 424); g.closePath(); g.fill()
    // 步道树阵
    for (let i = 0; i < 22; i += 1) tree(r(40, 980), r(562, 624), r(10, 22))
    // 江面倒影
    for (let i = 0; i < 22; i += 1) {
      g.strokeStyle = `rgba(245,226,190,${r(.04, .14)})`; g.lineWidth = r(2, 6)
      g.beginPath(); g.moveTo(r(40, 900), r(660, 1000)); g.lineTo(r(300, 990), r(660, 1000)); g.stroke()
    }
  } else if (motif === 'plan') {
    g.fillStyle = '#f5f1e7'; g.fillRect(0, 0, w, h)
    // 河道
    g.beginPath(); g.moveTo(704, -40); g.bezierCurveTo(620, 250, 720, 520, 540, 1060)
    g.lineWidth = 150; g.strokeStyle = '#b9d2d5'; g.stroke()
    g.lineWidth = 4; g.strokeStyle = 'rgba(111,145,150,.55)'; g.stroke()
    // 路网
    const vx = [112, 318, 540, 760, 950]
    const hy = [128, 344, 566, 786, 968]
    g.lineCap = 'round'
    vx.forEach((x) => { g.strokeStyle = '#fff'; g.lineWidth = 30; g.beginPath(); g.moveTo(x, 0); g.lineTo(x + r(-10, 10), h); g.stroke() })
    hy.forEach((y) => { g.strokeStyle = '#fff'; g.lineWidth = 28; g.beginPath(); g.moveTo(0, y); g.lineTo(w, y + r(-12, 12)); g.stroke() })
    // 地块
    const palette = ['#d8c9a9', '#c7d3b5', '#b7c5cf', '#d7b9a9', '#e7d8b6', '#c9c2ad']
    for (let ix = 0; ix < vx.length - 1; ix += 1) {
      for (let iy = 0; iy < hy.length - 1; iy += 1) {
        const x1 = vx[ix] + 24, x2 = vx[ix + 1] - 24, y1 = hy[iy] + 22, y2 = hy[iy + 1] - 22
        const col = palette[Math.floor(rnd() * palette.length)]
        g.fillStyle = col; g.fillRect(x1, y1, Math.max(10, x2 - x1), Math.max(10, y2 - y1))
        g.strokeStyle = 'rgba(110,105,92,.28)'; g.lineWidth = 2; g.strokeRect(x1, y1, Math.max(10, x2 - x1), Math.max(10, y2 - y1))
        if (rnd() > .35) {
          g.strokeStyle = 'rgba(110,105,92,.26)'
          g.beginPath(); g.moveTo(x1 + (x2 - x1) * .5, y1); g.lineTo(x1 + (x2 - x1) * .5, y2); g.stroke()
        }
        // 建筑肌理与绿地
        for (let k = 0; k < 6; k += 1) {
          const bw = r(18, 48), bh = r(18, 44)
          g.fillStyle = `rgba(245,242,234,${r(.25, .7)})`
          g.fillRect(r(x1 + 8, x2 - bw - 8), r(y1 + 8, y2 - bh - 8), bw, bh)
        }
        if (rnd() > .55) tree(r(x1 + 30, x2 - 30), r(y1 + 30, y2 - 30), r(8, 18), true)
      }
    }
    // 轴线与节点
    g.setLineDash([18, 12]); g.strokeStyle = 'rgba(186,91,67,.62)'; g.lineWidth = 5
    g.beginPath(); g.moveTo(88, 860); g.lineTo(824, 250); g.stroke()
    g.setLineDash([]);
    [ [88, 860], [420, 566], [824, 250] ].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 18, 0, Math.PI * 2); g.strokeStyle = '#ba5b43'; g.lineWidth = 3; g.stroke() })
    // 指北针
    g.fillStyle = '#3b4148'; g.beginPath(); g.moveTo(924, 78); g.lineTo(944, 142); g.lineTo(924, 126); g.lineTo(904, 142); g.closePath(); g.fill()
    g.font = '600 18px "PingFang SC","Microsoft YaHei",sans-serif'; g.fillStyle = '#56606a'; g.fillText('N', 916, 166)
  } else if (motif === 'massing') {
    const bg = g.createLinearGradient(0, 0, 0, h)
    bg.addColorStop(0, '#f7f8f9'); bg.addColorStop(1, '#e3e7eb')
    g.fillStyle = bg; g.fillRect(0, 0, w, h)
    // 底图网格
    g.strokeStyle = 'rgba(112,124,136,.12)'; g.lineWidth = 1
    for (let i = 0; i < 20; i += 1) { g.beginPath(); g.moveTo(0, i * 54); g.lineTo(w, i * 54); g.stroke() }
    // 底板
    poly([[164, 692], [704, 540], [1002, 724], [448, 940]], '#dfe4e7', 'rgba(255,255,255,.8)')
    poly([[202, 705], [700, 562], [950, 720], [470, 904]], '#9fc1c9')
    // 体块
    const blocks = []
    const u = [102, 46], v = [-102, 46]
    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        const x = 352 + i * u[0] + j * v[0] + r(-12, 12)
        const y = 610 + i * u[1] + j * v[1] + r(-10, 10)
        blocks.push({ x, y, hgt: r(32, 176), shade: r(.6, 1) })
      }
    }
    blocks.sort((a, b) => a.y - b.y)
    blocks.forEach((b) => {
      const { x, y, hgt } = b
      // 阴影
      poly([[x, y], [x + 70, y + 34], [x + 18, y + 76], [x - 52, y + 38]], 'rgba(80,96,108,.14)')
      // 右立面
      poly([[x, y - hgt], [x, y + 68 - hgt], [x, y + 68], [x, y]], '', '')
      // 左立面
      poly([[x - 64, y], [x, y + 30], [x, y + 30 - hgt], [x - 64, y - hgt]], `rgba(209,216,221,${b.shade})`)
      // 右立面
      poly([[x, y + 30], [x + 64, y], [x + 64, y - hgt], [x, y + 30 - hgt]], `rgba(237,241,244,${b.shade})`)
      // 顶面
      poly([[x, y - hgt], [x + 64, y - hgt], [x, y + 30 - hgt], [x - 64, y - hgt]], '#ffffff', 'rgba(160,170,178,.24)')
      g.strokeStyle = 'rgba(170,180,188,.2)'; g.lineWidth = 1
      g.beginPath(); g.moveTo(x - 64, y - hgt); g.lineTo(x, y + 30 - hgt); g.stroke()
    })
  } else if (motif === 'renewal') {
    g.fillStyle = '#e9e5dc'; g.fillRect(0, 0, w, h)
    const sky = g.createLinearGradient(0, 0, 0, 620)
    sky.addColorStop(0, '#d9e4e8'); sky.addColorStop(1, '#f2eadc')
    g.fillStyle = sky; g.fillRect(0, 0, w, 620)
    g.fillStyle = '#b7b0a4'; g.fillRect(0, 620, w, h - 620)
    g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(506, 0, 12, 620)
    // 左侧旧厂房
    g.fillStyle = '#a26a59'; g.fillRect(54, 356, 360, 238)
    g.fillStyle = '#8b5447'; g.fillRect(54, 356, 360, 22)
    for (let i = 0; i < 7; i += 1) {
      g.beginPath(); g.moveTo(54 + i * 52, 356); g.lineTo(80 + i * 52, 316); g.lineTo(106 + i * 52, 356); g.closePath(); g.fillStyle = '#995b4d'; g.fill()
    }
    g.fillStyle = 'rgba(234,226,209,.4)'
    for (let i = 0; i < 6; i += 1) g.fillRect(72 + i * 57, 396, 34, 76)
    g.fillStyle = '#715f55'; g.fillRect(378, 250, 30, 344)
    for (let i = 0; i < 7; i += 1) { g.beginPath(); g.arc(r(400, 470), r(230, 300), r(12, 28), 0, Math.PI * 2); g.fillStyle = 'rgba(190,190,185,.25)'; g.fill() }
    // 右侧更新后
    g.fillStyle = '#f1f1ec'; g.fillRect(550, 410, 236, 180)
    g.fillStyle = 'rgba(106,133,144,.55)'; g.fillRect(572, 442, 192, 118)
    g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(534, 410); g.lineTo(650, 366); g.lineTo(804, 410); g.closePath(); g.fill()
    g.fillStyle = '#dedfd9'; g.fillRect(806, 480, 104, 110)
    g.fillStyle = '#f7f5ee'; g.fillRect(842, 430, 96, 50)
    g.fillStyle = '#cbd4cf'
    for (let i = 0; i < 5; i += 1) g.fillRect(564 + i * 38, 452, 24, 106)
    // 前场绿地
    g.fillStyle = '#a9b99e'; g.beginPath(); g.ellipse(722, 628, 246, 58, 0, 0, Math.PI * 2); g.fill()
    for (let i = 0; i < 12; i += 1) tree(r(520, 956), r(590, 660), r(10, 22))
  } else if (motif === 'ink') {
    g.fillStyle = '#f3eee3'; g.fillRect(0, 0, w, h)
    for (let i = 0; i < 900; i += 1) { g.fillStyle = `rgba(90,80,62,${r(.008, .04)})`; g.fillRect(r(0, w), r(0, h), r(.5, 1.8), r(.5, 1.8)) }
    const layers = [
      { y: 742, amp: 180, color: 'rgba(89,99,95,.35)' },
      { y: 790, amp: 148, color: 'rgba(66,77,75,.48)' },
      { y: 848, amp: 112, color: 'rgba(45,55,54,.62)' },
    ]
    layers.forEach((L, li) => {
      g.beginPath(); g.moveTo(-40, h)
      g.lineTo(-40, L.y + r(20, 60))
      for (let x = 0; x <= w + 80; x += 64) g.lineTo(x, L.y - Math.abs(Math.sin((x / 130) + li * 2 + rnd() * .4)) * L.amp * r(.38, 1))
      g.lineTo(w + 40, h); g.closePath(); g.fillStyle = L.color; g.fill()
      g.strokeStyle = 'rgba(35,44,44,.18)'; g.lineWidth = 6; g.stroke()
    })
    // 云雾
    for (let i = 0; i < 4; i += 1) {
      const yy = r(610, 860)
      const mist = g.createLinearGradient(0, yy - 60, 0, yy + 60)
      mist.addColorStop(0, 'rgba(244,239,227,0)'); mist.addColorStop(.5, 'rgba(244,239,227,.7)'); mist.addColorStop(1, 'rgba(244,239,227,0)')
      g.fillStyle = mist; g.fillRect(0, yy - 60, w, 120)
    }
    // 城市天际线
    for (let i = 0; i < 18; i += 1) {
      const bx = 560 + i * 22, bh = r(16, 82)
      g.fillStyle = 'rgba(70,82,82,.2)'; g.fillRect(bx, 716 - bh, r(12, 24), bh)
    }
    // 前景墨树
    g.strokeStyle = 'rgba(32,40,40,.56)'; g.lineWidth = 5
    g.beginPath(); g.moveTo(140, 1010); g.bezierCurveTo(150, 880, 214, 862, 238, 760); g.stroke()
    for (let i = 0; i < 9; i += 1) { g.beginPath(); g.ellipse(r(160, 320), r(760, 880), r(20, 64), r(8, 24), r(-.6, .6), 0, Math.PI * 2); g.fillStyle = `rgba(35,46,46,${r(.12, .3)})`; g.fill() }
    // 印章
    g.fillStyle = 'rgba(168,68,55,.82)'; g.fillRect(884, 86, 54, 54)
    g.strokeStyle = 'rgba(244,239,227,.85)'; g.lineWidth = 3; g.strokeRect(894, 96, 34, 34)
  } else if (motif === 'sketch') {
    g.fillStyle = '#fbfaf3'; g.fillRect(0, 0, w, h)
    g.strokeStyle = 'rgba(90,100,106,.12)'; g.lineWidth = 1
    for (let i = 0; i < 26; i += 1) { g.beginPath(); g.moveTo(i * 42, 0); g.lineTo(i * 42, h); g.stroke(); g.beginPath(); g.moveTo(0, i * 42); g.lineTo(w, i * 42); g.stroke() }
    // 主路与支路
    g.strokeStyle = 'rgba(48,54,60,.8)'; g.lineWidth = 5
    g.beginPath(); g.moveTo(48, 906); g.bezierCurveTo(240, 760, 400, 580, 882, 292); g.stroke()
    g.lineWidth = 3;
    [[180, 960, 180, 650], [390, 900, 390, 440], [610, 850, 610, 230], [830, 760, 830, 96]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke() });
    [[170, 650, 880, 700], [250, 790, 930, 840], [300, 430, 840, 470]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke() })
    // 地块轮廓与排线
    for (let i = 0; i < 8; i += 1) {
      const x = r(60, 780), y = r(80, 840), ww = r(58, 160), hh = r(46, 138)
      g.strokeStyle = 'rgba(48,54,60,.6)'; g.lineWidth = 2; g.strokeRect(x, y, ww, hh)
      g.strokeStyle = 'rgba(48,54,60,.2)'; g.lineWidth = 1
      for (let k = 6; k < ww; k += 10) { g.beginPath(); g.moveTo(x + k, y + 6); g.lineTo(x + k - 18, y + hh - 6); g.stroke() }
    }
    // 树与指北
    for (let i = 0; i < 22; i += 1) {
      const x = r(40, 960), y = r(40, 950), rad = r(7, 18)
      g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2); g.strokeStyle = 'rgba(48,54,60,.75)'; g.lineWidth = 2; g.stroke()
      g.beginPath(); g.moveTo(x - rad, y); g.lineTo(x + rad, y); g.moveTo(x, y - rad); g.lineTo(x, y + rad); g.stroke()
    }
    g.strokeStyle = 'rgba(48,54,60,.8)'; g.lineWidth = 4
    g.beginPath(); g.moveTo(920, 130); g.lineTo(920, 58); g.lineTo(908, 84); g.moveTo(920, 58); g.lineTo(932, 84); g.stroke()
    g.font = '500 20px "PingFang SC","Microsoft YaHei",sans-serif'; g.fillStyle = 'rgba(48,54,60,.8)'; g.fillText('N', 908, 154)
  } else if (motif === 'aerial') {
    g.fillStyle = '#7f8f74'; g.fillRect(0, 0, w, h)
    // 地块与道路
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        const x = i * 118 + r(-12, 12), y = j * 118 + r(-12, 12)
        g.fillStyle = `rgba(${Math.round(r(100, 148))},${Math.round(r(106, 136))},${Math.round(r(92, 112))},.9)`
        g.fillRect(x + 14, y + 14, 94, 94)
        g.strokeStyle = 'rgba(210,205,190,.5)'; g.lineWidth = 5; g.strokeRect(x + 14, y + 14, 94, 94)
        for (let k = 0; k < 5; k += 1) { g.fillStyle = 'rgba(60,66,60,.35)'; g.fillRect(x + r(20, 88), y + r(20, 88), r(8, 26), r(8, 22)) }
      }
    }
    // 河道
    g.beginPath(); g.moveTo(760, -60); g.bezierCurveTo(660, 220, 800, 540, 580, 1080)
    g.lineWidth = 190; g.strokeStyle = '#7899a2'; g.stroke()
    g.lineWidth = 8; g.strokeStyle = 'rgba(222,232,229,.45)'; g.stroke()
    // 主路
    g.strokeStyle = '#d8d5c7'; g.lineWidth = 18
    g.beginPath(); g.moveTo(0, 730); g.bezierCurveTo(300, 700, 540, 760, 1024, 670); g.stroke()
    g.beginPath(); g.moveTo(320, 0); g.lineTo(360, 1024); g.stroke()
    // 树冠
    for (let i = 0; i < 90; i += 1) tree(r(20, 1000), r(20, 1000), r(4, 11), true)
    // 影像噪点
    for (let i = 0; i < 600; i += 1) { g.fillStyle = `rgba(255,255,255,${r(.01, .04)})`; g.fillRect(r(0, w), r(0, h), 2, 2) }
  } else if (motif === 'icons') {
    g.fillStyle = '#f7f7f4'; g.fillRect(0, 0, w, h)
    g.strokeStyle = '#363b42'; g.lineWidth = 6; g.lineCap = 'round'; g.lineJoin = 'round'
    const s0 = 58
    const cell = (w - s0 * 4) / 3
    const centers = []
    for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) centers.push([s0 + cell * i + cell / 2, s0 + cell * j + cell / 2])
    centers.forEach(([x, y], idx) => {
      if (idx === 0) { g.strokeRect(x - 46, y - 22, 34, 64); g.strokeRect(x + 2, y - 48, 42, 90); g.beginPath(); g.moveTo(x - 46, y + 42); g.lineTo(x + 46, y + 42); g.stroke() }
      if (idx === 1) { g.beginPath(); g.moveTo(x, y + 56); g.lineTo(x, y + 8); g.stroke(); g.beginPath(); g.arc(x, y - 8, 34, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(x, y - 8, 16, 0, Math.PI * 2); g.stroke() }
      if (idx === 2) { g.beginPath(); g.moveTo(x - 56, y + 44); g.lineTo(x - 10, y + 8); g.lineTo(x + 20, y + 30); g.lineTo(x + 56, y - 20); g.stroke(); g.setLineDash([14, 12]); g.beginPath(); g.moveTo(x - 56, y + 44); g.lineTo(x + 56, y - 20); g.stroke(); g.setLineDash([]) }
      if (idx === 3) { for (let k = 0; k < 3; k += 1) { g.beginPath(); g.moveTo(x - 58, y - 22 + k * 26); g.bezierCurveTo(x - 30, y - 40 + k * 26, x + 28, y - 6 + k * 26, x + 58, y - 22 + k * 26); g.stroke() } }
      if (idx === 4) { g.beginPath(); g.arc(x, y, 46, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.moveTo(x - 56, y); g.lineTo(x + 56, y); g.moveTo(x, y - 56); g.lineTo(x, y + 56); g.stroke() }
      if (idx === 5) { for (let k = 0; k < 3; k += 1) { g.beginPath(); g.arc(x - 34 + k * 34, y - 24, 12, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.moveTo(x - 50 + k * 34, y + 38); g.quadraticCurveTo(x - 12 + k * 34, y + 20, x - 18 + k * 34, y + 38); g.stroke() } }
      if (idx === 6) { g.beginPath(); g.moveTo(x - 54, y - 26); g.lineTo(x - 18, y - 42); g.lineTo(x + 18, y - 20); g.lineTo(x + 54, y - 36); g.stroke(); g.beginPath(); g.moveTo(x - 54, y - 26); g.lineTo(x - 54, y + 38); g.lineTo(x - 18, y + 20); g.lineTo(x - 18, y - 42); g.stroke(); g.beginPath(); g.moveTo(x + 18, y - 20); g.lineTo(x + 18, y + 40); g.lineTo(x + 54, y + 24); g.lineTo(x + 54, y - 36); g.stroke() }
      if (idx === 7) { g.beginPath(); g.arc(x, y, 22, 0, Math.PI * 2); g.stroke(); for (let k = 0; k < 8; k += 1) { const a = k * Math.PI / 4; g.beginPath(); g.moveTo(x + Math.cos(a) * 34, y + Math.sin(a) * 34); g.lineTo(x + Math.cos(a) * 56, y + Math.sin(a) * 56); g.stroke() } }
      if (idx === 8) { [[-50, 24, 54], [-26, -26, 60], [10, -6, 70], [34, 28, 50]].forEach(([xx, yy, hh]) => { g.strokeRect(x + xx, y + yy - hh, 28, hh) }) ; g.beginPath(); g.moveTo(x - 60, y + 42); g.lineTo(x + 60, y + 42); g.stroke() }
    })
  } else if (motif === 'cover') {
    const sky = g.createLinearGradient(0, 0, 0, 760)
    sky.addColorStop(0, '#1f2a35'); sky.addColorStop(.55, '#6b6d68'); sky.addColorStop(1, '#c48962')
    g.fillStyle = sky; g.fillRect(0, 0, w, h)
    const sun = g.createRadialGradient(740, 560, 0, 740, 560, 260)
    sun.addColorStop(0, 'rgba(255,214,164,.5)'); sun.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = sun; g.fillRect(420, 300, 604, 420)
    // 城市剪影
    for (let i = 0; i < 30; i += 1) {
      const bx = i * 38 - 10, bh = r(60, 260)
      g.fillStyle = `rgba(28,34,40,${r(.55, .9)})`
      g.fillRect(bx, 824 - bh, r(28, 38), bh)
      g.fillStyle = 'rgba(245,208,161,.18)'; g.fillRect(bx + 8, 824 - bh + 12, 12, 8)
    }
    g.fillStyle = 'rgba(35,42,48,.78)'; g.fillRect(0, 824, w, h - 824)
    g.fillStyle = 'rgba(240,196,145,.12)'; g.fillRect(0, 824, w, 8)
  } else if (motif === 'location') {
    g.fillStyle = '#f1eee4'; g.fillRect(0, 0, w, h)
    g.beginPath(); g.moveTo(830, -40); g.bezierCurveTo(690, 260, 850, 560, 620, 1080)
    g.lineWidth = 170; g.strokeStyle = '#adc9cd'; g.stroke()
    // 道路放射
    const cx = 500, cy = 480
    for (let i = 0; i < 12; i += 1) {
      const a = i * Math.PI / 6
      g.strokeStyle = i % 3 === 0 ? '#d9b177' : 'rgba(255,255,255,.85)'; g.lineWidth = i % 3 === 0 ? 8 : 18
      g.beginPath(); g.moveTo(cx + Math.cos(a) * 70, cy + Math.sin(a) * 70); g.lineTo(cx + Math.cos(a) * 560, cy + Math.sin(a) * 560); g.stroke()
    };
    [90, 180, 280, 390].forEach((rad) => { g.beginPath(); g.arc(cx, cy, rad, 0, Math.PI * 2); g.strokeStyle = 'rgba(255,255,255,.75)'; g.lineWidth = 10; g.stroke() })
    g.beginPath(); g.arc(cx, cy, 26, 0, Math.PI * 2); g.fillStyle = '#3d444a'; g.fill()
    for (let i = 0; i < 16; i += 1) { g.beginPath(); g.arc(r(80, 900), r(80, 900), r(4, 10), 0, Math.PI * 2); g.fillStyle = 'rgba(62,72,76,.35)'; g.fill() }
  } else if (motif === 'transit') {
    g.fillStyle = '#f4f2ea'; g.fillRect(0, 0, w, h)
    for (let i = 0; i < 7; i += 1) { g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 24; g.beginPath(); g.moveTo(i * 170, 0); g.lineTo(i * 170 + r(-40, 40), h); g.stroke() }
    for (let i = 0; i < 7; i += 1) { g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 22; g.beginPath(); g.moveTo(0, i * 160); g.lineTo(w, i * 160 + r(-30, 30)); g.stroke() }
    // 轨道线
    g.setLineDash([26, 14]); g.lineWidth = 12
    g.strokeStyle = '#7d9b85'; g.beginPath(); g.moveTo(60, 920); g.bezierCurveTo(280, 700, 560, 500, 960, 160); g.stroke()
    g.strokeStyle = '#b98068'; g.beginPath(); g.moveTo(90, 160); g.bezierCurveTo(380, 320, 640, 620, 940, 880); g.stroke()
    g.setLineDash([])
    // 节点
    for (let i = 0; i < 10; i += 1) { g.beginPath(); g.arc(r(100, 920), r(100, 920), 12, 0, Math.PI * 2); g.fillStyle = '#ffffff'; g.fill(); g.strokeStyle = '#4c5656'; g.lineWidth = 3; g.stroke() }
    // 箭头
    g.strokeStyle = '#4c5656'; g.lineWidth = 5;
    [[700, 420, 780, 450], [430, 720, 510, 750], [860, 300, 920, 260]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.lineTo(x2 - 18, y2 + 2); g.moveTo(x2, y2); g.lineTo(x2 - 14, y2 - 16); g.stroke() })
  } else if (motif === 'steps') {
    g.fillStyle = '#f6f4ed'; g.fillRect(0, 0, w, h)
    const cards = [
      { x: 68, y: 126, n: '01', c: '#b9c9bd' },
      { x: 348, y: 330, n: '02', c: '#c8b8a4' },
      { x: 684, y: 574, n: '03', c: '#adbfc9' },
    ]
    cards.forEach((cd, idx) => {
      g.fillStyle = '#ffffff'; g.fillRect(cd.x, cd.y, 240, 240)
      g.strokeStyle = 'rgba(80,88,96,.16)'; g.lineWidth = 3; g.strokeRect(cd.x, cd.y, 240, 240)
      g.fillStyle = cd.c; g.fillRect(cd.x, cd.y, 240, 10)
      g.font = '600 40px "PingFang SC","Microsoft YaHei",sans-serif'; g.fillStyle = 'rgba(60,68,76,.62)'; g.fillText(cd.n, cd.x + 22, cd.y + 66)
      if (idx === 0) { g.strokeStyle = '#56616a'; g.lineWidth = 4; g.strokeRect(cd.x + 92, cd.y + 100, 70, 70); g.beginPath(); g.moveTo(cd.x + 128, cd.y + 100); g.lineTo(cd.x + 128, cd.y + 170); g.stroke() }
      if (idx === 1) { g.beginPath(); g.arc(cd.x + 120, cd.y + 132, 46, 0, Math.PI * 2); g.strokeStyle = '#56616a'; g.lineWidth = 4; g.stroke(); g.beginPath(); g.moveTo(cd.x + 120, cd.y + 84); g.lineTo(cd.x + 120, cd.y + 180); g.stroke() }
      if (idx === 2) { g.beginPath(); g.moveTo(cd.x + 80, cd.y + 168); g.lineTo(cd.x + 96, cd.y + 124); g.lineTo(cd.x + 120, cd.y + 142); g.lineTo(cd.x + 160, cd.y + 102); g.strokeStyle = '#56616a'; g.lineWidth = 4; g.stroke() }
    })
    g.strokeStyle = 'rgba(110,118,124,.5)'; g.lineWidth = 4; g.setLineDash([20, 12])
    g.beginPath(); g.moveTo(300, 236); g.lineTo(380, 356); g.stroke()
    g.beginPath(); g.moveTo(584, 446); g.lineTo(714, 596); g.stroke()
    g.setLineDash([])
  } else {
    g.fillStyle = '#edf0f2'; g.fillRect(0, 0, w, h)
  }
  return c.toDataURL('image/png')
}

const igPresetCache = new Map()
function igPresetThumb(motif, seed) {
  const key = `${motif}|${seed}`
  if (!igPresetCache.has(key)) igPresetCache.set(key, igPresetArt(motif, seed))
  return igPresetCache.get(key)
}

const IG_PRESETS = {
  hot: [
    { label: '滨水住区方案', prompt: '滨水住区建筑方案，立体绿化与公共平台，傍晚光线', style: '效果图', img: './ig/ig-01.jpg' },
    { label: '建筑方案模型', prompt: '现代文化建筑方案手工模型，浅木色体块与悬挑屋面', style: '模型', img: './ig/ig-02.jpg' },
    { label: '滨水会所效果', prompt: '滨水会所夜景效果，玻璃体量与高层背景，暖光', style: '效果图', img: './ig/ig-03.jpg' },
    { label: '住区航拍影像', prompt: '住区规划航拍影像，绿地与街区肌理', style: '影像', img: './ig/ig-04.jpg?v=3' },
    { label: '室内空间方案', prompt: '住宅室内公共空间，木饰面与自然采光', style: '室内', img: './ig/ig-05.jpg' },
    { label: '林中民宿方案', prompt: '山林民宿建筑方案，深色坡屋顶与溪流环境', style: '效果图', img: './ig/ig-06.jpg' },
    { label: '企业办公楼方案', prompt: '企业办公楼立面方案，竖向格栅与玻璃幕墙', style: '效果图', img: './ig/ig-07.jpg' },
    { label: '街角咖啡更新', prompt: '街角咖啡店更新改造，木构檐廊与玻璃界面', style: '效果图', img: './ig/ig-08.jpg' },
  ],
  tpl: [
    { label: '方案汇报封面', prompt: '规划方案汇报封面底图，滨水建筑夜景与标题留白', style: '封面', img: './ig/ig-03.jpg' },
    { label: '建筑方案模型', prompt: '建筑方案手工模型，浅木色体块与场地关系', style: '模型', img: './ig/ig-02.jpg' },
    { label: '住区航拍分析', prompt: '住区规划航拍分析底图，街区与绿地肌理', style: '影像', img: './ig/ig-04.jpg' },
    { label: '室内空间效果', prompt: '室内公共空间效果，木饰面与自然采光', style: '室内', img: './ig/ig-05.jpg' },
    { label: '庭院景观效果', prompt: '庭院景观效果，木质平台与绿化围合', style: '效果图', img: './ig/ig-09.jpg' },
    { label: '企业立面效果', prompt: '企业办公楼立面效果，竖向格栅与玻璃幕墙', style: '效果图', img: './ig/ig-07.jpg' },
  ],
}

const igThumbCache = new Map()
function igThumb(prompt, style, seed) {
  const key = `${prompt}|${style}|${seed}`
  if (!igThumbCache.has(key)) igThumbCache.set(key, paintShot(prompt, '1:1', style, seed, { plain: true }))
  return igThumbCache.get(key)
}

async function renderImage(el) {
  const models = state.boot.models || []
  const m = imageModel()
  const g = state.imagegen

  if (!m.image) {
    el.innerHTML = `
      <div class="img-head"><div><div class="img-title">图像</div><div class="img-sub"></div></div></div>
      <div class="ig-blocked">
        <div class="ig-blocked-ico">${icon('image')}</div>
        <div class="ig-blocked-title">当前模型不支持图像生成</div>
        <div class="ig-blocked-text">${esc(m.label || '未选择模型')}</div>
        <button class="btn primary" id="igGoSettings">去设置更换模型</button>
      </div>`
    el.querySelector('#igGoSettings').addEventListener('click', () => { state.view = 'settings'; state.settingsTab = 'models'; render() })
    return
  }

  const cards = [
    ...g.shots.map((s, i) => ({ kind: 'shot', id: s.id, label: '最近生成', prompt: s.prompt, style: s.style, url: s.url, meta: `${s.style} · ${s.ratio}` })),
    ...(IG_PRESETS[g.tab] || IG_PRESETS.hot).map((p, i) => ({ kind: 'preset', id: `p${i}`, label: p.label, prompt: p.prompt, style: p.style, url: p.img || (p.art ? igPresetThumb(p.art, i + 3) : igThumb(p.prompt, p.style, i + 3)), meta: p.style })),
  ]

  el.innerHTML = `
    <div class="img-head">
      <div><div class="img-title">图像</div>
        <div class="img-sub"></div></div>
    </div>
    <div class="img-tabs">
      <button class="img-tab${g.tab === 'hot' ? ' on' : ''}" data-igtab="hot">热门</button>
      <button class="img-tab${g.tab === 'tpl' ? ' on' : ''}" data-igtab="tpl">模板</button>
    </div>
    <div class="img-gallery">
      ${cards.map((c) => `
        <button class="img-card" data-igkind="${c.kind}" data-igid="${c.id}">
          <img src="${c.url}" alt="${esc(c.label)}" loading="lazy">
          <span class="img-card-label">${esc(c.label)}</span>
          <span class="img-card-meta">${esc(c.meta)}</span>
        </button>`).join('')}
    </div>
    <div class="img-composer-wrap">
      <div class="img-composer">
        <button class="img-plus" id="igPlus" title="添加参考图">${icon('plus')}</button>
        <input class="img-input" id="igPrompt" placeholder="描述新图像" value="${esc(g.prompt)}">
        <div class="img-tools">
          <button class="hc-lang" id="igLang">中 <span class="ico hc-caret">${icon('chevron')}</span></button>
          <button class="hc-mic" id="igMic" title="语音输入">${icon('mic')}</button>
          <button class="img-send" id="igGen" title="生成" ${g.busy ? 'disabled' : ''}>${g.busy ? '…' : icon('up')}</button>
        </div>
      </div>
    </div>`

  const input = el.querySelector('#igPrompt')
  input.addEventListener('input', (e) => { g.prompt = e.target.value })
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); el.querySelector('#igGen').click() } })
  el.querySelectorAll('[data-igtab]').forEach((b) => b.addEventListener('click', () => { g.tab = b.dataset.igtab; renderView() }))
  el.querySelector('#igPlus').addEventListener('click', () => toast('参考图按网络与模型外发规则校验后加入（演示）'))
  el.querySelector('#igLang')?.addEventListener('click', () => toast('提示词语言：中文'))
  el.querySelector('#igMic')?.addEventListener('click', () => toast('按住说话，转写为提示词（演示）'))

  el.querySelectorAll('[data-igkind]').forEach((b) => b.addEventListener('click', () => {
    const c = cards.find((x) => x.id === b.dataset.igid && x.kind === b.dataset.igkind)
    if (!c) return
    if (c.kind === 'preset') {
      g.prompt = c.prompt
      g.style = c.style
      renderView()
      const next = document.getElementById('igPrompt')
      if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length) }
      return
    }
    const s = g.shots.find((x) => x.id === c.id)
    openModal('生成结果', `
      <div class="ig-preview"><img src="${s.url}" alt=""></div>
      <div class="field" style="margin-top:10px"><div class="field-label">提示词</div><div class="field-value">${esc(s.prompt)}</div></div>
      <div class="field"><div class="field-label">参数</div><div class="field-value">${esc(s.style)} · ${esc(s.ratio)} · ${esc(m.label)}</div></div>
      <div style="display:flex;gap:8px;margin-top:12px"><button class="btn" data-dlg>下载 PNG</button><button class="btn primary" data-useimg>用于会话</button></div>
      <div class="form-note">原型展示本地示意画面；正式版该位置为模型 API 返回图片，元数据含端点、耗时与审核结果。</div>`, { wide: true })
    const mask = document.querySelector('.jg-modal-mask')
    mask.querySelector('[data-dlg]')?.addEventListener('click', () => {
      const a = document.createElement('a')
      a.href = s.url; a.download = `jg-image-${s.id}.png`; a.click()
    })
    mask.querySelector('[data-useimg]')?.addEventListener('click', () => {
      mask.remove()
      state.view = 'chat'; state.conversation = null
      state.draft = `我生成了一张规划示意图（${s.style}${s.ratio}，提示词：${s.prompt}），请基于它整理一段汇报说明。`
      render()
    })
  }))

  el.querySelector('#igGen').addEventListener('click', () => {
    if (!g.prompt.trim()) { toast('请先描述要生成的图像', true); input.focus(); return }
    if (g.busy) return
    g.busy = true
    renderView()
    setTimeout(() => {
      const g2 = state.imagegen
      const base = Date.now().toString().slice(-5)
      for (let i = 0; i < g2.count; i += 1) {
        g2.shots.unshift({ id: `${base}${i}`, prompt: g2.prompt.trim(), style: g2.style, ratio: g2.ratio, url: paintShot(g2.prompt.trim(), g2.ratio, g2.style, i + 1, { plain: true }), ts: new Date().toLocaleTimeString('zh-CN', { hour12: false }).slice(0, 5) })
      }
      g2.busy = false
      renderView()
      toast(`已生成 ${g2.count} 张图像（原型示意画面）`)
    }, 900)
  })
}

/* ---------------------------- cloud browser --------------------------- */

const CLOUD_STATE = {
  usable: ['ok', '可用'],
  locked: ['warn', '需审批 / 无授权'],
  offnet: ['', '本网不可连'],
  down: ['warn', '维护中'],
}

/* 云浏览器：参考客户端形态的右侧工具栏，不占整页；会话以标签页组织。 */
async function ensureCloud() {
  if (state.cloud && state.cloud.net === state.boot.network?.id) return state.cloud
  const { body } = await api('/api/cloud')
  state.cloud = { ...body, net: state.boot.network?.id }
  return state.cloud
}

function toggleCloudPanel(force) {
  const next = typeof force === 'boolean' ? force : !state.cloudOpen
  state.cloudOpen = next
  applyLayout()
  if (next) {
    ensureCloud().then(() => { renderCloudPanel(); renderTopbar() })
  } else {
    endAllCloudSessions().then(() => { renderCloudPanel(); renderTopbar() })
  }
}

async function endAllCloudSessions() {
  const sessions = state.cloudTabs.filter((t) => t.kind === 'session')
  for (const t of sessions) {
    await api('/api/cloud/close', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: t.id }) })
  }
  state.cloudTabs = state.cloudTabs.filter((t) => t.kind !== 'session')
  state.cloudTab = 'new'
}

function cloudHomeHTML() {
  const systems = (state.cloud?.systems || [])
  return `
    <div class="cb-addr">
      <div class="cb-navgrp">
        <button class="cb-nav" title="后退" disabled>${icon('chevron')}</button>
        <span class="cb-nav-sep"></span>
        <button class="cb-nav cb-nav-fwd" title="前进" disabled>${icon('chevron')}</button>
      </div>
      <button class="cb-nav cb-reload" id="cbReload" title="刷新">${icon('refresh')}</button>
      <input id="cbAddr" placeholder="搜索或输入网址" autocomplete="off">
      <div class="cb-actgrp">
        <button class="cb-nav cb-ext-btn" id="cbExt" title="扩展程序"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5h3v2.5a1.5 1.5 0 1 0 3 0V5h3v4h2.5a1.5 1.5 0 1 0 0 3H18v4h-4v2.5a1.5 1.5 0 1 0-3 0V16H5v-4H7.5a1.5 1.5 0 1 0 0-3H5V5h4z"/></svg><span class="cb-ext-dot">${state.cloudExts?.filter((x) => x.on).length || 0}</span></button>
        <button class="cb-nav" id="cbDownload" title="下载"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4v10M8 11l4 4 4-4M5 19h14"/></svg></button>
        <button class="cb-nav" id="cbMore" title="更多"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/></svg></button>
      </div>
    </div>
    <div class="cb-h">工具</div>
    <div class="cb-tool-row">
      <button class="cb-tool" id="cbToolFile">${icon('folder')}<span>文件</span><em>Ctrl+P</em></button>
      <button class="cb-tool" id="cbToolMore">${icon('grid')}<span>更多工具…</span><em>⌄</em></button>
    </div>
    <div class="cb-h">推荐</div>
    <div class="cb-rec-row">
      <button class="cb-rec" data-open="CB-2"><span class="cb-rec-ico">${icon('globe')}</span><b>公共资源交易</b></button>
      <button class="cb-rec" data-open="CB-1"><span class="cb-rec-ico">${icon('globe')}</span><b>四库一平台</b></button>
      <button class="cb-rec" data-open="CB-5"><span class="cb-rec-ico">${icon('doc')}</span><b>集团 OA</b></button>
      <button class="cb-rec" data-open="CB-3"><span class="cb-rec-ico">${icon('map')}</span><b>自然资源平台</b></button>
    </div>
    <div class="cb-sec-row">
      ${(state.cloud?.policy || []).slice(0, 4).map((p) => `<span class="cb-sec">${esc(p.title)}</span>`).join('')}
    </div>`
}

function cloudSessionHTML(tab) {
  const s = state.cloud?.systems?.find((x) => x.id === tab.systemId) || {}
  const sess = tab.session || {}
  return `
    <div class="cb-frame">
      <div class="cb-frame-bar">
        <span class="cb-dots"><i></i><i></i><i></i></span>
        <span class="mono cb-frame-url">https://${esc(tab.host || '')}</span>
        <span class="spacer"></span>
        <span class="tag ok">${esc(state.boot.network?.label || '')}实例</span>
      </div>
      <div class="cb-stage compact">
        <div class="cb-portal">
          <div class="cb-portal-title">${esc(s.name || tab.title)}</div>
          <div class="cb-portal-sub">统一身份认证 · 企业凭据托管登录</div>
          <div class="cb-field"><span>账号</span><b class="mono">${esc(s.credential?.account || 'SSO')}</b></div>
          <div class="cb-field"><span>口令</span><b class="mono">••••••（服务端注入）</b></div>
          <div class="cb-portal-note">${icon('shield')} 口令不经过客户端，画面已叠加水印并录屏</div>
          <div class="cb-portal-btn" data-portal>进入系统</div>
        </div>
        <div class="cb-watermark">${esc(sess.watermark || '')}</div>
        <div class="cb-watermark second">${esc(sess.watermark || '')}</div>
      </div>
      <div class="cb-sess">
        <div class="mono">票号 ${esc(tab.ticket?.token || '')} · ${tab.ticket?.ttlSec || 900}s</div>
        <div class="mono" style="color:var(--muted)">绑定 ${esc(tab.ticket?.boundTo || '')}</div>
      </div>
      <div class="cb-sess-acts">
        <span>${esc(sess.note || '写操作在会话内二次确认；剪贴板按网络策略禁用')}</span>
        <span class="spacer"></span>
        <button class="btn sm" data-end="${tab.id}">结束会话</button>
      </div>
    </div>`
}

function renderCloudPanel() {
  let panel = document.getElementById('cbPanel')
  const app = document.getElementById('app')
  if (!state.cloudOpen || !state.cloud || !cloudAllowed()) {
    panel?.remove()
    app?.classList.remove('has-cloud')
    document.documentElement.style.setProperty('--cb-w', '0px')
    return
  }
  app?.classList.add('has-cloud')
  if (!panel) {
    panel = document.createElement('aside')
    panel.id = 'cbPanel'
    panel.className = 'cb-panel'
  }
  if (panel.parentElement !== app) app.appendChild(panel)
  panel.className = `cb-panel${state.cbFull ? ' full' : ''}`
  panel.style.width = ''
  applyLayout()
  const tabs = state.cloudTabs.length ? state.cloudTabs : [{ id: 'new', kind: 'new', title: '新标签页' }]
  state.cloudTabs = tabs
  const active = tabs.find((t) => t.id === state.cloudTab) || tabs[0]
  state.cloudTab = active.id

  panel.innerHTML = `
    <div class="cb-grip" id="cbGrip" title="拖动调整宽度"></div>
    <div class="cb-head">
      <div class="cb-tabs">
        ${tabs.map((t) => `<button class="cb-tab${t.id === active.id ? ' on' : ''}" data-tab="${t.id}">
          <span class="cb-tab-ico">${icon('globe')}</span>
          <span class="cb-tab-name">${esc(t.title)}</span>
          <em class="cb-tab-x" data-x="${t.id}">×</em>
        </button>`).join('')}
        <button class="cb-tab-add" id="cbNew" title="新标签页">${icon('plus')}</button>
      </div>
      <button class="cb-icon-btn" id="cbFull" title="${state.cbFull ? '退出完整视图' : '完整视图'}">${state.cbFull
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'}</button>
      <button class="cb-icon-btn" id="cbFold" title="折叠云浏览器"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M15 4v16"/></svg></button>
    </div>
    <div class="cb-body">${active.kind === 'session' ? cloudSessionHTML(active) : cloudHomeHTML()}</div>
    ${state.cbFull ? `<div class="cb-composer">
      <button class="cbc-plus" title="附件">${icon('plus')}</button>
      <input id="cbcInput" placeholder="询问 九规智能中枢" autocomplete="off">
      <button class="cbc-mic" title="语音">${icon('mic')}</button>
      <button class="cbc-send" id="cbcSend" title="发送">${icon('up')}</button>
    </div>` : ''}`

  panel.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', (e) => {
    if (e.target.closest('[data-x]')) return
    state.cloudTab = b.dataset.tab
    renderCloudPanel()
  }))
  panel.querySelectorAll('[data-x]').forEach((b) => b.addEventListener('click', async (e) => {
    e.stopPropagation()
    const tab = state.cloudTabs.find((t) => t.id === b.dataset.x)
    if (tab?.kind === 'session') await api('/api/cloud/close', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: tab.id }) })
    state.cloudTabs = state.cloudTabs.filter((t) => t.id !== b.dataset.x)
    if (state.cloudTab === b.dataset.x) state.cloudTab = state.cloudTabs[0]?.id || 'new'
    if (!state.cloudTabs.length) state.cloudTabs = [{ id: 'new', kind: 'new', title: '新标签页' }]
    renderCloudPanel()
  }))
  panel.querySelector('#cbNew').addEventListener('click', () => {
    let n = 1
    while (state.cloudTabs.some((t) => t.id === `new-${n}`)) n += 1
    const id = `new-${n}`
    state.cloudTabs.push({ id, kind: 'new', title: '新标签页' })
    state.cloudTab = id
    renderCloudPanel()
  })
  panel.querySelector('#cbFull').addEventListener('click', () => {
    state.cbFull = !state.cbFull
    renderCloudPanel()
  })
  panel.querySelector('#cbFold').addEventListener('click', () => toggleCloudPanel(false))
  panel.querySelector('#cbExt')?.addEventListener('click', (ev) => { ev.stopPropagation(); openCloudExtensions(ev.currentTarget) })
  panel.querySelector('#cbDownload')?.addEventListener('click', () => toast('下载任务：仅保存已授权文件，下载记录进审计（演示）'))
  panel.querySelector('#cbMore')?.addEventListener('click', (ev) => { ev.stopPropagation(); openCloudMore(ev.currentTarget) })
  const cbc = panel.querySelector('#cbcInput')
  if (cbc) {
    const send = () => {
      const v = cbc.value.trim()
      if (!v) return
      cbc.value = ''
      toast('已转交 AI 助手处理（演示）：' + v.slice(0, 18))
    }
    panel.querySelector('#cbcSend').addEventListener('click', send)
    cbc.addEventListener('keydown', (e) => { if (e.key === 'Enter') send() })
  }

  panel.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => openCloudTab(b.dataset.open)))
  panel.querySelector('#cbAddr')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitCloudAddr(panel) })
  panel.querySelector('#cbReload')?.addEventListener('click', () => { renderCloudPanel(); toast('已刷新云浏览器视图（会话仍托管在企业侧）') })
  panel.querySelector('#cbToolFile')?.addEventListener('click', () => toast('文件工具：从本地选择附件，经外发策略校验后上传（演示）'))
  panel.querySelector('#cbToolMore')?.addEventListener('click', () => toast('更多工具：截图 / 下载 / 打印 / 审图比对（演示）'))
  panel.querySelector('[data-end]')?.addEventListener('click', async (e) => {
    await api('/api/cloud/close', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: e.currentTarget.dataset.end }) })
    state.cloudTabs = state.cloudTabs.filter((t) => t.id !== e.currentTarget.dataset.end)
    state.cloudTab = 'new'
    renderCloudPanel()
    toast('会话已结束，容器销毁')
  })
  panel.querySelector('[data-portal]')?.addEventListener('click', () => toast('已在服务端注入凭据并进入系统（演示）'))

  const grip = panel.querySelector('#cbGrip')
  grip.addEventListener('pointerdown', (ev) => {
    ev.preventDefault()
    grip.setPointerCapture(ev.pointerId)
    document.body.classList.add('resizing')
    const startX = ev.clientX
    const startW = panel.getBoundingClientRect().width
    const move = (e2) => {
      const maxW = Math.max(220, Math.min(820, window.innerWidth - 58 - (document.getElementById('sidebar')?.getBoundingClientRect().width || 0) - 240))
      state.cbW = Math.min(maxW, Math.max(220, startW + (startX - e2.clientX)))
      state.cbUserW = state.cbW
      document.documentElement.style.setProperty('--cb-w', `${state.cbW}px`)
    }
    const up = () => {
      grip.removeEventListener('pointermove', move)
      grip.removeEventListener('pointerup', up)
      localStorage.setItem('jg.cbW', state.cbW)
      localStorage.setItem('jg.cbPaneW', state.cbUserW)
      document.body.classList.remove('resizing')
    }
    grip.addEventListener('pointermove', move)
    grip.addEventListener('pointerup', up)
  })
}

function openCloudMore(anchor) {
  document.querySelectorAll('.cb-more-pop').forEach((p) => p.remove())
  const pop = document.createElement('div')
  pop.className = 'cb-more-pop'
  pop.innerHTML = `
    <button class="cbm-item" data-cbm="find">在页面中查找</button>
    <button class="cbm-item" data-cbm="print">打印</button>
    <div class="cbm-sep"></div>
    <div class="cbm-zoom"><span>缩放</span><span class="cbm-scale"><i>−</i><b>100%</b><i>+</i></span><span class="cbm-reset">${icon('refresh')}</span></div>
    <div class="cbm-sep"></div>
    <button class="cbm-item" data-cbm="device">设备工具栏<span class="cbm-arrow">›</span></button>
    <button class="cbm-item cbm-off" disabled>截取屏幕截图</button>
    <div class="cbm-sep"></div>
    <button class="cbm-item" data-cbm="cookie">导入 Cookie 和密码…</button>
    <button class="cbm-item" data-cbm="password">密码和自动填充<span class="cbm-arrow">›</span></button>
    <button class="cbm-item" data-cbm="download">下载</button>
    <button class="cbm-item" data-cbm="history">历史记录</button>
    <button class="cbm-item" data-cbm="clear">清除浏览数据</button>
    <div class="cbm-sep"></div>
    <button class="cbm-item" data-cbm="settings">浏览器设置</button>`
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  const w = 236
  pop.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.right - w)) + 'px'
  pop.style.top = (r.bottom + 6) + 'px'
  const close = () => pop.remove()
  setTimeout(() => document.addEventListener('click', close, { once: true }), 0)
  pop.querySelectorAll('[data-cbm]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    pop.remove()
    const map = {
      find: '页面内查找仅对当前会话画面生效（演示）',
      print: '打印走企业打印策略，需审批后执行（演示）',
      device: '设备工具栏用于切换移动端视口（演示）',
      cookie: '导入 Cookie 与密码需凭据库授权，客户端不落盘（演示）',
      password: '自动填充由企业凭据库注入，明文不出服务端（演示）',
      download: '下载记录进审计，敏感文件按数据分级管控（演示）',
      history: '云会话历史仅保留在企业侧，客户端可查询（演示）',
      clear: '清除浏览数据会同时清理容器侧缓存（演示）',
      settings: '浏览器设置由管理员统一下发，个人不可改（演示）',
    }
    toast(map[b.dataset.cbm] || '演示操作')
  }))
}

function openCloudExtensions(anchor) {
  document.querySelectorAll('.cb-ext-pop').forEach((p) => p.remove())
  const exts = state.cloudExts || []
  const pop = document.createElement('div')
  pop.className = 'cb-ext-pop'
  const rows = () => exts.map((x) => `
    <div class="ce-row">
      <span class="ce-ico">${icon('grid')}</span>
      <div class="ce-meta"><b>${esc(x.name)}</b><span>${esc(x.desc)}</span></div>
      <button class="ce-toggle${x.on ? ' on' : ''}" data-ext-toggle="${x.id}" title="${x.on ? '停用' : '启用'}"><i></i></button>
    </div>`).join('')
  pop.innerHTML = `
    <div class="ce-head"><b>扩展程序</b><span class="ce-count">${exts.filter((x) => x.on).length} 个已启用</span></div>
    <div class="ce-list">${rows()}</div>
    <div class="ce-note">扩展运行在隔离容器内，安装与启用需管理员白名单审批。</div>
    <div class="ce-foot">
      <button class="ce-btn" data-ext-install>${icon('plus')}从商店安装</button>
      <button class="ce-btn" data-ext-dev>加载已解压扩展</button>
    </div>`
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = Math.max(8, Math.min(window.innerWidth - 308, r.left - 250)) + 'px'
  pop.style.top = (r.bottom + 8) + 'px'
  const refresh = () => {
    pop.querySelector('.ce-list').innerHTML = rows()
    pop.querySelector('.ce-count').textContent = `${exts.filter((x) => x.on).length} 个已启用`
    const dot = document.getElementById('cbExt')?.querySelector('.cb-ext-dot')
    if (dot) dot.textContent = String(exts.filter((x) => x.on).length)
    bindToggles()
  }
  const bindToggles = () => {
    pop.querySelectorAll('[data-ext-toggle]').forEach((btn) => btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const ext = exts.find((x) => x.id === btn.dataset.extToggle)
      if (!ext) return
      ext.on = !ext.on
      toast(`${ext.on ? '已启用' : '已停用'}扩展「${ext.name}」`)
      refresh()
    }))
  }
  bindToggles()
  pop.querySelector('[data-ext-install]').addEventListener('click', (e) => {
    e.stopPropagation()
    toast('已打开扩展商店：选择扩展后需管理员审批（演示）')
  })
  pop.querySelector('[data-ext-dev]').addEventListener('click', (e) => {
    e.stopPropagation()
    toast('已打开加载入口：选择本地扩展目录，校验签名后启用（演示）')
  })
  const close = (e) => {
    if (pop.contains(e.target) || anchor.contains(e.target)) return
    pop.remove()
    document.removeEventListener('pointerdown', close)
  }
  setTimeout(() => document.addEventListener('pointerdown', close), 0)
}

function submitCloudAddr(panel) {
  const v = panel.querySelector('#cbAddr').value.trim().toLowerCase()
  if (!v) return
  const sys = (state.cloud?.systems || []).find((s) => s.host.toLowerCase() === v || s.host.toLowerCase().includes(v) || s.name.includes(v))
  if (!sys) { toast('云浏览器只打开已登记的企业系统，该地址未登记', true); return }
  openCloudTab(sys.id)
}

async function openCloudTab(systemId) {
  const { ok, body } = await api('/api/cloud/open', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ systemId }) })
  if (!ok) {
    openModal('无法打开云会话', `
      <div class="notice">${esc(body.error)}</div>
      <div class="field" style="margin-top:10px"><div class="field-label">目标系统</div><div class="field-value">${esc(body.detail?.system || '')} · ${esc(body.detail?.network || '')}</div></div>
      <div class="field"><div class="field-label">所需审批</div><div class="field-value">${body.detail?.approval === 'dept' ? '部门负责人审批后开通' : body.detail?.approval === 'secret' ? '涉密授权与安全管理员审批' : '无需审批'}</div></div>
      <div class="form-note">拒绝已写入审计；审批通过后再次打开即可，凭据不会因为审批而暴露给客户端。</div>`, {})
    toast(body.error, true)
    return
  }
  const sys = state.cloud.systems.find((x) => x.id === systemId) || {}
  const tab = { id: body.session.id, kind: 'session', title: sys.name || systemId, systemId, host: sys.host, session: body.session, ticket: body.ticket }
  state.cloudTabs = state.cloudTabs.filter((t) => t.id !== tab.id)
  state.cloudTabs.push(tab)
  state.cloudTab = tab.id
  renderCloudPanel()
}

/* ---------------------------- placeholder --------------------------- */

function renderPlaceholder(el) {
  const label = state.boot.modules[state.view]?.label || ''
  const detail = {
    oneMap: ['一张图'],
    oa: ['OA 办公'],
    review: ['审图平台'],
    finance: ['财务管理'],
    bid: ['智能投标'],
    monitor: ['综合监测'],
    renewal: ['城市体检和更新'],
    hr: ['人事组织'],
    adminops: ['综合管理'],
  }[state.view] || [label]
  el.innerHTML = `
    <div class="view-head"><div><div class="view-title">${esc(detail[0])}</div></div></div>
    <div class="placeholder">${state.view === 'adminops' ? '入口待接入 · 通知公告发布等管理操作需按角色授权' : '入口待接入'}</div>`
}

/* ------------------------- modals & demo flows ------------------------- */

function openModal(title, body, opts = {}) {
  document.querySelectorAll('.jg-modal-mask').forEach((m) => m.remove())
  const mask = document.createElement('div')
  mask.className = 'jg-modal-mask open'
  mask.innerHTML = `<div class="jg-modal ${opts.wide ? 'wide' : ''}">
    <div class="jg-modal-head"><div class="jg-modal-title">${title}</div><span class="spacer"></span><button class="btn subtle" data-mclose>${icon('close')}</button></div>
    <div class="jg-modal-body">${body}</div>
  </div>`
  document.body.appendChild(mask)
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
  mask.addEventListener('click', (e) => { if (e.target === mask) mask.remove() })
  if (typeof opts.onMount === 'function') opts.onMount(mask)
  return mask
}

const closeModals = () => document.querySelectorAll('.jg-modal-mask').forEach((m) => m.remove())

async function switchNetwork() {
  const order = (state.boot.allNetworks || []).map((n) => n.id)
  const cur = state.boot.network?.id || 'inet'
  const next = order[(order.indexOf(cur) + 1) % order.length]
  await api('/api/network', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: next }) })
  await loadBoot()
  state.conversation = null
  state.selectedResource = null
  state.cloud = null
  state.cloudTabs = [{ id: 'new', kind: 'new', title: '新标签页' }]
  state.cloudTab = 'new'
  if (state.cloudOpen) ensureCloud().then(renderCloudPanel)
  render()
  toast(`已切换演示网络：${state.boot.network.label}（仅演示环境差异，真实三网不互通）`)
}

/* ---- 资源登记 ---- */

async function openRegisterForm() {
  const user = state.boot.user
  const orgUnits = state.boot.orgUnits || []
  const businessCategories = ['规划', '建筑', '市政', '风景园林', '测绘', '企业经营管理', '总工办', '其他']
  const orgMap = new Map()
  orgUnits.forEach((u) => {
    const deps = u.departments || []
    if (u.kind === '集团') {
      deps.forEach((d) => { if (!orgMap.has(`unit:${d.unit}`)) orgMap.set(`unit:${d.unit}`, u.name) })
    } else if (deps[0]) {
      orgMap.set(`unit:${deps[0].unit}`, u.name)
    }
  })
  const allDepts = orgUnits.flatMap((u) => u.departments || [])
  const sourceDept = allDepts.find((d) => d.head === user.name) || allDepts.find((d) => d.unit === user.unit)
  const sourceOrgName = sourceDept?.name || user.unit
  const orgOptions = orgMap.size ? [...orgMap.entries()] : [['unit:规划一所', '规划一所'], ['unit:测绘地理信息中心', '测绘地理信息中心'], ['unit:集团总部', '集团总部'], ['unit:智数中心', '智数中心']]
  const pureTypes = ['gis', '3d', 'cad', 'document', 'image', 'video', 'bizdata']
  const formats = ['PDF', 'DOCX', 'XLSX', 'PPTX', 'SHP', 'GDB', 'DWG', 'GeoTIFF', '3D Tiles', 'CSV', '其他']
  const mapCategories = [['satellite', '01 卫星影像'], ['current', '02 现状数据'], ['planning', '03 规划数据'], ['construction', '04 建设工程数据'], ['management', '05 管理数据'], ['socioeconomic', '06 社会经济数据'], ['threeD', '07 三维数据']]
  const spatialTypes = [['GIS_VECTOR', 'GIS 矢量'], ['GIS_RASTER', 'GIS 栅格'], ['3D_MODEL', '三维模型'], ['POINT_CLOUD', '点云'], ['BIM', 'BIM 模型']]
  const zones = [['intranet', '内网'], ['gov', '政务外网'], ['inet', '互联网']]
  let sourceType = 'local'
  let kind = 'pure'
  let files = []
  let cloudSpace = 'CL-DEPT'
  let cloudItems = []
  let driveSpaces = []
  try {
    const first = await api('/api/drive?space=CL-DEPT')
    driveSpaces = first.body.spaces || []
    cloudItems = first.body.items || []
  } catch (e) { /* 云空间不可用时仍可本地上传 */ }

  const now = new Date()
  const pad2 = (n) => String(n).padStart(2, '0')
  const uploadAt = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())} ${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`

  const body = `
    <div class="reg-wrap">
      <div class="reg-stepper" id="rfStepper">
        <div class="reg-stepper-item on" data-step-item="1"><i>1</i><span>资源元数据确认</span></div>
        <div class="reg-stepper-line"></div>
        <div class="reg-stepper-item" data-step-item="2"><i>2</i><span>智能识别与分类</span></div>
        <div class="reg-stepper-line"></div>
        <div class="reg-stepper-item" data-step-item="3"><i>3</i><span>安全与授权</span></div>
      </div>
      <div class="reg-lead" id="rfLead">按《九规集团统一数据中心元数据标准 V1.0》登记：系统自动生成数据 ID、数据来源、数据负责人、上传时间、格式和大小；员工填写数据名称、业务分类、数据简介并完成安全授权。登记分普通数据、成果数据、数据服务三类，质检可按需选择。</div>

      <div class="reg-block" data-reg-step="1">
        <div class="reg-block-head">1 资源元数据确认</div>
        <div class="reg-sub-head">1.1 数据来源</div>
        <div class="reg-seg" id="rfSourceSeg">
          <button type="button" class="reg-seg-btn on" data-src="local">${icon('upload')}本地上传</button>
          <button type="button" class="reg-seg-btn" data-src="cloud">${icon('cloud')}从云空间选择</button>
        </div>
        <div id="rfLocalPane">
          <div class="reg-drop">
            <div class="reg-drop-title">支持单文件、整个文件夹和压缩包</div>
            <div class="reg-drop-note">文件夹会读取相对路径形成 manifest；ZIP / 7Z / RAR 由登记服务解包后检测目录结构与格式。</div>
            <div class="reg-drop-acts">
              <label class="btn sm">${icon('doc')}选择文件<input type="file" id="rfFiles" multiple hidden></label>
              <label class="btn sm">${icon('folder')}选择文件夹<input type="file" id="rfFolder" webkitdirectory directory multiple hidden></label>
              <label class="btn sm">${icon('cloud')}选择压缩包<input type="file" id="rfZip" accept=".zip,.7z,.rar,.tar,.gz" hidden></label>
            </div>
          </div>
          <div id="rfFileList" class="reg-filelist"></div>
        </div>
        <div id="rfCloudPane" hidden>
          <div class="reg-cloud-bar">
            <select id="rfSpace">${ (driveSpaces.length ? driveSpaces : [{ id: 'CL-DEPT', name: '规划一所' }]).map((s) => `<option value="${esc(s.id)}">${esc(s.name)}（${s.kind === 'team' ? '专班' : '部门'}空间）</option>`).join('') }</select>
            <span class="mono" id="rfCloudHint">选中文件或整个成果包，只登记引用，原文件保留在云空间</span>
          </div>
          <div id="rfCloudList" class="reg-cloud-list"></div>
        </div>

        <div class="reg-sub-head">1.2 数据类型与基础信息</div>
        <div class="reg-kinds" id="rfKinds">
          <button type="button" class="reg-kind on" data-kind="pure"><span class="ico">${icon('doc')}</span><span class="reg-kind-name">普通数据</span><span class="reg-kind-desc">单项数据，单文件或单图层</span></button>
          <button type="button" class="reg-kind" data-kind="deliverable"><span class="ico">${icon('folder')}</span><span class="reg-kind-name">成果数据</span><span class="reg-kind-desc">生产部门标准成果，文件夹内含多种格式</span></button>
          <button type="button" class="reg-kind" data-kind="service"><span class="ico">${icon('globe')}</span><span class="reg-kind-name">数据服务</span><span class="reg-kind-desc">发布一个地址，按服务方式调用</span></button>
        </div>
        <div class="form-grid">
          <label>数据 ID（系统生成）<input id="rfDataId" value="提交后自动生成" readonly></label>
          <label>数据名称<input id="rfName" placeholder="例如：九江市道路中心线"></label>
          <label>业务分类<select id="rfDomain">${businessCategories.map((d) => `<option>${esc(d)}</option>`).join('')}</select></label>
          <label>数据来源（系统生成）<input id="rfSourceOrg" value="${esc(user.name)} · ${esc(sourceOrgName)}" readonly></label>
          <label>数据负责人（系统生成）<input id="rfDataOwner" value="${esc(user.name)}" readonly></label>
          <label>原始来源<select id="rfOriginalSource"><option>集团自产</option><option>外部单位提供</option><option>上级部门下发</option><option>其他</option></select></label>
          <label>数据上传时间（系统生成）<input id="rfUploadAt" value="${esc(uploadAt)}" readonly></label>
        </div>
      </div>

      <div class="reg-block" data-reg-step="2" hidden>
        <div class="reg-block-head">2 智能识别与分类</div>
        <div class="form-grid">
          <label>数据格式（自动识别）<input id="rfFormatsAuto" readonly placeholder="选择文件后自动汇总"></label>
          <label>数据大小（自动计算）<input id="rfSizeAuto" readonly placeholder="选择文件后自动计算"></label>
        </div>
        <label class="check-line" style="margin-top:12px"><input type="checkbox" id="rfSpatialToggle">识别为 GIS / 三维空间数据，填写一张图分类与空间字段</label>
        <div id="rfSpatialFields" hidden>
          <div class="form-grid">
            <label>空间数据类型<select id="rfSpatialType">${spatialTypes.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></label>
            <label>一张图一级分类<select id="rfMapCatalog">${mapCategories.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></label>
            <label>一张图目录路径<input id="rfMapPath" placeholder="例如：详细规划 / 控制性详细规划 / 用地规划"></label>
            <label>行政区域（自动识别）<input id="rfRegions" value="待按空间范围识别" readonly></label>
            <label>空间坐标系统<input id="rfCrs" placeholder="例如：EPSG:4490"></label>
            <label>空间覆盖范围<input id="rfExtent" placeholder="例如：115.98,29.72,116.02,29.76"></label>
            <label>测绘比例尺<input id="rfScale" placeholder="例如：1:500（非测绘数据可留空）"></label>
            <label>空间数据集 ID<input id="rfDatasetId" value="登记后自动生成" readonly></label>
          </div>
          <div class="ver-acts" style="margin-top:2px"><button type="button" class="btn sm" id="rfRegionBtn">按空间范围识别行政区</button><span class="form-note" id="rfRegionNote" style="margin:0">读取矢量坐标与覆盖范围，与行政区划边界做叠加分析。</span></div>
          <div class="form-note">一张图只存目录节点 ID，完整路径由父子关系生成；确认目录仅完成元数据分类，正式进一张图还需图层适配、权限校验与发布控制。</div>
        </div>
        <div class="form-label">数据简介（人工填写）</div>
        <textarea id="rfDesc" rows="3" class="form-area" placeholder="由登记人填写数据内容、覆盖范围、统计口径与使用限制；不使用 AI 自动生成。"></textarea>
        <div class="form-label">质检设置（可选）</div>
        <label class="check-line"><input type="checkbox" id="rfQcToggle">需要质检软件质检（可选，适用于普通数据、成果数据和数据服务）</label>
        <div id="rfQcWrap" hidden style="margin-top:8px">
          <label>质检软件<select id="rfQcSoftware"><option>规划成果质检系统</option><option>测绘成果质检系统</option><option>数据服务质检工具</option><option>其他（人工上传报告）</option></select></label>
        </div>
      </div>

      <div class="reg-block" id="rfKindFields" data-reg-step="2" hidden></div>

      <div class="reg-block" data-reg-step="3" hidden>
        <div class="reg-block-head">3 安全与授权</div>
        <div class="form-grid">
          <label>内部安全等级<select id="rfInternalLevel"><option>L1</option><option selected>L2</option><option>L3</option><option>L4</option><option>L5</option></select></label>
          <label>涉密属性<select id="rfSecrecy"><option>非涉密</option><option>待认定</option><option>秘密</option><option>机密</option><option>绝密</option></select></label>
          <label>授权类型<select id="rfAuthType"><option value="group">集团内部公开</option><option value="orgs">指定组织</option></select></label>
          <label>数据权属及使用依据<input id="rfRightsBasis" placeholder="例如：集团数据权属管理办法 / 项目合同"></label>
        </div>
        <div class="form-label">允许访问环境（申请）</div>
        <div class="check-row">${zones.map(([v, l]) => `<label class="check"><input type="checkbox" class="rf-zone" value="${v}" ${v === (state.boot.network?.id || 'inet') ? 'checked' : ''}>${esc(l)}</label>`).join('')}</div>
        <div id="rfOrgsWrap" hidden>
          <div class="form-label">授权组织（部门或子公司）</div>
          <div class="check-row">${orgOptions.map(([v, l]) => `<label class="check"><input type="checkbox" class="rf-org" value="${v}">${esc(l)}</label>`).join('')}</div>
        </div>
        <div class="form-note">员工申报、系统校验、有权人员批准。即使勾选互联网，也不等于可把内网数据直接发布到互联网；跨安全域须走独立安全审批与交换流程。</div>
        <div class="reg-sub-head">3.1 登记流程</div>
        <div class="reg-flow">
          <div class="reg-flow-step on"><i>1</i><span>部门负责人同意登记</span></div>
          <div class="reg-flow-step" id="rfQcStep"><i>2</i><span>质检软件质检</span></div>
          <div class="reg-flow-step"><i>3</i><span>数据管理员质量评估</span></div>
          <div class="reg-flow-step"><i>4</i><span>登记入库</span></div>
        </div>
        <div class="form-note" id="rfFlowNote"></div>
      </div>
    </div>
    <div class="form-foot"><span class="mono">网络：${esc(state.boot.network?.label || '')}（登记到本网目录）</span><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn" id="rfPrev" hidden>上一步</button><button class="btn primary" id="rfNext">下一步：智能识别与分类</button><button class="btn primary" id="rfSubmit" hidden>提交登记</button></div>`

  const mask = openModal('登记资源', body, { wide: true })
  mask.querySelectorAll('[data-mclose]').forEach((b) => b.addEventListener('click', () => mask.remove()))
  const q = (id) => mask.querySelector(`#${id}`)
  let wizardStep = 1
  function setWizardStep(step) {
    wizardStep = step
    mask.querySelectorAll('[data-reg-step]').forEach((el) => { el.hidden = Number(el.dataset.regStep) !== step })
    mask.querySelectorAll('[data-step-item]').forEach((el) => {
      const n = Number(el.dataset.stepItem)
      el.classList.toggle('on', n === step)
      el.classList.toggle('done', n < step)
    })
    q('rfPrev').hidden = step === 1
    q('rfNext').hidden = step === 3
    q('rfSubmit').hidden = step !== 3
    q('rfLead').hidden = step !== 1
    q('rfNext').textContent = step === 1 ? '下一步：智能识别与分类' : '下一步：安全与授权'
    mask.querySelector('.jg-modal-body').scrollTop = 0
  }
  const fmtSize = (n) => {
    if (!n && n !== 0) return '—'
    if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(1)} GB`
    if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(1)} MB`
    if (n >= 1024) return `${(n / 1024).toFixed(0)} KB`
    return `${n} B`
  }

  function selectedCloud() {
    return cloudItems.filter((it) => mask.querySelector(`.rf-cloud-check[value="${CSS.escape(it.id)}"]`)?.checked)
  }

  function extOf(f) {
    const m = String(f.name || f.path || '').match(/\.([a-z0-9]+)$/i)
    return m ? m[1].toUpperCase() : '未知'
  }

  function updateAutoMeta() {
    const selected = selectedCloud()
    let autoFormats = []
    let autoSize = ''
    if (sourceType === 'cloud') {
      autoFormats = [...new Set(selected.map((it) => String(it.type || 'file').toUpperCase()))]
      autoSize = selected.length ? `${selected.length} 个云空间对象 · ${selected.map((it) => it.size).join(' / ')}` : ''
    } else {
      autoFormats = [...new Set(files.map(extOf).filter((x) => x && x !== '未知'))]
      const total = files.reduce((sum, f) => sum + (Number(f.size) || 0), 0)
      autoSize = files.length ? `${files.length} 个文件 / ${fmtSize(total)}` : ''
    }
    if (kind === 'service') {
      const st = q('rfServiceType')?.value
      if (st) autoFormats = [st]
      autoSize = '不适用（数据服务）'
    }
    const fmtEl = q('rfFormatsAuto')
    const sizeEl = q('rfSizeAuto')
    if (fmtEl) fmtEl.value = autoFormats.join(' / ')
    if (sizeEl) sizeEl.value = autoSize
    if (kind === 'deliverable') {
      mask.querySelectorAll('.rf-format').forEach((c) => { if (autoFormats.includes(c.value)) c.checked = true })
    }
    const spatialFormats = ['SHP', 'GDB', 'GEOTIFF', 'GEOJSON', 'JSON', '3D TILES', 'LAS', 'PLY', 'OSGB']
    const autoSpatial = autoFormats.some((f) => spatialFormats.includes(f)) || (kind === 'pure' && ['gis', '3d'].includes(q('rfType')?.value))
    const toggle = q('rfSpatialToggle')
    if (toggle && autoSpatial) toggle.checked = true
    toggleSpatial()
  }

  function toggleSpatial() {
    const wrap = q('rfSpatialFields')
    if (wrap) wrap.hidden = !q('rfSpatialToggle')?.checked
  }

  let regionSeq = 0
  async function recognizeRegions() {
    const extent = q('rfExtent')?.value.trim() || ''
    const target = q('rfRegions')
    const note = q('rfRegionNote')
    if (!extent) {
      if (target) target.value = '待按空间范围识别'
      if (note) note.textContent = '请先提取或填写空间覆盖范围（minX,minY,maxX,maxY）。'
      return
    }
    const seq = ++regionSeq
    if (note) note.textContent = '正在读取矢量范围并与行政区划边界做叠加分析…'
    const { ok, body } = await api('/api/spatial/recognize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ extent }),
    })
    if (seq !== regionSeq) return
    if (!ok) {
      if (target) target.value = '未匹配到行政区划'
      if (note) note.textContent = body.error || '空间叠加分析未返回结果。'
      return
    }
    if (target) target.value = body.path
    if (note) {
      note.textContent = `${body.note} · 识别层级：${body.level}`
    }
  }

  function toggleAuthOrgs() {
    const wrap = q('rfOrgsWrap')
    if (wrap) wrap.hidden = q('rfAuthType')?.value !== 'orgs'
  }

  async function autoExtentFromFiles() {
    const geo = files.find((f) => /\.(geojson|json)$/i.test(f.name || ''))
    if (!geo) return false
    try {
      const json = JSON.parse(await geo.text())
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      const walkCoord = (c) => {
        if (!Array.isArray(c)) return
        if (typeof c[0] === 'number' && typeof c[1] === 'number') {
          minX = Math.min(minX, c[0]); maxX = Math.max(maxX, c[0])
          minY = Math.min(minY, c[1]); maxY = Math.max(maxY, c[1])
        } else c.forEach(walkCoord)
      }
      const walk = (node) => {
        if (!node || typeof node !== 'object') return
        if (node.type === 'FeatureCollection') { (node.features || []).forEach(walk); return }
        if (node.type === 'Feature') { walk(node.geometry); return }
        if (node.coordinates) { walkCoord(node.coordinates); return }
        if (node.geometry) walk(node.geometry)
      }
      walk(json)
      if (![minX, minY, maxX, maxY].every(Number.isFinite)) throw new Error('no coordinates')
      q('rfExtent').value = [minX, minY, maxX, maxY].map((n) => Number(n.toFixed(6))).join(',')
      await recognizeRegions()
      return true
    } catch {
      const note = q('rfRegionNote')
      if (note) note.textContent = 'GeoJSON 坐标读取失败；SHP / GDB 请由服务端 GDAL 解析覆盖范围。'
      return false
    }
  }

  function renderFiles() {
    const list = q('rfFileList')
    if (!list) return
    if (sourceType === 'cloud') {
      const sel = selectedCloud()
      list.innerHTML = sel.length
        ? `<div class="reg-file-sum">已选 ${sel.length} 个云空间对象</div>${sel.map((it) => `<div class="reg-file-row"><span class="reg-file-name">${esc(it.name)} · ${esc(String(it.type || 'file').toUpperCase())}</span><span>${esc(it.size)}</span></div>`).join('')}`
        : '<span class="mono">尚未选择云空间文件</span>'
      updateAutoMeta()
      return
    }
    list.innerHTML = files.length
      ? `<div class="reg-file-sum">共 ${files.length} 个文件 / ${files.some((f) => f.path) ? '文件夹' : '文件'}${files.some((f) => /\.(zip|7z|rar|tar|gz)$/i.test(f.name)) ? ' · 含压缩包' : ''}</div>${files.slice(0, 8).map((f) => `<div class="reg-file-row"><span class="reg-file-name">${esc(f.path || f.name)}</span><span>${fmtSize(f.size)}</span></div>`).join('')}${files.length > 8 ? `<div class="reg-file-more">另有 ${files.length - 8} 个文件未展开</div>` : ''}`
      : '<span class="mono">尚未选择文件；可选择单个文件、整个文件夹或压缩包</span>'
    updateAutoMeta()
  }

  function renderCloud() {
    const list = q('rfCloudList')
    if (!list) return
    list.innerHTML = cloudItems.length
      ? cloudItems.map((it) => `<label class="reg-cloud-row"><input type="checkbox" class="rf-cloud-check" value="${esc(it.id)}"><span class="reg-cloud-name">${esc(it.name)}</span><span class="reg-cloud-meta">${esc(String(it.type || 'file').toUpperCase())} · ${esc(it.size)} · ${esc(it.owner)}</span></label>`).join('')
      : '<span class="mono">当前空间暂无可选文件</span>'
    list.querySelectorAll('.rf-cloud-check').forEach((c) => c.addEventListener('change', renderFiles))
  }

  function setSource(src) {
    sourceType = src
    mask.querySelectorAll('#rfSourceSeg [data-src]').forEach((b) => b.classList.toggle('on', b.dataset.src === src))
    q('rfLocalPane').hidden = src !== 'local'
    q('rfCloudPane').hidden = src !== 'cloud'
    renderFiles()
  }

  function renderKindFields() {
    const zone = q('rfKindFields')
    if (kind === 'pure') {
      zone.innerHTML = `<div class="reg-sub-head">2.1 普通数据补充</div>
        <div class="form-grid">
          <label>技术类型<select id="rfType">${pureTypes.map((t) => `<option value="${t}"${t === 'document' ? ' selected' : ''}>${typeMap[t].label}</option>`).join('')}</select></label>
        </div>
        <div class="form-note">普通数据是单项数据；质检可在上方按需选择，未选择时由数据管理员在质量评估环节核对完整性、坐标系与可用性。</div>`
      const t = q('rfType')
      if (t) t.addEventListener('change', updateAutoMeta)
    } else if (kind === 'deliverable') {
      zone.innerHTML = `<div class="reg-sub-head">2.1 成果数据专属</div>
        <div class="form-grid">
          <label>成果资源 ID<input readonly value="提交后自动生成"></label>
          <label>内部数据 ID<input readonly value="按成果包结构自动生成"></label>
          <label>专业质检状态<input id="rfQcStatus" readonly value="未选择质检"></label>
          <label>质检报告关联<input id="rfQcReport" readonly value="未选择质检"></label>
          <label>包含格式<span class="reg-format-row">${formats.map((f) => `<label class="check"><input type="checkbox" class="rf-format" value="${esc(f)}">${esc(f)}</label>`).join('')}</span></label>
          <label class="check-line"><input type="checkbox" id="rfManifest" checked>包含成果清单与元数据说明</label>
          <label class="check-line"><input type="checkbox" id="rfBatch" checked>按分幅 / 分区批量登记</label>
        </div>
        <div class="reg-qc-panel"><span class="ico">${icon('shield')}</span><span>质检为可选项。如需质检，部门负责人同意后由质检软件执行完整性、坐标系、拓扑、属性与格式检查；质检结果绑定受检资源版本并回写详情。</span></div>`
      const spatialFormats = ['SHP', 'GDB', 'GeoTIFF', '3D Tiles', 'LAS', 'PLY', 'OSGB', 'DWG']
      mask.querySelectorAll('.rf-format').forEach((c) => c.addEventListener('change', () => {
        if (!c.checked || !spatialFormats.includes(c.value)) return
        const toggle = q('rfSpatialToggle')
        if (toggle) toggle.checked = true
        toggleSpatial()
      }))
    } else {
      zone.innerHTML = `<div class="reg-sub-head">2.1 数据服务专属</div>
        <div class="form-grid">
          <label>服务地址<input id="rfServiceUrl" placeholder="例如：https://map.jg.local/qgis/wms/city-plan"></label>
          <label>服务类型<select id="rfServiceType"><option>QGIS WMS</option><option>QGIS WFS</option><option>QGIS WMTS</option><option>OGC API</option><option>Cesium 3D Tiles</option><option>PostGIS 空间 API</option></select></label>
          <label>图层数量<input id="rfLayerCount" placeholder="例如：12"></label>
          <label>鉴权方式<select id="rfAuthMode"><option>统一网关票据</option><option>OAuth2 客户端凭证</option><option>内网 IP 白名单</option><option>无鉴权（仅内网）</option></select></label>
          <label>可用性 / SLA<input id="rfSla" placeholder="例如：99.5% / 200 ms"></label>
        </div>
        <div class="form-note">数据服务登记“发布一个地址”的形式；登记审批通过后进入服务目录，调用量、延迟与鉴权方式由服务网关回写。</div>`
      const st = q('rfServiceType')
      if (st) st.addEventListener('change', updateAutoMeta)
    }
    syncQc()
    updateAutoMeta()
  }

  function renderFlow() {
    const on = !!q('rfQcToggle')?.checked
    const qc = q('rfQcStep')
    if (qc) {
      qc.classList.toggle('off', !on)
      qc.querySelector('span').textContent = on ? '质检软件质检（可选）' : '质检软件质检（未选择）'
    }
    q('rfFlowNote').textContent = on
      ? '已选择质检：部门负责人先同意登记 → 质检软件质检 → 数据管理员质量评估 → 登记入库。'
      : '未选择质检：部门负责人先同意登记 → 数据管理员质量评估 → 登记入库。'
  }

  function syncQc() {
    const on = !!q('rfQcToggle')?.checked
    const wrap = q('rfQcWrap')
    if (wrap) wrap.hidden = !on
    const status = q('rfQcStatus')
    if (status) status.value = on ? '待质检' : '未选择质检'
    const report = q('rfQcReport')
    if (report) report.value = on ? '质检通过后回写' : '未选择质检'
    renderFlow()
  }

  mask.querySelectorAll('#rfSourceSeg [data-src]').forEach((b) => b.addEventListener('click', () => setSource(b.dataset.src)))
  mask.querySelectorAll('#rfKinds [data-kind]').forEach((b) => b.addEventListener('click', () => {
    kind = b.dataset.kind
    mask.querySelectorAll('#rfKinds [data-kind]').forEach((x) => x.classList.toggle('on', x === b))
    const spatialToggle = q('rfSpatialToggle')
    if (spatialToggle) spatialToggle.checked = false
    renderKindFields()
  }))
  q('rfFiles').addEventListener('change', async (e) => { files = [...files, ...Array.from(e.target.files)]; e.target.value = ''; renderFiles(); await autoExtentFromFiles() })
  q('rfFolder').addEventListener('change', async (e) => { files = [...files, ...Array.from(e.target.files)]; e.target.value = ''; renderFiles(); await autoExtentFromFiles() })
  q('rfZip').addEventListener('change', async (e) => { files = [...files, ...Array.from(e.target.files)]; e.target.value = ''; renderFiles(); await autoExtentFromFiles() })
  q('rfSpace').addEventListener('change', async (e) => {
    cloudSpace = e.target.value
    const { body: d } = await api('/api/drive?space=' + encodeURIComponent(cloudSpace))
    cloudItems = d.items || []
    renderCloud()
    updateAutoMeta()
  })
  q('rfQcToggle').addEventListener('change', syncQc)
  q('rfSpatialToggle').addEventListener('change', toggleSpatial)
  q('rfRegionBtn').addEventListener('click', recognizeRegions)
  q('rfExtent').addEventListener('change', recognizeRegions)
  q('rfAuthType').addEventListener('change', toggleAuthOrgs)

  renderKindFields()
  renderCloud()
  renderFiles()
  syncQc()
  toggleAuthOrgs()
  setWizardStep(1)

  q('rfPrev').addEventListener('click', () => setWizardStep(Math.max(1, wizardStep - 1)))
  q('rfNext').addEventListener('click', () => {
    if (wizardStep === 1 && !q('rfName').value.trim()) return toast('请先填写数据名称', true)
    setWizardStep(Math.min(3, wizardStep + 1))
  })

  q('rfSubmit').addEventListener('click', async () => {
    const name = q('rfName').value.trim()
    if (!name) return toast('请填写数据名称', true)
    const localFiles = files.map((f) => ({ name: f.name, path: f.webkitRelativePath || f.name, size: fmtSize(f.size), bytes: f.size }))
    const selectedCloud = [...mask.querySelectorAll('.rf-cloud-check:checked')].map((c) => cloudItems.find((it) => it.id === c.value)).filter(Boolean)
    const manifest = sourceType === 'cloud' ? selectedCloud.map((it) => ({ name: it.name, path: it.name, size: it.size, type: it.type })) : localFiles
    if (kind !== 'service' && !manifest.length) return toast('请先选择文件、文件夹、压缩包，或从云空间选择对象', true)
    const url = q('rfServiceUrl')?.value.trim() || ''
    if (kind === 'service' && !url) return toast('请填写数据服务地址', true)
    const autoFormats = (q('rfFormatsAuto').value || '').split(/\s*\/\s*/).filter(Boolean)
    const packageFormats = [...mask.querySelectorAll('.rf-format:checked')].map((c) => c.value)
    const formats = kind === 'deliverable' ? [...new Set([...autoFormats, ...packageFormats])] : kind === 'service' ? [q('rfServiceType').value] : autoFormats
    const spatialEnabled = !!q('rfSpatialToggle')?.checked
    if (spatialEnabled) {
      if (!q('rfExtent').value.trim()) return toast('请先填写空间覆盖范围，系统才能做空间叠加分析', true)
      if (!q('rfRegions').value.trim() || q('rfRegions').value.includes('待') || q('rfRegions').value.includes('未匹配')) return toast('行政区划尚未识别，请点击「按空间范围识别行政区」', true)
    }
    const spatial = spatialEnabled ? {
      enabled: true,
      type: q('rfSpatialType').value,
      typeLabel: q('rfSpatialType').selectedOptions[0]?.textContent?.trim() || q('rfSpatialType').value,
      mapCatalog: q('rfMapCatalog').value,
      mapPath: q('rfMapPath').value.trim(),
      regions: q('rfRegions').value.trim(),
      crs: q('rfCrs').value.trim(),
      extent: q('rfExtent').value.trim(),
      scale: q('rfScale').value.trim(),
    } : { enabled: false }
    const zones = [...mask.querySelectorAll('.rf-zone:checked')].map((c) => c.value)
    const authType = q('rfAuthType').value
    const orgs = authType === 'orgs' ? [...mask.querySelectorAll('.rf-org:checked')].map((c) => c.value) : []
    const type = kind === 'pure' ? q('rfType').value : kind === 'deliverable' ? 'deliverable' : 'service'
    const format = kind === 'pure' ? (autoFormats[0] || 'PDF') : kind === 'deliverable' ? '成果包（多格式）' : q('rfServiceType').value
    const size = q('rfSizeAuto').value || (manifest.length ? `${manifest.length} 个文件` : '—')
    const sizeBytes = localFiles.reduce((sum, f) => sum + (Number(f.bytes) || 0), 0)
    const spaceName = (driveSpaces.find((s) => s.id === cloudSpace) || {}).name || '企业云空间'
    const qcRequired = !!q('rfQcToggle')?.checked
    const { ok, body: res } = await api('/api/resources/register', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        kind,
        dataType: kind === 'pure' ? '普通数据' : kind === 'deliverable' ? '成果数据' : '数据服务',
        name,
        type,
        format,
        size,
        sizeBytes,
        sourceType,
        source: sourceType === 'cloud' ? `企业云空间 · ${spaceName}` : '本地上传',
        sourceRef: sourceType === 'cloud' ? selectedCloud.map((it) => it.id) : localFiles.map((f) => f.path),
        files: manifest,
        formats,
        manifest: kind === 'deliverable' ? !!q('rfManifest')?.checked : false,
        batch: kind === 'deliverable' ? !!q('rfBatch')?.checked : false,
        qcRequired,
        qcSoftware: qcRequired ? q('rfQcSoftware').value : '',
        businessCategory: q('rfDomain').value,
        originalSource: q('rfOriginalSource').value,
        dataDate: q('rfUploadAt').value,
        sourceOrg: sourceOrgName,
        dataOwner: user.name,
        keywords: [],
        caps: [],
        description: q('rfDesc').value.trim(),
        projectLinked: false,
        projectId: '',
        projectName: '',
        owner: sourceOrgName,
        producer: sourceOrgName,
        contact: user.name,
        internalLevel: q('rfInternalLevel').value,
        secrecy: q('rfSecrecy').value,
        zones,
        authorizationType: authType,
        authorizedOrgs: orgs,
        rightsBasis: q('rfRightsBasis').value.trim(),
        spatial,
        crs: spatial.crs || '',
        coverage: spatial.extent || '',
        serviceUrl: url,
        serviceType: kind === 'service' ? q('rfServiceType').value : '',
        layerCount: kind === 'service' ? Number(q('rfLayerCount')?.value || 0) : 0,
        authMode: kind === 'service' ? q('rfAuthMode').value : '',
        sla: kind === 'service' ? q('rfSla').value.trim() : '',
      }),
    })
    if (!ok) return toast(res.error || '登记失败', true)
    mask.remove()
    toast(`${res.item.id} 已提交，等待部门负责人同意`)
    state.view = 'datacenter'
    state.resourceType = 'all'
    state.resourceCategory = 'all'
    state.resourcePage = 1
    render()
    await openResource(res.item.id)
  })
}

/* ---- 空间框选 ---- */

function openSpatialPicker() {
  const body = `
    <div class="spatial-wrap">
      <div class="spatial-map" id="spMap">
        <div class="sp-grid"></div>
        <div class="sp-city">九江市域</div>
        <div class="sp-hint" id="spHint">在图上按住拖出矩形范围</div>
        <div class="sp-box" id="spBox" hidden></div>
      </div>
      <div class="spatial-side">
        <div class="form-label">检索范围</div>
        <div class="mono" id="spBbox" style="font-size:var(--fs-meta);color:var(--muted)">未选择</div>
        <div class="check-row" style="margin-top:10px">
          <button class="btn sm" data-preset="xy">浔阳区核心区</button>
          <button class="btn sm" data-preset="all">九江市域</button>
        </div>
        <div class="form-label" style="margin-top:14px">说明</div>
        <div class="space-note">只对已确认地理参考的 GIS / 三维 / 可靠坐标 CAD 建立空间索引；坐标不完整的图纸不参与，仅在结果中提示。</div>
        <div class="form-foot" style="margin-top:16px"><button class="btn primary" id="spRun">执行空间检索</button></div>
        <div id="spResult" class="sp-result"></div>
      </div>
    </div>`
  const mask = openModal('空间范围检索', body, { wide: true })
  const map = mask.querySelector('#spMap')
  const box = mask.querySelector('#spBox')
  const bboxEl = mask.querySelector('#spBbox')
  const bounds = { minLng: 115.80, minLat: 29.85, maxLng: 116.15, maxLat: 29.50 }
  let dragging = false
  let start = null
  let bbox = null

  const toGeo = (r) => {
    const minLng = bounds.minLng + r.x * (bounds.maxLng - bounds.minLng)
    const maxLng = bounds.minLng + (r.x + r.w) * (bounds.maxLng - bounds.minLng)
    const maxLat = bounds.minLat + r.y * (bounds.maxLat - bounds.minLat)
    const minLat = bounds.minLat + (r.y + r.h) * (bounds.maxLat - bounds.minLat)
    return [minLng, minLat, maxLng, maxLat]
  }
  const rectOf = (ev) => {
    const rc = map.getBoundingClientRect()
    return { x: (ev.clientX - rc.left) / rc.width, y: (ev.clientY - rc.top) / rc.height }
  }
  const draw = (r) => {
    box.hidden = false
    box.style.left = `${r.x * 100}%`
    box.style.top = `${r.y * 100}%`
    box.style.width = `${r.w * 100}%`
    box.style.height = `${r.h * 100}%`
  }
  map.addEventListener('pointerdown', (ev) => {
    ev.preventDefault()
    const p = rectOf(ev)
    dragging = true
    start = p
    draw({ x: p.x, y: p.y, w: 0, h: 0 })
  })
  window.addEventListener('pointermove', (ev) => {
    if (!dragging) return
    const p = rectOf(ev)
    const r = {
      x: Math.max(0, Math.min(start.x, p.x)),
      y: Math.max(0, Math.min(start.y, p.y)),
      w: Math.abs(p.x - start.x),
      h: Math.abs(p.y - start.y),
    }
    draw(r)
    bbox = toGeo(r)
    bboxEl.textContent = bbox.map((n) => n.toFixed(4)).join(', ')
  })
  window.addEventListener('pointerup', () => { dragging = false })

  mask.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => {
    const r = b.dataset.preset === 'xy' ? { x: 0.32, y: 0.30, w: 0.20, h: 0.22 } : { x: 0.02, y: 0.02, w: 0.96, h: 0.96 }
    draw(r)
    bbox = toGeo(r)
    bboxEl.textContent = bbox.map((n) => n.toFixed(4)).join(', ')
  }))

  mask.querySelector('#spRun').addEventListener('click', async () => {
    if (!bbox) return toast('请先在图上框选范围', true)
    const { ok, body: res } = await api(`/api/spatial?bbox=${bbox.map((n) => n.toFixed(4)).join(',')}`)
    if (!ok) return toast(res.error, true)
    mask.querySelector('#spResult').innerHTML = `
      <div class="sp-res-title">命中 ${res.items.length} 项</div>
      ${res.items.map((r) => `<div class="sp-res-row"><span class="name">${esc(r.name)}</span><span class="mono">${esc(r.id)}</span></div>`).join('') || '<div class="space-note">该范围内没有当前授权可命中的资源</div>'}
      <div class="space-note" style="margin-top:10px">${esc(res.note)}</div>`
    toast(`空间检索命中 ${res.items.length} 项`)
  })
}

/* ---- 影像卷帘对比 ---- */

async function openImageryCompare() {
  const { body } = await api('/api/imagery')
  const views = body.views
  const patches = body.patches
  const bodyHtml = `
    <div class="cmp-head">
      <span class="tag">${esc(views[0].label)} · ${esc(views[0].date)}</span>
      <span class="cmp-slider">卷帘</span>
      <span class="tag ok">${esc(views[1].label)} · ${esc(views[1].date)}</span>
      <span class="spacer"></span><span class="mono" style="color:var(--muted)">同视口 · 同分辨率</span>
    </div>
    <div class="cmp-stage" id="cmpStage">
      <div class="cmp-layer base"></div>
      <div class="cmp-layer top" id="cmpTop"></div>
      ${patches.map((p) => `<div class="cmp-patch" style="left:${p.x * 100}%;top:${p.y * 100}%;width:${p.w * 100}%;height:${p.h * 100}%"><span>${esc(p.label)}</span></div>`).join('')}
      <div class="cmp-handle" id="cmpHandle" style="left:50%"></div>
      <div class="cmp-label left">${esc(views[0].label)}</div>
      <div class="cmp-label right">${esc(views[1].label)}</div>
    </div>
    <div class="cmp-bar"><input type="range" id="cmpRange" min="0" max="100" value="50"><span class="mono" id="cmpVal">50%</span></div>
    <div class="cmp-legend">${patches.map((p) => `<span><i></i>${esc(p.label)} · ${esc(p.area)}</span>`).join('')}</div>
    <div class="space-note">对比只做浏览与初筛；变化图斑面积受影像时相、云量与配准影响，定量结论需专业复核。</div>`
  const mask = openModal('影像卷帘对比', bodyHtml, { wide: true })
  const top = mask.querySelector('#cmpTop')
  const handle = mask.querySelector('#cmpHandle')
  const range = mask.querySelector('#cmpRange')
  const val = mask.querySelector('#cmpVal')
  const apply = (v) => {
    top.style.clipPath = `inset(0 0 0 ${v}%)`
    handle.style.left = `${v}%`
    val.textContent = `${v}%`
  }
  range.addEventListener('input', (e) => apply(Number(e.target.value)))
  apply(50)

  let drag = false
  const onMove = (ev) => {
    if (!drag) return
    const rc = mask.querySelector('#cmpStage').getBoundingClientRect()
    const v = Math.min(100, Math.max(0, ((ev.clientX - rc.left) / rc.width) * 100))
    range.value = String(Math.round(v))
    apply(v)
  }
  mask.querySelector('#cmpStage').addEventListener('pointerdown', (ev) => { drag = true; onMove(ev) })
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', () => { drag = false })
}

/* ---- 应用 ---- */

async function openAppDetail(id) {
  const { body } = await api(`/api/app?id=${encodeURIComponent(id)}`)
  const a = body.item
  if (!a) return
  const slide = ensureSlide()
  const badge = { published: ['ok', '已发布'], review: ['warn', '审核中'], draft: ['', '草稿'] }[a.status]
  slide.innerHTML = `
    <div class="slide-head">
      <span class="app-ico">${icon(a.icon)}</span>
      <div><div class="slide-title">${esc(a.name)}</div><div class="slide-sub">${esc(a.dept)} · v${esc(a.version)}</div></div>
      <span class="spacer"></span><button class="btn subtle" data-close>${icon('close')}</button>
    </div>
    <div class="slide-body">
      <div style="display:flex;gap:6px;margin-bottom:14px"><span class="tag ${badge[0]}">${badge[1]}</span><span class="tag">${esc((a.nets || []).map((n) => NET_NAME[n]).join(' / '))}</span></div>
      <div class="field"><div class="field-label">功能说明</div><div class="field-value">${esc(a.desc)}</div></div>
      <div class="field"><div class="field-label">适用网络与使用范围</div><div class="field-value">${esc(a.usage)}</div></div>
      <div class="field"><div class="field-label">维护人</div><div class="field-value">${esc(a.maintainer)}</div></div>
      ${a.alert ? `<div class="notice warn">运行告警：${esc(a.alert)}</div>` : ''}
      <div class="field"><div class="field-label">版本记录</div><div class="field-value">${(a.history || []).map((h) => `<div class="timeline-row"><span class="mono">v${esc(h.version)} · ${esc(h.date)}</span><span>${esc(h.note)}</span></div>`).join('')}</div></div>
      <div class="notice neutral">启动方式：兼容时窗口内嵌入，否则新窗口打开；加载、登录与错误状态显式提示。</div>
    </div>
    <div class="slide-foot">
      <button class="btn primary" ${a.status !== 'published' ? 'disabled style="opacity:.5"' : ''} data-launch>启动应用</button>
      ${a.status !== 'published' ? '<button class="btn" data-pass>审核通过</button><button class="btn" data-reject>驳回</button>' : '<button class="btn" data-rollback>回滚上一版本</button><button class="btn" data-updver>更新版本</button><button class="btn" data-disable>下架</button>'}
    </div>`
  wireSlide(slide)
  slide.querySelector('[data-launch]')?.addEventListener('click', () => toast(`已启动「${a.name}」（演示：按网络环境决定嵌入或新窗口）`))
  const act = async (action) => {
    const { ok, body: res } = await api('/api/apps/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: a.id, action }) })
    if (!ok) return toast(res.error, true)
    toast('应用状态已更新')
    slide.classList.remove('open')
    renderView()
  }
  slide.querySelector('[data-pass]')?.addEventListener('click', () => act('approve'))
  slide.querySelector('[data-reject]')?.addEventListener('click', () => act('reject'))
  slide.querySelector('[data-rollback]')?.addEventListener('click', () => act('rollback'))
  slide.querySelector('[data-updver]')?.addEventListener('click', async () => {
    const v = prompt('新版本号（例如 1.4.1）', a.version)
    if (!v) return
    const { ok, body: res } = await api('/api/apps/version', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: a.id, action: 'update', version: v }) })
    if (!ok) return toast(res.error || '失败', true)
    toast(res.message)
    slide.classList.remove('open')
    renderView()
  })
  slide.querySelector('[data-disable]')?.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/apps/version', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: a.id, action: 'disable' }) })
    if (!ok) return toast(res.error || '失败', true)
    toast(res.message)
    slide.classList.remove('open')
    renderView()
  })
}

function openAppRegister() {
  const body = `
    <div class="form-note">提交后进入接入验证：URL 可达性、统一身份回调、权限声明、健康检查；未通过验证不得上线。</div>
    <div class="form-grid">
      <label>应用名称<input id="apName" placeholder="例如：项目进度看板"></label>
      <label>所属部门<input id="apDept" value="${esc(state.boot.user.unit)}"></label>
      <label>初始版本<input id="apVer" value="0.1.0"></label>
      <label>适用网络<span class="mono" style="padding-top:6px;display:block">${esc(state.boot.network?.label || '')}</span></label>
    </div>
    <div class="form-label">功能说明</div>
    <textarea id="apDesc" rows="3" class="form-area" placeholder="说明应用解决什么问题、面向哪些角色"></textarea>
    <div class="form-label">使用范围与限制</div>
    <textarea id="apUsage" rows="2" class="form-area" placeholder="例如：仅本部门使用，读取项目台账摘要"></textarea>
    <div class="form-foot"><span class="mono">提交人：${esc(state.boot.user.name)}</span><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="apSubmit">提交审核</button></div>`
  const mask = openModal('提交应用', body)
  mask.querySelectorAll('[data-mclose]').forEach((b) => b.addEventListener('click', () => mask.remove()))
  mask.querySelector('#apSubmit').addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/apps/register', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: mask.querySelector('#apName').value.trim() || '未命名应用',
        dept: mask.querySelector('#apDept').value,
        version: mask.querySelector('#apVer').value,
        desc: mask.querySelector('#apDesc').value,
        usage: mask.querySelector('#apUsage').value,
      }),
    })
    if (!ok) return toast(res.error, true)
    mask.remove()
    toast(`已提交「${res.item.name}」，进入接入验证与审核队列`)
    state.view = 'apps'
    render()
  })
}

/* ---- 自动化 ---- */

function openAutomationForm(idea) {
  const pre = idea || {}
  const body = `
    <div class="form-note">定时任务由系统 AI 按时执行：到点自动按指令运行一次，产出投递到你指定的位置，并生成一条执行记录。</div>
    <div class="form-grid">
      <label>名称<input id="auName" placeholder="例如：每日公示项目变更摘要" value="${esc(pre.name || '')}"></label>
      <label>频率<select id="auSch"><option>每天 08:30</option><option${pre.sch === '每周一 09:00' ? ' selected' : ''}>每周一 09:00</option><option${pre.sch === '每周五 17:00' ? ' selected' : ''}>每周五 17:00</option><option${pre.sch === '每季度首月 5 日' ? ' selected' : ''}>每季度首月 5 日</option><option${pre.sch === '每天 09:00' ? ' selected' : ''}>每天 09:00</option></select></label>
    </div>
    <div class="form-label">执行内容</div>
    <textarea id="auPrompt" rows="3" class="form-area" placeholder="写给 AI 的指令，例如：读取公示项目台账，比昨日快照，列出新增、变更与到期节点">${esc(pre.desc || '')}</textarea>
    <div class="form-foot"><span class="mono">写入类动作执行前仍需确认</span><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="auSubmit">创建</button></div>`
  const mask = openModal('新建定时任务', body)
  mask.querySelectorAll('[data-mclose]').forEach((b) => b.addEventListener('click', () => mask.remove()))
  mask.querySelector('#auSubmit').addEventListener('click', async () => {
    const { ok } = await api('/api/automations', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: mask.querySelector('#auName').value.trim() || '未命名定时任务', schedule: mask.querySelector('#auSch').value, prompt: mask.querySelector('#auPrompt').value.trim() }),
    })
    if (!ok) return toast('创建失败', true)
    mask.remove()
    toast('定时任务已创建，已加入已开启列表')
    state.view = 'tasks'
    renderView()
  })
}

/* ---- 工单 / 反馈 ---- */

function openTicketForm() {
  const body = `
    <div class="form-note">按网络环境分派；离职为高优先级，账号停用与会话终止必须留痕。</div>
    <div class="form-grid">
      <label>变动类型<select id="tkType"><option>入职</option><option>调岗</option><option>借调</option><option>离职</option></select></label>
      <label>网络环境<select id="tkNet"><option>互联网</option><option>政务网</option><option>涉密内网</option></select></label>
    </div>
    <div class="form-label">变动内容</div>
    <input id="tkSubject" class="form-area" placeholder="例如：王五 · 规划一所 · 助理规划师">
    <div class="form-foot"><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="tkSubmit">创建工单</button></div>`
  const mask = openModal('新建人员变动工单', body)
  mask.querySelectorAll('[data-mclose]').forEach((b) => b.addEventListener('click', () => mask.remove()))
  mask.querySelector('#tkSubmit').addEventListener('click', async () => {
    const { ok } = await api('/api/tickets', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        type: mask.querySelector('#tkType').value,
        net: mask.querySelector('#tkNet').value,
        subject: mask.querySelector('#tkSubject').value.trim() || '未填写',
      }),
    })
    if (!ok) return toast('创建失败：仅运维与管理角色可创建', true)
    mask.remove()
    toast('工单已创建，等待分派')
    renderView()
  })
}

function openFeedbackModal() {
  const body = `
    <div class="form-note">反馈会进入管理中心的反馈列表；缺陷类会关联当前会话与任务便于定位。</div>
    <div class="form-grid">
      <label>类型<select id="fbKind"><option>缺陷</option><option>建议</option><option>咨询</option></select></label>
      <label>关联对象<input id="fbApp" value="九规智能中枢 客户端"></label>
    </div>
    <div class="form-label">简述</div>
    <textarea id="fbSubject" rows="3" class="form-area" placeholder="描述遇到的问题或建议"></textarea>
    <div class="form-foot"><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="fbSubmit">提交反馈</button></div>`
  const mask = openModal('帮助与反馈', body)
  mask.querySelectorAll('[data-mclose]').forEach((b) => b.addEventListener('click', () => mask.remove()))
  mask.querySelector('#fbSubmit').addEventListener('click', async () => {
    const { ok } = await api('/api/feedback', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        kind: mask.querySelector('#fbKind').value,
        app: mask.querySelector('#fbApp').value,
        subject: mask.querySelector('#fbSubject').value.trim() || '未填写',
      }),
    })
    if (!ok) return toast('提交失败', true)
    mask.remove()
    toast('反馈已提交，可在管理中心跟踪处理状态')
  })
}

/* ------------------------------- audit ------------------------------ */

async function renderAuditDrawer() {
  let mask = document.getElementById('auditMask')
  let drawer = document.getElementById('auditDrawer')
  if (!drawer) {
    mask = document.createElement('div')
    mask.id = 'auditMask'
    mask.className = 'drawer-mask'
    drawer = document.createElement('div')
    drawer.id = 'auditDrawer'
    drawer.className = 'drawer'
    document.body.append(mask, drawer)
    mask.addEventListener('click', () => { state.auditOpen = false; mask.classList.remove('open'); drawer.classList.remove('open') })
  }
  const { body } = await api('/api/audit')
  drawer.innerHTML = `
    <div class="slide-head"><div><div class="slide-title">审计日志</div><div class="slide-sub">本网络独立保存 · 登录、查询、下载、写操作、权限调整</div></div>
      <span class="spacer"></span><button class="btn subtle" id="closeAudit">${icon('close')}</button></div>
    <div class="audit-list">
      ${body.items.map((a) => `<div class="audit-item">
        <div class="line1"><span class="op">${esc(a.action)}</span><span class="obj">${esc(a.object)}</span>
          <span class="spacer" style="flex:1"></span><span class="${a.result.startsWith('deny') ? 'res-deny' : 'res-allow'}">${esc(a.result)}</span></div>
        <div class="line2">${esc(a.time)} · ${esc(a.actor)} · ${esc(a.net)}</div>
      </div>`).join('')}
    </div>`
  drawer.querySelector('#closeAudit').addEventListener('click', () => {
    state.auditOpen = false
    drawer.classList.remove('open')
    mask.classList.remove('open')
  })
  requestAnimationFrame(() => { drawer.classList.add('open'); mask.classList.add('open') })
}

/* ------------------------------- render ----------------------------- */

const PANE_SPLITS = [
  { sel: '.sk-wrap', key: 'skills', min: 150, max: 900 },
  { sel: '.im-wrap', key: 'im', min: 150, max: 900 },
  { sel: '.mc-shell', key: 'admin', min: 150, max: 900 },
  { sel: '.nt-wrap', key: 'notice', min: 150, max: 900 },
  { sel: '.ac-wrap', key: 'academy', min: 150, max: 900 },
]

function installPaneSplitters() {
  PANE_SPLITS.forEach((cfg) => {
    document.querySelectorAll(cfg.sel).forEach((box) => {
      if (box.querySelector('.pane-splitter')) return
      const baseW = () => {
        const rootW = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pane-w'))
        return Number.isFinite(rootW) && rootW >= cfg.min ? Math.round(rootW) : paneWidthFor(Math.max(0, window.innerWidth - 58))
      }
      const initW = baseW()
      box.style.position = 'relative'
      box.style.removeProperty('--pane-w')
      const handle = document.createElement('div')
      handle.className = 'pane-splitter'
      handle.title = '拖动调整左右宽度 · 双击复位'
      box.appendChild(handle)
      let dragging = false
      let lastW = initW
      const apply = (w, persist) => {
        lastW = Math.round(Math.min(cfg.max, Math.max(cfg.min, w)))
        document.documentElement.style.setProperty('--pane-w', lastW + 'px')
        document.documentElement.style.setProperty('--sidebar-w', lastW + 'px')
        if (persist) localStorage.setItem(PANE_RATIO_KEY, String(lastW / Math.max(1, window.innerWidth - 58)))
      }
      handle.addEventListener('dblclick', () => {
        localStorage.removeItem(PANE_RATIO_KEY)
        const paneW = paneWidthFor(Math.max(0, window.innerWidth - 58))
        document.documentElement.style.setProperty('--pane-w', paneW + 'px')
        document.documentElement.style.setProperty('--sidebar-w', paneW + 'px')
      })
      handle.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return
        e.preventDefault()
        e.stopPropagation()
        const first = box.firstElementChild
        const startW = first ? first.getBoundingClientRect().width : baseW()
        const startX = e.clientX
        dragging = true
        lastW = startW
        handle.classList.add('on')
        document.body.style.userSelect = 'none'
        document.body.style.cursor = 'col-resize'
        const move = (ev) => { if (dragging) apply(startW + ev.clientX - startX, false) }
        const up = () => {
          if (!dragging) return
          dragging = false
          handle.classList.remove('on')
          document.body.style.userSelect = ''
          document.body.style.cursor = ''
          document.removeEventListener('pointermove', move)
          document.removeEventListener('pointerup', up)
          apply(lastW, true)
        }
        document.addEventListener('pointermove', move)
        document.addEventListener('pointerup', up)
      })
    })
  })
}

function render() {
  document.querySelectorAll('.account-pop, .rail-pop').forEach((p) => p.remove())
  window.__accountPop = null
  window.__morePop = null
  applyLayout()
  renderMenubar()
  renderRail()
  renderSidebar()
  renderTopbar()
  if (!cloudAllowed()) {
    if (state.cloudOpen) { state.cloudOpen = false; endAllCloudSessions() }
    document.getElementById('cbPanel')?.remove()
    document.getElementById('app')?.classList.remove('has-cloud')
    document.documentElement.style.setProperty('--cb-w', '0px')
  } else if (state.cloudOpen && !document.getElementById('cbPanel')) {
    ensureCloud().then(renderCloudPanel)
  }
  Promise.resolve(renderView()).catch((e) => {
    window.__viewErr = state.view + ': ' + e.message + ' @ ' + (e.stack || '').split('\n').slice(0, 4).join(' | ')
    const v = document.getElementById('view')
    v.innerHTML = '<div style="padding:24px;font-family:monospace;white-space:pre-wrap">VIEWERR ' + (window.__viewErr || '') + '</div>'
  })

  document.querySelectorAll('[data-nav]').forEach((btn) => {
    if (btn.closest('#railbar, #adminrail')) return
    btn.addEventListener('click', () => {
      if (btn.dataset.nav === 'more') { openMoreMenu(btn); return }
      if (btn.dataset.nav === 'imagegen' && !imageModel().image) { showImageGate(); return }
      state.view = btn.dataset.nav
      markModuleRead(btn.dataset.nav)
      render()
    })
  })

  const roleSwitcher = document.getElementById('roleSwitcher')
  roleSwitcher?.addEventListener('change', (e) => switchRole(e.target.value))
}

async function switchRole(roleId) {
  const { body } = await api('/api/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ role: roleId }),
  })
  if (!body.user) return
  await loadBoot()
  try { state.modelCfg = (await api('/api/model/config')).body } catch { state.modelCfg = {} }
  state.selectedResource = null
  state.cloud = null
  state.cloudTabs = [{ id: 'new', kind: 'new', title: '新标签页' }]
  state.cloudTab = 'new'
  if (state.cloudOpen) ensureCloud().then(renderCloudPanel)
  render()
  toast(`已切换为 ${body.user.name}（${body.user.label}），可见范围已按授权重算`)
}

async function main() {
  const w = Number(localStorage.getItem('jg.sidebarW'))
  const s = Number(localStorage.getItem('jg.setNavW'))
  const cw = Number(localStorage.getItem('jg.cbW'))
  const cp = Number(localStorage.getItem('jg.cbPaneW'))
  if (w >= 240 && w <= 400) state.sidebarWidth = w
  if (s >= 160 && s <= 360) state.setNavWidth = s
  if (cp >= 220 && cp <= 900) state.cbUserW = cp
  if (cp >= 220 && cp <= 900) state.cbUserW = cp
  if (cw >= 240 && cw <= 600) state.cbW = cw
  else localStorage.removeItem('jg.cbW')
  try {
    const mp = JSON.parse(localStorage.getItem('jg.morePinned') || '[]')
    if (Array.isArray(mp)) state.morePinned = mp.filter((id) => typeof id === 'string')
  } catch { state.morePinned = [] }
  await loadBoot()
  renderMenubar()
  render()
  const viewRoot = document.getElementById('view')
  if (viewRoot) {
    installPaneSplitters()
    new MutationObserver(() => installPaneSplitters()).observe(viewRoot, { childList: true, subtree: true })
  }
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's' && hasSidebarView()) {
      e.preventDefault()
      state.sbPinned = !state.sbPinned
      renderMenubar()
      render()
      return
    }
    if ((e.ctrlKey || e.metaKey) && e.key === ',') {
      e.preventDefault()
      state.view = 'settings'
      state.settingsTab = 'general'
      state.settingsQuery = ''
      render()
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      openSearchPalette('')
    }
    if (e.key === 'Escape') document.querySelectorAll('.account-pop').forEach((p) => p.remove())
  })
}

main().catch((e)=>{document.body.dataset.err=(e&&e.message)||String(e)})


/* ======================= 企业云 / 通讯录 / 即时通讯 ======================= */
const DOC_META = {
  pdf: { label: 'PDF', icon: 'doc', tone: 'pdf' },
  docx: { label: '文档', icon: 'doc', tone: 'docx' },
  xlsx: { label: '表格', icon: 'table', tone: 'xlsx' },
  pptx: { label: '演示', icon: 'layers', tone: 'pptx' },
  atlas: { label: '图集', icon: 'image', tone: 'atlas' },
  gdb: { label: '数据库', icon: 'database', tone: 'gdb' },
  shp: { label: '数据库', icon: 'database', tone: 'shp' },
  dwg: { label: '图纸', icon: 'cad', tone: 'dwg' },
  folder: { label: '文件夹', icon: 'folder', tone: 'folder' },
  file: { label: '文件', icon: 'doc', tone: 'docx' },
}

function openDocDialog(format) {
  document.querySelectorAll('.modal-mask').forEach((m) => m.remove())
  const meta = DOC_META[format] || DOC_META.docx
  const mask = document.createElement('div')
  mask.className = 'modal-mask'
  mask.innerHTML = `
    <div class="doc-dialog">
      <div class="dd-head"><span class="ico">${icon(meta.icon)}</span><div>
        <div class="dd-title">新建${meta.label}</div>
        <div class="dd-sub">由当前网络与授权数据生成，文件保存到企业云</div>
      </div><span class="spacer"></span><button class="dd-x" id="ddClose" title="关闭" aria-label="关闭">${icon('close')}</button></div>
      <label class="dd-field"><span>文件名称</span><input id="ddName" placeholder="例如：中心城区公示项目梳理"></label>
      <label class="dd-field"><span>内容要点</span><textarea id="ddBody" rows="5" placeholder="每行一条要点，可留空由系统按模板生成"></textarea></label>
      <div class="dd-foot"><span class="dd-hint">格式：${meta.label} · ${format}</span><span class="spacer"></span>
        <button class="dd-btn" id="ddCancel">取消</button>
        <button class="dd-btn primary" id="ddOk">生成并保存</button>
      </div>
    </div>`
  document.body.appendChild(mask)
  const close = () => mask.remove()
  mask.addEventListener('click', (e) => { if (e.target === mask) close() })
  mask.querySelector('#ddClose').addEventListener('click', close)
  mask.querySelector('#ddCancel').addEventListener('click', close)
  mask.querySelector('#ddOk').addEventListener('click', async () => {
    const title = mask.querySelector('#ddName').value.trim() || `未命名${meta.label}`
    const body = mask.querySelector('#ddBody').value.trim()
    const ok = mask.querySelector('#ddOk')
    ok.disabled = true
    ok.textContent = '生成中…'
    const { body: result } = await api('/api/docs/create', {
      method: 'POST',
      body: JSON.stringify({
        format,
        title,
        body: body || '一、总体情况\n二、数据与口径\n三、下一步工作',
        table: [['项目', '口径', '数值'], ['中心城区公示', '公示单位数', '86'], ['归并后分组', '按建设单位', '12'], ['过公示期', '2026-10', '3']],
        slides: [{ title, lines: body.split('\n').filter(Boolean).slice(0, 4) }, { title: '下一步工作', lines: ['补齐台账口径', '完成部门复核', '归档到企业云'] }],
      }),
    })
    if (result?.ok) {
      close()
      toast(`${title}.${format} 已生成，可在企业云查看与下载`)
      if (state.view === 'drive') renderView()
    } else {
      ok.disabled = false
      ok.textContent = '生成并保存'
      toast(result?.error || '生成失败')
    }
  })
  setTimeout(() => mask.querySelector('#ddName').focus(), 60)
}

async function renderDrive(el) {
  const PERSONAL_SPACE = { id: 'CL-PERSONAL', name: '个人云盘', kind: 'personal', title: '个人云盘', status: 'active', members: 1, total: PERSONAL_STORAGE.totalGB, used: storageUsedGB(), note: '个人云盘与智能笔记本共用每人 50GB' }
  const personal = state.driveSpace === 'CL-PERSONAL'
  const space = personal ? 'CL-DEPT' : (state.driveSpace || 'CL-DEPT')
  const { body } = await api('/api/drive?space=' + encodeURIComponent(space))
  const local = personal
    ? (state.personalFiles || [])
    : [...(state.driveFolders || []), ...(state.driveUploads || [])].filter((it) => it.space === space)
  const renamed = state.driveRenames || {}
  const items = personal ? [...local] : [...local, ...(body.items || [])]
  const itemsMapped = items.map((it) => renamed[it.id] ? { ...it, name: renamed[it.id] } : it)
  const quota = personal ? { used: storageUsedGB(), total: PERSONAL_STORAGE.totalGB } : (body.quota || {})
  if (!personal && quota.used) {
    const adj = (state.driveQuotaAdj || {})[space] || 0
    quota.used = Math.max(0, Math.round((quota.used - adj) * 10) / 10)
  }
  const filter = state.driveFilter || 'all'
  const q = state.driveQuery || ''
  const list = itemsMapped
    .filter((it) => (filter === 'all' ? true : filter === 'db' ? ['gdb', 'shp', 'dwg'].includes(it.type) : it.type === filter))
    .filter((it) => (q ? `${it.name}${it.owner}${it.dept}${(it.tags || []).join('')}`.includes(q) : true))
  const pct = Math.min(100, Math.round(((quota.used || 0) / (quota.total || 1)) * 100))
  const listPageSize = 10
  const listPages = Math.max(1, Math.ceil(list.length / listPageSize))
  const listPage = Math.min(Math.max(1, state.drivePage || 1), listPages)
  state.drivePage = listPage
  const pageItems = list.slice((listPage - 1) * listPageSize, listPage * listPageSize)
  const gbText = (n) => (n >= 1024 ? `${(n / 1024).toFixed(n % 1024 === 0 ? 0 : 1)} TB` : `${n} GB`)
  const isDoc = (t) => ['docx', 'xlsx', 'pptx', 'pdf'].includes(t)

  const spaces = [...(body.spaces || []), PERSONAL_SPACE]
  const cur = personal ? PERSONAL_SPACE : (body.space || {})
  const pending = cur.status === 'pending'
  el.innerHTML = `
  <div class="view-head">
    <div>
      <div class="view-title">云空间</div>
      <div class="view-desc">${cur.kind === 'personal' ? '个人云盘 · 与智能笔记本共用 50GB · 1 个账户' : `${cur.kind === 'team' ? '专班空间' : '部门空间'} · ${esc(cur.name || '')} · ${cur.members || 0} 人`}</div>
    </div>
  </div>
  <div class="cloud-switch">
    ${spaces.map((sp) => `<button class="cloud-pill ${sp.id === (cur.id || space) ? 'on' : ''}" data-space="${esc(sp.id)}">
      <span>${esc(sp.name)}</span><em>${sp.kind === 'team' ? '专班' : sp.kind === 'personal' ? '个人' : '部门'}${sp.status === 'pending' ? ' · 待审批' : ''}</em>
    </button>`).join('')}
    <button class="cloud-apply" id="cloudApply">${icon('plus')} 申请云空间</button>
  </div>
  ${pending ? `<div class="cloud-pending">
      <b>${esc(cur.name)} · 专班云</b>
      <span>申请已提交，审批通过后即可上传与共享。</span>
    </div>` : ''}
  <div class="drive-quota" ${pending ? 'hidden' : ''}>
    <div class="dq-ring" style="--p:${pct}"><span>${pct}%</span></div>
    <div class="dq-main">
      <div class="dq-title">${cur.kind === 'team' ? '专班' : cur.kind === 'personal' ? '个人' : '部门'}已用 ${quota.used} GB / 共 ${gbText(quota.total || 1024)}</div>
      <div class="dq-bar"><i style="width:${pct}%"></i></div>
      <div class="dq-note">${cur.kind === 'personal' ? `个人云盘 ${PERSONAL_STORAGE.cloudGB} GB · 智能笔记本 ${PERSONAL_STORAGE.notebookGB} GB · 合计 ${storageUsedGB()} GB` : `资料由${cur.kind === 'team' ? '专班' : '部门'}成员上传，上传者自动记录`}</div>
    </div>
  </div>
  <div class="drive-bar" ${pending ? 'hidden' : ''}>
    <div class="drive-tabs">
      ${[['all', '全部'], ['docx', '文档'], ['xlsx', '表格'], ['pptx', '演示'], ['pdf', 'PDF'], ['atlas', '图集'], ['db', '数据库']].map(([k, l]) => `<button class="drive-tab ${filter === k ? 'on' : ''}" data-dfilter="${k}">${l}</button>`).join('')}
    </div>
    <div class="drive-search"><span class="ico">${icon('search')}</span><input id="driveQ" placeholder="搜索文件、拥有者或部门" value="${esc(q)}"></div>
    <button class="drive-new" id="driveNew"><span class="ico">${icon('plus')}</span>新建</button>
    <input type="file" id="driveFilePick" hidden>
  </div>
  <div class="drive-list" ${pending ? 'hidden' : ''}>
    <div class="drive-row head">
      <span>名称</span><span>类型</span><span>上传者 / 共享</span><span>大小 / 更新</span><span></span>
    </div>
    ${pageItems.map((it) => `
      <div class="drive-row" data-dopen="${it.id}">
        <span class="dr-name"><span class="ico">${icon(DOC_META[it.type]?.icon || 'doc')}</span><span class="dr-title">${esc(it.name)}</span></span>
        <span class="dr-type-cell"><em class="dr-type ${DOC_META[it.type]?.tone || ''}">${esc(DOC_META[it.type]?.label || it.type)}</em></span>
        <span class="dr-who"><span class="dr-owner"><span class="nm">${esc(it.owner)}</span><small>${esc(it.dept)}</small></span><span class="dr-shareline">${esc(it.scope || '仅本人')} · ${esc((it.shared || []).slice(0, 2).join('、') || '本人')}</span></span>
        <span class="dr-meta">${esc(it.size)}<small>${esc(it.updated)}</small></span>
        <span class="dr-act">
          <button class="dr-more" data-dmore="${it.id}" title="更多操作" aria-label="更多操作">${icon('more')}</button>
        </span>
      </div>`).join('')}
    ${list.length ? '' : '<div class="empty">没有匹配的文件</div>'}
    <div class="ac-pager drive-pager" ${pending ? 'hidden' : ''}>
      ${listPages > 1 ? `<button class="ac-pg" data-dpage="${listPage - 1}" ${listPage <= 1 ? 'disabled' : ''}>上一页</button>
      ${pageSeq(listPage, listPages).map((p) => p === '…' ? '<span class="ac-pager-dots">…</span>' : `<button class="ac-pg num ${p === listPage ? 'on' : ''}" data-dpage="${p}">${p}</button>`).join('')}
      <button class="ac-pg" data-dpage="${listPage + 1}" ${listPage >= listPages ? 'disabled' : ''}>下一页</button>` : ''}
      <span class="ac-pager-info">每页最多 ${listPageSize} 条 · 共 ${list.length} 条</span>
    </div>
  </div>
  ${pending ? '' : `<div class="drive-note"><span class="ico">${icon('spark')}</span>${cur.kind === 'personal' ? '聊天附件保存到个人云存储后会出现在这里；个人云盘与智能笔记本共用 50GB，部门云空间与数据中心引用不占个人容量。' : '图集与数据库按元数据＋图层目录登记，AI 只读图层清单与坐标系。'}</div>`}`

  el.querySelectorAll('[data-space]').forEach((b) => b.addEventListener('click', () => { state.driveSpace = b.dataset.space; state.drivePage = 1; renderView() }))
  const applyBtn = el.querySelector('#cloudApply')
  if (applyBtn) applyBtn.addEventListener('click', () => {
    const mask = openModal('申请云空间', `
      <div class="form-note">专班跨部门组建时，可由专班负责人申请独立的工作云，与所在部门的云空间并列，在本模块左右切换。</div>
      <div class="form-row"><label>专班名称</label><input class="input" id="cloudName" placeholder="例如：城市更新专班" autocomplete="off"></div>
      <div class="form-row"><label>用途</label><input class="input" id="cloudUse" placeholder="例如：跨部门共享底图与成果" autocomplete="off"></div>
      <div class="form-foot"><span class="mono">额度默认 512 GB，审批通过后开通</span><span class="spacer"></span><button class="btn" data-cancel>取消</button><button class="btn primary" data-ok>提交申请</button></div>`)
    mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
    mask.querySelector('[data-ok]').addEventListener('click', async () => {
      const name = mask.querySelector('#cloudName').value.trim()
      const { ok, body: res } = await api('/api/drive/apply', { method: 'POST', body: JSON.stringify({ name, use: mask.querySelector('#cloudUse').value.trim() }) })
      mask.remove()
      if (!ok) return toast(res.error || '申请失败', true)
      toast(`已提交「${name}」专班云申请，待数据管理员审批`)
      renderView()
    })
  })
  el.querySelectorAll('[data-dfilter]').forEach((b) => b.addEventListener('click', () => { state.driveFilter = b.dataset.dfilter; state.drivePage = 1; renderView() }))
  const newBtn = el.querySelector('#driveNew')
  newBtn.addEventListener('click', (ev) => { ev.stopPropagation(); openDriveNewMenu(newBtn, el) })
  const filePick = el.querySelector('#driveFilePick')
  filePick.addEventListener('change', () => handleDriveUpload(filePick, el))
  const qInput = el.querySelector('#driveQ')
  qInput.addEventListener('input', () => { state.driveQuery = qInput.value })
  qInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { state.drivePage = 1; renderView() } })
  el.querySelectorAll('[data-dpage]').forEach((b) => b.addEventListener('click', () => {
    const p = Number(b.dataset.dpage)
    if (!Number.isFinite(p)) return
    state.drivePage = Math.min(Math.max(p, 1), listPages)
    renderView()
  }))
  el.querySelectorAll('[data-dmore]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    const it = items.find((x) => x.id === b.dataset.dmore)
    if (it) openDriveMoreMenu(it, b, el, spaces, personal)
  }))
  el.querySelectorAll('[data-dopen]').forEach((r) => r.addEventListener('click', (ev) => {
    if (ev.target.closest('button')) return
    const it = list.find((x) => x.id === r.dataset.dopen)
    if (!it) return
    if (it.type === 'folder') return toast('文件夹已打开（演示暂无内容）')
    if (it.local) return toast(`已选择「${it.name}」（演示上传文件，暂未接入预览）`)
    if (['atlas', 'db', 'gdb', 'shp', 'dwg'].includes(it.type)) openAssetCard(it.id)
    else openCloudPreview(it.id)
  }))
}

function driveNow() {
  return new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(/\//g, '-')
}

function placeDrivePop(pop, anchor) {
  const r = anchor.getBoundingClientRect()
  const w = pop.offsetWidth || 180
  const h = pop.offsetHeight || 160
  pop.style.left = `${Math.max(8, Math.min(window.innerWidth - w - 10, r.right - w))}px`
  pop.style.top = `${r.bottom + 5 + h > window.innerHeight ? Math.max(8, r.top - h - 5) : r.bottom + 5}px`
}

function closeDrivePops() { document.querySelectorAll('.drive-more-pop').forEach((p) => p.remove()) }

function openDriveNewMenu(anchor, el) {
  closeDrivePops()
  const pop = document.createElement('div')
  pop.className = 'drive-more-pop drive-new-pop'
  pop.innerHTML = `
    <button class="drive-more-item" data-nact="upload"><span class="ico">${icon('upload')}</span>上传文件</button>
    <button class="drive-more-item" data-nact="docx"><span class="ico">${icon('doc')}</span>新建 doc</button>
    <button class="drive-more-item" data-nact="xlsx"><span class="ico">${icon('table')}</span>新建 excel</button>
    <button class="drive-more-item" data-nact="pptx"><span class="ico">${icon('window')}</span>新建 ppt</button>
    <button class="drive-more-item" data-nact="folder"><span class="ico">${icon('folder')}</span>新建文件夹</button>`
  document.body.appendChild(pop)
  placeDrivePop(pop, anchor)
  pop.querySelectorAll('[data-nact]').forEach((b) => b.addEventListener('click', () => {
    const act = b.dataset.nact
    pop.remove()
    if (act === 'upload') { el.querySelector('#driveFilePick').click(); return }
    if (['docx', 'xlsx', 'pptx'].includes(act)) { openDocDialog(act); return }
    createDriveFolder()
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function createDriveFolder() {
  const mask = openModal('新建文件夹', `
    <div class="form-row"><label>文件夹名称</label><input class="input" id="drFolderName" placeholder="例如：2026 年成果归档" autocomplete="off"></div>
    <div class="form-foot"><span class="mono">创建在当前空间</span><span class="spacer"></span><button class="btn" data-cancel>取消</button><button class="btn primary" data-ok>创建</button></div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelector('[data-ok]').addEventListener('click', () => {
    const name = mask.querySelector('#drFolderName').value.trim()
    if (!name) return toast('请填写文件夹名称')
    const user = state.boot.user
    state.driveFolders = [...(state.driveFolders || []), {
      id: `FLD-${Date.now()}`, name, type: 'folder', size: '—', owner: user.name, dept: user.unit,
      updated: driveNow(), shared: [], scope: '仅本人', space: state.driveSpace || 'CL-DEPT', local: true,
    }]
    mask.remove()
    toast(`已创建文件夹「${name}」`)
    renderView()
  })
  setTimeout(() => mask.querySelector('#drFolderName').focus(), 60)
}

function handleDriveUpload(input, el) {
  const file = input.files && input.files[0]
  if (!file) return
  const ext = (file.name.split('.').pop() || '').toLowerCase()
  const type = ['docx', 'xlsx', 'pptx', 'pdf'].includes(ext) ? ext : 'file'
  const user = state.boot.user
  const size = file.size >= 1048576 ? `${(file.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`
  const personal = state.driveSpace === 'CL-PERSONAL'
  const addGB = file.size / (1024 ** 3)
  if (personal && storageUsedGB() + addGB > PERSONAL_STORAGE.totalGB) return toast('个人总云存储空间不足', true)
  if (personal) {
    PERSONAL_STORAGE.cloudGB = Math.round((PERSONAL_STORAGE.cloudGB + addGB) * 100) / 100
    state.personalFiles.unshift({
      id: `PF-${Date.now()}`, name: file.name, type, size, owner: user.name, dept: user.dept || '集团总部',
      updated: driveNow(), shared: ['本人'], scope: '仅本人', tags: ['个人云盘'], local: true,
    })
  } else {
    state.driveUploads = [...(state.driveUploads || []), {
      id: `UP-${Date.now()}`, name: file.name.replace(/\.[^.]+$/, ''), type, size, owner: user.name, dept: user.unit,
      updated: driveNow(), shared: [], scope: '仅本人', space: state.driveSpace || 'CL-DEPT', local: true,
    }]
  }
  input.value = ''
  toast(`已上传「${file.name}」`)
  renderView()
}

function openDriveMoreMenu(it, anchor, el, spaces, personal) {
  closeDrivePops()
  const docType = ['docx', 'xlsx', 'pptx'].includes(it.type)
  const main = it.type === 'folder' ? ['open', '打开', 'folder'] : docType ? ['edit', '协作编辑', 'pen'] : ['preview', '查看', 'window']
  const pop = document.createElement('div')
  pop.className = 'drive-more-pop'
  pop.innerHTML = `
    <button class="drive-more-item" data-dact="${main[0]}"><span class="ico">${icon(main[2])}</span>${main[1]}</button>
    <button class="drive-more-item" data-dact="share"><span class="ico">${icon('users')}</span>分享</button>
    <button class="drive-more-item" data-dact="download"><span class="ico">${icon('download')}</span>下载</button>
    <div class="drive-more-sep"></div>
    <button class="drive-more-item" data-dact="move"><span class="ico">${icon('folder')}</span>移动</button>
    <button class="drive-more-item" data-dact="rename"><span class="ico">${icon('pen')}</span>重命名</button>
    <button class="drive-more-item" data-dact="remove" style="color:#b2413b"><span class="ico" style="color:#b2413b">${icon('trash')}</span>删除</button>`
  document.body.appendChild(pop)
  placeDrivePop(pop, anchor)
  pop.querySelectorAll('[data-dact]').forEach((b) => b.addEventListener('click', () => {
    const act = b.dataset.dact
    pop.remove()
    if (act === 'open') { if (it.type === 'folder') return toast('文件夹已打开（演示暂无内容）'); return toast(`已打开「${it.name}」`) }
    if (act === 'edit') { if (it.local) return toast('演示上传文件暂不支持在线编辑'); return openDocEditor(it.id, true) }
    if (act === 'preview') { if (it.local) return toast('演示上传文件暂未接入预览'); return it.type === 'pdf' ? openCloudPreview(it.id) : openAssetCard(it.id) }
    if (act === 'share') { if (it.local) return toast('演示上传文件暂不支持共享'); return openShareCard(it.id, anchor) }
    if (act === 'download') {
      if (it.url) return window.open(it.url, '_blank')
      return toast('该文件暂无下载地址（演示）')
    }
    if (act === 'move') return openDriveMove(it, spaces, el)
    if (act === 'rename') return openDriveRename(it, el)
    if (act === 'remove') return openDriveDelete(it, el, personal)
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function openDriveRename(it, el) {
  const mask = openModal('重命名', `
    <div class="form-row"><label>名称</label><input class="input" id="drRename" value="${esc(it.name)}" autocomplete="off"></div>
    <div class="form-foot"><span class="mono">仅修改显示名称，文件内容与权限不变</span><span class="spacer"></span><button class="btn" data-cancel>取消</button><button class="btn primary" data-ok>保存</button></div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelector('[data-ok]').addEventListener('click', () => {
    const name = mask.querySelector('#drRename').value.trim()
    if (!name) return toast('名称不能为空')
    if (it.local) {
      for (const key of ['driveFolders', 'driveUploads']) {
        const list = state[key] || []
        const hit = list.find((x) => x.id === it.id)
        if (hit) hit.name = name
      }
    } else {
      state.driveRenames = { ...(state.driveRenames || {}), [it.id]: name }
    }
    mask.remove()
    toast('已重命名')
    renderView()
  })
  setTimeout(() => { const i = mask.querySelector('#drRename'); i.focus(); i.select() }, 60)
}

function openDriveDelete(it, el, personal) {
  const sizeGB = (() => {
    const m = String(it.size || '').match(/([\d.]+)\s*(GB|MB|KB)/i)
    if (!m) return 0
    const n = Number(m[1]) || 0
    return m[2].toUpperCase() === 'GB' ? n : m[2].toUpperCase() === 'MB' ? n / 1024 : n / (1024 ** 2)
  })()
  const mask = openModal('删除文件', `
    <div class="form-note">确定删除《${esc(it.name)}》？删除后释放对应容量，文件不可恢复；聊天记录中的原附件不受影响。</div>
    <div class="form-foot"><span class="mono">${personal ? '个人云盘容量将同步释放' : '部门 / 专班容量将同步释放'}</span><span class="spacer"></span><button class="btn" data-cancel>取消</button><button class="btn danger" data-ok>删除</button></div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelector('[data-ok]').addEventListener('click', async () => {
    if (it.local || personal || String(it.id).startsWith('PF-') || String(it.id).startsWith('TR-')) {
      state.personalFiles = (state.personalFiles || []).filter((x) => x.id !== it.id)
      state.driveUploads = (state.driveUploads || []).filter((x) => x.id !== it.id)
      state.driveFolders = (state.driveFolders || []).filter((x) => x.id !== it.id)
      if (personal) PERSONAL_STORAGE.cloudGB = Math.max(0, Math.round((PERSONAL_STORAGE.cloudGB - sizeGB) * 100) / 100)
      else {
        const key = it.space || state.driveSpace || 'CL-DEPT'
        state.driveQuotaAdj = { ...(state.driveQuotaAdj || {}) }
        state.driveQuotaAdj[key] = Math.round(((state.driveQuotaAdj[key] || 0) + sizeGB) * 100) / 100
      }
      mask.remove()
      toast('已删除，容量已释放')
      return renderView()
    }
    const { ok, body: res } = await api('/api/drive/delete', { method: 'POST', body: JSON.stringify({ id: it.id }) })
    if (!ok) return toast(res.error || '删除失败', true)
    const key = it.space || state.driveSpace || 'CL-DEPT'
    state.driveQuotaAdj = { ...(state.driveQuotaAdj || {}) }
    state.driveQuotaAdj[key] = Math.round(((state.driveQuotaAdj[key] || 0) + sizeGB) * 100) / 100
    mask.remove()
    toast('已删除，容量已释放')
    renderView()
  })
}

function openDriveMove(it, spaces, el) {
  const options = (spaces || []).map((s) => `<option value="${esc(s.id)}">${esc(s.name)}（${s.kind === 'team' ? '专班' : '部门'}空间）</option>`).join('')
  const mask = openModal('移动', `
    <div class="form-row"><label>目标空间</label><select class="input" id="drMoveSpace">${options}</select></div>
    <div class="form-foot"><span class="mono">移动到其他云空间后仍保留原权限</span><span class="spacer"></span><button class="btn" data-cancel>取消</button><button class="btn primary" data-ok>移动</button></div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelector('[data-ok]').addEventListener('click', () => {
    const sel = mask.querySelector('#drMoveSpace')
    const target = sel.options[sel.selectedIndex]?.text || ''
    mask.remove()
    toast(`已移动到「${target}」（演示）`)
  })
}

async function openImPreview(file) {
  if (file.itemId) {
    const { ok, body } = await api(`/api/drive/item?id=${encodeURIComponent(file.itemId)}`)
    if (ok && body.item) return openCloudPreview(file.itemId)
  }
  const meta = DOC_META[file.type] || DOC_META.docx
  const base = String(file.name || '').replace(/\.(docx|xlsx|pptx|pdf)$/i, '')
  const xlsx = file.type === 'xlsx'
  const mask = openModal(`预览 · ${meta.label}`, `
    <div class="pv-doc-stage">
      <div class="pv-doc-page">
        <div class="pv-doc-brand">九江市规划设计集团　${esc(state.boot.user.dept || state.boot.user.unit || '集团总部')}</div>
        <div class="pv-doc-title">${esc(base)}</div>
        <div class="pv-doc-sub">${esc(file.type)} · ${esc(file.size)} · ${file.online ? '在线文档' : '本地附件 · 云端临时副本 30 天'}</div>
        ${xlsx ? `<div class="pv-xl-grid">
          <div class="pv-xl-row head"><span class="pv-xl-rn"></span><span class="pv-xl-cell">A</span><span class="pv-xl-cell">B</span><span class="pv-xl-cell">C</span><span class="pv-xl-cell">D</span></div>
          ${[['项目名称', '类型', '面积（公顷）', '状态'], ['滨江片区控规调整', '控规', '128.4', '公示中'], ['十里片区中小学用地', '修规', '36.2', '公示中'], ['1958 厂区更新', '修规', '64.8', '已结束']].map((r, i) => `<div class="pv-xl-row${i === 0 ? ' head' : ''}"><span class="pv-xl-rn">${i + 1}</span>${r.map((c) => `<span class="pv-xl-cell">${esc(c)}</span>`).join('')}</div>`).join('')}
        </div>` : `<div class="pv-doc-body">
          <p>一、总体情况</p><p>本附件由聊天发送，仅保存在发送人本机；集团云端只保留 30 天临时副本，到期自动清理。</p>
          <p>二、数据与口径</p><p>如需长期保存或多人协作，可点击附件上的「转存」或「转为在线文档」。</p>
          <p>三、下一步工作</p><p>下载到本地后按现行版本归档，避免使用过期副本。</p>
        </div>`}
        <div class="pv-doc-foot">聊天附件预览 · 演示数据</div>
      </div>
    </div>`)
  return mask
}

async function openCloudPreview(id) {
  const { body } = await api(`/api/drive/item?id=${encodeURIComponent(id)}`)
  const it = body.item || {}
  const meta = DOC_META[it.type] || DOC_META.docx
  const base = String(it.name || '').replace(/\.[a-z]+$/i, '')

  const xlsxHTML = `
    <div class="pv-app pv-app-xlsx">
      <div class="pv-app-bar">
        <span class="pv-app-chip green">X</span>
        <span class="pv-app-file">${esc(it.name)}</span>
        <span class="spacer"></span>
        <span class="pv-app-tool">开始</span><span class="pv-app-tool">插入</span><span class="pv-app-tool">公式</span><span class="pv-app-tool">数据</span>
        <span class="spacer"></span>
        <span class="pv-app-mono">自动保存</span>
      </div>
      <div class="pv-xl-fx"><span class="pv-xl-name">C4</span><span class="pv-xl-mark">fx</span><span class="pv-xl-formula">=SUM(C3)</span></div>
      <div class="pv-xl-grid">
        <div class="pv-xl-row head"><span class="pv-xl-rn"></span><span class="pv-xl-cell">A</span><span class="pv-xl-cell">B</span><span class="pv-xl-cell">C</span><span class="pv-xl-cell">D</span><span class="pv-xl-cell">E</span></div>
        ${[
          ['项目名称', '类型', '面积（公顷）', '公示起始', '状态'],
          ['滨江片区控规调整', '控规', '128.4', '2026-11-06', '公示中'],
          ['十里片区中小学用地', '修规', '36.2', '2026-11-07', '公示中'],
          ['浔阳区老旧小区改造', '专项', '82.6', '2026-10-28', '已结束'],
          ['1958 厂区更新', '修规', '64.8', '2026-10-20', '已结束'],
          ['八里湖片区水系', '专项', '210.5', '2026-11-01', '公示中'],
          ['', '', '合计 522.5', '', ''],
        ].map((r, i) => `<div class="pv-xl-row${r[0] === '项目名称' ? ' head' : ''}"><span class="pv-xl-rn">${i + 1}</span>${r.map((c) => `<span class="pv-xl-cell">${esc(c)}</span>`).join('')}</div>`).join('')}
      </div>
      <div class="pv-xl-tabs"><span class="on">指标台账</span><span>口径说明</span><span>分项目</span></div>
      <div class="pv-xl-status">工作表 1/3　·　区域 A1:E7　·　就绪</div>
    </div>`

  const docxHTML = `
    <div class="pv-app pv-app-doc">
      <div class="pv-app-bar">
        <span class="pv-app-chip blue">W</span>
        <span class="pv-app-file">${esc(it.name)}</span>
        <span class="spacer"></span>
        <span class="pv-app-tool">开始</span><span class="pv-app-tool">插入</span><span class="pv-app-tool">审阅</span>
        <span class="spacer"></span>
        <span class="pv-app-mono">页面 1/3 · 100%</span>
      </div>
      <div class="pv-doc-stage">
        <div class="pv-paper">
          <div class="pv-doc-brand">九江市规划设计集团　规划一所</div>
          <div class="pv-doc-title">${esc(base)}</div>
          <div class="pv-doc-sub">内部资料　·　2026 年 11 月　·　编制：${esc(it.owner)}</div>
          <div class="pv-doc-body">
            <p>一、梳理范围。本表梳理中心城区范围内处于公示阶段及近三个月内完成公示的规划项目，共 12 项，覆盖控规调整、修建性详细规划与专项规划三类。</p>
            <p>二、主要变更。滨江片区控规调整将用地性质由商住混合调整为居住为主，商业占比由 35% 下调至 28%，同步配建幼儿园一处；十里片区中小学用地红线向东偏移 12 米，涉及 3 个地块，原结构指标不受影响。</p>
            <p>三、待确认事项。滨江片区配套设施的建筑面积口径尚未与审批科室对齐；老旧小区改造完成率的统计范围由中心城区扩大至市辖区，对外引用时需注明范围变化。</p>
            <p>四、下一步。由项目负责人本周内完成指标复核，成果图按新版红线重出，公示材料按市局模板重新排版后提交。</p>
          </div>
          <div class="pv-paper-foot">— 1 —</div>
        </div>
      </div>
    </div>`

  const pptxHTML = `
    <div class="pv-app pv-app-ppt">
      <div class="pv-app-bar">
        <span class="pv-app-chip orange">P</span>
        <span class="pv-app-file">${esc(it.name)}</span>
        <span class="spacer"></span>
        <span class="pv-app-tool">开始</span><span class="pv-app-tool">插入</span><span class="pv-app-tool">切换</span>
        <span class="spacer"></span>
        <span class="pv-app-mono">幻灯片 1/4</span>
      </div>
      <div class="pv-ppt-stage">
        <div class="pv-slide-canvas">
          <div class="pv-slide-brand">九规智能中枢 · 规划设计集团</div>
          <div class="pv-slide-title">${esc(base)}</div>
          <div class="pv-slide-line"></div>
          <div class="pv-slide-sub">规划一所　·　2026 年 11 月</div>
        </div>
      </div>
      <div class="pv-ppt-strip">
        ${['封面', '现状与问题', '方案要点', '实施分工'].map((s, i) => `<div class="pv-thumb${i === 0 ? ' on' : ''}"><span>${i + 1}</span><em>${esc(s)}</em></div>`).join('')}
      </div>
    </div>`

  const pdfHTML = `
    <div class="pv-app pv-app-pdf">
      <div class="pv-app-bar">
        <span class="pv-app-chip red">PDF</span>
        <span class="pv-app-file">${esc(it.name)}</span>
        <span class="spacer"></span>
        <span class="pv-app-tool">页面 1 / 4</span><span class="pv-app-tool">100%</span><span class="pv-app-tool">适合宽度</span>
      </div>
      <div class="pv-doc-stage">
        <div class="pv-paper pv-paper-pdf">
          <div class="pv-pdf-head">九江市自然资源和规划局</div>
          <div class="pv-pdf-no">九自然资规公示〔2026〕11 号</div>
          <div class="pv-doc-title">${esc(base)}</div>
          <div class="pv-doc-body">
            <p>根据《中华人民共和国城乡规划法》及有关规定，现将中心城区相关规划事项予以公示，征求利害关系人意见。</p>
            <p>一、公示时间：2026 年 11 月 6 日至 12 月 5 日，共 30 天。</p>
            <p>二、公示地点：市局门户网站、项目现场公示牌及属地街道办事大厅。</p>
            <p>三、意见反馈：公示期内可将书面意见送达市局规划管理科，或通过电子邮件反馈，并注明联系人及联系方式。</p>
          </div>
          <div class="pv-pdf-sign">九江市自然资源和规划局<br>2026 年 11 月 6 日</div>
          <div class="pv-paper-foot">1 / 4</div>
        </div>
      </div>
    </div>`

  const viewHTML = it.type === 'xlsx' ? xlsxHTML : it.type === 'pptx' ? pptxHTML : it.type === 'pdf' ? pdfHTML : docxHTML
  const mask = openModal('', `
    <div class="pv-head">
      <div>
        <div class="pv-name">${esc(it.name)}</div>
        <div class="pv-meta">${esc(meta.label)} · ${esc(it.size)} · ${esc(it.owner)} · ${esc(it.dept)} · 更新 ${esc(it.updated)}</div>
      </div>
      <span class="spacer"></span>
      <span class="tag">${esc(it.scope || '部门内')}</span>
    </div>
    ${viewHTML}
    <div class="form-foot"><span class="mono">预览为只读，原始文件以下载件为准</span><span class="spacer"></span>
      <button class="btn" data-dl2="${esc(it.name)}">下载</button>
      ${['docx', 'xlsx', 'pptx'].includes(it.type) ? `<button class="btn primary" data-edit2="${esc(it.id)}">在线编辑</button>` : ''}
      <button class="btn" data-cancel>关闭</button>
    </div>`, { wide: true })
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  const dl = mask.querySelector('[data-dl2]')
  if (dl) dl.addEventListener('click', () => toast(`已下载：${dl.dataset.dl2}（演示）`))
  const ed = mask.querySelector('[data-edit2]')
  if (ed) ed.addEventListener('click', () => { mask.remove(); openDocEditor(ed.dataset.edit2, true) })
}

async function openAssetCard(id) {
  const { body } = await api(`/api/drive/item?id=${encodeURIComponent(id)}`)
  const it = body.item || {}
  const meta = DOC_META[it.type] || DOC_META.docx
  const layers = ['用地边界', '道路中心线', '管线', '影像底图']
  const r = await api('/api/ai/invoke', { method: 'POST', body: JSON.stringify({ tool: 'drive_read', args: { id } }) })
  const read = r.body?.result || {}
  const mask = openModal(`${it.name}`, `
    <div class="asset-head"><span class="dr-type ${meta.tone}">${esc(it.typeLabel || meta.label)}</span><span class="asset-meta">${esc(it.dept)} · ${esc(it.owner)} · ${esc(it.size)} · 更新 ${esc(it.updated)}</span></div>
    <div class="asset-share">共享给 ${esc((it.shared || []).join('、') || '仅本人')} · ${esc(it.scope || '')}</div>
    <div class="asset-kv">
      <div><span>资产类别</span><b>${esc(read.family || meta.label)}</b></div>
      <div><span>坐标系</span><b>${esc(read.crs || 'CGCS2000')}</b></div>
      <div><span>范围</span><b>${esc(read.extent || '—')}</b></div>
      <div><span>图层</span><b>${esc((read.layers || layers).length)} 个</b></div>
    </div>
    <div class="asset-layers">${(read.layers || layers).map((l, i) => `<span class="asset-layer"><span class="mono">${String(i + 1).padStart(2, '0')}</span>${esc(l)}</span>`).join('')}</div>
    <div class="form-note">${esc(read.note || '查看图层与元数据；原始要素需按要素级授权审批后导出。')}</div>
    <div class="form-foot"><span class="mono">AI 已通过 drive_read 读取元数据</span><span class="spacer"></span><button class="btn" data-aclose>关闭</button></div>`, { wide: true })
  mask.querySelector('[data-aclose]').addEventListener('click', () => mask.remove())
}

async function openShareCard(id, anchor) {
  const { body } = await api('/api/contacts')
  const people = (body.items || []).filter((c) => c.name !== state.boot.user.name).slice(0, 6)
  const pop = document.createElement('div')
  pop.className = 'conv-menu share-menu'
  pop.innerHTML = `<div class="share-head">共享给</div>${people.map((c) => `<button class="cm-item" data-dto="${esc(c.name)}"><span class="avatar sm">${esc(c.name.slice(0, 1))}</span><span class="cm-label">${esc(c.name)}</span><span class="cm-key">${esc(c.dept)}</span></button>`).join('')}`
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${Math.max(8, Math.min(window.innerWidth - 280, r.left - 200))}px`
  pop.style.top = `${r.bottom + 6}px`
  pop.querySelectorAll('[data-dto]').forEach((b) => b.addEventListener('click', async () => {
    const { body: res } = await api('/api/drive/share', { method: 'POST', body: JSON.stringify({ id, to: b.dataset.dto }) })
    pop.remove()
    toast(res?.ok ? `已共享给 ${b.dataset.dto}，档案升级为共享${DOC_META[res.item?.type]?.label || '文档'}，双方均可在线编辑` : res?.error || '共享失败')
    if (res?.ok) renderView()
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

function contactsPageSize(el, total) {
  const grid = el.querySelector('.ct-grid')
  const cards = grid ? [...grid.querySelectorAll('.ct-card')] : []
  if (!grid || !cards.length) return Math.max(1, total)
  const cols = Math.max(1, getComputedStyle(grid).gridTemplateColumns.split(/\s+/).filter(Boolean).length)
  const gap = parseFloat(getComputedStyle(grid).rowGap) || 12
  const cardH = Math.max(...cards.map((c) => c.getBoundingClientRect().height))
  const viewRect = el.getBoundingClientRect()
  const gridTop = grid.getBoundingClientRect().top - viewRect.top + el.scrollTop
  const available = el.clientHeight - gridTop - 40
  const rows = Math.max(1, Math.floor((available + gap) / (cardH + gap)))
  return Math.max(1, rows * cols)
}

async function renderContacts(el) {
  const q = state.contactQuery || ''
  const { body } = await api(`/api/contacts?q=${encodeURIComponent(q)}`)
  const items = body.items || []
  const dept = state.contactDept || '全部'
  const list = items.filter((c) => (dept === '全部' ? true : c.dept === dept))
  const shell = (shown, pager) => `
  <div class="view-head">
    <div><div class="view-title">通讯录</div><div class="view-desc">${body.total || 0} 人</div></div>
  </div>
  <div class="ct-bar">
    <div class="ct-search"><span class="ico">${icon('search')}</span><input id="ctQ" placeholder="搜索姓名、岗位、部门或邮箱" value="${esc(q)}"></div>
    <div class="ct-tabs">${['全部', ...(body.depts || [])].map((d) => `<button class="drive-tab ${dept === d ? 'on' : ''}" data-cdept="${esc(d)}">${esc(d)}</button>`).join('')}</div>
  </div>
  <div class="ct-grid">
    ${shown.map((c) => `
      <div class="ct-card">
        <div class="avatar lg">${esc(c.name.slice(0, 1))}</div>
        <div class="ct-body">
          <div class="ct-name">${esc(c.name)} <small>${esc(c.duty)}</small></div>
          <div class="ct-meta">${esc(c.dept)} · ${esc(c.mail)}</div>
          <div class="ct-meta">${esc(c.phone)}</div>
        </div>
        <div class="ct-acts">
          <button class="dr-btn" data-call="${esc(c.name)}">呼叫</button>
          <button class="dr-btn primary" data-cim="${esc(c.name)}">发消息</button>
        </div>
      </div>`).join('')}
    ${list.length ? '' : '<div class="empty">没有匹配的人员</div>'}
  </div>
  ${pager}`
  el.innerHTML = shell(list, '')
  const pageSize = contactsPageSize(el, list.length)
  const pages = Math.max(1, Math.ceil(list.length / pageSize))
  const page = Math.min(Math.max(1, state.contactPage || 1), pages)
  state.contactPage = page
  const pageItems = list.slice((page - 1) * pageSize, page * pageSize)
  const pager = pages > 1 ? `<div class="ac-pager ct-pager">
    <button class="ac-pg" data-ctpage="${page - 1}" ${page <= 1 ? 'disabled' : ''}>上一页</button>
    ${pageSeq(page, pages).map((p) => p === '…' ? '<span class="ac-pager-dots">…</span>' : `<button class="ac-pg num ${p === page ? 'on' : ''}" data-ctpage="${p}">${p}</button>`).join('')}
    <button class="ac-pg" data-ctpage="${page + 1}" ${page >= pages ? 'disabled' : ''}>下一页</button>
    <span class="ac-pager-info">第 ${page} / ${pages} 页 · 共 ${list.length} 人</span>
  </div>` : ''
  el.innerHTML = shell(pageItems, pager)
  const qInput = el.querySelector('#ctQ')
  qInput.addEventListener('input', () => { state.contactQuery = qInput.value })
  qInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { state.contactPage = 1; renderView() } })
  el.querySelectorAll('[data-cdept]').forEach((b) => b.addEventListener('click', () => { state.contactDept = b.dataset.cdept; state.contactPage = 1; renderView() }))
  el.querySelectorAll('[data-ctpage]').forEach((b) => b.addEventListener('click', () => {
    const p = Number(b.dataset.ctpage)
    if (!Number.isFinite(p)) return
    state.contactPage = Math.min(Math.max(p, 1), pages)
    renderView()
  }))
  el.querySelectorAll('[data-call]').forEach((b) => b.addEventListener('click', () => toast(`正在呼叫 ${b.dataset.call}（演示）`)))
  el.querySelectorAll('[data-cim]').forEach((b) => b.addEventListener('click', () => {
    state.imTarget = b.dataset.cim
    state.view = 'im'
    render()
  }))
}

function imCloudContext(thread) {
  if (!thread) return { space: 'CL-DEPT', label: '部门云空间 · 规划一所', kind: 'dept' }
  if (thread.kind === 'direct') return { space: 'CL-PERSONAL', label: '个人云盘', kind: 'personal' }
  if (thread.space) return { space: thread.space, label: `专班云空间 · ${thread.spaceName || thread.name}`, kind: 'team' }
  return { space: 'CL-DEPT', label: `部门云空间 · ${thread.dept || '规划一所'}`, kind: 'dept' }
}

function openTransferPop(file, thread, anchor) {
  closeDrivePops()
  const ctx = imCloudContext(thread)
  const sharedSpace = ctx.kind === 'team' ? ctx.space : 'CL-DEPT'
  const sharedLabel = ctx.kind === 'team' ? ctx.label : `部门云空间 · ${thread?.dept || '规划一所'}`
  const targets = [
    { id: 'personal', title: '个人云盘', ic: 'cloud' },
    { id: 'shared', title: sharedLabel, ic: 'folder' },
  ]
  const pop = document.createElement('div')
  pop.className = 'drive-more-pop im-tr-pop'
  pop.innerHTML = `<div class="im-tr-title">转存到</div>${targets.map((t) => `<button type="button" class="drive-more-item" data-tr-target="${t.id}"><span class="ico">${icon(t.ic)}</span>${esc(t.title)}</button>`).join('')}`
  document.body.appendChild(pop)
  placeDrivePop(pop, anchor)
  const sizeGB = (() => {
    const m = String(file.size || '').match(/([\d.]+)\s*(GB|MB|KB)/i)
    if (!m) return 0
    const n = Number(m[1]) || 0
    return m[2].toUpperCase() === 'GB' ? n : m[2].toUpperCase() === 'MB' ? n / 1024 : n / (1024 ** 2)
  })()
  pop.querySelectorAll('[data-tr-target]').forEach((b) => b.addEventListener('click', () => {
    const target = b.dataset.trTarget
    pop.remove()
    if (target === 'personal') {
      state.personalFiles.unshift({
        id: 'PF-TR-' + Date.now(), name: file.name, type: (file.type || 'file'), size: file.size,
        owner: state.boot.user.name, dept: state.boot.user.dept || state.boot.user.unit || '集团总部',
        updated: driveNow(), shared: ['本人'], scope: '仅本人', tags: ['个人云盘', '转存'],
      })
      PERSONAL_STORAGE.cloudGB = Math.round((PERSONAL_STORAGE.cloudGB + sizeGB) * 100) / 100
      toast(`已转存到个人云盘`)
    } else {
      state.driveUploads = [...(state.driveUploads || []), {
        id: `TR-${Date.now()}`, name: file.name, type: (file.type || 'file'), size: file.size,
        owner: state.boot.user.name, dept: state.boot.user.dept || state.boot.user.unit || '集团总部',
        updated: driveNow(), shared: [ctx.kind === 'team' ? '专班成员' : '部门成员'],
        scope: ctx.kind === 'team' ? '专班可见' : '部门可见', space: sharedSpace, local: true, tags: ['云空间', '转存'],
      }]
      toast(`已转存到${sharedLabel}`)
    }
  }))
  setTimeout(() => document.addEventListener('click', function close(e) {
    if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close) }
  }), 0)
}

async function renderIM(el) {
  const { body } = await api('/api/im')
  const threads = body.items || []
  const activeId = state.imThread || threads[0]?.id
  const thread = threads.find((t) => t.id === activeId) || threads[0]
  const unread = threads.reduce((n, t) => n + (t.unread || 0), 0)
  if (state.imUnread !== unread) {
    state.imUnread = unread
    renderRail()
  }
  const tabDefs = [
    { id: 'chat', label: '聊天' },
    { id: 'files', label: '文件管理' },
    ...(thread?.dept ? [{ id: 'cloud', label: '云空间' }] : []),
    { id: 'search', label: '聊天记录' },
    ...(thread?.kind === 'group' ? [{ id: 'members', label: '人员管理' }] : []),
  ]
  const tab = tabDefs.some((t) => t.id === state.imTab) ? state.imTab : 'chat'
  const q = state.imQuery || ''

  let files = []
  let deptDocs = []
  let driveQuotaInfo = null
  if (tab === 'files') {
    const r = await api('/api/im/files')
    files = r.body.items || []
  }
  if (tab === 'cloud') {
    const dr = await api('/api/drive')
    deptDocs = dr.body.items || []
    driveQuotaInfo = dr.body.quota || null
  }
  let hits = []
  if (tab === 'search' && q) {
    const r = await api('/api/im/search?q=' + encodeURIComponent(q))
    hits = r.body.items || []
  }

  const lastText = (t) => {
    const m = t.messages[t.messages.length - 1]
    if (!m) return ''
    return m.file ? `【文件】${m.file.name}` : m.text
  }

  const chatPanel = `
      <div class="im-msgs" id="imMsgs">
        ${(thread?.messages || []).map((m) => `<div class="im-msg ${m.from === state.boot.user.name ? 'me' : ''} ${m.ai ? 'ai' : ''}">
          <span class="avatar xs">${m.ai ? icon('spark') : esc(m.from.slice(0, 1))}</span>
          <div class="im-bubble"><div class="im-from">${esc(m.from)} · ${esc(m.time)}${m.ai ? ' · 系统 AI' : ''}</div><div class="im-text">${esc(m.text)}</div>
          ${m.file ? `<div class="im-file${m.file.online ? ' online' : ''}" data-preview data-pname="${esc(m.file.name)}" data-ptype="${esc(m.file.type)}" data-psize="${esc(m.file.size)}" data-pitem="${esc(m.file.itemId || '')}" data-ponline="${m.file.online ? '1' : '0'}">
            <span class="im-file-ico">${icon('doc')}</span>
            <div class="im-file-main"><b>${esc(m.file.name)}</b><span>${esc(m.file.type)} · ${esc(m.file.size)}${m.file.online ? ' · 在线文档 · 长期保留' : ' · 附件 · 本机 + 云端临时 30 天'}</span></div>
            ${m.file.online
              ? `<span class="im-file-acts"><button class="btn subtle xs" data-dl="${esc(m.file.name)}">下载</button><button class="btn subtle xs" data-transfer data-tname="${esc(m.file.name)}" data-ttype="${esc(m.file.type)}" data-tsize="${esc(m.file.size)}">转存</button><button class="btn subtle xs" data-openfile="${esc(m.file.itemId)}">打开</button></span>`
              : m.file.itemId
                ? `<span class="im-file-acts"><button class="btn subtle xs" data-dl="${esc(m.file.name)}">下载</button><button class="btn subtle xs" data-transfer data-tname="${esc(m.file.name)}" data-ttype="${esc(m.file.type)}" data-tsize="${esc(m.file.size)}">转存</button><button class="btn subtle xs" data-online="${esc(m.file.itemId)}" data-tname="${esc(m.file.name)}" data-ttype="${esc(m.file.type)}" data-tsize="${esc(m.file.size)}">转为在线文档</button></span>`
                : `<span class="im-file-acts"><button class="btn subtle xs" data-dl="${esc(m.file.name)}">下载</button><button class="btn subtle xs" data-transfer data-tname="${esc(m.file.name)}" data-ttype="${esc(m.file.type)}" data-tsize="${esc(m.file.size)}">转存</button></span>`}
          </div>` : ''}</div>
        </div>`).join('')}
      </div>
      <div class="im-compose">
        <button class="icon-btn im-attach" id="imAttach" title="添加文件">${icon('plus')}</button>
        <textarea id="imText" rows="1" placeholder="输入消息，Enter 发送"></textarea>
        <button class="hc-send" id="imSend">${icon('up')}</button>
      </div>`

  const filesPanel = `
      <div class="im-panel">
        <div class="im-panel-head"><b>文件管理</b><span class="mono">${files.length} 个文件 · 来自全部会话</span></div>
        <div class="im-note">这里只列会话里上传的附件与升级后的在线文档：聊天附件只保留在发送人本机，集团云端仅存 30 天临时副本、到期自动清理；转为在线文档后长期保留。部门共享资料在「云空间」页。</div>
        <div class="im-panel-body">
          ${files.length ? files.map((f) => `
            <div class="im-file-row">
              <span class="im-file-ico">${icon('doc')}</span>
              <div class="im-file-main">
                <b>${esc(f.name)}</b>
                <span>${esc(f.threadName)} · ${esc(f.from)} · ${esc(f.time)} · ${esc(f.size)}</span>
              </div>
              <span class="tag ${f.online ? 'ok' : ''}">${f.online ? '在线文档 · 长期' : '附件 · 临时 30 天'}</span>
              ${f.online
                ? `<button class="btn subtle xs" data-transfer data-tname="${esc(f.name)}" data-ttype="${esc(f.type || 'file')}" data-tsize="${esc(f.size || '')}">转存</button><button class="btn subtle xs" data-openfile="${esc(f.itemId)}">打开</button>`
                : `<button class="btn subtle xs" data-dl="${esc(f.name)}">下载</button><button class="btn subtle xs" data-transfer data-tname="${esc(f.name)}" data-ttype="${esc(f.type || 'file')}" data-tsize="${esc(f.size || '')}">转存</button><button class="btn subtle xs" data-online="${esc(f.itemId)}" data-tname="${esc(f.name)}" data-ttype="${esc(f.type || 'file')}" data-tsize="${esc(f.size || '')}">转为在线文档</button>`}
            </div>`).join('') : '<div class="im-empty">这个会话还没有上传过文件。在聊天里点「＋」上传，或到「云空间」页把部门资料发送到本群。</div>'}
        </div>
      </div>`

  const cloudPanel = `
      <div class="im-panel">
        <div class="im-panel-head"><b>云空间 · ${esc(thread?.dept || '')}</b><span class="mono">${deptDocs.length} 项部门共享资料</span></div>
        <div class="im-note">${driveQuotaInfo ? `部门共享 1 TB · 已用 ${esc(String(driveQuotaInfo.used))} GB · ${esc(String(driveQuotaInfo.members))} 人共用` : ''}资料长期保留，发送到本群后仍按部门授权判定。</div>
        <div class="im-panel-body">
          ${deptDocs.length ? deptDocs.map((d) => `
            <div class="im-file-row">
              <span class="im-file-ico">${icon('doc')}</span>
              <div class="im-file-main">
                <b>${esc(d.name)}</b>
                <span>${esc(d.owner || '')} · ${esc(d.size || '')} · ${esc(d.updated || '')}</span>
              </div>
              <span class="tag">${esc(d.typeLabel || '云空间')}</span>
              <button class="btn subtle xs" data-senddoc="${esc(d.id)}">发送到会话</button>
            </div>`).join('') : '<div class="im-empty">云空间暂无资料。</div>'}
        </div>
      </div>`

  const roster = thread?.roster || []
  const autoMembers = Boolean(thread?.autoMembers)
  const membersPanel = thread?.kind === 'group' ? `
      <div class="im-panel">
        <div class="im-panel-head"><b>人员管理</b><span class="mono">${roster.length} 人${autoMembers ? ' · 人事自动匹配' : ' · 手动维护'}</span></div>
        ${autoMembers
          ? `<div class="im-note">部门工作群：成员由人事资料按任职部门自动匹配，入职、调岗、离职随时同步；如需变更请在人事系统调整，群里不能手工增减。</div>`
          : `<div class="im-note">自建群：成员由群主维护，可添加同事或移出成员；群主本人不可被移出。</div>`}
        <div class="im-panel-body">
          ${roster.map((r) => `<div class="im-mem-row">
            <span class="avatar sm">${esc(r.name.slice(0, 1))}</span>
            <div class="im-mem-main"><b>${esc(r.name)}</b><span>${esc(r.duty || '')}${r.dept ? ' · ' + esc(r.dept) : ''}</span></div>
            ${r.lead ? '<span class="tag ok">群主</span>' : ''}
            ${r.source === 'hr' ? '<span class="tag">人事同步</span>' : ''}
            ${!autoMembers && !r.lead
              ? `<button class="btn subtle xs" data-delmember="${esc(r.name)}">移出</button>`
              : ''}
          </div>`).join('')}
        </div>
        ${autoMembers ? '' : `<div class="im-panel-foot"><button class="btn sm" id="imAddMember">${icon('plus')} 添加成员</button></div>`}
      </div>` : ''

  const searchPanel = `
      <div class="im-panel">
        <div class="im-panel-head"><b>聊天记录</b><span class="mono">按关键词检索全部会话</span></div>
        <div class="im-note">文字消息跨网同步、长期保留；附件与文件名只在 30 天临时副本期内可检索。</div>
        <div class="im-panel-search"><span class="ico">${icon('search')}</span><input id="imSearch" placeholder="搜索聊天记录、文件名，例如：台账 / 影像 / 申请表" value="${esc(q)}"></div>
        <div class="im-panel-body">
          ${q ? (hits.length ? hits.map((h) => `
            <button class="im-hit" data-goto="${esc(h.threadId)}">
              <span class="im-hit-top"><b>${esc(h.threadName)}</b><span class="mono">${esc(h.from)} · ${esc(h.time)}</span></span>
              <span class="im-hit-text">${esc(h.text)}</span>
              ${h.file ? `<span class="im-hit-file">${icon('doc')}${esc(h.file.name)}</span>` : ''}
            </button>`).join('') : '<div class="im-empty">没有命中。换个关键词，或到「文件管理」按文件名找。</div>') : '<div class="im-empty">输入关键词检索聊天记录；支持消息正文与文件名。</div>'}
        </div>
      </div>`

  el.innerHTML = `
  <div class="im-wrap">
    <div class="im-left">
      <div class="im-left-head"><div><div class="im-left-title">即时通讯</div><div class="im-left-sub">${unread ? `${unread} 条未读` : ''}</div></div></div>
      <div class="im-search"><span class="ico">${icon('search')}</span><input id="imQ" placeholder="搜索联系人或群组"></div>
      ${threads.map((t) => `
        <button class="im-thread ${t.id === activeId ? 'on' : ''}" data-im="${t.id}">
          <span class="avatar sm">${esc(t.name.slice(0, 1))}</span>
          <span class="im-th-main"><span class="im-th-name">${esc(t.name)}</span><span class="im-th-last">${esc(lastText(t))}</span></span>
          <span class="im-th-meta"><span>${esc(t.time)}</span>${t.unread ? `<i class="im-badge">${t.unread}</i>` : ''}</span>
        </button>`).join('')}
    </div>
    <div class="im-right">
      <div class="im-head">
        <div class="im-h-main"><div class="im-h-name">${esc(thread?.name || '')}</div><div class="im-h-meta">${thread?.kind === 'group' ? `${thread.members} 人 · 群聊` : '单聊'}</div></div>
        <div class="im-head-acts">
          <button class="icon-btn im-more" id="imMore" title="更多功能" aria-haspopup="true" aria-expanded="false">${icon('dots')}</button>
          <div class="im-menu" id="imMenu" hidden>
            ${tabDefs.map((t) => `<button type="button" class="im-menu-item ${tab === t.id ? 'on' : ''}" data-imtab="${t.id}"><span>${t.label}</span>${tab === t.id ? '<span class="im-menu-check">✓</span>' : ''}</button>`).join('')}
          </div>
        </div>
      </div>
      ${tab === 'files' ? filesPanel : tab === 'cloud' ? cloudPanel : tab === 'search' ? searchPanel : tab === 'members' ? membersPanel : chatPanel}
    </div>
  </div>`

  el.querySelectorAll('[data-im]').forEach((b) => b.addEventListener('click', () => {
    state.imThread = b.dataset.im
    state.imTab = 'chat'
    renderView()
  }))
  el.querySelectorAll('[data-imtab]').forEach((b) => b.addEventListener('click', () => {
    state.imTab = b.dataset.imtab
    renderView()
  }))

  const imMore = el.querySelector('#imMore')
  const imMenu = el.querySelector('#imMenu')
  if (imMore && imMenu) {
    const closeMenu = () => {
      imMenu.hidden = true
      imMore.setAttribute('aria-expanded', 'false')
    }
    imMore.addEventListener('click', (ev) => {
      ev.stopPropagation()
      const willOpen = imMenu.hidden
      imMenu.hidden = !willOpen
      imMore.setAttribute('aria-expanded', String(willOpen))
    })
    imMenu.querySelectorAll('[data-imtab]').forEach((b) => b.addEventListener('click', closeMenu))
    setTimeout(() => document.addEventListener('click', function outside(ev) {
      if (!imMenu.contains(ev.target) && !imMore.contains(ev.target)) {
        closeMenu()
        document.removeEventListener('click', outside)
      }
    }), 0)
  }

  const box = el.querySelector('#imMsgs')
  if (box) box.scrollTop = box.scrollHeight

  // 文件：转为在线文档 / 转存 / 打开
  el.querySelectorAll('[data-online]').forEach((b) => b.addEventListener('click', async (ev) => {
    ev.stopPropagation()
    const ctx = imCloudContext(thread)
    const { ok, body: res } = await api('/api/im/online', { method: 'POST', body: JSON.stringify({ itemId: b.dataset.online, threadId: thread.id, space: ctx.space }) })
    if (!ok) return toast(res.error || '转换失败', true)
    if (ctx.kind === 'personal' && !state.personalFiles.some((f) => f.id === b.dataset.online)) {
      state.personalFiles.unshift({
        id: b.dataset.online, name: b.dataset.tname || res.item?.name || '在线文档',
        type: b.dataset.ttype || res.item?.type || 'docx', size: b.dataset.tsize || '',
        owner: state.boot.user.name, dept: state.boot.user.dept || state.boot.user.unit || '集团总部',
        updated: driveNow(), shared: ['本人'], scope: '仅本人', tags: ['个人云盘', '在线文档'], online: true,
      })
    }
    toast(`已转为在线文档，保存到${ctx.label}`)
    renderView()
  }))
  el.querySelectorAll('[data-transfer]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    openTransferPop({ name: b.dataset.tname, type: b.dataset.ttype || 'file', size: b.dataset.tsize || '' }, thread, b)
  }))
  el.querySelectorAll('[data-dl]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    toast(`已下载到本地：${b.dataset.dl}（云端临时副本到期清理，本机文件不受影响）`)
  }))
  el.querySelectorAll('[data-senddoc]').forEach((b) => b.addEventListener('click', async (ev) => {
    ev.stopPropagation()
    const { ok, body: res } = await api('/api/im/attach', { method: 'POST', body: JSON.stringify({ id: thread.id, itemId: b.dataset.senddoc }) })
    if (!ok) return toast(res.error || '发送失败', true)
    toast('已把云空间文件发送到本群（附件 30 天内可下载）')
    renderView()
  }))
  el.querySelectorAll('[data-delmember]').forEach((b) => b.addEventListener('click', async (ev) => {
    ev.stopPropagation()
    const { ok, body: res } = await api('/api/im/member', { method: 'POST', body: JSON.stringify({ id: thread.id, action: 'remove', name: b.dataset.delmember }) })
    if (!ok) return toast(res.error || '移出失败', true)
    toast(`${b.dataset.delmember} 已移出群聊`)
    renderView()
  }))
  const addMem = el.querySelector('#imAddMember')
  if (addMem) addMem.addEventListener('click', async () => {
    const { body: cr } = await api('/api/contacts')
    const pool = (cr.items || []).filter((c) => !(thread.roster || []).some((r) => r.name === c.name))
    const mask = openModal('添加成员', `<div class="lib-list">
      ${pool.map((c) => `<button class="lib-row" data-addmem="${esc(c.name)}">
        <span class="ico">${icon('users')}</span>
        <span class="lib-name">${esc(c.name)}</span>
        <span class="lib-meta">${esc(c.duty)} · ${esc(c.dept)}</span>
      </button>`).join('')}
    </div>`, { wide: true })
    mask.querySelectorAll('[data-addmem]').forEach((x) => x.addEventListener('click', async () => {
      const { ok, body: res } = await api('/api/im/member', { method: 'POST', body: JSON.stringify({ id: thread.id, action: 'add', name: x.dataset.addmem }) })
      mask.remove()
      if (!ok) return toast(res.error || '添加失败', true)
      toast(`${x.dataset.addmem} 已加入群聊`)
      renderView()
    }))
  })
  el.querySelectorAll('[data-preview]').forEach((card) => card.addEventListener('click', (ev) => {
    if (ev.target.closest('button')) return
    openImPreview({
      name: card.dataset.pname, type: card.dataset.ptype, size: card.dataset.psize,
      itemId: card.dataset.pitem, online: card.dataset.ponline === '1',
    })
  }))
  el.querySelectorAll('[data-openfile]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    openDocEditor(b.dataset.openfile, true)
  }))

  // 搜索
  const sInput = el.querySelector('#imSearch')
  if (sInput) {
    sInput.addEventListener('input', debounce((e) => {
      state.imQuery = e.target.value
      renderView()
      const next = document.getElementById('imSearch')
      if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length) }
    }, 280))
  }
  el.querySelectorAll('[data-goto]').forEach((b) => b.addEventListener('click', () => {
    state.imThread = b.dataset.goto
    state.imTab = 'chat'
    renderView()
  }))

  // 发送
  const input = el.querySelector('#imText')
  if (input) {
    const send = async () => {
      const text = input.value.trim()
      if (!text) return
      const { body: res } = await api('/api/im/send', { method: 'POST', body: JSON.stringify({ id: thread.id, text }) })
      if (res?.ok) { input.value = ''; renderView() } else toast(res?.error || '发送失败')
    }
    el.querySelector('#imSend').addEventListener('click', send)
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } })
    el.querySelector('#imAttach').addEventListener('click', (ev) => {
      ev.stopPropagation()
      openImComposeMenu(thread, input, el.querySelector('#imAttach'))
    })
    input.addEventListener('input', () => {
      const v = input.value
      const m = v.match(/@([^@\s]*)$/)
      if (m) { state.imAtHint = true; openAtHint(input, thread, m[1]) } else state.imAtHint = false
    })
    setTimeout(() => input.focus(), 40)
  }
}

function openImComposeMenu(thread, input, anchor) {
  document.querySelectorAll('.im-plus-pop').forEach((p) => p.remove())
  const pop = document.createElement('div')
  pop.className = 'conv-menu im-plus-pop'
  pop.innerHTML = [
    ['file', 'doc', '本地文件', '从电脑选择'],
    ['cloud', 'cloud', '云空间', '选部门共享资料'],
    ['shot', 'window', '截图', '截当前窗口'],
    ['ai', 'spark', '问智能助手', '分析会话文档'],
  ].map(([k, ic, label, desc]) => `<button class="cm-item im-plus-item" data-imp="${k}">
      <span class="ico">${icon(ic)}</span>
      <span class="cm-label">${label}</span>
      <span class="cm-key">${desc}</span>
    </button>`).join('')
  document.body.appendChild(pop)
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${r.left - 6}px`
  pop.style.top = 'auto'
  pop.style.bottom = `${window.innerHeight - r.top + 8}px`
  const close = (e) => { if (!pop.contains(e.target) && e.target !== anchor) { pop.remove(); document.removeEventListener('click', close) } }
  setTimeout(() => document.addEventListener('click', close), 0)

  pop.querySelector('[data-imp="cloud"]').addEventListener('click', () => { pop.remove(); openImAttach(thread) })
  pop.querySelector('[data-imp="ai"]').addEventListener('click', () => { pop.remove(); openImAiDialog(thread) })
  pop.querySelector('[data-imp="file"]').addEventListener('click', () => {
    pop.remove()
    const pick = document.createElement('input')
    pick.type = 'file'
    pick.addEventListener('change', async () => {
      const f = pick.files && pick.files[0]
      if (!f) return
      const ext = (f.name.split('.').pop() || 'docx').toLowerCase()
      const size = f.size > 1048576 ? `${(f.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`
      const { ok, body: res } = await api('/api/im/send', { method: 'POST', body: JSON.stringify({ id: thread.id, text: `发送了文件：${f.name}`, file: { itemId: '', name: f.name, type: ext, size } }) })
      if (!ok) return toast(res.error || '发送失败', true)
      toast('已发送到会话；附件仅存本机，云端临时副本 30 天')
      renderView()
    })
    pick.click()
  })
  pop.querySelector('[data-imp="shot"]').addEventListener('click', async () => {
    pop.remove()
    const d = new Date()
    const t = `${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`
    const { ok, body: res } = await api('/api/im/send', { method: 'POST', body: JSON.stringify({ id: thread.id, text: '发送了截图', file: { itemId: '', name: `窗口截图-${t}.png`, type: 'png', size: '320 KB' } }) })
    if (!ok) return toast(res.error || '发送失败', true)
    toast('已发送截图（演示）')
    renderView()
  })
}

function openAtHint(input, thread, prefix) {
  document.querySelectorAll('.im-at-hint').forEach((x) => x.remove())
  const people = (thread?.roster || []).filter((r) => r.name !== state.boot.user.name)
  const list = people.filter((r) => !prefix || r.name.includes(prefix)).slice(0, 8)
  if (!list.length) return
  const hint = document.createElement('div')
  hint.className = 'im-at-hint'
  hint.innerHTML = list.map((r) => `<button class="im-at-row" data-mention="${esc(r.name)}">
      <span class="avatar xs">${esc(r.name.slice(0, 1))}</span>
      <span class="nm">${esc(r.name)}</span>
      <span class="key">${esc(r.duty || '')}${r.dept ? ' · ' + esc(r.dept) : ''}</span>
    </button>`).join('')
  document.body.appendChild(hint)
  const r = input.getBoundingClientRect()
  hint.style.left = `${r.left + 40}px`
  hint.style.bottom = `${window.innerHeight - r.top + 8}px`
  hint.querySelectorAll('[data-mention]').forEach((b) => b.addEventListener('click', () => {
    input.value = input.value.replace(/@([^@\s]*)$/, '@' + b.dataset.mention + ' ')
    state.imAtHint = false
    hint.remove()
    input.focus()
  }))
  setTimeout(() => document.addEventListener('click', function off(e) {
    if (!hint.contains(e.target)) { hint.remove(); document.removeEventListener('click', off); state.imAtHint = false }
  }), 0)
}

function openImAiDialog(thread) {
  const docs = (thread?.messages || []).filter((m) => m.file).map((m) => m.file)
  if (!docs.length) return toast('本会话还没有文件：先用「＋」发一份，再让智能助手分析', true)
  const mask = openModal('让智能助手分析', `
    <div class="form-note">勾选要分析的文件（可多选），可附一句关注点。智能助手只读本会话内出现过的文件。</div>
    <div class="im-pick">
      ${docs.map((f, i) => `<label class="im-pick-row im-ai-row" data-ai="${esc(f.name)}">
        <input type="checkbox" class="im-ai-check" style="margin-right:2px">
        <span class="im-file-ico">${icon('doc')}</span>
        <span class="im-file-main"><b>${esc(f.name)}</b><span>${esc(f.type)} · ${esc(f.size)}</span></span>
      </label>`).join('')}
    </div>
    <div class="form-row" style="margin-top:12px"><label>关注点</label><input class="input" id="aiAsk" placeholder="例如：这几份材料的口径是否一致"></div>
    <div class="form-foot"><span class="mono">AI 回帖会留在聊天记录里</span><span class="spacer"></span><button class="btn" data-cancel>取消</button><button class="btn primary" data-ok>开始分析</button></div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelector('[data-ok]').addEventListener('click', async () => {
    const files = [...mask.querySelectorAll('.im-ai-check')].filter((c) => c.checked).map((c) => c.closest('.im-ai-row').dataset.ai)
    if (!files.length) return toast('请至少勾选一个文件', true)
    const { ok, body: res } = await api('/api/im/ai', { method: 'POST', body: JSON.stringify({ id: thread.id, files, question: mask.querySelector('#aiAsk').value.trim() }) })
    mask.remove()
    if (!ok) return toast(res.error || '分析失败', true)
    renderView()
  })
}

async function openImAttach(thread) {
  const { body } = await api('/api/drive')
  const list = (body.items || []).filter((d) => ['docx', 'xlsx', 'pptx'].includes(d.type))
  const mask = openModal('把文件发到「' + thread.name + '」', `
    <div class="notice">从这里选一个云空间文件发到会话；对方收到的是附件，可在聊天里一键转为人人可编辑的在线文档。</div>
    <div class="im-pick">
      ${list.length ? list.map((d) => `
        <button class="im-pick-row" data-attach="${esc(d.id)}">
          <span class="im-file-ico">${icon('doc')}</span>
          <span class="im-file-main"><b>${esc(d.name)}</b><span>${esc(d.type)} · ${esc(d.size)} · ${esc(d.owner)}</span></span>
        </button>`).join('') : '<div class="im-empty">云空间里没有可发送的文档。</div>'}
    </div>
    <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn" data-cancel>取消</button></div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelectorAll('[data-attach]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/im/attach', { method: 'POST', body: JSON.stringify({ id: thread.id, itemId: b.dataset.attach }) })
    if (!ok) return toast(res.error || '发送失败', true)
    mask.remove()
    toast('已发送，附件可在聊天中转为在线文档')
    renderView()
  }))
}

/* ======================= 模块角标通知 ======================= */
function notifModule(n) {
  const nav = n.nav || ''
  if (nav === 'automation') return 'tasks'
  if (nav === 'drive') return 'drive'
  if (nav === 'notice') return 'notice'
  if (nav === 'im') return 'im'
  if (nav === 'datacenter') return 'datacenter'
  if (nav === 'apps') return 'apps'
  return 'im'
}

async function markModuleRead(view) {
  if (view === 'home' || view === 'chat') return
  const items = state.notifications.filter((n) => n.unread && notifModule(n) === view)
  if (!items.length) return
  items.forEach((n) => { n.unread = false })
  await Promise.all(items.map((n) => api('/api/notifications/read', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: n.id }),
  })))
}

/* ======================= 共享文档 / 表格 / 演示 在线协作 ======================= */
function sheetTableHTML(table) {
  const rows = table || [['项目', '口径', '数值']]
  const cols = Math.max(...rows.map((r) => r.length))
  return `<div class="de-sheet"><table>
    ${rows.map((r, ri) => `<tr>${Array.from({ length: cols }).map((_, ci) => `<td><input data-cell="${ri}-${ci}" value="${esc(r[ci] ?? '')}"></td>`).join('')}</tr>`).join('')}
  </table><button class="de-addrow" id="deAddRow">+ 添加一行</button></div>`
}

function slideHTML(slides) {
  const list = slides || [{ title: '新页面', lines: ['要点一'] }]
  return `<div class="de-slides">${list.map((sli, i) => `
    <div class="de-slide" data-slide="${i}">
      <div class="de-slide-no">第 ${i + 1} 页</div>
      <input class="de-slide-title" data-slide-title="${i}" value="${esc(sli.title)}">
      <textarea class="de-slide-lines" data-slide-lines="${i}" rows="${Math.max(2, (sli.lines || []).length)}">${esc((sli.lines || []).join('\n'))}</textarea>
    </div>`).join('')}<button class="de-addrow" id="deAddSlide">+ 添加一页</button></div>`
}

async function openDocEditor(id, editable) {
  const { body } = await api(`/api/drive/item?id=${encodeURIComponent(id)}`)
  if (!body?.item) return toast(body?.error || '文件不存在')
  const it = body.item
  const c = body.content || {}
  const meta = DOC_META[it.type] || DOC_META.docx
  const me = state.boot.user.name
  const isOwner = it.owner === me
  const canEdit = editable && it.type !== 'pdf' && body.canEdit
  let blocks = body.blocks || []
  let comments = body.comments || []
  const members = body.members || []
  let rev = body.rev || 1
  let activeBlock = blocks[0]?.id || 'b1'
  let deTab = 'comments'
  let staleRev = 0
  document.querySelectorAll('.modal-mask').forEach((m) => m.remove())

  const mask = document.createElement('div')
  mask.className = 'modal-mask'
  mask.innerHTML = `
    <div class="doc-editor">
      <div class="de-head">
        <span class="ico">${icon(meta.icon)}</span>
        <div class="de-title-box">
          <div class="de-title">${esc(it.name)}</div>
          <div class="de-sub">${esc(it.typeLabel || meta.label)} · ${esc(it.owner)} · ${esc(it.dept)} · 最近更新 ${esc(it.updated)}</div>
        </div>
        <span class="spacer"></span>
        <span class="de-online" id="deOnline">${icon('pulse')}在线 ${(body.presence || []).length} 人</span>
        <span class="de-share">${it.isShared ? `共享给 ${esc((it.shared || []).join('、'))}` : '仅本人'}</span>
        <button class="de-x" id="deClose" title="关闭">${icon('close')}</button>
      </div>
      <div class="de-banner" id="deBanner" hidden></div>
      <div class="de-body">
        <div class="de-main" id="deMain">
          ${c.kind === 'sheet' ? sheetTableHTML(c.table) : c.kind === 'slide' ? slideHTML(c.slides) : `
            <div class="de-blocks" id="deBlocks">
              ${blocks.map((b) => {
                const locked = b.perm !== 'edit' && !isOwner
                return `<div class="de-block ${b.id === activeBlock ? 'sel' : ''}" data-block="${b.id}" data-perm="${b.perm}">
                  <div class="de-block-head">
                    <span class="de-anchor mono">第 ${b.no} 段</span>
                    ${isOwner ? '' : `<span class="tag ${b.perm === 'edit' ? '' : 'warn'}">${b.perm === 'edit' ? '可编辑' : b.perm === 'comment' ? '仅可评论' : '只读'}</span>`}
                    ${isOwner ? `<select class="de-perm" data-bperm="${b.id}" title="段落权限">
                      <option value="edit" ${b.perm === 'edit' ? 'selected' : ''}>可编辑</option>
                      <option value="comment" ${b.perm === 'comment' ? 'selected' : ''}>仅可评论</option>
                      <option value="read" ${b.perm === 'read' ? 'selected' : ''}>只读</option>
                    </select>` : ''}
                    <button class="icon-btn" data-cmblock="${b.id}" title="评论这一段">${icon('inbox')}</button>
                  </div>
                  <textarea class="de-block-text" data-block="${b.id}" rows="${Math.min(9, b.text.split('\n').length + 1)}" ${(canEdit && (!locked)) ? '' : 'readonly'}>${esc(b.text)}</textarea>
                </div>`
              }).join('')}
            </div>`}
          <div class="de-status" id="deStatus">${canEdit ? '创建者与共享者均可编辑；段落评论、段落权限与版本对比均已开启' : (it.type === 'pdf' ? '只读查看：PDF 不支持在线编辑，可评论与对比版本' : '只读查看：仅创建者与共享者可在线编辑')}</div>
        </div>
        <aside class="de-side">
          <div class="de-side-tabs">
            <button data-detab="comments" class="${deTab === 'comments' ? 'on' : ''}">评论 <span class="mono">${comments.filter((x) => !x.resolved).length}</span></button>
            <button data-detab="history" class="${deTab === 'history' ? 'on' : ''}">编辑历史 <span class="mono">${(body.history || []).length}</span></button>
          </div>
          <div class="de-side-body" id="deSide"></div>
        </aside>
      </div>
      <div class="de-foot">
        <span class="de-hint">评论、段落权限、版本对比与共享动作均写入审计</span>
        <span class="spacer"></span>
        <button class="dd-btn" id="deCancel">关闭</button>
        ${canEdit ? '<button class="dd-btn primary" id="deSave">保存</button>' : ''}
      </div>
    </div>`
  document.body.appendChild(mask)
  const close = () => { clearInterval(timer); mask.remove() }
  mask.addEventListener('click', (e) => { if (e.target === mask) close() })
  mask.querySelector('#deClose').addEventListener('click', close)
  mask.querySelector('#deCancel').addEventListener('click', close)

  const main = mask.querySelector('#deMain')

  const renderSide = () => {
    const side = mask.querySelector('#deSide')
    mask.querySelectorAll('[data-detab]').forEach((t) => t.classList.toggle('on', t.dataset.detab === deTab))
    if (deTab === 'comments') {
      side.innerHTML = `
        <div class="de-cm-list">
          ${comments.length ? comments.map((cm) => `
            <div class="de-cm ${cm.resolved ? 'done' : ''}" data-cmid="${cm.id}">
              <div class="de-cm-top"><b>${esc(cm.author)}</b><span class="mono">${esc(String(cm.at).slice(-11))}</span><span class="spacer"></span><span class="tag mono">${esc(cm.blockId)}</span></div>
              <div class="de-cm-text">${esc(cm.text)}</div>
              <div class="de-cm-foot">
                <button class="link-btn" data-jump="${cm.blockId}">定位段落</button>
                <button class="link-btn" data-resolve="${cm.id}" data-rv="${cm.resolved ? '0' : '1'}">${cm.resolved ? '重新打开' : '标记已解决'}</button>
              </div>
            </div>`).join('') : '<div class="de-empty">还没有评论。选中段落右侧的评论按钮即可锚定评论。</div>'}
        </div>
        ${canEdit ? `
        <div class="de-cm-form">
          <div class="mono de-cm-anchor">评论锚点：第 ${blocks.find((b) => b.id === activeBlock)?.no || 1} 段</div>
          <textarea id="deCmText" rows="2" placeholder="写下评论，可用 @ 提及同事"></textarea>
          <div class="de-cm-mentions">${members.slice(0, 6).map((m) => `<button class="chip" data-mention="${esc(m.name)}">@${esc(m.name)}</button>`).join('')}</div>
          <div class="de-cm-form-foot"><span class="spacer"></span><button class="btn primary sm" id="deCmSend">发送评论</button></div>
        </div>` : ''}`
    } else {
      side.innerHTML = `
        <div class="de-h-list">
          ${(body.history || []).map((h) => `<div class="de-h-item">
            <div class="de-h-top"><b>v${h.v}</b><span>${esc(h.by)}</span><span class="de-h-time">${esc(h.time)}</span></div>
            <div class="de-h-sum">${esc(h.summary)}</div>
            <div class="de-h-acts">
              ${h.snapshot ? `<button class="de-restore" data-restore="${h.v}">恢复到此版本</button>` : ''}
              ${h.v > 1 ? `<button class="de-restore" data-diff="${h.v - 1}:${h.v}">与 v${h.v - 1} 对比</button>` : ''}
            </div>
          </div>`).join('')}
        </div>`
    }
    wireSide()
  }

  const wireSide = () => {
    mask.querySelectorAll('[data-jump]').forEach((b) => b.addEventListener('click', () => {
      const el = mask.querySelector(`.de-block[data-block="${b.dataset.jump}"]`)
      if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 900) }
    }))
    mask.querySelectorAll('[data-resolve]').forEach((b) => b.addEventListener('click', async () => {
      const { body: r } = await api('/api/drive/comment-resolve', { method: 'POST', body: JSON.stringify({ id, commentId: b.dataset.resolve, resolved: b.dataset.rv === '1' }) })
      if (r?.ok) { comments = r.comments; renderSide() } else toast(r?.error || '操作失败')
    }))
    mask.querySelectorAll('[data-mention]').forEach((b) => b.addEventListener('click', () => {
      const ta = mask.querySelector('#deCmText')
      ta.value += (ta.value.endsWith(' ') || !ta.value ? '' : ' ') + b.dataset.mention + ' '
      b.classList.toggle('on')
      ta.focus()
    }))
    mask.querySelector('#deCmSend')?.addEventListener('click', async () => {
      const ta = mask.querySelector('#deCmText')
      const mentions = [...mask.querySelectorAll('[data-mention].on')].map((x) => x.dataset.mention)
      const { body: r } = await api('/api/drive/comment', { method: 'POST', body: JSON.stringify({ id, blockId: activeBlock, text: ta.value, mentions }) })
      if (r?.ok) { comments = r.comments; ta.value = ''; renderSide(); toast('评论已锚定到当前段落') } else toast(r?.error || '评论失败')
    })
    mask.querySelectorAll('[data-restore]').forEach((b) => b.addEventListener('click', async () => {
      const { body: r } = await api('/api/drive/update', { method: 'POST', body: JSON.stringify({ id, restoreVersion: Number(b.dataset.restore) }) })
      if (r?.ok) {
        toast(`已恢复到 v${b.dataset.restore}，并生成新版本 v${r.version}`)
        close()
        openDocEditor(id, editable)
      } else toast(r?.error || '恢复失败')
    }))
    mask.querySelectorAll('[data-diff]').forEach((b) => b.addEventListener('click', async () => {
      const [from, to] = b.dataset.diff.split(':').map(Number)
      const { body: r } = await api(`/api/drive/diff?id=${encodeURIComponent(id)}&from=${from}&to=${to}`)
      if (!r?.rows) return toast(r?.error || '无法对比')
      const dm = openModal(`版本对比 v${from} → v${to}`, `
        <div class="diff-meta">新增 ${r.added} 行 · 删除 ${r.removed} 行 · 仅比较正文，表格与演示按行展开</div>
        <div class="diff-box">${r.rows.map((row) => `<div class="diff-row ${row.type}"><span class="diff-sign">${row.type === 'add' ? '+' : row.type === 'del' ? '−' : ' '}</span><span>${esc(row.text)}</span></div>`).join('')}</div>
        <div class="form-foot"><span class="mono">对比结果来自编辑历史快照</span><span class="spacer"></span><button class="btn" data-x>关闭</button></div>`)
      dm.querySelector('[data-x]').addEventListener('click', () => dm.remove())
    }))
  }

  // 段落选择与评论锚点
  mask.querySelectorAll('.de-block').forEach((el) => el.addEventListener('click', () => {
    activeBlock = el.dataset.block
    mask.querySelectorAll('.de-block').forEach((x) => x.classList.toggle('sel', x === el))
    if (deTab === 'comments') renderSide()
  }))
  mask.querySelectorAll('[data-cmblock]').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation()
    activeBlock = b.dataset.cmblock
    deTab = 'comments'
    renderSide()
    mask.querySelector('#deCmText')?.focus()
  }))

  // 段落权限
  mask.querySelectorAll('[data-bperm]').forEach((sel) => sel.addEventListener('change', async () => {
    const { body: r } = await api('/api/drive/block-perm', { method: 'POST', body: JSON.stringify({ id, blockId: sel.dataset.bperm, perm: sel.value }) })
    if (r?.ok) { blocks = r.blocks; toast('段落权限已更新'); }
    else toast(r?.error || '权限设置失败')
  }))

  mask.querySelectorAll('[data-detab]').forEach((t) => t.addEventListener('click', () => {
    deTab = t.dataset.detab
    renderSide()
  }))
  renderSide()

  // 表格 / 演示的新增操作
  main.querySelector('#deAddRow')?.addEventListener('click', () => {
    const tbody = main.querySelector('.de-sheet table')
    const cols = tbody.rows[0].cells.length
    const tr = document.createElement('tr')
    tr.innerHTML = Array.from({ length: cols }).map((_, ci) => `<td><input data-cell="${tbody.rows.length}-${ci}" value=""></td>`).join('')
    tbody.appendChild(tr)
  })
  main.querySelector('#deAddSlide')?.addEventListener('click', () => {
    const box = main.querySelector('.de-slides')
    const n = box.querySelectorAll('.de-slide').length
    const div = document.createElement('div')
    div.className = 'de-slide'
    div.dataset.slide = String(n)
    div.innerHTML = `<div class="de-slide-no">第 ${n + 1} 页</div><input class="de-slide-title" data-slide-title="${n}" value="新页面"><textarea class="de-slide-lines" data-slide-lines="${n}" rows="2"></textarea>`
    box.insertBefore(div, main.querySelector('#deAddSlide'))
  })

  const collect = () => {
    if (c.kind === 'doc') {
      const parts = [...main.querySelectorAll('.de-block-text')].map((t) => t.value.trim()).filter(Boolean)
      return { body: parts.join('\n\n') }
    }
    if (c.kind === 'sheet') {
      const rows = [...main.querySelectorAll('.de-sheet table tr')].map((r) => [...r.querySelectorAll('input')].map((i) => i.value))
      return { table: rows }
    }
    const slides = [...main.querySelectorAll('.de-slide')].map((d) => ({
      title: d.querySelector('.de-slide-title').value,
      lines: d.querySelector('.de-slide-lines').value.split('\n').filter((x) => x.trim()),
    }))
    return { slides }
  }

  const showBanner = (text, actions) => {
    const banner = mask.querySelector('#deBanner')
    banner.hidden = false
    banner.innerHTML = `<span>${text}</span><span class="spacer"></span>${actions}`
  }

  mask.querySelector('#deSave')?.addEventListener('click', async () => {
    const btn = mask.querySelector('#deSave')
    btn.disabled = true
    btn.textContent = '保存中…'
    const { body: res } = await api('/api/drive/update', { method: 'POST', body: JSON.stringify({ id, content: collect(), summary: '在线编辑并保存', baseRev: rev }) })
    if (res?.ok) {
      toast(`已保存，当前版本 v${res.version}，创建者与共享者均可继续编辑`)
      close()
      if (state.view === 'drive') renderView()
    } else if (res?.error === 'conflict') {
      btn.disabled = false
      btn.textContent = '保存'
      staleRev = res.rev
      showBanner(`${esc(res.by)} 已在 ${esc(res.time)} 保存 v${res.rev}，你的编辑尚未提交。`, `<button class="btn sm" id="deReload">载入最新</button><button class="btn sm primary" id="deForce">仍然覆盖</button>`)
      mask.querySelector('#deReload').addEventListener('click', () => { close(); openDocEditor(id, editable) })
      mask.querySelector('#deForce').addEventListener('click', async () => {
        const { body: r2 } = await api('/api/drive/update', { method: 'POST', body: JSON.stringify({ id, content: collect(), summary: '冲突后覆盖保存', baseRev: 0 }) })
        if (r2?.ok) { toast(`已覆盖保存为 v${r2.version}`); close(); if (state.view === 'drive') renderView() } else toast(r2?.error || '保存失败')
      })
    } else {
      btn.disabled = false
      btn.textContent = '保存'
      toast(res?.error || '保存失败')
    }
  })

  // 伪实时：轮询在线状态与他人的新版本
  const refresh = async () => {
    const { body: p } = await api(`/api/drive/presence?id=${encodeURIComponent(id)}`)
    if (!p) return
    mask.querySelector('#deOnline').innerHTML = `${icon('pulse')}在线 ${p.presence.length} 人`
    if (p.rev > rev && !staleRev) {
      staleRev = p.rev
      showBanner(`有他人保存的新版本 v${p.rev}（当前显示 v${rev}）。`, `<button class="btn sm" id="deReload">载入最新</button><button class="btn sm subtle" id="deIgnore">继续编辑</button>`)
      mask.querySelector('#deReload').addEventListener('click', () => { close(); openDocEditor(id, editable) })
      mask.querySelector('#deIgnore').addEventListener('click', () => { mask.querySelector('#deBanner').hidden = true })
    }
  }
  const timer = setInterval(refresh, 5000)
  refresh()
}

/* ======================= 通知公告 ======================= */
async function renderNotices(el) {
  const { body } = await api('/api/notices')
  const items = body.items || []
  const cat = state.noticeCat || '全部'
  const list = items.filter((n) => (cat === '全部' ? true : n.category === cat))
  const catClass = (n) => (n.category === '通知' ? 'notice' : n.category === '公告' ? 'announce' : 'article')

  const pageSize = 10
  const pages = Math.max(1, Math.ceil(list.length / pageSize))
  const page = Math.min(Math.max(1, state.noticePage || 1), pages)
  state.noticePage = page
  const pageItems = list.slice((page - 1) * pageSize, page * pageSize)

  const openNotice = async (n) => {
    if (n.unread) {
      n.unread = false
      await api('/api/notices/read', { method: 'POST', body: JSON.stringify({ id: n.id }) })
      await markModuleRead('notice')
      el.querySelector(`[data-nrow="${n.id}"] .nt-dot`)?.remove()
    }
    document.querySelectorAll('.nt-modal').forEach((x) => x.remove())
    const wrap = document.createElement('div')
    wrap.className = 'ac-modal nt-modal'
    wrap.innerHTML = `
      <div class="ac-modal-panel">
        <div class="ac-modal-head">
          <span class="nt-cat ${catClass(n)}">${esc(n.category)}</span>
          <span class="ac-modal-hmeta">${esc(n.dept)} · ${esc(n.author)} · ${esc(n.time)}</span>
          <span class="spacer"></span>
          <button class="icon-btn ac-close" data-ntclose title="关闭">×</button>
        </div>
        <div class="ac-modal-body nt-modal-body">
          <div class="nt-h-title">${esc(n.title)}</div>
          <div class="nt-body">${(n.body || []).map((p) => `<p>${esc(p)}</p>`).join('')}</div>
          <div class="nt-foot">
            <button class="dr-btn" data-ntim="${esc(n.title)}">转发到即时通讯</button>
            <button class="dr-btn" data-ntask="${esc(n.title)}">在会话中提问</button>
          </div>
        </div>
      </div>`
    document.body.appendChild(wrap)
    requestAnimationFrame(() => wrap.classList.add('on'))
    const close = () => { wrap.remove(); document.removeEventListener('keydown', onKey) }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close() })
    wrap.querySelector('[data-ntclose]')?.addEventListener('click', close)
    wrap.querySelector('[data-ntim]')?.addEventListener('click', () => {
      close()
      state.view = 'im'
      render()
      toast('已把该公告转发到「规划一所 · 项目组」（演示）')
    })
    wrap.querySelector('[data-ntask]')?.addEventListener('click', () => {
      close()
      state.view = 'home'
      state.draft = '请结合刚发布的公告，梳理我需要跟进的事项'
      render()
      toast('已带入首页对话')
    })
  }

  el.innerHTML = `
  <div class="ac-page nt-page">
    <div class="ac-page-head">
      <div>
        <div class="ac-page-title">通知公告</div>
        <div class="ac-page-sub">集团通知、公告与文章 · 打开后自动标记已读</div>
      </div>
      <span class="spacer"></span>
      <span class="ac-count">共 ${list.length} 条内容</span>
    </div>
    <div class="ac-toolbar">
      <div class="nt-tabs">${(body.categories || ['全部', '通知', '公告', '文章']).map((c) => `<button class="drive-tab ${cat === c ? 'on' : ''}" data-ncat="${esc(c)}">${esc(c)}</button>`).join('')}</div>
      <span class="spacer"></span>
      <span class="ac-count">第 ${page} / ${pages} 页</span>
    </div>
    <div class="nt-files">
      ${pageItems.map((n) => `<button class="ac-file nt-file" data-nrow="${esc(n.id)}">
        <span class="nt-cat ${catClass(n)}">${esc(n.category)}</span>
        <span class="ac-file-main">
          <span class="ac-file-title">${n.unread ? '<i class="nt-dot"></i>' : ''}${esc(n.title)}</span>
          <span class="ac-file-meta">${n.pinned ? '<span class="nt-pin-tag">置顶</span>' : ''}${esc(n.dept)}</span>
        </span>
        <span class="ac-file-dept">${esc(n.author)}</span>
        <span class="ac-file-time mono">${esc(n.time)}</span>
        <span class="ac-file-open">查看</span>
      </button>`).join('')}
      ${list.length ? '' : '<div class="empty">该分类暂无内容</div>'}
    </div>
    ${pages > 1 ? `<div class="ac-pager">
      <button class="ac-pg" data-npage="${page - 1}" ${page <= 1 ? 'disabled' : ''}>上一页</button>
      ${pageSeq(page, pages).map((p) => p === '…' ? '<span class="ac-pager-dots">…</span>' : `<button class="ac-pg num ${p === page ? 'on' : ''}" data-npage="${p}">${p}</button>`).join('')}
      <button class="ac-pg" data-npage="${page + 1}" ${page >= pages ? 'disabled' : ''}>下一页</button>
      <span class="ac-pager-info">每页 ${pageSize} 条 · 共 ${list.length} 条</span>
    </div>` : ''}
  </div>`

  el.querySelectorAll('[data-ncat]').forEach((b) => b.addEventListener('click', () => {
    state.noticeCat = b.dataset.ncat
    state.noticePage = 1
    renderView()
  }))
  el.querySelectorAll('[data-npage]').forEach((b) => b.addEventListener('click', () => {
    const p = Number(b.dataset.npage)
    if (!Number.isFinite(p)) return
    state.noticePage = Math.min(Math.max(p, 1), pages)
    renderView()
  }))
  el.querySelectorAll('[data-nrow]').forEach((b) => b.addEventListener('click', () => {
    const n = items.find((x) => x.id === b.dataset.nrow)
    if (n) openNotice(n)
  }))
}

function openNoticeDialog() {
  document.querySelectorAll('.modal-mask').forEach((m) => m.remove())
  const mask = document.createElement('div')
  mask.className = 'modal-mask'
  mask.innerHTML = `
    <div class="doc-dialog">
      <div class="dd-head"><span class="ico">${icon('bell')}</span><div>
        <div class="dd-title">发布通知公告</div>
        <div class="dd-sub">发布后进入通知公告列表，并给相关模块挂未读角标</div>
      </div><span class="spacer"></span><button class="dd-x" id="ntClose" title="关闭" aria-label="关闭">${icon('close')}</button></div>
      <label class="dd-field"><span>标题</span><input id="ntTitle" placeholder="例如：关于开展 2026 年度城市体检数据补录的通知"></label>
      <label class="dd-field"><span>类型</span><select id="ntCat"><option>通知</option><option>公告</option><option>文章</option></select></label>
      <label class="dd-field"><span>正文</span><textarea id="ntBody" rows="7" placeholder="每行一段；首段将作为摘要"></textarea></label>
      <label class="dd-check"><input type="checkbox" id="ntPin"> 置顶显示</label>
      <div class="dd-foot"><span class="dd-hint">发布人：${esc(state.boot.user.name)} · ${esc(state.boot.user.unit)}</span><span class="spacer"></span>
        <button class="dd-btn" id="ntCancel">取消</button>
        <button class="dd-btn primary" id="ntOk">发布</button>
      </div>
    </div>`
  document.body.appendChild(mask)
  const close = () => mask.remove()
  mask.addEventListener('click', (e) => { if (e.target === mask) close() })
  mask.querySelector('#ntClose').addEventListener('click', close)
  mask.querySelector('#ntCancel').addEventListener('click', close)
  mask.querySelector('#ntOk').addEventListener('click', async () => {
    const title = mask.querySelector('#ntTitle').value.trim()
    const text = mask.querySelector('#ntBody').value.trim()
    if (!title || !text) return toast('标题与正文不能为空')
    const ok = mask.querySelector('#ntOk')
    ok.disabled = true
    ok.textContent = '发布中…'
    const { body: res } = await api('/api/notices/publish', {
      method: 'POST',
      body: JSON.stringify({ title, category: mask.querySelector('#ntCat').value, body: text, pinned: mask.querySelector('#ntPin').checked }),
    })
    if (res?.ok) {
      close()
      state.noticeId = res.item.id
      toast('已发布，通知公告已上线')
      renderView()
    } else {
      ok.disabled = false
      ok.textContent = '发布'
      toast(res?.error || '发布失败')
    }
  })
  setTimeout(() => mask.querySelector('#ntTitle').focus(), 60)
}


/* ------------------------------ 教学园地 ----------------------------- */
async function renderAcademy(el) {
  const { body } = await api('/api/academy')
  const items = body.items || []
  const cat = state.academyCat || 'all'
  const list = items.filter((it) => (cat === 'all' ? true : it.kind === cat))
  const learningCount = items.filter((it) => it.kind !== 'classic').length
  const classicCount = items.filter((it) => it.kind === 'classic').length
  const itemIcon = (it) => (it.kind === 'classic' ? 'star' : it.kind === 'video' ? 'video' : it.kind === 'spec' ? 'shield' : 'doc')
  const itemMeta = (it) => it.kind === 'classic'
    ? `经典项目 · ${esc(it.honor || '总工办认定')} · ${esc(it.dept)}`
    : `${esc(it.fmt)} · ${esc(it.duration || `${it.pages || 0} 页`)} · 数据中心`

  const pageSize = 10
  const pages = Math.max(1, Math.ceil(list.length / pageSize))
  const page = Math.min(Math.max(1, state.academyPage || 1), pages)
  state.academyPage = page
  const pageItems = list.slice((page - 1) * pageSize, page * pageSize)

  const detailHTML = (it) => `
    <div class="ac-h-title">${esc(it.title)}</div>
    ${it.kind === 'classic' ? `
      <div class="ac-award">
        <span class="ac-award-badge">${icon('star')}</span>
        <div><b>${esc(it.award)}</b><span>${esc(it.honor || '总工办推荐')} · 经总工办认定</span></div>
      </div>
      <div class="ac-proj-facts">
        <div><span>项目部门</span><b>${esc(it.dept)}</b></div>
        <div><span>归档时间</span><b>${esc(it.time)}</b></div>
        <div><span>项目类型</span><b>${esc((it.tags || [])[1] || '规划设计')}</b></div>
      </div>
      <div class="ac-sum">${esc(it.summary)}</div>
      <div class="ac-block-title">主要成果</div>
      <div class="ac-outcomes">${(it.outcomes || []).map((o) => `<div class="ac-outcome">${icon('doc')}<span>${esc(o)}</span></div>`).join('')}</div>
      <div class="ac-note"><span>总工办评价</span>${esc(it.note || '')}</div>` : `
      ${it.kind === 'video' ? `
        <div class="ac-player"><span class="ac-play">${icon('video')}</span><span class="ac-dur">${esc(it.duration)}</span></div>
        <div class="ac-chapters">${(it.chapters || []).map((c, i) => `<div class="ac-chap"><span class="mono">${String(i + 1).padStart(2, '0')}</span>${esc(c)}</div>`).join('')}</div>` : `
        <div class="ac-doc">
          <div class="ac-doc-cover"><span class="ico">${icon(it.kind === 'spec' ? 'shield' : 'doc')}</span><b>${it.pages || 0} 页</b><small>${esc(it.size)}</small></div>
          <div class="ac-doc-text">${esc(it.summary)}</div>
        </div>`}
      <div class="ac-sum">${esc(it.summary)}</div>
      <div class="ac-tags">${(it.tags || []).map((t) => `<span class="ac-tag">${esc(t)}</span>`).join('')}</div>`}
    <div class="ac-acts">
      <button class="btn primary" data-mstart="${it.id}">${it.kind === 'classic' ? '查看项目档案' : it.kind === 'video' ? '查看视频' : '打开阅读'}</button>
      <button class="btn" data-mai="${it.id}">用 AI 解读</button>
      <button class="btn fav-btn ${isFav(it.id) ? 'on' : ''}" data-mfav="${it.id}">${icon('star')}<span>${isFav(it.id) ? '已收藏' : '收藏'}</span></button>
    </div>
    <div class="ac-foot"><span>数据来源 · 数据中心</span><span class="spacer"></span><span class="mono">仅作展示</span></div>`

  const openAcModal = (it) => {
    document.querySelectorAll('.ac-modal').forEach((x) => x.remove())
    const wrap = document.createElement('div')
    wrap.className = 'ac-modal'
    wrap.innerHTML = `
      <div class="ac-modal-panel">
        <div class="ac-modal-head">
          <span class="ac-kind ${it.kind}">${esc(it.fmt)}</span>
          <span class="ac-modal-hmeta">${esc(it.dept)} · ${esc(it.time)}</span>
          <span class="spacer"></span>
          <button class="icon-btn ac-close" data-acclose title="关闭">×</button>
        </div>
        <div class="ac-modal-body">${detailHTML(it)}</div>
      </div>`
    document.body.appendChild(wrap)
    requestAnimationFrame(() => wrap.classList.add('on'))
    const close = () => { wrap.remove(); document.removeEventListener('keydown', onKey) }
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    wrap.addEventListener('click', (e) => { if (e.target === wrap) close() })
    wrap.querySelector('[data-acclose]')?.addEventListener('click', close)
    wrap.querySelector('[data-mstart]')?.addEventListener('click', () => {
      toast(it.kind === 'classic' ? '已打开项目档案（演示）' : it.kind === 'video' ? '已打开视频查看（演示）' : '已打开文件阅读（演示）')
    })
    wrap.querySelector('[data-mai]')?.addEventListener('click', () => {
      state.draft = it.kind === 'classic'
        ? `请解读经典项目《${it.title}》的获奖点、总工办评价和可复用做法，并给出适用于规划一所的三条借鉴建议。`
        : `请解读教学园地资源《${it.title}》，提炼适用于规划一所的三个要点，并给出可执行的检查清单。`
      state.view = 'chat'; state.conversation = null
      close(); render()
    })
    wrap.querySelector('[data-mfav]')?.addEventListener('click', (e) => {
      const b = e.currentTarget
      const saved = toggleFav({ ref: it.id, kind: 'data', title: it.title, meta: `教学园地 · ${it.fmt} · ${it.dept}`, icon: it.kind === 'classic' ? 'star' : it.kind === 'video' ? 'video' : 'doc' })
      b.classList.toggle('on', saved)
      const t = b.querySelector('span'); if (t) t.textContent = saved ? '已收藏' : '收藏'
      toast(saved ? '已收藏，可在个人中心查看' : '已取消收藏')
    })
  }

  el.innerHTML = `
  <div class="ac-page">
    <div class="ac-page-head">
      <div>
        <div class="ac-page-title">教学园地</div>
        <div class="ac-page-sub">学习文件与经典项目展示 · 数据来自数据中心</div>
      </div>
      <span class="spacer"></span>
      <div class="ac-stats">
        <span><b>${learningCount}</b> 份学习文件</span>
        <span><b>${classicCount}</b> 个经典项目</span>
        <span class="ac-source">${icon('database')}数据中心</span>
      </div>
    </div>
    <div class="ac-toolbar">
      <div class="ac-tabs">${(body.categories || []).map((c) => `<button class="ac-tab ${cat === c.key ? 'on' : ''}" data-acat="${c.key}">${c.label}</button>`).join('')}</div>
      <span class="spacer"></span>
      <span class="ac-count">共 ${list.length} 条 · 第 ${page} / ${pages} 页</span>
    </div>
    <div class="ac-files">
      ${pageItems.map((it) => `
        <button class="ac-file" data-aid="${it.id}">
          <span class="ac-ico ${it.kind}">${icon(itemIcon(it))}</span>
          <span class="ac-file-main">
            <span class="ac-file-title">${esc(it.title)}${it.kind === 'classic' ? `<i class="ac-award-mark">${icon('star')}获奖</i>` : ''}</span>
            <span class="ac-file-meta">${itemMeta(it)}</span>
          </span>
          <span class="ac-file-dept">${esc(it.dept)}</span>
          <span class="ac-file-time mono">${esc(it.time)}</span>
          <span class="ac-file-open">查看</span>
        </button>`).join('')}
      ${list.length ? '' : '<div class="empty">该分类暂无内容</div>'}
    </div>
    <div class="ac-pager">
      <button class="ac-pg" data-acpage="${page - 1}" ${page <= 1 ? 'disabled' : ''}>上一页</button>
      ${pageSeq(page, pages).map((p) => p === '…' ? '<span class="ac-pager-dots">…</span>' : `<button class="ac-pg num ${p === page ? 'on' : ''}" data-acpage="${p}">${p}</button>`).join('')}
      <button class="ac-pg" data-acpage="${page + 1}" ${page >= pages ? 'disabled' : ''}>下一页</button>
      <span class="ac-pager-info">每页 ${pageSize} 条 · 共 ${list.length} 条</span>
    </div>
  </div>`

  el.querySelectorAll('[data-acat]').forEach((b) => b.addEventListener('click', () => {
    state.academyCat = b.dataset.acat
    state.academyPage = 1
    renderView()
  }))
  el.querySelectorAll('[data-acpage]').forEach((b) => b.addEventListener('click', () => {
    const p = Number(b.dataset.acpage)
    if (!Number.isFinite(p)) return
    state.academyPage = Math.min(Math.max(p, 1), pages)
    renderView()
  }))
  el.querySelectorAll('[data-aid]').forEach((b) => b.addEventListener('click', () => {
    const it = items.find((x) => x.id === b.dataset.aid)
    if (it) openAcModal(it)
  }))
}

/* -------------------------------- 更多 -------------------------------- */
const ENTERPRISE_ITEMS = [
  ['notice', '通知公告', 'megaphone'],
  ['contacts', '通讯录', 'users'],
  ['im', '工作消息', 'message'],
  ['oa', 'OA 办公', 'doc'],
  ['drive', '云空间', 'cloud'],
  ['datacenter', '数据中心', 'database'],
  ['oneMap', '一张图', 'map'],
]

const MORE_ITEMS = [
  ['knowledge', '智能笔记本', 'book'],
  ['academy', '教学园地', 'cap'],
  ['bid', '智能投标', 'doc'],
  ['monitor', '综合监测', 'pulse'],
  ['renewal', '城市体检和更新', 'target'],
  ['hr', '人事组织', 'users'],
  ['review', '审图平台', 'layers'],
  ['finance', '财务管理', 'chart'],
  ['adminops', '综合管理', 'shield'],
]

// 图标栏单列容量：超出后新模块/次要模块自动进入「更多」，不再占图标栏
const RAIL_CAP = 12
function railPlan() {
  const { user } = state.boot
  const vis = (id) => user.visibleModules.includes(id)
  const core = ['imagegen', 'tasks', 'skills', 'projects'].filter(vis)
  const pinned = state.morePinned.filter(vis)
  const entAll = ENTERPRISE_ITEMS.map(([id]) => id).filter(vis)
  const slots = Math.max(0, RAIL_CAP - core.length)
  const entPool = entAll.filter((id) => !state.moreSet.includes(id))
  const entShown = entPool.slice(0, slots)
  const room = Math.max(0, slots - entShown.length)
  const pinnedShown = pinned.slice(0, room)
  const entHidden = [...entPool.slice(entShown.length), ...entAll.filter((id) => state.moreSet.includes(id))]
  const pinnedRoom = Math.max(0, room - pinnedShown.length)
  return { core, pinned: pinnedShown, pinnedShown, pinnedAll: pinned, entShown, entHidden, pinnedRoom, room, full: pinnedRoom === 0 }
}

function openMoreMenu(anchor) {
  if (window.__morePop && window.__morePop.__anchor === anchor) {
    const old = window.__morePop
    if (old.__closer) document.removeEventListener('click', old.__closer)
    old.remove()
    window.__morePop = null
    return
  }
  document.querySelectorAll('.rail-pop').forEach((p) => p.remove())
  window.__morePop = null
  const { user, modules } = state.boot
  const plan = railPlan()
  if (state.morePinned.length > plan.pinnedShown.length) {
    state.morePinned = [...plan.pinnedShown]
    localStorage.setItem('jg.morePinned', JSON.stringify(state.morePinned))
  }
  const entMeta = new Map(ENTERPRISE_ITEMS.map(([id, label, ic]) => [id, [id, label, ic]]))
  const moved = plan.entHidden.filter((id) => entMeta.has(id)).map((id) => entMeta.get(id))
  const pinnedItems = plan.pinnedShown.map((id) => MORE_ITEMS.find((x) => x[0] === id) || entMeta.get(id)).filter(Boolean)
  const seen = new Set()
  const list = [...MORE_ITEMS, ...moved, ...pinnedItems]
    .filter(([id]) => user.visibleModules.includes(id))
    .filter(([id]) => (seen.has(id) ? false : seen.add(id)))
  const pop = document.createElement('div')
  pop.className = 'rail-pop more-pop'
  pop.innerHTML = `
    ${list.map(([id, label, ic]) => {
      const on = plan.pinnedShown.includes(id)
      const show = on || plan.pinnedRoom > 0
      return `
      <div class="rail-pop-row">
        <button class="rail-pop-item" data-mnav="${id}">
          <span class="ico">${icon(ic)}</span><span>${esc(modules[id]?.label || label)}</span>
        </button>
        <button class="more-pin${on ? ' is-on' : ''}" data-mpin="${id}" title="${on ? '取消置顶' : '置顶到图标栏'}" style="${show ? '' : 'display:none'}">${icon('pin')}</button>
      </div>`
    }).join('')}`
  document.body.appendChild(pop)
  pop.__anchor = anchor
  window.__morePop = pop
  const r = anchor.getBoundingClientRect()
  pop.style.left = `${r.right + 10}px`
  pop.style.bottom = `${Math.max(10, window.innerHeight - r.bottom - 4)}px`
  pop.querySelectorAll('[data-mnav]').forEach((b) => b.addEventListener('click', () => {
    pop.remove()
    state.view = b.dataset.mnav
    render()
  }))
  pop.querySelectorAll('[data-mpin]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    const id = b.dataset.mpin
    const cur = railPlan()
    const wasPinned = cur.pinnedShown.includes(id)
    if (wasPinned) {
      state.morePinned = cur.pinnedShown.filter((x) => x !== id)
    } else {
      if (cur.pinnedRoom <= 0) return toast('图标栏已满，先取消一个置顶', true)
      state.morePinned = [...cur.pinnedShown, id]
    }
    localStorage.setItem('jg.morePinned', JSON.stringify(state.morePinned))
    renderRail()
    const now = railPlan()
    const label = modules[id]?.label || id
    pop.querySelectorAll('[data-mpin]').forEach((x) => {
      const on = now.pinnedShown.includes(x.dataset.mpin)
      x.classList.toggle('is-on', on)
      x.innerHTML = icon('pin')
      x.title = on ? '取消置顶' : '置顶到图标栏'
      x.style.display = on || now.pinnedRoom > 0 ? '' : 'none'
    })
    toast(wasPinned ? `已取消置顶「${label}」` : `已置顶「${label}」，已显示在图标栏`)
  }))
  setTimeout(() => {
    pop.__closer = function close(ev) {
      if (!pop.contains(ev.target) && ev.target.isConnected) {
        if (window.__morePop === pop) window.__morePop = null
        pop.remove()
        document.removeEventListener('click', close)
      }
    }
    document.addEventListener('click', pop.__closer)
  }, 0)
}

async function openAiTools() {
  const { body } = await api('/api/ai/tools')
  const tools = body.items || []
  const mask = openModal('AI 调用能力', `
    <div class="tool-list">
      <div class="tool-row head"><span>工具</span><span>模块</span><span>入参</span><span></span></div>
      ${tools.map((t) => `
        <div class="tool-row">
          <span class="tool-name"><span class="mono">${esc(t.name)}</span><em>${esc(t.label)}</em></span>
          <span class="tool-target">${esc(t.target)}</span>
          <span class="tool-args"><span class="mono">${esc(t.args)}</span></span>
          <span class="tool-desc">${esc(t.desc)}</span>
          <span class="tool-act"><button class="dr-btn" data-tooltry="${esc(t.name)}">试调用</button></span>
        </div>`).join('')}
    </div>
    <div class="form-foot"><span class="mono">共 ${tools.length} 个工具 · 按模块授权并写审计</span><span class="spacer"></span><button class="btn" data-mclose>关闭</button></div>`, { wide: true })
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
  mask.querySelectorAll('[data-tooltry]').forEach((b) => b.addEventListener('click', () => openToolTry(b.dataset.tooltry, tools)))
}

async function openToolTry(name, tools) {
  const t = tools.find((x) => x.name === name)
  const args = JSON.parse(t.args)
  const { body } = await api('/api/ai/invoke', { method: 'POST', body: JSON.stringify({ tool: name, args }) })
  const mask = openModal(`试调用 ${t.label}`, `
    <div class="asset-kv">
      <div><span>工具</span><b class="mono">${esc(name)}</b></div>
      <div><span>调用身份</span><b>${esc(body.actor || '')}</b></div>
      <div><span>模块</span><b>${esc(t.target)}</b></div>
      <div><span>结果</span><b>${body.ok ? '成功' : '被拒绝'}</b></div>
    </div>
    <div class="tool-json"><pre>${esc(JSON.stringify(body.result || body.error, null, 2))}</pre></div>
    <div class="form-foot"><span class="mono">ai.invoke · allow</span><span class="spacer"></span><button class="btn" data-mclose>关闭</button></div>`, { wide: true })
  mask.querySelector('[data-mclose]').addEventListener('click', () => mask.remove())
}


/* 外部访客：模块壳子——入口与框架可见，企业数据不落地 */
function renderGuestShell(el, view) {
  const { modules } = state.boot || { modules: {} }
  const label = modules[view]?.label || view
  el.innerHTML = `
    <div class="view-head">
      <div>
        <div class="view-title">${esc(label)}</div>
        
      </div>
    </div>
    <div class="g-shell">
      <div class="g-shell-ico">${icon('shield')}</div>
      <div class="g-shell-title">当前身份无权读取该模块的企业数据</div>
      <div class="g-shell-desc">需要时可申请模块授权。</div>
      <div class="g-shell-actions">
        <button class="btn ghost" data-gohome>返回首页</button>
        <button class="btn" data-goreq>申请模块授权</button>
      </div>
    </div>`
  el.querySelector('[data-gohome]').addEventListener('click', () => { state.view = 'home'; render() })
  el.querySelector('[data-goreq]').addEventListener('click', () => openFeedbackModal())
}




/* ===== 恢复：被脚本误删的视图函数 ===== */


function renderChat(el) {
  const conv = state.conversation
  const { models, tools, network } = state.boot
  const msgs = conv?.messages || []
  const running = state.chatBusy && state.chatSteps.length

  el.innerHTML = `
    <div class="chat">
      <div class="chat-head">
        <div class="chat-title">${esc(conv?.title || '新会话')}</div>
        <span class="tag">${esc(conv?.workspace || '默认工作区')}</span>
        <span class="spacer"></span>
        <span class="mono" style="color:var(--muted)">${esc(network?.label || '互联网')} · ${esc(conv?.model || models[0]?.label || '')}</span>
        <button class="btn sm" id="newConv">新建会话</button>
      </div>
      <div class="chat-msgs" id="chatMsgs">
        ${msgs.length ? msgs.map((m) => renderMsg(m)).join('') : `
          <div class="chat-empty">
            <div class="chat-empty-title">${esc(conv ? '继续这个会话' : '描述你要完成的工作')}</div>
            <div class="chat-empty-sub">模型会先检索授权数据，再按步骤调用工具；写操作会先征求确认。</div>
            <div class="quick-row">${(state.boot.quickPrompts || []).map((q) => `<button class="quick" data-prompt="${esc(q.prompt)}">${esc(q.label)}</button>`).join('')}</div>
          </div>`}
        ${running ? `<div class="steps-card"><div class="steps-title">正在执行</div>${state.chatSteps.map(stepRow).join('')}</div>` : ''}
        ${state.chatError ? `<div class="chat-error"><b>调用失败</b><span>${esc(state.chatError)}</span><button class="btn sm" id="retryMsg">重试</button></div>` : ''}
        ${state.pendingConfirm ? renderConfirm() : ''}
      </div>
      <div class="chat-composer">
        <textarea id="chatDraft" rows="2" placeholder="继续追问，或描述下一步工作…"></textarea>
        <div class="composer-bar">
          <button class="pill" id="chatAttach"><span class="ico">${icon('plus')}</span>附件</button>
          <button class="pill" id="chatTools"><span class="ico">${icon('tool')}</span>工具 · ${state.composerTools.length}</button>
          <span class="pill"><span class="ico">${icon('spark')}</span>
            <select id="chatModel" style="border:0;background:transparent;outline:none;appearance:none;font-size:11.5px;color:var(--text-2)">
              ${models.map((m) => `<option value="${m.id}" ${m.id === state.composerModel ? 'selected' : ''}>${esc(m.label)}</option>`).join('')}
            </select>
          </span>
          <span class="spacer"></span>
          <span class="mono" style="color:var(--muted)">${state.chatBusy ? '生成中…' : 'Enter 换行 · Ctrl+Enter 发送'}</span>
          <button class="send" id="chatSend" ${state.chatBusy ? 'disabled style="opacity:.4"' : ''}>${icon('send')}</button>
        </div>
      </div>
    </div>`

  const draft = el.querySelector('#chatDraft')
  draft.addEventListener('input', (e) => { state.draft = e.target.value })
  draft.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); sendFromChat() }
  })
  if (state.chatFocus) { draft.focus(); state.chatFocus = false }
  el.querySelector('#chatSend').addEventListener('click', sendFromChat)
  el.querySelector('#chatAttach').addEventListener('click', () => toast('附件按当前网络与模型外发规则校验后加入对话（演示）'))
  el.querySelector('#chatTools').addEventListener('click', () => openToolsMenu(el.querySelector('#chatTools')))
  el.querySelector('#newConv').addEventListener('click', () => {
    state.conversation = null
    state.draft = ''
    state.pendingConfirm = null
    state.chatError = ''
    render()
  })
  el.querySelector('#chatModel').addEventListener('change', (e) => {
    state.composerModel = e.target.value
    toast(`已切换模型：${e.target.selectedOptions[0].textContent}`)
  })
  el.querySelectorAll('[data-prompt]').forEach((b) => b.addEventListener('click', () => {
    state.draft = b.dataset.prompt
    renderView()
  }))
  el.querySelector('#retryMsg')?.addEventListener('click', () => {
    const last = (state.conversation?.messages || []).filter((m) => m.role === 'user').pop()
    if (last) sendMessage(last.text)
  })
  el.querySelector('#confirmGo')?.addEventListener('click', confirmWrite)
  el.querySelector('#confirmCancel')?.addEventListener('click', () => {
    state.pendingConfirm = null
    state.conversation?.messages.push({ role: 'assistant', text: '已取消写入。任务未创建，未产生任何数据变更。', time: '刚刚' })
    renderView()
  })
}


function renderMsg(m) {
  if (m.role === 'user') {
    return `<div class="msg user"><div class="bubble">${esc(m.text)}</div><div class="msg-time">${esc(m.time || '')}</div></div>`
  }
  return `<div class="msg ai">
    <div class="ai-avatar">JG</div>
    <div class="ai-body">
      ${m.steps?.length ? `<div class="steps-block">${m.steps.map(stepRow).join('')}</div>` : ''}
      <div class="bubble">${esc(m.text)}${m.streaming ? '<span class="caret"></span>' : ''}</div>
      ${m.citations?.length ? `<div class="cite-row">${m.citations.map((c) => `<span class="cite">${esc(c)}</span>`).join('')}</div>` : ''}
      <div class="msg-time">${esc(m.time || '')}</div>
    </div>
  </div>`
}


function renderConfirm() {
  return `<div class="confirm-card">
    <div class="confirm-title">写操作需要确认</div>
    <div class="confirm-text">${esc(state.pendingConfirm.text)}</div>
    ${state.pendingConfirm.draft ? `<div class="confirm-draft">${esc(state.pendingConfirm.draft)}</div>` : ''}
    <div class="confirm-foot">
      <button class="btn sm" id="confirmCancel">取消</button>
      <button class="btn sm primary" id="confirmGo">确认执行</button>
    </div>
  </div>`
}


function renderChatMsgs() {
  const box = document.getElementById('chatMsgs')
  if (!box || !state.conversation) return
  box.innerHTML = state.conversation.messages.map((m) => renderMsg(m)).join('') +
    (state.chatSteps.length ? `<div class="steps-card"><div class="steps-title">正在执行</div>${state.chatSteps.map(stepRow).join('')}</div>` : '')
}


async function sendFromChat() {
  const text = state.draft.trim()
  if (!text || state.chatBusy) return
  state.draft = ''
  await sendMessage(text)
}


async function confirmWrite() {
  const { body } = await api('/api/chat/confirm', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ conversationId: state.conversation?.id }),
  })
  state.pendingConfirm = null
  if (state.conversation && body.message) state.conversation.messages.push(body.message)
  toast('写操作已确认执行，结果已登记到定时任务执行记录')
  renderView()
}


function stepRow(s) {
  const cls = s.status === 'warn' ? 'warn' : s.status === 'fail' ? 'bad' : 'ok'
  const label = s.status === 'warn' ? '降级完成' : s.status === 'fail' ? '失败' : '完成'
  return `<div class="step">
    <span class="step-dot ${cls}"></span>
    <span class="step-tool">${esc(s.tool)}</span>
    <span class="step-detail">${esc(s.detail)}</span>
    <span class="step-ms">${(s.ms / 1000).toFixed(1)}s · ${label}</span>
  </div>`
}


/* ----------------------------- history ----------------------------- */

async function renderHistory(el) {
  const { body } = await api('/api/conversations')
  const items = body.items || []
  const workspaces = [...new Set(items.map((c) => c.workspace))]
  el.innerHTML = `
    <div class="view-head">
      <div><div class="view-title">历史会话</div></div>
      <div class="spacer"></div><button class="btn" id="histNew">新建会话</button>
    </div>
    <div class="hist-layout">
      <div>
        ${workspaces.map((w) => `
          <div class="hist-group">
            <div class="hist-group-title">${esc(w)}<span class="mono">${items.filter((c) => c.workspace === w).length}</span></div>
            ${items.filter((c) => c.workspace === w).map((c) => `
              <button class="hist-row" data-conv="${c.id}">
                <span class="hist-icon">${icon('chat')}</span>
                <span class="hist-main"><b>${esc(c.title)}</b><span>${esc(c.model)} · ${c.turns} 轮</span></span>
                <span class="hist-time">${esc(c.time)}</span>
                <span class="tag ${c.status === 'done' ? 'ok' : 'warn'}">${c.status === 'done' ? '已完成' : '进行中'}</span>
              </button>`).join('')}
          </div>`).join('')}
      </div>
      <div class="side-card">
        <div class="side-card-head">工作区</div>
        <div class="side-card-body" style="font-size:11.5px;color:var(--text-2);line-height:1.8">
          默认工作区按单位建立，文件读写受数据中心授权约束。<br/><br/>
          会话保留 180 天，到期归档；涉密内容导出需审批并留痕。
        </div>
      </div>
    </div>`

  el.querySelector('#histNew').addEventListener('click', () => { state.conversation = null; state.view = 'chat'; render() })
  el.querySelectorAll('[data-conv]').forEach((b) => b.addEventListener('click', async () => {
    const { body: one } = await api(`/api/conversation?id=${b.dataset.conv}`)
    if (!one.item) return
    state.conversation = one.item
    state.chatSteps = []
    state.chatError = ''
    state.pendingConfirm = null
    state.view = 'chat'
    render()
  }))
}


function openTaskRuns(a) {
  const runs = (state.tasks || [])
  const mask = openModal(`执行记录 · ${a ? a.name : '全部任务'}`, `
    <div class="tk-runs">
      ${runs.map((x) => {
        const [cls, label] = TASK_STATE_MAP[x.state] || ['', x.state]
        return `<div class="tk-run">
          <span class="tk-run-name"><b>${esc(x.title)}</b><span>${esc(x.target)} · 启动 ${esc(x.started || '—')}${x.reason ? ` · ${esc(x.reason)}` : ''}</span></span>
          <span class="tk-run-prog"><span class="prog"><span style="width:${x.progress}%"></span></span><span class="mono">${x.progress}%</span></span>
          <span class="tag ${cls}">${label}</span>
        </div>`
      }).join('') || '<div class="tk-doc-empty">暂无执行记录</div>'}
    </div>
    <div class="form-foot"><span class="mono">每次执行都是一次真实的 AI 运行，失败保留原因</span><span class="spacer"></span><button class="btn" data-cancel>关闭</button></div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
}

function openTaskFiles(a) {
  const files = [
    { name: a.deliver || '任务产出', meta: '投递位置', ico: 'doc' },
    { name: `${a.name} · 来源台账`, meta: '数据中心 · 关联台账', ico: 'database' },
    { name: '执行记录.txt', meta: `最近执行 · ${a.last}`, ico: 'history' },
  ]
  const mask = openModal(`任务文件 · ${a.name}`, `
    <div class="tk-files">
      ${files.map((f) => `<button class="tk-file" data-task-file="${esc(f.name)}">
        <span class="tk-file-ico">${icon(f.ico)}</span>
        <span class="tk-file-body"><b>${esc(f.name)}</b><span>${esc(f.meta)}</span></span>
        <span class="tk-file-open">${icon('arrow')}</span>
      </button>`).join('')}
    </div>
    <div class="form-foot"><span class="mono">任务产出与来源文件统一归档在该任务下</span><span class="spacer"></span><button class="btn" data-cancel>关闭</button></div>`)
  mask.querySelector('[data-cancel]').addEventListener('click', () => mask.remove())
  mask.querySelectorAll('[data-task-file]').forEach((b) => b.addEventListener('click', () => toast(`打开文件「${b.dataset.taskFile}」（演示）`)))
}

const TASK_STATE_MAP = {
  running: ['warn', '执行中'],
  queued: ['', '排队中'],
  done: ['ok', '已完成'],
  failed: ['bad', '失败'],
}
const taskStateMap = TASK_STATE_MAP

async function loadTasks() {
  const { body } = await api('/api/tasks')
  state.tasks = body.items || []
  return state.tasks
}


async function renderTaskCenter(el) {
  const [{ body: autoBody }, tasks] = await Promise.all([api('/api/automations'), loadTasks()])
  state.automations = autoBody.items || []
  if (!state.taskSel && !state.taskInitialized) {
    state.taskSel = state.automations[0]?.id || ''
    state.taskInitialized = true
  }
  const selId = state.taskSel || ''
  const sel = state.automations.find((a) => a.id === selId)
  const runs = state.tasks.slice(0, 5)

  const emptyPane = `
    <div class="tk-empty">
      <div class="tk-empty-ico">${icon('clock')}</div>
      <div class="tk-empty-title">新建定时任务</div>
      <div class="tk-empty-sub"></div>
      <div class="tk-ideas">
        ${TASK_IDEAS.map((t) => `
          <button class="tk-idea" data-idea="${esc(t.name)}">
            <span class="tk-idea-ico">${icon('spark')}</span>
            <span class="tk-idea-body"><b>${esc(t.name)}</b><span>${esc(t.desc)}</span></span>
          </button>`).join('')}
      </div>
    </div>`

  const rp = sel?.report || null
  const detailPane = sel ? `
    <div class="tk-doc">
      <div class="tk-doc-bar">
        <div class="tk-doc-name">${esc(sel.name)}</div>
        <span class="spacer"></span>
        <button class="tk-ico-btn" data-tkact="more" title="更多">${icon('dots')}</button>
        <button class="tk-ico-btn" data-tkact="share" title="分享">${icon('send')}</button>
      </div>
      <div class="tk-doc-scroll">
        <div class="tk-doc-inner">
          ${rp ? `
            <h1 class="tk-doc-h1">${esc(rp.title)} <span class="tk-doc-sep">|</span> ${esc(rp.date)}</h1>
            <div class="tk-doc-meta">统计时间：${esc(rp.period)}　·　${esc(sel.schedule)}　·　下次 ${esc(sel.next)}</div>
            <div class="tk-doc-lead">${esc(rp.lead)}</div>
            ${rp.items.map((it) => `<div class="tk-doc-sec">
              <div class="tk-doc-h2">${esc(it.h)}</div>
              <p>${esc(it.p)}</p>
              <span class="tk-src">${icon('doc')}<em>${esc(it.src)}</em></span>
            </div>`).join('')}
            <div class="tk-doc-note">${esc(rp.note)}</div>
          ` : `
            <h1 class="tk-doc-h1">${esc(sel.name)}</h1>
            <div class="tk-doc-meta">${esc(sel.schedule)}　·　${sel.status === 'active' ? '已开启' : '已暂停'}</div>
            <div class="tk-doc-empty">这个定时任务还没有产出：${sel.status === 'active' ? '首次执行完成后，结果会直接呈现在这里。' : `已暂停，最近一次失败原因：${esc(sel.last)}`}</div>
          `}
          <div class="tk-doc-foot">
            <div class="tk-foot-k">指令</div>
            <div class="tk-foot-v">${esc(sel.prompt || '（未填写指令）')}</div>
            <div class="tk-foot-k">投递</div>
            <div class="tk-foot-v">${esc(sel.deliver || '工作台')}　·　模型 ${esc(sel.model || '系统默认模型')}</div>
            <button class="tk-foot-link" data-runs="1">执行记录（最近执行 ${esc(sel.last)}）</button>
          </div>
        </div>
      </div>
      <div class="tk-composer">
        <button class="icon-btn" data-tkact="plus" title="添加要求">${icon('plus')}</button>
        <input id="tkAsk" placeholder="询问智能助手">
        <span class="tk-when">即时</span>
        <button class="tk-send" id="tkAskSend">${icon('up')}</button>
      </div>
    </div>` : emptyPane

  const taskListHTML = `
    <aside class="tk-left">
      <div class="tk-left-head"><span>定时任务</span><span class="spacer"></span>
        <button class="tk-ico-btn" id="tkFilter" title="筛选">${icon('layers')}</button>
        <button class="tk-ico-btn" id="tkSearch" title="搜索任务">${icon('search')}</button>
      </div>
      <button class="tk-new" id="newAuto">${icon('plus')}<span>新建定时任务</span></button>
      <div class="tk-group-label">已开启</div>
      <div class="tk-list">
        ${state.automations.slice().sort((a, b) => ((state.taskPins || []).includes(b.id) ? 1 : 0) - ((state.taskPins || []).includes(a.id) ? 1 : 0)).map((a) => `
          <button class="tk-item${a.id === selId ? ' on' : ''}" data-auto="${a.id}">
            <span class="tk-item-main"><b>${esc(a.name)}</b><span>${esc(a.next)} · ${esc(a.schedule)}</span></span>
            ${a.status === 'active' ? '<span class="tk-dot"></span>' : ''}
          </button>`).join('')}
      </div>
    </aside>`

  const useSidebar = state.view === 'tasks'
  if (useSidebar) {
    const sb = document.getElementById('sidebar')
    sb.classList.remove('hidden')
    sb.classList.add('tk-sidebar')
    sb.innerHTML = `${taskListHTML}<div class="pane-grip" id="sbGrip" title="拖动调整左右宽度 · 双击复位"></div>`
    bindSidebarResize()
    el.innerHTML = `<div class="tk-main tk-main-page">${detailPane}</div>`
  } else {
    el.innerHTML = `
      <div class="task-center">
        ${taskListHTML}
        <div class="tk-main">${detailPane}</div>
      </div>`
  }

  const listRoot = useSidebar ? document.getElementById('sidebar') : el
  listRoot.querySelector('#newAuto').addEventListener('click', () => openAutomationForm())
  listRoot.querySelector('#tkFilter').addEventListener('click', () => toast('按状态、频率与负责人筛选（演示）'))
  listRoot.querySelector('#tkSearch').addEventListener('click', () => toast('任务搜索：名称、执行内容与负责人（演示）'))
  listRoot.querySelectorAll('[data-auto]').forEach((b) => b.addEventListener('click', () => {
    state.taskSel = b.dataset.auto === state.taskSel ? '' : b.dataset.auto
    if (useSidebar) render()
    else renderView()
  }))
  el.querySelectorAll('[data-idea]').forEach((b) => b.addEventListener('click', () => {
    const idea = TASK_IDEAS.find((t) => t.name === b.dataset.idea)
    openAutomationForm(idea)
  }))
  el.querySelectorAll('[data-tkact]').forEach((b) => b.addEventListener('click', (ev) => {
    ev.stopPropagation()
    const act = b.dataset.tkact
    const sel = state.automations.find((x) => x.id === state.taskSel)
    if (!sel) return
    if (act === 'share') return toast('产出可分享给项目成员（演示）')
    if (act === 'split') return toast('分屏：左侧任务清单、右侧产出，可并排查看（演示）')
    if (act === 'panel') return toast('侧栏：执行记录与指令（演示）')
    if (act === 'plus') return toast('可在下方输入框追加要求，下次执行时带入指令（演示）')
    if (act === 'more') {
      document.querySelectorAll('.tk-more-pop').forEach((p) => p.remove())
      const pinned = (state.taskPins || []).includes(sel.id)
      const projectNames = (state.projects || []).slice(0, 6).map((p) => p.name)
      const moveTargets = projectNames.length ? projectNames : ['滨江片区更新', '城市体检', '国土空间规划', '项目复盘']
      const pop = document.createElement('div')
      pop.className = 'conv-menu tk-more-pop tk-action-menu'
      pop.innerHTML = `
        <button class="cm-item tk-menu-item" data-tk="pin">
          <span class="tk-menu-ico">${icon(pinned ? 'pinOff' : 'pin')}</span>
          <span class="tk-menu-label">${pinned ? '取消置顶' : '置顶'}</span>
          <span class="tk-menu-kbd">Ctrl+Alt+P</span>
        </button>
        <div class="tk-menu-sep"></div>
        <button class="cm-item tk-menu-item" data-tk="files">
          <span class="tk-menu-ico">${icon('doc')}</span>
          <span class="tk-menu-label">查看任务中的文件</span>
        </button>
        <button class="cm-item tk-menu-item" data-tk="openweb">
          <span class="tk-menu-ico">${icon('external')}</span>
          <span class="tk-menu-label">在网页端打开</span>
        </button>
        <div class="tk-menu-sep"></div>
        <button class="cm-item tk-menu-item" data-tk="move">
          <span class="tk-menu-ico">${icon('folder')}</span>
          <span class="tk-menu-label">移至项目</span>
          <span class="tk-menu-caret">${icon('chevron')}</span>
        </button>
        <div class="tk-more-sub" hidden>
          ${moveTargets.map((name) => `<button class="cm-item tk-menu-subitem" data-tk-project="${esc(name)}"><span class="tk-menu-label">${esc(name)}</span></button>`).join('')}
        </div>`
      document.body.appendChild(pop)
      const r = b.getBoundingClientRect()
      pop.style.left = `${Math.max(8, r.right - pop.offsetWidth)}px`
      pop.style.top = `${r.bottom + 6}px`
      const close = (e) => { if (!pop.contains(e.target)) { pop.remove(); document.removeEventListener('click', close); document.removeEventListener('keydown', onKey) } }
      const onKey = (e) => {
        if (e.ctrlKey && e.altKey && (e.key === 'p' || e.key === 'P')) { e.preventDefault(); pop.querySelector('[data-tk="pin"]').click() }
      }
      setTimeout(() => { document.addEventListener('click', close); document.addEventListener('keydown', onKey) }, 0)
      pop.querySelector('[data-tk="pin"]').addEventListener('click', () => {
        const set = new Set(state.taskPins || [])
        if (set.has(sel.id)) set.delete(sel.id); else set.add(sel.id)
        state.taskPins = [...set]
        pop.remove()
        document.removeEventListener('click', close)
        document.removeEventListener('keydown', onKey)
        toast(set.has(sel.id) ? `已置顶「${sel.name}」` : `已取消置顶「${sel.name}」`)
        renderView()
      })
      pop.querySelector('[data-tk="files"]').addEventListener('click', () => { pop.remove(); openTaskFiles(sel) })
      pop.querySelector('[data-tk="openweb"]').addEventListener('click', () => { pop.remove(); toast(`已在网页端打开「${sel.name}」（演示）`) })
      pop.querySelector('[data-tk="move"]').addEventListener('click', () => {
        const sub = pop.querySelector('.tk-more-sub')
        sub.hidden = !sub.hidden
        pop.classList.toggle('sub-open', !sub.hidden)
      })
      pop.querySelectorAll('[data-tk-project]').forEach((item) => item.addEventListener('click', () => {
        pop.remove()
        toast(`已移至项目「${item.dataset.tkProject}」（演示）`)
      }))
    }
  }))
  const runsLink = el.querySelector('[data-runs]')
  if (runsLink) runsLink.addEventListener('click', () => openTaskRuns(state.automations.find((x) => x.id === state.taskSel)))
  const askSend = el.querySelector('#tkAskSend')
  if (askSend) {
    const ask = () => {
      const v = el.querySelector('#tkAsk').value.trim()
      if (!v) return
      toast('已把补充要求记入该任务，下次执行时按新要求生成（演示）')
      el.querySelector('#tkAsk').value = ''
    }
    askSend.addEventListener('click', ask)
    el.querySelector('#tkAsk').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); ask() } })
  }
  el.querySelectorAll('[data-task]').forEach((r) => r.addEventListener('click', (ev) => {
    if (ev.target.closest('[data-retry]') || ev.target.closest('[data-result]')) return
    openTaskDetail(r.dataset.task)
  }))
  el.querySelectorAll('[data-run]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/automations/run', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: b.dataset.run }) })
    if (!ok) return toast(res.error, true)
    toast(`已触发执行，任务 ${res.task.id} 进入队列`)
    renderView()
  }))
  el.querySelectorAll('[data-pause]').forEach((b) => b.addEventListener('click', () => {
    const a = state.automations.find((x) => x.id === b.dataset.pause)
    a.status = a.status === 'active' ? 'paused' : 'active'
    toast(`已${a.status === 'active' ? '启用' : '暂停'}「${a.name}」（演示状态）`)
    renderView()
  }))
  el.querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', () => openAutomationForm(state.automations.find((x) => x.id === b.dataset.edit))))
  el.querySelectorAll('[data-retry]').forEach((b) => b.addEventListener('click', async (ev) => {
    ev.stopPropagation()
    await api('/api/tasks/retry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: b.dataset.retry }) })
    toast('已重新入队，失败原因保留在任务记录中')
    renderView()
  }))
  el.querySelectorAll('[data-result]').forEach((b) => b.addEventListener('click', (ev) => { ev.stopPropagation(); toast('结果入口：打开产物文件或回到会话定位（演示）') }))

  if (state.tasks.some((t) => ['running', 'queued'].includes(t.state))) {
    clearTimeout(renderTaskCenter._t)
    renderTaskCenter._t = setTimeout(() => { if (state.view === 'tasks') renderView() }, 2600)
  }
}


/* ---------------------------- admin ---------------------------- */

async function renderAdmin(el) {
  const { body } = await api('/api/console')
  state.console = body
  const roles = body.roles || []
  // 角色与范围由人员权限配置决定，管理中心只读取，不再允许手动切换
  const role = roles.find((r) => r.id === (body.currentRole || 'platform')) || roles[0]
  state.consoleRole = role.id
  const scopes = role.scopes || body.scopes
  const scope = body.scope || scopes[0]
  state.consoleScope = scope
  const allowed = (id) => role.modules.includes(id)
  const meta = body.modules
  const navItems = (g) => g.items.filter(allowed)
  const tab = allowed(state.consoleTab) ? state.consoleTab : 'overview'
  state.consoleTab = tab
  const sec = body.sections[tab]
  const STATUS = /^(正常|在线|成功|已发布|已通过|已闭环|已回收|已恢复|已修复|可用|开启|允许|通过|已入库|已生效|已显示|—)$/
  const WARN = /^(待审核|待审批|待分派|待复核|待受理|待补录|处理中|草稿|降级|延迟|分发中|灰度|待发布|已暂停|待处理|预警|待确认)$/
  const BAD = /^(失败|驳回|阻断|高风险|已锁定|超时|异常|关闭|禁用|无权限)$/
  const cell = (x) => {
    const s = String(x == null ? '' : x)
    if (STATUS.test(s)) return `<span class="mc-tag ok">${esc(s)}</span>`
    if (WARN.test(s)) return `<span class="mc-tag warn">${esc(s)}</span>`
    if (BAD.test(s)) return `<span class="mc-tag bad">${esc(s)}</span>`
    if (/^\d{2}:\d{2}$/.test(s) || s.startsWith('今日') || s.startsWith('昨日')) return `<span class="mono mc-dim">${esc(s)}</span>`
    return esc(s)
  }
  const block = (b) => {
    if (b.type === 'rows') {
      return `<div class="mc-block"><div class="mc-block-head"><b>${esc(b.title)}</b><span class="spacer"></span><span class="mc-count">${b.items.length} 项</span></div>
        <div class="mc-rows">${b.items.map((r) => `<div class="mc-row"><span class="mc-row-main">${esc(r[0])}</span>${r.slice(1).map((c) => `<span class="mc-row-cell">${cell(c)}</span>`).join('')}</div>`).join('')}</div></div>`
    }
    const n = b.cols.length
    return `<div class="mc-block">
      <div class="mc-block-head"><b>${esc(b.title)}</b><span class="spacer"></span><span class="mc-count">${b.rows.length} 条</span></div>
      <div class="mc-table" style="--mc-cols:repeat(${n}, minmax(0, 1fr))">
        <div class="mc-thead"><span>${b.cols.map((c) => esc(c)).join('</span><span>')}</span></div>
        ${b.rows.map((r) => `<div class="mc-trow">${r.map((c, i) => `<span class="${i === 0 ? 'mc-first' : ''}">${cell(c)}</span>`).join('')}</div>`).join('')}
      </div>
    </div>`
  }
  const navHTML = body.nav.map((g) => {
    const items = navItems(g)
    if (!items.length) return ''
    return `<div class="mc-group">${esc(g.group)}</div>
      ${items.map((id) => `<button class="mc-nav-item${tab === id ? ' on' : ''}" data-mc="${id}"><span>${esc(meta[id].label)}</span></button>`).join('')}`
  }).join('')

  el.innerHTML = `
    <div class="mc-shell">
      <div class="mc-nav">
        <div class="mc-left-head"><div class="mc-title">管理中心</div><div class="mc-sub">统一控制台 · ${esc(body.modules[tab].label)}</div></div>
        ${navHTML}<div class="mc-nav-foot">${esc(role.name)}<span>${esc(role.scope)}</span></div>
      </div>
      <div class="mc-main">
        <div class="mc-main-head">
          <div><div class="mc-main-title">${esc(sec.title)}</div><div class="mc-main-desc">${esc(meta[tab].desc)}</div></div>
          <span class="spacer"></span>
          <button class="btn sm" id="mcRefresh">${icon('refresh')}刷新</button>
        </div>
        ${tab === 'overview' ? `<div class="mc-note">${esc(sec.meta)}</div>` : `<div class="mc-note">${esc(sec.meta)}</div>`}
        <div class="mc-kpis">${sec.kpis.map((k) => `<div class="mc-kpi"><div class="mc-kpi-k">${esc(k.k)}</div><div class="mc-kpi-v ${k.tone || ''}">${esc(k.v)}</div><div class="mc-kpi-note">${esc(k.note)}</div></div>`).join('')}</div>
        <div class="mc-blocks">${sec.blocks.map(block).join('')}</div>
      </div>
    </div>`

  el.querySelectorAll('[data-mc]').forEach((b) => b.addEventListener('click', () => {
    state.consoleTab = b.dataset.mc
    renderView()
  }))
  el.querySelector('#mcRefresh').addEventListener('click', () => {
    toast('已刷新：数据来自平台监控、模型网关与数据中心接口')
    renderView()
  })

  if (tab === 'ai') {
    const { body: sub } = await api('/api/plugin-subs')
    const pending = (sub.items || []).filter((x) => x.status === 'pending')
    const blocks = el.querySelector('.mc-blocks')
    if (blocks) {
      const wrap = document.createElement('div')
      wrap.className = 'mc-block'
      wrap.innerHTML = `<div class="mc-block-head"><b>插件审核</b><span class="spacer"></span><span class="mc-count">${pending.length} 项待处理</span></div>
        <div class="mc-table" style="--mc-cols:1.4fr 1fr 1.2fr 1fr">
          <div class="mc-thead"><span>插件</span><span>提交人</span><span>自动检测</span><span>操作</span></div>
          ${pending.map((x) => {
            const bad = (x.checks || []).some((c) => c[1] === '不通过')
            const warn = (x.checks || []).some((c) => c[1] === '待复核')
            const tone = bad ? 'bad' : warn ? 'warn' : 'ok'
            return `<div class="mc-trow"><span class="mc-first">${esc(x.name)} <span class="mc-dim mono">v${esc(x.version)}</span></span><span>${esc(x.author)} · ${esc(x.unit)}</span><span><span class="mc-tag ${tone}">${bad ? '存在不通过项' : warn ? '有权限待复核' : '全部通过'}</span></span><span class="mc-acts"><button class="btn sm" data-review="reject" data-subid="${x.id}">退回</button><button class="btn sm primary" data-review="approve" data-subid="${x.id}">通过上架</button></span></div>`
          }).join('') || '<div class="mc-row">当前没有待审核插件</div>'}
        </div>`
      blocks.appendChild(wrap)
      wrap.querySelectorAll('[data-review]').forEach((b) => b.addEventListener('click', async () => {
        const id = b.dataset.subid
        if (b.dataset.review === 'approve') {
          const { ok, body } = await api('/api/plugin-subs/review', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, action: 'approve' }) })
          if (!ok) return toast(body.error || '审核失败', true)
          toast('已通过并上架集团插件市场，员工可一键安装')
          renderView()
          return
        }
        const m2 = openModal('退回插件', `
          <div class="form-note">退回后提交人可修改 ZIP 重新上传；退回原因会显示在检测报告里。</div>
          <div class="form-label">退回原因</div>
          <textarea class="form-area" id="rjReason" rows="3" placeholder="例如：声明外部网络依赖，需改用企业内网接口"></textarea>
          <div class="form-foot"><span class="spacer"></span><button class="btn" data-mclose>取消</button><button class="btn primary" id="rjOk">确认退回</button></div>`)
        m2.querySelector('[data-mclose]').addEventListener('click', () => m2.remove())
        m2.querySelector('#rjOk').addEventListener('click', async () => {
          const reason = m2.querySelector('#rjReason').value.trim()
          const { ok, body } = await api('/api/plugin-subs/review', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, action: 'reject', reason }) })
          m2.remove()
          if (!ok) return toast(body.error || '退回失败', true)
          toast('已退回，提交人会收到检测报告与原因')
          renderView()
        })
      }))
    }
  }
}

async function renderTickets(box) {
  const { body } = await api('/api/tickets')
  state.tickets = body.items || []
  const map = { 待分派: ['warn', '待分派'], 处理中: ['', '处理中'], 待复核: ['warn', '待复核'], 已闭环: ['ok', '已闭环'] }
  box.innerHTML = `
    <div class="toolbar" style="margin-bottom:12px">
      <span class="spacer"></span><button class="btn sm primary" id="newTicket">新建工单</button>
    </div>
    <div class="table-card">
      <div class="table-head" style="display:grid;grid-template-columns:minmax(0,2fr) 72px 96px 160px 80px 120px"><span>工单</span><span>网络</span><span>处理人</span><span>时限</span><span>状态</span><span></span></div>
      ${state.tickets.map((t) => {
        const [cls, label] = map[t.status] || ['', t.status]
        return `<div class="row ticket-row" style="grid-template-columns:minmax(0,2fr) 72px 96px 160px 80px 120px">
          <span class="name"><b>${esc(t.type)} · ${esc(t.subject)}</b><span>${esc(t.id)} · 创建 ${esc(t.created)}</span></span>
          <span class="src">${esc(t.net)}</span>
          <span class="src">${esc(t.owner)}</span>
          <span class="tm">${esc(t.due)}</span>
          <span><span class="tag ${cls}">${label}</span></span>
          <span class="row-actions">
            ${t.status === '待分派' ? `<button class="btn sm" data-tk="assign" data-id="${t.id}">分派</button>` : ''}
            ${t.status === '处理中' ? `<button class="btn sm" data-tk="done" data-id="${t.id}">完成</button>` : ''}
            ${t.status === '待复核' ? `<button class="btn sm primary" data-tk="verify" data-id="${t.id}">复核</button>` : ''}
            <button class="btn sm" data-tklog="${t.id}">记录</button>
          </span>
        </div>`
      }).join('')}
    </div>`
  box.querySelector('#newTicket').addEventListener('click', openTicketForm)
  box.querySelectorAll('[data-tk]').forEach((b) => b.addEventListener('click', async () => {
    await api('/api/tickets/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: b.dataset.id, action: b.dataset.tk }) })
    toast('工单状态已更新，处理记录已留痕')
    renderView()
  }))
  box.querySelectorAll('[data-tklog]').forEach((b) => b.addEventListener('click', () => {
    const t = state.tickets.find((x) => x.id === b.dataset.tklog)
    openTaskDetail
    const slide = ensureSlide()
    slide.innerHTML = `
      <div class="slide-head"><div><div class="slide-title">${esc(t.type)} · ${esc(t.subject)}</div><div class="slide-sub">${esc(t.id)} · ${esc(t.net)}</div></div><span class="spacer"></span><button class="btn subtle" data-close>${icon('close')}</button></div>
      <div class="slide-body">
        <div class="field"><div class="field-label">处理链路</div>
          ${t.history.map((h) => `<div class="timeline-row"><span class="mono">${esc(h.time)}</span><span>${esc(h.text)}</span></div>`).join('')}
        </div>
        <div class="notice neutral">复核证据保留：账号停用记录、权限回收结果、会话终止时间；异常超时自动升级提醒。</div>
      </div>
      <div class="slide-foot"><button class="btn" data-close>关闭</button></div>`
    wireSlide(slide)
  }))
}


async function renderMonitor(box) {
  const { body } = await api('/api/monitor')
  state.monitor = body
  const storagePct = Math.round((body.storage.used / body.storage.total) * 100)
  box.innerHTML = `
    <div class="mon-grid">
      ${body.services.map((s) => `
        <div class="mon-card">
          <div class="mon-top"><span class="mon-name">${esc(s.name)}</span><span class="tag ${s.status === 'ok' ? 'ok' : 'warn'}">${s.status === 'ok' ? '正常' : '降级'}</span></div>
          <div class="mon-kv"><span>P95 ${esc(s.latency)}</span><span>可用性 ${esc(s.uptime)}</span></div>
          ${s.note ? `<div class="mon-note">${esc(s.note)}</div>` : ''}
        </div>`).join('')}
    </div>
    <div class="mon-row">
      <div class="side-card" style="flex:1">
        <div class="side-card-head">存储与目录</div>
        <div class="side-card-body">
          <div class="usage-top"><span class="usage-num">${body.storage.used} ${body.storage.unit}</span><span class="usage-unit">/ ${body.storage.total} ${body.storage.unit}</span><span class="usage-pct">${storagePct}%</span></div>
          <div class="usage-bar"><span style="width:${storagePct}%"></span></div>
          <div class="usage-note">${esc(body.storage.note)}</div>
        </div>
      </div>
      <div class="side-card" style="flex:1">
        <div class="side-card-head">失败任务与告警</div>
        <div class="side-card-body">
          ${body.failures.map((f) => `<div class="fail-row"><span class="fail-name">${esc(f.task)}</span><span class="fail-reason">${esc(f.reason)}</span><span class="mono">${esc(f.at)}</span><span class="tag">${esc(f.retry)}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="apps-note">P95 与可用性为演示读数，正式验收按 PRD 第 11 章测试计划执行；此处只暴露运维可观测面。</div>`
}


async function renderFeedback(box) {
  const { body } = await api('/api/feedback')
  state.feedback = body.items || []
  box.innerHTML = `
    <div class="toolbar" style="margin-bottom:12px"><span class="mono" style="color:var(--muted)">来自员工与应用的反馈，可关联到任务与审计</span><span class="spacer"></span><button class="btn sm" id="mkFeedback">代录反馈</button></div>
    <div class="table-card">
      <div class="table-head" style="display:grid;grid-template-columns:minmax(0,2fr) 1fr 100px 80px"><span>反馈</span><span>来源</span><span>提交人</span><span>状态</span></div>
      ${state.feedback.map((f) => `
        <div class="row fb-row" style="grid-template-columns:minmax(0,2fr) 1fr 100px 80px">
          <span class="name"><b>${esc(f.subject)}</b><span>${esc(f.kind)} · ${esc(f.app)}${f.task ? ` · 关联 ${esc(f.task)}` : ''}</span></span>
          <span class="src">${esc(f.app)}</span>
          <span class="tm">${esc(f.actor)}</span>
          <span><span class="tag ${f.status === '已修复' ? 'ok' : f.status === '处理中' ? 'warn' : ''}">${esc(f.status)}</span></span>
        </div>`).join('')}
    </div>`
  box.querySelector('#mkFeedback').addEventListener('click', openFeedbackModal)
}


async function renderAppReview(box) {
  const { body } = await api('/api/apps')
  const all = state.apps.length ? state.apps : body.items
  const queue = all.filter((a) => a.status !== 'published')
  box.innerHTML = `
    <div class="apps-note" style="margin-bottom:12px">流转链路：注册 → 接入验证（URL / 身份 / 权限 / 健康检查）→ 审核 → 发布 → 版本维护。普通员工只能看到已发布应用。</div>
    <div class="table-card">
      <div class="table-head" style="display:grid;grid-template-columns:minmax(0,1.8fr) 1fr 84px 80px 200px"><span>应用</span><span>网络</span><span>版本</span><span>状态</span><span></span></div>
      ${queue.map((a) => `
        <div class="row appx-row" style="grid-template-columns:minmax(0,1.8fr) 1fr 84px 80px 200px">
          <span class="name"><b>${esc(a.name)}</b><span>${esc(a.dept)} · ${esc(a.maintainer)}</span></span>
          <span class="src">${esc((a.nets || []).map((n) => NET_LABEL[n]).join(' / '))}</span>
          <span class="tm">v${esc(a.version)}</span>
          <span><span class="tag ${a.status === 'review' ? 'warn' : ''}">${a.status === 'review' ? '待审核' : '草稿'}</span></span>
          <span class="row-actions">
            <button class="btn sm primary" data-appx="approve" data-id="${a.id}">审核通过</button>
            <button class="btn sm" data-appx="reject" data-id="${a.id}">驳回</button>
            <button class="btn sm" data-detail="${a.id}">详情</button>
          </span>
        </div>`).join('') || '<div style="padding:20px;color:var(--muted)">审核队列为空</div>'}
    </div>
    <div class="side-card" style="margin-top:12px">
      <div class="side-card-head">已发布应用 · 版本维护</div>
      <div class="side-card-body">
        ${all.filter((a) => a.status === 'published').map((a) => `
          <div class="fail-row">
            <span class="fail-name">${esc(a.name)} v${esc(a.version)}</span>
            <span class="fail-reason">${esc(a.dept)} · ${esc((a.nets || []).map((n) => NET_LABEL[n]).join(' / '))}</span>
            <button class="btn sm" data-appx="rollback" data-id="${a.id}">回滚</button>
            <button class="btn sm" data-appx="offline" data-id="${a.id}">下架</button>
          </div>`).join('') || '<div style="color:var(--muted)">暂无已发布应用</div>'}
      </div>
    </div>`
  box.querySelectorAll('[data-appx]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/apps/action', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: b.dataset.id, action: b.dataset.appx }),
    })
    if (!ok) return toast(res.error || '操作失败', true)
    toast(`应用状态已更新：${b.dataset.appx} → ${res.item.status}`)
    renderView()
  }))
  box.querySelectorAll('[data-detail]').forEach((b) => b.addEventListener('click', () => openAppDetail(b.dataset.detail)))
}


/* --------------------------- automation --------------------------- */

async function renderAutomation(el) {
  const { body } = await api('/api/automations')
  state.automations = body.items || []
  el.innerHTML = `
    <div class="view-head">
      <div><div class="view-title">自动化任务</div></div>
      <div class="spacer"></div><button class="btn primary" id="newAuto">${icon('plus')}新建自动化</button>
    </div>
    <div class="table-card">
      <div class="table-head" style="display:grid;grid-template-columns:minmax(0,1.6fr) 150px 200px 80px 150px"><span>自动化</span><span>频率</span><span>最近执行</span><span>状态</span><span></span></div>
      ${state.automations.map((a) => `
        <div class="row auto-row" style="grid-template-columns:minmax(0,1.6fr) 150px 200px 80px 150px">
          <span class="name"><b>${esc(a.name)}</b><span>${esc(a.owner)} · 下次 ${esc(a.next)}</span></span>
          <span class="src">${esc(a.schedule)}</span>
          <span class="tm">${esc(a.last)}</span>
          <span><span class="tag ${a.status === 'active' ? 'ok' : ''}">${a.status === 'active' ? '运行中' : '已暂停'}</span></span>
          <span class="row-actions"><button class="btn sm" data-run="${a.id}">立即执行</button><button class="btn sm" data-pause="${a.id}">${a.status === 'active' ? '暂停' : '启用'}</button></span>
        </div>`).join('')}
    </div>`
  el.querySelector('#newAuto').addEventListener('click', openAutomationForm)
  el.querySelectorAll('[data-run]').forEach((b) => b.addEventListener('click', async () => {
    const { ok, body: res } = await api('/api/automations/run', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: b.dataset.run }) })
    if (!ok) return toast(res.error, true)
    toast(`已触发执行，任务 ${res.task.id} 进入队列`)
    renderView()
  }))
  el.querySelectorAll('[data-pause]').forEach((b) => b.addEventListener('click', () => {
    const a = state.automations.find((x) => x.id === b.dataset.pause)
    a.status = a.status === 'active' ? 'paused' : 'active'
    toast(`已${a.status === 'active' ? '启用' : '暂停'}「${a.name}」（演示状态）`)
    renderView()
  }))
}


const ACCENTS = [
  { key: 'blue', label: '蓝色（默认）', dot: '#2f6fe4' },
  { key: 'green', label: '绿色', dot: '#1f8a5b' },
  { key: 'yellow', label: '黄色', dot: '#f0b429' },
  { key: 'pink', label: '粉色', dot: '#e768a2' },
  { key: 'orange', label: '橙色', dot: '#e06b3c' },
  { key: 'purple', label: '紫色', dot: '#7c5cd6' },
  { key: 'black', label: '黑色', dot: '#1b1d21' },
  { key: 'gray', label: '灰色', dot: '#6b7280' }
]
const accentMeta = (key) => ACCENTS.find((a) => a.key === key) || ACCENTS[0]
function applyAccent() {
  const meta = accentMeta(state.accent)
  const key = meta.key === 'default' ? 'blue' : meta.key
  document.body.dataset.accent = key
  try { localStorage.setItem('jg.accent', key) } catch (e) {}
}

function accentPick() {
  const cur = accentMeta(state.accent)
  return `<div class="accent-wrap">
    <button class="accent-pick" id="accentPick" type="button"><i class="accent-dot" style="background:${cur.dot}"></i><span>${cur.label}</span><span class="ico">${icon('chevron')}</span></button>
    <div class="accent-menu" id="accentMenu" hidden>
      ${ACCENTS.map((a) => `<button class="accent-row" type="button" data-accent-set="${a.key}"><i class="accent-dot" style="background:${a.dot}"></i><span class="lbl">${a.label}</span><span class="accent-check">${a.key === state.accent ? icon('check') : ''}</span></button>`).join('')}
    </div>
  </div>`
}

function renderSettings(el) {
  const q = state.settingsQuery.trim()
  const tabs = q
    ? settingsTabs.filter((t) => `${t.label}${t.kw}`.includes(q))
    : settingsTabs
  const active = tabs.some((t) => t.id === state.settingsTab) ? state.settingsTab : (tabs[0]?.id || 'general')
  const body = settingsBody(active)

  const navGroups = ['个人', '安全与数据', '集成', '关于']
    .map((g) => {
      const items = tabs.filter((t) => t.group === g)
      if (!items.length) return ''
      return `<div class="set-nav-group">${g}</div>
        ${items.map((t) => `<button class="set-nav-item${t.id === active ? ' active' : ''}" data-set-tab="${t.id}">${t.label}</button>`).join('')}`
    }).join('')

  el.innerHTML = `
    <div class="settings-shell">
      <aside class="settings-side">
        <div class="settings-side-title">设置</div>
        <div class="settings-search">
          <span class="ico">${icon('search')}</span>
          <input id="setSearch" placeholder="搜索设置" value="${esc(state.settingsQuery)}">
        </div>
        <div class="settings-nav">${navGroups || '<div class="set-empty">无匹配设置项</div>'}</div>
      </aside>
      <div class="settings-main">
        <div class="settings-h1">${body.title}</div>
        ${body.groups.join('')}
      </div>
    </div>`

  el.querySelectorAll('[data-set-tab]').forEach((b) => {
    b.addEventListener('click', () => {
      state.settingsTab = b.dataset.setTab
      renderView()
    })
  })

  const search = el.querySelector('#setSearch')
  search.addEventListener('input', (e) => {
    state.settingsQuery = e.target.value
    state.settingsTab = ''
    renderView()
    const next = document.getElementById('setSearch')
    if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length) }
  })

  const ap = el.querySelector('#accentPick')
  const am = el.querySelector('#accentMenu')
  if (ap && am) {
    ap.addEventListener('click', (e) => {
      e.stopPropagation()
      const willOpen = am.hidden
      am.hidden = !willOpen
      if (willOpen) {
        am.style.top = ''
        am.style.bottom = ''
        const r = ap.getBoundingClientRect()
        if (window.innerHeight - r.bottom < 380) am.style.top = 'auto', am.style.bottom = 'calc(100% + 8px)'
        setTimeout(() => {
          const close = (ev) => {
            if (am.contains(ev.target) || ap.contains(ev.target)) return
            am.hidden = true
            document.removeEventListener('click', close, true)
          }
          document.addEventListener('click', close, true)
        }, 0)
      }
    })
    el.querySelectorAll('[data-accent-set]').forEach((row) => {
      row.addEventListener('click', () => {
        state.accent = row.dataset.accentSet
        applyAccent()
        am.hidden = true
        renderView()
      })
    })
  }

  el.querySelectorAll('[data-act]').forEach((b) => {
    b.addEventListener('click', () => {
      const act = b.dataset.act
      const map = {
        workspace: '工作区变更需在客户端选择目录，并由数据中心记录归属（演示）',
        workspaceReset: '已恢复为默认工作区（演示）',
        reauth: '已发起二次认证（演示）：认证结果写入审计',
        devices: '当前仅 1 台受信设备：Windows 10 · 内网地址段（演示）',
        diag: '诊断完成：模型连通 72 ms；数据中心接口 200；证书有效期至 2027-05（演示）',
        saveKey: '个人密钥已写入操作系统凭证库，界面仅保留掩码（演示）',
        clearKey: '已清除本机保存的个人密钥（演示）',
        applyAccess: '已提交授权申请：数据管理员审批，审批链与结果进审计（演示）',
        export: '导出需二次确认；涉密内容导出须审批并留痕（演示）',
        archive: '归档会话：按保留期自动迁移，可申请调阅（演示）',
        clearCache: '已清理本机缓存，业务数据不在客户端留存（演示）',
        testMcp: 'MCP 连接正常，工具 12 项；写操作需二次确认（演示）',
        update: '当前为内网最新版本；新版本随离线包分发（演示）',
        help: '内网文档站 help.jg.local；工单由本域运维受理（演示）',
      }
      if (act === 'moreConfig') {
        openMoreConfig()
        return
      }
      if (act === 'gotoSkills') {
        state.view = 'skills'
        render()
        return
      }
      toast(map[act] || '（演示）')
    })
  })
}


function settingsBody(tab) {
  const { user, counts, models } = state.boot
  const p = 'set-'

  if (tab === 'general') {
    return {
      title: '常规',
      groups: [
        sgroup('权限', [
          srow('默认工作区文件读写', '允许在工作区内读取与整理文件；访问工作区外目录需单次授权', sw(`${p}fs`, true)),
          srow('工具自动执行', '仅低风险只读工具可自动执行；写操作与高危调用始终二次确认', sw(`${p}auto`, false)),
          srow('互联网访问', '涉密内网环境不可开启；外发内容按数据级别策略控制', sw(`${p}web`, false, true)),
        ]),
        sgroup('常规', [
          srow('默认工作区', '会话与任务的默认落盘位置，仍受数据中心授权约束',
            `<span class="mono set-value">D:\\JGWorkspace\\${esc(user.unit)}</span><span class="set-btn-gap"></span>${sbtn('workspace', '更改')}${sbtn('workspaceReset', '重置')}`),
          srow('默认模型', '逻辑模型标识稳定，展示名与版本由平台统一维护',
            sel(`${p}model`, models.map((m) => m.label), state.composerModel === 'jg-enterprise' ? 'JG-Enterprise' : 'Qwen3.8-27B')),
          srow('界面语言', '界面文案语言，不改变数据内容的语言', sel(`${p}lang`, ['简体中文', '自动检测'], '简体中文')),
          srow('关闭窗口前确认', '使用关闭快捷键导致窗口关闭时给出提示', sel(`${p}close`, ['仅在使用关闭快捷键时', '总是确认', '从不确认'], '仅在使用关闭快捷键时')),
          srow('登录时启动应用', '开机后随系统登录自动启动客户端', sw(`${p}launch`, true)),
          srow('底部状态栏', '在客户端底部显示网络域、任务与连接状态', sw(`${p}status`, true)),
        ]),
      ],
    }
  }

  if (tab === 'appearance') {
    return {
      title: '个性化',
      groups: [
        sgroup('界面', [
          srow('主题', '企业规范以浅色为主，深色用于夜间与投屏场景', sel(`${p}theme`, ['浅色', '深色', '跟随系统'], '浅色')),
          srow('界面密度', '影响列表行高与卡片间距', sel(`${p}density`, ['标准', '紧凑'], '标准')),
          srow('正文字号', '仅影响会话与文档阅读区', sel(`${p}font`, ['标准', '较大'], '标准')),
          srow('侧栏默认展开', '启动时展开导航；窄窗口自动收起', sw(`${p}side`, true)),
        ]),
        sgroup('品牌', [
          srow('强调色', '用于选中态、链接与生成按钮；默认蓝色，可切换为绿、黄、粉、橙、紫、黑、灰', accentPick()),
          srow('客户端标识', '启动页与关于页展示的企业名称', '<span class="set-value">九江市规划设计集团</span>'),
        ]),
        sgroup('企业工作台', [
          srow('收起与置顶', '选择哪些企业模块收进图标栏的「更多」，AI 工作台不参与调整', sbtn('moreConfig', '整理')),
        ]),
      ],
    }
  }

  if (tab === 'notifications') {
    return {
      title: '通知',
      groups: [
        sgroup('提醒类型', [
          srow('任务完成提醒', '自动化任务与长任务结束、失败时提醒', sw(`${p}task`, true)),
          srow('审批与授权变更', '授权范围、应用审核、工单状态变化时提醒', sw(`${p}approve`, true)),
          srow('涉密访问被拒绝', '安全事件必达，不可关闭', sw(`${p}deny`, true, true)),
          srow('系统维护通知', '客户端与服务端维护窗口提前告知', sw(`${p}maint`, true)),
        ]),
        sgroup('投递', [
          srow('通知渠道', '站内消息为默认渠道，邮件需本域邮件服务已接入', sel(`${p}channel`, ['站内消息', '邮件', '两者'], '站内消息')),
          srow('免打扰时段', '该时段内仅保留安全事件提醒', sel(`${p}quiet`, ['不设置', '22:00—07:00', '自定义'], '22:00—07:00')),
        ]),
      ],
    }
  }

  if (tab === 'profile') {
    return {
      title: '个人资料',
      groups: [
        sgroup('身份', [
          srow('姓名', '', `<span class="set-value">${esc(user.name)}</span>`),
          srow('员工编码', '集团唯一编码，跨网一致；各网络独立认证', `<span class="set-value mono">JG-1901-0766</span>`),
          srow('所属单位', '', `<span class="set-value">${esc(user.org)} / ${esc(user.unit)}</span>`),
          srow('岗位', '一人多岗时以主岗展示，兼任关系在授权服务维护', `<span class="set-value">${esc(user.duty)}</span>`),
        ]),
        sgroup('安全', [
          srow('二次认证', '登录与高危操作需二次认证，认证记录进审计', '<span class="tag ok">已启用</span><span class="set-btn-gap"></span>' + sbtn('reauth', '重新认证')),
          srow('当前设备', 'Windows 10 · 客户端 1.0.0-mvp · 内网地址段', sbtn('devices', '查看全部设备')),
        ]),
      ],
    }
  }

  if (tab === 'network') {
    return {
      title: '网络与凭证',
      groups: [
        sgroup('网络', [
          srow('当前网络', '决定可用模型、数据源与工具集合', '<span class="tag secret">涉密内网</span>'),
          srow('涉密内网', '已连接，Qwen3.8-27B 本地推理与涉密数据源可用', '<span class="tag ok">已连接</span>'),
          srow('政务网', '独立实例，未在本机接入', '<span class="tag">未接入</span>'),
          srow('互联网', '隔离，未经批准不得跨网访问', '<span class="tag">隔离</span>'),
          srow('网络诊断', '检查模型连通性、数据中心接口与证书有效期', sbtn('diag', '运行诊断')),
        ]),
        sgroup('凭证', [
          srow('政务模型 Token', '由服务端持有，客户端不落盘、不展示', '<span class="set-value">服务端托管</span>'),
          srow('操作系统凭证库', '个人密钥存入系统受保护存储，不以明文出现在配置与日志', sw(`${p}keychain`, true)),
          srow('会话有效期', '超过时限需重新认证，长任务由服务端续跑', sel(`${p}session`, ['8 小时', '4 小时', '1 小时'], '8 小时')),
        ]),
      ],
    }
  }

  if (tab === 'models') {
    return {
      title: '模型与密钥',
      groups: [
        sgroup('可用模型', [
          srow('企业统一模型', '逻辑 ID jg-enterprise；展示名与版本由平台维护', '<span class="tag ok">可用</span>'),
          srow('内网推理模型', 'Qwen3.8-27B · 本地推理 · 量化格式待实测确认', '<span class="tag ok">可用</span>'),
          srow('政务模型', '九江统一政务模型；Token 服务端持有，按配额计量', '<span class="tag">本网不可用</span>'),
        ]),
        sgroup('个人密钥', [
          srow('个人 API Key', '仅互联网环境使用；涉密内容禁止经个人密钥外发',
            `<input class="mini-input mono" id="${p}key" value="sk-••••••••••••4f2a" readonly><span class="set-btn-gap"></span>${sbtn('saveKey', '保存到凭证库')}${sbtn('clearKey', '清除')}`),
          srow('数据外发策略', '决定个人模型可接触的数据级别', sel(`${p}egress`, ['禁止涉密与敏感内容外发', '仅内部级可外发', '按单次审批'], '禁止涉密与敏感内容外发')),
        ]),
      ],
    }
  }

  if (tab === 'access') {
    return {
      title: '授权范围',
      groups: [
        sgroup('当前身份', [
          srow('角色', '由组织与岗位决定，个人不可自行变更', `<span class="set-value">${esc(user.label)}</span>`),
          srow('可见资源', '服务端按密级与组织范围计算，前端隐藏不作为安全边界', `<span class="set-value mono">${counts.resources} / ${counts.resourcesTotal}</span>`),
          srow('可用入口', '', `<span class="set-value mono">${user.visibleModules.length} 个</span>`),
        ]),
        sgroup('范围', [
          srow('授权范围', '', `<div class="scope-chips">${user.scopes.map((s) => `<span class="scope">${esc(s)}</span>`).join('')}</div>`),
          srow('说明', '', `<span class="set-desc" style="display:block;max-width:420px">${esc(user.note)}</span>`),
          srow('申请额外授权', '提交后由数据管理员审批，审批链与结果进审计', sbtn('applyAccess', '发起申请')),
        ]),
      ],
    }
  }

  if (tab === 'data') {
    return {
      title: '数据管理',
      groups: [
        sgroup('会话与任务', [
          srow('会话保留期', '服务端保留会话与结果的期限，到期归档', sel(`${p}retain`, ['180 天', '90 天', '30 天', '长期保留（需审批）'], '180 天')),
          srow('导出会话', '导出为 Markdown 或 JSON；涉密内容导出需审批并留痕', sbtn('export', '导出')),
          srow('归档会话', '查看已归档会话与任务记录', sbtn('archive', '查看归档')),
        ]),
        sgroup('本机', [
          srow('本地缓存', '仅缓存界面资源与会话索引；业务数据不在客户端留存', sbtn('clearCache', '清理缓存')),
          srow('离线可用', '缓存最近会话与文档摘要，断网时可读不可写', sw(`${p}offline`, true)),
        ]),
      ],
    }
  }

  if (tab === 'integrations') {
    return {
      title: '插件与工具',
      groups: [
        sgroup('已启用', [
          srow('企业插件', '由平台统一发布与回滚，按网络环境可裁剪', `<span class="set-value mono">${counts.plugins} 个</span><span class="set-btn-gap"></span>${sbtn('gotoSkills', '管理')}`),
          srow('个人技能', '仅本人可用；发布给他人需走企业技能审核', `<span class="set-value mono">${state.plugins.filter((p0) => p0.kind === 'personal').length} 个</span><span class="set-btn-gap"></span>${sbtn('gotoSkills', '管理')}`),
        ]),
        sgroup('MCP 与接口', [
          srow('MCP 服务地址', '本域工具服务，连接前校验证书与授权范围',
            `<input class="mini-input mono" id="${p}mcp" value="mcp://intranet.jg.local/tools" readonly><span class="set-btn-gap"></span>${sbtn('testMcp', '连接测试')}`),
          srow('写操作确认', 'MCP 工具的写操作默认二次确认，不可全局关闭', '<span class="set-value">强制开启</span>'),
        ]),
      ],
    }
  }

  return {
    title: '关于',
    groups: [
      sgroup('版本', [
        srow('客户端版本', 'Windows 客户端，随内网离线包分发', '<span class="set-value mono">1.0.0-mvp</span>'),
        srow('运行时基线', 'DeepSeek Harness，锁定版本并按季度吸收上游补丁', '<span class="set-value mono">0.2.2-rc.1</span>'),
        srow('更新通道', '内网离线包，更新前完成回归与签名校验', sbtn('update', '检查更新')),
      ]),
      sgroup('帮助', [
        srow('帮助与反馈', '内网文档站与工单由本域运维受理', sbtn('help', '打开帮助')),
        srow('许可与合规', '使用范围受集团信息安全制度与数据分级约束', '<span class="set-value">内部文档</span>'),
      ]),
    ],
  }
}


/* ------------------------- 登录 / 登出 / 授权（恢复） ------------------------- */

function renderLogin(el) {
  document.body.classList.add('login-mode')
  const netId = state.loginNet || (state.boot.network && state.boot.network.id) || 'inet'
  const roleId = state.loginRole || ''
  const nets = state.boot.allNetworks || []
  const roles = state.boot.allRoles || []
  const netDesc = { inet: '企业云模型与获准个人模型', gov: '政务网专用模型，数据不出网', secret: '涉密内网，物理隔离环境' }
  el.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-brand">九规智能中枢</div>
        <div class="login-sub">九江市规划设计集团 · 企业级 AI 中枢</div>
        <div class="login-section">安全域</div>
        <div class="login-nets">
          ${nets.map((n) => `<button class="login-net ${n.id === netId ? 'on' : ''}" data-lnet="${esc(n.id)}"><b>${esc(n.label)}</b><span>${esc(netDesc[n.id] || '按本网授权口径')}</span></button>`).join('')}
        </div>
        <div class="login-section">账号</div>
        <div class="login-users">
          ${roles.map((r) => `<button class="login-user ${r.id === roleId ? 'on' : ''}" data-lrole="${esc(r.id)}"><span class="login-avatar">${esc(String(r.name || '').slice(-1))}</span><span><b>${esc(r.name)}</b><i style="display:block;font-style:normal;color:var(--muted);font-size:var(--fs-micro);margin-top:2px">${esc(r.label)} · ${esc(r.unit)}</i></span></button>`).join('')}
        </div>
        <div style="margin-top:18px;display:flex;align-items:center;gap:10px">
          <button class="btn primary" id="loginGo" ${roleId ? '' : 'disabled'}>进入 九规智能中枢</button>
          <span style="font-size:var(--fs-micro);color:var(--muted);line-height:1.5">先选安全域、再选账号；登录后只下发本域的模型、工具与资源目录</span>
        </div>
      </div>
    </div>`
  el.querySelectorAll('[data-lnet]').forEach((b) => b.addEventListener('click', () => {
    state.loginNet = b.dataset.lnet
    renderLogin(el)
  }))
  el.querySelectorAll('[data-lrole]').forEach((b) => b.addEventListener('click', () => {
    state.loginRole = b.dataset.lrole
    renderLogin(el)
    el.querySelector('#loginGo').disabled = false
  }))
  const go = el.querySelector('#loginGo')
  if (go) go.addEventListener('click', async () => {
    if (!state.loginRole) return
    const role = state.loginRole
    const net = state.loginNet || netId
    await Promise.all([
      api('/api/network', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: net }) }),
      api('/api/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ role }) }),
    ])
    state.loginRole = ''
    document.body.classList.remove('login-mode')
    await loadBoot()
    state.view = 'home'
    render()
    toast(`已以「${(state.boot.user || {}).name || role}」身份登录 · ${(state.boot.network || {}).label || net}`)
  })
}

async function logout() {
  try { await api('/api/logout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }) } catch (e) { /* 会话可能已过期 */ }
  state.boot = null
  state.conversation = null
  document.body.classList.remove('login-mode')
  document.getElementById('railbar').innerHTML = ''
  document.getElementById('sidebar').innerHTML = ''
  document.getElementById('topbar').innerHTML = ''
  await loadBoot()
  document.body.classList.add('login-mode')
  render()
}

function openGrantDialog(r, grants) {
  const list = Array.isArray(grants) ? grants : []
  const mask = openModal(`授予资源引用权限 · ${r.name}`, `
    <div style="font-size:var(--fs-sub);color:var(--text-2);line-height:1.6">授权对象限于本集团的组织、部门与角色；授予后该对象可在项目、智能笔记本与 AI 检索中引用本资源，原始文件仍由数据中心保管，不接受复制。</div>
    <div class="grant-list" style="margin-top:12px">${list.map((g) => `<div class="grant-row"><span class="tag">${esc(g.type)}</span><span class="grant-target">${esc(g.target)}</span><span class="mono grant-rights">${esc((g.rights || []).join(' / '))}</span><span class="mono" style="color:var(--muted);font-size:var(--fs-micro)">${esc(g.by)} · ${esc(g.at)}</span></div>`).join('') || '<span class="mono" style="color:var(--muted)">暂无授权记录</span>'}</div>
    <div style="margin-top:14px;display:flex;gap:8px;align-items:center">
      <span style="font-size:var(--fs-meta);color:var(--muted)">对象</span>
      <input id="grantTarget" placeholder="如：规划一所 / 集团知识库治理专项" style="flex:1;border:1px solid var(--line);border-radius:8px;padding:7px 10px;font-size:var(--fs-sub)">
      <button class="btn primary" id="grantAdd">授予引用</button>
    </div>
    <div style="margin-top:10px;font-size:var(--fs-micro);color:var(--muted)">判定在服务端执行：被授予方按「查看 / 下载 / 引用 / 编辑」逐项放行，越权请求返回 403 并写审计。</div>`, { width: 620 })
  mask.querySelector('#grantAdd').addEventListener('click', async () => {
    const target = (mask.querySelector('#grantTarget').value || '').trim()
    if (!target) return toast('请填写授权对象')
    const { ok } = await api('/api/resource/grant', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: r.id, type: '部门', target, rights: ['查看', '引用'] }),
    })
    if (!ok) return
    toast(`已授予「${target}」引用权限`)
    mask.remove()
  })
}


const TASK_IDEAS = [
  { name: '每日公示项目变更摘要', desc: '每天 08:30 读取公示项目台账，比昨日快照，摘要投递到项目组群', sch: '每天 08:30' },
  { name: '本周工作小结草稿', desc: '每周五 17:00 汇总本周会话与项目结论，生成周报草稿投递到项目文档', sch: '每周五 17:00' },
  { name: '城市体检指标月度快照', desc: '每月 1 日 09:00 生成体检指标快照表，口径变化单独列一节', sch: '每月 1 日 09:00' },
  { name: '影像入库核验单', desc: '每季度首月 5 日核对影像范围、分辨率与元数据，生成核验单', sch: '每季度首月 5 日' },
  { name: '审图意见周汇总', desc: '每周一 09:00 收集各项目审图意见，按专业归类并跟踪回复状态', sch: '每周一 09:00' },
  { name: '知识库索引巡检', desc: '每周一 09:00 检查未建索引与解析失败的文档，生成待处理清单', sch: '每周一 09:00' },
]


/* --------------------- 更多菜单自定义（仅企业工作台） --------------------- */

function openMoreConfig() {
  const { user } = state.boot
  const visibles = (id) => user.visibleModules.includes(id)
  const aiItems = [['home', '首页'], ['imagegen', '图像'], ['tasks', '定时任务'], ['skills', '插件与技能'], ['projects', '项目']]
  const moved = ENTERPRISE_ITEMS.filter(([id]) => state.moreSet.includes(id) && visibles(id))
  const inRail = ENTERPRISE_ITEMS.filter(([id]) => !state.moreSet.includes(id) && visibles(id))
  const mask = openModal('整理企业工作台', `
    <div style="font-size:var(--fs-sub);color:var(--text-2);line-height:1.6;max-width:560px"></div>
    <div class="mc-grid">
      <div class="mc-col">
        <div class="mc-h">图标栏显示 <span class="mono">${inRail.length}</span></div>
        ${inRail.map(([id, label, ic]) => `<div class="mc-row"><span class="ico">${icon(ic)}</span><span class="mc-name">${esc(state.boot.modules[id]?.label || label)}</span><button class="btn sm subtle" data-mc-out="${id}">收进更多</button></div>`).join('') || '<div class="mc-empty">全部已收进更多</div>'}
      </div>
      <div class="mc-col">
        <div class="mc-h">收进更多 <span class="mono">${moved.length}</span></div>
        ${moved.map(([id, label, ic]) => `<div class="mc-row"><span class="ico">${icon(ic)}</span><span class="mc-name">${esc(state.boot.modules[id]?.label || label)}</span><button class="btn sm subtle" data-mc-in="${id}">放回图标栏</button></div>`).join('') || '<div class="mc-empty">暂无</div>'}
      </div>
    </div>
    <div class="mc-fixed"><div class="mc-h">AI 工作台（固定）</div><div class="mc-tags">${aiItems.map(([id, label]) => `<span class="tag">${esc(state.boot.modules[id]?.label || label)}</span>`).join('')}</div><div class="mc-note"></div></div>`, { width: 720 })
  const sync = () => {
    localStorage.setItem('jg.moreSet', JSON.stringify(state.moreSet))
    renderRail()
  }
  mask.querySelectorAll('[data-mc-out]').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.mcOut
    if (!state.moreSet.includes(id)) state.moreSet.push(id)
    sync(); mask.remove(); openMoreConfig()
    toast(`已把「${state.boot.modules[id]?.label || id}」收进更多`)
  }))
  mask.querySelectorAll('[data-mc-in]').forEach((b) => b.addEventListener('click', () => {
    const id = b.dataset.mcIn
    state.moreSet = state.moreSet.filter((x) => x !== id)
    sync(); mask.remove(); openMoreConfig()
    toast(`已把「${state.boot.modules[id]?.label || id}」放回图标栏`)
  }))
}

/* ===== 恢复：设置页配置常量 ===== */
const settingsTabs = [
  { id: 'general', label: '常规', group: '个人', scope: 'personal', kw: '权限 工作区 模型 语言 启动 状态栏' },
  { id: 'appearance', label: '个性化', group: '个人', scope: 'personal', kw: '主题 密度 字号 侧栏 品牌色' },
  { id: 'notifications', label: '通知', group: '个人', scope: 'personal', kw: '任务 审批 授权 涉密 维护 渠道' },
  { id: 'profile', label: '个人资料', group: '个人', scope: 'personal', kw: '姓名 编码 岗位 任职 认证 设备 授权' },
  { id: 'network', label: '网络与凭证', group: '安全与数据', scope: 'personal', kw: '网络 政务 互联网 令牌 凭证 诊断' },
  { id: 'models', label: '模型与密钥', group: '安全与数据', scope: 'personal', kw: '模型 密钥 外发 个人 Key' },
  { id: 'usage', label: '用量与配额', group: '安全与数据', scope: 'personal', kw: 'token 用量 配额 账单 超额 模型' },
  { id: 'data', label: '数据管理', group: '安全与数据', scope: 'personal', kw: '保留 导出 缓存 归档' },
  { id: 'integrations', label: '插件与工具', group: '集成', scope: 'personal', kw: '插件 技能 MCP 工具 地址' },
  { id: 'about', label: '关于', group: '其他', scope: 'personal', kw: '版本 基线 更新 帮助' },
  // 管理类：仅持有 admin 入口的角色可见，普通员工在设置里完全看不到这一段
  { id: 'adm-org', label: '组织与身份', group: '管理（仅管理员）', scope: 'admin', kw: '部门 员工 任职 角色 跨网 身份' },
  { id: 'adm-access', label: '授权与策略', group: '管理（仅管理员）', scope: 'admin', kw: '角色 权限 数据授权 审批 模型 工具' },
  { id: 'adm-catalog', label: '数据目录与接入', group: '管理（仅管理员）', scope: 'admin', kw: '目录 资源 Resource 数据源 字段 服务能力' },
  { id: 'adm-apps', label: '应用审核', group: '管理（仅管理员）', scope: 'admin', kw: '应用 接入 验证 审核 发布 下架' },
  { id: 'adm-ops', label: '系统与运维', group: '管理（仅管理员）', scope: 'admin', kw: '三网 实例 环境 证书 更新 限流 可用性' },
  { id: 'adm-audit', label: '审计与告警', group: '管理（仅管理员）', scope: 'admin', kw: '审计 留痕 告警 留存 导出' },
]

const canAdmin = () => (state.boot?.user?.visibleModules || []).includes('admin')

/* ===== 恢复：设置页行级构件 ===== */

const sw = (id, on, disabled = false) => `
  <label class="switch${disabled ? ' disabled' : ''}">
    <input type="checkbox" id="${id}" ${on ? 'checked' : ''} ${disabled ? 'disabled' : ''}><span class="knob"></span>
  </label>`

const sbtn = (act, label) => `<button class="btn sm" data-act="${act}">${label}</button>`

const srow = (label, desc, control) => `
  <div class="set-row">
    <div class="set-copy">
      <div class="set-label">${label}</div>
      ${desc ? `<div class="set-desc">${desc}</div>` : ''}
    </div>
    <div class="set-ctrl">${control}</div>
  </div>`

const sgroup = (title, rows) => `
  <div class="set-group">
    <div class="set-group-title">${title}</div>
    <div class="set-rows">${rows.join('')}</div>
  </div>`

/* 下拉选择构件（设置页） */
const sel = (id, options, current) => `
  <select class="mini-select" id="${id}">
    ${options.map((o) => `<option ${o === current ? 'selected' : ''}>${o}</option>`).join('')}
  </select>`

/* 开关构件（设置页；若已有 sw 则忽略此段） */
const kn = (id, on, disabled = false) => `
  <label class="switch${disabled ? ' disabled' : ''}">
    <input type="checkbox" id="${id}" ${on ? 'checked' : ''} ${disabled ? 'disabled' : ''}><span class="knob"></span>
  </label>`

/* v28ab 强调色：启动时套用上次选择 */
applyAccent()

/* v28t 省略号悬浮全文：被截断的文字悬停时用系统提示显示完整内容 */
document.addEventListener('mouseover', (e) => {
  const t = e.target
  if (!t || !t.getBoundingClientRect) return
  const cands = [t, t.parentElement].filter(Boolean)
  for (const el of cands) {
    if (el.title) continue
    let cs
    try { cs = getComputedStyle(el) } catch (_) { continue }
    const clamp = parseInt(cs.webkitLineClamp || '0', 10)
    const cut = (cs.textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 2) ||
      (clamp > 0 && el.scrollHeight > el.clientHeight + 2)
    if (cut) {
      el.title = (el.textContent || '').trim()
      break
    }
  }
}, true)
