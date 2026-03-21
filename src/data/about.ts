import type { AboutProfile } from "@/types/blog";
import siteConfig from "../../site.config.json";

export const aboutProfile: AboutProfile = {
  name: siteConfig.author,
  role: "Full Stack Engineer",
  intro:
    "一得阁拉米",
  avatar: "/images/avatar.svg",
  skills: ["SDVX", "maimaiDX", "chunithm"],
  links: [
    { label: "GitHub", url: siteConfig.githubUrl },
    { label: "Email", url: `mailto:${siteConfig.email}` }
  ]
};
