import { readFile } from "node:fs/promises";
import {
  createExcerpt,
  estimateReadingTime,
  createSearchableText,
  readPosts,
  resolvePublicPath,
  sortPosts,
  writePosts
} from "./content-utils.mjs";

const run = async () => {
  const posts = await readPosts();

  const syncedPosts = await Promise.all(
    posts.map(async (post) => {
      const markdownPath = resolvePublicPath(post.markdownPath);
      const markdown = await readFile(markdownPath, "utf8");
      const excerpt = createExcerpt(markdown, post.title);
      const readingTime = estimateReadingTime(markdown);
      const searchableText = createSearchableText({ ...post, excerpt }, markdown);

      return {
        ...post,
        excerpt,
        readingTime,
        searchableText
      };
    })
  );

  await writePosts(sortPosts(syncedPosts));
  console.log(`Synced excerpt, reading time, and search text for ${syncedPosts.length} posts.`);
};

void run();
