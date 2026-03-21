import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { RootLayout } from "@/layouts/RootLayout";
import { ScrollToTop } from "@/components/common/ScrollToTop";

export default function App() {
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <RootLayout>
      <ScrollToTop />
      <Outlet />
    </RootLayout>
  );
}
