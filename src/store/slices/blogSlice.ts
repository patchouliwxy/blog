import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoredLikes, setStoredLikes } from "@/utils/storage";

interface BlogState {
  likes: Record<string, number>;
}

const initialState: BlogState = {
  likes: getStoredLikes()
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    hydrateLikes(state, action: PayloadAction<Record<string, number>>) {
      state.likes = action.payload;
    },
    likePost(state, action: PayloadAction<{ slug: string; baseLikes: number }>) {
      const { slug, baseLikes } = action.payload;
      const currentLikes = state.likes[slug] ?? baseLikes;
      state.likes[slug] = currentLikes + 1;
      setStoredLikes(state.likes);
    }
  }
});

export const { hydrateLikes, likePost } = blogSlice.actions;
export default blogSlice.reducer;
