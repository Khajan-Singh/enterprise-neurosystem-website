export type BoardMember = {
  name: string;
  title: string;
  affiliation?: string;
  bio: string;
  /** Path under public/. Omit while a photo is pending — BoardCard renders a monogram instead. */
  image?: string;
};

export const boardMembers: BoardMember[] = [
  {
    name: "Bill Wright",
    title: "Chair",
    affiliation: "Former Chief Architect, Red Hat CTO Office",
    bio: "The Enterprise Neurosystem is the brainchild of Bill Wright, arising out of his work with R&D leaders at major telcos in the Americas. Bill is a former Chief Architect in the CTO organization at Red Hat, with previous work in the field at Affirmed Networks (later acquired by Microsoft) and VMware (acquired by Broadcom). He is a frequent speaker on AI and open source innovation at United Nations events, universities and IT industry conferences.",
    image: "/people/bill.jpg",
  },
  {
    name: "Dr. John Overton",
    title: "Vice Chair and Treasurer",
    affiliation: "Founder and CEO, Kove, Inc.",
    bio: "John Overton was a founding member of the Enterprise Neurosystem community and currently serves as Vice Chair and Treasurer. Dr. Overton is also the founder and CEO of Kove, Inc, a leading innovator in high-performance computing. John is committed to achieving new scale and ubiquity of adoption for AI/ML resources across the globe.",
    image: "/people/john.jpg",
  },
  {
    name: "Dinesh Verma",
    title: "Technical Committee Chair",
    affiliation: "Chief Scientist, Research Consulting Partnership, IBM T.J. Watson Research Center",
    bio: "Dinesh oversees the technical direction and execution of the Enterprise Neurosystem project and its sub-projects. Dinesh is the Chief Scientist of Research Consulting Partnership at IBM TJ Watson Research Center, and a Fellow of the UK Royal Academy of Engineering, an IEEE Fellow, and an IBM Fellow. He brings over 15 years of international leadership in network science and distributed analytics to the community.",
    image: "/people/dinesh.jpg",
  },
  {
    name: "Dr. Ryan Coffee",
    title: "REN/Gov Industry Lead",
    affiliation: "Senior Staff Research Scientist, Stanford Linear Accelerator Center (SLAC)",
    bio: "Ryan is Senior Staff Research Scientist at Stanford Linear Accelerator Center (SLAC) and a core member of the SLAC AI Initiative since its inception. He has a particular focus on Machine Learning for real-time information extraction at the sensor edge, spending much of his time promoting co-design of compute and sensor hardware for both scientific research as well as applied technology and agriculture sectors.",
    image: "/people/ryan.jpg",
  },
  {
    name: "Vishnu Hari",
    title: "Financial Services Industry Lead",
    bio: "Vishnu Hari Kumar is a currently building a stealth startup, and previously worked as a Product Manager at Meta AI, leading AI Applied Research initiatives. Vishnu's experience spans AI engineering and product leadership roles at companies like IBM, Accenture and EY.",
    image: "/people/vishnu.jpg",
  },
  {
    name: "Dr. Tong Zhang",
    title: "Telco Industry Lead",
    affiliation: "Principal Engineer and Lead Architect, Network Platforms Group, Intel Corporation",
    bio: "Tong is a Principal Engineer and Lead Architect on AI and analytics in the Network Platforms Group of Intel Corporation, leading architecture efforts for Machine Learning and Deep Learning solutions for network domain use cases. Before joining Intel, Dr. Zhang was a Principal Scientist in Hewlett-Packard Labs where she led over a dozen projects related to media analytics systems and products.",
    image: "/people/tong.jpg",
  },
  {
    name: "Dennis O'Connell",
    title: "Board Member",
    affiliation: "Sr. Director, Yahoo Performance Engineering Team",
    bio: "Dennis has led technology vendor relations and Yahoo's server hardware strategy for the last 15 years. His Performance Engineering Team explores and on-boards new technologies and server vendors, sponsors proofs of concept, and opens new areas of collaboration with current and future vendors. The team also runs Yahoo's benchmarking and certification lab, helping its business units improve application latency, throughput and cost. Dennis grew up in Massachusetts and graduated from Northeastern University with a major in International Affairs.",
    image: "/people/dennis.jpg",
  },
  {
    name: "Angie Grimm",
    title: "Board Member",
    affiliation: "Senior Vice President, Growth and General Manager, Accelerators, Techstars",
    bio: "Angie Grimm is the Senior Vice President, Growth and General Manager, Accelerators at Techstars. She is the former Head of IBM Ventures and VP, Corporate Development and Strategy for IBM Corporation. At IBM, Angie led the formation of IBM’s $600 million 10-year corporate venture capital arm, focused on investing in AI, security, sustainability, and quantum. She has been recognized by the Global Corporate Venturing Powerlist 100 (2020-2023).",
    image: "/people/angie.jpg",
  },
];
