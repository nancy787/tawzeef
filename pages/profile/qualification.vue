<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('qualification') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="qualification_type"
                    attribute="qualification_type"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="types"
                        item-text="name"
                        item-value="value"
                        dense
                        filled
                        v-model="form.qualification_type"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="foundation_name"
                    attribute="foundation_name"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.foundation_name"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
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
                  <form-group
                    name="average_calculation_system"
                    attribute="average_calculation_system"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.average_calculation_system"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="graduation_date"
                    attribute="graduation_date"
                  >
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
                            @blur="$v.form.graduation_date.$touch()"
                            v-model="form.graduation_date"
                            filled
                            dense
                            append-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          @change="menu = !menu"
                          v-model="form.graduation_date"
                          :allowed-dates="allowedDates"
                          no-title
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="graduation_degree"
                    attribute="graduation_degree"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.graduation_degree"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="specialization" attribute="specialization">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.specialization"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="graduation_file"
                    attribute="graduation_file"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <LazyFileUpload
                        @fileSelected="onFileSelect"
                        v-bind="attrs"
                        v-on="listeners"
                        :prepend-icon="graduation_file_url ? 'mdi-file' : ''"
                        @click:prepend="showPdfFile"
                      />
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <v-btn
                    type="submit"
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
import { required, requiredIf } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'Qualification',
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
      loadingCity: false,
      loadingBtn: false,
      cities: [],
      form: {
        qualification_type: '',
        foundation_name: '',
        country_id: '',
        city_id: '',
        // average_calculation_system: '',
        graduation_date: '',
        specialization: '',
        graduation_degree: '',
        graduation_file: '',
      },
      graduation_file_url: '',
    }
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
    types() {
      return [
        { name: this.$t('secondary'), value: 'secondary' },
        { name: this.$t('diploma'), value: 'diploma' },
        { name: this.$t('bachelor'), value: 'bachelor' },
        { name: this.$t('ma'), value: 'ma' },
        { name: this.$t('phd'), value: 'phd' },
      ]
    },
  },
  methods: {
    allowedDates(dates) {
      const allDates = new Date(dates)
      const currentDate = Date.now()

      return allDates < currentDate
    },
    showPdfFile() {
      window.open(this.graduation_file_url, '_blank', 'noopener=yes')
    },
    onFileSelect({ file }) {
      this.form.graduation_file = file
    },
    handleSubmit() {
      this.loadingBtn = true
      const formData = new FormData()
      for (const key in this.form) {
        if (this.form[key] !== '') {
          formData.append(key, this.form[key])
        }
      }
      this.$axios
        .post('/user/update-qualifications', formData)
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
  watch: {
    profile: {
      handler({ qualifications }) {
        if (qualifications.city) {
          this.form = {
            ...qualifications,
            city_id: qualifications.city.id,
            country_id: qualifications.country.id,
            graduation_file: '',
          }
          this.graduation_file_url = qualifications.graduation_file
        }
      },
      immediate: true,
    },
    'form.country_id': {
      handler(value) {
        if (value) {
          this.getCities()
        }
      },
      immediate: true,
    },
  },
  validations: {
    form: {
      qualification_type: {
        required,
      },
      foundation_name: {
        required,
      },
      country_id: {
        required,
      },
      city_id: {
        required,
      },
      average_calculation_system: {
        // required,
      },
      graduation_date: {
        required,
      },
      specialization: {
        required,
      },
      graduation_file: {
        required: requiredIf(function () {
          if (this.graduation_file_url === '') {
            return true
          } else {
            return false
          }
        }),
      },
      graduation_degree: {
        required,
      },
    },
  },
}
</script>
