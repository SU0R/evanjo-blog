import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, lastModified: new Date("2026-08-05"), priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date("2026-08-17"), priority: 0.8 },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      priority: 0.7,
    })),
  ];
}
