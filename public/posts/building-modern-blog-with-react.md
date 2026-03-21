# 用 React 构建现代个人博客系统

一个好的博客前端，不只是把文章渲染出来，而是要让写作、浏览、维护与部署都足够顺滑。

## 项目目标

这套博客系统围绕三个目标设计：

- 使用 `React + Vite + TypeScript` 建立清晰、可维护的前端骨架
- 使用 `Tailwind CSS` 快速沉淀一致的视觉语言
- 使用 `Markdown` 与本地 `JSON` 数据，让内容生产成本尽量低

## 为什么选择这种组合

`Vite` 提供了很快的开发体验，`React Router` 负责多页面导航，`Redux Toolkit` 用来管理主题和点赞这类全局状态。

### 内容来源

文章元数据放在 `posts.json` 中，正文则保存在 `public/posts/*.md`。这样做有两个好处：

1. 数据结构清晰，首页列表与详情页可以分别加载
2. 未来切换到真实接口时，只需要替换数据层实现

### 页面体验

详情页增加了自动目录、阅读进度条和点赞按钮，这些功能都能显著提升阅读体验。

## GitHub Pages 部署建议

如果你准备部署到 GitHub Pages，推荐这样配置：

```bash
npm install
npm run build
npm run deploy
```

同时记得在 `vite.config.ts` 中通过 `VITE_BASE_PATH` 配置仓库子路径。

## 总结

这类博客项目的关键并不在于功能堆砌，而在于内容流、样式系统与部署流程是否足够稳定。
