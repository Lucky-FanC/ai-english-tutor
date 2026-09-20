/* English Around You · 场景句库逻辑（纯离线，无需 Key / 无需网络） */
'use strict';

/* ---------- 小工具 ---------- */
const $ = sel => document.querySelector(sel);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

const store = {
  get(k, d) {
    try { const v = localStorage.getItem('eay2.' + k); return v ? JSON.parse(v) : d; }
    catch (e) { return d; }
  },
  set(k, v) { try { localStorage.setItem('eay2.' + k, JSON.stringify(v)); } catch (e) {} },
};

/* ---------- 状态 ---------- */
const state = {
  tab: 'home',          // home | favs | set
  cat: 'all',           // 当前分类过滤
  detail: null,         // 正在浏览的场景 id
  query: '',
  favs: store.get('favs', []),   // ["场景id:序号", ...]
  set: Object.assign({ rate: 1, accent: 'us', voice: 'auto', engine: 'auto', level: 2, mmKey: '' }, store.get('set', {})),
};

/* 当前难度等级的句子组：1级/3级读 data-levels.js 的 LEVELS，缺省回退 2级（data.js 的 sents） */
function curSents(sc) {
  const lv = window.LEVELS && window.LEVELS[sc.id];
  if (state.set.level === 1 && lv && lv.s1) return lv.s1;
  if (state.set.level === 3 && lv && lv.s3) return lv.s3;
  return sc.sents;
}

/* ---------- 自定义内容（自建场景 + 自己添加的句子，只存在本设备浏览器） ---------- */
const customScenes = () => store.get('customScenes', []);
const customSentsMap = () => store.get('customSents', {});
const allScenarios = () => SCENARIOS.concat(customScenes());
const findScn = id => allScenarios().find(s => s.id === id);

/* ---------- AI 生成（MiniMax 大语言模型，与真人发音共用同一个 Key） ---------- */
const MM_CHAT_MODELS = ['MiniMax-M2', 'MiniMax-M1', 'MiniMax-Text-01', 'abab6.5s-chat'];
function mmChat(messages, mi) {
  mi = mi || 0;
  const model = MM_CHAT_MODELS[mi];
  if (!model) return Promise.reject(new Error('模型都不可用，请稍后再试'));
  return fetch('https://api.minimaxi.com/v1/text/chatcompletion_v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.set.mmKey },
    body: JSON.stringify({ model: model, messages: messages, temperature: 0.6, max_tokens: 1500 })
  }).then(r => r.json()).then(j => {
    const txt = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
    if (!txt) throw new Error((j && j.base_resp && j.base_resp.status_msg) || '生成失败');
    return txt.trim();
  }).catch(err => {
    const m = ((err && err.message) || '').toLowerCase();
    if (m.indexOf('balance') !== -1) throw err; /* 余额不足不重试 */
    if (mi + 1 < MM_CHAT_MODELS.length) return mmChat(messages, mi + 1);
    throw err;
  });
}

/* 中文句子 → 地道英文（用户加句用） */
function aiTranslate(zh) {
  return mmChat([
    { role: 'system', content: '你是口语英语翻译专家。把用户输入的中文翻译成地道、自然的日常英语口语，简短、适合跟读朗读。只输出英文翻译本身，不要解释、不要引号、不要任何其他文字。' },
    { role: 'user', content: zh }
  ]).then(en => {
    en = en.replace(/^["'“”‘’]+|["'“”‘’。\.]+$/g, '').trim();
    if (!en) throw new Error('生成结果为空，请换个说法重试');
    return en;
  });
}

/* 场景名 → 按当前难度生成 5 轮对话 */
const LEVEL_BRIEF = {
  1: '面向幼儿英语启蒙：每句 2-6 个简单单词，句型最基础（如 I want... / It\'s a... / Can I...），家长与孩子对话',
  2: '中级日常口语：每句 4-10 词，简短自然，像真实生活对话，拒绝书面长难句',
  3: '进阶地道表达：每句 8-16 词，可用短语动词和从句，像母语者真实对话'
};
function aiScene(name) {
  return mmChat([
    { role: 'system', content: '你是英语口语教材编写专家，只输出教材内容本身。' },
    { role: 'user', content: '围绕场景「' + name + '」生成一段实用英语对话，5 轮共 10 句。\n难度要求：' + LEVEL_BRIEF[state.set.level] + '\n格式要求：每行一条，严格按「角色: 英文句子 | 中文翻译」，角色名用简短英文（如 Mom, Doctor, Me, Clerk），第一人称用 Me，对话双方交替。不要输出任何其他内容。' }
  ]).then(txt => {
    const out = [];
    txt.split('\n').forEach(line => {
      const m = line.match(/^\s*([^\s:：|｜]{1,14})[:：]\s*(.+?)\s*[|｜]\s*(.+?)\s*$/);
      if (m && m[2] && m[3]) out.push([m[1] + ': ' + m[2], m[1] + '：' + m[3]]);
    });
    if (out.length < 4) throw new Error('生成结果格式异常，请重试一次');
    return out;
  });
}

const totalSents = SCENARIOS.reduce((n, s) => n + s.sents.length, 0);

/* ---------- 语音朗读 ---------- */
let voices = [];
function loadVoices() { voices = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().indexOf('en') === 0); }
if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = () => { loadVoices(); if (state.tab === 'set') renderSet(); };
}

/* 声音自然度评分：真人感强的排前面 */
function scoreVoice(v) {
  const n = v.name.toLowerCase();
  let s = 0;
  if (/siri|samantha|alex\b|victoria|allison|nicky|susan|ava|zoe|aaron|karen|moira/.test(n)) s += 12;
  if (/microsoft.*(online|natural)|\bnatural\b|\bneural\b|aria|jenny|guy\b|sonia|libby|ryan/.test(n)) s += 11;
  if (/google/.test(n)) s += 8;
  if (v.localService) s += 2;
  if (/compact|espeak|robot|fred/.test(n)) s -= 12;
  const isGb = /en[-_]gb/i.test(v.lang);
  if ((state.set.accent === 'gb' && isGb) || (state.set.accent !== 'gb' && /en[-_]us/i.test(v.lang))) s += 3;
  return s;
}
function sortedVoices() { return voices.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a) || a.name.localeCompare(b.name)); }
function pickVoice() {
  if (!voices.length) return null;
  if (state.set.voice && state.set.voice !== 'auto') {
    const v = voices.find(x => x.voiceURI === state.set.voice);
    if (v) return v;
  }
  return sortedVoices()[0];
}

/* 句子以「角色: 」开头时，剥掉角色名再朗读（支持 Mom: / 妈妈: / Kids: 等） */
function stripRole(text) {
  return text.replace(/^(?:[A-Za-z]{1,12}|[^a-zA-Z:：]{1,8})[:：]\s*/, '');
}
function splitRole(text) {
  const m = text.match(/^(?:([A-Za-z]{1,12})|([^a-zA-Z:：]{1,8}))[:：]\s*/);
  return m ? { who: m[1] || m[2], rest: text.slice(m[0].length) } : null;
}
function whoClass(who) {
  let h = 0;
  for (let i = 0; i < who.length; i++) h = (h * 31 + who.charCodeAt(i)) % 997;
  return 'who-' + (h % 4);
}
function lineWithRole(text, cls) {
  const box = el('div', cls);
  const p = splitRole(text);
  if (p) {
    box.appendChild(el('span', 's-who ' + whoClass(p.who), p.who));
    box.appendChild(document.createTextNode(p.rest));
  } else {
    box.textContent = text;
  }
  return box;
}

let speakingCard = null;
let speakGen = 0;
let curAudio = null;

/* 本地语音是否可用（微信内置浏览器没有 speechSynthesis，国产机常无英文语音引擎） */
function localTTSAvailable() {
  if (!('speechSynthesis' in window)) return false;
  const vs = speechSynthesis.getVoices() || [];
  return vs.some(v => (v.lang || '').toLowerCase().indexOf('en') === 0);
}

/* 在线发音入口：填了真人语音Key → MiniMax神经语音（真人级）；否则或失败 → 百度翻译TTS兜底 */
let mmStatus = ''; /* 'ok' 或 'fail:原因'，用于设置页显示连接状态 */
const MM_CANDIDATES = [
  { model: 'speech-02-turbo', voice_id: 'English_Graceful_Lady' },
  { model: 'speech-02-turbo', voice_id: 'English_Stable_Man' },
  { model: 'speech-02-turbo', voice_id: 'female-shaonv' },
  { model: 'speech-02-hd', voice_id: 'English_Graceful_Lady' },
  { model: 'speech-2.6-turbo', voice_id: 'English_Graceful_Lady' }
];

function speakRemote(text, gen, card) {
  if (state.set.mmKey) { speakMiniMax(text, gen, card, 0); return; }
  speakBaidu(text, gen, card);
}

function speakMiniMax(text, gen, card, ci) {
  const c = MM_CANDIDATES[ci];
  if (!c) { speakBaidu(text, gen, card); return; }
  const speed = Math.max(0.5, Math.min(2, state.set.rate * (state.set.level === 1 ? 0.75 : 1)));
  fetch('https://api.minimaxi.com/v1/t2a_v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.set.mmKey },
    body: JSON.stringify({
      model: c.model, text: text, stream: false,
      voice_setting: { voice_id: c.voice_id, speed: speed, vol: 1, pitch: 0 },
      audio_setting: { sample_rate: 32000, bitrate: 128000, format: 'mp3', channel: 1 }
    })
  }).then(r => r.json()).then(j => {
    if (gen !== speakGen) return;
    const hex = j && j.data && j.data.audio;
    if (!hex) {
      const msg = (j && j.base_resp && j.base_resp.status_msg) || '未知错误';
      mmStatus = 'fail:' + msg;
      throw new Error(msg.toLowerCase().indexOf('balance') !== -1 ? 'mm-balance' : 'mm-no-audio');
    }
    mmStatus = 'ok';
    const bin = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bin.length; i++) bin[i] = parseInt(hex.substr(i * 2, 2), 16);
    const url = URL.createObjectURL(new Blob([bin], { type: 'audio/mpeg' }));
    const audio = new Audio(url);
    curAudio = audio;
    audio.addEventListener('ended', () => { URL.revokeObjectURL(url); if (gen === speakGen) finishSpeak(card, gen); });
    audio.addEventListener('error', () => { URL.revokeObjectURL(url); if (gen === speakGen) speakBaidu(text, gen, card); });
    audio.play().catch(() => { if (gen === speakGen) speakBaidu(text, gen, card); });
  }).catch(err => {
    if (gen !== speakGen) return;
    /* 余额不足：不再重试其他候选，直接回退百度（设置页会显示原因） */
    if (err && err.message === 'mm-balance') { speakBaidu(text, gen, card); return; }
    speakMiniMax(text, gen, card, ci + 1);
  });
}

function speakBaidu(text, gen, card) {
  const spd = Math.max(1, Math.min(7, Math.round(3 / state.set.rate)));
  const url = 'https://fanyi.baidu.com/gettts?lan=en&spd=' + spd + '&text=' + encodeURIComponent(text);
  const audio = new Audio();
  curAudio = audio;
  audio.addEventListener('ended', () => { if (gen === speakGen) finishSpeak(card, gen); });
  audio.addEventListener('error', () => {
    if (gen !== speakGen) return;
    finishSpeak(card, gen);
    alert('在线发音加载失败，请检查网络后重试。\n（在线发音需要联网）');
  });
  audio.src = url;
  audio.play().catch(() => { if (gen === speakGen) finishSpeak(card, gen); });
}

/* 朗读节奏：按标点分段，段间停顿更像真人说话；疑问/感叹句语调轻微上扬
   （注意：不把冒号当停顿点，避免把时间 7:30 切成两半） */
const PAUSE_MS = { ',': 150, '，': 150, ';': 200, '；': 200, '.': 320, '。': 320, '!': 320, '！': 320, '?': 320, '？': 320, '…': 320 };
function splitForSpeech(text) {
  const parts = text.match(/[^,.!?;，。！？；…]+[,.!?;，。！？；…]*/g) || [text];
  return parts.map(t => t.trim()).filter(Boolean).map(t => ({ txt: t, pause: PAUSE_MS[t.slice(-1)] || 60 }));
}

function stopSpeak() {
  speakGen++;
  if (curAudio) { curAudio.pause(); curAudio = null; }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (speakingCard) { speakingCard.classList.remove('speaking'); const d = speakingCard.querySelector('.s-hint'); if (d) d.remove(); speakingCard = null; }
}

function finishSpeak(card, gen) {
  if (gen !== speakGen) return;
  if (card && speakingCard === card) {
    card.classList.remove('speaking');
    const d = card.querySelector('.s-hint');
    if (d) d.remove();
    speakingCard = null;
  }
}

function speak(text, card, voiceOverride) {
  if (card && speakingCard === card) { stopSpeak(); return; }
  stopSpeak();
  const gen = ++speakGen;
  const voice = voiceOverride || pickVoice();
  if (card) {
    card.classList.add('speaking');
    const hint = el('div', 's-hint');
    hint.appendChild(el('span', 'dot'));
    hint.appendChild(el('span', null, '朗读中，再点一次停止'));
    card.appendChild(hint);
    card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    speakingCard = card;
  }
  const plain = stripRole(text);
  // 引擎选择：auto=本地可用就用本地，否则自动走在线（微信/国产机兜底）
  const useLocal = voiceOverride ? true
    : state.set.engine === 'local' ? ('speechSynthesis' in window)
    : state.set.engine === 'online' ? false
    : localTTSAvailable();
  if (useLocal) {
    playSegs(splitForSpeech(plain), 0, voice, gen, card);
  } else {
    speakRemote(plain, gen, card);
  }
}

function playSegs(segs, i, voice, gen, card) {
  if (gen !== speakGen) return;
  if (!('speechSynthesis' in window)) {
    finishSpeak(card, gen);
    alert('抱歉，当前浏览器不支持本地语音，请在「设置」里把发音方式切换为「在线发音」。');
    return;
  }
  if (i >= segs.length) { finishSpeak(card, gen); return; }
  const seg = segs[i];
  const u = new SpeechSynthesisUtterance(seg.txt);
  if (voice) { u.voice = voice; u.lang = voice.lang; }
  else u.lang = state.set.accent === 'gb' ? 'en-GB' : 'en-US';
  u.rate = state.set.rate;
  u.pitch = /[?!？！]$/.test(seg.txt) ? 1.05 : 1;
  u.onend = () => {
    if (gen !== speakGen) return;
    setTimeout(() => playSegs(segs, i + 1, voice, gen, card), seg.pause);
  };
  u.onerror = () => { if (gen === speakGen) finishSpeak(card, gen); };
  speechSynthesis.speak(u);
}

/* ---------- 收藏 ---------- */
const sid2Sent = sid => {
  const i = sid.lastIndexOf(':');
  const scn = findScn(sid.slice(0, i));
  const idx = +sid.slice(i + 1);
  return scn && curSents(scn)[idx] ? { scn, idx, en: curSents(scn)[idx][0], zh: curSents(scn)[idx][1] } : null;
};
const isFav = sid => state.favs.indexOf(sid) !== -1;
function toggleFav(sid, btn) {
  const i = state.favs.indexOf(sid);
  if (i === -1) state.favs.push(sid); else state.favs.splice(i, 1);
  store.set('favs', state.favs);
  if (btn) { btn.classList.toggle('on', i === -1); btn.textContent = i === -1 ? '★' : '☆'; }
  if (state.tab === 'favs' && i !== -1) render(); // 收藏页里取消 → 即时移除
}

/* ---------- 句子卡片 ---------- */
function sentCard(scn, idx, showTag) {
  const [en, zh] = curSents(scn)[idx];
  const sid = scn.id + ':' + idx;
  const card = el('button', 's-card');
  card.dataset.sid = sid;
  card.appendChild(lineWithRole(en, 's-en'));
  card.appendChild(lineWithRole(zh, 's-zh'));
  if (showTag) {
    const cat = CATS.find(c => c.id === scn.cat);
    card.appendChild(el('span', 's-tag', (cat ? cat.emoji + ' ' + cat.zh + ' · ' : '') + scn.zh));
  }
  const fav = el('span', 's-fav' + (isFav(sid) ? ' on' : ''), isFav(sid) ? '★' : '☆');
  card.appendChild(fav);
  card.addEventListener('click', () => speak(en, card));
  fav.addEventListener('click', ev => { ev.stopPropagation(); toggleFav(sid, fav); });
  return card;
}

/* 自己添加的句子卡片：不参与收藏，带删除 */
function mySentCard(scn, idx) {
  const m = customSentsMap();
  const [en, zh] = m[scn.id][idx];
  const card = el('button', 's-card s-my');
  card.appendChild(lineWithRole(en, 's-en'));
  card.appendChild(lineWithRole(zh, 's-zh'));
  card.appendChild(el('span', 's-tag', '📝 我添加的'));
  const del = el('span', 's-fav s-del', '✕');
  del.title = '删除这句';
  card.appendChild(del);
  card.addEventListener('click', () => speak(en, card));
  del.addEventListener('click', ev => {
    ev.stopPropagation();
    if (!confirm('删除这句？')) return;
    const mm = customSentsMap();
    mm[scn.id].splice(idx, 1);
    store.set('customSents', mm);
    render();
  });
  return card;
}

/* ---------- 视图渲染 ---------- */
const main = $('#main');

function renderCatBar() {
  const bar = $('#cat-bar');
  bar.textContent = '';
  const all = [{ id: 'all', emoji: '🌐', zh: '全部' }].concat(CATS);
  all.forEach(c => {
    const n = c.id === 'all' ? allScenarios().length : SCENARIOS.filter(s => s.cat === c.id).length;
    const b = el('button', 'cat-chip' + (state.cat === c.id ? ' active' : ''), c.emoji + ' ' + c.zh + ' ' + n);
    b.addEventListener('click', () => { state.cat = c.id; state.detail = null; state.query = ''; $('#search').value = ''; $('#search-clear').hidden = true; renderCatBar(); render(); });
    bar.appendChild(b);
  });
}

function renderHome() {
  main.textContent = '';
  main.appendChild(el('div', 'sec-title', state.cat === 'all' ? '📚 全部场景' : '📚 ' + CATS.find(c => c.id === state.cat).emoji + ' ' + CATS.find(c => c.id === state.cat).zh));
  const grid = el('div', 'scn-grid');
  const mine = customScenes();
  const list = state.cat === 'all' ? mine.concat(SCENARIOS) : SCENARIOS.filter(s => s.cat === state.cat);
  if (state.cat === 'all') {
    const add = el('button', 'scn-card scn-add');
    add.appendChild(el('span', 'scn-emoji', '➕'));
    const ainfo = el('div', 'scn-info');
    ainfo.appendChild(el('div', 'scn-zh', '新建场景'));
    ainfo.appendChild(el('div', 'scn-en', '输入名称，AI 生成对话'));
    add.appendChild(ainfo);
    add.addEventListener('click', () => { state.detail = '_create'; render(); });
    grid.appendChild(add);
  }
  list.forEach(s => {
    const card = el('button', 'scn-card');
    card.appendChild(el('span', 'scn-emoji', s.emoji));
    const info = el('div', 'scn-info');
    info.appendChild(el('div', 'scn-zh', s.zh));
    info.appendChild(el('div', 'scn-en', s.en));
    info.appendChild(el('div', 'scn-n', (curSents(s).length / 2) + ' 轮对话'));
    card.appendChild(info);
    card.addEventListener('click', () => { state.detail = s.id; render(); });
    grid.appendChild(card);
  });
  main.appendChild(grid);
  main.appendChild(el('div', 'count-note', '共 ' + allScenarios().length + ' 个场景' + (mine.length ? '（含 ' + mine.length + ' 个自建）' : '') + ' · ' + (totalSents / 2) + ' 轮对话 · 点击句子即可朗读'));
}

function renderDetail() {
  if (state.detail === '_create') { renderCreate(); return; }
  const scn = findScn(state.detail);
  if (!scn) { state.detail = null; renderHome(); return; }
  main.textContent = '';
  const head = el('div', 'detail-head');
  const back = el('button', 'back-btn', '←');
  back.title = '返回场景列表';
  back.addEventListener('click', () => { state.detail = null; render(); });
  head.appendChild(back);
  const t = el('div', 'detail-title');
  t.appendChild(el('div', 'detail-zh', scn.emoji + ' ' + scn.zh));
  t.appendChild(el('div', 'detail-en', scn.en + ' · ' + (curSents(scn).length / 2) + ' 轮对话 · ' + ({1:'🐣1级',2:'🌿2级',3:'🚀3级'})[state.set.level]));
  head.appendChild(t);
  if (scn.custom) {
    const del = el('button', 'back-btn', '🗑');
    del.title = '删除这个自建场景';
    del.addEventListener('click', () => {
      if (!confirm('删除「' + scn.zh + '」以及在里面添加的句子？')) return;
      store.set('customScenes', customScenes().filter(s => s.id !== scn.id));
      const m = customSentsMap();
      delete m[scn.id];
      store.set('customSents', m);
      state.detail = null;
      render();
    });
    head.appendChild(del);
  }
  main.appendChild(head);
  curSents(scn).forEach((_, i) => main.appendChild(sentCard(scn, i, false)));
  const mySents = customSentsMap()[scn.id] || [];
  if (mySents.length) {
    main.appendChild(el('div', 'sec-title', '📝 我添加的句子（' + mySents.length + '）'));
    mySents.forEach((_, i) => main.appendChild(mySentCard(scn, i)));
  }
  /* 添加句子：输入中文，AI 生成英文后可点读 */
  const addBox = el('div', 'ai-box');
  addBox.appendChild(el('div', 'ai-title', '➕ 添加句子'));
  const ta = el('textarea', 'ai-input');
  ta.rows = 2;
  ta.placeholder = '输入这里还没有的中文句子，AI 生成英文后就能点读\n例如：医生，孩子从昨天开始有点咳嗽';
  const addBtn = el('button', 'ai-btn', '✨ 生成英文并添加');
  addBtn.addEventListener('click', () => {
    const zh = ta.value.trim();
    if (!zh) { alert('请先输入中文句子'); return; }
    if (!state.set.mmKey) { alert('需要先在「设置」里填写真人发音 Key\n（生成句子用的是同一个 Key）'); return; }
    addBtn.disabled = true;
    addBtn.textContent = '⏳ 生成中…';
    aiTranslate(zh).then(en => {
      const m = customSentsMap();
      if (!m[scn.id]) m[scn.id] = [];
      m[scn.id].push([en, zh]);
      store.set('customSents', m);
      render();
    }).catch(err => {
      alert('生成失败：' + (err && err.message ? err.message : '网络错误') + '\n请检查网络，或到设置页确认真人发音 Key 有效');
      addBtn.disabled = false;
      addBtn.textContent = '✨ 生成英文并添加';
    });
  });
  addBox.appendChild(ta);
  addBox.appendChild(addBtn);
  addBox.appendChild(el('div', 'ai-note', '只保存在这台设备 · 生成与朗读走你已填的 MiniMax Key，花极少余额'));
  main.appendChild(addBox);
}

function renderCreate() {
  main.textContent = '';
  const head = el('div', 'detail-head');
  const back = el('button', 'back-btn', '←');
  back.title = '返回场景列表';
  back.addEventListener('click', () => { state.detail = null; render(); });
  head.appendChild(back);
  const t = el('div', 'detail-title');
  t.appendChild(el('div', 'detail-zh', '➕ 新建场景'));
  t.appendChild(el('div', 'detail-en', '输入场景名称，AI 自动生成 ' + ({1:'🐣1级启蒙',2:'🌿2级日常',3:'🚀3级进阶'})[state.set.level] + ' 对话'));
  head.appendChild(t);
  main.appendChild(head);
  const box = el('div', 'ai-box');
  const input = el('input', 'ai-input');
  input.type = 'text';
  input.placeholder = '场景名称（中文），如：宠物医院看诊、去露营、面试自我介绍';
  const btn = el('button', 'ai-btn', '✨ 生成 5 轮对话');
  btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) { alert('请先输入场景名称'); return; }
    if (!state.set.mmKey) { alert('需要先在「设置」里填写真人发音 Key\n（生成对话用的是同一个 Key）'); return; }
    btn.disabled = true;
    btn.textContent = '⏳ 正在生成，约 10 秒…';
    aiScene(name).then(sents => {
      const sc = { id: 'cs' + Date.now(), cat: 'custom', emoji: '📝', zh: name, en: 'Custom scene', sents: sents, custom: true };
      const cs = customScenes();
      cs.unshift(sc);
      store.set('customScenes', cs);
      state.detail = sc.id;
      render();
    }).catch(err => {
      alert('生成失败：' + (err && err.message ? err.message : '网络错误') + '\n请检查网络，或到设置页确认真人发音 Key 有效');
      btn.disabled = false;
      btn.textContent = '✨ 生成 5 轮对话';
    });
  });
  box.appendChild(input);
  box.appendChild(btn);
  box.appendChild(el('div', 'ai-note', '按当前难度等级生成 10 句 · 只保存在这台设备 · 生成后还可以继续往里加句子'));
  main.appendChild(box);
  main.appendChild(el('div', 'empty', '💡 场景示例：\n牙科看牙 · 幼儿园家长会 · 取快递 · 健身房办卡 · 机场值机\n\n小提示：在设置页切换难度等级后，这里生成的对话难度会跟着变'));
}

function renderSearch(q) {
  main.textContent = '';
  const query = q.trim().toLowerCase();
  if (!query) { render(); return; }
  let hits = 0;
  allScenarios().forEach(scn => {
    const matched = [];
    curSents(scn).forEach((s, i) => {
      if (s[0].toLowerCase().indexOf(query) !== -1 || s[1].indexOf(query) !== -1) matched.push(i);
    });
    const myMatched = [];
    (customSentsMap()[scn.id] || []).forEach((s, i) => {
      if (s[0].toLowerCase().indexOf(query) !== -1 || s[1].indexOf(query) !== -1) myMatched.push(i);
    });
    if (matched.length || myMatched.length) {
      main.appendChild(el('div', 'result-group', scn.emoji + ' ' + scn.zh + '（' + (matched.length + myMatched.length) + '）'));
      matched.forEach(i => main.appendChild(sentCard(scn, i, false)));
      myMatched.forEach(i => main.appendChild(mySentCard(scn, i)));
      hits += matched.length + myMatched.length;
    }
  });
  if (!hits) main.appendChild(el('div', 'empty', '没有找到相关句子\n换个关键词试试，比如「谢谢」「医院」「photo」'));
}

function renderFavs() {
  main.textContent = '';
  main.appendChild(el('div', 'sec-title', '⭐ 我的收藏（' + state.favs.length + '）'));
  if (!state.favs.length) {
    main.appendChild(el('div', 'empty', '还没有收藏\n浏览句子时点右上角的 ☆ 就能收藏到这里'));
    return;
  }
  let lastCat = null;
  state.favs.map(sid2Sent).filter(Boolean).forEach(item => {
    if (item.scn.cat !== lastCat) {
      lastCat = item.scn.cat;
      const cat = CATS.find(c => c.id === lastCat);
      main.appendChild(el('div', 'fav-group-head', (cat ? cat.emoji + ' ' + cat.zh : '📝 自建场景')));
    }
    main.appendChild(sentCard(item.scn, item.idx, true));
  });
}

/* 发音人选择面板：列出设备上所有英文声音，按自然度排序，可逐个试听 */
function renderVoicePanel() {
  if (state.set.engine === 'online') return; /* 在线模式下本地发音人无效，隐藏 */
  main.appendChild(el('div', 'sec-title', '🎙 发音人'));
  const vpanel = el('div', 'set-panel');
  if (!('speechSynthesis' in window)) {
    vpanel.appendChild(el('div', 'about', '当前浏览器不支持语音合成，请用 Safari 或 Chrome 打开。'));
    main.appendChild(vpanel);
    return;
  }
  const auto = { voiceURI: 'auto', name: '自动（推荐）', localService: true, _auto: true };
  const all = [auto].concat(sortedVoices());
  const showAll = !!state._vAll;
  const shown = showAll ? all : all.slice(0, 6);
  const vlist = el('div', 'voice-list');
  shown.forEach(v => {
    const cur = state.set.voice === v.voiceURI;
    const item = el('label', 'voice-item' + (cur ? ' active' : ''));
    const radio = el('input');
    radio.type = 'radio'; radio.name = 'eay-voice'; radio.checked = cur;
    radio.addEventListener('change', () => { state.set.voice = v.voiceURI; store.set('set', state.set); renderSet(); });
    item.appendChild(radio);
    item.appendChild(el('span', 'vi-name', v._auto ? '自动（每次选最自然的声音）' : v.name));
    item.appendChild(el('span', 'vi-tag', v._auto ? '智能' : (v.localService ? '本地' : '在线')));
    if (!v._auto) {
      const tryBtn = el('button', 'vi-try', '🔊');
      tryBtn.title = '试听';
      tryBtn.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); speak('Hi! This is how I sound. Hope you like my voice!', null, v); });
      item.appendChild(tryBtn);
    }
    vlist.appendChild(item);
  });
  vpanel.appendChild(vlist);
  if (all.length > 6) {
    const more = el('button', 'text-btn voice-more', showAll ? '收起 ▲' : '显示全部 ' + (all.length - 1) + ' 个声音 ▼');
    more.addEventListener('click', () => { state._vAll = !state._vAll; renderSet(); });
    vpanel.appendChild(more);
  }
  vpanel.appendChild(el('div', 'about', '先点 🔊 逐个试听，再勾选喜欢的。「在线」声音（如 Microsoft Natural）通常最像真人；「本地」声音不联网也能用。'));
  main.appendChild(vpanel);
}

function renderSet() {
  main.textContent = '';
  main.appendChild(el('div', 'sec-title', '⚙️ 设置'));

  // 发音方式
  main.appendChild(el('div', 'sec-title', '🔊 发音方式'));
  const epanel = el('div', 'set-panel');
  const eseg = el('div', 'seg');
  [['auto', '自动'], ['local', '本地语音'], ['online', '在线发音']].forEach(([id, label]) => {
    const b = el('button', state.set.engine === id ? 'active' : '', label);
    b.addEventListener('click', () => { state.set.engine = id; store.set('set', state.set); renderSet(); });
    eseg.appendChild(b);
  });
  epanel.appendChild(eseg);
  epanel.appendChild(el('div', 'about', '「自动」= 本地语音可用就用本地，否则自动走在线（推荐）。「本地语音」离线可用，但部分国产手机没有英文语音引擎。「在线发音」支持微信在内的任何浏览器，需联网，语速设置同样生效。'));
  main.appendChild(epanel);

  // 句子难度
  main.appendChild(el('div', 'sec-title', '🎚 句子难度'));
  const lpanel = el('div', 'set-panel');
  const lseg = el('div', 'seg');
  [[1, '🐣 1级 启蒙'], [2, '🌿 2级 日常'], [3, '🚀 3级 进阶']].forEach(([lv, label]) => {
    const b = el('button', state.set.level === lv ? 'active' : '', label);
    b.addEventListener('click', () => { state.set.level = lv; store.set('set', state.set); renderSet(); });
    lseg.appendChild(b);
  });
  lpanel.appendChild(lseg);
  const ldesc = {
    1: '🐣 1级 = 给孩子的超简单句（2-6个单词），在线发音自动放慢，适合启蒙跟读。',
    2: '🌿 2级 = 中级日常口语，简短自然的实用对话（原有内容）。',
    3: '🚀 3级 = 进阶表达，更地道的说法和常用短语动词，适合拔高。'
  };
  lpanel.appendChild(el('div', 'about', ldesc[state.set.level]));
  main.appendChild(lpanel);

  // 真人发音 Key（可选，填了在线发音升级为神经语音）
  main.appendChild(el('div', 'sec-title', '🗝 真人发音 Key（可选）'));
  const kpanel = el('div', 'set-panel');
  const krow = el('div', 'key-row');
  const kinput = el('input', 'key-input');
  kinput.type = 'text';
  kinput.autocomplete = 'off';
  kinput.spellcheck = false;
  kinput.placeholder = '粘贴 MiniMax API Key（sk- 开头）';
  kinput.value = state.set.mmKey || '';
  krow.appendChild(kinput);
  const ksave = el('button', 'key-save', '保存');
  ksave.addEventListener('click', () => {
    state.set.mmKey = kinput.value.trim();
    store.set('set', state.set);
    alert(state.set.mmKey ? '已保存！现在点句子就是接近真人的发音了。' : '已清除，在线发音恢复为普通模式。');
    renderSet();
  });
  krow.appendChild(ksave);
  kpanel.appendChild(krow);
  if (state.set.mmKey) {
    const ktry = el('button', 'key-try', '🔊 试听真人发音');
    ktry.addEventListener('click', () => speakRemote('Hi! This is a real neural voice. I sound much more natural, don\'t I?', null));
    kpanel.appendChild(ktry);
    let stText;
    if (!mmStatus) stText = '连接状态：还没测试过，点上面的「试听真人发音」试试。';
    else if (mmStatus === 'ok') stText = '✓ 连接状态：真人语音已生效！现在点任何句子都是真人级发音。';
    else if (mmStatus.indexOf('balance') !== -1) stText = '✗ 连接状态：MiniMax 账户没有可用额度（余额不足）。请打开 platform.minimaxi.com 控制台 → 完成实名认证、领取语音免费资源包，或少量充值（几块钱就能用很久），然后回来重新试听。';
    else stText = '✗ 连接状态：' + mmStatus.slice(5) + '。请检查 Key 是否复制完整，或联系平台客服。';
    kpanel.appendChild(el('div', 'about', stText));
  }
  kpanel.appendChild(el('div', 'about', '填写后，在线发音升级为「神经语音」——接近真人的美式发音，支持整句，免费额度个人用足够。获取方法（约2分钟）：① 浏览器打开 platform.minimaxi.com ② 手机号注册登录 ③ 进入「API 管理」创建 API Key ④ 复制 Key 粘贴到这里点保存。Key 只保存在你自己手机的浏览器里。'));
  main.appendChild(kpanel);

  renderVoicePanel();

  const panel = el('div', 'set-panel');

  // 语速
  const row1 = el('div', 'set-row');
  row1.appendChild(el('label', null, '朗读语速'));
  const range = el('input');
  range.type = 'range'; range.min = '0.6'; range.max = '1.2'; range.step = '0.05'; range.value = String(state.set.rate);
  const val = el('span', 'val', state.set.rate.toFixed(2) + '×');
  range.addEventListener('input', () => { state.set.rate = +range.value; val.textContent = state.set.rate.toFixed(2) + '×'; store.set('set', state.set); });
  row1.appendChild(range);
  row1.appendChild(val);
  panel.appendChild(row1);

  // 口音
  const row2 = el('div', 'set-row');
  row2.appendChild(el('label', null, '朗读口音'));
  const seg = el('div', 'seg');
  [['us', '🇺🇸 美音'], ['gb', '🇬🇧 英音']].forEach(([id, label]) => {
    const b = el('button', state.set.accent === id ? 'active' : '', label);
    b.addEventListener('click', () => { state.set.accent = id; store.set('set', state.set); renderSet(); });
    seg.appendChild(b);
  });
  row2.appendChild(seg);
  panel.appendChild(row2);

  main.appendChild(panel);

  // 收藏管理
  const panel2 = el('div', 'set-panel');
  const row3 = el('div', 'set-row');
  row3.appendChild(el('label', null, '清空收藏'));
  const clearBtn = el('button', 'danger-btn', '清空全部收藏（' + state.favs.length + ' 条）');
  clearBtn.addEventListener('click', () => {
    if (!state.favs.length) return;
    if (confirm('确定要清空所有收藏吗？')) { state.favs = []; store.set('favs', []); renderSet(); }
  });
  row3.appendChild(clearBtn);
  panel2.appendChild(row3);
  main.appendChild(panel2);

  // 关于
  const about = el('div', 'about');
  about.innerHTML = '';
  about.appendChild(el('div', null, '📖 关于'));
  about.appendChild(el('div', null, 'English Around You 场景对话库：' + SCENARIOS.length + ' 个场景 · ' + (totalSents / 2) + ' 轮真实对话。'));
  about.appendChild(el('div', null, '完全离线可用，无需注册、无需联网、无需 API Key。'));
  about.appendChild(el('div', null, '手机浏览器「添加到主屏幕」后像 App 一样使用。'));
  main.appendChild(about);
}

function render() {
  stopSpeak();
  if (state.query.trim()) { renderSearch(state.query); return; }
  if (state.tab === 'favs') { renderFavs(); return; }
  if (state.tab === 'set') { renderSet(); return; }
  if (state.detail) renderDetail(); else renderHome();
}

/* ---------- Tab 切换 ---------- */
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    state.tab = t.dataset.tab;
    state.detail = null;
    render();
  });
});

/* ---------- 搜索 ---------- */
let searchTimer = null;
const searchInput = $('#search');
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.query = searchInput.value;
    $('#search-clear').hidden = !state.query;
    render();
  }, 160);
});
$('#search-clear').addEventListener('click', () => {
  searchInput.value = ''; state.query = ''; $('#search-clear').hidden = true; render();
  searchInput.focus();
});

/* ---------- 启动 ---------- */
renderCatBar();
render();
