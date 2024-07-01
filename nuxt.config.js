export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'منصة بيبان التوظيف',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    script: [
      {
        hid: 'apple',
        src:
          'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
        defer: true,
      },
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/scss/main.scss', '@/assets/fonts/stylesheet.css'],
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // components: {
  //     dirs: [
  //         '~/components',
  //         {
  //             path: '~/components/base/',
  //             prefix: 'Base',
  //         },
  //     ],
  // },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '~/modules/example',
    'nuxt-i18n',
    'vue2-editor/nuxt',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'english',
        iso: 'en-US',
      },
      {
        code: 'ar',
        file: 'ar.json',
        name: 'arabic',
        iso: 'ar-EG',
      },
    ],
    defaultLocale: 'ar',
    strategy: 'prefix_and_default',
    langDir: 'locales/',
    lazy: true,
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'ar',
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    theme: {
      dark: false,
      // themes: {
      //     dark: {
      //         primary: colors.blue.darken2,
      //         accent: colors.grey.darken3,
      //         secondary: colors.amber.darken3,
      //         info: colors.teal.lighten1,
      //         warning: colors.amber.base,
      //         error: colors.deepOrange.accent4,
      //         success: colors.green.accent3,
      //     },
      // },
      themes: {
        light: {
          primary: '#3796d3',
          success: '#00B022',
          warning: '#FFB229',
          // accent: colors.grey.darken3,
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3,
        },
      },
    },
  },
  serverMiddleware: ['~/middleware/logger'],
  router: {
    middleware: ['routeChange'],
    // middleware: ['isAuth'],
    // extendRoutes(routes, resolve) {
    //     const newRoutes = [...routes, ...customRoutes]
    //     newRoutes.map(route => {
    //         routes.push({
    //             ...route,
    //             component: resolve(__dirname, route.component),
    //         })
    //     })
    // },
  },
  axios: {
    baseURL: 'https://admin.bebaan.net/api/v1',
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'data.access_token.token',
          },
          logout: { url: '/auth/logout', method: 'post' },
          // user: false,
          user: {
            url: '/user/simple-profile',
            method: 'get',
            propertyName: 'data',
          },
        },
        redirect: false,
      },
      google: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://accounts.google.com/o/oauth2/auth',
        userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
        scope: ['openid', 'profile', 'email'],
        response_type: 'token',
        token_type: 'Bearer',
        redirect_uri: 'http://localhost:3000',
        token_key: 'access_token',
        state: 'UNIQUE_AND_NON_GUESSABLE',
        client_id:
          '249336598015-2668kq8fbih065umt0fv7v7loqh0jep2.apps.googleusercontent.com',
      },
      facebook: {
        endpoints: {
          userInfo:
            'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}',
        },
        clientId: '583838882795069',
        scope: ['public_profile', 'email'],
      },
    },
    plugins: [
      { src: '~/plugins/axios' },
      { src: '~/plugins/facebook' },
      { src: '~/plugins/apple' },
    ],
  },
  plugins: [
    { src: '@/plugins/api.js' },
    { src: '@/plugins/initializer.js', ssr: false },
    { src: '@/plugins/vuelidate.js' },
    { src: '@/plugins/toasted.js', ssr: false },
  ],
  loadingIndicator: {
    name: 'cube-grid',
    color: '#f00',
    background: 'white',
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // You can extend webpack config here
    // config.resolve.alias['~'] = './store_submodules'
    // Run ESLint on save
    extractCSS: true,
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
    },
  },
}
