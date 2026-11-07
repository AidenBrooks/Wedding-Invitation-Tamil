import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* Link preview image (WhatsApp, Instagram, iMessage). Crawlers need an absolute URL, so on Vercel the
   production domain is filled in at build time; change the domain and the next deploy follows it. */
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "";
const ogImage = () => ({
  name: "og-image",
  transformIndexHtml(html) {
    const url = site ? `https://${site}/og.jpg` : "./og.jpg";
    const tags = [
      `<meta property="og:image" content="${url}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      site && `<meta property="og:url" content="https://${site}/">`,
      `<meta name="twitter:card" content="summary_large_image">`,
    ].filter(Boolean).join("\n");
    return html.replace("</head>", tags + "\n</head>");
  },
});

// base "./" → the build works from a domain root or any sub-path (GitHub Pages, Netlify, Vercel, S3…)
export default defineConfig({ base: "./", plugins: [react(), ogImage()] });
