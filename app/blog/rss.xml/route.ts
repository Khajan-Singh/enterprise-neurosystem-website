import { getAllPosts } from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

/**
 * Route Handlers are not cached by default in Next 16, and this feed only
 * changes when the content files do — so prerender it with the rest of the
 * build rather than rendering per request.
 */
export const dynamic = "force-static";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const posts = getAllPosts();
  const self = absoluteUrl("/blog/rss.xml");

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${escape(url)}</link>
      <description>${escape(post.excerpt)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escape(post.author)}</dc:creator>
      <guid isPermaLink="false">${escape(post.mediumId || url)}</guid>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(SITE_NAME)} Blog</title>
    <link>${escape(absoluteUrl("/blog"))}</link>
    <description>Updates from the Enterprise Neurosystem community — AI for climate action, open standards and sensor deployments.</description>
    <language>en</language>
    <atom:link href="${escape(self)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
