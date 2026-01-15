const { simpleGit } = require("simple-git");
const fs = require("fs");

async function cloneRepo(repoUrl, targetDir) {
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  await simpleGit().clone(repoUrl, targetDir, ["--depth", "1"]);
}

module.exports = { cloneRepo };