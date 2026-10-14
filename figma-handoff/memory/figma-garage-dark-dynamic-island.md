---
name: figma-garage-dark-dynamic-island
description: Garage/Garage-dark 画面の Dark 化手順（ライブラリの Light/Dark モード）と自作 Dynamic Island コンポーネントの実測値
metadata:
  type: project
---

Figma `wk7kUZfC7dGAv6NpW7UsCv` ページ「Work space」`1041:3973`、右下 x≈82500〜84200 / y≈27700 の **Garage 画面群**（375×812、iPhone X 系）。2026-09-08 作業。

**Dark 化はライブラリの変数モード切替で完結する。** ローカル変数コレクションは 0 件、色はすべてリモートライブラリ変数。フレームに explicit mode を立てるだけで背景グラデ・文字・ステータスバー・TabBar・Divider が一括で変わる。

| コレクション | ID | Light / Dark modeId |
|---|---|---|
| Semantics | `VariableCollectionId:afceb130293c139a376ffbbba38fb627055caf47/37831:792` | `6384:0` / `25406:2` |
| Component | `VariableCollectionId:95f0e851a1fad16abbe363aa60c2cf2eef1460ff/26227:10` | `26227:0` / `26227:1` |
| Primitive | `…/29888:401` | Mode 1 / Dynamic Type Test（明暗なし） |

```js
frame.setExplicitVariableModeForCollection(collection, darkModeId)
```

**変数だけでは変わらない唯一の部品＝`Garage_Circle`**（車体下の展示台リング、COMPONENT_SET `2581:41725` @ 8058,1427）。バリアント `プロパティ1 = light | dark` を手で切り替える。ほかの実例（NavigationBars / StatusBars / NavigaitonBar / icon / Component 1）に明暗バリアントは無い。

**未バインドの塗りは 2 か所だけ**（Wifi の 3 path と ⋮ の 3 ellipse）。どちらも BOOLEAN_OPERATION の中で、実描画は変数バインド済みの親の色なので直す必要なし。

**Dynamic Island は既製品が無いので自作した**：`StatusBar/DynamicIsland` COMPONENT **`2611:21015`**（key `1928037f0ea8366a493d49ff1b90e81818bd60e4`）@ 82566,29700。リモートの `StatusBars` セットは `ModalStack=True|False` だけでノッチ／島のバリアントを持たない。

- 本体 **126×37 / r18.5 / 純黒 #000 / clipsContent**。ハードウェアなので変数にバインドしない＝Light/Dark 両方で黒のまま
- 実機準拠の配置は上インセット 11pt だが、**この 375 幅のステータスバーは時刻の中心が y=32** なので `y=13.5`（島の中心 32）に置いて時刻と揃えた。右側アイコン群は元コンポーネントの都合で中心 y=35.5 とズレている（直せない）
- レイヤ構成（下→上）：`sensor · TrueDepth` d9 @21.5,14（不透明度 0.30＋blur0.6、1× ではほぼ見えないのが正解）/ `camera · housing` d11.5 @95.75,12.75 / `camera · lens` d9.5 @96.75,13.75（GRADIENT_RADIAL 中心ほぼ黒→縁 #131822、stroke 0.5 INSIDE 不透明度 0.16）/ `camera · aperture` d4.2 / `camera · glint` 2.4×1.7 白 0.13＋blur0.6 / `camera · catchlight` d1.4
- **写実チューニングの勘所**：リングと glint を強くすると 8× で「ガラス玉」に見える。ring 0.16・glint 0.13 まで落とし、中心に aperture を敷くとレンズに見える。左センサーを 0.55 で置くと 1× で「カメラが 2 個」に見えるので 0.30 まで落とす

**インスタンス内は動かせない。** `set_y: This property cannot be overridden in an instance: relative-transform` が出る。位置を変えたいときは親オートレイアウトの **padding で寄せる**（例：CBR500R タイトルを 27px 下げるのに `Frame 1597880474` の paddingTop 8→35）。paddingTop / itemSpacing はインスタンス内でも上書きできる。子の削除も不可なので **visible=false** で消す（ノッチ、logoarea はこれで非表示にした）。

**`node.query()` は非表示ノードにヒットしない。** 隠した Notch / logoarea を探しても null が返る＝消えている証拠として使える。

`SF Pro Text` はこの環境に無い（ステータスバーの 9:41）。`loadFontAsync` を全文字に流すと落ちるので try/catch で飛ばす。

**ステータスバーは Apple 公式キットの `Status Bar - iPhone` に差し替えた**（`Background=False`、componentKey `306a7dd7d7ad637a44fe791d48466d86da257255`、COMPONENT_SET `Status bar - iPhone` key `51ddb19de206b67eae2d554b1d20c018feb754f4`、ライブラリ「iOS and iPadOS 26」）。実測 **402×54**＝iPhone 16 Pro 幅。

- **`importComponentByKeyAsync` は失敗する**：`Not permitted to upsert from library "lk-a5b98…"`。このライブラリはファイルに未追加のため。**回避＝ユーザーがキャンバスに置いた既存インスタンスを `clone()` する**（`2620:42165` @81911,28405 がその原本。消さないこと）
- 色は Apple キットの変数コレクション **`System Colors`**（`VariableCollectionId:9aa3bdc44acc72eccf7044800c08cf476c43fb7a/3081:779`、modes Light `404:0` / Dark `404:1` / Dark Elevated `548:0` ほか IC 系 3 つ）。フレームに Dark を立てると白文字になる。未バインドの塗りはゼロ
- Garage-dark には **375×54 にリサイズして y=0 に ABSOLUTE 配置**（`2627:21032`）。旧 `StatusBars`（`I2581:41768;3088:165793`、47pt）は visible=false、代わりに親 `NavigationBars` インスタンス `2581:41768` の **paddingTop=47** でナビ行の y=47 と全体高 97 を維持
- **7pt の未解決点**：本来 54pt バーなら下のナビ行は y=54 から始まる。812 高フレームだと合計 819 になり TabBar がはみ出すので 47 のままにした。正しく直すならフレームごと **402×874（iPhone 16 Pro）** に作り替える
- Apple バーの内側 Frame は y=21/h=22＝**中心 y=32**。Dynamic Island も y=13.5 で中心 32 なので両者はぴったり揃う

**Light 版（`Garage` `2581:41854`）にも同じ差し替えを適用済み**：`NavigationBars` `2581:41855` の paddingTop=47＋旧 `StatusBars` `I2581:41855;3088:165793` を visible=false、Apple バー `2629:21029`、島 `2629:21041`。**Light 側は explicitVariableModes を空のままにするのが正解**＝`Labels/Primary` が既定の Light モードで解決して #000 になる（Dark を立てるとここだけ白文字になって破綻する）。島は Light でも純黒のまま。

2 行目の複製（y=28644）も 54pt バーに差し替え済み：`Garage-dark` `2600:42001`（nav `2600:42002` / バー `2631:21182` / System Colors=Dark）、`Garage` `2600:42008`（nav `2600:42009` / バー `2631:21194` / モード指定なし＝Light）。**この 2 枚だけ Dynamic Island は入れない**（ユーザー指示）。ノッチは 4 枚とも非表示のまま。
