<template>
  <section class="jobs-tab my-12">
    <v-container>
      <v-tabs v-model="tab" background-color="transparent">
        <template v-if="$auth.user.type === 'COMPANY'">
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </template>
        <template v-else-if="$auth.user.type === 'USER'">
          <v-tab v-for="item in user_jobs" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </template>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item> <LazyHomeCompanyActiveJobs /> </v-tab-item>
        <v-tab-item> <LazyHomeCompanyExpiredJobs /> </v-tab-item>
      </v-tabs-items>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: this.$t('active_jobs') },
        { tab: this.$t('expired_jobs') },
      ],
      user_jobs: [
        { tab: this.$t('current_jobs_orders') },
        { tab: this.$t('expired_jobs_orders') },
      ],
    }
  },
}
</script>
