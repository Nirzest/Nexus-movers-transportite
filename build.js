/**
 * NexusMove Build Script
 * Copies all production files into the /dist folder for Netlify deployment.
 */

const fs = require("fs");
const path = require("path");

const SRC = __dirname;
const DIST = path.join(__dirname, "dist");

// Files and folders to include in the build
const INCLUDE = [
  "index.html",
  "app.js",
  "style.css",
  "data.js",
  "assets",
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function copyFileSync(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function rmDirSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

// ── Build ─────────────────────────────────────────────────────────────────────

console.log("\n🚀 NexusMove Build Starting...\n");

// Clean old dist
console.log("  🧹 Cleaning old /dist folder...");
rmDirSync(DIST);
fs.mkdirSync(DIST);

// Copy each target file/folder
let fileCount = 0;
for (const item of INCLUDE) {
  const srcPath = path.join(SRC, item);
  const destPath = path.join(DIST, item);

  if (!fs.existsSync(srcPath)) {
    console.warn(`  ⚠️  Skipping missing: ${item}`);
    continue;
  }

  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) {
    console.log(`  📁 Copying folder: ${item}/`);
    copyDirSync(srcPath, destPath);

    // Count files in folder
    const count = fs.readdirSync(srcPath, { recursive: true }).filter(
      (f) => !fs.statSync(path.join(srcPath, f.toString())).isDirectory()
    ).length;
    fileCount += count;
  } else {
    console.log(`  📄 Copying file:   ${item}`);
    copyFileSync(srcPath, destPath);
    fileCount++;
  }
}

console.log(`\n✅ Build complete! ${fileCount} files copied to /dist`);
console.log(`📂 Output: ${DIST}`);
console.log("\n🌐 To preview locally, run:   npm run preview");
console.log("☁️  To deploy, drag the /dist folder to https://app.netlify.com/drop\n");
