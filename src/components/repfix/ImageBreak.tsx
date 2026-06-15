type Props = {
  image: string;
  eyebrow: string;
  title: string;
  caption?: string;
  align?: "left" | "right" | "center";
};

export function ImageBreak({ image, eyebrow, title, caption, align = "left" }: Props) {
  const alignCls = align === "right" ? "ml-auto text-right" : align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#BF953F]/30 shadow-[var(--shadow-elegant)]">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-[280px] md:h-[360px] w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(11,19,37,0.95)_0%,rgba(11,19,37,0.7)_45%,rgba(11,19,37,0.45)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(252,246,186,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(170,119,28,0.20),transparent_55%)]" />

          <div className="absolute inset-0 flex items-center px-8 md:px-14">
            <div className={`max-w-xl ${alignCls}`}>
              <div className="text-[11px] font-semibold tracking-[0.25em] text-[#FCF6BA] uppercase">{eyebrow}</div>
              <h3 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                <span className="text-gold-gradient">{title}</span>
              </h3>
              {caption && <p className="mt-3 text-sm md:text-base text-foreground/85 max-w-md">{caption}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
