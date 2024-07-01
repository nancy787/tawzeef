import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6e6ff176 = () => interopDefault(import('../pages/about-us/index.vue' /* webpackChunkName: "pages/about-us/index" */))
const _71ae7c1e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _19037166 = () => interopDefault(import('../pages/bank-accounts/index.vue' /* webpackChunkName: "pages/bank-accounts/index" */))
const _1f0ae4c0 = () => interopDefault(import('../pages/blogs/index.vue' /* webpackChunkName: "pages/blogs/index" */))
const _d1bf4c30 = () => interopDefault(import('../pages/company-profile/index.vue' /* webpackChunkName: "pages/company-profile/index" */))
const _d6406adc = () => interopDefault(import('../pages/contact-us/index.vue' /* webpackChunkName: "pages/contact-us/index" */))
const _44518cf1 = () => interopDefault(import('../pages/employee-profile/index.vue' /* webpackChunkName: "pages/employee-profile/index" */))
const _41820739 = () => interopDefault(import('../pages/find-jobs/index.vue' /* webpackChunkName: "pages/find-jobs/index" */))
const _c24a1cec = () => interopDefault(import('../pages/forget-password/index.vue' /* webpackChunkName: "pages/forget-password/index" */))
const _f16dac26 = () => interopDefault(import('../pages/hiring-law/index.vue' /* webpackChunkName: "pages/hiring-law/index" */))
const _690cac10 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _02f0f441 = () => interopDefault(import('../pages/majors/index.vue' /* webpackChunkName: "pages/majors/index" */))
const _e167eb9a = () => interopDefault(import('../pages/messages/index.vue' /* webpackChunkName: "pages/messages/index" */))
const _8864460c = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _b160f714 = () => interopDefault(import('../pages/otp-code/index.vue' /* webpackChunkName: "pages/otp-code/index" */))
const _8d100716 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _67909738 = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _19958a76 = () => interopDefault(import('../pages/profile/contact-info.vue' /* webpackChunkName: "pages/profile/contact-info" */))
const _9e7e98c4 = () => interopDefault(import('../pages/profile/courses.vue' /* webpackChunkName: "pages/profile/courses" */))
const _493dc9b8 = () => interopDefault(import('../pages/profile/info.vue' /* webpackChunkName: "pages/profile/info" */))
const _94913b8e = () => interopDefault(import('../pages/profile/job-required.vue' /* webpackChunkName: "pages/profile/job-required" */))
const _4de25c64 = () => interopDefault(import('../pages/profile/majors.vue' /* webpackChunkName: "pages/profile/majors" */))
const _c7aa70aa = () => interopDefault(import('../pages/profile/membership-info.vue' /* webpackChunkName: "pages/profile/membership-info" */))
const _d65651cc = () => interopDefault(import('../pages/profile/personal-exp.vue' /* webpackChunkName: "pages/profile/personal-exp" */))
const _f2a187fe = () => interopDefault(import('../pages/profile/personal-info.vue' /* webpackChunkName: "pages/profile/personal-info" */))
const _b9b0f056 = () => interopDefault(import('../pages/profile/qualification.vue' /* webpackChunkName: "pages/profile/qualification" */))
const _7d133268 = () => interopDefault(import('../pages/profile/skills.vue' /* webpackChunkName: "pages/profile/skills" */))
const _563c4319 = () => interopDefault(import('../pages/profile/social-contacts.vue' /* webpackChunkName: "pages/profile/social-contacts" */))
const _8bd0926c = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _7c92fd00 = () => interopDefault(import('../pages/reset-password/index.vue' /* webpackChunkName: "pages/reset-password/index" */))
const _4865c5cf = () => interopDefault(import('../pages/salaries/index.vue' /* webpackChunkName: "pages/salaries/index" */))
const _8bf56eba = () => interopDefault(import('../pages/salary-reports/index.vue' /* webpackChunkName: "pages/salary-reports/index" */))
const _bad55b44 = () => interopDefault(import('../pages/search-on-employee/index.vue' /* webpackChunkName: "pages/search-on-employee/index" */))
const _7b9ec525 = () => interopDefault(import('../pages/terms-conditions/index.vue' /* webpackChunkName: "pages/terms-conditions/index" */))
const _530de12f = () => interopDefault(import('../pages/verify-email/index.vue' /* webpackChunkName: "pages/verify-email/index" */))
const _cdd2b4fa = () => interopDefault(import('../pages/company-profile/details/_id.vue' /* webpackChunkName: "pages/company-profile/details/_id" */))
const _6613d88b = () => interopDefault(import('../pages/blogs/_id/index.vue' /* webpackChunkName: "pages/blogs/_id/index" */))
const _3d9f7d98 = () => interopDefault(import('../pages/busniss-platform/_id.vue' /* webpackChunkName: "pages/busniss-platform/_id" */))
const _0b4bb650 = () => interopDefault(import('../pages/company-profile/_id.vue' /* webpackChunkName: "pages/company-profile/_id" */))
const _7964f465 = () => interopDefault(import('../pages/jobs/_id.vue' /* webpackChunkName: "pages/jobs/_id" */))
const _1877f2a8 = () => interopDefault(import('../pages/majors/_id/index.vue' /* webpackChunkName: "pages/majors/_id/index" */))
const _a3c82a36 = () => interopDefault(import('../pages/news/_id/index.vue' /* webpackChunkName: "pages/news/_id/index" */))
const _4d63511f = () => interopDefault(import('../pages/post-job/_id.vue' /* webpackChunkName: "pages/post-job/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about-us",
    component: _6e6ff176,
    name: "about-us___ar___default"
  }, {
    path: "/ar",
    component: _71ae7c1e,
    name: "index___ar"
  }, {
    path: "/bank-accounts",
    component: _19037166,
    name: "bank-accounts___ar___default"
  }, {
    path: "/blogs",
    component: _1f0ae4c0,
    name: "blogs___ar___default"
  }, {
    path: "/company-profile",
    component: _d1bf4c30,
    name: "company-profile___ar___default"
  }, {
    path: "/contact-us",
    component: _d6406adc,
    name: "contact-us___ar___default"
  }, {
    path: "/employee-profile",
    component: _44518cf1,
    name: "employee-profile___ar___default"
  }, {
    path: "/en",
    component: _71ae7c1e,
    name: "index___en"
  }, {
    path: "/find-jobs",
    component: _41820739,
    name: "find-jobs___ar___default"
  }, {
    path: "/forget-password",
    component: _c24a1cec,
    name: "forget-password___ar___default"
  }, {
    path: "/hiring-law",
    component: _f16dac26,
    name: "hiring-law___ar___default"
  }, {
    path: "/login",
    component: _690cac10,
    name: "login___ar___default"
  }, {
    path: "/majors",
    component: _02f0f441,
    name: "majors___ar___default"
  }, {
    path: "/messages",
    component: _e167eb9a,
    name: "messages___ar___default"
  }, {
    path: "/news",
    component: _8864460c,
    name: "news___ar___default"
  }, {
    path: "/otp-code",
    component: _b160f714,
    name: "otp-code___ar___default"
  }, {
    path: "/profile",
    component: _8d100716,
    children: [{
      path: "",
      component: _67909738,
      name: "profile___ar___default"
    }, {
      path: "contact-info",
      component: _19958a76,
      name: "profile-contact-info___ar___default"
    }, {
      path: "courses",
      component: _9e7e98c4,
      name: "profile-courses___ar___default"
    }, {
      path: "info",
      component: _493dc9b8,
      name: "profile-info___ar___default"
    }, {
      path: "job-required",
      component: _94913b8e,
      name: "profile-job-required___ar___default"
    }, {
      path: "majors",
      component: _4de25c64,
      name: "profile-majors___ar___default"
    }, {
      path: "membership-info",
      component: _c7aa70aa,
      name: "profile-membership-info___ar___default"
    }, {
      path: "personal-exp",
      component: _d65651cc,
      name: "profile-personal-exp___ar___default"
    }, {
      path: "personal-info",
      component: _f2a187fe,
      name: "profile-personal-info___ar___default"
    }, {
      path: "qualification",
      component: _b9b0f056,
      name: "profile-qualification___ar___default"
    }, {
      path: "skills",
      component: _7d133268,
      name: "profile-skills___ar___default"
    }, {
      path: "social-contacts",
      component: _563c4319,
      name: "profile-social-contacts___ar___default"
    }]
  }, {
    path: "/register",
    component: _8bd0926c,
    name: "register___ar___default"
  }, {
    path: "/reset-password",
    component: _7c92fd00,
    name: "reset-password___ar___default"
  }, {
    path: "/salaries",
    component: _4865c5cf,
    name: "salaries___ar___default"
  }, {
    path: "/salary-reports",
    component: _8bf56eba,
    name: "salary-reports___ar___default"
  }, {
    path: "/search-on-employee",
    component: _bad55b44,
    name: "search-on-employee___ar___default"
  }, {
    path: "/terms-conditions",
    component: _7b9ec525,
    name: "terms-conditions___ar___default"
  }, {
    path: "/verify-email",
    component: _530de12f,
    name: "verify-email___ar___default"
  }, {
    path: "/ar/about-us",
    component: _6e6ff176,
    name: "about-us___ar"
  }, {
    path: "/ar/bank-accounts",
    component: _19037166,
    name: "bank-accounts___ar"
  }, {
    path: "/ar/blogs",
    component: _1f0ae4c0,
    name: "blogs___ar"
  }, {
    path: "/ar/company-profile",
    component: _d1bf4c30,
    name: "company-profile___ar"
  }, {
    path: "/ar/contact-us",
    component: _d6406adc,
    name: "contact-us___ar"
  }, {
    path: "/ar/employee-profile",
    component: _44518cf1,
    name: "employee-profile___ar"
  }, {
    path: "/ar/find-jobs",
    component: _41820739,
    name: "find-jobs___ar"
  }, {
    path: "/ar/forget-password",
    component: _c24a1cec,
    name: "forget-password___ar"
  }, {
    path: "/ar/hiring-law",
    component: _f16dac26,
    name: "hiring-law___ar"
  }, {
    path: "/ar/login",
    component: _690cac10,
    name: "login___ar"
  }, {
    path: "/ar/majors",
    component: _02f0f441,
    name: "majors___ar"
  }, {
    path: "/ar/messages",
    component: _e167eb9a,
    name: "messages___ar"
  }, {
    path: "/ar/news",
    component: _8864460c,
    name: "news___ar"
  }, {
    path: "/ar/otp-code",
    component: _b160f714,
    name: "otp-code___ar"
  }, {
    path: "/ar/profile",
    component: _8d100716,
    children: [{
      path: "",
      component: _67909738,
      name: "profile___ar"
    }, {
      path: "contact-info",
      component: _19958a76,
      name: "profile-contact-info___ar"
    }, {
      path: "courses",
      component: _9e7e98c4,
      name: "profile-courses___ar"
    }, {
      path: "info",
      component: _493dc9b8,
      name: "profile-info___ar"
    }, {
      path: "job-required",
      component: _94913b8e,
      name: "profile-job-required___ar"
    }, {
      path: "majors",
      component: _4de25c64,
      name: "profile-majors___ar"
    }, {
      path: "membership-info",
      component: _c7aa70aa,
      name: "profile-membership-info___ar"
    }, {
      path: "personal-exp",
      component: _d65651cc,
      name: "profile-personal-exp___ar"
    }, {
      path: "personal-info",
      component: _f2a187fe,
      name: "profile-personal-info___ar"
    }, {
      path: "qualification",
      component: _b9b0f056,
      name: "profile-qualification___ar"
    }, {
      path: "skills",
      component: _7d133268,
      name: "profile-skills___ar"
    }, {
      path: "social-contacts",
      component: _563c4319,
      name: "profile-social-contacts___ar"
    }]
  }, {
    path: "/ar/register",
    component: _8bd0926c,
    name: "register___ar"
  }, {
    path: "/ar/reset-password",
    component: _7c92fd00,
    name: "reset-password___ar"
  }, {
    path: "/ar/salaries",
    component: _4865c5cf,
    name: "salaries___ar"
  }, {
    path: "/ar/salary-reports",
    component: _8bf56eba,
    name: "salary-reports___ar"
  }, {
    path: "/ar/search-on-employee",
    component: _bad55b44,
    name: "search-on-employee___ar"
  }, {
    path: "/ar/terms-conditions",
    component: _7b9ec525,
    name: "terms-conditions___ar"
  }, {
    path: "/ar/verify-email",
    component: _530de12f,
    name: "verify-email___ar"
  }, {
    path: "/en/about-us",
    component: _6e6ff176,
    name: "about-us___en"
  }, {
    path: "/en/bank-accounts",
    component: _19037166,
    name: "bank-accounts___en"
  }, {
    path: "/en/blogs",
    component: _1f0ae4c0,
    name: "blogs___en"
  }, {
    path: "/en/company-profile",
    component: _d1bf4c30,
    name: "company-profile___en"
  }, {
    path: "/en/contact-us",
    component: _d6406adc,
    name: "contact-us___en"
  }, {
    path: "/en/employee-profile",
    component: _44518cf1,
    name: "employee-profile___en"
  }, {
    path: "/en/find-jobs",
    component: _41820739,
    name: "find-jobs___en"
  }, {
    path: "/en/forget-password",
    component: _c24a1cec,
    name: "forget-password___en"
  }, {
    path: "/en/hiring-law",
    component: _f16dac26,
    name: "hiring-law___en"
  }, {
    path: "/en/login",
    component: _690cac10,
    name: "login___en"
  }, {
    path: "/en/majors",
    component: _02f0f441,
    name: "majors___en"
  }, {
    path: "/en/messages",
    component: _e167eb9a,
    name: "messages___en"
  }, {
    path: "/en/news",
    component: _8864460c,
    name: "news___en"
  }, {
    path: "/en/otp-code",
    component: _b160f714,
    name: "otp-code___en"
  }, {
    path: "/en/profile",
    component: _8d100716,
    children: [{
      path: "",
      component: _67909738,
      name: "profile___en"
    }, {
      path: "contact-info",
      component: _19958a76,
      name: "profile-contact-info___en"
    }, {
      path: "courses",
      component: _9e7e98c4,
      name: "profile-courses___en"
    }, {
      path: "info",
      component: _493dc9b8,
      name: "profile-info___en"
    }, {
      path: "job-required",
      component: _94913b8e,
      name: "profile-job-required___en"
    }, {
      path: "majors",
      component: _4de25c64,
      name: "profile-majors___en"
    }, {
      path: "membership-info",
      component: _c7aa70aa,
      name: "profile-membership-info___en"
    }, {
      path: "personal-exp",
      component: _d65651cc,
      name: "profile-personal-exp___en"
    }, {
      path: "personal-info",
      component: _f2a187fe,
      name: "profile-personal-info___en"
    }, {
      path: "qualification",
      component: _b9b0f056,
      name: "profile-qualification___en"
    }, {
      path: "skills",
      component: _7d133268,
      name: "profile-skills___en"
    }, {
      path: "social-contacts",
      component: _563c4319,
      name: "profile-social-contacts___en"
    }]
  }, {
    path: "/en/register",
    component: _8bd0926c,
    name: "register___en"
  }, {
    path: "/en/reset-password",
    component: _7c92fd00,
    name: "reset-password___en"
  }, {
    path: "/en/salaries",
    component: _4865c5cf,
    name: "salaries___en"
  }, {
    path: "/en/salary-reports",
    component: _8bf56eba,
    name: "salary-reports___en"
  }, {
    path: "/en/search-on-employee",
    component: _bad55b44,
    name: "search-on-employee___en"
  }, {
    path: "/en/terms-conditions",
    component: _7b9ec525,
    name: "terms-conditions___en"
  }, {
    path: "/en/verify-email",
    component: _530de12f,
    name: "verify-email___en"
  }, {
    path: "/ar/company-profile/details/:id",
    component: _cdd2b4fa,
    name: "company-profile-details-id___ar"
  }, {
    path: "/en/company-profile/details/:id",
    component: _cdd2b4fa,
    name: "company-profile-details-id___en"
  }, {
    path: "/ar/blogs/:id",
    component: _6613d88b,
    name: "blogs-id___ar"
  }, {
    path: "/ar/busniss-platform/:id?",
    component: _3d9f7d98,
    name: "busniss-platform-id___ar"
  }, {
    path: "/ar/company-profile/:id?",
    component: _0b4bb650,
    name: "company-profile-id___ar"
  }, {
    path: "/ar/jobs/:id?",
    component: _7964f465,
    name: "jobs-id___ar"
  }, {
    path: "/ar/majors/:id",
    component: _1877f2a8,
    name: "majors-id___ar"
  }, {
    path: "/ar/news/:id",
    component: _a3c82a36,
    name: "news-id___ar"
  }, {
    path: "/ar/post-job/:id?",
    component: _4d63511f,
    name: "post-job-id___ar"
  }, {
    path: "/company-profile/details/:id",
    component: _cdd2b4fa,
    name: "company-profile-details-id___ar___default"
  }, {
    path: "/en/blogs/:id",
    component: _6613d88b,
    name: "blogs-id___en"
  }, {
    path: "/en/busniss-platform/:id?",
    component: _3d9f7d98,
    name: "busniss-platform-id___en"
  }, {
    path: "/en/company-profile/:id?",
    component: _0b4bb650,
    name: "company-profile-id___en"
  }, {
    path: "/en/jobs/:id?",
    component: _7964f465,
    name: "jobs-id___en"
  }, {
    path: "/en/majors/:id",
    component: _1877f2a8,
    name: "majors-id___en"
  }, {
    path: "/en/news/:id",
    component: _a3c82a36,
    name: "news-id___en"
  }, {
    path: "/en/post-job/:id?",
    component: _4d63511f,
    name: "post-job-id___en"
  }, {
    path: "/blogs/:id",
    component: _6613d88b,
    name: "blogs-id___ar___default"
  }, {
    path: "/busniss-platform/:id?",
    component: _3d9f7d98,
    name: "busniss-platform-id___ar___default"
  }, {
    path: "/company-profile/:id?",
    component: _0b4bb650,
    name: "company-profile-id___ar___default"
  }, {
    path: "/jobs/:id?",
    component: _7964f465,
    name: "jobs-id___ar___default"
  }, {
    path: "/majors/:id",
    component: _1877f2a8,
    name: "majors-id___ar___default"
  }, {
    path: "/news/:id",
    component: _a3c82a36,
    name: "news-id___ar___default"
  }, {
    path: "/post-job/:id?",
    component: _4d63511f,
    name: "post-job-id___ar___default"
  }, {
    path: "/",
    component: _71ae7c1e,
    name: "index___ar___default"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
