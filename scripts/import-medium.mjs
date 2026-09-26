/**
 * One-time (but rerunnable) importer for the Medium publication at
 * medium.com/the-enterprise-neurosystem-blog.
 *
 * This is a build-time tool. It is never imported by the app — it writes
 * content/blog/*.md and public/blog/<slug>/* and then gets out of the way.
 *
 * Two sources, because neither alone is complete:
 *
 *  1. The RSS feed. <content:encoded> carries the FULL post body (verified —
 *     not a preview), but the feed is hard-capped at the 10 most recent items
 *     with no pagination.
 *  2. scripts/medium-cache/*.json — raw article HTML captured from the rendered
 *     pages for the posts the feed can't reach. Medium sits behind Cloudflare,
 *     which 403s plain fetch(), so these were extracted with a real browser and
 *     committed. Committing them is what keeps this script rerunnable offline.
 *
 * Rerunning is safe. Posts are keyed on the 12-hex Medium ID from <guid>,
 * NEVER on the slug: Medium slugs are mutable (post d06acc551f6c already moved
 * from ...climate-change-award... to ...climate-action-award... when its title
 * was edited). Once a post has a file, that file's slug is frozen and reused,
 * so a title edit upstream rewrites the body in place instead of minting a
 * duplicate post at a new URL.
 *
 *   node scripts/import-medium.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_DIR = path.join(ROOT, "scripts", "medium-cache");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const IMAGE_DIR = path.join(ROOT, "public", "blog");

const FEED_URL = "https://medium.com/feed/the-enterprise-neurosystem-blog";

// Size the source to how it's rendered before committing it.
// Post images render at most ~768px wide in the max-w-3xl prose column, so
// 1600 covers 2x DPR with room to spare.
const MAX_IMAGE_WIDTH = 1600;
const JPEG_QUALITY = 82;

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const log = (...args) => console.log(...args);

/** Medium ids are the trailing 12 hex chars of a post URL/guid. */
function mediumIdFrom(url) {
  return url.match(/([a-f0-9]{12})(?:\?|$|\/)/)?.[1] ?? null;
}

function slugFromUrl(url, mediumId) {
  const last = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
  let slug = last.replace(new RegExp(`-?${mediumId}$`), "");
  // Medium slugs run long. Trim at a word boundary rather than mid-word.
  if (slug.length > 60) {
    slug = slug.slice(0, 60).replace(/-[^-]*$/, "");
  }
  return slug.replace(/^-+|-+$/g, "");
}

/** YAML double-quoted scalars and JSON strings escape identically. */
const yamlString = (s) => JSON.stringify(String(s ?? ""));

/**
 * Medium's editor pads em dashes with U+200A hair spaces and sprinkles
 * U+00A0 non-breaking spaces through pasted copy. At this site's type sizes a
 * hair space reads as no space at all ("BeeSenz—Using"), and the rest of the
 * site writes em dashes with ordinary spaces around them. Normalise both.
 *
 * The character class below is invisible in source on purpose — it holds the
 * literal code points U+200A (hair), U+2009 (thin), U+202F (narrow no-break)
 * and U+00A0 (no-break). Don't "tidy" it into ordinary spaces.
 */
const normaliseSpaces = (s) =>
  String(s ?? "")
    .replace(/[    ]/g, " ")
    .replace(/ {2,}/g, " ");

function toIsoDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error(`unparseable date: ${value}`);
  return d.toISOString().slice(0, 10);
}

/**
 * Existing slug for a post, if we've imported it before. Keyed on mediumId so
 * an upstream slug change doesn't strand the old file.
 */
function existingSlugFor(mediumId) {
  if (!fs.existsSync(CONTENT_DIR)) return null;
  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    if (new RegExp(`^mediumId:\\s*"?${mediumId}"?\\s*$`, "m").test(raw)) {
      return file.replace(/\.md$/, "");
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// source 1: the RSS feed
// ---------------------------------------------------------------------------

async function loadFeedPosts() {
  log(`Fetching ${FEED_URL} ...`);
  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error(`feed returned ${res.status}`);
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    cdataPropName: "__cdata",
    // categories: one item may have several, so never collapse to a scalar
    isArray: (name) => name === "item" || name === "category",
  });
  const parsed = parser.parse(xml);
  const items = parsed?.rss?.channel?.item ?? [];
  log(`  feed returned ${items.length} items (Medium caps this at 10)`);

  return items.map((item) => {
    const text = (v) => (v && typeof v === "object" ? (v.__cdata ?? "") : (v ?? ""));
    const link = String(text(item.link)).split("?")[0];
    const guid = String(text(item.guid?.["#text"] ?? item.guid));
    const mediumId = mediumIdFrom(guid) ?? mediumIdFrom(link);
    if (!mediumId) throw new Error(`no medium id for ${link}`);
    return {
      source: "feed",
      mediumId,
      mediumUrl: link,
      title: String(text(item.title)).trim(),
      date: toIsoDate(text(item.pubDate)),
      author: String(text(item["dc:creator"])).trim(),
      tags: (item.category ?? []).map((c) => String(text(c)).trim()).filter(Boolean),
      html: String(text(item["content:encoded"])),
    };
  });
}

// ---------------------------------------------------------------------------
// source 2: browser-captured HTML for the posts RSS can't reach
// ---------------------------------------------------------------------------

function loadCachedPosts() {
  if (!fs.existsSync(CACHE_DIR)) return [];
  const files = fs
    .readdirSync(CACHE_DIR)
    .filter((f) => f.startsWith("medium-") && f.endsWith(".json"));

  return files.map((file) => {
    let data = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, file), "utf8"));
    // browser_evaluate serialises its return value, so the payload may be a
    // JSON string rather than an object
    if (typeof data === "string") data = JSON.parse(data);
    return {
      source: "cache",
      mediumId: data.mediumId,
      mediumUrl: data.url.split("?")[0],
      title: String(data.title).trim(),
      date: toIsoDate(data.datePublished),
      author: String(data.author ?? "").trim(),
      tags: [], // the rendered page doesn't expose them the way the feed does
      html: data.html,
    };
  });
}

// ---------------------------------------------------------------------------
// cleaning
// ---------------------------------------------------------------------------

/**
 * Strip the two pieces of Medium boilerplate every feed body carries, and
 * normalise <figure> so Turndown can render caption + image predictably.
 * Returns { html, images } where images is an ordered list of source URLs.
 */
/**
 * Apply the hand-maintained typo corrections from text-fixes.json. Literal
 * substring replacement, not regex — the entries are distinctive enough that
 * they don't need anchoring, and a regex would invite escaping bugs.
 */
function applyTextFixes(value, fixes) {
  let out = String(value ?? "");
  for (const fix of fixes) out = out.split(fix.find).join(fix.replace);
  return out;
}

function cleanBody(html, { title = "", verbose = false, textFixes = [] } = {}) {
  const dom = new JSDOM(`<body>${html}</body>`);
  const { document } = dom.window;
  const body = document.body;
  const removed = [];
  const norm = (s) => (s ?? "").replace(/\s+/g, " ").trim().toLowerCase();

  // 1. the 1x1 analytics beacon Medium injects into every RSS body
  for (const img of [...body.querySelectorAll("img")]) {
    const src = img.getAttribute("src") ?? "";
    if (src.includes("/_/stat") || (img.getAttribute("width") === "1" && img.getAttribute("height") === "1")) {
      img.remove();
      removed.push("tracking pixel");
    }
  }

  // 2. the trailing <hr> + "... was originally published in ... on Medium"
  //    footer. Backwards on our own site, and the canonical already says it.
  for (const p of [...body.querySelectorAll("p")]) {
    if (/was originally published in/i.test(p.textContent ?? "")) {
      let prev = p.previousElementSibling;
      p.remove();
      removed.push("medium footer");
      while (prev && (prev.tagName === "HR" || !prev.textContent.trim())) {
        const before = prev.previousElementSibling;
        prev.remove();
        prev = before;
      }
    }
  }

  // 3. drop now-empty paragraphs left behind by the removals
  for (const p of [...body.querySelectorAll("p")]) {
    if (!p.textContent.trim() && !p.querySelector("img")) p.remove();
  }

  // 4. some posts open by repeating their own title as a heading. The page
  //    already renders the title as its <h1>, so that's a duplicate.
  const firstEl = body.firstElementChild;
  if (firstEl && /^H[1-4]$/.test(firstEl.tagName) && norm(firstEl.textContent) === norm(title)) {
    firstEl.remove();
    removed.push("duplicate title heading");
  }

  // 5. these posts use a fully-bold paragraph as a section heading rather than
  //    a real heading element. Promote them so the document outline is right
  //    (and so a table of contents is possible later). A paragraph that merely
  //    STARTS with bold ("**Phase one** is already complete.") is left alone.
  for (const p of [...body.querySelectorAll("p")]) {
    const strong = p.querySelector("strong, b");
    if (!strong) continue;
    if (p.children.length !== 1 || p.children[0] !== strong) continue;
    if (norm(p.textContent) !== norm(strong.textContent)) continue;
    if (!p.textContent.trim()) continue;
    const h3 = document.createElement("h3");
    h3.innerHTML = strong.innerHTML;
    p.replaceWith(h3);
    removed.push("bold-paragraph headings promoted to h3");
  }

  // 6. Medium's editor has no list button in some contexts, so authors type
  //    lists by hand as one paragraph of "* item<br>* item". Left alone,
  //    Turndown escapes those to a literal "\*" and the reader sees a stray
  //    asterisk instead of a bullet. Promote them to a real <ul>.
  //    Any <br> that ISN'T part of such a list is an incidental line wrap from
  //    the author's editor, and becomes a space rather than a hard break.
  for (const p of [...body.querySelectorAll("p")]) {
    if (!p.querySelector("br")) continue;
    const segments = p.innerHTML
      .split(/<br\s*\/?>/i)
      .map((s) => s.trim())
      .filter(Boolean);
    const isBulleted = segments.length > 1 && segments.every((s) => /^[*\-•·]\s+/.test(s));
    if (isBulleted) {
      const ul = document.createElement("ul");
      for (const segment of segments) {
        const li = document.createElement("li");
        li.innerHTML = segment.replace(/^[*\-•·]\s+/, "");
        ul.appendChild(li);
      }
      p.replaceWith(ul);
      removed.push("hand-typed list promoted to <ul>");
    } else {
      p.innerHTML = p.innerHTML.replace(/<br\s*\/?>/gi, " ").replace(/\s{2,}/g, " ");
      removed.push("incidental <br> collapsed");
    }
  }

  // 7. normalise Medium's exotic spacing, on text nodes only so markdown list
  //    indentation produced later by Turndown is never touched
  //    Typo corrections ride along on the same pass. Doing both here means the
  //    excerpt, which is derived from this cleaned HTML, picks them up too.
  const walker = document.createTreeWalker(body, dom.window.NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) {
    const next = applyTextFixes(normaliseSpaces(textNode.nodeValue), textFixes);
    if (next !== textNode.nodeValue) {
      if (next !== normaliseSpaces(textNode.nodeValue)) removed.push("typo fixes applied");
      textNode.nodeValue = next;
    }
  }

  // 8. collect images in document order and tag each with its index so the
  //    Turndown rule can emit the local path without re-deriving it
  const images = [];
  for (const img of [...body.querySelectorAll("img")]) {
    const src = img.getAttribute("src");
    if (!src) continue;
    img.setAttribute("data-index", String(images.length));
    images.push(src);
  }

  if (verbose && removed.length) log(`    stripped: ${[...new Set(removed)].join(", ")}`);
  return { html: body.innerHTML, images };
}

// ---------------------------------------------------------------------------
// images
// ---------------------------------------------------------------------------

/**
 * Medium serves the same store from two hosts: the feed hands out
 * cdn-images-1.medium.com/max/NNN/<id>, which 301s to the /v2/ form on
 * miro.medium.com. Normalise so we don't pay a redirect per image, and ask for
 * our own cap rather than whatever width the post happened to embed.
 */
function normaliseImageUrl(src) {
  const id = src.match(/([01]\*[A-Za-z0-9_-]+(?:\.(?:jpeg|jpg|png|gif|webp))?)/)?.[1];
  if (!id) return src;
  return `https://miro.medium.com/v2/resize:fit:${MAX_IMAGE_WIDTH}/${id}`;
}

async function downloadImages(slug, sources) {
  const outDir = path.join(IMAGE_DIR, slug);
  // Wipe first so a rerun can't leave orphans behind — image count, order and
  // even file extension can all change between runs.
  fs.rmSync(outDir, { recursive: true, force: true });
  if (!sources.length) return { files: [], hero: null };
  fs.mkdirSync(outDir, { recursive: true });

  const files = [];
  for (const [i, src] of sources.entries()) {
    const url = normaliseImageUrl(src);
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) {
      log(`    !! image ${i + 1} failed (${res.status}): ${url}`);
      files.push(null);
      continue;
    }
    const input = Buffer.from(await res.arrayBuffer());

    const image = sharp(input, { animated: true });
    const meta = await image.metadata();
    // GIFs may be animated; re-encoding would flatten them, so pass through.
    const passthrough = meta.format === "gif";

    // An alpha channel is only worth its bytes if something is actually
    // transparent. Several of Medium's PNGs carry a fully-opaque alpha channel
    // and cost ~8x what the same image costs as a JPEG.
    let keepAlpha = false;
    if (meta.hasAlpha && !passthrough) {
      const alpha = (await image.stats()).channels[3];
      keepAlpha = Boolean(alpha) && alpha.min < 255;
    }

    const ext = passthrough ? "gif" : keepAlpha ? "png" : "jpg";
    const name = `${String(i + 1).padStart(2, "0")}.${ext}`;

    let output = input;
    if (!passthrough) {
      let pipeline = sharp(input).resize({
        width: MAX_IMAGE_WIDTH,
        withoutEnlargement: true,
        fit: "inside",
      });
      pipeline = keepAlpha
        ? // these are diagrams/screenshots — palette quantisation is a large
          // win on them and visually indistinguishable
          pipeline.png({ compressionLevel: 9, palette: true, quality: 90 })
        : pipeline.flatten({ background: "#ffffff" }).jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
      output = await pipeline.toBuffer();
    }

    fs.writeFileSync(path.join(outDir, name), output);
    const finalMeta = await sharp(output).metadata();
    files.push({
      name,
      publicPath: `/blog/${slug}/${name}`,
      width: finalMeta.width,
      height: finalMeta.height,
      bytes: output.length,
    });
    log(`    image ${i + 1}/${sources.length} -> ${name} (${finalMeta.width}x${finalMeta.height}, ${Math.round(output.length / 1024)}KB)`);
  }

  const hero = files.find(Boolean) ?? null;
  return { files, hero };
}

// ---------------------------------------------------------------------------
// html -> markdown
// ---------------------------------------------------------------------------

function makeTurndown(images, altText) {
  /**
   * Medium ships every image with alt="". Where a caption exists we keep alt
   * empty on purpose: the rendered <figcaption> is the image's accessible
   * description, and repeating it in alt makes screen readers say it twice.
   * Captionless images have no description at all, so those are supplied by
   * hand in scripts/medium-cache/alt-text.json.
   */
  const altFor = (node, file) => {
    const override = altText[file.publicPath];
    if (override) return override.replace(/[[\]]/g, "");
    return (node.getAttribute("alt") ?? "").replace(/[[\]]/g, "");
  };

  const td = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "_",
  });

  // Medium bodies use <figure><img><figcaption>. Emit the image followed by an
  // italic caption line — that is the shape components/PostBody.tsx expects
  // (an emphasis-only paragraph directly after an image is rendered as its
  // <figcaption>).
  td.addRule("figure", {
    filter: "figure",
    replacement: (_content, node) => {
      const img = node.querySelector("img");
      if (!img) return "";
      const idx = Number(img.getAttribute("data-index"));
      const file = images[idx];
      if (!file) return "";
      const alt = altFor(img, file);
      const caption = node.querySelector("figcaption")?.textContent?.trim() ?? "";
      const md = `![${alt}](${file.publicPath})`;
      return caption ? `\n\n${md}\n\n_${caption}_\n\n` : `\n\n${md}\n\n`;
    },
  });

  // Bare <img> outside a <figure>
  td.addRule("img", {
    filter: "img",
    replacement: (_content, node) => {
      const idx = Number(node.getAttribute("data-index"));
      const file = images[idx];
      if (!file) return "";
      return `\n\n![${altFor(node, file)}](${file.publicPath})\n\n`;
    },
  });

  return td;
}

function excerptFrom(html) {
  const dom = new JSDOM(`<body>${html}</body>`);
  for (const p of dom.window.document.querySelectorAll("p")) {
    const text = p.textContent.trim().replace(/\s+/g, " ");
    if (text.length < 40) continue; // skip stubs/captions
    if (text.length <= 200) return text;
    return text.slice(0, 197).replace(/\s+\S*$/, "") + "…";
  }
  return "";
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.mkdirSync(IMAGE_DIR, { recursive: true });

  const readJson = (name) =>
    fs.existsSync(path.join(CACHE_DIR, name))
      ? JSON.parse(fs.readFileSync(path.join(CACHE_DIR, name), "utf8"))
      : {};
  const overrides = readJson("title-overrides.json");
  const altText = readJson("alt-text.json");
  const textFixes = readJson("text-fixes.json").fixes ?? [];

  const [feedPosts, cachedPosts] = [await loadFeedPosts(), loadCachedPosts()];
  log(`  cache provided ${cachedPosts.length} posts the feed can't reach`);

  // feed wins on overlap — it's the fresher of the two
  const byId = new Map();
  for (const post of [...cachedPosts, ...feedPosts]) byId.set(post.mediumId, post);
  const posts = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date));

  log(`\nImporting ${posts.length} posts\n`);

  let imageCount = 0;
  for (const post of posts) {
    const title = applyTextFixes(
      normaliseSpaces(overrides[post.mediumId] ?? post.title),
      textFixes,
    );
    const slug = existingSlugFor(post.mediumId) ?? slugFromUrl(post.mediumUrl, post.mediumId);
    log(`- ${post.date}  ${slug}`);
    log(`    "${title}"  [${post.source}, id ${post.mediumId}]`);
    if (overrides[post.mediumId] && overrides[post.mediumId] !== post.title) {
      log(`    title de-truncated from feed value`);
    }

    const { html, images } = cleanBody(post.html, { title, verbose: true, textFixes });
    const { files, hero } = await downloadImages(slug, images);
    imageCount += files.filter(Boolean).length;

    const markdown = makeTurndown(files, altText)
      .turndown(html)
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // The hero is reused on the /blog index card, where there is no
    // <figcaption> to lean on — so it needs a real alt of its own.
    const heroAlt = hero
      ? (altText[hero.publicPath] ??
        new JSDOM(`<body>${html}</body>`).window.document
          .querySelector("figure figcaption")?.textContent?.trim() ??
        "")
      : "";

    const frontmatter = [
      "---",
      `title: ${yamlString(title)}`,
      `date: ${post.date}`,
      `author: ${yamlString(post.author)}`,
      `mediumId: ${yamlString(post.mediumId)}`,
      `mediumUrl: ${yamlString(post.mediumUrl)}`,
      hero ? `hero: ${yamlString(hero.publicPath)}` : null,
      hero ? `heroWidth: ${hero.width}` : null,
      hero ? `heroHeight: ${hero.height}` : null,
      hero ? `heroAlt: ${yamlString(heroAlt)}` : null,
      `excerpt: ${yamlString(excerptFrom(html))}`,
      `tags: [${post.tags.map(yamlString).join(", ")}]`,
      // Intrinsic dimensions for every body image. next/image needs width and
      // height up front to reserve space, and markdown has nowhere to put
      // them — so they ride along here rather than being probed at render.
      files.filter(Boolean).length ? "images:" : null,
      ...files
        .filter(Boolean)
        .map((f) => `  - src: ${yamlString(f.publicPath)}\n    width: ${f.width}\n    height: ${f.height}`),
      "---",
      "",
    ]
      .filter((line) => line !== null)
      .join("\n");

    fs.writeFileSync(path.join(CONTENT_DIR, `${slug}.md`), `${frontmatter}\n${markdown}\n`, "utf8");
    log(`    wrote content/blog/${slug}.md (${markdown.length} chars)\n`);
  }

  log(`Done. ${posts.length} posts, ${imageCount} images.`);
  const missing = 13 - posts.length;
  if (missing > 0) log(`WARNING: expected 13 posts, got ${posts.length}.`);
}

await main();
