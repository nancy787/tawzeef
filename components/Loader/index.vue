<template>
  <div class="loader">
    <v-progress-circular
      size="100"
      indeterminate
      color="secondary"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style>
.loader {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>