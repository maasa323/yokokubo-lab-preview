export const navItems = [
  { href: "/about", label: "研究室について" },
  { href: "/research", label: "研究" },
  { href: "/publications", label: "業績" },
  { href: "/news", label: "お知らせ" },
  { href: "/members", label: "メンバー" },
] as const;

export const SCHOLAR_PROFILE_URL =
  "https://scholar.google.co.jp/citations?user=VhHsUvsAAAAJ&hl=ja&sortby=pubdate";

export const XIPF_URL = "https://xipf-consortium.org/";

/** 越塚・羽多野・横窪・濱田・葛・清家 合同研究室 */
export const JOINT_LAB_URL = "https://www.koshizuka-lab.org/";

/** GitHub Pages のサブパス（プレビュー用）。本番は空 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** public/ 配下の画像パスに basePath を付ける */
export const asset = (path: string) => `${BASE_PATH}${path}`;
