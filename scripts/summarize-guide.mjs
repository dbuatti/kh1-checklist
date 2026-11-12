import fs from "node:fs";

const file = process.argv[2];
const j = JSON.parse(fs.readFileSync(file, "utf8"));
const raw = j.result?.value ?? j.result?.result?.value;
const data = JSON.parse(raw);
const re = /Mission|Story -|^_|Area \d|\[\d+\s*\//i;

for (const [k, v] of Object.entries(data)) {
  console.log(`\n===== ${k} (${v.length}) =====`);
  for (const line of v.split("\n")) {
    if (re.test(line)) console.log(line.slice(0, 240));
  }
}
