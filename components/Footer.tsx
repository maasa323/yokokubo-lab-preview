import Link from "next/link";
import { asset, navItems } from "@/lib/site";
import TextLink, { LinkUnderline } from "./TextLink";

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-site flex-col gap-16 px-6 py-12 md:gap-[120px] md:px-16">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-8">
          <Link href="/" aria-label="横窪研究室 トップへ" className="w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/top/logo.svg")}
              alt="横窪研究室 Yokokubo Lab, UTokyo"
              width={197.72}
              height={48}
              className="block"
            />
          </Link>
          <address className="flex flex-col gap-2 text-[14px] leading-[1.7] tracking-[0.04em] not-italic">
            <span>東京大学大学院情報学環・学際情報学府 総合分析情報学コース</span>
            <span>横窪研究室</span>
            <span>〒113-0033 東京都文京区本郷7-3-1</span>
            <span>anna.yokokubo [at] iii.u-tokyo.ac.jp</span>
            <span className="pt-2">
              <TextLink href="/about#access">アクセス</TextLink>
            </span>
          </address>
        </div>
        <nav aria-label="フッター">
          <ul className="flex flex-col gap-4 text-[14px] tracking-[0.06em] whitespace-nowrap md:w-[104px] md:pt-20">
            {navItems.map((item) => (
              <li key={item.href}>
                {/* ヘッダーのナビと同じく、ホバーでグラデーションの線が左から右へ走る */}
                <Link href={item.href} className="group relative pb-1">
                  {item.label}
                  <LinkUnderline base={false} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="font-display text-[12px] tracking-[0.12em] uppercase">© Yokokubo Lab</p>
    </footer>
  );
}
