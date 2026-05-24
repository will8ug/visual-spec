---
name: "using-vspec"
description: "VSpec 工作流总览和 Skill 索引。当用户提及 vspec、visual-spec、需求分析工作流，或询问某个阶段该使用哪个 Skill 时调用。使用本 Skill 了解完整的 /vspec:* 工作流、Skill 依赖关系，以及找到适合每个任务的 Skill。"
---

# VSpec — 可视化需求分析

通过分阶段的 `/vspec:*` 工作流，将一句话的想法转化为可运行的原型和可追溯的规格。

## 什么是 VSpec？

VSpec 是一套可组合的可视化需求分析 Skill。它优先考虑可视化、可追溯性和早期验证，以减少因误解导致的返工。

每个 Skill 处理流水线的一个阶段。所有 Skill 一起安装，但独立调用——你需要的时候，运行你需要的命令。

## 核心流水线（顺序执行）

| # | Skill | 命令 | 用途 | 依赖 |
|---|-------|------|------|------|
| 1 | `vspec-new` | `/vspec:new` | 生成基线规格产物 | — |
| 2 | `vspec-detail` | `/vspec:detail` | 每功能详细规格 | `/specs/functions/` |
| 3 | `vspec-verify` | `/vspec:verify` | 数据模型 + 可运行原型 | `/specs/details/` |
| 4 | `vspec-impl` | `/vspec:impl` | 前后端代码 | `/specs/models/` |

## 质量与验证
| 5 | `vspec-qc` | `/vspec:qc` | 产物质量检查 |
| 6 | `vspec-accept` | `/vspec:accept` | 验收测试用例 |
| 7 | `vspec-i-test` | `/vspec:i-test` | 单元+集成测试用例 |
| 8 | `vspec-script` | `/vspec:script` | Playwright 自动化脚本 |
| 9 | `vspec-append-test` | `/vspec:append-test` | 框架特定测试代码 |

## 修订与文档
| 10 | `vspec-refine` | `/vspec:refine`, `/vspec:refine-q`, `/vspec:more-q` | 更新修订需求 |
| 11 | `vspec-doc` | `/vspec:doc` | Word 可交付文档 |
| 12 | `vspec-interview` | `/vspec:interview`, `/vspec:i-word` | 访谈问卷 |

## 策略与规划
| 13 | `vspec-mrd` | `/vspec:mrd` | 市场需求文档 |
| 14 | `vspec-plan` | `/vspec:plan` | 估算与交付计划 |
| 15 | `vspec-upgrade` | `/vspec:upgrade` | 从遗留文档升级规格 |

> 每个 Skill 的详细使用说明请参见对应的 `SKILL.md`（英文版）。
