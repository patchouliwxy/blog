import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/store/slices/themeSlice";
import blogReducer from "@/store/slices/blogSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    blog: blogReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
