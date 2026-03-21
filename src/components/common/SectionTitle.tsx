interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <div className="space-y-3">
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
      {eyebrow}
    </p>
    <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white md:text-4xl">
      {title}
    </h2>
    <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);
