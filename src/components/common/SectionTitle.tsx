interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <div className="space-y-3">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e6b08b]">{eyebrow}</p>
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">{title}</h2>
    <p className="max-w-2xl text-base leading-7 text-slate-700/80 dark:text-white/54">{description}</p>
  </div>
);
