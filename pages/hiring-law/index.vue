<template>
  <main class="bank-accounts mb-12">
    <section class="about-us__header">
      <!-- <LazyFiltersHomeForm /> -->
    </section>
    <section class="my-12">
      <v-container>
        <h1>{{ $t('hiring_laws') }}</h1>
        <v-row v-for="(item, i) in law" :key="i" class="my-sm-12 py-sm-12">
          <template v-if="i % 2 == 0">
            <!-- <v-col md="4" cols="12">
              <img
                class="job-card transform-20"
                width="100%"
                :src="item.image || ''"
                alt=""
              />
            </v-col> -->
            <v-col md="6" sm="6" cols="12">
              <v-card class="pa-5 job-card law-odd">
                <article>
                  <h3>{{ item.title[$i18n.locale] || '' }}</h3>
                  <p v-html="item.note[$i18n.locale] || ''"></p>
                  <v-row>
                    <v-col md="12">
                           <v-btn
                            :href="item.image"
                            
                            height="54px"
                            color="#fff"
                            outlined
                            style="color:#000;"
                          >
                            
                            <span class="mx-2">{{ $t('law_file') }}</span>
                          </v-btn>
                    </v-col>
                  </v-row>
                </article>
              </v-card>
            </v-col>
          </template>
          <template v-else-if="i % 2 == 1">
            <v-col md="8" cols="12">
              <v-card class="pa-5 job-card law-even">
                <article>
                  <h3>{{ item.title[$i18n.locale] || '' }}</h3>
                  <p v-html="item.note[$i18n.locale] || ''"></p>
                </article>
              </v-card>
            </v-col>
            <!-- <v-col md="4" cols="12">
              <img
                class="job-card transform-odd-20"
                width="100%"
                :src="item.image || ''"
                alt=""
              />
            </v-col> -->
          </template>
        </v-row>
      </v-container>
    </section>
  </main>
</template>
<script>
export default {
  name: 'Law',
  async asyncData({ $axios, app }) {
    const res = await $axios.get('/visitor/hiring-laws')
    const { data } = res.data
    return {
      law: data,
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

