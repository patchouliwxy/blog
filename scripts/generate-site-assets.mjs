import { writeFile } from "node:fs/promises";
import path from "node:path";
import { readPosts, readSiteConfig } from "./content-utils.mjs";

const distDir = path.join(process.cwd(), "dist");

const normalizeUrl = (value) => value.replace(/\/+$/, "");
const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const run = async () => {
  const [posts, siteConfig] = await Promise.all([readPosts(), readSiteConfig()]);
  const baseUrl = normalizeUrl(process.env.SITE_URL || siteConfig.siteUrl);
  const pages = ["", "/#/tags", "/#/search", "/#/about"];

  const sitemapEntries = [
    ...pages.map((page) => `${baseUrl}${page}`),
    ...posts.map((post) => `${baseUrl}/#/posts/${post.slug}`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
  .join("\n")}
</urlset>
`;

  const rssItems = posts
    .map(
      (post) => `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(`${baseUrl}/#/posts/${post.slug}`)}</link>
    <guid>${escapeXml(`${baseUrl}/#/posts/${post.slug}`)}</guid>
    <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    <description>${escapeXml(post.excerpt)}</description>
  </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteConfig.siteName)}</title>
  <link>${escapeXml(baseUrl)}</link>
  <description>${escapeXml(siteConfig.siteDescription)}</description>
  <language>${escapeXml(siteConfig.language || "zh-CN")}</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
</channel>
</rss>
`;

  await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
  await writeFile(path.join(distDir, "rss.xml"), rss, "utf8");

  console.log("Generated dist/sitemap.xml and dist/rss.xml");
};

void run();
