<template>
  <v-row no-gutters>
    <v-col sm="6" cols="12" v-for="(profile, key) in item" :key="key">
      <!-- {{ item }} -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            v-if="
              key !== 'drive_licence_nationality' && key !== 'members_count'
            "
          >
            <v-icon class="size-10 mb-1" color="black">mdi-circle</v-icon>
            {{ $t(`${key}`) }}
          </v-list-item-title>
          <v-list-item-subtitle class="px-5">
            <template v-if="key === 'country'">
              {{ (profile.name && profile.name[$i18n.locale]) || '--' }}
            </template>
            <template v-else-if="key === 'city'">
              {{ (profile.name && profile.name[$i18n.locale]) || '--' }}
            </template>
            <template v-else-if="key === 'nationality'">
              {{ (profile.name && profile.name[$i18n.locale]) || '--' }}
            </template>
            <template v-else-if="key === 'sex'">
              {{ $t(`${profile}`) || '' }}
            </template>
            <template v-else-if="key === 'social_status'">
              {{ $t(`${profile}`) || '' }}
            </template>

            <template v-else>
              <template
                v-if="
                  key !== 'drive_licence_nationality' && key !== 'members_count'
                "
              >
                {{ profile }}
              </template>
            </template>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PersonalInformation',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
