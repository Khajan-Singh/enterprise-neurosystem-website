/**
 * External coverage of Enterprise Neurosystem — articles, interviews and
 * announcements published by *other* outlets, rendered as the link list on
 * /press.
 *
 * This is deliberately not a place for the consortium's own writing: posts we
 * author live in `content/blog/*.md` and render at /blog. If an item's URL
 * points at a domain we control, it probably belongs there instead.
 *
 * Order here doesn't matter — `PressList` sorts newest-first on `date`.
 */
export type PressItem = {
  /** Publication name as the outlet writes it — "IBM Research Blog", not "ibm". */
  outlet: string;
  /** The headline, as published. */
  title: string;
  /** ISO YYYY-MM-DD, matching blog frontmatter. Renders as "Mar 2026". */
  date: string;
  /** Always external and absolute. */
  url: string;
};

export const pressItems: PressItem[] = [
  {
    outlet: "UNFCCC",
    title: "UNFCCC Technology Mechanism AI for Climate Action Award",
    date: "2025-11-10",
    url: "https://unfccc.int/ttclear/events/2025/2025_event04",
  },
  {
    outlet: "Hacker News",
    title:
      "We built a language model 14,000,000x smaller than GPT-3 and formally verified it",
    date: "2025-07-22",
    url: "https://news.ycombinator.com/item?id=44645115",
  },
  {
    outlet: "Ecma International",
    title:
      "Call for participation on NLIP for communication with AI agents standardization",
    date: "2025-05-15",
    url: "https://ecma-international.org/news/call-for-participation-on-natural-language-interaction-protocol-for-communication-with-ai-agents-standardization/",
  },
  {
    outlet: "Uganda STI Secretariat",
    title: "STI-OP & Defence Ministry hold engagements",
    date: "2025-04-07",
    url: "https://sti.go.ug/sti-op-defence-ministry-hold-engagements/",
  },
  {
    outlet: "Uganda STI Secretariat",
    title: "Innovators' Pitch Day",
    date: "2025-04-07",
    url: "https://sti.go.ug/innovators-pitch-day/",
  },
  {
    outlet: "UNFCCC TEC",
    title: "Information note on the AI Innovation Grand Challenge",
    date: "2024-04-02",
    url: "https://unfccc.int/ttclear/misc_/StaticFiles/gnwoerk_static/tn_meetings/45f7d11508c14be492908c79186ec53f/7c666334019e4f09844fe6001e4c4aa4.pdf",
  },
  {
    outlet: "UNFCCC",
    title: "COP 29 AI Innovation Grand Challenge Award Ceremony",
    date: "2024-11-16",
    url: "https://unfccc.int/ttclear/events/2024/2024_event04",
  },
  {
    outlet: "UNFCCC",
    title:
      "UN Climate Change Technology Executive Committee and Enterprise Neurosystem to award grand prize for 2024 AI Innovation Grand Challenge to Dr Letetia Addison at COP29",
    date: "2024-11-10",
    url: "https://unfccc.int/news/un-climate-change-technology-executive-committee-and-enterprise-neurosystem-to-award-grand-prize-for",
  },
  {
    outlet: "China Daily",
    title: "COP28 sets eyes on AI to fight climate change",
    date: "2023-12-11",
    url: "https://www.chinadaily.com.cn/a/202312/11/WS6576467ca31040ac301a70aa.html",
  },
  {
    outlet: "UNFCCC",
    title:
      "Challenge launched at COP28 to harness artificial intelligence for climate action in developing countries",
    date: "2023-12-09",
    url: "https://unfccc.int/news/challenge-launched-at-cop28-to-harness-artificial-intelligence-for-climate-action-in-developing",
  },
  {
    outlet: "Kove",
    title:
      "Winner of AIM for Climate and Enterprise Neurosystem Grand Challenge to be awarded Kove:SDM software-defined memory",
    date: "2023-04-17",
    url: "https://kove.com/news-and-ideas/aim-for-climate-grand-challenge-with-enterprise-neurosystem-to-award-winner-kovesdmtm-software-defined-memory-technology/",
  },
];
