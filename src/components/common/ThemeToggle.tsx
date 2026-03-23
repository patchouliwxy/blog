import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/10 px-3 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-black/20 hover:text-white"
      aria-label="切换主题"
    >
      <span>{mode === "light" ? "深色" : "浅色"}</span>
      <span className="text-base leading-none">{mode === "light" ? "◐" : "○"}</span>
    </button>
  );
};
