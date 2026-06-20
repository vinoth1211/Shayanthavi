/**
 * Copy portfolio images from assets/ to public/assets/ for Next.js static serving.
 * Run after adding or updating files in the assets/ folder.
 *
 * Usage: npm run sync-assets
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

const root = process.cwd();
const assetsDir = join(root, "assets");
const publicDir = join(root, "public", "assets");

function ensureDir(path: string) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function copy(src: string, dest: string) {
  if (!existsSync(src)) {
    console.warn(`  skip (missing): ${src}`);
    return;
  }
  ensureDir(join(dest, ".."));
  copyFileSync(src, dest);
  console.log(`  copied: ${dest.replace(root, ".")}`);
}

console.log("Syncing assets to public/assets/...\n");

ensureDir(join(publicDir, "hero"));
ensureDir(join(publicDir, "cv"));
ensureDir(join(publicDir, "projects", "project1"));
ensureDir(join(publicDir, "projects", "project2"));

copy(join(assetsDir, "hero", "heroImage.png"), join(publicDir, "hero", "heroImage.png"));
copy(
  join(assetsDir, "cv", "Shayanthavi-Tharmananthan.pdf"),
  join(publicDir, "cv", "Shayanthavi-Tharmananthan.pdf")
);

const project1Map: [string, string][] = [
  ["ss1/mock1.png", "projects/project1/mock1.png"],
  ["ss1/Screenshot 2025-10-31 140130.png", "projects/project1/ss1.png"],
  ["ss1/Screenshot 2025-10-31 142827.png", "projects/project1/ss2.png"],
  ["ss1/Screenshot 2025-10-31 143027.png", "projects/project1/ss3.png"],
  ["ss1/image.png", "projects/project1/ss4.png"],
];

const project2Map: [string, string][] = [
  ["ss2/mock2.png", "projects/project2/mock2.png"],
  ["ss2/Screenshot 2025-10-31 144217.png", "projects/project2/ss1.png"],
  ["ss2/Screenshot 2025-10-31 144306.png", "projects/project2/ss2.png"],
  ["ss2/Screenshot 2025-10-31 144424.png", "projects/project2/ss3.png"],
  ["ss2/Screenshot 2025-10-31 161238.png", "projects/project2/ss4.png"],
];

for (const [src, dest] of [...project1Map, ...project2Map]) {
  copy(join(assetsDir, ...src.split("/")), join(publicDir, ...dest.split("/")));
}

console.log("\nDone. Images are available at /assets/* when you run npm run dev.");
