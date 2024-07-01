<template>
  <main class="login">
    <LazyCustomHeader>
      <v-container class="center-container">
        <v-row>
          <v-col cols="12" md="8" lg="6" class="mx-auto mt-5">
            <v-row>
              <v-col cols="12">
                <v-card flat color="transparent">
                  <h1 class="text-center login__title mb-12">
                    {{ $t('login_head') }}
                  </h1>
                  <form-wrapper :validator="$v.form">
                    <v-form @submit.prevent="handleLogin">
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
                          <form-group name="password" attribute="password">
                            <template slot-scope="{ attrs, listeners }">
                              <v-text-field
                                v-bind="attrs"
                                v-on="listeners"
                                filled
                                background-color="#fff"
                                v-model="form.password"
                                :type="!showPassword ? 'password' : 'text'"
                                :label="$t('password')"
                                :append-icon="passwordIcon"
                                @click:append="showPassword = !showPassword"
                              ></v-text-field>
                            </template>
                          </form-group>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0 mb-3">
                          <v-row class="align-center">
                            <v-col cols="5" class="my-0 py-0 transparency">
                              <v-checkbox
                                dense
                                class="login__remember-me"
                                :label="$t('remember_me')"
                              ></v-checkbox>
                            </v-col>
                            <v-col
                              cols="7"
                              class="my-0 py-0"
                              :class="
                                $i18n.locale === 'ar'
                                  ? 'text-sm-left'
                                  : 'text-sm-right'
                              "
                            >
                              <nuxt-link
                                style="color: #fff"
                                :to="localePath('/forget-password')"
                              >
                                {{ $t('forget_password') }}
                              </nuxt-link>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <v-btn
                            :disabled="$v.form.$invalid"
                            height="56px"
                            type="submit"
                            block
                            large
                            class="primary text-capitalize"
                            >{{ $t('login') }}
                          </v-btn>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <v-btn
                            class="mt-5 text-capitalize"
                            color="#fff"
                            style="border-color: #fff"
                            outlined
                            height="56px"
                            block
                            large
                            :to="toRegisterPage"
                            >{{ $t('register') }}</v-btn
                          >
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
    <!-- <div class="modal-overlay" v-show="showModal">
    <div class="modal">
    <h2>{{ $t('verfication_code') }}</h2>
      <input class="verfiy_input" type="text" v-model="verfiy">
      
      <button>{{ $t('register') }}</button>
    </div>
    
  </div> -->
  </main>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  layout: 'auth',
  middleware: ['auth'],
  data() {
    return {
      showPassword: false,
      // showModal:false,
      verfiy: '',
      form: {
        email: '',
        password: '',
        type: 'USER',
      },
    }
  },
  methods: {
    handleLogin() {
      this.$axios.post('auth/login', this.form).then((res) => {
        const {
          data: { user, access_token },
        } = res.data
        if (!user.email_verified) {
          this.$router.push(this.localePath('/verify-email'))
        } else {
          if (access_token) {
            this.$auth.setUserToken(access_token.token).then(() => {
              this.$auth.setUser(user)
              this.$router.push(this.localePath('/'))
            })
          }
        }
      })
    },
    googleLogin() {
      this.$auth.loginWith('google')
    },
  },
  computed: {
    passwordIcon() {
      if (!this.showPassword) {
        return 'mdi-eye-off'
      } else {
        return 'mdi-eye'
      }
    },
    toRegisterPage() {
      if (this.$route.query.type === 'COMPANY') {
        return this.localePath(`/register?type=${this.$route.query.type}`)
      } else {
        return this.localePath('/register')
      }
    },
  },
  watch: {
    $route: {
      handler({ query }) {
        if (query.type) {
          const availbleTypes = ['USER', 'COMPANY']
          if (availbleTypes.includes(query.type)) {
            this.form.type = query.type
          } else {
            this.form.type = 'USER'
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
      password: {
        required,
      },
    },
  },
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}
.verfiy_input {
  width: 80%;
  height: 50px;
  border: 2px solid #000;
  border-radius: 10px;
  margin: 20px 0 0 0;
}
.modal {
  text-align: center;
  background-color: white;
  height: 400px;
  width: 400px;
  margin-top: 10%;
  padding: 80px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #000;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>
