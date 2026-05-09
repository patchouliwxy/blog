import { useMemo } from "react";
import { Seo } from "@/components/common/Seo";
import { HeroSection } from "@/components/blog/HeroSection";
import { SectionTitle } from "@/components/common/SectionTitle";
import { PostList } from "@/components/blog/PostList";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useBlogData } from "@/hooks/useBlogData";

export default function HomePage() {
  const { posts, loading, error } = useBlogData();
  const recentPosts = useMemo(() => posts.slice(0, 4), [posts]);

  return (
    <div>
      <Seo title="首页" />
      <HeroSection />

      <section className="pb-14 pt-16">
        <div className="mx-auto max-w-[900px]">
          <SectionTitle eyebrow="latest" title="最近更新" description="" />

          <div className="mt-10">
            {loading && <LoadingScreen />}
            {error && <EmptyState title="数据加载失败" description={error} />}
            {!loading && !error && recentPosts.length === 0 && (
              <EmptyState title="暂无文章" description="稍后再来看看，新的内容还在路上。" />
            )}
            {!loading && !error && recentPosts.length > 0 && <PostList posts={recentPosts} />}
          </div>
        </div>
      </section>
    </div>
  );
}
