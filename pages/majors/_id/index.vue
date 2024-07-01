<template>
  <main class="bank-accounts">
    <section class="about-us__header">
      <!-- <LazyFiltersHomeForm /> -->
    </section>
    <section class="my-12">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 v-if="jobs.length > 0">
              {{ $t('jobs_in_major') }}
              <span>{{
                jobs[0].major ? jobs[0].major.name[this.$i18n.locale] : ''
              }}</span>
            </h2>
          </v-col>
          <v-col cols="12" v-if="loading">
            <p>{{ $t('loading') }}</p>
          </v-col>
          <v-col cols="12" v-else-if="jobs.length == 0">
            <p>{{ $t('no_active_jobs') }}</p>
          </v-col>
          <template v-else>
            <v-col sm="6" v-for="(item, i) in jobs" :key="i">
              <LazyCardsJob :job="item" />
            </v-col>
            <!-- <v-col sm="6" v-if="existed" class="floating-card">
              <LazyCardsJobDetails :job="job" @close="close" />
            </v-col> -->
            <v-col cols="12">
              <div class="text-xs-center mt-5 mb-5">
                <!-- <v-pagination
                  v-if="jobs.length > 0"
                  v-model="pagination.current_page"
                  :totalVisible="paginationCount"
                  :length="pagination.last_page || ''"
                  @input="handlePagination"
                ></v-pagination> -->
              </div>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </section>
    <LazySubscribeJob />
  </main>
</template>
<script>
export default {
  name: 'majors',
  data() {
    return {
      loading: false,
      jobs: [],
      pagination: {},
      queries: {},
      paginationCount: 10,
    }
  },
  methods: {
    getJobs(query) {
      this.loading = true
      const padeNo = query.page || 1
      this.$axios
        .get(`/visitor/majors/${this.$route.params.id}/jobs?page=${padeNo}`)
        .then((res) => {
          const { data, meta } = res.data
          this.jobs = data
          this.pagination = meta
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handlePagination(page) {
      this.existed = false
      this.queries = { ...this.queries, page }
      if (!isEqual(this.queries, this.$route.query)) {
        this.$router.push({ query: this.queries })
      }
    },
  },
  computed: {
    title() {
      return this.bank.page.title[this.$i18n.locale]
    },
    text() {
      return this.bank.page.note[this.$i18n.locale]
    },
    direction() {
      if (this.$i18n.locale === 'ar') {
        return 'rtl'
      } else {
        return 'ltr'
      }
    },
    prevBtnStyle() {
      if (this.$i18n.locale === 'ar') {
        return 'left:0'
      } else {
        return 'right:0'
      }
    },
  },
  watch: {
    $route: {
      handler(route) {
        const { query } = route
        this.queries = query
        this.pagination.current_page = Number(query.page)
        this.getJobs(query)
      },
      immediate: true,
    },
  },
}
</script>

