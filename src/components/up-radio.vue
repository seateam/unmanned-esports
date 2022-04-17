<template>
  <el-radio v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </el-radio>
</template>
<script setup lang="ts"></script>
<script lang="ts">
export default defineComponent({})
</script>
