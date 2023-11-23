// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
  ],
  css: ["vuetify/lib/styles/main.sass"],
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
});
