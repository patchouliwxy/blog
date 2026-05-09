import { Link } from "react-router-dom";
import { Seo } from "@/components/common/Seo";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Seo title="页面不存在" />
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
        404
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        页面不存在
      </h1>
      <p className="mt-3 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
        你访问的页面可能已经移动或删除，返回首页继续浏览文章。
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        返回首页
      </Link>
    </div>
  );
}
