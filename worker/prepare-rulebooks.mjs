import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const bundleDir = path.join(root, "bundles");
const names = [
  "rulebook.js",
  "price-action-rulebook.js",
  "chart-pattern-rulebook.js",
  "volume-rulebook.js",
  "wyckoff-rulebook.js"
];

for (const name of names) {
  const parts = fs.readdirSync(bundleDir)
    .filter(file => file.startsWith(`${name}.gz.hex.part`))
    .sort();
  if (!parts.length) throw new Error(`Missing bundle for ${name}`);
  const encoded = parts.map(file => fs.readFileSync(path.join(bundleDir, file), "utf8")).join("");
  const restored = zlib.gunzipSync(Buffer.from(encoded, "hex"));
  fs.writeFileSync(path.join(root, name), restored);
  console.log(`Restored ${name}`);
}
