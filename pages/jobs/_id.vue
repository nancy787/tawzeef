<template>
  <main>
    <div class="about-us__header">
      <LazyFiltersHomeForm />
    </div>
    <v-container class="my-12">
      <v-row v-if="loading">
        <v-col cols="12">
          {{ $t('loading') }}
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col md="8" sm="12" cols="12">
          <LazyCardsJobDetailsWatch :job="job" @successfullyApplied="sucess" />
        </v-col>
        <v-col md="4" sm="12" cols="12">
          <v-card class="job-card pa-5 mb-5">
            <h3 class="mb-4 color-primary">{{ $t('about_company') }}</h3>
            <p>{{ job.company ? job.company.description : '' }}</p>
          </v-card>
          <v-chip
            class="ma-2 pt-1 px-4 radius-5"
            outlined
            large
            color="primary"
            v-for="(profile, i) in job.similar_majors"
            :key="i"
          >
            <small>{{ profile.name[$i18n.locale] || '' }}</small>
          </v-chip>
        </v-col>
        <template v-if="this.$auth.loggedIn && $auth.user.type == 'COMPANY'">
          <v-col cols="12" v-if="job.my_job">
            <LazyMyJob :employees="employees" />
          </v-col>
        </template>
      </v-row>
    </v-container>
  </main>
</template>


<script>
export default {
  name: 'JobDetails',
  data() {
    return {
      job: {},
      employees: [],
      loading: false,
      request_type: '',
      
    }
  },
  watchQuery: true,
  // async asyncData({ $axios, query }) {
  //   const res = await $axios.get('/company/find-employee', {
  //     params: { ...query },
  //   })
  //   const { data } = res.data
  //   return {
  //     employees: data,
  //   }
  // },
  methods: {
    getJob() {
      this.loading = true
      if (this.$auth.loggedIn) {
        if (this.$auth.user.type === 'COMPANY') {
          this.request_type = 'company'
        } else if (this.$auth.loggedIn && this.$auth.user.type === 'USER') {
          this.request_type = 'employer'
        }
      } else {
        this.request_type = 'visitor'
      }
      this.$axios
        .get(`${this.request_type}/job/${this.$route.params.id}`, {
          params: { ...this.$route.query },
        })
        .then((res) => {
          const { data } = res.data
          this.job = data
          this.loading = false
        })
    },
    getJobsRelated(query) {
      if (this.$auth.loggedIn && this.$auth.user.type === 'COMPANY') {
        this.$axios
          .get(`company/job/${this.$route.params.id}/subscribes`, {
            params: { ...query },
          })
          .then((res) => {
            const { data } = res.data
            this.employees = data
          })
      }
    },
    sucess(data) {
      this.getJob()
    },
  },
  computed: {},
  watch: {
    $route: {
      handler() {
        this.$nextTick(() => {
          this.getJob()
          this.getJobsRelated(this.$route.query)
        })
      },
      immediate: true,
    },
  },
}
</script>