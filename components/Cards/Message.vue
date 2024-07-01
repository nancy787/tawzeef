<template>
  <v-card class="pa-5 msg-card">
    <!-- {{ message }} -->
    <v-row no-gutters>
      <v-col sm="8">
        <!-- <img
          width="50px"
          class="radius-10"
          :src="message.avatar || require('@/assets/images/avatar.png')"
          alt="photo"
        /> -->
        <v-list class="transparent-bg">
          <v-list-item
            class="px-0"
            :to="
              $auth.user.type === 'COMPANY'
                ? `profile/info?employee=${message.sender.id}`
                : `/company-profile/details/${message.sender.id}`
            "
          >
            <v-list-item-avatar class="radius-10" size="50">
              <v-img
                :src="message.avatar || require('@/assets/images/avatar.png')"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content v-if="$auth.loggedIn">
              <v-list-item-title
                ><h3 v-if="$auth.user.type === 'COMPANY'">
                  <span>{{
                    message.sender ? message.sender.first_name : ''
                  }}</span>
                  <span>{{
                    message.sender ? message.sender.last_name : ''
                  }}</span>
                </h3>
                <h3 v-else>
                  <span>{{
                    message.sender ? message.sender.foundation_name : ''
                  }}</span>
                </h3>
              </v-list-item-title>
              <v-list-item-subtitle
                v-html="message.sent_at || ''"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col sm="4" class="d-flex align-center">
        <v-btn
          @click.stop="$emit('on-dialog-open', message.sender.id)"
          color="primary"
          large
          class="text-capitalize"
          width="100%"
          ><strong class="mt-2">{{ $t('reply_message') }}</strong></v-btn
        >
      </v-col>
      <v-col cols="12">
        <p class="msg-card__read-more mt-5" v-html="message.message || ''"></p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
