---
name: newvisual-roadsync-ui-source
description: メーター画面の唯一の正本＝Figma【Renewal】RoadSync UI (NewVisual)（編集禁止・読むだけ）のファイルキー、ページ ID、使った実画面ノード、別ファイルへ持ってくる手順と罠
metadata:
  node_type: memory
  type: reference
  originSessionId: 34c7af9e-96ca-4ee1-baf0-675d357edf10
  modified: 2026-09-30T09:22:12.065Z
---

2026-09-30 ユーザー指示：**メーターの中身は自作しない。すべて `J3lGEFLlvNiT9isNbejL1D`（【Renewal】RoadSync UI (NewVisual)）の実ファイルから取る。このファイルは絶対に編集しない（読むだけ）。**

- 読むときは get_metadata／get_screenshot／download_assets（読み取り専用）か、use_figma で**読むだけ**のスクリプト（setter・setCurrentPageAsync を使わない、`// READ ONLY` と書く）
- ページ：`21518:136167`「● Design｜App（すべての画面の最新版）」は案内だけ（各機能のページへ移動済み）。Gen2 メーターは `64453:33211` Navigation／`64138:64657` Music／`64453:30262` Call／`64545:70996` Widget／`64545:80819` Navigation & Transition Rule for App（ここのランチャーはスマホ側 MenuOverlay で、**メーターのランチャー円環は NewVisual に無い**）。Gen1 は `6780:281291`「TFTMeter - popup（Gen1）」の section `6780:281292`（Meter インスタンス 795×475、道順案内・音声検索・発信・お気に入り・音楽・メッセージ）
- 使った実画面：Gen2 TBT+Map `64508:47082`、EntireRoute `64508:50590`、Music Top `64656:59683`、Music Pausing `64656:59796`、Gen1 道順案内 `6780:281295`（他の候補：Gen1 道路名つき `6780:281347`、Call Favorite `64545:136152`、TBT のみ `64508:47230/47336`、EST 表示 `82050:115201` 等）
- 実画面の仮テキスト（元のまま）：Gen2 は全部 N・65 km/h・15754km・12:32、TBT+Map「900km / Oakwood second… / 40min 50km」、EntireRoute「50km 40分 13:12到着・015754km」、Music「Music Title / Artist Name / 00:00」。Gen1 は 73 km/h・07:50・GEAR 6・「0 m」直進
- **持ってくる手順**：download_assets（export の PNG）→ upload_assets（先のファイル）→ POST。**罠①** upload はページに 400×300・FILL の枠を作るので、そのまま部品化すると 4:3 に切り抜かれる → 画像の実寸（getSizeAsync）に合わせて作り直す。**罠②** 部品の大きさを後から変えると、rescale 済みのインスタンスも一緒に拡大する（440→875）→ 部品を直したら全インスタンスを狙いの幅に rescale し直す

関連：[[figma-compare-modal-plan4-final]]、[[gen2-meter-simulator-launcher]]
