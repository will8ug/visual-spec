---
name: "vspec-append-test"
description: "Generate automation test code based on acceptance cases and specs, integrated with the repository's existing test frameworks. Invoke when user runs /vspec:append-test to add test coverage to an existing project."
---

# VSpec Append-Test Skill

Generates automation test code based on acceptance cases and detailed specs, using the repository's existing test frameworks and conventions.

## Prerequisites

- `/test/验收用例/acceptance_cases.json` (from `vspec-accept`)
- `/specs/functions/*`, `/specs/details/`
- Repository's existing test frameworks (auto-detected)

## What This Skill Defines

- Generate framework-specific test code using existing project conventions.
- Validate test coverage completeness post-generation.
- This skill adds test code to the project — it does NOT execute tests.

## Scope Boundary

This skill generates test code for existing projects. For JSON test case definitions, use `vspec-accept` or `vspec-i-test`. For Playwright scripts, use `vspec-script`.

## Command

### `/vspec:append-test`
1. Read `/test/验收用例/acceptance_cases.json`, `/specs/functions/*`, `/specs/details/`, detect test frameworks.
2. Load `prompts/test.md` → generate automation tests following existing conventions.
3. Write test code to project test directories.
4. Load `prompts/harness/append-test/post_append_test_coverage_check.md` → verify coverage.
5. If issues exist, rerun once focusing on missing items, then re-check.
6. If issues persist after second check, show list and stop.
7. STOP. This command generates tests — it does NOT execute them.

## Prompt Files
- `prompts/test.md`: test code generation prompt.
- `prompts/harness/append-test/post_append_test_coverage_check.md`: coverage verification prompt.
