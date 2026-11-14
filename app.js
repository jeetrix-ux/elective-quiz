/* Elective Compass — app logic */
(function () {
  "use strict";

  const STORE = "electiveCompass.v1";
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clamp = (x, a = 0, b = 100) => Math.max(a, Math.min(b, x));
  const r0 = x => Math.round(x);
  const IDS = Object.keys(COURSES);

  /* ---------- state ---------- */
  function seededShuffle(arr, seed) {
    const a = arr.slice(); let s = seed >>> 0;
    const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function freshState() {
    const seed = Math.floor(Math.random() * 1e9);
    return {
      idx: 0, ans: {}, seed,
      topicOrder: seededShuffle(TOPICS.map((_, i) => i), seed),
      probeOrder: seededShuffle(PROBES.map((_, i) => i), seed + 7)
    };
  }
  let S;
  try { S = JSON.parse(localStorage.getItem(STORE)); } catch (e) { S = null; }
  if (!S || !S.topicOrder || S.topicOrder.length !== TOPICS.length || !S.probeOrder || S.probeOrder.length !== PROBES.length) S = freshState();
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } };
  save();

  /* ---------- screens ---------- */
  function buildScreens() {
    const sc = [{ kind: "intro" }];
    PART_A.forEach(q => sc.push({ kind: "A", part: 1, q }));
    PART_B.forEach(q => sc.push({ kind: "B", part: 2, q }));
    S.topicOrder.forEach(i => sc.push({ kind: "T", part: 3, i }));
    S.probeOrder.forEach(i => sc.push({ kind: "P", part: 4, i }));
    sc.push({ kind: "results" });
    return sc;
  }
  let SCREENS = buildScreens();
  const PART_NAMES = { 1: "Part 1 of 4 · About you", 2: "Part 2 of 4 · Scenarios", 3: "Part 3 of 4 · Blind syllabus taste test", 4: "Part 4 of 4 · Readiness check" };
  const partCount = p => SCREENS.filter(s => s.part === p).length;
  const partIndex = (i) => { const p = SCREENS[i].part; let n = 0; for (let k = 0; k <= i; k++) if (SCREENS[k].part === p) n++; return n; };

  const stage = $("#stage");
  let advTimer = null;

  function go(i) {
    clearTimeout(advTimer);
    S.idx = clamp(i, 0, SCREENS.length - 1); save(); render();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  const next = () => go(S.idx + 1);
  const back = () => go(S.idx - 1);
  const autoNext = () => { clearTimeout(advTimer); advTimer = setTimeout(next, 230); };

  function setProgress() {
    const sc = SCREENS[S.idx];
    const prog = $("#progress");
    if (!sc.part) { prog.classList.add("hidden"); return; }
    prog.classList.remove("hidden");
    $("#partLabel").textContent = PART_NAMES[sc.part];
    $("#countLabel").textContent = partIndex(S.idx) + " / " + partCount(sc.part);
    const total = SCREENS.length - 2;
    $("#barFill").style.width = (100 * (S.idx) / total).toFixed(1) + "%";
  }

  function navRow(canNext, nextLabel) {
    return `<div class="navrow">
      <button class="btn link" data-act="back">← Back</button>
      <button class="btn primary" data-act="next" ${canNext ? "" : "disabled"}>${nextLabel || "Next →"}</button>
    </div>`;
  }

  function render() {
    SCREENS = buildScreens();
    S.idx = clamp(S.idx | 0, 0, SCREENS.length - 1);
    const sc = SCREENS[S.idx];
    setProgress();
    if (sc.kind === "intro") return renderIntro();
    if (sc.kind === "A") return renderA(sc.q);
    if (sc.kind === "B") return renderB(sc.q);
    if (sc.kind === "T") return renderTopic(sc.i);
    if (sc.kind === "P") return renderProbe(sc.i);
    if (sc.kind === "results") return renderResults();
  }

  /* ---------- intro ---------- */
  function renderIntro() {
    const started = Object.keys(S.ans).length > 0;
    stage.innerHTML = `<div class="card hero">
      <h1>Pick your PE-II and PE-III with evidence, not vibes.</h1>
      <p class="lede">Around ${SCREENS.length - 2} quick taps, about 12–15 minutes. You get a decisive pick for each slot, the exact preference order to fill in the form, and the reasoning: interest, fit, grade outlook and hardware-job value.</p>
      <div class="parts">
        <div class="part"><b>1 · About you</b><span>Prerequisites, career targets, GATE, honors, maths/coding comfort, exam style, workload.</span></div>
        <div class="part"><b>2 · Scenarios</b><span>14 situational picks that reveal what you actually enjoy.</span></div>
        <div class="part"><b>3 · Blind syllabus taste test</b><span>${TOPICS.length} real topics from the 8 syllabi, shuffled with course names hidden. Rate each one.</span></div>
        <div class="part"><b>4 · Readiness check</b><span>${PROBES.length} short concept questions, 2 per course, to gauge how prepared you are.</span></div>
      </div>
      <div class="muted">PE-II options</div>
      <div class="chips">${SLOT_II.map(c => `<span class="chip">${esc(COURSES[c].short)}</span>`).join("")}</div>
      <div class="muted" style="margin-top:10px">PE-III options</div>
      <div class="chips">${SLOT_III.map(c => `<span class="chip">${esc(COURSES[c].short)}</span>`).join("")}</div>
      <div class="actions">
        <button class="btn primary" data-act="start">${started ? "Continue where you left off →" : "Start the quiz →"}</button>
        ${started ? `<button class="btn" data-act="reset">Start over</button>` : ""}
      </div>
    </div>`;
  }

  /* ---------- part A ---------- */
  function renderA(q) {
    const v = S.ans[q.id];
    let body = "";
    if (q.type === "single") {
      body = `<div class="opts">${q.options.map((o, i) =>
        `<button class="opt ${v === o.v ? "sel" : ""}" data-pick="${esc(o.v)}"><span class="k">${i + 1}</span><span>${esc(o.t)}</span></button>`).join("")}</div>`;
    } else if (q.type === "multi") {
      const arr = Array.isArray(v) ? v : [];
      body = `<div class="opts two">${q.options.map(o =>
        `<button class="opt ${arr.includes(o.v) ? "sel" : ""}" data-multi="${esc(o.v)}"><span>${esc(o.t)}</span></button>`).join("")}</div>
        <p class="muted" style="margin-top:10px">${arr.length}/${q.max} selected</p>`;
    } else if (q.type === "scale") {
      body = `<div class="scale">${[1, 2, 3, 4, 5].map(n => `<button class="opt ${v === n ? "sel" : ""}" data-scale="${n}">${n}</button>`).join("")}</div>
        <div class="scale-ends"><span>1 · ${esc(q.low)}</span><span>5 · ${esc(q.high)}</span></div>`;
    } else if (q.type === "grid") {
      const g = v || {};
      body = `<div class="grid-rows">${q.rows.map(r => `<div class="grow"><span class="lbl">${esc(r.t)}</span><div class="seg">
        ${[1, 2, 3, 4, 5].map(n => `<button class="${g[r.v] === n ? "sel" : ""}" data-grid="${r.v}" data-val="${n}" aria-label="${n}">${n}</button>`).join("")}
        <button class="na ${g[r.v] === 0 ? "sel" : ""}" data-grid="${r.v}" data-val="0">N/A</button></div></div>`).join("")}</div>
        <p class="muted" style="margin-top:8px">1 = disliked, 5 = loved</p>`;
    }
    const canNext = q.type === "multi" ? (Array.isArray(v) && v.length > 0)
      : q.type === "grid" ? true : v !== undefined;
    stage.innerHTML = `<div class="card qcard">
      <div class="qnum">About you</div>
      <h2 class="q">${esc(q.q)}</h2>
      ${q.hint ? `<p class="hint">${esc(q.hint)}</p>` : ""}
      ${body}
      ${navRow(canNext)}
    </div>`;
  }

  /* ---------- part B ---------- */
  function renderB(q) {
    const v = S.ans[q.id];
    stage.innerHTML = `<div class="card qcard">
      <div class="qnum">Scenario</div>
      <h2 class="q">${esc(q.q)}</h2>
      <div class="opts ${q.options.length > 5 ? "two" : ""}">${q.options.map((o, i) =>
        `<button class="opt ${v === i ? "sel" : ""}" data-b="${i}"><span class="k">${i + 1}</span><span>${esc(o.t)}</span></button>`).join("")}</div>
      ${navRow(v !== undefined)}
    </div>`;
  }

  /* ---------- part C ---------- */
  const RATES = [
    { v: 3, em: "😍", l: "Love it" }, { v: 2, em: "🙂", l: "Interested" },
    { v: 1, em: "😐", l: "Meh" }, { v: 0, em: "😖", l: "Dread it" }
  ];
  function renderTopic(i) {
    const t = TOPICS[i]; const key = "t" + i; const v = S.ans[key];
    stage.innerHTML = `<div class="card qcard">
      <div class="qnum">Would you enjoy studying this?</div>
      <div class="topic-title">${esc(t[1])}</div>
      <p class="topic-desc">${esc(t[2])}</p>
      <div class="rate">${RATES.map((r, k) => `<button class="opt ${v === r.v ? "sel" : ""}" data-t="${key}" data-val="${r.v}">
        <span class="em" aria-hidden="true">${r.em}</span><span class="rl">${r.l}</span><span class="k">${k + 1}</span></button>`).join("")}</div>
      <div class="opts" style="margin-top:8px"><button class="opt ghost ${v === null ? "sel" : ""}" data-t="${key}" data-val="skip"><span class="k">5</span><span>No idea what this is: skip</span></button></div>
      ${navRow(v !== undefined)}
    </div>`;
  }

  /* ---------- part D ---------- */
  function renderProbe(i) {
    const p = PROBES[i]; const key = "p" + i; const v = S.ans[key];
    stage.innerHTML = `<div class="card qcard">
      <div class="qnum">Quick check · no penalty for “don't know”</div>
      <h2 class="q">${esc(p.q)}</h2>
      <div class="opts">${p.options.map((o, k) =>
        `<button class="opt ${v === k ? "sel" : ""}" data-p="${key}" data-val="${k}"><span class="k">${k + 1}</span><span>${esc(o)}</span></button>`).join("")}
        <button class="opt ghost ${v === -1 ? "sel" : ""}" data-p="${key}" data-val="-1"><span class="k">5</span><span>Don't know</span></button></div>
      ${navRow(v !== undefined, S.idx === SCREENS.length - 2 ? "See my results →" : "Next →")}
    </div>`;
  }

  /* ---------- events ---------- */
  stage.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const sc = SCREENS[S.idx];
    if (b.dataset.act === "start") { if (S.idx === 0) next(); return; }
    if (b.dataset.act === "reset") { S = freshState(); save(); SCREENS = buildScreens(); render(); return; }
    if (b.dataset.act === "back") return back();
    if (b.dataset.act === "next") return next();
    if (b.dataset.act === "retake") { S = freshState(); save(); go(1); return; }
    if (b.dataset.act === "edit") return go(1);
    if (b.dataset.act === "copy") return copySummary(b);

    if (b.dataset.pick !== undefined) { S.ans[sc.q.id] = b.dataset.pick; save(); render(); autoNext(); return; }
    if (b.dataset.scale !== undefined) { S.ans[sc.q.id] = +b.dataset.scale; save(); render(); autoNext(); return; }
    if (b.dataset.multi !== undefined) {
      const arr = Array.isArray(S.ans[sc.q.id]) ? S.ans[sc.q.id].slice() : [];
      const v = b.dataset.multi; const at = arr.indexOf(v);
      if (v === "unsure") { S.ans[sc.q.id] = at >= 0 ? [] : ["unsure"]; }
      else {
        const u = arr.indexOf("unsure"); if (u >= 0) arr.splice(u, 1);
        const at2 = arr.indexOf(v);
        if (at2 >= 0) arr.splice(at2, 1); else if (arr.length < sc.q.max) arr.push(v);
        S.ans[sc.q.id] = arr;
      }
      save(); render(); return;
    }
    if (b.dataset.grid !== undefined) {
      const g = Object.assign({}, S.ans[sc.q.id] || {}); g[b.dataset.grid] = +b.dataset.val;
      S.ans[sc.q.id] = g; save(); render(); return;
    }
    if (b.dataset.b !== undefined) { S.ans[sc.q.id] = +b.dataset.b; save(); render(); autoNext(); return; }
    if (b.dataset.t !== undefined) { S.ans[b.dataset.t] = b.dataset.val === "skip" ? null : +b.dataset.val; save(); render(); autoNext(); return; }
    if (b.dataset.p !== undefined) { S.ans[b.dataset.p] = +b.dataset.val; save(); render(); autoNext(); return; }
  });

  document.addEventListener("keydown", e => {
    if ($("#tab-quiz").classList.contains("hidden")) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const sc = SCREENS[S.idx];
    if (e.key === "ArrowLeft" && S.idx > 0) return back();
    const n = parseInt(e.key, 10); if (!(n >= 1 && n <= 9)) return;
    const btns = [...stage.querySelectorAll(".opt")];
    if (sc.kind === "T") { const b = btns[n - 1]; if (b) b.click(); return; }
    if (["A", "B", "P"].includes(sc.kind) && sc.q?.type !== "grid" && sc.q?.type !== "multi") { const b = btns[n - 1]; if (b) b.click(); }
  });

  /* ============================================================
     SCORING
     ============================================================ */
  function compute(a) {
    const R = {}; IDS.forEach(c => R[c] = { c });

    // --- interest: scenarios
    const raw = {}, max = {}; IDS.forEach(c => { raw[c] = 0; max[c] = 0; });
    PART_B.forEach(q => {
      IDS.forEach(c => { max[c] += Math.max(0, ...q.options.map(o => o.w[c] || 0)); });
      const pick = a[q.id]; if (pick === undefined) return;
      const w = q.options[pick].w; IDS.forEach(c => raw[c] += (w[c] || 0));
    });
    IDS.forEach(c => R[c].scen = max[c] ? 100 * raw[c] / max[c] : 50);

    // --- interest: blind topics
    const tSum = {}, tN = {}, tLove = {}, tDread = {};
    IDS.forEach(c => { tSum[c] = 0; tN[c] = 0; tLove[c] = 0; tDread[c] = 0; });
    TOPICS.forEach((t, i) => {
      const v = a["t" + i]; if (v === undefined || v === null) return;
      tSum[t[0]] += v; tN[t[0]]++; if (v === 3) tLove[t[0]]++; if (v === 0) tDread[t[0]]++;
    });
    IDS.forEach(c => { R[c].topic = tN[c] ? 100 * tSum[c] / (3 * tN[c]) : 50; R[c].love = tLove[c]; R[c].dread = tDread[c]; R[c].tN = tN[c]; });

    // --- interest: prior courses
    const grid = a.prior || {}; const prow = PART_A.find(q => q.id === "prior").rows;
    IDS.forEach(c => {
      let s = 0, w = 0;
      prow.forEach(r => { const v = grid[r.v]; const ww = r.w[c] || 0; if (v && ww) { s += ww * (v - 1) / 4 * 100; w += ww; } });
      R[c].prior = w ? s / w : null;
    });
    IDS.forEach(c => {
      const x = R[c];
      x.interest = x.prior === null ? .45 * x.scen + .55 * x.topic : .35 * x.scen + .40 * x.topic + .25 * x.prior;
    });

    // --- fit
    const m = a.math || 3, k = a.code || 3;
    const fav = a.styleFav, avoid = a.styleAvoid;
    IDS.forEach(c => {
      const C = COURSES[c], x = R[c];
      x.mathfit = clamp(100 - Math.max(0, C.mathDemand - m) * 25 + Math.max(0, m - C.mathDemand) * 3);
      x.codefit = clamp(100 - Math.max(0, C.codeDemand - k) * 25);
      let st = 50;
      if (fav) st += 60 * (C.style[fav] || 0);
      if (avoid && avoid !== fav) st -= 60 * (C.style[avoid] || 0);
      x.stylefit = clamp(st);
      const parts = [[x.stylefit, .3], [x.mathfit, .3], [x.codefit, .2]];
      const gw = a.gate === "yes" ? .3 : a.gate === "maybe" ? .12 : 0;
      if (gw) parts.push([C.gate * 100, gw]);
      if (["h1", "h2", "h3"].includes(a.honors)) parts.push([C.honors[a.honors] * 100, .25]);
      x.fit = parts.reduce((s, p) => s + p[0] * p[1], 0) / parts.reduce((s, p) => s + p[1], 0);
    });

    // --- hardware-job value
    const hwRoles = Object.keys(ROLES).filter(r => r !== "sw");
    const mkt = {}; IDS.forEach(c => mkt[c] = hwRoles.reduce((s, r) => s + ROLES[r].demand * (COURSES[c].hw[r] || 0), 0));
    const mktMax = Math.max(...IDS.map(c => mkt[c]));
    const roles = (Array.isArray(a.roles) ? a.roles : []).filter(r => r !== "unsure");
    IDS.forEach(c => {
      const x = R[c]; x.market = 100 * mkt[c] / mktMax;
      if (roles.length) {
        const vals = roles.map(r => (COURSES[c].hw[r] || 0) * 100);
        x.career = .7 * Math.max(...vals) + .3 * vals.reduce((s, v) => s + v, 0) / vals.length;
        const onlySw = roles.every(r => r === "sw");
        x.job = onlySw ? x.career : .65 * x.career + .35 * x.market;
      } else { x.career = null; x.job = x.market; }
    });

    // --- readiness & prereqs
    IDS.forEach(c => {
      const x = R[c]; let got = 0, n = 0;
      PROBES.forEach((p, i) => { if (p.c !== c) return; n++; if (a["p" + i] === p.a) got++; });
      x.probe = n ? 100 * got / n : 50; x.probeGot = got; x.probeN = n;
      x.prereqOK = !(COURSES[c].prereq.includes("EC1321") && a.pe1 && a.pe1 !== "cmos");
      x.ready = .55 * x.probe + .25 * x.mathfit + .20 * x.codefit;
      if (!x.prereqOK) x.ready *= .5;
    });

    // --- grade outlook
    IDS.forEach(c => {
      const C = COURSES[c], x = R[c];
      x.grade = clamp(100 - C.difficulty * 13 + (x.ready - 50) * .45 + (x.stylefit - 50) * .25 - (C.competition - 3) * 6, 5, 97);
    });

    // --- final match
    const p = a.prio || 3, j = a.jobw || 3;
    const W = { I: 1.0, F: .55, G: .2 + .2 * (p - 1), J: .1 + .25 * (j - 1) };
    const Wsum = W.I + W.F + W.G + W.J;
    IDS.forEach(c => {
      const x = R[c];
      x.contrib = { I: W.I * x.interest / Wsum, F: W.F * x.fit / Wsum, G: W.G * x.grade / Wsum, J: W.J * x.job / Wsum };
      x.match = x.contrib.I + x.contrib.F + x.contrib.G + x.contrib.J;
      if (!x.prereqOK) x.match *= .6;
    });

    // --- pairs
    const synPref = a.syn || "balanced", load = a.load || "balanced";
    const pairs = [];
    SLOT_II.forEach(x => SLOT_III.forEach(y => {
      const syn = SYNERGY[x][y];
      let bonus = synPref === "reinforce" ? 2.2 * syn : synPref === "diversify" ? (syn > 0 ? -1.2 * syn : 0) : 1.0 * syn;
      let d = COURSES[x].difficulty + COURSES[y].difficulty - (syn >= 2 ? .5 : 0);
      const pen = load === "light" ? Math.max(0, d - 5) * 2.5 : load === "balanced" ? Math.max(0, d - 6.5) * 2 : 0;
      const blocked = !R[x].prereqOK || !R[y].prereqOK;
      if (blocked) bonus = Math.min(bonus, 0);
      pairs.push({ x, y, syn, bonus, pen, blocked, score: (R[x].match + R[y].match) / 2 + bonus - pen - (blocked ? 25 : 0) });
    }));
    pairs.sort((u, v) => v.score - u.score);
    const best = pairs[0], gap = pairs[0].score - pairs[1].score;

    const order = (slot, pick) => [pick].concat(slot.filter(c => c !== pick).sort((u, v) => (R[u].prereqOK ? 0 : 1) - (R[v].prereqOK ? 0 : 1) || R[v].match - R[u].match));
    const ordII = order(SLOT_II, best.x), ordIII = order(SLOT_III, best.y);

    // archetype by interest
    const clusters = [
      ["VLSI / chip design", (R.lpv.interest + R.vt.interest) / 2],
      ["Embedded systems", (R.ertos.interest + R.iot.interest) / 2],
      ["Software & AI", (R.ai.interest + R.web.interest) / 2],
      ["Signals, comms & control", (R.cell.interest + R.cs.interest) / 2]
    ].sort((u, v) => v[1] - u[1]);

    return { R, W, Wsum, pairs, best, gap, ordII, ordIII, clusters, roles };
  }

  /* ============================================================
     RESULTS
     ============================================================ */
  const seqBg = v => `background: rgba(var(--accent-rgb), ${(0.06 + 0.5 * clamp(v) / 100).toFixed(3)})`;
  const CMP = { I: "your interest", F: "fit with your strengths & style", G: "grade outlook", J: "hardware-job value" };

  function swing(R, w, r) {
    const d = Object.keys(CMP).map(k => [k, R[w].contrib[k] - R[r].contrib[k]]).sort((u, v) => v[1] - u[1]);
    return d.filter(z => z[1] > 0.4);
  }

  function slotReason(res, slot) {
    const { R } = res; const ord = slot === "II" ? res.ordII : res.ordIII;
    const w = ord[0], r = ord[1], W = R[w], C = COURSES[w];
    const bits = [];
    const sw = swing(R, w, r);
    if (sw.length) bits.push(`It beats <b>${esc(COURSES[r].short)}</b> mainly on ${sw.slice(0, 2).map(z => CMP[z[0]]).join(" and ")}.`);
    else bits.push(`It's close to <b>${esc(COURSES[r].short)}</b>; pairing synergy tipped it.`);
    if (W.tN) bits.push(`In the blind taste test you rated its topics ${r0(W.topic)}/100${W.love ? ` and loved ${W.love} of ${W.tN}` : ""}.`);
    if (W.probeN) bits.push(`Readiness check: ${W.probeGot}/${W.probeN} correct.`);
    if (res.roles.length && W.career !== null) bits.push(`Fit with the careers you picked: ${r0(W.career)}/100.`);
    if (w === "cs" && res.a.gate !== "no") bits.push(`Control Systems is a full GATE EC subject, and ECE has no core control course.`);
    if (w === "ai" && res.a.honors === "h1") bits.push(`It's a hard prerequisite for the Honors-1 ML course.`);
    return `<li><b>PE-${slot} → ${esc(C.short)}.</b> ${bits.join(" ")}</li>`;
  }

  function renderResults() {
    const a = S.ans;
    const res = compute(a); res.a = a;
    const { R, best, gap, pairs } = res;
    const conf = gap >= 6 ? ["Decisive", "var(--good)"] : gap >= 3 ? ["Clear lean", "var(--accent)"] : ["Close call", "var(--warn)"];
    const pairMatch = r0(best.score);
    const X = COURSES[best.x], Y = COURSES[best.y];

    // warnings
    const warns = [];
    if (a.pe1 && a.pe1 !== "cmos") warns.push(`You didn't take <b>CMOS VLSI Design (EC1321)</b>, which is the listed prerequisite for Low Power VLSI and Verification &amp; Testing. Both are heavily discounted here; check with the department before choosing either.`);
    [best.x, best.y].forEach(c => { if (R[c].probeN && R[c].probeGot === 0) warns.push(`You got 0/2 on the ${esc(COURSES[c].short)} readiness questions. Plan to revise its foundations in the first weeks.`); });
    if (best.y === "cell") warns.push(`Cellular &amp; Mobile also lists EC1304 Digital Communications, which you'll be taking in the same semester, so expect some early catch-up.`);
    if (best.pen > 2) warns.push(`This pair is demanding for the workload you chose. The next-best lighter pair is listed below.`);
    const anyAnswered = Object.keys(a).length > 0;
    if (!anyAnswered) warns.push("You haven't answered anything yet, so these are default results.");

    const formCol = (title, ord) => `<div class="formcol"><h4>${title}</h4><ol>${ord.map((c, i) =>
      `<li class="${i === 0 ? "first" : ""}"><span class="ord">${["1st", "2nd", "3rd", "4th"][i]}</span><span>${esc(COURSES[c].name)}</span><span class="sc">${r0(R[c].match)}</span></li>`).join("")}</ol></div>`;

    const barChart = (title, slot, pick) => {
      const sorted = slot.slice().sort((u, v) => R[v].match - R[u].match);
      const mx = 100;
      return `<div><p class="chart-title">${title}</p><div class="chart">${sorted.map(c => {
        const x = R[c];
        const tip = `<b>${esc(COURSES[c].short)}</b> · match ${r0(x.match)}<br>Interest ${r0(x.interest)} · Fit ${r0(x.fit)}<br>Grade outlook ${r0(x.grade)} · HW-job ${r0(x.job)}<br>Readiness ${r0(x.ready)}${x.prereqOK ? "" : "<br>⚠ prerequisite missing"}`;
        return `<div class="crow ${c === pick ? "" : "dim"}" data-tip="${esc(tip)}"><span class="cl">${esc(COURSES[c].short)}</span>
          <div class="track"><div class="fill" style="width:${(100 * x.match / mx).toFixed(1)}%"></div></div><span class="cv">${r0(x.match)}</span></div>`;
      }).join("")}</div></div>`;
    };

    const heatRow = c => { const x = R[c]; const pick = c === best.x || c === best.y;
      const cells = [x.interest, x.fit, x.ready, x.grade, x.job, x.match];
      return `<tr class="${pick ? "pickrow" : ""}"><td class="rl">${pick ? "★ " : ""}${esc(COURSES[c].short)}</td>${cells.map(v => `<td style="${seqBg(v)}">${r0(v)}</td>`).join("")}</tr>`; };

    const hwRoles = Object.keys(ROLES).filter(r => r !== "sw");
    const roleHeat = `<table class="heat"><thead><tr><th class="rl">Course</th>${hwRoles.map(r =>
      `<th class="${res.roles.includes(r) ? "hl" : ""}" title="${esc(ROLES[r].label)}">${esc(shortRole(r))}</th>`).join("")}<th>Market index</th></tr></thead><tbody>
      ${IDS.map(c => `<tr class="${c === best.x || c === best.y ? "pickrow" : ""}"><td class="rl">${esc(COURSES[c].short)}</td>${hwRoles.map(r => {
        const v = (COURSES[c].hw[r] || 0) * 100; return `<td style="${seqBg(v)}">${v ? r0(v) : "·"}</td>`; }).join("")}<td style="${seqBg(R[c].market)}"><b>${r0(R[c].market)}</b></td></tr>`).join("")}
      </tbody></table>`;

    const hwBestPair = pairs.slice().sort((u, v) => (R[v.x].market + R[v.y].market) - (R[u.x].market + R[u.y].market))
      .filter(p => R[p.x].prereqOK && R[p.y].prereqOK)[0];

    const probeReview = PROBES.map((p, i) => {
      const v = a["p" + i]; const ok = v === p.a;
      return `<div class="rv"><span class="${ok ? "ok" : "no"}">${ok ? "✓" : v === -1 ? "–" : "✗"}</span> <b>${esc(COURSES[p.c].short)}:</b> ${esc(p.q)}<br>
        <span class="muted">Answer: ${esc(p.options[p.a])}${!ok && v >= 0 ? ` · you chose: ${esc(p.options[v])}` : ""}</span></div>`;
    }).join("");

    stage.innerHTML = `
      <div class="card verdict">
        <div class="eyebrow">Your recommendation</div>
        <div class="picks">
          <div class="pick"><div class="slot">Professional Elective II</div><div class="nm">${esc(X.name)}</div><div class="cd">${X.code} · match ${r0(R[best.x].match)}</div></div>
          <div class="pick"><div class="slot">Professional Elective III</div><div class="nm">${esc(Y.name)}</div><div class="cd">${Y.code} · match ${r0(R[best.y].match)}</div></div>
        </div>
        <div class="statrow">
          <span class="badge"><span class="dot" style="background:${conf[1]}"></span>${conf[0]} · pair score ${pairMatch} (+${gap.toFixed(1)} over #2)</span>
          <span class="badge">Interest profile: ${esc(res.clusters[0][0])}</span>
        </div>
        <p style="margin:14px 0 0;color:var(--text-2)">${esc(SYNERGY_NOTE[best.x + "-" + best.y])}</p>
        ${warns.map(w => `<div class="warn">${w}</div>`).join("")}
      </div>

      <h2 class="h2">Fill the Google Form in this order</h2>
      <div class="formcols">${formCol("Professional Elective – II", res.ordII)}${formCol("Professional Elective – III", res.ordIII)}</div>
      <p class="muted">The 1st preference follows the best <i>pair</i>. The rest are ranked by individual match, so you're well covered if seats run out.</p>

      <h2 class="h2">Why these</h2>
      <ul class="why">${slotReason(res, "II")}${slotReason(res, "III")}
        <li><b>Your weighting:</b> interest ${pct(res.W.I / res.Wsum)}, fit ${pct(res.W.F / res.Wsum)}, grade outlook ${pct(res.W.G / res.Wsum)}, hardware-job value ${pct(res.W.J / res.Wsum)} (set by your CGPA and job-value sliders).</li>
      </ul>

      <h2 class="h2">Match scores</h2>
      <div class="card"><div class="charts2">${barChart("PE-II", SLOT_II, best.x)}${barChart("PE-III", SLOT_III, best.y)}</div>
        <p class="muted" style="margin:12px 0 0">Hover a bar for the breakdown. Match is out of 100.</p></div>

      <h2 class="h2">Full breakdown</h2>
      <div class="card tbl-wrap"><table class="heat"><thead><tr><th class="rl">Course</th><th>Interest</th><th>Fit</th><th>Readiness</th><th>Grade outlook</th><th>HW-job value</th><th>Match</th></tr></thead>
        <tbody>${SLOT_II.map(heatRow).join("")}<tr><td colspan="7" style="height:6px"></td></tr>${SLOT_III.map(heatRow).join("")}</tbody></table>
        <p class="muted" style="margin:10px 0 0">Interest = scenarios + blind topic ratings + how you liked prior courses. Fit = maths/coding comfort vs demand, exam style, GATE, honors. Readiness = probe answers + comfort. Grade outlook = difficulty, readiness, style match and class competition. HW-job value = your chosen careers + market demand.</p></div>

      <h2 class="h2">Best pairs</h2>
      <div class="pairs">${pairs.slice(0, 6).map((p, i) => `<div class="pair ${i === 0 ? "top" : ""}"><span class="rk">${i + 1}</span>
        <div><div class="pn">${esc(COURSES[p.x].short)} + ${esc(COURSES[p.y].short)}</div><div class="pnote">${esc(SYNERGY_NOTE[p.x + "-" + p.y])}${p.pen > 0 ? ` · workload penalty −${p.pen.toFixed(1)}` : ""}</div></div>
        <span class="ps">${r0(p.score)}</span></div>`).join("")}</div>

      <h2 class="h2">Hardware-job lens</h2>
      <div class="card">
        <p style="margin-top:0">How directly each course feeds each hardware role (0–100). Highlighted columns are the careers you picked. The <b>market index</b> weights every role by current demand: India's semiconductor design centres hire most for digital design and verification, then system software/firmware, with steady demand for DFT, physical design, analog/RF and embedded.</p>
        <div class="tbl-wrap">${roleHeat}</div>
        <p style="margin-bottom:0">Purely on hardware employability, the strongest pair <i>available to you</i> is <b>${esc(COURSES[hwBestPair.x].short)} + ${esc(COURSES[hwBestPair.y].short)}</b>.
        One honest caveat: none of these 8 teaches RTL design or UVM/SystemVerilog verification, which are the two biggest fresher hiring buckets. Build those through projects (RISC-V/FPGA work, a UVM testbench on GitHub) and later through PE-V ASIC Design, PE-VII CAD for IC Design or the Honors tracks. Electives decide what you can talk about in depth, and projects get you shortlisted.</p>
      </div>

      <h2 class="h2">Your two courses, in depth</h2>
      ${courseCard(best.x, true, R)}${courseCard(best.y, true, R)}
      <h2 class="h2">The other six</h2>
      ${IDS.filter(c => c !== best.x && c !== best.y).map(c => courseCard(c, false, R)).join("")}

      <h2 class="h2">Readiness check answers</h2>
      <div class="review">${probeReview}</div>

      <div class="actions">
        <button class="btn primary" data-act="copy">Copy summary</button>
        <button class="btn" data-act="edit">Change my answers</button>
        <button class="btn" data-act="retake">Retake from scratch</button>
      </div>`;
    window.__lastResult = res;
  }
  const pct = x => Math.round(100 * x) + "%";
  function shortRole(r) {
    return { rtl: "RTL", dv: "DV", dft: "DFT", pd: "PD", analog: "Analog/ mem", fw: "Firm- ware", psv: "Post-Si", rf: "RF/ wireless", auto: "Auto/ EV", mlhw: "ML-HW" }[r] || r;
  }

  function dots(v) { const n = Math.round(v); return `<span class="dots">${"●".repeat(n)}<span class="off">${"●".repeat(5 - n)}</span></span>`; }
  function courseCard(c, open, R) {
    const C = COURSES[c]; const x = R ? R[c] : null;
    const diffLbl = C.difficulty <= 2 ? "Light" : C.difficulty <= 3 ? "Moderate" : C.difficulty < 4 ? "Demanding" : "Hard";
    const compLbl = C.competition >= 4.5 ? "Very high" : C.competition >= 3.5 ? "High" : C.competition >= 3 ? "Medium" : "Lower";
    return `<details class="course" ${open ? "open" : ""}><summary>
      <div><div class="t">${esc(C.name)}</div><div class="m">${C.code} · PE-${C.slot} · 3-0-0 (3 credits)${x && x.match != null ? ` · your match ${r0(x.match)}` : ""}</div></div><span class="chev">›</span></summary>
      <div class="cbody">
        <div class="cmeta">
          <div class="cm"><div class="l">Difficulty (est.)</div><div class="v">${dots(C.difficulty)} ${diffLbl}</div></div>
          <div class="cm"><div class="l">Grading competition</div><div class="v">${compLbl}</div></div>
          <div class="cm"><div class="l">Prerequisites</div><div class="v" style="font-size:13px;font-weight:500">${esc(C.prereqText)}</div></div>
          <div class="cm"><div class="l">HW-job index</div><div class="v">${x ? r0(x.market) : "—"}</div></div>
        </div>
        <ul class="units">${C.units.map(u => `<li><b>${esc(u[0])}:</b> ${esc(u[1])}</li>`).join("")}</ul>
        <div class="cnotes">
          <p><span class="lb">Exam style:</span> ${C.examNote}</p>
          <p><span class="lb">Grading outlook:</span> ${C.gradeNote}</p>
          <p><span class="lb">Hardware interviews it prepares you for:</span> ${C.interview}</p>
          <p><span class="lb">Future electives & honors:</span> ${C.unlocks}</p>
          <p><span class="lb">Fit with 6th sem:</span> ${C.synergyCore}</p>
          <p><span class="lb">Bottom line:</span> ${C.verdict}</p>
          <p class="muted">Textbooks: ${esc(C.books)}</p>
        </div>
      </div></details>`;
  }

  function copySummary(btn) {
    const res = window.__lastResult; if (!res) return;
    const { R } = res; const n = c => COURSES[c].name;
    const lines = [
      "Elective Compass result",
      `PE-II: ${n(res.best.x)} (match ${r0(R[res.best.x].match)})`,
      `PE-III: ${n(res.best.y)} (match ${r0(R[res.best.y].match)})`,
      "",
      "PE-II preference order: " + res.ordII.map((c, i) => `${i + 1}. ${COURSES[c].short}`).join("  "),
      "PE-III preference order: " + res.ordIII.map((c, i) => `${i + 1}. ${COURSES[c].short}`).join("  "),
      "",
      "Scores (interest / fit / readiness / grade / hw-job / match):",
      ...IDS.map(c => `${COURSES[c].short}: ${[R[c].interest, R[c].fit, R[c].ready, R[c].grade, R[c].job, R[c].match].map(r0).join(" / ")}`)
    ];
    const txt = lines.join("\n");
    const done = () => { btn.textContent = "Copied ✓"; setTimeout(() => btn.textContent = "Copy summary", 1600); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done, () => fallback());
    else fallback();
    function fallback() { const t = document.createElement("textarea"); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ } t.remove(); }
  }

  /* ---------- tooltip ---------- */
  const tip = $("#tip");
  document.addEventListener("mousemove", e => {
    const t = e.target.closest("[data-tip]");
    if (!t) { tip.classList.remove("on"); return; }
    tip.innerHTML = t.dataset.tip; tip.classList.add("on");
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let x = e.clientX + 14, y = e.clientY + 14;
    if (x + w > window.innerWidth - 8) x = e.clientX - w - 14;
    if (y + h > window.innerHeight - 8) y = e.clientY - h - 14;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  });

  /* ---------- tabs ---------- */
  function showTab(name) {
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    ["quiz", "courses", "about"].forEach(n => $("#tab-" + n).classList.toggle("hidden", n !== name));
    window.scrollTo(0, 0);
  }
  document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));
  document.addEventListener("click", e => { const g = e.target.closest("[data-goto]"); if (g) { e.preventDefault(); showTab(g.dataset.goto); } });

  /* ---------- static panes ---------- */
  const fakeR = {}; (function () {
    const hwRoles = Object.keys(ROLES).filter(r => r !== "sw");
    const mkt = {}; IDS.forEach(c => mkt[c] = hwRoles.reduce((s, r) => s + ROLES[r].demand * (COURSES[c].hw[r] || 0), 0));
    const mx = Math.max(...IDS.map(c => mkt[c]));
    IDS.forEach(c => fakeR[c] = { market: 100 * mkt[c] / mx, match: null });
  })();
  $("#courseList").innerHTML =
    `<h2 class="h2" style="margin-top:8px">Professional Elective – II</h2>` + SLOT_II.map(c => courseCard(c, false, fakeR)).join("") +
    `<h2 class="h2">Professional Elective – III</h2>` + SLOT_III.map(c => courseCard(c, false, fakeR)).join("");

  $("#aboutPane").innerHTML = `<div class="about">
    <h1 class="h1">How the score works</h1>
    <p>Every course gets five sub-scores (0–100). They're combined into a <b>match</b> score, then every PE-II × PE-III pair is scored with synergy and workload adjustments. The best pair becomes your 1st preference in each slot.</p>
    <h2>1 · Interest</h2>
    <p>35% scenario picks, 40% blind syllabus taste test (real topics from the curriculum, course names hidden, so a course's reputation can't bias you), 25% how much you enjoyed related courses you've already taken.</p>
    <h2>2 · Fit</h2>
    <p>Your maths and coding comfort against each course's demand, how well its exam style matches your favourite (and avoids your least favourite), GATE relevance if you're writing GATE, and honors-track alignment.</p>
    <h2>3 · Readiness</h2>
    <p>Two foundation questions per course (55%) plus maths/coding comfort. A missing prerequisite (EC1321 for Low Power VLSI and Verification &amp; Testing) halves readiness and cuts the final match by 40%.</p>
    <h2>4 · Grade outlook</h2>
    <p><code>100 − 13×difficulty + 0.45×(readiness−50) + 0.25×(style fit−50) − 6×(competition−3)</code>. Difficulty (1–5) is estimated from each syllabus: maths depth, abstraction, breadth, and overlap with courses you've done. Competition estimates how strong and large the class is likely to be under relative grading. <b>These are estimates, not NITW grade data.</b> Instructor allotment changes grading more than anything else, so ask your seniors who's teaching each course this year.</p>
    <h2>5 · Hardware-job value</h2>
    <p>Each course is mapped (0–1) to 10 hardware roles. The <b>market index</b> weights roles by demand in 2025–26 Indian hiring reports: digital design and verification highest, firmware/system software next, then DFT, physical design, analog/RF, automotive/EV and post-silicon validation. If you pick target careers, 65% of this score comes from those roles and 35% from the market index.</p>
    <h2>Weights</h2>
    <p>Interest 1.0 · Fit 0.55 · Grade 0.2–1.0 (CGPA slider) · Job 0.1–1.1 (job-value slider), normalised to sum to 1.</p>
    <h2>Pairs</h2>
    <p>Synergy between the two picks (e.g. ERTOS+IoT, Low Power VLSI+V&amp;T) is rewarded if you want to reinforce, rewarded less if you're indifferent, and penalised if you want to diversify. Pairs whose combined difficulty exceeds your workload appetite are penalised. Strongly overlapping pairs count as a bit lighter.</p>
    <h2>Confidence</h2>
    <p><b>Decisive</b> means the best pair leads #2 by 6+ points, <b>clear lean</b> 3–6, <b>close call</b> under 3. On a close call, let the instructor and your gut decide.</p>
    <h2>Sources</h2>
    <ul>
      <li>NIT Warangal, B.Tech ECE Curriculum 2024-25 (course syllabi, prerequisites, elective and honors lists).</li>
      <li><a href="https://www.hrkatha.com/news/indias-semiconductor-gccs-show-signs-of-recovery-after-hiring-slowdown/" target="_blank" rel="noopener">HR Katha: India's semiconductor GCCs show signs of recovery (Careernet)</a></li>
      <li><a href="https://www.entrepreneur.com/en-in/news-and-trends/indian-semiconductor-design-gccs-see-15-decline-in-job/492260" target="_blank" rel="noopener">Entrepreneur India: Semiconductor design GCC talent demand</a></li>
      <li><a href="https://www.communicationstoday.co.in/?p=374154" target="_blank" rel="noopener">Communications Today: GCCs shift to specialised roles</a></li>
      <li><a href="https://visionias.in/current-affairs/upsc-daily-news-summary/article/2026-02-25/the-economic-times/economy/indias-semicon-business-push-triggers-race-for-domain-experts" target="_blank" rel="noopener">ET via Vision IAS: Semicon push triggers race for domain experts (Feb 2026)</a></li>
      <li><a href="https://www.emertxe.com/news/2026/04/10/embedded-systems-placement-report-q1-2026/" target="_blank" rel="noopener">Emertxe: Embedded systems placement report Q1 2026</a></li>
    </ul>
  </div>`;

  render();
})();
