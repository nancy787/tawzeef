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
              <template v-if="key === 'country'">
                {{ profile.name && profile.name[$i18n.locale] }}
              </template>
              <template v-else-if="key === 'city'">
                {{ profile.name && profile.name[$i18n.locale] }}
              </template>
              <template v-else-if="key === 'graduation_file'">
                <a :href="profile" target="_blank" rel="noopener noreferrer"
                  >{{ $t('file_name') }}
                </a>
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
      <h3 class="px-8">{{ $t('no_qualification_yet') }}</h3>
    </template>
  </v-row>
</template>

<script>
export default {
  name: 'Qualifications',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
