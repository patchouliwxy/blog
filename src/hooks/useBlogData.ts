import { useEffect, useMemo, useState } from "react";
import type { BlogPostMeta } from "@/types/blog";
import { withBase } from "@/lib/site";

export const useBlogData = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(withBase("/data/posts.json"));

        if (!response.ok) {
          throw new Error("无法加载文章数据");
        }

        const data = (await response.json()) as BlogPostMeta[];
        setPosts(
          data.sort(
            (left, right) =>
              new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
          )
        );
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "请求失败");
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b)),
    [posts]
  );

  return { posts, tags, loading, error };
};
