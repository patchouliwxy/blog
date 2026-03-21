# 个人博客系统前端

基于 `React + Vite + TypeScript + Tailwind CSS` 构建的个人博客前端，适合部署到 GitHub Pages。项目已内置：

- GitHub Actions 自动构建与部署
- Markdown 文章内容流
- 本地封面图管理
- 自动摘要与搜索关键词同步
- RSS 与 Sitemap 生成

## 技术栈

- React 18
- Vite 6
- TypeScript
- React Router
- Redux Toolkit
- Tailwind CSS
- react-markdown + Prism.js
- Framer Motion

## 一、快速开始

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

本地构建：

```bash
npm run build
```

本地预览构建产物：

```bash
npm run preview
```

## 二、项目内容结构

核心内容文件如下：

- `public/data/posts.json`
  文章元数据，首页列表、搜索、标签页会读取这里
- `public/posts/*.md`
  每篇文章的 Markdown 正文
- `public/images/posts/*`
  每篇文章的本地封面图
- `scripts/templates/post-template.md`
  新文章正文模板
- `scripts/create-post.mjs`
  新建文章脚本
- `scripts/sync-content.mjs`
  从 Markdown 自动同步摘要和搜索关键词
- `scripts/check-content.mjs`
  内容完整性校验
- `scripts/generate-site-assets.mjs`
  构建后生成 RSS 和 Sitemap
- `.github/workflows/deploy.yml`
  GitHub Actions 自动部署工作流
- `site.config.json`
  站点配置

## 三、站点配置

站点基础信息集中在 `site.config.json`：

```json
{
  "siteName": "Aster Blog",
  "siteDescription": "一个为个人表达、技术写作与灵感记录设计的现代博客前端。",
  "siteUrl": "https://your-name.github.io/personal-blog-system-frontend",
  "author": "Aster Lin",
  "githubUrl": "https://github.com/your-name",
  "email": "hello@example.com",
  "language": "zh-CN"
}
```

建议你优先修改这些字段：

- `siteName`
- `siteDescription`
- `siteUrl`
- `author`
- `githubUrl`
- `email`

说明：

- `siteUrl` 会用于生成 `rss.xml` 和 `sitemap.xml`
- GitHub Actions 中会自动根据仓库生成 `SITE_URL`，但本地构建仍建议把 `site.config.json` 填成最终站点地址

## 四、新增博客文章的完整方案

### 1. 创建文章骨架

推荐直接使用脚本生成：

```bash
npm run new:post -- --title "React Server Components 入门" --slug "react-server-components-intro" --tags "React,Architecture" --readingTime "8 min read"
```

脚本会自动完成这些事：

- 在 `public/data/posts.json` 中新增一条文章元数据
- 创建 `public/posts/react-server-components-intro.md`
- 创建本地占位封面图 `public/images/posts/react-server-components-intro.svg`

如果你已经准备好了本地封面图，也可以直接复制进项目并绑定：

```bash
npm run new:post -- --title "前端性能优化清单" --slug "frontend-performance-checklist" --tags "Performance,Frontend" --coverFile "assets/covers/performance.png"
```

如果你希望使用远程图片地址：

```bash
npm run new:post -- --title "CSS 架构实践" --slug "css-architecture" --cover "https://example.com/cover.jpg"
```

### 2. 编辑正文内容

脚本生成后，打开对应 Markdown 文件进行写作：

- `public/posts/<slug>.md`

默认正文模板来自：

- `scripts/templates/post-template.md`

你可以按自己的写作习惯调整这个模板，后续所有新文章都会复用。

### 3. 同步摘要与搜索关键词

写完正文后，执行：

```bash
npm run sync:content
```

这个脚本会自动从每篇 Markdown 中提取：

- `excerpt`
- `searchableText`

同步结果会写回 `public/data/posts.json`。

这意味着你的日常维护方式可以简化成：

1. 新建文章
2. 写 Markdown
3. 执行同步脚本
4. 预览和发布

### 4. 校验内容是否完整

发布前运行：

```bash
npm run check:content
```

它会检查：

- `posts.json` 是否存在重复 `id`
- `posts.json` 是否存在重复 `slug`
- 每篇文章是否存在对应 Markdown 文件
- 本地封面图路径是否有效
- Markdown 文件是否为空
- `site.config.json` 中的 `siteUrl` 是否为合法 `https://` 地址

### 5. 构建发布

最终发布时执行：

```bash
npm run build
```

`build` 已经内置以下流程：

1. `npm run sync:content`
2. `npm run check:content`
3. TypeScript 类型检查
4. Vite 生产构建
5. 生成 `dist/rss.xml`
6. 生成 `dist/sitemap.xml`

## 五、新文章脚本参数说明

`npm run new:post -- ...` 支持这些参数：

- `--title`
  必填，文章标题
- `--slug`
  可选，文章 URL 标识，推荐手动指定英文 slug
- `--tags`
  可选，多个标签用逗号分隔
- `--excerpt`
  可选，初始摘要；后续通常会被 `sync:content` 自动覆盖
- `--cover`
  可选，远程封面图 URL
- `--coverFile`
  可选，本地封面图路径，脚本会自动复制到 `public/images/posts`
- `--readingTime`
  可选，例如 `6 min read`
- `--date`
  可选，默认使用当前时间 ISO 字符串

推荐约定：

- `slug` 使用英文小写加短横线
- 标签控制在 2 到 4 个
- 文章标题可以中文，但 `slug` 最好手动指定
- 封面图优先用本地文件，便于长期维护

## 六、GitHub Actions 自动部署

项目已内置 GitHub Actions 工作流：

- `.github/workflows/deploy.yml`

触发条件：

- push 到 `main`
- 手动触发 `workflow_dispatch`

工作流执行内容：

1. 检出仓库
2. 安装 Node.js 和依赖
3. 自动计算 `VITE_BASE_PATH`
4. 自动计算 `SITE_URL`
5. 执行内容校验与构建
6. 部署到 GitHub Pages

### 启用步骤

1. 将项目推送到 GitHub 仓库
2. 打开仓库 `Settings > Pages`
3. 在 `Build and deployment` 中选择 `GitHub Actions`
4. 确保默认分支是 `main`
5. 之后每次 push 到 `main` 都会自动部署

### Base Path 规则

工作流会自动处理 GitHub Pages 仓库路径：

- 仓库为 `username.github.io` 时，使用 `/`
- 仓库为普通项目仓库时，使用 `/<repo-name>/`

## 七、RSS 与 Sitemap

执行 `npm run build` 后会自动生成：

- `dist/rss.xml`
- `dist/sitemap.xml`

用途：

- `rss.xml` 便于订阅博客更新
- `sitemap.xml` 便于搜索引擎收录

这两个文件使用 `site.config.json` 中的 `siteUrl` 作为基础地址。

## 八、推荐的日常写作流程

推荐你以后按这套顺序维护博客：

1. 执行 `npm run new:post -- --title "..."`
2. 编辑 `public/posts/<slug>.md`
3. 如果需要，替换 `public/images/posts/<slug>.svg` 为正式封面
4. 执行 `npm run sync:content`
5. 执行 `npm run dev` 本地预览
6. 执行 `npm run build`
7. 提交到 GitHub
8. push 到 `main`，等待 GitHub Actions 自动部署

## 九、常见维护场景

### 修改文章发布时间

直接编辑 `public/data/posts.json` 中对应文章的 `publishedAt`。

### 修改封面图

优先替换 `public/images/posts/<slug>.*`，然后把 `posts.json` 中的 `cover` 路径指向新文件。

### 文章搜索不准确

重新执行：

```bash
npm run sync:content
```

### RSS 或 Sitemap 地址不对

检查：

- `site.config.json` 中的 `siteUrl`
- GitHub 仓库名是否变更

## 十、常用命令总览

```bash
npm install
npm run dev
npm run new:post -- --title "文章标题" --slug "article-slug"
npm run sync:content
npm run check:content
npm run build
npm run preview
```
