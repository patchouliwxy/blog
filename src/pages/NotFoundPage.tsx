import { Link } from "react-router-dom";
import { Seo } from "@/components/common/Seo";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Seo title="页面不存在" />
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">页面不存在</h1>
      <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
        你访问的页面可能已经移动或删除，返回首页继续浏览文章。
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white dark:bg-primary-500"
      >
        返回首页
      </Link>
    </div>
  );
}
