export type Project = {
  name: string;
  description: string;
};

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
    name: "Mussel Farms and Beds",
    description:
      "Robotic mussels detect pollutants, oxygen levels, chemical markers, and bacteria, developed for deployment in global riverways.",
  },
  {
    name: "Satellite Data Networking",
    description:
      "Academic and industry researchers analyze ocean pollutants, beach plastics, methane plumes, and mass changes with coverage ranging from 9×9 meter to 200×200 mile spans.",
  },
  {
    name: "Catfish and Tilapia Farming",
    description:
      "Working directly with Ghanaian fish farmers, the community builds sensors and AI software addressing climate impacts on aquaculture populations.",
  },
  {
    name: "Telecommunications Research",
    description:
      "Led by Reliance Jio's VP with engineers from Verizon and other telecom firms, this project develops AI-enhanced 5G/6G frameworks for remote data transmission.",
  },
  {
    name: "Federated AI",
    description:
      "IBM Research leads development of frameworks that maintain data security while enabling decentralized AI training across multiple sensor layers.",
  },
  {
    name: "Human Brain Communication Networks",
    description:
      "The community explores leveraging MEG research patterns for field architecture applications in both AI and network communications.",
  },
];

export type Workstream = {
  name: string;
  description: string;
  repoUrl: string;
};

export const workstreams: Workstream[] = [
  {
    name: "Self-Describing Digital Asset Catalog",
    description:
      "The core framework where AI models reside and operate — a foundation eventually supporting a cross-correlation AI engine for deeper pattern analysis.",
    repoUrl: "https://github.com/Enterprise-Neurosystem/sd-catalog",
  },
  {
    name: "AI Signal Processing",
    description:
      "Tools and solutions that process high-rate signal data for acoustics, vibrations, and other areas of analysis — including work to study global bee populations. Originated as an open source contribution from IBM Research.",
    repoUrl: "https://github.com/Enterprise-Neurosystem/ai-signal-processing",
  },
];
