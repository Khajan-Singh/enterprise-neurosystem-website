import type { Post } from "./blog";
import { getAuthor } from "@/data/authors";
import { postDescriptions } from "@/data/post-descriptions";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./site";

/**
 * JSON-LD builders. Everything here is derived from data that already exists
 * elsewhere in the repo (lib/site.ts, data/authors.ts, a post's frontmatter)
 * rather than restating facts — a second copy of the org description would
 * drift from the one in app/layout.tsx.
 *
 * Validate changes with https://validator.schema.org/.
 */

/** Stable node ids, so the graph can cross-reference instead of duplicating. */
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const DESCRIPTION =
  "Enterprise Neurosystem is an open source AI research community treating the planet's species and ecosystems as a single system, building a global-scale AI network to understand and respond to climate change.";

/**
 * The org entity. `NGO` rather than plain `Organization`: the homepage
 * describes a non-profit, open source research community.
 *
 * No `email`/`telephone`: the only contact details on the site use an
 * `enterpriseneurosystem.ai` address while this site is `.org`, and an
 * unverified address does not belong in machine-readable markup.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: "The Enterprise Neurosystem",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo.png"),
  },
  description: DESCRIPTION,
  // Only profiles that actually exist and are linked from the site.
  sameAs: [
    "https://github.com/Enterprise-Neurosystem",
    "https://medium.com/the-enterprise-neurosystem-blog",
  ],
};

/**
 * No `SearchAction` — there is no site search for a search engine to invoke,
 * and declaring one that 404s is worse than declaring none.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
};

export function blogPostingSchema(post: Post) {
  const author = getAuthor(post.author);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    // Same source as the meta description, so the two never disagree.
    description: postDescriptions[post.mediumId] ?? post.excerpt,
    datePublished: post.date,
    // Points at Medium, matching this page's canonical rather than
    // contradicting it — Medium published first and canonicalises to itself.
    mainEntityOfPage: post.mediumUrl,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: post.hero ? absoluteUrl(post.hero) : undefined,
    keywords: post.tags.length ? post.tags.join(", ") : undefined,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: author?.role,
    },
    publisher: { "@id": ORG_ID },
  };
}

/** `trail` is ordered root-first and excludes nothing — pass Home as item 1. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
