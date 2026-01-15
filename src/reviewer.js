const fs = require("fs");
const {OpenAI} = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function reviewFile(filePath) {
  const code = fs.readFileSync(filePath, "utf8").slice(0, 8000);

  const prompt = `
You are a senior engineer doing a QUICK repository scan.

Review this file briefly and report:
- Obvious bugs
- Security red flags
- Bad practices
- Overall risk (low / medium / high)

Do NOT:
- Do line-by-line review
- Suggest refactors
- Comment on formatting

Return JSON only:
{
  "risk_level": "",
  "issues": [],
  "notes": ""
}

Code:
${code}
`;

  const response = await client.responses.create({
    model: "gpt-4.1",
    input: prompt
  });

  return response.output_text;
}

module.exports = { reviewFile };
