---
name: "vspec-refine"
description: "Refine and update requirements based on refine materials, answered questions, or additional clarification. Invoke when user runs /vspec:refine, /vspec:refine-q, or /vspec:more-q to keep spec artifacts consistent as requirements evolve."
---

# VSpec Refine Skill

Refines and updates requirements based on input materials, answered questions, or additional clarification needs, keeping all spec artifacts consistent.

## Prerequisites

- `/specs/details/` must exist and be non-empty (from `vspec-detail`).
- `/specs/background/questions.md` for `/vspec:refine-q` and `/vspec:more-q`.

## What This Skill Defines

- Update the canonical requirement and sync impacted artifacts.
- Merge answered questions into requirements.
- Generate additional clarification questions.
- This skill modifies existing spec documents — not generate new ones from scratch.

## Scope Boundary

This skill updates existing spec artifacts. For initial requirement generation, use `vspec-new`. For implementation, use `vspec-impl`.

## Commands

### `/vspec:refine`
0. Ensure `/specs/details/` exists; if missing, stop.
1. Read refine inputs from `/docs/refine/refine.md` or command arguments.
2. Load `prompts/refine.md` to apply refinements.
3. Append to `/specs/background/original.md`, update impacted `/specs/details/` and `/specs/prototypes/`.
4. STOP.

### `/vspec:refine-q`
1. If `/specs/background/questions.md` missing or no unanswered items, stop.
2. Read answered items from questions.md.
3. Load `prompts/refine_q.md` to merge answers into canonical requirement.
4. Append to `/specs/background/original.md`, mark answered items.
5. STOP.

### `/vspec:more-q`
1. If `/specs/background/questions.md` missing, stop.
2. Load `prompts/more_q.md` to generate additional questions.
3. Append to `/specs/background/questions.md`.
4. Provide Q&A template at `prompts/question_and_answer.html` if needed.
5. STOP.

## Prompt Files
- `prompts/refine.md`: main refinement prompt.
- `prompts/refine_q.md`: question-answer merge prompt.
- `prompts/more_q.md`: additional question generation prompt.
- `prompts/question_and_answer.html`: interactive Q&A HTML template.
