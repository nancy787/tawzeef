<template>
  <section class="my-12" v-if="role != null">
    <v-container>
      <v-row class="d-flex align-center">
        <v-col sm="6" cols="12">
          <article>
            <h2 class="mb-8">{{ role.title[this.$i18n.locale] || '' }}</h2>
            <p class="l-h-2">
              {{ role.note[this.$i18n.locale] || '' }}
            </p>
          </article>
        </v-col>
        <v-col sm="6" cols="12">
          <!-- <slot> -->
          <img
            v-if="role.image"
            :src="role ? role.image : ''"
            width="100%"
            alt="photo"
          />
          <img
            v-else
            :src="require('@/assets/images/home/role.png')"
            width="100%"
            alt="photo"
          />
          <!-- </slot> -->
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <slot />
    </v-container>
  </section>
</template>

<script>
export default {
  props: {
    role: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
