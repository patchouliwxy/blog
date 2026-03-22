import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Seo } from "@/components/common/Seo";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { EmptyState } from "@/components/common/EmptyState";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { useBlogData } from "@/hooks/useBlogData";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { extractToc } from "@/utils/markdown";
import { formatDate } from "@/utils/format";
import { withBase } from "@/lib/site";

export default function PostDetailPage() {
  const { slug } = useParams();
  const { posts, loading, error } = useBlogData();
  const [content, setContent] = useState("");
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);

  const post = posts.find((item) => item.slug === slug);
  const toc = useMemo(() => extractToc(content), [content]);
  const progress = useReadingProgress();
  const activeHeading = useScrollSpy(toc);

  useEffect(() => {
    const fetchContent = async () => {
      if (!post) {
        return;
      }

      try {
        setContentLoading(true);
        const response = await fetch(withBase(post.markdownPath));

        if (!response.ok) {
          throw new Error("文章内容加载失败");
        }

        setContent(await response.text());
      } catch (fetchError) {
        setContentError(fetchError instanceof Error ? fetchError.message : "未知错误");
      } finally {
        setContentLoading(false);
      }
    };

    void fetchContent();
  }, [post]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <EmptyState title="文章索引读取失败" description={error} />;
  }

  if (!post) {
    return <EmptyState title="文章不存在" description="这个链接可能已经失效，返回首页看看其他内容。" />;
  }

  return (
    <div className="space-y-8">
      <Seo title={post.title} description={post.excerpt} />
      <ReadingProgressBar progress={progress} />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >
        <img src={post.cover} alt={post.title} className="h-72 w-full object-cover md:h-96" />
        <div className="space-y-6 p-8 md:p-12">
          <Link to="/" className="text-sm font-semibold text-primary-600 dark:text-primary-300">
            ← 返回首页
          </Link>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>{formatDate(post.publishedAt)}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>{post.tags.join(" / ")}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
          </div>
        </div>
      </motion.section>

      {contentLoading && <LoadingScreen />}
      {contentError && <EmptyState title="文章读取失败" description={contentError} />}

      {!contentLoading && !contentError && (
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <MarkdownRenderer content={content} />
          </article>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <TableOfContents items={toc} activeId={activeHeading} />
          </div>
        </section>
      )}
    </div>
  );
}
