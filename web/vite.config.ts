import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { colors } from "./src/styles/foundation";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // auto-refresh silently
      includeAssets: ["favicon.ico", "kodi-logo192px.png", "offline.html"],
      manifest: {
        name: "Kodi Property Manager",
        short_name: "Kodi",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: colors.primary,
        icons: [
          { src: "kodi-logo192px.png", sizes: "192x192", type: "image/png" },
          { src: "kodi-logo192px.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        navigateFallback: "/offline.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
    }),
  ],
});
