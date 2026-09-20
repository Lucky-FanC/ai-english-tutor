/* ============================================================
   KET 单词默写小助手
   每日流程：复习昨日错题 → 学新词(看拼写+听音) → 纯听音默写 → 统一批改
   错题闭环：错词自动入库 → 次日优先复习 → 连对2次自动移出
   阶段测试：周测 / 月测 / 自定义区间测（统一批改+正确率）
   动态难度：0-6月 20%进阶 → 6-12月渐变 → 80%进阶
   ============================================================ */
(function () {
'use strict';

/* ---------------- 基础工具 ---------------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const store = {
  get(k, d) { try { const v = localStorage.getItem('ket.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('ket.' + k, JSON.stringify(v)); } catch (e) {} }
};
const pad = n => String(n).padStart(2, '0');
const todayStr = (d) => { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const norm = s => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------------- 词库 ---------------- */
const WORDS = (window.KET || []).map(a => ({ w: a[0], p: a[1], zh: a[2], lv: a[3], t: a[4] }));

/* ---------------- 持久化状态 ---------------- */
let cfg = store.get('cfg', null);
if (!cfg) {
  cfg = { daily: 8, mmKey: '', start: todayStr(), slow: true };
  /* 自动继承 English Around You 里已配置好的 MiniMax Key（同源 GitHub Pages） */
  try {
    const eay = JSON.parse(localStorage.getItem('eay2.set') || 'null');
    if (eay && eay.mmKey) cfg.mmKey = eay.mmKey;
  } catch (e) {}
  store.set('cfg', cfg);
}
let learned = store.get('learned', {});   // word -> {d:'YYYY-MM-DD'} 首次学习日期（永久）
let wrongBk = store.get('wrong', {});     // word -> {c:累计错次, ok:连续对次, last:'YYYY-MM-DD'} 高频复习队列
let doneMap = store.get('done', {});      // 'YYYY-MM-DD' -> {rev:bool, new:n}
let logArr = store.get('log', []);        // [{d, type, total, right}] 永久记录
const saveCfg = () => store.set('cfg', cfg);
const saveLearned = () => store.set('learned', learned);
const saveWrong = () => store.set('wrong', wrongBk);
const saveDone = () => store.set('done', doneMap);
const saveLog = () => store.set('log', logArr);

/* ---------------- 发音：MiniMax 真人英音 → 百度兜底 ---------------- */
let speakGen = 0, curAudio = null, mmStatus = '';
const MM_CANDIDATES = [
  { model: 'speech-02-turbo', voice_id: 'English_Graceful_Lady' },
  { model: 'speech-02-turbo', voice_id: 'English_Stable_Man' },
  { model: 'speech-02-hd', voice_id: 'English_Graceful_Lady' }
];
function speakMM(word, gen, ci, key) {
  const c = MM_CANDIDATES[ci || 0];
  if (!c) { speakLocal(word, gen); return; }
  fetch('https://api.minimaxi.com/v1/t2a_v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
    body: JSON.stringify({
      model: c.model, text: word, stream: false,
      voice_setting: { voice_id: c.voice_id, speed: cfg.slow ? 0.7 : 0.95, vol: 1, pitch: 0 },
      audio_setting: { sample_rate: 32000, bitrate: 128000, format: 'mp3', channel: 1 }
    })
  }).then(r => r.json()).then(j => {
    if (gen !== speakGen) return;
    const hex = j && j.data && j.data.audio;
    if (!hex) { mmStatus = 'fail:' + ((j && j.base_resp && j.base_resp.status_msg) || '未知错误'); throw new Error('mm'); }
    mmStatus = 'ok';
    const bin = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bin.length; i++) bin[i] = parseInt(hex.substr(i * 2, 2), 16);
    const url = URL.createObjectURL(new Blob([bin], { type: 'audio/mpeg' }));
    const a = new Audio(url); curAudio = a;
    a.addEventListener('ended', () => URL.revokeObjectURL(url));
    a.addEventListener('error', () => { URL.revokeObjectURL(url); if (gen === speakGen) speakBaidu(word, gen); });
    a.play().catch(() => { if (gen === speakGen) speakBaidu(word, gen); });
  }).catch(() => { if (gen !== speakGen) return; speakMM(word, gen, (ci || 0) + 1, key); });
}

/* 从 English Around You 实时继承 MiniMax Key：同源 localStorage，
   场景英语里更新 Key 后这里自动生效，不需要手动同步 */
function eayKey() {
  try {
    const eay = JSON.parse(localStorage.getItem('eay2.set') || 'null');
    return (eay && eay.mmKey) || '';
  } catch (e) { return ''; }
}
function effKey() { return cfg.mmKey || eayKey(); }

/* 无 Key 兜底：优先浏览器本地语音（Safari/Chrome 可用，微信内置浏览器没有），再退百度在线 TTS */
function speakLocal(word, gen) {
  if ('speechSynthesis' in window) {
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-GB';
      u.rate = cfg.slow ? 0.8 : 1;
      speechSynthesis.speak(u);
      return;
    } catch (e) {}
  }
  speakBaidu(word, gen);
}
function speakBaidu(word, gen) {
  const a = new Audio('https://fanyi.baidu.com/gettts?lan=en&spd=' + (cfg.slow ? 3 : 5) + '&text=' + encodeURIComponent(word));
  curAudio = a;
  a.addEventListener('error', () => { if (gen === speakGen) toast('发音加载失败：请联网，或在「设置」里填写真人发音 Key'); });
  a.play().catch(() => { if (gen === speakGen) toast('发音失败：请检查网络，或在「设置」里配置真人发音 Key'); });
}
function say(word) {
  speakGen++;
  const key = effKey();
  if (key) speakMM(word, speakGen, 0, key);
  else speakLocal(word, speakGen);
}

/* ---------------- 动态难度配比 ---------------- */
function hardRatio() {
  const days = Math.max(0, (new Date(todayStr()) - new Date(cfg.start)) / 86400000);
  if (days <= 180) return 0.2;
  if (days >= 360) return 0.8;
  return 0.2 + 0.6 * (days - 180) / 180;
}

/* ---------------- 选词 ---------------- */
function pickNew(n) {
  const pool = WORDS.filter(x => !learned[x.w]);
  const easy = shuffle(pool.filter(x => x.lv === 1));
  const hard = shuffle(pool.filter(x => x.lv === 2));
  const nh = Math.min(hard.length, Math.round(n * hardRatio()));
  const ne = Math.min(easy.length, n - nh);
  return shuffle(easy.slice(0, ne).concat(hard.slice(0, nh)));
}
function pickReview() {
  /* 昨日错的优先，其余按最早未复习排序，封顶 12 */
  const y = todayStr(new Date(Date.now() - 86400000));
  return Object.keys(wrongBk).sort((a, b) => {
    const ay = wrongBk[a].last === y, by = wrongBk[b].last === y;
    if (ay !== by) return ay ? -1 : 1;
    return String(wrongBk[a].last || '').localeCompare(String(wrongBk[b].last || ''));
  }).slice(0, 12);
}

/* ---------------- 错题簿操作 ---------------- */
function addWrong(w) {
  const r = wrongBk[w] || { c: 0, ok: 0, last: '' };
  r.c++; r.ok = 0; r.last = todayStr();
  wrongBk[w] = r;
}
function bumpOk(w) {
  const r = wrongBk[w];
  if (!r) return false;
  r.ok++; r.last = todayStr();
  if (r.ok >= 2) { delete wrongBk[w]; saveWrong(); return true; } /* 连对2次移出高频队列 */
  saveWrong();
  return false;
}

/* ---------------- 视图路由 ---------------- */
const appEl = document.getElementById('app');
let view = { name: 'home' };
function go(v) { view = v; render(); window.scrollTo(0, 0); }
function render() {
  const r = {
    home: renderHome, learn: renderLearn, dict: renderDict, result: renderResult,
    wrong: renderWrong, test: renderTest, report: renderReport, set: renderSet,
    review: renderReview, words: renderWords
  }[view.name];
  appEl.innerHTML = r ? r() : '';
  afterRender();
}

function headerBack(title, back) {
  return '<div class="dict-head"><button class="back" onclick="' + (back || 'KET.goHome()') + '">‹</button><div class="dict-title">' + esc(title) + '</div></div>';
}
function wordObj(w) { return WORDS.find(x => x.w === w) || { w: w, p: '', zh: '', lv: 1, t: '' }; }

/* ---------------- 首页 ---------------- */
function streakDays() {
  let n = 0;
  let d = new Date();
  if (!doneMap[todayStr(d)] && !logArr.some(l => l.d === todayStr(d))) d = new Date(Date.now() - 86400000);
  for (;;) {
    const k = todayStr(d);
    if (doneMap[k] || logArr.some(l => l.d === k)) { n++; d = new Date(d.getTime() - 86400000); }
    else break;
  }
  return n;
}
function renderHome() {
  const t = todayStr();
  const d0 = doneMap[t] || {};
  const wrongN = Object.keys(wrongBk).length;
  const learnedN = Object.keys(learned).length;
  const revList = (!d0.rev) ? pickReview() : [];
  const newLeft = Math.max(0, Math.min(cfg.daily, WORDS.length - learnedN) - (d0.new || 0));
  const pending = store.get('session', null);
  let hero;
  if (pending && pending.words && pending.words.length && pending.idx < pending.words.length) {
    hero = '<div class="hero"><div class="h1">✏️ 上次默写到一半</div><div class="sub">' + esc(pending.title) + ' · 第 ' + (pending.idx + 1) + '/' + pending.words.length + ' 个，接着来！</div>' +
      '<button class="btn" onclick="KET.resumeSession()">继续默写 ›</button></div>';
  } else if (revList.length) {
    hero = '<div class="hero"><div class="h1">先复习错题</div><div class="sub">昨天错了 ' + revList.length + ' 个单词，先复习再学新词，记得更牢！</div>' +
      '<button class="btn" onclick="KET.startToday()">开始今日学习 ›</button></div>';
  } else if (newLeft > 0) {
    hero = '<div class="hero"><div class="h1">今日新词</div><div class="sub">今天还有 ' + newLeft + ' 个新单词等着宝贝，约 ' + Math.ceil(newLeft * 1.5) + ' 分钟</div>' +
      '<button class="btn" onclick="KET.startToday()">开始今日学习 ›</button></div>';
  } else if (learnedN >= WORDS.length && !wrongN) {
    hero = '<div class="hero done"><div class="h1">🎉 全部学完啦！</div><div class="sub">' + WORDS.length + ' 个 KET 核心词全部掌握，太棒了！</div></div>';
  } else {
    hero = '<div class="hero done"><div class="h1">今日任务完成 ✓</div><div class="sub">可以去错题库巩固，或者做一次阶段测试</div></div>';
  }
  return '' +
    '<div class="home-head"><div class="home-title">📝 KET 单词默写</div><div class="spacer"></div>' +
    '<button class="gear" onclick="KET.goSet()">⚙️</button></div>' +
    hero +
    '<div class="stat-row">' +
    '<div class="stat" style="cursor:pointer" onclick="KET.goWords()"><div class="num">' + learnedN + '</div><div class="lbl">已学单词 ›</div></div>' +
    '<div class="stat" style="cursor:pointer" onclick="KET.goWrong()"><div class="num">' + wrongN + '</div><div class="lbl">待巩固 ›</div></div>' +
    '<div class="stat"><div class="num">' + streakDays() + '</div><div class="lbl">连续学习</div></div>' +
    '</div>' +
    '<div class="menu-item" onclick="KET.goWrong()"><div class="ico">📒</div><div><div class="t">错题库</div><div class="s">专项刷错词，连对 2 次自动移出</div></div><div class="spacer"></div>' +
    (wrongN ? '<div class="badge">' + wrongN + '</div>' : '') + '</div>' +
    '<div class="menu-item" onclick="KET.goReview()"><div class="ico">🔁</div><div><div class="t">单词复习</div><div class="s">今日 / 昨日 / 最近7天 / 随机抽查</div></div><div class="spacer"></div><div class="muted">›</div></div>' +
    '<div class="menu-item" onclick="KET.goTest()"><div class="ico">🎯</div><div><div class="t">阶段测试</div><div class="s">周测 · 月测 · 自定义区间测</div></div><div class="spacer"></div><div class="muted">›</div></div>' +
    '<div class="menu-item" onclick="KET.goReport()"><div class="ico">📊</div><div><div class="t">学习报告</div><div class="s">进度、正确率、历史记录</div></div><div class="spacer"></div><div class="muted">›</div></div>';
}

/* ---------------- 每日学习流程 ---------------- */
function startToday() {
  const t = todayStr();
  const d0 = doneMap[t] || {};
  if (!d0.rev) {
    const rev = pickReview();
    if (rev.length) {
      startDict({
        title: '复习昨日错题', type: 'review',
        words: rev.map(wordObj),
        after: () => {
          const dm = doneMap[t] || {}; dm.rev = true; doneMap[t] = dm; saveDone();
          startNewFlow();
        }
      });
      return;
    }
    const dm = doneMap[t] || {}; dm.rev = true; doneMap[t] = dm; saveDone();
  }
  startNewFlow();
}
function startNewFlow() {
  const t = todayStr();
  const d0 = doneMap[t] || {};
  const learnedN = Object.keys(learned).length;
  const left = Math.min(cfg.daily, WORDS.length) - (d0.new || 0);
  if (left <= 0 || learnedN >= WORDS.length) { toast('今日新词任务已完成啦'); go({ name: 'home' }); return; }
  const words = pickNew(left);
  if (!words.length) { toast('词库全部学完了，去测试一下吧'); go({ name: 'home' }); return; }
  go({ name: 'learn', words: words, idx: 0, onDone: () => {
    words.forEach(x => { if (!learned[x.w]) learned[x.w] = { d: t }; });
    saveLearned();
    const dm = doneMap[t] || {}; dm.new = (dm.new || 0) + words.length; doneMap[t] = dm; saveDone();
    startDict({ title: '默写今日新词', type: 'new', words: words, after: () => go({ name: 'home' }) });
  } });
}

/* ---------------- 学新词（看拼写 + 听音） ---------------- */
function renderLearn() {
  const x = view.words[view.idx];
  const last = view.idx === view.words.length - 1;
  const keyWarn = effKey() ? '' : '<div class="key-warn">⚠️ 真人发音 Key 未配置：到「设置」页填入（和场景英语是同一个 Key）</div>';
  const dots = view.words.map((_, i) => '<div class="dot' + (i === view.idx ? ' cur' : '') + '"></div>').join('');
  return headerBack((view.title || '学新词') + ' ' + (view.idx + 1) + '/' + view.words.length) +
    '<div class="card learn-word">' +
    '<div class="w">' + esc(x.w) + '</div>' +
    '<div class="zh">' + esc(x.zh) + '</div>' +
    '<div class="p">' + esc(x.p) + (x.lv === 2 ? ' · 进阶' : '') + '</div>' +
    '<button class="play-big" onclick="KET.say(\'' + esc(x.w).replace(/'/g, "\\'") + '\')">🔊</button>' +
    keyWarn +
    '<div class="muted">先听一听，跟着读两遍，记住怎么拼</div>' +
    '</div>' +
    '<div class="dots">' + dots + '</div>' +
    '<button class="btn" onclick="KET.learnNext()">' + (last ? '都记住了，开始默写 ✏️' : '下一个 ›') + '</button>';
}
function learnNext() {
  say(view.words[view.idx].w); /* 翻页前再播一次，加深印象 */
  if (view.idx >= view.words.length - 1) { view.onDone(); return; }
  view.idx++; render();
}

/* ---------------- 纯听音默写 ---------------- */
function renderDict() {
  const list = view.words;
  const cur = list[view.idx];
  const dots = list.map((_, i) => {
    let cls = 'dot';
    if (i === view.idx) cls += ' cur';
    else if (view.answers[i] != null) cls += norm(view.answers[i]) === norm(list[i].w) ? ' ok' : ' bad';
    return '<div class="' + cls + '"></div>';
  }).join('');
  const val = view.answers[view.idx] != null ? esc(view.answers[view.idx]) : '';
  const last = view.idx === list.length - 1;
  const keyWarn = effKey() ? '' : '<div class="key-warn">⚠️ 真人发音 Key 未配置：到「设置」页填入（和场景英语是同一个 Key）</div>';
  return headerBack(view.title + ' · ' + (view.idx + 1) + '/' + list.length, 'KET.quitDict()') +
    '<div class="card dict-card">' +
    '<button class="play-big" onclick="KET.say(\'' + esc(cur.w).replace(/'/g, "\\'") + '\')">🔊</button>' +
    keyWarn +
    '<div class="dict-hint">听发音，写出这个单词（可重复听）</div>' +
    '<input id="dinput" class="dict-input" value="' + val + '" placeholder="拼写单词…" ' +
    'autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ' +
    'onkeydown="if(event.key===\'Enter\')KET.dictNext()">' +
    '<button class="slow-toggle' + (cfg.slow ? ' on' : '') + '" onclick="KET.toggleSlow()">🐢 慢速发音</button>' +
    '</div>' +
    '<div class="dots">' + dots + '</div>' +
    '<button class="btn" onclick="KET.dictNext()">' + (last ? '完成，统一批改 ✔' : '下一个 ›') + '</button>';
}
function afterRender() {
  if (view.name === 'dict') {
    const inp = document.getElementById('dinput');
    if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    /* 每换到下一个单词自动朗读，无需手动点喇叭；想再听点喇叭即可 */
    if (view.words && view.words[view.idx]) say(view.words[view.idx].w);
  }
}
function startDict(opts) {
  go(Object.assign({ name: 'dict', answers: {}, idx: 0 }, opts));
  persistDict();
}
/* 断点保存：默写过程中（含切后台/关页面）随时存进度，回来自动接上 */
function persistDict() {
  if (!view || view.name !== 'dict') return;
  const inp = document.getElementById('dinput');
  if (inp && inp.value !== '') view.answers[view.idx] = inp.value;
  store.set('session', { title: view.title, type: view.type, words: view.words, idx: view.idx, answers: view.answers });
}
function quitDict() { persistDict(); go({ name: 'home' }); }
function resumeSession() {
  const s = store.get('session', null);
  if (!s || !s.words || !s.words.length) { toast('没有未完成的默写'); return; }
  const backs = { wrong: () => go({ name: 'wrong' }), test: () => go({ name: 'test' }), new: () => go({ name: 'home' }), review: () => go({ name: 'home' }) };
  const after = (backs[s.type] || backs.new);
  view.after = null;
  go({ name: 'dict', title: s.title, type: s.type, words: s.words, idx: Math.min(s.idx, s.words.length - 1), answers: s.answers || {}, after: after });
}
function dictNext() {
  const inp = document.getElementById('dinput');
  view.answers[view.idx] = inp ? inp.value : '';
  persistDict();
  if (view.idx >= view.words.length - 1) { finishDict(); return; }
  view.idx++; render();
}
function finishDict() {
  store.set('session', null);
  const t = todayStr();
  const list = view.words;
  const results = list.map((x, i) => ({ w: x.w, p: x.p, zh: x.zh, ok: norm(view.answers[i]) === norm(x.w), ans: view.answers[i] || '' }));
  const right = results.filter(r => r.ok).length;
  const graduated = [];
  results.forEach(r => {
    if (r.ok) { if (bumpOk(r.w)) graduated.push(r.w); }
    else addWrong(r.w);
  });
  saveWrong();
  logArr.push({ d: t, type: view.type, total: list.length, right: right });
  saveLog();
  const after = view.after;
  go({ name: 'result', results: results, right: right, type: view.type, graduated: graduated, after: after });
}

/* ---------------- 批改结果 ---------------- */
function praise(pct) {
  if (pct === 100) return '完美！全部正确！🎉';
  if (pct >= 80) return '非常棒，继续加油！💪';
  if (pct >= 60) return '不错哦，错题已加入复习！🌟';
  return '没关系，错题明天继续复习！🐢';
}
function renderResult() {
  const total = view.results.length;
  const pct = Math.round(view.right / total * 100);
  const typeName = { new: '新词默写', review: '错题复习', wrong: '错题练习', test: '阶段测试' }[view.type] || '默写';
  const rows = view.results.map(r =>
    '<div class="result-item">' +
    '<div class="mark">' + (r.ok ? '✅' : '❌') + '</div>' +
    '<div class="body">' +
    '<div class="w' + (r.ok ? '' : ' bad') + '">' + esc(r.w) + ' <span class="muted">' + esc(r.p) + ' ' + esc(r.zh) + '</span></div>' +
    (r.ok ? '' : '<div class="ans">你的答案：' + (esc(r.ans) || '（空）') + '</div>') +
    '</div>' +
    '<button class="play-mini" onclick="KET.say(\'' + esc(r.w).replace(/'/g, "\\'") + '\')">🔊</button>' +
    '</div>').join('');
  return headerBack('批改结果') +
    '<div class="card" style="text-align:center">' +
    '<div class="score-ring" style="--pct:' + pct + '"><div class="inner"><div class="pct">' + pct + '%</div><div class="txt">正确率</div></div></div>' +
    '<div style="font-weight:800;margin-top:10px">' + typeName + ' · 对 ' + view.right + ' / ' + total + '</div>' +
    '<div class="muted">' + praise(pct) + '</div>' +
    (view.graduated.length ? '<div style="margin-top:8px;color:var(--green);font-weight:700">🎓 移出错题库：' + esc(view.graduated.join('、')) + '</div>' : '') +
    (view.type === 'new' ? '<div class="muted" style="margin-top:6px">❌ 的单词已自动加入错题库，明天优先复习</div>' : '') +
    '</div>' +
    '<div class="card"><div class="result-list">' + rows + '</div></div>' +
    '<div class="result-actions">' +
    '<button class="btn secondary" onclick="KET.goHome()">返回首页</button>' +
    (view.after ? '<button class="btn" onclick="KET.resultNext()">继续 ›</button>' : '<button class="btn" onclick="KET.redoDict()">🔁 再练一遍</button>') +
    '</div>';
}
function resultNext() { const f = view.after; view.after = null; if (f) f(); }
/* 批改后立刻再练一遍同样的词（走复习逻辑，答错照常进错题库） */
function redoDict() {
  const words = view.results.map(r => ({ w: r.w, p: r.p, zh: r.zh, lv: 1, t: '' }));
  startDict({ title: '复习 · 再练一遍', type: 'review', words: words, after: () => go({ name: 'home' }) });
}

/* ---------------- 错题库 ---------------- */
/* ---------------- 已学单词列表（点词听音 + 搜索） ---------------- */
function filterRows(q) {
  q = (q || '').toLowerCase();
  document.querySelectorAll('.wrow').forEach(r => {
    r.style.display = (r.getAttribute('data-w') || '').indexOf(q) > -1 ? '' : 'none';
  });
}
function renderWords() {
  const ks = Object.keys(learned).sort((a, b) => String(learned[b].d).localeCompare(String(learned[a].d)) || a.localeCompare(b));
  const rows = ks.map(w => {
    const o = wordObj(w);
    return '<div class="wrow" data-w="' + esc((w + ' ' + o.zh).toLowerCase()) + '" onclick="KET.say(\'' + esc(w).replace(/'/g, "\\'") + '\')">' +
      '<div class="ww">' + esc(w) + '</div>' +
      '<div class="wp">' + esc(o.p) + '</div>' +
      '<div class="wz">' + esc(o.zh) + '</div>' +
      '<div class="wd">' + esc(String(learned[w].d || '').slice(5)) + '</div>' +
      '<div class="ws">🔊</div>' +
      '</div>';
  }).join('');
  return headerBack('已学单词') +
    '<input class="set-input" placeholder="🔍 输入字母或中文搜索…" oninput="KET.filterRows(this.value)">' +
    '<div class="muted" style="margin:8px 2px 10px">共 ' + ks.length + ' 词 · 点任意单词听发音，最近学的排前面</div>' +
    (rows || '<div class="muted" style="text-align:center;padding:30px 0">还没有学过的单词</div>');
}

function renderWrong() {
  const keys = Object.keys(wrongBk).sort((a, b) => String(wrongBk[b].last).localeCompare(String(wrongBk[a].last)));
  const rows = keys.map(w => {
    const x = wordObj(w), r = wrongBk[w];
    return '<div class="wrong-item">' +
      '<button class="play-mini" onclick="KET.say(\'' + esc(w).replace(/'/g, "\\'") + '\')">🔊</button>' +
      '<div style="flex:1;min-width:0"><div class="w">' + esc(x.w) + ' <span class="muted">' + esc(x.p) + ' ' + esc(x.zh) + '</span></div>' +
      '<div class="m">错 ' + r.c + ' 次' + (r.ok ? ' · 已对 ' + r.ok + '/2 次' : '') + ' · ' + esc(r.last || '') + '</div></div>' +
      (r.ok ? '<div class="oktag">再对' + (2 - r.ok) + '次毕业</div>' : '') +
      '</div>';
  }).join('');
  return headerBack('错题库') +
    (keys.length
      ? '<div class="card">' + rows + '</div><div class="muted" style="text-align:center;margin-bottom:12px">每次最多练 12 个：先逐个看词听音学习，再整体默写，连对 2 次自动移出</div>' +
        '<button class="btn" onclick="KET.startWrongDrill()">开始学习：先看词听音，再默写 ✏️</button>'
      : '<div class="card" style="text-align:center;padding:48px 20px"><div style="font-size:3rem">🎉</div><div style="font-weight:800;margin-top:10px">错题库空空如也</div><div class="muted" style="margin-top:6px">继续保持，宝贝真棒！</div></div>');
}
function delWrong(w) { delete wrongBk[w]; saveWrong(); render(); toast('已移出错题库'); }
function startWrongDrill() {
  const keys = Object.keys(wrongBk).sort((a, b) => String(wrongBk[a].last).localeCompare(String(wrongBk[b].last))).slice(0, 12);
  if (!keys.length) { toast('错题库是空的'); return; }
  const words = keys.map(wordObj);
  go({
    name: 'learn', title: '错题学习', words: words, idx: 0,
    onDone: () => startDict({ title: '错题默写', type: 'wrong', words: words, after: () => go({ name: 'wrong' }) })
  });
}

/* ---------------- 单词复习（自由复习，可反复练） ---------------- */
function startManualReview(kind) {
  const t = todayStr();
  let pool = [];
  if (kind === 'today') pool = Object.keys(learned).filter(w => learned[w].d === t);
  else if (kind === 'yesterday') pool = Object.keys(learned).filter(w => learned[w].d === todayStr(new Date(Date.now() - 86400000)));
  else if (kind === 'week') pool = Object.keys(learned).filter(w => learned[w].d >= todayStr(new Date(Date.now() - 6 * 86400000)));
  else pool = shuffle(Object.keys(learned)).slice(0, 10);
  pool = shuffle(pool).slice(0, 20);
  if (!pool.length) { toast('还没有可复习的单词'); return; }
  const names = { today: '复习 · 今日新词', yesterday: '复习 · 昨日所学', week: '复习 · 最近7天', random: '复习 · 随机抽查' };
  startDict({ title: names[kind] || '复习', type: 'review', words: pool.map(wordObj), after: () => go({ name: 'review' }) });
}
function renderReview() {
  const t = todayStr();
  const y = todayStr(new Date(Date.now() - 86400000));
  const ago7 = todayStr(new Date(Date.now() - 6 * 86400000));
  const ks = Object.keys(learned);
  const cToday = ks.filter(w => learned[w].d === t).length;
  const cY = ks.filter(w => learned[w].d === y).length;
  const c7 = ks.filter(w => learned[w].d >= ago7).length;
  const opt = (kind, ico, t1, s1, n) => n > 0
    ? '<div class="test-opt" onclick="KET.startManualReview(\'' + kind + '\')"><div class="ico">' + ico + '</div><div><div class="t">' + t1 + '</div><div class="s">' + s1 + ' · ' + n + ' 词</div></div></div>'
    : '';
  return headerBack('单词复习') +
    opt('today', '🌞', '今日新词', '今天刚学的，趁热再默写一遍', cToday) +
    opt('yesterday', '📆', '昨日所学', '昨天学过的单词', cY) +
    opt('week', '🗓️', '最近 7 天', '一周内学过的综合巩固', c7) +
    opt('random', '🎲', '随机复习', '从全部已学单词随机抽 10 个', ks.length) +
    '<div class="muted" style="text-align:center;margin-top:8px">复习也是纯听音默写，答错的单词会自动进入错题库</div>';
}

/* ---------------- 阶段测试 ---------------- */
function weekKey(dstr) {
  const d = new Date(dstr + 'T00:00:00');
  const day = (d.getDay() + 6) % 7; /* 周一为一周开始 */
  const mon = new Date(d.getTime() - day * 86400000);
  return todayStr(mon);
}
function testWords(filter) {
  const arr = Object.keys(learned).filter(w => filter(learned[w].d));
  return shuffle(arr).slice(0, 30).map(wordObj);
}
function startTest(type) {
  const t = todayStr();
  let words = [];
  if (type === 'week') words = testWords(d => weekKey(d) === weekKey(t));
  else if (type === 'month') words = testWords(d => d.slice(0, 7) === t.slice(0, 7));
  else {
    const from = (document.getElementById('tfrom') || {}).value;
    const to = (document.getElementById('tto') || {}).value;
    if (!from || !to) { toast('请选择开始和结束日期'); return; }
    words = testWords(d => d >= from && d <= to);
  }
  if (words.length < 3) { toast('该时间段学的单词不够（至少 3 个）'); return; }
  startDict({ title: ({ week: '周测试', month: '月测试', custom: '区间测试' })[type], type: 'test', words: words, after: () => go({ name: 'test' }) });
}
function renderTest() {
  const t = todayStr();
  const wk = testWords(d => weekKey(d) === weekKey(t)).length;
  const mo = testWords(d => d.slice(0, 7) === t.slice(0, 7)).length;
  return headerBack('阶段测试') +
    '<div class="test-opt" onclick="KET.startTest(\'week\')"><div class="ico">📅</div><div><div class="t">周测试</div><div class="s">本周已学 ' + wk + ' 词' + (wk >= 3 ? '，抽 ' + Math.min(wk, 30) + ' 词测试' : '，还不够 3 个') + '</div></div></div>' +
    '<div class="test-opt" onclick="KET.startTest(\'month\')"><div class="ico">🗓️</div><div><div class="t">月测试</div><div class="s">本月已学 ' + mo + ' 词' + (mo >= 3 ? '，抽 ' + Math.min(mo, 30) + ' 词测试' : '，还不够 3 个') + '</div></div></div>' +
    '<div class="card"><div class="t" style="font-weight:800">自定义区间测试</div>' +
    '<div class="date-row"><input type="date" id="tfrom"><span class="muted">至</span><input type="date" id="tto"></div>' +
    '<button class="btn ghost" onclick="KET.startTest(\'custom\')">生成测试卷</button></div>' +
    '<div class="muted" style="text-align:center">测试也是听音默写，全部答完统一批改<br>错题自动并入错题库</div>';
}

/* ---------------- 学习报告 ---------------- */
function renderReport() {
  const learnedN = Object.keys(learned).length;
  const wrongN = Object.keys(wrongBk).length;
  const typeName = { new: '新词', review: '复习', wrong: '错题', test: '测试' };
  const logs = logArr.slice(-20).reverse().map(l => {
    const pct = l.total ? Math.round(l.right / l.total * 100) : 0;
    const cls = pct >= 80 ? 'good' : pct >= 60 ? 'mid' : 'poor';
    return '<div class="log-item"><span class="tag' + (l.type === 'test' ? ' test' : '') + '">' + (typeName[l.type] || l.type) + '</span>' +
      '<span class="muted">' + esc(l.d) + '</span><span class="sc ' + cls + '">' + l.right + '/' + l.total + '</span></div>';
  }).join('');
  return headerBack('学习报告') +
    '<div class="stat-row">' +
    '<div class="stat"><div class="num">' + learnedN + '</div><div class="lbl">已学 / ' + WORDS.length + '</div></div>' +
    '<div class="stat"><div class="num">' + Math.round(learnedN / WORDS.length * 100) + '%</div><div class="lbl">总进度</div></div>' +
    '<div class="stat"><div class="num">' + streakDays() + '</div><div class="lbl">连续天数</div></div>' +
    '</div>' +
    '<div class="card"><div class="t" style="font-weight:800;margin-bottom:6px">最近记录</div>' +
    (logs || '<div class="muted" style="padding:20px 0;text-align:center">还没有学习记录，去完成第一次默写吧！</div>') + '</div>' +
    '<div class="card"><div class="t" style="font-weight:800;margin-bottom:6px">难度说明</div>' +
    '<div class="muted" style="line-height:1.7">当前进阶词占比约 ' + Math.round(hardRatio() * 100) + '%。<br>入门 6 个月内以简单词为主（20% 进阶），之后逐步提升到 80% 进阶，全程自动调节，无需设置。</div></div>';
}

/* ---------------- 设置 ---------------- */
function renderSet() {
  const hasKey = !!effKey();
  const st = !hasKey ? '未配置 Key（会自动继承场景英语的 Key，若刚填写请刷新页面）'
    : !mmStatus ? '还没测试过发音'
    : mmStatus === 'ok' ? '✓ 真人发音已生效'
    : '✗ ' + mmStatus.replace(/^fail:/, '');
  return headerBack('设置') +
    '<div class="card">' +
    '<div class="set-row"><div><div class="t">每日新词量</div><div class="s">严格 5–10 个，不超量</div></div>' +
    '<div class="stepper"><button onclick="KET.stepDaily(-1)">－</button><div class="v">' + cfg.daily + '</div><button onclick="KET.stepDaily(1)">＋</button></div></div>' +
    '<div class="set-row"><div><div class="t">🐢 慢速发音</div><div class="s">放慢语速，更适合小朋友听清</div></div>' +
    '<button class="switch' + (cfg.slow ? ' on' : '') + '" onclick="KET.toggleSlow()"></button></div>' +
    '</div>' +
    '<div class="card">' +
    '<div class="t" style="font-weight:800">真人发音 Key</div>' +
    '<div class="muted" style="margin-top:4px">与「English Around You」共用 MiniMax Key，已自动实时继承，无需重复填写；也可在此单独覆盖</div>' +
    '<input id="mmkey" class="set-input" placeholder="留空则自动使用场景英语里配置的 Key" value="' + esc(cfg.mmKey) + '">' +
    '<div class="row" style="margin-top:10px"><button class="btn small secondary" onclick="KET.saveKey()">保存 Key</button><div class="muted">' + esc(st) + '</div></div>' +
    '<button class="btn small ghost" style="margin-top:10px" onclick="KET.testVoice()">🔊 测试发音（apple）</button>' +
    '</div>' +
    '<div class="card">' +
    '<div class="t" style="font-weight:800">数据</div>' +
    '<div class="muted" style="margin:6px 0 10px">所有学习记录保存在本设备浏览器中，不会丢失</div>' +
    '<button class="danger" onclick="KET.resetAll()">清空全部学习数据</button>' +
    '</div>' +
    '<div class="muted" style="text-align:center">KET 单词默写小助手 · 剑桥 A2 核心词库 ' + WORDS.length + ' 词</div>';
}
function stepDaily(d) {
  cfg.daily = Math.max(5, Math.min(10, cfg.daily + d));
  saveCfg(); render();
}
function toggleSlow() { cfg.slow = !cfg.slow; saveCfg(); render(); }
function saveKey() {
  const v = (document.getElementById('mmkey') || {}).value || '';
  cfg.mmKey = v.trim(); saveCfg(); mmStatus = '';
  toast('已保存'); render();
}
function testVoice() {
  const v = (document.getElementById('mmkey') || {}).value || '';
  if (v.trim()) { cfg.mmKey = v.trim(); saveCfg(); }
  say('apple');
  setTimeout(render, 1200);
}
function resetAll() {
  if (!confirm('确定要清空全部学习数据吗？此操作不可恢复。')) return;
  if (!confirm('再确认一次：所有已学记录、错题库、测试记录都会被删除！')) return;
  ['cfg', 'learned', 'wrong', 'done', 'log'].forEach(k => localStorage.removeItem('ket.' + k));
  location.reload();
}

/* ---------------- 启动 ---------------- */
window.KET = {
  say: say, goHome: () => go({ name: 'home' }),
  goWrong: () => go({ name: 'wrong' }), goTest: () => go({ name: 'test' }),
  goReport: () => go({ name: 'report' }), goSet: () => go({ name: 'set' }),
  goReview: () => go({ name: 'review' }),
  goWords: () => go({ name: 'words' }), filterRows: filterRows,
  startToday: startToday, learnNext: learnNext, dictNext: dictNext,
  resultNext: resultNext, delWrong: delWrong, startWrongDrill: startWrongDrill,
  startTest: startTest, stepDaily: stepDaily, toggleSlow: toggleSlow,
  saveKey: saveKey, testVoice: testVoice, resetAll: resetAll,
  quitDict: quitDict, resumeSession: resumeSession, redoDict: redoDict,
  startManualReview: startManualReview,
  _v: () => view, _s: () => ({ cfg: cfg, learned: learned, wrong: wrongBk, done: doneMap, log: logArr, session: store.get('session', null) })
};

render();
window.addEventListener('pagehide', persistDict); /* 切后台/关页面时保存默写进度 */
if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
})();
