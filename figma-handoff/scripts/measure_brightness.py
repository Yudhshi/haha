"""画像の明るさ・分布・ノイズ・青みを並べて比べる（ON-RIDE と OFF-RIDE の調整に使用）。

使い方:
    python3 measure_brightness.py off_pc.png on_pc.png off_tab.png on_tab.png
ファイル名の 2 つ目の語（例 on_pc の pc）が pc/tab/sp なら、その文字の範囲をノイズ計算から除く。
出力: mean（平均輝度 0-255）, p5/p25/p50/p95, std, noise（細かいざらつき）, blue-red（青み）
必要: Pillow, numpy
"""
import sys
from PIL import Image, ImageFilter
import numpy as np
def stats(p, textbox=None):
    im=Image.open(p).convert('RGB')
    a=np.asarray(im).astype(float)
    g=a@[0.299,0.587,0.114]
    gi=Image.fromarray(g.astype(np.uint8))
    bl=np.asarray(gi.filter(ImageFilter.GaussianBlur(1.5))).astype(float)
    hf=np.abs(g-bl)
    h,w=g.shape
    # exclude text band (center) for noise
    mask=np.ones_like(g,bool)
    if textbox: x0,y0,x1,y1=textbox; mask[y0:y1,x0:x1]=False
    return dict(mean=g.mean(),p5=np.percentile(g,5),p25=np.percentile(g,25),p50=np.percentile(g,50),p95=np.percentile(g,95),std=g.std(),noise=hf[mask].mean(), b=(a[...,2]-a[...,0]).mean())
tb={'pc':(60,200,1380,520),'tab':(90,450,660,680),'sp':(0,340,390,500)}
for p in sys.argv[1:]:
    bp=p.split('_')[1] if p.startswith(('on','off')) else p.split('_')[0]
    s=stats(p,tb.get(bp))
    print(f"{p:14s} mean {s['mean']:.1f} p5 {s['p5']:.0f} p25 {s['p25']:.0f} p50 {s['p50']:.0f} p95 {s['p95']:.0f} std {s['std']:.1f} noise {s['noise']:.2f} blue-red {s['b']:.1f}")
