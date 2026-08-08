/**
 * The production origin. Used for `metadataBase`, the RSS feed and the
 * sitemap — all three need absolute URLs, and Next throws at build time if a
 * relative URL reaches a metadata field without a `metadataBase` set.
 */
export const SITE_URL = "https://enterpriseneurosystem.org";

export const SITE_NAME = "Enterprise Neurosystem";

export const absoluteUrl = (pathname: string) =>
  new URL(pathname, SITE_URL).toString();
