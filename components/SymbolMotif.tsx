import { petals } from "@/lib/symbol-petals";

/**
 * ロゴの成り立ちの図「Y ＞ 花」（Figma: About / Motif）。
 * 1つのY（花びら1枚）と、6つのYを重ねたシンボルを並べる。
 * 座標はFigmaの 429×155 の配置そのまま。中の図形は lib/symbol-petals から使う。
 */
const Y_INDEX = 3; // 回転していない、そのままの向きのY
const Y_BOX = "372.13 457.85 582.04 469.71";
const FLOWER_BOX = "114.9 163.04 839.27 773.77";

export default function SymbolMotif({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 429 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="YokokuboのYを6方向に回転させて重ね、花の形にしたシンボル"
      className={className}
    >
      <svg x={0} y={17} width={149} height={120} viewBox={Y_BOX}>
        <path d={petals[Y_INDEX].d} fill="#303030" />
      </svg>
      <path
        d="M197.7 62.4L211.7 77.4L197.7 92.4"
        stroke="#303030"
        strokeWidth={1.5}
      />
      <svg x={261} y={0} width={168} height={155} viewBox={FLOWER_BOX}>
        {petals.map((p, i) => (
          <path key={i} d={p.d} fill="#303030" />
        ))}
      </svg>
    </svg>
  );
}
