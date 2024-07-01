import locale38517862 from '../../locales/ar.json'

export const Constants = {
  COMPONENT_OPTIONS_KEY: "nuxtI18n",
  STRATEGIES: {"PREFIX":"prefix","PREFIX_EXCEPT_DEFAULT":"prefix_except_default","PREFIX_AND_DEFAULT":"prefix_and_default","NO_PREFIX":"no_prefix"},
}
export const nuxtOptions = {
  isUniversalMode: true,
  trailingSlash: undefined,
}
export const options = {
  vueI18n: {"fallbackLocale":"ar"},
  vueI18nLoader: false,
  locales: [{"code":"en","file":"en.json","name":"english","iso":"en-US"},{"code":"ar","file":"ar.json","name":"arabic","iso":"ar-EG"}],
  defaultLocale: "ar",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  defaultLocaleRouteNameSuffix: "default",
  sortRoutes: true,
  strategy: "prefix_and_default",
  lazy: true,
  langDir: "/var/www/backup-7.7.2023_15-33-57_bebaan/homedir/tawzeef/locales",
  rootRedirect: null,
  detectBrowserLanguage: false,
  differentDomains: false,
  seo: false,
  baseUrl: "",
  vuex: {"moduleName":"i18n","syncLocale":false,"syncMessages":false,"syncRouteParams":true},
  parsePages: true,
  pages: {},
  skipSettingLocaleOnNavigate: false,
  beforeLanguageSwitch: () => null,
  onBeforeLanguageSwitch: () => {},
  onLanguageSwitched: () => null,
  normalizedLocales: [{"code":"en","file":"en.json","name":"english","iso":"en-US"},{"code":"ar","file":"ar.json","name":"arabic","iso":"ar-EG"}],
  localeCodes: ["en","ar"],
}

export const localeMessages = {
  'ar.json': () => Promise.resolve(locale38517862),
  'en.json': () => import('../../locales/en.json' /* webpackChunkName: "lang-en.json" */),
}
