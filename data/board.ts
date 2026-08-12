export type BoardMember = {
  name: string;
  title: string;
  affiliation?: string;
  bio: string;
  image: string;
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
    bio: "Dennis O'Connell has been leading technology vendor relations and Yahoo server hardware strategy for the last 15 years. He is the Sr. Director of Yahoo's Performance Engineering Team, which is in charge of exploring and on-boarding new technologies and server vendors, sponsoring proof of concepts around new tech, and finding new areas of collaboration with current and future vendors. Dennis' team runs Yahoo's benchmarking & certification lab and assists Yahoo's business units to improve their applications' latency, throughput and cost. Dennis grew up in Massachusetts and graduated at Northeastern University with a major in International Affairs.",
    image: "/people/dennis.jpg",
  },
];
