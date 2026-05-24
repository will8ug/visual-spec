---
name: "using-vspec"
description: "VSpec workflow overview and skill index. Invoke when the user mentions vspec, visual-spec, requirement analysis workflow, or asks which skill to use for a specific stage. Use this skill to understand the complete /vspec:* workflow, skill dependencies, and to find the right skill for each task."
---

# VSpec — Visualized Requirements Analysis

Turn a one-sentence idea into runnable prototypes and traceable specs with a staged `/vspec:*` workflow.

## What Is VSpec?

VSpec is a suite of composable skills for visualized requirements analysis. It prioritizes visualization, traceability, and early validation to reduce misunderstanding-driven rework.

Each skill handles one stage of the pipeline. Skills are installed together but invoked independently — you run the command you need, when you need it.

## Complete Skill List

### Core Pipeline (sequential)
| # | Skill | Command | Purpose | Requires |
|---|-------|---------|---------|----------|
| 1 | `vspec-new` | `/vspec:new` | Generate baseline spec artifacts | — |
| 2 | `vspec-detail` | `/vspec:detail` | Per-function detailed specs | `/specs/functions/` |
| 3 | `vspec-verify` | `/vspec:verify` | Data models + runnable prototype | `/specs/details/` |
| 4 | `vspec-impl` | `/vspec:impl` | Backend + frontend code | `/specs/models/` |

### Quality & Validation
| # | Skill | Command | Purpose | Requires |
|---|-------|---------|---------|----------|
| 5 | `vspec-qc` | `/vspec:qc` | Quality check on artifacts | `/specs/` |
| 6 | `vspec-accept` | `/vspec:accept` | Acceptance test cases (JSON) | `/specs/` |
| 7 | `vspec-i-test` | `/vspec:i-test` | Unit + integration test cases | `/specs/` |
| 8 | `vspec-script` | `/vspec:script` | Playwright automation scripts | JSON test cases |
| 9 | `vspec-append-test` | `/vspec:append-test` | Framework-specific test code | JSON test cases |

### Refinement & Documentation
| # | Skill | Command | Purpose | Requires |
|---|-------|---------|---------|----------|
| 10 | `vspec-refine` | `/vspec:refine`, `/vspec:refine-q`, `/vspec:more-q` | Update/refine requirements | `/specs/details/` |
| 11 | `vspec-doc` | `/vspec:doc` | Word document deliverable | `/specs/` |
| 12 | `vspec-interview` | `/vspec:interview`, `/vspec:i-word` | Interview questionnaire | — |

### Strategy & Planning
| # | Skill | Command | Purpose | Requires |
|---|-------|---------|---------|----------|
| 13 | `vspec-mrd` | `/vspec:mrd` | Market Requirements Document | `/specs/` |
| 14 | `vspec-plan` | `/vspec:plan` | Estimation & delivery schedule | `/specs/functions/` |
| 15 | `vspec-upgrade` | `/vspec:upgrade` | Upgrade specs from legacy docs | `/docs/` |

## Typical Workflow

```
1. /vspec:new        →  Raw requirement → structured specs
       ↓
2. /vspec:detail     →  Per-function detailed specs (RBAC, permissions, logic)
       ↓
3. /vspec:verify     →  Data models + runnable prototype for stakeholder review
       ↓
4. /vspec:impl       →  Backend-first integrated code under /specs/
       ↓
5. /vspec:accept     →  Acceptance test cases (JSON)
   /vspec:i-test     →  Unit + integration test cases (JSON)
       ↓
6. /vspec:script     →  Playwright browser automation
```

**Refinement loop**: Run `/vspec:refine` at any point to update specs after stakeholder feedback.

**Quality loop**: Run `/vspec:qc` before `/vspec:impl` or at any stage to catch omissions.

## Prerequisites for Each Skill

Each skill's SKILL.md lists its prerequisites. In general:

| Skill | Needs |
|-------|-------|
| `vspec-new` | Nothing — starts from raw requirements |
| `vspec-detail` | `/specs/functions/` from vspec-new |
| `vspec-verify` | `/specs/details/` from vspec-detail |
| `vspec-impl` | `/specs/models/` from vspec-verify |
| Others | Varies — see individual SKILL.md |

## Installation

All 16 skills are installed together from the same package:

```bash
npx visual-spec --target /path/to/your-project
```

This discovers and installs all skill directories under `skills/` automatically.

## Output Locations

| Artifact Type | Location |
|---|---|
| Requirement specs | `/specs/background/` |
| Function list | `/specs/functions/` |
| Detailed specs | `/specs/details/` |
| Data models | `/specs/models/` |
| Prototypes | `/specs/prototypes/` |
| Backend code | `/specs/backend/` |
| QC reports | `/specs/qc_report.*` |
| Test cases | `/test/` |
| MRD docs | `/docs/market/` |
| Plans | `/specs/plan/` |

## Important Notes

- **Each skill handles boundaries**: Skills explicitly stop at their scope. They don't attempt to do another skill's work.
- **Sequential by design**: The core pipeline (new → detail → verify → impl) must be run in order.
- **Quality/refinement at any stage**: QC checks and refinement can be run at any point.
- **Original skill preserved**: The legacy `visual-spec` monolithic skill remains available alongside the new modular skills.
