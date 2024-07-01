<template>
  <main class="profile-form py-12">
    <h1 class="text-center">{{ $t('courses') }}</h1>
    <v-container class="pt-10">
      <form-wrapper :validator="$v.form">
        <v-form @submit.prevent="addSkill">
          <v-row>
            <v-col cols="12" sm="3" class="py-0 my-0">
              <form-group name="title" attribute="title">
                <template slot-scope="{ attrs, listeners }">
                  <v-text-field
                    dense
                    filled
                    v-model="form.title"
                    v-on="listeners"
                    v-bind="attrs"
                  ></v-text-field>
                </template>
              </form-group>
            </v-col>
            <!-- <v-col cols="12" sm="3" class="py-0 my-0">
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
            </v-col> -->
            <v-col cols="12" sm="3" class="py-0 my-0">
              <form-group name="type" attribute="type">
                <template slot-scope="{ attrs, listeners }">
                  <v-autocomplete
                    :items="types"
                    item-text="display_name"
                    item-value="name"
                    v-bind="attrs"
                    v-on="listeners"
                    dense
                    filled
                    v-model="form.type"
                  ></v-autocomplete>
                </template>
              </form-group>
            </v-col>
            <v-col cols="12" sm="3" class="py-0 my-0">
              <form-group name="total_hours" attribute="total_hours">
                <template slot-scope="{ attrs, listeners }">
                  <v-text-field
                    dense
                    filled
                    v-model="form.total_hours"
                    v-on="listeners"
                    v-bind="attrs"
                    type="number"
                  ></v-text-field>
                </template>
              </form-group>
            </v-col>
            <v-col cols="12" sm="3" class="py-0 my-0">
              <form-group name="start_date" attribute="start_date">
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
                        @blur="$v.form.start_date.$touch()"
                        v-model="form.start_date"
                        filled
                        dense
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      @change="menu = !menu"
                      v-model="form.start_date"
                      no-title
                    >
                    </v-date-picker>
                  </v-menu>
                </template>
              </form-group>
            </v-col>
            <v-col cols="12" sm="3" class="py-0 my-0">
              <form-group name="end_date" attribute="end_date">
                <template slot-scope="{ attrs }">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        @blur="$v.form.end_date.$touch()"
                        v-model="form.end_date"
                        filled
                        dense
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      @change="menu1 = !menu1"
                      v-model="form.end_date"
                      :allowed-dates="allowedDates"
                      no-title
                    >
                    </v-date-picker>
                  </v-menu>
                </template>
              </form-group>
            </v-col>
            <v-col cols="12" sm="3" class="py-0 my-0">
              <!-- <form-group name="graduation_file" attribute="graduation_file">
                <template slot-scope="{ attrs, listeners }"> -->
              <LazyFileUpload
                @fileSelected="onFileSelect"
                :label="$t('graduation_file')"
              />
              <!-- v-bind="attrs"
                    v-on="listeners" -->
              <!-- </template>
              </form-group> -->
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
          <v-simple-table v-if="courses.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">{{ $t('type') }}</th>
                  <th class="text-center">{{ $t('title') }}</th>
                  <th class="text-center">{{ $t('total_hours') }}</th>
                  <th class="text-center">{{ $t('start_date') }}</th>
                  <th class="text-center">{{ $t('end_date') }}</th>
                  <!-- <th class="text-center">{{ $t('graduation_file') }}</th> -->
                  <th class="text-center">{{ $t('delete') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in courses" :key="i">
                  <td class="text-center">{{ $t(`${item.type}`) }}</td>
                  <td class="text-center">{{ item.title }}</td>
                  <td class="text-center">{{ item.total_hours }}</td>
                  <td class="text-center">{{ item.start_date }}</td>
                  <td class="text-center">{{ item.end_date }}</td>
                  <td class="text-center">
                    <v-btn icon @click="handleDelete(i)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p v-else>{{ $t('no_courses_form') }}</p>
        </v-col>
        <v-col cols="12" sm="3">
          <v-btn
            height="54px"
            class="primary mx-auto text-capitalize"
            block
            :loading="loadingBtn"
            :disabled="courses.length == 0"
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
  name: 'courses',
  middleware: ['isCompany'],
  async asyncData({ $axios }) {
    const res = await $axios.get('/user/personal-training-courses')

    const { data } = res.data

    return {
      courses: data,
    }
  },
  data() {
    return {
      form: {
        title: '',
        // foundation_name: '',
        total_hours: '',
        start_date: '',
        end_date: '',
        type: '',
        graduation_file: '',
      },
      menu: false,
      menu1: false,
      types: [
        { name: 'course', display_name: this.$t('course') },
        { name: 'training', display_name: this.$t('training') },
      ],

      // courses: [],
      loadingBtn: false,
    }
  },
  methods: {
    addSkill() {
      this.courses.push(this.form)
      this.form = { name: '', level: '' }
      this.$v.form.$reset()
    },
    allowedDates(dates) {
      const allDates = new Date(dates)
      const currentDate = Date.now()

      return allDates < currentDate
    },
    handleSubmit() {
      this.loadingBtn = true
      const formData = new FormData()
      this.courses.forEach((course, index) => {
        for (const key in course) {
          formData.append(`${key}[${index}]`, course[key])
        }
      })
      if (this.courses.length == 0) {
        formData.append(`courses`, '[]')
      }
      // formData.append('courses', JSON.stringify(this.courses))

      // formData.append(
      //   'courses',
      //   JSON.stringify(
      //     this.courses.map((el) => {
      //       return el
      //     })
      //   )
      // )

      this.$axios
        .post('/user/update-training-courses', formData)
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
      this.$delete(this.courses, i)
    },
    onFileSelect({ file }) {
      this.form.graduation_file = file
    },
  },
  watch: {
    courses: {
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
      start_date: {
        required,
      },
      end_date: {
        required,
      },
      title: {
        required,
      },
      // foundation_name: {
      //   required,
      // },
      total_hours: {
        required,
      },
      type: {
        required,
      },
      // graduation_file: {
      //   required,
      //   // requiredIf(function () {
      //   //   if (this.graduation_file_url === '') {
      //   //     return true
      //   //   } else {
      //   //     return false
      //   //   }
      //   // }),
      // },
    },
  },
}
</script>
