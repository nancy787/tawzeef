<template>
  <main class="register">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="5" class="pa-0 hidden-sm-and-down">
          <section class="register__right-side">
            <v-col cols="12">
              <v-row>
                <v-col cols="12" class="mx-auto mb-5">
                  <nuxt-link :to="localePath('/')">
                    <v-img
                      class="mx-auto"
                      :src="require('@/assets/images/logo.png')"
                      width="152px"
                    ></v-img>
                  </nuxt-link>
                </v-col>
                <v-col cols="12">
                  <h1 class="text-center register__right-side__title">
                    {{ $t('every_thing_you_need') }}
                  </h1>
                </v-col>
                <v-col cols="12">
                  <p class="text-center register__right-side__sub-title px-5">
                    {{ $t('you_can_adertise') }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </section>
        </v-col>
        <v-col cols="12" md="7" class="mx-auto d-flex align-center">
          <section class="register__left-side">
            <v-col cols="12" md="11" class="mx-auto">
              <v-row>
                <v-col cols="6">
                  <h2>{{ $t('create_account') }}</h2>
                </v-col>
                <v-col
                  cols="6"
                  :class="
                    $i18n.locale === 'ar' ? 'text-sm-left' : 'text-sm-right'
                  "
                >
                  <p>
                    {{ $t('do_you_have_account') }}
                    <nuxt-link :to="localePath('/login')">
                      {{ $t('Enter it now') }}</nuxt-link
                    >
                  </p>
                </v-col>
                <v-col cols="12">
                  <template v-if="$route.query.type === 'COMPANY'">
                    <LazyCompanyRegisterForm />
                  </template>
                  <template v-else>
                    <LazyRegisterForm />
                  </template>
                </v-col>
              </v-row>
            </v-col>
          </section>
          
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>


export default {
  name: 'Register',
  layout: 'registeration',
  middleware: ['isAuth'],
  data(){
    return{
      showModal:false,
    }
  }
}
</script>

