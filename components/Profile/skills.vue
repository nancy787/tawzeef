<template>
  <v-row no-gutters v-if="item.length > 0">
    <template v-for="(profile, key) in item">
      <v-col sm="6" cols="12" :key="`${key + new Date()}`">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="size-10 mb-1" color="black">mdi-circle</v-icon>
              {{ $t(`${'skill_name'}`) }}
            </v-list-item-title>
            <v-list-item-subtitle class="px-5">
              <template>
                {{ $t(`${profile.name}`) }}
              </template>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col sm="6" cols="12" :key="key">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="size-10 mb-1" color="black">mdi-circle</v-icon>
              {{ $t(`${'level'}`) }}
            </v-list-item-title>
            <v-list-item-subtitle class="px-5">
              <template>
                {{ $t(`${profile.level}`) }}
              </template>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </template>
  </v-row>
  <v-row no-gutters v-else>
    <v-col cols="12">
      <h3 class="px-8 mb-0">{{ $t('no_skills') }}</h3>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Skills',
  props: {
    item: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      names: ['name', 'level'],
    }
  },
}
</script>
