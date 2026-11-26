/**
 * レイアウトの部品。Figmaの値：左右の余白64px、セクションの上下160px、
 * 見出し列300px＋列の間120px。
 */

export function Section({
  children,
  className = "",
  id,
  tight = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-site px-6 md:px-16 ${tight ? "py-16 md:py-24" : "py-24 md:py-40"} scroll-mt-8 ${className}`}
    >
      {children}
    </section>
  );
}

/** 左に見出し、右に本文の2カラム */
export function Row({
  left,
  children,
  className = "",
  stickyLeft = false,
}: {
  left?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** 右の内容をスクロールしている間、左の見出しを画面に留める（2カラムのときだけ） */
  stickyLeft?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-[120px] ${className}`}
    >
      <div
        data-reveal
        className={`flex shrink-0 flex-col gap-8 lg:w-[240px] lg:gap-12 xl:w-[300px] ${stickyLeft ? "lg:sticky lg:top-[136px]" : ""}`}
      >
        {left}
      </div>
      <div
        data-reveal
        className="flex min-w-0 flex-1 flex-col"
        style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

/** 小さな英字ラベル（Figma: Consortium / Partners） */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-medium tracking-[0.16em] uppercase">
      {children}
    </p>
  );
}

/**
 * 本文（Shippori Mincho Medium 18px / 行間2.1 / 字間3%）。
 * loose：行間2.6（Figma: TOP 323:338、About 324:339 の Body）
 */
export function Body({
  children,
  className = "",
  loose = false,
}: {
  children: React.ReactNode;
  className?: string;
  loose?: boolean;
}) {
  return (
    <p
      className={`font-mincho text-[16px] font-medium tracking-[0.03em] md:text-[18px] ${loose ? "leading-[2.6]" : "leading-[2.1]"} ${className}`}
    >
      {children}
    </p>
  );
}

/** リード文（Shippori Mincho SemiBold 24px / 行間1.7） */
export function Lead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mincho text-[20px] leading-[1.7] font-semibold tracking-[0.03em] md:text-[24px] ${className}`}
    >
      {children}
    </p>
  );
}
