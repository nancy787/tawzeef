<template>
  <main>
    <section class="about-us__header">
      <LazyFiltersHomeForm />
    </section>
    <v-container class="my-12 py-12">
      <template v-if="loading">
        <p>{{ $t('loading') }}</p>
      </template>
      <template v-else>
        <v-row>
          <v-col md="8" sm="12" cols="12">
            <img
              :src="company.cover || ''"
              alt=""
              height="200px"
              width="100%"
              class="radius-10"
            />
            <v-row>
              <v-col md="9" sm="8" cols="12">
                <img
                  :src="company.avatar || ''"
                  alt=""
                  height="70px"
                  class="radius-10"
                  style="transform: translate(-25px, -50px)"
                />
                <article>
                  <h3 class="d-flex align-center my-5">
                    <span>{{ company.foundation_name || '' }}</span>
                    <template>
                      <v-chip color="#dddddd" class="mx-4 radius-10">{{
                        company.major
                          ? company.major.name[this.$i18n.locale]
                          : ''
                      }}</v-chip>
                      <!-- <v-btn
                        small
                        icon
                        :to="localePath(`/company-profile/${company.id}`)"
                      >
                        <v-icon small color="success">mdi-pencil</v-icon>
                      </v-btn> -->
                    </template>
                  </h3>
                  <p class="d-flex color-gray mb-0">
                    <v-icon small class="mb-2" color="#a1a1a1">mdi-phone</v-icon
                    ><span class="mx-2">{{
                      company ? company.phone : ''
                    }}</span>
                  </p>

                  <p class="d-flex color-gray mb-0">
                    <v-icon small class="mb-2" color="#a1a1a1"
                      >mdi-map-marker</v-icon
                    ><span class="mx-2">{{
                      company.country ? company.city.name[$i18n.locale] : ''
                    }}</span
                    >-<span class="mx-2">{{
                      company.country ? company.country.name[$i18n.locale] : ''
                    }}</span>
                  </p>
                  <p class="d-flex color-gray mb-0">
                    <v-icon small class="mb-2" color="#a1a1a1">mdi-earth</v-icon
                    ><span class="mx-2">{{
                      company ? company.email : ''
                    }}</span>
                  </p>
                  <p class="mb-0 mt-6" v-html="company.description || ''"></p>
                </article>
              </v-col>
              <v-col md="3" sm="4" cols="12">
                <v-row class="mt-12 pt-12">
                  <v-col cols="12" class="d-flex flex-end">
                    <v-chip color="#d8ecf7" class="radius-10"
                      ><span class="mt-1 color-primary">{{
                        company.members_count
                      }}</span>
                      <v-icon color="primary" small
                        >mdi-account-multiple</v-icon
                      >
                    </v-chip>
                  </v-col>
                  <v-col cols="12" class="mt-12">
                    <ul class="d-flex list-style-none socials">
                      <li>
                        <a
                          :href="company.facebook || ''"
                          target="_blank"
                          class="facebook mx-1"
                          ><v-icon small>mdi-facebook</v-icon>
                        </a>
                      </li>
                      <li>
                        <a
                          :href="company.linkedin || ''"
                          target="_blank"
                          class="linkedin mx-1"
                          ><v-icon small>mdi-linkedin</v-icon>
                        </a>
                      </li>
                      <li>
                        <a
                          :href="company.twitter || ''"
                          target="_blank"
                          class="twitter mx-1"
                          ><v-icon small>mdi-twitter</v-icon>
                        </a>
                      </li>
                      <li>
                        <a
                          :href="company.youtube || ''"
                          target="_blank"
                          class="youtube mx-1"
                          ><v-icon small color="red">mdi-youtube</v-icon>
                        </a>
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="4" sm="12" cols="12">
            <v-card class="pa-5 job-card similar-companies">
              <v-card-title class="px-0 mb-5"
                ><strong>{{ $t('newrby_companies') }}</strong></v-card-title
              >
              <v-row v-for="(item, i) in similar_companies" :key="i" no-gutters>
                <v-col cols="12">
                  <v-card
                    :to="`/company-profile/details/${item.id}`"
                    class="job-card"
                  >
                    <v-row>
                      <v-col sm="3" cols="12">
                        <img
                          class="radius-10"
                          width="100%"
                          :src="item.avatar || ''"
                          alt=""
                        />
                      </v-col>
                      <v-col sm="9" cols="12">
                        <article>
                          <h4 class="px-3 d-flex justify-space-between">
                            {{ item.foundation_name || '' }}

                            <v-chip small color="#d8ecf7" class="radius-5"
                              ><span class="mt-1 color-primary">{{
                                item.jobs_count
                              }}</span>
                              <v-icon color="primary" small
                                >mdi-briefcase</v-icon
                              >
                            </v-chip>
                          </h4>
                          <p class="d-flex color-gray px-3 mb-0 mt-2">
                            <v-icon small class="mb-2" color="#a1a1a1"
                              >mdi-earth</v-icon
                            ><span class="mx-2">{{
                              item ? item.email : ''
                            }}</span>
                          </p>
                        </article>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-card> </v-card>
                <v-col cols="12">
                  <v-divider class="my-5"></v-divider>
                </v-col>
              </v-row>
            </v-card>
            <!-- {{ similar_companies }} -->
          </v-col>
          <v-col cols="12" class="mt-12 pt-12">
            <section>
              <h2 class="mb-5">
                {{ $t('empty_jobs') + company.foundation_name }}
              </h2>
              <v-row>
                <template v-if="jobs.length > 0">
                  <v-col sm="6" v-for="(item, i) in jobs" :key="i">
                    <LazyCardsJob
                      :job="item"
                      @jobDelete="handleDelete(item, i)"
                    />
                  </v-col>
                </template>
                <v-col v-else cols="12">
                  {{ $t('no_jobs_found') }}
                </v-col>
              </v-row>
            </section>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </main>
</template>

<script>
export default {
  name: 'CompanyDetails',
  // middleware: ['isUser'],
  data() {
    return {
      company: {},
      similar_companies: [],
      jobs: [],
      loading: false,
    }
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    getCompany() {
      this.loading = true
      this.$axios
        .get(`/employer/company/${this.$route.params.id}`)
        .then((res) => {
          const { data } = res.data
          this.company = data.company
          this.similar_companies = data.similar_companies
          this.jobs = data.jobs
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleDelete({ id }, index) {
      this.$axios.delete(`company/job/${id}`).then(() => {
        this.$delete(this.jobs, index)
      })
    },
  },
}
</script>
