<template>
  <v-app dark>
    <LazyLayoutHeader />

    <nuxt :nuxt-child-key="$route.fullPath" />
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
  watch: {
    $route: {
      handler() {
        if (this.$route.path.includes('en')) {
          this.$vuetify.rtl = false
          this.isRight = false
        } else {
          this.$vuetify.rtl = true
          this.isRight = true
        }
      },
      immediate: true,
    },
  },
}
</script>
