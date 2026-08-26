#!/usr/bin/env node
/**
 * Audits submission QUALITY, not just presence.
 *
 * PROGRESS.md answers "did they submit anything?". This answers "does what they
 * submitted match the Session Guide?" - the layer that used to be hand-written
 * into progress/*.csv.
 *
 * Usage:
 *   node scripts/check-submissions.js                 # all sessions
 *   node scripts/check-submissions.js Week-05         # one session (prefix match)
 *   node scripts/check-submissions.js --participant Om-Menkudale
 *   node scripts/check-submissions.js --strict        # exit 1 if any ERROR found
 *
 * Writes progress/CHECK-REPORT.md and prints a summary.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const SESSIONS_DIR = path.join(ROOT, "Sessions");
const REPORT = path.join(ROOT, "progress", "CHECK-REPORT.md");

const sessions = require("./session-data.json");
const { participants: ROSTER } = require("./roster.json");

// ---------------------------------------------------------------- config
const PLACEHOLDERS = new Set([".gitkeep", "placeholder.md", ".DS_Store", "Thumbs.db"]);
const GENERIC_NAMES = new Set([
  "assignment.js", "assignment2.js", "practice.js", "final.js", "misc.js",
  "new.js", "new2.js", "temp.js", "test.js", "untitled.js", "demo.js",
  "demo1.js", "info.js", "excercise.js", "exercise.js", "day1.js", "index.js",
]);
const FORBIDDEN_DIRS = new Set([
  "node_modules", "test-results", "playwright-report", ".cache", "playwright",
]);
const FORBIDDEN_FILES = [/^\.env$/, /^\.env\..+/];
// --- "was this actually run?" markers -------------------------------------
// Several deliverables can only be completed by RUNNING the code: paste the
// real error, record the actual output, compare a prediction to what happened.
// A submission that leaves those placeholders empty was not run - regardless of
// how it was produced. These findings are factual, not accusations.
const PLACEHOLDER_MARKER =
  /^[ \t]*(?:\/\/|\*)[ \t]*(OUTPUT|WHY|ERROR|PREDICTION|ACTUAL|ANSWER|RESULT|DIFFERENCE|COMPILER ERROR|WHAT HAPPENED|WHICH FAILS ON SLOW CI|FAILURES REPORTED)[ \t]*:[ \t]*(?:\.{2,}|\?+)?[ \t]*$/im;
const LEFTOVER_TODO = /^[ \t]*(?:\/\/|\*)[ \t]*TODO\b/im;
// Text that only appears if you ran something and copied the result back.
const REAL_ERROR_TEXT =
  /(TypeError|SyntaxError|ReferenceError|RangeError|TimeoutError|strict mode violation|error TS\d+|Assignment to constant variable|is not defined|Cannot find module|UnhandledPromiseRejection)/;
// Deliverable wording that demands evidence of a real run.
const WANTS_REAL_OUTPUT = /\b(paste|observe|record|capture)\b[^.]{0,60}\b(error|output|message|result|prediction)\b|\berror (text|message)\b|\bcompiler error\b/i;

const CODE_SMELLS = [
  { re: /waitForTimeout\s*\(/, msg: "uses page.waitForTimeout() - use a web-first assertion instead" },
  { re: /test\.only\s*\(/, msg: "contains test.only() - this silently skips the rest of the suite" },
  { re: /\bpage\.click\s*\(/, msg: "uses the deprecated page.click() - use a locator action" },
  { re: /(password|secret|passwd)\s*[:=]\s*['\"][^'\"]{3,}['\"]/i, msg: "looks like a hardcoded credential" },
];

const args = process.argv.slice(2);
const STRICT = args.includes("--strict");
const pIdx = args.indexOf("--participant");
const ONLY_PARTICIPANT = pIdx !== -1 ? args[pIdx + 1] : null;
const SESSION_FILTER = args.find((a) => !a.startsWith("--") && a !== ONLY_PARTICIPANT);

// ---------------------------------------------------------------- helpers
const findings = []; // { level, session, participant, file, message }
const add = (level, session, participant, file, message) =>
  findings.push({ level, session, participant, file, message });

function walk(dir, base = dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full);
    if (e.isDirectory()) {
      out.push({ rel, name: e.name, dir: true });
      if (!FORBIDDEN_DIRS.has(e.name)) out.push(...walk(full, base));
    } else {
      out.push({ rel, name: e.name, dir: false, full });
    }
  }
  return out;
}

// Duplicate detection, two tiers - deliberately conservative, because a false
// accusation of copying is far more damaging than a missed one.
//
// Tier 1 (ERROR): code identical once comments and whitespace are removed.
//   String literals are KEPT, so two people printing their own names never match.
// Tier 2 (WARN): the same distinctive COMMENT lines appear in two participants'
//   files. Copied work usually carries the original's comment banner and typos
//   even after the name has been swapped out.
function fingerprint(text) {
  const stripped = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/\s+/g, "")
    .toLowerCase();
  // Short files (a couple of console.log lines) are legitimately similar for
  // everyone - only fingerprint files with real substance.
  return stripped.length < 180 ? null : crypto.createHash("sha1").update(stripped).digest("hex");
}

// Distinctive comment lines: long enough to be a real sentence, and not one of
// the boilerplate headings the handouts tell everyone to write.
const BOILERPLATE_COMMENT = /^(exercise|assignment|question|task|step|part|week|day)\b[\s\d:.-]*$/i;
function commentLines(text) {
  const out = new Set();
  const re = /\/\/(.*)$|\/\*([\s\S]*?)\*\//gm;
  let m;
  while ((m = re.exec(text))) {
    const body = (m[1] || m[2] || "");
    for (const raw of body.split("\n")) {
      const line = raw.replace(/[*=\-_#]+/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
      if (line.length >= 25 && !BOILERPLATE_COMMENT.test(line)) out.add(line);
    }
  }
  return out;
}
const SHARED_COMMENT_THRESHOLD = 3;

// Directories a session legitimately expects (derived from its deliverables).
function allowedDirs(session) {
  const dirs = new Set();
  for (const [file] of session.deliverables || []) {
    const parts = file.split("/");
    if (parts.length > 1) dirs.add(parts[0]);
  }
  // A Playwright project has these regardless of what's listed.
  if (dirs.size) ["tests", "pages", "types", "fixtures", "helpers", "utils", "data"].forEach((d) => dirs.add(d));
  return dirs;
}

// ---------------------------------------------------------------- main
const targetSessions = sessions.filter(
  (s) => !SESSION_FILTER || s.folder.toLowerCase().startsWith(SESSION_FILTER.toLowerCase())
);

if (!targetSessions.length) {
  console.error(`No session matches "${SESSION_FILTER}".`);
  process.exit(2);
}

let submissionsChecked = 0;

for (const session of targetSessions) {
  const sessionDir = path.join(SESSIONS_DIR, session.folder);
  if (!fs.existsSync(sessionDir)) {
    add("ERROR", session.folder, "-", "-", "session folder listed in session-data.json does not exist on disk");
    continue;
  }

  const okDirs = allowedDirs(session);
  const required = (session.deliverables || []).map(([f]) => f);
  const fingerprints = new Map(); // fp -> "participant/file"
  const commentSets = new Map(); // "participant/file" -> Set of comment lines

  const folders = fs
    .readdirSync(sessionDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "Artifacts")
    .map((e) => e.name);

  // roster drift, in both directions
  for (const name of folders) {
    if (!ROSTER.includes(name)) {
      add("ERROR", session.folder, name, "-",
        `folder name is not on the roster - fix the name or add them to scripts/roster.json ` +
        `(case and spaces matter: git treats "Anas-javed" and "Anas-Javed" as two people)`);
    }
  }
  for (const name of ROSTER) {
    if (!folders.includes(name)) {
      add("WARN", session.folder, name, "-",
        "has no folder in this session - run `node scripts/ensure-participant-folders.js`");
    }
  }

  for (const participant of folders) {
    if (ONLY_PARTICIPANT && participant !== ONLY_PARTICIPANT) continue;
    const dir = path.join(sessionDir, participant);
    const entries = walk(dir);
    const files = entries.filter((e) => !e.dir && !PLACEHOLDERS.has(e.name));

    if (!files.length) continue; // nothing submitted - PROGRESS.md's job, not ours
    submissionsChecked++;

    let sawRealError = false;
    let sawUnfilled = false;

    // --- structure -----------------------------------------------------
    for (const e of entries.filter((x) => x.dir)) {
      const top = e.rel.split(path.sep)[0];
      if (FORBIDDEN_DIRS.has(e.name)) {
        add("ERROR", session.folder, participant, e.rel, `${e.name}/ must never be committed - add it to .gitignore`);
      } else if (!okDirs.has(top)) {
        add("WARN", session.folder, participant, e.rel,
          `unexpected subfolder - submissions should be flat in your participant folder`);
      }
    }

    // --- per file ------------------------------------------------------
    for (const f of files) {
      const size = fs.statSync(f.full).size;

      if (size === 0) add("ERROR", session.folder, participant, f.rel, "file is empty");
      if (FORBIDDEN_FILES.some((re) => re.test(f.name)))
        add("ERROR", session.folder, participant, f.rel, "secrets file must never be committed");
      if (f.name.startsWith("~$"))
        add("ERROR", session.folder, participant, f.rel, "Office lock/temp file - delete it and add `~$*` to .gitignore");
      if (!path.extname(f.name))
        add("ERROR", session.folder, participant, f.rel, "file has no extension - JS files must end in .js");
      if (GENERIC_NAMES.has(f.name.toLowerCase()))
        add("WARN", session.folder, participant, f.rel,
          "generic filename - use the descriptive name from the Deliverables table");
      if (/\s/.test(f.name))
        add("WARN", session.folder, participant, f.rel, "filename contains a space - use hyphens or camelCase");

      if (!/\.(js|ts|mjs|cjs)$/.test(f.name) || size === 0) continue;

      const text = fs.readFileSync(f.full, "utf8");
      for (const { re, msg } of CODE_SMELLS) {
        if (re.test(text)) add("WARN", session.folder, participant, f.rel, msg);
      }

      if (PLACEHOLDER_MARKER.test(text)) {
        add("WARN", session.folder, participant, f.rel,
          "an explanation placeholder (OUTPUT/WHY/ERROR/PREDICTION) was left unfilled - " +
          "these are answered by running the code and writing down what happened");
        sawUnfilled = true;
      }
      if (LEFTOVER_TODO.test(text)) {
        add("WARN", session.folder, participant, f.rel,
          "a `// TODO` from the practice file is still present - that exercise looks incomplete");
      }
      if (REAL_ERROR_TEXT.test(text)) sawRealError = true;

      const fp = fingerprint(text);
      if (fp) {
        const prior = fingerprints.get(fp);
        if (prior && !prior.startsWith(participant + "/")) {
          add("ERROR", session.folder, participant, f.rel,
            `identical code to ${prior} once comments and whitespace are removed - confirm both authors can explain it`);
        } else if (!prior) {
          fingerprints.set(fp, `${participant}/${f.rel}`);
        }
      }

      const comments = commentLines(text);
      if (comments.size >= SHARED_COMMENT_THRESHOLD) {
        for (const [otherKey, otherSet] of commentSets) {
          if (otherKey.startsWith(participant + "/")) continue;
          let shared = 0;
          for (const c of comments) if (otherSet.has(c)) shared++;
          if (shared >= SHARED_COMMENT_THRESHOLD) {
            add("WARN", session.folder, participant, f.rel,
              `shares ${shared} distinctive comment lines with ${otherKey} - worth confirming these were written independently`);
            break;
          }
        }
        commentSets.set(`${participant}/${f.rel}`, comments);
      }
    }

    // --- required deliverables ----------------------------------------
    const submitted = files.map((f) => f.rel.split(path.sep).join("/"));
    const submittedBasenames = new Set(files.map((f) => f.name.toLowerCase()));
    const missing = required.filter((req) => {
      if (req.includes("*")) return false; // glob-ish deliverable, can't check
      const base = req.split("/").pop().toLowerCase();
      return !submitted.includes(req) && !submittedBasenames.has(base);
    });
    if (missing.length) {
      add("WARN", session.folder, participant, "-",
        `missing ${missing.length} of ${required.length} required file(s): ${missing.join(", ")}`);
    }

    // If this session asks for real, pasted output and none of the submitted
    // files contain anything that looks like a genuine runtime/compiler
    // message, the code most likely was not executed.
    const needsEvidence = (session.deliverables || []).some(([, what]) => WANTS_REAL_OUTPUT.test(what));
    if (needsEvidence && !sawRealError && !sawUnfilled) {
      add("WARN", session.folder, participant, "-",
        "this session asks for the real error or output to be pasted in, and no runtime " +
        "or compiler message appears anywhere in the submission - check it was actually run");
    }
  }
}

// ---------------------------------------------------------------- report
const errors = findings.filter((f) => f.level === "ERROR");
const warns = findings.filter((f) => f.level === "WARN");

const bySession = {};
for (const f of findings) (bySession[f.session] ||= []).push(f);

let md = `# Submission Check Report\n\n`;
md += `_Generated: ${new Date().toISOString().split("T")[0]}`;
if (SESSION_FILTER) md += ` · filtered to \`${SESSION_FILTER}\``;
if (ONLY_PARTICIPANT) md += ` · participant \`${ONLY_PARTICIPANT}\``;
md += `_\n\n`;
md += `Generated by \`node scripts/check-submissions.js\` — do not edit by hand.\n`;
md += `Checks submissions against the Deliverables in each \`Session-Guide.md\`.\n\n`;
md += `| | |\n|---|---|\n`;
md += `| Submissions checked | ${submissionsChecked} |\n`;
md += `| Errors | ${errors.length} |\n`;
md += `| Warnings | ${warns.length} |\n\n`;

if (!findings.length) {
  md += `Nothing to flag. \n`;
} else {
  for (const [session, items] of Object.entries(bySession)) {
    md += `## ${session}\n\n`;
    md += `| Level | Participant | File | Finding |\n|---|---|---|---|\n`;
    for (const f of items.sort((a, b) => a.level.localeCompare(b.level) || a.participant.localeCompare(b.participant))) {
      md += `| ${f.level} | ${f.participant} | \`${f.file}\` | ${f.message.replace(/\|/g, "\\|")} |\n`;
    }
    md += `\n`;
  }
}

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, md);

console.log(`Checked ${submissionsChecked} submission(s) across ${targetSessions.length} session(s).`);
console.log(`  ${errors.length} error(s), ${warns.length} warning(s)`);
console.log(`Report: ${path.relative(ROOT, REPORT)}`);
if (errors.length) {
  console.log(`\nErrors:`);
  for (const f of errors.slice(0, 25)) {
    console.log(`  [${f.session}] ${f.participant}/${f.file}: ${f.message}`);
  }
  if (errors.length > 25) console.log(`  ... and ${errors.length - 25} more (see the report)`);
}
process.exit(STRICT && errors.length ? 1 : 0);
