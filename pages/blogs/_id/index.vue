<template>
  <main class="bank-accounts">
    <section class="about-us__header">
      <!-- <LazyFiltersHomeForm /> -->
    </section>
    <section class="my-12">
      <v-container>
        <v-row>
          <v-col cols="12" v-if="loading">
            <p>{{ $t('loading') }}</p>
          </v-col>

          <template v-else>
            <!-- {{ blog }} -->
            <v-col cols="12">
              <v-card class="blog-card bordered radius-10">
                <section class="img-wrap ratio-30">
                  <div class="img-content radius-10">
                    <img
                      :src="blog.media || require('@/assets/images/avatar.png')"
                      alt=""
                    />
                  </div>
                </section>
                <h2>{{ blog.title[$i18n.locale] || '' }}</h2>
              </v-card>
            </v-col>
            <v-col cols="12">
              <p class="l-h-2" v-html="blog.note[$i18n.locale] || '--'"></p>
            </v-col>
            <v-col cols="12">
              <v-card class="bordered pa-5 pb-0 job-card">
                <v-card-text class="px-0">
                  <v-form @submit.prevent="sendComment">
                    <v-text-field
                      v-model="form.comment"
                      no-resize
                      :append-icon="form.comment ? 'mdi-send' : ''"
                      @click:append="sendComment"
                      filled
                      :label="$t('comment')"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <h3>{{ $t('comments') }}</h3>
                <v-list
                  v-if="comments.length > 0"
                  three-line
                  class="py-0 bg-light-blue comments-area"
                >
                  <template v-for="(item, index) in comments">
                    <v-list-item :key="item.title" class="px-0">
                      <v-list-item-avatar class="radius-10" size="50">
                        <v-img
                          :src="
                            item.avatar || require('@/assets/images/avatar.png')
                          "
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          ><span
                            >{{ item.user ? item.user.first_name : '--' }}
                          </span>
                          <span
                            >{{ item.user ? item.user.last_name : '--' }}
                          </span></v-list-item-title
                        >
                        <v-list-item-subtitle
                          v-html="item.comment || ''"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <span>{{ item.published_at || '' }}</span>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider :key="index"></v-divider>
                  </template>
                </v-list>
                <p v-else class="mt-5">{{ $t('no_comments_yet') }}</p>
              </v-card>
            </v-col>
            <v-col cols="12">
              <LazyRelatedBlogs />
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
  data() {
    return {
      loading: false,
      loadingComments: false,
      loadingBtn: false,
      blog: {},
      comments: {},
      pagination: {},
      queries: {},
      form: { comment: '' },
      paginationCount: 10,
    }
  },
  methods: {
    getBlog() {
      this.loading = true
      this.$axios
        .get(`/visitor/blogs/${this.$route.params.id}`)
        .then((res) => {
          const { data } = res.data
          this.blog = data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getBlogComments() {
      this.loadingComments = true
      this.$axios
        .get(`/visitor/blogs/${this.$route.params.id}/comments`)
        .then((res) => {
          const { data } = res.data
          this.comments = data
          this.loadingComments = false
        })
        .catch(() => {
          this.loadingComments = false
        })
    },
    sendComment() {
      if (this.$auth.loggedIn) {
        if (this.form.comment) {
          this.loadingBtn = true
          this.$axios
            .post(`/visitor/blogs/${this.$route.params.id}/comment`, {
              comment: this.form.comment,
            })
            .then((res) => {
              this.form = {}
              this.getBlogComments()
            })
            .finally(() => (this.loadingBtn = false))
        }
      } else {
        this.$router.push('/login')
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
        this.getBlog(query)
        this.getBlogComments()
      },
      immediate: true,
    },
  },
}
</script>

