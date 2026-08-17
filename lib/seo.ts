import type { Metadata } from "next";
import { SITE_NAME } from "./site";

/**
 * The sitewide share card.
 *
 * Deliberately referenced from code rather than via the
 * `app/opengraph-image.png` file convention: file-based metadata has *higher*
 * priority than the metadata object, so a root-level `opengraph-image` would
 * override the per-post hero images that `app/blog/[slug]` sets. Keeping it in
 * code lets a post's own hero win and this act as the fallback.
 *
 * Regenerate with `node scripts/make-og-image.mjs`.
 */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Enterprise Neurosystem — a global AI architecture for environmental intelligence.",
} as const;

/** Autodiscovery for the blog feed. Repeated on every page, see below. */
const RSS_ALTERNATE = { "application/rss+xml": "/blog/rss.xml" };

type PageMetadataInput = {
  /** Page title, without the " · Enterprise Neurosystem" suffix. */
  title: string;
  description: string;
  /** Root-relative path, e.g. "/projects/uganda". Resolved against `metadataBase`. */
  path: string;
  /** Overrides the default share card — pass a post hero, for example. */
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
  /** Set when the title must ignore the layout's "%s · …" template. */
  absoluteTitle?: boolean;
};

/**
 * Builds a page's complete metadata.
 *
 * Every page goes through this rather than hand-writing `openGraph` blocks,
 * because Next merges metadata **per top-level field, not deeply**: a page that
 * sets `alternates: { canonical }` silently drops the layout's
 * `alternates.types` RSS link, and one that sets `openGraph` drops the
 * layout's `openGraph` wholesale. Emitting the full object every time makes
 * that trap impossible to fall into.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const ogImage = image ?? OG_IMAGE;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      types: RSS_ALTERNATE,
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
