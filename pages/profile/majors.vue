<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('majors') }}</h1>
    <h1 class="text-center">{{ $t('The most prominent specialties') }}</h1>
    <p class="text-center py-6 profile-form__sub-title">
      {{ $t('choosen_specialties') }}
    </p>
    <v-container class="pt-10 text-center">
      <!-- <form-wrapper> -->
      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" sm="8" class="py-0 my-0 mx-auto">
            <v-autocomplete
              :items="majors"
              item-text="name"
              item-value="id"
              dense
              multiple
              :label="$t('majors')"
              chips
              deletable-chips
              filled
              v-model="sub_majors"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="5" class="mx-auto">
            <v-btn
              type="submit"
              height="54px"
              class="primary mx-auto text-capitalize"
              block
              :loading="loadingBtn"
            >
              <span style="font-size: 18px"> {{ $t('save') }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <!-- </form-wrapper> -->
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Majors',
  middleware: ['isCompany'],
  async asyncData({ $axios, app }) {
    const resMajor = await $axios.get('/general/majors')

    return {
      majors: resMajor.data.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
    }
  },
  data() {
    return {
      sub_majors: [],

      loadingBtn: false,
    }
  },
  methods: {
    handleSubmit() {
      this.loadingBtn = true
      const formData = new FormData()
      this.sub_majors.forEach((formItem, index) => {
        formData.append(`sub_majors[${index}]`, formItem)
      })
      this.$axios
        .post('/user/update-sub-majors', formData)
        .then(() => {
          this.$store.dispatch('profile/setUserProfile')
          this.$router.push(this.localePath('/profile'))
        })
        .catch(() => {
          this.loadingBtn = false
        })
        .finally(() => {
          this.loadingBtn = false
        })
    },
  },
  computed: {
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
  },
  watch: {
    profile: {
      handler(profile) {
        if (profile.sub_majors.length > 0) {
          this.sub_majors = profile.sub_majors.map((el) => el.id)
        }
      },
      immediate: true,
    },
  },
}
</script>
