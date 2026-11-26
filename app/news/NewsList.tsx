"use client";

import { useState } from "react";
import { NewsRow } from "@/components/Blocks";
import { newsCategories, type NewsCategory, type NewsItem } from "@/lib/news";

type Filter = "すべて" | NewsCategory;

export default function NewsList({ items }: { items: NewsItem[] }) {
  const [filter, setFilter] = useState<Filter>("すべて");
  const shown = filter === "すべて" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="flex flex-col gap-12">
      <div role="group" aria-label="種類で絞り込む" className="flex flex-wrap gap-2">
        {(["すべて", ...newsCategories] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="border border-ink/20 px-4 py-2 text-[14px] tracking-[0.06em] transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-white"
          >
            {f}
          </button>
        ))}
      </div>
      {shown.length > 0 ? (
        <ul className="flex flex-col gap-8 lg:gap-12">
          {shown.map((item) => (
            <NewsRow key={`${item.date}-${item.title}`} item={item} showCategory />
          ))}
        </ul>
      ) : (
        <p className="font-mincho text-[16px]">このカテゴリーのお知らせはまだありません。</p>
      )}
    </div>
  );
}
