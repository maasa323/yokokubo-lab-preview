type Props = {
  children: React.ReactNode;
  /** 下層ページの頭は h1、セクションは h2 */
  as?: "h1" | "h2";
};

/**
 * 和文だけの見出し（Figma: TOP 196:269 の「お知らせ」、About 158:202 の「研究室について」）。
 * Shippori Mincho B1 SemiBold、字間8%。h2は32px、h1（下層ページの頭）はh2と区別がつくよう8px大きい40px。
 * 左の見出し列（300px）で途中改行しないよう、改行は <br /> で入れる。
 */
export default function SectionHeading({ children, as = "h2" }: Props) {
  const Tag = as;
  return (
    <Tag
      className={`font-mincho leading-[1.45] font-semibold tracking-[0.08em] whitespace-nowrap ${
        as === "h1" ? "text-[36px] md:text-[40px]" : "text-[28px] md:text-[32px]"
      }`}
    >
      {children}
    </Tag>
  );
}
