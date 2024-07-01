<template>
  <main class="majors my-12">
    <v-container>
      <h2 class="mb-8">{{ $t('majors') }}</h2>

      <client-only>
        <swiper ref="mySwiper" :options="swiperOptions" :dir="direction">
          <swiper-slide v-for="(major, i) in majors" :key="i">
            <LazyCardsMajor :major="major" />
          </swiper-slide>
          <template v-if="majors.length > 3">
            <div
              :style="prevBtnStyle"
              class="swiper-button swiper-button--prev"
              slot="button-prev"
            >
              <v-btn large @click="prevSlide" icon>
                <v-icon color="primary" v-if="$i18n.locale === 'ar'"
                  >mdi-chevron-left</v-icon
                >
                <v-icon color="primary" v-else>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <div class="swiper-button swiper-button--next" slot="button-next">
              <v-btn style="right: 0" icon large @click="nextSlide">
                <v-icon color="primary" v-if="$i18n.locale === 'ar'"
                  >mdi-chevron-right</v-icon
                >
                <v-icon color="primary" v-else>mdi-chevron-left</v-icon>
              </v-btn>
            </div>
          </template>
        </swiper>
      </client-only>
    </v-container>
  </main>
</template>

<script>
export default {
  name: 'Majors',
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
        },
      },
      majors: [],
      loadingData: false,
    }
  },
  created() {
    this.gedMajors()
  },
  methods: {
    nextSlide() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prevSlide() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    gedMajors() {
      this.loadingData = true
      this.$axios.get(`/visitor/majors`).then((res) => {
        const { data, meta } = res.data
        this.majors = data
        this.loadingData = false
      })
    },
  },
  computed: {
    direction() {
      if (this.$i18n.locale === 'ar') {
        return 'rtl'
      } else {
        return 'ltr'
      }
    },
    prevBtnStyle() {
      if (this.$i18n.locale === 'ar') {
        return 'left:0'
      } else {
        return 'right:0'
      }
    },
  },
}
</script>

