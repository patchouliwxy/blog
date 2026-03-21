import { useMemo, useState } from "react";
import { Seo } from "@/components/common/Seo";
import { SectionTitle } from "@/components/common/SectionTitle";
import { SearchInput } from "@/components/common/SearchInput";
import { PostList } from "@/components/blog/PostList";
import { EmptyState } from "@/components/common/EmptyState";
import { useBlogData } from "@/hooks/useBlogData";
import { LoadingScreen } from "@/components/common/LoadingScreen";

export default function SearchPage() {
  const { posts, loading, error } = useBlogData();
  const [keyword, setKeyword] = useState("");

  const filteredPosts = useMemo(() => {
    const query = keyword.trim().toLowerCase();

    if (!query) {
      return posts;
    }

    return posts.filter((post) =>
      `${post.title} ${post.excerpt} ${post.searchableText}`.toLowerCase().includes(query)
    );
  }, [keyword, posts]);

  return (
    <div className="space-y-10">
      <Seo title="搜索" />
      <SectionTitle
        eyebrow="Search"
        title="搜索整站文章"
        description="前端侧完成标题与内容模糊匹配，无需后端服务即可完成基础检索体验。"
      />
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
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
