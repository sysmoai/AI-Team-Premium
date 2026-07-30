import { readableOn, contrastRatio } from "../client/src/lib/contrast";
const NAVY = "#0F172A", NAVY2 = "#1a2d5a", WHITE = "#ffffff";
const cases: [string, string, string][] = [
  ["GitHub Copilot", "#24292F", NAVY],
  ["GitHub Copilot", "#24292F", NAVY2],
  ["Notion", "#000000", NAVY],
  ["Notion", "#000000", NAVY2],
  ["Canva", "#00C4CC", WHITE],
  ["Amber accent", "#F59E0B", WHITE],
  ["Amber 400", "#FBBF24", WHITE],
  ["ChatGPT green", "#10a37f", WHITE],
  ["Blue", "#2563EB", WHITE],
];
for (const [name, c, bg] of cases) {
  const before = contrastRatio(c, bg);
  const fixed = readableOn(c, bg, 4.5);
  const after = contrastRatio(fixed, bg);
  console.log(`  ${name.padEnd(15)} ${c} on ${bg}  ${before.toFixed(2)} -> ${fixed} ${after.toFixed(2)} ${after >= 4.5 ? "OK" : "STILL LOW"}`);
}
