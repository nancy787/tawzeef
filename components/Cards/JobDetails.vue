<template>
  <v-card color="mx-1 pa-5 job-card job-card__details job-card__bordered">
    <v-row no-gutters>
      <v-col cols="10">
        <v-btn class="close-btn" icon @click="close"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <nuxt-link :to="`jobs/${job.id}`">
          <article>
            <h3 class="d-flex align-center color-black">
              <span>{{ job.job_title || '' }}</span>
              <v-chip color="#d8ecf7" class="mx-2 radius-10">{{
                $t(`${job.working_type || ''}`)
              }}</v-chip>
            </h3>
            <p class="color-black">
              {{ job.company ? job.company.foundation_name : '' }}
            </p>
            
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
        </nuxt-link>
      </v-col>
      <v-col cols="2">
        <v-img :src="job.company ? job.company.avatar : ''"></v-img>
      </v-col>

      <v-col cols="12">
        <v-row no-gutters>
          <v-col
            lg="3"
            md="4"
            sm="6"
            cols="12"
            class="d-flex align-center my-3"
            v-for="(item, i) in details"
            :key="i"
          >
            <img class="mx-1" src="" width="30px" height="30px" alt="" />
            <article>
              <p class="color-gray mb-0">
                <small>{{ item.name || '' }}</small>
              </p>
              <p class="mb-0">
                <small
                  ><strong>{{ item.type || '' }}</strong></small
                >
              </p>
            </article>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="my-5">
        <h3>{{ $t('requirements') }}</h3>
        <p class="mb-0" v-html="job.description || ''"></p>
      </v-col>

      <v-col cols="12">
        <v-chip
          class="ma-1 radius-5"
          outlined
          color="#96cceb"
          v-for="(profile, i) in job.similar_majors"
          :key="i"
        >
          {{ profile.name[$i18n.locale] || '' }}
        </v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      details: [
        {
          name: this.$t('working_type'),
          type: this.$t(`${this.job.working_type || ''}`),
        },
        {
          name: this.$t('qualification_type'),
          type: this.$t(`${this.job.qualification_type || ''}`),
        },
        {
          name: this.$t('level'),
          type: this.$t(`${this.job.level || ''}`),
        },
        {
          name: this.$t('experience_years'),
          type: this.$t(`${this.job.experience_years || ''}`),
        },
      ],
    }
  },
  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
