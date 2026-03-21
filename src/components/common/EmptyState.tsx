interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 px-8 py-14 text-center dark:border-slate-700 dark:bg-slate-900/70">
    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
    <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);
