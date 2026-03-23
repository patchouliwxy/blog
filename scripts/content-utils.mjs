import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const rootDir = process.cwd();
export const postsJsonPath = path.join(rootDir, "public", "data", "posts.json");
export const postsDir = path.join(rootDir, "public", "posts");
export const postImagesDir = path.join(rootDir, "public", "images", "posts");
export const templatePath = path.join(rootDir, "scripts", "templates", "post-template.md");
export const siteConfigPath = path.join(rootDir, "site.config.json");

export const readJson = async (targetPath) => JSON.parse(await readFile(targetPath, "utf8"));

export const writeJson = async (targetPath, value) => {
  await writeFile(targetPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

export const readPosts = async () => readJson(postsJsonPath);
export const writePosts = async (posts) => writeJson(postsJsonPath, posts);
export const readSiteConfig = async () => readJson(siteConfigPath);

export const slugify = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const stripMarkdown = (markdown) =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\(([^)]+)\)/g, " ")
    .replace(/^>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/[*_~>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const createExcerpt = (markdown, fallbackTitle) => {
  const clean = stripMarkdown(markdown);
  if (!clean) {
    return `${fallbackTitle} 的内容摘要。`;
  }

  return clean.length > 88 ? `${clean.slice(0, 88).trim()}...` : clean;
};

export const createSearchableText = (post, markdown) => {
  const clean = stripMarkdown(markdown);
  return [post.title, post.excerpt, post.tags.join(" "), clean]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};

export const estimateReadingTime = (markdown) => {
  const clean = stripMarkdown(markdown);
  const chineseChars = (clean.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const englishWords = clean
    .replace(/[\u4e00-\u9fff]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(chineseChars / 300 + englishWords / 200));
  return `${minutes} min read`;
};

export const ensureDir = async (targetPath) => {
  await mkdir(targetPath, { recursive: true });
};

export const fileExists = async (targetPath) => {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
};

export const createPlaceholderCoverSvg = (title) => {
  const safeTitle = title.replace(/[<&>"]/g, "");
  return `<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" rx="48" fill="#0F172A"/>
  <circle cx="1360" cy="140" r="220" fill="#1F7CFF" fill-opacity="0.18"/>
  <circle cx="180" cy="760" r="260" fill="#FF7A59" fill-opacity="0.16"/>
  <rect x="110" y="140" width="920" height="540" rx="36" fill="white" fill-opacity="0.06"/>
  <text x="110" y="350" fill="white" font-size="88" font-family="Arial, sans-serif" font-weight="700">${safeTitle}</text>
  <text x="110" y="450" fill="#BFDBFE" font-size="34" font-family="Arial, sans-serif">Personal Blog Cover</text>
  <text x="110" y="520" fill="#CBD5E1" font-size="28" font-family="Arial, sans-serif">Replace this placeholder with your final cover image.</text>
</svg>`;
};

export const copyCoverFile = async (sourcePath, slug) => {
  const absoluteSource = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.join(rootDir, sourcePath);
  const extension = path.extname(absoluteSource) || ".png";
  const targetName = `${slug}${extension.toLowerCase()}`;
  const targetPath = path.join(postImagesDir, targetName);
  await ensureDir(postImagesDir);
  await copyFile(absoluteSource, targetPath);
  return `/images/posts/${targetName}`;
};

export const createPlaceholderCoverFile = async (title, slug) => {
  await ensureDir(postImagesDir);
  const targetName = `${slug}.svg`;
  const targetPath = path.join(postImagesDir, targetName);
  await writeFile(targetPath, createPlaceholderCoverSvg(title), "utf8");
  return `/images/posts/${targetName}`;
};

export const resolvePublicPath = (publicPath) =>
  path.join(rootDir, "public", publicPath.replace(/^\//, ""));

export const sortPosts = (posts) =>
  [...posts].sort(
    (left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  );
