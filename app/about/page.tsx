import type { Metadata } from "next";
import { Body, Row, Section } from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import SymbolMotif from "@/components/SymbolMotif";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
  title: "研究室について",
  description:
    "横窪研究室は、スローデジタルの考え方のもと、HCIとHAIを軸に、人の感性と精神的豊かさを育むテクノロジーを研究しています。",
};

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=%E3%83%80%E3%82%A4%E3%83%AF%E3%83%A6%E3%83%93%E3%82%AD%E3%82%BF%E3%82%B9%E5%AD%A6%E8%A1%93%E7%A0%94%E7%A9%B6%E9%A4%A8";

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-line pt-6">
      <h3 className="font-mincho text-[16px] font-semibold tracking-[0.06em] md:text-[18px]">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader title="研究室について" />

      {/* 思想 → 問い → 本文・キーワード・リンク（Figma: About 158:202 の 02 Intro） */}
      <Section tight className="md:!py-16">
        {/* すりガラスの面（Figma: Frame 97）。左右の余白はとらず、ページ見出しと左端をそろえる */}
        <div
          data-reveal
          className="flex flex-col gap-12 py-12 backdrop-blur-[2px] md:gap-20 md:py-16"
        >
          <p className="font-display text-[44px] leading-none font-bold md:text-[64px]">
            Flourishing Technology
          </p>

          {/* 本文は1行が長くなりすぎないよう、Figmaと同じ952pxで折り返す */}
          <div className="flex max-w-[952px] flex-col gap-12">
            <p className="font-mincho text-[20px] leading-[2] font-semibold tracking-[0.03em] md:text-[28px] md:leading-[2.2]">
              情報があふれ、いつもつながっている時代に、
              <br className="hidden md:block" />
              テクノロジーとどう向き合えば心豊かに暮らせるのか。
            </p>
            <Body loose>
              横窪研究室は、この問いから研究をはじめています。
              <br />
              大切にしているのは「スローデジタル」という考え方です。
              <br className="hidden md:block" />
              あえて時間をかけることで、深い理解や創造性を生む。そんなテクノロジーのあり方を探っています。
              <br />
              コンピュータに向かう毎日の中でも、花をいけると心が落ち着く。この実感が、研究の原点にあります。
            </Body>
            <Body loose>
              ヒューマンコンピュータインタラクション（HCI）と人とAIのインタラクション（HAI）を軸に、ものをつくって問いながら、人の感性と精神的豊かさを育むテクノロジーを研究しています。つくって、使ってもらい、そこから問いを深める「Research
              through Design」が、研究の方法です。
            </Body>
            <Body loose>
              いま取り組んでいるのは、文化と都市の2つの領域です。
              <br />
              華道・香道・茶道など、日本の伝統芸道をより身近に、
              <br className="hidden md:block" />
              日々の暮らしの中で楽しめる道具や体験をつくる「文化コンピューティング」と、
              <br className="hidden md:block" />
              都市で暮らす人々のウェルビーイングを支える「都市と幸福」。
              <br className="hidden md:block" />
              対象は違っても、どちらも人と社会の幸福を育むテクノロジーを探る研究です。
            </Body>
            <Body loose>
              研究室は2026年4月、東京大学大学院情報学環・学際情報学府
              総合分析情報学コースに開設しました。
              <br />
              2026年から学生の募集をはじめ、2027年から本格的に始動します。
            </Body>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <TextLink href="/research">研究を見る</TextLink>
            <TextLink href="/members">メンバー・募集について</TextLink>
          </div>
        </div>
      </Section>

      {/* ロゴについて（Figma: 03 Symbol） */}
      <Section id="symbol">
        <Row left={<SectionHeading>ロゴについて</SectionHeading>}>
          <div className="flex flex-col gap-10 md:gap-12">
            <SymbolMotif className="block h-auto w-full max-w-[429px]" />
            <div className="flex flex-col gap-6">
              <p className="font-mincho text-[24px] leading-[1.8] font-semibold tracking-[0.03em] md:text-[32px]">
                咲く、広がる、栄える
              </p>
              <Body>
                Flourishing（フローリッシング）は「持続的幸福」を表す言葉です。身体の健康、心の充実、人とのつながり、生きがい。いくつもの要素が調和して満たされ、生き生きとしている状態を指し、ポジティブ心理学によって広まりました。語源は、ラテン語のflorere（花が咲く）です。
              </Body>
              <Body>
                横窪研究室は、一人ひとりの幸福にとどまらず、都市やコミュニティまでを見つめ、「人と社会の幸福」を育むテクノロジーを探っています。
              </Body>
              <Body>
                ロゴのシンボルは、YokokuboのYを6方向に回転させて重ね、ひとつの花として咲かせています。いくつもの要素が調和して満たされ、生き生きと咲き続ける。持続的幸福のありようを、このかたちに込めました。
              </Body>
            </div>
          </div>
        </Row>
      </Section>

      <Section id="access">
        <Row
          left={
            <SectionHeading>
              アクセス・
              <br />
              お問い合わせ
            </SectionHeading>
          }
        >
          <div className="flex flex-col gap-10">
            <InfoBlock title="所在地">
              <Body>
                〒113-0033 東京都文京区本郷7-3-1
                <br />
                東京大学大学院情報学環 ダイワユビキタス学術研究館
              </Body>
              <div className="pt-2">
                <TextLink href={MAP_URL} external>
                  地図（Googleマップ）
                </TextLink>
              </div>
            </InfoBlock>
            <InfoBlock title="電車">
              <Body>
                東京メトロ南北線・丸ノ内線「本郷三丁目」駅 徒歩8分
                <br />
                都営大江戸線「本郷三丁目」駅 徒歩8分
                <br />
                JR「御茶ノ水」駅 徒歩12分
              </Body>
            </InfoBlock>
            <InfoBlock title="メール">
              <Body>anna.yokokubo [at] iii.u-tokyo.ac.jp</Body>
            </InfoBlock>
            <InfoBlock title="配属・見学を希望される方へ">
              <Body>
                2026年度から学生の募集をはじめています（配属は2027年度から）。面談・見学は随時受け付けています。修士課程・博士課程への進学を希望される方も歓迎します。メールで気軽にご連絡ください。
              </Body>
            </InfoBlock>
          </div>
        </Row>
      </Section>
    </>
  );
}
