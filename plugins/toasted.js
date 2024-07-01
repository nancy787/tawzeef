import Toasted from 'vue-toasted'
import Vue from 'vue'
Vue.use(Toasted, {
  position: 'top-center',
  className: 'toasted-style',
  duration: 3000,
  action: {
    text: 'Close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})
