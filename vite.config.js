import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

import dotenv from "dotenv";
dotenv.config();

let faviconURL = "/favicon.svg";

const { PORT = 3002 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [faviconURL],
      manifest: {
        name: "wicked",
        short_name: "wicked",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "en",
        scope: "/",
        theme_color: "#ffffff",
        icons: [
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: faviconURL,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  rollupOptions: {
    manifest: true,
    input: "./src/main.jsx",
  },
});
