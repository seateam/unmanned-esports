<template>
  <el-select v-bind="$attrs" :suffix-icon="IconArrow">
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </el-select>
</template>
<script setup lang="ts">
import IconArrow from '@/assets/components/icon-arrow.vue'
</script>
