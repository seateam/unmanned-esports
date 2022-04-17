<template>
  <svg class="iconfont" :class="`icon-${name}`" aria-hidden="true">
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>
<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})
</script>
