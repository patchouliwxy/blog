interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <div className="space-y-3">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e6b08b]">{eyebrow}</p>
    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
    <p className="max-w-2xl text-base leading-7 text-white/58">{description}</p>
  </div>
);
