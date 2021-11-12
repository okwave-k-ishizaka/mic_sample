import path from 'path'
import fs from 'fs'

export default {
  server: {
    https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mic_frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  axios: {
    baseURL: "/"
  },
  proxy: {
    '/api': {
      target: 'https://mic_backend:8080',
      secure: false,
      pathRewrite: {
        '^/api' : '/'
      }
    }
  }
}
