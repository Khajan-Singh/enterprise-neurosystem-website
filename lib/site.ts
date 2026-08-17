/**
 * The production origin. Used for `metadataBase`, the RSS feed and the
 * sitemap — all three need absolute URLs, and Next throws at build time if a
 * relative URL reaches a metadata field without a `metadataBase` set.
 *
 * `www`, not the apex, because the live server already 301s
 * enterpriseneurosystem.org → www.enterpriseneurosystem.org. Canonicals must
 * name the URL that actually serves the page; pointing them at the apex would
 * make every canonical reference a redirect. If that redirect is ever flipped
 * to apex-canonical, change it here and nowhere else.
 */
export const SITE_URL = "https://www.enterpriseneurosystem.org";

export const SITE_NAME = "Enterprise Neurosystem";

export const absoluteUrl = (pathname: string) =>
  new URL(pathname, SITE_URL).toString();
