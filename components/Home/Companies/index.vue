<template>
  <main class="companies-home my-12">
    <v-container>
      <h2 class="text-center mb-8">{{ $t('employment_companies') }}</h2>

      <client-only>
        <section>
          <div class="container">
            <div class="row">
                <div 
            v-for="(company,i) in companies"
            class="col-md-3 npm run dev"
            >
            <div v-if="company.avatar" :key="i" class="">
            <img :src="company.avatar || ''" alt="photo" style="width: 100%; height: 100%;">
            </div>
            </div>
            </div>
            
          </div>
        </section>
        <!-- <swiper ref="mySwiper" :options="swiperOptions" :dir="direction">
          <template v-for="(company, i) in companies">
            <swiper-slide v-if="company.avatar" :key="i">
              <section class="img-wrap ratio-80">
                <div class="img-content radius-10">
                  <img :src="company.avatar || ''" alt="photo" />
                </div>
              </section>
            </swiper-slide>
          </template>
          <template v-if="companies.length > 6">
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
        </swiper> -->
      </client-only>
    </v-container>
  </main>
</template>

<script>
export default {
  name: 'companies',
  data() {
    return {
      swiperOptions: {
        slidesPerView: 6,
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
            slidesPerView: 6,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 4,
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
      companies: [],
      loadingData: false,
    }
  },
  created() {
    this.getCompanies()
  },
  methods: {
    nextSlide() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prevSlide() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    getCompanies() {
      this.loadingData = true
      this.$axios.get(`/visitor/active-companies`).then((res) => {
        const { data, meta } = res.data
        this.companies = data
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

