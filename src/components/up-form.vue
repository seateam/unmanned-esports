<template>
  <el-form v-bind="$attrs" @submit.prevent>
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </el-form>
</template>
<script setup lang="ts"></script>
<script lang="ts">
export default defineComponent({})
</script>
