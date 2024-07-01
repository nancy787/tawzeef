<template>
  <main class="s__wrappers">
    <div class="about-us__header">
      <!-- <LazyFiltersHomeForm @on-search="onSearch" /> -->
      <v-container>
        <v-row>
          <v-col cols="12" md="5" class="mx-auto mt-5" v-if="salary">
            <v-row>
              <v-col md="2" class="text-center mx-auto hidden-sm-and-down">
                <img
                  :src="require('@/assets/images/job/1.png')"
                  width="60px"
                  alt="photo"
                />
              </v-col>
              <v-col cols="12" md="10">
                <div class="bank-accounts__salary">
                  <h3 style="color: #fff">
                    <strong style="font-size: 25px" class="font-bold">{{
                      salary.toFixed(0)
                    }}</strong>
                    {{ $t('sar') }}
                  </h3>
                  <p style="color: #fff">
                    {{ $t('average_salary_for') }} <span></span>
                  </p>
                  <p style="color: #f4f4f4" class="py-0">
                    <v-icon small color="#fff">mdi-map-marker</v-icon>
                    الرياض - المملكة العربية السعودية
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container>
      <section class="bank-accounts__wrapper">
        <div class="bank-accounts__wrapper--slider">
          <h1 class="pa-8 pb-0">
            {{ $t('Average salaries for the most popular jobs') }}
          </h1>
          <div>
            <client-only>
              <swiper ref="mySwiper" :options="swiperOptions" :dir="direction">
                <swiper-slide
                  v-for="(item, index) in avg_salaries"
                  :key="index"
                >
                  <CardsSalary :item="item" />
                </swiper-slide>
              </swiper>
            </client-only>
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
              <v-btn style="right: -20px" icon large @click="nextSlide">
                <v-icon color="primary" v-if="$i18n.locale === 'ar'"
                  >mdi-chevron-right</v-icon
                >
                <v-icon color="primary" v-else>mdi-chevron-left</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </section>
    </v-container>
  </main>
</template>


<script>
export default {
  name: 'Salaries',
  async asyncData({ $axios, app }) {
    const res = await $axios.get('/company/find-average-salary')
    const { data } = res.data
    return {
      avg_salaries: data,
    }
  },
  data() {
    return {
      salary: '',
    }
  },
  methods: {
    async getMjorSalary(query) {
      const res = await this.$axios.get('/company/find-major-salary', {
        params: { ...query },
      })
      const data = res.data
      this.salary = data.data
    },
    onSearch(query) {
      this.getMjorSalary(query)
    },
    nextSlide() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prevSlide() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
  },
  computed: {
    swiperOptions() {
      return {
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
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
      }
    },
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
        return 'left:-20px'
      } else {
        return 'right:-20px'
      }
    },
  },
}
</script>

