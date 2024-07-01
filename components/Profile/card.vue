<template>
  <v-card class="pa-3 profile-card" flat>
    <v-card-title>
      <v-icon class="profile-card__title--icon mb-2" color="#fff">{{
        item.icon
      }}</v-icon>
      <h4 class="mx-2">{{ item.title }}</h4>
      <v-spacer />
      <v-btn icon :to="item.to" v-if="$auth.user.type === 'USER'">
        <v-icon color="success">mdi-pencil-box-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="px-0">
      <v-list class="transparent-bg">
        <!-- <template v-for=(comp,index) in comps></template> -->
        <component :is="comps[index]" :item="profile[item.key]"></component>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  components: {
    personal_information: () => import('./personal_information'),
    qualifications: () => import('./qualifications'),
    skills: () => import('./skills'),
    sub_majors: () => import('./sub_majors'),
    contacts: () => import('./contacts'),
    experience: () => import('./experience'),
    job_required: () => import('./job_required'),
    memberships: () => import('./memberships'),
    training_courses: () => import('./training_courses'),
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    profile: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
    },
  },

  computed: {
    comps() {
      const components = [
        'personal_information',
        'qualifications',
        'contacts',
        'sub_majors',
        'experience',
        'skills',
        'memberships',
        'job_required',
        'training_courses',
      ]

      return components
    },
  },
}
</script>
