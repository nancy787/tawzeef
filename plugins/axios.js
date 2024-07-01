import Vue from 'vue'
export default ({ store, app: { $axios, i18n } }) => {
  $axios.onResponse((response) => {
    if (store.getters['errors/serverErrors'] !== null) {
      store.dispatch('errors/ClearServerErrors')
    }
    const { method } = response.config

    if (method === 'post' || method === 'put' || method === 'delete') {
      Vue.toasted.success(response.data.message || i18n.t('success_message'))
    }

    return response
  })
  $axios.onRequest((config) => {
    config.headers.common['X-locale'] = i18n.locale
    config.headers.common.Timezone = `UTC +${
      -new Date().getTimezoneOffset() / 60
    }`
  })

  $axios.onError((err) => {
    // if (err.response && err.response.status === 404) {
    //     redirect('/404')
    // }

    if (err.response && err.response.data && err.response.data.errors) {
      store.dispatch('errors/SetServerErrors', err.response.data.errors)
      return Vue.toasted.error(err.response.data.message)
    }
    Vue.toasted.error(err.response.data.message)
  })
}
