# 个人博客系统前端

基于 `React + Vite + TypeScript + Tailwind CSS` 构建的现代个人博客系统前端项目，适合部署到 GitHub Pages。

## 技术栈

- React 18
- Vite 6
- TypeScript
- React Router
- Redux Toolkit
- Tailwind CSS
- react-markdown + Prism.js
- Framer Motion

## 运行方式

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
npm run preview
```

## GitHub Pages 部署

1. 将 `vite.config.ts` 中的 `VITE_BASE_PATH` 设置为你的仓库路径，例如 `/my-blog/`
2. 安装依赖后执行：

```bash
npm run deploy
```

## 内容数据

- 文章元数据：`public/data/posts.json`
- 文章正文：`public/posts/*.md`
- 关于我信息：`src/data/about.ts`
