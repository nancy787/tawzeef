<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="$auth.user.type === 'USER'"
        v-bind="attrs"
        v-on="on"
        height="54px"
        color="#fff"
        outlined
      >
        <span class="mx-2">{{ $t('create_new_password') }}</span>
      </v-btn>
      <v-btn
        v-if="$auth.user.type === 'COMPANY'"
        v-bind="attrs"
        v-on="on"
        height="54px"
        color="#000"
        outlined
      >
        <span class="mx-2">{{ $t('create_new_password') }}</span>
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" md="8" class="mx-auto">
            <v-card-text>
              <v-form @submit.prevent="newpassword">
                <v-col cols="12" class="my-0 py-0">
                  <form-group name="password" attribute="password">
                    <template slot-scope="{ attrs, listeners }">
                      <v-text-field
                        v-on="listeners"
                        v-bind="attrs"
                        background-color="#fff"
                        filled
                        v-model="form.newpassword"
                        type="password"
                      ></v-text-field>
                    </template>
                  </form-group>
                </v-col>
                <v-col cols="3" class="my-0 py-0">
                  <v-btn
                    type="submit"
                    :disabled="
                      form.newpassword === '' || form.newpassword.length < 6
                    "
                    block
                    class="primary"
                    >{{ $t('send') }}</v-btn
                  >
                </v-col>
              </v-form>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { required, password } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      loadingBtn: false,
      dialog: false,
      form: {
        newpassword: '',
      },
    }
  },
  methods: {
    newpassword() {
      this.loadingBtn = true
      this.$axios
        .post('', {
          password: this.form.newPassword,
        })
        .then(() => {
          this.form = { newPassword: '' }
          this.$v.form.$reset()
        })
        .finally(() => {
          this.loadingBtn = false
        })
    },
  },
  validations: {
    form: {
      newPassword: {
        required,
        password,
      },
    },
  },
}
</script>
