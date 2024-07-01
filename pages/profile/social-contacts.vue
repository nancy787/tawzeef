<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('social_contacts') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="facebook" attribute="facebook">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.facebook"
                        v-on="listeners"
                        v-bind="attrs"
                        :append-icon="'mdi-link'"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="twitter" attribute="twitter">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.twitter"
                        v-on="listeners"
                        v-bind="attrs"
                        :append-icon="'mdi-link'"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="insta" attribute="insta">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.insta"
                        v-on="listeners"
                        v-bind="attrs"
                        :append-icon="'mdi-link'"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="medium" attribute="medium">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.medium"
                        v-on="listeners"
                        v-bind="attrs"
                        :append-icon="'mdi-link'"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" md="6" class="py-0 my-0">
                  <form-group name="site" attribute="site">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.site"
                        v-on="listeners"
                        v-bind="attrs"
                        :append-icon="'mdi-link'"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col cols="12" md="6" class="py-0 my-0">
                  <v-btn
                    type="submit"
                    :loading="loadingBtn"
                    :disabled="$v.form.$invalid"
                    height="54px"
                    class="primary"
                    block
                  >
                    <span style="font-size: 18px"> {{ $t('save') }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </form-wrapper>
    </v-container>
  </main>
</template>

<script>
import { url } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'SocialContacts',
  middleware: ['isCompany'],
  data() {
    return {
      loadingBtn: false,
      form: {
        facebook: '',
        twitter: '',
        insta: '',
        medium: '',
        site: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.loadingBtn = true

      this.$axios
        .post('/user/update-socials', this.form)
        .then(() => {
          this.$store.dispatch('profile/setUserProfile')
          this.$router.push(this.localePath('/profile'))
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
      handler({ socials }) {
        if (socials.facebook || socials.twitter || socials.insta) {
          this.form = {
            ...socials,
          }
        }
      },
      immediate: true,
    },
  },
  validations: {
    form: {
      facebook: {
        url,
      },
      insta: {
        url,
      },
      twitter: {
        url,
      },
      site: {
        url,
      },
      medium: {
        url,
      },
    },
  },
}
</script>
