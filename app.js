'use strict';
/* =========================================================
   English Around You — 私人 AI 英语外教（纯前端）
   核心流程：说中文 → AI 给最自然的英语 → 自动朗读 → 持续交流
   协议：流式行协议 EN/SIMPLE/ALT/MEAN/FOLLOW/BETTER
   ========================================================= */

// ---------- 存储 ----------
const LS_SETTINGS = 'eay.settings';
const LS_SESSIONS = 'eay.sessions';
const LS_MYENGLISH = 'eay.myenglish';
const LS_CUSTOMSCN = 'eay.customscn';

// ---------- AI 服务商（浏览器直连，均已验证 CORS） ----------
const PROVIDERS = {
  deepseek:  { label:'DeepSeek（推荐）',     baseUrl:'https://api.deepseek.com',                          model:'deepseek-chat',          keyUrl:'https://platform.deepseek.com/api_keys',      hint:'注册充值几元可长期使用' },
  moonshot:  { label:'Kimi（Moonshot）',     baseUrl:'https://api.moonshot.cn/v1',                        model:'moonshot-v1-8k',         keyUrl:'https://platform.moonshot.cn/console/api-keys', hint:'' },
  qwen:      { label:'通义千问（阿里百炼）', baseUrl:'https://dashscope.aliyuncs.com/compatible-mode/v1', model:'qwen-plus',              keyUrl:'https://bailian.console.aliyun.com/',         hint:'qwen-flash 有免费额度' },
  zhipu:     { label:'智谱 GLM',             baseUrl:'https://open.bigmodel.cn/api/paas/v4',              model:'glm-4-flash',            keyUrl:'https://open.bigmodel.cn/usercenter/apikeys',  hint:'glm-4-flash 免费' },
  openai:    { label:'OpenAI（需国际网络）', baseUrl:'https://api.openai.com/v1',                         model:'gpt-4o-mini',            keyUrl:'https://platform.openai.com/api-keys',        hint:'' },
  openrouter:{ label:'OpenRouter（聚合多家）',baseUrl:'https://openrouter.ai/api/v1',                     model:'deepseek/deepseek-chat', keyUrl:'https://openrouter.ai/keys',                  hint:'一个 Key 调用多家' },
  custom:    { label:'自定义（OpenAI 兼容）', baseUrl:'',                                                 model:'',                       keyUrl:'',                                            hint:'' }
};

const LEVELS = {
  beginner:    { zh:'Beginner 入门',    desc:'Beginner (A1): very short sentences of 3-8 words, only the most common everyday words, almost no clauses.' },
  elementary:  { zh:'Elementary 初级',  desc:'Elementary (A2): short simple sentences, common everyday words and set phrases.' },
  intermediate:{ zh:'Intermediate 中级',desc:'Intermediate (B1): natural connected speech with common phrasal verbs and connectors.' },
  advanced:    { zh:'Advanced 高级',    desc:'Advanced (B2+): fully natural native phrasing with tone, nuance and idioms.' }
};

const MODES = {
  translate: { zh:'怎么说', en:'Translate' },
  coach:     { zh:'外教',   en:'Coach' },
  life:      { zh:'生活',   en:'Life' }
};

// My English 分类
const CATS = {
  family:  { zh:'Family 家庭',  emoji:'👨‍👩‍👧' },
  driving: { zh:'Driving 开车', emoji:'🚗' },
  travel:  { zh:'Travel 旅行',  emoji:'✈️' },
  food:    { zh:'Food 餐饮',    emoji:'🍽' },
  shopping:{ zh:'Shopping 购物',emoji:'🛒' },
  work:    { zh:'Work 工作',    emoji:'💼' },
  outdoor: { zh:'Outdoor 户外', emoji:'🌳' },
  health:  { zh:'Health 医疗',  emoji:'🏥' },
  daily:   { zh:'Daily Life 日常', emoji:'🌤' }
};

// ---------- 场景库（50 个，[id, emoji, 中文, English, 分类, 提示]） ----------
const SCN_RAW = [
['family','🏠','家庭生活','Family','family','Home life with family: routines, reminders, requests, agreeing or refusing gently, comforting, encouraging, safety reminders, weather and plans.'],
['parenting','👨‍👩‍👧','亲子交流','Parenting','family','Parent talking to a young child: wake up, get dressed, brush teeth, meals, going out, bedtime; safety ("hold my hand", "watch your step", "don\'t run"); feelings ("what\'s wrong?", "it\'s okay, I\'m here", "are you tired?"); praise ("great job", "try again", "you can do it"). Warm, simple, age-appropriate.'],
['driving','🚗','开车出行','Driving','driving','In the car with family: setting off ("ready to go?", "buckle up"), traffic, navigation ("how much longer?", "let\'s take another route"), light chat, safety reminders. Keep phrases SHORT — instantly understood English.'],
['transport','🚌','日常出行','Transportation','travel','Getting around: buses, schedules, tickets, stops, asking about routes.'],
['travel','✈️','旅行','Travel','travel','Full travel flow: departure, airport, security, boarding, flight, arrival, immigration, taxi, hotel, sights, shopping, asking directions, heading home.'],
['hotel','🏨','酒店','Hotel','travel','Hotel situations: check-in/out, room issues, towels, Wi-Fi, breakfast, late checkout, housekeeping, changing rooms, luggage storage.'],
['airport','🛫','机场','Airport','travel','Airport: check-in, baggage, security, boarding, gates, delays, transfers, immigration, customs, lost baggage.'],
['restaurant','🍽','餐厅','Restaurant','food','Restaurant: booking, waiting for a table, menu, recommendations, ordering, changes, allergies ("I don\'t eat spicy"), drinks, paying, takeout, complaints and compliments.'],
['cafe','☕','咖啡馆','Cafe','food','Cafe ordering: drinks, sizes, milk options, pastries, customization, payment, small talk.'],
['shopping','🛍','购物','Shopping','shopping','Shopping: finding items, prices, sizes, colors, trying on, stock, discounts, paying, returns and exchanges, comparing products.'],
['grocery','🛒','超市','Grocery','shopping','Grocery store: aisles, quantities, fresh produce, checkout, bags, coupons.'],
['mall','🏬','商场','Mall','shopping','Shopping mall: floors, stores, escalators, food court, promotions, gift cards.'],
['outdoor','🏞','户外','Outdoor','outdoor','Outdoor activities: weather, trails, gear, photos, rest breaks, plans.'],
['park','🌳','公园','Park','outdoor','At the park: walking, playing, feeding birds, benches, weather small talk.'],
['zoo','🦁','动物园','Zoo','outdoor','At the zoo with family: animals, exhibits, feeding times, photos, kid excitement ("look at the giraffes!").'],
['beach','🏖','海边','Beach','outdoor','At the beach: swimming, sunscreen, sand, waves, snacks, shade, water safety with kids.'],
['sports','⚽','运动','Sports','outdoor','Sports and games: playing, watching, scores, teams, equipment, inviting someone to play.'],
['fitness','💪','健身','Fitness','outdoor','Gym and fitness: machines, workouts, reps, classes, trainers, schedules.'],
['cooking','🍳','做饭','Cooking','food','Cooking at home: ingredients, steps, tasting, adjustments ("a little less salt"), kitchen tools.'],
['meals','🍚','吃饭','Meals','food','Family meals: serving food, tastes, seconds, politeness, cleanup, praising the cook.'],
['housework','🧹','家务','Housework','daily','Housework: cleaning, laundry, dishes, trash, tidying, dividing chores.'],
['home','📦','家庭整理','Home Organizing','daily','Home organizing: finding things, putting things away, storage, decluttering.'],
['social','🎉','朋友聚会','Social','daily','Friend gatherings: greetings, catching up, offering food and drinks, plans, goodbyes.'],
['casual','💬','日常聊天','Casual Talk','daily','Casual daily chat: weather, mood, weekend plans, small talk, light jokes.'],
['work','💼','工作','Work','work','Everyday work: tasks, updates, asking for help, deadlines, feedback, colleague chat.'],
['office','🏢','办公室','Office','work','Office life: desk, supplies, printer, break room, schedule, environment.'],
['meeting','📝','会议','Meeting','work','Meetings: agenda, opinions, agreeing or disagreeing politely, summarizing, action items.'],
['phone','📞','电话','Phone Call','work','Phone calls: answering, leaving messages, callbacks, scheduling, connection issues.'],
['video','💻','视频会议','Video Call','work','Video calls: "can you hear me?", screen sharing, lag, mute, wrapping up.'],
['socializing','🤝','社交','Socializing','daily','Making friends and networking: introductions, hobbies, exchanging contacts, invitations.'],
['movies','🎬','看电影','Movies','daily','Movies: choosing a film, tickets, snacks, reviews, spoiler-free chat.'],
['entertainment','📺','看电视','Entertainment','daily','TV and streaming: shows, episodes, recommendations, binge-watching.'],
['games','🎮','游戏','Games','daily','Games: rules, turns, winning and losing gracefully, online games, teamwork.'],
['health','🏥','医疗','Health','health','Everyday health situations, English expression only, never medical advice: describing symptoms ("my stomach hurts"), making appointments, how to take medicine.'],
['pharmacy','💊','药店','Pharmacy','health','Pharmacy: asking for medicine, dosage instructions, side effects, alternatives.'],
['bank','🏦','银行','Bank','daily','Bank errands: accounts, cards, deposits, transfers, exchange, queues.'],
['delivery','📦','快递','Delivery','daily','Deliveries and packages: tracking, pickup, signatures, missing parcels, couriers.'],
['repair','🔧','维修','Repair','daily','Repairs: describing problems, appointments, quotes, parts, pickup.'],
['buycar','🚘','买车','Buying a Car','shopping','Buying a car: models, test drives, prices, negotiation, paperwork.'],
['carrental','🚙','租车','Car Rental','travel','Renting a car: booking, insurance, pickup, return, fuel policy.'],
['pub','🍺','酒吧','Pub','food','Bars: ordering drinks, toasts, pacing yourself, the tab, closing time.'],
['checkin','🛎','酒店入住','Check-in','travel','Hotel check-in: reservations, ID, room preferences, deposits, breakfast times.'],
['checkout','🧳','酒店退房','Check-out','travel','Hotel check-out: bills, receipts, luggage help, late checkout, taxis.'],
['sightseeing','🗺','景点','Sightseeing','travel','Sightseeing: tickets, opening hours, tours, photos, crowds, highlights.'],
['directions','🧭','问路','Directions','travel','Asking and giving directions: landmarks, left and right, blocks, nearby places.'],
['publictransport','🚌','公共交通','Public Transport','travel','Public transport: lines, stops, transfers, schedules, fares, travel cards.'],
['train','🚆','火车','Train','travel','Trains: tickets, platforms, seats, luggage, announcements, delays.'],
['subway','🚇','地铁','Subway','travel','Subway: lines, exits, transfers, rush hour, etiquette.'],
['taxi','🚕','打车','Taxi','travel','Taxis and rideshares: hailing, destination, traffic, fares, drop-off.'],
['daily','🌤','日常生活','Daily Life','daily','General daily life: errands, time, plans, feelings, anything at home or outside.']
];
const SCENARIOS = {};
SCN_RAW.forEach(a => { SCENARIOS[a[0]] = { id:a[0], emoji:a[1], zh:a[2], en:a[3], cat:a[4], hint:a[5] }; });
const QUICK_IDS = ['driving','family','travel','restaurant','grocery','outdoor'];

// ---------- 状态 ----------
function loadJSON(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return (v === null || v === undefined) ? fallback : v; }
  catch (_) { return fallback; }
}
let settings = Object.assign(
  { provider:'deepseek', apiKey:'', model:PROVIDERS.deepseek.model, baseUrl:PROVIDERS.deepseek.baseUrl,
    level:'elementary', accent:'us', mode:'life', scenarioId:'daily',
    englishOnly:false, autoPlay:true, speed:'normal', inputLang:'zh', voiceURI:'', extra:'' },
  loadJSON(LS_SETTINGS, {})
);
if (!PROVIDERS[settings.provider]) settings.provider = 'custom';
if (!SCENARIOS[settings.scenarioId]) settings.scenarioId = 'daily';
if (!LEVELS[settings.level]) settings.level = 'elementary';
if (!MODES[settings.mode]) settings.mode = 'life';

let sessions = loadJSON(LS_SESSIONS, []);
if (!Array.isArray(sessions)) sessions = [];
let myEnglish = loadJSON(LS_MYENGLISH, []);
if (!Array.isArray(myEnglish)) myEnglish = [];
let customScenarios = loadJSON(LS_CUSTOMSCN, []);
if (!Array.isArray(customScenarios)) customScenarios = [];

function allScenarios() {
  const out = {};
  Object.keys(SCENARIOS).forEach(k => out[k] = SCENARIOS[k]);
  customScenarios.forEach(s => out[s.id] = s);
  return out;
}
function currentScenario() { return allScenarios()[settings.scenarioId] || SCENARIOS.daily; }

let chatHistory = [];        // 当前会话消息
let currentSessionId = null;
let streaming = false;
let abortCtl = null;
let handsfree = false;
let pendingAutoPractice = false;   // “不会说”流程：回复后自动进入跟读
let currentView = 'home';

function saveSettings() { localStorage.setItem(LS_SETTINGS, JSON.stringify(settings)); }
function saveSessions() {
  sessions = sessions.slice(0, 20);
  localStorage.setItem(LS_SESSIONS, JSON.stringify(sessions));
}
function saveMyEnglish() { localStorage.setItem(LS_MYENGLISH, JSON.stringify(myEnglish.slice(0, 300))); }
function saveCustomScn() { localStorage.setItem(LS_CUSTOMSCN, JSON.stringify(customScenarios)); }
function saveCurrentSession() {
  if (!currentSessionId) return;
  const s = sessions.find(x => x.id === currentSessionId);
  if (s) { s.messages = chatHistory.slice(-60); s.scenarioId = settings.scenarioId; s.mode = settings.mode; saveSessions(); }
}

// ---------- 小工具 ----------
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const synth = window.speechSynthesis;
let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
function esc(s) { return String(s == null ? '' : s); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
function displayRate() { return settings.speed === 'slow' ? 0.78 : 1.0; }

// ---------- 声音（按口音优选高质量音色） ----------
let voices = [];
function voiceScore(v) {
  let s = 0;
  const n = v.name.toLowerCase();
  const wantUS = settings.accent !== 'uk';
  if ((wantUS && v.lang === 'en-US') || (!wantUS && v.lang === 'en-GB')) s += 200;
  if (/neural|enhanced|premium|wavenet|natural/.test(n)) s += 100;
  if (/google/i.test(v.name)) s += 80;
  if (/microsoft/i.test(v.name)) s += 60;
  if (/samantha/i.test(n)) s += 50;
  if (/daniel|karen|serena|moira/i.test(n)) s += 40;
  if (/aria|jenny|guy|emma|brian/i.test(n)) s += 30;
  return s;
}
function loadVoices() {
  voices = (synth.getVoices() || []).filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  voices.sort((a, b) => voiceScore(b) - voiceScore(a));
  const sel = $('#set-voice');
  if (!sel) return;
  sel.innerHTML = '';
  const auto = document.createElement('option');
  auto.value = '';
  auto.textContent = '自动（按口音优选最佳声音）';
  sel.appendChild(auto);
  voices.forEach(v => {
    const o = document.createElement('option');
    o.value = v.voiceURI;
    o.textContent = v.name + ' (' + v.lang + ')' + (voiceScore(v) >= 200 ? ' ⭐' : '');
    sel.appendChild(o);
  });
  sel.value = voices.some(v => v.voiceURI === settings.voiceURI) ? settings.voiceURI : '';
}
function currentVoice() { return voices.find(v => v.voiceURI === settings.voiceURI) || voices[0] || null; }

// ---------- TTS 引擎：自然停顿 + 语调 + 单词高亮 + 播放队列 ----------
let speechStopFlag = false;
let pauseTimerId = null;
let ttsQueue = [];          // [{text, container, onEnd}]
let ttsActive = false;
let ttsGen = 0;             // 播放代数：停止/重播时递增，防止旧语音回调串扰

function splitIntoSegments(text) {
  const raw = text.split(/(?<=[.!?;:,])(?=\s|$)|(?<=\n)/).filter(s => s.length > 0);
  const segs = [];
  let off = 0;
  for (const seg of raw) {
    const t = seg.trim();
    if (!t) { off += seg.length; continue; }
    const last = t.slice(-1);
    let pauseMs;
    if (/\n/.test(seg)) pauseMs = 1500;
    else if (last === '?' || last === '!') pauseMs = 1400;
    else if (last === '.') pauseMs = 1200;
    else if (last === ';') pauseMs = 800;
    else if (last === ':') pauseMs = 700;
    else if (last === ',') pauseMs = 550;
    else pauseMs = 400;
    segs.push({ text: t, charOffset: off, pauseMs: pauseMs });
    off += seg.length;
  }
  return segs;
}
function clearPauseTimer() { if (pauseTimerId) { clearTimeout(pauseTimerId); pauseTimerId = null; } }

function enqueueSpeech(text, container, onEnd) {
  if (!text || !text.trim()) { if (onEnd) onEnd(); return; }
  ttsQueue.push({ text: text.trim(), container: container || null, onEnd: onEnd || null });
  if (!ttsActive) speakNext();
}
function speakNext() {
  const item = ttsQueue.shift();
  if (!item) {
    ttsActive = false;
    setStatus('idle');
    maybeHandsfreeRearm();
    return;
  }
  ttsActive = true;
  setStatus('speaking');
  speakTextNow(item.text, item.container, () => {
    if (item.onEnd) item.onEnd();
    if (speechStopFlag) { ttsQueue = []; ttsActive = false; setStatus('idle'); return; }
    speakNext();
  });
}
function stopSpeaking() {
  ttsGen++;
  speechStopFlag = true;
  ttsQueue = [];
  clearPauseTimer();
  synth.cancel();
  ttsActive = false;
  document.querySelectorAll('.word.speaking').forEach(s => s.classList.remove('speaking'));
  setStatus('idle');
}
function speakTextNow(text, container, onEnd) {
  const gen = ttsGen;
  speechStopFlag = false;
  clearPauseTimer();
  const rate = displayRate();
  const segs = splitIntoSegments(text);
  const getWords = () => (container ? container.querySelectorAll('.word') : []);
  let i = 0;
  function speakSeg() {
    if (speechStopFlag || gen !== ttsGen || i >= segs.length) {
      getWords().forEach(s => s.classList.remove('speaking'));
      if (gen === ttsGen && onEnd) onEnd();
      return;
    }
    const seg = segs[i];
    const utt = new SpeechSynthesisUtterance(seg.text);
    const v = currentVoice();
    if (v) utt.voice = v;
    utt.rate = rate;
    utt.volume = 1;
    const last = seg.text.slice(-1);
    if (last === '?') utt.pitch = 1.12;
    else if (last === '!') utt.pitch = 1.08;
    else if (last === ',') utt.pitch = 1.05;
    else if (last === ';') utt.pitch = 1.03;
    else utt.pitch = 0.97;
    utt.onboundary = e => {
      if (e.name !== 'word') return;
      const words = getWords();
      if (!words.length) return;
      words.forEach(s => s.classList.remove('speaking'));
      const abs = seg.charOffset + e.charIndex;
      let best = null;
      for (const span of words) {
        const st = parseInt(span.dataset.start || '0', 10);
        if (abs >= st && abs < st + span.textContent.length) { best = span; break; }
        if (st <= abs) best = span;
      }
      if (best) { best.classList.add('speaking'); best.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    };
    utt.onend = () => {
      if (gen !== ttsGen) return;
      i++;
      pauseTimerId = setTimeout(speakSeg, Math.round(seg.pauseMs / Math.max(rate, 0.5)));
    };
    utt.onerror = e => {
      if (gen !== ttsGen) return;
      if (e.error !== 'canceled' && e.error !== 'interrupted') { i++; pauseTimerId = setTimeout(speakSeg, 150); }
    };
    synth.speak(utt);
  }
  speakSeg();
}
function speakOneShot(text) {  // 点词发音 / 收藏发音：打断队列直接说
  stopSpeaking();
  speechStopFlag = false;
  const utt = new SpeechSynthesisUtterance(text);
  const v = currentVoice();
  if (v) utt.voice = v;
  utt.rate = Math.min(displayRate(), 0.9);
  synth.speak(utt);
}


// ---------- 语音状态（Idle / Recording / Thinking / Speaking / Error） ----------
const STATUS_TEXT = { idle: '🎙 Tap to speak', rec: '🔴 Listening...', think: 'Thinking...', spk: '🔊 Speaking...', err: 'Something went wrong. Try again.' };
function setStatus(s) {
  const key = s === 'recording' ? 'rec' : s === 'thinking' ? 'think' : s === 'speaking' ? 'spk' : s === 'error' ? 'err' : 'idle';
  const sb = $('#status-bar');
  sb.textContent = STATUS_TEXT[key];
  sb.className = 'status-bar' + (key === 'rec' ? ' rec' : key === 'spk' ? ' spk' : '');
  const hs = $('#home-status');
  hs.textContent = key === 'idle' ? 'Tap to speak · 点一下，说中文' : STATUS_TEXT[key];
  hs.className = 'voice-status' + (key === 'rec' ? ' rec' : key === 'err' ? ' err' : '');
}

// ---------- 视图切换 ----------
function showView(v) {
  currentView = v;
  $('#view-home').hidden = v !== 'home';
  $('#view-chat').hidden = v !== 'chat';
  if (v === 'home') { renderHome(); setStatus(listening ? 'recording' : 'idle'); }
  else syncHeaderChips();
}
function syncHeaderChips() {
  const scn = currentScenario();
  $('#chat-scn').textContent = scn.emoji + ' ' + scn.zh;
  $('#chat-mode').textContent = MODES[settings.mode].en;
}
function scrollBottom() { const c = $('#chat'); c.scrollTop = c.scrollHeight; }

// ---------- 首页渲染 ----------
function renderHome() {
  $$('#mode-seg button').forEach(b => b.classList.toggle('active', b.dataset.mode === settings.mode));
  renderQuickChips();
  renderHomeReview();
  $('#eo-quick').checked = !!settings.englishOnly;
  syncHeaderChips();
}
function renderQuickChips() {
  const bar = $('#quick-chips');
  bar.innerHTML = '';
  QUICK_IDS.forEach(id => {
    const s = allScenarios()[id];
    if (!s) return;
    const b = document.createElement('button');
    b.className = 'qchip' + (settings.scenarioId === id ? ' active' : '');
    const e = document.createElement('div'); e.className = 'qe'; e.textContent = s.emoji;
    const z = document.createElement('div'); z.className = 'qz'; z.textContent = s.zh;
    const n = document.createElement('div'); n.className = 'qn'; n.textContent = s.en;
    b.appendChild(e); b.appendChild(z); b.appendChild(n);
    b.onclick = () => selectScenario(id);
    bar.appendChild(b);
  });
}
function renderHomeReview() {
  const card = $('#review-card');
  const list = $('#review-list');
  list.innerHTML = '';
  const picks = myEnglish.slice(0, 3);
  card.hidden = picks.length === 0;
  picks.forEach(it => {
    const row = document.createElement('div');
    row.className = 'review-item';
    const t = document.createElement('span');
    t.textContent = it.text;
    const c = document.createElement('span');
    c.className = 'rv-cat';
    c.textContent = (CATS[it.cat] || CATS.daily).emoji + ' ' + (CATS[it.cat] || CATS.daily).zh.split(' ')[0];
    const b = document.createElement('button');
    b.textContent = '🔊';
    b.title = '播放';
    b.onclick = () => speakOneShot(it.text);
    row.appendChild(t); row.appendChild(c); row.appendChild(b);
    list.appendChild(row);
  });
}
function selectScenario(id) {
  settings.scenarioId = id;
  saveSettings();
  renderQuickChips();
  syncHeaderChips();
  saveCurrentSession();
  const s = allScenarios()[id];
  if (s) toast('场景：' + s.emoji + ' ' + s.zh);
}

// ---------- AI 协议 ----------
function buildSystemPrompt() {
  const scn = currentScenario();
  const modeRules = {
    translate: 'Mode TRANSLATE: the user only wants to know how to say something. Provide EN (+SIMPLE/ALT/MEAN). NEVER output FOLLOW. No extra chat.',
    coach: 'Mode COACH: act as a tutor — help the user express ideas, explain briefly and gently, correct important mistakes, encourage them, and occasionally invite a short practice.',
    life: "Mode LIFE: you are the user's everyday English companion. Turn their Chinese into natural English, then keep the conversation alive naturally — react, share, and ask only when it truly fits. Follow scenario changes silently as the conversation moves."
  };
  return `You are Alex — a highly experienced, friendly and patient English coach for a native Chinese speaker (the only user of this app).

Your job is NOT literal translation. Your mission: help the user communicate naturally in real-life English. The user often thinks in Chinese and does not know how a native speaker would say it.

Core rules:
- Understand the user's real intention, the current scenario, the conversation history, who they are talking to, and their level.
- Natural spoken English > textbook English > literal translation. Never translate literally.
- Give ONE best expression by default; keep it concise.
- When the user writes English: converse naturally; gently correct only clear, communication-blocking mistakes (via BETTER).
- Warm and encouraging. Do not over-correct. Do not always ask questions — sometimes just react warmly and let the user lead. Never ask two questions in a row.
- Never sound like a textbook or a translation engine. Sound like a real human coach.

Output protocol — reply ONLY with these short plain-text lines (no markdown, no extra lines):
EN: <the best natural English for the user's idea, or your conversational reply>
SIMPLE: <an easier way to say the same thing> (omit if EN is already the simplest)
ALT: <a more casual variant> (omit if not clearly useful)
MEAN: <one short sentence: what the English means / why it's natural — ${settings.englishOnly ? 'in very simple English' : 'in Chinese'}>
FOLLOW: <a short natural remark or question to continue the conversation> (only when it truly feels natural)
BETTER: <corrected version of the user's English> (only when they wrote English with a clear mistake worth fixing)

${modeRules[settings.mode]}
Scenario: ${scn.emoji} ${scn.en} (${scn.zh}) — ${scn.hint}
User level: ${LEVELS[settings.level].desc}
English Only: ${settings.englishOnly ? 'ON — minimize Chinese except where noted above' : 'off'}${settings.extra ? '\nExtra instructions from the user: ' + settings.extra : ''}`;
}

const FIELDS_RE = /(?:^|\n)\s*(EN|SIMPLE|ALT|MEAN|FOLLOW|BETTER)\s*:\s*/gi;
function parseProtocol(text) {
  const out = { en: '', simple: '', alt: '', mean: '', follow: '', better: '' };
  FIELDS_RE.lastIndex = 0;
  let m, last = null, idx = 0;
  const parts = [];
  while ((m = FIELDS_RE.exec(text)) !== null) {
    if (last !== null) parts.push({ f: last, v: text.slice(idx, m.index).trim() });
    last = m[1].toUpperCase();
    idx = FIELDS_RE.lastIndex;
  }
  if (last !== null) parts.push({ f: last, v: text.slice(idx).trim() });
  parts.forEach(p => {
    const k = p.f.toLowerCase();
    if (k in out && !out[k]) out[k] = p.v;
  });
  if (!out.en && !parts.length) out.en = text.trim();
  return out;
}
function partialEn(buf) {
  const m = buf.match(/(?:^|\n)\s*EN\s*:\s*([\s\S]*?)(?=\n\s*(?:SIMPLE|ALT|MEAN|FOLLOW|BETTER)\s*:|$)/i);
  return m ? m[1].replace(/[\s\n]+$/, '') : null;
}
function enCompleteIn(buf) {
  return /(?:^|\n)\s*EN\s*:\s*[\s\S]*?\n\s*(?:SIMPLE|ALT|MEAN|FOLLOW|BETTER)\s*:/i.test(buf);
}

// ---------- 消息渲染 ----------
function makeWordSpans(container, text) {
  container.innerHTML = '';
  let pos = 0;
  String(text).split(/(\s+)/).forEach(seg => {
    if (!seg) return;
    if (/^\s+$/.test(seg)) { container.appendChild(document.createTextNode(' ')); pos += seg.length; return; }
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = seg;
    span.dataset.start = String(pos);
    span.addEventListener('click', e => {
      if (window.getSelection().toString()) return;
      if (!/[a-zA-Z]/.test(seg)) return;
      e.stopPropagation();
      openPopover(seg, e);
    });
    container.appendChild(span);
    pos += seg.length;
  });
}
function renderUserMsg(m) {
  const wrap = document.createElement('div');
  wrap.className = 'msg user';
  const b = document.createElement('div');
  b.className = 'u-bubble';
  const f = document.createElement('span');
  f.className = 'flg';
  f.textContent = /[\u4e00-\u9fff]/.test(m.content) ? '🇨🇳' : '🇺🇸';
  b.appendChild(f);
  b.appendChild(document.createTextNode(m.content));
  wrap.appendChild(b);
  return wrap;
}
function buildAiCard() {
  const wrap = document.createElement('div');
  wrap.className = 'msg ai';
  const acard = document.createElement('div');
  acard.className = 'acard';
  const enDiv = document.createElement('div');
  enDiv.className = 'en-text';
  acard.appendChild(enDiv);
  wrap.appendChild(acard);
  return { wrap: wrap, acard: acard, enDiv: enDiv };
}
function finalizeAiCard(c, parts) {
  makeWordSpans(c.enDiv, parts.en || '…');

  if (parts.mean) {
    const ml = document.createElement('div');
    ml.className = 'mean-line';
    ml.textContent = '💡 ' + parts.mean;
    c.acard.appendChild(ml);
  }
  if (parts.better) {
    const bl = document.createElement('div');
    bl.className = 'better-line';
    bl.appendChild(document.createTextNode('✏️ 更自然的说法：'));
    const b = document.createElement('b');
    b.textContent = parts.better;
    bl.appendChild(b);
    c.acard.appendChild(bl);
  }

  const tools = document.createElement('div');
  tools.className = 'msg-tools';

  const bPlay = document.createElement('button');
  bPlay.className = 'tool-btn';
  bPlay.textContent = '🔊 播放';
  bPlay.onclick = () => {
    stopSpeaking();
    enqueueSpeech(parts.en, c.enDiv);
    if (parts.follow) enqueueSpeech(parts.follow, c.fbText);
  };
  tools.appendChild(bPlay);

  const bPrac = document.createElement('button');
  bPrac.className = 'tool-btn';
  bPrac.textContent = '🎙 跟读';
  bPrac.onclick = () => openPractice(parts.en, parts.simple);
  tools.appendChild(bPrac);

  const bSave = document.createElement('button');
  bSave.className = 'tool-btn';
  bSave.textContent = '☆ 收藏';
  bSave.onclick = () => { bSave.textContent = '✓ 已收藏'; addMyEnglish(parts.en, parts.simple, currentScenario().cat); };
  if (myEnglish.some(w => w.text.toLowerCase() === (parts.en || '').toLowerCase())) bSave.textContent = '✓ 已收藏';
  tools.appendChild(bSave);

  if (parts.simple || parts.alt) {
    const more = document.createElement('div');
    more.className = 'more-box';
    more.hidden = true;
    const rows = [['Natural', parts.en], ['Simple', parts.simple], ['Casual', parts.alt]];
    rows.forEach(r => {
      if (!r[1]) return;
      const d = document.createElement('div');
      d.className = 'mv';
      const i = document.createElement('i');
      i.textContent = r[0];
      d.appendChild(i);
      d.appendChild(document.createTextNode(r[1]));
      more.appendChild(d);
    });
    const bMore = document.createElement('button');
    bMore.className = 'tool-btn';
    bMore.textContent = '▾ More ways';
    bMore.onclick = () => { more.hidden = !more.hidden; bMore.textContent = more.hidden ? '▾ More ways' : '▴ 收起'; };
    c.acard.appendChild(more);
    tools.appendChild(bMore);
  }

  if (settings.englishOnly) {
    const bZh = document.createElement('button');
    bZh.className = 'tool-btn';
    bZh.textContent = '🆘 中文';
    bZh.onclick = async () => {
      let zh = '';
      try {
        const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(parts.en) + '&langpair=en|zh-CN';
        const resp = await fetch(url);
        const data = await resp.json();
        zh = (data.responseData && data.responseData.translatedText) || '';
      } catch (_) {}
      let line = c.acard.querySelector('.zh-help');
      if (!line) {
        line = document.createElement('div');
        line.className = 'zh-help';
        c.acard.insertBefore(line, c.acard.querySelector('.msg-tools'));
      }
      line.textContent = zh ? '🇨🇳 ' + zh : '（暂时取不到中文）';
    };
    tools.appendChild(bZh);
  }

  c.acard.appendChild(tools);

  if (parts.follow) {
    const fb = document.createElement('div');
    fb.className = 'fbubble';
    const fbt = document.createElement('div');
    fbt.className = 'fb-text';
    makeWordSpans(fbt, parts.follow);
    fb.appendChild(fbt);
    c.fbText = fbt;
    const ftools = document.createElement('div');
    ftools.className = 'fb-tools';
    const bs = document.createElement('button');
    bs.className = 'tool-btn';
    bs.textContent = '🔊';
    bs.onclick = () => { stopSpeaking(); enqueueSpeech(parts.follow, fbt); };
    ftools.appendChild(bs);
    fb.appendChild(ftools);
    c.wrap.appendChild(fb);
  }
}
function buildWelcome() {
  const w = document.createElement('div');
  w.className = 'welcome';
  const h = document.createElement('h3');
  h.textContent = "👋 Hi, I'm Alex";
  const p = document.createElement('p');
  p.textContent = '说中文，我给你最自然的英语并读出来。点 🎙 说话或直接打字；不知道怎么说时，点下方 💡 不会说，我带你跟读。';
  w.appendChild(h);
  w.appendChild(p);
  return w;
}
function renderChat() {
  const chat = $('#chat');
  chat.innerHTML = '';
  if (!chatHistory.length) chat.appendChild(buildWelcome());
  else chatHistory.forEach(m => {
    if (m.role === 'user') chat.appendChild(renderUserMsg(m));
    else {
      const c = buildAiCard();
      finalizeAiCard(c, parseProtocol(m.content));
      chat.appendChild(c.wrap);
    }
  });
  scrollBottom();
}

// ---------- 发送与流式 ----------
function ensureSession() {
  if (currentSessionId) return;
  const s = { id: Date.now(), startedAt: Date.now(), scenarioId: settings.scenarioId, mode: settings.mode, messages: [] };
  sessions.unshift(s);
  currentSessionId = s.id;
  saveSessions();
}
function sendMessage(text) {
  text = (text || '').trim();
  if (!text || streaming) return false;
  if (!settings.apiKey) { openSettings(); toast('请先填写 API Key（只需一次）'); return false; }
  if (currentView !== 'chat') showView('chat');
  ensureSession();
  chatHistory.push({ role: 'user', content: text });
  saveCurrentSession();
  const chat = $('#chat');
  if (document.querySelector('.welcome')) chat.innerHTML = '';
  chat.appendChild(renderUserMsg(chatHistory[chatHistory.length - 1]));
  scrollBottom();
  streamAssistant();
  return true;
}
function showApiError(msg, status) {
  const chat = $('#chat');
  const hint = status === 401 ? '（API Key 不正确或已过期）' : (status === 402 || status === 429) ? '（余额不足或触发限流）' : '';
  const wrap = document.createElement('div');
  wrap.className = 'msg ai';
  const b = document.createElement('div');
  b.className = 'bubble error';
  b.textContent = '⚠ Connection problem. ' + msg + hint;
  const btn = document.createElement('button');
  btn.className = 'tool-btn';
  btn.textContent = 'Retry 重试';
  btn.onclick = () => { wrap.remove(); streamAssistant(); };
  b.appendChild(btn);
  wrap.appendChild(b);
  chat.appendChild(wrap);
  scrollBottom();
  setStatus('error');
}
async function streamAssistant() {
  if (streaming) return;
  const chat = $('#chat');
  if (document.querySelector('.welcome')) chat.innerHTML = '';
  const typing = document.createElement('div');
  typing.className = 'msg ai';
  const tcard = document.createElement('div');
  tcard.className = 'acard';
  const dots = document.createElement('div');
  dots.className = 'typing';
  dots.appendChild(document.createElement('i'));
  dots.appendChild(document.createElement('i'));
  dots.appendChild(document.createElement('i'));
  tcard.appendChild(dots);
  typing.appendChild(tcard);
  chat.appendChild(typing);
  scrollBottom();

  streaming = true;
  setSendState();
  setStatus('thinking');
  abortCtl = new AbortController();

  const c = buildAiCard();
  let raw = '', started = false, enSpoken = false, lastPaint = 0;

  try {
    const res = await fetch(settings.baseUrl.replace(/\/+$/, '') + '/chat/completions', {
      method: 'POST',
      signal: abortCtl.signal,
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.apiKey },
      body: JSON.stringify({
        model: settings.model,
        messages: [{ role: 'system', content: buildSystemPrompt() }].concat(chatHistory.slice(-30)),
        stream: true,
        temperature: 0.7,
        max_tokens: 420
      })
    });
    if (!res.ok) {
      let msg = 'HTTP ' + res.status;
      try { const j = await res.json(); if (j.error && j.error.message) msg = j.error.message; } catch (_) {}
      typing.remove();
      showApiError(msg, res.status);
      return;
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (true) {
      const r = await reader.read();
      if (r.done) break;
      buf += dec.decode(r.value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith('data:')) continue;
        const payload = t.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        let j;
        try { j = JSON.parse(payload); } catch (_) { continue; }
        const delta = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
        if (!delta) continue;
        raw += delta;
        const en = partialEn(raw);
        if (en && !started) {
          started = true;
          chat.insertBefore(c.wrap, typing);
          scrollBottom();
        }
        if (en) {
          const now = Date.now();
          if (now - lastPaint > 90) { lastPaint = now; makeWordSpans(c.enDiv, en); scrollBottom(); }
        }
        if (!enSpoken && started && enCompleteIn(raw)) {
          enSpoken = true;
          if (settings.autoPlay && !pendingAutoPractice) enqueueSpeech(partialEn(raw), c.enDiv);
        }
      }
    }

    typing.remove();
    const parts = parseProtocol(raw);
    if (!parts.en) {
      if (started) c.wrap.remove();
      showApiError('模型没有返回内容，请重试', 0);
      return;
    }
    finalizeAiCard(c, parts);
    scrollBottom();
    chatHistory.push({ role: 'assistant', content: raw });
    saveCurrentSession();

    if (pendingAutoPractice) {
      pendingAutoPractice = false;
      setTimeout(() => openPractice(parts.en, parts.simple), 500);
    } else if (settings.autoPlay) {
      if (!enSpoken) enqueueSpeech(parts.en, c.enDiv);
      if (parts.follow) enqueueSpeech(parts.follow, c.fbText);
    }
  } catch (err) {
    typing.remove();
    if (err.name === 'AbortError') {
      const parts = parseProtocol(raw);
      if (parts.en) {
        finalizeAiCard(c, parts);
        chatHistory.push({ role: 'assistant', content: raw });
        saveCurrentSession();
        scrollBottom();
      } else if (started) {
        c.wrap.remove();
      }
      toast('已停止生成');
    } else {
      if (started) c.wrap.remove();
      showApiError('无法连接：' + (err.message || err), 0);
    }
  } finally {
    streaming = false;
    abortCtl = null;
    setSendState();
    if (!ttsActive && !listening) setStatus('idle');
  }
}

// ---------- My English ----------
function addMyEnglish(text, simple, cat) {
  text = (text || '').trim();
  if (!text) return;
  if (myEnglish.some(w => w.text.toLowerCase() === text.toLowerCase())) { toast('已在 My English 中'); return; }
  myEnglish.unshift({ text: text, simple: simple || '', cat: cat || 'daily', ts: Date.now() });
  saveMyEnglish();
  renderHomeReview();
  toast('Saved to My English ⭐');
}
function renderMyEnglish() {
  const list = $('#me-list');
  list.innerHTML = '';
  if (!myEnglish.length) {
    const e = document.createElement('div');
    e.className = 'empty-tip';
    e.textContent = '还没有收藏。聊天时点 ☆ 收藏你真实用过的表达，\n它们会成为"你的生活英语"。';
    list.appendChild(e);
    return;
  }
  const count = document.createElement('div');
  count.className = 'me-cat';
  count.textContent = '共 ' + myEnglish.length + ' 条';
  list.appendChild(count);
  const byCat = {};
  myEnglish.forEach(it => { (byCat[it.cat] = byCat[it.cat] || []).push(it); });
  Object.keys(byCat).forEach(cat => {
    const info = CATS[cat] || CATS.daily;
    const h = document.createElement('div');
    h.className = 'me-cat';
    h.textContent = info.emoji + ' ' + info.zh;
    list.appendChild(h);
    byCat[cat].forEach(it => {
      const d = document.createElement('div');
      d.className = 'me-item';
      const main = document.createElement('div');
      main.className = 'me-main';
      const t = document.createElement('div');
      t.className = 'me-text';
      t.textContent = it.text;
      main.appendChild(t);
      if (it.simple) {
        const n = document.createElement('div');
        n.className = 'me-note';
        n.textContent = 'Simple: ' + it.simple;
        main.appendChild(n);
      }
      const sp = document.createElement('button');
      sp.className = 'tool-btn';
      sp.textContent = '🔊';
      sp.onclick = () => speakOneShot(it.text);
      const del = document.createElement('button');
      del.className = 'tool-btn';
      del.textContent = '删除';
      del.onclick = () => { myEnglish = myEnglish.filter(w => w !== it); saveMyEnglish(); renderMyEnglish(); renderHomeReview(); };
      d.appendChild(main); d.appendChild(sp); d.appendChild(del);
      list.appendChild(d);
    });
  });
}

// ---------- 跟读练习与发音反馈 ----------
let pracTarget = { en: '', simple: '' };
function openPractice(en, simple, autoListen) {
  pracTarget = { en: en || '', simple: simple || '' };
  stopSpeaking();
  $('#prac-en').textContent = pracTarget.en;
  $('#prac-simple').textContent = pracTarget.simple ? 'Simple: ' + pracTarget.simple : '';
  $('#prac-result').hidden = true;
  $('#prac-again').hidden = true;
  $('#prac-done').hidden = true;
  $('#prac-status').textContent = '';
  $('#practice').hidden = false;
  if (autoListen !== false) setTimeout(() => enqueueSpeech(pracTarget.en), 350);
}
function closePractice() {
  $('#practice').hidden = true;
  stopSpeaking();
  maybeHandsfreeRearm();
}
function scoreAttempt(target, said, durSec, conf) {
  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9'\s]/g, ' ').split(/\s+/).filter(w => w.length);
  const T = norm(target), S = norm(said);
  if (!S.length) return null;
  const used = new Array(S.length).fill(false);
  let match = 0;
  for (const t of T) {
    let bi = -1, bd = 1;
    for (let i = 0; i < S.length; i++) {
      if (used[i]) continue;
      const d = lev(t, S[i]) / Math.max(t.length, S[i].length, 1);
      if (d < bd) { bd = d; bi = i; }
    }
    if (bi >= 0 && bd <= 0.34) { used[bi] = true; match++; }
  }
  const pron = match / Math.max(T.length, 1);
  const exp = T.length * 0.38 + 0.8;
  const r = durSec / Math.max(exp, 0.5);
  let flu;
  if (r >= 0.7 && r <= 1.9) flu = 1;
  else if (r < 0.45) flu = 0.6;
  else if (r < 0.7) flu = 0.85;
  else flu = 0.75;
  const into = (conf != null && !isNaN(conf) && conf > 0) ? clamp(conf * 1.15, 0.3, 1) : 0.82;
  const st = v => clamp(Math.round(v * 5), 1, 5);
  return { pron: st(pron), flu: st(flu), into: st(into), pronRaw: pron, slow: r > 1.9, fast: r < 0.45 };
}
function practiceTip(sc) {
  if (!sc) return 'Try again — tap the mic and repeat.';
  if (sc.pronRaw < 0.5) return 'Try listening once more, then repeat slowly — clarity first.';
  const min = Math.min(sc.pron, sc.flu, sc.into);
  if (min >= 4) return 'Sounded natural — keep it up!';
  if (sc.pron === min) return 'Try stressing the main words a little more.';
  if (sc.flu === min) return sc.slow ? 'Try saying it in one smooth breath.' : 'Slow down a little — clarity beats speed.';
  return 'Let your voice rise and fall naturally — questions go up at the end.';
}
function renderPracResult(sc) {
  const el = $('#prac-result');
  el.innerHTML = '';
  const v = document.createElement('div');
  v.className = 'pr-verdict';
  v.textContent = sc ? (sc.pronRaw >= 0.75 ? 'Great job! 🎉' : "Nice try — let's do it again 💪") : 'Try again 🎧';
  el.appendChild(v);
  const rows = [['Pronunciation', sc ? sc.pron : 1], ['Fluency', sc ? sc.flu : 1], ['Intonation', sc ? sc.into : 1]];
  rows.forEach(r => {
    const d = document.createElement('div');
    d.className = 'pr-row';
    const l = document.createElement('span');
    l.className = 'pl';
    l.textContent = r[0];
    const s = document.createElement('span');
    s.className = 'ps';
    s.textContent = '★'.repeat(r[1]) + '☆'.repeat(5 - r[1]);
    d.appendChild(l); d.appendChild(s);
    el.appendChild(d);
  });
  const tip = document.createElement('div');
  tip.className = 'pr-tip';
  tip.textContent = '💡 ' + practiceTip(sc);
  el.appendChild(tip);
  el.hidden = false;
  $('#prac-again').hidden = false;
  $('#prac-done').hidden = false;
}

// ---------- 语音识别（STT） ----------
const SRClass = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null, listening = false;
let recFinal = '', recIntent = 'chat', recStartTs = 0, recConfs = [];
if (SRClass) {
  rec = new SRClass();
  rec.interimResults = true;
  rec.continuous = false;
  rec.onresult = e => {
    let interim = '', finalTxt = '';
    recConfs = [];
    for (let k = 0; k < e.results.length; k++) {
      const r = e.results[k];
      if (r.isFinal) {
        finalTxt += r[0].transcript;
        if (r[0].confidence) recConfs.push(r[0].confidence);
      } else interim += r[0].transcript;
    }
    recFinal = finalTxt;
    if (recIntent === 'practice') {
      $('#prac-status').textContent = (finalTxt + interim).trim() ? '🔴 ' + (finalTxt + ' ' + interim).trim() : '🔴 Listening... 请跟读';
    } else {
      $('#input').value = (finalTxt + (interim ? ' ' + interim : '')).trim();
      autosize($('#input'));
    }
  };
  rec.onend = () => {
    listening = false;
    updateMicUI();
    const dur = (Date.now() - recStartTs) / 1000;
    const conf = recConfs.length ? recConfs.reduce((a, b) => a + b, 0) / recConfs.length : null;
    if (recIntent === 'practice') {
      if (!recFinal.trim()) {
        $('#prac-status').textContent = '没有听到声音，点麦克风再试';
      } else {
        renderPracResult(scoreAttempt(pracTarget.en, recFinal, dur, conf));
      }
    } else {
      setStatus('idle');
      const ok = recFinal.trim() ? sendMessage(recFinal.trim()) : false;
      if (ok) { $('#input').value = ''; autosize($('#input')); }
    }
  };
  rec.onerror = e => {
    listening = false;
    updateMicUI();
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      setStatus('error');
      toast('Microphone access is required for voice input. 请允许麦克风权限');
    } else if (e.error === 'no-speech') {
      setStatus('idle');
      if (recIntent === 'practice') $('#prac-status').textContent = '没有听到声音，再试一次';
      else toast('没有听到声音，再试一次');
    } else {
      setStatus('idle');
    }
  };
}
function updateMicUI() {
  $('#btn-mic').classList.toggle('rec', listening && recIntent !== 'practice');
  $('#home-mic').classList.toggle('rec', listening && currentView === 'home');
}
function startListen(lang, opts) {
  if (!rec) {
    toast('当前浏览器不支持语音识别，建议用 Safari / Chrome；也可以直接打字');
    setStatus('idle');
    return;
  }
  if (listening) { try { rec.stop(); } catch (_) {} return; }
  opts = opts || {};
  recIntent = opts.practice ? 'practice' : 'chat';
  rec.lang = lang === 'en' ? 'en-US' : 'zh-CN';
  recFinal = '';
  recConfs = [];
  recStartTs = Date.now();
  try {
    rec.start();
    listening = true;
    updateMicUI();
    setStatus('recording');
    if (recIntent === 'practice') $('#prac-status').textContent = '🔴 Listening... 请跟读';
    else toast(lang === 'en' ? 'Listening… speak English' : '正在听…请说中文');
  } catch (_) {
    listening = false;
    updateMicUI();
  }
}
function maybeHandsfreeRearm() {
  if (!handsfree || currentView !== 'chat' || streaming || listening || !rec) return;
  setTimeout(() => {
    if (handsfree && currentView === 'chat' && !streaming && !listening) {
      startListen(settings.inputLang === 'en' ? 'en' : 'zh');
    }
  }, 700);
}

// ---------- 点词翻译（MyMemory 免费接口） ----------
let popWord = '', popTrans = '';
function openPopover(word, e) {
  popWord = word;
  popTrans = '';
  $('#pop-word').textContent = word;
  $('#pop-result').textContent = '翻译中…';
  const pop = $('#pop');
  pop.classList.add('open');
  const x = clamp(e.clientX || 120, 10, window.innerWidth - 300);
  const y = clamp((e.clientY || 120) - 90, 64, window.innerHeight - 200);
  pop.style.left = x + 'px';
  pop.style.top = y + 'px';
  (async () => {
    try {
      const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(word) + '&langpair=en|zh-CN';
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('net');
      const data = await resp.json();
      let t = (data.responseData && data.responseData.translatedText) || '';
      if (t && t === t.toUpperCase() && word !== word.toUpperCase()) t = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
      popTrans = t || '';
      $('#pop-result').textContent = t || '（未查到释义）';
    } catch (_) {
      $('#pop-result').textContent = '翻译暂不可用';
    }
  })();
}
document.addEventListener('click', e => {
  const pop = $('#pop');
  if (!pop.classList.contains('open')) return;
  if (e.target.closest('#pop')) return;
  pop.classList.remove('open');
});

// ---------- 场景面板 ----------
function renderScnGrid() {
  const grid = $('#scn-grid');
  const q = ($('#scn-search').value || '').trim().toLowerCase();
  grid.innerHTML = '';
  const all = allScenarios();
  const ids = Object.keys(all);

  const customs = ids.filter(id => id.charAt(0) === 'c');
  const builtin = ids.filter(id => id.charAt(0) !== 'c');

  function addItem(s) {
    const b = document.createElement('button');
    b.className = 'scn-item' + (settings.scenarioId === s.id ? ' active' : '');
    const e = document.createElement('div'); e.className = 'se'; e.textContent = s.emoji;
    const z = document.createElement('div'); z.className = 'sz'; z.textContent = s.zh;
    const n = document.createElement('div'); n.className = 'sn'; n.textContent = s.en;
    b.appendChild(e); b.appendChild(z); b.appendChild(n);
    b.onclick = () => { selectScenario(s.id); closeSheet('#scn-sheet', '#scn-backdrop'); };
    grid.appendChild(b);
  }
  function addTitle(txt) {
    const h = document.createElement('div');
    h.className = 'scn-cat';
    h.textContent = txt;
    grid.appendChild(h);
  }
  function match(s) {
    if (!q) return true;
    return (s.zh + ' ' + s.en + ' ' + s.id).toLowerCase().includes(q);
  }
  if (customs.length) {
    addTitle('⭐ 我的场景');
    customs.filter(id => match(all[id])).forEach(id => addItem(all[id]));
  }
  Object.keys(CATS).forEach(cat => {
    const items = builtin.filter(id => all[id].cat === cat && match(all[id]));
    if (!items.length) return;
    addTitle(CATS[cat].emoji + ' ' + CATS[cat].zh);
    items.forEach(id => addItem(all[id]));
  });
  if (!grid.children.length) {
    const e = document.createElement('div');
    e.className = 'empty-tip';
    e.textContent = '没有匹配的场景';
    grid.appendChild(e);
  }
}
async function createCustomScenario(desc) {
  const st = $('#scn-custom-status');
  if (!desc || !desc.trim()) { st.textContent = '先描述一下场景，例如：周末带孩子去海边'; return; }
  if (!settings.apiKey) { openSettings(); toast('请先填写 API Key'); return; }
  st.textContent = 'AI 正在创建场景…';
  try {
    const res = await fetch(settings.baseUrl.replace(/\/+$/, '') + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.apiKey },
      body: JSON.stringify({
        model: settings.model,
        messages: [
          { role: 'system', content: 'You create English practice scenarios. Reply ONLY with these three lines:\nNAME: <short English scenario name>\nCN: <short Chinese name>\nDESC: <one sentence in Chinese describing the likely conversations>' },
          { role: 'user', content: desc.trim() }
        ],
        max_tokens: 150,
        temperature: 0.7,
        stream: false
      })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const j = await res.json();
    const txt = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
    const name = (txt.match(/NAME\s*:\s*(.+)/i) || [])[1] || '';
    const cn = (txt.match(/CN\s*:\s*(.+)/i) || [])[1] || '';
    const d = (txt.match(/DESC\s*:\s*(.+)/i) || [])[1] || '';
    if (!name && !cn) throw new Error('解析失败，请重试');
    const s = { id: 'c' + Date.now(), emoji: '🌟', zh: (cn || name).trim(), en: name.trim() || 'My Scenario', cat: 'daily', hint: (d || desc).trim() };
    customScenarios.unshift(s);
    saveCustomScn();
    selectScenario(s.id);
    st.textContent = '';
    $('#scn-custom-input').value = '';
    closeSheet('#scn-sheet', '#scn-backdrop');
    toast('已创建场景：' + s.zh);
  } catch (e) {
    st.textContent = '创建失败：' + (e.message || e);
  }
}

// ---------- 历史记录 ----------
function dateLabel(ts) {
  const d = new Date(ts), now = new Date();
  const same = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (same(d, now)) return 'Today';
  if (same(d, new Date(now.getTime() - 86400000))) return 'Yesterday';
  return (d.getMonth() + 1) + '月' + d.getDate() + '日';
}
function renderHistory() {
  const list = $('#hist-list');
  list.innerHTML = '';
  const newBtn = document.createElement('button');
  newBtn.className = 'text-btn';
  newBtn.style.cssText = 'font-size:14px;padding:4px 0 10px;display:block';
  newBtn.textContent = '＋ 开始新对话';
  newBtn.onclick = () => {
    chatHistory = [];
    currentSessionId = null;
    closeSheet('#hist-sheet', '#hist-backdrop');
    renderChat();
    showView('chat');
  };
  list.appendChild(newBtn);
  if (!sessions.length) {
    const e = document.createElement('div');
    e.className = 'empty-tip';
    e.textContent = '还没有对话记录';
    list.appendChild(e);
    return;
  }
  let lastLabel = '';
  sessions.forEach(s => {
    const label = dateLabel(s.startedAt);
    if (label !== lastLabel) {
      const h = document.createElement('div');
      h.className = 'hist-date';
      h.textContent = label;
      list.appendChild(h);
      lastLabel = label;
    }
    const scn = allScenarios()[s.scenarioId] || SCENARIOS.daily;
    const d = document.createElement('div');
    d.className = 'hist-item';
    const hi = document.createElement('div');
    hi.className = 'hi';
    hi.textContent = label === 'Today' || label === 'Yesterday' ? new Date(s.startedAt).toTimeString().slice(0, 5) : '';
    const hm = document.createElement('div');
    hm.className = 'hm';
    const ht = document.createElement('div');
    ht.className = 'ht';
    ht.textContent = scn.emoji + ' ' + scn.zh;
    const hc = document.createElement('div');
    hc.className = 'hc';
    hc.textContent = (MODES[s.mode] ? MODES[s.mode].en : 'Life') + ' · ' + (s.messages ? s.messages.length : 0) + ' 条';
    hm.appendChild(ht); hm.appendChild(hc);
    d.appendChild(hi); d.appendChild(hm);
    d.onclick = () => {
      currentSessionId = s.id;
      chatHistory = (s.messages || []).slice();
      if (s.scenarioId && allScenarios()[s.scenarioId]) { settings.scenarioId = s.scenarioId; saveSettings(); }
      if (s.mode && MODES[s.mode]) { settings.mode = s.mode; saveSettings(); }
      closeSheet('#hist-sheet', '#hist-backdrop');
      renderChat();
      showView('chat');
    };
    list.appendChild(d);
  });
}

// ---------- 设置 ----------
function openSheet(sheetSel, backdropSel) { $(sheetSel).classList.add('open'); $(backdropSel).classList.add('open'); }
function closeSheet(sheetSel, backdropSel) { $(sheetSel).classList.remove('open'); $(backdropSel).classList.remove('open'); }
function fillProviderSelect() {
  const sel = $('#set-provider');
  sel.innerHTML = '';
  Object.keys(PROVIDERS).forEach(id => {
    const o = document.createElement('option');
    o.value = id;
    o.textContent = PROVIDERS[id].label;
    sel.appendChild(o);
  });
  sel.value = settings.provider;
}
function applyProviderPreset(fillFields) {
  const p = PROVIDERS[settings.provider] || PROVIDERS.custom;
  if (fillFields) {
    $('#set-model').value = p.model;
    $('#set-base').value = p.baseUrl;
  }
  const link = $('#set-keyurl');
  if (p.keyUrl) {
    link.href = p.keyUrl;
    link.style.display = '';
    link.textContent = '获取 ' + p.label.split('（')[0] + ' 的 API Key' + (p.hint ? '（' + p.hint + '）' : '');
  } else {
    link.style.display = 'none';
  }
}
function openSettings() {
  fillProviderSelect();
  $('#set-key').value = settings.apiKey;
  $('#set-model').value = settings.model;
  $('#set-base').value = settings.baseUrl;
  $('#set-level').value = settings.level;
  $('#set-accent').value = settings.accent;
  $('#set-mode').value = settings.mode;
  $('#set-speed').value = settings.speed;
  $('#set-lang').value = settings.inputLang;
  $('#set-extra').value = settings.extra || '';
  $('#set-autoplay').checked = !!settings.autoPlay;
  $('#set-eo').checked = !!settings.englishOnly;
  if (!$('#set-voice').options.length) loadVoices();
  $('#set-voice').value = voices.some(v => v.voiceURI === settings.voiceURI) ? settings.voiceURI : '';
  applyProviderPreset(false);
  openSheet('#set-sheet', '#set-backdrop');
}
function collectSettings() {
  settings.apiKey = $('#set-key').value.trim();
  settings.model = $('#set-model').value.trim() || (PROVIDERS[settings.provider] || {}).model || '';
  settings.baseUrl = $('#set-base').value.trim().replace(/\/+$/, '');
  settings.level = $('#set-level').value;
  settings.accent = $('#set-accent').value;
  settings.mode = $('#set-mode').value;
  settings.speed = $('#set-speed').value;
  settings.inputLang = $('#set-lang').value;
  settings.extra = $('#set-extra').value.trim();
  settings.autoPlay = $('#set-autoplay').checked;
  settings.englishOnly = $('#set-eo').checked;
  settings.voiceURI = $('#set-voice').value;
}
async function testConnection() {
  collectSettings();
  const st = $('#set-test-status');
  st.style.color = 'var(--muted)';
  if (!settings.apiKey || !settings.baseUrl || !settings.model) {
    st.textContent = '请先填写 Key、接口地址和模型';
    st.style.color = 'var(--err)';
    return;
  }
  st.textContent = '测试中…';
  try {
    const res = await fetch(settings.baseUrl + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.apiKey },
      body: JSON.stringify({ model: settings.model, messages: [{ role: 'user', content: 'Reply with the single word: OK' }], max_tokens: 10, stream: false })
    });
    if (res.ok) {
      st.textContent = '✓ 连接成功，模型可用';
      st.style.color = 'var(--ok)';
    } else {
      let msg = 'HTTP ' + res.status;
      try { const j = await res.json(); if (j.error && j.error.message) msg = j.error.message; } catch (_) {}
      st.textContent = '✗ ' + msg;
      st.style.color = 'var(--err)';
    }
  } catch (err) {
    st.textContent = '✗ 无法连接（网络或接口地址问题）';
    st.style.color = 'var(--err)';
  }
}

// ---------- 输入框 ----------
function autosize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  setSendState();
}
function setSendState() {
  const btn = $('#btn-send');
  if (streaming) {
    btn.textContent = '停止';
    btn.classList.add('stop');
    btn.disabled = false;
  } else {
    btn.textContent = '发送';
    btn.classList.remove('stop');
    btn.disabled = !$('#input').value.trim();
  }
}
function updateLangUI() {
  const en = settings.inputLang === 'en';
  const b = $('#lang-toggle');
  b.textContent = en ? 'EN' : '中';
  b.classList.toggle('en', en);
  $('#input').placeholder = en ? 'Type or speak English…' : '说中文或输入中文…（Enter 发送）';
}

// ---------- 初始化 ----------
window.addEventListener('DOMContentLoaded', () => {
  loadVoices();
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  renderHome();
  renderChat();
  updateLangUI();
  setStatus('idle');
  if (!SRClass) {
    $('#btn-mic').style.opacity = '.35';
    $('#home-mic').style.opacity = '.35';
  }

  // 首页
  $$('#mode-seg button').forEach(b => {
    b.onclick = () => {
      settings.mode = b.dataset.mode;
      saveSettings();
      renderHome();
      toast('模式：' + MODES[settings.mode].en + ' · ' + MODES[settings.mode].zh);
    };
  });
  $('#btn-all-scn').onclick = () => { renderScnGrid(); openSheet('#scn-sheet', '#scn-backdrop'); };
  $('#btn-new-scn').onclick = () => { renderScnGrid(); openSheet('#scn-sheet', '#scn-backdrop'); $('#scn-custom-input').focus(); };
  $('#home-mic').onclick = () => {
    if (currentView !== 'chat') showView('chat');
    startListen(settings.inputLang === 'en' ? 'en' : 'zh');
  };
  $('#home-send').onclick = () => {
    if (sendMessage($('#home-input').value)) {
      $('#home-input').value = '';
      autosize($('#home-input'));
    }
  };
  $('#home-input').addEventListener('input', e => autosize(e.target));
  $('#home-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#home-send').click(); }
  });
  $('#eo-quick').onchange = e => { settings.englishOnly = e.target.checked; saveSettings(); };

  $('#btn-me').onclick = () => { renderMyEnglish(); openSheet('#me-sheet', '#me-backdrop'); };
  $('#btn-history').onclick = () => { renderHistory(); openSheet('#hist-sheet', '#hist-backdrop'); };
  $('#btn-settings-home').onclick = openSettings;
  $('#btn-settings-chat').onclick = openSettings;

  // 对话页
  $('#btn-back').onclick = () => { saveCurrentSession(); stopSpeaking(); showView('home'); };
  $('#chat-scn').onclick = () => { renderScnGrid(); openSheet('#scn-sheet', '#scn-backdrop'); };
  $('#chat-mode').onclick = () => {
    const order = ['translate', 'coach', 'life'];
    settings.mode = order[(order.indexOf(settings.mode) + 1) % order.length];
    saveSettings();
    syncHeaderChips();
    saveCurrentSession();
    toast('模式：' + MODES[settings.mode].en + ' · ' + MODES[settings.mode].zh);
  };
  $('#btn-handsfree').onclick = () => {
    handsfree = !handsfree;
    document.body.classList.toggle('hf', handsfree);
    $('#handsfree-note').hidden = !handsfree;
    if (handsfree) {
      if (!rec) { toast('当前浏览器不支持语音识别，免提不可用'); handsfree = false; document.body.classList.remove('hf'); $('#handsfree-note').hidden = true; return; }
      toast('🚗 Hands-free 已开启 — 说完自动听，AI 说完自动听你');
      maybeHandsfreeRearm();
    } else {
      toast('已退出免提模式');
    }
  };
  $('#btn-mic').onclick = () => startListen(settings.inputLang === 'en' ? 'en' : 'zh');
  $('#lang-toggle').onclick = () => {
    settings.inputLang = settings.inputLang === 'en' ? 'zh' : 'en';
    saveSettings();
    updateLangUI();
    toast(settings.inputLang === 'en' ? '输入语言：English' : '输入语言：中文');
  };
  $('#btn-send').onclick = () => {
    if (streaming && abortCtl) { abortCtl.abort(); return; }
    if (sendMessage($('#input').value)) {
      $('#input').value = '';
      autosize($('#input'));
    }
  };
  $('#input').addEventListener('input', e => autosize(e.target));
  $('#input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!streaming) $('#btn-send').click();
    }
  });
  $('#btn-idk').onclick = () => {
    pendingAutoPractice = true;
    if (currentView !== 'chat') showView('chat');
    toast('用中文描述你想说的话，AI 给你英语并带你跟读 🎙');
    $('#input').focus();
  };

  // 跟读练习
  $('#prac-close').onclick = closePractice;
  $('#prac-listen').onclick = () => { stopSpeaking(); enqueueSpeech(pracTarget.en); };
  $('#prac-micbtn').onclick = () => startListen('en', { practice: true });
  $('#prac-again').onclick = () => {
    $('#prac-result').hidden = true;
    $('#prac-again').hidden = true;
    $('#prac-done').hidden = true;
    $('#prac-status').textContent = '';
  };
  $('#prac-done').onclick = closePractice;

  // 场景面板
  $('#scn-close').onclick = () => closeSheet('#scn-sheet', '#scn-backdrop');
  $('#scn-backdrop').onclick = () => closeSheet('#scn-sheet', '#scn-backdrop');
  $('#scn-search').addEventListener('input', renderScnGrid);
  $('#scn-custom-btn').onclick = () => createCustomScenario($('#scn-custom-input').value);
  $('#scn-custom-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); createCustomScenario($('#scn-custom-input').value); }
  });

  // 历史
  $('#hist-close').onclick = () => closeSheet('#hist-sheet', '#hist-backdrop');
  $('#hist-backdrop').onclick = () => closeSheet('#hist-sheet', '#hist-backdrop');

  // My English
  $('#me-close').onclick = () => closeSheet('#me-sheet', '#me-backdrop');
  $('#me-backdrop').onclick = () => closeSheet('#me-sheet', '#me-backdrop');
  $('#me-clear').onclick = () => {
    if (confirm('确定清空 My English？')) { myEnglish = []; saveMyEnglish(); renderMyEnglish(); renderHomeReview(); }
  };

  // 设置
  $('#set-close').onclick = () => closeSheet('#set-sheet', '#set-backdrop');
  $('#set-backdrop').onclick = () => closeSheet('#set-sheet', '#set-backdrop');
  $('#set-provider').onchange = e => { settings.provider = e.target.value; applyProviderPreset(true); };
  $('#set-key-eye').onclick = () => { const k = $('#set-key'); k.type = k.type === 'password' ? 'text' : 'password'; };
  $('#set-accent').onchange = e => { settings.accent = e.target.value; settings.voiceURI = ''; loadVoices(); };
  $('#set-test').onclick = testConnection;
  $('#set-save').onclick = () => {
    collectSettings();
    saveSettings();
    closeSheet('#set-sheet', '#set-backdrop');
    renderHome();
    updateLangUI();
    toast('设置已保存');
  };

  // 点词弹层
  $('#pop-speak').onclick = () => { if (popWord) speakOneShot(popWord); };
  $('#pop-save').onclick = () => {
    if (!popWord) return;
    addMyEnglish(popWord, popTrans, 'daily');
    $('#pop').classList.remove('open');
  };
});
