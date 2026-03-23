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
      "rounded-full border px-4 py-2 text-sm font-medium transition",
      active
        ? "border-[#d18b5f] bg-[#d18b5f]/16 text-[#ffd7b9]"
        : "border-white/8 bg-white/[0.03] text-white/70 hover:border-white/18 hover:text-white"
    )}
  >
    #{label}
  </button>
);
