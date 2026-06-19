export interface NavItem {
  name: string;
  href: string;
}

export interface SiteSettingsData {
  siteTitle: string;
  metaDescription: string;
  logoInitials: string;
  footerCopyright: string;
  navItems: NavItem[];
}

export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  university: string;
  heroImageUrl: string;
  cvUrl: string;
  cvDownloadName: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface AboutCardData {
  id?: number;
  title: string;
  description: string;
  iconKey: string;
  gradient: string;
  sortOrder: number;
}

export interface AboutData {
  heading: string;
  intro: string;
  cards: AboutCardData[];
}

export interface SkillItemData {
  id?: number;
  name: string;
  iconKey: string;
  color: string;
  sortOrder: number;
}

export interface SkillsData {
  heading: string;
  subtitle: string;
  items: SkillItemData[];
}

export interface ExperienceTech {
  name: string;
  iconKey: string;
  color: string;
}

export interface ExperienceProjectData {
  id?: number;
  name: string;
  description: string;
  role: string;
  technologies: ExperienceTech[];
  highlights: string[];
  sortOrder: number;
}

export interface ExperiencePositionData {
  id?: number;
  role: string;
  company: string;
  duration: string;
  location: string;
  sortOrder: number;
  projects: ExperienceProjectData[];
}

export interface ExperienceData {
  heading: string;
  subtitle: string;
  positions: ExperiencePositionData[];
}

export interface ProjectData {
  id?: number;
  title: string;
  description: string;
  skills: string[];
  demoUrl: string;
  mainImageUrl: string;
  color: string;
  bgGradient: string;
  sortOrder: number;
  screenshots: { id?: number; imageUrl: string; sortOrder: number }[];
}

export interface ProjectsData {
  heading: string;
  subtitle: string;
  projects: ProjectData[];
}

export interface SocialLink {
  name: string;
  url: string;
  iconKey: string;
  color: string;
}

export interface ContactData {
  heading: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  socialNote: string;
}

export interface PortfolioContent {
  settings: SiteSettingsData;
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  experience: ExperienceData;
  projects: ProjectsData;
  contact: ContactData;
}
