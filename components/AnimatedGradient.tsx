"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";

/**
 * 背景のグラデーションをゆっくり漂わせる。
 *
 * Figmaのグラデーション（bg-gradient.svg）は、ぼかした4つの形の重ね合わせ。
 * 形ごとに切り出したSVG（blob-*.svg）を1/8の小さなキャンバスに描き、CSSで拡大して表示する。
 * ぼかしが大きいので解像度を下げても見た目は変わらず、毎フレームの負荷はごく小さい。
 *
 * - 最初は静止画（bg-gradient.svg）を出し、準備ができたらキャンバスに切り替える
 * - 「視差効果を減らす」設定のときは静止画のまま
 * - 画面外にあるときやタブが裏にあるときは止める
 */

// SVG全体の大きさ（bg-gradient.svg の viewBox）
const FULL_W = 2767.28;
const FULL_H = 2732.77;
// キャンバスの縮小率
const K = 1 / 8;
const FRAME_MS = 1000 / 30;

type Blob = {
  src: string;
  /** SVG全体の中での位置と大きさ（フィルター領域） */
  x: number;
  y: number;
  w: number;
  h: number;
  /** 動きの幅(px)と周期(秒) */
  ax: number;
  ay: number;
  as: number;
  ar: number;
  tx: number;
  ty: number;
  ts: number;
  phase: number;
};

// 重ね順は Figma と同じ（ピンク → 肌色 → 水色 → 青）
const blobs: Blob[] = [
  { src: asset("/images/top/blob-pink.svg"), x: 519.279, y: 449.767, w: 1603, h: 1676, ax: 170, ay: 130, as: 0.12, ar: 0.14, tx: 46, ty: 58, ts: 52, phase: 0 },
  { src: asset("/images/top/blob-peach.svg"), x: 0, y: 0, w: 2013.85, h: 2154.18, ax: 200, ay: 150, as: 0.1, ar: 0.09, tx: 62, ty: 74, ts: 68, phase: 1.3 },
  { src: asset("/images/top/blob-blue.svg"), x: 984.279, y: 949.767, w: 1783, h: 1783, ax: 180, ay: 220, as: 0.13, ar: 0, tx: 54, ty: 66, ts: 80, phase: 2.1 },
  { src: asset("/images/top/blob-azure.svg"), x: 1329.28, y: 860.767, w: 872, h: 872, ax: 260, ay: 200, as: 0.2, ar: 0, tx: 38, ty: 44, ts: 50, phase: 0.7 },
];

function loadSprite(blob: Blob): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // SVGのラスタライズ（ぼかし込み）は最初の1回だけ
      const c = document.createElement("canvas");
      c.width = Math.ceil(blob.w * K);
      c.height = Math.ceil(blob.h * K);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c);
    };
    img.onerror = reject;
    img.src = blob.src;
  });
}

/**
 * iOS（iPhone・iPad）かどうか。iPadOSはMacと名乗るので、タッチ対応で見分ける。
 * iOSでは、キャンバスと重なったシンボルのオーバーレイ（mix-blend-mode）が効かず、グレーになってしまう。
 */
function isIOS() {
  return (
    /iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1)
  );
}

export default function AnimatedGradient({
  seed = 0,
  stillOnIOS = false,
}: {
  seed?: number;
  /** シンボルと重なる塊。iOSでは静止画のままにして、シンボルのオーバーレイを効かせる */
  stillOnIOS?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (stillOnIOS && isIOS()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = Math.ceil(FULL_W * K);
    canvas.height = Math.ceil(FULL_H * K);

    let raf = 0;
    let visible = true;
    let cancelled = false;
    let last = 0;
    const start = performance.now();
    let sprites: HTMLCanvasElement[] = [];

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || now - last < FRAME_MS) return;
      last = now;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b, i) => {
        const tau = Math.PI * 2;
        // seed で塊ごとに動きのタイミングを変える。t=0 では Figma の配置と一致する
        const p = b.phase + seed * (i + 1) * 0.9;
        const wave = (period: number, ph: number) => Math.sin((tau * t) / period + ph) - Math.sin(ph);
        const dx = b.ax * wave(b.tx, p);
        const dy = b.ay * wave(b.ty, p * 1.7);
        const s = 1 + b.as * wave(b.ts, p);
        const r = b.ar * wave(b.ts * 1.3, p);
        ctx.save();
        ctx.translate((b.x + b.w / 2 + dx) * K, (b.y + b.h / 2 + dy) * K);
        ctx.rotate(r);
        ctx.scale(s, s - (s - 1) * 0.4);
        ctx.drawImage(sprites[i], (-b.w / 2) * K, (-b.h / 2) * K, b.w * K, b.h * K);
        ctx.restore();
      });
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    Promise.all(blobs.map(loadSprite))
      .then((s) => {
        if (cancelled) return;
        sprites = s;
        raf = requestAnimationFrame((now) => {
          draw(now);
          setLive(true);
        });
      })
      .catch(() => {
        // 読み込めなければ静止画のまま
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [seed, stillOnIOS]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/top/bg-gradient.svg")}
        alt=""
        width={FULL_W}
        height={FULL_H}
        className={`block size-full max-w-none transition-opacity duration-1000 ${live ? "opacity-0" : "opacity-100"}`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 size-full transition-opacity duration-1000 ${live ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
