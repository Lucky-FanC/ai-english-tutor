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
  set: Object.assign({ rate: 1, accent: 'us', voice: 'auto' }, store.get('set', {})),
};

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

/* 朗读节奏：按标点分段，段间停顿更像真人说话；疑问/感叹句语调轻微上扬
   （注意：不把冒号当停顿点，避免把时间 7:30 切成两半） */
const PAUSE_MS = { ',': 150, '，': 150, ';': 200, '；': 200, '.': 320, '。': 320, '!': 320, '！': 320, '?': 320, '？': 320, '…': 320 };
function splitForSpeech(text) {
  const parts = text.match(/[^,.!?;，。！？；…]+[,.!?;，。！？；…]*/g) || [text];
  return parts.map(t => t.trim()).filter(Boolean).map(t => ({ txt: t, pause: PAUSE_MS[t.slice(-1)] || 60 }));
}

function stopSpeak() {
  speakGen++;
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
  if (!('speechSynthesis' in window)) { alert('抱歉，你的浏览器不支持语音朗读，请用 Safari 或 Chrome 打开。'); return; }
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
  playSegs(splitForSpeech(stripRole(text)), 0, voice, gen, card);
}

function playSegs(segs, i, voice, gen, card) {
  if (gen !== speakGen) return;
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
  const scn = SCENARIOS.find(s => s.id === sid.slice(0, i));
  const idx = +sid.slice(i + 1);
  return scn && scn.sents[idx] ? { scn, idx, en: scn.sents[idx][0], zh: scn.sents[idx][1] } : null;
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
  const [en, zh] = scn.sents[idx];
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

/* ---------- 视图渲染 ---------- */
const main = $('#main');

function renderCatBar() {
  const bar = $('#cat-bar');
  bar.textContent = '';
  const all = [{ id: 'all', emoji: '🌐', zh: '全部' }].concat(CATS);
  all.forEach(c => {
    const n = c.id === 'all' ? SCENARIOS.length : SCENARIOS.filter(s => s.cat === c.id).length;
    const b = el('button', 'cat-chip' + (state.cat === c.id ? ' active' : ''), c.emoji + ' ' + c.zh + ' ' + n);
    b.addEventListener('click', () => { state.cat = c.id; state.detail = null; state.query = ''; $('#search').value = ''; $('#search-clear').hidden = true; renderCatBar(); render(); });
    bar.appendChild(b);
  });
}

function renderHome() {
  main.textContent = '';
  main.appendChild(el('div', 'sec-title', state.cat === 'all' ? '📚 全部场景' : '📚 ' + CATS.find(c => c.id === state.cat).emoji + ' ' + CATS.find(c => c.id === state.cat).zh));
  const grid = el('div', 'scn-grid');
  SCENARIOS.filter(s => state.cat === 'all' || s.cat === state.cat).forEach(s => {
    const card = el('button', 'scn-card');
    card.appendChild(el('span', 'scn-emoji', s.emoji));
    const info = el('div', 'scn-info');
    info.appendChild(el('div', 'scn-zh', s.zh));
    info.appendChild(el('div', 'scn-en', s.en));
    info.appendChild(el('div', 'scn-n', (s.sents.length / 2) + ' 轮对话'));
    card.appendChild(info);
    card.addEventListener('click', () => { state.detail = s.id; render(); });
    grid.appendChild(card);
  });
  main.appendChild(grid);
  main.appendChild(el('div', 'count-note', '共 ' + SCENARIOS.length + ' 个场景 · ' + (totalSents / 2) + ' 轮对话 · 点击句子即可朗读'));
}

function renderDetail() {
  const scn = SCENARIOS.find(s => s.id === state.detail);
  if (!scn) { state.detail = null; renderHome(); return; }
  main.textContent = '';
  const head = el('div', 'detail-head');
  const back = el('button', 'back-btn', '←');
  back.title = '返回场景列表';
  back.addEventListener('click', () => { state.detail = null; render(); });
  head.appendChild(back);
  const t = el('div', 'detail-title');
  t.appendChild(el('div', 'detail-zh', scn.emoji + ' ' + scn.zh));
  t.appendChild(el('div', 'detail-en', scn.en + ' · ' + (scn.sents.length / 2) + ' 轮对话'));
  head.appendChild(t);
  main.appendChild(head);
  scn.sents.forEach((_, i) => main.appendChild(sentCard(scn, i, false)));
}

function renderSearch(q) {
  main.textContent = '';
  const query = q.trim().toLowerCase();
  if (!query) { render(); return; }
  let hits = 0;
  SCENARIOS.forEach(scn => {
    const matched = [];
    scn.sents.forEach((s, i) => {
      if (s[0].toLowerCase().indexOf(query) !== -1 || s[1].indexOf(query) !== -1) matched.push(i);
    });
    if (matched.length) {
      main.appendChild(el('div', 'result-group', scn.emoji + ' ' + scn.zh + '（' + matched.length + '）'));
      matched.forEach(i => main.appendChild(sentCard(scn, i, false)));
      hits += matched.length;
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
      main.appendChild(el('div', 'fav-group-head', (cat ? cat.emoji + ' ' + cat.zh : '')));
    }
    main.appendChild(sentCard(item.scn, item.idx, true));
  });
}

/* 发音人选择面板：列出设备上所有英文声音，按自然度排序，可逐个试听 */
function renderVoicePanel() {
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
