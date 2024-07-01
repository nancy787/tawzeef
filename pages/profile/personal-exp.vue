<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('practical experience') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-alert
              v-if="globalServerErrors !== null"
              dense
              outlined
              type="error"
              class="mb-5"
            >
              <p
                class="mb-0"
                v-for="globalErr in globalServerErrors"
                :key="globalErr"
              >
                {{ globalErr[0] }}
              </p>
            </v-alert>
          </v-col>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="experience_years"
                    attribute="experience_years"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        type="number"
                        dense
                        filled
                        v-model="form.experience_years"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="company_name" attribute="company_name">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.company_name"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                    <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="Previous_experience" attribute="Previous_experience">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.Previous_experience"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="job_title" attribute="job_title">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.job_title"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="foundation_major_id"
                    attribute="foundation_major_id"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="majors"
                        item-text="name"
                        item-value="id"
                        dense
                        filled
                        v-model="form.foundation_major_id"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="major_id" attribute="major_id">
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="majors"
                        item-text="name"
                        item-value="id"
                        dense
                        filled
                        v-model="form.major_id"
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
                <!-- <v-col cols="12" md="6" class="py-0 my-0">
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
                </v-col> -->
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="start_date" attribute="start_date">
                    <template slot-scope="{ attrs }">
                      <v-menu
                        ref="menu"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            @blur="$v.form.start_date.$touch()"
                            v-model="form.start_date"
                            filled
                            dense
                            append-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          @change="menu1 = !menu1"
                          v-model="form.start_date"
                          :allowed-dates="allowedDatesOne"
                          no-title
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="end_date" attribute="end_date">
                    <template slot-scope="{ attrs }">
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            @blur="$v.form.end_date.$touch()"
                            v-model="form.end_date"
                            filled
                            dense
                            append-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          @change="menu2 = !menu2"
                          v-model="form.end_date"
                          :allowed-dates="allowedDates"
                          no-title
                        >
                        </v-date-picker>
                      </v-menu>
                    </template>
                  </form-group>
                </v-col>
                <!-- <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="job_description"
                    attribute="job_description"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <v-textarea
                        no-resize
                        height="220px"
                        dense
                        filled
                        v-model="form.job_description"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-textarea>
                    </template>
                  </form-group>
                </v-col> -->
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="latest_salary" attribute="latest_salary">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        type="number"
                        dense
                        filled
                        v-model="form.latest_salary"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="pt-0">
                  <v-btn
                    type="submit"
                    :loading="loadingBtn"
                    :disabled="$v.form.$invalid"
                    height="54px"
                    class="primary"
                    block
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
import { required, numeric } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'PersonalExperience',
  middleware: ['isCompany'],

  async asyncData({ $axios, app }) {
    const resMajor = await $axios.get('/general/majors')
    const countriesRes = await $axios.get('/general/countries')

    return {
      majors: resMajor.data.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
      countries: countriesRes.data.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
    }
  },
  data() {
    return {
      menu1: false,
      menu2: false,
      loadingBtn: false,
      globalServerErrors: null,
      form: {
        // experience_years: '',
        job_title: '',
        major_id: '',
        foundation_major_id: '',
        country_id: '',
        start_date: '',
        end_date: '',
        company_name:'',
        Previous_experience:'',
        
        // foundation_name: '',
        // foundation_members_count: '',
        // job_description: '',
        latest_salary: '',
      },
    }
  },
  methods: {
    allowedDatesOne(dates) {
      const allDates = new Date(dates)
      const currentDate = Date.now()

      return allDates <= currentDate
    },
    allowedDates(dates) {
      const allDates = new Date(dates)
      const currentDate = Date.now()

      return allDates <= currentDate
    },
    handleSubmit() {
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      this.loadingBtn = true
      this.$axios
        .post('/user/update-experience', formData)
        .then((res) => {
          console.log(res)
          this.loadingBtn = false
          this.$router.push(this.localePath('/profile'))
          this.$store.dispatch('profile/setUserProfile')
        })
        .catch((err) => {
          console.log(err.response.data)
          this.globalServerErrors = err.response.data.errors
          this.loadingBtn = false
        })

        .finally(() => {
          this.loadingBtn = false
        })
    },
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
  },
  watch: {
    profile: {
      handler({ experience }) {
        if (experience.country) {
          this.form = {
            ...experience,
            country_id: experience.country.id,
            foundation_major_id: experience.foundation_major.id,
            major_id: experience.major.id,
            start_date: experience.start_date.split('T')[0],
            end_date: experience.end_date.split('T')[0],
            company_name:experience.company_name,
            Previous_experience:experience.Previous_experience
          }
        }
      },
      immediate: true,
    },
  },
  validations: {
    form: {
      experience_years: {
        numeric,
      },
      job_title: {
        required,
      },
      major_id: {
        required,
      },
      foundation_major_id: {
        required,
      },
      country_id: {
        required,
      },
      start_date: {
        required,
      },
      end_date: {
        required,
      },
      company_name:{
        required,
      },
       Previous_experience:{
        required,
      },
      // foundation_name: {
      //   required,
      // },
      // foundation_members_count: {
      //   required,
      //   numeric,
      // },
      // job_description: {
      //   required,
      // },
      latest_salary: {
        required,
        numeric,
      },
    },
  },
}
</script>
