---
name: "vspec-doc"
description: "Generate a Word document aggregating requirement detail artifacts into a deliverable. Invoke when user runs /vspec:doc to produce a Word-openable .docx (HTML) file from all available spec artifacts."
---

# VSpec Doc Skill

Generates a Word document (`.docx` as single-file HTML) aggregating all requirement detail artifacts into a deliverable document.

## Prerequisites

Reads available artifacts under `/specs/` — background, functions, details, roles, scenarios, flows, dependencies, and models.

## What This Skill Defines

- Aggregate all spec artifacts into a single Word-format deliverable.
- This skill produces documentation output, not spec modifications or code.

## Scope Boundary

This skill ends at document generation. It does not modify specs or generate code.

## Command

### `/vspec:doc`
1. Ensure `/docs/current/` exists.
2. Read available artifacts: `/specs/background/original.md`, `/specs/functions/*`, `/specs/details/**`, `/specs/background/roles.md`, etc.
3. Load `prompts/doc.md` and generate the doc.
4. Write to `/docs/current/requirement_detail.docx`.
5. STOP.

## Prompt Files
- `prompts/doc.md`: document generation prompt.
