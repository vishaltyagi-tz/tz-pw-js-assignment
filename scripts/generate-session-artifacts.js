#!/usr/bin/env node
// Generates a Session-Guide.md artifact for every session under Sessions/<folder>/Artifacts/
// from the agenda defined in scripts/session-data.json (sourced from the training plan xlsx).
const fs = require("fs");
const path = require("path");

const SESSIONS_DIR = path.join(__dirname, "..", "Sessions");
const sessions = require("./session-data.json");

function guide(session) {
  const { label, date, type, module: mod, topic, owner, concepts, assignment } = session;
  return `# ${topic}

**${label}** · ${date} · ${type} · ${mod}
**Session Owner:** ${owner}

## Learning Objectives

${concepts}

## For Session Owners

- Prepare talking points and any live-demo code around the objectives above.
- Add supporting material (slides, sample code, recordings, cheat sheets) to this \`Artifacts\` folder.
- Review participant submissions in the sibling \`../<ParticipantName>/\` folders after the session.

## Weekly Assignment (Homework)

${assignment}

## Submission Instructions

- Save your files inside \`Sessions/${session.folder}/<YourName>/\` (your own participant folder).
- Use plain, descriptive filenames as instructed above.
- Do not commit \`node_modules/\` or other generated folders.
`;
}

let created = 0;
for (const session of sessions) {
  const dir = path.join(SESSIONS_DIR, session.folder, "Artifacts");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "Session-Guide.md"), guide(session));
  created++;
}

console.log(`Generated ${created} Session-Guide.md artifacts.`);
