<template>
  <main class="profile">
    <section class="profile__wrapper">
      <LazyCustomHeader>
        <LazyFiltersHome />
      </LazyCustomHeader>
    </section>
    <template v-if="!$auth.loggedIn">
      <LazyHomeEmploymentRole :role="role" />
      <LazyHomeAgents />
      <LazyHomeCompanies />
      <LazyQueries />
    </template>
    <template v-if="$auth.loggedIn">
      <LazyHomeCompany />
      <LazyHomeViews v-if="$auth.user.type === 'USER'" />
    </template>
    <!-- <LazyMajors class="mt-12" /> -->
  </main>
</template>

<script>
export default {
  name: 'HomeIndex',
  data() {
    return {
      loadingData: false,
      role: null,
      visible: true
    }
  },
  mounted() {
    if (!this.$auth.loggedIn) {
      this.gedData()
    }
  },
  methods: {
    gedData() {
      this.loadingData = true
      this.$axios.get(`/general/pages/all/hiring_principles`).then((res) => {
        const { data } = res.data
        this.role = data
        this.loadingData = false
      })
    },
  },
}
</script>
