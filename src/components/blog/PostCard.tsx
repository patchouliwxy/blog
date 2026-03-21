import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/types/blog";
import { formatDate } from "@/utils/format";

interface PostCardProps {
  post: BlogPostMeta;
}

export const PostCard = ({ post }: PostCardProps) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900"
  >
    <div className="h-52 overflow-hidden">
      <img
        src={post.cover}
        alt={post.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div className="space-y-5 p-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>{formatDate(post.publishedAt)}</span>
        <span>•</span>
        <span>{post.readingTime}</span>
      </div>
      <div className="space-y-3">
        <Link to={`/posts/${post.slug}`} className="block">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950 transition group-hover:text-primary-600 dark:text-white">
            {post.title}
          </h3>
        </Link>
        <p className="line-clamp-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          {post.excerpt}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Link
          to={`/posts/${post.slug}`}
          className="text-sm font-semibold text-primary-600 transition hover:text-primary-700 dark:text-primary-300"
        >
          阅读全文
        </Link>
        <span className="text-sm text-slate-500 dark:text-slate-400">❤ {post.likes}</span>
      </div>
    </div>
  </motion.article>
);
