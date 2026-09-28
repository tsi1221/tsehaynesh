export interface Project {
  id: number;
  number: string;
  title: string;
  category: string;
  year: string;
  location: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  reverse?: boolean;
}

export interface ExperienceItem {
  id: number;
  year: string;
  company: string;
  position: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  category: string;
}