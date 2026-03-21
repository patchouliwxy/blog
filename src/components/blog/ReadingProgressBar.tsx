interface ReadingProgressBarProps {
  progress: number;
}

export const ReadingProgressBar = ({ progress }: ReadingProgressBarProps) => (
  <div className="sticky top-0 z-40 h-1 w-full bg-slate-200/70 backdrop-blur dark:bg-slate-800/70">
    <div
      className="h-full bg-gradient-to-r from-primary-500 to-accent transition-[width] duration-150"
      style={{ width: `${progress}%` }}
    />
  </div>
);
