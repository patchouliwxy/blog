import type { AboutProfile } from "@/types/blog";
import siteConfig from "../../site.config.json";

export const aboutProfile: AboutProfile = {
  name: siteConfig.author,
  role: "Full Stack Engineer / Technical Writer",
  intro:
    "我专注于构建兼顾体验、性能与可维护性的产品，也喜欢把实践经验沉淀为清晰可读的技术文章。",
  avatar: "/images/avatar.svg",
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "System Design", "Markdown Workflow"],
  links: [
    { label: "GitHub", url: siteConfig.githubUrl },
    { label: "Email", url: `mailto:${siteConfig.email}` }
  ]
};
