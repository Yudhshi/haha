---
name: audit-2026-10-02-full-audit-resume
description: 2026-10-02 の Navi／Call／gen1 vs gen2 全面監査の途中状態（利用上限で中断）— 資料の置き場、ワークフローの再開方法、既に分かった指摘
metadata:
  node_type: memory
  type: project
  originSessionId: 0d4ce68e-2dbd-4a22-a3d4-a67ec0dc9f36
  modified: 2026-10-02T02:35:23.214Z
---

2026-10-02、ユーザー依頼「全面审计 navigation, call, gen1 vs gen2。不放过任何问题」。ファイル `wk7kUZfC7dGAv6NpW7UsCv`。**利用上限で Dump フェーズ途中に中断。** 親：[[figma-call-prototype-plan4]]・[[figma-compare-modal-plan4-final]]。

**資料（セッション再開後も残る場所）**：`~/Desktop/PH2/_audit-2026-10-02/`
- `BRIEF.md`＝監査仕様（期待値・レンズ L1〜L10・指摘 JSON 形式・読み取り専用ルール）。`tools/dump.js`（1 枚ずつ、20KB 上限）、`tools/dump_texts.js`（遷移図のテキスト、ページング）、`tools/facts.py`（dump JSON → 事実表）、`tools/usage_scan.js`（部品の使用元）。`inv/frames.json`＝全 150 枚の節点ID（Navi 42／Call 36／gen 72）＋部品 ID。`inv/navi_meta.xml`・`gen_meta.xml`。`shots/` 全 150 枚＋遷移図 2 枚＋部品の 1x PNG、`sheets/` トラック別コンタクトシート。`context/` メモのコピー。`workflow.js`＝ワークフロー台本（run `wf_2678ceb4-9e9`、script `~/.claude/projects/<project-dir>/0d4ce68e-2dbd-4a22-a3d4-a67ec0dc9f36/workflows/scripts/figma-roadsync-full-audit-wf_2678ceb4-9e9.js`、同セッション内なら `resumeFromRunId` で再開可）。
- 再開手順：`_audit-2026-10-02` を scratchpad/audit に戻す（BRIEF 内のパスは scratchpad 固定）→ Workflow を同じ args（frames.json の中身）で再実行。Dump → Find（10 レンズ×3 対象＋cross 3）→ Critique → Dedup → Verify（live 反証＋意図判定）→ Synthesize（`report/<target>.md` 日本語）。

**罠（今回判明）**：Call ページの `get_metadata` は遷移図コネクタ名の U+2028 で SSE が壊れる → use_figma で `encodeURIComponent`。use_figma の返り値は 20KB で切られる（ファイル保存なし）。サンドボックスに `fetch` は無い。get_screenshot は 1x のみ。部品フレーム `3615:70127`（5920×1460）の外に置かれた部品 5 つ（3641:20994・76117・76161、3684:16331・16380）は get_screenshot が 1×1 になる＝**部品が置き場の枠外にはみ出している（衛生の指摘候補）**。

**次にやること**：Dump から再実行して報告書を artifact（日本語）にまとめ、チャットは中国語で要約。
