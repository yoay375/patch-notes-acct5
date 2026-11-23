// Real-Life Patch Notes: The Comedy Changelog — acct5 entry.
// Writes one funny one-line patch note for a real-life / human-biology bug
// to /output/entry.txt. No network, no secrets, no dependencies.
// Deterministic: the same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

// The entry: one line, 1-160 characters, no trailing newline.
const ENTRY =
  "v1.9.8: fixed a bug where the brain looped the same 8-second jingle for 6 hours with the skip button greyed out.";

mkdirSync("/output", { recursive: true });

// Gate: the scorer requires 1-160 UTF-8 characters, not only whitespace.
const len = [...ENTRY].length;
if (len < 1 || len > 160) {
  throw new Error(`entry length ${len} is outside the 1-160 character gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

writeFileSync("/output/entry.txt", ENTRY, "utf8");

const hash = createHash("sha256").update(ENTRY, "utf8").digest("hex");
console.log(`chars: ${[...ENTRY].length}`);
console.log(`sha256: ${hash}`);
console.log(ENTRY);
