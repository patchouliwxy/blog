import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  copyCoverFile,
  createPlaceholderCoverFile,
  postsDir,
  readPosts,
  slugify,
  sortPosts,
  templatePath,
  writePosts
} from "./content-utils.mjs";

const args = process.argv.slice(2);

const getArgValue = (name) => {
  const flagIndex = args.findIndex((item) => item === `--${name}`);
  if (flagIndex === -1) {
    return "";
  }

  return args[flagIndex + 1] ?? "";
};

const title = getArgValue("title").trim();
if (!title) {
  console.error('Missing required argument: --title "Your post title"');
  process.exit(1);
}

const slugArg = getArgValue("slug").trim();
const excerpt = getArgValue("excerpt").trim();
const tags = getArgValue("tags")
  .split(",")
  .map((tag) => tag.trim())
  .filter(Boolean);
const coverUrl = getArgValue("cover").trim();
const coverFile = getArgValue("coverFile").trim();
const readingTime = getArgValue("readingTime").trim() || "5 min read";
const date = getArgValue("date").trim() || new Date().toISOString();

const fallbackSlug = `post-${new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "")}`;
const slug = slugArg || slugify(title) || fallbackSlug;

const loadTemplate = async () => {
  return readFile(templatePath, "utf8");
};

const run = async () => {
  const [posts, template] = await Promise.all([readPosts(), loadTemplate()]);

  if (posts.some((post) => post.slug === slug)) {
    console.error(`Slug already exists: ${slug}`);
    process.exit(1);
  }

  const markdownPath = `/posts/${slug}.md`;
  const markdownFilePath = path.join(postsDir, `${slug}.md`);
  const nextId = posts.reduce((max, post) => Math.max(max, Number(post.id) || 0), 0) + 1;
  const cover = coverFile
    ? await copyCoverFile(coverFile, slug)
    : coverUrl || (await createPlaceholderCoverFile(title, slug));

  const newPost = {
    id: nextId,
    slug,
    title,
    excerpt: excerpt || `${title} 的内容摘要，记得在正文完善后执行同步脚本自动刷新摘要。`,
    cover,
    tags,
    publishedAt: date,
    readingTime,
    likes: 0,
    markdownPath,
    searchableText: [title, excerpt, tags.join(" ")].filter(Boolean).join(" ")
  };

  const markdown = template
    .replaceAll("{{title}}", title)
    .replaceAll("{{excerpt}}", excerpt);

  const updatedPosts = sortPosts([newPost, ...posts]);

  await writePosts(updatedPosts);
  await writeFile(markdownFilePath, markdown, "utf8");

  console.log(`Created post: ${title}`);
  console.log(`Slug: ${slug}`);
  console.log(`Markdown: public/posts/${slug}.md`);
  console.log(`Cover: public${cover}`);
  console.log("Next: edit the markdown content, then run npm run sync:content.");
};

void run();
