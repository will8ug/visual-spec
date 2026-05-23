---
name: "vspec-script"
description: "Generate Playwright automation scripts from JSON test cases. Invoke when user runs /vspec:script to convert acceptance and integration test case JSON into runnable Playwright spec files."
---

# VSpec Script Skill

Generates Playwright automation scripts from JSON test cases, converting structured test definitions into runnable browser automation.

## Prerequisites

- `/test/验收用例/acceptance_cases.json` (from `vspec-accept`)
- `/test/集成测试/integration_test_cases.json` (from `vspec-i-test`)

## What This Skill Defines

- Generate Playwright `.spec.ts` files from JSON test case definitions.
- This skill generates test automation code — it does NOT execute tests.

## Scope Boundary

This skill produces Playwright scripts. For test case definition, use `vspec-accept` or `vspec-i-test`. For framework-specific test code, use `vspec-append-test`.

## Command

### `/vspec:script`
1. Read JSON cases from `/test/验收用例/acceptance_cases.json` and `/test/集成测试/integration_test_cases.json`.
2. Ensure `/test/playwright/` exists.
3. Load `prompts/script.md` → generate Playwright tests.
4. Write `/test/playwright/acceptance.spec.ts` and `/test/playwright/integration.spec.ts`.
5. STOP.

## Prompt Files
- `prompts/script.md`: Playwright script generation prompt.
