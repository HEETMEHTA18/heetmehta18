import fs from "fs";
import fetch from "node-fetch";

async function updateThoughtOfTheDay() {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();

    const quote = `> 💭 **"${data[0].q}"**  
> — *${data[0].a}*`;

    let readme = fs.readFileSync("./README.md", "utf8");
    const updatedReadme = readme.replace(
      /<!-- thought-start -->[\s\S]*<!-- thought-end -->/,
      `<!-- thought-start -->\n${quote}\n<!-- thought-end -->`
    );

    fs.writeFileSync("./README.md", updatedReadme);
    console.log("✅ Thought of the Day updated successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

updateThoughtOfTheDay();
