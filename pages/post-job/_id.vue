<template>
  <main class="profile">
    <main class="profile-form py-12 mt-10">
      <h1 class="text-center">{{ $t('job_info') }}</h1>
      <v-container class="pt-10">
        <form-wrapper :validator="$v.form">
          <v-row>
            <v-col cols="12" sm="10" class="mx-auto">
              <v-form>
                <v-row>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="major_id" attribute="major_id">
                      <template slot-scope="{ attrs, listeners }">
                        <v-select
                          :items="majors"
                          item-text="name"
                          item-value="id"
                          dense
                          append-icon="mdi-chevron-down"
                          filled
                          v-model="form.major_id"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-select>
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
                      name="qualification_type"
                      attribute="qualification_type"
                    >
                      <template slot-scope="{ attrs, listeners }">
                        <v-select
                          :items="types"
                          item-text="name"
                          item-value="value"
                          dense
                          append-icon="mdi-chevron-down"
                          filled
                          v-model="form.qualification_type"
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
                          append-icon="mdi-chevron-down"
                          filled
                          v-model="form.working_type"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-select>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="start_date" attribute="start_date">
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
                              @blur="$v.form.start_date.$touch()"
                              v-model="form.start_date"
                              filled
                              dense
                              append-icon="mdi-chevron-down"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            @change="menu = !menu"
                            v-model="form.start_date"
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
                          ref="menu1"
                          v-model="menu1"
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
                              append-icon="mdi-chevron-down"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            @change="menu1 = !menu1"
                            v-model="form.end_date"
                            no-title
                          >
                          </v-date-picker>
                        </v-menu>
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
                          append-icon="mdi-chevron-down"
                          v-model="form.level"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-select>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="sex" attribute="sex">
                      <template slot-scope="{ attrs, listeners }">
                        <v-select
                          v-bind="attrs"
                          v-on="listeners"
                          :items="genders"
                          item-text="text"
                          item-value="value"
                          dense
                          append-icon="mdi-chevron-down"
                          filled
                          :label="$t('sex')"
                          v-model="form.sex"
                        ></v-select>
                      </template>
                    </form-group>
                  </v-col>

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
                    <form-group name="country_id" attribute="country_id">
                      <template slot-scope="{ attrs, listeners }">
                        <v-select
                          :items="countries"
                          item-text="name"
                          item-value="id"
                          dense
                          append-icon="mdi-chevron-down"
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
                          append-icon="mdi-chevron-down"
                          filled
                          v-model="form.city_id"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-select>
                      </template>
                    </form-group>
                  </v-col>
                  <!-- <v-col cols="12" class="py-0 my-0">
                        <client-only>
                          <google-map
                            v-model="form"
                            @markerUpdated="onMarkerUpdate"
                            height="50px"
                          />
                        </client-only>
                      </v-col> -->

                  <v-col cols="12" class="py-0 my-0">
                    <client-only>
                      <h5 class="mb-3">{{ $t('job_requirements') }}</h5>
                      <VueEditor v-model="form.description" />
                    </client-only>
                    <!-- <form-group name="description" attribute="description">
                      <template slot-scope="{ attrs, listeners }">
                        <v-textarea
                          v-bind="attrs"
                          v-on="listeners"
                          :label="$t('job_requirements')"
                          dense
                          filled
                          v-model="form.description"
                          no-resize
                          rows="5"
                          height="520px"
                        ></v-textarea>
                      </template>
                    </form-group> -->
                  </v-col>
                  <v-col cols="12" class="py-0 my-0 transparency">
                    <form-group name="show_company" attribute="show_company">
                      <template slot-scope="{ attrs, listeners }">
                        <v-checkbox
                          :false-value="0"
                          :true-value="1"
                          dense
                          filled
                          
                          v-model="form.show_company"
                          v-on="listeners"
                          v-bind="attrs"
                          
                        ></v-checkbox>
                      </template>
                    </form-group>
                    
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      height="54px"
                      class="primary"
                      block
                      :loading="loadingBtn"
                      :disabled="disableInEditCase"
                      @click="openDialog"
                    >
                      <span style="font-size: 18px"> {{ $t('post_job') }}</span>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-dialog max-width="700" v-model="dialog">
                  <v-card max-width="700">
                    <v-card-title class="justify-center font-bold">
                      {{ $t('post_job') }}
                    </v-card-title>
                    <v-card-subtitle class="text-center">
                      <span>
                        {{ $t('post_job_sub_title') }}
                      </span>
                      <span>{{ create_job }}</span>
                      <span>{{ $t('sar') }}</span>
                    </v-card-subtitle>
                    <v-card-text>
                      <v-col cols="12" v-if="!showInvoice">
                        <form-group name="pay_type" attribute="pay_type">
                          <template slot-scope="{ attrs, listeners }">
                            <v-radio-group
                              v-bind="attrs"
                              v-on="listeners"
                              v-model="form.pay_type"
                              label=""
                            >
                              <v-radio
                                class="pa-2"
                                v-for="(type, index) in payTypes"
                                :key="index"
                                :label="type.text"
                                :value="type.value"
                              ></v-radio>
                            </v-radio-group>
                          </template>
                        </form-group>
                      </v-col>
                      <transition name="fade" mode="out-in">
                        <v-col
                          cols="12"
                          class="py-0 my-0"
                          v-if="form.pay_type === 'bank' && showInvoice"
                        >
                          <form-group
                            name="invoice_image"
                            attribute="invoice_image"
                          >
                            <template slot-scope="{ attrs, listeners }">
                              <LazyNewImageUpload
                                @fileSelected="onFileSelect"
                                v-bind="attrs"
                                v-on="listeners"
                                v-model="form.invoice_image"
                              />
                            </template>
                          </form-group>
                        </v-col>
                      </transition>
                      <v-col cols="12">
                        <v-btn
                          height="54px"
                          class="primary"
                          block
                          :disabled="$v.form.$invalid"
                          :loading="loadingBtn"
                          @click.prevent="handleSubmit"
                        >
                          <span style="font-size: 18px"> {{ $t('send') }}</span>
                        </v-btn>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-form>
            </v-col>
          </v-row>
        </form-wrapper>
      </v-container>
    </main>
  </main>
</template>

<script>
import {
  required,
  requiredIf,
  numeric,
  minValue,
} from 'vuelidate/lib/validators'
// import { VueEditor } from 'vue2-editor'

export default {
  name: 'PostJob',
  components: {
    HomeFilter: () => import('@/components/Filters/Home'),
    // VueEditor,
  },
  async asyncData({ $axios, app }) {
    const countriesRes = await $axios.get('/general/countries')
    const resMajor = await $axios.get('/general/majors')

    return {
      countries: countriesRes.data.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
      majors: resMajor.data.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
    }
  },
  mounted() {
    this.getSettings()
  },
  data() {
    return {
      dialog: false,
      showInvoice: false,
      disabledCity: true,
      loadingCity: false,
      loadingBtn: false,
      create_job: '',
      menu: false,
      menu1: false,
      cities: [],
      form: {
        major_id: '',
        job_title: '',
        qualification_type: '',
        level: '',
        working_type: '',
        start_date: '',
        end_date:'',
        sex: '',
        experience_years: 0,
        country_id: '',
        city_id: '',
        description: '',
        lat: '',
        lng: '',
        show_company: 1,
        pay_type: '',
        expected_salary: '',
        invoice_image: '',
      },
    }
  },
  methods: {
    openDialog() {
      if (this.editCase || this.create_job == 0) {
        // in case update
        this.handleSubmit()
      } else {
        // in case create
        this.dialog = !this.dialog
      }
    },
    async handleShowJob() {
      const res = await this.$axios.get(`company/job/${this.$route.params.id}`)
      const { data } = res.data
      this.form = {
        lat: data.location.lat,
        lng: data.location.lng,
        city_id: data.city.id,
        country_id: data.country.id,
        major_id: data.major.id,
        description: data.description,
        expected_salary: data.expected_salary,
        experience_years: data.experience_years,
        job_title: data.job_title,
        level: data.level,
        qualification_type: data.qualification_type,
        sex: data.sex,
        start_date: data.start_date,
        end_date: data.end_date,
        working_type: data.working_type,
        show_company: data.show_company,
        start_date: data.start_date.split('T')[0],
        end_date: data.end_date.split('T')[0],
      }
    },
    async getSettings() {
      const res = await this.$axios.get('/general/settings')
      const {
        data: { create_job },
      } = res.data
      this.create_job = create_job
    },
    onMarkerUpdate(position) {
      this.form.lat = position.lat
      this.form.lng = position.lng
    },
    setLocation() {
      this.location.lat = this.$refs.gMap.map.center.lat()
      this.location.lng = this.$refs.gMap.map.center.lng()
      this.form.lat = this.$refs.gMap.map.center.lat()
      this.form.lng = this.$refs.gMap.map.center.lng()
    },
    handleSubmit() {
      this.loadingBtn = true
      const formData = new FormData()
      for (const key in this.form) {
        if (key !== 'lat' && key !== 'lng') {
          if (this.form[key] !== '') {
            formData.append(key, this.form[key])
          }
        }
      }
      formData.append(`location[lat]`, this.form['lat'])
      formData.append(`location[lng]`, this.form['lng'])
      let reqName
      if (!this.editCase) {
        // in case create
        reqName = '/company/job'
      } else {
        reqName = `/company/job/${this.$route.params.id}`
        formData.append('_method', 'put')
      }
      this.$axios
        .post(reqName, formData)
        .then((res) => {
          if (res && res.status == 200) {
            this.$router.push(this.localePath('/'))
          }
        })
        .catch(() => {
          this.loadingBtn = false
        })
        .finally(() => {
          this.loadingBtn = false
        })
    },
    onFileSelect({ file }) {
      this.form.invoice_image = file
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
    disableInEditCase() {
      return this.editCase && this.$v.form.$invalid
    },
    editCase() {
      if (this.$route.params.id) {
        return true
      } else {
        return false
      }
    },
    payTypes() {
      return [
        { text: this.$t('online'), value: 'online' },
        { text: this.$t('bank'), value: 'bank' },
      ]
    },
    genders() {
      return [
        { text: this.$t('male'), value: 'male' },
        { text: this.$t('female'), value: 'female' },
        { text: this.$t('both'), value: '' },
      ]
    },
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
  validations: {
    form: {
      job_title: {
        required,
      },
      invoice_image: {
        required: requiredIf(function () {
          if (this.form.pay_type === 'bank') {
            return true
          } else {
            return false
          }
        }),
      },
      expected_salary: {
        numeric,
      },
      description: {
        required,
      },
      sex: {
        required: requiredIf(function () {
          if (this.form.sex !== '') {
            return true
          } else {
            return false
          }
        }),
      },
      major_id: {
        required,
      },

      country_id: {
        required,
      },
      experience_years: {
        required,
        numeric,
        minValue: minValue(0),
      },
      pay_type: {
        required: requiredIf(function () {
          if (!this.editCase) {
            return true
          } else {
            return false
          }
        }),
      },
      level: {
        required,
      },
      city_id: {
        required,
      },
      qualification_type: {
        required,
      },
      working_type: {
        required,
      },
      start_date: {
        required,
      },
      end_date: {
        required,
      },
    },
  },

  watch: {
    $route: {
      handler({ params }) {
        if (params.id) {
          this.handleShowJob()
        }
      },
      immediate: true,
    },
    dialog: {
      handler(value) {
        if (!value) {
          this.form.pay_type = ''
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
    'form.pay_type': {
      handler(value) {
        if (value === 'bank') {
          this.showInvoice = true
        } else {
          this.showInvoice = false
        }
      },
      immediate: true,
    },
  },
}
</script>
