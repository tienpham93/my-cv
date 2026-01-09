
export interface Experience {
  company: string;
  client?: string;
  location: string;
  role: string;
  period: string;
  product?: string;
  team?: string;
  bullets: string[];
}

export interface Certification {
  name: string;
  url?: string;
  note?: string;
}

export interface CVData {
  name: string;
  avatar?: string;
  title: string;
  contact: {
    location: string;
    phone: string;
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
  education: {
    school: string;
    location: string;
    degree: string;
    period: string;
  };
}

export type ImageSize = '1K' | '2K' | '4K';
