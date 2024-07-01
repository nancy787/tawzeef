<template>
  <v-card class="employee-card" flat>
    <nuxt-link
      class="d-block"
      :to="
        localePath({
          path: `/profile/info?employee=${employee.user.id}`,
          query: { ...$route.query },
        })
      "
    >
      <!-- <img
        :src="employee.avatar || require('@/assets/images/avatar.png')"
        alt="photo"
      /> -->
      <section class="img-wrap ratio-100">
        <div class="img-content radius-10">
          <img
            :src="employee.avatar || require('@/assets/images/avatar.png')"
            alt="" style="width:50%;border-radius:50%;"
          />
        </div>
      </section>
    </nuxt-link>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <h2 class="employee-card__title mb-1">
            {{ employee.user ? employee.user.first_name : '' }}
            {{ employee.user ? employee.user.last_name : '' }}
          </h2>
          <div class="employee-card__time">
            <v-icon color="#A1A1A1" small>mdi-clock</v-icon>
            <span>{{ employee.user ? employee.user.created_at : '' }}</span>
          </div>
              <div class="employee_completed_profile_ratio">
            <p>
              {{ $t('completed_profile_ratio') }}
              {{  employee.user.completedProfileRatio }} %</p>
          </div>
            <h4 v-if="employee.user.company_seen==true">
               {{ $t('seen') }}
               <img :src="require('@/assets/images/check.png')" style="width:20px; height:20px;margin: 0 10px;" alt="">
            </h4>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn
            :href="employee.cv ? employee.cv.file : ''"
            target="_blank"
            large
            width="100%"
            class="radius-10 text-capitalize"
            color="primary"
            :disabled="employee.cv == ''"
            @click="shownCv()"
          >
            <strong class="mt-1"
              ><small>{{ $t('download_cv') }}</small></strong
            >
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn
            @click="$emit('on-dialog-open', employee.id)"
            outlined
            large
            width="100%"
            class="radius-10 text-capitalize"
            color="primary"
          >
            <strong class="mt-1">{{ $t('send_message') }}</strong>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Employee',
  props: {
    employee: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: false,
      company_seen:false,
    }
  },
  methods:{
    shownCv(){
      this.company_seen==true
     this.$axios
          .post(`/company/employee/${this.employee.user.id}`, {
            company_seen:this.company_seen,
           
          })
  },
}
}
</script>

