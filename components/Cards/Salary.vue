<template>
  <section class="salary-card mb-8">
    <div class="salary-card__right">
      <h3 class="salary-card__right--title">
        {{ item.job ? item.job.job_title : '' }}
      </h3>

      <article>
        <p>{{ item.job ? item.job.company.foundation_name : '' }}</p>
        <p class="d-flex my-2">
          <v-icon small class="mb-2" color="#000">mdi-map-marker</v-icon
          ><small class="mx-2">{{
            item.job.country ? item.job.city.name[$i18n.locale] : ''
          }}</small
          >-<small class="mx-2">{{
            item.job.country ? item.job.country.name[$i18n.locale] : ''
          }}</small>
        </p>
        <h2>
          {{ item.expected_salary || '' }}
          <small
            ><span class="size-10">{{ $t('sar') }}</span></small
          >
        </h2>
      </article>
    </div>
    <div class="salary-card__left">
      <img
        v-if="item.job.company.avatar"
        :src="item.job.company.avatar || ''"
        alt="photo"
        width="60px"
        class="radius-10"
      />
      <img
        width="60px"
        class="radius-10"
        v-else
        :src="require('@/assets/images/avatar.png')"
        alt=""
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'BankCard',
  props: {
    item: {
      type: Object,
    },
  },
}
</script>

