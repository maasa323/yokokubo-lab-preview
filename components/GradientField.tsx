"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedGradient from "./AnimatedGradient";

/**
 * ページ全体に、グラデーションの塊を間隔をあけて置く。
 * 画面に固定はせず、スクロールすると次の塊がふわっと現れる。
 * 塊ごとに左右反転と動きのタイミングを変え、同じものの繰り返しに見えないようにする。
 */

// 1つ目の塊の位置（Figma: top 111）。下層ページは少し上にずらす
const FIRST_TOP = { top: 111, page: -420 } as const;
// 2つ目以降の間隔
const SPACING = 2200;

// 2つ目以降の塊の置き方（順に繰り返す）
const variants = [
  { flip: true, dx: 140, opacity: 0.72 },
  { flip: false, dx: -60, opacity: 0.68 },
  { flip: true, dx: -120, opacity: 0.72 },
  { flip: false, dx: 80, opacity: 0.68 },
];

export default function GradientField({ variant }: { variant: "top" | "page" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // ページの高さに合わせて、塊の数を決める
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const first = FIRST_TOP[variant];
  const extra = height > 0 ? Math.max(0, Math.ceil((height - (first + 1980)) / SPACING)) : 0;

  const clusters = [
    { top: first, flip: false, dx: 0, opacity: 1, seed: 0 },
    ...Array.from({ length: extra }, (_, i) => ({
      top: first + SPACING * (i + 1),
      ...variants[i % variants.length],
      seed: i + 1,
    })),
  ];

  return (
    <div ref={ref} className="absolute inset-0">
      <div className="absolute top-0 h-full w-[1440px]" style={{ left: "calc(50% - 720px)" }}>
        {clusters.map((c) => (
          // Figmaでは left -192 / top 111 / 2158×1980（ぼかし分はみ出す）
          <div
            key={c.top}
            className="absolute h-[1980px] w-[2158px]"
            style={{
              left: -192 + c.dx,
              top: c.top,
              opacity: c.opacity,
              transform: c.flip ? "scaleX(-1)" : undefined,
            }}
          >
            <div className="absolute inset-[-17.82%_-18.54%_-20.2%_-9.7%]">
              <AnimatedGradient seed={c.seed} stillOnIOS={c.seed === 0} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
