// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { createResolver } from '@nuxt/kit'


const { resolve } = createResolver(import.meta.url)


export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  modules: ['@pinia/nuxt'],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
})



// hooks: {
//   'vite:extendConfig': (config) => {
//     config.plugins?.push(
//       vuetify({
//         styles: { configFile: resolve('./settings.scss') },
//       })
//     )
//   },
// },