<template>
  <section class="custom-header" v-bind="$attrs">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'CustomHeader',
  inheritAttrs: false,
}
</script>

