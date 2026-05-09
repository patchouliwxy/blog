interface ReadingProgressBarProps {
  progress: number;
}

export const ReadingProgressBar = ({ progress }: ReadingProgressBarProps) => (
  <div className="sticky top-0 z-40 h-0.5 w-full bg-neutral-200/60 backdrop-blur dark:bg-neutral-800/60">
    <div
      className="h-full bg-accent-600 transition-[width] duration-150 dark:bg-accent-400"
      style={{ width: `${progress}%` }}
    />
  </div>
);
