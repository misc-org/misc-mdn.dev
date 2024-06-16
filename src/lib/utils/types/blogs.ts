import type { Blogs } from "./microcms";

export type Tag = {
  title: Blogs["tags"][number];
  icon: string;
};

export type TagMode = Blogs["tags"][number];

export type Tags = {
  [key: string]: Tag;
};

export const tags: Tags = {
  info: { title: "お知らせ", icon: "mdi:bell" },
  blogs: { title: "ブログ", icon: "mdi:book" },
  works: { title: "作品紹介", icon: "mdi:palette" },
  report: { title: "活動報告", icon: "mdi:account" },
  "numeric-1": { title: "1 年生", icon: "mdi:numeric-1" },
  "numeric-2": { title: "2 年生", icon: "mdi:numeric-2" },
  "numeric-3": { title: "3 年生", icon: "mdi:numeric-3" },
} as const;
