#!/usr/bin/env node
// Scans Sessions/<session>/<participant>/ folders and reports submission status
// based on whether the participant's folder contains any files.
const fs = require("fs");
const path = require("path");

const SESSIONS_DIR = path.join(__dirname, "..", "Sessions");
const OUTPUT_FILE = path.join(__dirname, "..", "PROGRESS.md");

function hasSubmission(dir) {
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === "Artifacts") continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else return true;
    }
  }
  return false;
}

const sessions = fs
  .readdirSync(SESSIONS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

const participants = new Set();
for (const session of sessions) {
  for (const entry of fs.readdirSync(path.join(SESSIONS_DIR, session), { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== "Artifacts") participants.add(entry.name);
  }
}
const participantList = [...participants].sort();

const status = {};
for (const participant of participantList) {
  status[participant] = {};
  for (const session of sessions) {
    const dir = path.join(SESSIONS_DIR, session, participant);
    status[participant][session] = fs.existsSync(dir) && hasSubmission(dir);
  }
}

function shortLabel(session) {
  const m = session.match(/^(Week-\d+|Optional-[A-Z])/);
  return m ? m[1].replace("Week-", "W").replace("Optional-", "Opt-") : session;
}

const coreSessions = sessions.filter((s) => s.startsWith("Week-"));
const optionalSessions = sessions.filter((s) => s.startsWith("Optional-"));

let md = `# Assignment Submission Progress\n\n`;
md += `_Generated: ${new Date().toISOString().split("T")[0]}_\n\n`;
md += `A participant is marked ✓ if their session folder contains at least one submitted file.\n\n`;

md += `| Participant | ${sessions.map(shortLabel).join(" | ")} | Core Done | Optional Done |\n`;
md += `|---|${sessions.map(() => "---").join("|")}|---|---|\n`;

for (const participant of participantList) {
  const cells = sessions.map((s) => (status[participant][s] ? "✓" : "-"));
  const coreDone = coreSessions.filter((s) => status[participant][s]).length;
  const optDone = optionalSessions.filter((s) => status[participant][s]).length;
  md += `| ${participant.replace(/-/g, " ")} | ${cells.join(" | ")} | ${coreDone}/${coreSessions.length} | ${optDone}/${optionalSessions.length} |\n`;
}

fs.writeFileSync(OUTPUT_FILE, md);
console.log(`Progress report written to ${OUTPUT_FILE}`);
