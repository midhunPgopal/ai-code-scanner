const { glob } = require("glob");
const path = require("path");

const IGNORE = [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.git/**",
    "**/coverage/**"
];

async function scanFiles(repoPath) {
    const files = await glob("**/*.{js,ts,jsx,tsx,py,java,go}", {
        cwd: repoPath,
        ignore: IGNORE,
        nodir: true
    });

    // Limit for speed
    return files.slice(0, 25).map(f => path.join(repoPath, f));
}

module.exports = { scanFiles };
