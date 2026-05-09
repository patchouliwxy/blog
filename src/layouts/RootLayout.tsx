import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { BackToTop } from "@/components/common/BackToTop";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SITE_NAME } from "@/lib/constants";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/tags", label: "标签" },
  { to: "/search", label: "搜索" },
  { to: "/about", label: "关于" },
];

interface RootLayoutProps {
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => (
  <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors dark:bg-black dark:text-neutral-50">
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-neutral-50/80 backdrop-blur-xl dark:border-neutral-800/40 dark:bg-black/70">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center gap-6 px-6">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-xs font-bold text-white">
            P
          </span>
          <span className="text-base">{SITE_NAME}</span>
        </NavLink>

        <nav className="ml-auto flex items-center gap-0.5 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-200/70 text-accent-700 dark:bg-neutral-800/80 dark:text-accent-400"
                    : "text-neutral-500 hover:bg-neutral-200/40 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>

    <main className="mx-auto w-full max-w-[1200px] px-6 pb-24">{children}</main>

    <BackToTop />
  </div>
);
