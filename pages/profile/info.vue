<template>
  <main class="profile__info">
    <v-container>
      <v-row>
        <v-col sm="6" cols="12" v-for="(item, index) in items" :key="index">
          <LazyProfileCard :item="item" :index="index" :profile="profile" />
        </v-col>
      </v-row>
      <v-row v-if="$auth.user.type === 'USER'">
        <v-col cols="12" md="6">
          <v-btn
            :to="localePath('/profile/social-contacts')"
            class="profile__info__social-btn"
            block
            large
          >
            <v-icon color="primary">mdi-account-group</v-icon>
            <span class="mx-2">{{ $t('add_social') }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexProfile',
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
    items() {
      return [
        {
          title: this.$t('personal_info'),
          icon: 'mdi-account',
          key: 'personal_information',
          to: this.localePath('/profile/personal-info'),
        },
        {
          title: this.$t('Qualifications'),
          key: 'qualifications',
          icon: 'mdi-school',
          to: this.localePath('/profile/qualification'),
        },
        {
          title: this.$t('contact information'),
          key: 'contacts',
          icon: 'mdi-phone',
          to: this.localePath('/profile/contact-info'),
        },
        {
          title: this.$t('prominent_majors'),
          key: 'sub_majors',
          icon: 'mdi-account-star',
          to: this.localePath('/profile/majors'),
        },
        {
          title: this.$t('experience'),
          key: 'experience',
          icon: 'mdi-briefcase',
          to: this.localePath('/profile/personal-exp'),
        },
        {
          title: this.$t('skills'),
          key: 'skills',
          icon: 'mdi-cog',
          to: this.localePath('/profile/skills'),
        },

        {
          title: this.$t('memberships'),
          key: 'memberships',
          icon: 'mdi-badge-account-horizontal-outline',
          to: this.localePath('/profile/membership-info'),
        },
        {
          title: this.$t('job-required'),
          key: 'job_required',
          icon: 'mdi-vector-circle',
          to: this.localePath('/profile/job-required'),
        },
        {
          title: this.$t('courses'),
          key: 'training_courses',
          icon: 'mdi-certificate-outline',
          to: this.localePath('/profile/courses'),
        },
      ]
    },
  },
}
</script>
