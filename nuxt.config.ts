// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt", "@pinia/nuxt"],
  tailwindcss: {
    config: {
      darkMode: "class",
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "toolly",
      short_name: "toolly",
      start_url: "/",
      display: "standalone",
      background_color: "#f1f5f9",
      theme_color: "#6366f1",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
    },
    devOptions: {
      enabled: true,
    },
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/icon-192x192.png" }],
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no",
        },
      ],
    },
  },
});
