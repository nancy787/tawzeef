<template>
  <section>
    <v-card color="ma-2 pa-5 job-card job-card--hover">
      <v-row no-gutters>
        <v-col sm="12" cols="12">
       <v-simple-table style="width:100%">
    <template v-slot:default>
      <thead style=" text-align: right;">
        <tr style="background:#030c22  ;">
          <th style="color:#ffffff ;" >
            {{ $t('Job_title') }}
          </th>
          <th style="color:#ffffff">
            {{ $t('experince_years') }}
          </th>
           <th style="color:#ffffff" >
            {{ $t('average_minimum') }}
          </th>
          <th style="color:#ffffff">
           {{ $t('the_average') }}
          </th>
          <th style="color:#ffffff">
            {{ $t('average_maximum') }}
          </th>
        </tr>
      </thead>
      <tbody style=" text-align: right; color: #030c22 ;">
        <tr
         
        >
          <td>{{ salaryreport.position }}</td>
          <td>{{ salaryreport.average_experience }}</td>
          <td>{{ salaryreport.average_lowest_salary }}</td>
          <td>{{ salaryreport.average_salary }}</td>
          <td>{{ salaryreport.average_highest_salary }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
        </v-col>
      
        
      </v-row>
    </v-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
    }
  },
  props: {
    salaryreport: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    
    
  },
  
}
</script>

