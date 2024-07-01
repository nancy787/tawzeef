<template>
  <div class="employee-filter" :style="filterStyle">
    <v-row>
     
      
      <v-col cols="12" class="px-0 margin-adjust">
        <v-expansion-panels multiple flat v-model="panels">
       
         
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
    
    this.setActivePanels()
    this.getMajors()
    
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
        this.$router.push({ query: { ...this.$route.query, 'major.id':this.queries[filterName] } })
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
        this.$router.push({ query: { ...this.$route.query, 'major.id':this.queries[filterName] } })
      }
    },
    async getMajors() {
      const res = await this.$axios.get('/general/majorsAverageSalary')
      const { data } = res.data
      this.majors = data.map((el) => ({
        value: el.id,
        name: el.name[this.$i18n.locale],
      }))
    },
   
   
    handleFilter(filterName) {
      this.queries[filterName] = this.form[filterName]
      if (this.form[filterName] === 0) {
        return this.clearFitler(filterName)
      }
      if (this.form[filterName] !== '') {
        this.$router.push({ query: { ...this.$route.query, 'major.id':this.queries[filterName] } })
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

