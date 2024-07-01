<template>
  <main class="agents my-12" v-if="agents.length > 0">
    <v-container>
      <h2 class="text-center mb-8">{{ $t('agents') }}</h2>

      <client-only>
        <swiper ref="mySwiper" :options="swiperOptions" :dir="direction">
          <swiper-slide v-for="(agent, i) in agents" :key="i">
            <section class="img-wrap ratio-80">
              <div class="img-content bg-light-blue radius-10">
                <img :src="agent.logo || ''" alt="" />
              </div>
            </section>
          </swiper-slide>

          <div
            :style="prevBtnStyle"
            class="swiper-button swiper-button--prev"
            slot="button-prev"
            v-if="agents.length > 3"
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
        </swiper>
      </client-only>
    </v-container>
  </main>
</template>

<script>
export default {
  name: 'agents',
  data() {
    return {
      swiperOptions: {
        slidesPerView: 5,
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
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          320: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
        },
      },
      agents: [],
      loadingData: false,
    }
  },
  created() {
    this.gedagents()
  },
  methods: {
    nextSlide() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prevSlide() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    gedagents() {
      this.loadingData = true
      this.$axios.get(`/visitor/hiring-agents`).then((res) => {
        const { data, meta } = res.data
        this.agents = data
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

