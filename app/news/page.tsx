import type { Metadata } from "next";
import { Section } from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { getNews } from "@/lib/news";
import NewsList from "./NewsList";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "横窪研究室の受賞・発表・メディア掲載などのお知らせです。",
};

/** 1カラム：左端を見出しにそろえる */
export default function NewsPage() {
  return (
    <>
      <PageHeader title="お知らせ" />
      <Section className="md:!pt-24">
        <div data-reveal>
          <NewsList items={getNews()} />
        </div>
      </Section>
    </>
  );
}
