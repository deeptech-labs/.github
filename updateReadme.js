import fs from 'fs';
import path from 'path';

// Function to fetch dynamic data
async function fetchContributors() {
  // Simulate fetching data
  return [
    { name: 'Alice', contributions: 42 },
    { name: 'Bob', contributions: 37 },
    { name: 'Carol', contributions: 29 },
  ];
}

async function updateReadme() {
  const readmePath = path.resolve(__dirname, 'README.md');
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');

  const contributors = await fetchContributors();
  const contributorsList = contributors
    .map((contributor) => `- ${contributor.name} (${contributor.contributions} contributions)`)
    .join('\n');

  const updatedContent = readmeContent.replace(
    /<!-- CONTRIBUTORS START -->([\s\S]*?)<!-- CONTRIBUTORS END -->/,
    `<!-- CONTRIBUTORS START -->\n${contributorsList}\n<!-- CONTRIBUTORS END -->`
  );

  fs.writeFileSync(readmePath, updatedContent, 'utf-8');
}

updateReadme().catch(console.error);
