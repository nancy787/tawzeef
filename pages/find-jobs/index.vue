<template>
  <main class="search-on-employee mt-12">
    <v-navigation-drawer
      v-model="drawer"
      :right="Direction"
      temporary
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      :disable-resize-watcher="true"
      class="hidden-md-and-up"
      width="280px"
    >
      <v-container>
        <LazyFiltersEmployee />
      </v-container>
    </v-navigation-drawer>
    <v-container>
      <v-row>
        <v-btn
          class="hidden-md-and-up search-on-employee__filter-button"
          icon
          outlined
          large
          @click="drawer = !drawer"
        >
          <v-icon color="#fff">mdi-filter</v-icon>
        </v-btn>

        <v-col cols="12" md="4" class="hidden-md-and-down">
          <LazyFiltersEmployee />
        </v-col>
        <v-col cols="12" md="8">
          <v-row no-gutters>
            <v-col sm="12" v-for="(item, i) in jobs" :key="i">
              <LazyCardsJob :job="item" />
            </v-col>
            <v-col cols="12">
              <div class="text-xs-center mt-5 mb-5">
        <v-pagination
          v-if="jobs.length > 0 && pagination.last_page > 1"
          v-model="pagination.current_page"
          :length="pagination.last_page"
          :total-visible="10"
          @input="handlePagination"
        ></v-pagination>
      </div>
            </v-col>
          </v-row>
          <!-- {{ jobs }} -->
        </v-col>
        
        <!-- <v-col cols="12" md="8">
          <v-row>
            <template v-if="employees.length > 0">
              <v-col
                cols="12"
                md="6"
                v-for="(employee, index) in employees"
                :key="index"
              >
                <CardsEmployee
                  :employee="employee"
                  @on-dialog-open="onDialogOpen"
                />
              </v-col>
            </template>
            <template v-else>
              <v-col cols="12">
                <h2>{{ $t('no_result_for_search') }}</h2>
              </v-col>
            </template>
          </v-row>
        </v-col> -->
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  name: 'FindJobs',
  middleware: ['isCompany'],
  watchQuery: true,
  async asyncData({ $axios, app, query }) {
    try {
      const res = await $axios.get('/employer/find-job', {
        params: { ...query },
      })
      const { data,meta } = res.data
      
      return {
        jobs: data,
        pagination: meta,
      }
    } catch (error) {
      console.log(error)
    }
  },


  data() {
    return {
      drawer: false,
      dialog: false,
      message: '',
      employee_id: '',
      loadingBtn: false,
      
      
    }
  },
  methods: {
    sendMessage() {
      this.loadingBtn = true
      this.$axios
        .post(`/company/employee/${this.employee_id}/message`, {
          message: this.message,
        })
        .then(() => {
          this.dialog = false
          this.message = ''
        })
        .finally(() => (this.loadingBtn = false))
    },
    onDialogOpen(id) {
      this.dialog = !this.dialog
      this.employee_id = id
    },
    handlePagination(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
    },
  },
  computed: {
    Direction() {
      if (this.$i18n.locale === 'en') {
        return false
      } else {
        return true
      }
    },
  },
  watch: {
    dialog: {
      handler(value) {
        if (!value) {
          this.message = ''
        }
      },
      immediate: true,
    },
    
  },
}
</script>
