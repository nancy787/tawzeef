<template>
  <main class="search-on-employee mt-12">
    <v-navigation-drawer
      v-model="drawer"
      :right="Direction"
      temporary
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      :disable-resize-watcher="true"
      class="hidden-md-and-up"
      width="280px"
      
    >
      <v-container>
        <!-- <LazyFiltersmajors-level /> -->
      </v-container>
    </v-navigation-drawer>
    <v-container>
      <v-row>
        <v-btn
          class="hidden-md-and-up search-on-employee__filter-button"
          icon
          outlined
          large
          @click="drawer = !drawer"
        >
          <v-icon color="#fff">mdi-filter</v-icon>
        </v-btn>

        <v-col cols="12" md="4" class="hidden-md-and-down">
            <LazyFiltersMajorslevel />
         
        </v-col>
        <v-col cols="12" md="8">
          <v-row no-gutters>
            <v-col sm="12" v-for="(item, i) in salaryreports" :key="i">
             
              <LazyCardsMajorsReports :salaryreport="item" />
            </v-col>
          </v-row>
         
        </v-col>
        
       
      </v-row>
    </v-container>
  </main>
</template>

<script>

export default {
  name: 'salaryreports',
  middleware: ['isCompany'],
  watchQuery: true,
  async asyncData({ $axios, app, query }) {
    try {
      const res = await $axios.get(`/general/majorsAverageSalary/AverageSalary`, {
        params: { ...query },
      })
      const { data } = res.data
      return {
        salaryreports: data,
      }
    } catch (error) {
      console.log(error)
    }
  },

  data() {
    return {
      
      drawer: false,
      dialog: false,
      selectedmajor :16,
      loadingBtn: false,
    }
  },
  
  methods: {
    
    
    onDialogOpen(id) {
      this.dialog = !this.dialog
      this.employee_id = id
    },
  },
  computed: {
    Direction() {
      if (this.$i18n.locale === 'en') {
        return false
      } else {
        return true
      }
    },
  },
  watch: {
    dialog: {
      handler(value) {
        if (!value) {
          this.message = ''
        }
      },
      immediate: true,
    },
  },
}
</script>
<style>
nav{
    background: #030c22 !important;
}

</style>
