export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  image: string;
  /* Optional — shown as a small green tag on the card */
  category?: string;
  /* Optional — link to verify */
  link?: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "1st Place · Final Year Project",
    issuer: "Jimma University",
    date: "2026",
    category: "Award",
    description:
      "AI-powered STEM learning platform for Ethiopian high school students.",
    image: "/images/ceritificate.png",
  },
  {
    id: 2,
    title: "Outstanding Achievement",
    issuer: "Jimma University",
    date: "2026",
    category: "Award",
    description: "Recognized for outstanding final year project delivery.",
    image: "/images/ceritificate1.png",
  },

  /* 👇 Add your new ones here — just keep the same shape */
  {
    id: 3,
    title: "Your Certificate Title",
    issuer: "Issuing Organization",
    date: "2025",
    category: "Course",
    description: "Short line describing what this cert is for.",
    image: "/images/cert3.webp",
    link: "https://verify.example.com/abc123",
  },
];