---
name: "vspec-mrd"
description: "Generate a Market Requirements Document (MRD) with market landscape, competitor analysis, user positioning, and product design notes. Invoke when user runs /vspec:mrd to produce market research and product positioning artifacts."
---

# VSpec MRD Skill

Generates a Market Requirements Document (MRD) covering market landscape, competitor analysis, user positioning, and product design notes.

## Prerequisites

Reads available artifacts: `/specs/background/original.md`, `/specs/background/roles.md`, `/specs/background/terms.md`, `/specs/background/scenarios.md`, `/specs/flows/*.puml`, `/specs/background/dependencies.md`, `/specs/functions/*`.

## What This Skill Defines

- Generate market landscape analysis.
- Produce competitor analysis.
- Create user positioning and product design notes.
- This skill produces market research documents — not spec modifications or code.

## Scope Boundary

This skill ends at MRD document generation. For requirement analysis, use `vspec-new`. For implementation, use `vspec-impl`.

## Command

### `/vspec:mrd`
1. Ensure `/docs/market/` exists.
2. Read baseline artifacts (original.md, roles, terms, scenarios, flows, dependencies, functions).
3. Load `prompts/mrd.md` → generate MRD docs.
4. Write outputs:
   - `/docs/market/market.md`
   - `/docs/market/competitors.md`
   - `/docs/market/users.md`
   - `/docs/market/product_design.md`
5. STOP.

## Prompt Files
- `prompts/mrd.md`: MRD generation prompt.
