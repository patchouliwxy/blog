import { useMemo, useState } from "react";
import { Seo } from "@/components/common/Seo";
import { HeroSection } from "@/components/blog/HeroSection";
import { SectionTitle } from "@/components/common/SectionTitle";
import { SearchInput } from "@/components/common/SearchInput";
import { TagChip } from "@/components/blog/TagChip";
import { PostList } from "@/components/blog/PostList";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { HomeCompanion } from "@/components/blog/HomeCompanion";
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
    <div className="space-y-0">
      <Seo title="首页" />
      <HeroSection />

      <section className="relative z-10 mx-auto -mt-24 max-w-[1240px] pb-10">
        <div className="grid gap-8 xl:grid-cols-[180px_minmax(0,1fr)]">
          <HomeCompanion />

          <div className="rounded-[2rem] border border-white/6 bg-[#1b1b1b] p-6 shadow-[0_36px_100px_rgba(0,0,0,0.28)] sm:p-8">
            <div className="space-y-8">
              <SectionTitle
                eyebrow="Latest stories"
                title="最近更新"
                description="列表区整体压在首屏背景之上，筛选和搜索则收进同一个深色面板里，整个节奏会更像一个连续的阅读舞台。"
              />

              <div className="grid gap-4 rounded-[1.5rem] border border-white/6 bg-[#242424] p-4 sm:p-5">
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
                <EmptyState title="暂无匹配结果" description="试试切换标签，或者换一个更短的关键词。" />
              )}
              {!loading && !error && visibleItems.length > 0 && <PostList posts={visibleItems} />}

              {!loading && !error && hasMore && (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="rounded-full border border-[#d18b5f]/40 bg-[#d18b5f]/10 px-6 py-3 text-sm font-semibold text-[#ffd7b9] transition hover:-translate-y-0.5 hover:bg-[#d18b5f]/16"
                  >
                    加载更多
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
