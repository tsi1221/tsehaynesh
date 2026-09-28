import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "EduTwin Simplified",
    category: "AI / EDUCATION",
    year: "2026",
    location: "Jimma, Ethiopia",
    description:
      "AI-powered STEM learning platform for Ethiopian high school students, combining mobile learning, AI assistance, AR experiences, and interactive educational content.",
    image: "/images/edutwin.webp",
    technologies: [
      "React Native",
      "Expo",
      "Node.js",
      "MongoDB",
      "RAG",
      "AR",
    ],
    github: "https://github.com/tsi1221",
    reverse: false,
  },

  {
    id: 2,
    number: "02",
    title: "True Markets",
    category: "FINTECH / MOBILE",
    year: "2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "A mobile wealth experience designed around accessible financial information and market education for Ethiopian users.",
    image: "/images/marketplace.webp",
    technologies: [
      "React Native",
      "Expo",
      "Node.js",
      "MongoDB",
      "TypeScript",
    ],
    github: "https://github.com/tsi1221",
    reverse: true,
  },

  {
    id: 3,
    number: "03",
    title: "Nablis",
    category: "WEB GAME",
    year: "2026",
    location: "Addis Ababa, Ethiopia",
    description:
      "A lightweight Telegram Mini App game built around a simple drop, merge, and score gameplay loop.",
    image: "/images/nablis.webp",
    technologies: [
      "React",
      "TypeScript",
      "Phaser",
      "Telegram Mini Apps",
    ],
    github: "https://github.com/tsi1221/Nablis",
    link: "https://nablis-kappa.vercel.app/",
    reverse: false,
  },

  {
    id: 4,
    number: "04",
    title: "SyncBoard",
    category: "COLLABORATION",
    year: "2026",
    location: "Ethiopia",
    description:
      "A collaborative workspace interface designed to help teams organize work, communicate, and stay synchronized.",
    image: "/images/syncboard.webp",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lucide",
    ],
    github: "https://github.com/tsi1221",
    reverse: true,
  },
];