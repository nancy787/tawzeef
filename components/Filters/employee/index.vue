<template>
  <div class="employee-filter" :style="filterStyle">
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('fitler_result') }}</h2>
      </v-col>
      <v-col cols="12" >
        <p class="font-bold">{{ $t('job') }}</p>
        <v-text-field
          v-model="form.job_title"
          :label="$t('job_name')"
          dense
          filled
          :append-icon="'mdi-magnify'"
          clearable
          class="mt-6"
          @click:clear="clearFitler('job_title')"
          @keypress.enter="handleFilter('job_title')"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-0 margin-adjust">
        <v-expansion-panels multiple flat v-model="panels">
          <v-expansion-panel :style="filterStyle">
            <v-expansion-panel-header class="font-bold">
              {{ $t('country') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="transparency margin-adjust">
              <v-radio-group
                @change="handleFilter('countries')"
                v-model="form.countries"
              >
                <v-radio
                  @change="clearFitler('countries')"
                  :label="$t('all')"
                ></v-radio>
                <v-radio
                  v-for="(country, index) in countries"
                  :key="index"
                  :label="country.name"
                  :value="country.id"
                ></v-radio>
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel :style="filterStyle">
            <v-expansion-panel-header class="font-bold">
              {{ $t('city') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="transparency margin-adjust">
              <v-radio-group
                @change="handleFilter('cities')"
                v-model="form.cities"
              >
                <v-radio
                  @change="clearFitler('cities')"
                  :label="$t('all')"
                ></v-radio>

                <v-radio
                  v-for="(city, index) in cities"
                  :key="index"
                  :label="city.name[$i18n.locale]"
                  :value="city.id"
                ></v-radio>
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>
           
        
           <v-expansion-panel >
             <v-expansion-panel-header class="font-bold">
              {{ $t('sectors') }}
            </v-expansion-panel-header>
             <v-expansion-panel-content class="transparency">
              <v-checkbox
                hide-details
                :label="$t('all')"
                v-model="selectSectors"
                @change="filterAll('sectors', sectors)"
              ></v-checkbox>
              <v-checkbox
                v-for="(sector, index) in sectors"
                :key="index"
                :label="sector.name"
                :value="sector.value"
                v-model="form.sectors"
                @change="handleMultiFitler('sectors', 'selectSectors')"
              ></v-checkbox>
            </v-expansion-panel-content>
             </v-expansion-panel>
          <v-expansion-panel >
            <v-expansion-panel-header class="font-bold">
              {{ $t('majors') }}
            </v-expansion-panel-header>
           
            <v-expansion-panel-content class="transparency">
              <v-checkbox
                hide-details
                :label="$t('all')"
                v-model="selectMajors"
                @change="filterAll('majors', majors)"
              ></v-checkbox>
              <v-checkbox
                v-for="(major, index) in majors"
                :key="index"
                :label="major.name"
                :value="major.value"
                v-model="form.majors"
                @change="handleMultiFitler('majors', 'selectMajors')"
              ></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
         
          <v-expansion-panel >
            <v-expansion-panel-header class="font-bold">
              {{ $t('job_type') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="transparency">
              <v-checkbox
                hide-details
                :label="$t('all')"
                @change="filterAll('working_types', workingTypes)"
                v-model="selectWokringTypes"
              ></v-checkbox>
              <v-checkbox
                v-for="(workType, index) in workingTypes"
                :key="index"
                :label="workType.name"
                :value="workType.value"
                v-model="form.working_types"
                @change="
                  handleMultiFitler('working_types', 'selectWokringTypes')
                "
              ></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel >
            <v-expansion-panel-header class="font-bold">
              {{ $t('levels') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="transparency">
              <v-checkbox
                hide-details
                :label="$t('all')"
                @change="filterAll('levels', levels)"
                v-model="selectLevels"
              ></v-checkbox>
              <v-checkbox
                v-for="(level, index) in levels"
                :key="index"
                :label="level.name"
                :value="level.value"
                v-model="form.levels"
                @change="handleMultiFitler('levels', 'selectLevels')"
              ></v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
         
          <v-expansion-panel :style="filterStyle">
            <v-expansion-panel-header class="font-bold">
              {{ $t('sex') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="transparency">
              <v-radio-group @change="handleFilter('sex')" v-model="form.sex">
                <v-radio
                  :label="$t('all')"
                  @change="clearFitler('sex')"
                ></v-radio>
                <v-radio
                  v-for="(gender, index) in genders"
                  :key="index"
                  :label="gender.text"
                  :value="gender.value"
                ></v-radio>
              </v-radio-group>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel :style="filterStyle">
            <v-expansion-panel-header class="font-bold">
              {{ $t('experience_years') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field
                v-model="form.experience_years"
                :label="$t('experience_years')"
                dense
                filled
                type="number"
                class="mt-6"
                clearable
                @click:clear="clearFitler('experience_years')"
                @keypress.enter="handleFilter('experience_years')"
              ></v-text-field>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel :style="filterStyle">
            <v-expansion-panel-header class="font-bold">
              {{ $t('salary') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.salary_from"
                    :label="$t('salary_from')"
                    dense
                    filled
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.salary_to"
                    :label="$t('salary_to')"
                    dense
                    filled
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-btn
                    @click="handleFilterSalary"
                    small
                    class="primary elevation-0"
                    >{{ $t('filter') }}</v-btn
                  >
                  <v-btn
                    @click="clearFitlerSalary"
                    small
                    class="error elevation-0"
                    >{{ $t('reset') }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'EmployeeFilter',

  data() {
    return {
      form: {
        job_title: '',
        countries: '',
        cities: '',
        sex: '',
        experience_years: '',
        salary_from: '',
        salary_to: '',
        majors: [],
        sectors:[],
        working_types: [],
        levels: [],
      },
      queries: {},
      panels: [],
      countries: [],
      cities: [],
      majors: [],
      sectors:[],
      selectMajors: false,
      selectSectors:false,
      selectWokringTypes: false,
      selectLevels: false,
    }
  },
  mounted() {
    this.getCountires()
    this.setActivePanels()
    this.getMajors()
    this.getSectors()
    // if (
    //   this.$auth.loggedIn &&
    //   this.$auth.user &&
    //   this.$auth.user.type === 'USER'
    // ) {
    //   this.getMajors()
    //   this.getSectors()
    // }
  },
  methods: {
    filterAll(filterName, dataValue) {
      this.form[filterName] = dataValue.map((el) => el.value)

      this.queries[filterName] = this.form[filterName].join(',')
      if (this.form[filterName] !== '') {
        this.$router.push({ query: { ...this.$route.query, ...this.queries } })
      }
    },
    handleMultiFitler(filterName, checkValue) {
      if (this[checkValue]) {
        this[checkValue] = false
      }

      this.queries[filterName] = this.form[filterName].join(',')
      if (this.form[filterName] === 0) {
        return this.clearFitler(filterName)
      }
      if (this.form[filterName] !== '') {
        this.$router.push({ query: { ...this.$route.query, ...this.queries } })
      }
    },
    async getMajors() {
      const res = await this.$axios.get('/general/majors')
      const { data } = res.data
      this.majors = data.map((el) => ({
        value: el.id,
        name: el.name[this.$i18n.locale],
      }))
    },
    async getSectors() {
      const res = await this.$axios.get('/general/sectors')
      const { data } = res.data
      this.sectors = data.map((el) => ({
        value: el.id,
        name: el.name[this.$i18n.locale],
      }))
    },
    clearFitlerSalary() {
      const query = { ...this.$route.query }
      const filterNames = ['salary_from', 'salary_to']
      for (const filter of filterNames) {
        this.$delete(query, filter)
        this.form[filter] = ''
      }
      this.$router.push({ query })
    },
    handleFilterSalary() {
      const query = {
        salary_from: this.form.salary_from,
        salary_to: this.form.salary_to,
      }
      if (this.form.salary_from !== '' && this.form.salary_to !== '') {
        this.$router.push({ query: { ...this.$route.query, ...query } })
      }
    },
    handleFilter(filterName) {
      this.queries[filterName] = this.form[filterName]
      if (this.form[filterName] === 0) {
        return this.clearFitler(filterName)
      }
      if (this.form[filterName] !== '') {
        this.$router.push({ query: { ...this.$route.query, ...this.queries } })
      }
    },
    clearFitler(filterName) {
      const query = { ...this.$route.query }
      this.form[filterName] = ''
      this.$delete(query, filterName)
      this.$delete(this.queries, filterName)

      this.$router.push({ query })
    },
    setActivePanels() {
      this.panels = Object.entries(this.form).map((value, index) => index - 2)
    },
    async getCountires() {
      const res = await this.$axios.get('/general/countries')
      const { data } = res.data
      this.countries = data.map((country) => ({
        id: country.id,
        name: country.name[this.$i18n.locale],
      }))
      data.forEach((country) => {
        this.getCities(country.id)
      })
    },
    async getCities(country_id) {
      const res = await this.$axios.get(
        `/general/countries/${country_id}/cities`
      )
      const { data } = res.data
      this.cities = [...this.cities, ...data]
    },
  },
  computed: {
    filterStyle() {
    //   if (!this.isUser) {
    //     return { backgroundColor: '#f7fbfe' }
    //   } else {
    //     return { backgroundColor: '' }
    //   }
    // },
    // isUser() {
    //   if (
    //     this.$auth.loggedIn &&
    //     this.$auth.user &&
    //     this.$auth.user.type === 'USER'
    //   ) {
    //     return true
    //   } else {
    //     return false
    //   }
    },
    genders() {
      return [
        { text: this.$t('male'), value: 'male' },
        { text: this.$t('female'), value: 'female' },
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
  },
  watch: {
    $route: {
      handler({ query }) {
        for (const key in this.form) {
          if (query[key]) {
            if (key == 'job_title' || key == 'sex') {
              this.form[key] = query[key]
            } else if (key === 'majors') {
              this.form[key] = query[key].split(',').map((el) => Number(el))
              } else if (key === 'sectors') {
              this.form[key] = query[key].split(',').map((el) => Number(el))
            } else if (key === 'working_types' || key === 'levels') {
              this.form[key] = query[key].split(',')
            } else {
              this.form[key] = Number(query[key])
            }
          }
        }
      },
      immediate: true,
    },
  },
}
</script>

