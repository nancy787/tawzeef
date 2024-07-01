<template>
  <v-container class="center-container">
    <v-row>
      <v-col cols="12" class="mx-auto mt-5">
        <v-card flat color="transparent">
          <article
            class="text-center my-8"
            v-if="$auth && $auth.user && $auth.user.type === 'COMPANY'"
          >
            <h1 class="login__title">
              {{ $t('fitler_result_title') }}
            </h1>
            <!-- <p class="login__sub-title my-10">
              {{ $t('home_description') }}
            </p> -->
          </article>
          <article class="text-center my-8" v-else>
            <h1 class="login__title">
              {{ $t('home_head') }}
            </h1>
            <p class="login__sub-title my-10">
              {{ $t('home_description') }}
            </p>
          </article>
          <template v-if="$auth.loggedIn">
            <LazyFiltersHomeForm />
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      countries: [],
      cities: [],
    }
  },
  methods: {
    filterData() {},
  },
}
</script>
