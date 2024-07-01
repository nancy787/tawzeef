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
        <LazyFiltersJob />
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
          <LazyFiltersJob />
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
                <LazyCardsSubscribe
                  :employee="employee"
                  @on-dialog-open="onDialogOpen(employee)"
                />
              </v-col>
            </template>
            <template v-else>
              <v-col cols="12">
                <h2>{{ $t('none_applied') }}</h2>
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
  </main>
</template>

<script>
export default {
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
  },
  name: 'SearchOnEmployee',
  middleware: ['notAuth', 'isUser'],

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
    onDialogOpen(employee) {
      this.dialog = !this.dialog
      if (
        this.$route.name == 'jobs-id___ar___default' ||
        this.$route.name == 'jobs-id___en'
      ) {
        this.employee_id = employee.user.id
      } else {
        this.employee_id = employee.id
      }
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
