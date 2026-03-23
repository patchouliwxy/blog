import { motion } from "framer-motion";
import { withBase } from "@/lib/site";

export const HeroSection = () => (
  <section className="relative -mx-4 min-h-[640px] overflow-hidden sm:-mx-6 lg:-mx-8">
    <img
      src={withBase("/images/background.jpg")}
      alt="Hero background"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,240,0.18)_0%,rgba(255,245,236,0.18)_28%,rgba(243,236,230,0.86)_78%,rgba(243,236,230,1)_100%)] dark:bg-[linear-gradient(180deg,rgba(7,9,14,0.08)_0%,rgba(8,10,15,0.24)_35%,rgba(8,8,8,0.88)_78%,rgba(17,17,17,1)_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_12%,rgba(255,207,163,0.22),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(101,143,255,0.08),transparent_20%)] dark:bg-[radial-gradient(circle_at_24%_12%,rgba(255,207,163,0.16),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(101,143,255,0.12),transparent_20%)]" />

    <div className="relative mx-auto flex min-h-[640px] w-full max-w-[1500px] items-end px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#f0c4a4]">
          Recent writing
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          用整张背景图把首页的情绪先拉满
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-800/80 sm:text-lg dark:text-white/70">
          首页不再承担太多工具入口，只保留一个足够完整的视觉开场，以及下方最重要的最近更新内容。
        </p>
      </motion.div>
    </div>
  </section>
);
