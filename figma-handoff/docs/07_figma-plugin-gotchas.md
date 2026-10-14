# 07 use_figma（Figma Plugin API）の落とし穴

実際に踏んだものだけ。`figma-use` スキルの一般的な規則（`return` で返す、色は 0〜1、`figma.notify` 禁止など）に加えて。

## 返り値・実行

- **返り値に U+2028 / U+2029 / 改行が混ざると SSE の JSON が壊れる**（"Failed to parse SSE message"）。文字列を返す前に置換する。正規表現リテラルに直接書くと構文エラーになるので `new RegExp('[' + String.fromCharCode(0x2028) + String.fromCharCode(0x2029) + ']', 'g')` で作る。
- **返り値は 20KB まで**。超えると「Canvas edits from this run were not committed」＝その回の変更も全部取り消し。一覧は深さを絞る。
- 失敗した台本は**何も反映されない**（原子的）。直してから再実行。
- `setCurrentPageAsync` は 1 台本につき 1 回。複数ページは別の呼び出しで。

## ページ・ノード

- ページをまたぐ複製は `clone()` → 別ページの section に `appendChild` でできる。
- **section に付いた変数モードは、中の frame を複製すると外れる**（PH2 _ Dark は section に Semantic=Dark）。複製先の frame に `setExplicitVariableModeForCollection(collection, '44:2')`。
- **flow の起点になっている frame を複製すると flow も複製される**。そのまま `flowStartingPoints` に足すと「duplicate input nodeIds」エラー。nodeId で重複除去してから設定する。
- auto-layout の親に子を足して自由配置したいときは、`appendChild` の後に `layoutPositioning = 'ABSOLUTE'`、それから x/y。clone した部品が ABSOLUTE を引き継いでいることがあるので、AL に戻すときは 'AUTO'。
- `COMPONENT_SET` の子には COMPONENT しか入れられない（地の矩形を set の中に置けない → set の後ろに別の矩形）。
- 複数サイズの variant を Smart Animate でつなぐと instance の左上が基準になる。下端を揃えたいなら variant を同じ大きさにして中身を下揃え。

## 描画・効果

- `vectorPaths` の data は**数値を空白区切り**（`M 3 8 L 8 8`）。`H`・`V` は不可、カンマも不可。
- `NOISE` effect は `blendMode` を入れると検証エラー。`{ type: 'NOISE', noiseType: 'MONOTONE', color, visible, noiseSize, density }` だけ。
- frame の spread 影は無視されることがある → フォーカスリングは子の矩形で。
- アイコン母版を rescale すると instance も拡大する。
- マスクは group 内で被マスク層より下（insertChild(0)）でないと効かない。
- `exportAsync({ format: 'JSON_REST_V1' })` は この環境では使えない。

## プロトタイプ

- **スクロール時の位置（Sticky）は API で設定も読み取りもできない**。frame にあるのは `overflowDirection` と `numberOfFixedChildren`（Fixed）だけ。Sticky が要るときは人に頼む。
- Figma の Sticky は**上端で止まる**だけ（下端で止める設定は無い）。直近の親の範囲を出ると一緒に流れる。→ 画面高の透明 rail の下端に置く方式で「画面下に追従」を作る。
- overlay の位置（`overlayPositionType`）・背景・外側クリックで閉じる は読み取り専用。オーバーレイは中央に出る。画面いっぱいの frame にしておけば位置の問題は無い。
- overlay 内のページ移動は `navigation: 'SWAP'`、閉じるは `{ type: 'CLOSE' }`。
- プロトタイプのデバイス（画面の大きさ）は API から見えない。

## 文字

- Noto Sans JP のスタイルは Regular / Medium / Bold など（`listAvailableFontsAsync` で確認）。文字を変えるときは今のフォントを `getStyledTextSegments(['fontName'])` で読んでロード。

## その他の環境

- Claude in Chrome 拡張が未接続、内蔵ブラウザは Figma 未ログイン → Figma の UI 操作で API の穴を埋めることはできなかった。
