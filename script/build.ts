import { build as esbuild } from "esbuild";
import { build as viteBuild, loadEnv } from "vite";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import { prerenderSite } from "./prerender";

const projectRoot = process.cwd();
const publicDist = path.resolve(projectRoot, "dist/public");
const ssrDist = path.resolve(projectRoot, "dist/ssr");

// server deps to bundle to reduce openat(2) syscalls
const allowlist = [
  "@google/generative-ai",
  "axios",
  "cors",
  "compression",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "jsonwebtoken",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  Object.assign(process.env, loadEnv("production", projectRoot, "VITE_"));
  await rm(path.resolve(projectRoot, "dist"), { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building SSR entry...");
  await viteBuild({
    build: {
      ssr: "src/entry-server.tsx",
      outDir: ssrDist,
      emptyOutDir: true,
      rollupOptions: {
        output: { entryFileNames: "entry-server.js" },
      },
    },
  });

  console.log("prerendering routes...");
  await prerenderSite(publicDist, path.join(ssrDist, "entry-server.js"));

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

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
}

buildAll().catch((error) => {
  console.error(error);
  process.exit(1);
});
