// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    'nuxt-headlessui',
    "@nuxt/image",
  ],
  tailwindcss: {
    configPath: "tailwind.config",
  },
  googleFonts: {
    families: {
      Montserrat: [400],
    },
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
})
