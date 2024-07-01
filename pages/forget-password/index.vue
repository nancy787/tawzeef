<template>
  <main class="login">
    <LazyCustomHeader>
      <v-container class="center-container">
        <v-row>
          <v-col cols="12" md="8" lg="6" class="mx-auto mt-5">
            <v-row>
              <v-col cols="12">
                <v-card flat color="transparent">
                  <div class="login__header">
                    <h1 class="text-center login__title py-5">
                      {{ $t('reset_password') }}
                    </h1>
                    <p class="login__sub-title">
                      {{ $t('forget_password_text') }}
                    </p>
                  </div>
                  <form-wrapper :validator="$v.form">
                    <v-form @submit.prevent="handleSubmit">
                      <v-row>
                        <v-col cols="12" class="my-0 py-0">
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

                        <v-col cols="12" class="my-0 py-0">
                          <v-btn
                            :loading="loadingBtn"
                            :disabled="$v.form.$invalid"
                            height="56px"
                            type="submit"
                            block
                            large
                            class="primary"
                            >{{ $t('send') }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </form-wrapper>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </LazyCustomHeader>
  </main>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'ForgetPassword',
  layout: 'auth',
  middleware: ['isAuth'],

  data() {
    return {
      loadingBtn: false,
      form: {
        email: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.loadingBtn = true
      this.$axios
        .post('/auth/forget-password', this.form)
        .then(() => {
          this.$router.push(this.localePath('/otp-code'))
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
