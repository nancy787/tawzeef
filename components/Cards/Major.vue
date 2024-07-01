<template>
  <v-card class="major-card" flat :to="`/majors/${major.id}`">
    <v-card-title class="d-block">
      <!-- <img
        class="major-card__img"
        :src="major ? major.image : require('@/assets/images/card.png')"
        alt="photo"
      /> -->
      <section class="img-wrap ratio-60">
        <div class="img-content radius-10">
          <img :src="major.image || ''" alt="" />
        </div>
      </section>
      <div class="major-card__hint">
        {{ $t('join') }}
      </div>
    </v-card-title>
    <v-card-text>
      <h3 class="major-card__sub-title py-3 mt-4">
        {{ major.name[$i18n.locale] || '' }}
      </h3>
      <v-row no-gutters>
        <v-col cols="12" md="5">
          <p class="d-flex align-center">
            <v-icon class="mb-1 mx-1" small color="#A1A1A1">mdi-account</v-icon>
            <span class="major-card__tips">
              <small>{{ $t('users_count') }}</small>
              <span class="mx-1">{{ major.jobs_count }}</span>
              <small>{{ $t('user') }}</small>
            </span>
          </p>
        </v-col>
        <!-- <v-col cols="12" md="3">
          <p>
            <v-icon color="#A1A1A1">mdi-chat</v-icon>
            <span class="major-card__tips"> 300 رسالة </span>
          </p>
        </v-col> -->
        <v-col cols="12" md="5">
          <p class="d-flex align-center">
            <v-icon class="mb-1 mx-1" small color="#A1A1A1"
              >mdi-briefcase</v-icon
            >
            <span class="major-card__tips">
              <small>{{ $t('jobs_count') }}</small>
              <span class="mx-1">{{ major.jobs_count }}</span>
              <small>{{ $t('job_naming') }}</small>
            </span>
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MajorCard',
  props: {
    major: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
