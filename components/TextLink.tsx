import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  /** lg：18px（Figma: TOP 320:1534 のリンク） */
  size?: "md" | "lg";
};

/** 下線のグラデーション（背景のグラデーションと同じ色）。矢印はホバー時に右端の色になる */
const GRADIENT = "bg-[linear-gradient(90deg,#ff90ea,#8bb5ff,#0094ff)]";

/**
 * リンクの下線。ふだんは文字色の線、ホバーするとグラデーションの線が左から右へ走って重なる。
 * 親に group と relative を付けて使う。
 * base=false で文字色の線を出さない。active で最初からグラデーションの線を出す（ヘッダーの表示中のページ）。
 */
export function LinkUnderline({
  base = true,
  active = false,
}: {
  base?: boolean;
  active?: boolean;
}) {
  return (
    <>
      {base && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-ink"
        />
      )}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-px origin-left ${active ? "" : "scale-x-0"} ${GRADIENT} transition-transform duration-500 ease-out group-hover:scale-x-100`}
      />
    </>
  );
}

/**
 * 矢印（線の色は currentColor）。ホバーするとグラデーションの右端の色（#0094ff）になる。
 * rotate で向きを変える（外部リンクは -45）。
 */
export function LinkArrow({ external = false }: { external?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width={12.6727}
      height={10.669}
      viewBox="0 0 12.6727 10.669"
      fill="none"
      className={`block shrink-0 text-ink transition-[color,translate] duration-500 group-hover:text-[#0094ff] ${
        external
          ? "-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          : "group-hover:translate-x-1"
      }`}
    >
      <path
        d="M0 5.33448H12M7.5 10.3345L12 5.33448L7.5 0.334482"
        stroke="currentColor"
      />
    </svg>
  );
}

/** 下線と矢印のついたテキストリンク（Figma: TextLink） */
export default function TextLink({
  href,
  children,
  external,
  className,
  size = "md",
}: Props) {
  const inner = (
    <>
      <span>{children}</span>
      <LinkArrow external={external} />
      <LinkUnderline />
    </>
  );
  const text =
    size === "lg"
      ? "text-[16px] font-normal md:text-[18px]"
      : "text-[14px] font-medium";
  const cls = `group relative inline-flex items-center gap-3 pb-2 tracking-[0.04em] ${text} ${className ?? ""}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
