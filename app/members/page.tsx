import type { Metadata } from "next";
import { Body, Label, Row, Section } from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Placeholder from "@/components/Placeholder";
import SectionHeading from "@/components/SectionHeading";
import { asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "メンバー",
  description: "横窪研究室のメンバーです。",
};

const career = [
  "キヤノン株式会社 研究開発部門（2012〜2017年）",
  "Turku University of Applied Sciences, Visiting Researcher（2015年）",
  "青山学院大学 理工学部 情報テクノロジー学科 助手（2017〜2020年）、助教（2020〜2023年）",
  "東京大学大学院情報学環 助教（2023〜2026年）",
  "東京大学大学院情報学環 准教授（2026年〜）",
  "博士（理学）、お茶の水女子大学",
];

export default function MembersPage() {
  return (
    <>
      <PageHeader title="メンバー" />

      <Section tight>
        <Row left={<SectionHeading>教員</SectionHeading>}>
          <div className="flex flex-col gap-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/members/anna-yokokubo.jpg")}
              alt="横窪 安奈"
              width={480}
              height={640}
              className="block aspect-[3/4] w-full max-w-[240px] shrink-0 self-start object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-10">
              <div className="flex flex-col gap-3">
                <p className="text-[14px] tracking-[0.06em]">准教授</p>
                <h3 className="font-mincho text-[28px] leading-[1.4] font-extrabold tracking-[0.08em] md:text-[32px]">
                  横窪 安奈
                </h3>
                <p className="font-serif text-[20px] font-medium">Anna Yokokubo, PhD</p>
                <p className="pt-2 text-[14px] leading-[1.7] tracking-[0.04em]">
                  東京大学大学院情報学環・学際情報学府 総合分析情報学コース
                </p>
              </div>
              <Body>
                専門：HCI、エンタテインメントコンピューティング、文化コンピューティング、行動変容、AI、スマートシティ
              </Body>
              <div className="flex flex-col gap-4">
                <Label>Career 経歴</Label>
                <ul className="flex flex-col">
                  {career.map((c) => (
                    <li key={c} className="border-t border-line py-3 font-mincho text-[16px] leading-[1.7] font-medium tracking-[0.03em] first:border-t-0 first:pt-0">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <Label>Books 主な著書</Label>
                <p className="font-mincho text-[16px] leading-[1.7] font-medium tracking-[0.03em]">
                  『東京計画2030』（インプレス、2026年）（仮）
                </p>
              </div>
              <Placeholder label="researchmap へのリンク（仮）" className="h-12 w-full max-w-[320px]" />
            </div>
          </div>
        </Row>
      </Section>

      <Section>
        <Row left={<SectionHeading>学生</SectionHeading>}>
          <Body>2027年から学生が加わります。（仮）</Body>
        </Row>
      </Section>
    </>
  );
}
