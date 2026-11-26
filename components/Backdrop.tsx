import GradientField from "./GradientField";
import SymbolBloom from "./SymbolBloom";

/**
 * 背景のグラデーションと右上のシンボル（Figma: Group 84 / Symbol）。
 * Figmaの1440px幅の座標をそのまま使い、画面幅が変わっても中央基準で同じ位置に置く。
 *
 * - グラデーションはページ全体に間隔をあけて置き、スクロールに合わせて流れる
 * - シンボルはページの頭に置く
 *
 * シンボルの mix-blend-mode（オーバーレイ）がグラデーションに効くよう、
 * シンボルの親には transform や z-index を付けない（重なりの合成が切れるため）。
 */
export default function Backdrop({ variant = "top" }: { variant?: "top" | "page" }) {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <GradientField variant={variant} />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden">
        <div className="absolute top-0 h-full w-[1440px]" style={{ left: "calc(50% - 720px)" }}>
          {/*
            シンボル：1073×1100、オーバーレイ。
            TOPはFirst View（Figma 195:221）の left 183 / top -38、下層は left 594 / top -17
          */}
          <div
            className="absolute opacity-50 mix-blend-overlay"
            style={{
              ...(variant === "top" ? { left: 183, top: -38 } : { left: 594, top: -17 }),
              width: 1073.019,
              height: 1100.372,
            }}
          >
            <SymbolBloom bloom={variant === "top"} />
          </div>
        </div>
      </div>
    </>
  );
}
