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
                  {{ $t(`${'type'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <template>
                    {{ $t(`${profile.type}`) }}
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
                  {{ $t(`${'certificate_file'}`) }}
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
                  {{ $t(`${'title'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <template>
                    {{ $t(`${profile.title}`) }}
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
                  {{ $t(`${'start_date'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <template>
                    {{ $t(`${profile.start_date}`) }}
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
                  {{ $t(`${'end_date'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <template>
                    {{ $t(`${profile.end_date}`) }}
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
                  {{ $t(`${'total_hours'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <template>
                    {{ $t(`${profile.total_hours}`) }}
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
                  {{ $t(`${'graduation_file'}`) }}
                </v-list-item-title>
                <v-list-item-subtitle class="px-5">
                  <a
                    v-if="profile.graduation_file"
                    :href="profile.graduation_file"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ $t('file_name') }}
                  </a>
                  <template v-else>
                    <span>--</span>
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
      <h3 class="px-8 mb-0">{{ $t('no_courses') }}</h3>
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
