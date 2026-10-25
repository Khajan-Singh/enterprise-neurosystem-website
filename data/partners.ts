export type Engagement = {
  title: string;
  description: string;
  image?: string;
  /**
   * Alt text for `image`. Describes what is *in* the photograph — never a
   * repeat of `title`, which sits immediately beside the image and would
   * otherwise be announced twice.
   */
  imageAlt?: string;
  /** Optional trailing link rendered at the end of the description. */
  link?: { label: string; href: string };
};

export const engagements: Engagement[] = [
  {
    title: "AI for Climate Action Competition",
    description:
      "The UNFCCC Technology Mechanism AI for Climate Action (AICA) Award 2026 recognizes open-source, AI-powered solutions that contribute to climate change adaptation and mitigation in least developed countries (LDCs) and small island developing States (SIDS).",
    image: "/partners/aica-award-2026.jpg",
    imageAlt:
      "The AICA (AI for Climate Action) Award 26 logo, set beside a prismatic gradient form on a pale wireframe mesh.",
    link: {
      label: "See the AICA Award 2026",
      href: "https://aica.awardsplatform.com/",
    },
  },
  {
    title: "UNFCCC AI Innovation Grand Challenge",
    description:
      "Built and hosted by the Enterprise Neurosystem with the UNFCCC Technical Executive Committee (TEC) and CTCN, supporting AI innovators in developing nations. The 2024 winner, Dr. Letetia Addison of the University of West Indies, Trinidad and Tobago, was recognized for her AI4SIDS platform proposal. Open-source AI applications from the challenge are made available free of charge to developing nations.",
    image: "/partners/unfccc-grand-challenge-winner.jpg",
    imageAlt:
      "Six people on a COP 29 stage beside a UNFCCC Technology Executive Committee banner, two of them holding the AI Innovation Grand Challenge winner's certificate.",
  },
  {
    title: "UN & ITU Early Warning for All",
    description:
      "Active participants in the United Nations and ITU's Early Warning 4 All (EW4All) Initiative, alongside continued support of UNFCCC and UN University programs.",
    image: "/partners/unfccc-secretariat-panel.jpg",
    imageAlt:
      "Three panellists at a UNFCCC session table: Bill Wright of the Enterprise Neurosystem beside Cecilia Kinuthia-Njenga of the UNFCCC secretariat, with a remote speaker on the screen behind them.",
  },
  {
    title: "UAE & USDA AI Grand Challenge",
    description:
      "Partnered with the UAE and the US Department of Agriculture on an AI Grand Challenge competition for innovations in smart agriculture.",
    image: "/partners/cop28-uae-ctcn-panel.jpg",
    imageAlt:
      "Two speakers seated at a COP28 UAE panel table in front of the UN Climate Change backdrop, one of them the chair of the CTCN advisory board.",
  },
  {
    title: "COP 28 & COP 29",
    description:
      "Co-created new enablement initiatives at COP 28 and COP 29, including the AI Grand Challenge, and delivered AI keynotes at Africa Climate Week and Asia Pacific Climate Week.",
    image: "/partners/cop-conference-hall.jpg",
    imageAlt:
      "A packed conference hall of seated delegates waiting for a climate summit session to begin.",
  },
  {
    title: "UNFCCC TEC / CTCN Joint Meetings",
    description:
      "AI presentations delivered at UNFCCC TEC and CTCN joint meetings in Korea and Germany, deepening our collaboration with the UNFCCC technology community.",
    image: "/partners/unfccc-tec-ctcn-joint-meeting.jpg",
    imageAlt:
      "Delegates standing and applauding around a U-shaped table at the UNFCCC TEC and CTCN joint meeting in UN Bonn.",
  },
];

export const partnerOrgs: string[] = [
  "JPL / Caltech",
  "The Nature Conservancy",
  "NCEAS",
  "Makerere University",
  "Uganda STI Ministry",
  "UNFCCC",
  "CTCN",
  "ITU",
  "USDA",
  "UAE",
  "ECMA",
  "UOR Foundation",
  "UN University",
  "Cisco",
  "Hewlett Packard",
  "Hitachi",
  "IBM",
  "Microsoft",
  "Red Hat",
];
