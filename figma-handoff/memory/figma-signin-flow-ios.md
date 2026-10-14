---
name: figma-signin-flow-ios
description: 居住地・Tos/PP・サインイン flow の iOS 版（_ios セクション）の作り方・節点ID・変換規則と既知の落とし穴
metadata:
  type: project
---

Figma `wk7kUZfC7dGAv6NpW7UsCv` ページ「Work space」。2026-09-02 に **`居住地・Tos/PP・サインイン` `2269:50376`（33293,64561 / 17088×4446、Android 360幅）→ `居住地・Tos/PP・サインイン_ios` `2269:55082`（33293,69902）** へ 43 画面を iOS 化。

**配置ルール＝元の座標をそのまま使い y だけ +3100。** 元セクション上部にあった「削除予定」ブロック（x80..3805 / y107..2943）は無改変で残し、その下に flow 全体を再現。セクションは `resizeWithoutConstraints(16500, 7700)` に拡張。**元の横間隔は最小 384px なので 360→375 にしても重ならない**（検証済み・フレーム重なり 0）。

**画面の型と変換（[figma-ios-conversion-section] の規則を踏襲）**
- A: `System bar` のみ（Splash / Loading / IndiaError）→ **NavigationBars 47**（`2200:13948` を clone）+ HomeIndicator。中身は frame 中央に置き直す
- B: `System bar`+`TopAppBars`（戻る矢印あり）→ **NavigationBars 91**（`2200:14317`）+ HomeIndicator
- C: `System bar`+`Buttons/Bottom`（ロゴ系サインイン）→ NavigationBars 47 + Buttons/Bottom（中の `NavigationBar` を非表示にして 144→128）+ HomeIndicator
- D〜I: auto-layout 型。`Frame 1321315354` から System bar/TopAppBars を消して NavigationBars 91 を index0 に挿入。**検索バー等が残る場合は容器を残す**（SelectCountry は 152→91+64）。下端は `Buttons/Bottom` / `Frame 1321315358` 内の `NavigationBar` を非表示 → `primaryAxisSizingMode='AUTO'` で 84→68・132→116 に縮む
- J: **チュートリアル6枚は既に iOS 版が _ios 内に存在した**（`2269:55083/55261/55375/55190/55146/55104`）。作り直さず clone して flow 位置へ。テキスト一致で対応を検証済み
- 特殊: `長い時` は iOS チュートリアル雛形 `2269:55190` に倣う（NavigationBars 47 を ABSOLUTE で重ね、Buttons/Bottom 内の NavigationBar は**残す**＝雛形と同じ）／`DataPrivacy` は instance を FILL 化＋内部 System bar 非表示／`Contact - CountryRequest`(361幅・Googleフォームのスクショ) と `レスポンシブ時の背景`(604幅) は**そのままコピー**
- 除外: `Frame 1597880598` `2269:50406`（ロゴだけの作りかけ断片）、`Android書き出し用` `2269:51395`、コネクタ4本（Android フレームを指すため）

**テキストスタイル対応（Android→iOS）**：H1/H2→iOS/Title2、Body1・`Japanese/Default/Body1`(Noto)・`English/Default/Body2`→iOS/Body1 or Body2、Body2→iOS/Body2、Caption→iOS/Caption、Subtitle1・`Alternative/Body1(M)`→iOS/Subtitle1、Button2→iOS/Button2。**Button1（次へ等）と「居住地がリストに含まれていない」リンクは参照画面が Android スタイルのままなので触らない。** 243ノードに適用。
- **`iOS/…/Title1`（28px）はライブラリのどこにも存在しない。** 元 H1（Noto Medium 28）の見出しは iOS/Title2（Hiragino W5 24）に落ちる＝4px 小さくなる
- 地図/音楽ウィジェット・Google アカウント選択（`Frame 1321315361` のスクショ）内の Roboto/Noto は**アプリ内モックと Google 自身の UI なので変換しない**

**iOS アラートを新規に作るときの落とし穴（2回踏んだ）**
1. 折り返しテキストに `layoutSizingHorizontal='FILL'` だけを与えると幅0に潰れる。**`layoutSizingHorizontal='FIXED'` → `resize(w,h)` を明示する**
2. `resize(w,h)` は text の `textAutoResize` を NONE にする。**characters 設定と resize の後にもう一度 `textAutoResize='HEIGHT'` を入れて高さを再計算させる**
3. **Hiragino スタイルを当てた後は再レイアウトできない**（フォント未インストールのため）。幅0のまま style を当てると1文字1行で固定され復旧不能 → **必ず Noto の段階で正しい幅・高さにしてから `setTextStyleIdAsync`**
4. 完成形＝幅270・角丸14・`#F2F2F2`、content padding 19/16、divider `#3C3C43@0.29`、アクション行 44px を縦線で2分割、文字色 `#007AFF`

**残課題**：Google アカウント選択は Android のスクショのまま（iOS の Google サインインシートは別途必要）。ForceUpdate の Snackbar は DS のアプリ内コンポーネントなので iOS でもそのまま残した。

**監査で判明した重要事項（2026-09-02 第2ラウンド）**
- **このファイルには iOS の作法が2種類ある。** ①完全版＝375×812・NavigationBars＋**HomeIndicator 34**（`2200:13947`/`14316`/`14388` 等、セクション2200の主要画面）。②中途版＝375×**800**・NavigationBars 47 のみで **Buttons/Bottom の中の Android `NavigationBar` 16 が残っている**（チュートリアル `2200:15304`/`15325`、`2200:15526`、`2269:55083`〜、`2269:55441`）。②は本文も **Noto のまま**で、フォント差し替えもされていない
- 納品物は①に統一した。_ios に置いたチュートリアル7枚（`2279:21046/21067/21181/21231/21302/21346`＋`2280:21367`）は **800→812・Android ナビバー非表示・HomeIndicator 追加・本文を iOS スタイルへ**変更済み。**チーム側の原本（2200:15304 等・2269:55083 等）は未変更なので、原本も揃えるか要判断**
- 高さ調整のコツ：チュートリアル型は「hero=HUG／テキスト帯=FILL」なので、**テキスト帯を FIXED にしてから hero を FILL** にすると hero が 6px 吸収して 812 にちょうど収まる（テキストを潰さない）。子の名前は画面ごとに違う（`Frame 1597880499`/`1597880600`、`Frame 1321315652`/`1597880504`）ので**名前でなく layoutSizingVertical の役割で拾う**
- **はみ出し検査は「元セクションと同じ検査をして差分を取る」のが正解。** 絶対座標で「最も近い clipsContent の祖先」と比較する。結果＝iOS 6件／元 6件／新規 0件。`長い時` の本文が ‹ › に被って切れるのは**元からの仕様**（長文時の見え方を示す画面）
- グループやインスタンス内部の子は親フレーム座標系なので、単純な「子が親をはみ出す」判定は誤検知の山になる（790件出た）
- ABS オーバーレイは高さも 812 に揃える（`2277:31642` は 801、`2277:31999` は 800 のままだった → 修正済み）
- 残す Noto は 34ノード＝`次へ`(Button1)×15・`居住地がリストに含まれていない`(リンク型Button2)×7・`Sign in with Google`×5 ほか。**参照 iOS 画面も同じ状態**なので正しい
- `iOS/…/Title1`(28px) はライブラリに無い → H1 見出し計 **14ノード**が Title2(24px) に落ちている（ToS/PP・サインインして始める・チュートリアル見出し）
