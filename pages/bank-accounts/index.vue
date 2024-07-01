<template>
  <main class="bank-accounts">
    <div class="about-us__header">
      <!-- <LazyFiltersHomeForm /> -->
    </div>

    <LazyHomeEmploymentRole :role="bank.page">
      <client-only>
        <swiper ref="mySwiper" :options="swiperOptions" :dir="direction">
          <swiper-slide v-for="(account, index) in bank.accounts" :key="index">
            <LazyCardsBank :item="account" />
          </swiper-slide>

          <div
            :style="prevBtnStyle"
            class="swiper-button swiper-button--prev"
            slot="button-prev"
          >
            <v-btn large @click="prevSlide" icon>
              <v-icon small color="primary" v-if="$i18n.locale === 'ar'"
                >mdi-arrow-left</v-icon
              >
              <v-icon small color="primary" v-else>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
          <div class="swiper-button swiper-button--next" slot="button-next">
            <v-btn style="right: 0" icon large @click="nextSlide">
              <v-icon small color="primary" v-if="$i18n.locale === 'ar'"
                >mdi-arrow-right</v-icon
              >
              <v-icon small color="primary" v-else>mdi-arrow-left</v-icon>
            </v-btn>
          </div>
        </swiper>
      </client-only>
    </LazyHomeEmploymentRole>
  </main>
</template>


<script>
export default {
  name: 'BankAccounts',
  async asyncData({ $axios, app }) {
    const res = await $axios.get('/general/banks')
    const { data } = res.data
    return {
      bank: data,
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 2,
        spaceBetween: -10,
        slidesPerGroup: 2,
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
        breakpoints: {
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
    }
  },
  methods: {
    nextSlide() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prevSlide() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
  },
  computed: {
    title() {
      return this.bank.page.title[this.$i18n.locale]
    },
    text() {
      return this.bank.page.note[this.$i18n.locale]
    },
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

