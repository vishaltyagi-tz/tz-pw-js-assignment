#!/usr/bin/env node
// Generates Sessions/<folder>/Artifacts/Session-Guide.md for every session from
// scripts/session-data.json. The guide IS the assignment spec - the Deliverables
// and Definition of Done sections are what submissions are graded against, so
// edit session-data.json and rerun rather than hand-editing a generated guide.
const fs = require("fs");
const path = require("path");

const SESSIONS_DIR = path.join(__dirname, "..", "Sessions");
const sessions = require("./session-data.json");

const bullets = (items) => items.map((i) => `- ${i}`).join("\n");

function section(title, body) {
  return body ? `\n## ${title}\n\n${body}\n` : "";
}

function agendaTable(agenda) {
  if (!agenda || !agenda.length) return "";
  const rows = agenda.map(([time, item]) => `| ${time} | ${item} |`).join("\n");
  return `| Time | Topic |\n|---|---|\n${rows}`;
}

function deliverablesTable(deliverables) {
  if (!deliverables || !deliverables.length) return "";
  const rows = deliverables
    .map(([file, what]) => `| \`${file}\` | ${what} |`)
    .join("\n");
  return `| File | What it must contain |\n|---|---|\n${rows}`;
}

function checklist(items) {
  if (!items || !items.length) return "";
  return items.map((i) => `- [ ] ${i}`).join("\n");
}

function resourceList(resources) {
  if (!resources || !resources.length) return "";
  return resources
    .map(([label, url]) =>
      url.startsWith("http") ? `- [${label}](${url})` : `- ${label} — \`${url}\``
    )
    .join("\n");
}

function guide(s) {
  let md = `# ${s.topic}\n\n`;
  md += `**${s.label}** · ${s.date} · ${s.type} · ${s.module}\n`;
  md += `**Session Owner:** ${s.owner}\n`;
  if (s.practiceSite) md += `**Practice site:** ${s.practiceSite}\n`;

  md += `\n> This guide is the single source of truth for this session's assignment.\n`;
  md += `> Generated from \`scripts/session-data.json\` — do not edit by hand.\n`;

  md += section("Learning Objectives", s.concepts);
  md += section("Prerequisites", s.prerequisites && bullets(s.prerequisites));
  md += section("Session Agenda", agendaTable(s.agenda));
  md += section("Key Points to Land", s.keyPoints && bullets(s.keyPoints));

  md += section(
    "Deliverables",
    [
      `Submit these to \`Sessions/${s.folder}/<YourName>/\`. Use exactly these filenames — an automated check looks for them.`,
      "",
      deliverablesTable(s.deliverables),
    ].join("\n")
  );

  md += section(
    "Definition of Done (grading rubric)",
    s.definitionOfDone &&
      [
        "Your submission is complete when every box below is true:",
        "",
        checklist(s.definitionOfDone),
      ].join("\n")
  );

  md += section("Common Mistakes", s.commonMistakes && bullets(s.commonMistakes));
  md += section("Stretch Goals (optional)", s.stretch && bullets(s.stretch));
  md += section("Resources", resourceList(s.resources));

  md += section(
    "Submission Instructions",
    [
      `1. Branch first: \`git switch -c <yourname>-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\``,
      `2. Put your files in \`Sessions/${s.folder}/<YourName>/\` — flat, no extra subfolder.`,
      "3. Use the exact filenames in the Deliverables table above.",
      "4. Check your work against the Definition of Done.",
      "5. Run `node scripts/check-submissions.js` from the repo root and fix anything it flags.",
      "6. Commit, push your branch, and open a Pull Request.",
      "",
      "Never commit `node_modules/`, `test-results/`, `playwright-report/`, or `.env`.",
    ].join("\n")
  );

  md += section(
    "For Session Owners",
    [
      "- Prepare talking points and live-demo code against the agenda and key points above.",
      "- Add supporting material (slides, sample code, recordings, cheat sheets) to this `Artifacts/` folder.",
      "- Add a `Sample-Submission/` folder here showing the expected shape of the answer.",
      "- If the session's real exercises drift from this guide, update `scripts/session-data.json`",
      "  and rerun the generator — otherwise submissions get graded against the wrong spec.",
      "- After the session, review submissions in the sibling `../<ParticipantName>/` folders.",
    ].join("\n")
  );

  return md;
}

let created = 0;
for (const s of sessions) {
  const dir = path.join(SESSIONS_DIR, s.folder, "Artifacts");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "Session-Guide.md"), guide(s));
  created++;
}

console.log(`Generated ${created} Session-Guide.md artifacts.`);
