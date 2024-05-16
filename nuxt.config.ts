import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appVersion: '1.0.0'
    }
  },
  app: {
    head: {
      title: "Nuxt example",
      meta: [
        {
          name: "description",
          content: "Pan con jamon",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        }
      ],
    },
  },

  alias: {
    assets: "/<rootDir>/assets",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui"]
});