<template>
  <section>
    <v-card color="mx-1 pa-5 job-card job-card__details">
      <v-row no-gutters>
        <v-col cols="12" sm="10">
          <article>
            <h3 class="d-flex align-center">
              <span>{{ job.job_title || '' }}</span>
              <v-chip color="#d8ecf7" class="mx-2 radius-10">{{
                $t(`${job.working_type || ''}`)
              }}</v-chip>
            </h3>
            <p>
              {{ job.show_company == 1 ? job.company.foundation_name : '' }}
            </p>
            <p class="d-flex color-gray mb-2">
              <v-icon small class="mb-2" color="#a1a1a1">mdi-map-marker</v-icon
              ><span class="mx-2">{{
                job.country ? job.city.name[$i18n.locale] : ''
              }}</span
              >-<span class="mx-2">{{
                job.country ? job.country.name[$i18n.locale] : ''
              }}</span>
            </p>

            <p class="d-flex color-gray">
              <v-icon small class="mb-2" color="#a1a1a1">mdi-clock</v-icon
              ><span class="mx-2">{{ job ? job.published_at : '' }}</span>
            </p>
            <p class="d-flex color-gray">
              <span>{{ $t('expected_salary') }} : </span>
              {{ job.expected_salary }}
            </p>
          </article>
        </v-col>
        <!-- <v-col cols="4" :sm="job.subscribed ? '4' : '2'">
          <img
            :src="job.company ? job.company.avatar : ''"
            class="px-3 radius-10"
            width="100%"
          />
        </v-col> -->
        <template v-if="this.$auth.loggedIn">
          <v-col
            cols="8"
            sm="2"
            v-if="!job.subscribed && $auth.user.type == 'USER'"
          >
            <v-btn width="100%" color="primary" @click="onDialogOpen(job)">{{
              $t('apply_for_job')
            }}</v-btn>
            <a
              :href="
                `whatsapp://send?text= check this https://bebaan.net${this.$router.currentRoute.path}`
              "
              target="_blanc"
            >
              <img :src="require('@/assets/images/mainwhatsapp.svg')" alt=""
            /></a>
          </v-col>
          <v-col cols="8" sm="2" v-else-if="$auth.user.type == 'COMPANY'">
          </v-col>
          <v-col cols="8" sm="2" v-else>
            <v-chip class="radius-10 px-4">{{
              $t('successfull_apply')
            }}</v-chip>
          </v-col>
        </template>

        <v-col cols="12" class="my-5">
          <v-row no-gutters>
            <v-col
              lg="3"
              md="4"
              sm="6"
              cols="12"
              class="d-flex align-center my-3"
            >
              <img
                class="mx-1"
                :src="require('@/assets/images/job/1.png')"
                width="35px"
                height="35px"
                alt=""
              />
              <article class="mx-2">
                <p class="color-gray mb-0">
                  <small>{{ $t('working_type') }}</small>
                </p>
                <p class="mb-0">
                  <small
                    ><strong>{{
                      $t(`${this.job.working_type || ''}`)
                    }}</strong></small
                  >
                </p>
              </article>
            </v-col>
            <v-col
              lg="3"
              md="4"
              sm="6"
              cols="12"
              class="d-flex align-center my-3"
            >
              <img
                class="mx-1"
                :src="require('@/assets/images/job/2.png')"
                width="28px"
                alt=""
              />
              <article class="mx-2">
                <p class="color-gray mb-0">
                  <small>{{ $t('qualification_type') }}</small>
                </p>
                <p class="mb-0">
                  <small
                    ><strong>{{
                      $t(`${this.job.qualification_type || ''}`)
                    }}</strong></small
                  >
                </p>
              </article>
            </v-col>
            <v-col
              lg="3"
              md="4"
              sm="6"
              cols="12"
              class="d-flex align-center my-3"
            >
              <img
                class="mx-1"
                :src="require('@/assets/images/job/3.png')"
                width="35px"
                height="35px"
                alt=""
              />
              <article class="mx-2">
                <p class="color-gray mb-0">
                  <small>{{ $t('level') }}</small>
                </p>
                <p class="mb-0">
                  <small
                    ><strong>{{ $t(`${this.job.level || ''}`) }}</strong></small
                  >
                </p>
              </article>
            </v-col>
            <v-col
              lg="3"
              md="4"
              sm="6"
              cols="12"
              class="d-flex align-center my-3"
            >
              <img
                class="mx-1"
                :src="require('@/assets/images/job/4.png')"
                width="30px"
                alt="photo"
              />
              <article class="mx-2">
                <p class="color-gray mb-0">
                  <small>{{ $t('experience_years') }}</small>
                </p>
                <p class="mb-0">
                  <small
                    ><strong>{{
                      $t(`${this.job.experience_years || ''}`)
                    }}</strong></small
                  >
                </p>
              </article>
            </v-col>
          </v-row>
          <v-row no-gutters v-if="this.$auth.loggedIn">
            <v-col
              lg="3"
              md="4"
              sm="6"
              cols="12"
              class="d-flex align-center my-3"
            >
              <img
                class="mx-1"
                :src="require('@/assets/images/job/click.png')"
                width="30px"
                alt="photo"
                v-if="$auth.user.type === 'COMPANY'"
              />
              <article class="mx-2">
                <p class="color-gray mb-0" v-if="$auth.user.type === 'COMPANY'">
                  <small>{{ $t('applicants_num') }}</small>
                </p>
                <p class="mb-0" v-if="$auth.user.type === 'COMPANY'">
                  <small
                    ><strong>{{
                      $t(`${this.job.employees_count || '0'}`)
                    }}</strong></small
                  >
                </p>
              </article>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="my-5">
          <h3 class="color-primary mb-4">{{ $t('requirements') }}</h3>
          <p class="mb-0" v-html="job.description || ''"></p>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog max-width="700" v-model="dialog">
      <v-card max-width="700">
        <v-container>
          <v-row>
            <v-col cols="12" md="8" class="mx-auto">
              <h2 class="py-3" style="text-align: center">
                {{ $t('one_step_to_apply') }}
              </h2>

              <v-card-text>
                <v-form @submit.prevent="sendMessage">
                  <v-autocomplete
                    :items="cvs"
                    item-text="file"
                    item-value="id"
                    :label="$t('your_cv')"
                    dense
                    filled
                    v-model="form.cv_id"
                  ></v-autocomplete>

                  <!-- <form-group name="another_CV" attribute="another_CV">
                    <template slot-scope="{ attrs, listeners }">
                      <LazyFileUpload
                        @fileSelected="onFileSelect"
                        v-bind="attrs"
                        v-on="listeners"
                        v-model="form.another_CV"
                        
                      />
                    </template>
                  </form-group> -->
                  
          <LazyFileUpload
            @fileSelected="onFileSelect"
            :label="$t('another_CV')"
            v-model="form.another_CV"
          />
        

                  <v-textarea
                    v-model="form.message"
                    no-resize
                    rows="5"
                    filled
                    :label="$t('message')"
                  ></v-textarea>
                  <v-btn
                    :loading="loadingBtn"
                    type="submit"
                    :disabled="form.message === ''"
                    block
                    class="primary"
                    >{{ $t('send') }}</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      dialog: false,
      loadingBtn: false,
      // files:[],
      form: {
        job_id: '',
        another_CV: '',
        message: '',
      },
      cvs: [],
    }
  },
  props: {
    job: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async getProfile() {
      const res = await this.$axios.get('/user/profile')
      const { data } = res.data
      this.cvs = data.cv
    },

    onFileSelect({ file }) {
      this.form.another_CV = file
    },
    sendMessage() {
      this.loadingBtn = true
      if (this.$auth.user.type === 'USER') {
        this.$axios
          .post(`/employer/subscribe-job`, {
            job_id: this.form.job_id,
            cv_id: this.form.cv_id,
            cv: this.form.another_CV,

            message: this.form.message,
          })
          .then(res => {
            this.dialog = false
            this.form = {}
            this.$emit('successfullyApplied', res.data)
          })
          .finally(() => (this.loadingBtn = false))
      }
    },
    onDialogOpen(job) {
      this.dialog = !this.dialog
      this.form.job_id = job.id
      if (this.$auth.user.type === 'USER') {
        this.getProfile()
      }
    },
  },
}
</script>
