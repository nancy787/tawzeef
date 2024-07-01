<template>
  <div>
    <v-navigation-drawer
      class="hidden-md-and-up"
      :right="isRight"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      dark
      app
      :disable-resize-watcher="true"
    >
      <v-list class="text-center">
        <v-list-item class="px-2 mb-5">
          <v-list-item-avatar size="100" class="mx-auto" color="#2b4d66">
            <v-img contain :src="require('@/assets/images/logo.png')"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <template v-for="(link, index) in items">
          <v-list-item
            dense
            class="d-block"
            :key="index"
            v-if="link.type === 'USER'"
          >
            <v-list-item-action class="mx-3">
              <nuxt-link :style="linkStyle" exact :to="localePath(link.to)">{{
                link.title
              }}</nuxt-link>
            </v-list-item-action>
          </v-list-item>
          <v-list-item
            dense
            class="d-block"
            :key="index"
            v-if="link.type === 'COMPANY'"
          >
            <v-list-item-action class="mx-3">
              <nuxt-link :style="linkStyle" exact :to="localePath(link.to)">{{
                link.title
              }}</nuxt-link>
            </v-list-item-action>
          </v-list-item>
          <v-list-item
            dense
            class="d-block"
            :key="index"
            v-if="link.type === 'none'"
          >
            <v-list-item-action class="mx-3">
              <nuxt-link :style="linkStyle" exact :to="localePath(link.to)">{{
                link.title
              }}</nuxt-link>
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-menu
          offset-y
          class="mx-3"
          :left="$i18n.locale === 'ar'"
          :right="$i18n.locale === 'en'"
          rounded
        >
          <template v-slot:activator="{ attrs, on }">
            <span v-bind="attrs" v-on="on" class="mx-3 mt-3 sources">
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
            <v-list-item dense :to="localePath('/blog')">
              <v-list-item-title>
                {{ $t('blog') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :class="$route.path === '/post-job' ? 'active-header' : ''"
      class="app-header"
      v-onScroll="isHome"
      flat
      :clipped-left="clipped"
      fixed
      app
      ref="app_header"
    >
      <v-app-bar-nav-icon
        color="primary"
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      />

      <LazyNavBar />

      <div class="d-flex align-center py-8 menu-adjust">
        <v-btn
          small
          class="primary text-capitalize"
          v-if="!$auth.loggedIn"
          :to="localePath('/login?type=COMPANY')"
        >
          <span class="mt-1">{{ $t('Company registration') }}</span>
        </v-btn>
        <v-menu
          v-if="$auth.loggedIn"
          offset-y
          class="mx-2 radius-10"
          :left="$i18n.locale === 'ar'"
          :right="$i18n.locale === 'en'"
          rounded
        >
          <template v-slot:activator="{ attrs, on }">
            <v-badge
              left
              bordered
              color="error"
              overlap
              :content="unread"
              :value="unread"
            >
              <v-btn
                @click="getNotification"
                v-bind="attrs"
                v-on="on"
                icon
                small
                depressed
              >
                <v-icon dense :color="iconColor" class="mx-3">
                  mdi-bell
                </v-icon>
              </v-btn>
            </v-badge>
          </template>

          <v-list
            width="378"
            height="292"
            max-height="292"
            class="mt-4 py-0 radius-10 overflow-y-scroll"
            :class="`${
              $i18n.locale === 'en'
                ? 'profile__dropdown--en'
                : 'profile__dropdown--ar'
            }`"
          >
            <template v-if="notifications.length === 0">
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  flex-direction: column;
                "
              >
                <v-icon x-large>mdi-bell-off</v-icon>
                <p>{{ $t('no_notifications') }}</p>
              </div>
            </template>
            <section v-else class="notifications">
              <v-list class="py-0">
                <v-list-item
                  v-for="(notification, i) in notifications"
                  :key="i"
                  :to="
                    notification.model == 'JobSubscribe' ||
                    notification.model == 'Job'
                      ? `/jobs/${notification.model_id}`
                      : '/messages'
                  "
                  class="mx-0 px-5"
                >
                  <article>
                    <p class="mb-0">
                      <v-icon color="primary" small v-if="!notification.read"
                        >mdi-checkbox-blank-circle</v-icon
                      >
                      <v-icon color="#d3eaf6" small v-else
                        >mdi-checkbox-blank-circle</v-icon
                      >
                      <small>{{ notification.published_from || '' }}</small>
                    </p>
                    <p class="mb-0">
                      <strong>
                        <small
                          v-html="notification.note[$i18n.locale] || ''"
                        ></small>
                      </strong>
                    </p>
                  </article>
                  <section>
                    <hr />
                  </section>
                </v-list-item>
              </v-list>
              <!-- {{ notifications }} -->
            </section>
          </v-list>
        </v-menu>
        <v-menu
          offset-y
          class="mx-2"
          :left="$i18n.locale === 'ar'"
          :right="$i18n.locale === 'en'"
          rounded
        >
          <template v-slot:activator="{ attrs, on }">
            <v-icon v-bind="attrs" v-on="on" :color="iconColor" class="mx-3">
              mdi-view-grid
            </v-icon>
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
            <v-list-item dense :to="localePath('/bank-accounts')">
              <v-list-item-title>
                {{ $t('bank_account') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item dense :to="localePath('/about-us')">
              <v-list-item-title>
                {{ $t('about_us') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item dense :to="localePath('/terms-conditions')">
              <v-list-item-title>
                {{ $t('terms_and_conditions') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          small
          class="primary text-capitalize"
          v-if="!$auth.loggedIn"
          :to="localePath('/login')"
        >
          <span class="mt-1">{{ $t('Job Seekers') }}</span>
        </v-btn>

        <v-menu
          offset-y
          v-else
          class="mx-2"
          :left="$i18n.locale === 'ar'"
          :right="$i18n.locale === 'en'"
          rounded
        >
          <template v-slot:activator="{ attrs, on }">
            <v-avatar size="40" v-bind="attrs" v-on="on">
              <v-img
                :src="
                  $auth.user.avatar
                    ? $auth.user.avatar
                    : require('@/assets/images/avatar.png')
                "
              ></v-img>
            </v-avatar>
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
            <v-list-item dense to="/profile" v-if="$auth.user.type === 'USER'">
              <v-list-item-title>
                {{ $t('profile') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              dense
              v-if="$auth.user.type === 'COMPANY'"
              :to="localePath('/company-profile')"
            >
              <v-list-item-title>
                {{ $t('company_profile') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              dense
              :to="localePath('/messages')"
              v-if="$auth.loggedIn"
            >
              <v-list-item-title>
                {{ $t('messages') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="handleLogout">
              <v-list-item-title>
                {{ $t('logout') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn small class="mx-2" icon :to="switchLocalePath(locale.code)">
          <img
            v-if="locale.code === 'ar'"
            width="28px"
            :src="require('@/assets/images/saudi_flag.svg')"
          />
          <img
            v-else
            width="28px"
            :src="require('@/assets/images/united-kingdom.png')"
          />
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  directives: {
    onScroll: {
      bind(el, bind) {
        window.addEventListener('scroll', (e) => {
          // if (!bind.value) {
          //   el.classList.remove('active-header')
          //   return
          // }

          if (window.scrollY > 100) {
            el.classList.add('active-header')
          } else {
            el.classList.remove('active-header')
          }
        })
      },
    },
  },
  data() {
    return {
      isHome: true,
      clipped: false,
      drawer: false,
      fixed: false,
      isRight: true,
      iconColor: 'gray',
      unread: '',
      notifications: [],
      linkStyle: { color: '#fff' },
    }
  },
  computed: {
    locale() {
      return this.$i18n.locales.find((el) => el.code !== this.$i18n.locale)
    },
    items() {
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
          // type:
          //   this.$auth.user && this.$auth.user.type === 'USER'
          //     ? this.$auth.user.type
          //     : '',
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
          title: this.$t('salaries'),
          to: '/salaries',
          type:
            this.$auth.user && this.$auth.user.type === 'COMPANY'
              ? this.$auth.user.type
              : '',
        },
        // {
        //   title: this.$t('Business platform'),
        //   to: '/categories',
        //   type: 'none',
        // },
      ]
    },
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.getNotification()
    }
  },
  methods: {
    async getNotification() {
      const res = await this.$axios.get('notification')
      const { data, unread } = res.data.data
      this.notifications = data
      this.unread = unread
    },
    handleLogout() {
      this.$auth.logout()
    },
  },

  watch: {
    $route: {
      handler() {
        if (
          this.$route.path === '/search-on-employee' ||
          this.$route.path === '/salary-reports'
        ) {
          this.iconColor = 'gray'
          this.isHome = false
        } else {
          this.iconColor = '#fff'

          this.isHome = true
        }
        if (this.$route.path.includes('en')) {
          this.$vuetify.rtl = false
          this.isRight = false
        } else {
          this.$vuetify.rtl = true
          this.isRight = true
        }
      },
      immediate: true,
    },
  },
}
</script>
