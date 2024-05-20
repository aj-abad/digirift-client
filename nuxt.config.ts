import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxtjs/apollo",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  apollo: {
    clients: {
      default: {
        tokenStorage: "localStorage",
        httpEndpoint: process.env.APOLLO_HTTP_ENDPOINT || "http://localhost:8000/graphql",
      },
    },
  },
});
