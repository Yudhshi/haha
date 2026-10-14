// 案の UX 評価カードとまとめ表を Figma に作る部品（use_figma の台本の先頭に貼って使う）。
// card(P, W): P = { title, one, ux:['◎','○','△','◎'] (気づく/わかる/ジャマしない/迷わない), pre?, good:[..], bad:[..] }
// summary(title, rows, verdicts, W): rows = [{ title, ux:[..4], short }], verdicts = ['結論1', '結論2', '結論3']
// 作ったノードは呼び出し側で section に appendChild して x/y を決める。フォントは Noto Sans JP。
// shared builders (pasted into use_figma scripts)
for (const s of ['Regular','Medium','Bold']) await figma.loadFontAsync({ family: 'Noto Sans JP', style: s });
const hex = h => ({ r: parseInt(h.slice(1,3),16)/255, g: parseInt(h.slice(3,5),16)/255, b: parseInt(h.slice(5,7),16)/255 });
const T = (str, size, style, color, w) => { const t = figma.createText(); t.fontName = { family: 'Noto Sans JP', style }; t.fontSize = size; t.characters = str; t.fills = [{ type: 'SOLID', color: hex(color) }]; t.lineHeight = { unit: 'PERCENT', value: 150 }; if (w) { t.textAutoResize = 'HEIGHT'; t.resize(w, t.height); } return t; };
const AL = (dir, name, gap, pad) => { const f = figma.createAutoLayout(dir, { name, itemSpacing: gap || 0 }); f.fills = []; if (pad) { f.paddingLeft = f.paddingRight = pad[0]; f.paddingTop = f.paddingBottom = pad[1]; } return f; };
const RC = { '◎': ['#e2f4e7', '#1d7a3a'], '○': ['#e7eef8', '#2b5a9e'], '△': ['#fdeedb', '#a35a00'] };
const pill = (label, r) => { const p = AL('HORIZONTAL', 'ux · ' + label, 8, [14, 7]); p.cornerRadius = 999; p.fills = [{ type: 'SOLID', color: hex(RC[r][0]) }]; p.appendChild(T(label, 18, 'Medium', '#3a3a3c')); p.appendChild(T(r, 18, 'Bold', RC[r][1])); p.counterAxisAlignItems = 'CENTER'; return p; };
const tag = (str) => { const p = AL('HORIZONTAL', 'tag', 0, [14, 6]); p.cornerRadius = 999; p.fills = [{ type: 'SOLID', color: hex('#efeff2') }]; p.appendChild(T(str, 16, 'Medium', '#636366')); return p; };
const bullets = (head, color, items, w) => { const c = AL('VERTICAL', head, 6); c.appendChild(T(head, 18, 'Bold', color)); for (const it of items) c.appendChild(T('・' + it, 20, 'Regular', '#1d1d1f', w)); return c; };
const UXK = ['気づく', 'わかる', 'ジャマしない', '迷わない'];
const card = (P, W) => {
  W = W || 1100;
  const c = AL('VERTICAL', 'メモ · ' + P.title, 20, [36, 32]);
  c.fills = [{ type: 'SOLID', color: hex('#ffffff') }]; c.strokes = [{ type: 'SOLID', color: hex('#e3e3e8') }]; c.strokeWeight = 1; c.cornerRadius = 20;
  c.appendChild(T(P.title, 32, 'Bold', '#1d1d1f'));
  c.appendChild(T(P.one, 22, 'Regular', '#3a3a3c', W - 72));
  const ux = AL('HORIZONTAL', 'ux', 10); ux.layoutWrap = 'WRAP'; ux.counterAxisSpacing = 10;
  UXK.forEach((k, i) => ux.appendChild(pill(k, P.ux[i])));
  if (P.pre) ux.appendChild(tag('前提：' + P.pre));
  c.appendChild(ux);
  const two = AL('HORIZONTAL', 'いいところ／イマイチ', 32);
  const colW = (W - 72 - 32) / 2;
  two.appendChild(bullets('いいところ', '#1d7a3a', P.good, colW));
  two.appendChild(bullets('イマイチ', '#b45309', P.bad, colW));
  c.appendChild(two);
  c.layoutSizingHorizontal = 'FIXED'; c.resize(W, c.height);
  return c;
};
const summary = (title, rows, verdicts, W) => {
  const c = AL('VERTICAL', 'まとめ · ' + title, 22, [40, 36]);
  c.fills = [{ type: 'SOLID', color: hex('#ffffff') }]; c.strokes = [{ type: 'SOLID', color: hex('#e3e3e8') }]; c.strokeWeight = 1; c.cornerRadius = 24;
  c.appendChild(T(title, 36, 'Bold', '#1d1d1f'));
  c.appendChild(T('気づく＝見つけやすい　わかる＝押すと何が起きるか想像できる　ジャマしない＝見たいものを見るジャマをしない　迷わない＝PC でも SP でも同じ場所・同じ形', 18, 'Regular', '#636366', W - 80));
  const vb = AL('VERTICAL', '結論', 8, [24, 18]); vb.cornerRadius = 14; vb.fills = [{ type: 'SOLID', color: hex('#f2f6fd') }];
  vb.appendChild(T('結論', 18, 'Bold', '#2b5a9e'));
  for (const v of verdicts) vb.appendChild(T(v, 22, 'Medium', '#1d1d1f', W - 128));
  c.appendChild(vb);
  const colsW = [440, 150, 150, 170, 150, W - 80 - 440 - 150 - 150 - 170 - 150];
  const row = (cells, head) => { const r = AL('HORIZONTAL', head ? 'head' : 'row', 0, [0, head ? 10 : 12]); r.counterAxisAlignItems = 'CENTER';
    cells.forEach((v, i) => { const cell = AL('HORIZONTAL', 'cell', 0); cell.layoutSizingHorizontal = 'FIXED'; cell.resize(colsW[i], 30); cell.primaryAxisAlignItems = i === 0 || i === 5 ? 'MIN' : 'CENTER'; cell.counterAxisAlignItems = 'CENTER';
      const isR = !head && i >= 1 && i <= 4; const t = T(v, head ? 16 : (i === 0 ? 20 : 20), head ? 'Medium' : (i === 0 ? 'Bold' : (isR ? 'Bold' : 'Regular')), head ? '#8e8e93' : (isR ? RC[v][1] : '#1d1d1f'));
      if (isR) { const p = AL('HORIZONTAL', 'rate', 0, [14, 4]); p.cornerRadius = 999; p.fills = [{ type: 'SOLID', color: hex(RC[v][0]) }]; p.appendChild(t); cell.appendChild(p); } else cell.appendChild(t);
      r.appendChild(cell); });
    if (!head) { r.strokes = [{ type: 'SOLID', color: hex('#ececf0') }]; r.strokeTopWeight = 1; r.strokeBottomWeight = 0; r.strokeLeftWeight = 0; r.strokeRightWeight = 0; }
    return r; };
  const tb = AL('VERTICAL', 'table', 0);
  tb.appendChild(row(['案', '気づく', 'わかる', 'ジャマしない', '迷わない', 'ひとこと'], true));
  for (const R of rows) tb.appendChild(row([R.title, ...R.ux, R.short]));
  c.appendChild(tb);
  c.layoutSizingHorizontal = 'FIXED'; c.resize(W, c.height);
  return c;
};
