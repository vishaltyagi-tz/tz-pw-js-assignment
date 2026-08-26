#!/usr/bin/env node
// Creates Sessions/<session>/<Participant>/ for every session x roster participant,
// each with a tracked .gitkeep so the folder survives a clone (git can't track empty dirs).
// Idempotent - safe to rerun after adding a session or a participant.
const fs = require("fs");
const path = require("path");

const SESSIONS_DIR = path.join(__dirname, "..", "Sessions");
const { participants } = require("./roster.json");

const KEEP = ".gitkeep";
const KEEP_BODY = `# Keeps this folder in git so it exists right after a clone.
# Add your assignment files here, then delete this file (optional).
`;

const sessions = fs
  .readdirSync(SESSIONS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

let createdDirs = 0;
let createdKeeps = 0;

for (const session of sessions) {
  for (const participant of participants) {
    const dir = path.join(SESSIONS_DIR, session, participant);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      createdDirs++;
    }
    // Only place a .gitkeep in folders that have nothing else in them, so we
    // never add noise next to real submissions.
    const entries = fs.readdirSync(dir);
    if (entries.length === 0) {
      fs.writeFileSync(path.join(dir, KEEP), KEEP_BODY);
      createdKeeps++;
    }
  }
}

console.log(
  `${sessions.length} sessions x ${participants.length} participants: ` +
    `${createdDirs} folder(s) created, ${createdKeeps} .gitkeep placeholder(s) written.`
);
