import tailwindcss from "@tailwindcss/vite";

import "./server/configs/env/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@pinia/nuxt",
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
});
