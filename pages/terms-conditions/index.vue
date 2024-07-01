<template>
  <main class="about-us">
    <div class="about-us__header">
      <LazyFiltersHomeForm />
    </div>
    <LazyHomeEmploymentRole :role="role" />
  </main>
</template>

<script>
export default {
  name: 'TermsAndConditions',
  data() {
    return {
      loadingData: false,
      role: null,
    }
  },
  // async asyncData({ $axios, app }) {
  //   const res = await $axios.get('/general/pages/company/terms')
  //   const { data } = res.data
  //   return {
  //     terms: data,
  //   }
  // },
  mounted() {
    this.gedData()
    // if (!this.$auth.loggedIn) {
    // }
  },
  methods: {
    gedData() {
      this.loadingData = true
      this.$axios.get(`/general/pages/user/terms`).then((res) => {
        const { data } = res.data
        this.role = data
        this.loadingData = false
      })
    },
  },
  computed: {
    title() {
      return this.terms.title[this.$i18n.locale]
    },
    text() {
      return this.terms.note[this.$i18n.locale]
    },
  },
}
</script>

