import type { Metadata } from "next";
import { Section } from "@/components/Layout";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
  title: "アクセス",
  robots: { index: false },
};

/** 旧サイトの /access から「研究室について」のアクセスへ移す */
export default function AccessRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/about#access" />
      <Section tight>
        <p className="pb-6 font-mincho text-[16px]">アクセスは「研究室について」のページに移りました。</p>
        <TextLink href="/about#access">アクセス・お問い合わせ</TextLink>
      </Section>
    </>
  );
}
