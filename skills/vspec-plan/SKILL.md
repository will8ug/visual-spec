---
name: "vspec-plan"
description: "Break down requirements, estimate efforts, and generate a delivery schedule via user story map. Invoke when user runs /vspec:plan to produce estimation and schedule artifacts in markdown and HTML."
---

# VSpec Plan Skill

Breaks down requirements into estimable work items, generates effort estimates, and produces a delivery schedule with user story mapping.

## Prerequisites

- `/specs/functions/*` (from `vspec-new`)
- `/specs/background/roles.md`, `/specs/background/scenarios.md`
- `/specs/details/` (recommended)
- `/specs/background/dependencies.md` (recommended)

## What This Skill Defines

- Generate effort estimates aligned to the function list.
- Produce a delivery schedule with user story map (HTML).
- This skill produces planning artifacts — it does NOT implement or modify specs.

## Scope Boundary

This skill ends at planning artifact generation. For implementation, use `vspec-impl`. For spec modifications, use `vspec-refine`.

## Command

### `/vspec:plan`
1. Read `/specs/functions/*`, roles, scenarios, details, dependencies.
2. Load `prompts/estimate.md` → generate `/specs/plan/plan_estimate.md`.
3. Load `prompts/schedule.md` → generate `/specs/plan/plan_schedule.html` (use template at `prompts/schedule.html`).
4. STOP.

## Prompt Files
- `prompts/estimate.md`: effort estimation prompt.
- `prompts/schedule.md`: delivery schedule generation prompt.
- `prompts/estimation_standards.json`: built-in estimation reference data.
- `prompts/estimation_standards_reader.html`: estimation standards viewer template.
- `prompts/schedule.html`: schedule page HTML template.
