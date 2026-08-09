import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root } from "mdast";

/**
 * Blog posts live as markdown files in content/blog, one per post, written by
 * scripts/import-medium.mjs (see that file for where they came from). Nothing
 * here runs in the browser: every blog route is prerendered, so the parser
 * only ever executes at build time and ships no client JS.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  author: string;
  /** The 12-hex Medium id. Stable across title/slug edits — see the importer. */
  mediumId: string;
  mediumUrl: string;
  hero?: string;
  heroWidth?: number;
  heroHeight?: number;
  heroAlt?: string;
  excerpt: string;
  tags: string[];
  /**
   * Intrinsic size of every body image, so next/image can reserve space
   * without probing the file at render time. Written by the importer.
   */
  images: { src: string; width: number; height: number }[];
  /** Raw markdown body, frontmatter stripped. */
  content: string;
};

/**
 * Read synchronously on purpose. Next treats sync I/O as a deterministic
 * operation that can complete during prerendering and be folded into the
 * static shell; `await fs.readFile` counts as uncached data and would need a
 * `'use cache'` wrapper if cacheComponents is ever enabled.
 */
function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    // gray-matter parses an unquoted YYYY-MM-DD into a Date, so normalise
    // back to a plain ISO day rather than trusting the shape
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? ""),
    author: String(data.author ?? ""),
    mediumId: String(data.mediumId ?? ""),
    mediumUrl: String(data.mediumUrl ?? ""),
    hero: data.hero ? String(data.hero) : undefined,
    heroWidth: data.heroWidth ? Number(data.heroWidth) : undefined,
    heroHeight: data.heroHeight ? Number(data.heroHeight) : undefined,
    heroAlt: data.heroAlt ? String(data.heroAlt) : "",
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    images: Array.isArray(data.images)
      ? data.images.map((image: { src: string; width: number; height: number }) => ({
          src: String(image.src),
          width: Number(image.width),
          height: Number(image.height),
        }))
      : [],
    content,
  };
}

/** Every post, newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return readPost(`${slug}.md`);
}

/** Parse a post body into an mdast tree for components/PostBody.tsx. */
export function markdownToMdast(markdown: string): Root {
  return unified().use(remarkParse).parse(markdown) as Root;
}

/**
 * Section headings within a post, for the scrollspy sidebar. Slugs match the
 * ids PostBody puts on each heading.
 */
export function getPostHeadings(markdown: string): { id: string; title: string }[] {
  const tree = markdownToMdast(markdown);
  return tree.children
    .filter((node) => node.type === "heading" && node.depth <= 3)
    .map((node) => {
      const title = mdastToText(node);
      return { id: headingId(title), title };
    })
    .filter((heading) => heading.title.length > 0);
}

export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)
    .replace(/-+$/, "");
}

/** Flatten any mdast node to its plain text. */
export function mdastToText(node: unknown): string {
  const n = node as { value?: string; children?: unknown[] };
  if (typeof n?.value === "string") return n.value;
  if (Array.isArray(n?.children)) return n.children.map(mdastToText).join("");
  return "";
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  // the dates are plain days, so pin the zone or they can render a day early
  timeZone: "UTC",
});

export function formatPostDate(isoDay: string): string {
  return dateFormatter.format(new Date(`${isoDay}T00:00:00Z`));
}
