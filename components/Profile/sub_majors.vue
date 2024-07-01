<template>
  <v-row no-gutters>
    <v-col cols="12" class="px-5">
      <v-chip
        class="ma-1 radius-10"
        outlined
        color="primary"
        v-for="(profile, i) in item"
        :key="i"
      >
        <span v-if="direction">
          {{ profile.name.ar || '' }}
        </span>
        <span v-else>
          {{ profile.name.en || '' }}
        </span>
      </v-chip>
    </v-col>
  </v-row>
  <!-- <v-row no-gutters v-else>
    <v-col cols="12">
      <h3 class="px-8 mb-0">{{ $t('no_majors') }}</h3>
    </v-col>
  </v-row> -->
</template>

<script>
export default {
  name: 'Majors',
  props: ['item'],
  computed: {
    direction() {
      if (this.$i18n.locale === 'ar') {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
