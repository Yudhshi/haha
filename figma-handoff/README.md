# Honda RoadSync LP（PH2）— Figma 作業の引き継ぎパック

最終更新：2026-10-14
対象：Honda RoadSync のサービスサイト（PH2）の Figma 作業。主に「使い方」モーダル（ナビ・電話）と「Gen1 と Gen2 の違い」比較モーダル、その入口（ボタン位置）の検討。

このフォルダは、別の人や別の Claude Code が同じ文脈で続きを作業できるようにまとめたものです。Figma の実体はクラウド上にあり、ここには **文脈（決めたこと・理由・節点 ID・規則・落とし穴・台本）** だけが入っています。

---

## 最初に読む順番

1. [`CLAUDE.md`](CLAUDE.md)：Claude Code 向けの作業規則（編集してよい範囲・やってはいけないこと・進め方）。**必読**
2. [`docs/01_project-overview.md`](docs/01_project-overview.md)：何を作っているか、全体像
3. [`docs/02_figma-map.md`](docs/02_figma-map.md)：ファイル・ページ・section・部品の節点 ID 一覧
4. [`docs/03_rules-and-preferences.md`](docs/03_rules-and-preferences.md)：編集範囲、デザイン原則、ユーザーの好み
5. [`docs/06_open-items.md`](docs/06_open-items.md)：未決・待ち・手作業が要るもの
6. [`docs/04_design-specs.md`](docs/04_design-specs.md)：今の確定値（色・寸法・構造）
7. [`docs/05_decision-log.md`](docs/05_decision-log.md)：2026-10-14 の作業履歴（第 1〜11 便）
8. [`docs/07_figma-plugin-gotchas.md`](docs/07_figma-plugin-gotchas.md)：use_figma（Plugin API）の落とし穴
9. [`docs/08_methods.md`](docs/08_methods.md)：明るさの実測・画素差分・UX 評価カードのやり方
10. [`docs/09_audit-2026-10-14.md`](docs/09_audit-2026-10-14.md)：3 ページの全面監査の結果（直すべき点の一覧）
10. [`memory/`](memory/)：作業中に書き溜めた詳細ノート（原文のまま。古い経緯も含む）

## フォルダ構成

```
roadsync-figma-handoff/
├── README.md                 ← このファイル
├── CLAUDE.md                 ← Claude Code 用の作業規則（最初に読む）
├── docs/
│   ├── 01_project-overview.md
│   ├── 02_figma-map.md       ← 節点 ID 一覧
│   ├── 03_rules-and-preferences.md
│   ├── 04_design-specs.md
│   ├── 05_decision-log.md
│   ├── 06_open-items.md
│   ├── 07_figma-plugin-gotchas.md
│   └── 08_methods.md
├── memory/                   ← 詳細ノート（原文。MEMORY.md が索引）
├── scripts/
│   ├── measure_brightness.py ← 画像の明るさ・ノイズ比較
│   ├── ux_cards_builder.js   ← 案の UX 評価カードを Figma に作る台本の部品
│   └── figma_snippets.md     ← よく使う use_figma 台本の抜粋
└── assets/                   ← 参考スクリーンショット
```

## Figma ファイル

| 名前 | file key | 役割 |
|---|---|---|
| HONDAサービスサイト | `GqdgJEkRaGIhRbvzvIKX6V` | **現在の作業先**（共有の本番ファイル）。https://www.figma.com/design/GqdgJEkRaGIhRbvzvIKX6V/ |
| 旧作業ファイル（wk7k） | `wk7kUZfC7dGAv6NpW7UsCv` | 2026-10-14 以前の作業先。メーター・スイッチ・FUNC key などの**ライブラリの元** |
| NewVisual | `J3lGEFLlvNiT9isNbejL1D` | メーター画面 UI の正本。**読むだけ・編集禁止** |

## 必要な道具

- Figma MCP（`use_figma`・`get_screenshot`・`get_metadata`）と Figma の `figma-use` スキル
- Python 3 ＋ Pillow ＋ numpy（`scripts/measure_brightness.py` 用）

## GitHub へ上げる手順（例）

```bash
cd roadsync-figma-handoff
git init
git add .
git commit -m "Add Figma handoff context for Honda RoadSync PH2"
git remote add origin <your-repo-url>
git push -u origin main
```

画像（assets/）は合計約 5MB。不要なら消してもドキュメントは読めます。

---

## 中文摘要

这是 Honda RoadSync 服务网站（PH2）Figma 工作的交接包。Figma 文件本身在云端，这里只放“上下文”：做了什么、为什么、节点 ID、编辑规则、踩过的坑和脚本。

- 当前工作文件：`GqdgJEkRaGIhRbvzvIKX6V`（HONDAサービスサイト）。只能编辑 4 个页面：⎿ 紹介機能｜Navigation、⎿ 紹介機能｜Call、⎿ Gen1とGen2の違い（保持原格式），以及 ● Design｜PH2 里明确指定的部分。
- 和用户对话用中文，Figma 画布上的文字用日文。
- 先读 `CLAUDE.md`，再按上面的顺序读 docs。
- 未决事项在 `docs/06_open-items.md`。
