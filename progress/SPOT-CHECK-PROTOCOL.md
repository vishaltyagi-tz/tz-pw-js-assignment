# Spot-Check Protocol

For session owners. Five minutes per participant, a few people each week.

This is the only reliable way to verify understanding. No static analysis, and no
"AI detector", can tell you whether someone understands the code they submitted —
so ask them. The point is not to catch anyone out; it's to find who needs help
while there's still time to give it.

## How it runs

- **When:** the week after a submission, in the session or a 1:1.
- **Who:** 3-4 people per week on a rotation, so everyone is checked roughly
  every five weeks. Rotate predictably and say so — this is not a trap.
- **How long:** five minutes. Two questions.
- **Where:** their own submitted file, open on screen.

## The two questions

**1. An explain question.** Point at one line and ask why it's there.

> "Why is this `===` and not `==`?"
> "What does this loop condition do when the array is empty?"
> "Why did you use `const` here and `let` on the line above?"
> "What is this `await` waiting for?"

**2. A change question.** Ask for a small live modification. This is the one that
actually distinguishes understanding from recall.

> "Make this also handle an empty array."
> "Change this so it counts the items instead of printing them."
> "This currently checks for 'Shirt'. Make it check for 'Shirt' or 'Bag'."
> "Add one more test case to this file."

A person who wrote the code does this in under a minute. A person who didn't
usually cannot start.

## Reading the result

| What you see | What it means | What to do |
|---|---|---|
| Explains it, makes the change | Understands the material | Say so. Move on. |
| Explains it, struggles to change it | Fragile understanding — very common and normal at this stage | Work through it together now. Not a problem. |
| Can't explain their own line | They didn't write it, or copied it without reading | Have the conversation below. |
| Explains it *better* than the assignment asked | They went and read more | Notice it out loud. Give them a stretch goal. |

## If they can't explain their own code

Assume the least-bad explanation first, because it's usually the right one:
they ran out of time, they were stuck and copied from a classmate or an
assistant to have *something* to submit, or they genuinely didn't realise
understanding was the deliverable.

Say roughly this:

> "I'm not worried about where this came from. I'm worried that in Week 14 you'll
> be building a framework on top of this, and it won't hold. Let's redo this one
> together and you resubmit it."

Then make sure they know the policy: AI help is allowed, disclosure is required,
and being able to explain your own submission is the actual bar. That's in every
Session Guide under "Using an AI Assistant".

Escalate only on a repeat after a clear conversation.

## What not to do

- **Don't accuse anyone of using AI based on how code looks.** You cannot tell,
  and being wrong damages the relationship permanently. The checker's
  identical-code flags are prompts to look, never verdicts — a trainer
  live-coding on screen produces identical files across the whole cohort.
- **Don't spot-check only the people you suspect.** Rotate everyone, or it reads
  as an accusation before a word is said.
- **Don't do it in front of the group** unless the participant is comfortable.
- **Don't record suspicion in the repo.** Findings go in the generated report as
  factual observations. Judgement calls belong in `SUMMARY.md`, and conversations
  stay verbal.

## Recording it

Add a line to `SUMMARY.md` under "Needs a human decision" only when there's a
follow-up to track — a resubmission agreed, or extra support arranged. A passed
spot check needs no record.
