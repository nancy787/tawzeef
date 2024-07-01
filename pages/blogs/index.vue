<template>
  <main class="bank-accounts mb-12">
    <section class="about-us__header">
      <!-- <LazyFiltersHomeForm /> -->
    </section>
    <section class="my-12">
      <v-container>
        <h1>{{ $t('blog') }}</h1>
        <v-row v-for="(item, i) in blogs" :key="i" class="py-sm-12">
          <v-col lg="3" md="4" sm="6" cols="12">
            <v-card
              :to="`/blogs/${item.id}`"
              class="blog-card bordered radius-10"
            >
              <section class="img-wrap ratio-100">
                <div class="img-content radius-10">
                  <img
                    :src="item.media || require('@/assets/images/avatar.png')"
                    alt=""
                  />
                </div>
              </section>
              <h2>{{ item.title[$i18n.locale] || '' }}</h2>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>
<script>
export default {
  name: 'blogs',
  async asyncData({ $axios, app }) {
    const res = await $axios.get('/visitor/blogs')
    const { data } = res.data
    return {
      blogs: data,
    }
  },
  data() {
    return {
      loadingBtn: false,
      form: {
        contact_type_id: '',
        message: '',
      },
    }
  },
  methods: {
    sendMessage() {
      this.loadingBtn = true
      this.$axios
        .post(`/contact`, this.form)
        .then(() => {
          this.form.contact_type_id = ''
          this.form.message = ''
          this.loadingBtn = false
        })
        .finally(() => (this.loadingBtn = false))
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
}
</script>

