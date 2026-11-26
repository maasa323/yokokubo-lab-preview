import { petals, SYMBOL_H, SYMBOL_W } from "@/lib/symbol-petals";

/**
 * 背景のシンボルを「花ひらく」ように動かす。
 *
 * 1. ひらく：ページを開くと、6つのYが中心のつぼみから回りながら順にひらく（トップのみ）
 * 2. 揺れる：花びらがそれぞれ少しずつ揺れ続ける
 * 3. 回る　：シンボル全体がとてもゆっくり回る
 *
 * bloom=false（下層ページ）では、最初からひらいた状態で揺れと回転だけにする。
 * 動きは globals.css の .symbol-* で定義。「視差効果を減らす」設定では止める。
 */
export default function SymbolBloom({ bloom = true }: { bloom?: boolean }) {
  return (
    <svg
      width={SYMBOL_W}
      height={SYMBOL_H}
      viewBox={`0 0 ${SYMBOL_W} ${SYMBOL_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 block size-full overflow-visible"
      aria-hidden="true"
    >
      <g opacity={0.6} className="symbol-spin">
        {petals.map((p, i) => (
          <g
            key={i}
            className={bloom ? "symbol-petal symbol-bloom" : undefined}
            style={{ "--d": `${p.delay}s` } as React.CSSProperties}
          >
            <path
              d={p.d}
              fill="#303030"
              className="symbol-petal symbol-sway"
              style={
                {
                  "--d": `${p.delay}s`,
                  "--sway": `${p.sway}s`,
                  // 出現の動きがないときは、揺れをすぐ（花びらごとに位相をずらして）始める
                  ...(bloom ? {} : { animationDelay: `${-p.delay * 12}s` }),
                } as React.CSSProperties
              }
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
