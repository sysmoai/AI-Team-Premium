#!/usr/bin/env node
// Serve the production build locally, exactly as production behaves:
// per-route SEO injection and real 404s for unknown paths.
//
// `npm run dev` uses Vite middleware, which serves the raw template for every
// path — so SEO and 404 behaviour are invisible there. Use this before pushing
// anything that touches routes or metadata.
//
// Usage: npm run preview            (defaults to port 5291)
//        npm run preview -- 4000

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = process.argv[2] || process.env.PORT || "5291";

if (!existsSync(resolve(ROOT, "dist/public/index.html"))) {
  console.error("\n  No build found. Run `npm run build` first.\n");
  process.exit(1);
}

console.log(`\n  Production preview on http://localhost:${port}`);
console.log("  Per-route SEO and 404s behave as they do live. Ctrl+C to stop.\n");

// NODE_ENV is set here rather than inline in the npm script, which would not
// work on Windows (cmd.exe has no `VAR=value cmd` syntax).
const child = spawn(
  process.execPath,
  [resolve(ROOT, "node_modules/tsx/dist/cli.mjs"), resolve(ROOT, "server/index.ts")],
  {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production", PORT: String(port) },
    cwd: ROOT,
  }
);

child.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    child.kill(sig);
    process.exit(0);
  });
}
