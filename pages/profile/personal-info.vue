<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('personal_info') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-form @submit.prevent="handleSubmit">
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
                  <form-group name="birthdate" attribute="birthdate">
                    <template slot-scope="{ attrs }">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            @blur="$v.form.birthdate.$touch()"
                            v-model="form.birthdate"
                            filled
                            dense
                            append-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          @change="menu = !menu"
                          :allowed-dates="allowedDates"
                          v-model="form.birthdate"
                          no-title
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                  </form-group>
                </v-col>

                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="sex" attribute="sex">
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="genders"
                        item-text="text"
                        item-value="value"
                        dense
                        filled
                        v-model="form.sex"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="nationality_id" attribute="nationality_id">
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="nationalities"
                        item-text="name"
                        item-value="id"
                        dense
                        filled
                        v-model="form.nationality_id"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="country_id" attribute="country_id">
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="countries"
                        item-text="name"
                        item-value="id"
                        dense
                        filled
                        v-model="form.country_id"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="city_id" attribute="city_id">
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :loading="loadingCity"
                        :disabled="disabledCity"
                        :items="cities"
                        item-text="name"
                        item-value="id"
                        dense
                        filled
                        v-model="form.city_id"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="social_status" attribute="social_status">
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="socialStatus"
                        item-text="name"
                        item-value="value"
                        dense
                        filled
                        v-model="form.social_status"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                    </template>
                  </form-group>
                </v-col>
                <!-- <v-col cols="12" md="6" class="py-0 my-0">
                  <v-text-field
                    type="number"
                    dense
                    filled
                    v-model.number="form.members_count"
                    :label="$t('members_count')"
                  ></v-text-field>
                </v-col> -->
                <!-- <v-col cols="12" md="6" class="py-0 my-0">
                  <v-select
                    :items="countries"
                    item-text="name"
                    item-value="id"
                    dense
                    filled
                    v-model="form.drive_licence_nationality_id"
                    :label="$t('drive_licence_nationality_id')"
                  ></v-select>
                </v-col> -->

                <v-col cols="12" md="6" class="py-0 my-0">
                  <v-btn
                    type="submite"
                    :disabled="$v.form.$invalid"
                    height="54px"
                    class="primary"
                    block
                    :loading="loadingBtn"
                  >
                    <span style="font-size: 18px"> {{ $t('save') }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </form-wrapper>
    </v-container>
  </main>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'PersonalInfo',
  middleware: ['isCompany'],
  async asyncData({ $axios, app }) {
    const countriesRes = await $axios.get('/general/countries')

    return {
      countries: countriesRes.data.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
    }
  },
  data() {
    return {
      menu: false,
      disabledCity: true,
      loadingNationalities: true,
      loadingCity: false,
      loadingBtn: false,
      cities: [],
      nationalities: [],
      form: {
        first_name: '',
        last_name: '',
        birthdate: '',
        sex: '',
        nationality_id: '',
        country_id: '',
        city_id: '',
        social_status: '',
      },
    }
  },
  created() {
    this.getNationalities()
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
    allowedDates(dates) {
      const allDates = new Date(dates)
      const currentDate = Date.now()

      return allDates < currentDate
    },
    handleSubmit() {
      this.loadingBtn = true
      this.$axios
        .post('/user/update-personal-info', this.form)
        .then(() => {
          this.$store.dispatch('profile/setUserProfile')
          this.$router.push(this.localePath('/profile'))
        })
        .finally(() => {
          this.loadingBtn = false
        })
    },
    getCities() {
      this.loadingCity = true
      this.$axios
        .get(`/general/countries/${this.form.country_id}/cities`)
        .then((res) => {
          const { data } = res.data
          this.cities = data.map((el) => ({
            id: el.id,
            name: el.name[this.$i18n.locale],
          }))
          this.loadingCity = false
          this.disabledCity = false
        })
    },
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
    genders() {
      return [
        { text: this.$t('male'), value: 'male' },
        { text: this.$t('female'), value: 'female' },
      ]
    },
    socialStatus() {
      return [
        { name: this.$t('single'), value: 'single' },
        { name: this.$t('married'), value: 'married' },
      ]
    },
  },
  watch: {
    'form.country_id': {
      handler(value) {
        if (value) {
          this.getCities()
        }
      },
      immediate: true,
    },
    profile: {
      handler({ personal_information }) {
        if (personal_information.city) {
          this.form = {
            ...personal_information,
            nationality_id: personal_information.nationality.id,
            city_id: personal_information.city.id,
            country_id: personal_information.country.id,
            // drive_licence_nationality_id:
            //   personal_information.drive_licence_nationality.id,
          }
        }
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
      birthdate: {
        required,
      },
      sex: {
        required,
      },
      nationality_id: {
        required,
      },
      country_id: {
        required,
      },
      city_id: {
        required,
      },
      social_status: {
        required,
      },
    },
  },
}
</script>
