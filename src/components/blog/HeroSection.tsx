import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HeroSection = () => (
  <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-16 text-white shadow-soft md:px-12">
    <div className="absolute inset-0 bg-hero-grid opacity-100" />
    <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary-200">
          Modern personal publishing
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          为开发者、创作者与长期主义者设计的个人博客系统
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          这里展示 React、TypeScript、Tailwind CSS 与 Markdown 内容流如何组合成一个可部署、可扩展、可持续写作的博客前端。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/search"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            搜索文章
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
          >
            关于我
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 rounded-[2rem] bg-white/10 p-6 backdrop-blur"
      >
        <div>
          <p className="text-sm text-primary-100">内容能力</p>
          <p className="mt-2 text-3xl font-bold">Markdown + TOC + Prism</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-slate-300">主题</p>
            <p className="mt-2 text-xl font-semibold">深色模式</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-slate-300">性能</p>
            <p className="mt-2 text-xl font-semibold">路由懒加载</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
