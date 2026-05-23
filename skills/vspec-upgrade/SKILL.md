---
name: "vspec-upgrade"
description: "Upgrade/retrofit requirements based on legacy system documents and new inputs, regenerating /specs/ artifacts. Invoke when user runs /vspec:upgrade to rebuild specs from existing materials for system upgrade or redesign scenarios."
---

# VSpec Upgrade Skill

Upgrades or retrofits requirements based on legacy system documentation and new inputs, regenerating `/specs/` artifacts with the same structure as `vspec-new`.

## Prerequisites

- `/docs/legacy/` — legacy system documents
- `/docs/current/` — new input materials
- `/docs/current/file_list.md` — input file index (auto-generated if missing)

## What This Skill Defines

- Extract structured information from legacy and current documents.
- Regenerate all `/specs/` artifacts reusing `/vspec:new` conventions.
- Sync technical specifications into `/scheme.yaml`.

## Scope Boundary

This skill rebuilds specs from legacy materials. For new requirement analysis, use `vspec-new`. For implementation, use `vspec-impl`.

## Command

### `/vspec:upgrade`
1. Ensure `/docs/current/file_list.md` exists; generate if missing.
2. Read listed sources under `/docs/` (legacy, current, templates, texts, assets).
3. If `/specs/background/original.md` exists, use as baseline for diff.
4. Load `prompts/upgrade.md` → generate/update `/specs/` artifacts.
5. Sync technical spec → `/scheme.yaml`.
6. STOP.

## Prompt Files
- `prompts/upgrade.md`: upgrade/retrofit generation prompt.
