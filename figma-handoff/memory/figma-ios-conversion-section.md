---
name: figma-ios-conversion-section
description: iOS版セクション（2200:13931）の Android→iOS 変換ルール・新規12画面の節点ID・Hiragino が使えない制約
metadata:
  type: project
---

Figma `wk7kUZfC7dGAv6NpW7UsCv` ページ「Work space」`1041:3973`、セクション **`iOS - バイク/モデル選択・ペアリング・通知/HEREパーミッション` `2200:13931`**（33293,51886 / 19805×9846）。2026-09-02 に「赤枠＝iOS版未作成」の12画面を iOS 化。

**赤枠の正体＝フレーム自身の SOLID #ff0000 stroke。** clone すると赤枠も付いてくるので `strokes=[]` を必ず実行する。赤枠画面＝幅360（Android）、枠なし＝幅375（iOS）。この幅で機種を判別できる。

**Android→iOS の変換規則（このファイルの既存 iOS 画面から抽出）**
- フレーム 360×800/812/824 → **375×812**
- 上部 `Frame 1321315354`（System bar 24 + TopAppBars 64 [+ 進捗 34]）を削除し **`NavigationBars` ModalStack=False（375×91、戻る矢印付き・タイトル空）** を挿入。進捗バーがある画面は `Frame 1321315528`（375×34）を y=91 に。コンテンツは y=125 開始
- モーダル（ペアリングを開始）は **NavigationBars ModalStack=True（375×118、✕ 付き）**、コンテンツ y=118、下部リンク Button 343×32 @(16,612)
- 下部 `NavigationBar`（Android 16px）→ **`HomeIndicator` 375×34 @(0,778)**
- 本文コンテナ幅 328 → **343**（`Frame 1321315363` を FILL にすると中の `Top` 328 が x=7.5 で自動センタリング＝既存 iOS 画面と同じ作り）。Cards は 343、`Cards/Motorcycle` は **163.5**（(343-16)/2）
- コンテンツの itemSpacing は Android 40 → **iOS 参照 `2200:14316` に合わせて 32**
- 参照テンプレ：全画面＝`2200:14316`／モーダル err＝`2200:14388`／Gen2 モーダル＝`2200:15865`。部品 clone 元＝nav `2200:14317`／進捗 `2200:14318`／HomeIndicator `2200:14338`／下部ボタン枠 `2200:14335`

**フォント：Hiragino Sans は環境に無いが、テキストスタイル経由なら適用できる。**
- `loadFontAsync({family:'Hiragino Sans'})` は失敗する（環境にあるのは Noto Sans JP / SF Pro）。よって `characters` と `fontSize` の直接変更は不可
- **しかし `await node.setTextStyleIdAsync(iOSスタイルID)` は Hiragino 未インストールでも成功し、フォントが Hiragino に変わる。**これがこのファイルでの唯一かつ正しい変換手段
- `clone()` と `resize()` もフォント未ロードで通る（同じ文字列の既存 Hiragino ノードを複製して差し込める）
- **iOS スタイル ID（remote ライブラリ）**：Title2 `S:5537d4583298267fcb66b743312c5f3eccc5b7e5,30133:207`（W5 24）／Body1 `S:658f59470dcdc7617db7552b2080e45aa26ca9d2,30133:211`（W3 16）／Body2 `S:04590279d265acaba23d705ed6b15f1c5928952b,30133:212`（W3 14）／Caption `S:f1aae86ff4a4ad6e99a6d732646c9219c3fa6680,30133:215`（W3 12）／Button2 `S:a37e46055a25a754e79385b239e0844232b860f7,30133:214`（W5 14）／Subtitle1 `S:65e7c88634f548bf6c21b7a17fc0935038268318,29888:441`（W5 16）
- **参照画面（枠なし iOS）の実際の使い分け＝これに合わせること**：見出し→iOS/Title2、説明文・カード名・エラー文→iOS/Body1、小ボタン（もう一度試す/再読み込み）→iOS/Button2、ナビタイトル→iOS/Subtitle1。**逆に「1/3」キャプション・「次へ」(Button1)・「ペアリングできない場合」(Button2) は参照画面自体が Android スタイル（Noto）のまま**なので触らない
- `rescale()` でサイズだけ変えた text は box 高さが古いまま残る（22.86 になる）。スタイル適用後に `resize(w-1,h)`→`resize(w,h)` で reflow させると参照と同じ 24 になる

**作成した12枚（すべて y=2900、セクション相対 x は元 Android と同じ）**
`2215:13019` A1 セットアップ開始／`2215:13104` A2 selected／`2216:13127` A3 skeleton01／`2216:13189` A4 skeleton02／`2216:13251` A5 画像エラー／`2217:13233` SignIn-Loading／`2220:13368` Gen2パスキー（iOS アラート+数字キーパッド自作）／`2210:12884` Gen2パスキー間違い／`2210:12897` 位置情報オフ／`2217:13283` バイクの選択／`2217:13353` モデルを確定／`2210:12910` ②失敗。モーダル4枚は参照の iOS 命名に合わせて `Onboarding - CantConnect` に改名済み。ラベルは y=2780、緑バナー「iOS版（作成済み）」は y=2660。重なり検査済み（0件）

**落とし穴：セクション内ノードの `clone()` は親が SECTION ではなく PAGE になる。** そのまま x/y を入れると canvas 絶対座標になって別の場所に飛ぶ。`sec.appendChild(n)` してから x/y（セクション相対）を設定すること。ラベルのように最初から appendChild したものは正しい

**E2（モデルを確定）だけ縦が足りない**：91+16+68+32+504=711 で下部ボタン 710 とぶつかるため、`Buttons` フレームを `layoutPositioning='ABSOLUTE'` で y=710 に置いた（Android 版も Buttons/Bottom が ABSOLUTE だったので同じ作り）
