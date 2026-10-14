# use_figma 台本の抜粋（2026-10-14 に実際に使ったもの）

どれも `use_figma` の `code` にそのまま入れる形（トップレベル await、`return` で結果）。ID はこのパック時点のもの。実行前に対象を読み取りで確認すること。

---

## 0. 返り値を安全にする（U+2028 対策）

```js
const bad = new RegExp('[' + String.fromCharCode(0x2028) + String.fromCharCode(0x2029) + String.fromCharCode(10) + ']', 'g');
const clean = s => s.replace(bad, ' ');
```

## 1. ページの一覧と section の中身

```js
const page = await figma.getNodeByIdAsync('5414:64919'); // Navigation
await figma.setCurrentPageAsync(page);
return page.children.map(n => `${n.id} ${n.type} "${n.name}" ${Math.round(n.x)},${Math.round(n.y)} ${Math.round(n.width)}x${Math.round(n.height)}`).join('\n');
```

## 2. flow 起点を重複なしで足す

```js
const seen = new Set(); const fl = [];
for (const f of page.flowStartingPoints) { if (seen.has(f.nodeId)) continue; seen.add(f.nodeId); fl.push({ nodeId: f.nodeId, name: f.name }); }
fl.push({ nodeId: 'NEW_FRAME_ID', name: 'フロー名' });
page.flowStartingPoints = fl;
```

## 3. 複製した PH2 _ Dark に Dark モードを付け直す

```js
const col = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:44:84'); // Semantic
const frame = await figma.getNodeByIdAsync('5637:56069');
frame.setExplicitVariableModeForCollection(col, '44:2'); // Dark
```

## 4. 画面下に追従して途中で止まるピル（Sticky 方式）

```js
// 前提：page の AL frame（LP）に、透明な track（ABSOLUTE）を置き、その中に画面高の rail、rail の下端にピル。
// rail を Sticky にするのは手作業（API なし）。
const proto = await figma.getNodeByIdAsync('PROTO_ID');
const rel = n => n.absoluteTransform[1][2] - proto.absoluteTransform[1][2];
const start = proto.children.find(c => c.name === 'Frame 5');            // 対応モデル
const end = proto.children.find(c => c.name === 'Frame 1597880626')      // メーター&ハンドルスイッチ
             .findOne(n => n.name === 'accordion');                       // その最後のボタン
const VH = 720, M = 24, H = 56;                                            // 画面高・下余白・ピル高
const track = figma.createFrame(); track.name = 'track'; track.fills = [];
proto.insertChild(proto.children.length - 1, track);                       // Header の直下の重なり順
track.layoutPositioning = 'ABSOLUTE';
const top = rel(start) - (VH - M - H);                                     // 対応モデルと一緒に上がってくる
const bottom = rel(end) + end.height + 32 + H + M;                         // 最後のボタンの 32 下で止まる
track.x = 0; track.y = top; track.resizeWithoutConstraints(1440, bottom - top);
const rail = figma.createFrame(); rail.name = '★ rail（Sticky に設定）'; rail.fills = []; rail.resize(1440, VH);
track.appendChild(rail); rail.x = 0; rail.y = 0;
// rail.appendChild(ピルの instance); instance.x = (1440 - w)/2; instance.y = VH - M - H;
```

## 5. ドロワーを写真の端から離す（x720→732、幅 708→696）

```js
const G = 12;
for (const f of section.children) {
  const d = f.findChild(n => n.name === 'drawer'); if (!d || Math.round(d.width) !== 708) continue;
  if (Math.round(d.x) === 720) d.x = 720 + G;
  d.resizeWithoutConstraints(708 - G, d.height);
  for (const c of d.children) {
    const x = c.x, w = c.width;
    if (w >= 700) c.resizeWithoutConstraints(w - G, c.height);                       // 区切り線
    else if (c.name === 'stage') { c.resizeWithoutConstraints(w - G, c.height); for (const k of c.children) k.x -= G / 2; }
    else if (c.type === 'TEXT' && x + w >= 670) { for (const fn of c.getStyledTextSegments(['fontName']).map(s => s.fontName)) await figma.loadFontAsync(fn); c.resize(w - G, c.height); }
    else if (x + w / 2 > 354) c.x = x - G;                                            // 右寄せの要素
  }
}
```

## 6. 写真のフィルターとベールを別の frame からコピー

```js
const src = await figma.getNodeByIdAsync('SRC_P03_ID');      // 例：検討 V1 の p03
const dst = await figma.getNodeByIdAsync('DST_P03_ID');
const fl = JSON.parse(JSON.stringify(dst.fills));            // 画像の hash・切り抜きは残す
fl[0].filters = JSON.parse(JSON.stringify(src.fills[0].filters));
dst.fills = [fl[0], JSON.parse(JSON.stringify(src.fills[1]))]; // ベール
```

## 7. 試作は画面外の clone で

```js
const cl = original.clone(); page.appendChild(cl); cl.x = -30000; cl.y = -30000; cl.name = 'tmp-…';
// …値を変えて get_screenshot で測る…
page.children.filter(n => /^tmp-/.test(n.name)).forEach(n => n.remove());
```

## 8. 手把の傾き（方向 variant の頭の置き方）

```js
const OFF = 12, FS = 0.9, PAR = 3.5;          // ずらし・軸方向の縮み・上面の視差
// d = [dx, dy]（上は [0,-1]）。CAP＝中立 variant の cap の x,y,size。ref＝中立の cap の子の geometry。
const along = d[0] !== 0 ? 'x' : 'y';
const w = along === 'x' ? CAP.s * FS : CAP.s, h = along === 'y' ? CAP.s * FS : CAP.s;
cap.resizeWithoutConstraints(w, h);
cap.x = CAP.x + CAP.s / 2 + d[0] * OFF - w / 2; cap.y = CAP.y + CAP.s / 2 + d[1] * OFF - h / 2;
for (const c of cap.children) { const r0 = ref[c.name]; const sx = along === 'x' ? FS : 1, sy = along === 'y' ? FS : 1;
  const par = /key|dish|ENT/.test(c.name) ? PAR : (c.name === 'cap · top' ? PAR / 2 : 0);
  c.resize(r0.w * sx, r0.h * sy); c.x = r0.x * sx + d[0] * par; c.y = r0.y * sy + d[1] * par; }
side.resize(CAP.s, CAP.s); side.x = CAP.x - d[0] * 2; side.y = CAP.y - d[1] * 2;   // 側面の三日月
```

## 9. UX カード

`scripts/ux_cards_builder.js` を台本の先頭に貼り、`card({ title, one, ux:['◎','○','△','◎'], pre, good:[…], bad:[…] }, 1100)` と `summary(title, rows, verdicts, 2400)` を呼ぶ。
