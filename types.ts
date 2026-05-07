
export interface Experience {
  company: string;
  client?: string;
  location: string;
  role: string;
  period: string;
  product?: string;
  team?: string;
  onSite?: string;
  bullets: string[];
  forcePageBreak?: boolean;
}

export interface Certification {
  name: string;
  url?: string;
  note?: string;
}

export interface Project {
  name: string;
  url?: string;
  description: string;
  bullets: string[];
  diagram?: string;
  image?: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  association?: string;
  description: string;
  image?: string;
}

export interface CVData {
  name: string;
  avatar?: string;
  title: string;
  contact: {
    location: string;
    phone: string;
    locationSecondary?: string;
    phoneSecondary?: string;
    email: string;
    linkedin: string;
  };
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: Experience[];
  certifications: Certification[];
  personalProjects?: Project[];
  honorsAndAwards?: Award[];
  education: {
    school: string;
    location: string;
    degree: string;
    period: string;
  };
}

export type ImageSize = '1K' | '2K' | '4K';
