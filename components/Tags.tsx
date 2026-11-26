/** 半透明の白いタグの並び（Figma: Keywords / Themes） */
export default function Tags({
  items,
  gap = "sm",
  display = false,
}: {
  items: readonly string[];
  gap?: "sm" | "md";
  /** 欧文書体（Abhaya Libre Bold）で組む。Figma: About 324:335 の Keywords */
  display?: boolean;
}) {
  return (
    <ul className={`flex flex-wrap ${gap === "md" ? "gap-3" : "gap-2"}`}>
      {items.map((t) => (
        <li
          key={t}
          className={`bg-white/40 px-3 py-2 text-[12px] tracking-[0.04em] whitespace-nowrap ${display ? "font-display font-bold" : ""}`}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
