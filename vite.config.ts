import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Default build is a normal multi-file static site (dist/).
// Run with `SINGLEFILE=1` to inline everything into one portable index.html
// that can be opened directly from disk — handy for sharing a demo.
const singlefile = process.env.SINGLEFILE === "1";

export default defineConfig({
  plugins: singlefile ? [viteSingleFile()] : [],
});
