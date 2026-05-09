interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-2xl border border-dashed border-neutral-200 bg-white px-8 py-14 text-center dark:border-neutral-800 dark:bg-neutral-800/40">
    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
  </div>
);
