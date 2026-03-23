import type { BlogPostMeta } from "@/types/blog";
import { PostCard } from "@/components/blog/PostCard";

interface PostListProps {
  posts: BlogPostMeta[];
}

export const PostList = ({ posts }: PostListProps) => (
  <div className="grid gap-6">
    {posts.map((post) => (
      <PostCard key={post.slug} post={post} />
    ))}
  </div>
);
