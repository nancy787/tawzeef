<template>
  <section class="text-center subscribe">
    <v-container>
      <v-row>
        <v-col sm="8" cols="12" class="mx-auto">
          <h2 class="color-white mb-12">{{ $t('enter_your_mail_here') }}</h2>
        </v-col>
        <v-col sm="6" cols="12" class="mx-auto">
          <form-wrapper :validator="$v.form">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="9" class="my-0 py-0">
                  <form-group name="email" attribute="email">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        v-on="listeners"
                        v-bind="attrs"
                        background-color="#fff"
                        filled
                        v-model="form.email"
                        type="email"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>

                <v-col cols="3" class="my-0 py-0">
                  <v-btn
                    :disabled="$v.form.$invalid"
                    :loading="loadingBtn"
                    height="56px"
                    type="submit"
                    block
                    large
                    elevation="0"
                    color="white"
                    ><strong class="color-primary">{{ $t('send') }}</strong>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </form-wrapper>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      loadingBtn: false,
      form: {
        email: '',
        major_id: this.$route.params.id,
      },
    }
  },
  methods: {
    handleSubmit() {
      this.loadingBtn = true
      this.$axios
        .post('/visitor/job-email', this.form)
        .then(() => {
          this.form = { email: '' }
          this.$v.form.$reset()
        })
        .finally(() => {
          this.loadingBtn = false
        })
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
}
</script>
