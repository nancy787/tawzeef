<template>
  <main class="login">
    <LazyCustomHeader>
      <v-container class="center-container">
        <v-row>
          <v-col cols="12" md="8" class="mx-auto mt-5">
            <v-row>
              <v-col cols="12">
                <v-card flat color="transparent">
                  <div class="login__header">
                    <h1 class="text-center login__title py-5">
                      {{ $t('reset_password') }}
                    </h1>
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
                          <form-group
                            name="new_password"
                            attribute="new_password"
                          >
                            <template slot-scope="{ attrs, listeners }">
                              <v-text-field
                                v-bind="attrs"
                                v-on="listeners"
                                filled
                                background-color="#fff"
                                v-model="form.new_password"
                                :type="!show_new_password ? 'password' : 'text'"
                                :label="$t('new_password')"
                                :append-icon="passwordIcon"
                                @click:append="
                                  show_new_password = !show_new_password
                                "
                              ></v-text-field>
                            </template>
                          </form-group>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <form-group
                            name="confirm_password"
                            attribute="confirm_password"
                          >
                            <template slot-scope="{ attrs, listeners }">
                              <v-text-field
                                v-bind="attrs"
                                v-on="listeners"
                                filled
                                background-color="#fff"
                                v-model="form.confirm_password"
                                :type="
                                  !show_confirm_new_password
                                    ? 'password'
                                    : 'text'
                                "
                                :label="$t('confirm_password')"
                                :append-icon="passwordIcon"
                                @click:append="
                                  show_confirm_password = !show_confirm_password
                                "
                              ></v-text-field>
                            </template>
                          </form-group>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <v-btn
                            :loading="loading"
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
import { required, sameAs, email } from 'vuelidate/lib/validators'
export default {
  name: 'ResetPassword',
  layout: 'auth',
  middleware: ['isAuth'],

  data() {
    return {
      show_new_password: false,
      show_confirm_password: false,
      loading: false,
      form: {
        new_password: '',
        confirm_password: '',
        email: '',
        token: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.loading = true

      const data = {
        ...this.form,
        token: this.$route.query['token'],
      }
      this.$axios
        .post(`/auth/reset-password`, data)
        .then((res) => {
          if (res.status) {
            this.$router.push(this.localePath('/login'))
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  computed: {
    passwordIcon() {
      if (!this.show_new_password) {
        return 'mdi-eye-off'
      } else {
        return 'mdi-eye'
      }
    },
  },
  validations: {
    form: {
      confirm_password: {
        required,
        sameAs: sameAs('new_password'),
      },
      new_password: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
}
</script>
