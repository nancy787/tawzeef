<template>
  <main class="bank-accounts">
    <section class="about-us__header">
      <!-- <LazyFiltersHomeForm /> -->
    </section>
    <section class="my-12">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="mb-10">
              {{ $t('majors') }}
            </h2>
          </v-col>
          <v-col cols="12" v-if="loading">
            <p>{{ $t('loading') }}</p>
          </v-col>
          <v-col cols="12" v-else-if="majors.length == 0">
            <p>{{ $t('no_active_majors') }}</p>
          </v-col>
          <template v-else>
            <v-col
              md="4"
              sm="6"
              cols="12"
              v-for="(major, i) in majors"
              :key="i"
            >
              <LazyCardsMajor :major="major" />
            </v-col>

            <v-col cols="12">
              <div class="text-xs-center mt-5 mb-5">
                <!-- <v-pagination
                  v-if="majors.length > 0"
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
  </main>
</template>
<script>
export default {
  name: 'majors',
  // async asyncData({ $axios, app, query }) {
  //   const res = await $axios.get('/employer/find-job', { params: { ...query } })
  //   const { data } = res.data
  //   const meta = res
  //   return {
  //     majors: data,
  //     pagination: meta,
  //   }
  // },
  data() {
    return {
      loading: false,
      majors: [],
      pagination: {},
      queries: {},
      paginationCount: 10,
    }
  },
  methods: {
    getmajors(query) {
      this.loading = true
      const padeNo = query.page || 1
      this.$axios
        .get(`/general/majors?page=${padeNo}`)
        .then((res) => {
          const { data, meta } = res.data
          this.majors = data
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
        this.getmajors(query)
      },
      immediate: true,
    },
  },
}
</script>

