require("dotenv/config");
const path = require("path");
const { cloneRepo } = require("./cloneRepo.js");
const { scanFiles } = require("./fileScanner.js");
const { reviewFile } = require("./reviewer.js");
const { aggregateReviews } = require("./aggragator.js");

const repoUrl = process.argv[2];

if (!repoUrl) {
    console.error("Usage: node src/index.js <git-repo-url>");
    process.exit(1);
}

const repoPath = path.join("temp", "repo");

(async () => {
    console.log("📥 Cloning repo...");
    await cloneRepo(repoUrl, repoPath);

    console.log("📂 Scanning files...");
    const files = await scanFiles(repoPath);

    console.log(`🔍 Reviewing ${files.length} files...\n`);
    const results = [];

    for (const file of files) {
        const raw = await reviewFile(file);
        try {
            results.push(JSON.parse(raw));
        } catch {
            console.warn("⚠️ Skipped file due to parse error");
        }
    }

    const summary = aggregateReviews(results);

    console.log("\n🧾 Repository Review Summary");
    console.log(JSON.stringify(summary, null, 2));
})();