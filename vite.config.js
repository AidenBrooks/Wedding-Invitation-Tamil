import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" → the build works from a domain root or any sub-path (GitHub Pages, Netlify, Vercel, S3…)
export default defineConfig({ base: "./", plugins: [react()] });
