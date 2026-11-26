import type { Metadata } from "next";
import {
  Abhaya_Libre,
  Newsreader,
  Shippori_Mincho_B1,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

// 欧文の見出し・日付・ラベル（First Viewの「Flourishing Technology」も）
const abhaya = Abhaya_Libre({
  variable: "--font-abhaya",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const shippori = Shippori_Mincho_B1({
  variable: "--font-shippori",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const zen = Zen_Kaku_Gothic_New({
  variable: "--font-zen",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yokokubo-lab.com"),
  title: {
    default: "横窪研究室 | Yokokubo Lab, UTokyo",
    template: "%s | 横窪研究室",
  },
  description:
    "東京大学大学院情報学環・学際情報学府 横窪研究室。人と社会の幸福を育むテクノロジーをつくる。文化コンピューティングと都市と幸福の2つの領域で研究しています。",
  // プレビュー環境では検索エンジンに載せない
  ...(process.env.NEXT_PUBLIC_NOINDEX
    ? { robots: { index: false, follow: false } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${newsreader.variable} ${abhaya.variable} ${shippori.variable} ${zen.variable}`}
    >
      <head>
        {/* スクロールで現れる要素を、最初の描画から隠しておく（ちらつき防止） */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal')",
          }}
        />
      </head>
      <body className="relative min-h-screen">
        <ScrollReveal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
