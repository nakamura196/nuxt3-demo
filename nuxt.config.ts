// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@vueuse/nuxt"],
  css: ["vuetify/lib/styles/main.sass"],

  build: {
    transpile: ["vuetify"],
  },

  app: {
    baseURL: "/nuxt3-demo",
  },

  compatibilityDate: "2024-08-16",
});