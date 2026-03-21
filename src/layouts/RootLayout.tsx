import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { BackToTop } from "@/components/common/BackToTop";
import { SITE_NAME } from "@/lib/constants";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/tags", label: "标签" },
  { to: "/search", label: "搜索" },
  { to: "/about", label: "关于我" }
];

interface RootLayoutProps {
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(247,247,243,0.95))] text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(30,41,59,0.65),_rgba(2,6,23,1))] dark:text-white">
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
          {SITE_NAME}
        </NavLink>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-300"
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

    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>

    <footer className="border-t border-slate-200/70 py-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <p>Built with React, TypeScript, Tailwind CSS and a calm writing workflow.</p>
    </footer>

    <BackToTop />
  </div>
);
