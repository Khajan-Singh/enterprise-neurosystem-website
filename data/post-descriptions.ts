/**
 * Search-result descriptions for blog posts.
 *
 * A post's `excerpt` comes from Medium's own summary, which cuts off mid-
 * sentence at ~190 characters — 10 of the 13 posts end on a dangling "…", and
 * all of them run past the ~155 characters a search result actually displays.
 * That is fine as the visible card blurb on /blog, but it makes a poor meta
 * description, so `generateMetadata` prefers an entry here when one exists.
 *
 * Keyed on `mediumId`, not slug: Medium slugs mutate when a title is edited
 * (see scripts/import-medium.mjs), and the id is the one stable handle.
 *
 * This lives here rather than in the markdown because
 * `scripts/import-medium.mjs` owns every field in `content/blog/*.md` and a
 * rerun would overwrite a hand-edited frontmatter value.
 *
 * Keep entries under ~155 characters and let them end on a complete thought.
 */
export const postDescriptions: Record<string, string> = {
  d2c4f60f4cc7:
    "AgroSpace CTO Tomás Acuña on how winning the AIM for Climate Grand Challenge brought publicity, Enterprise Neurosystem guidance and AWS cloud credits.",
  b7e673ac4713:
    "Ecma International has recognized NLIP (the Natural Language Interaction Protocol) as a family of standards for open, secure AI agent ecosystems.",
  d06acc551f6c:
    "Four finalists are named for UN Climate Change's AI for Climate Action Award 2025, recognizing open-source AI for climate work in LDCs and SIDS.",
  "59ec12787f19":
    "Dr. Letetia Addison of Trinidad and Tobago wins the 2024 AI Innovation Grand Challenge, with the award presented at COP29 in Baku, Azerbaijan.",
  "1a42db94d9cc":
    "The first post from the Enterprise Neurosystem: our mission, our participants, and the global sensor network we're building for climate data.",
  "6a0d60a6019a":
    "Enterprise Neurosystem volunteers and Sri Lankan IoT innovator SenzAgro launch BeeSenz, using sensors and AI to keep hives healthy as the climate shifts.",
  "85f898af9810":
    "A Q&A with Dr. Letetia Addison, who led the Trinidad and Tobago team that won the Grand Prize at the 2024 AI Innovation Grand Challenge.",
  bcd4d2f97b7b:
    "Alisa Luangrath's team from Laos wins the 2025 AI for Climate Action Award for SAFIR, an open-source multilingual farming and irrigation tool.",
  "607ab4897595":
    "The Enterprise Neurosystem and UN Climate Change are accepting 250-word proposals for the AI Innovation Grand Challenge, open to entrants worldwide.",
  "121f2e2e566c":
    "Looking back at COP29 in Baku: the 2024 AI Innovation Grand Challenge award presentation and the rest of the Enterprise Neurosystem's involvement.",
};
