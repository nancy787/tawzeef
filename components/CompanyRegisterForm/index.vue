<template>
  <form-wrapper :validator="$v.form">
    <v-form @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="foundation_name" attribute="foundation_name">
            <template slot-scope="{ attrs, listeners }">
              <v-text-field
                v-bind="attrs"
                v-on="listeners"
                filled
                v-model="form.foundation_name"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="phone" attribute="phone">
            <template slot-scope="{ attrs, listeners }">
              <v-text-field
                v-bind="attrs"
                v-on="listeners"
                filled
                type="number"
                v-model="form.phone"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="email_main_domain" attribute="email_main_domain">
            <template slot-scope="{ attrs, listeners }">
              <v-text-field
                v-on="listeners"
                v-bind="attrs"
                filled
                v-model="form.email_main_domain"
                type="email"
                :append-icon="'mdi-email'"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="confirm_email" attribute="confirm_email">
            <template slot-scope="{ attrs, listeners }">
              <v-text-field
                v-on="listeners"
                v-bind="attrs"
                filled
                :label="$t('labels.confirm_email')"
                v-model="form.confirm_email"
                type="email"
                :append-icon="'mdi-email'"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="password" attribute="password">
            <template slot-scope="{ attrs, listeners }">
              <v-text-field
                v-bind="attrs"
                v-on="listeners"
                filled
                v-model="form.password"
                :type="!showPassword ? 'password' : 'text'"
                :label="$t('password')"
                :append-icon="passwordIcon"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="nationality_id" attribute="nationality_id">
            <template slot-scope="{ attrs, listeners }">
              <v-autocomplete
                :loading="loadingNationalities"
                :items="nationalities"
                item-text="name"
                item-value="id"
                v-bind="attrs"
                v-on="listeners"
                filled
                v-model="form.nationality_id"
                @change="getNationalities"
              ></v-autocomplete>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="country_id" attribute="country_id">
            <template slot-scope="{ attrs, listeners }">
              <v-autocomplete
                :loading="loadingCountries"
                :items="countires"
                item-text="name"
                item-value="id"
                v-bind="attrs"
                v-on="listeners"
                filled
                v-model="form.country_id"
                @change="getCities"
              ></v-autocomplete>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="city_id" attribute="city_id">
            <template slot-scope="{ attrs, listeners }">
              <v-autocomplete
                :items="cities"
                item-text="name"
                item-value="id"
                :loading="loadingCities"
                :disabled="disabledCity"
                v-bind="attrs"
                v-on="listeners"
                filled
                v-model="form.city_id"
              ></v-autocomplete>
            </template>
          </form-group>
        </v-col>

        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="sector_id" attribute="sector_id">
            <template slot-scope="{ attrs, listeners }">
              <v-autocomplete
                :loading="loadingSectors"
                :items="sectors"
                item-text="name"
                item-value="id"
                v-bind="attrs"
                v-on="listeners"
                filled
                v-model="form.sector_id"
              ></v-autocomplete>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="working_type" attribute="working_type">
            <template slot-scope="{ attrs, listeners }">
              <v-autocomplete
                :items="workingTypes"
                v-bind="attrs"
                v-on="listeners"
                item-value="name"
                item-text="text"
                filled
                v-model="form.working_type"
              ></v-autocomplete>
            </template>
          </form-group>
        </v-col>

        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="commercial_file" attribute="commercial_file">
            <template slot-scope="{ attrs, listeners }">
              <LazyFileUpload
                @fileSelected="onFileSelect"
                v-bind="attrs"
                v-on="listeners"
                v-model="form.commercial_file"
              />
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="hear_by_id" attribute="hear_by_id">
            <template slot-scope="{ attrs, listeners }">
              <v-autocomplete
                :items="hearByItems"
                v-bind="attrs"
                v-on="listeners"
                item-value="id"
                item-text="name"
                filled
                v-model="form.hear_by_id"
              ></v-autocomplete>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" class="py-0 my-0">
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12" class="py-0 my-0">
                  <form-group name="address" attribute="address">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="listeners"
                        filled
                        v-model="form.address"
                        :append-icon="'mdi-map-marker'"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" class="py-0 my-0">
                  <form-group name="members_count" attribute="members_count">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        v-bind="attrs"
                        v-on="listeners"
                        filled
                        type="number"
                        v-model="form.members_count"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="py-0 my-0">
              <form-group name="description" attribute="description">
                <template slot-scope="{ attrs, listeners }">
                  <v-textarea
                    height="145px"
                    no-resize
                    v-bind="attrs"
                    v-on="listeners"
                    filled
                    v-model="form.description"
                  ></v-textarea>
                </template>
              </form-group>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="my-0 py-0">
          <v-btn
            :disabled="$v.form.$invalid"
            class="mt-5 text-capitalize primary"
            color="#fff"
            block
            large
            type="submit"
            :loading="loadingBtn"
            >{{ $t('register') }}</v-btn
          >
        </v-col>
        <v-col cols="12" class="py-5">
          <p class="text-center register__left-side__notes">
            <nuxt-link :to="localePath('/terms-conditions')">
              {{ $t('when_register') }}
            </nuxt-link>
          </p>
        </v-col>
        <!-- <v-col cols="12" class="py-5">
          <p class="text-center">
            {{ $t('register_via') }}
          </p>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <v-btn
            large
            @click="googleRegister"
            block
            color="transparent"
            class="mt-3 text-capitalize"
          >
            <strong class="mt-2">Google</strong>
            <img
              class="mx-2"
              width="21px"
              height="21px"
              :src="require('@/assets/images/google.svg')"
            />
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <v-btn
            large
            @click="facebookRegister"
            block
            color="transparent"
            class="mt-3 text-capitalize"
          >
            <strong class="mt-2">Facebook</strong>
            <img
              class="mx-2"
              width="21px"
              height="21px"
              :src="require('@/assets/images/facebook.svg')"
            />
          </v-btn>
        </v-col> -->
      </v-row>
    </v-form>
  </form-wrapper>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'CompanyRegisterForm',
  data() {
    return {
      showPassword: false,
      form: {
        email_main_domain: '',
        password: '',
        country_id: '',
        city_id: '',
        sector_id: '',
        commercial_file: '',
        hear_by_id: '',
        foundation_name: '',
        phone: '',
        working_type: '',
        address: '',
        description: '',
        nationality_id: '',
        members_count: '',
        confirm_email: '',
      },
      sectors: [],
      hearByItems: [],
      countires: [],
      nationalities: [],
      cities: [],
      loadingMajors: true,
      loadingSectors: true,
      loadingCountries: true,
      loadingNationalities: true,
      loadingCities: false,
      disabledCity: true,
      loadingBtn: false,
      type: 'COMPANY',
      confirm_emailRules: [
        (v) => v === this.form.email || 'يرجي تأكيد البريد اﻷلكتروني',
      ],
    }
  },
  methods: {
    getNationalities() {
      this.$axios.get('/general/nationalities').then((res) => {
        const { data } = res.data
        this.loadingNationalities = false
        this.nationalities = data.map((el) => ({
          id: el.id,
          name: el.name[this.$i18n.locale],
        }))
      })
    },
    async getHearingBy() {
      const res = await this.$axios.get('general/hear_by')
      const { data } = res.data
      this.hearByItems = data.map((el) => ({
        name: el.name[this.$i18n.locale],
        id: el.id,
      }))
    },
    onFileSelect({ file }) {
      this.form.commercial_file = file
    },
    // googleRegister() {
    //   this.$auth.loginWith('google').then((res) => {
    //     console.log(res)
    //   })
    // },
    // facebookRegister() {
    //   // this.$auth.loginWith('facebook')
    //   this.handleFacebookLogIn()
    // },
    // handleFacebookLogIn() {
    //   window.FB.login(
    //     (response) => {
    //       if (response.authResponse) {
    //         window.FB.api('/me?fields=email,name', (res) => {
    //           console.log(res, 'facebook')
    //           // this.$store.dispatch('user/setSocialUserInfo', {
    //           //   ...response,
    //           //   socialProviderId: 1,
    //           // })
    //           // const reqData = {
    //           //   user_social_id: Number(response.id),
    //           //   provider_users: 1,
    //           // }
    //           // this.$store
    //           //   .dispatch('user/socialLogin', reqData)
    //           //   .then((data) => {
    //           //     if (data.access_token) {
    //           //       this.loginStatus = 'SUCCESS'
    //           //     }
    //           //   })
    //           //   .then(() => window.location.reload())
    //           //   .catch(() => {
    //           //     this.$router.push('/signup')
    //           //   })
    //         })
    //       } else {
    //         console.log('User cancelled login or did not fully authorize.')
    //       }
    //     },
    //     { scope: 'email' }
    //   )
    // },
    async handleSubmit() {
      try {
        this.loadingBtn = true
        const formData = new FormData()
        for (const key in this.form) {
          if (this.form[key] !== '') {
            formData.append(key, this.form[key])
          }
        }
        const res = await this.$axios.post('/auth/company/register', formData)
        if (res !== undefined && res.status === 200) {
          this.$router.push(
            this.localePath({ path: '/login', query: this.$route.query })
          )
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingBtn = false
      }
    },
    getSectors() {
      this.$axios.get('/general/sectors').then((res) => {
        const { data } = res.data
        this.loadingSectors = false
        this.sectors = data.map((sector) => {
          return {
            id: sector.id,
            name: sector.name[this.$i18n.locale],
          }
        })
      })
    },
    getCountires() {
      this.$axios.get('/general/countries').then((res) => {
        const { data } = res.data
        this.loadingCountries = false
        this.countires = data.map((el) => ({
          id: el.id,
          name: el.name[this.$i18n.locale],
        }))
      })
    },
    getCities() {
      this.loadingCities = true
      this.$axios
        .get(`/general/countries/${this.form.country_id}/cities`)
        .then((res) => {
          const { data } = res.data
          this.loadingCities = false
          this.disabledCity = false
          this.cities = data.map((el) => ({
            id: el.id,
            name: el.name[this.$i18n.locale],
          }))
        })
    },
  },
  computed: {
    workingTypes() {
      return [
        { name: 'full_time', text: this.$t('full_time') },
        { name: 'part_time', text: this.$t('part_time') },
        { name: 'remotely', text: this.$t('remotely') },
      ]
    },
    passwordIcon() {
      if (!this.showPassword) {
        return 'mdi-eye-off'
      } else {
        return 'mdi-eye'
      }
    },
  },
  watch: {
    $route: {
      handler({ query }) {
        this.getSectors()
        this.getCountires()
        this.getHearingBy()
        this.getNationalities()
      },
      immediate: true,
    },
  },
  validations: {
    form: {
      email_main_domain: {
        required,
        email,
      },
      confirm_email: {
        required,
        email,
        same_email: sameAs('email_main_domain'),
      },
      password: {
        required,
      },
      country_id: {
        required,
      },
      nationality_id: {
        required,
      },
      city_id: {
        required,
      },
      sector_id: {
        required,
      },
      commercial_file: {
        required,
      },
      hear_by_id: {
        required,
      },
      foundation_name: {
        required,
      },
      phone: {
        required,
      },
      working_type: {
        required,
      },
      members_count: {
        required,
      },
      address: {
        required,
      },
      description: {
        required,
      },
    },
  },
}
</script>
