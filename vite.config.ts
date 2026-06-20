import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Run with `SINGLEFILE=1` to inline everything into one portable index.html
// that can be opened directly from disk — handy for sharing a demo.
const singlefile = process.env.SINGLEFILE === "1";

export default defineConfig(({ command }) => ({
  // On GitHub Pages the site is served from /<repo>/, so built asset URLs need
  // that prefix. Locally (dev) and in the portable single-file build we serve
  // from the root instead. `import.meta.env.BASE_URL` reflects this at runtime.
  base: command === "build" && !singlefile ? "/sphere/" : "/",
  plugins: singlefile ? [viteSingleFile()] : [],
}));
