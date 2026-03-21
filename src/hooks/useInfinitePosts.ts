import { useEffect, useState } from "react";

export const useInfinitePosts = <T,>(items: T[], pageSize: number) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const loadMore = () => {
    setVisibleCount((current) => Math.min(current + pageSize, items.length));
  };

  return { visibleItems, hasMore, loadMore };
};
