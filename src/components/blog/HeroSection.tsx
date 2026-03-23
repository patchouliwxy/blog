import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HeroSection = () => (
  <section className="relative -mx-4 overflow-hidden border-b border-white/8 sm:-mx-6 lg:-mx-8">
    <img
      src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1800&q=80"
      alt="Hero background"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,15,0.15)_0%,rgba(4,7,15,0.7)_62%,rgba(17,17,17,1)_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,205,154,0.22),transparent_18%),radial-gradient(circle_at_78%_24%,rgba(121,161,255,0.16),transparent_22%)]" />

    <div className="relative mx-auto flex min-h-[480px] max-w-[1500px] items-end px-4 pb-28 pt-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-3xl"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#f0c4a4]">
          Cinematic homepage layout
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          把首页做成更有舞台感的深色博客入口
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
          顶栏保持紧凑，首屏用一整块大幅背景撑开气氛，真正的内容列表则以深色浮层的方式压在画面前景里。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/search"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#171717] transition hover:-translate-y-0.5"
          >
            搜索文章
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-white/18 bg-black/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/20"
          >
            关于作者
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);
