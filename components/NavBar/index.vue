<template>
  <v-toolbar flat color="transparent">
    <v-list flat color="transparent" class="d-none d-sm-flex">
      <v-list-item dense>
        <v-list-item-action>
          <nuxt-link exact :to="localePath('/')" class="logo">
            <!-- <section class="img-wrap ratio-60">
              <div class="img-content radius-10"> -->
            <img
              width="80px"
              class="pt-3"
              :src="require('@/assets/images/logo.png')"
              alt=""
            />
            <!-- </div>
            </section> -->
            <!-- <v-img :src="require('@/assets/images/logo.png')"></v-img> -->
          </nuxt-link>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-list
      max-width="70%"
      flat
      color="transparent"
      class="d-none d-sm-flex mx-auto px-0"
    >
      <v-list-item dense>
        <template v-for="(link, index) in links">
          <v-list-item-action
            v-if="link.type === 'USER'"
            class="mx-3"
            :key="index"
          >
            <nuxt-link :style="linkStyle" exact :to="localePath(link.to)">{{
              link.title
            }}</nuxt-link>
          </v-list-item-action>
          <v-list-item-action
            v-if="link.type === 'COMPANY'"
            class="mx-3"
            :key="index"
          >
            <nuxt-link :style="linkStyle" exact :to="localePath(link.to)">{{
              link.title
            }}</nuxt-link>
          </v-list-item-action>
          <v-list-item-action
            v-if="link.type === 'none'"
            class="mx-3"
            :key="index"
          >
            <nuxt-link :style="linkStyle" exact :to="localePath(link.to)">{{
              link.title
            }}</nuxt-link>
          </v-list-item-action>
          
        </template>
      </v-list-item>
      <v-menu
        offset-y
        class="mx-3"
        :left="$i18n.locale === 'ar'"
        :right="$i18n.locale === 'en'"
        rounded
      >
        <template v-slot:activator="{ attrs, on }">
          <span v-bind="attrs" v-on="on" class="mx-3 sources">
            {{ $t('sources') }}
          </span>
        </template>

        <v-list
          width="200"
          class="text-center py-0 mt-4"
          :class="`${
            $i18n.locale === 'en'
              ? 'profile__dropdown--en'
              : 'profile__dropdown--ar'
          }`"
        >
          <v-list-item dense :to="localePath('/hiring-law')">
            <v-list-item-title>
              {{ $t('hiring_laws') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item dense :to="localePath('/news')">
            <v-list-item-title>
              {{ $t('news') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item dense :to="localePath('/blogs')">
            <v-list-item-title>
              {{ $t('blog') }}
            </v-list-item-title>
          </v-list-item>
          
        </v-list>
        
      </v-menu>
      <!-- <v-list-item-action
            v-if="link.type === 'none'"
            class="mx-3"
            :key="index"
          >
            <nuxt-link :style="linkStyle" exact :to="localePath(link.to)">{{
              link.title
            }}</nuxt-link>
          </v-list-item-action> -->
    </v-list>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',

  data() {
    return {
      linkStyle: { color: '#fff' },
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
    links() {
      return [
        {
          title: this.$t('home'),
          to: '/',
          type: 'none',
        },
        {
          title: this.$t('search_on_employee'),
          to: `/search-on-employee`,
          type:
            this.$auth.user && this.$auth.user.type === 'COMPANY'
              ? this.$auth.user.type
              : '',
        },
        {
          title: this.$t('search_jobs'),
          to: `/find-jobs`,
          type: 'none',
    
        },
        {
          title: this.$t('Post_a_job'),
          to: '/post-job',
          type:
            this.$auth.user && this.$auth.user.type === 'COMPANY'
              ? this.$auth.user.type
              : '',
        },
        {
          title: this.$t('create_profile'),
          to: '/profile',
          type:
            this.$auth.user && this.$auth.user.type === 'USER'
              ? this.$auth.user.type
              : '',
        },
        {
          title: this.$t('majors'),
          to: '/majors',
          type: 'none',
          // type:
          //   this.$auth.user && this.$auth.user.type === 'USER'
          //     ? this.$auth.user.type
          //     : '',
        },
        {
          title: this.$t('contact_us'),
          to: '/contact-us',
          type: 'none',
          // type: this.$auth.user ? this.$auth.user.type : '',
        },
        {
          title: this.$t('salary_reports'),
          to: '/salary-reports',
          type: 'none',
          // type: this.$auth.user ? this.$auth.user.type : '',
        },
        {
          title: this.$t('salaries'),
          to: '/salaries',
          type:
            this.$auth.user && this.$auth.user.type === 'COMPANY'
              ? this.$auth.user.type
              : '',
        },
        // {
        //   title: this.$t('busniss-platform'),
        //   to: '/busniss-platform',
        //   type:'none'
            
        // },
        // {
        //   title: this.$t('Business platform'),
        //   to: '/categories',
        //   type: 'none',
        // },
      ]
    },
  },
  watch: {
    $route: {
      handler({ path }) {
        if (path === '/search-on-employee' || path == '/find-jobs' || path == '/salary-reports') {
          this.linkStyle = { color: '#4A4A4A' }
        } else {
          this.linkStyle = { color: '#fff' }
        }
      },
      immediate: true,
    },
  },
}
</script>


