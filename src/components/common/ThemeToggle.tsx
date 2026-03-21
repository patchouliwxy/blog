import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-primary-300 hover:text-primary-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-primary-500"
      aria-label="切换主题"
    >
      <span>{mode === "light" ? "深色" : "浅色"}</span>
      <span className="text-lg leading-none">{mode === "light" ? "◐" : "○"}</span>
    </button>
  );
};
