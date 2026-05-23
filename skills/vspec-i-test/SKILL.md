---
name: "vspec-i-test"
description: "Generate unit-test and integration-test cases (JSON) from scenarios and detailed specs. Invoke when user runs /vspec:i-test to produce structured test cases covering logic, permissions, and branch coverage."
---

# VSpec I-Test Skill

Generates unit-test and integration-test cases (JSON) derived from scenarios and detailed specs, covering logic, permissions, and branch coverage.

## Prerequisites

Reads `/specs/functions/*`, `/specs/background/scenarios.md`, `/specs/background/scenario_details/`, `/specs/background/roles.md`, `/specs/details/`, `/specs/models/*.md`.

## What This Skill Defines

- Generate structured unit test cases (JSON).
- Generate integration test cases (JSON).
- Provide trilingual testcase reader HTML.
- This skill generates test case definitions — not executable test code.

## Scope Boundary

This skill produces test case definitions only. For executable test automation, use `vspec-script` (Playwright) or `vspec-append-test`.

## Command

### `/vspec:i-test`
1. Read `/specs/functions/*`, scenarios, details, roles, models.
2. Ensure `/test/` subfolders exist: `/test/单元测试/`, `/test/集成测试/`.
3. Copy `prompts/testcase_reader.html` → `/test/testcase_reader.html` (overwrite).
4. Load `prompts/i_test.md` → generate `/test/单元测试/unit_test_cases.json`.
5. Load `prompts/i_test.md` again → generate `/test/集成测试/integration_test_cases.json`.
6. STOP.

## Prompt Files
- `prompts/i_test.md`: test case generation prompt.
- `prompts/testcase_reader.html`: trilingual testcase reader HTML template.
