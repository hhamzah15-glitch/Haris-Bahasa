/* Haris Bahasa – Malay Ninja Academy (IGCSE Malay as a Foreign Language 0546)
   No dependencies. Progress is saved in the browser (localStorage) on the device being used. */
(function () {
'use strict';
const D = window.BAHASA_DATA;
const app = document.getElementById('app');
const fbEl = document.getElementById('feedback');
const KEY = 'harisBahasa.v1';

/* ───────────────────────── helpers ───────────────────────── */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rnd = n => Math.floor(Math.random() * n);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pad = n => String(n).padStart(2, '0');
const ymd = (d = new Date()) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const dayNum = s => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
const norm = s => s.toLowerCase().replace(/[.,!?¡¿"'’]/g, '').replace(/\s+/g, ' ').trim();

/* ───────────────────────── word bank ───────────────────────── */
const SP = window.BAHASA_SPECIAL || [];   // special missions (Misi Khas)
const MORE = window.BAHASA_MORE || {};    // extra grammar questions
const SH = window.BAHASA_SHOP;            // wardrobe & abilities
const WORDS = {};          // ms(lowercase) -> entry
const UNIT = {};           // id -> unit
[...D.units, ...SP].forEach(u => {
  UNIT[u.id] = u;
  u.entries = u.words.map(w => {
    const e = { ms: w[0], en: w[1], em: w[2] || '', unit: u.id, world: u.world };
    WORDS[e.ms.toLowerCase()] = e;
    return e;
  });
});
const unitsOf = wid => D.units.filter(u => u.world === wid);
const wordsOfWorld = wid => unitsOf(wid).flatMap(u => u.entries);
const specialsOf = wid => SP.filter(u => u.world === wid);
const allWordsOfWorld = wid => wordsOfWorld(wid).concat(specialsOf(wid).flatMap(u => u.entries));
const specialUnlocked = u => { const l = specialsOf(u.world); const i = l.indexOf(u); return !!state.bosses[u.world] && (i === 0 || unitStars(l[i - 1].id) >= 1); };

/* ───────────────────────── state ───────────────────────── */
const SHOP = {
  themes: [
    { id: 'api', name: 'Api (Fire)', cost: 0, c: '#ff7a00' }, { id: 'air', name: 'Air (Water)', cost: 150, c: '#2fb4ff' },
    { id: 'angin', name: 'Angin (Wind)', cost: 200, c: '#3ddc84' }, { id: 'petir', name: 'Petir (Lightning)', cost: 250, c: '#ffd23f' },
    { id: 'bumi', name: 'Bumi (Earth)', cost: 300, c: '#e0a040' }, { id: 'bayang', name: 'Bayang (Shadow)', cost: 400, c: '#9b5cff' }
  ],
  avatars: [
    { id: '🥷', cost: 0 }, { id: '🦊', cost: 120 }, { id: '🐸', cost: 120 }, { id: '🦅', cost: 150 },
    { id: '🐍', cost: 200 }, { id: '🐺', cost: 250 }, { id: '🌀', cost: 300 }, { id: '🐉', cost: 500 }
  ],
  titles: [
    { id: 'Ninja Baru', cost: 0 }, { id: 'Ninja Kosa Kata', cost: 100 }, { id: 'Pemburu Tatabahasa', cost: 150 },
    { id: 'Bintang Desa', cost: 200 }, { id: 'Pahlawan Bahasa', cost: 350 }, { id: 'Legenda Bahasa', cost: 600 }
  ],
  powers: [
    { id: 'hint', ic: '🔍', name: 'Gulungan Petunjuk', desc: 'Removes 2 wrong answers in one question', cost: 30 },
    { id: 'freeze', ic: '🧊', name: 'Pembeku Streak', desc: 'Saves your streak if you miss one day (used automatically)', cost: 80 },
    { id: 'double', ic: '✨', name: 'Double XP', desc: 'Double XP for your next mission', cost: 100 }
  ]
};

function defaults() {
  return {
    v: 1, name: 'Haris', avatar: '🥷', title: 'Ninja Baru', theme: 'api', welcomed: false,
    xp: 0, ryo: 0, earned: 0, streak: 0, best: 0, last: '', sessions: 0, reviews: 0, armed: false,
    words: {}, units: {}, scrolls: {}, bosses: {}, badges: {}, log: {},
    own: { themes: ['api'], avatars: ['🥷'], titles: ['Ninja Baru'], items: [], sets: [], auras: [], abilities: [] }, equip: {}, inv: { hint: 2, freeze: 0, double: 0 },
    daily: { date: '', missions: 0, correct: 0, review: 0, paid: {} }, flags: {},
    real: [], claims: [], pin: '0000',
    settings: { sound: true, speech: true, rate: 0.85 }
  };
}
let state = defaults();
try {
  const raw = localStorage.getItem(KEY);
  if (raw) state = Object.assign(defaults(), JSON.parse(raw));
} catch (e) { /* storage blocked – run in memory */ }
state.own = Object.assign({ themes: ['api'], avatars: ['🥷'], titles: ['Ninja Baru'], items: [], sets: [], auras: [], abilities: [] }, state.own);
state.equip = state.equip || {};
const has = id => state.own.abilities.includes(id);
let saveT = null;
function save() {
  clearTimeout(saveT);
  saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { } }, 150);
}
function rolloverDaily() {
  const t = ymd();
  if (state.daily.date !== t) state.daily = { date: t, missions: 0, correct: 0, review: 0, paid: {} };
}
rolloverDaily();

/* ───────────────────────── sound & speech ───────────────────────── */
let actx = null;
function beep(kind) {
  if (!state.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const seq = { ok: [[660, .09], [880, .14]], no: [[220, .18]], win: [[523, .1], [659, .1], [784, .1], [1047, .25]], burst: [[880, .06], [1175, .06], [1568, .18]], coin: [[1200, .07], [1600, .12]] }[kind] || [];
    let t = actx.currentTime;
    seq.forEach(([f, d]) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = kind === 'no' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(.001, t); g.gain.exponentialRampToValueAtTime(.18, t + .015); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d + .02); t += d * .9;
    });
  } catch (e) { }
}
let voice = null;
function pickVoice() {
  try {
    const vs = speechSynthesis.getVoices();
    voice = vs.find(v => /^ms/i.test(v.lang)) || vs.find(v => /^id/i.test(v.lang)) || null;
  } catch (e) { }
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
const canSpeak = () => state.settings.speech && 'speechSynthesis' in window && !!voice;
function say(text) {
  if (!state.settings.speech || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/_+/g, ' ').replace(/\?$/, ''));
    u.lang = voice ? voice.lang : 'ms-MY'; if (voice) u.voice = voice; u.rate = state.settings.rate;
    speechSynthesis.speak(u);
  } catch (e) { }
}

/* confetti */
const fx = document.getElementById('fx'); const fctx = fx.getContext('2d');
let parts = [], fxRun = false;
function confetti(n = 120) {
  fx.width = innerWidth; fx.height = innerHeight;
  const cols = ['#ff7a00', '#ffd23f', '#3ec6ff', '#3ddc84', '#ff5468', '#c9a6ff'];
  for (let i = 0; i < n; i++) parts.push({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, s: 5 + Math.random() * 7, r: Math.random() * 6, c: cols[rnd(cols.length)], shuri: Math.random() < .25 });
  if (!fxRun) { fxRun = true; requestAnimationFrame(tick); }
}
function tick() {
  fctx.clearRect(0, 0, fx.width, fx.height);
  parts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += .35; p.r += .2;
    fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.r); fctx.fillStyle = p.c;
    if (p.shuri) { fctx.font = p.s * 3 + 'px serif'; fctx.fillText('✦', 0, 0); } else fctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6);
    fctx.restore();
  });
  parts = parts.filter(p => p.y < fx.height + 30);
  if (parts.length) requestAnimationFrame(tick); else { fxRun = false; fctx.clearRect(0, 0, fx.width, fx.height); }
}
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

/* ───────────────────────── progress logic ───────────────────────── */
const INTERVAL = [0, 1, 2, 4, 8, 16];
const wrec = ms => state.words[ms.toLowerCase()] || (state.words[ms.toLowerCase()] = { box: 0, seen: 0, right: 0, wrong: 0, due: '' });
function updateWord(ms, ok) {
  const w = wrec(ms); w.seen++;
  if (ok) { w.right++; w.box = Math.min(5, w.box + 1); } else { w.wrong++; w.box = 1; }
  const due = new Date(); due.setDate(due.getDate() + INTERVAL[w.box]); w.due = ymd(due);
}
const isLearned = ms => (state.words[ms.toLowerCase()] || {}).box >= 3;
const learnedCount = () => Object.values(state.words).filter(w => w.box >= 3).length;
const dueWords = () => { const t = ymd(); return Object.keys(state.words).filter(k => WORDS[k] && state.words[k].box >= 1 && state.words[k].due <= t).map(k => WORDS[k]); };
const totalStars = () => [state.units, state.scrolls, state.bosses].reduce((a, o) => a + Object.values(o).reduce((x, r) => x + (r.stars || 0), 0), 0);
const unitStars = id => (state.units[id] || {}).stars || 0;
const unitUnlocked = u => { const list = unitsOf(u.world); const i = list.indexOf(u); return i === 0 || unitStars(list[i - 1].id) >= 1; };
const worldCleared = wid => unitsOf(wid).every(u => unitStars(u.id) >= 1);
const bossOpen = wid => worldCleared(wid);
function rankInfo() {
  let i = 0; D.ranks.forEach((r, k) => { if (state.xp >= r.xp) i = k; });
  const cur = D.ranks[i], next = D.ranks[i + 1];
  return { i, cur, next, pct: next ? Math.round(100 * (state.xp - cur.xp) / (next.xp - cur.xp)) : 100 };
}
function touchStreak() {
  const t = ymd();
  if (state.last === t) return null;
  let msg = null;
  if (!state.last) state.streak = 1;
  else {
    const gap = dayNum(t) - dayNum(state.last);
    if (gap === 1) state.streak++;
    else if (gap === 2 && state.inv.freeze > 0) { state.inv.freeze--; state.streak++; msg = '🧊 Pembeku Streak saved your streak!'; }
    else state.streak = 1;
  }
  state.last = t; state.best = Math.max(state.best, state.streak);
  return msg;
}
function logToday(ans, cor) {
  const t = ymd(); const l = state.log[t] || (state.log[t] = { a: 0, c: 0, m: 0 });
  l.a += ans; l.c += cor; l.m++;
  const keys = Object.keys(state.log).sort(); while (keys.length > 120) delete state.log[keys.shift()];
}

const BADGES = [
  { id: 'first', ic: '🎯', n: 'Misi Pertama', d: 'Finish your first mission', t: () => state.sessions >= 1 },
  { id: 'perfect', ic: '💯', n: 'Sempurna!', d: 'Finish a mission with no mistakes', t: () => state.flags.perfect },
  { id: 's3', ic: '🔥', n: '3 Hari', d: '3-day streak', t: () => state.best >= 3 },
  { id: 's7', ic: '🌋', n: '7 Hari', d: '7-day streak', t: () => state.best >= 7 },
  { id: 's30', ic: '☄️', n: '30 Hari', d: '30-day streak', t: () => state.best >= 30 },
  { id: 'w25', ic: '📗', n: '25 Perkataan', d: 'Learn 25 words', t: () => learnedCount() >= 25 },
  { id: 'w100', ic: '📘', n: '100 Perkataan', d: 'Learn 100 words', t: () => learnedCount() >= 100 },
  { id: 'w250', ic: '📕', n: '250 Perkataan', d: 'Learn 250 words', t: () => learnedCount() >= 250 },
  { id: 'combo', ic: '⚡', n: 'Chakra Burst', d: '10 correct answers in a row', t: () => state.flags.combo10 },
  { id: 'boss1', ic: '👹', n: 'Pemburu Bos', d: 'Defeat a boss', t: () => Object.keys(state.bosses).length >= 1 },
  { id: 'boss5', ic: '🏯', n: 'Penakluk Desa', d: 'Defeat all 5 village bosses', t: () => 'ABCDE'.split('').every(w => state.bosses[w]) },
  { id: 'g3', ic: '📜', n: 'Murid Tatabahasa', d: 'Clear 3 grammar scrolls', t: () => Object.keys(state.scrolls).length >= 3 },
  { id: 'gall', ic: '🏆', n: 'Sarjana Tatabahasa', d: 'Clear the first quiz of every scroll', t: () => Object.keys(state.scrolls).length >= D.scrolls.length },
  { id: 'gmaster', ic: '🎓', n: 'Raja Tatabahasa', d: 'Clear all 5 quiz rounds of every scroll', t: () => D.scrolls.every(sc => [1, 2, 3, 4, 5].every(r => ((state.scrolls[sc.id] || {}).rounds || {})[r] >= 1)) },
  { id: 'spec1', ic: '✨', n: 'Misi Khas Pertama', d: 'Clear your first special mission', t: () => SP.some(u => unitStars(u.id) >= 1) },
  { id: 'spec5', ic: '🌠', n: 'Pakar Desa', d: 'Clear all 5 special missions of a village', t: () => 'ABCDE'.split('').some(w => specialsOf(w).every(u => unitStars(u.id) >= 1)) },
  { id: 'specall', ic: '🌌', n: 'Guru Kosa Kata', d: 'Clear all 25 special missions', t: () => SP.every(u => unitStars(u.id) >= 1) },
  { id: 'w500', ic: '📚', n: '500 Perkataan', d: 'Learn 500 words', t: () => learnedCount() >= 500 },
  { id: 'dress', ic: '🎭', n: 'Fesyen Ninja', d: 'Wear a full costume set', t: () => Object.keys(state.equip).length >= 3 },
  { id: 'jutsu', ic: '🌀', n: 'Kuasa Rahsia', d: 'Unlock a ninja ability', t: () => state.own.abilities.length >= 1 },
  { id: 'rich', ic: '🪙', n: 'Saudagar', d: 'Earn 500 ryo in total', t: () => state.earned >= 500 },
  { id: 'rev', ic: '🔁', n: 'Raja Ulang Kaji', d: 'Finish 10 review sessions', t: () => state.reviews >= 10 },
  { id: 'star30', ic: '⭐', n: '30 Bintang', d: 'Collect 30 stars', t: () => totalStars() >= 30 },
  { id: 'genin', ic: '🥷', n: 'Genin!', d: 'Reach the rank of Genin', t: () => rankInfo().i >= 1 },
  { id: 'chunin', ic: '🍃', n: 'Chunin!', d: 'Reach the rank of Chunin', t: () => rankInfo().i >= 2 },
  { id: 'jonin', ic: '⚔️', n: 'Jonin!', d: 'Reach the rank of Jonin', t: () => rankInfo().i >= 4 },
  { id: 'kage', ic: '👑', n: 'Kage!', d: 'Reach the top rank', t: () => rankInfo().i >= 6 }
];
function checkBadges() {
  const got = [];
  BADGES.forEach(b => { if (!state.badges[b.id] && b.t()) { state.badges[b.id] = ymd(); got.push(b); } });
  return got;
}

/* ───────────────────────── question builders ───────────────────────── */
function distractors(e, key, n, unitId) {
  const seen = new Set([e[key].toLowerCase()]); const out = [];
  const same = shuffle(UNIT[unitId].entries), world = shuffle(wordsOfWorld(e.world)), all = shuffle(Object.values(WORDS));
  [...same, ...world, ...all].forEach(x => {
    if (out.length < n && !seen.has(x[key].toLowerCase())) { seen.add(x[key].toLowerCase()); out.push(x); }
  });
  return out;
}
function mcq(e, dir) {
  const key = dir === 'en2ms' ? 'ms' : 'en';
  const opts = shuffle([{ t: e[key], ok: true }, ...distractors(e, key, 3, e.unit).map(x => ({ t: x[key], ok: false }))]);
  const q = { kind: 'mcq', wordKey: e.ms, opts, say: e.ms, explain: `<b>${esc(e.ms)}</b> = ${esc(e.en)}` };
  if (dir === 'ms2en') { q.label = 'What does it mean?'; q.prompt = esc(e.ms); q.speakBtn = e.ms; q.auto = true; }
  else if (dir === 'listen') { q.label = 'Listen 🔊 and choose the meaning'; q.prompt = '🔊 ???'; q.speakBtn = e.ms; q.auto = true; q.hideText = true; }
  else if (dir === 'pic') { q.label = 'Which Malay word matches?'; q.prompt = ''; q.big = e.em; q.opts = shuffle([{ t: e.ms, ok: true }, ...distractors(e, 'ms', 3, e.unit).map(x => ({ t: x.ms, ok: false }))]); }
  else { q.label = 'How do you say this in Malay?'; q.prompt = esc(e.en); q.big = e.em; }
  return q;
}
function typeQ(e) {
  return { kind: 'type', wordKey: e.ms, label: 'Type it in Malay', prompt: esc(e.en), big: e.em, answer: e.ms, say: e.ms, explain: `<b>${esc(e.ms)}</b> = ${esc(e.en)}` };
}
function sentOf(unit) { return unit.sents[rnd(unit.sents.length)]; }
function blankQ(unitId, s) {
  const u = UNIT[unitId]; s = s || sentOf(u);
  const key = s[2]; const re = new RegExp('(?<![\\p{L}-])' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}-])', 'iu');
  const shown = s[0].replace(re, '_____');
  const ent = WORDS[key.toLowerCase()];
  const pool = shuffle(u.entries.filter(x => x.ms.toLowerCase() !== key.toLowerCase() && !s[0].toLowerCase().includes(x.ms.toLowerCase())));
  const extra = shuffle(wordsOfWorld(u.world).filter(x => x.ms.toLowerCase() !== key.toLowerCase()));
  const wrong = []; [...pool, ...extra].forEach(x => { if (wrong.length < 3 && !wrong.find(y => y.ms === x.ms)) wrong.push(x); });
  return {
    kind: 'mcq', wordKey: ent.ms, label: 'Fill in the blank', prompt: esc(shown), sub: esc(s[1]),
    opts: shuffle([{ t: ent.ms, ok: true }, ...wrong.map(x => ({ t: x.ms, ok: false }))]), say: s[0], speakBtn: s[0],
    explain: `${esc(s[0])}<br><span class="muted">${esc(s[1])}</span>`
  };
}
function orderQ(unitId, s) {
  const u = UNIT[unitId]; s = s || sentOf(u);
  const toks = s[0].split(' ');
  return { kind: 'order', wordKey: s[2].toLowerCase(), label: 'Build the sentence', prompt: esc(s[1]), tokens: toks, say: s[0], explain: `${esc(s[0])}` };
}
function sentencesOf(u) { return u.sents.slice(); }
function prioritise(entries) {
  return entries.slice().sort((a, b) => {
    const wa = state.words[a.ms.toLowerCase()] || { box: 0, seen: 0 }, wb = state.words[b.ms.toLowerCase()] || { box: 0, seen: 0 };
    return (wa.box - wb.box) || (Math.random() - .5);
  });
}
function buildUnitQuiz(u) {
  const pri = prioritise(u.entries); const listen = canSpeak();
  const sents = shuffle(sentencesOf(u)); let si = 0; const nextS = () => sents[si++ % sents.length];
  const order = ['ms2en', 'en2ms', listen ? 'listen' : 'ms2en', 'blank', 'type', 'en2ms', 'order', listen ? 'listen' : 'en2ms', 'blank', 'type'];
  return order.map((t, i) => {
    const e = pri[i % pri.length];
    if (t === 'blank') return blankQ(u.id, nextS());
    if (t === 'order') { let s = nextS(); for (let k = 0; k < sents.length && s[0].split(' ').length > 8; k++) s = nextS(); return orderQ(u.id, s); }
    if (t === 'type') return typeQ(e);
    if (t === 'en2ms' && e.em && Math.random() < .4) return mcq(e, 'pic');
    return mcq(e, t);
  });
}
function buildMixedQuiz(entries, n, allowSent) {
  const pri = prioritise(entries); const listen = canSpeak(); const qs = [];
  const kinds = ['ms2en', 'en2ms', listen ? 'listen' : 'ms2en', 'type', 'blank', 'en2ms', 'ms2en', 'order'];
  for (let i = 0; i < n; i++) {
    const e = pri[i % pri.length]; let t = kinds[i % kinds.length];
    const u = UNIT[e.unit];
    if (t === 'blank' || t === 'order') {
      if (!allowSent) t = 'ms2en';
      else {
        const s = u.sents.find(x => x[2].toLowerCase() === e.ms.toLowerCase()) || sentOf(u);
        qs.push(t === 'blank' ? blankQ(u.id, s) : orderQ(u.id, s.slice(0, 3))); continue;
      }
    }
    if (t === 'type') qs.push(typeQ(e)); else qs.push(mcq(e, t));
  }
  return qs;
}
function scrollPool(sc) {
  const base = sc.quiz.map(([q, opts, a]) => ({ q, right: opts[a], wrongs: opts.filter((_, i) => i !== a) }));
  const more = (MORE[sc.id] || []).map(([q, right, wrongs]) => ({ q, right, wrongs }));
  return { base, more };
}
function buildScrollQuiz(sc, round) {
  const { base, more } = scrollPool(sc);
  let list;
  if (round === 'mix') list = shuffle(base.concat(more)).slice(0, 10);
  else if (+round === 1) list = base;
  else list = more.slice((+round - 2) * 5, (+round - 2) * 5 + 5);
  return list.map(it => ({
    kind: 'mcq', wordKey: null, label: 'Grammar', prompt: esc(it.q),
    opts: shuffle([{ t: it.right, ok: true }, ...it.wrongs.map(t => ({ t, ok: false }))]), say: '', explain: esc(sc.tip)
  }));
}

/* ───────────────────────── views ───────────────────────── */
let view = { name: 'home' };
let quiz = null;
function go(name, extra) { view = Object.assign({ name }, extra || {}); render(); window.scrollTo(0, 0); }

function av(size, orbit) {
  const e = state.equip || {};
  const fx = orbit ? SH.abilities.filter(a => has(a.id)).map((a, i, arr) => `<span class="orb" style="--i:${i};--n:${arr.length}">${a.fx}</span>`).join('') : '';
  return `<span class="av ${e.aura ? 'aura-' + e.aura : ''}" style="--s:${size}px">${e.back ? `<span class="bk">${e.back}</span>` : ''}<span class="base">${state.avatar}</span>${e.face ? `<span class="fc">${e.face}</span>` : ''}${e.head ? `<span class="hd">${e.head}</span>` : ''}${e.held ? `<span class="hl">${e.held}</span>` : ''}${fx}</span>`;
}
function hud() {
  const r = rankInfo();
  return `<div class="hud">${av(52)}<div class="mid">
    <div class="name">${esc(state.name)} <span class="muted">· ${esc(state.title)}</span></div>
    <div class="rank">${r.cur.icon} ${r.cur.name}${r.next ? ` · ${state.xp}/${r.next.xp} XP` : ' · MAX RANK'}</div>
    <div class="bar"><i style="width:${r.pct}%"></i></div></div>
    <div class="chips"><span class="chip" title="Streak">🔥 ${state.streak}</span><span class="chip" title="Ryo">🪙 ${state.ryo}</span></div></div>`;
}
function tabs() {
  const t = [['home', '🏯', 'Rumah'], ['map', '🗺️', 'Peta'], ['scrolls', '📜', 'Gulungan'], ['shop', '🛒', 'Kedai'], ['me', '🥷', 'Saya']];
  const cur = { world: 'map', unit: 'map', learn: 'map', scroll: 'scrolls', settings: 'me', report: 'me', roadmap: 'me' }[view.name] || view.name;
  return `<nav class="tabs">${t.map(x => `<button data-a="tab" data-v="${x[0]}" class="${cur === x[0] ? 'on' : ''}"><b>${x[1]}</b>${x[2]}</button>`).join('')}</nav>`;
}
const stars = n => `<span class="stars">${[1, 2, 3].map(i => i <= n ? '★' : '<span class="off">★</span>').join('')}</span>`;

function nextUnit() {
  for (const w of D.worlds) for (const u of unitsOf(w.id)) if (unitUnlocked(u) && unitStars(u.id) === 0) return u;
  for (const u of SP) if (specialUnlocked(u) && unitStars(u.id) === 0) return u;
  return D.units.concat(SP).sort((a, b) => unitStars(a.id) - unitStars(b.id))[0];
}
function greeting() { const h = new Date().getHours(); return h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat tengah hari' : h < 19 ? 'Selamat petang' : 'Selamat malam'; }

function vHome() {
  rolloverDaily();
  const nu = nextUnit(); const due = dueWords().length; const d = state.daily;
  const quests = [
    ['m', 'Complete 1 mission or scroll', d.missions, 1, 10], ['c', 'Answer 20 questions correctly', d.correct, 20, 10], ['r', 'Review 5 words', d.review, 5, 10]
  ];
  const days = []; for (let i = 6; i >= 0; i--) { const x = new Date(); x.setDate(x.getDate() - i); days.push([ymd(x), 'SMTWTFS'[x.getDay()]]); }
  return `${hud()}
  ${!state.welcomed ? `<div class="card scroll"><h2>Selamat datang, ninja baru! 🥷</h2><p>Welcome to the Malay Ninja Academy. Train every day to learn Malay for your IGCSE. What is your ninja name?</p>
  <input class="txt" id="nm" value="${esc(state.name)}" maxlength="18"><div class="sp"></div><button class="btn big" data-a="welcome">Mula! (Start)</button></div>` : ''}
  <div class="card"><div class="hero"><div class="big">${state.streak ? '🔥' : '🥷'}</div><div class="grow">
   <h2>${greeting()}, ${esc(state.name)}!</h2>
   <div class="muted">${state.streak ? `${plural(state.streak, 'day')} streak – keep it alive!` : 'Do one mission today to start a streak.'}</div>
   <div class="row" style="margin-top:8px">${days.map(([k, l]) => { const on = state.log[k]; return `<div style="text-align:center;font-size:.7rem" class="muted"><div style="font-size:1.3rem">${on ? '🔥' : (k === ymd() ? '⭕' : '·')}</div>${l}</div>`; }).join('')}</div></div></div></div>
  <div class="card"><h3>⚔️ Next mission</h3>
   <div class="row"><div style="font-size:2.4rem">${nu.icon}</div><div class="grow"><b>${esc(nu.title)}</b><div class="muted">${esc(D.worlds.find(w => w.id === nu.world).name)} · ${esc(nu.en)}</div></div></div>
   <div class="sp"></div><button class="btn big" data-a="unit" data-id="${nu.id}">Pergi! (Go)</button></div>
  <div class="card"><h3>📋 Daily quests</h3>${quests.map(([k, t, v, n, r]) => { const done = v >= n; return `<div class="quest ${done ? 'done' : ''}"><div class="ck">${done ? '✓' : ''}</div><div class="grow">${t}<div class="mini-bar"><i style="width:${Math.min(100, 100 * v / n)}%"></i></div></div><span class="pill">+${r} 🪙</span></div>`; }).join('')}
   <div class="muted" style="margin-top:6px">Finish all 3 for a bonus chest 🎁 (+30 🪙, +30 XP)</div></div>
  <div class="card"><h3>🔁 Ulang Kaji (Review)</h3><p class="muted">${due ? `${plural(due, 'word')} ready to review. Reviewing is how words stay in your memory for Year 10!` : 'Nothing due today. Practise your weakest words anyway?'}</p>
   <button class="btn blue big" data-a="review">${due ? 'Review now' : 'Practise weak words'}</button></div>
  ${state.inv.double > 0 ? `<div class="card row"><div style="font-size:2rem">✨</div><div class="grow">Double XP scroll ×${state.inv.double}<div class="muted">${state.armed ? 'Armed for your next mission!' : 'Arm it before your next mission.'}</div></div><button class="btn ghost" data-a="arm">${state.armed ? 'Disarm' : 'Arm'}</button></div>` : ''}
  ${tabs()}`;
}

function vMap() {
  return `${hud()}<h2 style="margin-top:14px">🗺️ Peta Dunia Shinobi</h2><p class="muted">Five villages, one for each IGCSE Malay topic area. Clear every mission to unlock the Boss battle.</p>
  ${D.worlds.map(w => {
    const us = unitsOf(w.id); const done = us.filter(u => unitStars(u.id) >= 1).length; const st = us.reduce((a, u) => a + unitStars(u.id), 0);
    return `<div class="card world" data-a="world" data-id="${w.id}"><div class="ic">${w.icon}</div><div class="info"><h3>${w.name}</h3><div class="muted">${w.area} · ${w.desc}</div>
      <div class="mini-bar" style="width:100%;margin-top:6px"><i style="width:${100 * done / us.length}%"></i></div>
      <div class="muted" style="margin-top:3px">${done}/${us.length} missions · ⭐ ${st}/${us.length * 3}${w.id !== '0' && state.bosses[w.id] ? ' · 👹 boss defeated' : ''}${specialsOf(w.id).length ? ` · ✨ ${specialsOf(w.id).filter(u => unitStars(u.id) >= 1).length}/5 special` : ''}</div></div><div style="font-size:1.6rem">›</div></div>`;
  }).join('')}${tabs()}`;
}

function vWorld() {
  const w = D.worlds.find(x => x.id === view.id); const us = unitsOf(w.id); const cur = us.find(u => unitUnlocked(u) && unitStars(u.id) === 0);
  return `${hud()}<button class="back" data-a="tab" data-v="map">‹ Peta</button>
  <div class="row" style="margin:10px 0"><div style="font-size:2.6rem">${w.icon}</div><div><h2 style="margin:0">${w.name}</h2><div class="muted">${w.area} · ${w.desc}</div></div></div>
  <div class="path">${us.map(u => { const ok = unitUnlocked(u); return `<div class="node ${ok ? '' : 'locked'} ${cur === u ? 'cur' : ''}" ${ok ? `data-a="unit" data-id="${u.id}"` : ''}>
     <div class="ic">${ok ? u.icon : '🔒'}</div><div class="grow"><b>${esc(u.title)}</b><div class="muted">${esc(u.en)} · ${plural(u.words.length, 'word')}</div></div>${stars(unitStars(u.id))}</div>`; }).join('')}
   ${w.id !== '0' ? `<div class="node boss ${bossOpen(w.id) ? '' : 'locked'}" ${bossOpen(w.id) ? `data-a="boss" data-id="${w.id}"` : ''}>
     <div class="ic">${bossOpen(w.id) ? '👹' : '🔒'}</div><div class="grow"><b>Pertarungan Bos – ${w.name}</b><div class="muted">${bossOpen(w.id) ? '15 mixed questions. Big rewards!' : 'Clear every mission above to unlock'}</div></div>${stars((state.bosses[w.id] || {}).stars || 0)}</div>` : ''}
  </div>
  ${specialsOf(w.id).length ? `<h3 style="margin:18px 0 4px">✨ Misi Khas – Special missions</h3><p class="muted">${state.bosses[w.id] ? 'Bonus vocabulary that goes beyond the syllabus. Extra XP and ryo!' : `Defeat the ${w.name} boss to unlock these 5 bonus missions.`}</p>
  <div class="path">${specialsOf(w.id).map(u => { const ok = specialUnlocked(u); return `<div class="node special ${ok ? '' : 'locked'}" ${ok ? `data-a="unit" data-id="${u.id}"` : ''}>
     <div class="ic">${ok ? u.icon : '🔒'}</div><div class="grow"><b>${esc(u.title)}</b><div class="muted">${esc(u.en)} · ${plural(u.words.length, 'word')}</div></div>${stars(unitStars(u.id))}</div>`; }).join('')}</div>` : ''}${tabs()}`;
}

function vUnit() {
  const u = UNIT[view.id]; const rec = state.units[u.id] || {};
  return `${hud()}<button class="back" data-a="world" data-id="${u.world}">‹ ${D.worlds.find(w => w.id === u.world).name}</button>
  <div class="card"><div class="row"><div style="font-size:3rem">${u.icon}</div><div class="grow"><h2 style="margin:0">${esc(u.title)}</h2><div class="muted">${esc(u.en)}</div>${u.special ? '<span class="pill" style="margin-top:4px">✨ Misi Khas · beyond the syllabus</span>' : ''}</div>${stars(rec.stars || 0)}</div>
   <div class="sp"></div><div class="row wrap"><button class="btn blue grow" data-a="learn" data-id="${u.id}">📖 Belajar (Learn)</button><button class="btn grow" data-a="mission" data-id="${u.id}">⚔️ Misi (Mission)</button></div>
   ${state.inv.double > 0 ? `<div class="sp"></div><button class="btn ghost" data-a="arm" data-back="1">${state.armed ? '✨ Double XP armed (tap to disarm)' : `✨ Arm Double XP (×${state.inv.double})`}</button>` : ''}
   <p class="muted" style="margin-top:8px">Tip: learn the words first, then start the mission. Get 3 ⭐ by answering at least 90% right the first time.</p></div>
  <div class="card"><h3>Words</h3><div class="wordlist">${u.entries.map(e => { const w = state.words[e.ms.toLowerCase()]; return `<div class="wl"><span class="dot k${w ? Math.max(1, Math.min(5, w.box)) : 0}"></span><span class="e">${e.em || ''}</span><div class="grow"><b>${esc(e.ms)}</b><span>${esc(e.en)}</span></div><button class="speak" data-a="say" data-t="${esc(e.ms)}">🔊</button></div>`; }).join('')}</div>
   <p class="muted" style="margin-top:8px">Dots: <span class="dot k1" style="display:inline-block"></span> new/wrong &nbsp;<span class="dot k3" style="display:inline-block"></span> getting there &nbsp;<span class="dot k5" style="display:inline-block"></span> mastered</p></div>
  <div class="card"><h3>Example sentences</h3>${u.sents.map(s => `<div class="row" style="padding:6px 0"><button class="speak" data-a="say" data-t="${esc(s[0])}">🔊</button><div><b>${esc(s[0])}</b><div class="muted">${esc(s[1])}</div></div></div>`).join('')}</div>${tabs()}`;
}

function vLearn() {
  const u = UNIT[view.id]; const i = view.i || 0; const e = u.entries[i];
  return `${hud()}<button class="back" data-a="unit" data-id="${u.id}">‹ ${esc(u.title)}</button>
  <div class="row" style="margin-top:10px"><h3 style="margin:0" class="grow">Kad Perkataan – ${i + 1}/${u.entries.length}</h3><span class="muted">Tap the card to flip</span></div>
  <div class="flash"><div class="flip ${view.flip ? 'on' : ''}" data-a="flip"><div class="face front">${e.em ? `<div class="em">${e.em}</div>` : ''}<div class="ms">${esc(e.ms)}</div></div>
   <div class="face back"><div class="en">${esc(e.en)}</div><div class="muted" style="margin-top:8px">${esc(e.ms)}</div></div></div></div>
  <div class="row" style="justify-content:center;gap:14px"><button class="btn ghost" data-a="lprev" ${i === 0 ? 'disabled' : ''}>‹</button><button class="speak" style="width:56px;height:56px;font-size:1.6rem" data-a="say" data-t="${esc(e.ms)}">🔊</button><button class="btn ghost" data-a="lnext">${i === u.entries.length - 1 ? '✓ Done' : '›'}</button></div>
  <div class="sp"></div><div class="stars" style="text-align:center">${'●'.repeat(i + 1)}<span class="off">${'●'.repeat(u.entries.length - i - 1)}</span></div>${tabs()}`;
}

function vScrolls() {
  return `${hud()}<h2 style="margin-top:14px">📜 Gulungan Tatabahasa</h2><p class="muted">Grammar scrolls covering the structures in the IGCSE Malay syllabus. Read the scroll, then take the quiz.</p>
  ${D.scrolls.map(s => { const r = state.scrolls[s.id]; const rd = r && r.rounds ? [1, 2, 3, 4, 5].filter(k => r.rounds[k] >= 1).length : (r ? 1 : 0); return `<div class="card world" data-a="scroll" data-id="${s.id}"><div class="ic">${s.icon}</div><div class="info"><h3>${esc(s.title)}</h3><div class="muted">${esc(s.en)}</div><div class="mini-bar" style="width:100%;margin-top:6px"><i style="width:${rd * 20}%"></i></div><div class="muted" style="margin-top:3px">${rd}/5 quizzes cleared${r && r.stars ? ` · ⭐ ${r.stars}/15` : ''}</div></div><div style="font-size:1.6rem">›</div></div>`; }).join('')}${tabs()}`;
}
function vScroll() {
  const s = D.scrolls.find(x => x.id === view.id);
  return `${hud()}<button class="back" data-a="tab" data-v="scrolls">‹ Gulungan</button>
  <div class="scroll" style="margin-top:12px"><h2>${s.icon} ${esc(s.title)}</h2><div class="muted" style="color:#7a5a20">${esc(s.en)}</div>
   <table class="rep" style="color:#3b2a12;margin-top:8px">${s.lesson.map(l => `<tr><td style="width:34%"><b>${esc(l[0])}</b></td><td>${esc(l[1])}</td></tr>`).join('')}</table>
   <p style="margin-top:10px;background:#fff8;padding:8px 10px;border-radius:10px">💡 ${esc(s.tip)}</p></div>
  <h3 style="margin:16px 0 6px">Uji diri! Quiz rounds</h3><p class="muted">Five quizzes on this structure, then a random mix of all ${scrollPool(s).base.length + scrollPool(s).more.length} questions.</p>
  <div class="path">${[1, 2, 3, 4, 5].map(k => { const st = ((state.scrolls[s.id] || {}).rounds || {})[k] || 0; return `<div class="node" data-a="scrollquiz" data-id="${s.id}" data-round="${k}"><div class="ic">${st ? '✅' : k}</div><div class="grow"><b>Quiz ${k}</b><div class="muted">${k === 1 ? scrollPool(s).base.length : 5} questions</div></div>${stars(st)}</div>`; }).join('')}
   <div class="node boss" data-a="scrollquiz" data-id="${s.id}" data-round="mix"><div class="ic">🎲</div><div class="grow"><b>Latihan Campuran (Random mix)</b><div class="muted">10 random questions from all quizzes</div></div>${stars(((state.scrolls[s.id] || {}).rounds || {}).mix || 0)}</div></div>${tabs()}`;
}

const SLOT_NAMES = { head: 'Hats', face: 'Face', held: 'Held items', back: 'Backs & wings' };
function itemCard(o) {
  const btn = o.owned
    ? `<button class="btn ${o.worn ? 'green' : ''}" data-a="wear" data-k="${o.k}" data-id="${esc(o.id)}">${o.worn ? 'Wearing ✔' : 'Wear'}</button>`
    : `<button class="btn" data-a="buy" data-k="${o.bk}" data-id="${esc(o.id)}" data-cost="${o.cost}">🪙 ${o.cost}</button>`;
  return `<div class="item ${o.worn ? 'eq' : ''}"><div class="ic">${o.ic}</div><b>${esc(o.name)}</b><small>${o.sub || ''}</small>${btn}</div>`;
}
function vShop() {
  const tab = view.tab || 'costumes'; const own = state.own; const eq = state.equip;
  const tabsx = [['costumes', '🎭 Costumes'], ['gear', '🧢 Gear'], ['auras', '✨ Auras'], ['abilities', '🌀 Abilities'], ['avatars', '🦊 Avatars'], ['themes', '🎨 Themes'], ['titles', '🏷️ Titles'], ['powers', '🔍 Power-ups'], ['real', '🎁 Real rewards']];
  let body = '';
  if (tab === 'themes') body = `<div class="grid">${SHOP.themes.map(t => `<div class="item ${state.theme === t.id ? 'eq' : ''}"><div class="swatch" style="background:${t.c}"></div><b>${t.name}</b>${own.themes.includes(t.id) ? `<button class="btn ${state.theme === t.id ? 'green' : ''}" data-a="equip" data-k="theme" data-id="${t.id}">${state.theme === t.id ? 'Equipped' : 'Use'}</button>` : `<button class="btn" data-a="buy" data-k="themes" data-id="${t.id}" data-cost="${t.cost}">🪙 ${t.cost}</button>`}</div>`).join('')}</div>`;
  if (tab === 'avatars') body = `<p class="muted">Pick your animal. Costumes and gear work on every avatar!</p><div class="grid">${SHOP.avatars.map(t => `<div class="item ${state.avatar === t.id ? 'eq' : ''}"><div class="ic">${t.id}</div>${own.avatars.includes(t.id) ? `<button class="btn ${state.avatar === t.id ? 'green' : ''}" data-a="equip" data-k="avatar" data-id="${t.id}">${state.avatar === t.id ? 'Equipped' : 'Use'}</button>` : `<button class="btn" data-a="buy" data-k="avatars" data-id="${t.id}" data-cost="${t.cost}">🪙 ${t.cost}</button>`}</div>`).join('')}</div>`;
  if (tab === 'titles') body = `<div class="grid">${SHOP.titles.map(t => `<div class="item ${state.title === t.id ? 'eq' : ''}"><div class="ic">🏷️</div><b>${t.id}</b>${own.titles.includes(t.id) ? `<button class="btn ${state.title === t.id ? 'green' : ''}" data-a="equip" data-k="title" data-id="${t.id}">${state.title === t.id ? 'Equipped' : 'Use'}</button>` : `<button class="btn" data-a="buy" data-k="titles" data-id="${t.id}" data-cost="${t.cost}">🪙 ${t.cost}</button>`}</div>`).join('')}</div>`;
  if (tab === 'powers') body = `<div class="grid">${SHOP.powers.map(p => `<div class="item"><div class="ic">${p.ic}</div><b>${p.name}</b><small>${p.desc}</small><div class="muted">You have: ${state.inv[p.id]}</div><button class="btn" data-a="buy" data-k="powers" data-id="${p.id}" data-cost="${p.cost}">🪙 ${p.cost}</button></div>`).join('')}</div>`;
  if (tab === 'costumes') body = `<p class="muted">Full costume sets – a hat, gear and glow in one go. Themed for festivals and elements.</p><div class="grid">${SH.sets.map(c => {
    const worn = Object.keys(c.slots).every(k => eq[k] === c.slots[k]) && Object.keys(eq).length === Object.keys(c.slots).length;
    return itemCard({ k: 'set', bk: 'sets', id: c.id, name: c.name, cost: c.cost, owned: own.sets.includes(c.id), worn, ic: (c.slots.head || '') + (c.slots.held || '') + (c.slots.back || ''), sub: c.slots.aura ? 'with ' + (SH.auras.find(a => a.id === c.slots.aura) || {}).name : '' });
  }).join('')}</div>`;
  if (tab === 'gear') {
    const slot = view.slot || 'head';
    body = `<div class="tabsx">${Object.keys(SLOT_NAMES).map(k => `<button data-a="slot" data-v="${k}" class="${slot === k ? 'on' : ''}">${SLOT_NAMES[k]}</button>`).join('')}</div><div class="grid">${SH.gear[slot].map(g => {
      const id = slot + ':' + g.e;
      return itemCard({ k: 'item', bk: 'items', id, name: g.name, cost: g.cost, owned: own.items.includes(id), worn: eq[slot] === g.e, ic: g.e });
    }).join('')}</div>`;
  }
  if (tab === 'auras') body = `<p class="muted">A glowing aura around your ninja.</p><div class="grid">${SH.auras.map(a => itemCard({ k: 'aura', bk: 'auras', id: a.id, name: a.name, cost: a.cost, owned: own.auras.includes(a.id), worn: eq.aura === a.id, ic: `<span class="av aura-${a.id}" style="--s:44px"><span class="base">🥷</span></span>` })).join('')}</div>`;
  if (tab === 'abilities') body = `<p class="muted">Rare ninja abilities! They cost a lot of ryo, but they give you real powers in every mission and orbit around your avatar.</p><div class="grid">${SH.abilities.map(a => `<div class="item ${has(a.id) ? 'eq' : ''}"><div class="ic">${a.fx}</div><b>${esc(a.name)}</b><div class="muted">${esc(a.en)}</div><small>${esc(a.perk)}</small>${has(a.id) ? '<div class="pill">Unlocked ✔</div>' : `<button class="btn" data-a="buy" data-k="abilities" data-id="${a.id}" data-cost="${a.cost}">🪙 ${a.cost}</button>`}</div>`).join('')}</div>`;
  if (tab === 'real') body = `<p class="muted">Rewards set by your parents! Spend ryo to claim them. (Parents can add rewards under Saya → Parent report.)</p>
   ${state.real.length ? `<div class="grid">${state.real.map((r, i) => `<div class="item"><div class="ic">🎁</div><b>${esc(r.name)}</b><small>&nbsp;</small><button class="btn" data-a="claim" data-i="${i}">🪙 ${r.cost}</button></div>`).join('')}</div>` : '<div class="card muted">No real-life rewards yet. Ask a parent to add some!</div>'}`;
  const wearing = Object.keys(eq).length;
  return `${hud()}<h2 style="margin-top:14px">🛒 Kedai Ninja</h2>
  <div class="card"><div class="row" style="gap:16px"><div style="padding:26px 24px 18px">${av(96, true)}</div><div class="grow"><b>${esc(state.name)}</b><div class="muted">${esc(state.title)}</div><div class="muted" style="margin-top:4px">${wearing ? 'Wearing ' + wearing + ' item' + (wearing > 1 ? 's' : '') : 'Nothing worn yet – buy a costume!'}</div>${wearing ? '<button class="btn ghost" style="margin-top:8px;padding:6px 12px" data-a="strip">Take everything off</button>' : ''}</div></div></div>
  <div class="tabsx">${tabsx.map(t => `<button data-a="shoptab" data-v="${t[0]}" class="${tab === t[0] ? 'on' : ''}">${t[1]}</button>`).join('')}</div>${body}${tabs()}`;
}

function vMe() {
  const r = rankInfo(); const got = Object.keys(state.badges).length;
  const words = Object.keys(WORDS).length;
  return `${hud()}
  <div class="card"><div class="row" style="gap:16px"><div style="padding:26px 24px 18px">${av(92, true)}</div><div><h2 style="margin:0">${esc(state.name)}</h2><div class="muted">${r.cur.icon} ${r.cur.name} · ${esc(state.title)}</div>${state.own.abilities.length ? `<div class="muted" style="margin-top:4px">${SH.abilities.filter(a => has(a.id)).map(a => a.fx + ' ' + a.name).join(' · ')}</div>` : ''}</div></div>
   <div class="row wrap" style="margin-top:10px"><span class="pill">⭐ ${totalStars()} stars</span><span class="pill">📗 ${learnedCount()}/${words} words learned</span><span class="pill">🔥 best streak ${state.best}</span><span class="pill">🪙 ${state.earned} earned</span></div>
   <div class="sp"></div><div class="row wrap"><button class="btn ghost" data-a="go" data-v="roadmap">🎓 Exam roadmap</button><button class="btn ghost" data-a="go" data-v="report">👨‍👩‍👦 Parent report</button><button class="btn ghost" data-a="go" data-v="settings">⚙️ Settings</button></div></div>
  <div class="card"><h3>🏅 Lencana (${got}/${BADGES.length})</h3><div class="grid">${BADGES.map(b => `<div class="badge ${state.badges[b.id] ? '' : 'lock'}"><div class="ic">${b.ic}</div><b>${b.n}</b><div class="muted">${b.d}</div></div>`).join('')}</div></div>${tabs()}`;
}

function vRoadmap() {
  return `${hud()}<button class="back" data-a="tab" data-v="me">‹ Saya</button>
  <div class="card"><h2>🎓 Road to IGCSE Malay (0546)</h2><p>Cambridge IGCSE Malay as a Foreign Language has <b>four papers, each worth 25%</b>: Listening (about 50 min), Reading (1 hr), Speaking (about 10 min plus preparation) and Writing (1 hr). The syllabus is built around five topic areas – the five villages on your map.</p>
   <table class="rep"><tr><th>Area</th><th>Village</th><th>Topics</th></tr>
   <tr><td>A</td><td>Desa Api</td><td>Time, food & drink, body & health, travel</td></tr><tr><td>B</td><td>Desa Air</td><td>Family & friends, home, clothes, leisure</td></tr>
   <tr><td>C</td><td>Desa Angin</td><td>Places, weather & nature, technology, shopping, size</td></tr><tr><td>D</td><td>Desa Petir</td><td>School and jobs</td></tr><tr><td>E</td><td>Desa Bumi</td><td>Countries, languages, culture & festivals</td></tr></table></div>
  <div class="card"><h3>Suggested plan</h3><p><b>Year 6–7:</b> clear the Academy and Villages A–B. 10–15 minutes a day, and always do your Ulang Kaji.</p><p><b>Year 8:</b> Villages C–D, and all 12 grammar scrolls. Start writing 3–4 sentence paragraphs on each topic.</p><p><b>Year 9:</b> Village E, boss rematches, speaking practice out loud (tap 🔊, then say it yourself).</p><p><b>Year 10:</b> past papers from the Cambridge website, timed, plus daily review to keep every word fresh.</p></div>
  <div class="card"><h3>What this app covers</h3><p>Right now: <b>vocabulary and grammar</b> for all five areas, with listening (text-to-speech) built into questions. Beat a village boss to unlock <b>5 Misi Khas (special missions)</b> that stretch your vocabulary beyond the syllabus. Every grammar scroll has <b>5 quiz rounds plus a random mix</b>. Reading passages, writing prompts and speaking cards can be added later as new "Gulungan".</p></div>${tabs()}`;
}

function vSettings() {
  return `${hud()}<button class="back" data-a="tab" data-v="me">‹ Saya</button>
  <div class="card"><h2>⚙️ Settings</h2>
   <label>Ninja name</label><input class="txt" id="setname" value="${esc(state.name)}" maxlength="18">
   <label>Sound effects</label><select class="txt" id="setsound"><option value="1" ${state.settings.sound ? 'selected' : ''}>On</option><option value="0" ${!state.settings.sound ? 'selected' : ''}>Off</option></select>
   <label>Malay voice (text-to-speech)</label><select class="txt" id="setspeech"><option value="1" ${state.settings.speech ? 'selected' : ''}>On</option><option value="0" ${!state.settings.speech ? 'selected' : ''}>Off</option></select>
   <label>Speech speed</label><select class="txt" id="setrate">${[[.65, 'Slow'], [.85, 'Normal'], [1.05, 'Fast']].map(r => `<option value="${r[0]}" ${state.settings.rate === r[0] ? 'selected' : ''}>${r[1]}</option>`).join('')}</select>
   <div class="sp"></div><div class="row wrap"><button class="btn blue" data-a="say" data-t="Selamat pagi, apa khabar?">🔊 Test voice</button><button class="btn" data-a="savesettings">Save</button></div>
   <p class="muted" id="voiceinfo">${voice ? `Voice found: ${esc(voice.name)} (${esc(voice.lang)})` : 'No Malay or Indonesian voice was found on this device, so listening questions are replaced by reading questions. On iPad/iPhone add a Malay voice in Settings → Accessibility → Spoken Content → Voices. On Chrome/Android install "Malay" in the text-to-speech settings.'}</p></div>
  <div class="card"><h3>💾 Save / move progress</h3><p class="muted">Progress is saved in this browser only. To move to another device, copy the text below and paste it into Import on the other device.</p>
   <textarea class="txt" id="io" rows="4" placeholder="Paste progress here to import…"></textarea><div class="sp"></div>
   <div class="row wrap"><button class="btn ghost" data-a="export">Export</button><button class="btn ghost" data-a="import">Import</button><button class="btn ghost" data-a="reset" style="color:#ff9aa8">Reset everything</button></div></div>${tabs()}`;
}

function vReport() {
  if (!view.ok) return `${hud()}<button class="back" data-a="tab" data-v="me">‹ Saya</button><div class="card"><h2>👨‍👩‍👦 Parent area</h2><p>Enter the parent PIN (default <b>0000</b>).</p><input class="txt" id="pin" type="password" inputmode="numeric" maxlength="8"><div class="sp"></div><button class="btn big" data-a="pin">Open</button></div>${tabs()}`;
  const l = state.log; const days = []; for (let i = 13; i >= 0; i--) { const x = new Date(); x.setDate(x.getDate() - i); const k = ymd(x); days.push([k, l[k] || { a: 0, c: 0, m: 0 }]); }
  const A = Object.values(state.words).reduce((a, w) => a + w.seen, 0), C = Object.values(state.words).reduce((a, w) => a + w.right, 0);
  const weak = Object.keys(state.words).filter(k => WORDS[k] && state.words[k].wrong > 0).sort((a, b) => state.words[b].wrong - state.words[a].wrong).slice(0, 10);
  return `${hud()}<button class="back" data-a="tab" data-v="me">‹ Saya</button>
  <div class="card"><h2>👨‍👩‍👦 Parent report</h2><div class="row wrap"><span class="pill">Streak ${state.streak} (best ${state.best})</span><span class="pill">${learnedCount()} words learned</span><span class="pill">${state.sessions} sessions</span><span class="pill">Accuracy ${A ? Math.round(100 * C / A) : 0}%</span></div>
   <h3 style="margin-top:12px">Last 14 days</h3><table class="rep"><tr><th>Date</th><th>Sessions</th><th>Answered</th><th>Correct</th></tr>${days.map(([k, v]) => `<tr><td>${k.slice(5)}</td><td>${v.m}</td><td>${v.a}</td><td>${v.c}</td></tr>`).join('')}</table></div>
  <div class="card"><h3>Progress by village</h3>${D.worlds.map(w => { const ws = allWordsOfWorld(w.id); const n = ws.filter(e => isLearned(e.ms)).length; return `<div style="margin:6px 0">${w.icon} ${w.name} <span class="muted">${n}/${ws.length} words learned</span><div class="bar"><i style="width:${100 * n / ws.length}%"></i></div></div>`; }).join('')}</div>
  <div class="card"><h3>Words needing work</h3>${weak.length ? `<table class="rep"><tr><th>Malay</th><th>English</th><th>Wrong</th></tr>${weak.map(k => `<tr><td>${esc(WORDS[k].ms)}</td><td>${esc(WORDS[k].en)}</td><td>${state.words[k].wrong}</td></tr>`).join('')}</table>` : '<p class="muted">Nothing yet.</p>'}</div>
  <div class="card"><h3>🎁 Real-life rewards</h3><p class="muted">Set rewards Haris can buy with ryo (e.g. "30 min extra game time", "Pick Friday's dinner").</p>
   ${state.real.map((r, i) => `<div class="row" style="padding:4px 0"><div class="grow">${esc(r.name)} – 🪙 ${r.cost}</div><button class="btn ghost" data-a="delreal" data-i="${i}">Remove</button></div>`).join('')}
   <div class="row wrap" style="margin-top:8px"><input class="txt grow" id="rname" placeholder="Reward name" style="flex:2"><input class="txt" id="rcost" type="number" min="10" placeholder="Cost" style="flex:1;max-width:110px"><button class="btn" data-a="addreal">Add</button></div>
   <h3 style="margin-top:14px">Claimed</h3>${state.claims.length ? state.claims.slice(-10).reverse().map(c => `<div class="muted">${c.date} – ${esc(c.name)} (🪙 ${c.cost})</div>`).join('') : '<p class="muted">Nothing claimed yet.</p>'}</div>
  <div class="card"><h3>Change PIN</h3><div class="row"><input class="txt" id="newpin" type="password" inputmode="numeric" maxlength="8" placeholder="New PIN"><button class="btn" data-a="setpin">Save</button></div></div>${tabs()}`;
}

/* ───────────────────────── quiz engine ───────────────────────── */
function startQuiz(cfg) {
  const double = state.armed && state.inv.double > 0;
  if (double) { state.inv.double--; state.armed = false; }
  quiz = Object.assign({ clone: has('klon'), freeHint: has('mata') ? 1 : 0, i: 0, queue: cfg.qs.slice(), total: cfg.qs.length, first: 0, combo: 0, bestCombo: 0, xp: 0, ryo: 0, done: 0, wrongs: 0, double, cur: null, answered: false, reviewed: 0 }, cfg);
  view = { name: 'quiz' }; nextQ();
}
function nextQ() {
  fbEl.classList.remove('show');
  if (!quiz.queue.length) return finishQuiz();
  const q = quiz.queue.shift(); quiz.cur = { q, answered: false, ans: [], removed: [] }; renderQuiz();
  if (q.auto && canSpeak()) setTimeout(() => say(q.speakBtn), 250);
}
function renderQuiz() {
  const { q } = quiz.cur;
  if (q.kind === 'order' && !q.shuffled) { let sh; do { sh = shuffle(q.tokens); } while (q.tokens.length > 1 && sh.join(' ') === q.tokens.join(' ')); q.shuffled = sh; } const pct = Math.round(100 * quiz.done / quiz.total);
  const BN = has('pusaran') ? 4 : 5; let cb = quiz.combo % BN; if (!cb && quiz.combo) cb = BN;
  let body = '';
  if (q.kind === 'mcq') {
    body = `<div class="opts">${q.opts.map((o, i) => `<button class="opt ${quiz.cur.removed.includes(i) ? 'gone' : ''}" data-a="opt" data-i="${i}">${esc(o.t)}</button>`).join('')}</div>
      <div class="power">${(state.inv.hint > 0 || quiz.freeHint > 0) && !quiz.cur.removed.length ? `<button class="btn ghost" data-a="hint">🔍 Petunjuk (${quiz.freeHint > 0 ? 'free ✨' : state.inv.hint})</button>` : ''}</div>`;
  } else if (q.kind === 'type') {
    body = `<input class="typebox" id="tb" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Taip di sini…"><div class="sp"></div><button class="btn big" data-a="check">Semak (Check)</button>`;
  } else if (q.kind === 'order') {
    const used = quiz.cur.ans;
    body = `<div class="tokens ans">${used.map((ti, k) => `<button class="tok" data-a="untok" data-k="${k}">${esc(q.shuffled[ti])}</button>`).join('')}</div>
      <div class="tokens">${q.shuffled.map((t, ti) => `<button class="tok ${used.includes(ti) ? 'used' : ''}" data-a="tok" data-i="${ti}">${esc(t)}</button>`).join('')}</div>
      <button class="btn big" data-a="check" ${used.length === q.tokens.length ? '' : 'disabled'}>Semak (Check)</button>`;
  }
  app.innerHTML = `<div class="quiz-top"><button class="x" data-a="quit">✕</button><div class="progress"><i style="width:${pct}%"></i></div><span class="chip">🪙 ${quiz.ryo}</span></div>
   <div class="chakra" title="Chakra">${Array.from({ length: BN }, (_, k) => k + 1).map(i => `<i class="${i <= cb ? 'on' : ''}"></i>`).join('')}${quiz.combo >= 2 ? `<span class="combo">×${quiz.combo}</span>` : ''}</div>
   <div class="q"><div class="kind">${esc(q.label)}${quiz.double ? ' · ✨ Double XP' : ''}${q.retry ? ' · try again' : ''}</div>
    ${q.big ? `<div class="big-em">${q.big}</div>` : ''}
    ${q.prompt ? `<div class="prompt">${q.hideText ? '' : ''}${q.prompt}${q.sub ? `<small>${q.sub}</small>` : ''}${q.speakBtn ? ` <button class="speak" data-a="say" data-t="${esc(q.speakBtn)}" style="vertical-align:middle">🔊</button>` : ''}</div>` : ''}
    ${body}</div><div style="height:130px"></div>`;
  const tb = document.getElementById('tb'); if (tb) tb.focus();
}
function submit(ok, q, given) {
  const c = quiz.cur; if (c.answered) return; c.answered = true;
  const retry = !!q.retry;
  if (ok) {
    quiz.combo++; quiz.bestCombo = Math.max(quiz.bestCombo, quiz.combo); quiz.done++;
    if (!retry) { quiz.first++; let x = 10 + Math.min(quiz.combo - 1, 4) * 2; if (q.kind === 'type' && has('kilat')) x += 5; quiz.xp += x; quiz.ryo += 2; state.daily.correct++; if (quiz.kind === 'review' && q.wordKey) quiz.reviewed++; }
    else { quiz.xp += 3; }
    let burst = false;
    if (quiz.combo % (has('pusaran') ? 4 : 5) === 0) { burst = true; quiz.xp += 15; quiz.ryo += 10; }
    if (quiz.combo >= 10) state.flags.combo10 = true;
    beep(burst ? 'burst' : 'ok');
    if (burst) confetti(60);
    showFb(true, q, burst);
  } else {
    let saved = false;
    if (quiz.clone && quiz.combo > 0) { quiz.clone = false; saved = true; } else quiz.combo = 0;
    quiz.wrongs++; beep('no'); q.cloneSaved = saved;
    if (!retry) { const r = Object.assign({}, q, { retry: true }); if (q.kind === 'mcq') r.opts = shuffle(q.opts); quiz.queue.push(r); }
    else { quiz.queue.push(q); }
    showFb(false, q);
  }
  if (!retry && q.wordKey && WORDS[q.wordKey.toLowerCase()]) updateWord(q.wordKey, ok);
  quiz.answered = true; save();
}
function showFb(ok, q, burst) {
  const right = q.kind === 'mcq' ? q.opts.find(o => o.ok).t : q.kind === 'type' ? q.answer : q.tokens.join(' ');
  fbEl.className = 'feedback show ' + (ok ? 'ok' : 'no');
  fbEl.innerHTML = `<div class="inner"><div class="grow"><h3>${ok ? (burst ? '⚡ Chakra Burst! Betul!' : ['Betul! ✅', 'Hebat! ✅', 'Bagus! ✅', 'Tepat! ✅'][rnd(4)]) : 'Tak apa – hampir! ❌'}</h3>
    <div style="font-size:.95rem">${ok ? (q.explain || '') : `Answer: <b>${esc(right)}</b><br>${q.explain || ''}${q.cloneSaved ? '<br>👥 Klon Bayang protected your combo!' : ''}`}</div></div>
    <button class="btn ${ok ? 'green' : ''}" data-a="next">Teruskan ›</button></div>`;
  if (q.say && (q.kind !== 'mcq' || q.wordKey)) setTimeout(() => say(q.say), 200);
}
function finishQuiz() {
  const q = quiz; const acc = q.first / q.total;
  const stars3 = acc >= .9 ? 3 : acc >= .7 ? 2 : 1;
  const kind = q.kind; const before = rankInfo().i;
  const msgs = []; const s = touchStreak(); if (s) msgs.push(s);
  let bonusXp = 20 + stars3 * 10, bonusRyo = stars3 * 5;
  if (kind === 'review') { bonusXp = 15; bonusRyo = 5; }
  let rec = null;
  if (kind === 'unit') { rec = state.units[q.id] || (state.units[q.id] = { stars: 0, plays: 0 }); if (UNIT[q.id].special) { bonusXp += 15; bonusRyo += 10; } }
  if (kind === 'scroll') {
    const sr = state.scrolls[q.id] || (state.scrolls[q.id] = { stars: 0, plays: 0, rounds: {} });
    if (!sr.rounds) sr.rounds = sr.stars ? { 1: sr.stars } : {};
    const key = String(q.round), prev = sr.rounds[key] || 0;
    if (!prev) bonusRyo += 20;
    if (stars3 > prev) { bonusRyo += (stars3 - prev) * 5; sr.rounds[key] = stars3; }
    sr.plays++; sr.stars = Object.entries(sr.rounds).filter(([k]) => k !== 'mix').reduce((a, [, v]) => a + v, 0);
  }
  if (kind === 'boss') { rec = state.bosses[q.id] || (state.bosses[q.id] = { stars: 0, plays: 0 }); bonusXp += 40; bonusRyo += 25; }
  if (rec && kind !== 'scroll') {
    if (rec.plays === 0) { bonusRyo += 20; }
    if (stars3 > rec.stars) { bonusRyo += (stars3 - rec.stars) * 5; rec.stars = stars3; }
    rec.plays++;
  }
  let xp = q.xp + bonusXp; if (q.double) xp *= 2;
  if (has('bijak')) { xp = Math.round(xp * 1.15); msgs.push('🍃 Mod Bijak: +15% XP'); }
  const chest = 5 + rnd(21);
  let ryo = q.ryo + bonusRyo + chest;
  if (has('naga')) { ryo = Math.round(ryo * 1.2); msgs.push('🐲 Naga Api: +20% ryo'); }
  if (acc === 1 && kind !== 'review') state.flags.perfect = true;
  state.xp += xp; state.ryo += ryo; state.earned += ryo;
  state.sessions++; if (kind === 'review') state.reviews++;
  rolloverDaily(); const d = state.daily;
  d.missions++; d.review += q.reviewed;
  const paid = state.daily.paid;
  [['m', d.missions >= 1], ['c', d.correct >= 20], ['r', d.review >= 5]].forEach(([k, done]) => { if (done && !paid[k]) { paid[k] = 1; state.ryo += 10; state.earned += 10; ryo += 10; msgs.push('📋 Daily quest complete! +10 🪙'); } });
  if (paid.m && paid.c && paid.r && !paid.all) { paid.all = 1; state.ryo += 30; state.xp += 30; state.earned += 30; ryo += 30; xp += 30; msgs.push('🎁 All daily quests done! +30 🪙 +30 XP'); }
  logToday(q.total + q.wrongs, q.total);
  const after = rankInfo(); const newBadges = checkBadges();
  save();
  const lvl = after.i > before;
  beep(lvl ? 'win' : 'coin'); confetti(stars3 === 3 || lvl ? 200 : 90);
  const title = kind === 'boss' ? '👹 Bos dikalahkan!' : kind === 'review' ? '🔁 Ulang kaji selesai!' : 'Misi selesai!';
  const back = kind === 'unit' ? { a: 'unit', id: q.id } : kind === 'boss' ? { a: 'world', id: q.id } : kind === 'scroll' ? { a: 'scroll', id: q.id } : { a: 'tab', v: 'home' };
  view = { name: 'result' };
  app.innerHTML = `<div class="overlay"><div class="modal">
    <h2>${title}</h2>${kind === 'review' ? '' : `<div class="bigstars stars">${[1, 2, 3].map(i => i <= stars3 ? '★' : '<span class="off">★</span>').join('')}</div>`}
    <p class="muted">${Math.round(acc * 100)}% right first time · best combo ×${q.bestCombo}${q.double ? ' · ✨ Double XP!' : ''}</p>
    <div class="stat"><div><b>+${xp}</b>XP</div><div><b>+${ryo}</b>🪙 ryo</div></div>
    <div class="chest">🎁</div><p class="muted">Kotak hadiah: +${chest} 🪙</p>
    ${lvl ? `<div class="card scroll" style="margin:8px 0"><h3>⬆️ Pangkat baharu! New rank:</h3><h2>${after.cur.icon} ${after.cur.name}</h2></div>` : ''}
    ${newBadges.map(b => `<div class="card" style="margin:8px 0"><div style="font-size:2rem">${b.ic}</div><b>Lencana baharu: ${b.n}</b><div class="muted">${b.d}</div></div>`).join('')}
    ${msgs.map(m => `<div class="pill" style="margin:3px">${m}</div>`).join('')}
    <div class="sp"></div><button class="btn big" data-a="${back.a}" data-id="${back.id || ''}" data-v="${back.v || ''}">Teruskan</button></div></div>`;
  quiz = null;
}

/* ───────────────────────── rendering ───────────────────────── */
function render() {
  fbEl.classList.remove('show');
  document.documentElement.setAttribute('data-theme', state.theme);
  const map = { home: vHome, map: vMap, world: vWorld, unit: vUnit, learn: vLearn, scrolls: vScrolls, scroll: vScroll, shop: vShop, me: vMe, roadmap: vRoadmap, settings: vSettings, report: vReport };
  if (map[view.name]) app.innerHTML = map[view.name]();
}

/* ───────────────────────── actions ───────────────────────── */
function wearItem(kind, id, toggle) {
  const e = state.equip;
  if (kind === 'set') { const c = SH.sets.find(x => x.id === id); state.equip = Object.assign({}, c.slots); return; }
  if (kind === 'aura') { if (toggle && e.aura === id) delete e.aura; else e.aura = id; return; }
  if (kind === 'item') { const [slot, emo] = id.split(':'); if (toggle && e[slot] === emo) delete e[slot]; else e[slot] = emo; }
}
const A = {
  tab: d => go(d.v),
  go: d => go(d.v),
  world: d => go('world', { id: d.id }),
  unit: d => go('unit', { id: d.id }),
  learn: d => { go('learn', { id: d.id, i: 0, flip: false }); setTimeout(() => say(UNIT[d.id].entries[0].ms), 200); },
  flip: () => { view.flip = !view.flip; const f = document.querySelector('.flip'); if (f) f.classList.toggle('on', view.flip); },
  lprev: () => { view.i = Math.max(0, view.i - 1); view.flip = false; render(); say(UNIT[view.id].entries[view.i].ms); },
  lnext: () => { const u = UNIT[view.id]; if (view.i >= u.entries.length - 1) { toast('Now try the mission! ⚔️'); return go('unit', { id: u.id }); } view.i++; view.flip = false; render(); say(u.entries[view.i].ms); },
  say: d => say(d.t),
  mission: d => { const u = UNIT[d.id]; startQuiz({ kind: 'unit', id: u.id, qs: buildUnitQuiz(u) }); },
  boss: d => { const ents = wordsOfWorld(d.id); startQuiz({ kind: 'boss', id: d.id, qs: buildMixedQuiz(ents, 15, true) }); },
  review: () => {
    let ents = dueWords(); if (ents.length < 8) {
      const seen = Object.keys(state.words).filter(k => WORDS[k]).map(k => WORDS[k]);
      const extra = prioritise(seen.filter(e => !ents.includes(e))); ents = ents.concat(extra.slice(0, 10 - ents.length));
    }
    if (!ents.length) { toast('Learn some words first! Try a mission.'); return go('map'); }
    startQuiz({ kind: 'review', id: 'review', qs: buildMixedQuiz(shuffle(ents).slice(0, 10), Math.min(10, Math.max(6, ents.length)), true) });
  },
  scroll: d => go('scroll', { id: d.id }),
  scrollquiz: d => { const s = D.scrolls.find(x => x.id === d.id); startQuiz({ kind: 'scroll', id: s.id, round: d.round || 1, qs: buildScrollQuiz(s, d.round || 1) }); },
  opt: d => {
    const c = quiz.cur; if (c.answered) return; const q = c.q; const i = +d.i; const ok = q.opts[i].ok;
    const btns = document.querySelectorAll('.opt'); btns.forEach((b, k) => { b.disabled = true; if (q.opts[k].ok) b.classList.add('right'); });
    if (!ok) btns[i].classList.add('wrong'); submit(ok, q);
  },
  hint: () => {
    const c = quiz.cur; if (c.answered || c.removed.length) return;
    if (quiz.freeHint > 0) quiz.freeHint--; else if (state.inv.hint > 0) state.inv.hint--; else return;
    const wrong = c.q.opts.map((o, i) => o.ok ? -1 : i).filter(i => i >= 0); c.removed = shuffle(wrong).slice(0, 2); save(); renderQuiz();
  },
  tok: d => { const c = quiz.cur; if (c.answered) return; const q = c.q; if (!c.ans.includes(+d.i)) c.ans.push(+d.i); renderQuiz(); },
  untok: d => { const c = quiz.cur; if (c.answered) return; c.ans.splice(+d.k, 1); renderQuiz(); },
  check: () => {
    const c = quiz.cur; if (c.answered) return; const q = c.q;
    if (q.kind === 'type') { const v = document.getElementById('tb').value; if (!v.trim()) return; const ok = norm(v) === norm(q.answer); const tb = document.getElementById('tb'); tb.disabled = true; tb.style.borderColor = ok ? 'var(--good)' : 'var(--bad)'; submit(ok, q); }
    else if (q.kind === 'order') { const got = c.ans.map(i => q.shuffled[i]).join(' '); submit(got === q.tokens.join(' '), q); }
  },
  next: () => nextQ(),
  quit: () => { if (confirm('Leave this mission? Progress in this round will be lost.')) { const back = { unit: ['unit', quiz.id], boss: ['world', quiz.id], scroll: ['scroll', quiz.id] }[quiz.kind]; quiz = null; fbEl.classList.remove('show'); back ? go(back[0], { id: back[1] }) : go('home'); } },
  welcome: () => { const v = document.getElementById('nm').value.trim(); if (v) state.name = v; state.welcomed = true; save(); render(); },
  arm: d => { state.armed = !state.armed; save(); render(); },
  shoptab: d => { view.tab = d.v; render(); },
  buy: d => {
    const cost = +d.cost; if (state.ryo < cost) { beep('no'); return toast('Not enough ryo yet – keep training! 💪'); }
    state.ryo -= cost; beep('coin');
    if (d.k === 'powers') state.inv[d.id]++; else state.own[d.k].push(d.id);
    if (d.k === 'themes') { state.theme = d.id; } if (d.k === 'avatars') state.avatar = d.id; if (d.k === 'titles') state.title = d.id;
    if (d.k === 'sets') wearItem('set', d.id); if (d.k === 'items') wearItem('item', d.id); if (d.k === 'auras') wearItem('aura', d.id);
    confetti(40); toast('Dibeli! Purchased ✔');
    const nb = checkBadges(); nb.forEach(b => toast('🏅 New badge: ' + b.n));
    save(); render();
  },
  slot: d => { view.slot = d.v; render(); },
  wear: d => { wearItem(d.k, d.id, true); const nb = checkBadges(); nb.forEach(b => toast('🏅 New badge: ' + b.n)); save(); render(); },
  strip: () => { state.equip = {}; save(); render(); },
  equip: d => { if (d.k === 'theme') state.theme = d.id; if (d.k === 'avatar') state.avatar = d.id; if (d.k === 'title') state.title = d.id; save(); render(); },
  claim: d => {
    const r = state.real[+d.i]; if (!r) return; if (state.ryo < r.cost) { beep('no'); return toast('Not enough ryo yet 💪'); }
    if (!confirm(`Claim "${r.name}" for ${r.cost} ryo?`)) return;
    state.ryo -= r.cost; state.claims.push({ name: r.name, cost: r.cost, date: ymd() }); confetti(80); beep('win'); toast('Claimed! Show a parent 🎉'); save(); render();
  },
  pin: () => { const v = document.getElementById('pin').value; if (v === state.pin) { view.ok = true; render(); } else { toast('Wrong PIN'); } },
  setpin: () => { const v = document.getElementById('newpin').value.trim(); if (v.length >= 4) { state.pin = v; save(); toast('PIN changed'); } else toast('PIN needs 4+ digits'); },
  addreal: () => { const n = document.getElementById('rname').value.trim(), c = +document.getElementById('rcost').value; if (!n || !(c > 0)) return toast('Enter a name and a cost'); state.real.push({ name: n, cost: Math.round(c) }); save(); render(); },
  delreal: d => { state.real.splice(+d.i, 1); save(); render(); },
  savesettings: () => {
    const n = document.getElementById('setname').value.trim(); if (n) state.name = n;
    state.settings.sound = document.getElementById('setsound').value === '1'; state.settings.speech = document.getElementById('setspeech').value === '1';
    state.settings.rate = +document.getElementById('setrate').value; save(); toast('Saved ✔'); render();
  },
  export: () => { const t = document.getElementById('io'); t.value = btoa(unescape(encodeURIComponent(JSON.stringify(state)))); t.select(); try { document.execCommand('copy'); toast('Copied – paste it on the other device'); } catch (e) { } },
  import: () => {
    try {
      const raw = document.getElementById('io').value.trim(); const o = JSON.parse(decodeURIComponent(escape(atob(raw))));
      if (!o || o.v !== 1) throw 0; if (!confirm('Replace progress on this device with the imported progress?')) return;
      state = Object.assign(defaults(), o); save(); toast('Imported ✔'); go('home');
    } catch (e) { toast('That does not look like valid progress text'); }
  },
  reset: () => { if (confirm('Erase ALL progress on this device?') && confirm('Really erase everything? This cannot be undone.')) { state = defaults(); try { localStorage.removeItem(KEY); } catch (e) { } go('home'); } }
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-a]'); if (!el) return;
  const f = A[el.dataset.a]; if (f) f(el.dataset, el);
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && quiz && quiz.cur && !quiz.cur.answered && quiz.cur.q.kind === 'type') A.check(); else if (e.key === 'Enter' && fbEl.classList.contains('show')) { A.next(); } });

/* expose a tiny hook for tests */
window.__bahasa = { quiz: () => quiz, state: () => state, go, A, D, WORDS, buildUnitQuiz, blankQ, orderQ };
render();
})();
