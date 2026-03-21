import type { ThemeMode } from "@/store/slices/themeSlice";

const THEME_KEY = "blog-theme";
const LIKES_KEY = "blog-likes";

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

export const getStoredLikes = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const likes = window.localStorage.getItem(LIKES_KEY);
  return likes ? (JSON.parse(likes) as Record<string, number>) : {};
};

export const setStoredLikes = (likes: Record<string, number>) => {
  window.localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
};
