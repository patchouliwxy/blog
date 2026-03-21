import { useMemo, useState } from "react";
import { Seo } from "@/components/common/Seo";
import { HeroSection } from "@/components/blog/HeroSection";
import { SectionTitle } from "@/components/common/SectionTitle";
import { SearchInput } from "@/components/common/SearchInput";
import { TagChip } from "@/components/blog/TagChip";
import { PostList } from "@/components/blog/PostList";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useBlogData } from "@/hooks/useBlogData";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";

export default function HomePage() {
  const { posts, tags, loading, error } = useBlogData();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("全部");

  const filteredPosts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = activeTag === "全部" || post.tags.includes(activeTag);
      const matchesSearch =
        !keyword ||
        `${post.title} ${post.excerpt} ${post.searchableText} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(keyword);

      return matchesTag && matchesSearch;
    });
  }, [activeTag, posts, search]);

  const { visibleItems, hasMore, loadMore } = useInfinitePosts(filteredPosts, POSTS_PER_PAGE);

  return (
    <div className="space-y-12">
      <Seo title="首页" />
      <HeroSection />

      <section className="space-y-8">
        <SectionTitle
          eyebrow="Latest writing"
          title="最近发布"
          description="支持按标签筛选、模糊搜索以及分页式的加载更多，适合作为博客首页的主列表区域。"
        />

        <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
          <SearchInput value={search} onChange={setSearch} />
          <div className="flex flex-wrap gap-3">
            {["全部", ...tags].map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              />
            ))}
          </div>
        </div>

        {loading && <LoadingScreen />}
        {error && <EmptyState title="数据加载失败" description={error} />}
        {!loading && !error && visibleItems.length === 0 && (
          <EmptyState title="暂无匹配结果" description="试试切换标签或更换关键词。" />
        )}
        {!loading && !error && visibleItems.length > 0 && <PostList posts={visibleItems} />}

        {!loading && !error && hasMore && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-primary-500"
            >
              加载更多
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
