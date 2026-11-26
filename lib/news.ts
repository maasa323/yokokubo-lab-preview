import data from "@/content/news.json";

/** 最後の「お知らせ」は、どれにも当てはまらないときに使う汎用の種類 */
export const newsCategories = ["受賞", "発表", "メディア", "募集", "お知らせ"] as const;
export type NewsCategory = (typeof newsCategories)[number];

export type NewsItem = {
  /** YYYY.MM.DD。未定の部分は 00 */
  date: string;
  /** 省略すると「お知らせ」 */
  category: NewsCategory;
  title: string;
  /** 外部リンク（任意） */
  url?: string;
};

/** 新しい順に並べたお知らせ */
export function getNews(): NewsItem[] {
  return (data as (Omit<NewsItem, "category"> & { category?: NewsCategory | null })[])
    .map((item) => ({ ...item, category: item.category ?? "お知らせ" }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
