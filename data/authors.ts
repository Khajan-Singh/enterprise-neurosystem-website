export type Author = {
  /** Matches the `author` field in a post's frontmatter. */
  name: string;
  role?: string;
  /** Path under public/people, sized 256x256 like the board photos. */
  image?: string;
};

/**
 * Byline metadata for blog authors. Posts carry the author's name as a plain
 * string, so an author with no entry here still renders correctly — this only
 * adds the extras (role, photo) when we have them.
 */
export const authors: Author[] = [
  { name: "Pete Harris" },
];

export const getAuthor = (name: string): Author | undefined =>
  authors.find((author) => author.name === name);
