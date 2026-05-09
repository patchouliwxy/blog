interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <div className="space-y-2">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400">
      {eyebrow}
    </p>
    <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
      {title}
    </h2>
    {description && (
      <p className="max-w-2xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    )}
  </div>
);
