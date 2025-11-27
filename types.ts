export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  tags: string[];
  image: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface ProfileData {
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface AppData {
  profile: ProfileData;
  services: Service[];
  experience: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
  skills: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
}