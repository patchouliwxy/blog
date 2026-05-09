import clsx from "clsx";
import type { TocHeading } from "@/types/blog";

interface TableOfContentsProps {
  items: TocHeading[];
  activeId: string;
}

export const TableOfContents = ({ items, activeId }: TableOfContentsProps) => (
  <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-card dark:border-neutral-800 dark:bg-neutral-800/60">
    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500">
      目录
    </h3>
    <nav className="mt-4 space-y-2">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={clsx(
            "block text-sm transition-colors",
            item.level === 3 && "pl-4",
            item.level === 2 && "pl-2",
            activeId === item.id
              ? "font-semibold text-accent-600 dark:text-accent-400"
              : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  </aside>
);
