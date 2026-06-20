/**
 * Upload local assets from public/assets/ to Vercel Blob.
 * Requires BLOB_READ_WRITE_TOKEN and DATABASE_URL in environment.
 *
 * Usage: npm run upload-assets
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../drizzle/schema";

const ASSETS_DIR = join(process.cwd(), "public", "assets");
const token = process.env.BLOB_READ_WRITE_TOKEN;
const blobAccess = (process.env.BLOB_ACCESS?.toLowerCase() === "public" ? "public" : "private") as
  | "public"
  | "private";

function walkDir(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN is required");
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const files = walkDir(ASSETS_DIR);
  if (files.length === 0) {
    console.log("No files found in public/assets/. Place images there first.");
    return;
  }

  const urlMap = new Map<string, string>();

  for (const filePath of files) {
    const relPath = "/" + relative(join(process.cwd(), "public"), filePath).replace(/\\/g, "/");
    const buffer = readFileSync(filePath);
    const blob = await put(`portfolio${relPath}`, buffer, {
      access: blobAccess,
      token,
    });
    urlMap.set(relPath, blob.url);
    console.log(`Uploaded ${relPath} -> ${blob.url}`);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  const [heroRow] = await db.select().from(schema.hero).limit(1);
  if (heroRow && urlMap.has(heroRow.heroImageUrl)) {
    await db
      .update(schema.hero)
      .set({ heroImageUrl: urlMap.get(heroRow.heroImageUrl)! })
      .where(eq(schema.hero.id, heroRow.id));
  }
  if (heroRow && urlMap.has(heroRow.cvUrl)) {
    await db
      .update(schema.hero)
      .set({ cvUrl: urlMap.get(heroRow.cvUrl)! })
      .where(eq(schema.hero.id, heroRow.id));
  }

  const screenshots = await db.select().from(schema.projectScreenshots);
  for (const ss of screenshots) {
    if (urlMap.has(ss.imageUrl)) {
      await db
        .update(schema.projectScreenshots)
        .set({ imageUrl: urlMap.get(ss.imageUrl)! })
        .where(eq(schema.projectScreenshots.id, ss.id));
    }
  }

  const projects = await db.select().from(schema.portfolioProjects);
  for (const p of projects) {
    if (urlMap.has(p.mainImageUrl)) {
      await db
        .update(schema.portfolioProjects)
        .set({ mainImageUrl: urlMap.get(p.mainImageUrl)! })
        .where(eq(schema.portfolioProjects.id, p.id));
    }
  }

  console.log("Database URLs updated with Blob links.");
}

main().catch(console.error);
