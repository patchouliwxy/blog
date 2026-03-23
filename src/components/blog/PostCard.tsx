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
    className="group rounded-[1.8rem] bg-white/55 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] backdrop-blur-[3px] dark:bg-white/[0.045] dark:shadow-[0_24px_70px_rgba(0,0,0,0.16)]"
  >
    <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)] md:items-center">
      <div className="overflow-hidden rounded-[1.2rem]">
        <img
          src={post.cover}
          alt={post.title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 md:h-44"
        />
      </div>

      <div className="space-y-4">
        <Link to={`/posts/${post.slug}`} className="block">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 transition group-hover:text-[#b7633b] md:text-[2rem] dark:text-white dark:group-hover:text-[#f0c4a4]">
            {post.title}
          </h3>
        </Link>

        <p className="max-w-3xl text-base leading-8 text-slate-700/88 dark:text-white/62">{post.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-white/45">
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </div>
  </motion.article>
);
