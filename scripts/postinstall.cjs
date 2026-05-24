const fs = require("node:fs/promises");
const path = require("node:path");

function parseArgs(argv) {
  const args = new Set(argv);
  const getValue = (name) => {
    const index = argv.indexOf(name);
    if (index === -1) return undefined;
    return argv[index + 1];
  };
  return {
    dryRun: args.has("--dry-run"),
    force: args.has("--force"),
    target: getValue("--target"),
    skillDir: getValue("--skill-dir") || getValue("--target-skill-dir"),
    skillsDir: getValue("--skills-dir") || getValue("--target-skills-dir"),
  };
}

async function pathExists(filePath) {
  try {
    await fs.stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function removeDirRecursive(dirPath) {
  const stat = await fs.lstat(dirPath);
  if (!stat.isDirectory()) {
    await fs.unlink(dirPath);
    return;
  }

  const entries = await fs.readdir(dirPath);
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dirPath, entry);
      await removeDirRecursive(entryPath);
    }),
  );

  await fs.rmdir(dirPath);
}

async function copyDirRecursive(fromDir, toDir) {
  await fs.mkdir(toDir, { recursive: true });
  const entries = await fs.readdir(fromDir, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const fromPath = path.join(fromDir, entry.name);
      const toPath = path.join(toDir, entry.name);

      if (entry.isDirectory()) {
        await copyDirRecursive(fromPath, toPath);
        return;
      }

      if (entry.isSymbolicLink()) {
        const linkTarget = await fs.readlink(fromPath);
        try {
          await fs.unlink(toPath);
        } catch {}
        await fs.symlink(linkTarget, toPath);
        return;
      }

      await fs.copyFile(fromPath, toPath);
    }),
  );
}

async function main() {
  const { dryRun, force, target, skillDir, skillsDir } = parseArgs(process.argv.slice(2));

  const packageRoot = path.resolve(__dirname, "..");
  const sourceSkillsDir = path.join(packageRoot, "skills");
  const initCwd = target || process.env.INIT_CWD || process.cwd();
  const resolvedSkillsDir =
    skillsDir && path.resolve(initCwd, skillsDir);
  const resolvedSkillDir =
    skillDir && path.resolve(initCwd, skillDir);
  const targetSkillsDir =
    resolvedSkillsDir ||
    path.dirname(
      resolvedSkillDir ||
      path.join(initCwd, ".trae", "skills", "visual-spec"));

  if (!(await pathExists(sourceSkillsDir))) {
    throw new Error(`Skills source directory not found: ${sourceSkillsDir}`);
  }

  if (!force && path.resolve(initCwd) === packageRoot) {
    if (!dryRun) return;
  }

  // Discover all skill directories
  const sourceEntries = await fs.readdir(sourceSkillsDir, { withFileTypes: true });
  const skillNames = resolvedSkillDir
    ? [path.basename(resolvedSkillDir)]  // Single skill install
    : sourceEntries
        .filter(e => e.isDirectory() && !e.name.startsWith("."))
        .map(e => e.name);

  if (dryRun) {
    process.stdout.write(
      [
        "[vspec] dry-run",
        `- source: ${sourceSkillsDir}`,
        `- target: ${targetSkillsDir}`,
        `- skills: ${skillNames.join(", ")}`,
      ].join("\n") + "\n",
    );
    return;
  }

  await fs.mkdir(targetSkillsDir, { recursive: true });

  for (const skillName of skillNames) {
    const sourceSkillPath = path.join(sourceSkillsDir, skillName);
    const targetSkillPath = path.join(targetSkillsDir, skillName);

    if (!(await pathExists(sourceSkillPath))) {
      process.stderr.write(`[vspec] skill not found: ${skillName}, skipping\n`);
      continue;
    }

    const targetExists = await pathExists(targetSkillPath);
    if (targetExists && force) {
      await removeDirRecursive(targetSkillPath);
    }

    await copyDirRecursive(sourceSkillPath, targetSkillPath);
    process.stdout.write(`[vspec] installed ${skillName} to ${targetSkillPath}\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`[vspec] install failed: ${error?.message || error}\n`);
  process.exitCode = 1;
});
