#!/usr/bin/env tsx

/**
 * Simplified build script with better error handling
 */

import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  try {
    console.log("[1/4] Cleaning dist folder...");
    await rm("dist", { recursive: true, force: true });
    console.log("[1/4] ✅ Cleaned");

    console.log("[2/4] Building client with Vite...");
    try {
      await viteBuild();
      console.log("[2/4] ✅ Client built");
    } catch (error: any) {
      console.error("[2/4] ❌ Vite build failed:", error.message);
      throw error;
    }

    console.log("[3/4] Reading package.json...");
    const pkg = JSON.parse(await readFile("package.json", "utf-8"));
    const allDeps = [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ];
    const externals = allDeps.filter((dep) => !allowlist.includes(dep));
    console.log(`[3/4] ✅ Found ${allDeps.length} dependencies, ${externals.length} external`);

    console.log("[4/4] Building server with esbuild...");
    try {
      await esbuild({
        entryPoints: ["server/index.ts"],
        platform: "node",
        bundle: true,
        format: "cjs",
        outfile: "dist/index.cjs",
        define: {
          "process.env.NODE_ENV": '"production"',
        },
        minify: true,
        external: externals,
        logLevel: "info",
      });
      console.log("[4/4] ✅ Server built");
    } catch (error: any) {
      console.error("[4/4] ❌ esbuild failed:", error.message);
      throw error;
    }

    console.log("\n✅ BUILD COMPLETE");
    console.log("   Output: dist/index.cjs");
    console.log("   Ready for deployment");
  } catch (error) {
    console.error("\n❌ BUILD FAILED");
    console.error(error);
    process.exit(1);
  }
}

buildAll();
