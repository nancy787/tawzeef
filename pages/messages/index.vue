<template>
  <main class="bank-accounts">
    <section class="about-us__header">
      <LazyFiltersHomeForm
        v-if="$auth.loggedIn && $auth.user.type === 'COMPANY'"
      />
    </section>
    <section class="my-12">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1>{{ $t('messages') }}</h1>
          </v-col>
          <v-col cols="12" v-if="loadingData">
            {{ $t('loading') }}
          </v-col>
          <v-col cols="12" v-else-if="messages.length == 0">
            <p>{{ $t('no_messages') }}</p>
          </v-col>
          <template v-else>
            <v-col
              v-for="(message, i) in messages"
              :key="i"
              md="6"
              sm="12"
              cols="12"
            >
              <LazyCardsMessage
                :message="message"
                @on-dialog-open="onDialogOpen"
              />
            </v-col>
            <v-col cols="12">
              <div class="text-xs-center mt-5 mb-5">
                <v-pagination
                  v-if="messages.length > 0 && pagination.last_page > 1"
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
      </v-container>
    </section>
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
import { isEqual } from 'lodash'

export default {
  name: 'messages',
  async asyncData({ $axios, app }) {
    // company/message

    const res = await $axios.get('/employer/message')
    const { data } = res.data
    return {
      messages: data,
      
    }
  },
  data() {
    return {
      loadingBtn: false,
      loadingData: false,
      dialog: false,
      message: '',
      employee_id: '',
      messages: [],
      queries: {},
      pagination: {},
      paginationCount: 15,
    }
  },
  created() {
    // this.getMsgs()
  },
  methods: {
    sendMessage() {
      this.loadingBtn = true
      if (this.$auth.user.type === 'COMPANY') {
        this.$axios
          .post(`/company/employee/${this.employee_id}/message`, {
            message: this.message,
          })
          .then(() => {
            this.dialog = false
            this.message = ''
          })
          .finally(() => (this.loadingBtn = false))
      } else {
        this.$axios
          .post(`/employer/company/${this.employee_id}/message`, {
            message: this.message,
          })
          .then(() => {
            this.dialog = false
            this.message = ''
          })
          .finally(() => (this.loadingBtn = false))
      }
    },
    onDialogOpen(id) {
      this.dialog = !this.dialog
      this.employee_id = id
    },
    getMsgs(query) {
      this.loadingData = true
      const padeNo = query.page || 1
      if (this.$auth.user.type === 'COMPANY') {
        this.$axios.get(`/company/message?page=${padeNo}`).then((res) => {
          const { data, meta } = res.data
          this.messages = data
          this.pagination = meta
          this.loadingData = false
        })
      } else {
        this.$axios.get(`/employer/message?page=${padeNo}`).then((res) => {
          const { data, meta } = res.data
          this.messages = data
          this.pagination = meta
          this.loadingData = false
        })
      }
    },
    handlePagination(page) {
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
        this.getMsgs(query)
      },
      immediate: true,
    },
  },
}
</script>

