<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" class="my-0 py-0">
        <v-text-field
          background-color="#fff"
          filled
          v-model="form.job_title"
          :label="$t('fields.job')"
          type="text"
          @input="handleFilter('job_title')"
        ></v-text-field>
      </v-col>
      <v-col cols="12" :md="mdCol" class="my-0 py-0">
        <v-autocomplete
          :items="majors"
          background-color="#fff"
          item-text="name"
          item-value="id"
          filled
          :label="$t('major_id')"
          v-model="form.major"
          @change="handleFilter('major')"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" :md="mdCol" class="my-0 py-0">
        <v-autocomplete
          :items="countries"
          background-color="#fff"
          item-text="name"
          item-value="id"
          filled
          :label="$t('country')"
          v-model="form.countries"
          @change="handleFilter('countries')"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" :md="mdCol" class="my-0 py-0">
        <v-autocomplete
          :items="cities"
          item-text="name"
          item-value="id"
          background-color="#fff"
          filled
          :label="$t('city')"
          v-model="form.cities"
          @change="handleFilter('cities')"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="3" class="my-0 py-0">
        <v-btn
          height="56px"
          block
          large
          class="primary text-capitalize green"
          @click="onSearchFilter"
        >
          <span class="font-bold">{{ btnText }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FilterForm',
  data() {
    return {
      form: {
        job_title: '',
        countries: '',
        cities: '',
        major: '',
      },
      countries: [],
      majors: [],
      allCities: [],
      cities: [],
      queries: {},
    }
  },
  mounted() {
    this.getCountires()
    this.getMjors()
  },
  methods: {
    async getMjors() {
      const res = await this.$axios.get('general/majors')
      const { data } = res.data
      this.majors = data.map((el) => ({
        id: el.id,
        name: el.name[this.$i18n.locale],
      }))
    },
    onSearchFilter() {
      if (Object.keys(this.queries).length > 0) {
        if (this.$route.path !== '/salaries') {
          if (this.$auth.user.type === 'COMPANY') {
            this.$router.push({
              path: this.localePath('/search-on-employee'),
              query: { ...this.$route.query, ...this.queries },
            })
          } else if (this.$auth.user.type === 'USER') {
            this.$router.push({
              path: this.localePath('/find-jobs'),
              query: { ...this.$route.query, ...this.queries },
            })
          }
        } else {
          this.$emit('on-search', this.queries)
        }
      }
    },
    convertString(str) {
      return `${str.substring(0, str.length - 3)}y_id`
    },
    handleFilter(filterName) {
      // if (this.$route.path === '/') {
      //   delete this.form.major_id
      // }
      if (this.form[filterName] !== '') {
        if (this.$route.path === '/salaries') {
          let newFilterName
          if (filterName === 'countries' || filterName === 'cities') {
            newFilterName = this.convertString(filterName)
          } else {
            newFilterName = filterName
          }

          this.queries[newFilterName] = this.form[filterName]
        } else {
          this.queries[filterName] = this.form[filterName]
        }
      }
    },
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
  },
  computed: {
    btnText() {
      if (this.$route.path === '/') {
        if (this.$auth.user.type === 'USER') {
          return this.$t('search_job')
        } else {
          return this.$t('search_employee')
        }
      } else {
        return this.$t('search')
      }
    },
    mdCol() {
      if (this.$route.path === '/') {
        return '2'
      } else {
        return '2'
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

