import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { likePost } from "@/store/slices/blogSlice";

interface LikeButtonProps {
  slug: string;
  baseLikes: number;
}

export const LikeButton = ({ slug, baseLikes }: LikeButtonProps) => {
  const dispatch = useAppDispatch();
  const likes = useAppSelector((state) => state.blog.likes[slug] ?? baseLikes);

  return (
    <button
      type="button"
      onClick={() => dispatch(likePost({ slug, baseLikes }))}
      className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
    >
      <span>点赞文章</span>
      <span>❤ {likes}</span>
    </button>
  );
};
