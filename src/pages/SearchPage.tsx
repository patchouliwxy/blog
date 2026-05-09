import { useMemo, useState } from "react";
import { Seo } from "@/components/common/Seo";
import { SectionTitle } from "@/components/common/SectionTitle";
import { SearchInput } from "@/components/common/SearchInput";
import { PostList } from "@/components/blog/PostList";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useBlogData } from "@/hooks/useBlogData";

export default function SearchPage() {
  const { posts, loading, error } = useBlogData();
  const [keyword, setKeyword] = useState("");

  const filteredPosts = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((post) =>
      `${post.title} ${post.excerpt} ${post.searchableText}`.toLowerCase().includes(query)
    );
  }, [keyword, posts]);

  return (
    <div className="space-y-10 pt-8">
      <Seo title="搜索" />
      <SectionTitle eyebrow="Search" title="搜索文章" description="" />

      <div className="rounded-2xl bg-white p-6 shadow-card dark:bg-neutral-800/60">
        <SearchInput value={keyword} onChange={setKeyword} placeholder="搜索标题、摘要和正文关键词" />
      </div>

      {loading && <LoadingScreen />}
      {error && <EmptyState title="搜索索引不可用" description={error} />}
      {!loading && !error && filteredPosts.length === 0 && (
        <EmptyState title="没有找到结果" description="试试更短的关键词，或者换一个技术主题。" />
      )}
      {!loading && !error && filteredPosts.length > 0 && <PostList posts={filteredPosts} />}
    </div>
  );
}
