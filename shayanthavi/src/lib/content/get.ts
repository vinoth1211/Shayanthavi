import { eq, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  siteSettings,
  hero,
  aboutSection,
  aboutCards,
  skillsSection,
  skillItems,
  experienceSection,
  experiencePositions,
  experienceProjects,
  projectsSection,
  portfolioProjects,
  projectScreenshots,
  contactSection,
} from "../../../drizzle/schema";
import type {
  SiteSettingsData,
  HeroData,
  AboutData,
  SkillsData,
  ExperienceData,
  ProjectsData,
  ContactData,
  PortfolioContent,
} from "./types";

const defaultNavItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const [row] = await db.select().from(siteSettings).limit(1);
  if (!row) {
    return {
      siteTitle: "Shayanthavi Tharmananthan | Portfolio",
      metaDescription: "Portfolio of Shayanthavi Tharmananthan",
      logoInitials: "ST",
      footerCopyright: "Shayanthavi Tharmananthan",
      navItems: defaultNavItems,
    };
  }
  return {
    siteTitle: row.siteTitle,
    metaDescription: row.metaDescription,
    logoInitials: row.logoInitials,
    footerCopyright: row.footerCopyright,
    navItems: (row.navItems as SiteSettingsData["navItems"]) ?? defaultNavItems,
  };
}

export async function getHero(): Promise<HeroData> {
  const [row] = await db.select().from(hero).limit(1);
  if (!row) {
    return {
      greeting: "HELLO! I'M",
      name: "Shayanthavi Tharmananthan",
      tagline: "Creative Computer Engineering Undergraduate & Developer",
      university: "University of Ruhuna",
      heroImageUrl: "/assets/hero/heroImage.png",
      cvUrl: "/assets/cv/Shayanthavi-Tharmananthan.pdf",
      cvDownloadName: "Shayanthavi-Tharmananthan.pdf",
      ctaLabel: "Hire Me",
      ctaHref: "#contact",
    };
  }
  return {
    greeting: row.greeting,
    name: row.name,
    tagline: row.tagline,
    university: row.university,
    heroImageUrl: row.heroImageUrl,
    cvUrl: row.cvUrl,
    cvDownloadName: row.cvDownloadName,
    ctaLabel: row.ctaLabel,
    ctaHref: row.ctaHref,
  };
}

export async function getAbout(): Promise<AboutData> {
  const [section] = await db.select().from(aboutSection).limit(1);
  const cards = await db
    .select()
    .from(aboutCards)
    .orderBy(asc(aboutCards.sortOrder));

  return {
    heading: section?.heading ?? "About Me",
    intro: section?.intro ?? "",
    cards: cards.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      iconKey: c.iconKey,
      gradient: c.gradient,
      sortOrder: c.sortOrder,
    })),
  };
}

export async function getSkills(): Promise<SkillsData> {
  const [section] = await db.select().from(skillsSection).limit(1);
  const items = await db
    .select()
    .from(skillItems)
    .orderBy(asc(skillItems.sortOrder));

  return {
    heading: section?.heading ?? "Technologies & Tools",
    subtitle: section?.subtitle ?? "",
    items: items.map((s) => ({
      id: s.id,
      name: s.name,
      iconKey: s.iconKey,
      color: s.color,
      sortOrder: s.sortOrder,
    })),
  };
}

export async function getExperience(): Promise<ExperienceData> {
  const [section] = await db.select().from(experienceSection).limit(1);
  const positions = await db
    .select()
    .from(experiencePositions)
    .orderBy(asc(experiencePositions.sortOrder));

  const projects = await db
    .select()
    .from(experienceProjects)
    .orderBy(asc(experienceProjects.sortOrder));

  return {
    heading: section?.heading ?? "Experience",
    subtitle: section?.subtitle ?? "",
    positions: positions.map((p) => ({
      id: p.id,
      role: p.role,
      company: p.company,
      duration: p.duration,
      location: p.location,
      sortOrder: p.sortOrder,
      projects: projects
        .filter((proj) => proj.positionId === p.id)
        .map((proj) => ({
          id: proj.id,
          name: proj.name,
          description: proj.description,
          role: proj.role,
          technologies: proj.technologies as ExperienceData["positions"][0]["projects"][0]["technologies"],
          highlights: proj.highlights as string[],
          sortOrder: proj.sortOrder,
        })),
    })),
  };
}

export async function getProjects(): Promise<ProjectsData> {
  const [section] = await db.select().from(projectsSection).limit(1);
  const projects = await db
    .select()
    .from(portfolioProjects)
    .orderBy(asc(portfolioProjects.sortOrder));
  const screenshots = await db
    .select()
    .from(projectScreenshots)
    .orderBy(asc(projectScreenshots.sortOrder));

  return {
    heading: section?.heading ?? "My Projects",
    subtitle: section?.subtitle ?? "",
    projects: projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      skills: p.skills as string[],
      demoUrl: p.demoUrl,
      mainImageUrl: p.mainImageUrl,
      color: p.color,
      bgGradient: p.bgGradient,
      sortOrder: p.sortOrder,
      screenshots: screenshots
        .filter((s) => s.projectId === p.id)
        .map((s) => ({
          id: s.id,
          imageUrl: s.imageUrl,
          sortOrder: s.sortOrder,
        })),
    })),
  };
}

export async function getContact(): Promise<ContactData> {
  const [row] = await db.select().from(contactSection).limit(1);
  if (!row) {
    return {
      heading: "Let's Connect",
      subtitle: "Have a project in mind or just want to chat? Feel free to reach out!",
      email: "sayanthavitharmaa13@gmail.com",
      phone: "+94 763650199",
      location: "No.15/1, Krishnar kovil road,Kallady, Batticaloa, Sri Lanka",
      socialLinks: [],
      socialNote: "Feel free to connect with me on social media or reach out via email!",
    };
  }
  return {
    heading: row.heading,
    subtitle: row.subtitle,
    email: row.email,
    phone: row.phone,
    location: row.location,
    socialLinks: row.socialLinks as ContactData["socialLinks"],
    socialNote: row.socialNote,
  };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const [settings, heroData, about, skills, experience, projects, contact] =
    await Promise.all([
      getSiteSettings(),
      getHero(),
      getAbout(),
      getSkills(),
      getExperience(),
      getProjects(),
      getContact(),
    ]);

  return { settings, hero: heroData, about, skills, experience, projects, contact };
}
