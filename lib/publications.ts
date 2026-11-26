import cache from "@/lib/publications-cache.json";

/**
 * Google Scholar のプロフィール（新しい順・最大100件）から
 * scripts/fetch-scholar.mjs がビルド前に書き出したデータ。
 */
export type ScholarPub = {
  title: string;
  scholarUrl: string;
  authors: string;
  venue: string;
  /** 0 = 年が不明 */
  year: number;
  citedBy: number;
  type: string;
};

/** 年ごとにまとめる（年が不明なものは最後） */
export function getPublicationsByYear(): [string, ScholarPub[]][] {
  const map = new Map<number, ScholarPub[]>();
  for (const p of cache as ScholarPub[]) {
    const key = p.year || -1;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return [...map.entries()]
    .sort((a, b) => (a[0] === -1 ? 1 : b[0] === -1 ? -1 : b[0] - a[0]))
    .map(([y, pubs]) => [y === -1 ? "Others" : String(y), pubs]);
}

/** 受賞（Scholarにないので手で持つ） */
export const awards = [
  "ISC2 2024 Best Paper Award（ScaleCity）",
  "AHs 2025 Honorable Mention Poster（Happiness Finder）",
  "AIoT行動変容学会 第9回研究会 優秀発表賞（2025）",
  "総務省 異能vation ノミネート（TracKenzan）",
  "経済産業省 未踏ユース（2010年度、CADo）",
] as const;
