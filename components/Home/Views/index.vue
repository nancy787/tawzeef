<template>
  <main class="s__wrappers">
    <v-container>
      <section class="bank-accounts__wrapper">
        <v-row>
          <v-col lg="5" sm="12" cols="12">
            <div class="bank-accounts__wrapper--slider pa-12 text-center h-100">
              <v-progress-circular
                :rotate="270"
                :size="150"
                :width="12"
                :value="profile.completedProfileRatio"
                color="primary"
              >
                <h2>{{ `${profile.completedProfileRatio}%` }}</h2>
              </v-progress-circular>
              <h4 class="pt-5" style="color: #000">
                {{ $t('complete_you_cv') }}
              </h4>
              <p class="pt-5" style="color: #000">
                <span>{{ $t('last_updated_cv') }} </span>
                <span>{{ profile.latest_updated_at }}</span>
              </p>
              <v-btn color="primary" elevation="0" to="/profile" large>{{
                $t('update_my_cv')
              }}</v-btn>
            </div>
          </v-col>
          <v-col lg="7" sm="12" cols="12">
            <div class="bank-accounts__wrapper--slider pa-5 mb-5">
              <h3 class="mb-6">{{ $t('create_job_alert') }}</h3>
              <v-form @submit.prevent="sendMessage">
                <v-row>
                  <v-col lg="6" sm="12" cols="12" class="my-0 py-0">
                    <v-combobox
                      v-model="form.hashtags"
                      :label="$t('open_keys')"
                      small-chips
                      dense
                      filled
                      multiple
                    ></v-combobox>
                  </v-col>
                  <v-col lg="6" sm="12" cols="12" class="my-0 py-0">
                    <v-autocomplete
                      :items="countries"
                      background-color="#fff"
                      item-text="name"
                      item-value="id"
                      filled
                      :label="$t('country')"
                      v-model="form.country_id"
                    ></v-autocomplete>
                  </v-col>
                  <v-col lg="6" sm="12" cols="12" class="my-0 py-0">
                    <v-autocomplete
                      :items="cities"
                      item-text="name"
                      item-value="id"
                      background-color="#fff"
                      filled
                      :label="$t('city')"
                      v-model="form.city_id"
                    ></v-autocomplete>
                  </v-col>
                  <v-col lg="6" sm="12" cols="12" class="my-0 py-0">
                    <v-autocomplete
                      :items="notifications"
                      background-color="#fff"
                      item-text="name"
                      item-value="name"
                      filled
                      :label="$t('notify')"
                      v-model="form.notify"
                    ></v-autocomplete>
                  </v-col>
                  <v-col sm="12" cols="12" class="pt-0">
                    <v-btn
                      :loading="loadingBtn"
                      type="submit"
                      :disabled="form.notify == ''"
                      large
                      block
                      elevation="0"
                      class="primary"
                      >{{ $t('create_job_alert') }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </div>
            <div class="bank-accounts__wrapper--slider pa-5">
              <h3 class="color-primary mb-4">{{ $t('who_viewed_profile') }}</h3>
              <client-only>
                <swiper
                  ref="mySwiper"
                  :options="swiperOptions"
                  :dir="direction"
                >
                  <swiper-slide
                    v-for="(item, index) in seenCompanies"
                    :key="index"
                  >
                    <v-row no-gutters>
                      <v-col cols="3">
                        {{ item.avatar }}
                        <img
                          :src="
                            item
                              ? item.avatar
                              : require('@/assets/images/avatar.png')
                          "
                          alt=""
                        />
                      </v-col>
                      <v-col cols="9">
                        <article>
                          <h3>{{ item.foundation_name || '' }}</h3>
                          <p>{{ item.description || '' }}</p>
                        </article>
                      </v-col>
                    </v-row>
                  </swiper-slide>
                </swiper>
              </client-only>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </main>
</template>


<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Views',
  data() {
    return {
      salary: '',
      seenCompanies: [],
      countries: [],
      allCities: [],
      profile: {},
      form: {
        hashtags: [],
        notify: '',
      },
      loadingBtn: false,
      notifications: [
        { name: 'daily' },
        { name: 'weekly' },
        { name: 'monthly' },
      ],
    }
  },
  created() {
    this.getCountires()
  },
  methods: {
    async getCountires() {
      const res = await this.$axios.get('/general/countries')
      const { data } = res.data
      this.countries = data.map((country) => ({
        id: country.id,
        name: country.name[this.$i18n.locale],
      }))
      setTimeout(() => {
        data.forEach((country) => {
          this.getCities(country.id)
        })
      }, 1000)
    },
    getCities(country_id) {
      this.$axios.get(`/general/countries/${country_id}/cities`).then((res) => {
        const { data } = res.data
        this.allCities = [...this.allCities, ...data]
      })
    },
    async getProfile() {
      const res = await this.$axios.get('/user/profile')
      const { data } = res.data
      this.profile = data
    },
    async getSeen() {
      const res = await this.$axios.get('/employer/seen/company')
      const { data } = res.data
      this.seenCompanies = data
    },
    nextSlide() {
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prevSlide() {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    sendMessage() {
      this.loadingBtn = true
      this.$axios
        .post(`/employer/job-alert`, this.form)
        .then(() => {
          this.loadingBtn = false
          this.form = {}
          this.form.notify = ''
        })
        .finally(() => (this.loadingBtn = false))
    },
  },
  mounted() {
    this.getSeen()
    if (this.$auth.user.type === 'USER') {
      this.getProfile()
    }
  },
  computed: {
    // ...mapGetters({
    //   profile: 'profile/getProfile',
    // }),
    swiperOptions() {
      return {
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: -10,
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
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
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
  watch: {
    allCities: {
      handler(value) {
        if (value) {
          this.cities = value.map((el) => ({
            name: el.name[this.$i18n.locale],
            id: el.id,
          }))
        }
      },
      immediate: true,
    },
  },
}
</script>

