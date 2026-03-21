import { createSlice } from "@reduxjs/toolkit";
import { getStoredTheme, setStoredTheme } from "@/utils/storage";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: getStoredTheme()
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      setStoredTheme(state.mode);
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
