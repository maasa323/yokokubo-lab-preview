import Backdrop from "@/components/Backdrop";
import {
  AreaCard,
  JointLabLink,
  NewsRow,
  Partners,
  XipfCard,
} from "@/components/Blocks";
import { Body, Lead, Row, Section } from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import TextLink from "@/components/TextLink";
import { getNews } from "@/lib/news";
import { areas } from "@/lib/research";

/** トップページ（Figma: First View 195:221、以下 196:269） */
export default function Home() {
  const news = getNews().slice(0, 3);
  const [cultural, urban] = areas;

  return (
    <>
      <Backdrop variant="top" />

      {/*
        First View（Figma: TOP / Desktop 195:221）
        メッセージだけを置く。ヘッダーを除いた画面の高さいっぱいに広げ、文字は左下に寄せる
      */}
      <section className="relative mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-site flex-col justify-end gap-6 px-6 pt-16 pb-16 md:min-h-[calc(100svh-96px)] md:px-16">
        <h1
          data-reveal
          className="font-display text-[64px] leading-[0.9] font-semibold sm:text-[96px] md:text-[130px]"
        >
          Flourishing
          <br />
          Technology
        </h1>
        <p
          data-reveal
          className="font-mincho text-[24px] leading-[1.4] font-semibold tracking-[0.04em] sm:text-[32px] md:text-[48px]"
          style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
        >
          人と社会の幸福を育む
          <br />
          テクノロジーをつくる
        </p>
      </section>

      {/* About（Figma: TOP 323:338）。左寄せ、本文は意味の区切りで改行する */}
      <section className="relative mx-auto w-full max-w-site px-6 py-24 md:px-16 md:py-40">
        {/* 1行ずつ、ぼかしをほどきながらゆっくり出す（globals.css の data-reveal="soft"） */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-12">
            <p className="font-mincho text-[20px] leading-[2] font-semibold tracking-[0.03em] md:text-[28px] md:leading-[2.2]">
              <span data-reveal="soft" className="block">
                情報があふれ、いつもつながっている時代に、
              </span>
              <span
                data-reveal="soft"
                className="block"
                style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}
              >
                テクノロジーとどう向き合えば心豊かに暮らせるのか。
              </span>
            </p>
            <div
              data-reveal="soft"
              style={{ "--reveal-delay": "0.9s" } as React.CSSProperties}
            >
              <Body loose>
                横窪研究室は、この問いから研究をはじめています。
                <br />
                大切にしているのは「スローデジタル」という考え方です。
                <br className="hidden md:block" />
                あえて時間をかけることで、深い理解や創造性を生む。
                <br className="hidden md:block" />
                そんなテクノロジーのあり方を探っています。
              </Body>
            </div>
            <div
              data-reveal="soft"
              style={{ "--reveal-delay": "1.2s" } as React.CSSProperties}
            >
              <Body loose>
                ヒューマンコンピュータインタラクション（HCI）と
                <br className="hidden md:block" />
                人とAIのインタラクション（HAI）を軸に、
                <br className="hidden md:block" />
                ものをつくって問いながら、
                <br className="hidden md:block" />
                人の感性と精神的豊かさを育むテクノロジーを研究しています。
              </Body>
            </div>
          </div>
          <div
            data-reveal="soft"
            style={{ "--reveal-delay": "1.5s" } as React.CSSProperties}
          >
            <TextLink href="/about" size="lg">
              研究室について
            </TextLink>
          </div>
        </div>
      </section>

      {/* News */}
      <Section>
        <Row
          left={
            <>
              <SectionHeading>お知らせ</SectionHeading>
              <div className="hidden lg:block">
                <TextLink href="/news" size="lg">
                  お知らせ一覧
                </TextLink>
              </div>
            </>
          }
        >
          {/* 1行ずつ下に罫線（Figma: TOP 320:1534 の NewsItem） */}
          <ul className="flex flex-col">
            {news.map((item) => (
              <NewsRow key={`${item.date}-${item.title}`} item={item} divided />
            ))}
          </ul>
          <div className="pt-10 lg:hidden">
            <TextLink href="/news" size="lg">
              お知らせ一覧
            </TextLink>
          </div>
        </Row>
      </Section>

      {/* Research：見出しの下に全幅のリード、2つの領域を2カラムで */}
      <Section className="flex flex-col gap-10">
        <div data-reveal>
          <SectionHeading>研究</SectionHeading>
        </div>
        <div className="flex flex-col gap-16">
          <div data-reveal>
            <Lead>
              文化と都市。2つの領域で、
              <br className="hidden sm:block" />
              人と社会の幸福を育むテクノロジーを研究しています。
            </Lead>
          </div>
          {/* 2つの領域をアイコンつきで横に並べる（Figma: TOP 320:1534 の Areas） */}
          <div className="grid gap-24 lg:grid-cols-2 lg:gap-16 xl:gap-32">
            <AreaCard
              area={cultural}
              link={{
                href: `/research#${cultural.id}`,
                label: "文化コンピューティングの研究",
              }}
            />
            <AreaCard
              area={urban}
              link={{ href: `/research#${urban.id}`, label: "都市と幸福の研究" }}
            />
          </div>
        </div>
      </Section>

      {/* Collaboration：研究ページと同じ、左に見出し・右に本文 */}
      <Section>
        <Row left={<SectionHeading>共同研究</SectionHeading>}>
          <div className="flex flex-col gap-16 md:gap-24">
            <p className="font-mincho text-[20px] leading-[1.7] font-semibold tracking-[0.03em] md:text-[24px]">
              <JointLabLink />
              の一員として、企業や研究機関と一緒に、研究を暮らしや都市で使われる形にしています。
            </p>
            <XipfCard />
            <Partners />
          </div>
        </Row>
      </Section>
    </>
  );
}
