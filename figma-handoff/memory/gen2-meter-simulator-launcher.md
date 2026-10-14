---
name: gen2-meter-simulator-launcher
description: Xcode のメーターシミュレーター（~/Desktop/シミュレーター）の場所と、そこから読み取れた Gen2 の FUNC＝ランチャー切替の実際の挙動
metadata:
  node_type: memory
  type: reference
  originSessionId: 34c7af9e-96ca-4ee1-baf0-675d357edf10
  modified: 2026-09-29T23:59:32.172Z
---

2026-09-30 ユーザー提供。`~/Desktop/シミュレーター/`（`SAB-BLE-Meter-Simulator-20260807` が新しい方、`-master` は旧）。**見た目は最新ではない**。最新デザインは Figma の「5inch TYPE-0＋APP」（ユーザー談。ローカルにもこのファイルから見えるライブラリにも無い → リンクをもらう必要あり）。

**Gen2 の FUNC（`menuUp/DownShort` 0x06/0x07）の挙動**（`gen2/repository/Gen2Repository.swift` の dispatchKey / showLauncher）
- 押すと**ランチャー**（縦の円環アイコン列、303×303、中央 82px・±1 は 47px・±2 は 30px）が今の画面の上にフェードイン 0.15s → 次の項目へ回転 0.4s。続けて押すと 1 つずつ回る。**無操作 2.0s で中央の項目の画面へ切り替わる**
- 並び：HOME → APP 1…n（スマホアプリ側の割り当て順、アイコン ID）→ CONFIG の循環
- ランチャーアイコン ID（`Assets.xcassets/launcher-icons/launcher_{id}_{large|medium|small}` の SVG）：1 Home・2 Call・3 Navigation・4 Music・5 Message・6 Configuration・7 Volume・8 Mic・9 Pin Drop・10 Action Cam・15 General apps・16 Star・17 E-Comp（11–14 は予約）
- **FUNC は「矢印だけ ⇄ 地図つき」を切り替えるボタンではない**。ナビの TbT（Template 53/54）と MAP（55/56）の切替はスマホアプリ側の画面送出で決まる。5way の左右は Home ではウィジェット送り、App 画面中はキーがアプリへ送られる
- App 画面テンプレート：50 Music full・51 音量オーバーレイ・53/54 Navigation TbT・55 MAP（レーンあり）・56 MAP（レーンなし）・09/10/18 リスト等
- Gen1 のシミュレーターは上下左右の短押し・長押しをアプリへ送るだけで、メーター側のメニュー挙動は再現していない（Gen1 の「メニューから切り替え」はここでは確認できない）

関連：[[figma-compare-modal-plan4-final]]（② 手元のボタンのデモが FUNC＝地図切替の前提で作られている）
