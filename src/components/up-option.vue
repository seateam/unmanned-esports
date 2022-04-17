<template>
  <el-option v-bind="$attrs" :value="value">
    <template v-for="(index, name) in $slots" #[name]><slot :name="name" /></template>
  </el-option>
</template>
<script setup lang="ts">
const value = ref('')
</script>
<script lang="ts">
export default defineComponent({})
</script>
