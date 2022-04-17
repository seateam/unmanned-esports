<template>
  <el-form-item v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </el-form-item>
</template>
<script setup lang="ts"></script>
<script lang="ts">
export default defineComponent({})
</script>
