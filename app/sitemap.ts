import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

/**
 * Blog post URLs appear here even though each one canonicalises to Medium.
 * That is intentional and not a contradiction: the sitemap declares what
 * exists on this domain, and search engines consolidate ranking signals to
 * whatever the canonical says. Dropping them would only hide the pages.
 */
const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/vision", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mission", changeFrequency: "yearly", priority: 0.7 },
  { path: "/charter", changeFrequency: "yearly", priority: 0.5 },
  { path: "/board", changeFrequency: "monthly", priority: 0.6 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects/uganda", changeFrequency: "monthly", priority: 0.7 },
  { path: "/projects/dangermond", changeFrequency: "monthly", priority: 0.7 },
  { path: "/nlip", changeFrequency: "monthly", priority: 0.7 },
  { path: "/workstreams", changeFrequency: "monthly", priority: 0.6 },
  { path: "/partners", changeFrequency: "monthly", priority: 0.6 },
  { path: "/press", changeFrequency: "monthly", priority: 0.5 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newestPost = posts[0]?.date;

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      // only the blog index has a content-derived last-modified date
      lastModified: route.path === "/blog" && newestPost ? new Date(newestPost) : undefined,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
