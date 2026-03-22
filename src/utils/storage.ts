import type { ThemeMode } from "@/store/slices/themeSlice";

const THEME_KEY = "blog-theme";

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const setStoredTheme = (theme: ThemeMode) => {
  window.localStorage.setItem(THEME_KEY, theme);
};
