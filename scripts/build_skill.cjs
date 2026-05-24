const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function getRepoRoot() {
  return path.resolve(__dirname, "..");
}

function readPackageJson(repoRoot) {
  const packageJsonPath = path.join(repoRoot, "package.json");
  return JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const repoRoot = getRepoRoot();
  const pkg = readPackageJson(repoRoot);

  const skillsDir = path.join(repoRoot, "skills");
  if (!fs.existsSync(skillsDir)) {
    throw new Error(`Skills dir not found: ${skillsDir}`);
  }

  const distDir = path.join(repoRoot, "dist");
  ensureDir(distDir);

  const version = pkg.version || "0.0.0";

  // Discover all skill directories
  const skillNames = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith("."))
    .map(e => e.name);

  for (const skillName of skillNames) {
    const skillPath = path.join(skillsDir, skillName);
    const outputPath = path.join(distDir, `${skillName}-${version}.skill`);

    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath);
    }

    const result = spawnSync(
      "zip",
      ["-r", outputPath, ".", "-x", "*.DS_Store", "-x", "*/.DS_Store"],
      { cwd: skillPath, stdio: "inherit" }
    );

    if (result.error) {
      throw new Error(
        `Failed to run 'zip' for ${skillName}. Please ensure 'zip' is installed. ${result.error.message}`
      );
    }

    if (result.status !== 0) {
      process.exit(result.status);
    }

    process.stdout.write(`${outputPath}\n`);
  }
}

main();
