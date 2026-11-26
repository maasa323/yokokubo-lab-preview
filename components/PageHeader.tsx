import Backdrop from "./Backdrop";
import SectionHeading from "./SectionHeading";

/** 下層ページの頭。背景はTOPのグラデーションを上部だけに敷く */
export default function PageHeader({ title }: { title: string }) {
  return (
    <>
      <Backdrop variant="page" />
      <div data-reveal className="relative mx-auto w-full max-w-site px-6 pt-12 md:px-16 md:pt-20">
        <SectionHeading as="h1">{title}</SectionHeading>
      </div>
    </>
  );
}
