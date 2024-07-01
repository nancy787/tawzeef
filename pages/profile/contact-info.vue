<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('contact_info') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-row>
          <v-col cols="12" sm="6" class="mx-auto">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12" class="py-0 my-0">
                  <form-group name="email" attribute="email">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.email"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="12" class="py-0 my-0">
                  <form-group name="phone" attribute="phone">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        dense
                        filled
                        v-model="form.phone"
                        v-on="listeners"
                        v-bind="attrs"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col cols="12" class="py-0 my-0">
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
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'ContactInfo',
  middleware: ['isCompany'],
  data() {
    return {
      loadingBtn: false,
      form: {
        email: '',
        phone: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.loadingBtn = true
      this.$axios
        .post('/user/update-contacts', this.form)
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
      handler({ contacts }) {
        if (contacts) {
          this.form = {
            ...contacts,
          }
        }
      },
      immediate: true,
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
    },
  },
}
</script>
