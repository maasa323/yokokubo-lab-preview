import { asset } from "./site";
/** 研究ページとトップで使う、研究領域と研究の文言（Google Docs「研究」タブより） */

export type Project = {
  title: string;
  description: string;
  tags: string[];
  meta: string;
  /** 写真（public/images/research）。図のように切り抜きたくないものは fit: "contain" */
  image?: {
    src: string;
    width: number;
    height: number;
    fit?: "cover" | "contain";
  };
};

export type Area = {
  id: string;
  number: string;
  en: string;
  ja: string;
  description: string;
  tags: string[];
  /** 領域のアイコン（120×120。Figma: TOP 320:1534） */
  icon: string;
  projects: Project[];
};

export const areas: Area[] = [
  {
    id: "cultural-computing",
    number: "01",
    en: "Cultural Computing",
    ja: "文化コンピューティング",
    description:
      "華道・香道・茶道など、日本の伝統芸道をより身近に、日々の暮らしの中で楽しめる道具や体験をつくっています。\nHCIやエンタテインメントコンピューティング（EC）の視点から、人の感性や創造性を育むテクノロジーを探ります。",
    tags: ["伝統芸道", "HCI・HAI", "EC", "AI+IoT", "行動変容", "人とAIの共創"],
    icon: asset("/images/top/icon-cultural-computing.svg"),
    projects: [
      {
        title: "Ikebana GAI：生成AIによるいけばなの創作支援",
        image: {
          src: asset("/images/research/ikebana-gai.png"),
          width: 764,
          height: 482,
          fit: "contain",
        },
        description:
          "生成AIでいけばなの作品案をつくり、創作を支える研究です。生成した作品をVRChat上のいけばなコミュニティで展示し、指導者と初心者それぞれの創造性にどう働くかを調べました。",
        tags: ["HAI", "人とAIの共創"],
        meta: "AIoT行動変容学会 第9回研究会 優秀発表賞（2025）／IEEE GCCE 2025",
      },
      {
        title: "4Dデジタルアーカイブ",
        image: {
          src: asset("/images/research/4d-archive.jpg"),
          width: 1440,
          height: 960,
        },
        description:
          "いけばなを、時間の流れも含めて3次元で記録するデジタルアーカイブです。視線計測と組み合わせ、作品だけでなく「いける過程」を残し、読み解ける形をめざしています。",
        tags: ["HCI"],
        meta: "IASDR 2025",
      },
      {
        title: "TracKenzan",
        image: {
          src: asset("/images/research/trackenzan.gif"),
          width: 740,
          height: 534,
        },
        description:
          "花に見立てたペンと、剣山に見立てたトラックパッドで、3DCG空間でいけばなを練習できるシステムです。実際の花材を使わずに、何度でも練習できます。",
        tags: ["HCI"],
        meta: "HCII 2020／総務省 異能vation ノミネート",
      },
      {
        title: "CADo",
        image: { src: asset("/images/research/cado.jpg"), width: 712, height: 534 },
        description:
          "タブレットで花材を撮ると、いけばなの型に沿ったレイアウトを自動でシミュレーションするシステムです。使った初心者は、花を一本ずつ見て、茎の長さを考えるようになりました。",
        tags: ["HCI"],
        meta: "AVI 2012／経済産業省 未踏ユース（2010年度）",
      },
      {
        title: "eGenjiko",
        image: {
          src: asset("/images/research/egenjiko.jpg"),
          width: 341,
          height: 265,
        },
        description:
          "コンピュータで制御する香炉とタブレットを使い、香道の遊び「源氏香」をゲームとして体験できるシステムです。",
        tags: ["HCI", "EC"],
        meta: "CHI PLAY 2019",
      },
      {
        title: "幻庵",
        image: { src: asset("/images/research/genan.jpg"), width: 600, height: 400 },
        description:
          "茶室の環境データの周期性を、光のゆらぎで見せるアンビエントメディアです。お茶室の新しいかたちを提案しました。",
        tags: ["HCI"],
        meta: "日本デザイン学会 研究発表大会（2010）",
      },
    ],
  },
  {
    id: "urban-well-being",
    number: "02",
    en: "Urban Well-being Technology",
    ja: "都市と幸福",
    description:
      "都市で暮らす人々のウェルビーイングを支えるテクノロジーを研究しています。都市データの活用や人とAIの共創を通じて、一人ひとりの多様なニーズに寄り添い、暮らしを豊かにする技術のあり方と使い方を探ります。",
    tags: [
      "データ連携基盤",
      "都市データの活用",
      "アーバンウェルビーイング",
      "HCI・HAI",
      "人とAIの共創",
    ],
    icon: asset("/images/top/icon-urban-wellbeing.svg"),
    projects: [
      {
        title: "ScaleCity",
        image: {
          src: asset("/images/research/scalecity.jpg"),
          width: 1440,
          height: 960,
        },
        description:
          "3Dプリンタでつくった透明な都市模型に、都市データを重ねて見せるツールセットです。手で触れられる模型で、都市のデータを読み解けるようにします。",
        tags: ["HCI", "都市データの活用"],
        meta: "ISC2 2024 Best Paper Award",
      },
      {
        title: "Happiness Finder",
        image: {
          src: asset("/images/research/happiness-finder.jpg"),
          width: 1440,
          height: 810,
        },
        description:
          "肉眼では見つけにくい四つ葉のクローバーをAIが見つけ、探す体験を支えるWebアプリです。AIと一緒に探すと、探す時間は延びた一方で、没入感は高まりました。",
        tags: ["HAI", "人とAIの共創"],
        meta: "AHs 2025 Honorable Mention Poster",
      },
    ],
  },
];

export const partners = [
  "ソフトバンク 様",
  "富士通 様",
  "沖電気工業 様",
  "大和ハウス工業 様",
  "日立東大ラボ 様",
  "The Big Data for Smart Society Institute (GATE), Bulgaria",
] as const;
