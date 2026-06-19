import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import {
  getHero,
  getAbout,
  getSkills,
  getExperience,
  getProjects,
  getContact,
  getSiteSettings,
  updateHero,
  updateAbout,
  updateSkills,
  updateExperience,
  replaceAllProjects,
  updateContact,
  updateSiteSettings,
} from "@/lib/content";
import {
  heroSchema,
  aboutSchema,
  skillsSchema,
  experienceSchema,
  projectsSchema,
  contactSchema,
  siteSettingsSchema,
} from "@/lib/schemas/content";

type Section = "hero" | "about" | "skills" | "experience" | "projects" | "contact" | "settings";

const getters: Record<Section, () => Promise<unknown>> = {
  hero: getHero,
  about: getAbout,
  skills: getSkills,
  experience: getExperience,
  projects: getProjects,
  contact: getContact,
  settings: getSiteSettings,
};

const updaters: Record<Section, (data: never) => Promise<void>> = {
  hero: updateHero as (data: never) => Promise<void>,
  about: updateAbout as (data: never) => Promise<void>,
  skills: updateSkills as (data: never) => Promise<void>,
  experience: updateExperience as (data: never) => Promise<void>,
  projects: replaceAllProjects as (data: never) => Promise<void>,
  contact: updateContact as (data: never) => Promise<void>,
  settings: updateSiteSettings as (data: never) => Promise<void>,
};

const schemas: Record<Section, { parse: (data: unknown) => unknown }> = {
  hero: heroSchema,
  about: aboutSchema,
  skills: skillsSchema,
  experience: experienceSchema,
  projects: projectsSchema,
  contact: contactSchema,
  settings: siteSettingsSchema,
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  if (!(section in getters)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 404 });
  }

  try {
    const data = await getters[section as Section]();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`GET /api/content/${section}:`, error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { error } = await requireAuth();
  if (error) return error;

  const { section } = await params;
  if (!(section in updaters)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const parsed = schemas[section as Section].parse(body);
    await updaters[section as Section](parsed as never);
    const updated = await getters[section as Section]();
    return NextResponse.json(updated);
  } catch (error) {
    console.error(`PUT /api/content/${section}:`, error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: error }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
