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
      "AI-powered STEM learning platform for Ethiopian high school students, combining interactive learning, AI assistance, AR experiences, and digital laboratory content.",
    image: "/images/edutwin2.webp",
    technologies: [
      "React Native",
      "React",
      "Node.js",
      "MongoDB",
      "RAG",
      "AR",
    ],
    github: "https://github.com/tsi1221/BackendEduTwin",
    link: "https://edutwin-website.onrender.com/",
    reverse: false,
  },

  {
    id: 2,
    number: "02",
    title: "Blood Bank Management",
    category: "HEALTHCARE / WEB APP",
    year: "2026",
    location: "Ethiopia",
    description:
      "Streamlined blood donation management system for hospitals and donors to manage blood availability, donations, and essential inventory information.",
    image: "/images/Blood1.webp",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    github: "https://github.com/tsi1221",
    reverse: true,
  },

  {
    id: 3,
    number: "03",
    title: "MERN DevSecOps App",
    category: "DEVSECOPS / FULL-STACK",
    year: "2026",
    location: "Ethiopia",
    description:
      "Security-first full-stack application built with the MERN stack, featuring automated CI/CD workflows and containerized deployments.",
    image: "/images/user.webp",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Docker",
      "CI/CD",
    ],
    github: "https://github.com/tsi1221",
    reverse: false,
  },
];