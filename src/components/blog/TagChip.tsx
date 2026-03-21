import clsx from "clsx";

interface TagChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const TagChip = ({ label, active = false, onClick }: TagChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "rounded-full px-4 py-2 text-sm font-medium transition",
      active
        ? "bg-primary-600 text-white"
        : "bg-slate-100 text-slate-700 hover:bg-primary-100 hover:text-primary-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    )}
  >
    #{label}
  </button>
);
