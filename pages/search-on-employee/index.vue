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
          <v-row>
            <template v-if="employees.length > 0">
              <v-col
                lg="4"
                md="6"
                sm="6"
                cols="12"
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
        </v-col>
      </v-row>
    </v-container>
    <v-dialog max-width="700" v-model="dialog">
      <v-card max-width="700">
        <v-container>
          <v-row>
            <v-col cols="12" md="8" class="mx-auto">
              <h2 class="py-3" style="text-align: center">
                {{ $t('send_message') }}
              </h2>

              <v-card-text>
                <v-form @submit.prevent="sendMessage">
                  <v-textarea
                    v-model="message"
                    no-resize
                    rows="5"
                    filled
                    :label="$t('message')"
                  ></v-textarea>
                  <v-btn
                    :loading="loadingBtn"
                    type="submit"
                    :disabled="message === ''"
                    block
                    class="primary"
                    >{{ $t('send') }}</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-col cols="12" lg="6" class="mx-auto">
      <div class="text-xs-center mt-5 mb-5">
        <v-pagination
          v-if="employees.length > 0 && pagination.last_page > 1"
          v-model="pagination.current_page"
          :length="pagination.last_page"
          :total-visible="10"
          @input="handlePagination"
        ></v-pagination>
      </div>
    </v-col>
  </main>
</template>

<script>
export default {
  name: 'SearchOnEmployee',
  middleware: ['notAuth', 'isUser'],
  watchQuery: true,
  async asyncData({ $axios, query }) {
    const res = await $axios.get('/company/find-employee', {
      params: { ...query },
    })
    const { data, meta } = res.data

    return {
      employees: data,
      pagination: meta,
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
    handlePagination(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
    },
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
