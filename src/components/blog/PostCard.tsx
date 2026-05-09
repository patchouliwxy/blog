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
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    className="group grid gap-6 rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-raised dark:bg-neutral-800/60 md:grid-cols-[280px_minmax(0,1fr)] md:items-center"
  >
    <div className="overflow-hidden rounded-xl">
      <img
        src={post.cover}
        alt={post.title}
        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 md:h-40"
        loading="lazy"
      />
    </div>

    <div className="flex flex-col gap-3">
      <Link to={`/posts/${post.slug}`}>
        <h3 className="text-xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
          {post.title}
        </h3>
      </Link>

      <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {post.excerpt}
      </p>

      <div className="flex items-center gap-3 text-xs font-medium text-neutral-400 dark:text-neutral-500">
        <span>{formatDate(post.publishedAt)}</span>
        <span className="text-neutral-300 dark:text-neutral-700">·</span>
        <span>{post.readingTime}</span>
      </div>
    </div>
  </motion.article>
);
