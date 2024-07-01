<template>
  <v-app dark>
    <section class="not-found">
      <h1 v-if="error.statusCode === 404" class="mb-12">
        {{ $t('not_found') }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <NuxtLink to="/"> {{ $t('home') }} </NuxtLink>
    </section>
  </v-app>
</template>

<script>
export default {
  name: '404',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  layout: 'registeration',
  data() {
    return {
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
