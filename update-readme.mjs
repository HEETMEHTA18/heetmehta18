import fs from 'fs';
import fetch from 'node-fetch';

const startTag = "<!-- thought-start -->";
const endTag = "<!-- thought-end -->";

try {
  const response = await fetch("https://zenquotes.io/api/random");
  const data = await response.json();
  const content = data[0].q;
  const author = data[0].a;

  const quote = `> 💭 **"${content}"**  \n> — *${author}*`;

  let readme = fs.readFileSync("README.md", "utf8");
  const regex = new RegExp(`${startTag}[\\s\\S]*${endTag}`);
  const replacement = `${startTag}\n${quote}\n${endTag}`;
  const updated = readme.replace(regex, replacement);

  fs.writeFileSync("README.md", updated);
  console.log("✅ README updated with a new thought.");
} catch (error) {
  console.error("❌ Error fetching quote:", error.message);
}
