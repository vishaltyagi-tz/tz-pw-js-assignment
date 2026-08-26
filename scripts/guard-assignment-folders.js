#!/usr/bin/env node
/**
 * PreToolUse guard. Refuses Write/Edit into a participant's assignment folder.
 *
 * The point of this repo is that participants learn JavaScript and Playwright by
 * writing it. An assistant that fills in the answers removes the entire value of
 * the exercise, so this hook denies the edit and redirects to teaching instead.
 *
 * Reads the hook payload on stdin, prints a permission decision on stdout.
 * Denies:  Sessions/<session>/<Participant>/...
 * Allows:  Sessions/<session>/Artifacts/...  (session-owner material)
 *          everything else in the repo (scripts, docs, config)
 */
const fs = require("fs");
const path = require("path");

let payload = {};
try {
  payload = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
} catch {
  process.exit(0); // never block on a malformed payload
}

const filePath = payload?.tool_input?.file_path || "";
if (!filePath) process.exit(0);

const normalised = filePath.split(path.sep).join("/");
const match = normalised.match(/(?:^|\/)Sessions\/([^/]+)\/([^/]+)(?:\/|$)/);

if (!match) process.exit(0);
const [, session, second] = match;
if (second === "Artifacts") process.exit(0); // owner material is fair game

// Only guard real participant folders, so this can't misfire on a new subfolder
// name that happens to sit at that level.
let roster = [];
try {
  roster = require(path.join(__dirname, "roster.json")).participants;
} catch {
  process.exit(0);
}
if (!roster.includes(second)) process.exit(0);

const reason = [
  `Blocked: ${session}/${second}/ is a training participant's assignment folder.`,
  "",
  "This repo is a QA training programme. Participants are learning to write",
  "JavaScript and Playwright themselves - writing their assignment for them",
  "removes the whole point of the exercise, and they will be asked to explain",
  "this code in a spot check.",
  "",
  "Do this instead, without editing any file in that folder:",
  "  - Explain the concept the exercise is testing, in plain language.",
  "  - Point at the session's Artifacts/Session-Guide.md and practice file.",
  "  - Review code the participant has already written and describe what is",
  "    wrong and why - let them make the change.",
  "  - Give a worked example on a DIFFERENT problem, so they transfer it.",
  "",
  "If you are the participant: type the code yourself. If you use an AI",
  "assistant, the repo policy is to disclose it in a comment and to be able to",
  "explain every line you submit.",
].join("\n");

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason,
    },
  })
);
