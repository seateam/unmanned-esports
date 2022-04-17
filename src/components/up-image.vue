<template>
  <el-image v-bind="$attrs">
    <template #error>
      <el-image class="error-slot" src="@/assets/img/image-fail.svg" />
    </template>
  </el-image>
</template>
<script setup lang="ts"></script>
<script lang="ts">
export default defineComponent({
  mounted() {},
})
</script>
