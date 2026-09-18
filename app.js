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
  set: Object.assign({ rate: 1, accent: 'us' }, store.get('set', {})),
};

const totalSents = SCENARIOS.reduce((n, s) => n + s.sents.length, 0);

/* ---------- 语音朗读 ---------- */
let voices = [];
function loadVoices() { voices = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().indexOf('en') === 0); }
if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

function pickVoice() {
  if (!voices.length) return null;
  const want = state.set.accent === 'gb' ? ['en-gb', 'en_gb'] : ['en-us', 'en_us'];
  const score = v => {
    const l = v.lang.toLowerCase().replace('_', '-');
    let s = 0;
    if (want.some(w => l.indexOf(w.slice(0, 5)) === 0)) s += 10;
    if (/google/i.test(v.name)) s += 4;
    if (/natural|neural|aria|samantha|zira|allison|ava|susan/i.test(v.name)) s += 3;
    if (/compact|espeak/i.test(v.name)) s -= 5;
    return s;
  };
  return voices.slice().sort((a, b) => score(b) - score(a))[0];
}

let speakingCard = null;
function stopSpeak() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (speakingCard) { speakingCard.classList.remove('speaking'); const d = speakingCard.querySelector('.s-hint'); if (d) d.remove(); speakingCard = null; }
}

function speak(text, card) {
  if (!('speechSynthesis' in window)) { alert('抱歉，你的浏览器不支持语音朗读，请用 Safari 或 Chrome 打开。'); return; }
  // 再点同一句 = 停止
  if (speakingCard === card) { stopSpeak(); return; }
  stopSpeak();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  if (v) u.voice = v;
  u.lang = v ? v.lang : (state.set.accent === 'gb' ? 'en-GB' : 'en-US');
  u.rate = state.set.rate;
  u.pitch = 1;
  if (card) {
    card.classList.add('speaking');
    const hint = el('div', 's-hint');
    hint.appendChild(el('span', 'dot'));
    hint.appendChild(el('span', null, '朗读中，再点一次停止'));
    card.appendChild(hint);
    card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    speakingCard = card;
    u.onend = u.onerror = () => { if (speakingCard === card) { card.classList.remove('speaking'); const d = card.querySelector('.s-hint'); if (d) d.remove(); speakingCard = null; } };
  }
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
  card.appendChild(el('div', 's-en', en));
  card.appendChild(el('div', 's-zh', zh));
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
    info.appendChild(el('div', 'scn-n', s.sents.length + ' 句'));
    card.appendChild(info);
    card.addEventListener('click', () => { state.detail = s.id; render(); });
    grid.appendChild(card);
  });
  main.appendChild(grid);
  main.appendChild(el('div', 'count-note', '共 ' + totalSents + ' 句 · 点击句子即可朗读'));
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
  t.appendChild(el('div', 'detail-en', scn.en + ' · ' + scn.sents.length + ' 句'));
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

function renderSet() {
  main.textContent = '';
  main.appendChild(el('div', 'sec-title', '⚙️ 设置'));

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
  about.appendChild(el('div', null, 'English Around You 场景句库：' + SCENARIOS.length + ' 个场景 · ' + totalSents + ' 句地道表达。'));
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
