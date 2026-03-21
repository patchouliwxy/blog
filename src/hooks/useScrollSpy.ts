import { useEffect, useState } from "react";
import type { TocHeading } from "@/types/blog";

export const useScrollSpy = (headings: TocHeading[]) => {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) {
      return;
    }

    const observers = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean)
      .map((element) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id);
              }
            });
          },
          { rootMargin: "0px 0px -70% 0px", threshold: 0.2 }
        );

        observer.observe(element as Element);
        return observer;
      });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [headings]);

  return activeId;
};
