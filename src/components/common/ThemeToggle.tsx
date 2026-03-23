import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white/20 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/28 dark:border-white/18 dark:bg-black/10 dark:text-white dark:hover:bg-black/20"
      aria-label="切换主题"
    >
      <span>{mode === "dark" ? "浅色" : "深色"}</span>
      <span className="text-base leading-none">{mode === "dark" ? "○" : "◐"}</span>
    </button>
  );
};
