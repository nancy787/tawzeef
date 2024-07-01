<template>
  <footer class="footer">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <div class="footer__logo">
            <nuxt-link to="/">
              <img
                class="pb-3"
                height="100px"
                :src="require('@/assets/images/logo.png')"
              />
            </nuxt-link>
            <p class="footer__text">
              {{ $t('footer_text') }}
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="footer__links-container">
            <h2 class="footer__title pb-3">
              {{ $t('important_links') }}
            </h2>
            <v-list flat color="transparent" class="pa-0">
              <v-list-item
                :to="item.to"
                v-for="(item, index) in important_links"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title style="font-size: 18px; color: #fff">
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="footer__links-container">
            <h2 class="footer__title pb-3">
              {{ $t('menu') }}
            </h2>
            <v-list flat color="transparent">
              <template v-for="(item, index) in menu">
                <v-list-item
                  :to="item.to"
                  :key="index"
                  v-if="item.type === 'COMPANY'"
                >
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 18px; color: #fff">
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  :to="item.to"
                  :key="index"
                  v-if="item.type === 'USER'"
                >
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 18px; color: #fff">
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  :to="item.to"
                  :key="index"
                  v-if="item.type === 'none'"
                >
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 18px; color: #fff">
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
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
                  <v-list-item dense :to="localePath('/blogs')">
                    <v-list-item-title>
                      {{ $t('blog') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="footer__row"></div>
        </v-col>
        <v-col cols="12">
          <div class="footer__bottom-container">
            <!-- <div style="opacity: 0.5; color: #fff">
              <span
                >
                {{ $t('all_rights') }} &copy;
                {{ new Date().getFullYear() }}</span
              >
              - <span>{{ $t('tawzeef_web') }}</span> -
              <span>{{ $t('Sanad company') }}</span>
            </div> -->
            <div class="footer__social">
              <template v-for="(social, key) in socials">
                <v-btn
                  v-if="social.link"
                  :key="key"
                  icon
                  link
                  :href="social.link"
                  target="_blank"
                >
                  <v-icon color="#fff">{{ social.icon }}</v-icon>
                </v-btn>
              </template>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      settingsSocial: [],
      socials: [
        { icon: 'mdi-facebook', link: '' },
        { icon: 'mdi-twitter', link: '' },
        { icon: 'mdi-instagram', link: '' },
      ],
    }
  },
  mounted() {
    this.getSettings()
  },
  methods: {
    async getSettings() {
      const res = await this.$axios.get('/general/settings')
      const { data } = res.data
      this.settingsSocial = data.socials[0]
    },
  },
  computed: {
    important_links() {
      return [
        { title: this.$t('contact_us'), to: this.localePath('/contact-us') },
        {
          title: this.$t('bank_account'),
          to: this.localePath('/bank-accounts'),
        },
        {
          title: this.$t('terms_and_conditions'),
          to: this.localePath('/terms-conditions'),
        },
      ]
    },
    menu() {
      return [
        {
          title: this.$t('salaries'),
          to: this.localePath('/salaries'),
          type:
            this.$auth.user && this.$auth.user.type === 'COMPANY'
              ? this.$auth.user.type
              : '',
        },
        // {
        //   title: this.$t('source'),
        //   to: this.localePath('/source'),
        //   type: 'none',
        // },
        {
          title: this.$t('searching_for_jobs'),
          to: this.localePath('/find-jobs'),
          type:
            this.$auth.user && this.$auth.user.type === 'USER'
              ? this.$auth.user.type
              : '',
        },
      ]
    },
  },
  watch: {
    settingsSocial: {
      handler(socials) {
        this.socials = {
          facebook: { icon: 'mdi-facebook', link: socials.facebook },
          instagram: { icon: 'mdi-instagram', link: socials.insta },
          twitter: { icon: 'mdi-twitter', link: socials.twitter },
          site: { icon: 'mdi-earth', link: socials.site },
          medium: { icon: 'mdi-facebook-gaming', link: socials.medium },
        }
      },
      immediate: true,
    },
  },
}
</script>

