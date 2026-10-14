---
name: figma-new-file-edit-scope
description: 2026-10-14 以降の作業先は Figma GqdgJEkRaGIhRbvzvIKX6V（HONDAサービスサイト）で、編集してよいのは「⎿ 紹介機能｜Navigation」「⎿ 紹介機能｜Call」の 2 つだけ
metadata:
  type: feedback
---

2026-10-14 ユーザー指示：「以后在 https://www.figma.com/design/GqdgJEkRaGIhRbvzvIKX6V/…?node-id=5414-64919 中制作，你只对⎿ 紹介機能｜Navigation和⎿ 紹介機能｜Call有编辑权」。

**2026-10-14 追加**：「● Design｜PH2（PH2 画面の最新版）」3272:52913 も編集可（ユーザー明言）。

**Why:** ファイルは共有の本番ファイルで、他の領域は他の人の作業や参考資料。
**How to apply:** 書き込み（作成・移動・削除・リネーム・反応の変更）は上記 2 つの中だけ。Section 1111・按钮摆放1・参考22/33・レファレンス・image 9・可编辑图层 など他はすべて読むだけ（素材は clone して自分の領域に持ち込む）。旧ファイル wk7kUZfC7dGAv6NpW7UsCv での作業は過去の経緯として [[howto-modal-round2-prologue-note]] 参照。

**2026-10-14 の作業（Navigation page 5414:64919 / Call page 5414:64920）**
- 原型（各 page の section PC/TAB/SP、Navi 42・Call 36 枚）を一括改修：progress を Section 1111 参考のカプセル（章セグメント＋手の点、現在＝青い伸びた棒、auto-layout 名 `progress`）、chips を参考22/33 の塗りタグ（r4・白 Medium・Gen2 #3A7BEA／Android #22A846）、caption Bold、wiz-next #0071E3 平塗り・wiz-prev 枠線、✕ は Apple 丸（#333336／#E8E8ED）、modal 面を #161617@0.92／#F5F5F7@0.94。章：Navi 1–4/5–6、Call 1–3/4–5。部品は旧ファイルのリモート（上書きのみ）。
- PC ドロワー案 section `5458:9033`（右半分 x720 に 708×696、LP 写真は見える、Dark 5458:9034… / Light 5459:72909…、flow「Navi ドロワー案 dark/light」）。page の flowStartingPoints 設定は nodeId で重複除去してから。
- 按钮摆放：分析ボード section `5464:12939`（①②③の論点・メリデメ＋④〜⑧短評、推奨④）、追加案 section `5460:29256`「按钮摆放2」（④アイコン一体型ピル ⑤アイコン＋＋バッジ ⑥テキストリンク ⑦プライマリー ⑧写真上の再生ピル × PC/TAB/SP × ナビ/電話、可编辑图层 と Call の無名 section 5414:203703 から clone）。**罠**：auto-layout 親への追加は layoutPositioning='ABSOLUTE' を付けてから x/y、clone した icon は ABSOLUTE を引き継ぐので AL 内では 'AUTO' に戻す。
- 未：（10-14 第 2 便で解消）Call の PC ドロワー案、ボード目視確認（はみ出し 0）。

**2026-10-14 第 2 便（2 つの会話を統合した続き）**
- 部品 section `5482:13023`「Components · 手把 Gen2 寄せ／矢印ボタン」（Navi page、x-6598 y4300）。
  - 手把 set `5482:13856`「HB Switch / Dial · Gen2 寄せ（右ボタンのみ）」＝旧ライブラリ set（写実 Gen2 質感）の 12 variant を detach→再着色（筐体 #3c3a37→#111010 の中立チャコール、plate はノイズ無しのブロンズ・サンバースト 32 段、cap 24 段、中央キー＝cap の 0.62・角丸 0.21・クッション影、皿＝キーの 0.5、✓ 0.8 倍 #e4e2df、刻印 #ecebe8 線 3.8）。FUNC 系の非表示層は削除。370 枠・層名は旧と同じ。
  - 矢印ボタン set `5483:12975`「ui / paddle」：種類 戻る/次へ/最初から × 環境 × 状態 通常/ホバー/無効、44 丸（TAB は rescale 48）。矢印＝手把の刻印と同形（90°・幅/高 0.51・線 2・丸端）、最初から＝同じ線の反時計回り矢印。Dark #333336／Light #d8d8dd（#e8e8ed は明るい面で消えた）。通常→ホバーは ON_HOVER CHANGE_TO。
- 全原型（Navi 42＋ドロワー 14、Call 36）：手把を新 set に差し替え（新規 instance＋rescale(旧幅/370)）。フッター＝進捗カプセル（非選択章＝章名の文字、選択章＝内側ピル＋トラック／青い fill＝章内 pos/LEN、非選択章を押すと章頭へ SMART 0.35）＋右端に ‹ ›（1 手目の ‹ は無効、最終手の › は 最初から）。SP 進捗は左 x12・ボタン行 y740、TAB 左 x48・y858、PC 進捗中央 560・y548、ドロワー左 x32・y634。序章の 見てみる は `cta · 見てみる` に改名（Smart Animate で丸ボタンへ変形しないように）。台本は scratchpad/footer.js（冪等）。
- Navi ドロワーの closed 帧の drawer を -0 の複製に差し替え（旧進捗・旧ボタンが残っていた）。
- **Call ドロワー section `5493:7549`**（Call page x16300 y-5241、call-pcd-{dark|light}-{closed,0..5}、closed 5493:7550／5493:9432、flow「Call ドロワー案 dark/light」）。Navi ドロワーを型に、bg は Call PC 帧の LP 画像、hs · 使い方を見る (912,511,170,48)、⑤ のスマホは沈め（0.34）。Call LP は写真が左半分なので右ドロワーでも隠れない。
- 既存の不備（未修正・報告済み）：Navi/Call 原型の ✕・scrim・hs の遷移先が null（HONDA 側に closed 帧が無い）。
- GitHub 移行はユーザー希望（優先度低、このラウンド後に相談）。

**2026-10-14 第 3 便**
- 進捗の選択章＝**点**（ユーザー「直線より点が直観的」）：章内の各手に 1 点（SP 6・TAB 7・PC/ドロワー 8、間隔同じ）、済＝白 0.9／Light #1d1d1f 0.75、現在＝青 #0a84ff／Light #0071e3、未＝白 0.28／#1d1d1f 0.22。層は `chapter · N > steps > dot k`。非選択章は章名の文字のまま。
- section `5509:12193`「按钮摆放3（追加案 ⑨〜⑮）」（Navi page x-15136 y9700、ナビの PC＋SP のみ）：⑨ タイル列に破線の「使い方」タイル ⑩ 所要時間つきリンク「▶ 使い方を見る 約1分」 ⑪ 写真全体を押せる（PC ホバー暗幕＋大▶／SP 常設チップ）⑫ 写真内メーター（Glass）にバッジ ⑬ セクション下端の全幅帯 ⑭ SP フローティングピル ⑮ ON-RIDE 扉に入口を並べる（PC）。各行に論点メモ。**罠**：LP の Frame 42 は SPACE_BETWEEN/MAX 揃え、ON-RIDE の Frame 16 は VERTICAL auto-layout（子を足すと文字がずれる→ABSOLUTE）。
- section `5511:13645`「検討用 · PH2 ON-RIDE を Light にする案」（Navi page y17300）：Design｜PH2 の Light にある ON-RIDE 扉（`5414:76514`、PC/TAB/TAB_ham/SP/SP_ham の 5 か所、写真 p03 は Dark と同じ画像）を clone して比較。OFF-RIDE Light は**別に描き直した白いスマホ画像**（同寸 3301×2254・別 hash）で作られていた。A＝同じ写真に OFF-RIDE の処方（露出 .55・コントラスト −.25・彩度 −.4・ハイライト .1・シャドウ .85、上に #e9ecf1 62%、vignette #fafbfd、page fade #e7eaee、文字 #0d0f12/#121417）＝良好、C＝暗い帯のまま上下を地色へ、D＝Day メーターのコラージュ（OFF-RIDE のスマホと対）。Design｜PH2 は未変更（編集権なし）。

**2026-10-14 第 4 便（ユーザー：見てみる に必然性・非選択章が説明に見える・可编辑图层を Coming soon 選択・SP/TAB 下が空く・Call の置き方）**
- **見てみる**＝`ui / paddle` に `種類=見てみる`（Dark 5513:14365／Light 5513:14373、hover 付き）：同じ灰色面・同じ手把形の ›。› の中心を 次へ の › と同じ位置（右端 22）に置き、序章 -0 の CTA を `wiz-next` 名で差し替え（-1 の › と名前一致＝Smart Animate で丸ボタンへ縮む）。根拠＝「前へ進む」は全画面で右下の › が担う、という一つの規則。
- **進捗に章番号バッジ**（`chapter · N > badge(num/check) + label + steps`）：現在＝青塗り白数字＋点、済＝灰塗り ✓＋章名（Regular 灰）、次＝輪郭の数字＋章名（Medium 明るい）。序章は章 1 を「現在・全点未」で表示（序章でも進捗を見せる）。非選択章は押すと章頭へ。
- **SP/TAB 縦配分**（Navi/Call 全トラック）：余白 F＝ボタン行 y − 見出し下端 − キャプション − メーター − 機器群 を 0.157/0.248/0.222/0.373 で配分（SP 24/38/34/57、TAB 28/44/40/67）。キャプション・メーター群・機器群（phone/switch/影/glow/接地面）を移動。台本 scratchpad/relayout.js。
- 可编辑图层（5414:237216）PC/TAB/SP：Gen1 タイルと Coming soon タイルの fills/strokes を交換、Coming soon の文字 0.3→1、暗幕 `Ellipse 1211` は非表示（削除せず）。
- 按钮摆放3 に Call 版（x2200 PC／x3720 SP）：⑨' 右欄上半分の空きに「電話の使い方」カード（着信メーターの縮図）、⑩ 同じリンク、⑪ 写真全体（SP チップは上部）、⑫ 通話チップの右にバッジ、⑬ 帯、⑭ 紫のフローティング。Call LP はタイル列なし・本文下寄せ（Frame 46 SPACE_BETWEEN）・写真内に通話 UI。
- ON-RIDE Light は案 A（OFF-RIDE と同じ処方）で決定（ユーザー）。Design｜PH2 への反映は編集権が必要。
- **罠**：use_figma の戻り値に U+2028 等が混ざると SSE の JSON が壊れる → 名前/文字は置換してから返す。

**2026-10-14 第 5 便（情報の階層・Design｜PH2 反映・案の資料・テーマ切替）**
- **階層の判断（ユーザーは私の意見に従うと明言）**：強調色（青の塗り）は「前へ進む」1 つだけ。`ui / paddle` の 次へ・見てみる を Dark #0a84ff／hover #409cff、Light #0071e3／#0077ed＋白い矢印。戻る・最初から・無効は灰のまま（最終手は前へが無いので青なし）。進捗は単色に格下げ：capsule Dark 白 6%／Light #1d1d1f 5%、選択章 Dark 白 10%／Light 白、現在章バッジ Dark #f5f5f7 地＋#1c1c1e 数字／Light #1d1d1f 地＋白、点 現在 1.0・済 0.5/0.45・未 0.2/0.16、次章 章名 Medium Dark #c7c7cc／Light #3a3a3c、済章 #636366／#8e8e93 ✓。実測の根拠：旧 次へ/戻る は地とのコントラスト 1.45（Dark）・1.21（Light）で同じ見た目、進捗だけが青＝主従が逆転していた。台本 scratchpad/progress_quiet.js。
- **Design｜PH2 ON-RIDE Light**（5 か所 PC 5414:76515・TAB 78908・TAB_ham 81068・SP 83436・SP_ham 85460）：同ブレークポイントの OFF-RIDE Light から frame fill・depth vignette（TAB/SP は新規 clone、ABSOLUTE・STRETCH）・page fade の stops・見出し/説明の色をコピー。写真 p03 は filters exposure .95・contrast −.05・saturation −.5・temperature −.02・highlights .2・shadows .9、上に #f4f6f9 66%。平均輝度 ON 217/224/225 vs OFF 221/226/224（PC/TAB/SP）で揃えた。
- **Design｜PH2 世代タイル**（Dark/Light × PC/TAB/TAB_ham/SP/SP_ham の 10 か所）：Gen1 と Comingsoon のタイルの fills/strokes/strokeWeight を交換、「Comingsoon」→「Gen2」、文字 opacity 1、暗幕 `Ellipse 1211` 非表示、**Light SP/TAB の Coming soon の文字は「無効」変数 691:2395（#8892a4）だった**→ Gen1 ラベルの fills（44:91 等）をコピー。
- 資料 artifact「入口ボタン案の比較」https://claude.ai/artifact/1ZPtwiyjL7GQVxYzqGAu4b （A＝使い方を見る：①②③④⑤⑥⑦⑩⑬⑭⑮⑨'、不採用 ⑧⑨⑪⑫／B＝Gen1とGen2：案1〜12）。評価表・横並び比較・各案カード。ソース scratchpad/doc/index.html＋thumbs/。
- 比較ページに section `5526:16153`「按钮摆放 · 追加案 6〜12（大胆案）」（x-38600）：案6 ミニ比較バナー 7 グリッド先頭の比較カード 8 世代でグループ分け 9 世代フィルター＋？ 10 ホバーでのぞく 11 追従ピル 12 その場で判定（PC 7・SP 4・メモ 7）。推奨：データ無しは案7、データ有りは案12/8。
- **テーマ切替アイコン**（Design｜PH2 section「検討用 · ダーク／ライト切替アイコン（車灯スイッチ案）」x7300 y-5850）：ISO 配光記号の部品 24px（A 点灯/消灯、B ハイ/ロー、Light/Dark、B′ 表示灯色 ハイ青 #3c8ff3・ロー緑 #34c759）＋ C ロッカー set `5538:6312`（選択=ライト/ダーク × 環境、押した側へ CHANGE_TO）。ヘッダー 5 行（現状/A/B/B′/C × Light/Dark）。**発見**：現状は Light・Dark とも同じ月アイコン（状態も行き先も示していない）。複製したヘッダーは変数モード（collection 44:84 の Dark=44:2）を付け直さないと Light で描かれる。

**2026-10-14 第 6 便**
- ドロワー案：LP の暗幕を Dark 0.2→0.42・Light 0.10→0.26（Navi・Call）。写真が主 CTA と競合していた（前便の階層監査でドロワーを見ていなかった＝ユーザー指摘）。
- ON-RIDE Light：荒れの原因は露出・シャドウの持ち上げで暗部ノイズが増幅されたこと（素材は 1237×1280、PC で約 1.16 倍に拡大）。Design｜PH2 の 5 か所を V1（exposure .45・contrast .08・saturation −.6・highlights .12・shadows .3、ベール #f4f6f9 74%）に。高周波ノイズ 1.59→0.87。V2（製品は実物の黒のまま 0.8 倍表示＋楕円アルファマスク、見出し左）は Navi page の検討 section `5511:13645` に。より高解像度の手把写真はファイル内に無し（p03 2 種とも 1237×1280）。
- 否案（⑧⑨⑪⑫・⑨'）削除、按钮摆放3 を ⑩⑬⑭⑮ に詰め直し、旧分析ボード 5464:12939 を削除。比較まとめ section `5567:12471`（Navi page、按钮摆放1 の真上 -15136,-5783）。
- 比較ページ：大胆案 6・7・8・10 を削除。section `5526:16153`（x-32977）＝案9・11・12 を文字だけの入口「Gen1 と Gen2、どう違う？」（？の輪＋疑問文＋›、#3c8ff3）で作り直し、案12 は判定前／判定後。メモ＋おすすめ（今は案11、データ後は案12）。
- テーマ切替（Design｜PH2 section `5537:6222`）：緑を廃止、set `5573:6920`「テーマ切替 · ディマースイッチ型（青）v2」（選択×環境×状態 通常/ホバー/フォーカス×サイズ L72×36/S60×30、つまみがスライド、点灯側は Light #1a6fcd／Dark #3c8ff3＋発光）。ヘッダー（現状 vs v2・PC/SP）と仕様メモ。**罠**：アイコン母版を rescale するとインスタンスも拡大する／frame の spread 影は無視される→フォーカスリングは子の矩形で。
- 未：artifact 1ZPtwiyjL7GQVxYzqGAu4b は削除済みの案を含む旧版のまま（Figma の比較まとめが正）。

**2026-10-14 第 7 便**
- ドロワー（Navi 5458:9033・Call 5493:7549 の全 30 枚）：drawer を x720→732・幅 708→696（写真の端との隙間 12＝右端の余白 12）。中身は右寄せ要素 −12、divider/caption/stage 幅 −12（stage の子 −6）。closed は x1452 のまま。
- ON-RIDE Light（Design｜PH2 の 5 か所）：V1 を OFF-RIDE と同じ明るさに。p03 の filters exposure .5・contrast .25・highlights .3・shadows .15（saturation −.6・temperature −.02 は据え置き）、ベール #ffffff 78%（SP/SP_ham は 76%）。平均輝度 ON/OFF＝PC 220.7/221.0・TAB 226.5/225.7・SP 226.8/224.3、青み（B−R）4.9→3.8（OFF 3.7）。測り方：同じブレークポイントの OFF-RIDE と get_screenshot を並べ、平均・p5/p50/p95 を比較。clone の screenshot は高周波ノイズが低く出る（原本と比べない）。
- 入口案を 1 つの section に統合：`5596:12470`「「使い方を見る」入口 · 残った案のまとめ」（Navi page -15136,-2414、5908×17740）。上に比較ボード（5567:12472）、下に ①②③④⑤⑥⑦⑩⑬⑭⑮ の行（列 x：ナビ PC80/TAB1600/SP2424、電話 PC3094/TAB4614/SP5438、行間 1300）。①②③はユーザーの画像＋ボタンを frame に包んだ。旧 section 按钮摆放1/2/3・比較まとめは削除。ON-RIDE 画質の検討 section 5511:13645 は重なり回避で -9028,9700 へ。
- 比較ページ section 5526:16153 を「入口 → 要点 2 行 → 図」に再設計（ユーザー：押した後に出る比較モーダルの情報量が大きい）。要点＝「Gen1 と Gen2 の違いは 2 つ」＋項目 マップ表示／手元のボタン（モーダル進捗の文字と同じ）、押すとモーダルのそのページ。部品 4 つ（PC ポップオーバー 5600:17029・SP シート 5600:17062・PC 判定結果の帯 5600:17097・SP 判定結果 5600:17123）。案9 押した後 5602:17029/5602:17099、案11 押した後 5602:55286/5602:55483、案12 は判定の行を検索アイコンと同じ 1 行に（PC Frame 14 を SPACE_BETWEEN、判定バーの単独行を削除）、判定後に要点帯。SP の開いた検索欄はアイコンに。**罠**：SP を 844 に切った frame は primaryAxisAlignItems が CENTER だと上が切れる→MIN。
- テーマ切替（Design｜PH2 section 5537:6222）：v2 set 5573:6920 を 24→8 variant（テーマ×状態×サイズ。ライト選択は Light 画面だけ・S はホバー/フォーカス無し）、ON_HOVER→ホバー・ON_CLICK→反対テーマ SMART 0.22。単体アイコン set `5614:6540`（月アイコンと同じ 24px・線 1.8、ヘッドランプ記号、ライト＝消灯 #121417／ダーク＝青く点灯 #3c8ff3＋発光、ホバーで押した後を予告）とヘッダー（PC Light/Dark・拡大・SP）。月アイコンの母版は PH1 ページの icon set「Genre=DarkMode, Style=Bold」662:4363。**罠**：vectorPaths は H 不可・数値は空白区切り／COMPONENT_SET に矩形は入れられない。

**2026-10-14 第 8 便**
- テーマ切替 section 5537:6222：説明文・仕様メモ・ラベルを全削除（ユーザー「設計だけ残す」）、名前の付いた frame で識別。単体アイコン set 5614:6540 は**記号そのもので区別**：ライト＝点灯（ランプ＋光 #121417）、ダーク＝消灯（ランプ中央寄せ＋斜線 #fcfcfc。ランプだけだと「JP D」と文字に読める）。ホバーは同じ記号を青。
- ON-RIDE Light：暗角で文字下の製品を見せる。p03 ベール PC/TAB 48%・SP 44%（白）、temperature 0、depth vignette stops 0→0／.5→.40／1→.92。中央の細部（std）TAB 9→17.8（OFF 19.6）、平均 PC 218.9/221・TAB 224.4/225.7・SP 225.8/224.3。
- 入口案 section 5596:12470：⑤⑥⑭⑮ 削除、残り ①②③④⑦⑩⑬ を行間 1300 で詰め直し（高さ 12620）。⑩＝⑭ のガラスのピル（▶丸＋使い方を見る＋約1分、Call は紫）を本文の流れに置いた「所要時間つきピル」、TAB 版を新規（Navi 5631:12576／Call 5631:13437）。⑬ も TAB 版（5631:76715／5631:77492、帯は本文の左右余白）。②③ のボタン文言「さらに詳しく」→「使い方を見る」。比較ボード 5567:12472 も 7 案に。
- 写実手把 set 5482:13856（全 12 variant 上書き）：Gen2 寄せ＝筐体を青灰 #434a53→#15171a、plate を角丸 0.40 の squircle・マットなトープ #4b443e（ノイズ無し）、スティック頭を艶のある黒、刻印は光らせない（#ecebe8・線 3.2）。傾き＝頭を方向へ 12・軸方向 0.9 に縮め、上面（key/dish/✓）は +3.5 の視差、新層 `cap · side`（頭の側面、反対側に三日月で見える）。
- 比較ページ section `5637:17471`「原型 · 案11 追従ピル」（x-32977 y4700）：PH2 _ Dark の PC/SP を複製（proto PC 5637:56069・SP 5637:58481、flow「案11 追従ピル · PC/SP」）。対応モデル＋メーター&ハンドルスイッチを `region`（PC 5641:20393 下余白 104／SP 5641:20401 下余白 104）で包み、中に画面高の `rail`（PC 5641:20394 1440×720／SP 5641:20402 390×844）＋ピル instance。**rail を Sticky にする操作は API に無い**（scroll behavior は numberOfFixedChildren だけ）→ユーザーが Prototype パネルで Sticky に設定。Figma の Sticky は上端基準・直近の親の範囲内で止まる→画面高の透明 rail の下端にピルを置く方式。ピル set 5638:20441（形 PC/SP × 状態 閉/開、Smart Animate でピル→要点カード、項目→比較モーダル複製をオーバーレイ、✕ で戻る）。モーダル複製 overlay PC 5637:17472/17523・SP 5637:18180/18236（ページ間は SWAP、✕＝CLOSE）。**罠**：flow 起点の frame を複製すると flow も複製される（flowStartingPoints の重複エラーの原因）。参考＝Apple iPhone 18 Pro ページの all-access-pass（position: sticky; bottom 20px、高さ 56、背景 rgb(42,42,45) 72%＋blur、青丸 #0071e3）。

**2026-10-14 第 9 便**
- ON-RIDE：depth vignette と page fade を**同じブレークポイントの OFF-RIDE からそのままコピー**（PC/TAB 0→0／.5→.17／1→.62、SP は 1→.60）。明るさは写真側で：filters exposure 1・highlights .8・shadows .4・contrast .25・saturation −.6・temperature 0、ベール白 PC 67%・他 64%。平均 PC 217.5/221・TAB 224.2/225.7・SP 225.6/224.3、中央の細部 PC 10.7（OFF 11.9）。
- ライト記号を描き直し（24px・線 1.8・丸端）：ランプ＝平らな辺 x12.4（角丸 1.2）〜曲面 x21、y5.2〜18.8／ハイ＝水平 3 本 x3→9（y8.6/12/15.4）／ロー＝斜め 3 本 (9,y)→(3.2,y+2.6)。B 母版 6 つと単体 set に反映。**単体アイコン＝ライト画面はハイビーム、ダーク画面はロービーム**（ユーザーの言う「消灯」はロービームの記号のこと）。
- 新スイッチ v3 set `5669:6670`「テーマ切替 · スライドスイッチ（丸つまみ）v3」（テーマ×状態×サイズ 6 個、L 60×32・S 52×28、丸つまみに今の記号＝インジケーター母版の青、地に反対側の記号 45%→ホバー 80%、押すと SMART 0.25 でスライド）。ヘッダー例 header/close-up/SP header · v3 · Light/Dark（y1408）。
- 写実手把：外側の筐体（黒い輪）を廃止＝boss の塗り・線・効果を消し、plate を 272 全面（角丸 109）にして筐体の影を移す。傾き＝頭を 20 ずらす・軸方向 0.82・上面視差 6・cap · side に縁の光・arc-gap（後ろ側の黒い開き）と arc-contact（前側の当たり）を方向に合わせて配置・`ghost · 中立の位置`（破線、方向 variant だけ表示）。
- 案11：要点カードへの展開は不要（ユーザー）→ 静的「押した後」2 枚を削除、ピル set 5638:20441 は 形=PC/SP の 2 個だけ（押すと比較モーダル複製をオーバーレイ）。原型の region を auto-layout 無しに組み直し rail は通常の子、proto frame の overflow を VERTICAL に。**rail（PC 5641:20394・SP 5641:20402、名前に ★）の Sticky はユーザーの手作業が必要**（API に scrollBehavior が無い・JSON_REST_V1 export も不可・Chrome 拡張未接続・内蔵ブラウザは Figma 未ログイン）。

**2026-10-14 第 10 便**
- 手把 set 5482:13856 を第 8 便の形に戻した（筐体あり・plate 244 squircle r98 外側溝 2.5・傾き 12/0.9/視差 3.5・ghost 削除・arc-gap は後ろ側 ±1.15rad 内径 .5 黒 .6、arc-contact は前側 ±0.6 内径 .92 白 .3）。色は **switch · Gen2 の建模から実測**：筐体 #46505a→#2c3438→#16191c→#0d0e0f（青緑がかった灰）、plate #504a42（暖かいトープ）、頭の外輪は暗い #3a3935→#181713、中央キー #4e4941→#2d2a24（建模の中心はトープ、黒ではない）、well #1c1b17。NOISE effect は blendMode を入れると拒否（noiseType/color/visible/noiseSize/density だけ）。
- ON-RIDE（Design｜PH2 5 か所）＝検討 section の V1 そのまま：filters exposure .45・contrast .08・saturation −.6・temperature −.02・highlights .12・shadows .3、ベール #f4f6f9 74%、暗角・page fade は OFF-RIDE と同値（第 9 便でコピー済み）。
- 案11 原型：PH2 _ Dark の複製は**変数モードが落ちる**（PH2 _ Dark は section に Semantic=Dark 44:2、複製先では未設定→Light 値で描かれていた）→ proto に setExplicitVariableModeForCollection。region の包み込みと下余白をやめてページの並びを原本どおりに戻し（高さ 13749、原本との画素差はピルの静止位置だけ）、region は ABSOLUTE の透明な `track`（y8458〜11333、Header の直下の重なり順）に変更。track 上端＝対応モデル上端−640 なので、対応モデルの上端と一緒にピルが下から上がってきて画面下で止まり、メーター&ハンドルスイッチの「車両をさらに表示」の 32 下で止まる。SP 原型・SP オーバーレイは削除（SP は当面なし）。ユーザーは rail に Sticky を設定済み（動いた）。

**2026-10-14 第 11 便（案の説明を UX 目線で簡潔に）**
- 書き方の型（ユーザー指定：キーワード＋少しの説明・口語・UX 評価）：各案に白いカード「メモ · 案名」＝タイトル／ひとこと 1 行／UX 4 軸のピル（気づく・わかる・ジャマしない・迷わない、◎緑 ○青 △橙）＋前提タグ／いいところ・イマイチ（2〜3 個）。上に「ひと目でくらべる（使う人目線）」の表＋結論 3 行。
- 比較ページ：ユーザーがまとめ直した section `5672:68252`「ボタン位置」（行＝案5,4,3,2,1,9,11,12 の順、PC x398・SP x1918）。古いメモ 10 枚（「比べる前に気付いたこと」含む）を削除し、カードを x2388、まとめ表を x3608 y877 に。結論＝今は案11、データ後は案12（案5 のバッジも）、固定位置なら案1。
- Navigation：section 5596:12470 を PC/SP だけに（ナビ PC80・SP1600、電話 PC2070・SP3590、カード 4060、行間 1000）、古い比較ボード 5567:12472 と行の文字を削除、TAB 14 枚は section「保留 · TAB 版（入口案・いったん外したもの）」へ移動（本 section の下）。結論＝迷ったら④、気軽さは⑩の約1分、押されたいなら⑦（主役ボタンとの順番を先に）。

**2026-10-14 第 12 便（協作用パック）**
- GitHub 協作用の引き継ぎフォルダ `~/Desktop/PH2/roadsync-figma-handoff/`（README・CLAUDE.md・docs/01〜08・memory/ の写し・scripts・assets）。今後の決定はこの docs/05・02・06 も更新する。
- ユーザー側の整理（10-14 夕方時点）：Navi ドロワーは section `PC2` `5672:70398` に移った（旧 5458:9033 は無い）、ON-RIDE 画質の検討 5511:13645 と入口案の TAB 保留 section は削除、入口案 section 5596:12470 とテーマ切替 section 5537:6222 の名前・中の component set 名は空にされている（ID で引く）。
