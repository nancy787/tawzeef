<template>
  <main>
    <v-app dark v-if="!loading">
      <LazyLayoutHeader />
      <nuxt />
      <!-- :nuxt-child-key="$route.fullPath" -->
      <LazyLayoutFooter />
    </v-app>
    <LazyLoader v-else />
  </main>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loading = false
    })
  },
}
</script>
