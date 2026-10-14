---
name: figma-ios-flavour-ribbons
description: iOS 版フレーバーバッジ（DEV/INT/INT-D/PRD-D リボン）の節点ID、リボン幾何の確定値、ラベルは Archivo Black の編集可能テキスト（Arial Black 不在）、Tinted は輝度グレー
metadata:
  node_type: memory
  type: project
  originSessionId: 3f4fdccf-d3b9-40e1-9070-ec37c4f5fcc5
  modified: 2026-10-02T01:15:46.491Z
---

2026-10-02 終稿。Figma wk7kUZfC7dGAv6NpW7UsCv「app icon」ページ、ios参考（3779:27483）と同じ論理で納品 section を 3 つ作った。

- 「納品 部品（master）」3819:16698（x−8900 / y10132、3392×8962）：Flavour ribbon セット 3784:11080（Flavour × Appearance=Colour/Tinted/Mono の 12 変体）、iOS 母版 15 個 HondaRoadSyncAppIcon[_dev|_int|_intd|_prdd][_dark|_tinted]（1024、3819:17812〜18118）、Android 母版 12 個 ic_launcher_foreground_/monochrome_/adaptive_<slug>（432、3820:18094〜18400）。
- 「ios 納品 · フレーバー」3793:12024（x−2606 / y10132、5210×19266）：上段「バッジについて」3796:14415 と Export clone 3796:14408。下段 Default 3820:69410 / DEV 3793:12025 / INT 3793:12029 / INT-D 3793:12033 / PRD-D 3793:12037 を参考と同じ y（2696, 6110, 9524, 12938, 16352）、各 4930×2614。各 32 枚＝参考の Apple/… 25 枚 + Mac/5 枚 + Apple/App_store_1024_1x_dark・_tinted（中列 x1600）。**各枠の中身は母版インスタンス 1 つ**（参考の HondaRoadSyncAppIcon_intd 方式）。Android 列は削除（旧位図を複製していたため）。
- 「android 納品 · フレーバー」3813:14502（x4348 / y10132、5210×10260）：上段「Android 版について」3813:14509 と Export clone 3813:14503、下段 DEV 3813:14512 / INT 3813:14516 / INT-D 3813:14520 / PRD-D 3813:14524（y 1000 + n×2440、4930×1640）。各 21 枚、旧フレーム 3810:7101 と同名（_master/HondaRoadSyncAppIcon_<slug>、<slug>/res/mipmap-*/ic_launcher_foreground・_monochrome 432/324/216/162/108、ic_launcher・_round 192/144/96/72/48 角丸 20%/50%）。legacy は adaptive 母版を 1.5s/432 倍・−0.25s オフセットで切り抜き。
- リボン幾何（1024 基準）：帯 657.555×264.567、折れ耳 84.97、x508 / y681、rotation +10.431。Android canvas(432) では x214.85 / y264.76、scale 0.2885。色 PRD-D #FFE520 / INT-D #20BCFF / DEV #4AE779 / INT #FC8253（耳は淡色、PRD-D 影は #C9B100 に修正）。ラベル Archivo Black 117 / −3%、墨 Colour #181A19・Tinted #191919。Arial Black は無いので旧字形はベクターで各変体に非表示保持。
- monochrome：Mono 変体（白 band+ear と黒字形）を素材に、母版内で (mark ∪ band+ear) − glyphs の SUBTRACT 1 個。ラベル変更後は字形を再 flatten して母版を作り直す。
- 落とし穴：LUMINANCE マスクはスクショ／書き出しレンダラで効かない。figma.subtract([base, cut]) の子順が逆になることがある→cut を appendChild で最上位へ。インスタンス内ノードは clone 不可→detachInstance→ungroup→flatten。section の子座標は section 相対。110px 見出しは 1600 幅に収まる文言に（「iOS Dark/Tinted(PNG)」）。参考の Export は SF Pro Text（未インストール）→自分の clone は SF Pro に差し替え。
- 旧 Android フレーム 3810:7101（ユーザーが ios section 上に置いた複製）は未変更、確認後に削除してよい。
- 終稿前にユーザーが自分で微調整：説明文と Export section を全部削除（iOS 上段は名前無しの section に INT-D Light/Tinted の例 2 枚だけ残す）、ios section を x10058（android の右）へ移動、sub-section の高さを手で変えた（2614〜2696、間隔 303）、android は sub-section のみ（y245〜、間隔 321）。監査結果は問題なし。
- ユーザーの好み：最終的に説明文は不要、枠と母版だけの素の納品形。納品は参考と同じ命名・構造（母版 1 実例）。

**Why:** iOS/Android の AppIcon にフレーバーリボンを付けてビルドを見分けたい。終稿提出前に「参考の設計者の論理どおり」を求められた。
**How to apply:** リボンを直すときは 3784:11080 の変体、アイコンを直すときは母版（HondaRoadSyncAppIcon_* / ic_launcher_*_<slug>）を編集すれば全枠に反映。関連: [[figma-web68-navi-build]]
