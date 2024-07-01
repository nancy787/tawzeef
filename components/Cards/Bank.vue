<template>
  <main class="bank-card">
    <img
      class="bank-card__image"
      alt="photo"
      :src="
        item.logo
          ? item.logo
          : 'https://1.bp.blogspot.com/-cXsXWlG-0UY/XwEHt2ws0YI/AAAAAAAAFbo/s9puJMJzSaIF-dW6Y2C8hK8DGWNChkFcQCLcBGAsYHQ/s1600/CIB%2B3.jpg'
      "
    />

    <div>
      <h2 class="bank-card__title">{{ item.name[this.$i18n.locale] }}</h2>
      <p class="bank-card__sub-title">{{ item.account_number }}</p>
    </div>
  </main>
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

