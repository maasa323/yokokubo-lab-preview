import type { Metadata } from "next";
import { Row, Section } from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import TextLink from "@/components/TextLink";
import { awards, getPublicationsByYear } from "@/lib/publications";
import { SCHOLAR_PROFILE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "業績",
  description: "横窪研究室の論文・発表・受賞の一覧です。論文・発表はGoogle Scholarから取得しています。",
};

export default function PublicationsPage() {
  const byYear = getPublicationsByYear();

  return (
    <>
      <PageHeader title="業績" />

      <Section className="md:!pt-24">
        <Row stickyLeft left={<SectionHeading>論文・発表</SectionHeading>}>
          <div className="flex flex-col gap-16">
            {byYear.map(([year, pubs]) => (
              <section key={year} className="flex flex-col gap-6 md:flex-row md:gap-12">
                {/*
                  年は、その年の一覧をスクロールしている間、左の見出しと同じ高さに留める。
                  行の高さを見出し（32px × 1.45）とそろえ、見出しに対して上下中央に来るようにする。
                  書体の違いで文字の見た目の中心が1.5px上にずれるので、その分下げる
                */}
                <h3 className="shrink-0 font-display text-[28px] leading-[1.45] tracking-[0.02em] md:sticky md:top-[136px] md:w-24 md:translate-y-[1.5px] md:self-start md:text-[32px]">
                  {year}
                </h3>
                <ul className="flex min-w-0 flex-1 flex-col">
                  {pubs.map((p) => (
                    <li key={p.scholarUrl} className="flex flex-col gap-2 border-t border-line py-6 first:border-t-0 first:pt-0">
                      <a
                        href={p.scholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mincho text-[16px] leading-[1.6] font-semibold tracking-[0.02em] underline-offset-4 hover:underline md:text-[18px]"
                      >
                        {p.title}
                      </a>
                      <p className="text-[14px] leading-[1.7] tracking-[0.03em]">{p.authors}</p>
                      {p.venue && (
                        <p className="text-[14px] leading-[1.7] tracking-[0.03em] text-ink-muted">{p.venue}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <div className="flex flex-col gap-4">
              <p className="text-[14px] tracking-[0.04em] text-ink-muted">
                Google Scholarから新しい順に最大100件を表示しています。
              </p>
              <div>
                <TextLink href={SCHOLAR_PROFILE_URL} external>
                  それより前の業績：Google Scholar
                </TextLink>
              </div>
            </div>
          </div>
        </Row>
      </Section>

      <Section>
        <Row left={<SectionHeading>受賞</SectionHeading>}>
          <ul className="flex flex-col">
            {awards.map((a) => (
              <li
                key={a}
                className="border-t border-line py-6 font-mincho text-[16px] leading-[1.7] font-semibold tracking-[0.03em] first:border-t-0 first:pt-0 md:text-[18px]"
              >
                {a}
              </li>
            ))}
          </ul>
        </Row>
      </Section>
    </>
  );
}
