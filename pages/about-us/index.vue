<template>
  <main class="about-us">
    <div class="about-us__header">
      <!-- <LazyFiltersHomeForm /> -->
    </div>
    <LazyHomeEmploymentRole :role="about" />
  </main>
</template>

<script>
export default {
  name: 'AboutUs',
  async asyncData({ $axios, app }) {
    const res = await $axios.get('/general/pages/all/about')
    const { data } = res.data
    return {
      about: data,
    }
  },
  computed: {
    title() {
      return this.about.title[this.$i18n.locale]
    },
    text() {
      return this.about.note[this.$i18n.locale]
    },
  },
}
</script>

