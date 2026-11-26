"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * スクロールで画面に入った [data-reveal] に .is-visible を付ける（1回だけ）。
 * 見た目は globals.css の「スクロールで現れる」を参照。
 * ページを移るたびに、新しいページの要素を拾い直す。
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not(.is-visible)",
    );
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      // 画面の下から少し入ったところで出す。背の高い要素でも出るよう threshold は 0
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
