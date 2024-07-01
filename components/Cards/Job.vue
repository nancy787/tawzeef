<template>
  <section>
    <v-card color="ma-2 pa-5 job-card job-card--hover">
      <v-row no-gutters>
        <v-col sm="10" cols="12">
          <article>
            <h3 class="d-flex align-center">
              <!-- :to="
                  ($auth.user && $auth.user.type === 'USER') ||
                  ($auth.user && $auth.user.type === 'COMPANY')
                    ? `/jobs/${job.id}`
                    : '/login'
                " -->
              <nuxt-link class="color-black" :to="`/jobs/${job.id}`">{{
                job.job_title || ''
              }}</nuxt-link>
              <template v-if="job.my_job">
                <v-btn small icon :to="localePath(`/post-job/${job.id}`)">
                  <v-icon small color="success">mdi-pencil</v-icon>
                </v-btn>
                <v-btn type="button" small icon>
                  <v-icon @click.stop="onDeleteJob" small color="error"
                    >mdi-trash-can</v-icon
                  >
                </v-btn>
              </template>
              <v-chip color="#d8ecf7" class="mx-2 radius-10">{{
                $t(`${job.working_type || ''}`)
              }}</v-chip>
            </h3>
            
            <p >
              {{ job.show_company==1 ? job.company.foundation_name:'' }}
              
            </p>
            <!-- <p> {{ job.sector.name.ar }} </p> -->
            <p class="d-flex color-gray mb-2">
              <v-icon small class="mb-2" color="#a1a1a1">mdi-map-marker</v-icon
              ><span class="mx-2">{{
                job.country ? job.city.name[$i18n.locale] : ''
              }}</span
              >-<span class="mx-2">{{
                job.country ? job.country.name[$i18n.locale] : ''
              }}</span>
            </p>
            <p class="d-flex color-gray">
              <v-icon small class="mb-2" color="#a1a1a1">mdi-clock</v-icon
              ><span class="mx-2">{{ job ? job.published_at : '' }}</span>
            </p>
          </article>
        </v-col>
        <v-col sm="2" cols="12">
          <v-img :src="job.company ? job.company.avatar : ''"></v-img>
        </v-col>
        <v-col cols="12">
          <p
            class="mb-0 job-card__read-more px-4"
            v-html="job.description || ''"
          ></p>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
    }
  },
  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    
    showJob() {
      this.$emit('showJob', this.job)
      
    },
    
    onDeleteJob() {
      this.$emit('jobDelete')
    },
  },
  
}
</script>
