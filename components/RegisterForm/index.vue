<template>
  <form-wrapper :validator="$v.form">
    <v-form @submit.prevent="handleRegister">
      <v-row>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="first_name" attribute="first_name">
            <template slot-scope="{ attrs, listeners }">
              <v-text-field
                dense
                filled
                v-model="form.first_name"
                v-on="listeners"
                v-bind="attrs"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="last_name" attribute="last_name">
            <template slot-scope="{ attrs, listeners }">
              <v-text-field
                dense
                filled
                v-model="form.last_name"
                v-on="listeners"
                v-bind="attrs"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>

        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="email" attribute="email">
            <template slot-scope="{ attrs, listeners }">
              <v-text-field
                v-on="listeners"
                v-bind="attrs"
                filled
                v-model="form.email"
                type="email"
                :append-icon="'mdi-email'"
              ></v-text-field>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="confirm_email" attribute="email">
            <template>
              <v-text-field
                label="تأكيد البريد اﻷلكتروني"
                filled
                v-model="form.confirmEmail"
                type="email"
                :append-icon="'mdi-email'"
                :rules="confirmEmailRules"
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
          <form-group name="nationality_id" attribute="nationality_id">
            <template slot-scope="{ attrs, listeners }">
              <v-autocomplete
                :loading="loadingnationalities"
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
          <v-text-field
            :label="$t('job_title')"
            filled
            v-model="form.job_title"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <form-group name="major_id" attribute="major_id">
            <template slot-scope="{ attrs, listeners }">
              <v-autocomplete
                :loading="loadingMajors"
                :items="majors"
                item-text="name"
                item-value="id"
                v-bind="attrs"
                v-on="listeners"
                filled
                v-model="form.major_id"
              ></v-autocomplete>
            </template>
          </form-group>
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <LazyFileUpload
            @fileSelected="onFileSelect"
            :label="$t('cv')"
            v-model="form.cv"
          />
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
        </v-col> -->
        <!-- <v-col cols="12" md="6" class="py-0 my-0">
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
        </v-col>
        <v-col cols="12" md="6" class="py-0 my-0">
          <v-btn
            large
            @click="appleRegister"
            data-color="black"
            data-border="true"
            data-type="sign in"
            block
            color="transparent"
            class="mt-3 text-capitalize"
          >
            <strong class="mt-2">Apple</strong>
          </v-btn>
        </v-col> -->
      </v-row>
    </v-form>
  </form-wrapper>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'RegisterForm',

  data() {
    return {
      showPassword: false,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        country_id: '',
        nationality_id: '',
        city_id: '',
        // job_title: '',
        major_id: '',
        // cv: '',
        hear_by_id: '',
        confirmEmail: '',
      },

      majors: [],
      countires: [],
      nationalities: [],
      hearByItems: [],
      cities: [],
      loadingMajors: true,
      loadingCountries: true,
      loadingnationalities: true,
      loadingCities: false,
      disabledCity: true,
      loadingBtn: false,
      confirmEmailRules: [
        (v) => v === this.form.email || 'يرجي تأكيد البريد الالكتروني',
      ],
    }
  },
  methods: {
    async getHearingBy() {
      const res = await this.$axios.get('general/hear_by')
      const { data } = res.data
      this.hearByItems = data.map((el) => ({
        name: el.name[this.$i18n.locale],
        id: el.id,
      }))
    },
    onFileSelect({ file }) {
      this.form.cv = file
    },
    googleRegister() {
      this.$auth.loginWith('google')
    },
    async appleRegister() {
      try {
        const data = await AppleID.auth.signIn()
      } catch (error) {
        //handle error.
      }
    },
    facebookRegister() {
      // this.$auth.loginWith('facebook')
      this.handleFacebookLogIn()
    },
    handleFacebookLogIn() {
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            window.FB.api('/me?fields=email,name', () => {
              this.getFaceBookAccessToken()
            })
          }
        },
        { scope: 'email' }
      )
    },
    getFaceBookAccessToken() {
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          var accessToken = response.authResponse.accessToken
        }
      })
    },
    handleRegister() {
      this.loadingBtn = true
      const loginData = {
        type: 'USER',
        email: this.form.email,
        password: this.form.password,
      }
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      this.$axios
        .post('/auth/user/register', formData)
        .then((res) => {
          if (res !== undefined && res.status == 200) {
            this.$router.push(
              this.localePath({
                path: '/login',
                query: { ...this.$route.query },
              })
            )
          }
        })

        .finally(() => {
          this.loadingBtn = false
        })
    },
    getMajors() {
      this.$axios.get('/general/majors').then((res) => {
        const { data } = res.data
        this.loadingMajors = false
        this.majors = data.map((major) => {
          return {
            id: major.id,
            name: major.name[this.$i18n.locale],
          }
        })
      })
    },
    getCountries() {
      this.$axios.get('/general/countries').then((res) => {
        const { data } = res.data
        this.loadingCountries = false
        this.countires = data.map((el) => ({
          id: el.id,
          name: el.name[this.$i18n.locale],
        }))
      })
    },
    getNationalities() {
      this.$axios.get('/general/nationalities').then((res) => {
        const { data } = res.data
        this.loadingnationalities = false
        this.nationalities = data.map((el) => ({
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
      handler() {
        this.getMajors()
        this.getCountries()
        this.getHearingBy()
        this.getNationalities()
      },
      immediate: true,
    },
  },

  validations: {
    form: {
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      email: {
        required,
        email,
      },
      confirmEmail: {
        required,
        email,
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

      major_id: {
        required,
      },

      hear_by_id: {
        required,
      },
    },
  },
}
</script>
