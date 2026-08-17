/**
 * Renders a JSON-LD structured-data block.
 *
 * A plain `<script>`, not `next/script`: this is data, not executable code, and
 * `next/script`'s loading strategies would only delay it past the point a
 * crawler reads the document. The `<` escape is the XSS scrub the Next docs
 * prescribe — `JSON.stringify` does not sanitise strings that could close the
 * script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
