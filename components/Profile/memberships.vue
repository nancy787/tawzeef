<template>
  <v-row no-gutters v-if="item.length > 0">
    <template>
      <v-col v-for="(profile, key) in item" :key="key" cols="12">
        <v-divider v-if="key != 0" class="mb-2"></v-divider>
        <v-row no-gutters>
          <v-col sm="6" cols="12">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon class="size-10 mb-1" color="black">mdi-circle</v-icon>
                  {{ $t(`${'foundation_name'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <template>
                    {{ $t(`${profile.foundation_name}`) }}
                  </template>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col sm="6" cols="12">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon class="size-10 mb-1" color="black">mdi-circle</v-icon>
                  {{ $t(`${'member_from'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <template>
                    {{ $t(`${profile.member_from}`) }}
                  </template>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col sm="6" cols="12">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon class="size-10 mb-1" color="black">mdi-circle</v-icon>
                  {{ $t(`${'role_name'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <template>
                    {{ $t(`${profile.role_name}`) }}
                  </template>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-col>
    </template>
  </v-row>
  <v-row no-gutters v-else>
    <v-col cols="12">
      <h3 class="px-8 mb-0">{{ $t('no_memberships') }}</h3>
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
