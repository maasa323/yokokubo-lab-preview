/**
 * 写真や文言がまだ決まっていない場所の枠。
 * 素材が届いたら、この部品を本物に差し替える。
 */
export default function Placeholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-ink/30 bg-veil text-[14px] tracking-[0.06em] text-ink-muted ${className}`}
    >
      {label}
    </div>
  );
}
