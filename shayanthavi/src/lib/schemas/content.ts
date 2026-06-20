import { z } from "zod";

export const navItemSchema = z.object({
  name: z.string().min(1),
  href: z.string().min(1),
});

export const siteSettingsSchema = z.object({
  siteTitle: z.string().min(1),
  metaDescription: z.string(),
  logoInitials: z.string().min(1).max(4),
  footerCopyright: z.string().min(1),
  navItems: z.array(navItemSchema),
});

export const heroSchema = z.object({
  greeting: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(1),
  university: z.string(),
  heroImageUrl: z.string(),
  cvUrl: z.string(),
  cvDownloadName: z.string(),
  ctaLabel: z.string().min(1),
  ctaHref: z.string().min(1),
});

export const aboutCardSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  iconKey: z.string().min(1),
  gradient: z.string().min(1),
  sortOrder: z.number(),
});

export const aboutSchema = z.object({
  heading: z.string().min(1),
  intro: z.string().min(1),
  cards: z.array(aboutCardSchema),
});

export const skillItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  iconKey: z.string().min(1),
  color: z.string().min(1),
  sortOrder: z.number(),
});

export const skillsSchema = z.object({
  heading: z.string().min(1),
  subtitle: z.string(),
  items: z.array(skillItemSchema),
});

export const experienceTechSchema = z.object({
  name: z.string().min(1),
  iconKey: z.string().min(1),
  color: z.string().min(1),
});

export const experienceProjectSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  role: z.string().min(1),
  technologies: z.array(experienceTechSchema),
  highlights: z.array(z.string()),
  sortOrder: z.number(),
});

export const experiencePositionSchema = z.object({
  id: z.number().optional(),
  role: z.string().min(1),
  company: z.string().min(1),
  duration: z.string().min(1),
  location: z.string().min(1),
  sortOrder: z.number(),
  projects: z.array(experienceProjectSchema),
});

export const experienceSchema = z.object({
  heading: z.string().min(1),
  subtitle: z.string(),
  positions: z.array(experiencePositionSchema),
});

export const screenshotSchema = z.object({
  id: z.number().optional(),
  imageUrl: z.string().min(1),
  sortOrder: z.number(),
});

export const projectSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  skills: z.array(z.string()),
  demoUrl: z.string(),
  mainImageUrl: z.string(),
  color: z.string(),
  bgGradient: z.string(),
  sortOrder: z.number(),
  screenshots: z.array(screenshotSchema),
});

export const projectsSchema = z.object({
  heading: z.string().min(1),
  subtitle: z.string(),
  projects: z.array(projectSchema),
});

export const socialLinkSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  iconKey: z.string().min(1),
  color: z.string().min(1),
});

export const contactSchema = z.object({
  heading: z.string().min(1),
  subtitle: z.string(),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  socialLinks: z.array(socialLinkSchema),
  socialNote: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
