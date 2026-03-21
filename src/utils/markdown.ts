import { slugify } from "@/utils/format";
import type { TocHeading } from "@/types/blog";

export const extractToc = (markdown: string): TocHeading[] => {
  return markdown
    .split("\n")
    .filter((line) => /^#{1,3}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length ?? 1;
      const text = line.replace(/^#{1,3}\s/, "").trim();

      return {
        id: slugify(text),
        text,
        level
      };
    });
};
