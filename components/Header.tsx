"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset, navItems } from "@/lib/site";
import { LinkUnderline } from "./TextLink";

export default function Header() {
  const pathname = usePathname();
  // 開いたときのページを覚えておき、ページを移ったら自然に閉じた扱いにする
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  // メニューを開いている間は背面をスクロールさせない
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 少しでもスクロールしたら、本文と重なる前提でヘッダーに背景を敷く
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    // iPhoneではステータスバーの裏まで広げ、中身はステータスバーの高さ分下げる（PCでは0）
    <header className="sticky top-0 z-30 h-[calc(72px+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] md:h-[calc(96px+env(safe-area-inset-top))]">
      {/*
        背景は別の要素に敷く。header 自体に backdrop-filter を付けると、
        中の position: fixed（スマホのメニュー）が画面ではなく header 基準になってしまうため。
        上は画面の外まで伸ばし、iPhoneのステータスバーの裏も同じぼかしにする。
      */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -top-[120px] bottom-0 -z-10 bg-white/70 backdrop-blur-md transition-opacity duration-300 ${scrolled && !open ? "opacity-100" : "opacity-0"}`}
      />
      {/* 中身だけ最大幅に収める（背景は画面幅いっぱい） */}
      <div className="mx-auto flex h-full w-full max-w-site items-center justify-between px-4 md:pr-12 md:pl-6">
        <Link href="/" aria-label="横窪研究室 トップへ" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/top/logo.svg")}
            alt="横窪研究室 Yokokubo Lab, UTokyo"
            width={197.72}
            height={48}
            className="block h-10 w-auto md:h-14"
          />
        </Link>

        {/* 文字は16px。768〜1023pxはロゴとぶつからないよう14px */}
        <nav aria-label="メイン" className="hidden md:block">
          <ul className="flex gap-10 text-[14px] lg:text-[16px] tracking-[0.06em] whitespace-nowrap">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group relative py-2"
                >
                  {item.label}
                  {/* 表示中のページはグラデーションの線。ほかはホバーで左から右へ走る */}
                  <LinkUnderline base={false} active={isActive(item.href)} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="relative z-40 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpenedAt(open ? null : pathname)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-30 bg-white/95 px-6 pt-[calc(7rem+env(safe-area-inset-top))] backdrop-blur-sm md:hidden"
      >
        <ul className="flex flex-col gap-8 font-mincho text-[22px] font-semibold tracking-[0.08em]">
          <li>
            <Link href="/">トップ</Link>
          </li>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
