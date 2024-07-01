<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('memberships') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-form @submit.prevent="addSkill">
          <v-row>
            <v-col cols="12" sm="3" class="py-0 my-0">
              <form-group name="foundation_name" attribute="foundation_name">
                <template slot-scope="{ attrs, listeners }">
                  <v-text-field
                    dense
                    filled
                    v-model="form.foundation_name"
                    v-on="listeners"
                    v-bind="attrs"
                  ></v-text-field>
                </template>
              </form-group>
            </v-col>
            <v-col cols="12" sm="3" class="py-0 my-0">
              <form-group name="role_name" attribute="role_name">
                <template slot-scope="{ attrs, listeners }">
                  <v-text-field
                    dense
                    filled
                    v-model="form.role_name"
                    v-on="listeners"
                    v-bind="attrs"
                  ></v-text-field>
                </template>
              </form-group>
            </v-col>
            <v-col cols="12" sm="3" class="py-0 my-0">
              <form-group name="member_from" attribute="member_from">
                <template slot-scope="{ attrs }">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        @blur="$v.form.member_from.$touch()"
                        v-model="form.member_from"
                        filled
                        dense
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      @change="menu = !menu"
                      v-model="form.member_from"
                      no-title
                    >
                    </v-date-picker>
                  </v-menu>
                </template>
              </form-group>
            </v-col>

            <v-col cols="12" sm="3" class="py-0 my-0">
              <v-btn
                height="54px"
                class="primary text-capitalize"
                block
                type="submit"
                :disabled="$v.form.$invalid"
              >
                <span style="font-size: 18px"> {{ $t('add') }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </form-wrapper>
      <v-row>
        <v-col cols="12">
          <v-simple-table v-if="memberships.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">{{ $t('foundation_name') }}</th>
                  <th class="text-center">{{ $t('role_name') }}</th>
                  <th class="text-center">{{ $t('member_from') }}</th>
                  <th class="text-center">{{ $t('delete') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in memberships" :key="i">
                  <td class="text-center">{{ item.foundation_name }}</td>
                  <td class="text-center">{{ item.role_name }}</td>
                  <td class="text-center">{{ item.member_from }}</td>
                  <td class="text-center">
                    <v-btn icon @click="handleDelete(i)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p v-else>{{ $t('no_memberships_form') }}</p>
        </v-col>
        <v-col cols="12" sm="3">
          <v-btn
            height="54px"
            class="primary mx-auto text-capitalize"
            block
            :loading="loadingBtn"
            @click="handleSubmit"
          >
            <span style="font-size: 18px"> {{ $t('save') }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'memberships',
  middleware: ['isCompany'],
  async asyncData({ $axios }) {
    const res = await $axios.get('/user/personal-memberships')

    const { data } = res.data

    return {
      memberships: data,
    }
  },
  data() {
    return {
      form: {
        foundation_name: '',
        role_name: '',
        member_from: '',
      },
      menu: false,
      levels: [
        { name: 'fresh_graduate', display_name: this.$t('fresh_graduate') },
        { name: 'average', display_name: this.$t('average') },
        { name: 'high', display_name: this.$t('high') },
      ],

      // memberships: [],
      loadingBtn: false,
    }
  },
  methods: {
    addSkill() {
      this.memberships.push(this.form)
      this.form = { name: '', level: '' }
      this.$v.form.$reset()
    },
    handleSubmit() {
      this.loadingBtn = true
      // const formData = new FormData()
      // for (const key in this.form) {
      //   if (this.form[key] !== '') {
      //     formData.append(key, this.form[key])
      //   }
      // }
      this.$axios
        .post('/user/update-memberships', { memberships: this.memberships })
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
    handleDelete(i) {
      this.$delete(this.memberships, i)
    },
  },
  watch: {
    memberships: {
      handler(value) {
        if (value) {
          this.form = {
            ...value,
          }
        }
      },
      immediate: true,
    },
  },
  validations: {
    form: {
      member_from: {
        required,
      },
      foundation_name: {
        required,
      },
      role_name: {
        required,
      },
    },
  },
}
</script>
