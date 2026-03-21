import { Suspense, lazy, type ReactElement } from "react";
import { createHashRouter } from "react-router-dom";
import App from "@/App";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { ScrollToTop } from "@/components/common/ScrollToTop";

const HomePage = lazy(() => import("@/pages/HomePage"));
const PostDetailPage = lazy(() => import("@/pages/PostDetailPage"));
const TagsPage = lazy(() => import("@/pages/TagsPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const withSuspense = (element: ReactElement) => (
  <Suspense fallback={<LoadingScreen />}>
    <ScrollToTop />
    {element}
  </Suspense>
);

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "posts/:slug", element: withSuspense(<PostDetailPage />) },
      { path: "tags", element: withSuspense(<TagsPage />) },
      { path: "search", element: withSuspense(<SearchPage />) },
      { path: "about", element: withSuspense(<AboutPage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) }
    ]
  }
]);
