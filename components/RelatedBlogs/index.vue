<template>
  <main class="my-12">
    <v-container>
      <h2 class="mb-8">{{ $t('related_blogs') }}</h2>

      <client-only>
        <swiper ref="mySwiper" :options="swiperOptions" :dir="direction">
          <swiper-slide v-for="(item, i) in blogs" :key="i">
            <v-card
              :to="`/blogs/${item.id}`"
              class="blog-card bordered radius-10"
            >
              <section class="img-wrap ratio-100">
                <div class="img-content radius-10">
                  <img
                    :src="item.media || require('@/assets/images/avatar.png')"
                    alt=""
                  />
                </div>
              </section>
              <h2>{{ item.title[$i18n.locale] || '' }}</h2>
            </v-card>
          </swiper-slide>
          <template v-if="blogs.length > 3">
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
  name: 'blogs',
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: false,
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
          1280: {
            slidesPerView: 4.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3.5,
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
      blogs: [],
      loadingData: false,
    }
  },
  created() {
    this.gedblogs()
  },
  methods: {
    nextSlide() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prevSlide() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    gedblogs() {
      this.loadingData = true
      this.$axios
        .get(`/visitor/blogs/${this.$route.params.id}/related`)
        .then((res) => {
          const { data, meta } = res.data
          this.blogs = data
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

