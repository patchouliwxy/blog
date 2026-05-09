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
      if (!post) return;

      try {
        setContentLoading(true);
        const response = await fetch(withBase(post.markdownPath));
        if (!response.ok) throw new Error("文章内容加载失败");
        setContent(await response.text());
      } catch (fetchError) {
        setContentError(fetchError instanceof Error ? fetchError.message : "未知错误");
      } finally {
        setContentLoading(false);
      }
    };

    void fetchContent();
  }, [post]);

  if (loading) return <LoadingScreen />;
  if (error) return <EmptyState title="文章索引读取失败" description={error} />;
  if (!post) return <EmptyState title="文章不存在" description="这个链接可能已经失效，返回首页看看其他内容。" />;

  return (
    <div className="space-y-8">
      <Seo title={post.title} description={post.excerpt} />
      <ReadingProgressBar progress={progress} />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden rounded-2xl bg-white shadow-card dark:bg-neutral-800/60"
      >
        <img src={post.cover} alt={post.title} className="h-64 w-full object-cover md:h-80" />
        <div className="space-y-5 px-8 py-10 md:px-12">
          <Link
            to="/"
            className="inline-block text-sm font-medium text-accent-600 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
          >
            ← 返回首页
          </Link>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <span>{post.readingTime}</span>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <span>{post.tags.join(" / ")}</span>
            </div>
            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              {post.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
              {post.excerpt}
            </p>
          </div>
        </div>
      </motion.section>

      {contentLoading && <LoadingScreen />}
      {contentError && <EmptyState title="文章读取失败" description={contentError} />}

      {!contentLoading && !contentError && (
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article className="rounded-2xl bg-white p-8 shadow-card dark:bg-neutral-800/60 md:p-10">
            <MarkdownRenderer content={content} />
          </article>
          <div className="lg:sticky lg:top-20 lg:self-start">
            <TableOfContents items={toc} activeId={activeHeading} />
          </div>
        </section>
      )}
    </div>
  );
}
