import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import * as VueGoogleMaps from 'vue2-google-maps'
import GoogleMaps from '@/components/GoogleMaps'
import { Swiper as SwiperClass, Autoplay } from 'swiper/core'

// import style
import 'swiper/swiper.min.css'

Vue.component('google-map', GoogleMaps)
Vue.use(VueAwesomeSwiper)

Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'places',
    language: 'ar',
  },
})
SwiperClass.use([Autoplay])
