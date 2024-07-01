<template>
  <v-row no-gutters>
    <template v-if="item && item.country">
      <v-col sm="6" cols="12" v-for="(profile, key) in item" :key="key">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="size-10 mb-1" color="black">mdi-circle</v-icon>
              {{ $t(`${key}`) }}
            </v-list-item-title>
            <v-list-item-subtitle class="px-5">
              <template v-if="key === 'major'">
                {{ profile.name && profile.name[$i18n.locale] }}
              </template>
              <template v-else-if="key === 'country'">
                {{ profile.name && profile.name[$i18n.locale] }}
              </template>
              <template v-else-if="key === 'working_type'">
                {{ $t(`${profile}`) }}
              </template>

              <template v-else>
                {{ profile }}
              </template>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </template>
    <template v-else>
      <h3 class="px-8">{{ $t('no_job_required') }}</h3>
    </template>
  </v-row>
</template>

<script>
export default {
  name: 'JobRequired',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
