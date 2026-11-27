import type { Metadata } from "next";
import {
  AreaBlock,
  AreaSummary,
  JointLabLink,
  Keywords,
  Partners,
  XipfCard,
} from "@/components/Blocks";
import { Body, Lead, Row, Section } from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Placeholder from "@/components/Placeholder";
import SectionHeading from "@/components/SectionHeading";
import TextLink from "@/components/TextLink";
import { areas, type Project } from "@/lib/research";

export const metadata: Metadata = {
  title: "研究",
  description:
    "文化と都市。2つの領域で、人と社会の幸福を育むテクノロジーを研究しています。文化コンピューティング、都市と幸福、共同研究。",
};

/**
 * 個別の研究のカード（Figma: 335:2721）。画像・タイトル・発表・説明・キーワードの順。
 * 横に並んだカードでキーワードの高さがそろうよう、キーワードはカードの一番下に置く
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-reveal
      className="flex flex-col gap-4"
      // 横に並んだカードは、右に行くほど少し遅らせる
      style={
        { "--reveal-delay": `${(index % 3) * 0.12}s` } as React.CSSProperties
      }
    >
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image.src}
          alt=""
          width={project.image.width}
          height={project.image.height}
          loading="lazy"
          className={`block aspect-[592/384] w-full ${project.image.fit === "contain" ? "bg-white object-contain p-4" : "object-cover"}`}
        />
      ) : (
        <Placeholder label="写真" className="aspect-[592/384] w-full" />
      )}
      <div className="flex flex-col gap-3">
        <h3 className="font-mincho text-[22px] leading-[1.4] font-extrabold tracking-[0.04em] md:text-[24px]">
          {project.title}
        </h3>
        <p className="text-[14px] leading-[1.7] tracking-[0.04em]">
          {project.meta}
        </p>
      </div>
      <Body>{project.description}</Body>
      <div className="mt-auto">
        <Keywords tags={project.tags} />
      </div>
    </article>
  );
}

export default function ResearchPage() {
  return (
    <>
      <PageHeader title="研究" />

      {/* 上段：リードの下に、2つの領域へのリンクをアイコンつきで並べる（Figma: 325:339） */}
      <Section tight>
        <div data-reveal className="flex flex-col gap-6">
          <Lead>
            文化と都市。2つの領域で、
            <br className="hidden sm:block" />
            人と社会の幸福を育むテクノロジーを研究しています。
          </Lead>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {areas.map((area) => (
              <AreaSummary key={area.id} area={area} />
            ))}
          </div>
        </div>
      </Section>

      {areas.map((area) => (
        <Section
          key={area.id}
          id={area.id}
          className="flex flex-col gap-20 md:gap-[120px]"
        >
          <AreaBlock area={area} />
          {/* 個別の研究は3列（Figma: 335:2291） */}
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-20">
            {area.projects.map((p, j) => (
              <ProjectCard key={p.title} project={p} index={j} />
            ))}
          </div>
          <div>
            <TextLink href="/publications" size="lg">業績一覧</TextLink>
          </div>
        </Section>
      ))}

      <Section id="collaboration">
        <Row left={<SectionHeading>共同研究</SectionHeading>}>
          <div className="flex flex-col gap-16 md:gap-24">
            <p className="font-mincho text-[20px] leading-[1.7] font-semibold tracking-[0.03em] md:text-[24px]">
              <JointLabLink />
              の一員として、企業や研究機関と一緒に、研究を暮らしや都市で使われる形にしています。
            </p>
            <XipfCard />
            <div className="flex flex-col gap-6">
              <h3 className="font-mincho text-[20px] font-extrabold tracking-[0.04em]">
                社会連携講座
              </h3>
              <Placeholder
                label="名称・説明（仮）／12月にリンク"
                className="h-24 w-full"
              />
            </div>
            <Partners />
            <div className="flex flex-col gap-6">
              <h3 className="font-mincho text-[20px] font-extrabold tracking-[0.04em]">
                過去の共同研究
              </h3>
              <Placeholder
                label="相手先・期間・テーマの一覧（仮）"
                className="h-24 w-full"
              />
              <Body>
                Turku University of Applied
                Sciences（フィンランド）：CADoの評価実験（AVI
                2012）、VRドッジボール（2020）（仮）
              </Body>
            </div>
          </div>
        </Row>
      </Section>
    </>
  );
}
