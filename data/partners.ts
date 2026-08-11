export type Engagement = {
  title: string;
  description: string;
  image?: string;
};

export const engagements: Engagement[] = [
  {
    title: "UNFCCC AI Innovation Grand Challenge",
    description:
      "Built and hosted by the Enterprise Neurosystem with the UNFCCC Technical Executive Committee (TEC) and CTCN, supporting AI innovators in developing nations. The 2024 winner, Dr. Letetia Addison of the University of West Indies, Trinidad and Tobago, was recognized for her AI4SIDS platform proposal. Open-source AI applications from the challenge are made available free of charge to developing nations.",
    image: "/partners/unfccc-grand-challenge-winner.jpg",
  },
  {
    title: "UN & ITU Early Warning for All",
    description:
      "Active participants in the United Nations and ITU's Early Warning 4 All (EW4All) Initiative, alongside continued support of UNFCCC and UN University programs.",
    image: "/partners/unfccc-secretariat-panel.jpg",
  },
  {
    title: "UAE & USDA AI Grand Challenge",
    description:
      "Partnered with the UAE and the US Department of Agriculture on an AI Grand Challenge competition for innovations in smart agriculture.",
    image: "/partners/cop28-uae-ctcn-panel.jpg",
  },
  {
    title: "COP 28 & COP 29",
    description:
      "Co-created new enablement initiatives at COP 28 and COP 29, including the AI Grand Challenge, and delivered AI keynotes at Africa Climate Week and Asia Pacific Climate Week.",
    image: "/partners/cop-conference-hall.jpg",
  },
  {
    title: "UNFCCC TEC / CTCN Joint Meetings",
    description:
      "AI presentations delivered at UNFCCC TEC and CTCN joint meetings in Korea and Germany, deepening our collaboration with the UNFCCC technology community.",
    image: "/partners/unfccc-tec-ctcn-joint-meeting.jpg",
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
