import {
  pgTable,
  serial,
  text,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteTitle: text("site_title").notNull().default("Shayanthavi Tharmananthan | Portfolio"),
  metaDescription: text("meta_description").notNull().default(""),
  logoInitials: text("logo_initials").notNull().default("ST"),
  footerCopyright: text("footer_copyright").notNull().default("Shayanthavi Tharmananthan"),
  navItems: jsonb("nav_items").$type<{ name: string; href: string }[]>().notNull().default([]),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const hero = pgTable("hero", {
  id: serial("id").primaryKey(),
  greeting: text("greeting").notNull().default("HELLO! I'M"),
  name: text("name").notNull().default(""),
  tagline: text("tagline").notNull().default(""),
  university: text("university").notNull().default(""),
  heroImageUrl: text("hero_image_url").notNull().default(""),
  cvUrl: text("cv_url").notNull().default(""),
  cvDownloadName: text("cv_download_name").notNull().default("CV.pdf"),
  ctaLabel: text("cta_label").notNull().default("Hire Me"),
  ctaHref: text("cta_href").notNull().default("#contact"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const aboutSection = pgTable("about_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("About Me"),
  intro: text("intro").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const aboutCards = pgTable("about_cards", {
  id: serial("id").primaryKey(),
  aboutSectionId: integer("about_section_id").notNull().default(1),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconKey: text("icon_key").notNull().default("FaLaptopCode"),
  gradient: text("gradient").notNull().default("from-teal to-teal-dark"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const skillsSection = pgTable("skills_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("Technologies & Tools"),
  subtitle: text("subtitle").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skillItems = pgTable("skill_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  iconKey: text("icon_key").notNull().default("SiReact"),
  color: text("color").notNull().default("#000000"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const experienceSection = pgTable("experience_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("Experience"),
  subtitle: text("subtitle").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const experiencePositions = pgTable("experience_positions", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  duration: text("duration").notNull(),
  location: text("location").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const experienceProjects = pgTable("experience_projects", {
  id: serial("id").primaryKey(),
  positionId: integer("position_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  role: text("role").notNull(),
  technologies: jsonb("technologies").$type<{ name: string; iconKey: string; color: string }[]>().notNull().default([]),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projectsSection = pgTable("projects_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("My Projects"),
  subtitle: text("subtitle").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  skills: jsonb("skills").$type<string[]>().notNull().default([]),
  demoUrl: text("demo_url").notNull().default(""),
  mainImageUrl: text("main_image_url").notNull().default(""),
  color: text("color").notNull().default("from-teal to-teal-dark"),
  bgGradient: text("bg_gradient").notNull().default("from-teal/10 to-olive/10"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projectScreenshots = pgTable("project_screenshots", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const contactSection = pgTable("contact_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("Let's Connect"),
  subtitle: text("subtitle").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  location: text("location").notNull().default(""),
  socialLinks: jsonb("social_links").$type<{ name: string; url: string; iconKey: string; color: string }[]>().notNull().default([]),
  socialNote: text("social_note").notNull().default("Feel free to connect with me on social media or reach out via email!"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type Hero = typeof hero.$inferSelect;
export type AboutCard = typeof aboutCards.$inferSelect;
export type SkillItem = typeof skillItems.$inferSelect;
export type ExperiencePosition = typeof experiencePositions.$inferSelect;
export type ExperienceProject = typeof experienceProjects.$inferSelect;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type ProjectScreenshot = typeof projectScreenshots.$inferSelect;
export type ContactSection = typeof contactSection.$inferSelect;
