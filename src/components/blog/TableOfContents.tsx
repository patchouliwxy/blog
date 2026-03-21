import clsx from "clsx";
import type { TocHeading } from "@/types/blog";

interface TableOfContentsProps {
  items: TocHeading[];
  activeId: string;
}

export const TableOfContents = ({ items, activeId }: TableOfContentsProps) => (
  <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
      文章目录
    </h3>
    <nav className="mt-5 space-y-3">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={clsx(
            "block text-sm transition",
            item.level === 3 && "pl-4",
            item.level === 2 && "pl-2",
            activeId === item.id
              ? "font-semibold text-primary-600 dark:text-primary-300"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  </aside>
);
