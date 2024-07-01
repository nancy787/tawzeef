<template>
  <main class="companies-home my-12">
    <v-container>
      <h2 class="text-center mb-8">{{ $t('Inquiries_and_polls') }}</h2>
      <v-row class="d-flex align-center">
        <v-col sm="6" cols="12">
          <v-carousel hide-delimiters show-arrows-on-hover cycle delimiter-icon="mdi-minus" class="slider">
    <v-carousel-item
      v-for="(question,i) in questions"
      :key="i"
      
     
      
    >
    
    <h3>
      {{ question }}
    </h3>
    <br>
    <p>
      {{ answers[i] }}
    </p>
   
    
  
  
  </v-carousel-item>
  </v-carousel>
        </v-col>
        <v-col sm="6" cols="12">
          
          <img
            
            :src="require('@/assets/images/home/role.png')"
            width="100%"
            alt="photo"
          />
        </v-col>
      </v-row>

      
        

    </v-container>
  </main>

</template>

<script>



export default {

data() {
return {
questions:[],
answers:[],

}
},
created() {
    this.getfaqs()
  },
  methods: {
   
    getfaqs() {
      
      this.$axios.get(`/visitor/faqs`).then((res) => {
        
        for(let i=0;i<res.data.data.length;i++){
          
           if(this.$i18n.locale === 'ar'){
            const data = res.data.data[i]
            this.questions.push( data.ask.ar)
            this.answers.push(data.answer.ar)
            
            
           }else{
            const data = res.data.data[i]
            this.questions.push( data.ask.en)
            this.answers.push(data.answer.en)
           }
        }
        
       
      })
    },
  },
}
</script>
<style>
  .slider{
    width: 100%;
    margin-top: 30px;
  }
</style>

