<template>
  <main class="my-12">
    <v-container>
      <h2 class="mb-8">{{ $t('related_news') }}</h2>

      <client-only>
        <swiper
          ref="mySwiper"
          :options="swiperOptions"
          :dir="direction"
          class="pb-12"
        >
          <swiper-slide v-for="(item, i) in news" :key="i">
            <v-card :to="`/news/${item.id}`" class="news-card bordered">
              <section class="img-wrap ratio-100">
                <div class="img-content radius-10">
                  <img
                    :src="item.media || require('@/assets/images/avatar.png')"
                    alt=""
                  />
                </div>
              </section>
              <v-card-text class="px-0">
                <article class="pa-5 bg-light-blue right-5">
                  <h2 class="d-flex justify-space-between">
                    <span>{{ item.title[$i18n.locale] || '' }}</span>
                    <small class="color-gray font-light"
                      >{{ item.seen || ''
                      }}<v-icon small class="color-gray">mdi-eye</v-icon></small
                    >
                  </h2>
                  <p class="mb-0">
                    <small class="color-gray">{{
                      item.published_at || ''
                    }}</small>
                  </p>
                  <p class="mb-0">{{ item.note[$i18n.locale] || '' }}</p>
                </article>
              </v-card-text>
            </v-card>
          </swiper-slide>
          <template v-if="news.length > 3">
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
  name: 'news',
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
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
      news: [],
      loadingData: false,
    }
  },
  created() {
    this.gednews()
  },
  methods: {
    nextSlide() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prevSlide() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    gednews() {
      this.loadingData = true
      this.$axios
        .get(`/visitor/news/${this.$route.params.id}/related`)
        .then((res) => {
          const { data, meta } = res.data
          this.news = data
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

