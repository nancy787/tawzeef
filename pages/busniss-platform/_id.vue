<template>
  <main>
   <div class="about-us__header">
       <div class="layer"></div>
      <LazyFiltersHomeForm />
    </div>
      <section class="jobs-tab my-12">
    <v-container>
      <v-tabs v-model="tab" background-color="transparent">
        <template >
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </template>
        <!-- <template v-else-if="$auth.user.type === 'USER'">
          <v-tab v-for="item in user_jobs" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </template> -->
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item> <LazyHomeCompanyActiveJobs /> </v-tab-item>
        <v-tab-item> <LazyHomeCompanyExpiredJobs /> </v-tab-item>
      </v-tabs-items>
    </v-container>
  </section>
  </main>  
</template>
<script>
export default{
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
<style>
.footer{
  background-color: #239553 !important;
}
.about-us__header{
    position: relative;
}
.layer{
    width: 100%;
    height: 100%;
    background-color:rgb(35, 149, 83,0.5) ;
    position: absolute;
    top: 0;
    left: 0;

}
</style>
