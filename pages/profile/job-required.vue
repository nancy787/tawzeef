<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('job_required') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
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
                  <form-group name="level" attribute="level">
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="levels"
                        item-text="name"
                        item-value="value"
                        dense
                        filled
                        v-model="form.level"
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
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="working_type" attribute="working_type">
                    <template slot-scope="{ attrs, listeners }">
                      <v-select
                        :items="workingTypes"
                        item-text="name"
                        item-value="value"
                        dense
                        filled
                        v-model="form.working_type"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group
                    name="expected_salary"
                    attribute="expected_salary"
                  >
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        type="number"
                        dense
                        filled
                        v-model="form.expected_salary"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                    
                  </form-group>
                  
                </v-col>

                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="notice_period" attribute="notice_period">
                    <template slot-scope="{ attrs, listeners }">
                          <v-select
                        :items="notice_period"
                        item-text="name"
                        item-value="value"
                        dense
                        filled
                        v-model="form.notice_period"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-select>
                 
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="job_target" attribute="job_target">
                    <template slot-scope="{ attrs, listeners }">
                      <v-textarea
                        no-resize
                        height="220px"
                        dense
                        filled
                        v-model="form.job_target"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-textarea>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
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
  name: 'JobRequired',
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
      loadingBtn: false,
      form: {
        job_title: '',
        // job_role_title: '',
        level: '',
        major_id: '',
        country_id: '',
        expected_salary: '',
        job_target: '',
        notice_period: '',
        working_type: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      this.loadingBtn = true
      this.$axios
        .post('/user/update-job-required', formData)
        .then(() => {
          this.$store.dispatch('profile/setUserProfile')
          this.$router.push(this.localePath('/profile'))
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
    levels() {
      return [
        { name: this.$t('fresh_graduate'), value: 'fresh_graduate' },
        { name: this.$t('average'), value: 'average' },
        { name: this.$t('high'), value: 'high' },
      ]
    },
    workingTypes() {
      return [
        { value: 'full_time', name: this.$t('full_time') },
        { value: 'part_time', name: this.$t('part_time') },
        { value: 'remotely', name: this.$t('remotely') },
      ]
    },
    notice_period(){
      return[
        { value: '1', name: this.$t('1 month') },
        { value: '2', name: this.$t('2 months') },
        { value: '3', name: this.$t('3 months') },
        { value: '4', name: this.$t('4 months') },
        { value: '5', name: this.$t('5 months') },
        { value: '6', name: this.$t('6 months') },
        { value: '7', name: this.$t('7 months') },
        { value: '8', name: this.$t('8 months') },
        { value: '9', name: this.$t('9 months') },
        { value: '10', name: this.$t('10 months') },
        { value: '11', name: this.$t('11 months') },
        { value: '12', name: this.$t('12 months') }, 
      ]
    }
  },
  watch: {
    profile: {
      handler({ job_required }) {
        if (job_required && job_required.country) {
          this.form = {
            ...job_required,
            country_id: job_required.country.id,
            major_id: job_required.major.id,
            

          }
        }
      },
      immediate: true,
    },
  },
  validations: {
    form: {
      job_title: {
        required,
      },
      // job_role_title: {
      //   required,
      // },
      major_id: {
        required,
      },
       expected_salary: {
        required,
      },
      country_id: {
        required,
      },

      level: {
        required,
      },

      job_target: {
        required,
      },
      notice_period: {
        required,
        numeric,
      },
      working_type: {
        required,
      },
    },
  },
}
</script>
