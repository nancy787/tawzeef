<template>
  <v-row class="mt-5" no-gutters>
    <v-col cols="12" v-if="loading">
      <p>{{ $t('loading') }}</p>
    </v-col>
    <v-col cols="12" v-else-if="expired_jobs.length == 0">
      <p>{{ $t('no_expired_jobs') }}</p>
    </v-col>
    <template v-else>
      <v-col sm="6" v-for="(item, i) in expired_jobs" :key="i">
        <LazyCardsJob :job="item" @showJob="showJob" />
      </v-col>
      <v-col sm="6" v-if="existed" class="floating-card">
        <LazyCardsJobDetails :job="job" @close="close" />
      </v-col>
      <v-col cols="12">
        <div class="text-xs-center mt-5 mb-5">
          <v-pagination
            v-if="expired_jobs.length > 0 && pagination.last_page > 1"
            v-model="pagination.current_page"
            :length="pagination.last_page"
            :totalVisible="paginationCount"
            @input="handlePagination"
          ></v-pagination>
          <!-- :total-visible="8" -->
        </div>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { isEqual } from 'lodash'

export default {
  data() {
    return {
      loading: false,
      expired_jobs: [],
      job: {},
      queries: {},
      pagination: {},
      paginationCount: 10,
      existed: false,
      request_type: '',
    }
  },

  methods: {
    getExpiredJobs(query) {
      this.loading = true
      const padeNo = query.page || 1
      if (this.$auth.user.type === 'COMPANY') {
        this.request_type = 'company'
      } else {
        this.request_type = 'employer'
      }
      this.$axios
        .get(`/${this.request_type}/expired-job?page=${padeNo}`)
        .then((res) => {
          const { data, meta } = res.data
          this.expired_jobs = data
          this.pagination = meta
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    showJob(item) {
      this.job = item
      this.existed = true
    },
    close() {
      this.existed = false
    },
    handlePagination(page) {
      this.existed = false
      this.queries = { ...this.queries, page }
      if (!isEqual(this.queries, this.$route.query)) {
        this.$router.push({ query: this.queries })
      }
    },
  },
  watch: {
    $route: {
      handler(route) {
        const { query } = route
        this.queries = query
        this.pagination.current_page = Number(query.page)
        this.getExpiredJobs(query)
      },
      immediate: true,
    },
  },
}
</script>
