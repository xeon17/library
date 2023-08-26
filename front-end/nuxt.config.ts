// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "nuxt-typed-router",
    "@nuxthq/ui",
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
    autoImports: [
      "defineStore",
      "storeToRefs",
      ["defineStore", "definePiniaStore"],
    ],
  },
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:8080/api/v1",
    },
  },
  colorMode: {
    preference: "light",
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
});
