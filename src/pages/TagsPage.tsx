import { Seo } from "@/components/common/Seo";
import { SectionTitle } from "@/components/common/SectionTitle";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useBlogData } from "@/hooks/useBlogData";
import { Link } from "react-router-dom";

export default function TagsPage() {
  const { posts, tags, loading, error } = useBlogData();

  if (loading) return <LoadingScreen />;
  if (error) return <EmptyState title="标签数据不可用" description={error} />;

  return (
    <div className="space-y-10 pt-8">
      <Seo title="标签分类" />
      <SectionTitle eyebrow="Browse" title="按标签浏览" description="" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => {
          const taggedPosts = posts.filter((post) => post.tags.includes(tag));
          return (
            <section
              key={tag}
              className="rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-raised dark:bg-neutral-800/60"
            >
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">#{tag}</h2>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {taggedPosts.length} 篇文章
              </p>
              <div className="mt-5 space-y-2">
                {taggedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/posts/${post.slug}`}
                    className="block rounded-lg p-2 -mx-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700/50"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
