import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { BackToTop } from "@/components/common/BackToTop";
import { SITE_NAME } from "@/lib/constants";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/tags", label: "标签" },
  { to: "/search", label: "搜索" },
  { to: "/about", label: "关于" }
];

interface RootLayoutProps {
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => (
  <div className="min-h-screen bg-[#111111] text-white">
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[linear-gradient(180deg,#ba5c31_0%,#b2522b_100%)] shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
      <div className="mx-auto flex w-full max-w-[1500px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-black/10 text-lg font-bold shadow-inner">
            EF
          </span>
          <span className="truncate text-lg font-bold tracking-tight sm:text-2xl">{SITE_NAME}</span>
        </NavLink>

        <nav className="ml-auto flex items-center gap-1 overflow-x-auto whitespace-nowrap text-sm no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 font-semibold transition ${
                  isActive ? "bg-black/20 text-white" : "text-white/80 hover:bg-black/10 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main className="mx-auto w-full max-w-[1500px] px-4 pb-20 sm:px-6 lg:px-8">{children}</main>

    <footer className="border-t border-white/6 bg-[#0c0c0c] py-8 text-center text-sm text-white/45">
      <p>Thoughtful writing, cinematic layout, and a quiet dark canvas.</p>
    </footer>

    <BackToTop />
  </div>
);
