export interface BlogPostMeta {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  likes: number;
  markdownPath: string;
  searchableText: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface AboutProfile {
  name: string;
  role: string;
  intro: string;
  avatar: string;
  skills: string[];
  links: Array<{
    label: string;
    url: string;
  }>;
}
