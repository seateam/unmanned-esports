<template>
  <router-link v-bind="$props" @click="bindLink">
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </router-link>
</template>
<script setup lang="ts">
import $ga from '@/modules/google-analytics'
const route = useRoute()
const bindLink = () => {
  $ga('bindTo', route.fullPath)
}
</script>
