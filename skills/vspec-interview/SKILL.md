---
name: "vspec-interview"
description: "Generate interview outlines and survey questionnaires for user research and requirement validation. Invoke when user runs /vspec:interview for questionnaire generation or /vspec:i-word for Word-format export. Use this skill to prepare structured interview materials from existing spec context."
---

# VSpec Interview Skill

Generates interview outlines and Word-format questionnaires for user research and requirement validation.

## Prerequisites

No strict prerequisites — reads available artifacts under `/specs/` when present for context.

## What This Skill Defines

- Generate structured interview questionnaire markdown.
- Export as Word-openable `.docx` (single-file HTML).
- This skill produces interview materials, not spec documents or code.

## Scope Boundary

This skill ends at questionnaire generation. For requirement analysis, use `vspec-new`. For refinement based on interview findings, use `vspec-refine`.

## Commands

### `/vspec:interview`
1. Load `prompts/interview.md`.
2. Generate the questionnaire markdown → `/docs/current/interview_questionnaire.md`.

### `/vspec:i-word`
1. Ensure `/docs/current/interview_questionnaire.md` exists; if missing, ask user to run `/vspec:interview` first.
2. Load `prompts/interview_word.md`.
3. Write Word file → `/docs/current/interview_questionnaire.docx`.

## Prompt Files
- `prompts/interview.md`: questionnaire generation prompt.
- `prompts/interview_word.md`: Word-format export prompt.
