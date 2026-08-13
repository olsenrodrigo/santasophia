import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // Unknown URLs are real 404s, rendered from the prebuilt noindex page.
  app.use("/{*path}", (_req, res) => {
    res.status(404).sendFile(path.resolve(distPath, "404/index.html"));
  });
}
