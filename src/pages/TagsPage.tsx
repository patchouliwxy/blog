import { Seo } from "@/components/common/Seo";
import { SectionTitle } from "@/components/common/SectionTitle";
import { EmptyState } from "@/components/common/EmptyState";
import { useBlogData } from "@/hooks/useBlogData";
import { Link } from "react-router-dom";
import { LoadingScreen } from "@/components/common/LoadingScreen";

export default function TagsPage() {
  const { posts, tags, loading, error } = useBlogData();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <EmptyState title="标签数据不可用" description={error} />;
  }

  return (
    <div className="space-y-10">
      <Seo title="标签分类" />
      <SectionTitle
        eyebrow="Browse by tags"
        title="按标签浏览"
        description=""
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tags.map((tag) => {
          const taggedPosts = posts.filter((post) => post.tags.includes(tag));
          return (
            <section
              key={tag}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">#{tag}</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {taggedPosts.length} 篇文章
              </p>
              <div className="mt-6 space-y-4">
                {taggedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/posts/${post.slug}`}
                    className="block rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-white">{post.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
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
