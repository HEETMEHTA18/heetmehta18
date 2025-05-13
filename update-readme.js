const fs = require("fs");
const https = require("https");

const fetchQuote = () => {
  return new Promise((resolve, reject) => {
    https.get("https://api.quotable.io/random", (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const quoteData = JSON.parse(data);
        resolve(`> 💭 **"${quoteData.content}"**  \n> — *${quoteData.author}*`);
      });
    }).on("error", (err) => reject(err));
  });
};

const updateREADME = async () => {
  const quote = await fetchQuote();

  const readmePath = "README.md";
  let content = fs.readFileSync(readmePath, "utf-8");

  const start = "<!-- thought-start -->";
  const end = "<!-- thought-end -->";

  const newSection = `${start}\n${quote}\n${end}`;

  const updated = content.replace(
    new RegExp(`${start}[\\s\\S]*${end}`),
    newSection
  );

  fs.writeFileSync(readmePath, updated);
  console.log("✅ README updated with new quote.");
};

updateREADME();
