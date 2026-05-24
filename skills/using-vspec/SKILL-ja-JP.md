---
name: "using-vspec"
description: "VSpec ワークフロー概要とスキルインデックス。ユーザーが vspec、visual-spec、要件分析ワークフローについて言及したとき、または特定の段階でどのスキルを使うべきか尋ねたときに呼び出します。このスキルを使って完全な /vspec:* ワークフロー、スキルの依存関係を理解し、各タスクに適したスキルを見つけてください。"
---

# VSpec — 可視化要件分析

段階的な `/vspec:*` ワークフローで、一文のアイデアを実行可能なプロトタイプと追跡可能な仕様に変換します。

## VSpec とは？

VSpec は可視化要件分析のための組み合わせ可能なスキル群です。可視化、追跡可能性、早期検証を重視し、誤解による手戻りを減らします。

各スキルはパイプラインの1つの段階を担当します。すべてのスキルは一緒にインストールされますが、独立して呼び出します。

## コアパイプライン（順次実行）

| # | スキル | コマンド | 目的 | 依存 |
|---|--------|----------|------|------|
| 1 | `vspec-new` | `/vspec:new` | ベースライン仕様生成 | — |
| 2 | `vspec-detail` | `/vspec:detail` | 機能別詳細仕様 | `/specs/functions/` |
| 3 | `vspec-verify` | `/vspec:verify` | データモデル + プロトタイプ | `/specs/details/` |
| 4 | `vspec-impl` | `/vspec:impl` | バックエンド + フロントエンドコード | `/specs/models/` |

## 品質と検証
| 5 | `vspec-qc` | `/vspec:qc` | 成果物品質チェック |
| 6 | `vspec-accept` | `/vspec:accept` | 受け入れテストケース |
| 7 | `vspec-i-test` | `/vspec:i-test` | ユニット + 統合テストケース |
| 8 | `vspec-script` | `/vspec:script` | Playwright 自動化スクリプト |
| 9 | `vspec-append-test` | `/vspec:append-test` | フレームワーク固有テストコード |

## 改訂と文書
| 10 | `vspec-refine` | `/vspec:refine`, `/vspec:refine-q`, `/vspec:more-q` | 要件の更新・改訂 |
| 11 | `vspec-doc` | `/vspec:doc` | Word 納品文書 |
| 12 | `vspec-interview` | `/vspec:interview`, `/vspec:i-word` | インタビューアンケート |

## 戦略と計画
| 13 | `vspec-mrd` | `/vspec:mrd` | 市場要件ドキュメント |
| 14 | `vspec-plan` | `/vspec:plan` | 見積もりとデリバリースケジュール |
| 15 | `vspec-upgrade` | `/vspec:upgrade` | レガシー文書からの仕様アップグレード |

> 各スキルの詳細な使用説明については、対応する `SKILL.md`（英語版）を参照してください。
