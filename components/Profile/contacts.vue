<template>
  <v-row no-gutters>
    <v-col sm="6" cols="12" v-for="(profile, key) in item" :key="key">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon class="size-10 mb-1" color="black">mdi-circle</v-icon>
            {{ $t(`${key}`) }}
          </v-list-item-title>
          <v-list-item-subtitle class="px-5">
            <template>
              {{ profile }}
            </template>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Contacts',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
