<template>
  <main class="company-profile">
    <section class="about-us__header">
      <LazyFiltersHomeForm />
    </section>
    <section class="company-profile__wrapper">
      <v-container>
        <form-wrapper :validator="$v.form">
          <v-row>
            <v-col cols="12" class="mb-15">
              <div class="company-profile__image-wrapper">
                <LazyImageUpload
                  style="height: 500px"
                  :imgUrl="company.cover"
                  :isUpdate="false"
                  @on-file-change="onFileChange"
                />
                <LazyImageUpload
                  class="company-profile__avatar"
                  :imgUrl="company.avatar"
                  :isUpdate="false"
                  @on-file-change="onAvatarChange"
                />
              </div>
            </v-col>

            <v-col cols="12" sm="10" class="mx-auto">
              <v-form @submit.prevent="handleSubmit">
                <v-row>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group
                      name="foundation_name"
                      attribute="foundation_name"
                    >
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
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="phone" attribute="phone">
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          type="text"
                          dense
                          filled
                          v-model="form.phone"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="email" attribute="email">
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          type="email"
                          dense
                          filled
                          v-model="form.email"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>

                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="country_id" attribute="country_id">
                      <template slot-scope="{ attrs, listeners }">
                        <v-select
                          :items="countries"
                          item-text="name"
                          item-value="id"
                          dense
                          filled
                          v-model="form.country_id"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-select>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="city_id" attribute="city_id">
                      <template slot-scope="{ attrs, listeners }">
                        <v-select
                          :loading="loadingCity"
                          :disabled="disabledCity"
                          :items="cities"
                          item-text="name"
                          item-value="id"
                          dense
                          filled
                          v-model="form.city_id"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-select>
                      </template>
                    </form-group>
                  </v-col>

                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="working_type" attribute="working_type">
                      <template slot-scope="{ attrs, listeners }">
                        <v-select
                          :items="workingTypes"
                          item-text="name"
                          item-value="value"
                          dense
                          filled
                          v-model="form.working_type"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-select>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" md="6" class="py-0 my-0 px-0">
                        <v-col cols="12" class="py-0 my-0">
                          <form-group name="major_id" attribute="major_id">
                            <template slot-scope="{ attrs, listeners }">
                              <v-select
                                :items="majors"
                                item-text="name"
                                item-value="id"
                                dense
                                filled
                                v-model="form.major_id"
                                v-on="listeners"
                                v-bind="attrs"
                              ></v-select>
                            </template>
                          </form-group>
                        </v-col>

                        <v-col cols="12" class="py-0 my-0">
                          <form-group
                            name="commercial_file"
                            attribute="commercial_file"
                          >
                            <template slot-scope="{ attrs, listeners }">
                              <LazyFileUpload
                                @fileSelected="onFileSelect"
                                v-bind="attrs"
                                v-on="listeners"
                                v-model="form.commercial_file"
                                :file_url="file_url"
                              />
                            </template>
                          </form-group>
                        </v-col>
                      </v-col>
                      <v-col cols="12" md="6" class="py-0 my-0">
                        <form-group name="description" attribute="description">
                          <template slot-scope="{ attrs, listeners }">
                            <v-textarea
                              rows="4"
                              no-resize
                              dense
                              filled
                              v-model="form.description"
                              v-on="listeners"
                              v-bind="attrs"
                            ></v-textarea>
                          </template>
                        </form-group>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <v-row>
                      <v-col cols="12">
                        <form-group
                          name="location.address"
                          attribute="location.address"
                        >
                          <template slot-scope="{ attrs, listeners }">
                            <v-text-field
                              dense
                              filled
                              v-model="form.location.address"
                              v-on="listeners"
                              v-bind="attrs"
                            ></v-text-field>
                          </template>
                        </form-group>
                      </v-col>
                      <!-- <v-col cols="2">
                        <v-btn
                          @click="locationDailog = true"
                          height="50px"
                          class="primary"
                          block
                          large
                        >
                          <v-icon>mdi-map-marker</v-icon>
                        </v-btn>
                      </v-col> -->
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="members_count" attribute="members_count">
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          type="number"
                          dense
                          filled
                          v-model="form.members_count"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="facebook" attribute="facebook">
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          dense
                          filled
                          v-model="form.facebook"
                          v-on="listeners"
                          v-bind="attrs"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="linkedin" attribute="linkedin">
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          dense
                          filled
                          v-model="form.linkedin"
                          v-on="listeners"
                          v-bind="attrs"
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
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0 my-0">
                    <form-group name="youtube" attribute="youtube">
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          dense
                          filled
                          v-model="form.youtube"
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
                      <span style="font-size: 18px">
                        {{ $t('save_edit') }}</span
                      >
                    </v-btn>
                  </v-col>

                  <v-col cols="12" class="text-center mt-10">
                    <div
                      @click="passwordDialog = true"
                      height="54px"
                      block
                      style="cursor: pointer"
                    >
                      <span style="font-size: 16px; color: #444">
                        {{ $t('do_you_want_change_password') }}</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </form-wrapper>
      </v-container>
    </section>
    <v-dialog max-width="700" v-model="locationDailog">
      <v-card max-width="700" min-height="400">
        <client-only>
          <google-map
            v-model="form.location"
            @markerUpdated="onMarkerUpdate"
            style="height: 400px"
          />
        </client-only>
      </v-card>
    </v-dialog>
    <v-dialog max-width="800" v-model="passwordDialog">
      <v-card
        max-width="800"
        min-height="400"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-card-title class="justify-center mb-10">
          <h2>{{ $t('change_password') }}</h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" lg="10" class="mx-auto">
                <v-row>
                  <v-col cols="12">
                    <form-group
                      name="old_password"
                      attribute="old_password"
                      :validator="$v.editPassword.old_password"
                    >
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          v-bind="attrs"
                          v-on="listeners"
                          filled
                          background-color="#fff"
                          v-model="editPassword.old_password"
                          :type="!showOldPassoword ? 'password' : 'text'"
                          :append-icon="oldPasswordIcon"
                          @click:append="showOldPassoword = !showOldPassoword"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12">
                    <form-group
                      name="new_password"
                      attribute="new_password"
                      :validator="$v.editPassword.new_password"
                    >
                      <template slot-scope="{ attrs, listeners }">
                        <v-text-field
                          v-bind="attrs"
                          v-on="listeners"
                          filled
                          background-color="#fff"
                          v-model="editPassword.new_password"
                          :type="!showNewPassword ? 'password' : 'text'"
                          :append-icon="newPassowrdIcon"
                          @click:append="showNewPassword = !showNewPassword"
                        ></v-text-field>
                      </template>
                    </form-group>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      :disabled="$v.editPassword.$invalid"
                      @click="onUpdatePassword"
                      :loading="passwordButtonLoading"
                      large
                      block
                      class="primary"
                    >
                      <span style="font-size: 18px">
                        {{ $t('save') }}
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import { required, email, url, requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'CompanyProfileUpdate',
  middleware: ['isUser'],
  async asyncData({ $axios, app }) {
    const resMajor = await $axios.get('/general/majors')
    const countriesRes = await $axios.get('/general/countries')

    return {
      majors: resMajor.data.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
      countries: countriesRes.data.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
    }
  },
  data() {
    return {
      loadingBtn: false,
      passwordButtonLoading: false,
      showOldPassoword: false,
      showNewPassword: false,
      passwordDialog: false,
      locationDailog: false,
      loadingCity: false,
      disabledCity: true,
      company: {},
      cities: [],
      file_url: '',
      editPassword: {
        old_password: '',
        new_password: '',
      },
      form: {
        name: '',
        phone: '',
        country_id: '',
        city_id: '',
        major_id: '',
        working_type: '',
        email: '',
        avatar: '',
        cover: '',
        members_count: '',
        commercial_file: '',
        foundation_name: '',
        description: '',
        facebook: '',
        youtube: '',
        twitter: '',
        linkedin: '',
        location: {
          lat: '',
          lng: '',
          address: '',
        },
      },
    }
  },
  computed: {
    workingTypes() {
      return [
        { value: 'full_time', name: this.$t('full_time') },
        { value: 'part_time', name: this.$t('part_time') },
        { value: 'remotely', name: this.$t('remotely') },
      ]
    },
    oldPasswordIcon() {
      if (!this.showOldPassoword) {
        return 'mdi-eye-off'
      } else {
        return 'mdi-eye'
      }
    },
    newPassowrdIcon() {
      if (!this.showNewPassword) {
        return 'mdi-eye-off'
      } else {
        return 'mdi-eye'
      }
    },
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    resetData() {
      this.editPassword = {
        old_password: '',
        new_password: '',
      }
      this.$v.editPassword.$reset()
      this.passwordDialog = false
    },
    onUpdatePassword() {
      this.passwordButtonLoading = true
      this.$axios
        .post(`auth/update-password`, { ...this.editPassword })
        .then(() => {
          this.resetData()
        })
        .finally(() => (this.passwordButtonLoading = false))
    },
    onMarkerUpdate(position) {
      this.form.location.lat = position.lat
      this.form.location.lng = position.lng
    },
    onFileChange(file) {
      this.form.cover = file
    },
    onAvatarChange(file) {
      this.form.avatar = file
    },
    onFileSelect({ file }) {
      this.form.commercial_file = file
    },
    getCities() {
      this.loadingCity = true
      this.$axios
        .get(`/general/countries/${this.form.country_id}/cities`)
        .then((res) => {
          const { data } = res.data
          this.cities = data.map((el) => ({
            id: el.id,
            name: el.name[this.$i18n.locale],
          }))
          this.loadingCity = false
          this.disabledCity = false
        })
    },
    handleSubmit() {
      const formData = new FormData()
      this.loadingBtn = true
      for (const key in this.form) {
        if (key !== 'location') {
          if (this.form[key] !== '') {
            formData.append(key, this.form[key])
          }
        }
      }
      for (const key in this.form.location) {
        if (this.form.location[key] !== '') {
          formData.append(`location[${key}]`, this.form.location[key])
        }
      }
      this.updateProfile(formData)
    },
    updateProfile(data) {
      this.$axios
        .post('/company/update-profile', data)
        .finally(() => (this.loadingBtn = false))
    },
    getCompany() {
      this.loading = true
      this.$axios
        .get(`/employer/company/${this.$auth.user.id}`)
        .then((res) => {
          const { data: company } = res.data
          this.company = company.company
          this.file_url = this.company.commercial_file
          this.form = {
            foundation_name: this.company.foundation_name,

            city_id: this.company?.city?.id,
            country_id: this.company?.country?.id,
            major_id: this.company?.major?.id,
            description: this.company.description,
            facebook: this.company.facebook,
            linkedin: this.company.linkedin,
            twitter: this.company.twitter,
            youtube: this.company.youtube,
            phone: this.company.phone,
            email: this.company.email,
            members_count: this.company.members_count,

            working_type: this.company.working_type,
            location: {
              address: this.company?.location?.address,
              lat: this.company?.location?.lat,
              lng: this.company?.location?.lng,
            },
          }

          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
  watch: {
    'form.country_id': {
      handler(value) {
        if (value) {
          this.getCities()
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
      country_id: {
        required,
      },
      city_id: {
        required,
      },
      major_id: {
        required,
      },
      members_count: {
        required,
      },
      working_type: {
        required,
      },
      foundation_name: {
        required,
      },
      commercial_file: {},

      phone: {
        // required,
      },

      location: {
        address: {},
      },
      description: {
        required,
      },
      facebook: { url },
      youtube: { url },
      twitter: { url },
      linkedin: { url },
    },
    editPassword: {
      old_password: { required },
      new_password: { required },
    },
  },
}
</script>
