---
name: figma-web68-navi-build
description: 网页68 (ON-RIDE ナビ LP) 在 Figma 文件 wk7kUZfC7dGAv6NpW7UsCv 中的构建位置、NAV.fig 审计结论与关键节点 ID
metadata: 
  node_type: memory
  type: project
  originSessionId: c0d9fa46-9540-4c03-a430-bc3fd87e2a7e
  modified: 2026-08-01T03:36:17.038Z
---

2026-07/08 完成：把 ~/Downloads/网页68.zip（design_handoff_navi）在 Figma 文件 wk7kUZfC7dGAv6NpW7UsCv（無題，页面「看这里」1041:3973）重建为可编辑原型，并按 NAV.fig 严格订正。

**关键教训：zip 里的 README/HTML 原型在 9 处偏离 NAV.fig，不可作为依据。** 权威依据是文件内 section「Navi」(1066:13134) 的 25 条 connector（用 `connectorStart/End.endpointNodeId` 读取）与各帧原文文本。

**Why:** 后续修改该原型或做同类还原时，避免再次误信 handoff 文档。

**How to apply:**
- 正确流程：Top→履歴→(タブ)お気に入り/検索；検索→音声検索→VoiceControl→Searching→Select Location(=検索結果 "Result")；卡片选择→**Confirmation**(開始/経路確認 2 択)；「開始」→**Loading**→**TBT+Map(主系統)**；TBT 无地图版仅 Android+GoogleMaps 派生；菜单分 Change TBT(4項) / Change Map(2-3項)
- 三个 section：LP 静态 4 帧 1073:3903 / 流程 22 帧 S01–S22 1073:3904（起点 S01=1125:6637，92 条链接）/ 组件库 1073:3905 / 提案 1109:5954（A/B/C × ページ・モーダル × dark/light + SP）
- 字体替代：Avenir Next→Montserrat；SF Compact Rounded→Quicksand SemiBold
- PH1_dark(1066:21329) 设计语言：bg #121417、eyebrow Inter Bold 14 ls20% #3C8FF3、大标题 **Oxanium Bold**、卡片 800×480 r16、正文 Inter Medium 18 #C9CBCD
- 组件名保留 NAV.fig 原拼写以便追溯（Hisotry 为原文件拼写错误，UI 文本用 Recent）
- **採用案 = 案A（AXIS）**，改訂版在 section 1130:7806（ページ/モーダル/SP × dark・light ＋ 交互规格板）。**メーターの設計は変更不可**（速度クラスタ固定），只能靠缩放比例与其他两台设备补偿
- v2 交互机制：01/02/03 三联标签本身即状态指示器（active/done/pending 三态＋accent 轨），底部 Oxanium 单行 readout 取代原 STATE 胶囊；ページ=自動再生の要約、モーダル=操作版（三联live＋readout＋キーヒント＋01/04ページャ）
- 标题用「ナビゲーション」（非「ナビ」）
- **PH1_dark 的原生语汇（做任何新元素前必查）**：整个 LP **没有任何连接线／箭头／图解元素**，全靠摄影＋排版＋卡片＋颜色沟通。序号/进度语言在 ABOUT 区块（1066:21359）：`01` Inter Bold 14 ls20% #3C8FF3（三项都蓝）＋大标题 Inter Bold 44（当前项 #3C8FF3、其余 #FCFCFC）＋说明 Noto Sans JP Regular 18/lh160%，**当前项左侧 2×142px #3C8FF3 竖条**，项间距 198。按钮 `Button/LoadMore`：188×45 r48 fill #2E3033 stroke #4C4E51 文字 Noto Sans JP Medium 14 #C9CBCD
- **3UI 統合の指針**：ハンドルスイッチは元々擬似3D（グラデ＋ベベル）で、フラットUIのスマホ/メーターと絵の体系が違った → `HB Switch / Flat`(1154:10002) に平面化。機体は3台とも同一：fill #16191D／r10／1px 白リム（active 20%・非active 10%、strokeAlign OUTSIDE）／影 0 20 44 -18 rgba(0,0,0,.45)／画面は 4px インセット。**カラーグローは全廃**（LP のカードにグローは無い）。減光は知覚バランスで非対称に：明るいスマホ 0.34／暗いスイッチ 0.62
- **Apple 寄りの版**（採用検討中）：見出し中央寄せ・68px/-3%、文字色は Apple の暗色グレー（#F5F5F7／#A1A1A6／#6E6E73）、リム線を全廃し**影と素材で分離**、角丸大きめ、進行レールはドット無しの 4px 丸端。**発光はリムグロー禁止**——大面積・低透過・画面外まで拡散する「背後の環境光」を3層（中性 studio 光＋機器固有色＋弱い周辺）で作る＋機体上端に 1px の edge light。弱／強の2段階あり
- **操作アフォーダンス（採用方針）**：光に2つの意味を持たせる——**状態光＝大きく拡散・静止**（この機器が話している）／**操作光＝キー1個ぶん・2.8秒で呼吸・中性色**（ここが押せる）。大きさと動きの有無だけで区別し、環・枠・吹き出しは足さない。スイッチは「非アクティブなステップ」として減光しない（常時ライブ 0.9）。チュートリアルは段階式：0s 呼吸のみ → 4s セルフデモ1回（界面が自分でENTを押し、メーターの光が応答）→ 12s 文字ヒント → 接触で全停止。Flow「A′ Apple — 操作アフォーダンス」で再生可
- ガイドモード（3 步引导）在同一 section：聚光灯减光＋弧形虚线动线（createVector 需自算贝塞尔 bbox 再设 x/y，否则 Figma 会归一化导致错位）＋目标高亮环＋脉动组件 Guide/Pulse＋气泡 callout＋スキップ/次へ。Flow 起点：「案A v2 · ガイドモード（3ステップ）」与「…SP」
