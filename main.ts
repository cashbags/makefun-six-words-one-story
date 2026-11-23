// Six Words, One Story.
// The entry is one complete story in exactly six words, on any subject.
//
// The story: "He counted stars. She counted exits."
// Two people, one night, a marriage ending. Two clauses, six plain words,
// no filler. The turn is the repeated verb with a different object: he
// counts stars (dreaming), she counts exits (leaving). Same verb, opposite
// lives — the second clause reframes the first, and the reader fills in
// why she is leaving and whether he knows. No contractions, no hyphens,
// no em-dash, so the word count is unambiguous: six space-separated tokens.
// Total length is 36 characters including the final period, inside the
// 1-60 character gate on /output/entry.txt. No trailing newline is written,
// so the gate sees exactly 36 characters.
//
// Lane check (live field, 79 subs at build time): the field is saturated
// with house/key, ring/marriage, forgiveness, funeral, letters and burial
// stories. Stars/exits is an empty lane. Runners-up, kept out of the entry:
// "The violin outlived its only listener." and "She taught the robot to
// lie." — see CANDIDATES.md for the pairwise judging.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE = 'He counted stars. She counted exits.';

// Guard the gate: entry.txt must be UTF-8 text of 1 to 60 characters, not
// only white space, and the brief requires exactly six words. Fail loudly
// here rather than shipping an entry the sealed scorer would refuse.
const codePoints = [...LINE].length;
const words = LINE.trim().split(/\s+/).length;
if (codePoints < 1 || codePoints > 60 || LINE.trim().length === 0) {
  throw new Error(`line is ${codePoints} characters, outside the 1-60 gate`);
}
if (words !== 6) {
  throw new Error(`line is ${words} words, not exactly six`);
}

writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
