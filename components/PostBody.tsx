import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Post } from "@/lib/blog";
import { headingId, markdownToMdast, mdastToText } from "@/lib/blog";

/**
 * Renders a blog post body.
 *
 * There is no `.prose` layer in this project and no @tailwindcss/typography —
 * every typographic decision lives inline in the page components. So rather
 * than inventing a utility layer for the blog, this walks the markdown's mdast
 * tree and emits exactly the markup /mission and /charter already use: the
 * `gap-4` body wrapper (paragraphs carry no class of their own), the navy-dot
 * bullet list, and the `border-l-2 border-accent` pull-quote.
 *
 * Only the node types Medium actually produces are handled — the corpus uses
 * paragraphs, links, strong, emphasis, images with captions, unordered lists,
 * h3, and horizontal rules. Anything unrecognised falls back to rendering its
 * children so text can never silently vanish.
 */

// mdast nodes are structurally simple; typing them loosely here keeps the
// renderer readable without pulling the full mdast type surface into every
// signature.
type MdastNode = {
  type: string;
  value?: string;
  depth?: number;
  url?: string;
  alt?: string | null;
  ordered?: boolean;
  children?: MdastNode[];
};

const Bullet = () => (
  <span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
);

function isImageParagraph(node: MdastNode) {
  return (
    node.type === "paragraph" &&
    node.children?.length === 1 &&
    node.children[0].type === "image"
  );
}

function isCaptionParagraph(node: MdastNode | undefined) {
  return (
    node?.type === "paragraph" &&
    node.children?.length === 1 &&
    node.children[0].type === "emphasis"
  );
}

export function PostBody({ post }: { post: Post }) {
  const tree = markdownToMdast(post.content) as unknown as MdastNode;
  const sizes = new Map(post.images.map((image) => [image.src, image]));

  // A post's first image is usually above the fold and is the LCP element, so
  // it loads eagerly while the rest stay lazy. Resolved up front rather than
  // by mutating a flag mid-walk, which the React compiler rejects.
  const firstImageSrc = post.images[0]?.src;

  /** Inline-level nodes: text, links, emphasis. */
  function renderInline(nodes: MdastNode[] | undefined): ReactNode {
    return nodes?.map((node, i) => {
      switch (node.type) {
        case "text":
          return node.value;
        case "strong":
          return <strong key={i}>{renderInline(node.children)}</strong>;
        case "emphasis":
          return <em key={i}>{renderInline(node.children)}</em>;
        case "inlineCode":
          return (
            <code key={i} className="rounded bg-bg-subtle px-1 py-0.5 text-[0.9em]">
              {node.value}
            </code>
          );
        case "break":
          return <br key={i} />;
        case "link": {
          const href = node.url ?? "";
          const external = /^https?:\/\//.test(href);
          const className = "text-accent hover:underline";
          return external ? (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {renderInline(node.children)}
            </a>
          ) : (
            <Link key={i} href={href} className={className}>
              {renderInline(node.children)}
            </Link>
          );
        }
        case "image": {
          // An image sitting inline alongside text — a <figure> here would be
          // invalid inside a <p>, so render the bare image. Standalone images
          // are intercepted at block level and do get a <figure>.
          const size = sizes.get(node.url ?? "");
          if (!size) return null;
          return (
            <Image
              key={i}
              src={node.url ?? ""}
              alt={node.alt ?? ""}
              width={size.width}
              height={size.height}
              className="h-auto w-full rounded-2xl"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          );
        }
        default:
          return <span key={i}>{renderInline(node.children)}</span>;
      }
    });
  }

  function Figure({
    node,
    caption,
    eager = false,
  }: {
    node: MdastNode;
    caption?: ReactNode;
    eager?: boolean;
  }) {
    const src = node.url ?? "";
    const size = sizes.get(src);
    const alt = node.alt ?? "";

    return (
      <figure className="my-2">
        {size ? (
          <Image
            src={src}
            alt={alt}
            width={size.width}
            height={size.height}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 768px, 100vw"
            // A post's first image is usually above the fold and is the LCP
            // element; lazy-loading it delays the largest paint. Next 16
            // deprecated `priority` in favour of `preload`, but its own docs
            // prefer eager loading for this case.
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
          />
        ) : (
          // Hand-authored posts may add an image without recording its size.
          // Render it rather than dropping it; the importer always supplies
          // dimensions for everything it writes.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" className="h-auto w-full rounded-2xl" />
        )}
        {caption && (
          <figcaption className="mt-2 text-sm leading-relaxed text-ink-muted">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  /** Block-level nodes. */
  function renderBlocks(nodes: MdastNode[]): ReactNode[] {
    const out: ReactNode[] = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // An image paragraph followed by an italic-only paragraph is a figure
      // and its caption — that's the shape the importer writes for Medium's
      // <figure>/<figcaption> pairs.
      if (isImageParagraph(node)) {
        const next = nodes[i + 1];
        const captionNodes = isCaptionParagraph(next)
          ? next.children?.[0].children
          : undefined;
        const image = node.children![0];
        out.push(
          <Figure
            key={i}
            node={image}
            caption={captionNodes ? renderInline(captionNodes) : undefined}
            eager={image.url === firstImageSrc}
          />,
        );
        if (captionNodes) i++;
        continue;
      }

      switch (node.type) {
        case "paragraph":
          out.push(<p key={i}>{renderInline(node.children)}</p>);
          break;

        case "heading": {
          const text = mdastToText(node);
          const id = headingId(text);
          // The page title is the <h1>; everything inside the body starts at
          // h2 so the outline never skips a level.
          const Tag = (node.depth ?? 3) <= 2 ? "h2" : "h3";
          out.push(
            <Tag
              key={i}
              id={id}
              className={
                Tag === "h2"
                  ? "mt-6 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-ink"
                  : "mt-6 scroll-mt-28 font-display text-base font-semibold text-ink"
              }
            >
              {renderInline(node.children)}
            </Tag>,
          );
          break;
        }

        case "list": {
          const ListTag = node.ordered ? "ol" : "ul";
          out.push(
            <ListTag key={i} className="flex flex-col gap-2 pl-1">
              {node.children?.map((item, j) => {
                // The overwhelmingly common case is a single paragraph, and
                // wrapping that in a <p> inside the flex row would break the
                // bullet alignment — so unwrap it to inline content.
                const blocks = item.children ?? [];
                const simple = blocks.length === 1 && blocks[0].type === "paragraph";
                return (
                  <li key={j} className="flex gap-3">
                    {node.ordered ? (
                      <span className="mt-0.5 flex-shrink-0 font-medium text-accent">
                        {j + 1}.
                      </span>
                    ) : (
                      <Bullet />
                    )}
                    {simple ? (
                      <span>{renderInline(blocks[0].children)}</span>
                    ) : (
                      <div className="flex flex-col gap-2">{renderBlocks(blocks)}</div>
                    )}
                  </li>
                );
              })}
            </ListTag>,
          );
          break;
        }

        case "blockquote":
          out.push(
            <blockquote
              key={i}
              className="border-l-2 border-accent pl-6 font-display text-xl text-ink"
            >
              {renderBlocks(node.children ?? [])}
            </blockquote>,
          );
          break;

        case "thematicBreak":
          out.push(<hr key={i} className="my-4 border-line" />);
          break;

        default:
          out.push(<p key={i}>{renderInline(node.children)}</p>);
      }
    }

    return out;
  }

  // Same wrapper as the charter's section body: color, size and leading are
  // inherited from here, and spacing is `gap-4` rather than per-element margin.
  return (
    <div className="flex max-w-3xl flex-col gap-4 text-base leading-relaxed text-ink-muted">
      {renderBlocks(tree.children ?? [])}
    </div>
  );
}
