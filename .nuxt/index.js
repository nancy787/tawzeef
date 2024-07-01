import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_471c9cac from 'nuxt_plugin_plugin_471c9cac' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_plugin_62a90284 from 'nuxt_plugin_plugin_62a90284' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_vue2editor_e88d11f0 from 'nuxt_plugin_vue2editor_e88d11f0' // Source: ./vue2-editor.js (mode: 'client')
import nuxt_plugin_pluginutils_7075da7b from 'nuxt_plugin_pluginutils_7075da7b' // Source: ./nuxt-i18n/plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_3f2c95f4 from 'nuxt_plugin_pluginrouting_3f2c95f4' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_4444c429 from 'nuxt_plugin_pluginmain_4444c429' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_axios_1ca18bc0 from 'nuxt_plugin_axios_1ca18bc0' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_api_22834091 from 'nuxt_plugin_api_22834091' // Source: ../plugins/api.js (mode: 'all')
import nuxt_plugin_initializer_2e836a6e from 'nuxt_plugin_initializer_2e836a6e' // Source: ../plugins/initializer.js (mode: 'client')
import nuxt_plugin_vuelidate_45aab49a from 'nuxt_plugin_vuelidate_45aab49a' // Source: ../plugins/vuelidate.js (mode: 'all')
import nuxt_plugin_toasted_578b7425 from 'nuxt_plugin_toasted_578b7425' // Source: ../plugins/toasted.js (mode: 'client')
import nuxt_plugin_plugin_69fe6e08 from 'nuxt_plugin_plugin_69fe6e08' // Source: ./auth/plugin.js (mode: 'all')
import nuxt_plugin_axios_3566aa80 from 'nuxt_plugin_axios_3566aa80' // Source: ../plugins/axios (mode: 'all')
import nuxt_plugin_facebook_10b8e03c from 'nuxt_plugin_facebook_10b8e03c' // Source: ../plugins/facebook (mode: 'all')
import nuxt_plugin_apple_356dbcb8 from 'nuxt_plugin_apple_356dbcb8' // Source: ../plugins/apple (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"fade","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":"%s","title":"منصة بيبان التوظيف","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""}],"script":[{"hid":"apple","src":"https:\u002F\u002Fappleid.cdn-apple.com\u002Fappleauth\u002Fstatic\u002Fjsapi\u002Fappleid\u002F1\u002Fen_US\u002Fappleid.auth.js","defer":true}],"link":[{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_471c9cac === 'function') {
    await nuxt_plugin_plugin_471c9cac(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_62a90284 === 'function') {
    await nuxt_plugin_plugin_62a90284(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vue2editor_e88d11f0 === 'function') {
    await nuxt_plugin_vue2editor_e88d11f0(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginutils_7075da7b === 'function') {
    await nuxt_plugin_pluginutils_7075da7b(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_3f2c95f4 === 'function') {
    await nuxt_plugin_pluginrouting_3f2c95f4(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_4444c429 === 'function') {
    await nuxt_plugin_pluginmain_4444c429(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_1ca18bc0 === 'function') {
    await nuxt_plugin_axios_1ca18bc0(app.context, inject)
  }

  if (typeof nuxt_plugin_api_22834091 === 'function') {
    await nuxt_plugin_api_22834091(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_initializer_2e836a6e === 'function') {
    await nuxt_plugin_initializer_2e836a6e(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_45aab49a === 'function') {
    await nuxt_plugin_vuelidate_45aab49a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toasted_578b7425 === 'function') {
    await nuxt_plugin_toasted_578b7425(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_69fe6e08 === 'function') {
    await nuxt_plugin_plugin_69fe6e08(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_3566aa80 === 'function') {
    await nuxt_plugin_axios_3566aa80(app.context, inject)
  }

  if (typeof nuxt_plugin_facebook_10b8e03c === 'function') {
    await nuxt_plugin_facebook_10b8e03c(app.context, inject)
  }

  if (typeof nuxt_plugin_apple_356dbcb8 === 'function') {
    await nuxt_plugin_apple_356dbcb8(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
