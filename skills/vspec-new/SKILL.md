---
name: "vspec-new"
description: "Create a new visual-spec requirement analysis session. Invoke when user runs /vspec:new to turn raw requirements into structured specs (background, stakeholders, roles, terms, flows, scenarios, details, dependencies, functions, and questions). Use this skill whenever a user wants to start a new requirement analysis, paste a raw requirement, or create structured spec documents from a business idea."
---

# VSpec New Skill

Creates a new requirement analysis session. Turn brief business requests into structured requirement output, generating baseline spec artifacts under `/specs/`.

## When to Use

Invoke this skill when:
- Business side provided a very simple described requirements.
- User runs `/vspec:new` to start a new requirement analysis flow.

## What This Skill Defines

- Fill in details based on scenario-based-facilitation method.
- Output structured requirement documents (markdown specs, flows, and function lists — not runnable code).
- This skill does NOT generate prototypes, data models, test cases, or implementation code.

## Scope Boundary

This skill ends at requirement analysis output. After completion, use other skills for later stages:
- `vspec-detail` → per-function detailed specs (RBAC, permissions, validation, interaction, etc.)
- `vspec-verify` → data models and runnable prototypes
- `vspec-impl` → backend and frontend code generation
- `vspec-accept` / `vspec-i-test` → test case generation

Do NOT attempt to proceed beyond requirement analysis within this skill — those stages are handled by separate, purpose-built skills.

## Command

### `/vspec:new`

Use this command to create a new requirement analysis session.

Language:
- Read `/scheme.yaml` `selected.language` (supports `en`, `zh`, `ja`; default to `en` if missing/invalid).
- If the command argument or input explicitly provides `lang=<en|zh|ja>`, use that value for this run and update `selected.language` to it (update only that field). `zh-CN` should be treated as an alias of `zh`.
- When `selected.language=en`, all headings in `/specs/background/original.md` must be English; normalize any non-English headings to:
  `# Raw Requirement`, `# Summary`, `# Business Context`, `# Core Features`, `# Pages & Interactions`, `# Data Model`, `# Business Logic`, `# Risks & Assumptions`, `# Open Questions`.

Flow:
0. Ensure `/docs/` exists, and ensure subfolders exist:
   - `/docs/legacy/`
   - `/docs/current/`
   - `/docs/refine/`
   - `/docs/dependencies/`
   - Do NOT create `/docs/change/` (it is deprecated).
0.2 If the user passes `lang=<en|zh|ja>` in the command arguments, set `/scheme.yaml` `selected.language` to that value (update only that field, keep other fields and formatting unchanged). `zh-CN` should be treated as an alias of `zh`.
0.5 Create editable project constraints so the user can tweak them early (do not overwrite if they already exist):
   - Create `/scheme.yaml` with defaults (prototype stack selection + catalog) if missing
   - Create `/prototype_ui_convention.md` (same directory as `/scheme.yaml`) if missing
1. Ask the user to input the original requirement.
2. When the user presses Enter, treat the input as the raw requirement source.
3. Load the prompt file at `prompts/background.md`.
4. Use that prompt to analyze the requirement and expand the business context.
5. Write the raw requirement and background analysis output to `/specs/background/original.md`.
5.2 Extract the Open Questions section and write the unified Q&A storage:
   - JSON: `/specs/background/questions.json`
   - Markdown: `/specs/background/questions.md` (exported from questions.json)
   - If the Open Questions section is missing/empty, still create both files (questions.json must be valid JSON with `items: []` and `meta.total=0`).
5.5 Create `/specs/background/question_and_answer.html` (single-file HTML with inline CSS/JS) so the user can answer questions and write back to markdown:
   - If the file already exists: do NOT overwrite it; reuse it.
   - Only create it when missing by reading the built-in template `prompts/question_and_answer.html`.
   - Do NOT create any `prompt/` or `prompts/` directory in the project; do not write anything under `prompts/**`.
6. Ask the user to answer the questions from the Open Questions section (use the section title in the selected language). The user should answer via `/specs/background/question_and_answer.html` (select `/specs/background/original.md` in the page and save back).
   - Distinguish required vs optional questions (`priority=required|optional`):
     - Required: affects scope/rules/acceptance; unanswered required items block subsequent generation
     - Optional: does not block requirement analysis details, but should be answered later (can be deferred), e.g. full legal document text, agreement clauses, calculation formulas, template samples
   - Then wait for a continuation signal (e.g. `继续` / `continue`) that indicates required items are answered or the user wants to proceed. Then STOP. Do not load any subsequent prompts or generate any further artifacts before that.
7. After the user replies (answers or confirmed), load `prompts/stakeholders.md` to analyze stakeholders.
8. Write the stakeholder result to `/specs/background/stakeholder.md` (markdown table).
9. Load `prompts/roles.md` to analyze system user roles (direct users) and their work tasks.
10. Write the roles result to `/specs/background/roles.md`.
11. Load `prompts/terms.md` to extract key terms and definitions.
12. Write the terms result to `/specs/background/terms.md` (markdown table).
13. Load `prompts/flows.md` to analyze business workflows and generate PlantUML swimlane diagrams.
14. Write the diagrams to `/specs/flows/*.puml`.
15. Load `prompts/scenarios.md` to enumerate business scenarios by node combinations.
16. Write the scenarios result to `/specs/background/scenarios.md` (markdown table).
17. Load `prompts/details_pre_post.md` to create per-node detail folders and generate `pre_post.md` for each node.
18. Load `prompts/details_constraints.md` to generate `constraints.md` for each node.
19. Load `prompts/details_variations.md` to generate `variations.md` for each node.
20. Load `prompts/details_boundaries.md` to generate `boundaries.md` for each node.
21. Load `prompts/details_symmetry.md` to generate `symmetry.md` for each node.
22. Ensure the per-node outputs are written under `/specs/background/scenario_details/`.
23. Load `prompts/dependencies.md` to analyze external dependency systems.
24. Write the dependencies result to `/specs/background/dependencies.md`.
25. Load `prompts/functions.md` to generate feature/function lists grouped by modules and external dependency systems.
26. Write the function list artifacts to `/specs/functions/`:
   - `core.md`: core system function list table
   - `<system_key>.md`: each external dependency system function list table
   - `functions.json`: the unified structured function list data source
   - `functions.html`: the viewer page (create only when missing by copying the built-in template `prompts/functions.html`)
27. Load `prompts/questions.md` to generate question lists and required business materials.
28. Write the questions result to `/specs/background/questions.md` (markdown list).
29. Load `prompts/harness/new/post_new_verify.md` to validate whether functions and scenario_details are complete (login/config/master-data/approval). If it outputs any issues, show the issue list and stop.
30. Return the structured analysis result. STOP. Do NOT proceed to code generation, prototype building, data model creation, or any implementation. The next stages (/vspec:detail, /vspec:verify, /vspec:impl, etc.) are handled by other skills — the user must invoke them separately when ready.

## Prompt Files

- `prompts/background.md`: the prompt used when this skill receives the raw requirement. Includes the full `scheme.yaml` default template and `prototype_ui_convention.md` default template for creating editable project constraints.
- `prompts/stakeholders.md`: the prompt used after the user answers the open questions to generate `/specs/background/stakeholder.md`.
- `prompts/roles.md`: the prompt used after stakeholder analysis to generate `/specs/background/roles.md`.
- `prompts/terms.md`: the prompt used after roles analysis to generate `/specs/background/terms.md`.
- `prompts/flows.md`: the prompt used after terms analysis to generate `/specs/flows/*.puml`.
- `prompts/scenarios.md`: the prompt used after flows analysis to generate `/specs/background/scenarios.md`.
- `prompts/details.md`: orchestrator prompt that defines the execution order for node-level detail analysis.
- `prompts/details_pre_post.md`: the prompt used after scenarios analysis to generate per-node `pre_post.md` under `/specs/background/scenario_details/`.
- `prompts/details_constraints.md`: the prompt used after Pre/Post to generate per-node `constraints.md`.
- `prompts/details_variations.md`: the prompt used after Constraints to generate per-node `variations.md`.
- `prompts/details_boundaries.md`: the prompt used after Variations to generate per-node `boundaries.md`.
- `prompts/details_symmetry.md`: the prompt used after Boundaries to generate per-node `symmetry.md`.
- `prompts/dependencies.md`: the prompt used after details analysis to generate `/specs/background/dependencies.md`.
- `prompts/functions.md`: the prompt used after dependencies analysis to generate `/specs/functions/`.
- `prompts/questions.md`: the prompt used after functions analysis to generate `/specs/background/questions.md`.
- `prompts/question_and_answer.html`: built-in HTML template for interactive Q&A page.
- `prompts/functions.html`: built-in HTML template for function list viewer page.
- `prompts/harness/new/post_new_verify.md`: post-verify prompt to validate functions and scenario_details completeness.

## Suggested Workflow

1. Install this skill.
2. Run `/vspec:new`.
3. Ask the user to input the original requirement and wait for Enter.
4. Load `prompts/background.md` and start requirement analysis.
5. Ask the user to answer the open questions.
6. Load `prompts/stakeholders.md` and generate `/specs/background/stakeholder.md`.
7. Load `prompts/roles.md` and generate `/specs/background/roles.md`.
8. Load `prompts/terms.md` and generate `/specs/background/terms.md`.
9. Load `prompts/flows.md` and generate `/specs/flows/*.puml`.
10. Load `prompts/scenarios.md` and generate `/specs/background/scenarios.md`.
11. Load `prompts/details_pre_post.md` and generate per-node `pre_post.md` under `/specs/background/scenario_details/`.
12. Load `prompts/details_constraints.md` and generate per-node `constraints.md`.
13. Load `prompts/details_variations.md` and generate per-node `variations.md`.
14. Load `prompts/details_boundaries.md` and generate per-node `boundaries.md`.
15. Load `prompts/details_symmetry.md` and generate per-node `symmetry.md`.
16. Load `prompts/dependencies.md` and generate `/specs/background/dependencies.md`.
17. Load `prompts/functions.md` and generate `/specs/functions/`.
18. Load `prompts/questions.md` and generate `/specs/background/questions.md`.
19. Stop. The analysis phase is complete. Suggest the user proceed with other skills (vspec-detail, vspec-verify, etc.) for the next stages.

## Output Goal

This skill produces requirement analysis documents only:

- Clarify business objective and core user scenario.
- Identify key roles, page modules, and interaction flow.
- Extract entities and main data fields.
- Produce a visual-spec-oriented requirement draft ready for the next stage.

Output is limited to `/specs/background/`, `/specs/flows/`, and `/specs/functions/`. No code, models, or prototypes are generated.
