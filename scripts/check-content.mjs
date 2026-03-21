import { readFile } from "node:fs/promises";
import {
  fileExists,
  readPosts,
  readSiteConfig,
  resolvePublicPath
} from "./content-utils.mjs";

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const run = async () => {
  const [posts, siteConfig] = await Promise.all([readPosts(), readSiteConfig()]);
  const slugSet = new Set();
  const idSet = new Set();

  if (!siteConfig.siteUrl.startsWith("https://")) {
    fail("site.config.json 中的 siteUrl 必须以 https:// 开头。");
  }

  for (const post of posts) {
    if (!post.id || !post.slug || !post.title || !post.markdownPath || !post.publishedAt) {
      fail(`Invalid post entry: ${JSON.stringify(post)}`);
    }

    if (idSet.has(post.id)) {
      fail(`Duplicate id found: ${post.id}`);
    }
    idSet.add(post.id);

    if (slugSet.has(post.slug)) {
      fail(`Duplicate slug found: ${post.slug}`);
    }
    slugSet.add(post.slug);

    const markdownPath = resolvePublicPath(post.markdownPath);
    const markdownExists = await fileExists(markdownPath);
    if (!markdownExists) {
      fail(`Missing markdown file: ${post.markdownPath}`);
    }

    if (typeof post.cover !== "string" || !post.cover.trim()) {
      fail(`Invalid cover for slug: ${post.slug}`);
    }

    if (post.cover.startsWith("/")) {
      const coverExists = await fileExists(resolvePublicPath(post.cover));
      if (!coverExists) {
        fail(`Missing local cover file: ${post.cover}`);
      }
    }

    const markdown = await readFile(markdownPath, "utf8");
    if (!markdown.trim()) {
      fail(`Empty markdown file: ${post.markdownPath}`);
    }
  }

  console.log(`Content check passed for ${posts.length} posts.`);
};

void run();
