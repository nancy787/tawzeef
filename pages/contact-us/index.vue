<template>
  <main class="bank-accounts">
    <section class="about-us__header">
      <!-- <LazyFiltersHomeForm /> -->
    </section>
    <section class="my-12">
      <v-container>
        <v-row>
          <v-col md="8" sm="6" cols="12">
            <article>
              <h2>{{ contact.title[$i18n.locale] || '' }}</h2>
              <p v-html="contact.note[$i18n.locale] || ''"></p>
            </article>
            <p class="mb-2 color-gray">
              <v-icon color="#a1a1a1" small>mdi-email</v-icon
              ><span class="px-2">{{ setting.email || '' }}</span>
            </p>
            <p class="color-gray">
              <v-icon color="#a1a1a1" small>mdi-phone</v-icon>
              <span class="px-2">{{ setting.mobile || '' }}</span>
            </p>
            <ul class="d-flex list-style-none socials">
              <li v-for="(link, i) in setting.socials[0]" :key="i">
                <a
                  :href="link"
                  target="_blank"
                  v-if="link"
                  class="mx-1"
                  :class="i"
                  ><v-icon small>{{ `mdi-${i}` }}</v-icon>
                  <v-icon small v-if="i == 'insta'">mdi-instagram</v-icon>
                  <v-icon small v-if="i == 'site'">mdi-earth</v-icon>
                  <v-icon small v-if="i == 'medium'"
                    >mdi-facebook-gaming</v-icon
                  >
                </a>
              </li>
            </ul>
            <!-- {{ setting }} -->
          </v-col>
            <v-col md="4" sm="6" cols="12">
            <v-form @submit.prevent="sendMessage">
            
              <v-text-field
                      dense
                      filled
                      v-model="form.name"
                       v-on="listeners"
                      v-bind="attrs"
                      v-if="!$auth.loggedIn"
                      :label="$t('name')"
                    ></v-text-field>
                      <v-text-field
                      dense
                      filled
                      v-model="form.phone"
                      v-on="listeners"
                      v-bind="attrs"
                      type="number"
                      v-if="!$auth.loggedIn"
                      :label="$t('phone')"
                    ></v-text-field>
              <v-select
                :items="types"
                item-text="name"
                item-value="id"
                dense
                :label="$t('msg_type')"
                clearable
                append-icon="mdi-chevron-down"
                filled
                v-model="form.contact_type_id"
              ></v-select>
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
                :disabled="form.contact_type_id === ''"
                large
                width="100%"
                class="primary"
                >{{ $t('send') }}</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>
<script>
export default {
  name: 'contact',
  async asyncData({ $axios, app }) {
    const res = await $axios.get('/general/pages/all/contact')
    const setting = await $axios.get('/general/settings')
    const contactTypes = await $axios.get('/contact-types')
    const { data } = res.data
    const settingData = setting.data
    const typesData = contactTypes.data
    return {
      contact: data,
      setting: settingData.data,
      types: typesData.data.map((el) => ({
        id: el.id,
        name: el.name[app.i18n.locale],
      })),
    }
  },
  data() {
    return {
      loadingBtn: false,
      form: {
        name:'',
        phone:'',
        contact_type_id: '',
        message: '',
      },
    }
  },
  methods: {
    sendMessage() {
      this.loadingBtn = true
      this.$axios
        .post(`/contact`, this.form)
        .then(() => {
          this.form.contact_type_id = ''
          this.form.message = ''
          this.form.name = ''
          this.form.phone = ''
          this.loadingBtn = false
        })
        .finally(() => (this.loadingBtn = false))
    },
  },
  computed: {
    title() {
      return this.bank.page.title[this.$i18n.locale]
    },
    text() {
      return this.bank.page.note[this.$i18n.locale]
    },
    direction() {
      if (this.$i18n.locale === 'ar') {
        return 'rtl'
      } else {
        return 'ltr'
      }
    },
    prevBtnStyle() {
      if (this.$i18n.locale === 'ar') {
        return 'left:0'
      } else {
        return 'right:0'
      }
    },
  },
}
</script>

