---
name: "vspec-detail"
description: "基于功能清单将需求细节展开为每个功能的详细技术规格。当用户运行 /vspec:detail 时生成 RBAC、数据权限、页面交互、后端逻辑、校验等详细规格文档。当用户需要从功能清单和需求产物生成详细技术规格时，使用此 Skill。"
---

# VSpec Detail Skill（中文）

将功能清单转化为每个功能的技术规格文档，使规格可实现、可测试。

## 何时使用

- `/specs/functions/` 下存在功能清单（由 `vspec-new` 生成）。
- 用户运行 `/vspec:detail` 生成每功能详细规格。

## 本 Skill 的作用范围

- 生成每功能详细技术规格文档。
- 输出覆盖 RBAC、数据权限、页面交互、后端逻辑、校验等的结构化 markdown。
- 本 Skill 不生成原型、数据模型、测试用例或实现代码。

## 范围边界

本 Skill 止于详细规格文档生成。完成后使用其他 Skill：
- `vspec-verify` → 数据模型与可运行原型
- `vspec-impl` → 前后端代码生成

> 完整的命令流程请参见 `SKILL.md`（英文版）。
