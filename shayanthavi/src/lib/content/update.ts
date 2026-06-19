import { eq } from "drizzle-orm";
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
  ProjectData,
} from "./types";

export async function updateSiteSettings(data: SiteSettingsData) {
  const [existing] = await db.select().from(siteSettings).limit(1);
  if (existing) {
    await db
      .update(siteSettings)
      .set({
        siteTitle: data.siteTitle,
        metaDescription: data.metaDescription,
        logoInitials: data.logoInitials,
        footerCopyright: data.footerCopyright,
        navItems: data.navItems,
        updatedAt: new Date(),
      })
      .where(eq(siteSettings.id, existing.id));
  } else {
    await db.insert(siteSettings).values(data);
  }
}

export async function updateHero(data: HeroData) {
  const [existing] = await db.select().from(hero).limit(1);
  if (existing) {
    await db
      .update(hero)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(hero.id, existing.id));
  } else {
    await db.insert(hero).values(data);
  }
}

export async function updateAbout(data: AboutData) {
  const [existing] = await db.select().from(aboutSection).limit(1);
  let sectionId = existing?.id ?? 1;

  if (existing) {
    await db
      .update(aboutSection)
      .set({ heading: data.heading, intro: data.intro, updatedAt: new Date() })
      .where(eq(aboutSection.id, existing.id));
  } else {
    const [inserted] = await db
      .insert(aboutSection)
      .values({ heading: data.heading, intro: data.intro })
      .returning();
    sectionId = inserted.id;
  }

  await db.delete(aboutCards);
  if (data.cards.length > 0) {
    await db.insert(aboutCards).values(
      data.cards.map((card, index) => ({
        aboutSectionId: sectionId,
        title: card.title,
        description: card.description,
        iconKey: card.iconKey,
        gradient: card.gradient,
        sortOrder: card.sortOrder ?? index,
      }))
    );
  }
}

export async function updateSkills(data: SkillsData) {
  const [existing] = await db.select().from(skillsSection).limit(1);
  if (existing) {
    await db
      .update(skillsSection)
      .set({ heading: data.heading, subtitle: data.subtitle, updatedAt: new Date() })
      .where(eq(skillsSection.id, existing.id));
  } else {
    await db.insert(skillsSection).values({ heading: data.heading, subtitle: data.subtitle });
  }

  await db.delete(skillItems);
  if (data.items.length > 0) {
    await db.insert(skillItems).values(
      data.items.map((item, index) => ({
        name: item.name,
        iconKey: item.iconKey,
        color: item.color,
        sortOrder: item.sortOrder ?? index,
      }))
    );
  }
}

export async function updateExperience(data: ExperienceData) {
  const [existing] = await db.select().from(experienceSection).limit(1);
  if (existing) {
    await db
      .update(experienceSection)
      .set({ heading: data.heading, subtitle: data.subtitle, updatedAt: new Date() })
      .where(eq(experienceSection.id, existing.id));
  } else {
    await db.insert(experienceSection).values({ heading: data.heading, subtitle: data.subtitle });
  }

  await db.delete(experienceProjects);
  await db.delete(experiencePositions);

  for (const [posIndex, position] of data.positions.entries()) {
    const [insertedPos] = await db
      .insert(experiencePositions)
      .values({
        role: position.role,
        company: position.company,
        duration: position.duration,
        location: position.location,
        sortOrder: position.sortOrder ?? posIndex,
      })
      .returning();

    if (position.projects.length > 0) {
      await db.insert(experienceProjects).values(
        position.projects.map((proj, projIndex) => ({
          positionId: insertedPos.id,
          name: proj.name,
          description: proj.description,
          role: proj.role,
          technologies: proj.technologies,
          highlights: proj.highlights,
          sortOrder: proj.sortOrder ?? projIndex,
        }))
      );
    }
  }
}

export async function updateProjectsSection(data: Omit<ProjectsData, "projects">) {
  const [existing] = await db.select().from(projectsSection).limit(1);
  if (existing) {
    await db
      .update(projectsSection)
      .set({ heading: data.heading, subtitle: data.subtitle, updatedAt: new Date() })
      .where(eq(projectsSection.id, existing.id));
  } else {
    await db.insert(projectsSection).values({ heading: data.heading, subtitle: data.subtitle });
  }
}

export async function createProject(data: ProjectData) {
  const [inserted] = await db
    .insert(portfolioProjects)
    .values({
      title: data.title,
      description: data.description,
      skills: data.skills,
      demoUrl: data.demoUrl,
      mainImageUrl: data.mainImageUrl,
      color: data.color,
      bgGradient: data.bgGradient,
      sortOrder: data.sortOrder,
    })
    .returning();

  if (data.screenshots.length > 0) {
    await db.insert(projectScreenshots).values(
      data.screenshots.map((s, index) => ({
        projectId: inserted.id,
        imageUrl: s.imageUrl,
        sortOrder: s.sortOrder ?? index,
      }))
    );
  }

  return inserted;
}

export async function updateProject(id: number, data: ProjectData) {
  await db
    .update(portfolioProjects)
    .set({
      title: data.title,
      description: data.description,
      skills: data.skills,
      demoUrl: data.demoUrl,
      mainImageUrl: data.mainImageUrl,
      color: data.color,
      bgGradient: data.bgGradient,
      sortOrder: data.sortOrder,
    })
    .where(eq(portfolioProjects.id, id));

  await db.delete(projectScreenshots).where(eq(projectScreenshots.projectId, id));

  if (data.screenshots.length > 0) {
    await db.insert(projectScreenshots).values(
      data.screenshots.map((s, index) => ({
        projectId: id,
        imageUrl: s.imageUrl,
        sortOrder: s.sortOrder ?? index,
      }))
    );
  }
}

export async function deleteProject(id: number) {
  await db.delete(projectScreenshots).where(eq(projectScreenshots.projectId, id));
  await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
}

export async function replaceAllProjects(data: ProjectsData) {
  await updateProjectsSection({ heading: data.heading, subtitle: data.subtitle });
  await db.delete(projectScreenshots);
  await db.delete(portfolioProjects);

  for (const [index, project] of data.projects.entries()) {
    await createProject({ ...project, sortOrder: project.sortOrder ?? index });
  }
}

export async function updateContact(data: ContactData) {
  const [existing] = await db.select().from(contactSection).limit(1);
  if (existing) {
    await db
      .update(contactSection)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contactSection.id, existing.id));
  } else {
    await db.insert(contactSection).values(data);
  }
}
