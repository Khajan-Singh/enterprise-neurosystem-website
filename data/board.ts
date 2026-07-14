export type BoardMember = {
  name: string;
  title: string;
  affiliation?: string;
  bio: string;
};

export const boardMembers: BoardMember[] = [
  {
    name: "Bill Wright",
    title: "Chair",
    affiliation: "Chief Architect, Red Hat CTO Office",
    bio: "Enterprise Neurosystem is the brainchild of Bill Wright, arising out of his work with R&D leaders at major telcos in the Americas. Previously at Affirmed Networks (acquired by Microsoft) and VMware, he speaks frequently on AI and open source innovation.",
  },
  {
    name: "Dr. John Overton",
    title: "Vice Chair and Treasurer",
    affiliation: "Founder and CEO, Kove, Inc.",
    bio: "A founding member of the Enterprise Neurosystem community, John leads high-performance computing innovation and is committed to achieving new scale and ubiquity of adoption for AI/ML resources across the globe.",
  },
  {
    name: "Dinesh Verma",
    title: "Technical Committee Chair",
    affiliation: "Chief Scientist, Research Consulting Partnership, IBM T.J. Watson Research Center",
    bio: "Fellow of the UK Royal Academy of Engineering, IEEE Fellow, and IBM Fellow, Dinesh oversees technical direction and execution with over 15 years leading network science and distributed analytics internationally.",
  },
  {
    name: "Dr. Ryan Coffee",
    title: "REN/Gov Industry Lead",
    affiliation: "Senior Staff Research Scientist, Stanford Linear Accelerator Center (SLAC)",
    bio: "A core member of the SLAC AI Initiative, Ryan focuses on machine learning for real-time sensor edge extraction and the co-design of computing and sensor hardware.",
  },
  {
    name: "Vishnu Hari",
    title: "Financial Services Industry Lead",
    bio: "Currently building a stealth startup, Vishnu was previously a Product Manager at Meta AI, with experience across IBM, Accenture, and EY in AI engineering and product leadership.",
  },
  {
    name: "Dr. Tong Zhang",
    title: "Telco Industry Lead",
    affiliation: "Principal Engineer and Lead Architect, Network Platforms Group, Intel Corporation",
    bio: "Tong leads machine learning and deep learning architecture for network applications, previously serving as Principal Scientist at Hewlett-Packard Labs leading media analytics projects.",
  },
  {
    name: "Dennis O'Connell",
    title: "Board Member",
    affiliation: "Sr. Director, Yahoo Performance Engineering Team",
    bio: "Dennis leads technology vendor relations and server hardware strategy, managing a benchmarking lab and certification process while assisting business units in optimizing latency, throughput, and cost.",
  },
];
