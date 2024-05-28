// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { createResolver } from '@nuxt/kit'


const { resolve } = createResolver(import.meta.url)


export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  modules: ['@pinia/nuxt'],
  build: {
    transpile: ['vuetify'],
  },
  alias: {
    '@/': resolve(__dirname, '/'),
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        // default values
        componentName: 'NuxtLink',
        externalRelAttribute: 'noopener noreferrer',
        activeClass: 'router-link-active',
        exactActiveClass: 'router-link-exact-active',
        prefetchedClass: undefined, // can be any valid string class name
        trailingSlash: undefined // can be 'append' or 'remove'
      }
    }
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