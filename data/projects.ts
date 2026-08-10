export type Project = {
  name: string;
  description: string;
};

export type Deployment = {
  slug: string;
  name: string;
  location: string;
  summary: string;
  image: string;
  partners: string[];
  href: string;
};

export const deployments: Deployment[] = [
  {
    slug: "uganda",
    name: "Uganda National AI Sensor Network",
    location: "Bwindi Impenetrable Forest & Lake Victoria, Uganda",
    summary:
      "A national network of environmental sensors, approved for funding by Uganda's Minister of Science, Technology and Innovation. It starts at Bwindi's mountain gorilla habitat and a robotic AI sensor monitoring Lake Victoria's algal blooms. Data stays in Uganda, on Uganda's terms.",
    image: "/uganda/bwindi-gorilla.jpg",
    partners: ["Uganda STI Ministry", "JPL / Caltech", "Makerere University"],
    href: "/projects/uganda",
  },
  {
    slug: "jpl-dangermond",
    name: "Dangermond Preserve",
    location: "Santa Barbara County, California, USA",
    summary:
      "The first US deployment of the Enterprise Neurosystem architecture, a global data fabric integrating satellite data, atmospherics, ground sensors and multi-species analysis, developed with JPL/Caltech and The Nature Conservancy.",
    image: "/jpl/dangermond-coastline.jpg",
    partners: ["JPL / Caltech", "The Nature Conservancy", "NCEAS"],
    href: "/projects/dangermond",
  },
];

export const projects: Project[] = [
  {
    name: "Acoustic Analysis",
    description:
      "IBM-donated AI software examines acoustic variance in the field. Researchers observed that bee wing frequencies inside hives closely resemble wave frequency patterns produced by Tokamak Fusion Research at Stanford SLAC.",
  },
  {
    name: "Beehive Sensors",
    description:
      "US bee populations decline roughly 45% annually. Multi-function sensors detect ultrasonic signals, pollutants, and gas levels inside hives, running on AI Acoustics software donated freely by IBM Research.",
  },
  {
    name: "Mycorrhizal Network Sensors",
    description:
      "Underground fungal networks that support plant ecosystems display electrical patterns that may be akin to morse code, and could potentially represent a form of communication.",
  },
  {
    name: "Satellite Data Networking",
    description:
      "In collaboration with JPL, academic and industry researchers analyze ocean pollutants, beach plastics, methane plumes, and mass changes with coverage ranging from 9×9 meter to 200×200 mile spans.",
  },
  {
    name: "Telecommunications Research",
    description:
      "Led by Reliance Jio's VP with engineers from Verizon and other telecom firms, this project develops AI-enhanced 5G/6G frameworks for remote data transmission.",
  },
  {
    name: "Neurological Framework",
    description:
      "The community explores leveraging MEG research patterns for field architecture applications in both AI and network communications.",
  },
];
