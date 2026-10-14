---
name: figma-map-sign-english-locale
description: gen2 メーター内マップの標識は英語ロケール統一（止まれ→八角形STOP）。変換手順と未対応ノード一覧。
metadata:
  type: project
---

Figma `wk7kUZfC7dGAv6NpW7UsCv` / page `1041:3973`（Work space）の gen2 メーター内マップは
**英語ロケール**（Riverside Drive / Harbor St / Arrival / km/h）。標識も英語版に揃える。

2026-09-16、ユーザー決定：**「止まれ」逆三角 → 上辺フラットの赤い八角形 STOP**（文字だけ差し替える案は不採用）。

**変換レシピ**（標識は GROUP "Group 5569" = 非表示 Rectangle 6447 + POLYGON "Polygon 54" + TEXT）
1. `poly.pointCount = 3 → 8`、`poly.rotation = 22.5`（上辺フラット）。fill #FF1212・白 INSIDE stroke・cornerRadius はそのまま流用できる。
2. rotation は左上基準で回るので、`relativeTransform` から回転前後のローカル中心を出して `poly.x/y` を差分補正しないとズレる。`absoluteBoundingBox` は親のスケールが挟まると使えない。
3. TEXT は `Noto Sans Bold` を `loadFontAsync` → `textAutoResize='WIDTH_AND_HEIGHT'` + CENTER/CENTER → `characters='STOP'` → **fontSize は仮置き後に実測幅で再計算**し、文字幅が標識幅の 0.62 になるよう合わせる。レイヤー名も STOP に。
4. 検証は `node.screenshot({scale:8〜20})`。`get_screenshot` の `maxDimension` は**拡大には効かない**（18px のノードは 24px のまま返る）。

**対応済み** — セクション `2968:72191`「PC・TAB・SP最新画像/差し替え用」の6枚
PC Light `2968:74910`/`2968:74911`、PC Dark `2968:75860`/`2968:75861`、
TAB Light `2968:73958`/`2968:73959`、TAB Dark `2968:73741`/`2968:73742`、
SP Light `2968:72751`/`2968:72752`、SP Dark `2968:72535`/`2968:72536`（polygon/text の順）

**未対応の「止まれ」テキスト 15 件**（旧セクション。差し替えを頼まれたらここ）
`2351:21871` `2351:22314` `2351:22864` `2351:23080`（PC/SP 旧）、
`2382:22530` `2382:22748`（TAB 旧）、
`2766:22044` `2766:22260` `2766:23529` `2766:23972` `2766:24419` `2766:24636`（同名の旧セクション `2766:21699`）、
`2795:22401` `2795:23694` `2795:22186`（PC セクション `2795:22035`）

同名セクションが2つあるので注意：`2766:21699` が旧、`2968:72191` が最新。
関連 → [[figma-offride-3versions]] [[figma-mockup-dof-filter-grade]]
