#!/usr/bin/env node
/**
 * Builds progress/index.html - a single self-contained page showing cohort
 * progress: the participant x session matrix, per-person standing, and the
 * quality findings from check-submissions.js.
 *
 * No dependencies, no build step, no network. Open the file directly, serve it
 * from GitHub Pages, or publish it as an artifact.
 *
 * Usage: node scripts/generate-html-report.js
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const SESSIONS_DIR = path.join(ROOT, "Sessions");
const OUT = path.join(ROOT, "progress", "index.html");

const sessions = require("./session-data.json");
const { participants: ROSTER } = require("./roster.json");

const PLACEHOLDERS = new Set([".gitkeep", "placeholder.md", ".DS_Store", "Thumbs.db"]);
const TODAY = new Date();

// ---------------------------------------------------------------- data
function countFiles(dir) {
  if (!fs.existsSync(dir)) return { files: 0, exists: false };
  let files = 0;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    for (const e of fs.readdirSync(cur, { withFileTypes: true })) {
      if (e.name === "Artifacts") continue;
      const full = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (!PLACEHOLDERS.has(e.name)) files++;
    }
  }
  return { files, exists: true };
}

// A core session is "due" once its date has passed. Optional sessions are
// self-paced, so they are never overdue.
function sessionDue(s) {
  if (s.type !== "Core") return false;
  const parsed = new Date(s.date.replace(/^\w+,\s*/, ""));
  return !isNaN(parsed) && parsed < TODAY;
}

const enriched = sessions.map((s) => ({
  folder: s.folder,
  label: s.label,
  short: s.label.replace("Optional Session ", "Opt-").replace("Week ", "W"),
  date: s.date,
  type: s.type,
  module: s.module,
  topic: s.topic,
  owner: s.owner,
  due: sessionDue(s),
  required: (s.deliverables || []).length,
}));

const grid = {};
for (const p of ROSTER) {
  grid[p] = {};
  for (const s of enriched) {
    grid[p][s.folder] = countFiles(path.join(SESSIONS_DIR, s.folder, p));
  }
}

// Pull the quality findings straight from the checker so there is one source
// of truth for what counts as a problem.
let findings = [];
try {
  execFileSync(process.execPath, [path.join(__dirname, "check-submissions.js")], {
    cwd: ROOT,
    stdio: "ignore",
  });
  const report = fs.readFileSync(path.join(ROOT, "progress", "CHECK-REPORT.md"), "utf8");
  const re = /^\|\s*(ERROR|WARN)\s*\|\s*([^|]+?)\s*\|\s*`([^`]*)`\s*\|\s*(.+?)\s*\|$/gm;
  let m;
  let section = "";
  for (const line of report.split("\n")) {
    if (line.startsWith("## ")) section = line.slice(3).trim();
    re.lastIndex = 0;
    const hit = re.exec(line);
    if (hit) {
      findings.push({
        level: hit[1],
        session: section,
        participant: hit[2],
        file: hit[3],
        message: hit[4].replace(/\\\|/g, "|"),
      });
    }
  }
} catch (err) {
  console.warn("Could not run check-submissions.js; findings section will be empty.");
}

const coreSessions = enriched.filter((s) => s.type === "Core");
const optSessions = enriched.filter((s) => s.type === "Optional");
const dueCore = coreSessions.filter((s) => s.due);

const standing = ROSTER.map((p) => {
  const coreDone = dueCore.filter((s) => grid[p][s.folder].files > 0).length;
  const optDone = optSessions.filter((s) => grid[p][s.folder].files > 0).length;
  const totalFiles = enriched.reduce((n, s) => n + grid[p][s.folder].files, 0);
  const errs = findings.filter((f) => f.participant === p && f.level === "ERROR").length;
  const warns = findings.filter((f) => f.participant === p && f.level === "WARN").length;
  return { name: p, coreDone, optDone, totalFiles, errs, warns };
});

const fullyUpToDate = standing.filter((s) => s.coreDone === dueCore.length);
const noSubmissions = standing.filter((s) => s.totalFiles === 0);
const behind = standing.filter((s) => s.coreDone < dueCore.length && s.totalFiles > 0);

// ---------------------------------------------------------------- helpers
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nice = (p) => p.replace(/-/g, " ");
const pct = (n, d) => (d === 0 ? 0 : Math.round((n / d) * 100));

const stamp = TODAY.toISOString().split("T")[0];

// ---------------------------------------------------------------- matrix
function matrixRows() {
  return ROSTER.map((p) => {
    const cells = enriched
      .map((s) => {
        const cell = grid[p][s.folder];
        let cls = "none";
        let title = `${nice(p)} — ${s.label}: nothing submitted`;
        if (cell.files > 0) {
          cls = "done";
          title = `${nice(p)} — ${s.label}: ${cell.files} file${cell.files === 1 ? "" : "s"}`;
        } else if (!cell.exists) {
          cls = "nofolder";
          title = `${nice(p)} — ${s.label}: no folder (cannot submit)`;
        } else if (!s.due) {
          cls = "future";
          title = `${nice(p)} — ${s.label}: not due yet`;
        } else {
          cls = "missing";
          title = `${nice(p)} — ${s.label}: DUE, nothing submitted`;
        }
        const err = findings.some(
          (f) => f.participant === p && f.session === s.folder && f.level === "ERROR"
        );
        return `<td class="cell ${cls}${err ? " flagged" : ""}" title="${esc(title)}" data-type="${s.type}"><span></span></td>`;
      })
      .join("");
    const st = standing.find((x) => x.name === p);
    const ratio = `${st.coreDone}/${dueCore.length}`;
    const state =
      st.totalFiles === 0 ? "crit" : st.coreDone === dueCore.length ? "good" : "warn";
    return `<tr>
      <th scope="row" class="rowhead"><span class="pname">${esc(nice(p))}</span></th>
      ${cells}
      <td class="tally"><span class="pill ${state}">${ratio}</span></td>
    </tr>`;
  }).join("\n");
}

const headCells = enriched
  .map(
    (s) =>
      `<th scope="col" class="colhead ${s.due ? "past" : "ahead"}" data-type="${s.type}" title="${esc(
        `${s.label} · ${s.date} · ${s.topic} · owner: ${s.owner}`
      )}"><span>${esc(s.short)}</span></th>`
  )
  .join("");

// ---------------------------------------------------------------- sections
const standingRows = [...standing]
  .sort((a, b) => b.coreDone - a.coreDone || a.name.localeCompare(b.name))
  .map((s) => {
    const state = s.totalFiles === 0 ? "crit" : s.coreDone === dueCore.length ? "good" : "warn";
    const label = s.totalFiles === 0 ? "No submissions" : s.coreDone === dueCore.length ? "Up to date" : `${dueCore.length - s.coreDone} behind`;
    return `<tr>
      <td class="who">${esc(nice(s.name))}</td>
      <td class="num">${s.coreDone} <span class="of">/ ${dueCore.length}</span></td>
      <td class="bar"><div class="track"><div class="fill ${state}" style="width:${pct(s.coreDone, dueCore.length)}%"></div></div></td>
      <td class="num">${s.optDone}</td>
      <td class="num">${s.totalFiles}</td>
      <td class="num">${s.errs ? `<span class="chip crit">${s.errs}</span>` : "<span class=\"zero\">0</span>"}</td>
      <td class="num">${s.warns ? `<span class="chip warn">${s.warns}</span>` : "<span class=\"zero\">0</span>"}</td>
      <td><span class="pill ${state}">${label}</span></td>
    </tr>`;
  })
  .join("\n");

const findingGroups = {};
for (const f of findings) (findingGroups[f.session] ||= []).push(f);

const findingsHtml = Object.keys(findingGroups).length
  ? Object.entries(findingGroups)
      .map(([session, items]) => {
        const s = enriched.find((x) => x.folder === session);
        const errs = items.filter((i) => i.level === "ERROR").length;
        const rows = items
          .sort((a, b) => a.level.localeCompare(b.level) || a.participant.localeCompare(b.participant))
          .map(
            (f) => `<tr class="f-${f.level.toLowerCase()}">
              <td><span class="chip ${f.level === "ERROR" ? "crit" : "warn"}">${f.level}</span></td>
              <td class="who">${esc(nice(f.participant))}</td>
              <td class="mono">${esc(f.file)}</td>
              <td>${esc(f.message)}</td>
            </tr>`
          )
          .join("");
        return `<details class="fgroup"${errs ? " open" : ""}>
          <summary>
            <span class="fname">${esc(s ? `${s.label} — ${s.topic}` : session)}</span>
            <span class="fcount">${items.length} finding${items.length === 1 ? "" : "s"}${errs ? ` · ${errs} error${errs === 1 ? "" : "s"}` : ""}</span>
          </summary>
          <div class="scroller"><table class="ftable">
            <thead><tr><th>Level</th><th>Participant</th><th>File</th><th>Finding</th></tr></thead>
            <tbody>${rows}</tbody>
          </table></div>
        </details>`;
      })
      .join("\n")
  : `<p class="empty">No findings — every submission matches its Session Guide.</p>`;

const sessionRows = enriched
  .map((s) => {
    const submitted = ROSTER.filter((p) => grid[p][s.folder].files > 0).length;
    const state = !s.due ? "ahead" : submitted === ROSTER.length ? "good" : submitted === 0 ? "crit" : "warn";
    return `<tr data-type="${s.type}">
      <td class="mono tight">${esc(s.short)}</td>
      <td class="who">${esc(s.topic)}</td>
      <td>${esc(s.module.replace(/^Module \d+: /, ""))}</td>
      <td>${esc(s.owner)}</td>
      <td class="tight">${esc(s.date)}</td>
      <td class="num">${s.required || "—"}</td>
      <td class="num">${s.due || submitted ? `${submitted} <span class="of">/ ${ROSTER.length}</span>` : "—"}</td>
      <td><span class="pill ${state}">${!s.due ? "Upcoming" : `${pct(submitted, ROSTER.length)}%`}</span></td>
    </tr>`;
  })
  .join("\n");

// ---------------------------------------------------------------- page
const html = `<title>Cohort Progress Board</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root {
    --bg: #f4f6f8;
    --surface: #ffffff;
    --surface-2: #eef1f5;
    --line: #d8dee6;
    --line-soft: #e7ebf0;
    --ink: #14181d;
    --ink-2: #47535f;
    --muted: #6b7885;
    --accent: #1f4e79;
    --accent-soft: #e4edf6;
    --good: #1b7f4b;
    --good-soft: #e0f0e7;
    --warn: #a8620a;
    --warn-soft: #fbeddc;
    --crit: #a5232b;
    --crit-soft: #fbe4e5;
    --radius: 6px;
    --shadow: 0 1px 2px rgba(20, 24, 29, .06), 0 1px 8px rgba(20, 24, 29, .04);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg: #101418;
      --surface: #171c22;
      --surface-2: #1e242b;
      --line: #2c343d;
      --line-soft: #232a32;
      --ink: #e8edf2;
      --ink-2: #b3bfcb;
      --muted: #8b98a5;
      --accent: #7fa9d4;
      --accent-soft: #1c2b3a;
      --good: #4caf7d;
      --good-soft: #16301f;
      --warn: #d99a3e;
      --warn-soft: #322411;
      --crit: #e06c74;
      --crit-soft: #351a1d;
      --shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 1px 8px rgba(0, 0, 0, .25);
    }
  }
  :root[data-theme="dark"] {
    --bg: #101418;
    --surface: #171c22;
    --surface-2: #1e242b;
    --line: #2c343d;
    --line-soft: #232a32;
    --ink: #e8edf2;
    --ink-2: #b3bfcb;
    --muted: #8b98a5;
    --accent: #7fa9d4;
    --accent-soft: #1c2b3a;
    --good: #4caf7d;
    --good-soft: #16301f;
    --warn: #d99a3e;
    --warn-soft: #322411;
    --crit: #e06c74;
    --crit-soft: #351a1d;
    --shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 1px 8px rgba(0, 0, 0, .25);
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: "IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, sans-serif;
    font-size: 15px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 1240px; margin: 0 auto; padding: 40px 24px 80px; display: flex; flex-direction: column; gap: 40px; }

  h1, h2, h3 { font-family: Archivo, ui-sans-serif, system-ui, sans-serif; margin: 0; text-wrap: balance; letter-spacing: -0.01em; }
  h1 { font-size: clamp(28px, 4vw, 40px); font-weight: 700; line-height: 1.1; }
  h2 { font-size: 20px; font-weight: 600; }
  p { margin: 0; }

  .eyebrow {
    font-family: "IBM Plex Mono", ui-monospace, monospace;
    font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .14em;
    color: var(--accent);
  }
  .lede { color: var(--ink-2); max-width: 66ch; }
  .meta { color: var(--muted); font-size: 13px; font-family: "IBM Plex Mono", monospace; }

  header.masthead { display: flex; flex-direction: column; gap: 10px; border-bottom: 2px solid var(--ink); padding-bottom: 22px; }

  section { display: flex; flex-direction: column; gap: 14px; }
  .shead { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-bottom: 1px solid var(--line); padding-bottom: 8px; }
  .shead p { color: var(--muted); font-size: 13px; }

  /* ---- stat tiles ---- */
  .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; }
  .tile {
    background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
    padding: 16px 18px; display: flex; flex-direction: column; gap: 4px;
    border-top: 3px solid var(--accent); box-shadow: var(--shadow);
  }
  .tile.is-good { border-top-color: var(--good); }
  .tile.is-warn { border-top-color: var(--warn); }
  .tile.is-crit { border-top-color: var(--crit); }
  .tile .n { font-family: Archivo, sans-serif; font-size: 30px; font-weight: 700; line-height: 1; font-variant-numeric: tabular-nums; }
  .tile .k { font-size: 12px; text-transform: uppercase; letter-spacing: .09em; color: var(--muted); font-weight: 500; }
  .tile .sub { font-size: 12px; color: var(--ink-2); }

  /* ---- shared table furniture ---- */
  .card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
  .scroller { overflow-x: auto; }
  table { border-collapse: separate; border-spacing: 0; width: 100%; font-size: 13.5px; }
  th, td { text-align: left; padding: 9px 12px; border-bottom: 1px solid var(--line-soft); }
  thead th {
    background: var(--surface-2); color: var(--ink-2); font-family: "IBM Plex Mono", monospace;
    font-size: 10.5px; font-weight: 500; text-transform: uppercase; letter-spacing: .1em;
    position: sticky; top: 0; z-index: 2; border-bottom: 1px solid var(--line); white-space: nowrap;
  }
  tbody tr:last-child td, tbody tr:last-child th { border-bottom: 0; }
  tbody tr:hover td, tbody tr:hover th { background: var(--accent-soft); }
  .num { text-align: right; font-variant-numeric: tabular-nums; font-family: "IBM Plex Mono", monospace; white-space: nowrap; }
  .of { color: var(--muted); font-size: .85em; }
  .zero { color: var(--muted); }
  .who { font-weight: 500; white-space: nowrap; }
  .mono { font-family: "IBM Plex Mono", monospace; font-size: 12px; color: var(--ink-2); word-break: break-all; }
  .tight { white-space: nowrap; }

  /* ---- state chips ---- */
  .pill, .chip {
    display: inline-block; font-family: "IBM Plex Mono", monospace; font-size: 11px; font-weight: 500;
    padding: 2px 8px; border-radius: 100px; white-space: nowrap; border: 1px solid transparent;
  }
  .pill.good, .chip.good { background: var(--good-soft); color: var(--good); border-color: var(--good); }
  .pill.warn, .chip.warn { background: var(--warn-soft); color: var(--warn); border-color: var(--warn); }
  .pill.crit, .chip.crit { background: var(--crit-soft); color: var(--crit); border-color: var(--crit); }
  .pill.ahead { background: var(--surface-2); color: var(--muted); border-color: var(--line); }

  /* ---- progress bars ---- */
  .bar { width: 130px; }
  .track { height: 6px; background: var(--surface-2); border-radius: 100px; overflow: hidden; border: 1px solid var(--line-soft); }
  .fill { height: 100%; border-radius: 100px; }
  .fill.good { background: var(--good); }
  .fill.warn { background: var(--warn); }
  .fill.crit { background: var(--crit); }

  /* ---- the matrix ---- */
  .matrix { font-size: 12px; }
  .matrix th.rowhead {
    position: sticky; left: 0; z-index: 3; background: var(--surface);
    border-right: 1px solid var(--line); font-weight: 500; white-space: nowrap;
    text-align: left; font-family: "IBM Plex Sans", sans-serif; font-size: 13px;
    text-transform: none; letter-spacing: 0; color: var(--ink); top: auto;
  }
  .matrix tbody tr:hover th.rowhead { background: var(--accent-soft); }
  .matrix thead th.colhead {
    padding: 8px 0; width: 26px; min-width: 26px; text-align: center;
    font-size: 9.5px; letter-spacing: .04em;
  }
  .matrix thead th.colhead.ahead { color: var(--muted); }
  .matrix thead th:first-child { position: sticky; left: 0; z-index: 4; background: var(--surface-2); border-right: 1px solid var(--line); }
  .matrix td.cell { padding: 0; width: 26px; min-width: 26px; height: 26px; text-align: center; border-bottom: 1px solid var(--line-soft); }
  .matrix td.cell span { display: block; width: 12px; height: 12px; margin: 0 auto; border-radius: 3px; }
  .cell.done span { background: var(--good); }
  .cell.missing span { background: var(--crit-soft); border: 1px solid var(--crit); }
  .cell.none span, .cell.future span { background: var(--surface-2); border: 1px solid var(--line); }
  .cell.nofolder span { background: repeating-linear-gradient(45deg, var(--crit) 0 2px, transparent 2px 4px); border: 1px solid var(--crit); }
  .cell.flagged span { box-shadow: 0 0 0 2px var(--warn); }
  .matrix td.tally { text-align: right; white-space: nowrap; border-left: 1px solid var(--line); }

  .legend { display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 12px; color: var(--ink-2); }
  .legend span { display: inline-flex; align-items: center; gap: 6px; }
  .legend i { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
  .lg-done { background: var(--good); }
  .lg-missing { background: var(--crit-soft); border: 1px solid var(--crit); }
  .lg-future { background: var(--surface-2); border: 1px solid var(--line); }
  .lg-nofolder { background: repeating-linear-gradient(45deg, var(--crit) 0 2px, transparent 2px 4px); border: 1px solid var(--crit); }
  .lg-flag { background: var(--good); box-shadow: 0 0 0 2px var(--warn); }

  /* ---- findings ---- */
  .fgroup { border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); overflow: hidden; box-shadow: var(--shadow); }
  .fgroup + .fgroup { margin-top: 10px; }
  .fgroup summary {
    cursor: pointer; padding: 12px 16px; display: flex; justify-content: space-between;
    align-items: baseline; gap: 14px; flex-wrap: wrap; background: var(--surface-2);
  }
  .fgroup summary:hover { background: var(--accent-soft); }
  .fgroup summary::marker { color: var(--accent); }
  .fname { font-family: Archivo, sans-serif; font-weight: 600; font-size: 14px; }
  .fcount { font-family: "IBM Plex Mono", monospace; font-size: 11px; color: var(--muted); }
  .ftable td { vertical-align: top; }
  .empty { color: var(--muted); padding: 16px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); }

  /* ---- controls ---- */
  .controls { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .controls button {
    font-family: "IBM Plex Mono", monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .08em;
    padding: 5px 12px; border-radius: 100px; border: 1px solid var(--line);
    background: var(--surface); color: var(--ink-2); cursor: pointer;
  }
  .controls button:hover { border-color: var(--accent); color: var(--accent); }
  .controls button[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: var(--surface); }
  :root[data-theme="dark"] .controls button[aria-pressed="true"],
  .controls button[aria-pressed="true"] { color: var(--bg); }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .hide-optional [data-type="Optional"] { display: none; }

  footer { border-top: 1px solid var(--line); padding-top: 18px; color: var(--muted); font-size: 12.5px; display: flex; flex-direction: column; gap: 6px; }
  code { font-family: "IBM Plex Mono", monospace; font-size: .9em; background: var(--surface-2); padding: 1px 5px; border-radius: 3px; border: 1px solid var(--line-soft); }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
  @media (max-width: 640px) { .wrap { padding: 24px 14px 60px; } .bar { width: 80px; } }
</style>

<div class="wrap">
  <header class="masthead">
    <p class="eyebrow">QA Playwright &amp; JavaScript Training</p>
    <h1>Cohort Progress Board</h1>
    <p class="lede">Assignment submissions across ${coreSessions.length} core weeks and ${optSessions.length} optional sessions, for ${ROSTER.length} participants. Submission counts come from the files in each participant folder; the findings below come from checking those files against each Session Guide.</p>
    <p class="meta">Generated ${stamp} · ${dueCore.length} of ${coreSessions.length} core sessions due so far</p>
  </header>

  <section>
    <div class="shead"><h2>Where the cohort stands</h2><p>Against the ${dueCore.length} core sessions that have already run</p></div>
    <div class="tiles">
      <div class="tile is-good">
        <span class="k">Up to date</span>
        <span class="n">${fullyUpToDate.length}</span>
        <span class="sub">of ${ROSTER.length} have submitted every due week</span>
      </div>
      <div class="tile is-warn">
        <span class="k">Behind</span>
        <span class="n">${behind.length}</span>
        <span class="sub">have submitted something, but not everything</span>
      </div>
      <div class="tile is-crit">
        <span class="k">Nothing submitted</span>
        <span class="n">${noSubmissions.length}</span>
        <span class="sub">${noSubmissions.length ? esc(noSubmissions.map((s) => nice(s.name)).join(", ")) : "—"}</span>
      </div>
      <div class="tile">
        <span class="k">Files submitted</span>
        <span class="n">${standing.reduce((n, s) => n + s.totalFiles, 0)}</span>
        <span class="sub">across all sessions</span>
      </div>
      <div class="tile is-crit">
        <span class="k">Open errors</span>
        <span class="n">${findings.filter((f) => f.level === "ERROR").length}</span>
        <span class="sub">need a decision, not a nudge</span>
      </div>
      <div class="tile is-warn">
        <span class="k">Warnings</span>
        <span class="n">${findings.filter((f) => f.level === "WARN").length}</span>
        <span class="sub">missing deliverables, naming, structure</span>
      </div>
    </div>
  </section>

  <section id="matrix">
    <div class="shead"><h2>Submission matrix</h2><p>Hover any square for detail</p></div>
    <div class="controls">
      <button type="button" id="toggleOptional" aria-pressed="false">Hide optional sessions</button>
    </div>
    <div class="legend">
      <span><i class="lg-done"></i> Submitted</span>
      <span><i class="lg-missing"></i> Due, nothing submitted</span>
      <span><i class="lg-future"></i> Not due yet</span>
      <span><i class="lg-nofolder"></i> No folder — cannot submit</span>
      <span><i class="lg-flag"></i> Submitted, but flagged</span>
    </div>
    <div class="card"><div class="scroller">
      <table class="matrix">
        <thead><tr><th scope="col">Participant</th>${headCells}<th scope="col" class="num">Due</th></tr></thead>
        <tbody>
${matrixRows()}
        </tbody>
      </table>
    </div></div>
  </section>

  <section>
    <div class="shead"><h2>Individual standing</h2><p>Sorted by core sessions completed</p></div>
    <div class="card"><div class="scroller">
      <table>
        <thead><tr>
          <th>Participant</th><th class="num">Core due</th><th>Progress</th>
          <th class="num">Optional</th><th class="num">Files</th>
          <th class="num">Errors</th><th class="num">Warnings</th><th>Status</th>
        </tr></thead>
        <tbody>
${standingRows}
        </tbody>
      </table>
    </div></div>
  </section>

  <section>
    <div class="shead"><h2>Findings by session</h2><p>From <code>node scripts/check-submissions.js</code></p></div>
    <p class="lede">Errors are things that need a human decision — a possible copy, an empty file, a folder name git sees as a second person. Warnings are process drift: a missing deliverable, a generic filename, an unexpected subfolder. A copy flag is a prompt to look, not a verdict.</p>
    ${findingsHtml}
  </section>

  <section>
    <div class="shead"><h2>Session index</h2><p>The full curriculum, with submission rate per session</p></div>
    <div class="card"><div class="scroller">
      <table id="sessionTable">
        <thead><tr>
          <th>Ref</th><th>Topic</th><th>Module</th><th>Owner</th><th>Date</th>
          <th class="num">Files req.</th><th class="num">Submitted</th><th>Rate</th>
        </tr></thead>
        <tbody>
${sessionRows}
        </tbody>
      </table>
    </div></div>
  </section>

  <footer>
    <p>Regenerate with <code>node scripts/generate-html-report.js</code> from the repository root. Source of truth is the filesystem under <code>Sessions/</code>.</p>
    <p>A participant counts as having submitted when their session folder holds at least one real file; <code>.gitkeep</code> placeholders never count.</p>
  </footer>
</div>

<script>
  (function () {
    var btn = document.getElementById("toggleOptional");
    var KEY = "cohort-board-hide-optional";
    function apply(hidden) {
      document.body.classList.toggle("hide-optional", hidden);
      btn.setAttribute("aria-pressed", String(hidden));
      btn.textContent = hidden ? "Show optional sessions" : "Hide optional sessions";
    }
    var stored = false;
    try { stored = localStorage.getItem(KEY) === "1"; } catch (e) {}
    apply(stored);
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("aria-pressed") !== "true";
      apply(next);
      try { localStorage.setItem(KEY, next ? "1" : "0"); } catch (e) {}
    });
  })();
</script>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log(`Wrote ${path.relative(ROOT, OUT)} (${(html.length / 1024).toFixed(1)} KB)`);
console.log(`  ${ROSTER.length} participants x ${enriched.length} sessions, ${findings.length} findings`);
