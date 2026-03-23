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
    className="group overflow-hidden rounded-[1.6rem] border border-white/6 bg-[#1d1d1d] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
  >
    <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
      <div className="overflow-hidden rounded-[1.1rem]">
        <img
          src={post.cover}
          alt={post.title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 md:h-40"
        />
      </div>

      <div className="space-y-4">
        <Link to={`/posts/${post.slug}`} className="block">
          <h3 className="text-2xl font-bold tracking-tight text-white transition group-hover:text-[#f0c4a4] md:text-[2rem]">
            {post.title}
          </h3>
        </Link>
        <p className="max-w-3xl text-base leading-8 text-white/60">{post.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/45">
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/62"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.article>
);
