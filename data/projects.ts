export type Project = {
  name: string;
  description: string;
};

export type Deployment = {
  slug: string;
  name: string;
  location: string;
  summary: string;
  /**
   * Photographs of the site, in the order the homepage card crossfades
   * through them. The first is the card's still frame (and its only frame
   * under reduced motion), so it must be the strongest. All are shown in a
   * 16/10 `object-cover` box; see CLAUDE.md before re-cropping the gorilla.
   */
  gallery: { src: string; alt: string }[];
  href: string;
};

export const deployments: Deployment[] = [
  {
    slug: "uganda",
    name: "Uganda National AI Sensor Network",
    location: "Bwindi Impenetrable Forest & Lake Victoria, Uganda",
    summary:
      "A national network of environmental sensors, approved for funding by Uganda's Minister of Science, Technology and Innovation. It starts at Bwindi's mountain gorilla habitat and a robotic AI sensor monitoring Lake Victoria's algal blooms. Data stays in Uganda, on Uganda's terms.",
    gallery: [
      { src: "/uganda/bwindi-gorilla.jpg", alt: "A mountain gorilla in Bwindi Impenetrable Forest" },
      { src: "/uganda/aerial-lake.jpg", alt: "Forested hills and a lake in south-west Uganda, seen from a light aircraft" },
      { src: "/uganda/team-and-rangers.jpg", alt: "Enterprise Neurosystem team with Uganda Wildlife Authority rangers" },
    ],
    href: "/projects/uganda",
  },
  {
    slug: "jpl-dangermond",
    name: "Dangermond Preserve",
    location: "Santa Barbara County, California, USA",
    summary:
      "The first US deployment of the Enterprise Neurosystem architecture: a global data fabric integrating satellite data, atmospherics, ground sensors and multi-species analysis, in partnership with JPL/Caltech.",
    gallery: [
      { src: "/jpl/dangermond-coastline.jpg", alt: "Sea cliffs and coastal scrub along the Dangermond Preserve shoreline" },
      { src: "/jpl/dangermond-historical-imagery-tool.jpg", alt: "The Dangermond Preserve historical imagery tool on a display, showing the preserve's boundary over satellite imagery" },
    ],
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
      "Led by engineers from Verizon and other telecom firms, this project develops AI-enhanced 5G/6G frameworks for remote data transmission.",
  },
  {
    name: "Neurological Framework",
    description:
      "The community explores leveraging MEG research patterns for field architecture applications in both AI and network communications.",
  },
];
