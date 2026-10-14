---
name: figma-gen1-status-icons
description: gen1 メーター左上のステータスアイコン。参考.ai からのベクター化手順と6枚のノードID、vectorPaths のカンマ非対応という罠。
metadata:
  type: project
---

Figma `wk7kUZfC7dGAv6NpW7UsCv` / page `1041:3973`。2026-09-17、gen1 の左上（Bluetooth の右）に
**スマホ**と**ナビ矢印**を追加。出典は `~/Downloads/参考.ai`。

**参考.ai の正体** — 拡張子は .ai だが中身は PDF 1.6。ベクターは入っておらず、
Light/Dark のメーター**ビットマップ2枚（1071×644, xref 7 と 8）**が貼ってあるだけ。
`fitz.open()` → `extract_image(xref)` で取り出す。`Read` ツールは .ai を開けないので `.pdf` にコピーしてから扱う。

**ステータス列の並び**（左から）Bluetooth／スマホ／圏外／ミュート／通話／**ナビ矢印**／音符／メッセージ。
閾値150での実測 bbox（source px）: BT `x23.90–57.70 y28.50–73.90` (33.8×45.4)、
スマホ `x66.70–92.60 y29.90–74.00` (25.9×44.1)、ナビ `x255.60–288.90 y33.20–74.50` (33.3×41.3)。
**下端そろえ**（BT 73.90 / スマホ 74.00 / ナビ 74.50）、アイコン間 gap = 9.0 source px。
※ 最初に閾値110で取ったらナビが左右とも枠で欠けた。アンチエイリアスを含む緩い閾値で外接矩形を取り直すこと。

**ベクター化** — potrace は無いが cv2 はある。10倍拡大(LANCZOS)→threshold 150→`findContours(RETR_CCOMP)`
→`approxPolyDP(eps=0.0009*arcLength)`。スマホは5サブパス（本体＋画面＋ボタン3）、EVENODD で穴になる。

**罠: `vectorPaths` の data はカンマを受け付けない。**
`"M 4.6,0.0 L ..."` は `Failed to convert path. Invalid command at ,0.000` で落ちる。
**スペース区切り**（`"M 4.622 0.000 L ..."`）にすれば通る。

**配置式**（パネルローカル座標）。`bt/pill` を基準にフレームごとに自動算出:
`s = pill.height / 45.40` ／ `x = 直前アイコンの右端 + 9.0*s` ／ `y = (pill.y+pill.height + bottomOff*s) - refH*s`
（bottomOff: スマホ 0.10・ナビ 0.60、refH: スマホ 44.1・ナビ 41.3）。色は `pill.fills[0].color` をそのまま流用
（light `#333344` / dark `#CDCDDA`）。dark 側はリファレンスの実測色 rgb(203,203,216) とほぼ一致。

**追加済み 6 枚**（セクション `2968:72191`、`icon/phone` → `icon/nav` の順）
PC light `2968:74975` → `3031:22519`/`3031:22520`、PC dark `2968:75089` → `3031:22521`/`3031:22522`、
TAB light `2968:73476` → `3031:36939`/`3031:36940`、TAB dark `2968:73361` → `3031:36941`/`3031:36942`、
SP light `2968:72930` → `3031:36943`/`3031:36944`、SP dark `2968:72816` → `3031:36945`/`3031:36946`。

gen1 パネル内の `HQ…` / `bt/rune (geometric)` は全面白フレームだが乗算系なので、
アイコンは素直に `bt/pill` と同じ親へ appendChild（最前面）で問題なし。
関連 → [[figma-gen2-rider-occlusion]] [[figma-map-sign-english-locale]]

## 間隔のやり直し（2026-09-17）
初回配置後に実測したら **BT→スマホ 2.90 / スマホ→ナビ 2.10** と不均等だった（正解は両方 2.42）。
原因は座標が整数に丸まっていたこと（x=22 / 31、y=13）。**`x` セッターは小数を保持できる**ので、
`pill` を基準に `x = 直前の右端 + 9.0*s` を小数のまま代入し直して解決。6枚とも gap が完全に等しくなった。
検証は「パネルを clone → resize(50,30) で角を切り出し → rescale(10) → get_screenshot → PIL で ink の run を測る」が確実
（`get_screenshot` の maxDimension は拡大しないので、先に rescale して実寸を上げる必要がある）。
確定値: PC gap 2.4188 / TAB 2.4995 / SP 1.3112。下端そろえ（bottomOff スマホ 0.10・ナビ 0.60 × s）。
