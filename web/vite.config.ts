// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "kodi-old-logo.png"],
      manifest: {
        name: "Kodi Property Manager",
        short_name: "Kodi",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2196f3",
        icons: [
          {
            src: "kodi-old-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "kodi-old-logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
