import type { Area } from "@/lib/research";
import { partners } from "@/lib/research";
import type { NewsItem } from "@/lib/news";
import { Body, Row } from "./Layout";
import TextLink, { LinkArrow, LinkUnderline } from "./TextLink";
import { JOINT_LAB_URL, XIPF_URL, asset } from "@/lib/site";

/** 領域のアイコン（120×120。Figma: TOP 320:1534） */
function AreaIcon({ area }: { area: Area }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={area.icon} alt="" width={120} height={120} className="block size-[120px]" />
  );
}

/** 領域名と英語名（トップのカードと同じ組み方）。as で見出しのレベルを変える */
function AreaTitle({ area, as = "h3" }: { area: Area; as?: "h2" | "h3" | "p" }) {
  const Tag = as;
  return (
    <div className="flex flex-col gap-2">
      <Tag className="font-mincho text-[22px] leading-[1.4] font-extrabold tracking-[0.04em] md:text-[24px]">
        {area.ja}
      </Tag>
      <p className="font-display text-[16px] tracking-[0.02em] capitalize">{area.en}</p>
    </div>
  );
}

/** キーワード：上下に細い罫線、「/」で区切る（Figma: TOP 320:1534 の Keyword）。研究ページのカードでも使う */
export function Keywords({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-col gap-6 border-y border-black/15 py-6">
      <p className="font-display text-[20px] font-semibold tracking-[0.04em]">Keyword</p>
      <ul className="flex flex-wrap gap-2 text-[14px] tracking-[0.04em]">
        {/* 折り返したとき「/」が行末に残るよう、区切りは語の後ろに付ける */}
        {tags.map((t, i) => (
          <li key={t} className="flex gap-2 whitespace-nowrap">
            {t}
            {i < tags.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 研究ページの上段で2つの領域へ飛ぶリンク（Figma: 325:339）。
 * 小さなアイコン（56px）と領域名のリンクを並べる
 */
export function AreaSummary({ area }: { area: Area }) {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={area.icon} alt="" width={56} height={56} className="block size-14" />
      <TextLink href={`#${area.id}`} size="lg">
        {area.ja}
      </TextLink>
    </div>
  );
}

/** 研究領域の詳しい説明（研究ページ）。左にアイコンと名前、右に説明とキーワード */
export function AreaBlock({ area }: { area: Area }) {
  return (
    <Row
      left={
        <div className="flex flex-col gap-2">
          <AreaIcon area={area} />
          <AreaTitle area={area} as="h2" />
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <Body className="whitespace-pre-line">{area.description}</Body>
        <Keywords tags={area.tags} />
      </div>
    </Row>
  );
}

/**
 * 研究領域のカード（トップ。Figma: TOP 320:1534 の Area 01 / 02）。アイコンつき、2カラムで並べる。
 * 2つのリンクの高さがそろうよう、リンクはカードの一番下に置く（並べたグリッドで高さが同じになる）
 */
export function AreaCard({
  area,
  link,
}: {
  area: Area;
  link: { href: string; label: string };
}) {
  return (
    <div data-reveal className="flex min-w-0 flex-col">
      <div className="flex flex-col gap-2">
        <AreaIcon area={area} />
        <AreaTitle area={area} />
      </div>
      <div className="flex flex-1 flex-col gap-8 pt-8">
        <Body className="whitespace-pre-line">{area.description}</Body>
        <Keywords tags={area.tags} />
        <div className="mt-auto pt-4">
          <TextLink href={link.href} size="lg">
            {link.label}
          </TextLink>
        </div>
      </div>
    </div>
  );
}

/** お知らせの1行（Figma: NewsItem） */
export function NewsRow({
  item,
  showCategory = false,
  divided = false,
}: {
  item: NewsItem;
  showCategory?: boolean;
  /** 下に細い罫線を引き、行の上下に余白をとる（Figma: TOP 320:1534 の NewsItem） */
  divided?: boolean;
}) {
  const title = item.url ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="underline-offset-4 hover:underline"
    >
      {item.title}
    </a>
  ) : (
    item.title
  );
  return (
    <li
      className={`flex flex-col gap-2 md:flex-row md:gap-14 ${divided ? "border-b border-black/15 py-4 md:items-center" : "md:items-baseline"}`}
    >
      <p
        className={`flex shrink-0 items-center gap-4 ${showCategory ? "md:w-[192px]" : ""}`}
      >
        <time className="font-display text-[16px] tracking-[0.06em]">
          {item.date}
        </time>
        {showCategory && item.category && (
          <span className="bg-veil px-2 text-[12px] leading-[24px] tracking-[0.06em]">
            {item.category}
          </span>
        )}
      </p>
      <p className="min-w-0 flex-1 font-mincho text-[18px] leading-[1.6] font-medium tracking-[0.03em] md:text-[20px]">
        {title}
      </p>
    </li>
  );
}

/** xIPF のカード（Figma: xIPF）。左にロゴ、右に説明と「xIPF（外部サイト）」のリンク。カード全体が外部サイトへのリンク */
export function XipfCard() {
  return (
    <a
      href={XIPF_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-6 bg-white/60 p-6 transition-colors duration-300 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:flex-row md:items-center"
    >
      <div className="flex shrink-0 flex-col gap-4">
        <p className="font-display text-[14px] font-bold tracking-[0.02em]">Consortium</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/images/top/xipf.png")}
          alt="xIPF Consortium"
          width={182}
          height={64}
          className="block h-16 w-[182px] object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <Body>
          企業や組織ごとに分かれているデータをつなぎ、組織をまたいで使えるようにするデータ連携基盤のコンソーシアムです。越塚研究室とソフトバンクが中心となって設立しました。
        </Body>
        {/* TextLink と同じ見た目（カード自体が a なので、中は span にする） */}
        <span className="relative inline-flex items-center gap-3 self-start pb-2 text-[14px] font-medium tracking-[0.04em]">
          <span>xIPF（外部サイト）</span>
          <LinkArrow external />
          <LinkUnderline />
        </span>
      </div>
    </a>
  );
}

/** 共同研究先（Figma: Partners） */
export function Partners() {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-mincho text-[20px] font-bold tracking-[0.02em]">共同研究先</p>
      <ul className="flex flex-wrap gap-x-12 gap-y-6 font-mincho text-[16px] font-semibold tracking-[0.04em]">
        {partners.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

/** 合同研究室の名前（文中のリンク。外部サイトを新しいタブで開く。後ろに斜めの矢印） */
export function JointLabLink() {
  return (
    <a
      href={JOINT_LAB_URL}
      target="_blank"
      rel="noopener noreferrer"
      // 下線は背景で引く：ふだんは文字色の線、ホバーでグラデーションの線が左から右へ伸びて重なる（TextLink と同じ動き）。
      // 文中で折り返しても行ごとに線が出るよう box-decoration-break: clone
      className="group bg-[linear-gradient(90deg,#ff90ea,#8bb5ff,#0094ff),linear-gradient(currentColor,currentColor)] [background-position:0_100%,0_100%] bg-no-repeat pb-1 [background-size:0%_1px,100%_1px] [box-decoration-break:clone] transition-[background-size] duration-500 ease-out hover:[background-size:100%_1px,100%_1px]"
    >
      越塚・羽多野・横窪・濱田・葛・清家 合同研究室
      {/*
        外部サイトへ飛ぶことがわかる斜めの矢印（TextLink の外部リンクと同じ）。
        矢印は45°傾けていて見た目が枠から左右に約2pxずつはみ出すので、左右とも6pxとって
        「室」「の」との間を見た目で4pxにする
      */}
      <span className="mx-[6px] inline-flex align-middle">
        <LinkArrow external />
      </span>
      <span className="sr-only">（外部サイトを開きます）</span>
    </a>
  );
}
