<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('skills') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-form @submit.prevent="addSkill">
          <v-row>
            <v-col cols="12" sm="4" class="py-0 my-0">
              <form-group name="name" attribute="name">
                <template slot-scope="{ attrs, listeners }">
                  <v-text-field
                    dense
                    filled
                    v-model="form.name"
                    v-on="listeners"
                    v-bind="attrs"
                  ></v-text-field>
                </template>
              </form-group>
            </v-col>
            <v-col cols="12" sm="4" class="py-0 my-0">
              <form-group name="level" attribute="level">
                <template slot-scope="{ attrs, listeners }">
                  <v-autocomplete
                    :items="levels"
                    item-text="display_name"
                    item-value="name"
                    v-bind="attrs"
                    v-on="listeners"
                    dense
                    filled
                    v-model="form.level"
                  ></v-autocomplete>
                </template>
              </form-group>
            </v-col>

            <v-col cols="12" sm="4" class="py-0 my-0">
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
          <v-simple-table v-if="skills.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">{{ $t('name') }}</th>
                  <th class="text-center">{{ $t('level') }}</th>
                  <th class="text-center">{{ $t('delete') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in skills" :key="i">
                  <td class="text-center">{{ item.name }}</td>
                  <td class="text-center">{{ $t(`${item.level}`) }}</td>
                  <td class="text-center">
                    <v-btn icon @click="handleDelete(i)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p v-else>{{ $t('no_skills_form') }}</p>
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
  name: 'Skills',
  middleware: ['isCompany'],
  async asyncData({ $axios }) {
    const res = await $axios.get('/user/personal-skills')

    const { data } = res.data

    return {
      skills: data,
    }
  },
  data() {
    return {
      form: {
        name: '',
        level: '',
      },
      levels: [
        { name: 'fresh_graduate', display_name: this.$t('beginner') },
        { name: 'average', display_name: this.$t('average') },
        { name: 'high', display_name: this.$t('excellent') },
      ],

      // skills: [],
      loadingBtn: false,
    }
  },
  methods: {
    addSkill() {
      this.skills.push(this.form)
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
        .post('/user/update-skills', { skills: this.skills })
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
      this.$delete(this.skills, i)
    },
  },
  watch: {
    skills: {
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
      name: {
        required,
      },
      level: {
        // name: {
        required,
        // },
      },
    },
  },
}
</script>
